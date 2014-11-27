package com.vmesteonline.be;

import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.VoUser;
import com.vmesteonline.be.jdo2.VoUserGroup;
import com.vmesteonline.be.thrift.GroupType;
import com.vmesteonline.be.thrift.authservice.LoginResult;
import com.vmesteonline.be.thrift.messageservice.MessageType;
import com.vmesteonline.be.utils.Defaults;

import javax.jdo.JDOHelper;
import javax.jdo.PersistenceManager;
import javax.jdo.PersistenceManagerFactory;
import java.util.HashMap;
import java.util.TreeMap;

public class TestWorkAround {

	public static String sessionId = "11111111111111111111111";

	protected AuthServiceImpl asi;
	protected UserServiceImpl usi;
	protected MessageServiceImpl msi;
	protected HashMap<MessageType, Long> noLinkedMessages = new HashMap<MessageType, Long>();
	protected TreeMap<Long, String> noTags = new TreeMap<Long, String>();
	private static final PersistenceManagerFactory persistenceManagerFactory = JDOHelper.getPersistenceManagerFactory("votest");
	protected static final PersistenceManager pm;
	static {
		PMF.setDatabaseName("votest");
		pm = persistenceManagerFactory.getPersistenceManager();
	}

	protected String topicSubject = "Test topic";

	protected boolean init() {
		try {
			if (!Defaults.initDefaultData(pm,false))
				return false;

			asi = new AuthServiceImpl(sessionId);
			if (LoginResult.SUCCESS != asi.login(Defaults.user1email, Defaults.user1pass))
				return false;
			usi = new UserServiceImpl(sessionId);
			msi = new MessageServiceImpl(sessionId);

			return true;

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	void close() {
		/*helper.tearDown();*/
	}

	protected long getUserGroupId(String email, GroupType type) {
		VoUser user = asi.getUserByEmail(email, pm);
		VoUserGroup group = user.getGroup(type, pm);
		return null == group ? 0L : group.getId();
	}

}
