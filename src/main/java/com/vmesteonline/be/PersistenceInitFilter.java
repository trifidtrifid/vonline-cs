package com.vmesteonline.be;

import javax.jdo.JDOHelper;
import javax.jdo.PersistenceManager;
import javax.jdo.PersistenceManagerFactory;
import javax.servlet.*;
import java.io.IOException;

public class PersistenceInitFilter implements Filter {

	private static final PersistenceManagerFactory persistenceManagerFactory = JDOHelper.getPersistenceManagerFactory("vmesteonline");

	private static PersistenceManagerFactory factory() {
		return persistenceManagerFactory;
	}

	private static ThreadLocal<PersistenceManager> currentManager = new ThreadLocal<PersistenceManager>(){
		
	};

	public static PersistenceManager getManager() {
		PersistenceManager pm = currentManager.get();
		if (pm == null || pm.isClosed() ) {
			currentManager.set( pm = factory().getPersistenceManager() );
		} 
		return pm;
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
		PersistenceManager manager = null;
		try {
			manager = getManager();
			chain.doFilter(req, res);
		} finally {
			if (manager != null) {
				manager.flush();
				manager.close();
			}
		}
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
	}

	@Override
	public void destroy() {
	}

}
