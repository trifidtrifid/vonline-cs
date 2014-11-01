package com.vmesteonline.be.utils;

import com.vmesteonline.be.ServiceImpl;
import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.VoFileAccessRecord;
import com.vmesteonline.be.jdo2.VoFileAccessRecord.VersionCreator;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.VoError;
import com.vmesteonline.be.thrift.messageservice.Attach;
import org.apache.log4j.Logger;

import javax.jdo.JDOObjectNotFoundException;
import javax.jdo.PersistenceManager;
import javax.mail.internet.ContentType;
import javax.mail.internet.ParseException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.math.BigInteger;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Base64;
import java.util.Map;

public class StorageHelper {

    public static final String DEFAULT_CONTENT_TYPE = "binary/stream";
    private static final Base64.Decoder Base64Decoder = Base64.getDecoder();
    private static final Base64.Encoder Base64Encoder = Base64.getEncoder();

    public static class FileSource {

        public FileSource(String fname2, String contentType2, InputStream is2) {
            this.fname = fname2;
            this.contentType = contentType2;
            this.is = is2;
        }

        public String fname;
        public String contentType;
        public InputStream is;
    }

    private static class FileObject implements Serializable {
        byte[] data;
        String fileName;
        String contentType;

        public FileObject(byte[] data, String fileName, String contentType) {
            super();
            this.data = data;
            this.fileName = fileName;
            this.contentType = contentType;
        }
    }

    private static Logger logger = Logger.getLogger(StorageHelper.class.getCanonicalName());

    /**
     * Used below to determine the size of chucks to read in. Should be > 1kb and < 10MB
     */
    private static final int BUFFER_SIZE = 2 * 1024 * 1024;

    /**
     * This is where backoff parameters are configured. Here it is aggressively retrying with backoff, up to 10 times but taking no more that 15 seconds
     * total to do so.
     */
    public StorageHelper() {
    }

    /**
     * MEthod saves image that provided as an http URL or as a JPEG data and returns URL the image is accessible from
     *
     * @param urlOrContent - http URL or content of a JPEG coded image
     * @return
     */
    public static String saveImage(byte[] urlOrContent, long ownerId, boolean isPublic, PersistenceManager _pm) throws IOException {
        return saveImage(urlOrContent, null, ownerId, isPublic, _pm, null);

    }
    //===================================================================================================================

    public static String saveImage(byte[] urlOrContent, String _contentType, long ownerId, boolean isPublic, PersistenceManager _pm, String fileName) throws IOException {

        FileSource fs = createFileSource(urlOrContent, _contentType, fileName);
        if (null == fs)
            return new String(urlOrContent); //local URL found in urlOrContent
        else
            return saveImage(fs.fname, fs.contentType, ownerId, isPublic, loadDataFromStream(fs.is).toByteArray(), _pm);
    }

    // ===================================================================================================================

    public static VoFileAccessRecord createFileAccessRecord(long userId, boolean isPublic, String fileName, String contentType) {
        return new VoFileAccessRecord(userId, isPublic, fileName, contentType);
    }

    // ===================================================================================================================

    public static String saveImage(String urlOrContent, long onerId, boolean isPublic, PersistenceManager _pm) throws IOException {
        return saveImage(urlOrContent.getBytes(), onerId, isPublic, _pm);
    }

    // ===================================================================================================================

    public static String replaceImage(String urlOrContent, String oldURL, long userId, Boolean isPublic, PersistenceManager _pm) throws IOException {

        if (urlOrContent.equals(oldURL)) return oldURL;

        PersistenceManager pm = _pm == null ? PMF.getPm() : _pm;
        String contentType = "image/jpeg";
        String fname = "img.jpeg";

        if (null != oldURL) {
            long oldFileId = getFileId(oldURL);

            try {
                VoFileAccessRecord oldFile = pm.getObjectById(VoFileAccessRecord.class, oldFileId);
                contentType = oldFile.getContentType();
                fname = oldFile.getFileName();

                if (0 == userId)
                    userId = oldFile.getUserId();
                if (null == isPublic)
                    isPublic = oldFile.isPublic();
                deleteImage(oldURL, pm);
            } catch (JDOObjectNotFoundException onfe) {
            }
        }
        return saveImage(urlOrContent.getBytes(), contentType, userId, isPublic, pm, fname);
    }

    // ===================================================================================================================

    /**
     * Transfer the data from the inputStream to the outputStream. Then close both streams.
     */
    private static void streamCopy(InputStream input, OutputStream output) throws IOException {
        try {
            byte[] buffer = new byte[BUFFER_SIZE];
            int bytesRead = input.read(buffer);
            while (bytesRead != -1) {
                output.write(buffer, 0, bytesRead);
                bytesRead = input.read(buffer);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            output.close();
            input.close();
        }
    }

    // ===================================================================================================================
    public static boolean getFile(String url, OutputStream os, Map<String, String[]> params) throws IOException {
        long oldFileId = getFileId(url);
        PersistenceManager pm = PMF.getPm();
        try {
            VoFileAccessRecord vfar = pm.getObjectById(VoFileAccessRecord.class, oldFileId);
            VoFileAccessRecord version = vfar.getVersion(params, pm);
            os.write((version == null ? vfar : version).getData());
            return true;
        } catch (JDOObjectNotFoundException onfe) {
            return false;
        }
    }

    // ===================================================================================================================
    public static void sendFileResponse(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String queryString = req.getRequestURI() + (req.getQueryString() == null ? "" : "?" + req.getQueryString());
        logger.debug("Got request: URL:" + queryString);

        byte[] fileData = null;

        //req.getParameter("useCache")
        Object response = null != queryString ?
                ServiceImpl.getObjectFromCache(queryString) : null;

        if (null != response && (response instanceof byte[] || response instanceof FileObject)) {

            if (response instanceof byte[]) {
                fileData = (byte[]) response;
                logger.debug("Get '" + queryString + "' from cache.");

            } else if (response instanceof FileObject) {
                FileObject fo = (FileObject) response;
                fileData = fo.data;
                resp.setContentType(fo.contentType);
                resp.addHeader("Content-Disposition", "attachment; filename=" + fo.fileName);
            } else {
                logger.warn("Cahce stotores Object:" + response + " of class " + response.getClass() + " would be removed.");
                ServiceImpl.removeObjectFromCache(queryString);
            }

        } else {
            long oldFileId = getFileId(req.getRequestURI());
            PersistenceManager pm = PMF.getPm();

            try {
                VoFileAccessRecord vfar = pm.getObjectById(VoFileAccessRecord.class, oldFileId);
                resp.setStatus(HttpServletResponse.SC_OK);
                String fileName = URLEncoder.encode(vfar.getFileName(), "UTF-8");
                resp.setContentType(vfar.getContentType() + "; filename=" + fileName);
                resp.addHeader("Content-Disposition", "attachment; filename=" + fileName);
                VoFileAccessRecord theVersion = vfar.getVersion(queryString);
                if (null == theVersion) {
                    theVersion = vfar.getVersion(req.getParameterMap(), pm);
                    vfar.setVersion(queryString, theVersion);
                }

                if (null != queryString)
                    ServiceImpl.putObjectToCache(queryString, new FileObject(fileData, fileName, theVersion.getData() + "; filename=" + fileName));
                fileData = theVersion.getData();

            } catch (JDOObjectNotFoundException onfe) {
                resp.sendError(HttpServletResponse.SC_NOT_FOUND, "Not Found");
                return;
            }

        }
        resp.getOutputStream().write(fileData);
    }

    // ===================================================================================================================
    public static String saveImage(String fileName, String contentType, long userId, boolean isPublic, byte[] data, PersistenceManager _pm)
            throws IOException {
        VoFileAccessRecord vfar = saveAttach(fileName, contentType, userId, isPublic, data, _pm);
        return createFullFileName(fileName, contentType, vfar);

    }

    //===================================================================================================================
    public static VoFileAccessRecord saveAttach(String fileName, String contentType, long userId, boolean isPublic, InputStream input, PersistenceManager _pm)
            throws IOException {
        ByteArrayOutputStream output = loadDataFromStream(input);
        return saveAttach( fileName,  contentType,  userId,  isPublic, output.toByteArray(), _pm);
    }

    private static ByteArrayOutputStream loadDataFromStream(InputStream input) {
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        try {

            byte[] buffer = new byte[BUFFER_SIZE];
            int bytesRead = input.read(buffer);
            while (bytesRead != -1) {
                output.write(buffer, 0, bytesRead);
                bytesRead = input.read(buffer);
            }
            output.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return output;
    }

    public static VoFileAccessRecord saveAttach(String fileName, String contentType, long userId, boolean isPublic, byte[] data, PersistenceManager _pm)
			throws IOException {
		VoFileAccessRecord vfar = createFileAccessRecord(userId, isPublic, fileName, contentType);
		PersistenceManager pm = null == _pm ? PMF.getPm() : _pm;
		vfar = pm.makePersistent(vfar);

		try {
			saveFileData(data, vfar);
			
			return vfar;
		} catch (Exception e) {
			e.printStackTrace();
			throw new IOException("Failed to save file. " + e.getMessage(), e);
		}
	}
	
//===================================================================================================================

	private static String createFullFileName(String fileName, String contentType, VoFileAccessRecord vfar)  {
		int liop = fileName.lastIndexOf('.'); // append with '.bin' extension if no extension is set
		ContentType cType = null;;
		try {
			cType = new ContentType(contentType);
		} catch (Exception e) {
			logger.warn("Failed to parse content type string '"+contentType+"'. Default would be used");
			try {
				cType = new ContentType(contentType = DEFAULT_CONTENT_TYPE);
			} catch (ParseException e1) {
			}
		}
		String url = getURL(vfar.getId(), 
				-1 == liop ? 	
						(contentType.equals(DEFAULT_CONTENT_TYPE) ? 
								"dat" : cType.getSubType())
								: 
								fileName.substring(liop + 1));
		logger.debug( "File '" + vfar.getFileName() + "' stored with GSNAme:" + vfar.getFullFileName() + " with objectID:" + vfar.getId() + " URL:" + url);
		return url;
	}

	public static void saveFileData(byte[] data, VoFileAccessRecord vfar) throws IOException {
        vfar.setData(data);
		//streamCopy(is, new FileOutputStream( vfar.getFullFileName() ));
	}

	// =====================================================================================================================

	public static boolean deleteImage(String url, PersistenceManager _pm) throws IOException {
		long oldFileId = getFileId(url);
		PersistenceManager pm = null == _pm ? PMF.getPm() : _pm;
		try {
			pm.deletePersistent(pm.getObjectById(VoFileAccessRecord.class, oldFileId));
			return true;
		} catch (JDOObjectNotFoundException onfe) {
			return false;
		}
	}

	// ===================================================================================================================


	// ===================================================================================================================
	public static String getURL(long id, String ext) {
		return "/file/" + numberToString(id) + "." + ext;
	}

	// ===================================================================================================================
	public static long getFileId(String requestURI) {
		String[] splits = requestURI.split("/", 3);
		if (splits.length < 3 || !splits[0].equals("") || !splits[1].equals("file") || splits[2].length() == 0) {
			throw new IllegalArgumentException("The URL '" + requestURI + "' is not formed as expected. " + "Expecting /file/<id>.<extension>");
		}
		splits = splits[2].split("[.]", 2);
		if (splits.length < 2 || splits[0].length() < 2) {
			throw new IllegalArgumentException("The URL '" + requestURI + "' is not formed as expected. " + "Expecting /file/<id>.<extension>");
		}
		return stringToNumber(splits[0]);
	}

	// ===================================================================================================================
	public static String numberToString(Long n) {
		String string = new String( Base64Encoder.encode(BigInteger.valueOf(n).toByteArray()));
		string = string.substring(0, string.length() - 1);
		string = string.replace("/", "_");
		return string;
	}

	public static long stringToNumber(String str) {
		str = str.replace("_", "/") + "=";
		return new BigInteger(Base64Decoder.decode(str)).longValue();
	}
//===================================================================================================================

	public static VersionCreator getVersionCreator(VoFileAccessRecord orig, ContentType ct, PersistenceManager pm) {
		if( ct.getPrimaryType().equalsIgnoreCase("image"))
			return new ImageConverterVersionCreator(orig,ct,pm);
		
		final VoFileAccessRecord original = orig;
		//create default creator that just returns the original 
		return new VersionCreator( ) {
			@Override
			public VoFileAccessRecord createParametrizedVersion(Map<String, String[]> params, boolean createIfNotExists) {
				return original;
			}
		};
	}

	//===================================================================================================================
	public static FileSource createFileSource( Attach att ) throws IOException {
		return createFileSource( att.URL.getBytes(), att.contentType, att.fileName); 
	}
	
	//===================================================================================================================

	public static FileSource createFileSource( byte[] urlOrContent, String _contentType, String fileName) throws IOException {
		if (null == urlOrContent || 0 == urlOrContent.length) {
			throw new IOException("Invalid content. Failed to store null or empty content");

		} else {
			
			boolean unquoteReq = urlOrContent.length != 1 && urlOrContent[0] == '\"' && urlOrContent[ urlOrContent.length-1] == '\"';
			
			String fname = null == fileName ? null : fileName;
			String contentType = null==_contentType ? DEFAULT_CONTENT_TYPE : _contentType;
			String ext = ".bin";
			InputStream is = null;
			
			String contentString = new String( urlOrContent, unquoteReq ? 1 : 0, 
					Math.min( 256, urlOrContent.length-1 ));
			
			if( contentString.startsWith("url(")){
				
				String[] split = (unquoteReq ? new String( urlOrContent, 1, urlOrContent.length-2 ) 
					: new String( urlOrContent))
					.split("[():;,]");
				
				if( split.length >= 5 && split[0].equalsIgnoreCase("URL") && split[1].matches("\"?data")){
					String data = new String( urlOrContent).split("[():;,]")[4];
					if( split[1].startsWith("\"") )
						data = data.substring(0,data.length()-1);
					if( split[3].equals("base64")){
						is = new ByteArrayInputStream( Base64Decoder.decode(data));
						contentType = split[2];
					} 
				}
				
				try {
					String st = new ContentType(contentType).getSubType();
					ext = (null==st || st.length() == 0) ? ".bin" : "."+st;
				} catch (ParseException e) {
					e.printStackTrace();
				}
				fname = numberToString((long) (Math.random() * Long.MAX_VALUE)) + ext;
						
			} else if( contentString.startsWith("obj(")){
				//obj(name:<base64.name>;data:image/png;content:<base64.content>)
				String[] avps = new String( urlOrContent, 4, urlOrContent.length - 5).split(";");
				if( avps.length < 3 ){
					logger.warn("Faild to parse OBJ representation of content '"+contentString+"' ");
					
				} else {
					if( !avps[0].startsWith("name:"))
						logger.warn("Faild to parse OBJ representation of content. No name: at first pos of '"+contentString+"' ");
					else {
						fname = new String( Base64Decoder.decode(avps[0].split(":")[1]), "UTF-8");
					}
					if( !avps[1].startsWith("data:"))
						logger.warn("Faild to parse OBJ representation of content. No data: at second pos of '"+contentString+"' ");
					else {
						contentType = avps[1].split(":")[1];
					}
					if( !avps[1].startsWith("content:"))
						logger.warn("Faild to parse OBJ representation of content. No content: at third pos of '"+contentString+"' ");
					else {
						is = new ByteArrayInputStream( Base64Decoder.decode(avps[2].split(":")[1]) );
					}
				}
					
				
			} else if( contentString.startsWith("http://") || contentString.startsWith("https://") ){
			
					try { // try to create URL from content
						URL url = new URL(unquoteReq ? new String( urlOrContent, 1, urlOrContent.length-2 ) : new String( urlOrContent));
						if (null != url.getProtocol() && url.getProtocol().toLowerCase().startsWith("http")) {
							HttpURLConnection httpConnection = (HttpURLConnection) url.openConnection();
							httpConnection.connect();
							httpConnection.getHeaderFields();
							contentType = httpConnection.getContentType();
							is = httpConnection.getInputStream();
						} else {
							is = url.openStream();
							// file name for the same sources will be the same
						}
						fname = url.getFile();
		
					} catch (MalformedURLException e) {
						
					}
			} else if( contentString.startsWith("/file/")  ){ //it's a local file
				return null; 
				
			}
			
			if( is == null && urlOrContent.length % 4 == 0 ){ //try to decode base64 
					try {
						is = new ByteArrayInputStream( Base64Decoder.decode( new String(urlOrContent) ));
					} catch( Exception ee){
						logger.warn("Content is not Base64 ("+ee.getMessage()+") and not an URL, 'obj' nor 'url' would try to read as binary");
					}
			}
							
			if( null==is )
				is = new ByteArrayInputStream( urlOrContent );
			
			fname =  null==fname  ? 
					numberToString((long) (Math.random() * Long.MAX_VALUE)) + ext : 
						fname ;
			
			return new FileSource( fname, contentType, is);
		}
	}

	public static VoFileAccessRecord loadAttach(PersistenceManager pm, long userId, Attach attach) throws InvalidOperation {
		VoFileAccessRecord cfar;
		try {
			FileSource fs = createFileSource( attach );
			if( fs == null ){
				cfar = pm.getObjectById(VoFileAccessRecord.class, getFileId(attach.getURL()));
				cfar.updateContentParams(attach.contentType, attach.fileName);
			}	else {
                cfar = saveAttach( fs.fname, fs.contentType, userId, true, fs.is, pm);
			}
			
		} catch (IOException e) {
			throw new InvalidOperation(VoError.IncorrectParametrs, "FAiled to upload content. "+e);
		}
		return cfar;
	}

}
