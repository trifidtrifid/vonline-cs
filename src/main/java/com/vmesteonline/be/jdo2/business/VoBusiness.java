package com.vmesteonline.be.jdo2.business;

import javax.jdo.JDOObjectNotFoundException;
import javax.jdo.PersistenceManager;
import javax.jdo.annotations.*;

import com.vmesteonline.be.jdo2.GeoLocation;

import java.util.*;

@PersistenceCapable
@Indices({
        @Index(name="VOUSER_EML_IDX", members={"email"}),
        @Index(name="VOUSER_registered_IDX", members={"registered"}),
        @Index(name="VOUSER_GROUPS_IDX", members={"groups","emailConfirmed"})})

public class VoBusiness extends GeoLocation implements Comparable<VoBusiness> {

	
	
	@Persistent
	String 	shortName;
	
	@Persistent
	String 	fullName;
	@Persistent
	String 	shortInfo;
	@Persistent
	String 	fullInfo;
	
	@Persistent(table="businessimages")
  @Join(column = "businessid")
  @Element(column = "imageid")
	Long 	logo;
  
	@Persistent(table="businessimages")
  @Join(column = "businessid")
  @Element(column = "imageid")
	protected List<Long> images;
	
	@Persistent
	String 	address;
	@Persistent
	int 	radius;
	
	@Override
	public int compareTo(VoBusiness that) {
		return Long.compare(this.id, that.id);
	}
}
