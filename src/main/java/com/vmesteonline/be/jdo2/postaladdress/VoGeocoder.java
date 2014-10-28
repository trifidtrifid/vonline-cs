package com.vmesteonline.be.jdo2.postaladdress;

import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.VoError;
import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.utils.Pair;
import com.vmesteonline.be.utils.VoHelper;
import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

import javax.jdo.PersistenceManager;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.List;
import java.util.StringTokenizer;

public class VoGeocoder {

	private static URL geocogingServerURL;
	private static String addressParamName;
	private static SAXParserFactory factory;
	private static SAXParser saxParser;

	static {
		geocogingServerURL = null;
		try {
			geocogingServerURL = new URL("http://geocode-maps.yandex.ru/1.x/");
			addressParamName = "results=1&format=xml&kind=house&geocode";
			factory = SAXParserFactory.newInstance();
			saxParser = factory.newSAXParser();
		} catch (MalformedURLException | SAXException | ParserConfigurationException e) {
			e.printStackTrace();
			geocogingServerURL = null;
		}
	}

	public VoGeocoder() {

	}
/**
 * Method determines location of the building and if fixNames is true - make correction for street and city name according to resposne of geocoder
 * @param building to determine location
 * @param fixNames if names of street and city could be updated
 * @return location, if found
 * @throws InvalidOperation
 */
	public static Pair<String, String> getPosition(VoBuilding building, boolean fixNames) throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		try {
			VoStreet street = pm.getObjectById(VoStreet.class, building.getStreet());
			VoCity city = pm.getObjectById(VoCity.class, street.getCity());
			VoCountry country = pm.getObjectById(VoCountry.class, city.getCountry());
			
			String address = country.getName() + "," + city.getName() + "," + street.getName() + ","
					+ building.getFullNo();

				AddressInfo addrInfo = resolveAddressString(address);
				if(!addrInfo.isExact() || !addrInfo.isKindHouse() )
					throw new InvalidOperation(VoError.IncorrectParametrs, "YA: cant resolve address by string '"+address+"'");
				
				String longLatString = addrInfo.getLongLatString();

				if (null != longLatString) {
					StringTokenizer st = new StringTokenizer(longLatString, " ");
					if (st.countTokens() > 1) {
						String longitude = st.nextToken();
						String lattitude = st.nextToken();
						if (!longitude.isEmpty() && !lattitude.isEmpty())

							// update other address information
							if( fixNames ){
								if (addrInfo.getStreetName() != null && !street.getName().equals(addrInfo.getStreetName())) { // update
																																																							// street
																																																							// name
									List<VoStreet> streets = (List<VoStreet>) pm.newQuery(VoStreet.class,
											"cityId=="+street.getCity()+" && name == '" + addrInfo.getStreetName().trim() + "'").execute();
	
									VoStreet rightStreet;
									if (streets.size() > 0) {
										rightStreet = streets.get(0);
									} else { // create new street
										rightStreet = VoStreet.createVoStreet(city, addrInfo.getStreetName(), pm);
										pm.makePersistent(rightStreet);
									}
									building.setStreetId(rightStreet.getId());
									// check if old street has a buildings
									List<VoBuilding> buildings = (List<VoBuilding>) pm.newQuery(VoBuilding.class, "streetId=="+street.getId()).execute();
									if (buildings.size() == 0) {
										pm.deletePersistent(street);
									}
								}
							}
						building.setLocation( new BigDecimal(longitude), new BigDecimal(lattitude));
						
						return new Pair<String, String>(longitude, lattitude);
					}
				}
				throw new InvalidOperation(VoError.GeneralError, "Failed to get Location. THere is No data");
			} catch (Exception e) {
				e.printStackTrace();
				throw new InvalidOperation(VoError.GeneralError, "Failed to get Location: " + ( e instanceof InvalidOperation ? ((InvalidOperation)e).why : e.getMessage()));
			
		}
	}

	public static synchronized AddressInfo resolveAddressString(String address) throws InvalidOperation {
		try {
			URL url = new URL(geocogingServerURL + "?" + addressParamName + "=" + URLEncoder.encode(address,"UTF-8"));
			YAMLGecodingHandler handler = new YAMLGecodingHandler();
			saxParser.parse(url.openStream(), handler);
			return handler;

		} catch (Exception e) {
			e.printStackTrace();
			throw new InvalidOperation(VoError.IncorrectParametrs, "Failed to resolve address. " + e.getMessage());
		}
	}

	public static String createMapImageURL(BigDecimal longitude, BigDecimal latitude, int width, int height ) {
		double ws = VoHelper.roundDouble(0.00001*width, 5);
		double hs = VoHelper.roundDouble(0.00001*height, 5);
		return "https://static-maps.yandex.ru/1.x/?l=map&pt="+longitude+","+latitude+",pm2blm&size="+width+","+height+"&spn="+ws+","+hs;
	}

	private static class YAMLGecodingHandler extends DefaultHandler implements AddressInfo {

		private enum WhatDataToRead {
			UNKNOWN, POS, STREET, CITY, COUNTRY, FULLNO, HOUSEIDX, KIND, ADDRESS, PRECISION
		};

		private WhatDataToRead whatNext = WhatDataToRead.UNKNOWN;

		private String zipCode = null;
		private String longLatString = null;
		private String countryName = null;
		private String streetName = null;
		private String cityName = null;
		private String buildingNo = null;
		private boolean isKindHouse = false; // <kind>house</kind>
		private String addresText = null; // <text>Россия, Москва, улица Новый
																			// Арбат, 24</text>
		private boolean isExact = false; // <PRECISION>exact</precision>
		private BigDecimal lattitude = null, longitude = null;

		@Override
		public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {
			if (qName.equalsIgnoreCase("POS")) {
				whatNext = WhatDataToRead.POS;
			} else if (qName.equalsIgnoreCase("kind")) {
				whatNext = WhatDataToRead.KIND;
			} else if (qName.equalsIgnoreCase("ThoroughfareName")) {
				whatNext = WhatDataToRead.STREET;
			} else if (qName.equalsIgnoreCase("LocalityName")) {
				whatNext = WhatDataToRead.CITY;
			} else if (qName.equalsIgnoreCase("PremiseNumber")) {
				whatNext = WhatDataToRead.FULLNO;
			} else if (qName.equalsIgnoreCase("HOUSELETTER")) { // NOT IMPLEMENTED
				whatNext = WhatDataToRead.HOUSEIDX;
			} else if (qName.equalsIgnoreCase("precision")) {
				whatNext = WhatDataToRead.PRECISION;
			} else if (qName.equalsIgnoreCase("CountryName")) {
				whatNext = WhatDataToRead.COUNTRY;
			} else if (qName.equalsIgnoreCase("AddressLine")) {
				whatNext = WhatDataToRead.ADDRESS;
			} else {
				whatNext = WhatDataToRead.UNKNOWN;
			}
		}

		@Override
		public void endElement(String uri, String localName, String qName) throws SAXException {
			whatNext = WhatDataToRead.UNKNOWN;
		}

		@Override
		public void characters(char[] ch, int start, int length) throws SAXException {
			switch (whatNext) {
			case POS:
				longLatString = new String(ch, start, length);
				break;
			case KIND:
				isKindHouse = new String(ch, start, length).equalsIgnoreCase("house");
				break;
			case STREET:
				streetName = new String(ch, start, length);
				break;
			case CITY:
				cityName = new String(ch, start, length);
				break;
			case COUNTRY:
				countryName = new String(ch, start, length);
				break;
			case ADDRESS:
				addresText = new String(ch, start, length);
				break;
			case PRECISION:
				isExact = new String(ch, start, length).equalsIgnoreCase("exact");
				break;
			case FULLNO:
				buildingNo = new String(ch, start, length);
				break;
			default:
				break;
			}
		}

		public String getZipCode() {
			return zipCode;
		}

		public void setZipCode(String zipCode) {
			this.zipCode = zipCode;
		}

		@Override
		public String getCountryName() {
			return countryName;
		}

		@Override
		public String getLongLatString() {
			return longLatString;
		}

		@Override
		public String getStreetName() {
			return streetName;
		}

		@Override
		public String getCityName() {
			return cityName;
		}

		@Override
		public String getBuildingNo() {
			return buildingNo;
		}

		@Override
		public boolean isKindHouse() {
			return isKindHouse;
		}

		@Override
		public String getAddresText() {
			return addresText;
		}

		@Override
		public boolean isExact() {
			return isExact;
		}

		@Override
		public BigDecimal getLattitude() {
			if (lattitude == null) {
				calculateLongLat();
			}
			return lattitude;
		}

		@Override
		public BigDecimal getLongitude() {
			if (longitude == null) {
				calculateLongLat();
			}
			return longitude;
		}

		private void calculateLongLat() {
			if (null != longLatString) {
				StringTokenizer st = new StringTokenizer(longLatString, " ");
				if (st.countTokens() > 1) {
					longitude = new BigDecimal(st.nextToken());
					lattitude = new BigDecimal(st.nextToken());
				}
			}
		}
	}

}
