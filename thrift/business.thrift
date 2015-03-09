namespace * com.vmesteonline.be.thrift.businesservice
include "bedata.thrift"
include "error.thrift"
include "messageservice.thrift"

struct BusinessDescription {
	1:i64 		id,
	2:string 	shortName,
	3:string	fullName,
	4:string	shortInfo,
	5:string	fullInfo,
	6:messageservice.Attach	logo,
	7:list<messageservice.Attach>	images,
	8:string 	address,
	9:string 	longitude,
	10:string 	latitude,
	11:i32 		radius,	
}

struct BusinessInfo {
	1:i64 		id,
	2:string 	shortName,
	3:string	shortInfo,
	4:string	logoURL,
	5:string 	address,
	6:i32		distance,	
}

struct Statistics {
	1:i32 usersInRange,
	2:i32 usersVisited,
	3:i32 lastVisited,
}

service BusinessService {
	BusinessDescription getMyBusinessInfo(), //возвращает описание для текущего пользователя
	list<BusinessInfo> getBusinessList(1:bedata.GroupType groupType, 2:i64 rubricId) , //возвращает информацию по бизнесам в радисе заданом для группы текущего пользователя
	BusinessDescription getBusinessDescription(1:i64 businessId),
	BusinessDescription createBusinessDescription(1:BusinessDescription description, 2:string email, 3:string password),
	BusinessDescription updateBusinessDescription(1:BusinessDescription newDescription),
	messageservice.WallItem	getWallItem( 1:i64 businessId ),	
}




