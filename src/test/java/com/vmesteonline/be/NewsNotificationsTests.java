package com.vmesteonline.be;

import static org.junit.Assert.fail;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

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
		
		public NewTopicsNotificationForTest() {
			super(null);		
			userTopics = null;
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
			Set<VoUser> us = new HashSet<>();
			us.add(u2);
			Topic tpc1 =  createTopic(getUserGroupId(Defaults.user1email, GroupType.NEIGHBORS));
			NewTopicsNotificationForTest nft = new NewTopicsNotificationForTest();
			
			PersistenceManager pm = PMF.getPm();
			try {
				nft.makeNotification( us, pm);
				Assert.assertEquals(0, nft.userTopics.size()); //сообщение не отмечено пользователями как важное, не попадает в расслку
				msi.markMessageImportant( tpc1.getId(), true); 
				nft.makeNotification( us, pm);
				Assert.assertEquals(1, nft.userTopics.size()); //отмеченное попало
				Assert.assertEquals(1, nft.userTopics.keySet().size());
				Assert.assertEquals(Defaults.user2id.longValue(), us.iterator().next().getId());
				Assert.assertEquals( 1, nft.userTopics.get( u2 )[ GroupType.NEIGHBORS.getValue()].size() );
				Assert.assertEquals( tpc1.getId(), nft.userTopics.get( u2 )[ GroupType.NEIGHBORS.getValue()].get(0).getId() );
			} finally {
				pm.close();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			fail("Exception thrown." + e.getMessage());
		}
		
	}
	// проверка отсутствия повторных сообщений
	// проверка отправки сообщений не чаще чем в установленный пользователем период
	// проверка отправки только сообщений из зоны видимости пользователя
	// проаерка корректой группировки сообщений по зонам видимости
	// проверка отправки только сообшений из рубрик на которые подписан пользователь
}
