package com.vmesteonline.be.jdo2.dialog;

import com.vmesteonline.be.jdo2.VoBaseMessage;
import com.vmesteonline.be.jdo2.VoFileAccessRecord;
import com.vmesteonline.be.thrift.messageservice.Attach;
import com.vmesteonline.be.thrift.messageservice.DialogMessage;

import javax.jdo.PersistenceManager;
import javax.jdo.annotations.*;
import java.util.ArrayList;
import java.util.List;

@PersistenceCapable
@Indices({
        @Index(name="did_cd_idx",members = {"dialogId","createDate"}),
        @Index(name="did_idx",members = {"dialogId"}),
})
public class VoDialogMessage {
	

	public DialogMessage getDialogMessage( PersistenceManager pm){
		List<Attach> docs = new ArrayList<Attach>();
		List<Attach> imgs = new ArrayList<Attach>();
		if( null!=attachs)
		for( Long farId : attachs ){
			VoFileAccessRecord att = pm.getObjectById(VoFileAccessRecord.class, farId);
			( att.isImage() ?  imgs : docs ).add( att.getAttach() );
		}
		return new DialogMessage(id, dialogId, authorId, getContent(), createDate, imgs, docs);
	} 
	
	public VoDialogMessage(long dialogId, long authorId, String content) {
		super();
		this.dialogId = dialogId;
		this.authorId = authorId;
		this.setContent(content);
		this.createDate = (int)(System.currentTimeMillis() / 1000L);
	}

	@PrimaryKey
	@Persistent(valueStrategy = IdGeneratorStrategy.INCREMENT)
	protected long id;
	
	@Persistent
	protected long dialogId;
	
	@Persistent
	protected long authorId;
	
	@Persistent
	protected byte[] content;
	
	@Persistent
	private int createDate;
	
	@Persistent
	private List<Long> attachs;

	public List<Long> getAttachs() {
		return attachs;
	}

	public void setAttachs(List<Long> attachs) {
		this.attachs = attachs;
	}

	public long getDialogId() {
		return dialogId;
	}

	public void setDialogId(long dialogId) {
		this.dialogId = dialogId;
	}

	public long getAuthorId() {
		return authorId;
	}

	public String getContent() {
		return new String( content, VoBaseMessage.STRING_CHARSET );
	}

	public void setContent(String content) {
		this.content = content.getBytes( VoBaseMessage.STRING_CHARSET );
	}

	public int getCreateDate() {
		return createDate;
	}

	public long getId() {
		return id;
	}

}
