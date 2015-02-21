package com.vmesteonline.be.jdo2;

import java.math.BigDecimal;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.Index;
import javax.jdo.annotations.Inheritance;
import javax.jdo.annotations.InheritanceStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

@PersistenceCapable
@Inheritance(strategy = InheritanceStrategy.SUBCLASS_TABLE)
@Index(name="locIdx", members={"longitude","latitude"})
public class GeoLocation {

	public GeoLocation() {
		longitude = "0";
		latitude = "0";
	}

	public GeoLocation(String longitude, String latitude) {
		super();
		this.longitude = longitude;
		this.latitude = latitude;
	}

	/*
	 * GeoLocation(float longitude, float latitude) { this.longitude = longitude; this.latitude = latitude; }
	 */
	public BigDecimal getLongitude() {
		return null == longitude ? null : new BigDecimal(longitude);
	}

	public void setLongitude(BigDecimal longitude) {
		if( null==longitude)
			determineLocation();
		
		this.longitude = null == longitude ? null : longitude.toPlainString();
	}

	public BigDecimal getLatitude() {
		if( null==latitude)
			determineLocation();
		return null == latitude ? null : new BigDecimal(latitude);
	}

	protected void determineLocation() {
		longitude = "0.0";
		latitude = "0.0"; 
	}

	public void setLatitude(BigDecimal latitude) {
		this.latitude = null == latitude ? null : latitude.toPlainString();
	}

	public long getId() {
		return id;
	}

	@PrimaryKey
	@Persistent(valueStrategy = IdGeneratorStrategy.INCREMENT)
	protected long id;

    @Persistent
	protected String longitude;

	@Persistent
	protected String latitude;
}
