namespace * com.vmesteonline.be.thrift.userservice
include "bedata.thrift"
include "error.thrift"


struct FullAddressCatalogue {
	1:set<bedata.Country> countries,
	2:list<bedata.City> cities,
	3:list<bedata.Street> streets,
	4:list<bedata.Building> buildings
}

struct GroupLocation {
	1:string longitude,
	2:string latitude,
	3:i32 radius,
	4:bedata.GroupType type,
}
service UserService {

//получение групп пользователя
	list<bedata.Group> getUserGroups() throws (1:error.InvalidOperation exc),
	list<bedata.Rubric> getUserRubrics() throws (1:error.InvalidOperation exc),	
	
	bool setUserAddress( 1:bedata.PostalAddress newAddress )throws (1:error.InvalidOperation exc),
	bool addUserAddress( 1:bedata.PostalAddress newAddress )throws (1:error.InvalidOperation exc),
	void deleteUserAddress(1:bedata.PostalAddress newAddress) throws (1:error.InvalidOperation exc),
	set<bedata.PostalAddress> getUserAddresses() throws (1:error.InvalidOperation exc),
	
	bedata.PostalAddress getUserHomeAddress() throws (1:error.InvalidOperation exc),
	
//для отображения короткой информации о пользователе в верху страницы самому пользователю. 
	bedata.ShortUserInfo getShortUserInfo() throws (1:error.InvalidOperation exc),
//для отображения короткой информации о пользователе в сообщениях, топиках и т.д. другим пользователям
	bedata.ShortProfile getShortProfile() throws (1:error.InvalidOperation exc),

//для отображения контактов пользователя на странице профайла. 
	bedata.UserContacts getUserContacts() throws (1:error.InvalidOperation exc),
	bedata.UserContacts getUserContactsExt(1:i64 userId) throws (1:error.InvalidOperation exc),
	
//для обновления пользовательского аватара в профайле. 
	void updateUserAvatar(1:string url) throws (1:error.InvalidOperation exc),
	
	
	bedata.UserProfile getUserProfile(1:i64 userId) throws (1:error.InvalidOperation exc),
	
	//для изменения информации о пользователе на странице профайла. 
	void updateUserInfo(1:bedata.UserInfo userInfo) throws (1:error.InvalidOperation exc),
	void changePassword(1:string oldPwd, 2:string newPwd) throws (1:error.InvalidOperation exc),
	void updatePrivacy(1:bedata.UserPrivacy privacy) throws (1:error.InvalidOperation exc),
	
	//для изменения контактов пользователя на странице профайла. 
	void updateContacts(1:bedata.UserContacts contacts) throws (1:error.InvalidOperation exc),
	void updateFamily(1:bedata.UserFamily family) throws (1:error.InvalidOperation exc),
	void updateInterests(1:bedata.UserInterests interests) throws (1:error.InvalidOperation exc),
	void updateNotifications(1:bedata.Notifications notifications) throws (1:error.InvalidOperation exc),
		
	
	list<bedata.Country> getCounties() throws (1:error.InvalidOperation exc),
	list<bedata.City> getCities(1:i64 countryId) throws (1:error.InvalidOperation exc),
	list<bedata.Street> getStreets(1:i64 cityId) throws (1:error.InvalidOperation exc),
	list<bedata.Building> getBuildings(1:i64 streetId) throws (1:error.InvalidOperation exc),
	FullAddressCatalogue getAddressCatalogue() throws (1:error.InvalidOperation exc),
	
	bedata.Country createNewCountry( 1:string name) throws (1:error.InvalidOperation exc),
	bedata.City createNewCity( 1:i64 countryId, 2:string name) throws (1:error.InvalidOperation exc),
	bedata.Street createNewStreet( 1:i64 cityId, 2:string name) throws (1:error.InvalidOperation exc),
	bedata.Building createNewBuilding( 1:string zip, 2:i64 streetId, 3:string fullNo, 4:string longitude, 5:string lattitude) throws (1:error.InvalidOperation exc),
	
	list<bedata.ShortUserInfo> getNeighbours() throws (1:error.InvalidOperation exc),
	list<bedata.ShortUserInfo> getNeighboursByGroup(1:i64 groupId) throws (1:error.InvalidOperation exc),
	
	//возвращает ссылку на карту в зависмотси от выбраной группы
	string getGroupMap(1:i64 groupId, 2:string color) throws (1:error.InvalidOperation exc),
	GroupLocation getGroupView(1:i64 groupId) throws (1:error.InvalidOperation exc),
	void updateUserAddress( 1:i32 staircase, 2:i32 floor, 3:i32 flatNo) throws (1:error.InvalidOperation exc),
	
	void updateUserServices( 1:map<bedata.ServiceType,bool> newServiceStauses ) throws (1:error.InvalidOperation exc),
}