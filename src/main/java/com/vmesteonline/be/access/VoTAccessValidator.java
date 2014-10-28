package com.vmesteonline.be.access;

import com.vmesteonline.be.ServiceImpl;

abstract public class VoTAccessValidator {
	
	public VoTAccessValidator(ServiceImpl si) {
		this.si = si;
	}

	protected final ServiceImpl si;
	
	public abstract boolean checkAccessRights( String method ); 
}
