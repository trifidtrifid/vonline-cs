package com.vmesteonline.be.jdo2;

import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.data.VoDatastoreHelper;
import com.vmesteonline.be.thrift.messageservice.Attach;
import com.vmesteonline.be.thrift.messageservice.Message;
import com.vmesteonline.be.thrift.messageservice.MessageType;

import javax.jdo.JDOObjectNotFoundException;
import javax.jdo.PersistenceManager;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

/**
 * Created by brozer on 1/12/14.
 */
@PersistenceCapable
public class VoMessage extends VoBaseMessage {

	// private static final Logger logger = Logger.getLogger(VoMessage.class);
	// id, (parent), type, createdAt, editedAt, approvedId, topicId, createdId,
	// content, likes, unlikes, recipient, longitude, latitude, radius,
	// community,TAGS,LINKS


	public VoMessage() {
	}

	public VoMessage(Message msg, MessageType type) {
		this.topicId = msg.getTopicId();
		// todo shoud be long
		if (msg.getAuthorId() != 0)
			this.authorId = msg.getAuthorId();

		this.userNameForBlog = msg.getAnonName();
		this.setContent(msg.getContent());
		createdAt = msg.getCreated();
		images = new ArrayList<Long>();
		documents = new ArrayList<Long>();

	}

	// TODO do smthing with this. constructor should not be like this. create factory or smth else
	public VoMessage(Message msg, PersistenceManager pm) throws InvalidOperation, IOException {

		super(msg, pm);
		this.topicId = msg.getTopicId();
		this.parentId = msg.getParentId();
		this.recipient = msg.getRecipientId();

		
		VoMessage parentMsg = null;
		if (0 != msg.getParentId()) {
			try {
				parentMsg = pm.getObjectById(VoMessage.class, msg.getParentId());
				
			} catch (JDOObjectNotFoundException e) {
				throw new InvalidOperation(com.vmesteonline.be.thrift.VoError.IncorrectParametrs, "parent Message not found by ID=" + msg.getParentId());
			}
		}

		VoTopic topic;
		try {
			topic = pm.getObjectById(VoTopic.class, msg.getTopicId());
		} catch (JDOObjectNotFoundException e1) {
			throw new InvalidOperation(com.vmesteonline.be.thrift.VoError.IncorrectParametrs, "Topic deleted" + msg.getParentId());
		}
	
		// вставка времени последнего апдейта
		topic.setLastUpdate((int) (System.currentTimeMillis() / 1000L));

		try {
			/* CHeck the recipient */
			if (0 != msg.getRecipientId()) {
				VoDatastoreHelper.exist(VoUser.class, msg.getRecipientId(), pm);
				recipient = msg.getRecipientId();
			}

			VoUser author = pm.getObjectById(VoUser.class, msg.getAuthorId());
			author.incrementMessages(1);

			if(null!=parentMsg){
				parentMsg.incrementChildMessageNum( +1);
				pm.makePersistent(parentMsg);
			}
			pm.makePersistent(author);
			pm.makePersistent(this);

			msg.setId(this.id);

		} catch (Exception e2) {
			e2.printStackTrace();
			throw new InvalidOperation(com.vmesteonline.be.thrift.VoError.GeneralError, "Failed to validate Message parameters:" + e2.getMessage());
		}
	}

	public boolean isVisibleFor(long userId) {
		return getRecipient() == 0 || getRecipient() == userId || getAuthorId() == userId;
	}

	public Message getMessage(long userId, PersistenceManager pm) {

		List<Attach> imgs = new ArrayList<Attach>();
		for (Long farId : images) {
			VoFileAccessRecord att = pm.getObjectById(VoFileAccessRecord.class, farId);
			imgs.add(att.getAttach());
		}
		List<Attach> docs = new ArrayList<Attach>();
		for (Long farId : documents) {
			VoFileAccessRecord att = pm.getObjectById(VoFileAccessRecord.class, farId);
			docs.add(att.getAttach());
		}

		if (authorId == 0)
			return new Message(id, getParentId(), type, topicId, 0L, 0, createdAt, editedAt, getContent(), getLikes(), 0, links, null, null,
					visibleOffset, null, imgs, docs, userNameForBlog, isImportant(userId), isLiked(userId), childMessageNum);
		else
			return new Message(id, getParentId(), type, topicId, 0L, authorId, createdAt, editedAt, getContent(), getLikes(), 0,
					links, null, null, visibleOffset, null, imgs, docs, userNameForBlog, isImportant(userId), isLiked(userId),childMessageNum);
	}

	public long getRecipient() {
		return recipient;
	}

	public void setRecipient(long recipient) {
		this.recipient = recipient;
	}

	@Persistent
	protected long recipient;

	@Persistent
	protected int score;

	@Persistent
	protected long topicId;

	@Persistent
	private long parentId;

	@Persistent
	private String userNameForBlog;

	protected int visibleOffset;

	public int getVisibleOffset() {
		return visibleOffset;
	}

	public void setVisibleOffset(int visibleOffset) {
		this.visibleOffset = visibleOffset;
	}

	public long getParentId() {
		return parentId;
	}

	public void setParentId(long parentId) {
		this.parentId = parentId;
	}

	public long getTopicId() {
		return topicId;
	}

	public void setTopicId(long topicId) {
		this.topicId = topicId;
	}

	@Override
	public String toString() {
		return "VoMessage [id=" + id + ", type=" + type + ", authorId=" + authorId + ", recipient=" + recipient + "]";
	}

	public static class ComparatorByCreateDate implements Comparator<VoMessage> {

		@Override
		public int compare(VoMessage o1, VoMessage o2) {
			return Integer.compare(o1.getCreatedAt(), o2.getCreatedAt());
		}
	}
}
