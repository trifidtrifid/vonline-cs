package com.vmesteonline.be;

import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.VoFileAccessRecord;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.utils.StorageHelper;
import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.log4j.Logger;

import javax.jdo.PersistenceManager;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * A simple servlet that proxies reads and writes to its Google Cloud Storage bucket.
 */
@SuppressWarnings("serial")
public class VoFileAccess extends HttpServlet {

	ServiceImpl serviceImpl;

	public VoFileAccess() {
		super();
		this.serviceImpl = new ServiceImpl();
	}

	/*
	 * Method returns content of file by provided URL or deletes the file depend on presence of 'delete' parameter of request
	 * 
	 * @see javax.servlet.http.HttpServlet#doGet(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		serviceImpl.setSession(req.getSession());

		// TODO check user rights

		PersistenceManager pm = PMF.getPm();
		try {
			long fileId = StorageHelper.getFileId(req.getRequestURI());
			VoFileAccessRecord far;
			try {
				far = pm.getObjectById(VoFileAccessRecord.class, fileId);
			} catch (Exception e) {
				resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
				return;
			}

			if (null != req.getParameter("delete") && (far.getUserId() == serviceImpl.getCurrentUserId(pm))) {
				StorageHelper.deleteImage(req.getRequestURI(), pm);
				resp.setStatus(HttpServletResponse.SC_OK);
				pm.deletePersistent(far);
				
			} else if (far.isPublic() || far.getUserId() == serviceImpl.getCurrentUserId(pm)) {
			
				resp.setHeader("Pragma-directive", "cache");
				resp.setHeader("Cache-directive", "cache");
				resp.setHeader("Cache-control", "cache");
				resp.setHeader("Pragma", "cache");
				resp.setHeader("Expires", "100000");
				StorageHelper.sendFileResponse(req, resp);

			} else {
				resp.sendError(HttpServletResponse.SC_FORBIDDEN, "Access denied");
			}

		} catch (InvalidOperation e) {
			resp.sendError(HttpServletResponse.SC_SERVICE_UNAVAILABLE, e.why);
			logger.warn("Failed to process request:" + e.getMessage() + " ");
			e.printStackTrace();
			
		}
	}

	/*
	 * Saves content of the request and returns URL as the rsponse If 'public' paramenetr of request found - file would be saved as public, private
	 * otherwise
	 * 
	 * @see javax.servlet.http.HttpServlet#doPost(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	@Override
	public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		serviceImpl.setSession(req.getSession());

		PersistenceManager pm = PMF.getPm();
		try {
			long currentUserId = serviceImpl.getCurrentUserId(pm);
			boolean isPublic = false;
			String extURL = null;
			String fname = "fileName";
			String contentType = "binary/stream";
			
      ServletFileUpload upload = new ServletFileUpload();
      FileItemIterator iterator = upload.getItemIterator(req);
      byte[] fileData = null;
      byte[] fieldCOntentBuf = new byte[8096];
      
      while(iterator.hasNext()) {
      	FileItemStream item = iterator.next();
          if (item.isFormField()) {
              // Process regular form field (input type="text|radio|checkbox|etc", select, etc).
              String fieldname = item.getFieldName();
              
              int read = item.openStream().read(fieldCOntentBuf);
              String fieldvalue = read > 0 ? new String(fieldCOntentBuf,0,read) : "";
              
              if( "extURL".equalsIgnoreCase(fieldname)){
              	extURL = fieldvalue;
              } else if( "public".equalsIgnoreCase(fieldname)){
                isPublic = true;
              } else if( "fname".equalsIgnoreCase(fieldname)){
              	fname = fieldvalue;
              } 
          } else {
              String fieldname = item.getFieldName();
              if("data".equalsIgnoreCase(fieldname)){
              	InputStream is = item.openStream();
              	fname = item.getName();
              	contentType = item.getContentType();
              	byte[] buf = new byte[8096];
              	int read;
              	ByteArrayOutputStream baos = new ByteArrayOutputStream();
              	while(-1!= (read = is.read(buf)))
              		baos.write(buf, 0, read );
              	baos.close();
              	fileData = baos.toByteArray();	
              }
          }
      }
		
      if( null!=fileData ){
      	resp.getOutputStream().write(
						StorageHelper.saveImage(fname, contentType, currentUserId, isPublic, fileData, pm).getBytes());
      } else if (extURL != null ){
      	resp.getOutputStream().write(StorageHelper.saveImage(extURL, currentUserId, isPublic, pm).getBytes());
      } else {
      	throw new IOException("File data or 'extUrl' parameter must be set to upload file.");
      }
        
    } catch (FileUploadException e) {
    	resp.sendError(HttpServletResponse.SC_SERVICE_UNAVAILABLE, e.getMessage());
			logger.warn("Failed to save file:" + e.getMessage() + " ");
			e.printStackTrace();
    } catch (InvalidOperation e) {
			resp.sendError(HttpServletResponse.SC_SERVICE_UNAVAILABLE, e.why);
			logger.warn("Failed to save file:" + e.getMessage() + " ");
			e.printStackTrace();
		} 
	}

	private static Logger logger = Logger.getLogger(VoFileAccess.class.getName());

}
