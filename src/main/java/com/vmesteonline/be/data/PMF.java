package com.vmesteonline.be.data;

import com.vmesteonline.be.PersistenceInitFilter;

import javax.jdo.PersistenceManager;

public final class PMF {
	private static String databaseName = "vmesteonline";
	public static PersistenceManager getPm() {
		return PersistenceInitFilter.getManager();
	}
	public static void setDatabaseName(String name) {
		databaseName = name;
	}
}
