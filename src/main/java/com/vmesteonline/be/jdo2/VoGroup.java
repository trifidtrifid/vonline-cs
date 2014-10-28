package com.vmesteonline.be.jdo2;

import com.vmesteonline.be.thrift.GroupType;

public class VoGroup implements Comparable<VoGroup> {

	public static final int RADIUS_FOR_UNKNOWNS = 2000000; // whole world

	public VoGroup(String visibleName, int radius, GroupType gType) {
		this(visibleName, radius, gType, false);
	}

	public VoGroup(String visibleName, int radius, GroupType gType, boolean subscribedByDefault) {
		this.visibleName = visibleName;
		this.radius = radius;
		this.subscribedByDefault = subscribedByDefault;
		this.groupType = gType.getValue();
	}

	public VoGroup clone() {
		VoGroup gr = new VoGroup(visibleName, radius, GroupType.findByValue(groupType));
		return gr;
	}

	public String getVisibleName() {
		return visibleName;
	}

	public void setVisibleName(String visibleName) {
		this.visibleName = visibleName;
	}

	public int getRadius() {
		return radius;
	}

	public void setRadius(int radius) {
		this.radius = radius;
	}

	public boolean isHome() {
		return radius == 0;
	}

	private String visibleName;


	private int radius;


	private boolean subscribedByDefault;
	

	private int importantScore;

	
	public int getImportantScore() {
		return importantScore;
	}

	public void setImportantScore(int importantScore) {
		this.importantScore = importantScore;
	}
	
	private int groupType;
	
	public int getGroupType() {
		return groupType;
	}

	public void setGroupType(int groupType) {
		this.groupType = groupType;
	}


	public String toString() {
		return "VoGroup [ visibleName=" + visibleName + ", radius=" + radius + ", subscribedByDefault=" + subscribedByDefault + "]";
	}


	public int compareTo(VoGroup o) {
		return Integer.compare(o.getGroupType(), getGroupType());
	}

}
