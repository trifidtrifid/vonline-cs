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
	6:string	logoURL,
	7:list<string>	imageURLs,
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
}

struct Statistics {
	1:i32 usersInRange,
	2:i32 usersVisited,
	3:i32 lastVisited,
}

service BuisinessService {
	BusinessDescription getMyBusinessInfo(), //возвращает описание для текущего пользователя
	list<BusinessInfo> getBusinessList(1:bedata.GroupType groupType, 2:i64 rubricId) , //возвращает информацию по бизнесам в радицсе задано	 группы от текузего пользователя
	BusinessDescription getBusinesDescription(1:i64 buisinessId),
	BusinessDescription createBusinesDescription(1:BusinessDescription description),
	BusinessDescription updatrBusinesDescription(1:BusinessDescription newDescription),
	messageservice.WallItem	getWallItem( 1:i64 businessId ),	
}




