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
import com.vmesteonline.be.notifications.Notification;
import com.vmesteonline.be.thrift.GroupType;
import com.vmesteonline.be.thrift.NotificationFreq;
import com.vmesteonline.be.thrift.messageservice.MessageType;
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
			VoUser u1 = pm.getObjectById(VoUser.class, Defaults.user1id);
			VoUser u2 = pm.getObjectById(VoUser.class, Defaults.user2id);
			VoUser u3 = pm.getObjectById(VoUser.class, Defaults.user3id);
			VoUser u4 = pm.getObjectById(VoUser.class, Defaults.user4id);
			
			//время последней нотификации устанавливатся во время создания пользователя 
			u1.setNotificationsFreq(NotificationFreq.NEVER.getValue());
			u2.setNotificationsFreq(NotificationFreq.DAYLY.getValue());
			u3.setNotificationsFreq(NotificationFreq.TWICEAWEEK.getValue());
			u4.setNotificationsFreq(NotificationFreq.WEEKLY.getValue());
			
			Set<VoUser> us = new TreeSet<VoUser>();
			us.add(u1);
			us.add(u2);
			us.add(u3);
			us.add(u4);
			
			NewTopicsNotificationForTest nft = new NewTopicsNotificationForTest();
			u1.setLastNotified( now - 86400 * 100);
			u2.setLastNotified( now - 86400 * 2);
			u3.setLastNotified( now - 86400 * 4);
			u4.setLastNotified( now - 86400 * 8);
			
			PersistenceManager pm = PMF.getPm();
			Set<VoUser> rl = nft.createRecipientsList(pm);
			
			Assert.assertEquals(3, rl.size());
			Assert.assertTrue( rl.contains(u2)); 
			Assert.assertTrue( rl.contains(u3));
			Assert.assertTrue( rl.contains(u4));
			
			u2.setLastNotified( now - 86400 * 1 + 10);
			u3.setLastNotified( now - 86400 * 3 + 10);
			u4.setLastNotified( now - 86400 * 7 + 10);
			
			rl = nft.createRecipientsList(pm);
			Assert.assertEquals( 0, rl.size() );
			
		} catch (Exception e) {
			e.printStackTrace();
			fail("Exception thrown." + e.getMessage());
		}		
	}
	// проверка отправки только сообщений из зоны видимости пользователя
	@Test
	public void testSendToRegionsThatAreCovered() {
		int now = (int) (System.currentTimeMillis()/1000L);
		try {
		  // inviteCode 1 addr zan 32 k 3 kv 5 staircase 1 user a
			// inviteCode 2 addr zan 32 k 3 kv 50 staircase 2 user b
			// inviteCode 3 addr zan 32 k 3 kv 51 staircase 2 user c
			// inviteCode 4 addr zan 35 kv 35 staircase 1 user d
			// inviteCode 5 addr resp 6 kv 5 staircase 1 user e
			VoUser u1 = pm.getObjectById(VoUser.class, Defaults.user1id);
			VoUser u2 = pm.getObjectById(VoUser.class, Defaults.user2id);
			VoUser u3 = pm.getObjectById(VoUser.class, Defaults.user3id);
			VoUser u4 = pm.getObjectById(VoUser.class, Defaults.user4id);
			VoUser u5 = pm.getObjectById(VoUser.class, Defaults.user5id);
			
			Set<VoUser> us = new TreeSet<VoUser>();
			us.add(u1);
			us.add(u2);
			us.add(u3);
			us.add(u4);
			us.add(u5);
			
			PersistenceManager pm = PMF.getPm();
			
			try {
			
				Topic tpc =  createTopic(getUserGroupId(Defaults.user2email, GroupType.FLOOR));
				msi.markMessageImportant( tpc.getId(), true);				
				VoTopic vtpc1 = pm.getObjectById(VoTopic.class, tpc.getId());
				tpc =  createTopic(getUserGroupId(Defaults.user2email, GroupType.STAIRCASE));
				msi.markMessageImportant( tpc.getId(), true);				
				VoTopic vtpc2 = pm.getObjectById(VoTopic.class, tpc.getId());
				tpc =  createTopic(getUserGroupId(Defaults.user2email, GroupType.BUILDING));
				msi.markMessageImportant( tpc.getId(), true);				
				VoTopic vtpc3 = pm.getObjectById(VoTopic.class, tpc.getId());
				tpc =  createTopic(getUserGroupId(Defaults.user2email, GroupType.NEIGHBORS));
				msi.markMessageImportant( tpc.getId(), true);				
				VoTopic vtpc4 = pm.getObjectById(VoTopic.class, tpc.getId());
				tpc =  createTopic(getUserGroupId(Defaults.user2email, GroupType.NEIGHBORS));
				msi.markMessageImportant( tpc.getId(), true);			
				asi.login(Defaults.user6email, Defaults.user6pass);
				msi.moveTopic(tpc.getId(), 0L, null, null, GroupType.DISTRICT, MessageType.WALL);
				VoTopic vtpc5 = pm.getObjectById(VoTopic.class, tpc.getId());							
				
				NewTopicsNotificationForTest nft = new NewTopicsNotificationForTest();
				
				nft.makeNotification( us, pm);

				Assert.assertEquals(5, nft.userTopics.size()); //один пользователь
				//первый пользователь должен увидеть сообщения уровня дома и выше
				Assert.assertTrue(nft.userTopics.containsKey(u1));
				Assert.assertEquals(null, nft.userTopics.get(u1)[GroupType.FLOOR.getValue()]);
				Assert.assertEquals(null, nft.userTopics.get(u1)[GroupType.STAIRCASE.getValue()]);
				
				Assert.assertEquals(1, nft.userTopics.get(u1)[GroupType.BUILDING.getValue()].size());
				Assert.assertEquals(vtpc3.getId(), nft.userTopics.get(u1)[GroupType.BUILDING.getValue()].get(0).getId());
				Assert.assertEquals(1, nft.userTopics.get(u1)[GroupType.NEIGHBORS.getValue()].size());
				Assert.assertEquals(vtpc4.getId(), nft.userTopics.get(u1)[GroupType.NEIGHBORS.getValue()].get(0).getId());
				Assert.assertEquals(1, nft.userTopics.get(u1)[GroupType.DISTRICT.getValue()].size());
				Assert.assertEquals(vtpc5.getId(), nft.userTopics.get(u1)[GroupType.DISTRICT.getValue()].get(0).getId());
				
				//второй пользователь должен увидеть все сообщения
				Assert.assertTrue(nft.userTopics.containsKey(u2));
				Assert.assertEquals(1, nft.userTopics.get(u2)[GroupType.FLOOR.getValue()].size());
				Assert.assertEquals(vtpc1.getId(), nft.userTopics.get(u2)[GroupType.FLOOR.getValue()].get(0).getId());				
				Assert.assertEquals(1, nft.userTopics.get(u2)[GroupType.STAIRCASE.getValue()].size());
				Assert.assertEquals(vtpc2.getId(), nft.userTopics.get(u2)[GroupType.STAIRCASE.getValue()].get(0).getId());
				Assert.assertEquals(1, nft.userTopics.get(u2)[GroupType.BUILDING.getValue()].size());
				Assert.assertEquals(vtpc3.getId(), nft.userTopics.get(u2)[GroupType.BUILDING.getValue()].get(0).getId());
				Assert.assertEquals(1, nft.userTopics.get(u2)[GroupType.NEIGHBORS.getValue()].size());
				Assert.assertEquals(vtpc4.getId(), nft.userTopics.get(u2)[GroupType.NEIGHBORS.getValue()].get(0).getId());
				Assert.assertEquals(1, nft.userTopics.get(u2)[GroupType.DISTRICT.getValue()].size());
				Assert.assertEquals(vtpc5.getId(), nft.userTopics.get(u2)[GroupType.DISTRICT.getValue()].get(0).getId());
				
			//пятый пользователь должен увидеть только сообщений для района
				Assert.assertTrue(nft.userTopics.containsKey(u5));
				Assert.assertEquals(null, nft.userTopics.get(u5)[GroupType.FLOOR.getValue()]);
				Assert.assertEquals(null, nft.userTopics.get(u5)[GroupType.STAIRCASE.getValue()]);
				Assert.assertEquals(null, nft.userTopics.get(u5)[GroupType.BUILDING.getValue()]);
				Assert.assertEquals(null, nft.userTopics.get(u5)[GroupType.NEIGHBORS.getValue()]);
				
				Assert.assertEquals(1, nft.userTopics.get(u5)[GroupType.DISTRICT.getValue()].size());
				Assert.assertEquals(vtpc5.getId(), nft.userTopics.get(u5)[GroupType.DISTRICT.getValue()].get(0).getId());				
								
			} finally {
				pm.close();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			fail("Exception thrown." + e.getMessage());
		}		
	}
	
	// проаерка корректой группировки сообщений по зонам видимости
	@Test
	public void testGrpupMessagesByLocation() {
		int now = (int) (System.currentTimeMillis()/1000L);
		try {
			VoUser u2 = pm.getObjectById(VoUser.class, Defaults.user2id);
			
			Set<VoUser> us = new TreeSet<VoUser>();
			us.add(u2);
			
			PersistenceManager pm = PMF.getPm();
			
			try {
			
				Topic tpc =  createTopic(getUserGroupId(Defaults.user3email, GroupType.FLOOR));
				msi.markMessageImportant( tpc.getId(), true);				
				VoTopic vtpc1 = pm.getObjectById(VoTopic.class, tpc.getId());
				tpc =  createTopic(getUserGroupId(Defaults.user3email, GroupType.FLOOR));
				msi.markMessageImportant( tpc.getId(), true);				
				VoTopic vtpc2 = pm.getObjectById(VoTopic.class, tpc.getId());
				tpc =  createTopic(getUserGroupId(Defaults.user2email, GroupType.BUILDING));
				msi.markMessageImportant( tpc.getId(), true);				
				VoTopic vtpc3 = pm.getObjectById(VoTopic.class, tpc.getId());
				tpc =  createTopic(getUserGroupId(Defaults.user2email, GroupType.BUILDING));
				msi.markMessageImportant( tpc.getId(), true);				
				VoTopic vtpc4 = pm.getObjectById(VoTopic.class, tpc.getId());
				
				NewTopicsNotificationForTest nft = new NewTopicsNotificationForTest();
				
				nft.makeNotification( us, pm);

				Assert.assertEquals(1, nft.userTopics.size()); //один пользователь
				//первый пользователь должен увидеть сообщения уровня дома и выше
				Assert.assertTrue(nft.userTopics.containsKey(u2));
				Assert.assertEquals(2, nft.userTopics.get(u2)[GroupType.FLOOR.getValue()].size());
				Assert.assertEquals(vtpc1.getId(), nft.userTopics.get(u2)[GroupType.FLOOR.getValue()].get(0).getId());
				Assert.assertEquals(vtpc2.getId(), nft.userTopics.get(u2)[GroupType.FLOOR.getValue()].get(1).getId());
				
				Assert.assertEquals(2, nft.userTopics.get(u2)[GroupType.BUILDING.getValue()].size());
				Assert.assertEquals(vtpc3.getId(), nft.userTopics.get(u2)[GroupType.BUILDING.getValue()].get(0).getId());
				Assert.assertEquals(vtpc4.getId(), nft.userTopics.get(u2)[GroupType.BUILDING.getValue()].get(1).getId());
			} finally {
				pm.close();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			fail("Exception thrown." + e.getMessage());
		}		
	}
	// проверка отправки только сообшений из рубрик на которые подписан пользователь
}
