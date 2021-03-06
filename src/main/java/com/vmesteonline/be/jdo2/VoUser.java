package com.vmesteonline.be.jdo2;

import com.vmesteonline.be.UserServiceImpl;
import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.postaladdress.VoBuilding;
import com.vmesteonline.be.jdo2.postaladdress.VoGeocoder;
import com.vmesteonline.be.jdo2.postaladdress.VoPostalAddress;
import com.vmesteonline.be.jdo2.postaladdress.VoStreet;
import com.vmesteonline.be.jdo2.utility.VoCounter;
import com.vmesteonline.be.thrift.*;
import com.vmesteonline.be.thrift.utilityservice.CounterType;
import com.vmesteonline.be.utils.Defaults;

import javax.jdo.JDOObjectNotFoundException;
import javax.jdo.PersistenceManager;
import javax.jdo.annotations.*;

import java.math.BigDecimal;
import java.util.*;

@PersistenceCapable
@Indices({
        @Index(name="VOUSER_EML_IDX", members={"email"}),
        @Index(name="VOUSER_registered_IDX", members={"registered"}),
        @Index(name="VOUSER_GROUPS_IDX", members={"groups","emailConfirmed"})})
@Discriminator(strategy=DiscriminatorStrategy.CLASS_NAME)
public class VoUser extends GeoLocation implements Comparable<VoUser> {

	public static int BASE_USER_SCORE = 100;

	private static VoUserGroup defaultGroup;
	static {
		PersistenceManager pm = PMF.getPm();
		try {
			defaultGroup = VoUserGroup.createVoUserGroup(new BigDecimal("60.0"), new BigDecimal("30.0"), 
					10000,(byte)0,(byte)0, "Мой Город", 10000, GroupType.TOWN.getValue(), pm);
			
		} catch (InvalidOperation e) {
			e.printStackTrace();
		} 
	}

	public VoUserGroup getGroup(GroupType gt, PersistenceManager pm) {
		for( Long gid: groups){
			VoUserGroup ug = pm.getObjectById( VoUserGroup.class, gid );
			if( ug.getGroupType() == gt.getValue() )
				return ug;
		}
		return null;
	}

	public VoUser(String name, String lastName, String email, String password) {
		this.name = name;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.messagesNum = 0;
		this.topicsNum = 0;
		this.likesNum = 0;
		this.unlikesNum = 0;
		this.confirmCode = 0;
		this.confirmMailCode = 0;
		this.emailConfirmed = false;
		this.avatarMessage = Defaults.defaultAvatarTopicUrl;
		this.avatarTopic = Defaults.defaultAvatarTopicUrl;
		this.avatarProfile = Defaults.defaultAvatarProfileUrl;
		this.avatarProfileShort = Defaults.defaultAvatarShortProfileUrl;
		this.relations = RelationsType.UNKNOWN;
		this.notificationsFreq = NotificationFreq.DAYLY.getValue();
		this.importancy = BASE_USER_SCORE;
		this.popularuty = BASE_USER_SCORE;
		this.lastNotified = this.registered = (int) (System.currentTimeMillis() / 1000L);
		this.rootGroup = 0L;
	}

	public UserProfile getUserProfile() {
		UserProfile up = new UserProfile();
		up.contacts = getContacts();
		up.userInfo = getUserInfo();
		up.family = getUserFamily();
		up.privacy = getPrivacy();
		up.interests = new UserInterests(getInterests(), getJob());
		up.importancy = getImportancy();
		up.populatity = getPopularuty();

		return up;
	}

	public boolean isAddressConfirmed(){
		return (rootGroup & 0x1L) != 0L;
	}

	public void setAddressConfirmed( boolean conf){
		if(conf)
			rootGroup |= 0x1L;
		else
			rootGroup -= rootGroup & 0x1L;

	}
	public UserFamily getUserFamily() {
		try{ 
			return userFamily;
		} catch(RuntimeException rte){
			return userFamily = new UserFamily();
			
		}
	}
	
	public int getRegistered() {
		return registered;
	}

	public UserContacts getContacts() {
		return new UserContacts(getId(), UserStatus.CONFIRMED, null, mobilePhone, email);
	}

	public void setBirthday(int birthday) {
		this.birthday = birthday;
	}

	public void setRelations(RelationsType relations) {
		this.relations = relations;
	}

	public ShortUserInfo getShortUserInfo( PersistenceManager pm) {
		
		return new ShortUserInfo(getId(), name, lastName, birthday, getAvatarTopic(), null, null==services ? new HashSet<ServiceType>() : services, isAddressConfirmed());
	}

	public ShortUserInfo getShortUserInfo( VoUser askedUser, PersistenceManager pm) {
		
		ShortUserInfo shortUserInfo = new ShortUserInfo(getId(), name, lastName, birthday, getAvatarTopic(), null, null==services ? new HashSet<ServiceType>() : services, isAddressConfirmed());
		if( null!=askedUser )
			if( askedUser != this)
				shortUserInfo.setGroupType( UserServiceImpl.getRelations( askedUser, this, pm ));
			else 
				shortUserInfo.setGroupType( GroupType.FLAT );
		
		if (null != moderationGroups)
			shortUserInfo.moderationGroups = moderationGroups;
		return shortUserInfo;
	}

	public UserInfo getUserInfo() {
		return new UserInfo(getId(), name, lastName, birthday, gender, avatarProfile);
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<Long> getGroups() {
		return groups;
	}

	public void setGroups(List<Long> groups) {
		this.groups = groups;
	}

	public void updateLikes(int likesDelta) {
		likesNum += likesDelta;
	}

	public void updateUnlikes(int unlikesDelta) {
		unlikesNum += unlikesDelta;
	}

	public void incrementMessages(int msgsDelta) {
		messagesNum += msgsDelta;
	}

	public void incrementTopics(int topicsDelta) {
		topicsNum += topicsDelta;
	}

	public long getAddress() {
		return null==address ? 0 : address;
	}
	
	public void setAddress( long addr) {
		address = addr;
	}

	public long getConfirmCode() {
		return 0 == confirmCode ? confirmCode = System.currentTimeMillis() % 98765 : confirmCode;
	}

	public long getConfirmMailCode() {
		return 0 == confirmMailCode ? confirmMailCode = System.currentTimeMillis() % 897546 : confirmMailCode;
	}

	public void setConfirmCode(long confirmCode) {
		this.confirmCode = confirmCode;
	}

	public void setConfirmMailCode(long confirmMailCode) {
		this.confirmMailCode = confirmMailCode;
	}
	public int getLastNotified() {
		return lastNotified;
	}

	public void setLastNotified(int lastNotified) {
		this.lastNotified = lastNotified;
	}

	public VoPostalAddress setLocation(long locCode, PersistenceManager pm) throws InvalidOperation {
		try {
			VoPostalAddress userAddress = pm.getObjectById(VoPostalAddress.class, locCode);
			setCurrentPostalAddress(userAddress, pm);
			setAddressConfirmed(true);
			return userAddress;
		} catch (JDOObjectNotFoundException eonf) {
			throw new InvalidOperation(VoError.IncorrectParametrs, "Location not found by CODE=" + locCode);
		}
	}

	/**
	 * MEthod set current postal address of the user and register user in the building
	 * 
	 * @param userAddress
	 *          newUSer postal address
	 * @param pm
	 *          - PersistenceManager to manage the objects
	 * @throws InvalidOperation 
	 */

	// TODO should test removing
	public void setCurrentPostalAddress(VoPostalAddress userAddress, PersistenceManager pm) throws InvalidOperation {

		// building from new address
		VoBuilding building = pm.getObjectById(VoBuilding.class, userAddress.getBuilding());

		// check if location is set
		if (null == building.getLatitude() || 0 == building.getLatitude().intValue()) {
			try {
				VoGeocoder.getPosition(building, false,pm);
				pm.makePersistent(building);

			} catch (InvalidOperation e) {
				e.printStackTrace();
			}
		}

    setAddress(userAddress.getId());
		longitude = building.getLongitude().toPlainString();
		latitude = building.getLatitude().toPlainString();

		Vector<Long> groups = new Vector<>();
		for ( int gid = Defaults.getDefaultGroups().size(); gid>0; gid--  ) {
			VoGroup group = Defaults.getDefaultGroups().get(gid - 1);
			VoUserGroup ug = VoUserGroup.createVoUserGroup(building.getLongitude(), building.getLatitude(), 
					group.getRadius(), userAddress.getStaircase(), userAddress.getFloor(),
					group.getVisibleName(), group.getImportantScore(), group.getGroupType(), pm);

			UserServiceImpl.usersByGroup.forget( new Object[]{ ug.getId() });
			groups.add(ug.getId());
		}
		Collections.reverse(groups);
    setGroups( groups );
		pm.makePersistent(this);
	}

	// *****
	public void setDefaultUserLocation(PersistenceManager pm) {

		groups = new ArrayList<Long>();
		groups.add(defaultGroup.getId());
		pm.makePersistent(this);
	}

	public boolean isEmailConfirmed() {
		return emailConfirmed;
	}

	public void setEmailConfirmed(boolean emailConfirmed) {
		this.emailConfirmed = emailConfirmed;
	}

	
	public String getAddressString( GroupType gt, PersistenceManager pm){
		boolean needUpdate = false;
		try {
			if (null == addressStringsByGroupType) {
				addressStringsByGroupType = new HashMap<Integer, String>();
			}
		} catch( Exception e){
			addressStringsByGroupType = new HashMap<Integer, String>();
		}
		int gtValue = gt.getValue();
		String as = addressStringsByGroupType.get(gtValue);
		if( needUpdate = null==as ){
			VoPostalAddress userAddress = pm.getObjectById( VoPostalAddress.class, getAddress());
			switch( gt ){
			case NEIGHBORS:
			{
				VoBuilding b = pm.getObjectById(VoBuilding.class,userAddress.getBuilding());
				VoStreet s = pm.getObjectById(VoStreet.class, b.getStreetId());
				as = s.getName() + " " + b.getFullNo();
				break;
			}
			case BUILDING:
				as = userAddress.getStaircase() == 0 ? "" : ( "парадная №"+userAddress.getStaircase());
				break;
			case STAIRCASE:
				as = userAddress.getFloor() == 0 ? "" : (userAddress.getFloor() + " этаж");
				break;
			case FLOOR:
				as = userAddress.getFlatNo() == 0 ? "" : ("квартира №"+userAddress.getFlatNo());
				break;
			}
			if( null!=as )
				addressStringsByGroupType.put(gtValue, as);
		}
		if( needUpdate && null!=as )
			pm.makePersistent(this);
		return as;
	}


/*	@PrimaryKey
	@Persistent(valueStrategy = IdGeneratorStrategy.INCREMENT)
	protected long id;*/

	public void setAddressStringsByGroupType(Map<Integer, String> addressStringsByGroupType) {
		this.addressStringsByGroupType = addressStringsByGroupType;
	}


	@Persistent
	private Long address;

	@Persistent
	private int birthday;

    @Persistent(table = "usergroups", defaultFetchGroup = "true")
    @Join(column = "id")
    @Element(column = "group")
	private List<Long> groups;

	@Persistent
	private int registered;

	@Persistent
	private String name;

	@Persistent
	private String lastName;

	@Persistent
	private int gender;

	@Persistent
	private String email;

	@Persistent
	private String password;

	@Persistent
	private int messagesNum;

	@Persistent
	private int topicsNum;

	@Persistent
	private int likesNum;

	@Persistent
	private int unlikesNum;

	@Persistent
	private long confirmCode;

	@Persistent
	private long confirmMailCode;

	@Persistent
	private boolean emailConfirmed;

	@Persistent
	private String avatarMessage;

	@Persistent
	private String avatarTopic;

	@Persistent
	private String avatarProfile;

	@Persistent
	private String avatarProfileShort;

	@Persistent
	private String interests;

	@Persistent
	private String job;

	@Persistent
	private UserFamily userFamily;

	@Persistent
	private String mobilePhone;

	@Persistent
	private RelationsType relations;

	@Persistent
	private UserPrivacy privacy;

	@Persistent
	private int notificationsFreq;

	@Persistent
	private int importancy;

	@Persistent
	private int popularuty;

	@Persistent
	private int lastNotified;

	@Persistent
	private Set<Long> moderationGroups;
	
	@Persistent
	private long rootGroup;
	
	@Persistent
    @Serialized
	private Set<ServiceType> services;
	
	@Persistent
    @Serialized
	private Map<Integer, String> addressStringsByGroupType;
	
	//map that stores last event date that was shown to user by category

	@Persistent
	private int lastMulticastShown;
	
	@Persistent
	private int lastImportantShown;
	
	public Set<ServiceType> getServices() {
		return services;
	}

	public void setServices(Set<ServiceType> services) {
		this.services = services;
	}

	public int getLastMulticastShown() {
		return lastMulticastShown;
	}

	public void setLastMulticastShown(int lastMulticastShown) {
		this.lastMulticastShown = lastMulticastShown;
	}

	public int getLastImportantShown() {
		return lastImportantShown;
	}

	public void setLastImportantShown(int lastImportantShown) {
		this.lastImportantShown = lastImportantShown;
	}

	public UserPrivacy getPrivacy() {
		
		try {
			return null == privacy ? privacy = new UserPrivacy(0L, GroupType.BUILDING, GroupType.STAIRCASE) : privacy;
		} catch (RuntimeException e) {
			return privacy = new UserPrivacy(0L, GroupType.BUILDING, GroupType.STAIRCASE);
		}
	}

	public void setPrivacy(UserPrivacy privacy) {
		this.privacy = privacy;
	}

	public int getMessagesNum() {
		return messagesNum;
	}

	public void setMessagesNum(int messagesNum) {
		this.messagesNum = messagesNum;
	}

	public int getLikesNum() {
		return likesNum;
	}

	public void setLikesNum(int likesNum) {
		this.likesNum = likesNum;
	}

	public String getInterests() {
		return interests;
	}

	public void setInterests(String interests) {
		this.interests = interests;
	}

	public String getJob() {
		return job;
	}

	public void setJob(String job) {
		this.job = job;
	}

	public int getBirthday() {
		return birthday;
	}

	public String getAvatarMessage() {
		return avatarMessage;
	}

	public void setAvatarMessage(String avatarMessage) {
		this.avatarMessage = avatarMessage;
	}

	public String getAvatarTopic() {
		return avatarTopic;
	}

	public void setAvatarTopic(String avatarTopic) {
		this.avatarTopic = avatarTopic;
	}

	public String getAvatarProfile() {
		return avatarProfile;
	}

	public void setAvatarProfile(String avatarProfile) {
		this.avatarProfile = avatarProfile;
	}

	public String getAvatarProfileShort() {
		return avatarProfileShort;
	}

	public void setAvatarProfileShort(String avatarProfileShort) {
		this.avatarProfileShort = avatarProfileShort;
	}

	public int getTopicsNum() {
		return topicsNum;
	}

	public void setTopicsNum(int topicsNum) {
		this.topicsNum = topicsNum;
	}

	public int getUnlikesNum() {
		return unlikesNum;
	}

	public void setUnlikesNum(int unlikesNum) {
		this.unlikesNum = unlikesNum;
	}

	public int getGender() {
		return gender;
	}

	public void setGender(int gender) {
		this.gender = gender;
	}

	public RelationsType getRelations() {
		return relations;
	}

	public void setUserFamily(UserFamily userFamily) {
		this.userFamily = userFamily;
	}

	public String getMobilePhone() {
		return mobilePhone;
	}

	public void setMobilePhone(String mobilePhone) {
		this.mobilePhone = mobilePhone;
	}

	@Override
	public String toString() {
		return "VoUser [id=" + getId() + ", name=" + name + ", email=" + email + "]";
	}

	public Notifications getNotificationFreq() {
		return new Notifications(email, NotificationFreq.findByValue(notificationsFreq));
	}

	public void setNotifications(Notifications ntf) throws InvalidOperation {
		if (null != ntf.email && ntf.email.trim().length() != 0 && !ntf.email.trim().equals(email)) {
			if (!ntf.email.trim().matches(UserServiceImpl.emailreg))
				throw new InvalidOperation(VoError.IncorrectParametrs, "Invalid email '" + ntf.email + "'");
			setEmail(ntf.email.trim());
		}
		if (NotificationFreq.findByValue(notificationsFreq) != ntf.freq)
			setNotificationsFreq(ntf.freq.getValue());
	}

	public int getNotificationsFreq() {
		return notificationsFreq;
	}

	public void setNotificationsFreq(int notificationsFreq) {
		this.notificationsFreq = notificationsFreq;
	}

	public String toFullString() {
		return "VoUser [id=" + getId() + ", name=" + name + ", lastName=" + lastName + ", email=" + email + ", password="
				+ password + "]";
	}

	public int getImportancy() {
		return importancy;
	}

	public void setImportancy(int importancy) {
		this.importancy = importancy;
	}

	public int getPopularuty() {
		return popularuty;
	}

	public void setPopularuty(int popularuty) {
		this.popularuty = popularuty;
	}

	public boolean isGroupModerator(long groupId) {
		return null != moderationGroups && moderationGroups.contains(groupId);
	}

	public void setGroupModerator(long groupId, boolean makeModerator) {
		if (null == moderationGroups)
			moderationGroups = new HashSet<Long>();
		if (makeModerator)
			moderationGroups.add(groupId);
		else
			moderationGroups.remove(groupId);
	}
	
	protected void determineLocation() {
		if( address == 0 ){
			super.determineLocation();
			return; 
		}
		
		PersistenceManager pm = PMF.getPm();
		VoBuilding building;
		
		try {
			building = pm.getObjectById(VoBuilding.class, pm.getObjectById(VoPostalAddress.class, address).getBuilding());
			longitude = building.getLongitude().toString();
			latitude = building.getLatitude().toString();
		} catch (Exception e) {
			super.determineLocation();
			return;
		}
		
	}

	public static boolean isHeTheBigBro(VoUser user) {
		return null!=user && "info@vmesteonline.ru".equalsIgnoreCase(user.getEmail());
	}

	public boolean isTheBigBro() {
		return isHeTheBigBro(this);
	}

	@Override
	public int compareTo(VoUser that) {
		return Long.compare(this.id, that.id);
	}

	public String enableCountersFor(ArrayList<CounterType> defaultCounterTypes, PersistenceManager pm) {
		String resultText = "";
		Set<ServiceType> services = getServices();
		if (null == services)
			services = new HashSet<>();
		else
			services = new HashSet<>(services);
		
		if (!services.contains(ServiceType.CountersEnabled)) {
			services.add(ServiceType.CountersEnabled);
			setServices(services);
			pm.makePersistent(this);
			resultText += "<br/> Enabled for: " + getName() + " " + getLastName();
			long address = getAddress();
			for( CounterType ct : defaultCounterTypes)
				pm.makePersistent(new VoCounter(ct, "", "", address));
			
		} else {
			resultText += "<br/> " + getName() + " " + getLastName() + "Already has Counters enables";
		}		
		return resultText;
	}
}
