include "bedata.thrift"
include "error.thrift"
namespace * com.vmesteonline.be.thrift.messageservice

enum MessageType { BASE=1, DIALOG=2, SHOP=3, NEWS=4, WALL=5, ADVERT=6, BLOG=7, BUSINESS_PAGE=8 }

struct MessageLink {
	1: MessageType linkType,
	2: i64 linkedId
}

struct UserMessage {
	1: bool isread, //флаг прочитанности сообщения пользователем
	2: bool likes,
	3: bool unlikes 
}

struct Attach {
	1:string fileName,
	2:string contentType,
	3:string URL
}

enum Mark { POSITIVE=1, NOTMARKED=2, NEGATIVE=3 }

struct Message {
	1: i64 id,
	2: i64 parentId, // 'идентификатор родительского сообщения, NULL для корневого со',
	3: MessageType type, // 'тип один из (сообщение, чат)',
	4: i64 topicId,
	5: i64 groupId,	
	6: i64 authorId, //'автор сообщения или темы' TODO удалить этот мембер и использовать userInfo
	7: optional i64 recipientId, // 'адресат задан только для личных сообщений, иначе NULL',
	8: i32 created, // 'дата создания',
	9: i32 edited,
	10: optional i64 approvedBy, // 'идентификатор пользователя промодерировавшего сообщение',
	11: string content, // 'содержание сообщения',
	12: i32 likesNum,
	13: i32 unlikesNum,
	14: map<MessageType,i64> linkedMessages,
	15: map<i64,string> tags, //идентификаторы тегов с их значениями
	16: UserMessage userMessage, //how user treats the message
	17: i32 offset, //смещение сообщения для формирования древовидной структуры
	18: bedata.ShortUserInfo userInfo,
	19: list<Attach> images, 
	20: list<Attach> documents,
	21: string anonName 
	22: Mark important,
	23: Mark like,
	24: i32 childCount,
	25: bool canChange
} // 'сообщение';
		

struct UserTopic {
	1: bool archieved,
	2: bool unlikes,
	3: bool likes, 
	4: bool notIntrested, 
	5: i64 lastReadMessageId,
	6: i64 lastWroteMeessgeId,
	7: bool isread
}

struct Poll {
	1:	i64 pollId,
	2:	list<string> names,
	3:	list<i32> values,
	4: 	string subject,
	5:	bool alreadyPoll
}

struct Topic {
	1: i64 id,
	2: string subject, 
	3: Message message, // 'сообщение',
	4: i32 messageNum, // 'число сообщений в теме',
	5: i32 viewers, // 'число пользоателей, просматривающих сообщение',
	6: i32 usersNum, // 'число пользователей оставивших сообщения в теме',
	7: i32 lastUpdate, //'время создания последнего дочернего сообщения',
	8: i32 likesNum, 
	9: i32 unlikesNum,
	10: optional i64 rubricId, //ссылка на рубрику
	11: optional i64 communityId, //ссылка на сообщество
	12: UserTopic usertTopic,
	13: bedata.ShortUserInfo userInfo,
	14: Poll poll, 	
	15: bedata.GroupType groupType,
	16: bool canChange
}

struct TopicListPart {
	1:list<Topic> topics,
	2:i32	totalSize //size of full list
} 

struct MessageListPart {
	1:list<Message> messages,
	2:i32	totalSize //size of full list
} 

struct UserOpinion {
	1: i32 likes,
	2: i32 dislikes,
}

struct WallItem {
	1:list<Message> messages,
	2:Topic topic,
}

struct Dialog {
	1:i64 id,
	2:list<bedata.ShortUserInfo> users,
	3:i32 createDate,
	4:i32 lastMessageDate,
}
struct DialogMessage {
	1:i64 id,
	2:i64 dialogId,
	3:i64 author,
	4:string content,
	5:i32 created,
	6: list<Attach> images, 
	7: list<Attach> documents,  
}

service DialogService {
	//DIALOGUE implementation methods
	//method returns dilaog ID that just created or thorw an exception if a parameter is incorrect
	Dialog getDialog( 1:list<i64> users, 2:i32 before ) throws (1:error.InvalidOperation exc),
	Dialog getDialogById( 1:i64 dialogId ) throws (1:error.InvalidOperation exc),
	list<Dialog> getDialogs(1:i32 before ) throws (1:error.InvalidOperation exc),
	list<DialogMessage> getDialogMessages( 1:i64 dialogID, 2:i32 afterDate, 3:i32 tailSize, 4:i64 lastLoadedId) throws (1:error.InvalidOperation exc),
	DialogMessage postMessage( 1:i64 dialogId, 2:string content, 3:list<Attach> attachments ) throws (1:error.InvalidOperation exc),
	void updateDialogMessage( 1:i64 dlgMsgId, 2:string content, 3:list<Attach> attachments ) throws (1:error.InvalidOperation exc),
	void deleteDialogMessage( 1:i64 dlgMsgId ) throws (1:error.InvalidOperation exc),
	void addUserToDialog(1:i64 dialogId, 2:i64 userId) throws (1:error.InvalidOperation exc),
	void removeUserFromDialog(1:i64 dialogId, 2:i64 userId) throws (1:error.InvalidOperation exc),
	//-------------------------------------------
}

service MessageService {

	void sendInfoEmail(1:string email, 2:string name, 3:string content) throws (1:error.InvalidOperation exc),

	list<WallItem> getWallItems(1:i64 groupId, 2:i64 lastLoadedIdTopicId, 3:i32 length) throws (1:error.InvalidOperation exc)

/**
* Cоздание нового или обновление старого сообщения
**/	 
	Message postMessage( 1:Message msg ) throws (1:error.InvalidOperation exc),
	Message deleteMessage( 1:i64 msgId ) throws (1:error.InvalidOperation exc),


	Poll doPoll( 1:i64 pollId, 2:i32 item) throws (1:error.InvalidOperation exc),
	Topic postTopic( 1: Topic topic ) throws (1:error.InvalidOperation exc),  
	Topic deleteTopic( 1: i64 topicId ) throws (1:error.InvalidOperation exc),
	 
	 /**
	 * checkUpdates запрашивает наличие обновлений с момента предыдущего запроса, который возвращает сервер в ответе
	 * если обновлений нет - в ответ приходит новое значение таймстампа формирования ответа на сервере. 
	 * При наличии обновлений возвращается 0 
	 **/
	i32 checkUpdates( 1:i32 lastResposeTimestamp ) throws (1:error.InvalidOperation exc),
	map<i64,i32> getDialogUpdates( ) throws (1:error.InvalidOperation exc),
	
	TopicListPart getBlog(2:i64 lastLoadedTopicId, 3:i32 length) throws (1:error.InvalidOperation exc),
	Message postBlogMessage( 1:Message msg ) throws (1:error.InvalidOperation exc),
	TopicListPart getBusinessTopics(2:i64 lastLoadedTopicId, 3:i32 length) throws (1:error.InvalidOperation exc),
	Message postBusinessTopics( 1:Message msg ) throws (1:error.InvalidOperation exc),

	TopicListPart getAdverts( 1:i64 groupId, 2:i64 lastLoadedTopicId, 3:i32 length) throws (1:error.InvalidOperation exc),
	TopicListPart getTopics( 1:i64 groupId , 2:i64 rubricId, 3:i32 commmunityId, 4:i64 lastLoadedTopicId, 5:i32 length) throws (1:error.InvalidOperation exc),
	TopicListPart getImportantTopics( 1:i64 groupId , 2:i64 rubricId, 3:i32 commmunityId 4:i32 length) throws (1:error.InvalidOperation exc),
	list<WallItem> getImportantNews(1:i64 groupId , 2:i64 rubricId, 3:i32 commmunityId 4:i32 length) throws (1:error.InvalidOperation exc),
	
	/**
	* Загрузка части преставления дерева сообщений в виде дерева. parentID указывает на сообщение топика или на сообщение первого уровня
	**/
	MessageListPart getMessages( 1:i64 topicId, 2:i64 groupId, 3:MessageType messageType, 4:i64 lastLoadedId, 5:bool archived, 6:i32 length) throws (1:error.InvalidOperation exc),

//получение сообщений первого уровня. если lastLoadedId = 0, то сообщения грузятся начиная с первого. если !=0, то после указанного.
	MessageListPart getFirstLevelMessages( 1:i64 topicId , 2:i64 groupId, 3:MessageType messageType, 4:i64 lastLoadedId, 5:bool archived, 6:i32 length) throws (1:error.InvalidOperation exc),

//получение сообщений в виде списка. сообщения отсортированы по дате создания. более позднии появляются первыми. значения параметров теже что и у функции getFirstLevelMessages. 
	MessageListPart getMessagesAsList( 1:i64 topicId, 3:MessageType messageType, 4:i64 lastLoadedId, 5:bool archived, 6:i32 length) throws (1:error.InvalidOperation exc),

	//метсд изменяет и возвращает текущую важность сообщения на значение равное рейтингу пользователя, 
	//для текущего пользователя сообщение становится важным вне зависимости от его суммарного рейтинга
	i32 markMessageImportant(1:i64 messageId, 2:bool isImportant ) throws (1:error.InvalidOperation exc),
	i32 markMessageLike(1:i64 messageId ) throws (1:error.InvalidOperation exc),
	
	string getNextMulticastMessage( ) throws (1:error.InvalidOperation exc), //получение ползователем следующего не прочитанного сообщения
	string getMulticastMessage( ) throws (1:error.InvalidOperation exc), //получение ползователем текущего не прочитанного сообщения 
	
	//Отправка сообщений в группы или по набору адресов Если списки не заданы, то сообщение рассылается всем пользователям, 
	//В адресе должен быть определен как минимум id дома, если подъезд не определен = 0, то на весь подъезо  
	void sendGroupMulticastMessage( 1:list<i64> visibleGroups, 2:string message, 3:i32 startDate, 4:i32 expireDate) throws (1:error.InvalidOperation exc),
	void sendAddressMulticastMessage( 1:list<bedata.PostalAddress> addresses, 2:string message, 3:i32 startDate, 4:i32 expireDate) throws (1:error.InvalidOperation exc),

	//Метод перемещает заданный топик в группу groupId или, если она не задана, перемещает в координату с определением радиуса в соответсвии с типом группы.
	//Так же метод меняет тип топика
	//Любой из аргуметнов кроме первого, может быть не определен - null
	Topic moveTopic( 1:i64 id, //идентификатор топика
		2: i64 groupId, //группа в которую он должен быть перемещен. если группа задана, то следующие аргуметы широта, долгота и тип группы - не используются
		3: string longitude, 4: string latitude, 5: bedata.GroupType groupType, // определение местоположения и радиуса
		6: MessageType msgType ) throws (1:error.InvalidOperation exc), //изменение типа, null если не требуется изменения
}