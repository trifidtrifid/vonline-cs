package com.vmesteonline.be;

import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.VoInviteCode;
import com.vmesteonline.be.jdo2.postaladdress.*;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.VoError;
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
import java.util.*;

public class RegisterAddressesServlet extends QueuedServletWithKeyHelper {

	private static Logger logger = Logger.getLogger(RegisterAddressesServlet.class.getSimpleName());

	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String fileLink = req.getParameter("file");
		logger.debug("Got request with file param [" + fileLink + "] and key=" + req.getParameter("key"));
		if (null == fileLink) {
			resp.setStatus(HttpServletResponse.SC_OK, "OK");
			resp.getOutputStream().write("No 'file' parameter set".getBytes());
			return;
		}

		long now = System.currentTimeMillis();

		/* if( keyRequestAndQueuePush(req, resp) ){ */

		try {
			processReq(req, resp);
		} catch (Exception e) {
			throw new ServletException("Failed to generato codes." + e.getMessage(), e);
		}

		/*
		 * sendTheResultNotification(req, resp, now, res); }
		 */
	}

	// ===================================================================================================================

	private void processReq(HttpServletRequest req, HttpServletResponse resp) throws Exception {
		String fileLink = req.getParameter("file");
		if (null == fileLink) {
			resp.getOutputStream().write("Error: Parameter 'file' must be set".getBytes());
			return;
		}

		PersistenceManager pm = PMF.getPm();

		try {
			URL url1 = new URL(fileLink);
			InputStream content = (InputStream) url1.getContent();
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			byte[] buf = new byte[1024];
			int read;
			while (-1 != (read = content.read(buf)))
				baos.write(buf, 0, read);
			baos.close();
			List<List<String>> csvData = CSVHelper.parseCSV(baos.toByteArray(), null, null, null);
			// Code;ZIP Code;Country;City;Street;Building;Korpus;staircase;Appt;floor
			// 749282;188689;Российская Федерация;Ленинградская Обл. п. Кудрово;улица
			// Ленинградская;7;0;1;2;2
			if (csvData.size() < 2)
				throw new InvalidOperation(VoError.IncorrectParametrs, "Empty file. Two lines the must");
			List<String> header = csvData.get(0);
			csvData.remove(0);

			VoBuilding vb;
			VoStreet cs;
			VoCity vcty;
			VoCountry vc;
			int currentPos = 0;

			Set<String> codeSet = new HashSet<>();
			do {
				List<String> firstLine = csvData.get(currentPos);

				vc = VoCountry.createVoCountry(firstLine.get(2), pm);
				vcty = VoCity.createVoCity(vc, firstLine.get(3), pm);
				cs = VoStreet.createVoStreet(vcty, firstLine.get(4), pm);
				String korp = firstLine.get(6);
				String fullNo = null == korp || 0 == korp.trim().length() || korp.trim().equals("0") ? firstLine.get(5) : firstLine.get(5)
						+ (korp.matches("[1-9]+") ? "к" + korp : korp);
				vb = VoBuilding.createVoBuilding(firstLine.get(1), cs, fullNo, null, null, pm);

				// insert Building address
				csvData.add(Arrays.asList(new String[] { firstLine.get(0), firstLine.get(1), firstLine.get(2), firstLine.get(3), firstLine.get(4),
						firstLine.get(5), firstLine.get(6), "0", "0", "0" }));
				currentPos = initPostalAddresses(csvData, pm, vb, currentPos, codeSet);
			} while (currentPos != -1);
			baos = new ByteArrayOutputStream();
			List<List<String>> fullcsvData = new ArrayList<>();
			fullcsvData.add(header);
			fullcsvData.addAll(csvData);
			CSVHelper.writeCSV(baos, fullcsvData, null, "\n", null);
			baos.close();
			String file = url1.getFile();
			file = file.substring(file.lastIndexOf('/') == -1 ? 0 : file.lastIndexOf('/') + 1);
			String url = StorageHelper.saveImage(baos.toByteArray(), "text/csv", 0, true, pm, file);
			EMailHelper.sendSimpleEMail("info@vmesteonline.ru", "csv", url);

      resp.setContentType("text/csv");
      resp.addHeader("Content-Disposition", "attachment; filename=" + file);
      resp.getOutputStream().write(baos.toByteArray());
			
		} finally {
			pm.close();
		}
		return;
	}

	private int initPostalAddresses(List<List<String>> rows, PersistenceManager pm, VoBuilding vb, int offset, Set<String> codeSet)
			throws InvalidOperation {

		if (rows.size() < offset)
			return -1;

		List<String> nextItem = rows.get(offset);
		String addrLIneToCheck = nextItem.get(2) + nextItem.get(3) + nextItem.get(4) + nextItem.get(5) + nextItem.get(6);

		for (int index = offset; index < rows.size(); index++) {

			List<String> items = rows.get(index);
			if (addrLIneToCheck.equalsIgnoreCase(nextItem.get(2) + nextItem.get(3) + nextItem.get(4) + nextItem.get(5) + nextItem.get(6))) {

				VoPostalAddress pa = VoPostalAddress.createVoPostalAddress(vb, Byte.parseByte(items.get(7)), (byte) Integer.parseInt(items.get(9)),
						Integer.parseInt(items.get(8)), null, pm);
				pm.makePersistent(pa);

				VoInviteCode ic = VoHelper.createNewInviteCode(2, 4, pa, codeSet, pm);

				pm.makePersistent(ic);
				items.set(0, ic.getCode());
			} else {
				return offset;
			}
		}
		return -1;
	}

}
