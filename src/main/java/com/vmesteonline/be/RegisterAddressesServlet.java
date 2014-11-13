package com.vmesteonline.be;

import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.VoInviteCode;
import com.vmesteonline.be.jdo2.postaladdress.*;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.utils.CSVHelper;
import com.vmesteonline.be.utils.EMailHelper;
import com.vmesteonline.be.utils.StorageHelper;
import com.vmesteonline.be.utils.VoHelper;
import org.apache.log4j.Logger;

import javax.jdo.PersistenceManager;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static com.vmesteonline.be.utils.VoHelper.executeQuery;

public class RegisterAddressesServlet extends QueuedServletWithKeyHelper {
	
	private static Logger logger = Logger.getLogger(RegisterAddressesServlet.class.getSimpleName());

	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String fileLink = req.getParameter("file");
		logger.debug("Got request with file param ["+fileLink +"] and key="+req.getParameter("key"));
		if( null==fileLink){
			resp.setStatus(HttpServletResponse.SC_OK, "OK");
			resp.getOutputStream().write("No 'file' parameter set".getBytes());
			return;
		}
			
			long now = System.currentTimeMillis();
			
			/*if( keyRequestAndQueuePush(req, resp) ){*/
			
				String res;
				if( null == (res=processReq(req, resp)))
					res = "Successfuly DONE";
				
				/*sendTheResultNotification(req, resp, now, res);
			}*/
	}

	private String processReq(HttpServletRequest req, HttpServletResponse resp) {
		String fileLink = req.getParameter("file");
		if( null==fileLink){
			return "Error: Parameter 'file' must be set";
		}
		try {
			URL url1 = new URL(fileLink);
			InputStream content = (InputStream) url1.getContent();
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			byte[] buf = new byte[1024];
			int read;
			while( -1!=(read = content.read(buf)))
				baos.write(buf,0, read);
			baos.close();
			List<List<String>> csvData = CSVHelper.parseCSV( baos.toByteArray(), null, null, null);
			//Code;ZIP Code;Country;City;Street;Building;Korpus;staircase;Appt;floor
			//749282;188689;Российская Федерация;Ленинградская Обл. п. Кудрово;улица Ленинградская;7;0;1;2;2
			if( csvData.size() <2 ) return "Empty file. Two lines the must"; 
			csvData.remove(0);
			PersistenceManager pm = PMF.getPm();
			try {
				VoBuilding vb;
				VoStreet cs;
				VoCity vcty;
				VoCountry vc;
				try {
					List<String> firstLine = csvData.get(0);
					
					vc = VoCountry.createVoCountry( firstLine.get(2), pm);
					vcty = VoCity.createVoCity(vc, firstLine.get(3), pm);
					cs = VoStreet.createVoStreet(vcty, firstLine.get(4), pm);
					String korp = firstLine.get(6);
					String fullNo = null==korp || 0 == korp.trim().length() || korp.trim().equals("0") ?  firstLine.get(5)  : 
						firstLine.get(5) + (korp.matches("[1-9]+") ? "к" + korp : korp);
					vb = VoBuilding.createVoBuilding(firstLine.get(1), cs, fullNo , null, null, pm);
					
					initPostalAddresses( csvData, pm, vb); 
					
					baos = new ByteArrayOutputStream();
					CSVHelper.writeCSV(baos, csvData, null, "\n", null);
					baos.close();
					String url = StorageHelper.saveImage(baos.toByteArray(), "text/csv", 0, true, pm, url1.getFile());
					EMailHelper.sendSimpleEMail("info@vmesteonline.ru", "csv", url);
					
				} catch (InvalidOperation e) {
					return "Failed to fill: "+e.why;
				}
				
			} finally {
				pm.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "Failed to fill: "+e.getLocalizedMessage();
		}
		return null;
	}
	private void initPostalAddresses(List<List<String>> rows, PersistenceManager pm, VoBuilding vb) throws InvalidOperation {
		
		Set<String> codeSet = new HashSet<>();
		for (List<String> items : rows) {
			VoPostalAddress pa = VoPostalAddress.createVoPostalAddress(vb, Byte.parseByte(items.get(7)), (byte) Integer.parseInt(items.get(9)), Integer.parseInt(items.get(8)), null,pm);
			pm.makePersistent(pa);
			
			String passCode;
			while(true){
				passCode = VoHelper.generateCode(2, 4).toUpperCase();
				if( codeSet.contains(passCode) )
					continue;
				List<VoInviteCode> list = executeQuery(  pm.newQuery( VoInviteCode.class, "code=='" + passCode+"'") );
				if( list.size()>0 )
					continue;
				break;
			}
			codeSet.add(passCode);
			VoInviteCode ic = new VoInviteCode( passCode, pa.getId() );
			
			pm.makePersistent(ic);
			items.set(0, passCode);
		}
	}


}
