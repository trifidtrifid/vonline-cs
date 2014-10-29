package com.vmesteonline.be.jdo2.postaladdress;

import com.vmesteonline.be.thrift.City;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.VoError;

import javax.jdo.*;
import javax.jdo.Query;
import javax.jdo.annotations.*;
import java.util.List;

@PersistenceCapable(identityType = IdentityType.APPLICATION, detachable = "true")
@Indices({
        @Index(name="countryId_name", members = {"countryId","name"}),
        @Index(name="countryId_IDX", members = {"countryId"})})
public class VoCity {
	
	public static VoCity createVoCity(VoCountry country, String name, PersistenceManager pm) throws InvalidOperation {

        Query q = pm.newQuery(VoCity.class, "countryId==" + country.getId() + " && name==n");
        q.declareParameters("String n");
        List<VoCity>vcl = (List<VoCity>) q.execute(name);

        if (vcl.size() == 1)
            return vcl.get(0);

		else if( vcl.size()==0 ){
			VoCity vc = new VoCity(country, name, pm);
			pm.makePersistent(vc);
			pm.flush();
			return vc;
		} else {
			throw new InvalidOperation(VoError.GeneralError, "To many cities with anme '"+name+"'");
		}
	}

	private VoCity(VoCountry country,String name,PersistenceManager pm) throws InvalidOperation {
		this.setCountry(country.getId());
		this.setName(name);
	}
	@Persistent(valueStrategy = IdGeneratorStrategy.INCREMENT)
	@PrimaryKey
	private long id;
	
	@Persistent
    //@Index(name="cidIDx", unique = "true", columns = {@Column(name="countryId"),@Column(name="name")} )
	private String name;

    @Persistent
    //@Index(name="countryId")
	private long countryId;
	public long getCountry(){
		return countryId;
	}

	public long getId() {
		return id;
	}

	public City getCity() {
		return new City(id, countryId, name);
	}

	@Override
	public String toString() {
		return "VoCity [id=" + id + ", name=" + name + ", country=" + countryId + "]";
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setCountry(long country) {
		this.countryId = country;
	}
}
