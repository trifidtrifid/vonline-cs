package com.vmesteonline.be.jdo2.postaladdress;

import com.vmesteonline.be.thrift.Building;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.VoError;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.jdo.annotations.*;
import java.math.BigDecimal;
import java.util.List;

@PersistenceCapable(identityType = IdentityType.APPLICATION, detachable = "true")
public class VoBuilding  {

	private VoBuilding(String zip, VoStreet vs, String fullNo, BigDecimal longitude, BigDecimal latitude) throws InvalidOperation {
		
		this.streetId = vs.getId();
		this.fullNo = fullNo;
		this.zipCode = zip;
		this.longitude = null == longitude ? null : longitude.toPlainString();
		this.latitude = null == latitude ? null : latitude.toPlainString();

	}

	public String getAddressString() {
		return addressString;
	}

	public String getFullNo() {
		return fullNo;
	}

	public long getStreetId() {
		return streetId;
	}

	@Persistent(valueStrategy = IdGeneratorStrategy.INCREMENT)
	@PrimaryKey
	private long id;

	@Persistent
	
	private String addressString; 

	@Persistent
	private String fullNo; // no with letter or other extension if any

	@Persistent
	
	private String zipCode; 
	
	@Persistent
	private long streetId;

	public long getStreet() {
		return streetId;
	}

	public long getId() {
		return id;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	public Building getBuilding() {
		return new Building(id, zipCode, streetId, fullNo);
	}

	@Override
	public String toString() {
		return "VoBuilding [id=" + id + ", zipCode=" + zipCode +", fullNo=" + fullNo + ", streetId=" + streetId + ", long=" + longitude + ", lat="
				+ latitude + "]";
	}

	public void setLocation(BigDecimal longitude, BigDecimal latitude) {
		this.longitude = longitude.toPlainString();
		this.latitude = latitude.toPlainString();
	}
	
	
	private static double coordToRad(String coord){
		return Double.parseDouble(coord) * Math.PI / 180.0D;
	}

	//Calculate distance in kilometers between two buildings if all off coordinates are defined
	
	public static VoBuilding createVoBuilding(String zip, VoStreet vs, String fullNo, BigDecimal longitude, BigDecimal latitude, PersistenceManager pm)
			throws InvalidOperation {
		
		Query q = pm.newQuery(VoBuilding.class);
        q.setFilter("streetId=="+vs.getId()+" && fullNo == fn");
        q.declareParameters("String fn");
		List<VoBuilding> bgsl = (List<VoBuilding>)q.execute(fullNo);
		
		if( 1==bgsl.size() ){
			return bgsl.get(0);
			
		} else if( 2==bgsl.size() ){
			
			throw new InvalidOperation(VoError.GeneralError, "There is two the same building: "+bgsl.get(0));
		}
		
		VoBuilding vb = new VoBuilding(zip, vs, fullNo, longitude, latitude);
		
		if( null == longitude || longitude.toPlainString().trim().length() == 0 || 
				null == latitude || latitude.toPlainString().trim().length() == 0) {
			VoGeocoder.getPosition(vb, false);
			
		} 
		if( vb.addressString == null ) {
			VoStreet street = pm.getObjectById(VoStreet.class, vb.streetId);
			VoCity city = pm.getObjectById(VoCity.class, street.getCity());
			VoCountry country = pm.getObjectById(VoCountry.class, city.getCountry());
			
			vb.addressString = country.getName() + "," + city.getName() + "," + street.getName() + ","
					+ vb.getFullNo();
		}
		pm.makePersistent(vb);
		pm.flush();
		return vb;
	}

	public Double getDistance( VoBuilding that ){
		
		if( null == longitude || null == latitude || 
				null == that || null == that.longitude || null == that.latitude)
			return null;
		
		double lat1 = coordToRad(this.latitude);
		double lat2 = coordToRad(that.latitude);
		double dLat = lat2-lat1;
		double dLon = coordToRad(that.longitude)-coordToRad(this.longitude);
		
		double a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
		double c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		return 6371.0D * c;
	}

	@Persistent
	
	String longitude;

	@Persistent
	
	String latitude;

	public BigDecimal getLongitude() {
		return null == longitude ? null : new BigDecimal(longitude);
	}

	public BigDecimal getLatitude() {
		return null == latitude ? null : new BigDecimal(latitude);
	}

	public void setAddressString(String addressString) {
		this.addressString = addressString;
	}

	public void setStreetId(long streetId) {
		this.streetId = streetId;
	}
}
