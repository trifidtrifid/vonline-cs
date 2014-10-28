package com.vmesteonline.be.utils;

import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.VoInviteCode;
import com.vmesteonline.be.jdo2.postaladdress.*;
import com.vmesteonline.be.thrift.InvalidOperation;
import org.apache.log4j.Logger;

import javax.jdo.PersistenceManager;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.URL;
import java.util.List;

public class InviteCodeUploader {
	
	private static Logger logger = Logger.getLogger(InviteCodeUploader.class.getSimpleName());
	
	public static int uploadCodes( String fileName ) throws Exception {
		int uploaded=0;
		
		String url = fileName;
		PersistenceManager pm = PMF.getPm();

		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		InputStream fis = new URL(url).openStream();
		byte[] buf = new byte[1024];
		int len;
		while( 0 < (len = fis.read( buf )) )
			baos.write(buf, 0, len);
		baos.close();
		List<List<String>> csv = CSVHelper.parseCSV( baos.toByteArray(), ";", "|", ":" );
		int lineCounter = 0;
		for( List<String> row : csv ){
			
			if( lineCounter++ == 0 ) continue;
			
			try {
				//Код, индекс, страна, Город, Улица, дом, корпус, подъезд, квартира
				String code = row.get(0);
				String zip = row.get(1);
				String countryName = row.get(2);
				String cityName = row.get(3);
				String streetName = row.get(4);
				String corpus = row.get(6);
				String houseNo = row.get(5) + ( (null==corpus || 0==corpus.trim().length() || corpus.trim().equals("0")) ? "" : "/" +corpus); 
				byte stairCase = Byte.parseByte( row.get(7));
				byte floor = 0;;
				int flatNo = Integer.parseInt(row.get(8));
				
				VoCountry voCountry = VoCountry.createVoCountry( countryName, pm );
				VoCity voCity = VoCity.createVoCity(voCountry, cityName, pm);
				VoStreet voStreet = VoStreet.createVoStreet(voCity, streetName, pm);
				VoBuilding voBuilding = VoBuilding.createVoBuilding(zip, voStreet, houseNo, null, null, pm);
				VoPostalAddress vpa = VoPostalAddress.createVoPostalAddress(voBuilding, stairCase, floor, flatNo, "",pm);
				
				VoInviteCode ic = new VoInviteCode(code, vpa.getId());
				pm.makePersistent(ic);
				logger.debug("Created code: "+ic+" For address: "+vpa);
				uploaded++;
			} catch (Exception e) {
				e.printStackTrace();
				logger.error("Failed to import a line: "+lineCounter+" "+( e instanceof InvalidOperation ? ((InvalidOperation)e).getWhy() : e.getMessage()));
			}
		} 
		return uploaded;
	} 

}
