package com.vmesteonline.be;

import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.*;
import com.vmesteonline.be.jdo2.postaladdress.VoBuilding;
import com.vmesteonline.be.notifications.Notification;
import com.vmesteonline.be.thrift.GroupType;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.PostalAddress;
import com.vmesteonline.be.thrift.VoError;
import com.vmesteonline.be.thrift.messageservice.*;
import com.vmesteonline.be.thrift.messageservice.MessageService.Iface;
import com.vmesteonline.be.utils.Defaults;
import com.vmesteonline.be.utils.EMailHelper;
import com.vmesteonline.be.utils.StorageHelper;
import com.vmesteonline.be.utils.VoHelper;

import org.apache.log4j.Logger;
import org.apache.thrift.TException;

import javax.jdo.JDOObjectNotFoundException;
import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.servlet.http.HttpServletRequest;

import java.math.BigDecimal;
import java.util.*;
import java.util.concurrent.CountDownLatch;

import static com.vmesteonline.be.utils.VoHelper.executeQuery;

public class MessageServiceImpl extends ServiceImpl implements Iface {

	public MessageServiceImpl() throws InvalidOperation {
	}

	public MessageServiceImpl(HttpServletRequest req) throws InvalidOperation {
		super(req);
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
		List<WallItem> wallItems = new ArrayList<>();
		PersistenceManager pm = PMF.getPm();
		try {
			VoUser user = getCurrentUser(pm);
			List<VoTopic> topics = getTopics(groupId, user.getGroups(), MessageType.WALL, lastLoadedIdTopicId, length, false, pm, user);
			for (VoTopic voTopic : topics) {
				Topic tpc = voTopic.getTopic(user.getId(), pm);
				if (isHeTheBigBro(user)){
					VoUserGroup ug = pm.getObjectById(VoUserGroup.class, voTopic.getUserGroupId());
					tpc.getMessage().setContent(ug.getName() + ":" + ug.getDescription() + "<br/>" + tpc.getMessage().getContent());
					tpc.setCanChange(true);
				}
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
    public MessageListPart getMessagesAsList(long topicId, MessageType messageType, long lastLoadedId, boolean archived, int length)
            throws InvalidOperation {
        long userId = 0;
        if (messageType != MessageType.BLOG)
            userId = getCurrentUserId();

        PersistenceManager pm = PMF.getPm();

        Query q = pm.newQuery(VoMessage.class);
        q.setFilter("topicId == " + topicId);
		List<VoMessage> voMsgs =  executeQuery( q );
        voMsgs = new ArrayList<>(voMsgs);
        Collections.sort(voMsgs, new VoMessage.ComparatorByCreateDate());

        if (lastLoadedId != 0) {
            List<VoMessage> subLst = null;
            for (int i = 0; i < voMsgs.size() - 1; i++) {
                if (voMsgs.get(i).getId() == lastLoadedId)
                    subLst = voMsgs.subList(i + 1, voMsgs.size());
            }
            voMsgs = (subLst == null) ? new ArrayList<>() : subLst;
        }
        return createMlp(voMsgs, userId, pm, length);
    }

    public List<MessageListPart> getMessagesAsList(final List<Topic> topicIds, MessageType messageType, long lastLoadedId, boolean archived, int length)
            throws InvalidOperation {
        long userId = 0;
        if (messageType != MessageType.BLOG)
            userId = getCurrentUserId();

        String query = "";
        List<List<VoMessage>> msgsm = new ArrayList<>();
        Map<Long, Integer> idPos = new TreeMap<>();
        for (Topic tid : topicIds) {
            query += "|| topicId == "+tid.getId();
            idPos.put(tid.getId(), msgsm.size());
            msgsm.add( new ArrayList<>());

        }
        PersistenceManager pm = PMF.getPm();

        Query q = pm.newQuery(VoMessage.class);
        q.setFilter( query.substring(2) );
		List<VoMessage> voMsgs = executeQuery( q );
        voMsgs = new ArrayList<>( voMsgs );


        for (VoMessage voMessage : voMsgs) {
            List<VoMessage> ml;
            ml = msgsm.get(idPos.get( voMessage.getTopicId()));
            ml.add(voMessage);
        }
        List<MessageListPart> rslt = new ArrayList<>();
        for ( List<VoMessage> ml: msgsm) {

            Collections.sort(ml, new VoMessage.ComparatorByCreateDate());

            if (lastLoadedId != 0) {
                List<VoMessage> subLst = null;
                for (int i = 0; i < ml.size() - 1; i++) {
                    if (ml.get(i).getId() == lastLoadedId)
                        subLst = ml.subList(i + 1, ml.size());
                }
                ml = (subLst == null) ? new ArrayList<>() : subLst;
            }
            rslt.add( createMlp(ml, userId, pm, length));
        }
        return rslt;
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
			voMsgs = (subLst == null) ? new ArrayList<>() : subLst;
		}

		return createMlp(voMsgs, user.getId(), pm, length);
	}

	// ===================================================================================================================================
	private static String mlpKeyPrefix = "MessageListPartByGroupAndTopic";

	@Override
	public MessageListPart getMessages(long topicId, long groupId, MessageType messageType, long lastLoadedMsgId, boolean archived, int length)
			throws InvalidOperation {

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
		putObjectToCache(key, new VoHelper.CacheObjectUnit<>(lastUpdate, mlp));
		return mlp;
	}

	public static List<VoTopic> getTopics(long groupId, List<Long> userGroups, MessageType type, long lastLoadedTopicId, int length, boolean importantOnly,
										  PersistenceManager pm, VoUser user) {

		String filter = "";
		List<VoTopic> allTopics = null;
		List<VoTopic> topics = new ArrayList<>();
		Exception e = null;
		VoUserGroup ug = null;
		boolean bigBro = isHeTheBigBro(user);

		if( 0!=groupId) {
			ug = pm.getObjectById(VoUserGroup.class, groupId);
			if ( type != MessageType.BLOG && !bigBro) {
				if( null!=userGroups && userGroups.size() >= Defaults.getDefaultGroups().size() ){
                    filter += " ( ";
                    for( int gIdx = 0; gIdx <= ug.getGroupType() - Defaults.FIRST_USERS_GROUP; gIdx ++){
                        int groupTypeValue = GroupType.values()[gIdx + Defaults.FIRST_USERS_GROUP].getValue();
                        filter += "userGroupType>="+ groupTypeValue + " && ";
                        if( groupTypeValue > GroupType.BUILDING.getValue() ) {
							//int radius = ug.getRadius();
							int radius = 3000; //set radius 3KM and filter messages later

							BigDecimal latitudeMax = VoHelper.getLatitudeMax(ug.getLatitude(), radius);
                            BigDecimal latitudeMin = VoHelper.getLatitudeMin(ug.getLatitude(), radius);
                            BigDecimal longitudeMax = VoHelper.getLongitudeMax(ug.getLongitude(), ug.getLatitude(), radius);
                            BigDecimal longitudeMin = VoHelper.getLongitudeMin(ug.getLongitude(), ug.getLatitude(), radius);
                            filter += "(longitude >= '" + longitudeMin + "' && longitude <= '" + longitudeMax +
                                    "' && latitude >= '" + latitudeMin + "' && latitude <= '" + latitudeMax + "')";
                        }
                        else {
                            filter += "userGroupId=="+userGroups.get(gIdx);
                        }
                        filter += " || ";
                    }
                    filter = filter.substring(0,filter.length()-4) + ")";
                }
			} else {
				filter = " true ";
			}
		}

		try {

       if( type == MessageType.BLOG ) {
      	 filter = "type=='"+MessageType.BLOG.name()+"'";

       } else {
					if (importantOnly) {
						int minimumCreateDate = (int) (System.currentTimeMillis() / 1000L - 86400L * 14L); // two
						filter = "isImportant == true && lastUpdate > " + minimumCreateDate + "&& " + filter;
					}
					
					if (type == MessageType.WALL)
						filter += filter.length() > 0 ? "&& (type=='" + MessageType.WALL + "' || type=='" + MessageType.BASE+"' )" :
							"(type=='" + MessageType.WALL + "' || type=='" + MessageType.BASE+"' )"; //|| type=='" + MessageType.ADVERT+"')";
					else
						filter += filter.length() > 0 ? "&& type=='" + type + "'" : "type=='" + type + "'";
       }

			Query q = pm.newQuery(VoTopic.class, filter);
			q.setOrdering("lastUpdate DESC");
			allTopics = executeQuery(q);

			if( null != ug && ug.getGroupType() > GroupType.BUILDING.getValue() && !bigBro){
				ArrayList<VoTopic> allTopicsFiltered = new ArrayList<>(  );
				for( VoTopic tpc: allTopics){
					if( VoHelper.calculateRadius( ug, tpc ) <= Defaults.radiusByType[ tpc.getUserGroupType()]) {
						allTopicsFiltered.add( tpc );
					}
				}
				allTopics = allTopicsFiltered;
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
				+ " Query filter:" + filter + " Query Result:" + (null !=allTopics ? allTopics.size() : -1) + " Result: "
				+ topics.size() + (null != e ? " exception:" + (e instanceof InvalidOperation ? ((InvalidOperation) e).why : e.getMessage()) : ""));

		return topics;
	}

	public static boolean isHeTheBigBro(VoUser user) {
		return null!=user && "info@vmesteonline.ru".equalsIgnoreCase(user.getEmail());
	}

	@Override
	public TopicListPart getBlog(long lastLoadedTopicId, int length) throws InvalidOperation {

		PersistenceManager pm = PMF.getPm();

		List<VoTopic> topics = getTopics(0, null, MessageType.BLOG, lastLoadedTopicId, length, false, pm, null);
		TopicListPart mlp = new TopicListPart();
		mlp.totalSize = topics.size();
		for (VoTopic voTopic : topics) {
			Topic tpc = voTopic.getTopic(0, pm);
			mlp.addToTopics(tpc);
			try {
				if( getCurrentUser().getEmail().equalsIgnoreCase("info@vmesteonline.ru") )
					tpc.setCanChange(true);
			} catch (InvalidOperation invalidOperation) {
			}
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

			List<VoTopic> topics = getTopics(groupId, user.getGroups(), type, lastLoadedTopicId, length, importantOnly, pm, user);
			mlp.totalSize += topics.size();
			for (VoTopic voTopic : topics) {
				Topic tpc = voTopic.getTopic(user.getId(), pm);
				if (isHeTheBigBro(user)){
					VoUserGroup ug = pm.getObjectById(VoUserGroup.class, voTopic.getUserGroupId());
					tpc.getMessage().setContent(ug.getName() + ":" + ug.getDescription() + "<br/>" + tpc.getMessage().getContent());
					tpc.setCanChange(true);
				}
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

				Notification.sendMessageCopy(votopic,user );

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
		if( null == sess.getUser() )
			throw new InvalidOperation(VoError.NotAuthorized, "Not authorized now.");

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
	public TopicListPart getBusinessTopics(long lastLoadedTopicId, int length) throws InvalidOperation, TException {
		PersistenceManager pm = PMF.getPm();

		VoUser currentUser = getCurrentUser();
		List<VoTopic> topics = getTopics(0, null, MessageType.BUSINESS_PAGE, lastLoadedTopicId, length, false, pm, currentUser);
		TopicListPart mlp = new TopicListPart();
		mlp.totalSize = topics.size();
		for (VoTopic voTopic : topics) {
			Topic tpc = voTopic.getTopic(0, pm);
			mlp.addToTopics(tpc);
			if( currentUser.getEmail().equalsIgnoreCase("info@vmesteonline.ru") )
                  tpc.setCanChange(true);
		}
		return mlp;
	}

	@Override
	public Message postBusinessTopics(Message msg) throws InvalidOperation, TException {
		msg.setType( MessageType.BUSINESS_PAGE);
		return  postMessage(msg) ;
	}

	@Override
	public Message postMessage(Message msg) throws InvalidOperation {
		long userId = getCurrentUserId();
		msg.setAuthorId(userId);
		VoMessage vomsg;

		if (0 == msg.getId()) {
			PersistenceManager pm = PMF.getPm();
			try {
				VoUser currentUser = getCurrentUser(pm);
				msg.setAuthorId( currentUser.getId() );
				vomsg = new VoMessage(msg, pm);
				VoTopic topic = pm.getObjectById(VoTopic.class, msg.getTopicId());
				topic.setMessageNum(topic.getMessageNum() + 1);
				topic.setLastUpdate((int) (System.currentTimeMillis() / 1000));
				pm.makePersistent(topic);

				if (msg.type != MessageType.BLOG) {
					msg.userInfo = currentUser.getShortUserInfo(null, pm);
					Notification.sendMessageCopy(vomsg,currentUser );
				}

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
			if( null!=user && isHeTheBigBro(user))
				msg.setCanChange(true);
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
			theTopic.setLatitude(newGroup.getLatitude());
			theTopic.setLongitude(newGroup.getLongitude());
			theTopic.setUserGroupType(newGroup.getGroupType());
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

		Set<Attach> onlyNewAttaches = new HashSet<>();
		onlyNewAttaches.addAll(updatedAttaches);
		ArrayList<Long> updatedFileIdList = new ArrayList<>();

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
			List<VoMessage> msgsOfTopic = executeQuery(  pm.newQuery(VoMessage.class, "topicId==" + topicId) );
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
                    pm.deletePersistent(pm.getObjectById(VoFileAccessRecord.class, attachId));
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
				List<VoMessage> childMsgs = executeQuery(  pm.newQuery(VoMessage.class, "topicId==" + topicId) );
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

    @Override
    public String getNextMulticastMessage() throws InvalidOperation, TException {
        PersistenceManager pm = PMF.getPm();
        VoSession currentSession = getCurrentSession();
        VoUser cu = currentSession.getUser();
        int now = (int) (System.currentTimeMillis() / 1000L);
        VoMulticastMessage message = getCurrentMessage(pm, cu);
        if (currentSession.isNewBroadcastMessage() && (message == null || !message.hasNext)) {
            currentSession.setNewBroadcastMessage(false);
            pm.makePersistent(currentSession);
        }
        cu.setLastMulticastShown(null == message ? now : message.getStartAfter() + 1);
        pm.makePersistent(cu);
        return message == null ? null : message.getMessage();
    }

    @Override
    public String getMulticastMessage() throws InvalidOperation, TException {
        PersistenceManager pm = PMF.getPm();
        VoSession currentSession = getCurrentSession();
        VoUser cu = currentSession.getUser();
        VoMulticastMessage message = getCurrentMessage(pm, cu);
		/*
		 * if(currentSession.isNewBroadcastMessage() && (message == null ||
		 * !message.hasNext )){ currentSession.setNewBroadcastMessage(false);
		 * pm.makePersistent(currentSession); }
		 */
        return message == null ? null : message.getMessage();
    }

    private VoMulticastMessage getCurrentMessage(PersistenceManager pm, VoUser cu) {
        /*int lastShownTimestamp = cu.getLastMulticastShown();
        int now = (int) (System.currentTimeMillis() / 1000L);
		List results = executeQuery( pm.newQuery("SQL", "SELECT ID FROM VOMULTICASTMESSAGE AS MM LEFT JOIN USERGROUPS AS UG ON MM.USERGROUP=UG.GROUP AND UG.ID=" + cu.getId()));
		List<Long> uids = new ArrayList<>();
		Iterator rit = results.iterator();
		while(rit.hasNext()) {
			uids.add((Long) rit.next());
		}
		for( Long uid: uids){
			users.add( pm.getObjectById(VoUser.class, uid));
		}

        Query q = pm.newQuery(VoMulticastMessage.class, "visibleGroups==" + cu.getRootGroup() + " && startAfter>=" + lastShownTimestamp);
        q.setOrdering("startAfter");
        List<VoMulticastMessage> newML = executeQuery(  q );
        VoMulticastMessage curMessage = null;
        if (newML.size() != 0) {
            for (VoMulticastMessage voMulticastMessage : newML) {
                if (0 == voMulticastMessage.getEndBefore() || voMulticastMessage.getEndBefore() < now) {
                    if (null == curMessage) {
                        curMessage = voMulticastMessage;
                        curMessage.hasNext = false;
                    } else {
                        curMessage.hasNext = true;
                    }
                } else {
                    cu.setLastMulticastShown(voMulticastMessage.getStartAfter() + 1);
                }
            }
        }
        return curMessage;*/
		return null;
    }

    // =========================================================================================================================
    @Override
    public void sendGroupMulticastMessage(List<Long> visibleGroups, String message, int startDate, int expireDate) throws InvalidOperation, TException {
        // get floor's group as a root of all other groups
        PersistenceManager pm = PMF.getPm();
		Set vgs = new HashSet<Long>();

		List<VoUserGroup> groups = executeQuery( pm.newQuery(VoUserGroup.class,
				"groupType==" + GroupType.FLOOR.getValue() + " && visibleGroups.contains(" + visibleGroups.get(0) + ")"));
		for (VoUserGroup voUserGroup : groups) {
			vgs.add(voUserGroup.getId());
		}
		sendFloorGroupMulticastMessage(vgs, message, startDate, expireDate, pm);
    }

    // =========================================================================================================================
    private void sendFloorGroupMulticastMessage(Set<Long> vgs, String message, int startDate, int expireDate, PersistenceManager pm) {

        int weekAgo = (int) (System.currentTimeMillis() / 1000L - 86400 * 7);
        if (null != vgs) {
            Set<VoUser> usersToUpdate = new HashSet<>();
			for( Long ugId: vgs ){
				usersToUpdate.addAll(UserServiceImpl.getUsersByGroup(ugId,pm));
				pm.makePersistent( new VoMulticastMessage( pm.getObjectById(VoUserGroup.class, ugId), startDate, expireDate, message));
				pm.newQuery("SQL","UPDATE VOSESSION AS S LEFT JOIN USERGROUPS AS UG ON S.USERID=UG.ID SET NEWBROADCASTMESSAGE = true WHERE UG.GROUP="+ugId+" AND S.LASTACTIVITYTS >" + weekAgo).execute();
			}
        }
    }

    // =========================================================================================================================
    @Override
    public void sendAddressMulticastMessage(List<PostalAddress> addresses, String message, int startDate, int expireDate) throws TException {
        PersistenceManager pm = PMF.getPm();
        Set<Long> vgs = null;

        if (addresses != null && addresses.size() > 0) {
            for (PostalAddress pa : addresses) {
                if (null != pa.getBuilding() && 0 != pa.getBuilding().getId()) {
                    VoBuilding building = pm.getObjectById(VoBuilding.class, pa.getBuilding().getId());
                    String query = "groupType==" + GroupType.FLOOR.getValue() + " && longitude=='" + building.getLongitude().toPlainString()
                            + "' && latitude=='" + building.getLatitude().toPlainString() + "'" + (0 == pa.staircase ? "" : " && staircase==" + pa.getStaircase())
                            + (0 == pa.floor ? "" : " && floor==" + pa.getFloor());
                    List<VoUserGroup> groups = executeQuery(  pm.newQuery(VoUserGroup.class, query) );
                    vgs = new HashSet<>();
                    for (VoUserGroup voUserGroup : groups) {
                        vgs.add(voUserGroup.getId());
                    }
                }
            }
        }
        sendFloorGroupMulticastMessage(vgs, message, startDate, expireDate, pm);
    }

	@Override
	public Topic moveTopic(long id, long groupId, String longitude, String latitude, GroupType groupType, MessageType msgType) throws TException {

		PersistenceManager pm = PMF.getPm();
		VoTopic voTopic = pm.getObjectById(VoTopic.class, id);
		VoUser currentUser = getCurrentUser(pm);
		if(isHeTheBigBro(currentUser)) {
			if( null!=msgType ) voTopic.setType(msgType);
			if( voTopic.getSubject() == null ) {
				int minSLen = Math.min(25, voTopic.getContent().length());
				minSLen = voTopic.getContent().length() == minSLen ? minSLen : voTopic.getContent().indexOf(' ',minSLen);
				voTopic.setSubject( voTopic.getContent().substring(0, minSLen) + "...");
			}
			if( 0==groupId ) {
				if( null!=groupType ) voTopic.setUserGroupType(groupType.getValue());
				if( null!=longitude ) voTopic.setLongitude(new BigDecimal(longitude));
				if( null!=latitude ) voTopic.setLatitude(new BigDecimal(latitude));
			} else {
				VoUserGroup voGroup = pm.getObjectById(VoUserGroup.class, groupId);
				voTopic.setLongitude(voGroup.getLongitude());
				voTopic.setLatitude(voGroup.getLatitude());
				voTopic.setUserGroupType(voGroup.getGroupType());
				voTopic.setUserGroupId(groupId);
			}
			pm.makePersistent( voTopic );
		}
		return voTopic.getTopic( currentUser.getId(), pm);
	}

	@Override
    public List<WallItem> getImportantNews(long groupId, long rubricId, int commmunityId, int length) throws InvalidOperation {
        TopicListPart topics = getTopics(groupId, rubricId, commmunityId, 0, 1000, MessageType.WALL, true);

        List<WallItem> wallItems = new ArrayList<>();
        List<Topic> ttop = topics.getTopics();
        if( null!=topics  && null!=(ttop = topics.getTopics()) &&  ttop.size() > 0 ){
            List<MessageListPart> mlpl = getMessagesAsList( ttop, MessageType.WALL, 0, false, 10000);
            int i = 0;
            for( Topic tpc : ttop){
                MessageListPart mlp = mlpl.get(i++);
                WallItem wi = new WallItem(mlp.messages, tpc);
                wallItems.add(wi);
            }
        }
        return wallItems;
    }

}
