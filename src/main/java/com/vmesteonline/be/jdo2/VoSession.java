package com.vmesteonline.be.jdo2;

import com.vmesteonline.be.thrift.authservice.CurrentAttributeType;

import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;
import java.util.HashMap;
import java.util.Map;

//extends GeoLocation

@PersistenceCapable
public class VoSession {

	public VoSession(String sessId, VoUser user) {

		// this.id = KeyFactory.createKey(VoSession.class.getSimpleName(), sessId);
		id = sessId;
		setUser(user);
		curAttrMap = new HashMap<Integer, Long>();
	}

	public void setUser(VoUser user) {
		if (null != user) {
			setName(user.getName());
			setLastName(user.getLastName());
			setUserId(user.getId());
		} else {
			setName("");
			setLastName("Гость");
			setName("");
		}
	}

	public void setId(String s) {
		id = s;
	}

	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	@PrimaryKey
	@Persistent
	protected String id;

	@Persistent
	
	private String name;

	@Persistent
	
	private String lastName;

	@Persistent
	private long userId;

	@Persistent
	private int lastActivityTs; //дата последнего действия пользователя

	@Persistent
	
	private int lastUpdateTs; //дата последнего запроса обновления 

	@Persistent
	
	private Map<Integer, Long> curAttrMap;

	/**
	 * Map that contains quantity of mew messages in dialogs that are not opened by user recently
	 */
	@Persistent
	
	private Map<Long, Integer> newDialogMessages;
	
	
	public int getLastUpdateTs() {
		return lastUpdateTs;
	}

	public void setLastUpdateTs(int lastUpdateTs) {
		this.lastUpdateTs = lastUpdateTs;
	}

	public int getLastActivityTs() {
		return lastActivityTs;
	}

	public void setLastActivityTs(int lastActivityTs) {
		this.lastActivityTs = lastActivityTs;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = null == userId ? 0 : userId;
	}

	public long getSessionAttribute(CurrentAttributeType type) {
		Long val = curAttrMap.get(type.getValue());
		return val == null ? 0 : val;
	}

	public void setSessionAttribute(int key, long value) {
		if (null == curAttrMap)
			curAttrMap = new HashMap<Integer, Long>();
		curAttrMap.put(key, value);
	}

	public void setSessionAttributes(Map<Integer, Long> newAttrMap) {
		curAttrMap.putAll(newAttrMap);
	}

	public Map<Integer, Long> getSessionAttributes() {
		return curAttrMap;
	}

	@Override
	public String toString() {
		return "VoSession [id=" + id + ", name=" + name + ", lastName=" + lastName + ", userId=" + userId + ", lastActivityTs=" + lastActivityTs
				+ ", lastUpdateTs=" + lastUpdateTs + "]";
	}
	
	public void postNewDialogMessage( long dialogId ){
		if( null==newDialogMessages )
			newDialogMessages = new HashMap<Long, Integer>();
		Integer newVal = newDialogMessages.get(dialogId);
		newDialogMessages.put(dialogId, null == newVal ? 1 : ++newVal);
		setLastUpdateTs((int) (System.currentTimeMillis() / 1000L));
	}

	public void dialogMarkDialogRead( long dialogId ){
		if( null!=newDialogMessages ){
			newDialogMessages.remove(dialogId);
		}
	}
	
	public boolean newDialogUpdates( ){
		return null!=newDialogMessages && newDialogMessages.size() > 0;
	} 
	
	public Map<Long, Integer> getDialogUpdates(){
		return null==newDialogMessages ?
				newDialogMessages = new HashMap<Long, Integer>():newDialogMessages;
	}
	
}

// ", longitude=" + getLongitude()+ ", latitude=" + getLatitude() + 