package com.vmesteonline.be;

import org.apache.log4j.Logger;

import javax.jdo.JDOHelper;
import javax.jdo.PersistenceManager;
import javax.jdo.PersistenceManagerFactory;
import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class PersistenceInitFilter implements Filter {

	public static final Logger logger = Logger.getLogger(PersistenceInitFilter.class);

	public static String databaseName = "vmesteonline"; //default value. Must be initialized before the first call of PFM.getPm();
	private static PersistenceManagerFactory persistenceManagerFactory = null;

	private static ThreadLocal<PersistenceManager> currentManager = new ThreadLocal<>();

	public static PersistenceManager getManager() {
		if( null == persistenceManagerFactory)
			persistenceManagerFactory = JDOHelper.getPersistenceManagerFactory(databaseName);

		PersistenceManager pm = currentManager.get();
		if (pm == null || pm.isClosed() ) {
			currentManager.set(pm = persistenceManagerFactory.getPersistenceManager());
		}
		return pm;
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
		PersistenceManager manager = null;
		try {
			manager = getManager();
			logger.debug("Got request ["+ServiceImpl.createSessId((HttpServletRequest) req)+"]: " + req + " Processed with pm: " + manager);
			chain.doFilter(req, res);
		} finally {
			if (manager != null && !manager.isClosed()) {
				manager.flush();
				manager.close();
			}
			logger.debug("End request ["+ServiceImpl.createSessId((HttpServletRequest) req)+"]: "+req + " Just closed pm: "+manager);
		}
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
	}

	@Override
	public void destroy() {
	}

}
