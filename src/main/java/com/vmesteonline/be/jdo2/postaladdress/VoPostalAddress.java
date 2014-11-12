package com.vmesteonline.be.jdo2.postaladdress;

import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.VoUserGroup;
import com.vmesteonline.be.thrift.GroupType;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.PostalAddress;
import com.vmesteonline.be.thrift.VoError;

import javax.jdo.JDOObjectNotFoundException;
import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.jdo.annotations.*;
import java.util.List;

@PersistenceCapable
@Indices({
        @Index(name="fullpa_idx",members = {"buildingId","staircase","floor", "flatNo"}),
        @Index(name="shortpa_idx",members = {"buildingId", "flatNo"}),
        @Index(name="bid_idx",members = {"buildingId"}),
        @Index(name="ug_idx",members = {"userGroup"}),
})
public class VoPostalAddress implements Comparable<VoPostalAddress> {

	private VoPostalAddress(VoBuilding voBuilding, byte staircase, byte floor, int flatNo, String comment, PersistenceManager pm) throws InvalidOperation {

		this.buildingId = voBuilding.getId();
		this.staircase = staircase;
		this.floor = floor;
		this.flatNo = flatNo;
		this.comment = comment;
		this.userGroup = null;
	}

	public VoUserGroup getUserHomeGroup(PersistenceManager pm) throws InvalidOperation {
		if(null==userGroup){
			VoBuilding voBuilding = pm.getObjectById(VoBuilding.class, buildingId);
			userGroup = VoUserGroup.createVoUserGroup(
					voBuilding.getLongitude(), voBuilding.getLatitude(), 0, staircase, floor, "", 0, GroupType.FLOOR.getValue(), pm);
		}
		return userGroup;
	}

	@Override
	public boolean equals(Object that) {
		return that instanceof VoPostalAddress ? ((VoPostalAddress) that).buildingId == buildingId && ((VoPostalAddress) that).flatNo == flatNo : super
				.equals(that);
	}

	@Override
	public String toString() {
		return "VoPostalAddress [id=" + id + ", building=" + buildingId + ", staircase=" + staircase + ", floor=" + floor + ", flatNo=" + flatNo + "]";
	}

	@Override
	public int compareTo(VoPostalAddress that) {
		return 0 == that.buildingId ? this.buildingId == 0 ? 0 : -1 : 0 == this.buildingId ? 1
				: Long.compare(this.buildingId, that.buildingId) != 0 ? Long.compare(this.buildingId, that.buildingId) : Integer.compare(flatNo, that.flatNo);
	}

	public long getAddressCode() {
		return id % 100000L;
	}

	public static VoPostalAddress createVoPostalAddress(PostalAddress postalAddress, PersistenceManager _pm) throws InvalidOperation {
		
		if (null == postalAddress)
			throw new InvalidOperation(VoError.IncorrectParametrs, "can't init VoPostalAddress object. Input parametr is null");

		PersistenceManager pm = null == _pm ? PMF.getPm() : _pm;
		VoBuilding vob;
		try {
			vob = pm.getObjectById(VoBuilding.class, postalAddress.getBuilding().getId());
		} catch (JDOObjectNotFoundException jonfe) {
			jonfe.printStackTrace();
			throw new InvalidOperation(VoError.IncorrectParametrs, "No building found by ID=" + postalAddress.getBuilding().getId());
		}
		return createVoPostalAddress(vob, postalAddress.getStaircase(), postalAddress.getFloor(), postalAddress.getFlatNo(), 
				postalAddress.getComment(), pm);
	}

	public static VoPostalAddress createVoPostalAddress(VoBuilding voBuilding, byte staircase, byte floor, int flatNo, String comment, PersistenceManager pm) throws InvalidOperation {
		
		Query q = pm.newQuery(VoPostalAddress.class);
		q.setFilter("buildingId=="+voBuilding.getId()+" && staircase==" + staircase + " && floor==" + floor + " && flatNo=="+ flatNo);
		List<VoPostalAddress> pal = (List<VoPostalAddress>) q.execute();
		if (pal.size() == 1) {
			return pal.get(0);
		} else if (pal.size() > 1) 
			throw new InvalidOperation(VoError.GeneralError, "There is two or more the same addresses registered. "+pal.get(0));
			 
		VoPostalAddress voPostalAddress = new VoPostalAddress(voBuilding, staircase, floor, flatNo, comment, pm);
		pm.makePersistent(voPostalAddress);

        /*pm.makePersistent( new VoCounter(CounterType.COLD_WATER, "", "", voPostalAddress.getId()));
        pm.makePersistent( new VoCounter(CounterType.HOT_WATER, "", "", voPostalAddress.getId()));
        pm.makePersistent( new VoCounter(CounterType.COLD_WATER, "", "", voPostalAddress.getId()));
        pm.makePersistent( new VoCounter(CounterType.HOT_WATER, "", "", voPostalAddress.getId()));
        pm.makePersistent( new VoCounter(CounterType.ELECTRICITY_DAY, "", "", voPostalAddress.getId()));
        pm.makePersistent( new VoCounter(CounterType.ELECTRICITY_NIGHT, "", "", voPostalAddress.getId()));

		pm.flush();*/
		return voPostalAddress;
	}

	public long getBuilding() {
		return buildingId;
	}

	public PostalAddress getPostalAddress() {
		return getPostalAddress(null);
	}

	public PostalAddress getPostalAddress(PersistenceManager _pm) {

		PersistenceManager pm = _pm == null ? PMF.getPm() : _pm;
		VoBuilding building = pm.getObjectById(VoBuilding.class, buildingId);
		VoStreet street = pm.getObjectById(VoStreet.class, building.getStreetId());
		VoCity city = pm.getObjectById(VoCity.class, street.getCity());
		VoCountry country = pm.getObjectById(VoCountry.class, city.getCountry());

		return new PostalAddress(country.getCountry(), city.getCity(), street.getStreet(), building.getBuilding(), staircase, floor, flatNo, comment);
	}

	public String getAddressText(PersistenceManager _pm) {

		PersistenceManager pm = null == _pm ? PMF.getPm() : _pm;
		VoBuilding building = pm.getObjectById(VoBuilding.class, buildingId);
		if (null == building.getAddressString() || building.getAddressString().trim().length() == 0) {

			PostalAddress pa = getPostalAddress(pm);
			building.setAddressString(pa.getCity().getName() + " " + pa.getStreet().getName() + " д." + building.getFullNo() + " кв. " + flatNo);
			return building.getAddressString();
		} else {
			return building.getAddressString() + " кв. " + flatNo/* + " [этаж " + floor + " подъезд "+ staircase + "]" */;
		}
	}

	public long getId() {
		return id;
	}

	public byte getStaircase() {
		return staircase;
	}

	public byte getFloor() {
		return floor;
	}

	public int getFlatNo() {
		return flatNo;
	}

	public String getComment() {
		return comment;
	}

	public Double getDistance(VoPostalAddress that) {
		PersistenceManager pm = PMF.getPm();
		try {
			VoBuilding building = pm.getObjectById(VoBuilding.class, buildingId);
			VoBuilding thatBuilding = pm.getObjectById(VoBuilding.class, that.getBuilding());
			return building.getDistance(thatBuilding);
		} catch (Exception e) {
			return null;
		}
	}

	private static long valueMask = 26051976L;

	@PrimaryKey
	@Persistent(valueStrategy = IdGeneratorStrategy.INCREMENT)
	private long id;

	@Persistent
	private long buildingId;

	@Persistent
	private byte staircase;

	@Persistent
	private byte floor;

	@Persistent
	private int flatNo;

	@Persistent
	private String comment;

	@Persistent
	private VoUserGroup userGroup;
}
