package com.vmesteonline.be.jdo2;

import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.VoError;
import org.apache.log4j.Logger;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.jdo.annotations.*;
import java.util.List;

import static com.vmesteonline.be.utils.VoHelper.executeQuery;

@PersistenceCapable
@Unique(name="IC_ID_IDX", members = {"code"})
public class VoInviteCode {

	public VoInviteCode(String code, long postalAddressId) {
		this.code = code;
		this.postalAddressId = postalAddressId;
	}

	public long getPostalAddressId() {
		return postalAddressId;
	}

	public void registered() {
		registeredByCode++;
	}

	public long getId() {
		return id;
	}
	
	public String getCode(){
		return code;
	}

	@SuppressWarnings("unchecked")
	public static VoInviteCode getInviteCode(String inviteCode, PersistenceManager pm) throws InvalidOperation {
		Query q = pm.newQuery(VoInviteCode.class);
		q.setFilter("code == cv");
        q.declareParameters("String cv");
		List<VoInviteCode> voInviteCodes = executeQuery( q, inviteCode);
		if (voInviteCodes.isEmpty())
			throw new InvalidOperation(VoError.IncorectLocationCode, "unknown invite code " + inviteCode);
		if (voInviteCodes.size() != 1) {
			Logger.getLogger(VoInviteCode.class.getName()).error("has more than one invite code " + inviteCode);
		}
		return voInviteCodes.get(0);
	}

	@PrimaryKey
	@Persistent(valueStrategy = IdGeneratorStrategy.INCREMENT)
	private long id;

	@Persistent
	private String code;

	@Persistent
	private long postalAddressId;

	@Persistent
	private int registeredByCode;

	@Override
	public String toString() {
		return "VoInviteCode [id=" + id + ", code=" + code + ", postalAddressId=" + postalAddressId + ", registeredByCode=" + registeredByCode + "]";
	}

}
