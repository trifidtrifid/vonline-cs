package com.vmesteonline.be.jdo2.postaladdress;

import java.math.BigDecimal;

public interface AddressInfo {


	public abstract String getLongLatString();

	public abstract String getStreetName();

	public abstract String getCityName();

	public abstract String getCountryName();

	public abstract String getBuildingNo();

	public abstract boolean isKindHouse();

	public abstract String getAddresText();

	public abstract boolean isExact();

	public abstract BigDecimal getLattitude();

	public abstract BigDecimal getLongitude();

	public abstract String getZipCode();
}