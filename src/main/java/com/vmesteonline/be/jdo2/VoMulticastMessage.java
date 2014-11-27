package com.vmesteonline.be.jdo2;

import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;

@PersistenceCapable
public class VoMulticastMessage {

	
	public VoMulticastMessage(VoUserGroup userGroup, int startAfter, int endBefore, String message) {
		this.userGroup = userGroup;
		this.startAfter = 0 == startAfter ? (int)(System.currentTimeMillis()/1000L) : startAfter;
		this.endBefore = endBefore;
		this.message = message;
	}
	
	public VoUserGroup getUserGroups() {
		return userGroup;
	}

	public void setUserGroup(VoUserGroup visibleGroups) {
		this.userGroup = visibleGroups;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public int getStartAfter() {
		return startAfter;
	}

	public void setStartAfter(int startAfter) {
		this.startAfter = startAfter;
	}

	public int getEndBefore() {
		return endBefore;
	}

	public void setEndBefore(int endBefore) {
		this.endBefore = endBefore;
	}

	@Persistent
	private VoUserGroup userGroup;
	
	@Persistent
	private String message;
	
	@Persistent
	private int startAfter;
	
	@Persistent
	private int endBefore;
	
	public boolean hasNext;
}
