package com.vmesteonline.be.jdo2.business;

import javax.jdo.PersistenceManager;
import javax.jdo.annotations.*;

import com.vmesteonline.be.MessageServiceImpl;
import com.vmesteonline.be.jdo2.GeoLocation;
import com.vmesteonline.be.jdo2.VoFileAccessRecord;
import com.vmesteonline.be.jdo2.VoUser;
import com.vmesteonline.be.jdo2.VoUserGroup;
import com.vmesteonline.be.thrift.GroupType;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.businesservice.BusinessDescription;
import com.vmesteonline.be.thrift.businesservice.BusinessInfo;
import com.vmesteonline.be.thrift.messageservice.Attach;
import com.vmesteonline.be.utils.StorageHelper;
import com.vmesteonline.be.utils.VoHelper;

import java.math.BigDecimal;
import java.util.*;

@PersistenceCapable
@Inheritance(strategy = InheritanceStrategy.NEW_TABLE)
public class VoBusiness extends VoUser  {
	
	private VoBusiness(String name, String lastName, String email, String password) {
		super(name, lastName, email, password);		
	}

	public static VoBusiness create( BusinessDescription bd, String email, String password, PersistenceManager pm){
		
		List<Long> rslt = VoHelper.executeQuery( pm.newQuery("SQL","SELECT 1 FROM VOUSER WHERE email='"+email+"' UNION SELECT 1 FROM VOBUSINESS where email='"+email+"'"));
		if( !rslt.isEmpty() )
			return null; // возвращает нул только если не удалось создать бизнес аккаанут т.к. на указанный email уже зарегистрировано пользователь или бизнем
		
		VoBusiness vb = new VoBusiness( bd.shortName, "", email, password);
		
		vb.setShortName(bd.shortName);
		vb.setFullInfo(bd.getFullInfo());
		vb.setShortInfo(bd.getShortInfo());
		vb.setAddressLine(bd.address);
		vb.setRadius(bd.radius);
		try {
			VoUserGroup ug = VoUserGroup.createVoUserGroup( new BigDecimal(bd.longitude), new BigDecimal(bd.latitude), bd.radius, (byte)0, (byte)0, bd.shortName, 10000, GroupType.NOBODY.getValue(),pm);
			vb.setGroups( Arrays.asList( new Long[]{ ug.getId()}));
		} catch (InvalidOperation e1) {			
			e1.printStackTrace();
		}
		

		pm.makePersistent(vb);
		bd.setId( vb.getId() );
		if (bd.images != null) {
			List<Attach> savedImages = new ArrayList<Attach>();
			for (Attach img : bd.images) {
				VoFileAccessRecord cfar ;
				try {
					cfar = StorageHelper.loadAttach(pm, vb.getId(), img);
					vb.images.add( cfar.getId());
					savedImages.add(cfar.getAttach());
				} catch (InvalidOperation e) {					
					e.printStackTrace();
				}				
			}
			bd.images = savedImages;
		}
		
		if( null!=bd.logo){
			VoFileAccessRecord cfar;
			try {
				cfar = StorageHelper.loadAttach(pm, vb.getId(), bd.logo);
				vb.setLogo(cfar.getId());
				bd.logo = cfar.getAttach();
			} catch (InvalidOperation e) {
				e.printStackTrace();
			}
		}
		pm.makePersistent(vb);
		return vb;
	} 
	
	public BusinessInfo getBusinessInfo(GeoLocation from, PersistenceManager pm){
		int dist = 0;
		if( null!=from){
			dist = VoHelper.calculateRadius(from, this);
		}
		return new BusinessInfo(id, shortName,shortInfo,
				pm.getObjectById(VoFileAccessRecord.class,logo).getURL(),addressLine, dist);				
	}
	
	public BusinessDescription getBusinessDescription(PersistenceManager pm){
		
		List<Attach> imgs = new ArrayList<Attach>();
    if( null!=images )
        for (Long farId : images) {
            VoFileAccessRecord att = pm.getObjectById(VoFileAccessRecord.class, farId);
            imgs.add(att.getAttach());
        }
    
		return new BusinessDescription(id, shortName, fullName, shortInfo, fullInfo, 
				pm.getObjectById(VoFileAccessRecord.class,logo).getAttach(),
				imgs, addressLine, latitude, longitude, radius);
	}
	
	public BusinessDescription update(BusinessDescription bd,PersistenceManager pm){
		
		VoBusiness vb;
		try {
			vb = pm.getObjectById(VoBusiness.class, bd.getId());
		} catch (Exception e) {			
			e.printStackTrace();
			return null;
		}

		vb.setShortName(bd.shortName);
		vb.setFullInfo(bd.getFullInfo());
		vb.setShortInfo(bd.getShortInfo());
		vb.setAddressLine(bd.address);
		vb.setRadius(bd.radius);
		try {
			if( vb.getGroups() != null){
				for( Long gid: vb.getGroups())
					pm.deletePersistent( pm.getObjectById( VoUserGroup.class, gid ));
			}
			VoUserGroup ug = VoUserGroup.createVoUserGroup( new BigDecimal(bd.longitude), new BigDecimal(bd.latitude), bd.radius, (byte)0, (byte)0, bd.shortName, 10000, GroupType.NOBODY.getValue(),pm);
			vb.setGroups( Arrays.asList( new Long[]{ ug.getId()}));
		} catch (InvalidOperation e1) {			
			e1.printStackTrace();
		}
		
		vb.setImages( MessageServiceImpl.updateAttachments(vb.getImages(), bd.getImages(), vb.getId(), pm));
		if( bd.logo != null ) {
			boolean logoChanged = true;
			if( vb.logo != null ){
				VoFileAccessRecord logoFCAR = pm.getObjectById(VoFileAccessRecord.class, vb.logo );
				if( logoFCAR.getURL().equalsIgnoreCase( bd.logo.URL) )
					logoChanged = false;
				else {
					pm.deletePersistent(logoFCAR);
				}
			}
			if(logoChanged){
				VoFileAccessRecord cfar;
				try {
					cfar = StorageHelper.loadAttach(pm, vb.getId(), bd.logo);
					vb.setLogo(cfar.getId());
					bd.logo = cfar.getAttach();
				} catch (InvalidOperation e) {
					e.printStackTrace();
				}
			}			
		}
		return bd;
	}
	
	@Persistent
	String 	shortName;
	@Persistent
	String 	fullName;
	@Persistent
	String 	shortInfo;
	@Persistent
	String 	fullInfo;
	
	@Persistent(table="businessimages")
  @Join(column = "businessid")
  @Element(column = "imageid")
	Long 	logo;
  
	@Persistent(table="businessimages")
  @Join(column = "businessid")
  @Element(column = "imageid")
	protected List<Long> images;
	
	@Persistent
	String 	addressLine;
	@Persistent
	int 	radius;

	public String getShortName() {
		return shortName;
	}

	public void setShortName(String shortName) {
		this.shortName = shortName;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getShortInfo() {
		return shortInfo;
	}

	public void setShortInfo(String shortInfo) {
		this.shortInfo = shortInfo;
	}

	public String getFullInfo() {
		return fullInfo;
	}

	public void setFullInfo(String fullInfo) {
		this.fullInfo = fullInfo;
	}

	public Long getLogo() {
		return logo;
	}

	public void setLogo(Long logo) {
		this.logo = logo;
	}

	public List<Long> getImages() {
		return images;
	}

	public void setImages(List<Long> images) {
		this.images = images;
	}

	public String getAddressLine() {
		return addressLine;
	}

	public void setAddressLine(String address) {
		this.addressLine = address;
	}

	public int getRadius() {
		return radius;
	}

	public void setRadius(int radius) {
		this.radius = radius;
	}
	
}
