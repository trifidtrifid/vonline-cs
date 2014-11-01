package com.vmesteonline.be.jdo2;

import com.vmesteonline.be.thrift.Group;
import com.vmesteonline.be.thrift.GroupType;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.VoError;
import com.vmesteonline.be.utils.VoHelper;

import javax.jdo.PersistenceManager;
import javax.jdo.annotations.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@PersistenceCapable
@Indices({
        @Index(name="GT_IDX", members = {"groupType"}),
        @Index(name="VG_LLGTSF_IDX", members = {"longitude","latitude", "groupType", "staircase","floor"}),
        @Index(name="VG_LLGTS_IDX", members = {"longitude","latitude", "groupType", "staircase"}),
        @Index(name="VG_LLGT_IDX", members = {"longitude","latitude", "groupType"})})
public class VoUserGroup extends GeoLocation implements Comparable<VoUserGroup> {

	public static VoUserGroup createVoUserGroup(BigDecimal longitude, BigDecimal latitude, int radius, byte staircase, byte floor, String name, int impScore, int gType,
			PersistenceManager pm) throws InvalidOperation {
		
		String queryStr = "longitude=='"+longitude.toPlainString()
				+"' && latitude=='"+latitude.toPlainString()+"'"
				+" && groupType=="+gType;
		
		if( gType <= GroupType.STAIRCASE.getValue() )
			queryStr += " && staircase==" + staircase;
		
		if( gType <= GroupType.FLOOR.getValue() )
			queryStr += " && floor==" + floor;
		
		List<VoUserGroup> ugl =  (List<VoUserGroup>)pm.newQuery(VoUserGroup.class,queryStr).execute();
		
		if( 1==ugl.size() ) {
			return ugl.get(0);
			
		} else if( 1<ugl.size() ) {
			throw new InvalidOperation(VoError.GeneralError, "Two or more the same groups already registered + "+ugl.get(0)); 
			
		} else {
			VoUserGroup ug = new VoUserGroup(longitude, latitude, radius, staircase, floor, name, impScore, gType, pm);
			//all groups that could intersect should reset their intervisibility
			pm.makePersistent(ug);
			ug.resetVisibiltyGroups(pm);
			ug.registerInParentGroups(pm );
			pm.makePersistent(ug);
			return ug;
		}
	}

	private VoUserGroup getParentGroup(PersistenceManager pm){
		if( getGroupType() < GroupType.NEIGHBORS.getValue()){
			if( null == upperLevelGroups || upperLevelGroups.size() == 0){
				
				int gType = this.groupType + 1; 
				String queryStr = "longitude=='"+this.longitude
						+"' && latitude=='"+this.latitude+"'"
						+" && groupType=="+gType;
				
				if( gType <= GroupType.STAIRCASE.getValue() )
					queryStr += " && staircase==" + this.staircase;
				
				if( gType <= GroupType.FLOOR.getValue() )
					queryStr += " && floor==" + this.floor;
				
				List<VoUserGroup> vugl = (List<VoUserGroup>) pm.newQuery( VoUserGroup.class, queryStr).execute();
				
				if( vugl.size() > 1 ){
					throw new RuntimeException("There is "+vugl.size() +" the same grpups: " + vugl.get(0) + " == "+vugl.get(1));
					
				} else if( vugl.size() == 1 ){
				
					return vugl.get(0);
				}  
			
				return null;
			} else {
				return pm.getObjectById(VoUserGroup.class, upperLevelGroups.get(upperLevelGroups.size()-1));
			}
		} else 
			return null;
	}
	
	private void registerInParentGroups( PersistenceManager pm) {
		
		VoUserGroup parentGroup = getParentGroup(pm);
		if( null!=parentGroup ){
			parentGroup.getVisibleGroups(pm).addAll(this.getVisibleGroups(pm));
			pm.makePersistent(parentGroup);
		}
	}

	private void resetVisibiltyGroups(PersistenceManager pm) {
		
		List<Long> allGroups = this.findAllVisibleGroups(pm);
		for( Long nbgGrp : allGroups){
			if( nbgGrp != this.getId()){
				//reset visibility of group
				VoUserGroup nbGroup = pm.getObjectById(VoUserGroup.class, nbgGrp);
				
				if(nbGroup.getGroupType() == this.getGroupType() ){
					nbGroup.getVisibleGroups( pm ).add(this.getId());
					List<VoTopic> nnbgTopics = (List<VoTopic>)pm.newQuery(VoTopic.class, "userGroupId=="+nbgGrp).execute();
					if( null!=nnbgTopics)
						for( VoTopic tpc: nnbgTopics){
							ArrayList<Long> groups = new ArrayList<Long>(nbGroup.getVisibleGroups( pm ));
							tpc.setVisibleGroups( groups);
							pm.makePersistent(tpc);
						}
					pm.makePersistent(nbGroup);
				}
			}
		}
		this.setVisibleGroups(allGroups);
	}

	private VoUserGroup(BigDecimal longitude, BigDecimal latitude, int radius, byte staircase, byte floor, String name, int impScore, int gType, PersistenceManager pm){
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
	
	public List<Long> getVisibleGroups(PersistenceManager pm) {
		if( null==visibleGroups || visibleGroups.size() == 0){
			visibleGroups = findAllVisibleGroups(pm);
			pm.makePersistent(this);
		}
		return visibleGroups;
	}

	private List<Long> findAllVisibleGroups(PersistenceManager pm) {
		List<Long> vg = new ArrayList<Long>();
		
		if( groupType > GroupType.BUILDING.getValue() ){
			BigDecimal latMax = VoHelper.getLatitudeMax( new BigDecimal(latitude), radius);
			BigDecimal latMin = VoHelper.getLatitudeMin( new BigDecimal(latitude), radius);
			BigDecimal longMax = VoHelper.getLongitudeMax( new BigDecimal(longitude), new BigDecimal(latitude), radius);
			BigDecimal longMin = VoHelper.getLongitudeMin( new BigDecimal(longitude), new BigDecimal(latitude), radius);
			
			String filter = "groupType=="+groupType;
			List<VoUserGroup> groups = (List<VoUserGroup>) pm.newQuery( VoUserGroup.class, filter).execute();
			for( VoUserGroup ug: groups ){
				if( ug.getId() != getId() && ug.getLatitude().compareTo( latMax ) <=0 && ug.getLatitude().compareTo( latMin ) >=0 
						&& ug.getLongitude().compareTo( longMax ) <= 0 && ug.getLongitude().compareTo( longMin ) >= 0)
					
					vg.add( ug.getId() );
			}
		} 
		
		if( groupType > GroupType.FLOOR.getValue() )
			for( VoUserGroup ugc : getChildGroups( pm ))
				vg.add( ugc.getId() );
	
		vg.add(this.getId());
	
		return vg;
	}

	
	private List<VoUserGroup> getChildGroups(PersistenceManager pm) {
		List<VoUserGroup> childGroups = new ArrayList<VoUserGroup>();
		
		if( groupType > GroupType.FLOOR.getValue() ){
			
			String filter = "groupType=="+(groupType-1)+" && longitude=='"+longitude+"' && latitude=='"+latitude+"'";
			if( groupType < GroupType.BUILDING.getValue() ){ //TODO Expand to case for bigger groups  
				filter += " && staircase=="+staircase;
			} 
			
			List<VoUserGroup> childs = (List<VoUserGroup>) pm.newQuery( VoUserGroup.class, filter).execute();
			for (VoUserGroup childGroup : childs) {
				childGroups.addAll(childGroup.getChildGroups(pm));
			}
			childGroups.addAll(childs);
		}
		
		return childGroups;
	}

	public List<Long> getUpperLevelGroups(PersistenceManager pm) {
		if( null == upperLevelGroups || upperLevelGroups.size()==0 ){
			upperLevelGroups = buildUpperLevelGroupList(pm);
			pm.makePersistent(this);
		} 
		return upperLevelGroups;
	}

	private List<Long> buildUpperLevelGroupList(PersistenceManager pm) {
		VoUserGroup slg, pg = this;
		List<Long> upperGroups = new ArrayList<Long>();
		do{
			upperGroups.add(pg.getId());
			for (Long gid : pg.visibleGroups) {
				if( (slg = pm.getObjectById(VoUserGroup.class, gid)).getGroupType() == pg.getGroupType() )
					upperGroups.add(slg.getId());
			}
			
		} while( null!=(pg=pg.getParentGroup(pm)));
		
		return upperGroups;
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
	
	@Persistent(table = "ugvisiblegroups")
    @Join(column = "id")
    @Element(column = "visibleGroup")
	private List<Long> visibleGroups;
	
	@Persistent
	private int groupType;
	
	@Persistent
	private List<Long> upperLevelGroups;
	
	
	public int getImportantScore() {
		return importantScore;
	}

	public int getGroupType() {
		return groupType;
	}

	public void setGroupType(int groupType) {
		this.groupType = groupType;
	}
	
	public void setVisibleGroups(List<Long> visibleGroups) {
		this.visibleGroups = visibleGroups;
	}

	@Override
	public String toString() {
		return "VoUserGroup [id=" + getId() + ", name=" + name + ", longitude=" + getLongitude() + ", latitude=" + getLatitude() + ", radius=" + radius +", staircase="+staircase +", floor="+floor
				+ "]";
	}

	
}
