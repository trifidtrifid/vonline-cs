package com.vmesteonline.be;

import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.VoInviteCode;
import com.vmesteonline.be.jdo2.VoTopic;
import com.vmesteonline.be.jdo2.VoUser;
import com.vmesteonline.be.jdo2.VoUserGroup;
import com.vmesteonline.be.jdo2.postaladdress.*;
import com.vmesteonline.be.thrift.*;
import com.vmesteonline.be.thrift.userservice.FullAddressCatalogue;
import com.vmesteonline.be.thrift.userservice.GroupLocation;
import com.vmesteonline.be.thrift.userservice.UserService;
import com.vmesteonline.be.utils.Defaults;
import com.vmesteonline.be.utils.ImageConverterVersionCreator;
import com.vmesteonline.be.utils.Pair;
import com.vmesteonline.be.utils.VoHelper;

import org.apache.http.NameValuePair;
import org.apache.http.client.utils.URLEncodedUtils;
import org.apache.thrift.TException;

import javax.jdo.Extent;
import javax.jdo.JDOObjectNotFoundException;
import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.servlet.http.HttpServletRequest;

import java.math.BigDecimal;
import java.net.URI;
import java.util.*;
import java.util.Map.Entry;
import java.util.logging.Logger;

import static com.vmesteonline.be.utils.ImageConverterVersionCreator.extractCrop;
import static com.vmesteonline.be.utils.ImageConverterVersionCreator.extractScale;
import static com.vmesteonline.be.utils.VoHelper.executeQuery;

public class UserServiceImpl extends ServiceImpl implements UserService.Iface {

	public UserServiceImpl() {
	}

	public UserServiceImpl(HttpServletRequest req) {
		super(req);
	}

	@Override
	public void updateUserInfo(UserInfo userInfo) throws InvalidOperation {

		PersistenceManager pm = PMF.getPm();
		VoUser user = getCurrentUser(pm);
		user.setName(userInfo.firstName);
		user.setLastName(userInfo.lastName);
		user.setGender(userInfo.gender);
		user.setBirthday(userInfo.birthday);
		// userInfo.avatar
		// VoHelper.replaceURL(user, "avatar", userInfo.avatar, 0, true, pm);
		pm.makePersistent(user);
	}

	public static String emailreg = "^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";
	public static String phonereg = "[[0-9]-.()+ ]{7,21}";

	// TODO this method is forbidden should be removed. use getShortProfile
	// instead
	@Override
	public ShortUserInfo getShortUserInfo() throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		VoUser voUser = getCurrentUser();
		ShortUserInfo sui = voUser.getShortUserInfo( null, pm);
		
		return sui;
	}

	@Override
	public ShortProfile getShortProfile() throws InvalidOperation, TException {
		PersistenceManager pm = PMF.getPm();
		VoUser voUser = getCurrentUser(pm);
		ShortProfile sp = new ShortProfile(voUser.getId(), voUser.getName(), voUser.getLastName(), 0, voUser.getAvatarMessage(), "", "");
		
		if (voUser.getAddress() != 0) {
			VoPostalAddress pa = pm.getObjectById(VoPostalAddress.class,voUser.getAddress());

			VoBuilding building = pm.getObjectById(VoBuilding.class, pa.getBuilding());
			sp.setAddress(building.getAddressString());
		}
		return sp;

	}

	public static ShortUserInfo  getShortUserInfo( VoUser cuser, long userId, PersistenceManager pm) {
		if (userId == 0)
			return null;
		
		try {
			VoUser voUser = pm.getObjectById(VoUser.class, userId);
			return voUser.getShortUserInfo( cuser, pm);
		} catch (Exception e) {
			e.printStackTrace();
			logger.warning("request short user info for absent user " + userId);
		} 
		return null;
	}

	@Override
	public List<Group> getUserGroups() throws InvalidOperation {
		try {

			PersistenceManager pm = PMF.getPm();

			long userId = getCurrentUserId(pm);

			VoUser user;
			try {
				user = pm.getObjectById(VoUser.class, userId);
			} catch (JDOObjectNotFoundException e) {
				logger.info("Current user doues not exists. Not found by Id.");
				getCurrentSession(pm).setUser(null);
				throw new InvalidOperation(VoError.NotAuthorized, "can't find user by id");
			}

			logger.info("find user email " + user.getEmail() + " name " + user.getName());

			List<Long> uGroups = user.getGroups();
			if (uGroups == null) {
				logger.warning("user with id " + Long.toString(userId) + " has no any groups");
				throw new InvalidOperation(VoError.GeneralError, "can't find user bu id");
			}
			List<Group> groups = new ArrayList<Group>();
			for (Long groupId : uGroups) {
				VoUserGroup ug = pm.getObjectById(VoUserGroup.class, groupId);
				logger.info("return group " + ug.getName());
				Group group = ug.createGroup();
				if( ug.getGroupType() == GroupType.STAIRCASE.getValue() && ug.getStaircase() == 0 ) group.setId(0);
				else if( ug.getGroupType() == GroupType.FLOOR.getValue() && ug.getFloor() == 0 ) group.setId(0);
				groups.add(group);
			}
			Collections.sort(groups, new Comparator<Group>(){

				@Override
				public int compare(Group o1, Group o2) {
					return Integer.compare(o1.type.getValue(),  o2.type.getValue());
				}
				
			});
			return groups;
		} catch (Throwable e) {
			e.printStackTrace();
			throw new InvalidOperation(VoError.GeneralError, e.getMessage());
		}
	}

	
	/*public static List<String> getLocationCodesForRegistration() throws InvalidOperation {

		PersistenceManager pm = PMF.getPm();
		Extent<VoPostalAddress> postalAddresses = pm.getExtent(VoPostalAddress.class, true);
		if (!postalAddresses.iterator().hasNext()) {
			throw new InvalidOperation(VoError.GeneralError, "can't find any location codes");
		}

		List<String> locations = new ArrayList<String>();
		for (VoPostalAddress pa : postalAddresses) {
			pm.retrieve(pa);
			String code = "" + pa.getAddressCode();
			pm.makePersistent(new VoInviteCode(code, pa.getId()));

			locations.add(code);
		}
		return locations;
	}*/

	@Override
	public void deleteUserAddress(PostalAddress newAddress) throws InvalidOperation, TException {

	}

	@Override
	public List<Country> getCounties() throws InvalidOperation, TException {
		PersistenceManager pm = PMF.getPm();
		try {
			Extent<VoCountry> vocs = pm.getExtent(VoCountry.class);
			List<Country> cl = new ArrayList<Country>();
			for (VoCountry voc : vocs) {
				cl.add(voc.getCountry());
			}
			return cl;
		} catch (Exception e) {
			e.printStackTrace();
			throw new InvalidOperation(VoError.GeneralError, "FAiled to getCounties. " + e.getMessage());
		} 
	}

	@Override
	public UserProfile getUserProfile(long userId) throws InvalidOperation {

		PersistenceManager pm = PMF.getPm();

		try {
			VoUser currentUser = getCurrentUser(pm);
			if (userId == 0) {
				UserProfile up = currentUser.getUserProfile();
				try {
					up.contacts.homeAddress = pm.getObjectById( VoPostalAddress.class, currentUser.getAddress()).getPostalAddress();
				} catch (Exception e) {
					e.printStackTrace();
				}
				up.setNotifications(currentUser.getNotificationFreq());
				return up;
			}

			VoUser user;
			try {
				user = pm.getObjectById(VoUser.class, userId);
				
				if(currentUser.isTheBigBro()){
					UserProfile up = user.getUserProfile();
					try {
						up.contacts.homeAddress = pm.getObjectById( VoPostalAddress.class, user.getAddress()).getPostalAddress();
					} catch (Exception e) {
						e.printStackTrace();
					}
					up.setNotifications(user.getNotificationFreq());
					return up;
				}

			} catch (JDOObjectNotFoundException e) {
				throw new InvalidOperation(VoError.IncorrectParametrs, "No user found by ID: " + userId);
			}
			UserProfile uProfile = user.getUserProfile();
			UserPrivacy uPrivacy = user.getPrivacy();
			
			// show nothing if full privacy
			if (uPrivacy.contacts == GroupType.NOBODY && uPrivacy.profile == GroupType.NOBODY) {
				uProfile.contacts = null;
				uProfile.interests = null;
				uProfile.family = null;
				uProfile.privacy = null;
				uProfile.userInfo.birthday = 0;
				uProfile.userInfo.gender = 0;
				return uProfile;
			}

			// otherwise lets determine users relations that would be stored as GroupType
			GroupType relation = determineProvacyByAddresses(currentUser, user, pm);

			// filter information according to relations
			if (uPrivacy.contacts.getValue() < relation.getValue()) {// remove contacts
				uProfile.contacts = null;
			}

			if (uPrivacy.profile.getValue() < relation.getValue()) {// remove interest and family
				uProfile.interests = null;
				uProfile.family = null;
				uProfile.userInfo.birthday = 0;
				uProfile.userInfo.gender = 0;
			}
			
			return uProfile;

		} catch (Exception e) {
			e.printStackTrace();
			throw new InvalidOperation(VoError.IncorrectParametrs, "unknow user id: " + Long.toString(userId));
		} 
	}

	private GroupType determineProvacyByAddresses(VoUser currentUser, VoUser user, PersistenceManager pm) throws InvalidOperation {
		
		//--------------- is users have the same group

		Iterator<Long> ugit = user.getGroups().iterator();
		Iterator<Long> cugit = currentUser.getGroups().iterator();
		long commonGroupId;
		while( ugit.hasNext() && cugit.hasNext() ){ //expects that group are synchronized by type
			if( (commonGroupId = ugit.next()) == cugit.next() ){
				return GroupType.findByValue( pm.getObjectById(VoUserGroup.class, commonGroupId ).getGroupType());
			}
		}
		
		//---- relations by distance
		GroupType relation = GroupType.TOWN;
		
		VoPostalAddress cuAddr = pm.getObjectById( VoPostalAddress.class, currentUser.getAddress());
		long uAddrId;
		VoPostalAddress uAddr;
		if (null == cuAddr || 0 == (uAddrId = user.getAddress())) {
			relation = GroupType.TOWN;

		} else if ( null!=(uAddr = pm.getObjectById(VoPostalAddress.class, uAddrId))
				&& cuAddr.getBuilding() == uAddr.getBuilding() && 0 != cuAddr.getBuilding()) { // the same building, not possible!

			relation = GroupType.BUILDING;

			if (cuAddr.getStaircase() == uAddr.getStaircase() && 0 != uAddr.getStaircase()){
				relation = GroupType.STAIRCASE;

				if (cuAddr.getFloor() == uAddr.getFloor() && 0 != uAddr.getFloor()) {
					relation = GroupType.FLOOR; 
				}
			}

		} else { // lets determine the relation as according to the distance

			VoPostalAddress userAddress = pm.getObjectById( VoPostalAddress.class, user.getAddress());
			int maxRadius = VoHelper.calculateRadius( userAddress.getUserHomeGroup( pm ), cuAddr.getUserHomeGroup(pm ));
			if (maxRadius <= Defaults.radiusNeighbors)
				relation = GroupType.NEIGHBORS;
			else if (maxRadius <= Defaults.radiusBlock)
				relation = GroupType.BLOCK;
			
		}
		return relation;
	}

	@Override
	public UserContacts getUserContacts() throws InvalidOperation, TException {
		PersistenceManager pm = PMF.getPm();
		VoUser u = getCurrentUser(pm);
		UserContacts uc = new UserContacts();
		if (u.getAddress() == 0) {
			uc.setAddressStatus(UserStatus.UNCONFIRMED);
		} else {
			uc.setHomeAddress(pm.getObjectById(VoPostalAddress.class, u.getAddress()).getPostalAddress());
		}
		uc.setEmail(u.getEmail());
		uc.setMobilePhone(u.getMobilePhone());
		return uc;
	}

	@Override
	public void changePassword(String oldPwd, String newPwd) throws InvalidOperation, TException {
		PersistenceManager pm = PMF.getPm();
		VoUser cu = getCurrentUser(pm);
		if (!cu.getPassword().equals(oldPwd))
			throw new InvalidOperation(VoError.IncorrectParametrs, "Old password dont match.");
		if (null == newPwd || newPwd.length() < 3) {
			throw new InvalidOperation(VoError.IncorrectPassword, "New password too short.");
		}
		cu.setPassword(newPwd);
		pm.makePersistent(cu);
	}

	@Override
	public void updatePrivacy(UserPrivacy privacy) throws InvalidOperation, TException {
		PersistenceManager pm = PMF.getPm();
		VoUser cu = getCurrentUser(pm);
		cu.setPrivacy(privacy);
		pm.makePersistent(cu);
	}

	@Override
	public void updateContacts(UserContacts contacts) throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		VoUser user = getCurrentUser(pm);
		if (null != contacts.getMobilePhone())
			if (contacts.getMobilePhone().matches(phonereg))
				user.setMobilePhone(contacts.getMobilePhone());
			else
				throw new InvalidOperation(VoError.IncorrectParametrs, "Invalid Phone format '" + contacts.getMobilePhone()
						+ "'. Should have format like 79219876543, +7(821)1234567, etc");

		if (null != contacts.getEmail() && !contacts.getEmail().trim().equalsIgnoreCase(user.getEmail())) {
			if (contacts.getEmail().matches(emailreg)) {
				user.setEmail(contacts.getEmail());
				user.setEmailConfirmed(false);
			} else
				throw new InvalidOperation(VoError.IncorrectParametrs, "Invalid Email format '" + contacts.getEmail() + "'. ");
		}
		if (null != contacts.getHomeAddress()) {
			VoPostalAddress pa = VoPostalAddress.createVoPostalAddress(contacts.getHomeAddress(), pm);

			if (user.getAddress() == 0 || pa.getId() != user.getAddress()) {
				try {
					user.setLocation(pa.getAddressCode(), pm);
				} catch (InvalidOperation e) {
					e.printStackTrace();
					throw new InvalidOperation(VoError.IncorrectParametrs, "Address is incorrect." + e.why);
				} catch (Exception e) {
					e.printStackTrace();
					throw new InvalidOperation(VoError.IncorrectParametrs, "Address is incorrect." + e.getMessage());
				}
			}
		}
		pm.makePersistent(user);
	}

	@Override
	public void updateFamily(UserFamily family) throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		VoUser cu = getCurrentUser(pm);
		cu.setUserFamily(family);
		pm.makePersistent(cu);
	}

	@Override
	public void updateInterests(UserInterests interests) throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		VoUser cu = getCurrentUser(pm);
		cu.setInterests(interests.userInterests);
		cu.setJob(interests.job);
		pm.makePersistent(cu);
	}

	@Override
	public UserContacts getUserContactsExt(long userId) throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		try {
			VoUser u = pm.getObjectById(VoUser.class, userId);
			UserContacts uc = new UserContacts();
			if (u.getAddress() == 0) {
				uc.setAddressStatus(UserStatus.UNCONFIRMED);
			} else {
				uc.setHomeAddress( pm.getObjectById( VoPostalAddress.class, u.getAddress()).getPostalAddress());
			}
			uc.setEmail(u.getEmail());
			uc.setMobilePhone(u.getMobilePhone());
			return uc;
		} catch (JDOObjectNotFoundException ioe) {
			throw new InvalidOperation(VoError.IncorrectParametrs, "Access denied");

		} 
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<City> getCities(long countryId) throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		try {

			List<City> cl = new ArrayList<City>();
			Query q = pm.newQuery(VoCity.class);
			q.setFilter("countryId == " + countryId);
			List<VoCity> cs = executeQuery(  q );
			for (VoCity c : cs) {
				cl.add(c.getCity());
			}
			q.closeAll();
			return cl;
		} catch (Exception e) {
			e.printStackTrace();
			throw new InvalidOperation(VoError.GeneralError, "FAiled to getCities. " + e.getMessage());
		} 
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Street> getStreets(long cityId) throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		try {
			List<Street> cl = new ArrayList<Street>();
			Query q = pm.newQuery(VoStreet.class, "cityId=="+cityId);
			List<VoStreet> cs = executeQuery(  q );
			for (VoStreet c : cs) {
				pm.retrieve(c);
				cl.add(c.getStreet());
			}
			q.closeAll();
			return cl;
		} catch (Exception e) {
			e.printStackTrace();
			throw new InvalidOperation(VoError.GeneralError, "FAiled to load STreets. " + e.getMessage());
		} 
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Building> getBuildings(long streetId) throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		try {
			List<Building> cl = new ArrayList<Building>();
			Query q = pm.newQuery(VoBuilding.class, "streetId=="+streetId);
			List<VoBuilding> cs = executeQuery(  q );
			for (VoBuilding c : cs) {
				cl.add(c.getBuilding());
			}
			q.closeAll();
			return cl;
		} catch (Exception e) {
			e.printStackTrace();
			throw new InvalidOperation(VoError.GeneralError, "FAiled to getBuildings. " + e.getMessage());
		} 
	}

	@Override
	public void updateUserAvatar(String url) throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		VoUser voUser = getCurrentUser(pm);



		voUser.setAvatarTopic(createThumbnailURL(url,80));
		voUser.setAvatarMessage(createThumbnailURL(url,48));
		voUser.setAvatarProfileShort(createThumbnailURL(url,80));
		voUser.setAvatarProfile(url);
		pm.makePersistent(voUser);

	}

	public String createThumbnailURL(String url, int size) {
		String smallPicUrl = url;
		try {
			Map<String,String[]> params = new HashMap<>();
			URI uri = new URI(url);
			List<NameValuePair> nvp = URLEncodedUtils.parse(uri, "UTF-8");
			for (int iin = 0; iin < nvp.size(); iin++) {
                NameValuePair nv = nvp.get(iin);
                params.put( nv.getName(), new String[]{ nv.getValue()});
            }

			ImageConverterVersionCreator.Scale scale = extractScale( params );
			ImageConverterVersionCreator.Crop crop = extractCrop(params);

			//create 100x100 bounded avatar
			int x = crop.Xrb - crop.Xlt;
			int y = crop.Yrb - crop.Ylt;

			float k = x > y ?
                    x > size ? (float)size / (float)x : 1.0F :
                    y > size ? (float)size / (float)y : 1.0F ;

			smallPicUrl = uri.getPath()+
                    "?w="+ (int)(scale.x * k)+
                    "&h="+ (int)(scale.y * k)+
                    "&s="+ (int)(crop.Xlt * k)+"," + (int)(crop.Ylt * k)+","+(int)(crop.Xrb * k)+","+(int)(crop.Yrb * k);
		} catch (Exception e) {
			logger.warning("Failed to create thumb for the avatar '"+url+"'"+e.getMessage());
		}
		return smallPicUrl;
	}

	@Override
	public FullAddressCatalogue getAddressCatalogue() throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		try {

			Extent<VoCountry> vocs = pm.getExtent(VoCountry.class);
			Set<Country> cl = new TreeSet<Country>();
			for (VoCountry voc : vocs) {
				cl.add(voc.getCountry());
			}

			Extent<VoCity> vocis = pm.getExtent(VoCity.class);
			List<City> cil = new ArrayList<City>();
			for (VoCity voc : vocis) {
				cil.add(voc.getCity());
			}

			Extent<VoStreet> voss = pm.getExtent(VoStreet.class);
			List<Street> sl = new ArrayList<Street>();
			for (VoStreet voc : voss) {
				sl.add(voc.getStreet());
			}

			Extent<VoBuilding> vobs = pm.getExtent(VoBuilding.class);
			List<Building> bl = new ArrayList<Building>();
			for (VoBuilding voc : vobs) {
				bl.add(voc.getBuilding());
			}
			return new FullAddressCatalogue(cl, cil, sl, bl);
		} catch (Exception e) {
			e.printStackTrace();
			throw new InvalidOperation(VoError.GeneralError, "FAiled to getAddressCatalogue. " + e.getMessage());
		} 
	}

	@Override
	public boolean setUserAddress(PostalAddress newAddress) throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		try {
			VoUser currentUser = getCurrentUser(pm);
			currentUser.setCurrentPostalAddress(VoPostalAddress.createVoPostalAddress(newAddress, pm), pm);
		} catch (Exception e) {
			e.printStackTrace();
			throw new InvalidOperation(VoError.GeneralError, "FAiled to getAddressCatalogue. " + e.getMessage());
		} 
		return true;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Country createNewCountry(String name) throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		try {
			// TODO check that there is no country with the same name
			VoCountry vc = VoCountry.createVoCountry(name, pm);
			Query q = pm.newQuery(VoCountry.class);
			q.setFilter("name == '" + name + "'");
			List<VoCountry> countries = executeQuery(  q );
			if (countries.size() > 0) {
				logger.info("City was NOT created. The same City was registered. Return an old one: " + countries.get(0));
				return countries.get(0).getCountry();
			} else {
				logger.info("Country '" + name + "'was created.");
				pm.makePersistent(vc);
				return vc.getCountry();
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new InvalidOperation(VoError.GeneralError, "FAiled to createNewCountry. " + e.getMessage());
		} 
	}

	@SuppressWarnings("unchecked")
	@Override
	public City createNewCity(long countryId, String name) throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		try {
			VoCountry vco = pm.getObjectById(VoCountry.class, countryId);
			return VoCity.createVoCity(vco, name, pm).getCity();
		} catch (Exception e) {
			e.printStackTrace();
			throw new InvalidOperation(VoError.GeneralError, "FAiled to createNewCity. " + e.getMessage());
		} 
	}

	@SuppressWarnings("unchecked")
	@Override
	public Street createNewStreet(long cityId, String name) throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		try {
			// TODO check that there is no street with the same name
			VoCity vc = pm.getObjectById(VoCity.class, cityId);
			return VoStreet.createVoStreet(vc, name, pm).getStreet();

		} catch (Throwable e) {
			e.printStackTrace();
			throw new InvalidOperation(VoError.GeneralError, "FAiled to createNewStreet. " + e.getMessage());
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public Building createNewBuilding(String zipCode, long streetId, String fullNo, String longitude, String lattitude) throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		try {
			// TODO check that there is no building with the same name
			VoStreet vs = pm.getObjectById(VoStreet.class, streetId);
			Query q = pm.newQuery("SQL", "SELECT * FROM VOBUILDING WHERE streetId = " + streetId + " &&  fullNo = '" + fullNo + "'");
			List<VoBuilding> buildings = executeQuery(  q );
			if (buildings.size() > 0) {
				logger.info("VoBuilding was NOT created. The same VoBuilding was registered. Return an old one: " + buildings.get(0));
				return buildings.get(0).getBuilding();
			} else {
				logger.info("VoBuilding '" + fullNo + "'was created.");
				VoBuilding voBuilding = VoBuilding.createVoBuilding(zipCode, vs, fullNo, new BigDecimal(null == longitude || "".equals(longitude) ? "0" : longitude), new BigDecimal(null == lattitude || "".equals(lattitude) ? "0" : lattitude), pm);
				if (longitude == null || lattitude == null || longitude.isEmpty() || lattitude.isEmpty()) { // calculate
					// location
					try {
						Pair<String, String> position = VoGeocoder.getPosition(voBuilding, false,pm);
						voBuilding.setLocation(new BigDecimal(position.left), new BigDecimal(position.right));
					} catch (Exception e) {
						e.printStackTrace();
						throw new InvalidOperation(VoError.GeneralError, "FAiled to determine location of the building." + e.getMessage());
					}
				}
				pm.makePersistent(voBuilding);
				return voBuilding.getBuilding();
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new InvalidOperation(VoError.GeneralError, "FAiled to createNewStreet. " + e.getMessage());
		} 
	}

	@Override
	public boolean addUserAddress(PostalAddress newAddress) throws TException {
		return false;

	}

	@Override
	public Set<PostalAddress> getUserAddresses() throws TException {
		return null;
	}

	@Override
	public PostalAddress getUserHomeAddress() throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		VoUser currentUser = getCurrentUser(pm);
		if (null == currentUser)
			throw new InvalidOperation(VoError.NotAuthorized, "No currnet user is set.");
		if (0 == currentUser.getAddress()) {
			return null;
		}
		return pm.getObjectById( VoPostalAddress.class, currentUser.getAddress()).getPostalAddress(pm);
	}

	private static Logger logger = Logger.getLogger("com.vmesteonline.be.AuthServiceImpl");

	// ======================================================================================================================

	private static final Set<String> publicMethods = new HashSet<String>(Arrays.asList(new String[] {

	"allMethods are public"

	}));

	@Override
	public boolean isPublicMethod(String method) {
		return true;// publicMethods.contains(method);
	}

	// ======================================================================================================================

	@Override
	public long categoryId() {
		return ServiceCategoryID.USER_SI.ordinal();
	}

	@Override
	public List<ShortUserInfo> getNeighbours() throws InvalidOperation, TException {
		PersistenceManager pm = PMF.getPm();
		VoUser currentUser = getCurrentUser();
		List<VoUser> users = getUsersByLocation(currentUser.getGroup(GroupType.BUILDING, pm), pm);
		return shortInfoForGroup(GroupType.BUILDING, users, pm);
	}
	
	private ArrayList<ShortUserInfo> shortInfoForGroup(GroupType gt, List<VoUser> users, PersistenceManager pm){
		ArrayList<ShortUserInfo> ul = new ArrayList<ShortUserInfo>();
		for( VoUser user: users ){
			ShortUserInfo shortUserInfo = user.getShortUserInfo(null);
			shortUserInfo.setAddress( user.getAddressString( gt, pm));
			ul.add( shortUserInfo );
		}
		return ul;
	} 
	
	public static CachableObject< ArrayList<ShortUserInfo> > usersByGroup = new CachableObject();
	@Override
	public List<ShortUserInfo> getNeighboursByGroup(long groupId) throws InvalidOperation, TException {
		return usersByGroup.create(this, "getNeighborsByGroupDo", new Object[]{ groupId });
	}

	public ArrayList<ShortUserInfo> getNeighborsByGroupDo(Long groupId) throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		VoUserGroup ug = pm.getObjectById(VoUserGroup.class, groupId);
		List<VoUser> users = getUsersByLocation( ug, pm);
		ArrayList<ShortUserInfo> sug = shortInfoForGroup( GroupType.findByValue(ug.getGroupType()), users, pm);
		Collections.sort( sug, new Comparator<ShortUserInfo>(){
			@Override
			public int compare(ShortUserInfo o1, ShortUserInfo o2) {
				return (o1.lastName + o1.firstName).compareTo(o2.lastName+o2.firstName);
			}
		} );
		return sug;
	}

	private static Comparator<VoUser> uIdCOmp = new Comparator<VoUser>(){
		@Override
		public int compare(VoUser o1, VoUser o2) {
			return (""+o1.getLastName()+o1.getName()).compareToIgnoreCase("" + o2.getLastName() + o2.getName());
	}};
		
	public static List<VoUser> getUsersByLocation(VoUserGroup group, PersistenceManager pm) {

		int radius = group.getRadius();
		List<VoUser> users;
		if( group.getGroupType() <= GroupType.BUILDING.getValue() ) {
			users = getUsersByGroup(group.getId(), pm);
		} else {
			String ufilter = "emailConfirmed==true && ";
			BigDecimal latitudeMax = VoHelper.getLatitudeMax(group.getLatitude(), radius);
			BigDecimal latitudeMin = VoHelper.getLatitudeMin(group.getLatitude(), radius);
			BigDecimal longitudeMax = VoHelper.getLongitudeMax(group.getLongitude(), group.getLatitude(), radius);
			BigDecimal longitudeMin = VoHelper.getLongitudeMin(group.getLongitude(), group.getLatitude(), radius);
			ufilter += "longitude >= '" + longitudeMin + "' && longitude <= '" + longitudeMax +
					"' && latitude >= '" + latitudeMin + "' && latitude <= '" + latitudeMax+"'";
			List<VoUser> ulist = executeQuery(pm.newQuery(VoUser.class, ufilter));
			users = new ArrayList<>(ulist);
			
			List<Long> pgids = executeQuery(pm.newQuery("SQL","SELECT ID FROM VOUSERGROUP WHERE longitude='"
					+ group.getLongitude()+"' AND latitude='"+group.getLatitude()+"' AND groupType="+(group.getGroupType() - 1)));
			
			if( pgids.size() > 0 )
				users.removeAll( getUsersByLocation( pm.getObjectById(VoUserGroup.class, pgids.get(0)), pm));
			
		}
		Collections.sort(users,uIdCOmp);
		return users;
	}

	public static  List<VoUser> getUsersByGroup(Long groupId, PersistenceManager pm) {
		List<VoUser> users = new ArrayList<>();
		List results = executeQuery(  pm.newQuery("SQL","SELECT g.`ID` FROM `USERGROUPS` as g JOIN VOUSER as u ON u.ID=g.ID WHERE `GROUP`="+groupId +" AND u.emailConfirmed=true") );
		List<Long> uids = new ArrayList<>();
		Iterator rit = results.iterator();
		while(rit.hasNext()) {
            uids.add((Long) rit.next());
        }
		for( Long uid: uids){
            users.add( pm.getObjectById(VoUser.class, uid));
        }
		return users;
	}

	@Override
	public void updateNotifications(Notifications notifications) throws InvalidOperation, TException {
		PersistenceManager pm = PMF.getPm();
		try {
			VoUser currentUser = getCurrentUser();
			currentUser.setNotifications(notifications);
			pm.makePersistent(currentUser);
		} finally {
			pm.close();
		}
	}

	@Override
	public String getGroupMap(long groupId, String color) throws InvalidOperation, TException {
		if (null == color || 0 == color.length()) {
			color = "8822DDC0";
		}
		String mapKey = "yandex.group.map." + groupId + "." + color;
		String url = ServiceImpl.getObjectFromCache(mapKey);
		if (null != url)
			return url;

		PersistenceManager pm = PMF.getPm();
		int width = 450, height = 450;
		
			VoUserGroup userGroup = pm.getObjectById(VoUserGroup.class, groupId);
			String los = userGroup.getLongitude().toPlainString();
			String las = userGroup.getLatitude().toPlainString();
			int radius;
			if(0!= (radius = userGroup.getRadius())){
				
				double lad = userGroup.getLatitude().doubleValue();
				double lod = userGroup.getLongitude().doubleValue();
	
				double laDelta = VoHelper.getLatitudeMax(userGroup.getLatitude(), userGroup.getRadius()).doubleValue() - lad;
				double loDelta = VoHelper.getLongitudeMax(userGroup.getLongitude(), userGroup.getLatitude(), userGroup.getRadius()).doubleValue() - lod;
				double ws,hs;
			
				if(radius < 100){
					double k = 0.0000002*radius;
					ws = VoHelper.roundDouble(k*width, 5);
					hs = VoHelper.roundDouble(k*height, 5);
				} else {
					ws = VoHelper.roundDouble(laDelta, 5);
					hs = VoHelper.roundDouble(loDelta, 5);
				}
				
					url = "https://static-maps.yandex.ru/1.x/?l=map&pt=" + los + "," + las + ",pm2am" 
							+"&size="+width+","+height+"&spn="+ws+","+hs +
								"&pl=c:" + color + ",f:" + color + ",w:1";	
	
	
				for ( double i = 0.0D; i < 2 * Math.PI; i += Math.PI / 30) {
					url += "," + (lod + Math.sin(i) * loDelta) + "," + (lad + Math.cos(i) * laDelta);
				}
			
				ServiceImpl.putObjectToCache(mapKey, url);
				
			} else {
				
				url = VoGeocoder.createMapImageURL(  userGroup.getLongitude(), userGroup.getLatitude(), 450, 450 );
			}

		return url;
	}

	private static List<Rubric> tmpRubrics;
	
	@Override
	public List<Rubric> getUserRubrics() throws InvalidOperation, TException {
		return tmpRubrics == null ? tmpRubrics = Defaults.initializeRubrics() : tmpRubrics;
	}

//	public static CachableObject<GroupType> usersRelation = new CachableObject<GroupType>();
	
	public static GroupType getRelations(VoUser askedUser, VoUser voUser, PersistenceManager pm) {
		/*List results = executeQuery(  pm.newQuery("SQL","SELECT `GROUP` FROM `USERGROUPS` WHERE `ID` INGROUP`="+group.getId()) );
		List<Long> uids = new ArrayList<>();
		Iterator rit = results.iterator();
		while(rit.hasNext()) {
			uids.add((Long) rit.next());
		}
		for( Long uid: uids){
			users.add( pm.getObjectById(VoUser.class, uid));
		}*/
		List<Long> commonGroups = new ArrayList<>(askedUser.getGroups());
		commonGroups.retainAll(voUser.getGroups());
		return commonGroups.size() > 0  ? GroupType.findByValue( askedUser.getGroups().indexOf(commonGroups.get(0)) + Defaults.FIRST_USERS_GROUP ) : GroupType.NEIGHBORS;
	}

	@Override
	public GroupLocation getGroupView(long groupId) throws InvalidOperation, TException {
		if( 0==groupId) return null;
		PersistenceManager pm = PMF.getPm();
		VoUserGroup userGroup = pm.getObjectById(VoUserGroup.class, groupId);
		return new GroupLocation(userGroup.getLongitude().toPlainString(), userGroup.getLatitude().toPlainString(), 
				userGroup.getRadius(), GroupType.findByValue(userGroup.getGroupType()));
	}

	@Override
	public void updateUserAddress(int staircase, int floor, int flatNo) throws InvalidOperation, TException {
		PersistenceManager pm = PMF.getPm();
		VoUser currentUser = getCurrentUser(pm);
		VoPostalAddress oldAddress = pm.getObjectById(VoPostalAddress.class,currentUser.getAddress());
		long oldBuilding = oldAddress.getBuilding();
		boolean stairChanged, floorChanged, flatChanged;
		String query = "buildingId=="+oldBuilding;
		query += " && staircase==" + (( stairChanged = (0 != staircase && staircase!=oldAddress.getStaircase())) ?  staircase : oldAddress.getStaircase()) ;
		query += " && floor==" + ( (floorChanged = 0 != floor && floor!=oldAddress.getFloor()) ? floor : oldAddress.getFloor());
		query += " && flatNo==" + ( (flatChanged = 0 != flatNo && floor!=oldAddress.getFlatNo()) ? flatNo : oldAddress.getFlatNo());
		
		if( stairChanged || floorChanged || flatChanged ){
			List<VoPostalAddress> newAddresses = executeQuery(  pm.newQuery( VoPostalAddress.class, query) );
			VoPostalAddress newAddr;
			if( newAddresses.size() == 0 ){
				newAddr = VoPostalAddress.createVoPostalAddress(
						pm.getObjectById(VoBuilding.class, oldBuilding), (byte)staircase, (byte)floor, flatNo, "", pm );
				logger.warning("No address found by query '"+query+"' new one created");
			} else {
				newAddr = newAddresses.get(0);
			}
			currentUser.setAddress(newAddr.getId());
			if( stairChanged || floorChanged){
				int pos=0;
				for( Long ugId : currentUser.getGroups()){
					VoUserGroup ug = pm.getObjectById(VoUserGroup.class, ugId);
					if( stairChanged && GroupType.STAIRCASE.getValue() == ug.getGroupType() || 
							floorChanged && GroupType.FLOOR.getValue() == ug.getGroupType() ){
						
						VoUserGroup newGroup = VoUserGroup.createVoUserGroup(ug.getLongitude(), ug.getLatitude(), ug.getRadius(), 
								newAddr.getStaircase(), newAddr.getFloor(), ug.getName(), ug.getImportantScore(), ug.getGroupType(), pm);
						currentUser.getGroups().set(pos, newGroup.getId());
					}
					pos++;
				}
			}
			pm.makePersistent(currentUser);
				
		} else {
			logger.warning("Address of user does not changed.");
		}
	}

	@Override
	public void updateUserServices(Map<ServiceType, Boolean> newServiceStauses) throws InvalidOperation, TException {
		PersistenceManager pm = PMF.getPm();
		VoUser currentUser = getCurrentUser(pm);
		Set<ServiceType> us = currentUser.getServices();
		if( null == us) {
            us = new HashSet<>();
            currentUser.setServices( us );
        }
		for (Entry<ServiceType, Boolean> nss : newServiceStauses.entrySet()) {
			if( us.contains( nss.getKey()) && !nss.getValue() ) us.remove(nss.getKey());
			else if( !us.contains( nss.getKey()) && nss.getValue() ) us.add(nss.getKey());
		}
		pm.makePersistent(currentUser);
	}

	@Override
	public boolean confirmUserAddress(String code) throws InvalidOperation, TException {
		PersistenceManager pm = PMF.getPm();
		VoUser user = getCurrentUser(pm);
		if( user.isAddressConfirmed() )
			return true;
		
		try {
			VoInviteCode inviteCode = VoInviteCode.getInviteCode(code, pm);
			boolean addrConfirmed = (inviteCode.getPostalAddressId() == user.getAddress());
			logger.info("User address ID="+user.getAddress()+" InviteCode address=" + inviteCode.getPostalAddressId() 
					+" So address confirmed=" + addrConfirmed);
			user.setAddressConfirmed(addrConfirmed);
			return addrConfirmed;
		} catch (Exception e) {
			logger.warning("Address not confirmed by code "+code+" for "+user+" Exception: "+e.getMessage());
			e.printStackTrace();
		}
		return false;
	}

	public static int getUsersCountByLocation(VoUserGroup group, PersistenceManager pm) {
		int radius = group.getRadius();
		int count =0;
		if( group.getGroupType() <= GroupType.BUILDING.getValue() ) {
			count = getUsersCountByGroup(group.getId(), pm);
		} else {
			String ufilter = "emailConfirmed=true AND ";
			BigDecimal latitudeMax = VoHelper.getLatitudeMax(group.getLatitude(), radius);
			BigDecimal latitudeMin = VoHelper.getLatitudeMin(group.getLatitude(), radius);
			BigDecimal longitudeMax = VoHelper.getLongitudeMax(group.getLongitude(), group.getLatitude(), radius);
			BigDecimal longitudeMin = VoHelper.getLongitudeMin(group.getLongitude(), group.getLatitude(), radius);
			ufilter += "longitude >= '" + longitudeMin + "' AND longitude <= '" + longitudeMax +
					"' AND latitude >= '" + latitudeMin + "' AND latitude <= '" + latitudeMax+"'";
			List<Long> ulist = executeQuery(pm.newQuery( "SQL", "SELECT count(*) FROM VOUSER WHERE "+ ufilter));
			count = ulist.get(0).intValue();
			
			List<Long> pgids = executeQuery(pm.newQuery("SQL","SELECT ID FROM VOUSERGROUP WHERE longitude='"
					+ group.getLongitude()+"' AND latitude='"+group.getLatitude()+"' AND groupType="+(group.getGroupType() - 1)));
			
			if( pgids.size() > 0 )
				count -= getUsersCountByLocation( pm.getObjectById(VoUserGroup.class, pgids.get(0)), pm);
			
		}
		
		return count;
	}

	private static int getUsersCountByGroup(long groupId, PersistenceManager pm) {
		List<Long> results = executeQuery(  pm.newQuery("SQL","SELECT count(*) FROM `USERGROUPS` as g JOIN VOUSER as u ON u.ID=g.ID WHERE `GROUP`="+groupId +" AND u.emailConfirmed=true") );
		return results.get(0).intValue();
	}

	@Override
	public List<String> getAddressListByGroupId(long groupId) throws InvalidOperation, TException {
		PersistenceManager pm = PMF.getPm();
		return getVIsibleNamesByGroup(groupId, pm);
	}

	public static List<String> getVIsibleNamesByGroup(long groupId, PersistenceManager pm) {
		Set<String> objects = new HashSet<String>();
		VoUserGroup group = pm.getObjectById(VoUserGroup.class, groupId);

		if (group.getGroupType() > GroupType.BUILDING.getValue()) {
			String filter = VoHelper.createFilterByLocation(group, group.getRadius());
			List<VoBuilding> bgs = (List<VoBuilding>) pm.newQuery(VoBuilding.class, filter).execute();
			for (VoBuilding b : bgs) {
				try {
					VoStreet vs = pm.getObjectById(VoStreet.class, b.getStreet());
					String streetName = vs.getName();
					objects.add(streetName + " " + b.getFullNo());
				} catch (Exception e) {					
					e.printStackTrace();
				}
			}
		} else if (group.getGroupType() == GroupType.BUILDING.getValue()) {
			List<VoBuilding> bgs = (List<VoBuilding>) pm.newQuery(VoBuilding.class,
					"longitude=='" + group.getLongitude() + "' && latitude=='" + group.getLatitude() + "'").execute();
			for (VoBuilding b : bgs) {
				try {
					VoStreet vs = pm.getObjectById(VoStreet.class, b.getStreet());
					String streetName = vs.getName();
					objects.add(streetName + " " + b.getFullNo());
				} catch (Exception e) {					
					e.printStackTrace();
				}
			}
		} else if (group.getGroupType() == GroupType.STAIRCASE.getValue()) {
			objects.add("Прадная №" + group.getStaircase());

		} else if (group.getGroupType() == GroupType.FLOOR.getValue()) {
			objects.add( group.getFloor() + " этаж");
		}
		return new ArrayList<String>(objects);
	}

	@Override
	public List<String> getAddressListByMessageId(long msgId) throws InvalidOperation, TException {
		PersistenceManager pm = PMF.getPm();
		try {
			return getVIsibleNamesByGroup( pm.getObjectById(VoTopic.class, msgId).getUserGroupId(), pm);
		} catch(Exception e){
			e.printStackTrace();
			return new ArrayList<String>();
		}
	}
}