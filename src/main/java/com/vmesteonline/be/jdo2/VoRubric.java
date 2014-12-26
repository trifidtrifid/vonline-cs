package com.vmesteonline.be.jdo2;

import java.util.List;

import javax.jdo.PersistenceManager;
import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.Index;
import javax.jdo.annotations.Indices;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import com.vmesteonline.be.thrift.Rubric;
import com.vmesteonline.be.utils.VoHelper;

@PersistenceCapable
@Indices( {@Index( name="name_IDx", members={"name"})})
public class VoRubric {

	
	public static VoRubric createVoRubric(String visibleName, String name, String description, boolean defSubscribed,
			PersistenceManager pm) {
		List<Long> rlist = VoHelper.executeQuery( pm.newQuery("SQL","SELECT ID FROM VORUBRIC WHERE NAME='"+name+"'"));
		if( rlist.size()>0 )
			return pm.getObjectById(VoRubric.class, rlist.get(0));
		
		VoRubric voRubric = new VoRubric(visibleName, name, description, defSubscribed);
		pm.makePersistent(voRubric);
		return voRubric;
	}
	
	private VoRubric(String visibleName, String name, String description, boolean defSubscribed) {
		this.name = name;
		this.visibleName = visibleName;
		this.description = description;
		this.subscribedByDefault = defSubscribed;
	}
	
	public Rubric getRubric(){
		return new Rubric(id, visibleName, name, description);
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
