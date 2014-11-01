package com.vmesteonline.be;

import com.vmesteonline.be.access.VoUserAccessBase;
import com.vmesteonline.be.thrift.authservice.CurrentAttributeType;
import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.VoSession;
import com.vmesteonline.be.jdo2.VoUser;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.VoError;
import org.apache.log4j.Logger;

import javax.cache.Cache;
import javax.cache.CacheException;
import javax.jdo.JDOObjectNotFoundException;
import javax.jdo.PersistenceManager;
import javax.servlet.http.HttpSession;
import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Map;

public class ServiceImpl {

	public enum ServiceCategoryID {
		BASE_SI, AUTH_SI, USER_SI, MESSAGE_SI, SHOP_SI
	}

	public Class getAuthRecordClass() {
		return VoUserAccessBase.class;
	}

	private static Cache cache;
	public static Logger logger;
	public static String hostName;

	static {
		logger = Logger.getLogger(ServiceImpl.class.getName());
		try {
            /*String cacheName = "sampleCache";
            CachingProvider provider = Caching.getCachingProvider();
            CacheManager manager = provider.getCacheManager();
            cache = manager.getCache(cacheName);*/
            cache = null;

		} catch (CacheException e) {
			logger.error("Failed to initialize cache.", e);
		}
	}

	@SuppressWarnings("unchecked")
	public static <T> T getObjectFromCache(Object key) {
		T rslt = null;
		if (null != cache && cache.containsKey(key)) {
			try {
				rslt = (T) cache.get(key);
			} catch (ClassCastException cce) {
				logger.error("CACHE:FAiled to get object by key " + key + ". " + cce);
			}
		}
		return rslt;
	}

	@SuppressWarnings("unchecked")
	public static <T> boolean removeObjectFromCache(Object key) {
		boolean rslt = false;
		if (null != cache && cache.containsKey(key)) {
			try {
				rslt = cache.remove(key);
			} catch (ClassCastException cce) {
				logger.error("CACHE:FAiled to remove object by key " + key + ". " + cce);
			}
		}
		return rslt;
	}

	@SuppressWarnings("unchecked")
	public static <T extends Serializable> void putObjectToCache(Object key, T value) {
		if (null != cache) {
			try {
				cache.put(key, value);
			} catch (Exception e) {
				e.printStackTrace();
				logger.error("CACHE:FAiled to PUT Object to cache." + e);
			}
		}
	}

	protected SessionIdStorage sessionStorage;

	public void setSession(HttpSession session) {
		this.sessionStorage = new SessionIdStorage(session.getId());
	}

	public ServiceImpl() {
	}

	protected ServiceImpl(String sessId) {
		sessionStorage = new SessionIdStorage(sessId);
	}

	protected ServiceImpl(HttpSession session) {
		this.sessionStorage = new SessionIdStorage(session.getId());
	}

	public long getCurrentUserId() throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		return getCurrentUserId(pm);
	}

	protected long getCurrentUserId(PersistenceManager _pm) throws InvalidOperation {
		if (null == sessionStorage)
			throw new InvalidOperation(VoError.GeneralError, "Failed to process request. No session set.");

		PersistenceManager pm = _pm == null ? PMF.getPm() : _pm;
		VoSession sess = getCurrentSession(_pm);
		if (sess != null && 0 != sess.getUserId()) {
			return sess.getUserId();
		}
		throw new InvalidOperation(VoError.NotAuthorized, "can't get current user id");
	}

	protected VoUser getCurrentUser() throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		return getCurrentUser(pm);
	}

	public VoUser getCurrentUser(PersistenceManager pm) throws InvalidOperation {
		if (null == pm)
			throw new InvalidOperation(VoError.GeneralError, "Failed to process request. No PM set, but Persistance Object returned.");

		if (null == sessionStorage)
			throw new InvalidOperation(VoError.GeneralError, "Failed to process request. No session set.");

		VoSession sess = getCurrentSession(pm);
		if (sess != null && 0 != sess.getUserId()) {
			return pm.getObjectById(VoUser.class, sess.getUserId());
		}
		throw new InvalidOperation(VoError.NotAuthorized, "can't get current user id");
	}

	protected VoSession getCurrentSession() throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		return getCurrentSession(pm);
	}

	public Map<Integer, Long> getCurrentSessionAttributes() throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		return getCurrentSession(pm).getSessionAttributes();
	}

	protected VoSession getCurrentSession(PersistenceManager pm) throws InvalidOperation {
		if (null == pm)
			throw new InvalidOperation(VoError.GeneralError, "Failed to process request. No PM set, but Persistance Object returned.");

		if (null == sessionStorage)
			throw new InvalidOperation(VoError.GeneralError, "Failed to process request. No session set.");

        String id = sessionStorage.getId();
        if(null!=id) {
            try {
                VoSession sess = pm.getObjectById(VoSession.class, id);
                sess.setLastActivityTs((int) (System.currentTimeMillis() / 1000L));
                return sess;
            } catch (JDOObjectNotFoundException e) {
                VoSession vs = new VoSession(id, null);
                vs.setLastActivityTs((int) (System.currentTimeMillis() / 1000L));
                pm.makePersistent(vs);
                return vs;
            }
        } else
            throw new InvalidOperation(VoError.GeneralError, "Failed to process request. No session ID is set");
	}

	static class SessionIdStorage {
		String sessId;

		SessionIdStorage(String sessId) {
			this.sessId = sessId;
		}

		public String getId() {
			return sessId;
		}
	}

	public void setCurrentAttribute(int key, long value) throws InvalidOperation {

		setCurrentAttribute(key, value, null);
	}

	public void setCurrentAttribute(int key, long value, PersistenceManager _pm) throws InvalidOperation {
		PersistenceManager pm = null == _pm ? PMF.getPm() : _pm;
		VoSession currentSession = getCurrentSession(pm);
		currentSession.setSessionAttribute(key, value);
		pm.makePersistent(currentSession);
	}

	public void setCurrentAttribute(Map<Integer, Long> typeValueMap) throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		VoSession currentSession = getCurrentSession(pm);
		currentSession.setSessionAttributes(typeValueMap);
		pm.makePersistent(currentSession);
	}

	public Long getSessionAttribute(CurrentAttributeType type) throws InvalidOperation {
		return getSessionAttribute(type);
	}

	public Long getSessionAttribute(CurrentAttributeType type, PersistenceManager _pm) throws InvalidOperation {
		PersistenceManager pm = null == _pm ? PMF.getPm() : _pm;
		VoSession currentSession = getCurrentSession(pm);
		return currentSession.getSessionAttribute(type);
	}
	
	public static class CachableObject<T extends Serializable> {
		String createNewObjectMethodName;
		Class[] argTypes;
		
		public T create( Object object, String methodName, Object[] args ){
			createNewObjectMethodName = methodName;
			if( null == argTypes ){
				ArrayList<Class> argTypesAL = new ArrayList<Class>();
				for (Object arg : args) {
					argTypesAL.add( arg.getClass());
				}
				argTypes = new Class[argTypesAL.size()];
				argTypesAL.toArray(argTypes);
			}
			try {
				Object key = createKey( args );
				T result = ServiceImpl.getObjectFromCache( key); 
				if( result == null ){
					result = (T)object.getClass().getMethod(methodName, argTypes ).invoke(object, args);
					ServiceImpl.putObjectToCache(key, result);
				}
				return result;
				
			} catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException | NoSuchMethodException | SecurityException e) {
				e.printStackTrace();
				return null;
			}
		}
		
		public void forget( Object[] args ){
			ServiceImpl.removeObjectFromCache( createKey(args));
		};
		
		private Object createKey( Object[] args ){
			String key = createNewObjectMethodName;
			for (Object object : args) {
				key+=":"+object;
			}
			return key;
		}
		
	} 

	/**
	 * Method return true if method should have public access through Thrift interface, false to check access by USer ID
	 * 
	 * @param method
	 * @return true if method is public
	 */
	public boolean isPublicMethod(String method) {
		return false;
	}

	/**
	 * Method returns an identification of category for access and must be overwritten in all of child classes
	 * 
	 * @return
	 */
	public long categoryId() {
		return ServiceCategoryID.BASE_SI.ordinal();
	}

	public boolean accessAllowed(VoUserAccessBase voUserAccessBase, long currentUserId, long categoryId, String method, PersistenceManager pm) {
		return true;
	}
}
