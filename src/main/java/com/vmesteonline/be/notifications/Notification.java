package com.vmesteonline.be.notifications;

import static com.vmesteonline.be.utils.VoHelper.executeQuery;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.TreeSet;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;

import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.vmesteonline.be.UserServiceImpl;
import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.VoBaseMessage;
import com.vmesteonline.be.jdo2.VoMessage;
import com.vmesteonline.be.jdo2.VoSession;
import com.vmesteonline.be.jdo2.VoTopic;
import com.vmesteonline.be.jdo2.VoUser;
import com.vmesteonline.be.jdo2.VoUserGroup;
import com.vmesteonline.be.jdo2.dialog.VoDialog;
import com.vmesteonline.be.jdo2.dialog.VoDialogMessage;
import com.vmesteonline.be.jdo2.postaladdress.VoPostalAddress;
import com.vmesteonline.be.thrift.GroupType;
import com.vmesteonline.be.thrift.NotificationFreq;
import com.vmesteonline.be.utils.EMailHelper;
import com.vmesteonline.be.utils.VoHelper;

public abstract class Notification {

	private static Logger logger = Logger.getLogger(Notification.class.getName());

	public static class NotificationMessage {
		public String to;
		public String from;
		public String cc;
		public String subject;
		public String message;
	}

	protected static String host;
	static {
		host = "vmesteonline.ru";
	}

	public abstract void makeNotification(Set<VoUser> users, PersistenceManager pm);

	protected Map<VoUser, List<NotificationMessage>> messagesToSend = new TreeMap<VoUser, List<NotificationMessage>>();

	protected Set<VoUser> createRecipientsList(PersistenceManager pm) {

		Set<VoUser> userSet = new TreeSet<VoUser>();

		int now = (int) (System.currentTimeMillis() / 1000L);
		int dayAgo = (int) now - 86400;
		int threeDaysAgo = (int) now - 86400 * 3;
		int weekAgo = (int) now - 86400 * 7;
		
		Query q = pm.newQuery("SQL","SELECT ID FROM VOUSER WHERE emailConfirmed=true AND notificationsFreq<>"+NotificationFreq.NEVER.getValue()+" AND ("
				+ "notificationsFreq = "+NotificationFreq.DAYLY.getValue()+" AND lastNotified<"+dayAgo
				+ " OR notificationsFreq = "+NotificationFreq.TWICEAWEEK.getValue()+" AND lastNotified<"+threeDaysAgo
				+ " OR notificationsFreq = "+NotificationFreq.WEEKLY.getValue()+" AND lastNotified<"+weekAgo+")");
		
		List<Long> userIdList = executeQuery(q);
		for( Long uid : userIdList){
			try {
				userSet.add(pm.getObjectById(VoUser.class, uid));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		logger.debug("Total users count to be notified are: "+userSet.size());
		return userSet;
	}

	protected void sendMessage(NotificationMessage mn, VoUser u) throws IOException {
		List<NotificationMessage> uns = messagesToSend.get(u);
		if (null == uns)
			uns = new ArrayList<NotificationMessage>();
		uns.add(mn);
		messagesToSend.put(u, uns);
	}

	protected static Map<Long, Set<VoUser>> arrangeUsersInGroups(Set<VoUser> users) {
		// group users by groups and group types
		Map<Long, Set<VoUser>> groupUserMap = new TreeMap<Long, Set<VoUser>>();
		for (VoUser u : users) {
			List<Long> groups = u.getGroups();
			if( null!=groups && groups.size()>0){
				Long ug = groups.get(groups.size() - 1);
				Set<VoUser> ul;
				if (null == (ul = groupUserMap.get(ug))) {
					ul = new TreeSet<>(vuComp);
					groupUserMap.put(ug, ul);
				}
				ul.add(u);
			}
		}
		return groupUserMap;
	}

	public static void messageBecomeImportantNotification(VoTopic it, VoUserGroup group) {

		PersistenceManager pm = PMF.getPm();

		List<VoUser> usersForMessage = UserServiceImpl.getUsersByLocation( group, pm);

		String subject = "важное сообщение";
		String body = "Ваши соседи считают это сообщение достойным внимания (важность: " + it.getImportantScore() + ")<br/><br/>";

		body += "<i>" + StringEscapeUtils.escapeHtml4(it.getContent()) + "</i>";

		body += "<br/><br/><a href=\"https://" + host + "/wall-single/" + it.getId() + "\">Обсудить, ответить ...</a>";
		for (VoUser rcpt : usersForMessage) {
			decorateAndSendMessage(rcpt, subject, body);
		}
	}

	public static void sendMessageCopy(VoBaseMessage msg, VoUser author) {

		PersistenceManager pm = PMF.getPm();

		String subject = "сообщение пользователя: "+author.getName()+" "+author.getLastName();
		String body = "";
		try {
			body += "Адрес: "+pm.getObjectById(VoPostalAddress.class, author.getAddress()).getAddressText(pm)+"<br/>";
		} catch (Exception e) {
			body += "Адрес: пользовтеля не существует address="+author.getAddress()+"<br/>";
		}
		body += "Тип: "+msg.getType()+"<br/>";
		body += msg instanceof VoTopic ? ("Топик в группе: "+((VoTopic) msg).getGroupType().toString()) :
				msg instanceof VoMessage ? ("Сообщение в группе: "+pm.getObjectById( VoTopic.class, ((VoMessage) msg).getTopicId()).getGroupType()) : "";
		body += "<br/><i>" + StringEscapeUtils.escapeHtml4(msg.getContent()) + "</i>";
		try {
			EMailHelper.sendSimpleEMail(author.getName() + " " + author.getLastName() + "<" + author.getEmail() + ">", "info@vmesteonline.ru", subject, body);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static void dialogMessageNotification(VoDialog dlg, VoUser author, VoUser rcpt) {
		PersistenceManager pm = PMF.getPm();
		Collection<VoDialogMessage> messages = dlg.getMessages(0, 2, 0, pm);
		VoDialogMessage lastMsg;
		Iterator<VoDialogMessage> mi = messages.iterator();
		if (messages.size() > 0) {
			lastMsg = mi.next();

			if (messages.size() == 1 || // else check that the last message has different author
					lastMsg.getAuthorId() != mi.next().getAuthorId()) {

				try {
					String body = author.getName() + " " + author.getLastName() + " написал вам: <br/><br/><i>" + lastMsg.getContent()
							+ "</i><br/><br/><a href=\"https://" + host + "/dialog-single/" + dlg.getId() + "\">Ответить...</a>";

					decorateAndSendMessage(rcpt,  author.getName()+" "+author.getLastName() +" отправил вам сообщение", body);

				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}

	public static void welcomeMessageNotification(VoUser newUser, PersistenceManager pm) {

		String body = newUser.getName() + " " + newUser.getLastName() + ", добро пожаловать на сайт Вашего дома!<br/><br/> ";

		body += "Ваш логин: " + newUser.getEmail() + "<br/>Пароль:    " + newUser.getPassword() + "<br/><i>[Вы можете поменять пароль в меню настроек]</i><br/><br/>";
		List res = executeQuery(pm.newQuery("SQL", "SELECT COUNT(*) FROM VOUSER"));		
		body += "На сайте уже зарегистрировано: " + res.get(0) + " пользователей<br/>";

		int count = UserServiceImpl.getUsersCountByLocation(newUser.getGroup(GroupType.NEIGHBORS, pm), pm);
		if (0 != count) body += "В соседних домах: " + count + "<br/>";
		count = UserServiceImpl.getUsersCountByLocation(newUser.getGroup(GroupType.BUILDING, pm), pm);
		if (0 != count) body += "В вашем доме: " + count + "<br/>";
		if (0 != pm.getObjectById(VoPostalAddress.class, newUser.getAddress()).getStaircase()) {
			count =  UserServiceImpl.getUsersCountByLocation(newUser.getGroup(GroupType.STAIRCASE, pm), pm);
			if (0 != count) body += "В вашем подъезде: " + count + "<br/>";
		}
		if (0 != pm.getObjectById(VoPostalAddress.class, newUser.getAddress()).getFloor()) {
			count =  UserServiceImpl.getUsersCountByLocation(newUser.getGroup(GroupType.FLOOR, pm), pm);
			if (0 != count) body += "На вашем этаже : " + count + "<br/>";
		}
		
		body += "<br/> Мы создали этот сайт, чтобы Ваша жизнь стала чуть комфортней, от того что вы будете в курсе что происходит в вашем доме. <br/><br/>";
		if (!newUser.isEmailConfirmed()) {
			body += "Для доступа к сайту, подтвердите ваш email перейдя по <a href=\"https://" + host + "/confirm/profile/" + newUser.getId() + ","
					+ newUser.getConfirmMailCode() + "\">этой ссылке</a><br/></br>";
			pm.makePersistent(newUser);// to save confirm code
		}

		body += "На страницах сайта вы найдете новости, полезную информацию от управляющей компании и сможете обсудить их с соседями...<br/><br/>";

		decorateAndSendMessage(newUser, !newUser.isEmailConfirmed() ? "поддтверждение email" : "успешная регистрация", body);

	}

	static void decorateAndSendMessage(VoUser user, String subject, String body) {
		body = "<HTML><BODY>"+body+"<p>Спасибо что вы с нами!<br/>Новости проекта в нашем <a href=\"https://" + host + "/blog\">блоге</a></p>"+"</BODY></HTML>";
		try {
			EMailHelper.sendSimpleEMail(user,"ВместеОнлайн.ру: " + subject, body);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static Comparator<VoUser> vuComp = new Comparator<VoUser>() {
		@Override
		public int compare(VoUser o1, VoUser o2) {
			return Long.compare(o1.getId(), o2.getId());
		}
	};
	public static Comparator<VoUserGroup> ugComp = new Comparator<VoUserGroup>() {
		@Override
		public int compare(VoUserGroup o1, VoUserGroup o2) {
			return Long.compare(o1.getId(), o2.getId());
		}
	};

	public static Comparator<VoSession> lastActivityComparator = new Comparator<VoSession>() {

		@Override
		public int compare(VoSession o1, VoSession o2) {
			return Integer.compare(o1.getLastActivityTs(), o2.getLastActivityTs());
		}
	};

	public static void sendRemindCodeMessage(VoUser user) {
		try {
			String body = user.getName() + " " + user.getLastName() + ", <br/>"
					+ "<p>На сайте Вашего дома было запрошено восстановление пароля доступа для адреса вашей электронной почты. "
					+ "Если вы хотите выполнить это действие, воспользуйтесь " + "<a href=\"https://" + host + "/remember_passw.html#" + +user.getConfirmCode()
					+ "-" + URLEncoder.encode(user.getEmail(), "UTF-8").replace("-", "%2D") + "\">ссылкой</a>.</p>"
					+ "<p>Если у вас возникли трудности с доступом к сайту или есть вопросы, вы можете задать их нам в ответном письме.</p>";
			decorateAndSendMessage(user, "восстановление пароля", body);

		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}

	}

	public static void sendMessageResponse(VoTopic topic, VoUser responder, VoMessage msg, Long authorId) {
		PersistenceManager pm = PMF.getPm();
		String subj = topic.getSubject();
		String subject =  
				(subj != null && subj.length() > 0 ? VoHelper.getShortMessageForm(subj, 32, 50) : VoHelper.getShortMessageForm(topic.getContent(), 32, 50)) + " комментарий от "+responder.getName()+" "+responder.getLastName();
		String body = "";
		body += "<i>" + msg.getContent() + "</i>";
		
		VoUser author = pm.getObjectById(VoUser.class, authorId);
		decorateAndSendMessage(author, subject, body);							
	}

	public static void sendTopicResponse(VoTopic topic, VoUser responder, VoMessage msg, Long authorId) {
		PersistenceManager pm = PMF.getPm();
		String subj = topic.getSubject();
		String subject = 
				(subj != null && subj.length() > 0 ? VoHelper.getShortMessageForm(subj, 32, 50) : VoHelper.getShortMessageForm(topic.getContent(), 32, 50)) + " комментарий от "+responder.getName()+" "+responder.getLastName();
		String body = "";
		body += "<i>" + msg.getContent() + "</i>";
		VoUser author = pm.getObjectById(VoUser.class, authorId);
		decorateAndSendMessage(author, subject, body);							
	}
}
