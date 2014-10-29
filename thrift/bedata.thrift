namespace * com.vmesteonline.be.thrift

struct Country {
	1:i64 id,
	2:string name
}

struct City {
	1:i64 id,
	2:i64 countryId,
	3:string name
}

struct Street {
	1:i64 id,
	2:i64 cityId,
	3:string name
}

struct Building {
	1:i64 id,
	2:string zip;
	3:i64 streetId,
	4:string fullNo
}

struct PostalAddress {
	1:Country country,
	2:City city,
	3:Street street,
	4:Building building, 
	5:byte staircase,
	6:byte floor,
	7:i32 flatNo,
	8:string comment
}

struct UserLocation{
	1:string address,
	2:string locationId,
	3:string mapUrl
}

enum GroupType { NOBODY=0, FLAT=1, FLOOR=2, STAIRCASE=3, BUILDING=4, NEIGHBORS=5, BLOCK=6, DISTRICT=7, TOWN=8 }
enum ServiceType { CountersEnabled=10, CountersConfirmed=11, CountersNotification=12 }

struct ShortUserInfo{
	1: i64 id,
	2: string firstName,
	3: string lastName,
	4: i32 rating
	5: string avatar,
	6: GroupType groupType,
	7: optional set<i64> moderationGroups,
	8: optional string address,
	9: set<ServiceType> services,
}

struct ShortProfile{
	1: i64 id,
	2: string firstName,
	3: string lastName,
	4: i32 rating
	5: string avatar,
	6: string address,
	7: string balance,
}

enum UserStatus { UNCONFIRMED=0, CONFIRMED=1, REQUESTED=2, WAIT_CONFIRMATION=3, HIDE=4 }

struct UserInfo{
	1: i64 userId,
	2: string firstName,
	3: string lastName,
	4: i32 birthday,
	5: i32 gender,
	6: string avatar
}

struct UserPrivacy{
	1: i64 userId,
	2: GroupType profile,
	3: GroupType contacts
}

struct UserContacts{
	1: i64 userId,
	2: UserStatus addressStatus,
	3: PostalAddress homeAddress,
	4: string mobilePhone,
	5: string email, 
}

struct Children{
	2: string name,
	3: i32 birthday
}

enum PetType { CAT=0, DOG=1, BIRD=2, OTHER=3}

struct Pet{
	1: string name,
	2: PetType type,
	3: string breed
}

enum RelationsType { MARRIED=0, NOTMARRIED=1, UNKNOWN=3 }
struct UserFamily{

	2: RelationsType relations,
	3: list<Children> childs,
	4: list<Pet> pets,
}

struct UserInterests{
	1: string userInterests,
	2: string job,
}

enum NotificationFreq { DAYLY=2, TWICEAWEEK=4, WEEKLY=8, NEVER=128 }
struct Notifications {
	1:string email,
	2:NotificationFreq freq,
}

struct UserProfile {
	1: UserInfo userInfo,
	2: UserContacts contacts,
	3: UserFamily family,
	4: UserPrivacy privacy, 
	5: UserInterests interests,
	6: Notifications notifications,
	7: i32 importancy,
	8: i32 populatity,
}

struct Group {
	1: i64 id,
	2: string visibleName,
	3: string name,
	4: string description,
	5: i32 radius,
	6: GroupType type;
}

struct Rubric{
	1: i64 id,
	2: string visibleName,
	3: string name,
	4: string description,
}

struct MatrixAsList {
	1:i32 rowCount,
	2:list<string> elems
}

struct IdName {
	1:i64 id,
	2:string name,
}

struct IdNameChilds {
	1:i64 id,
	2:string name,
	3:list<IdName> childs,
}


