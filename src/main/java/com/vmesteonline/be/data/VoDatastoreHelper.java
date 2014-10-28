package com.vmesteonline.be.data;

import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.VoError;

import javax.jdo.JDOObjectNotFoundException;
import javax.jdo.PersistenceManager;

public class VoDatastoreHelper {

	public static void exist(Class<?> className, long id) throws InvalidOperation {
		exist(className, id, PMF.getPm());
	}

	public static void exist(Class<?> className, long id, PersistenceManager pm) throws InvalidOperation {
		try {
			pm.getObjectById(className, id);
		} catch (JDOObjectNotFoundException e) {
			throw new InvalidOperation(VoError.IncorrectParametrs, "can't find object " + className.getSimpleName() + " id: "
					+ Long.toString(id));
		}
	}

/*
	public static <T> T getUserMsg(Class<T> className, long userId, long msgId, PersistenceManager pm) throws InvalidOperation {
		try {
			T t = pm.getObjectById(className, VoUserObject.<T> createKey(className, userId, msgId));
			return t;
		} catch (JDOObjectNotFoundException e) {
			return null;
		}
	}
*/

}
