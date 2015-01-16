package com.vmesteonline.be;

import static org.junit.Assert.fail;

import java.util.Comparator;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import javax.jdo.PersistenceManager;

import junit.framework.Assert;

import org.junit.Test;

import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.VoSession;
import com.vmesteonline.be.jdo2.VoTopic;
import com.vmesteonline.be.jdo2.VoUser;
import com.vmesteonline.be.notifications.NewTopicsNotification;
import com.vmesteonline.be.thrift.GroupType;
import com.vmesteonline.be.thrift.NotificationFreq;
import com.vmesteonline.be.thrift.messageservice.Topic;
import com.vmesteonline.be.utils.Defaults;

public class NewsNotificationsTests extends MessageServiceTests {
	
	private static class NewTopicsNotificationForTest extends NewTopicsNotification {
		
		public Map<VoUser, List<VoTopic>[]> userTopics;
		public Set<VoUser> recipientsList;
		
		public NewTopicsNotificationForTest() {
			super(null);		
			userTopics = null;
		}

		
		@Override
		public Set<VoUser> createRecipientsList(PersistenceManager pm) {
			Set<VoUser> recipientsList = super.createRecipientsList(pm);
			return recipientsList;
		}

		@Override
		protected void createAndSendMessages(Map<VoUser, List<VoTopic>[]> userTopics, int now, PersistenceManager pm) {			
			this.userTopics = userTopics;
		}
		
		
	}
	// проверка отправки только сообщений помеченых как важные
	@Test
	public void testSendKindaImportantMessagesOnly() {
		int now = (int) (System.currentTimeMillis()/1000L);
		try {
			VoUser u2 = pm.getObjectById(VoUser.class, Defaults.user2id);
			Set<VoUser> us = new TreeSet<VoUser>();
			us.add(u2);
			Topic tpc1 =  createTopic(getUserGroupId(Defaults.user1email, GroupType.NEIGHBORS));
			NewTopicsNotificationForTest nft = new NewTopicsNotificationForTest();
			
			PersistenceManager pm = PMF.getPm();
			try {
				nft.makeNotification( us, pm);
				Assert.assertEquals(0, nft.userTopics.size()); //сообщение не отмечено пользователями как важное, не попадает в рассылку
				msi.markMessageImportant( tpc1.getId(), true); 
				nft.makeNotification( us, pm);
				Assert.assertEquals(1, nft.userTopics.size()); //отмеченное попало
				Assert.assertEquals(1, nft.userTopics.keySet().size());
				Assert.assertEquals(Defaults.user2id.longValue(), us.iterator().next().getId());
				Assert.assertEquals( 1, nft.userTopics.get( u2 )[ GroupType.NEIGHBORS.getValue()].size() );
				Assert.assertEquals( tpc1.getId(), nft.userTopics.get( u2 )[ GroupType.NEIGHBORS.getValue()].get(0).getId() );
				
				msi.markMessageImportant( tpc1.getId(), false);
				nft.makeNotification( us, pm);
				Assert.assertEquals(0, nft.userTopics.size()); //сообщение не отмечено пользователями как важное, не попадает в рассылку
			} finally {
				pm.close();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			fail("Exception thrown." + e.getMessage());
		}		
	}
	// проверка отсутствия повторных сообщений
	@Test
	public void testDontSendTwiceTheSameMessageToTheSameUser() {
		int now = (int) (System.currentTimeMillis()/1000L);
		try {
			VoUser u2 = pm.getObjectById(VoUser.class, Defaults.user2id);
			VoUser u3 = pm.getObjectById(VoUser.class, Defaults.user3id);
			
			Set<VoUser> us = new TreeSet<VoUser>();
			us.add(u2);
			us.add(u3);
			Topic tpc1 =  createTopic(getUserGroupId(Defaults.user1email, GroupType.NEIGHBORS));
			u3.setLastNotified(now+10);
			u2.setLastNotified(now-10);
			NewTopicsNotificationForTest nft = new NewTopicsNotificationForTest();
			
			PersistenceManager pm = PMF.getPm();
			try {
				msi.markMessageImportant( tpc1.getId(), true);
				nft.makeNotification( us, pm);
				Assert.assertEquals(1, nft.userTopics.size()); //один пользователь
				Assert.assertEquals(1, nft.userTopics.keySet().size());
				Iterator<VoUser> iterator = us.iterator();
				Assert.assertEquals(Defaults.user2id.longValue(), iterator.next().getId());
				Assert.assertEquals( 1, nft.userTopics.get( u2 )[ GroupType.NEIGHBORS.getValue()].size() );
				Assert.assertEquals( tpc1.getId(), nft.userTopics.get( u2 )[ GroupType.NEIGHBORS.getValue()].get(0).getId() );
				
				u3.setLastNotified(now-10);
				nft.makeNotification( us, pm);
				Assert.assertEquals(2, nft.userTopics.size()); //оба пользователя
				iterator = us.iterator();
				Assert.assertEquals(Defaults.user2id.longValue(), iterator.next().getId());
				Assert.assertEquals(Defaults.user3id.longValue(), iterator.next().getId());
				
			} finally {
				pm.close();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			fail("Exception thrown." + e.getMessage());
		}		
	}
	// проверка отправки сообщений не чаще чем в установленный пользователем период
	@Test
	public void testSendNotificationAccordingToPeriod() {
		int now = (int) (System.currentTimeMillis()/1000L);
		try {
			VoUser u2 = pm.getObjectById(VoUser.class, Defaults.user2id);
			VoUser u3 = pm.getObjectById(VoUser.class, Defaults.user3id);
			
			Set<VoUser> us = new TreeSet<VoUser>();
			us.add(u2);
			us.add(u3);
			Topic tpc1 =  createTopic(getUserGroupId(Defaults.user1email, GroupType.NEIGHBORS));
			u3.setLastNotified(now+10);
			u2.setLastNotified(now-10);
			NewTopicsNotificationForTest nft = new NewTopicsNotificationForTest();
			
			PersistenceManager pm = PMF.getPm();
			try {
				msi.markMessageImportant( tpc1.getId(), true);
				nft.makeNotification( us, pm);
				Assert.assertEquals(1, nft.userTopics.size()); //один пользователь
				Assert.assertEquals(1, nft.userTopics.keySet().size());
				Iterator<VoUser> iterator = us.iterator();
				Assert.assertEquals(Defaults.user2id.longValue(), iterator.next().getId());
				Assert.assertEquals( 1, nft.userTopics.get( u2 )[ GroupType.NEIGHBORS.getValue()].size() );
				Assert.assertEquals( tpc1.getId(), nft.userTopics.get( u2 )[ GroupType.NEIGHBORS.getValue()].get(0).getId() );
				
				u3.setLastNotified(now-10);
				nft.makeNotification( us, pm);
				Assert.assertEquals(2, nft.userTopics.size()); //оба пользователя
				iterator = us.iterator();
				Assert.assertEquals(Defaults.user2id.longValue(), iterator.next().getId());
				Assert.assertEquals(Defaults.user3id.longValue(), iterator.next().getId());
				
			} finally {
				pm.close();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			fail("Exception thrown." + e.getMessage());
		}		
	}
	// проверка отправки только сообщений из зоны видимости пользователя
	// проаерка корректой группировки сообщений по зонам видимости
	// проверка отправки только сообшений из рубрик на которые подписан пользователь
}
