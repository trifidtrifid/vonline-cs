package com.vmesteonline.be.notifications;

import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.VoUser;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.VoError;
import org.apache.log4j.Logger;

import javax.jdo.PersistenceManager;
import java.util.List;
import java.util.Map.Entry;
import java.util.Set;

public class NewsNotification extends Notification {
	private static Logger logger = Logger.getLogger(NewsNotification.class.getSimpleName());

	@Override
	public void makeNotification(Set<VoUser> users) {}
	
	public void sendNotifications( ) throws InvalidOperation{

		PersistenceManager pm = PMF.getPm();
		int now = (int) (System.currentTimeMillis()/1000L);
		try {
			Set<VoUser> users = createRecipientsList(pm);
			logger.debug("Start NEWS notification. THere are "+users+" to notify");
			
			if(users.size()>0){
				new NewTopicsNotification(messagesToSend).makeNotification(users); 
				logger.debug("Got "+messagesToSend.size()+" to send new Topics");
				new NewNeigboursNotification(messagesToSend).makeNotification(users);
				logger.debug("Got +"+messagesToSend.size()+" to send new News");
				
				for( Entry<VoUser, List<NotificationMessage>> un :messagesToSend.entrySet()){
					VoUser user = un.getKey();
					String body = "Новости ВместеОнлайн.ру<br/><br/>";
					for( NotificationMessage nm : un.getValue())
						body += nm.message + "<br/><br/>";
					
					body += "Подробности на сайте<a href=\"https://"+host+"\"> ВместеОнлайн.ру</a>";
					body += "<br/><i>Вы можете изменить рассылку новостей в </i>"
							+ "<a href=\"https://"+host+"/settings\">настройках профиля</a>";
					logger.debug("Got +"+messagesToSend.size()+" to send new News");
					decorateAndSendMessage(user, " новости рядом с вами", body);
					logger.debug("News sent to:" + user);
					user.setLastNotified(now);
					pm.makePersistent(user);
					
				}
			}	
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("Got exception:" + (e instanceof InvalidOperation ? ((InvalidOperation)e).why : e.getMessage()) );
			throw new InvalidOperation(VoError.GeneralError, e instanceof InvalidOperation ? ((InvalidOperation)e).why : e.getMessage());
		}
	}
}
