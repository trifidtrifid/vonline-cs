package com.vmesteonline.be.jdo2;

import java.io.Serializable;

@SuppressWarnings("serial")
public class VisibleGroup implements Serializable, Comparable<VisibleGroup> {
	long id;
	int type;
	
	VisibleGroup(){}
	
	VisibleGroup(Long ug, int groupType) {
		id = ug;
		type = groupType;
	}

	@Override
	public int compareTo(VisibleGroup o) {
		return Integer.compare(this.type, o.type );
	}

	@Override
	public int hashCode() {
		return new Long(id).hashCode();
	}
}
