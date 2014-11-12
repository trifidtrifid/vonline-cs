namespace * com.vmesteonline.be.thrift.utilityservice
include "error.thrift"

enum CounterType { HOT_WATER=0, COLD_WATER=1, ELECTRICITY=2, ELECTRICITY_NIGHT=3, ELECTRICITY_DAY=4, GAS=5, OTHER=6}

struct Counter {
	1:i64 id,
	2:string location, //кухня, туалет, ванная комната, холл
	3:CounterType type, //тип счетчика
	4:string number, //номер счетчика
	5:double lastValue
}

struct CounterService {
	1:i16 startDateOfMonth; //номер дня месяца начала сдачи показаний
	2:i16 endDateOfMonth; //номер дня месяца - конец сдачи показаний
	3:i32 lastDate; //последний раз когда текущий пользователь сдал данные
	4:bool emailReminder; //флаг напоминания по email
	5:bool agrementAccepted; //флаг подтверждения соглашения о использовании сервиса
	6:bool infoProvided; // флаг, который выставляется если пользователь сдал показания в этом месяце
	7:bool timeToProvideInfo; //флаг, который поднимается в период, когда нужно сдавать показания
}

service UtilityService {

	CounterService getCounterService() throws (1:error.InvalidOperation exc), //информация по сервису счетчиков текущего пользователя
	i64 registerCounter( 1:Counter newCounter )throws (1:error.InvalidOperation exc), //создание счетчика в квартире текущего пользователя
	void updateCounter( 1:Counter updatedCounter )throws (1:error.InvalidOperation exc), //обнолвение параметров с сохранением данных по ID
	void removeCounter( 1:i64 counterId )throws (1:error.InvalidOperation exc), //удаление счетчика и данных

	list<Counter> getCounters() throws (1:error.InvalidOperation exc), //возвращает счетчики на адресе текущего пользователя
	map< i32, double> getCounterHistory(1:i64 counterId, 2:i32 fromDate, 3:i32 toDate) throws (1:error.InvalidOperation exc), //возвращает историю показаний счетчика
	double setCurrentCounterValue(1:i64 counterId, 2:double counterValue, 3:i32 date) throws (1:error.InvalidOperation exc), //сохраняет показания счетчика и возвращает значение расхода. если данных за предыдущий период нет - возвращает 0

	//запрос инициализации сервиса счетчиков для дома
	void createCounterService(1:i64 buildingId, 2:i16 startDateOfMonth, 3:i16 endDateOfMonth, 4:list<CounterType> defaultCounters) throws (1:error.InvalidOperation exc),
}