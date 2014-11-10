package com.vmesteonline.be.jdo2;

import com.vmesteonline.be.thrift.messageservice.Attach;
import com.vmesteonline.be.utils.StorageHelper;

import javax.jdo.PersistenceManager;
import javax.jdo.annotations.*;
import javax.mail.internet.ContentType;
import java.util.HashMap;
import java.util.Map;

@PersistenceCapable
public class VoFileAccessRecord {

	private String fileName;


	public VoFileAccessRecord( long userId, boolean isPublic, String fileName, String contentType, String versionKey, VoFileAccessRecord parent) {
		this.fileName = (this.userId=userId) + "_" + ((this.isPublic=isPublic) ? "public" : "private")+(System.currentTimeMillis() % 10000) +"_"+fileName.replaceAll("[^A-Za-z0-9._]", "");
		if(this.fileName.length() > 128) this.fileName = this.fileName.substring(1,128);
		this.publicFileName=fileName;
		this.bucket = ".";
		this.contentType = contentType;
		this.createdAt = (int)(System.currentTimeMillis() / 1000L );
		if( null != parent ) parent.setVersion(versionKey, this);
	}
	
	public VoFileAccessRecord( long userId, boolean isPublic, String fileName, String contentType) {
		this( userId, isPublic, fileName, contentType, null, null ); 
	}
	
	public long getId() {
		return id;
	}

	public long getUserId() {
		return userId;
	}

	public boolean isPublic() {
		return isPublic;
	}

	public String getFileName(){
		return publicFileName == null ? fileName : publicFileName;
	}
	public String getFullFileName() {
		return bucket + "/"+fileName;
	}
	
	public String getContentType() {
		return contentType;
	}
	
	public void updateContentParams( String contentType, String publicName ){
		if( null==this.contentType || this.contentType.equals( StorageHelper.DEFAULT_CONTENT_TYPE )){
			this.contentType = contentType;
			this.publicFileName = publicName;
		}
	}

	@Persistent(valueStrategy = IdGeneratorStrategy.INCREMENT)
	@PrimaryKey
	private long id;
	
	@Persistent
	private int createdAt;
	
	@Persistent
	private long userId;
	
	@Persistent
	private boolean isPublic;
	
	@Persistent
	private String bucket;
	
	@Persistent

	private String publicFileName;
	
	@Persistent
	private String contentType;
	
	@Persistent
	private String url;

    @Persistent
    byte[] data;

	@Persistent(table="fileaccessrecordversions")
    @Key(types = String.class)
    @Value(types=VoFileAccessRecord.class, dependent="true")
    @Join(column = "query")
    @Element(column = "version")
	Map<String,VoFileAccessRecord> versions;

    public void setData(byte[] data) {
        this.data = data;
    }

    public byte[] getData() {
        return data;
    }

    public VoFileAccessRecord getVersion(Map<String, String[]> params, PersistenceManager p) {
		return getVersion(params,p,true);
	}
	
	private VoFileAccessRecord getVersion(Map<String, String[]> params, PersistenceManager pm, boolean createIfNotExists) {
		if( null != params && params.size() != 0 ) {
			if( null!=contentType){
				try {
					ContentType ct = new ContentType(contentType);
					if( null !=  ct){
						VersionCreator vc  = StorageHelper.getVersionCreator( this, ct, pm );
						if( null != vc ){
							return vc.createParametrizedVersion( params, createIfNotExists);
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return this;
	}
	
	public static interface VersionCreator {
		VoFileAccessRecord createParametrizedVersion(Map<String, String[]> params, boolean createIfNotExists);
	}

	public VoFileAccessRecord getVersion(String string) {
		return null==versions ? null : versions.get(string);
	}

	public VoFileAccessRecord setVersion(String versionKey, VoFileAccessRecord ver) {
		if(null==versions)
			versions = new HashMap<String,VoFileAccessRecord>(); 
		versions.put( versionKey, ver);
		return ver;
	}

	public boolean isImage() {
		return contentType.startsWith("image");
	}

	public Attach getAttach() {
		return new Attach(publicFileName, contentType, getURL());
	}
	
	public String getURL() {
		if( null != url && url.trim().length() > 0 ) return url;
		return url = "/file/" + StorageHelper.numberToString(id)+ fileName.substring(fileName.indexOf("."));
	}
}
