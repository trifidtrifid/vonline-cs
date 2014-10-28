package com.vmesteonline.be.jdo2;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

@PersistenceCapable
public class VoRubric {

	public VoRubric(String visibleName, String name, String description, boolean defSubscribed) {
		this.name = name;
		this.visibleName = visibleName;
		this.description = description;
		this.subscribedByDefault = defSubscribed;
	}
	public VoRubric(String visibleName, String name, String description) {
		this(visibleName, name, description,false); 
	}

	public String getVisibleName() {
		return visibleName;
	}

	public void setVisibleName(String visibleName) {
		this.visibleName = visibleName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@PrimaryKey
	@Persistent(valueStrategy = IdGeneratorStrategy.INCREMENT)
	private long id;

	@Persistent
	private boolean subscribedByDefault;
	
	@Persistent
	String visibleName;

	@Persistent
	String description;

	@Persistent
	String name;

	@Override
	public String toString() {
		return "VoRubric [id=" + id + ", subscribedByDefault=" + subscribedByDefault + ", visibleName=" + visibleName + ", name=" + name + "]";
	}
}
