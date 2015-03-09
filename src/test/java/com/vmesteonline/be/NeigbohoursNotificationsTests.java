package com.vmesteonline.be;

import static org.junit.Assert.*;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.TreeSet;
import java.util.Vector;

import javax.jdo.PersistenceManager;

import org.junit.After;
import org.junit.Assert;
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

		public boolean usersNewNeighbors;
		public Map<Long, Set<VoUser>> newNeighbors;
		
		public NewNGBR() {
			super(null);
		}

		@Override
		public void makeNotification(Set<VoUser> users, PersistenceManager pm) {
			super.makeNotification(users, pm);
		}

		@Override
		public Map<Long, Set<VoUser>> getNewNeighbors(PersistenceManager pm) {			
			newNeighbors = super.getNewNeighbors(pm);
			return newNeighbors;
		}

		@Override
		public boolean getUsersNewNeighbors(VoUser u, Map<Long, Set<VoUser>> groupUsersMap, Map<GroupType,Set<VoUser>> neibInGroups, PersistenceManager pm) {			
			usersNewNeighbors = super.getUsersNewNeighbors(u, groupUsersMap, neibInGroups, pm);
			return usersNewNeighbors;
		}

		@Override
		public String createMessageWithNewNeibs(Map<GroupType, Set<VoUser>> neibInGroups, PersistenceManager pm) {
			return super.createMessageWithNewNeibs(neibInGroups, pm);
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
	//группировка и зона видимости
	@Test
	public void testMakeNotificationForNewUsersOnly() {
		int now = (int) (System.currentTimeMillis()/1000L);
				
		try {
			
			NewNGBR ngbr = new NewNGBR();			
			Map<Long, Set<VoUser>> newNeighbors = ngbr.getNewNeighbors(pm);
			Assert.assertTrue(!newNeighbors.isEmpty());
			Assert.assertEquals( 4, newNeighbors.size());
			
			VoUser u1 = pm.getObjectById(VoUser.class, Defaults.user1id);
			VoUser u2 = pm.getObjectById(VoUser.class, Defaults.user2id);
			VoUser u3 = pm.getObjectById(VoUser.class, Defaults.user3id);
			VoUser u4 = pm.getObjectById(VoUser.class, Defaults.user4id);
			VoUser u5 = pm.getObjectById(VoUser.class, Defaults.user5id);
			u1.setLastNotified(0);
			u2.setLastNotified(0);
			u3.setLastNotified(0);
			u4.setLastNotified(0);
			u5.setLastNotified(0);
			
			Map<GroupType,Set<VoUser>> neibInGroups = new TreeMap<>();
			Assert.assertTrue(ngbr.getUsersNewNeighbors(u2, newNeighbors, neibInGroups, pm));
		// inviteCode 1 addr zan 32 k 3 kv 5 staircase 1 user a
		// inviteCode 2 addr zan 32 k 3 kv 50 staircase 2 user b
		// inviteCode 3 addr zan 32 k 3 kv 51 staircase 2 user c
		// inviteCode 4 addr zan 35 kv 35 staircase 1 user d
		// inviteCode 5 addr resp 6 kv 5 staircase 1 user e
			Set<VoUser> floorSet = neibInGroups.get( GroupType.FLOOR );
			Set<VoUser> staircaseSet = neibInGroups.get( GroupType.STAIRCASE );
			Set<VoUser> buildingSet = neibInGroups.get( GroupType.BUILDING );
			Set<VoUser> nbrSet = neibInGroups.get( GroupType.NEIGHBORS );
			Assert.assertEquals(1,  floorSet.size());
			Assert.assertTrue(floorSet.contains(u3));
			Assert.assertNull(staircaseSet);
			Assert.assertEquals(1,  buildingSet.size());
			Assert.assertTrue(buildingSet.contains(u1));
			Assert.assertEquals(1,  nbrSet.size());
			Assert.assertTrue(nbrSet.contains(u4));

			neibInGroups = new TreeMap<>();
			Assert.assertFalse(ngbr.getUsersNewNeighbors(u5, newNeighbors, neibInGroups, pm));
			floorSet = neibInGroups.get( GroupType.FLOOR );
			staircaseSet = neibInGroups.get( GroupType.STAIRCASE );
			buildingSet = neibInGroups.get( GroupType.BUILDING );
			nbrSet = neibInGroups.get( GroupType.NEIGHBORS );
			Assert.assertNull(floorSet);
			Assert.assertNull(staircaseSet);
			Assert.assertNull(buildingSet);
			Assert.assertNull( nbrSet );
			
			neibInGroups = new TreeMap<>();
			Assert.assertTrue(ngbr.getUsersNewNeighbors(u4, newNeighbors, neibInGroups, pm));
			floorSet = neibInGroups.get( GroupType.FLOOR );
			staircaseSet = neibInGroups.get( GroupType.STAIRCASE );
			buildingSet = neibInGroups.get( GroupType.BUILDING );
			nbrSet = neibInGroups.get( GroupType.NEIGHBORS );
			Assert.assertNull(floorSet);
			Assert.assertNull(staircaseSet);
			Assert.assertNull(buildingSet);
			Assert.assertEquals(3,  nbrSet.size());
			Assert.assertTrue(nbrSet.contains(u1));
			Assert.assertTrue(nbrSet.contains(u2));
			Assert.assertTrue(nbrSet.contains(u3));			
			
		} catch (Exception e) {
			e.printStackTrace();
			fail("Exception thrown." + e.getMessage());
		}
	}

	//корректность данных в сообщении
	@Test
	public void testMakeNotificationBody() {
		int now = (int) (System.currentTimeMillis()/1000L);
				
		try {
			
			NewNGBR ngbr = new NewNGBR();			
			Map<Long, Set<VoUser>> newNeighbors = ngbr.getNewNeighbors(pm);
			Assert.assertTrue(!newNeighbors.isEmpty());
			Assert.assertEquals( 4, newNeighbors.size());
			
			VoUser u1 = pm.getObjectById(VoUser.class, Defaults.user1id);
			VoUser u2 = pm.getObjectById(VoUser.class, Defaults.user2id);
			VoUser u3 = pm.getObjectById(VoUser.class, Defaults.user3id);
			VoUser u4 = pm.getObjectById(VoUser.class, Defaults.user4id);
			VoUser u5 = pm.getObjectById(VoUser.class, Defaults.user5id);
			u1.setLastNotified(0);
			u2.setLastNotified(0);
			u3.setLastNotified(0);
			u4.setLastNotified(0);
			u5.setLastNotified(0);
			
			Map<GroupType,Set<VoUser>> neibInGroups = new TreeMap<>();
			Assert.assertTrue(ngbr.getUsersNewNeighbors(u2, newNeighbors, neibInGroups, pm));
			String msgBody = ngbr.createMessageWithNewNeibs(neibInGroups, pm);
			Assert.assertTrue(null!=msgBody && msgBody.length()>0);
			
		} catch (Exception e) {
			e.printStackTrace();
			fail("Exception thrown." + e.getMessage());
		}
	}
}
