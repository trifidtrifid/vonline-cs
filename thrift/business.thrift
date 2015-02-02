namespace * com.vmesteonline.be.thrift.userservice
include "bedata.thrift"
include "error.thrift"

enum FieldType { NOT_MATCH=0, SUCCESS=1, EMAIL_NOT_CONFIRMED=3, USER_IS_COMERC=4 }

struct BusinessDescription {
	1:i64 		id,
	2:string 	shortName,
	3:string	fullName,
	4:string	description,
	5:string	logoURL,
	6:list<string>	images,
	7:bedata.
	7:string 	www,
	8:string 	email,
	9:list<string>	contactInfo,
	10:string	openHours	
}


