package com.vmesteonline.be.jdo2.postaladdress;

import com.vmesteonline.be.thrift.Country;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.VoError;

import javax.jdo.PersistenceManager;
import javax.jdo.annotations.*;
import java.util.List;

@PersistenceCapable(identityType = IdentityType.APPLICATION, detachable = "true")
@Index(name="name",members = {"name"})
public class VoCountry {
	
	public static VoCountry createVoCountry(String name, PersistenceManager pm) throws InvalidOperation {
		List<VoCountry> vcl = (List<VoCountry>)pm.newQuery(VoCountry.class, "name=='"+name+"'").execute();
		if( vcl.size() == 1 ){
			return vcl.get(0);
		} else if( vcl.size() == 0 ){
			VoCountry vc = new VoCountry(name, pm);
			pm.makePersistent(vc);
			pm.flush();
			return vc;
			
		} else {
			throw new InvalidOperation(VoError.GeneralError, "Too many("+vcl.size()+") countries with the same name. ");
		}
	}

	private VoCountry(String name, PersistenceManager pm) throws InvalidOperation{
		this.name = name;
	}
	
	@Persistent(valueStrategy = IdGeneratorStrategy.INCREMENT)
	@PrimaryKey
	private long id;
	
	@Persistent
	private String name;
	
	public void setName(String name) {
		this.name = name;
	}

	public long getId() {
		return id;
	}

	public Country getCountry() {
		return new Country(id, name);
	}

	@Override
	public String toString() {
		return "VoCountry [id=" + id + ", name=" + name + "]";
	}

	public String getName() {
		return name;
	}
}
