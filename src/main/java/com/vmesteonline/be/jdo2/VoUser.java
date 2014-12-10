package com.vmesteonline.be.jdo2;

import com.vmesteonline.be.UserServiceImpl;
import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.postaladdress.VoBuilding;
import com.vmesteonline.be.jdo2.postaladdress.VoGeocoder;
import com.vmesteonline.be.jdo2.postaladdress.VoPostalAddress;
import com.vmesteonline.be.jdo2.postaladdress.VoStreet;
import com.vmesteonline.be.thrift.*;
import com.vmesteonline.be.utils.Defaults;

import javax.jdo.JDOObjectNotFoundException;
import javax.jdo.PersistenceManager;
import javax.jdo.annotations.*;
import java.math.BigDecimal;
import java.util.*;

@PersistenceCapable(detachable = "true")
@Indices({
        @Index(name="VOUSER_EML_IDX", members={"email"}),
        @Index(name="VOUSER_registered_IDX", members={"registered"}),
        @Index(name="VOUSER_GROUPS_IDX", members={"groups","emailConfirmed"})})

public class VoUser extends GeoLocation {

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
		return userFamily;
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
		return address;
	}
	
	public void setAddress( long addr) {
		address = addr;
	}

	public long getConfirmCode() {
		return 0 == confirmCode ? confirmCode = System.currentTimeMillis() % 98765 : confirmCode;
	}

	public void setConfirmCode(long confirmCode) {
		this.confirmCode = confirmCode;
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

	@Persistent(defaultFetchGroup = "true")
	private Long address;

	@Persistent(defaultFetchGroup = "true")
	private int birthday;

    @Persistent(table = "usergroups", defaultFetchGroup = "true")
    @Join(column = "id")
    @Element(column = "group")
	private List<Long> groups;

	@Persistent(defaultFetchGroup = "true")
	private int registered;

	@Persistent(defaultFetchGroup = "true")
	private String name;

	@Persistent(defaultFetchGroup = "true")
	private String lastName;

	@Persistent(defaultFetchGroup = "true")
	private int gender;

	@Persistent(defaultFetchGroup = "true")
	private String email;

	@Persistent(defaultFetchGroup = "true")
	private String password;

	@Persistent(defaultFetchGroup = "true")
	private int messagesNum;

	@Persistent(defaultFetchGroup = "true")
	private int topicsNum;

	@Persistent(defaultFetchGroup = "true")
	private int likesNum;

	@Persistent(defaultFetchGroup = "true")
	private int unlikesNum;

	@Persistent(defaultFetchGroup = "true")
	private long confirmCode;

	@Persistent(defaultFetchGroup = "true")
	private boolean emailConfirmed;

	@Persistent(defaultFetchGroup = "true")
	private String avatarMessage;

	@Persistent(defaultFetchGroup = "true")
	private String avatarTopic;

	@Persistent
	private String avatarProfile;

	@Persistent(defaultFetchGroup = "true")
	private String avatarProfileShort;

	@Persistent(defaultFetchGroup = "true")
	private String interests;

	@Persistent(defaultFetchGroup = "true")
	private String job;

	@Persistent(serialized = "true", defaultFetchGroup = "true")
	private UserFamily userFamily;

	@Persistent(defaultFetchGroup = "true")
	private String mobilePhone;

	@Persistent(defaultFetchGroup = "true")
	private RelationsType relations;

	@Persistent(serialized = "true",defaultFetchGroup = "true")
	private UserPrivacy privacy;

	@Persistent(defaultFetchGroup = "true")
	private int notificationsFreq;

	@Persistent(defaultFetchGroup = "true")
	private int importancy;

	@Persistent(defaultFetchGroup = "true")
	private int popularuty;

	@Persistent(defaultFetchGroup = "true")
	private int lastNotified;

	@Persistent(defaultFetchGroup = "true")
	private Set<Long> moderationGroups;
	
	@Persistent(defaultFetchGroup = "true")
	private long rootGroup;
	
	@Persistent(defaultFetchGroup = "true")
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
		return null == privacy ? new UserPrivacy(0L, GroupType.BUILDING, GroupType.STAIRCASE) : privacy;
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
}
