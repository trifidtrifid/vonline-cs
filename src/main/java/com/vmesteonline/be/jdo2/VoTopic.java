package com.vmesteonline.be.jdo2;

import com.vmesteonline.be.thrift.GroupType;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.messageservice.Attach;
import com.vmesteonline.be.thrift.messageservice.Mark;
import com.vmesteonline.be.thrift.messageservice.Message;
import com.vmesteonline.be.thrift.messageservice.Topic;

import javax.jdo.PersistenceManager;
import javax.jdo.annotations.Index;
import javax.jdo.annotations.Indices;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@PersistenceCapable
@Indices({
        @Index(name="lastUp_IDX", members={"lastUpdate"}),
        @Index(name="userGroupId_IDX", members={"userGroupId"}),
        @Index(name="type_vg_idx", members={"type"}),
        @Index(name="type_vg_idx", members={"type", "isImportant", "lastUpdate"}),
		@Index(name="location_and_gtype", members={"userGroupType", "latitude", "longitude"}),
		@Index(name="createDate_IDX", members={"createDate"})
})
public class VoTopic extends VoBaseMessage {
	public String getSubject() {
		return subject;
	}

	// id, message, messageNum, viewers, usersNum, lastUpdate, likes, unlikes,
	// rubricId
	public VoTopic(Topic topic, VoUser author, PersistenceManager pm) throws InvalidOperation, IOException {
		
		super(topic.getMessage(), pm);
		subject = topic.getSubject();
		messageNum = 0;
		usersNum = 1;
		viewers = 1;
		rubricId = topic.getRubricId();
		userGroupId = topic.getMessage().getGroupId();
		createDate = lastUpdate = (int) (System.currentTimeMillis() / 1000);
		userGroupType =  topic.groupType.getValue(); //pm.getObjectById(VoUserGroup.class, userGroupId ).getGroupType();
		latitude = author.getLatitude().toPlainString();
		longitude = author.getLongitude().toPlainString();
		authorId = author.getId();
	}


	public void setUserGroupType(int userGroupType) {
		this.userGroupType = userGroupType;
	}

	public Topic getTopic(long userId, PersistenceManager pm) {

		List<Attach> imgs = new ArrayList<>();
		if (null != images)
			for (Long farId : images) {
				VoFileAccessRecord att = pm.getObjectById(VoFileAccessRecord.class, farId);
				imgs.add(att.getAttach());
			}
		List<Attach> docs = new ArrayList<>();
		if (null != documents)
			for (Long farId : documents) {
				VoFileAccessRecord att = pm.getObjectById(VoFileAccessRecord.class, farId);
				docs.add(att.getAttach());
			}

		Message msg = new Message(id, 0L, type, getId(), userGroupId, authorId, createdAt, editedAt, getContent(), getLikes(), 0,
				null, null, null, 0, null, imgs, docs, null,
					isImportant ? Mark.POSITIVE : isImportant(userId), isLiked(userId),getChildMessageNum(), false);


		Topic tpc = new Topic(getId(), subject, msg, getMessageNum(), getViewers(), getUsersNum(), getLastUpdate(), getLikes(), 0, null,
				null, null, GroupType.findByValue(userGroupType), false);

		if (pollId != 0) {
			try {
				VoPoll voPoll = pm.getObjectById(VoPoll.class, pollId);
				tpc.poll = voPoll.getPoll(userId);
			} catch (RuntimeException e) {
				e.printStackTrace();
		  } catch (Exception e) {
		  	e.printStackTrace();
			}
		}
		tpc.setRubricId( rubricId );
		return tpc;
	}

	public GroupType getGroupType(){
		return GroupType.findByValue( userGroupType );
	}
	
	public int getMessageNum() {
		return messageNum;
	}

	public void setMessageNum(int messageNum) {
		this.messageNum = messageNum;
	}

	public int getViewers() {
		return viewers;
	}

	public void setViewers(int viewers) {
		this.viewers = viewers;
	}

	public int getUsersNum() {
		return usersNum;
	}

	public void setUsersNum(int usersNum) {
		this.usersNum = usersNum;
	}

	public long getRubricId() {
		return rubricId;
	}

	public Long getUserGroupId() {
		return userGroupId;
	}

	public void setUserGroupId(Long userGroupId) {
		this.userGroupId = userGroupId;
	}

	public void setRubricId(long rubricId) {
		this.rubricId = rubricId;
	}

	public Long getPollId() {
		return pollId;
	}

	public void setPollId(Long pollId) {
		this.pollId = pollId;
	}

	
	@Override
	public String toString() {
		return "VoTopic [id=" + id + ", message=" + content.toString() + ", messageNum=" + messageNum + "]";
	}
	
	public boolean isImportant() {
		return isImportant;
	}

	public void setImportant(boolean isImportant) {
		this.isImportant = isImportant;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public int getUserGroupType() {
		return userGroupType;
	}

	@Persistent
	private int messageNum;

	@Persistent
	private int viewers;

	@Persistent
	private int usersNum;
	
	@Persistent
	private int createDate;

	@Persistent
	private Long rubricId;

	@Persistent(defaultFetchGroup = "true")
	private Long userGroupId;

    @Persistent
	private long pollId;

	@Persistent
	protected String subject;
	
	@Persistent
	private boolean isImportant;

	@Persistent
	private int userGroupType;
}
