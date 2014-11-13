package com.vmesteonline.be.jdo2;

import javax.jdo.PersistenceManager;
import javax.jdo.annotations.*;
import java.util.List;

import static com.vmesteonline.be.utils.VoHelper.executeQuery;

@PersistenceCapable
public class VoInitKey {
	
	public static VoInitKey getVoInitKey( PersistenceManager pm) {
		List<VoInitKey> kl = executeQuery(  pm.newQuery(VoInitKey.class, "") );
		if( 0==kl.size() ){
			VoInitKey vik = new VoInitKey();
			pm.makePersistent(vik);
			return vik;
		}
		return kl.get(0);
	}
	private VoInitKey(){
		resetCode();
	}
	
	@PrimaryKey
	@Persistent(valueStrategy = IdGeneratorStrategy.INCREMENT)
	private long id;

	@Persistent
	private long code;
	
	public String getCode(){
		return ""+code;
	}
	public String resetCode(){
		return ""+(code = System.currentTimeMillis() % 123456L);
	}
}
