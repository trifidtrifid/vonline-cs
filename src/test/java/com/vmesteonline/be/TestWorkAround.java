package com.vmesteonline.be;

import com.vmesteonline.be.jdo2.VoUser;
import com.vmesteonline.be.jdo2.VoUserGroup;
import com.vmesteonline.be.thrift.GroupType;
import com.vmesteonline.be.thrift.authservice.LoginResult;
import com.vmesteonline.be.utils.Defaults;
import com.vmesteonline.be.utils.EMailHelper;
import org.junit.After;
import org.junit.Before;

import javax.jdo.JDOHelper;
import javax.jdo.PersistenceManager;
import javax.jdo.PersistenceManagerFactory;

public class TestWorkAround {

	private static PersistenceInitFilter pif;
	public static String sessionId = "11111111111111111111111";

	protected AuthServiceImpl asi;
	protected UserServiceImpl usi;
	protected MessageServiceImpl msi;

	private static final PersistenceManagerFactory persistenceManagerFactory = JDOHelper.getPersistenceManagerFactory("votest");
	protected static PersistenceManager pm;
	protected String topicSubject = "Test topic";

	protected boolean init() {
		try {
			if (!Defaults.initDefaultData(pm, false))
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

	@After
	public void tearDown() throws Exception {
		pm.close();
	}

	protected long getUserGroupId(String email, GroupType type) {
		VoUser user = asi.getUserByEmail(email, pm);
		VoUserGroup group = user.getGroup(type, pm);
		return null == group ? 0L : group.getId();
	}

	@Before
	public void setUp() throws Exception {
		EMailHelper.isItTests = true;
		pif.databaseName = "votest";
		pm = persistenceManagerFactory.getPersistenceManager();
	}
}