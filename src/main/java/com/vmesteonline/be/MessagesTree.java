package com.vmesteonline.be;

import com.vmesteonline.be.jdo2.GeoLocation;
import com.vmesteonline.be.jdo2.VoMessage;
import com.vmesteonline.be.jdo2.VoUserGroup;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.VoError;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class MessagesTree {

	@SuppressWarnings("unchecked")
	public static MessagesTree createMessageTree(long topicId, PersistenceManager pm) {

		Query q = pm.newQuery(VoMessage.class);
		q.setFilter("topicId == " + topicId);
		List<VoMessage> voMsgs = new ArrayList<>((List<VoMessage>) q.execute());
		Collections.sort(voMsgs, voMessageAgeComparator);
		MessagesTree tree = new MessagesTree(voMsgs);
		return tree;
	}

	static public class Filters extends GeoLocation {
		public Filters(long uid, VoUserGroup ug) {
			userId = uid;
			if (ug != null) {
				this.radius = ug.getRadius();
				setLatitude(ug.getLatitude());
				setLongitude(ug.getLongitude());
			}
		}

		public long userId;
		public int radius;

	}

	public MessagesTree(List<VoMessage> vomsgs) {
		msgs = vomsgs;
		items = new ArrayList<ItemPosition>();
	}

	public int getTopicChildMessagesCount(Filters filters) throws InvalidOperation {
		List<VoMessage> msgs = getTreeMessagesFirstLevel(filters);
		int msgsCnt = 0;
		for (VoMessage voMessage : msgs) {
			msgsCnt += voMessage.getChildMessageNum() + 1;
		}
		return msgsCnt;
	}

	public List<VoMessage> getTreeMessagesFirstLevel(Filters filters) throws InvalidOperation {
		this.filters = filters;
		parseLevel(getLevel(0), 0);

		List<VoMessage> retList = new ArrayList<VoMessage>();

		for (int i = 0; i < items.size(); i++) {
			if (items.get(i).level == 0) {
				VoMessage voMsg = getMessage(items.get(i).id);
				voMsg.setChildMessageNum(items.get(i).childMsgsNum);
				retList.add(voMsg);
			}
		}

		return retList;
	}

	// эта функция возращает все сообщения от parentId до ближайшего сообщения
	// 1-го уровня
	public List<VoMessage> getTreeMessagesAfter(long parentId, Filters filters) throws InvalidOperation {
		this.filters = filters;
		items.clear();
		parseLevel(getLevel(0), 0);

		List<VoMessage> lst = new ArrayList<VoMessage>();
		boolean add = false;
		for (int i = 0; i < items.size(); i++) {
			if (items.get(i).id == parentId) {
				add = true;
			} else if (add) {

				VoMessage voMsg = getMessage(items.get(i).id);
				if (voMsg.getParentId() == 0)
					break;

				voMsg.setVisibleOffset(items.get(i).level);
				voMsg.setChildMessageNum(items.get(i).childMsgsNum);
				lst.add(voMsg);

			}
		}

		return lst;
	}

	int getChildsNum(long msgId) {
		for (ItemPosition ip : items) {
			if (ip.id == msgId)
				return ip.childMsgsNum;
		}
		return 0;
	}

	boolean isFirstLevel(long id) {

		for (VoMessage voMsg : firstLevel) {
			if (voMsg.getId() == id)
				return true;
		}
		return false;
	}

	boolean isInGroup(VoMessage voMsg) {

		/*if (VoHelper.isInclude(voMsg, voMsg.getRadius(), filters))
			if (voMsg.getRadius() >= filters.radius)
				if (voMsg.getMinimunVisibleRadius() <= filters.radius)
					return true;
		return false;*/
		return true;
	}

	private int parseLevel(List<VoMessage> levelMsgs, int level) {
		Collections.sort(levelMsgs, new ByCreateTimeComparator());
		int childsInSublevels = 0;
		for (VoMessage voMsg : levelMsgs) {
			if (voMsg.isVisibleFor(filters.userId) && isInGroup(voMsg)) {
				ItemPosition ip = new ItemPosition(voMsg.getId(), voMsg.getParentId(), level);
				items.add(ip);
				List<VoMessage> nextLevel = getLevel(voMsg.getId());
				ip.childMsgsNum = parseLevel(nextLevel, level + 1);
				childsInSublevels += ip.childMsgsNum + 1;
			}
		}

		return childsInSublevels;
	}

	private List<VoMessage> getLevel(long parentId) {
		List<VoMessage> l = new ArrayList<VoMessage>();
		for (VoMessage m : msgs) {
			if (m.getParentId() == parentId)
				l.add(m);
		}
		return l;
	}

	private VoMessage getMessage(long id) throws InvalidOperation {
		for (VoMessage m : msgs) {
			if (m.getId() == id)
				return m;
		}
		throw new InvalidOperation(VoError.GeneralError, "can't find message by tree representation");
	}

	public static class ByCreateTimeComparator implements Comparator<VoMessage> {

		@Override
		public int compare(VoMessage a, VoMessage b) {
			return a.getCreatedAt() < b.getCreatedAt() ? 0 : 1;
		}
	}

	class ItemPosition {
		public ItemPosition(long id, long parentId, int level) {
			this.id = id;
			this.parentId = parentId;
			this.level = level;
		}

		public int childMsgsNum;
		public long id;
		public long parentId;
		public int level;

	}

	private List<VoMessage> firstLevel;

	protected MessagesTree() {
	}

	protected List<ItemPosition> items;
	protected List<VoMessage> msgs;

	Filters filters;
	
	static Comparator<VoMessage> voMessageAgeComparator = new Comparator<VoMessage>(){

		@Override
		public int compare(VoMessage o1, VoMessage o2) {
			return Integer.compare(o1.getCreatedAt(),o2.getCreatedAt());
		}
	};
}
