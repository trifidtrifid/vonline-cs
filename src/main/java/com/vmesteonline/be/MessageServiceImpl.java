package com.vmesteonline.be;

import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.*;
import com.vmesteonline.be.notifications.Notification;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.VoError;
import com.vmesteonline.be.thrift.messageservice.*;
import com.vmesteonline.be.thrift.messageservice.MessageService.Iface;
import com.vmesteonline.be.utils.EMailHelper;
import com.vmesteonline.be.utils.StorageHelper;
import com.vmesteonline.be.utils.VoHelper;
import org.apache.log4j.Logger;
import org.apache.thrift.TException;

import javax.jdo.JDOObjectNotFoundException;
import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import java.util.*;
import java.util.concurrent.CountDownLatch;

public class MessageServiceImpl extends ServiceImpl implements Iface {

	public MessageServiceImpl() throws InvalidOperation {
		initDb();
	}

	public MessageServiceImpl(String sessId) throws InvalidOperation {
		super(sessId);
		initDb();
	}

	@Override
	public void sendInfoEmail(String email, String name, String content) throws InvalidOperation, TException {
		PersistenceManager pm = PMF.getPm();

		try {
			String subj = "Contacts: ";
			try {
				VoUser voUser = getCurrentUser(pm);
				subj += "registered user " + voUser.getName() + " " + voUser.getLastName() + " " + voUser.getContacts();
			} catch (Exception e) {
				if (email == null || name == null || email.length() == 0 || name.length() == 0)
					throw new InvalidOperation(VoError.IncorrectParametrs, "email and name can't be empty or null");
				subj += "unregistered user " + name + " " + email;
			}
			EMailHelper.sendSimpleEMail("trifid@gmail.com", subj, content);
		} catch (Exception e) {
			e.printStackTrace();
			logger.warn("warning when try to send email from contacts. user " + name + " email " + email + " content " + content);
		}

	}

	@Override
	public List<WallItem> getWallItems(long groupId, long lastLoadedIdTopicId, int length) throws InvalidOperation, TException {
		List<WallItem> wallItems = new ArrayList<WallItem>();
		PersistenceManager pm = PMF.getPm();
		try {
			VoUser user = getCurrentUser(pm);

			List<Long> groupsToSearch = new ArrayList<Long>();
			groupsToSearch.add(groupId);
			/*
			 * List<Long> userGroups = user.getGroups(); for( Long ugId : userGroups
			 * ){ groupsToSearch.add(ugId); if( ugId == groupId ) //usergGroups MUST
			 * be ordered from smaller to bigger one, so if topics of current group
			 * are added, it's time to finish collecting break; }
			 */
			List<VoTopic> topics = getTopics(groupsToSearch, MessageType.WALL, lastLoadedIdTopicId, length, false, pm);

			for (VoTopic voTopic : topics) {

				Topic tpc = voTopic.getTopic(user.getId(), pm);

				tpc.userInfo = UserServiceImpl.getShortUserInfo( user, voTopic.getAuthorId(), pm);

				MessageListPart mlp = getMessagesAsList(tpc.id, MessageType.BASE, 0, false, 10000);
				if (mlp.totalSize > 0)
					logger.info("find msgs " + mlp.messages.size());

				WallItem wi = new WallItem(mlp.messages, tpc);
				wallItems.add(wi);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return wallItems;
	}

	// ====================================================================================================================
	private class MessagesLoader implements Runnable {

		int pos;
		VoTopic topic;
		VoUser usr;
		WallItem[] wallItems;
		CountDownLatch doneSignal;

		public MessagesLoader(int pos, VoTopic topic, VoUser usr, WallItem[] wallItems, CountDownLatch doneSignal) {
			this.pos = pos;
			this.topic = topic;
			this.wallItems = wallItems;
			this.usr = usr;
			this.doneSignal = doneSignal;
		}

		@Override
		public void run() {
			PersistenceManager pm = PMF.getPm();
			try {
				Topic top = topic.getTopic(usr.getId(), pm);
				top.userInfo = UserServiceImpl.getShortUserInfo(usr, topic.getAuthorId(), pm);
				wallItems[pos] = new WallItem(getMessagesAsList(topic.getId(), MessageType.BASE, 0, false, 10000).messages, top);
				doneSignal.countDown();
			} catch (InvalidOperation e) {
				e.printStackTrace();
			} finally {
				pm.close();
			}
		}

	}

	// ====================================================================================================================

	@SuppressWarnings("unchecked")
	@Override
	public MessageListPart getMessagesAsList(long topicId, MessageType messageType, long lastLoadedId, boolean archived, int length)
			throws InvalidOperation {
		long userId = 0;
		if (messageType != MessageType.BLOG)
			userId = getCurrentUserId();

		PersistenceManager pm = PMF.getPm();

		Query q = pm.newQuery(VoMessage.class);
		q.setFilter("topicId == " + topicId);
		List<VoMessage> voMsgs = new ArrayList<VoMessage>((List<VoMessage>) q.execute());
		Collections.sort(voMsgs, new VoMessage.ComparatorByCreateDate());

		if (lastLoadedId != 0) {
			List<VoMessage> subLst = null;
			for (int i = 0; i < voMsgs.size() - 1; i++) {
				if (voMsgs.get(i).getId() == lastLoadedId)
					subLst = voMsgs.subList(i + 1, voMsgs.size());
			}
			voMsgs = (subLst == null) ? new ArrayList<VoMessage>() : subLst;
		}
		return createMlp(voMsgs, userId, pm, length);
	}

	@Override
	public MessageListPart getFirstLevelMessages(long topicId, long groupId, MessageType messageType, long lastLoadedId, boolean archived, int length)
			throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		VoUser user = getCurrentUser(pm);
		MessagesTree tree = MessagesTree.createMessageTree(topicId, pm);
		List<VoMessage> voMsgs = tree.getTreeMessagesFirstLevel(new MessagesTree.Filters(user.getId(), pm.getObjectById(VoUserGroup.class, groupId)));

		if (lastLoadedId != 0) {
			List<VoMessage> subLst = null;
			for (int i = 0; i < voMsgs.size() - 1; i++) {
				if (voMsgs.get(i).getId() == lastLoadedId)
					subLst = voMsgs.subList(i + 1, voMsgs.size());
			}
			voMsgs = (subLst == null) ? new ArrayList<VoMessage>() : subLst;
		}

		return createMlp(voMsgs, user.getId(), pm, length);
	}

	// ===================================================================================================================================
	private static String mlpKeyPrefix = "MessageListPartByGroupAndTopic";

	@Override
	public MessageListPart getMessages(long topicId, long groupId, MessageType messageType, long lastLoadedMsgId, boolean archived, int length)
			throws InvalidOperation, TException {

		String key = mlpKeyPrefix + ":" + topicId + ":" + groupId + ":" + messageType + ":" + lastLoadedMsgId + ":" + archived + ":" + length;

		PersistenceManager pm = PMF.getPm();
		int lastUpdate = pm.getObjectById(VoTopic.class, topicId).getLastUpdate();

		Object objectFromCache = getObjectFromCache(key);
		if (null != objectFromCache && objectFromCache instanceof VoHelper.CacheObjectUnit<?>
				&& ((VoHelper.CacheObjectUnit<?>) objectFromCache).timestamp == lastUpdate)
			return ((VoHelper.CacheObjectUnit<MessageListPart>) objectFromCache).object;

		VoUser user = getCurrentUser(pm);
		MessagesTree tree = MessagesTree.createMessageTree(topicId, pm);
		List<VoMessage> voMsgs = tree.getTreeMessagesAfter(lastLoadedMsgId,
				new MessagesTree.Filters(user.getId(), pm.getObjectById(VoUserGroup.class, groupId)));
		MessageListPart mlp = createMlp(voMsgs, user.getId(), pm, length);
		putObjectToCache(key, new VoHelper.CacheObjectUnit<MessageListPart>(lastUpdate, mlp));
		return mlp;
	}

	public static List<VoTopic> getTopics(List<Long> groups, MessageType type, long lastLoadedTopicId, int length, boolean importantOnly,
			PersistenceManager pm) {

		String filter = "";
		List<VoTopic> allTopics = null;
		List<VoTopic> topics = new ArrayList<VoTopic>();
		Exception e = null;

        try {

            if( type == MessageType.BLOG ) {
                allTopics = (List<VoTopic>) pm.newQuery(VoTopic.class, "type=="+type.getValue()).execute();

            } else {
                filter += "visibleGroups.contains(";

                for (Long group : groups) {
                    filter += group + ",";
                }
                filter = filter.substring(0, filter.length() - 1) + ")";

                allTopics = (List<VoTopic>) pm.newQuery(VoTopic.class, filter).execute();

                if (importantOnly) {
                    int minimumCreateDate = (int) (System.currentTimeMillis() / 1000L - 86400L * 14L); // two
                    filter = " isImportant == true && lastUpdate > " + minimumCreateDate;
                    allTopics = (List<VoTopic>) pm.newQuery( VoTopic.class, allTopics, filter ).execute();
                }

                /*@TODO Fix it
                if (type == MessageType.WALL)
                    filter += "type==" + MessageType.WALL.getValue() + " || type==" + MessageType.BASE.getValue();
                else
                    filter += "type=='" + type + "'";
                    (List<VoTopic>) pm.newQuery( VoTopic.class, allTopics, filter ).execute();
                    */

                List<VoTopic> filteredByType = new ArrayList( );
                for( VoTopic tpc : allTopics ){
                    if( type == MessageType.WALL && ( tpc.getType() == MessageType.WALL || tpc.getType() == MessageType.BASE) ||
                            type == tpc.getType())
                        filteredByType.add(tpc);
                }
                allTopics = filteredByType;
                allTopics.sort( new Comparator<VoTopic>(){
                    @Override
                    public int compare(VoTopic o1, VoTopic o2) {
                        return -Integer.compare(o1.getLastUpdate(), o2.getLastUpdate());
                    }
                });
            }

			boolean addTopic = 0 == lastLoadedTopicId ? true : false;
			for (VoTopic topic : allTopics) {

				if (addTopic) {
					topics.add(topic);

				} else if (topic.getId() == lastLoadedTopicId) {
					addTopic = true;
				}

				if (topics.size() == length)
					break;
			}
		} catch (Exception ee) {
			(e = ee).printStackTrace();
		}
		logger.debug("Got topic request type:" + type + " lastLoadedTopicId:" + lastLoadedTopicId + " length:" + length
				+ (null == groups ? "" : " groups count:" + groups.size()) + " Query filter:" + filter + " Query Result:" + allTopics.size() + " Result: "
				+ topics.size() + (null != e ? " exception:" + (e instanceof InvalidOperation ? ((InvalidOperation) e).why : e.getMessage()) : ""));

		return topics;
	}

	@Override
	public TopicListPart getBlog(long lastLoadedTopicId, int length) throws InvalidOperation {

		PersistenceManager pm = PMF.getPm();
		List<VoTopic> topics = getTopics(null, MessageType.BLOG, lastLoadedTopicId, length, false, pm);
		TopicListPart mlp = new TopicListPart();
		mlp.totalSize = topics.size();

		for (VoTopic voTopic : topics) {
			Topic tpc = voTopic.getTopic(0, pm);
			mlp.addToTopics(tpc);
		}
		return mlp;

	}

	@Override
	public TopicListPart getTopics(long groupId, long rubricId, int commmunityId, long lastLoadedTopicId, int length) throws InvalidOperation {
		return getTopics(groupId, rubricId, commmunityId, lastLoadedTopicId, length, MessageType.BASE, false);
	}

	@Override
	public TopicListPart getImportantTopics(long groupId, long rubricId, int commmunityId, int length) throws InvalidOperation {
		return getTopics(groupId, rubricId, commmunityId, 0, 1000, MessageType.WALL, true);
	}

	@Override
	public TopicListPart getAdverts(long groupId, long lastLoadedTopicId, int length) throws InvalidOperation {
		return getTopics(groupId, 0, 0, lastLoadedTopicId, length, MessageType.ADVERT, false);
	}

	private TopicListPart getTopics(long groupId, long rubricId, int commmunityId, long lastLoadedTopicId, int length, MessageType type,
			boolean importantOnly) {

		TopicListPart mlp = new TopicListPart();
		PersistenceManager pm = PMF.getPm();
		try {
			VoUser user = getCurrentUser(pm);

			List<Long> groupsToSearch = new ArrayList<Long>();
			groupsToSearch.add(groupId);

			List<VoTopic> topics = getTopics(groupsToSearch, type, lastLoadedTopicId, length, importantOnly, pm);
			mlp.totalSize += topics.size();
			for (VoTopic voTopic : topics) {
				Topic tpc = voTopic.getTopic(user.getId(), pm);
				tpc.userInfo = UserServiceImpl.getShortUserInfo( user, voTopic.getAuthorId(), pm);
				tpc.setMessageNum(voTopic.getMessageNum());
				mlp.addToTopics(tpc);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return mlp;
	}

	@Override
	public Topic postTopic(Topic topic) throws InvalidOperation {

		PersistenceManager pm = PMF.getPm();
		try {
			if (0 == topic.getId()) {

				VoUser user = getCurrentUser(pm);

				int now = (int) (System.currentTimeMillis() / 1000L);
				topic.lastUpdate = now;
				topic.message.created = now;
				topic.message.authorId = getCurrentUserId();

				VoTopic votopic = new VoTopic(topic, user, pm);
				votopic.setSubject(topic.getSubject());

				if (topic.poll != null) {

					VoPoll poll = VoPoll.create(topic.poll);
					pm.makePersistent(poll);
					votopic.setPollId(poll.getId());
					topic.poll.pollId = poll.getId();
				}

				pm.makePersistent(votopic);
				topic.setId(votopic.getId());

				pm.getObjectById(VoUserGroup.class, votopic.getUserGroupId());
				topic.userInfo = user.getShortUserInfo(null, pm);

			} else {
				updateTopic(topic);
			}
			return topic;
		} catch (Exception e) {
			e.printStackTrace();
			throw new InvalidOperation(VoError.GeneralError, "can't create topic. " + e);
		}
	}

	/**
	 * checkUpdates запрашивает наличие обновлений с момента предыдущего запроса,
	 * который возвращает сервер в ответе, если обновлений нет - в ответ приходит
	 * новое значение таймстампа формирования ответа на сервере. При наличии
	 * обновлений возвращается 0
	 **/
	@Override
	public int checkUpdates(int lastRequest) throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		VoSession sess = getCurrentSession(pm);
		int now = (int) (System.currentTimeMillis() / 1000L);
		if (now - sess.getLastActivityTs() > 60) { /*
																								 * Update last Activity once per
																								 * minute
																								 */
			sess.setLastActivityTs(now);
			pm.makePersistent(sess);
		}
		return sess.getLastUpdateTs() > lastRequest ? 0 : now;
	}

	@Override
	public Message postBlogMessage(Message msg) throws InvalidOperation {
		if (0 != msg.getId()) {
			updateMessage(msg);
			return msg;
		}
		PersistenceManager pm = PMF.getPm();
		try {

			VoUser voUser = getCurrentUser();
			msg.anonName += voUser.getName() + " " + voUser.getLastName();
			msg.userInfo = voUser.getShortUserInfo(null, pm);
			msg.authorId = voUser.getId();
		} catch (InvalidOperation e) {
			if (msg.getAnonName() == null || msg.getAnonName().isEmpty())
				throw new InvalidOperation(VoError.IncorrectParametrs, "has no user name");
		}

		VoMessage vomsg = new VoMessage(msg, MessageType.BLOG);
		vomsg.setChildMessageNum(0);
		vomsg.setLastUpdate((int) (System.currentTimeMillis() / 1000));
		pm.makePersistent(vomsg);
		msg.setId(vomsg.getId());
		return msg;

	}

	@Override
	public Message postMessage(Message msg) throws InvalidOperation {
		long userId = getCurrentUserId();
		msg.setAuthorId(userId);
		VoMessage vomsg;

		if (0 == msg.getId()) {
			PersistenceManager pm = PMF.getPm();
			try {
				vomsg = new VoMessage(msg, pm);
				VoTopic topic = pm.getObjectById(VoTopic.class, msg.getTopicId());
				topic.setMessageNum(topic.getMessageNum() + 1);
				topic.setLastUpdate((int) (System.currentTimeMillis() / 1000));
				pm.makePersistent(topic);

				if (msg.type != MessageType.BLOG)
					msg.userInfo = getCurrentUser(pm).getShortUserInfo(null, pm);

			} catch (Exception e) {
				e.printStackTrace();
				throw new InvalidOperation(VoError.IncorrectParametrs, "can't create message " + e.toString());
			}
			msg.setId(vomsg.getId());

		} else {
			updateMessage(msg);
		}
		return msg;
	}

	private void initDb() throws InvalidOperation {

	}

	@Override
	public Poll doPoll(long pollId, int item) throws InvalidOperation {
		long userId = getCurrentUserId();
		PersistenceManager pm = PMF.getPm();
		try {
			VoPoll poll = pm.getObjectById(VoPoll.class, pollId);
			if (!poll.isAlreadyPoll(userId)) {
				poll.getValues().set(item, poll.getValues().get(item) + 1);
				poll.doPoll(userId);
			}
			return poll.getPoll(userId);
		} catch (Exception e) {
			logger.error("can't do poll. " + e.getMessage());
			e.printStackTrace();
			throw new InvalidOperation(VoError.IncorrectParametrs, "incorect parametr for poll");
		}
	}

	private static MessageListPart createMlp(List<VoMessage> lst, long userId, PersistenceManager pm, int length) throws InvalidOperation {

		if (lst.size() > length)
			lst = lst.subList(0, length);

		MessageListPart mlp = new MessageListPart();
		if (lst == null) {
			logger.warn("try to create MessagePartList from null object");
			return mlp;
		}
		VoUser user = 0 == userId ? null : pm.getObjectById(VoUser.class, userId);
		mlp.totalSize = lst.size();
		for (VoMessage voMessage : lst) {
			Message msg = voMessage.getMessage(userId, pm);
			if (voMessage.getAuthorId() != null)
				msg.userInfo = UserServiceImpl.getShortUserInfo(user, voMessage.getAuthorId(), pm);
			mlp.addToMessages(msg);
		}
		return mlp;
	}

	private void updateMessage(Message msg) throws InvalidOperation {

		int now = (int) (System.currentTimeMillis() / 1000);
		PersistenceManager pm = PMF.getPm();
		try {
			VoMessage storedMsg = pm.getObjectById(VoMessage.class, msg.getId());

			if (storedMsg.getAuthorId() != getCurrentUserId(pm))
				throw new InvalidOperation(VoError.IncorrectParametrs, "User is not author of message");

			VoTopic topic = pm.getObjectById(VoTopic.class, storedMsg.getTopicId());

			/* Check if content changed, then update edit date */
			if (!storedMsg.getContent().equals(msg.getContent())) {
				// int editedAt = 0 == msg.getEdited() ? now : msg.getEdited();
				storedMsg.setEditedAt(now);
				storedMsg.setContent(msg.getContent());
			}

			if (storedMsg.getTopicId() != msg.getTopicId() || storedMsg.getAuthorId() != msg.getAuthorId()
					|| storedMsg.getRecipient() != msg.getRecipientId() || storedMsg.getCreatedAt() != msg.getCreated() || storedMsg.getType() != msg.getType())
				throw new InvalidOperation(VoError.IncorrectParametrs,
						"Parameters: topic, author, recipient, createdAt, type could not be changed!");

			storedMsg.setImages(updateAttachments(storedMsg.getImages(), msg.getImages(), storedMsg.getAuthorId(), pm));
			storedMsg.setDocuments(updateAttachments(storedMsg.getDocuments(), msg.getDocuments(), storedMsg.getAuthorId(), pm));

			pm.makePersistent(storedMsg);
			pm.makePersistent(topic);

		} catch (JDOObjectNotFoundException onfe) {
			throw new InvalidOperation(VoError.IncorrectParametrs, "Message not found");
		}
	}

	private void updateTopicMessage(VoTopic topic, Message msg, PersistenceManager pm) throws InvalidOperation {

		int now = (int) (System.currentTimeMillis() / 1000);

		if (topic.getAuthorId() != getCurrentUserId(pm))
			throw new InvalidOperation(VoError.IncorrectParametrs, "User is not author of message");

		/* Check if content changed, then update edit date */
		if (!topic.getContent().equals(msg.getContent())) {
			// int editedAt = 0 == msg.getEdited() ? now : msg.getEdited();
			topic.setEditedAt(now);
			topic.setLastUpdate(now);
			topic.setContent(msg.getContent());
		}

		if (topic.getAuthorId() != msg.getAuthorId() || topic.getCreatedAt() != msg.getCreated() || topic.getType() != msg.getType())
			throw new InvalidOperation(VoError.IncorrectParametrs,
					"Parameters: topic, author, recipient, createdAt, type could not be changed!");

		pm.makePersistent(topic);

	}

	private void updateTopic(Topic topic) throws InvalidOperation {

		PersistenceManager pm = PMF.getPm();
		VoTopic theTopic;
		try {
			theTopic = pm.getObjectById(VoTopic.class, topic.getId());
		} catch (Exception e1) {
			throw new InvalidOperation(VoError.IncorrectParametrs, "FAiled to update Topic. No topic found by ID" + topic.getId());
		}

		updateTopicMessage(theTopic, topic.getMessage(), pm);
		theTopic.setImages(updateAttachments(theTopic.getImages(), topic.getMessage().getImages(), theTopic.getAuthorId(), pm));
		theTopic.setDocuments(updateAttachments(theTopic.getDocuments(), topic.getMessage().getDocuments(), theTopic.getAuthorId(), pm));
		theTopic.setUsersNum(topic.usersNum);
		theTopic.setViewers(topic.viewers);
		changeTopicGroup(topic, theTopic, pm);
		theTopic.setSubject(topic.getSubject());

		updatePoll(theTopic, topic, pm);

		pm.makePersistent(theTopic);

	}

	private void changeTopicGroup(Topic topic, VoTopic theTopic, PersistenceManager pm) throws InvalidOperation {
		long newGroupId = topic.getMessage().getGroupId();
		VoUser currentUser = getCurrentUser(pm);
		if (-1 == Collections.indexOfSubList(currentUser.getGroups(), Arrays.asList(new Long[] { newGroupId })))
			throw new InvalidOperation(VoError.IncorrectParametrs, "USer " + currentUser + " could not move message to group " + newGroupId
					+ " he does not belongs to");

		if (newGroupId != theTopic.getUserGroupId()) {
			VoUserGroup newGroup = pm.getObjectById(VoUserGroup.class, newGroupId);
			theTopic.setUserGroupId(newGroupId);
			ArrayList<Long> visibleGroups = new ArrayList<Long>(newGroup.getVisibleGroups(pm));
			/*
			 * visibleGroups.removeAll(currentUser.getGroups());
			 * visibleGroups.addAll(currentUser.getGroups());
			 */
			theTopic.setVisibleGroups(visibleGroups);
		}
	}

	private void updatePoll(VoTopic theTopic, Topic topic, PersistenceManager pm) throws InvalidOperation {
		if (topic.poll == null && 0 != theTopic.getPollId() || topic.poll != null && topic.poll.pollId != theTopic.getPollId()) {
			if (theTopic.getPollId() != 0) {// poll changed so the old one should be
																			// removed
				pm.deletePersistent(pm.getObjectById(VoPoll.class, theTopic.getPollId()));
				theTopic.setPollId(0L);
			}
			if (topic.poll != null) {
				VoPoll poll = VoPoll.create(topic.poll);
				pm.makePersistent(poll);
				theTopic.setPollId(poll.getId());
				topic.poll.pollId = poll.getId();
			}
		} else if (topic.poll != null && topic.poll.pollId == theTopic.getPollId()) { // check
																																									// changes
			VoPoll newPoll = VoPoll.create(topic.poll);
			if (0 != theTopic.getPollId()) {
				VoPoll oldPoll = pm.getObjectById(VoPoll.class, theTopic.getPollId());
				newPoll.setId(theTopic.getPollId());
				newPoll.setValues(oldPoll.getValues());
				newPoll.setAlreadyPoll(oldPoll.getAlreadyPoll());
			}
			pm.makePersistent(newPoll);
			theTopic.setPollId(newPoll.getId());
		}
		if (null != topic.poll)
			topic.poll.pollId = theTopic.getPollId();
	}

	// ======================================================================================================================

	public static List<Long> updateAttachments(List<Long> oldFileIds, List<Attach> updatedAttaches, long userId, PersistenceManager pm) {

		Set<Attach> onlyNewAttaches = new HashSet<Attach>();
		onlyNewAttaches.addAll(updatedAttaches);
		ArrayList<Long> updatedFileIdList = new ArrayList<Long>();

		// delete old files
		for (long fileId : oldFileIds) {
			VoFileAccessRecord far = pm.getObjectById(VoFileAccessRecord.class, fileId);
			String url = far.getURL();

			for (Attach attach : updatedAttaches) {
				if (null != attach.getURL() && attach.getURL().startsWith(url)) {
					onlyNewAttaches.remove(attach); // it's not a new one
					updatedFileIdList.add(fileId); // leave it in updated version
					break;
				}
			}
		}

		// upload new Files
		for (Attach attach : onlyNewAttaches) {
			try {
				VoFileAccessRecord cfar = StorageHelper.loadAttach(pm, userId, attach);
				updatedFileIdList.add(cfar.getId());
			} catch (InvalidOperation e) {
				logger.error("Failed to load Attach. " + e);
				e.printStackTrace();
			}
		}

		return updatedFileIdList;

	}

	// ======================================================================================================================

	private static Logger logger = Logger.getLogger("com.vmesteonline.be.MessageServceImpl");

	@Override
	public boolean isPublicMethod(String method) {
		return true;// publicMethods.contains(method);
	}

	// ======================================================================================================================

	@Override
	public long categoryId() {
		return ServiceCategoryID.MESSAGE_SI.ordinal();
	}

	// ======================================================================================================================

	@Override
	public int markMessageImportant(long messageId, boolean isImportant) throws InvalidOperation, TException {
		PersistenceManager pm = PMF.getPm();
		try {
			VoTopic topic = pm.getObjectById(VoTopic.class, messageId);
			VoUser author = null == topic.getAuthorId() ? null : pm.getObjectById(VoUser.class, topic.getAuthorId());
			int impScore = topic.markImportant(getCurrentUser(), author, isImportant, pm);

			VoUserGroup topicGroup = pm.getObjectById(VoUserGroup.class, topic.getUserGroupId());
			boolean isReallyImportant = (impScore >= topicGroup.getImportantScore());
			topic.setImportant(isReallyImportant);
			pm.makePersistent(topic);

			// time to send notification if not sent?
			if (isReallyImportant && 0 == topic.getImportantNotificationSentDate()) {

				topic.setImportant(true);
				pm.makePersistent(topic);

				/*Queue queue = QueueFactory.getDefaultQueue();
				queue.add(withUrl("/tasks/notification").param("rt", "mbi").param("it", "" + topic.getId()).param("ug", "" + topicGroup.getId()));
*/
				Notification.messageBecomeImportantNotification(topic, topicGroup);
				topic.setImportantNotificationSentDate((int) (System.currentTimeMillis() / 1000L));
			}
			return impScore;
		} catch (JDOObjectNotFoundException onfe) {
			throw new InvalidOperation(VoError.IncorrectParametrs, "No message found by ID:" + messageId);
		}
	}

	// ======================================================================================================================

	@Override
	public int markMessageLike(long messageId) throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		try {
			VoTopic msg = pm.getObjectById(VoTopic.class, messageId);
			if (msg.getAuthorId() == null || msg.getAuthorId() == getCurrentUserId())
				return msg.getPopularityScore();

			VoUser author = null == msg.getAuthorId() ? null : pm.getObjectById(VoUser.class, msg.getAuthorId());
			return msg.markLikes(getCurrentUser(), author, pm);

		} catch (JDOObjectNotFoundException onfe) {
			throw new InvalidOperation(VoError.IncorrectParametrs, "No message found by ID:" + messageId);
		}
	}

	// ======================================================================================================================

	@Override
	public Message deleteMessage(long msgId) throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		boolean isModerator = false;
		try {
			VoMessage msg = pm.getObjectById(VoMessage.class, msgId);
			VoUser cu = getCurrentUser();
			long topicId = msg.getTopicId();
			VoTopic topic = pm.getObjectById(VoTopic.class, topicId);

			if (msg.getAuthorId() != cu.getId() && (isModerator = cu.isGroupModerator(topic.getUserGroupId())))
				throw new InvalidOperation(VoError.IncorrectParametrs, "USer is not the author and not moderator");

			topic.setMessageNum(topic.getMessageNum() - 1);
			topic.setChildMessageNum(topic.getChildMessageNum() - 1);
			topic.setLastUpdate((int) (System.currentTimeMillis() / 1000L));

			deleteAttachments(pm, msg.getImages());
			deleteAttachments(pm, msg.getDocuments());

			// check if message can be deleted
			List<VoMessage> msgsOfTopic = (List<VoMessage>) pm.newQuery(VoMessage.class, "topicId==" + topicId).execute();
			boolean canDelete = true;
			for (VoMessage msgot : msgsOfTopic) {
				if (msgot.getParentId() == msgId) {
					canDelete = false;
					break;
				}
			}

			if (0 != msg.getParentId())
				try {
					pm.getObjectById(VoMessage.class, msg.getParentId()).incrementChildMessageNum(-1);
				} catch (Exception e) {
					e.printStackTrace();
				}

			if (canDelete) {
				pm.deletePersistent(msg);
				return null;
			} else {
				msg.setContent("Сообщение удалено " + (isModerator ? "модератором." : "пользователем."));
				return msg.getMessage(cu.getId(), pm);
			}

		} catch (JDOObjectNotFoundException onfe) {
			throw new InvalidOperation(VoError.IncorrectParametrs, "Message not found");
		}
	}

	// ======================================================================================================================

	private void deleteAttachments(PersistenceManager pm, List<Long> imgs) {
        if(null!=imgs)
            for (Long attachId : imgs) {
                try {
                    VoFileAccessRecord att = pm.getObjectById(VoFileAccessRecord.class, attachId);
                    StorageHelper.deleteImage(att.getFullFileName());
                    pm.deletePersistent(att);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
	}

	// ======================================================================================================================

	@Override
	public Topic deleteTopic(long topicId) throws InvalidOperation, TException {

		PersistenceManager pm = PMF.getPm();
		try {
			VoTopic tpc = pm.getObjectById(VoTopic.class, topicId);
			VoUser cu = getCurrentUser();
			if (tpc.getAuthorId() != cu.getId() && cu.isGroupModerator(tpc.getUserGroupId()))
				throw new InvalidOperation(VoError.IncorrectParametrs, "USer is not the author and not a moderator");

			deleteAttachments(pm, tpc.getImages());
			deleteAttachments(pm, tpc.getDocuments());
			if (0 != tpc.getPollId()) {
				pm.deletePersistent(pm.getObjectById(VoPoll.class, tpc.getPollId()));
			}

			if (0 != tpc.getMessageNum()) {
				List<VoMessage> childMsgs = (List<VoMessage>) pm.newQuery(VoMessage.class, "topicId==" + topicId).execute();
				for (VoMessage msg : childMsgs) {
					deleteAttachments(pm, msg.getImages());
					deleteAttachments(pm, msg.getDocuments());
					pm.deletePersistent(msg);
				}
			}

			try {
				pm.deletePersistent(tpc);
				return null;

			} catch (Exception e) {
				logger.error("Failed to delete Topic: " + e.getMessage());
				e.printStackTrace();
				throw new InvalidOperation(VoError.GeneralError, "Topic not deleted. " + e.getMessage());
			}

		} catch (JDOObjectNotFoundException onfe) {
			throw new InvalidOperation(VoError.IncorrectParametrs, "Topic not found");
		}
	}

	@Override
	public Map<Long, Integer> getDialogUpdates() throws InvalidOperation, TException {
		PersistenceManager pm = PMF.getPm();
		return getCurrentSession(pm).getDialogUpdates();
	}
}
