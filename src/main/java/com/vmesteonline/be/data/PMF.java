package com.vmesteonline.be.data;

import com.vmesteonline.be.PersistenceInitFilter;

import javax.jdo.PersistenceManager;

public final class PMF {
	public static PersistenceManager getPm() {
		return PersistenceInitFilter.getManager();
	}
}
