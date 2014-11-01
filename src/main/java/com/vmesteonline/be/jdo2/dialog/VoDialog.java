package com.vmesteonline.be.jdo2.dialog;

import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.ShortUserInfo;
import com.vmesteonline.be.thrift.VoError;
import com.vmesteonline.be.jdo2.VoFileAccessRecord;
import com.vmesteonline.be.jdo2.VoSession;
import com.vmesteonline.be.jdo2.VoUser;
import com.vmesteonline.be.thrift.messageservice.Attach;
import com.vmesteonline.be.thrift.messageservice.Dialog;
import com.vmesteonline.be.notifications.Notification;
import com.vmesteonline.be.utils.StorageHelper;
import com.vmesteonline.be.utils.StorageHelper.FileSource;

import javax.jdo.JDOObjectNotFoundException;
import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.jdo.annotations.*;
import java.io.IOException;
import java.util.*;

@PersistenceCapable
@Index(name = "VO_DIALOG_USERS_LAST_UPDATE", members = {"lastMessageDate"})
public class VoDialog {
	
	public Dialog getDialog( PersistenceManager pm ) throws InvalidOperation {
		
		List< ShortUserInfo > usis = new ArrayList<ShortUserInfo>();
		for( Long uid : users){
			try {
				VoUser user = pm.getObjectById(VoUser.class, uid);
				usis.add( user.getShortUserInfo(null, pm) );
			} catch (JDOObjectNotFoundException e) {
				
				throw new InvalidOperation(VoError.GeneralError, "Invalid dialog properties. USer registered in dialog but not found. Remove him!");
			}
		}
		return new Dialog(id, usis, createDate, lastMessageDate);
	}
	
public Dialog getDialog( VoUser cuser, PersistenceManager pm ) throws InvalidOperation {
		
		List< ShortUserInfo > usis = new ArrayList<ShortUserInfo>();
		for( Long uid : users){
			try {
				VoUser user = pm.getObjectById(VoUser.class, uid);
				usis.add( user.getShortUserInfo(cuser, pm) );
			} catch (JDOObjectNotFoundException e) {
				
				throw new InvalidOperation(VoError.GeneralError, "Invalid dialog properties. USer registered in dialog but not found. Remove him!");
			}
		}
		return new Dialog(id, usis, createDate, lastMessageDate);
	}
	
	public VoDialog(List<Long> users) {
		this.users = users;
		this.createDate = (int)(System.currentTimeMillis() / 1000L);
		this.lastMessageDate = (int)(System.currentTimeMillis() / 1000L);
	}

	@PrimaryKey
	@Persistent(valueStrategy = IdGeneratorStrategy.INCREMENT)
	protected long id;

    @Persistent(table = "dialog_userIds")
    @Join(column = "id")
    @Element(column = "user")
	private List<Long> users;
	
	@Persistent
	private int createDate;
	
	@Persistent
	private int lastMessageDate;

	public List<Long> getUsers() {
		return users;
	}

	public void setUsers(List<Long> users) {
		this.users = users;
	}

	public int getCreateDate() {
		return createDate;
	}

	public void setCreateDate(int createDate) {
		this.createDate = createDate;
	}

	public int getLastMessageDate() {
		return lastMessageDate;
	}

	public void setLastMessageDate(int lastMessageDate) {
		this.lastMessageDate = lastMessageDate;
	}

	public long getId() {
		return id;
	}

	public Collection<VoDialogMessage> getMessages(int afterDate, int lastCount, long lastLoadedId, PersistenceManager pm) {
		Query q = pm.newQuery(VoDialogMessage.class, "dialogId=="+id+
				(afterDate > 0 ? " && createDate>"+afterDate : ""));
		//q.setOrdering("createDate DESC"); List will be empty if sorting is enabled :(
		List<VoDialogMessage> msgs = (List<VoDialogMessage>) q.execute();
		SortedSet<VoDialogMessage> msgsSorted = new TreeSet<VoDialogMessage>( new Comparator<VoDialogMessage>(){
			@Override
			public int compare(VoDialogMessage o1, VoDialogMessage o2) {
				return -Integer.compare(o1.getCreateDate(), o2.getCreateDate());
			}});
		msgsSorted.addAll(msgs);
		if( (lastCount<=0 || lastCount>=msgsSorted.size())&& lastLoadedId == 0)
			return msgsSorted;
		
		List<VoDialogMessage> listPart = new ArrayList<VoDialogMessage>();
		Iterator<VoDialogMessage> mi = msgsSorted.iterator();
		boolean startAdd = lastLoadedId == 0 ? true : false; 
		while( mi.hasNext() && listPart.size()<lastCount){
			
			if( startAdd ) {
				listPart.add(mi.next());
				
			} else if( lastLoadedId == mi.next().getId() )
				startAdd = true;
		}
		return listPart;
	}

	public VoDialogMessage postMessage(VoUser currentUser, String content, List<Attach> attachs, PersistenceManager pm) {
		VoDialogMessage dmsg = new VoDialogMessage(id, currentUser.getId(), content);
		List<Long> attchs = new ArrayList<Long>();
		for( Attach att: attachs ){
			try {
				FileSource fs = StorageHelper.createFileSource( att );
				VoFileAccessRecord cfar;
				if( fs == null ){
					cfar = pm.getObjectById(VoFileAccessRecord.class, StorageHelper.getFileId(att.getURL()));
					cfar.updateContentParams(att.contentType, att.fileName);
				}	else {	
					cfar = StorageHelper.saveAttach( fs.fname, fs.contentType, currentUser.getId(), true, fs.is, pm);
				}
				attchs.add( cfar.getId());
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		dmsg.setAttachs(attchs);
		lastMessageDate = dmsg.getCreateDate();
		pm.makePersistent(dmsg);
		pm.makePersistent(this);



    for( Long recipient : users ){
    	if( recipient != currentUser.getId() )
            Notification.dialogMessageNotification( this, currentUser, pm.getObjectById( VoUser.class, recipient) );
		List<VoSession> sessList = (List<VoSession>) pm.newQuery(VoSession.class, "userId=="+recipient).execute();
    	for( VoSession s:sessList ){
    		s.postNewDialogMessage(id);
    		pm.makePersistent( s );
    	}
    }
		return dmsg;
	}
	
}
