package com.vmesteonline.be;

import org.apache.log4j.Logger;

import javax.jdo.JDOHelper;
import javax.jdo.PersistenceManager;
import javax.jdo.PersistenceManagerFactory;
import javax.servlet.*;
import java.io.IOException;

public class PersistenceInitFilter implements Filter {

	public static final Logger logger = Logger.getLogger(PersistenceInitFilter.class);
	private static final PersistenceManagerFactory persistenceManagerFactory = JDOHelper.getPersistenceManagerFactory("vmesteonline");

	private static PersistenceManagerFactory factory() {
		return persistenceManagerFactory;
	}

	private static ThreadLocal<PersistenceManager> currentManager = new ThreadLocal<PersistenceManager>(){

	};

	public static PersistenceManager getManager() {
		PersistenceManager pm = currentManager.get();
		if (pm == null || pm.isClosed() ) {
			currentManager.set( factory().getPersistenceManager() );
		} 
		return currentManager.get();
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
		PersistenceManager manager = null;
		try {
			manager = getManager();
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
