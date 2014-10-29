package com.vmesteonline.be.jdo2.postaladdress;

import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.Street;
import com.vmesteonline.be.thrift.VoError;

import javax.jdo.*;
import javax.jdo.annotations.*;
import java.util.List;

@PersistenceCapable(identityType = IdentityType.APPLICATION, detachable = "true")
@Indices({
        @Index(name="city_IDX", members = {"cityId"})
})
@Unique(name="city_name_IDX",members={"cityId","name"})
public class VoStreet {

	public static VoStreet createVoStreet(VoCity city, String name, PersistenceManager pm) throws InvalidOperation {

        javax.jdo.Query q = pm.newQuery(VoStreet.class, "cityId==" + city.getId() + " && name==n");
        q.declareParameters("String n");
        List<VoStreet> vcl = (List<VoStreet>) q.execute(name);

        if (vcl.size() == 1)
            return vcl.get(0);

        if( vcl.size() == 0 ){
			VoStreet vs = new VoStreet(city, name, pm);
			pm.makePersistent(vs);
			pm.flush();
			return vs;
		} else 
			throw new InvalidOperation( VoError.GeneralError, "To many cities with name '"+name+"' ");
	}

	private VoStreet(VoCity city, String name, PersistenceManager pm) throws InvalidOperation {
		this.setCity(city.getId());
		this.setName(name);
	}
	
	@Persistent(valueStrategy = IdGeneratorStrategy.INCREMENT)
	@PrimaryKey
	private long id;

	public void setId(long id) {
		this.id = id;
	}

	@Persistent
	private String name;

	@Persistent
	private long cityId;

	public long getCity() {
		return cityId;
	}

	public long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public Street getStreet() {
		return new Street(id, cityId, name);
	}

	@Override
	public String toString() {
		return "VoStreet [id=" + id + ", name=" + name + ", city=" + cityId + "]";
	}
	
	public void setName(String name) {
		this.name = name;
	}

	public void setCity(long city) {
		this.cityId = city;
	}
}
