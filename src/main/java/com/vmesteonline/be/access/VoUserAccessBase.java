package com.vmesteonline.be.access;


import javax.jdo.annotations.*;

@PersistenceCapable
public class VoUserAccessBase {

	public void setAccessPermission( long flag, boolean value ){
		permissionBits = value ? permissionBits | flag : permissionBits & -flag;
	}
	public boolean getAccessPermission( long flag ) {
		return (permissionBits & flag) == flag;
	}
	
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
	
	public long getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(long categoryId) {
		this.categoryId = categoryId;
	}

	@Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
	@PrimaryKey
    private long id;
	
	@Persistent
    @Index
	protected long userId;
	
	//category of access to, like SHOP, FORUM from ServiceImpl
	@Persistent
    @Index
	protected long categoryId; 

	
	//the first(lowest) 16 bits should be used as a general access permission flags
	//second 16 bits - as a functionality specific
	@Persistent
	private long permissionBits;

	public long getPermissionBits() {
		return permissionBits;
	}
}
