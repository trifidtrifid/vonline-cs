package com.vmesteonline.be.access;

import com.vmesteonline.be.ServiceImpl;
import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.VoError;
import org.apache.log4j.Logger;

import javax.jdo.PersistenceManager;
import java.util.List;

public class VoServiceRoleAcessValidator extends VoTAccessValidator {
	private static final Logger logger = Logger.getLogger(VoServiceRoleAcessValidator.class.getName());
	
	public VoServiceRoleAcessValidator(ServiceImpl si) {
		super(si);
	}
	
	
	@Override
	public boolean checkAccessRights(String method) {
		try {
			if( null == si ){ 
				logger.error("No SI defined. Aceess for methos '"+method+"' could not be checked for interface. Access DENIED");
				return false;
			
			} else if(	si.isPublicMethod( method ) ){
				logger.debug( "Method '"+method+"' is public for "+si.getClass().getSimpleName()+" Access allowed");
				return true;
			} else {
					return checkAccessForUser( si.getCurrentUserId(), si.categoryId(), method );
			}
			
		} catch (InvalidOperation e) {
			if(e.what != VoError.NotAuthorized )
				e.printStackTrace();
			else
				logger.debug("Not authorized. NO user ID. Could not use method "+method);
			return false;
		}
	}


	private boolean checkAccessForUser(long currentUserId, long categoryId, String method) {
		PersistenceManager pm = PMF.getPm();
		List<VoUserAccessBase> acessList = (List<VoUserAccessBase>)pm.newQuery(si.getAuthRecordClass(), "categoryId == "+categoryId+" && userId == "+currentUserId).execute();
		for (VoUserAccessBase voUserAccessBase : acessList) {
			if( si.accessAllowed( voUserAccessBase, currentUserId, categoryId, method, pm ) )
				return true;
		}
		return false;
	}
}
