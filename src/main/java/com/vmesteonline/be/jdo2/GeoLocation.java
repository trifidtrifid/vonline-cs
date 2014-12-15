package com.vmesteonline.be.jdo2;

import javax.jdo.annotations.*;
import java.math.BigDecimal;

@PersistenceCapable
@Inheritance(strategy = InheritanceStrategy.SUBCLASS_TABLE)
@Index(name="locIdx", members={"longitude","latitude"})
public class GeoLocation {

	public GeoLocation() {
		longitude = "0";
		latitude = "0";
	}

	/*
	 * GeoLocation(float longitude, float latitude) { this.longitude = longitude; this.latitude = latitude; }
	 */
	public BigDecimal getLongitude() {
		return null == longitude ? null : new BigDecimal(longitude);
	}

	public void setLongitude(BigDecimal longitude) {
		this.longitude = null == longitude ? null : longitude.toPlainString();
	}

	public BigDecimal getLatitude() {
		return null == latitude ? null : new BigDecimal(latitude);
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
