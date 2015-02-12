package com.vmesteonline.be.jdo2;

import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.postaladdress.VoBuilding;
import com.vmesteonline.be.thrift.Group;
import com.vmesteonline.be.thrift.GroupType;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.VoError;
import org.apache.log4j.Logger;

import javax.jdo.PersistenceManager;
import javax.jdo.annotations.*;
import java.math.BigDecimal;
import java.util.List;

import static com.vmesteonline.be.utils.VoHelper.executeQuery;

@PersistenceCapable
@Indices({
        @Index(name="GT_IDX", members = {"groupType"}),
        @Index(name="VG_LLGTSF_IDX", members = {"longitude","latitude", "groupType", "staircase","floor"}),
        @Index(name="VG_LLGTS_IDX", members = {"longitude","latitude", "groupType", "staircase"}),
        @Index(name="VG_LLGT_IDX", members = {"longitude","latitude", "groupType"})})
public class VoUserGroup extends GeoLocation implements Comparable<VoUserGroup> {

	private static Logger logger = Logger.getLogger(VoUserGroup.class);

	public static VoUserGroup createVoUserGroup(BigDecimal longitude, BigDecimal latitude, int radius, byte staircase, byte floor, String name, int impScore, int gType,
			PersistenceManager pm) throws InvalidOperation {
		
		String queryStr = "longitude=='"+longitude.toPlainString()
				+"' && latitude=='"+latitude.toPlainString()+"'"
				+" && groupType=="+gType;
		
		if( gType <= GroupType.STAIRCASE.getValue() )
			queryStr += " && staircase==" + staircase;
		
		if( gType <= GroupType.FLOOR.getValue() )
			queryStr += " && floor==" + floor;
		
		List<VoUserGroup> ugl =  executeQuery(pm.newQuery(VoUserGroup.class, queryStr));
		
		if( 1==ugl.size() ) {
			return ugl.get(0);
			
		} else if( 1<ugl.size() ) {
			throw new InvalidOperation(VoError.GeneralError, "Two or more the same groups already registered + "+ugl.get(0)); 
			
		} else {
			VoUserGroup ug = new VoUserGroup(longitude, latitude, radius, staircase, floor, name, impScore, gType);
			pm.makePersistent(ug);
			return ug;
		}
	}

	private VoUserGroup(BigDecimal longitude, BigDecimal latitude, int radius, byte staircase, byte floor, String name, int impScore, int gType){
		setLongitude(longitude);
		setLatitude(latitude);
		this.radius = radius;
		this.name = name;
		importantScore = impScore;
		groupType = gType;
		this.staircase = staircase;
		this.floor = floor;
	} 
	
	@Override
	public int compareTo(VoUserGroup that) {
		return that.getLatitude().compareTo(this.getLatitude()) != 0 ? that.getLatitude().compareTo(this.getLatitude()) : that.getLongitude().compareTo(
				this.getLongitude()) != 0 ? that.getLongitude().compareTo(this.getLongitude()) : Integer.compare(that.radius, this.radius);
	}

	public int getRadius() {
		return radius;
	}

	public void setRadius(int radius) {
		this.radius = radius;
	}

	public Group createGroup() {
		return new Group(getId(), name, name, description, radius, GroupType.findByValue(groupType));
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		if( null==description ){
			PersistenceManager pm = PMF.getPm();
			List<VoBuilding> bgs = executeQuery(pm.newQuery(VoBuilding.class, "longitude=='" + getLongitude() + "' && latitude=='" + getLatitude()+"'"));
			if( 1!=bgs.size()){
				logger.error("There is "+bgs.size()+" buildings with longitude==" + getLongitude() + " && latitude==" + getLatitude());
			}
			description = bgs.get(0).getAddressString();
			pm.makePersistent(this);
		}
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}


	@Persistent
	private String description;

	@Persistent
	private String name;

	@Persistent
	private int radius;
	
	@Persistent
	private int importantScore;
	
	@Persistent
	private byte staircase;
	
	@Persistent
	private byte floor;
	
	@Persistent
	private int groupType;

	public int getImportantScore() {
		return importantScore;
	}

	public int getGroupType() {
		return groupType;
	}

	public void setGroupType(int groupType) {
		this.groupType = groupType;
	}


	@Override
	public String toString() {
		return "VoUserGroup [id=" + getId() + ", name=" + name + ", longitude=" + getLongitude() + ", latitude=" + getLatitude() + ", radius=" + radius +", staircase="+staircase +", floor="+floor
				+ "]";
	}

	public byte getFloor() {
		return floor;
	}

	public byte getStaircase() {
		return staircase;
	}
}
