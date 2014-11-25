package com.vmesteonline.be.notifications;

import com.vmesteonline.be.UserServiceImpl;
import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.*;
import com.vmesteonline.be.jdo2.dialog.VoDialog;
import com.vmesteonline.be.jdo2.dialog.VoDialogMessage;
import com.vmesteonline.be.jdo2.postaladdress.VoPostalAddress;
import com.vmesteonline.be.thrift.GroupType;
import com.vmesteonline.be.thrift.NotificationFreq;
import com.vmesteonline.be.utils.EMailHelper;
import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.log4j.Logger;

import javax.jdo.Extent;
import javax.jdo.PersistenceManager;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.*;

import static com.vmesteonline.be.utils.VoHelper.executeQuery;

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

	public abstract void makeNotification(Set<VoUser> users);

	protected Map<VoUser, List<NotificationMessage>> messagesToSend = new HashMap<VoUser, List<NotificationMessage>>();

	protected Set<VoUser> createRecipientsList(PersistenceManager pm) {

		List<VoUser> userList = new ArrayList<VoUser>();

		int now = (int) (System.currentTimeMillis() / 1000L);
		int twoDaysAgo = (int) now - 86400 * 2;
		int weekAgo = (int) now - 86400 * 2;
		
		//-TODO See TODO below. Method that don't check last activity of sessions
		Extent<VoUser> users = pm.getExtent(VoUser.class);
		for (VoUser voUser : users) {
			if( voUser.isEmailConfirmed() ){
				
				VoSession lastSession = getTheLastSessionAndCeanOldOnes(voUser, weekAgo, pm);
				if( lastSession == null || lastSession.getLastActivityTs() < twoDaysAgo )
					addUserToNotificationIst(userList, now, voUser);
			}
		}
		// TODO Remove simple method above and uncomment method below to take activity into account it could be important for big amount of active users
		
		/*List<VoSession> vsl = executeQuery(  pm.newQuery(VoSession.class, "lastActivityTs < " + twoDaysAgo) );
		logger.debug("Total sessions with lastActivityTs < "+twoDaysAgo+" : " + vsl.size());
	
		for (VoSession vs : vsl) {
			if( 0==vs.getUserId()){
				pm.deletePersistent(vs);
				continue;
			}
			VoUser vu;
			try {
				vu = pm.getObjectById(VoUser.class, vs.getUserId());
			} catch (JDOObjectNotFoundException onfe) {
				logger.warn("No user of session found by ID:" + vs.getUserId() + " this ID is stored in session: " + vs.getId());
				pm.deletePersistent(vs);
				continue;
			} catch (Exception e) {
				logger.warn("FAiled to get user by ID: " + vs.getUserId() + " discard the session " + vs);
				continue;
			}

			if (vu.isEmailConfirmed()) {
				// найдем самую псоледнюю сессию ползователя
				VoSession lastSession = getTheLastSessionAndCeanOldOnes(vu, weekAgo, pm);

				if (lastSession.getLastActivityTs() < twoDaysAgo) {

					addUserToNotificationIst(userList, now, vu);

				} else {
					logger.debug("USer:" + vu + " visited the site at " + new Date(((long) lastSession.getLastActivityTs() ) * 1000L)
							+ " less the two days ago so he/she would not been notified with news");
				}
			} else {
				logger.debug("USer:" + vu + " not confirmed email, so new would not been sent.");
			}
		}*/
		
		Set<VoUser> userSet = new TreeSet<VoUser>(vuComp);
		userSet.addAll(userList);
		logger.debug("Total users count to be notified are: "+userSet.size());
		return userSet;
	}

	private VoSession getTheLastSessionAndCeanOldOnes(VoUser vu, int sessionDeadLine, PersistenceManager pm) {
		List<VoSession> uSessionsConst = executeQuery(  pm.newQuery(VoSession.class, "userId==" + vu.getId()) );
		if( null==uSessionsConst || 0==uSessionsConst.size())
			return null;
		List<VoSession> uSessions = new ArrayList<>(uSessionsConst);
		Collections.sort(uSessions, lastActivityComparator);
		VoSession lastSession = uSessions.get(uSessions.size() - 1);
		for (VoSession ns : uSessions) {
			if (lastSession != ns && ns.getLastActivityTs() < sessionDeadLine) // пора удалять неактивную сессию
				pm.deletePersistent(ns);
			else
				break;
		}
		return lastSession;
	}

	private void addUserToNotificationIst(List<VoUser> userList, int now, VoUser vu) {
		int timeAgo = (int) now - vu.getLastNotified();
		NotificationFreq nf = vu.getNotificationFreq().freq;
		if (NotificationFreq.DAYLY == nf && timeAgo >= 86400 || NotificationFreq.TWICEAWEEK == nf && timeAgo >= 3 * 86400
				|| NotificationFreq.WEEKLY == nf && timeAgo >= 7 * 86400) {
			logger.debug("User:" + vu + " would be notified with news, notified "+timeAgo / 86400+" and "+nf.name()+" notification is set.");
			userList.add(vu);
		} else {
			logger.debug("USer:" + vu + " was notified " + timeAgo + " seconds ago and he perefers to be notified " + nf.name()
					+ " so he would not been notified this time");
		}
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
					ul = new TreeSet<VoUser>(vuComp);
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

		String subject = "сообщение пользовател: "+author.getName()+" "+author.getLastName();
		String body = "Адрес: "+pm.getObjectById(VoPostalAddress.class, author.getAddress()).getAddressText(pm)+"<br/>";
		body += "Тип: "+msg.getType()+"<br/>";
		body += msg instanceof VoTopic ? ("Топик в группе: "+((VoTopic) msg).getGroupType(pm).toString()) :
				msg instanceof VoMessage ? ("Сообщение в группе: "+pm.getObjectById( VoTopic.class, ((VoMessage) msg).getTopicId()).getGroupType(pm)) : "";
		body += "<br/><i>" + StringEscapeUtils.escapeHtml4(msg.getContent()) + "</i>";
		decorateAndSendMessage(null, subject, body);
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

					decorateAndSendMessage(rcpt, "сообщение от " + author.getName(), body);

				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}

	public static void welcomeMessageNotification(VoUser newUser, PersistenceManager pm) {

		String body = newUser.getName() + " " + newUser.getLastName() + ", добро пожаловать на сайт Вашего дома!<br/><br/> ";

		body += "Ваш логин: "+newUser.getEmail()+"<br/>Пароль:    "+newUser.getPassword()+"<br/><i>[Вы можете поменять пароль в меню настроек]</i><br/><br/>";
		Set<VoUser> userSet = new TreeSet<VoUser>(vuComp);
		userSet.addAll(executeQuery( pm.newQuery(VoUser.class, "")));

		body += "На сайте уже зарегистрировано: " + userSet.size() + " пользователей<br/>";
		
		List<VoUser> ul = UserServiceImpl.getUsersByLocation( newUser.getGroup(GroupType.NEIGHBORS, pm), pm );
		if(0!=ul.size()) body += "Из них рядом с вами живут: "+ul.size()+"<br/>";
		ul = UserServiceImpl.getUsersByLocation( newUser.getGroup(GroupType.BUILDING, pm), pm );
		if(0!=ul.size()) body += "В вашем доме: "+ul.size()+"<br/>";
		ul = UserServiceImpl.getUsersByLocation(newUser.getGroup(GroupType.STAIRCASE, pm), pm);
		if(0!=ul.size()) body += "В вашем подъезде: "+ul.size()+"<br/>";
		ul = UserServiceImpl.getUsersByLocation(newUser.getGroup(GroupType.FLOOR, pm), pm );
		if(0!=ul.size()) body += "На вашем этаже : "+ul.size()+"<br/>";
		
		
		body += "<br/> Мы создали этот сайт, чтобы Ваша жизнь стала чуть комфортней, от того что вы будете в курсе что происходит в вашем доме. <br/><br/>";
		if (!newUser.isEmailConfirmed()) {
			body += "Для доступа к сайту, подтвердите ваш email перейдя по <a href=\"https://" + host + "/confirm/profile/" + newUser.getId() + ","
					+ newUser.getConfirmCode() + "\">этой ссылке</a><br/></br>";
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
			Long.compare(o1.getId(), o2.getId());
			return 0;
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
					+ "Если вы хотите выполнить эту действие, воспользуйтесь " + "<a href=\"https://" + host + "/remember_passw.html#" + +user.getConfirmCode()
					+ "-" + URLEncoder.encode(user.getEmail(), "UTF-8") + "\">этой ссылкой</a>.</p>"
					+ "<p>Если у вас возникли трудности с доступом к сайту или есть вопросы, вы можете задать их нам в ответном письме.</p>";
			decorateAndSendMessage(user, "восстановление пароля", body);

		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}

	}
}
