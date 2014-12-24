package com.vmesteonline.be;

import com.vmesteonline.be.access.VoUserAccessBase;
import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.VoSession;
import com.vmesteonline.be.jdo2.VoUser;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.VoError;
import com.vmesteonline.be.thrift.authservice.CurrentAttributeType;
import com.vmesteonline.be.utils.Defaults;
import org.apache.log4j.Logger;

import javax.cache.Cache;
import javax.cache.CacheException;
import javax.jdo.JDOObjectNotFoundException;
import javax.jdo.PersistenceManager;
import javax.servlet.http.HttpServletRequest;
import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Map;

public class ServiceImpl {

	public String initCurrentSession(HttpServletRequest request) {
		PersistenceManager pm = PMF.getPm();
		VoSession cs;
		String sessId = ServiceImpl.createSessId(request);
		try {
			cs = pm.getObjectById(VoSession.class, sessId);
		} catch (Exception e) {
			cs = new VoSession(sessId, null );
			pm.makePersistent(cs);
		}

		currentSessionTL.set(sessId);
		//cs.setUser(pm.detachCopy(cs.getUser()));
		return sessId;
	}

	public enum ServiceCategoryID {
		BASE_SI, AUTH_SI, USER_SI, MESSAGE_SI, SHOP_SI
	}

	public Class getAuthRecordClass() {
		return VoUserAccessBase.class;
	}

	private static Cache cache;
	public static Logger logger;
	public static String hostName;
	protected ThreadLocal<String> currentSessionTL = new ThreadLocal<>();

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

	public static String createSessId(HttpServletRequest req) {
		return req.getSession().getId()+":"+req.getRemoteAddr();
	}

	public ServiceImpl() {
		currentSessionTL.set(Defaults.isItTests ? "111111" :  null);
	}


	protected ServiceImpl(HttpServletRequest req) {
		initCurrentSession(req);
	}
	
	protected ServiceImpl(ServiceImpl that){
		this.currentSessionTL.set( that.currentSessionTL.get());
	}

	public long getCurrentUserId() throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		return getCurrentUserId(pm);
	}

	protected long getCurrentUserId(PersistenceManager _pm) throws InvalidOperation {
		return getCurrentUser(_pm).getId();
	}

	protected VoUser getCurrentUser() throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		return getCurrentUser( pm );
	}

	public VoUser getCurrentUser(PersistenceManager pm) throws InvalidOperation {
		VoSession voSession = null;
		try {
			voSession = pm.getObjectById(VoSession.class, currentSessionTL.get());
		} catch (JDOObjectNotFoundException e) {
			throw new InvalidOperation(VoError.GeneralError, "Failed to process request. No session set.");
		}
		if (voSession.getUser() == null )
			throw new InvalidOperation(VoError.NotAuthorized, "can't get current user id");
		return voSession.getUser();
	}

	protected VoSession getCurrentSession() throws InvalidOperation {
		return getCurrentSession(PMF.getPm());
	}

	public Map<Integer, Long> getCurrentSessionAttributes() throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		return getCurrentSession(pm).getSessionAttributes();
	}

	protected VoSession getCurrentSession(PersistenceManager pm) throws InvalidOperation {
		try {
			return pm.getObjectById(VoSession.class, currentSessionTL.get());
		} catch (Exception e) {
			return pm.makePersistent( new VoSession( currentSessionTL.get(), null));
		}
	}

	public void setCurrentAttribute(int key, long value) throws InvalidOperation {
		setCurrentAttribute(key, value, PMF.getPm());
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
