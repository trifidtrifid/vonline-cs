package com.vmesteonline.be;

import org.apache.log4j.Logger;

import javax.jdo.JDOHelper;
import javax.jdo.PersistenceManager;
import javax.jdo.PersistenceManagerFactory;
import javax.servlet.*;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class PersistenceInitFilter implements Filter {

	public static final Logger logger = Logger.getLogger(PersistenceInitFilter.class);
	private static final Map<String,PersistenceManagerFactory> persistenceManagerFactoryMap = new HashMap<>();

	private static PersistenceManagerFactory factory( String name) {
		PersistenceManagerFactory pmf = persistenceManagerFactoryMap.get(name);
		if( null == pmf )
			persistenceManagerFactoryMap.put( name, pmf = JDOHelper.getPersistenceManagerFactory(name));
		return pmf;
	}

	private static ThreadLocal<Map<String,PersistenceManager>> currentManagerMap = new ThreadLocal<>();

	public static PersistenceManager getManager(String databaseName) {
		Map<String,PersistenceManager> pmm = currentManagerMap.get();
		if( null == pmm)
			currentManagerMap.set( pmm = new HashMap<>());

		PersistenceManager pm = pmm.get(databaseName);
		if (pm == null || pm.isClosed() ) {
			pmm.put(databaseName, factory(databaseName).getPersistenceManager());
		}
		currentManagerMap.set( pmm );
		return pm;
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
		PersistenceManager manager = null;
		try {
			manager = getManager("vmesteonline");
			logger.debug("Got request: " + req + " Processed with pm: " + manager);
			chain.doFilter(req, res);
		} finally {
			if (manager != null) {
				manager.flush();
				manager.close();
			}
			logger.debug("End process request: "+req + " Just closed pm: "+manager);
		}
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
	}

	@Override
	public void destroy() {
	}

}
