package com.vmesteonline.be;

import com.vmesteonline.be.jdo2.VoMessage;
import com.vmesteonline.be.thrift.InvalidOperation;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.fail;

public class MessagesTreeTests extends MessagesTree {

	List<VoMessage> lst;
	int msgCreateTime;
	String lgDef = "50";
	String ltDef = "30";
	int radiusDef = 200;

	VoMessage createVoMsg(long id, long parentId, int radius, String longitude, String latitude) {
		VoMessage msg = createVoMsg(id, parentId, 0);
		/*msg.setRadius(radius);
		msg.setLongitude(new BigDecimal(longitude));
		msg.setLatitude(new BigDecimal(latitude))*/;
		return msg;
	}

	VoMessage createVoMsg(long id, long parentId, long recepientId) {
		VoMessage msg = new VoMessage();
		msg.setId(id);
		msg.setParentId(parentId);
		msg.setRecipient(recepientId);
		msg.setAuthorId(1L);
		msgCreateTime += 10;
		msg.setCreatedAt(msgCreateTime);
		/*msg.setRadius(radiusDef);
		msg.setLongitude(new BigDecimal(lgDef));
		msg.setLatitude(new BigDecimal(ltDef));*/

		return msg;
	}

	// topic
	// -msg1
	// --msg4
	// --msg5
	// ---msg6
	// ----msg7
	// -msg2
	// --msg8
	// -msg3

	@Before
	public void setUp() throws Exception {
		//helper.setUp();
		msgCreateTime = 0;
		lst = new ArrayList<VoMessage>();
		lst.add(createVoMsg(1, 0, 0));
		lst.add(createVoMsg(2, 0, 0));
		lst.add(createVoMsg(3, 0, 0));
		lst.add(createVoMsg(4, 1, 0));
		lst.add(createVoMsg(5, 1, 0));
		lst.add(createVoMsg(6, 5, 0));
		lst.add(createVoMsg(7, 6, 0));
		lst.add(createVoMsg(8, 2, 0));
	}

	@After
	public void tearDown() throws Exception {
		//helper.tearDown();
	}


	@Test
	public void testGetMessagesWithChildMessagesNum() {
		MessagesTree t = new MessagesTree(lst);
		try {
			List<VoMessage> msgs = t.getTreeMessagesAfter(1, new MessagesTree.Filters(0, null));
			Assert.assertEquals(4, msgs.size());
			Assert.assertEquals(4, msgs.get(0).getId());
			Assert.assertEquals(0, msgs.get(0).getChildMessageNum());

			Assert.assertEquals(5, msgs.get(1).getId());
			Assert.assertEquals(2, msgs.get(1).getChildMessageNum());

			Assert.assertEquals(6, msgs.get(2).getId());
			Assert.assertEquals(1, msgs.get(2).getChildMessageNum());

			Assert.assertEquals(7, msgs.get(3).getId());
			Assert.assertEquals(0, msgs.get(3).getChildMessageNum());

		} catch (InvalidOperation e) {
			e.printStackTrace();
			fail("Exception: " + e.getMessage());
		}

	}

	// topic
	// -msg1
	// --msg4
	// --msg5
	// ---msg6
	// ----msg10_private
	// ----msg7
	// -msg2
	// --msg8
	// -msg3
	// -msg9_private

	@Test
	public void testMessageTreeWithPrivateMessages() {
		long userId = 10;
		lst.add(createVoMsg(9, 0, userId));
		lst.add(createVoMsg(10, 6, userId));

		MessagesTree t = new MessagesTree(lst);
		try {
			List<VoMessage> msgs = t.getTreeMessagesAfter(1, new MessagesTree.Filters(0, null));
			Assert.assertEquals(4, msgs.size());

			msgs = t.getTreeMessagesAfter(1, new MessagesTree.Filters(userId, null));
			Assert.assertEquals(5, msgs.size());

		} catch (InvalidOperation e) {
			e.printStackTrace();
			fail("Exception: " + e.getMessage());
		}

	}

	@Test
	public void testGetTreeMessagesAfter() {
		try {
			MessagesTree t = new MessagesTree(lst);

			List<VoMessage> msgs = t.getTreeMessagesAfter(1, new MessagesTree.Filters(0, null));
			Assert.assertEquals(4, msgs.size());
			Assert.assertEquals(4, msgs.get(0).getId());
			Assert.assertEquals(1, msgs.get(0).getVisibleOffset());

			Assert.assertEquals(5, msgs.get(1).getId());
			Assert.assertEquals(1, msgs.get(1).getVisibleOffset());

			Assert.assertEquals(6, msgs.get(2).getId());
			Assert.assertEquals(2, msgs.get(2).getVisibleOffset());

		} catch (Exception e) {
			e.printStackTrace();
			fail("catch exception: " + e.getMessage());
		}
	}

	@Test
	public void testGetTreeMessagesAfterMoreThenHave() {
		try {
			MessagesTree t = new MessagesTree(lst);

			List<VoMessage> msgs = t.getTreeMessagesAfter(5, new MessagesTree.Filters(0, null));
			Assert.assertEquals(2, msgs.size());
			Assert.assertEquals(6, msgs.get(0).getId());
			Assert.assertEquals(7, msgs.get(1).getId());

		} catch (Exception e) {
			e.printStackTrace();
			fail("catch exception: " + e.getMessage());
		}
	}
}
