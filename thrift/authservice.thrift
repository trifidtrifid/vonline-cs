namespace * com.vmesteonline.be.thrift.authservice
include "bedata.thrift"
include "error.thrift"

enum CurrentAttributeType { 
	/* FORUM ATTRIBUTES*/ CATEGORY=1, RUBRIC=2, GROUP=3 
}

enum LoginResult { NOT_MATCH=0, SUCCESS=1, EMAIL_NOT_CONFIRMED=3}


service AuthService {

	LoginResult login( 1:string email, 2:string password ) throws (1:error.InvalidOperation exc),
	i64 registerNewUser(1:string firstname, 2:string lastname, 3:string password, 4:string email, 5:string inviteCode, 6:i32 gender) throws (1:error.InvalidOperation exc),
	void logout() throws (1:error.InvalidOperation exc),
	bedata.UserLocation checkInviteCode(1:string code) throws (1:error.InvalidOperation exc),
	string requestInviteCode(1:string address, 2:string email),	
	
	
	bool checkEmailRegistered(1:string email),
	bool checkIfEmailConfirmed(1:string email),
	void sendConfirmCode(1:string to, 2:string resourcefileName) throws (1:error.InvalidOperation exc),
	void confirmRequest(1:string email, 2:string confirmCode, 3:string newPassword) throws (1:error.InvalidOperation exc),
	
	//session as a storage of current user position
	void setCurrentAttribute( 1:map<i32,i64> typeValueMap) throws (1:error.InvalidOperation exc),
	map<i32,i64> getCurrentAttributes( ) throws (1:error.InvalidOperation exc),
	
	//восстановление пароля
	bool remindPassword(1:string emal),
	bool checkRemindCode(1:string remindeCode,2:string emal),
	bool changePasswordByRemidCode(1:string remindCode, 2:string emal, 3:string newPwd),
	
	bool checkIfAuthorized() throws (1:error.InvalidOperation exc),

	i64 registerNewUserByAddress(1:string firstname, 2:string lastname, 3:string password, 4:string email, 5:string addressString, 6:i16 gender) throws (1:error.InvalidOperation exc),
	bool emailRegistered(1:string email) throws (1:error.InvalidOperation exc),
}