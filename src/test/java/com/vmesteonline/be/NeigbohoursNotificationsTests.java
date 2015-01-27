package com.vmesteonline.be;

import static org.junit.Assert.*;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import javax.jdo.PersistenceManager;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.vmesteonline.be.NewsNotificationsTests.NewTopicsNotificationForTest;
import com.vmesteonline.be.jdo2.VoUser;
import com.vmesteonline.be.notifications.NewNeigboursNotification;
import com.vmesteonline.be.thrift.GroupType;
import com.vmesteonline.be.thrift.messageservice.Topic;
import com.vmesteonline.be.utils.Defaults;

public class NeigbohoursNotificationsTests extends MessageServiceTests {

	public static class NewNGBR extends NewNeigboursNotification {

		public NewNGBR() {
			super(null);
		}

		@Override
		public void makeNotification(Set<VoUser> users, PersistenceManager pm) {
			super.makeNotification(users, pm);
		}

		@Override
		protected Map<Long, Set<VoUser>> getNewNeighbors(PersistenceManager pm) {			
			return super.getNewNeighbors(pm);
		}
		
		
	}
	@Before
	public void setUp() throws Exception {
		super.setUp();
	}

	@After
	public void tearDown() throws Exception {
		super.tearDown();
	}

	//присылается информация только по пользователям зарегестрированным после предыдущего оповещения
	@Test
	public void testMakeNotificationForNewUsersOnly() {
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
			NewNGBR ngbr = new NewNGBR();
			Map<Long, Set<VoUser>> newNeighbors = ngbr.getNewNeighbors(pm);
			
			
		} catch (Exception e) {
			e.printStackTrace();
			fail("Exception thrown." + e.getMessage());
		}
	}
	//группировка и зона видимости
	//корректность данных в сообщении
	

}
