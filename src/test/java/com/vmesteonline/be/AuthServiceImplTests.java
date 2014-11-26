package com.vmesteonline.be;

import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.VoUser;
import com.vmesteonline.be.jdo2.VoUserGroup;
import com.vmesteonline.be.jdo2.postaladdress.*;
import com.vmesteonline.be.thrift.Group;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.VoError;
import com.vmesteonline.be.utils.Defaults;
import org.apache.thrift.TException;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import javax.jdo.PersistenceManager;
import java.util.List;

import static org.junit.Assert.*;

public class AuthServiceImplTests extends TestWorkAround{

    AuthServiceImpl asi;
    UserServiceImpl usi;

    static private String httpSessionId = "111";

    @Before
    public void setUp() throws Exception {
        Defaults.initDefaultData(pm);
        asi = new AuthServiceImpl(httpSessionId);
        usi = new UserServiceImpl(httpSessionId);

    }

    @After
    public void tearDown() throws Exception {
        pm.close();
    }

    @Test
    public void testDefaultsUserGetGroups() {
        try {
            asi.login(Defaults.user1email, Defaults.user1pass);
            List<Group> gs = usi.getUserGroups();
            Assert.assertEquals("Республиканская 32/3", gs.get(0).getName());

            asi.login(Defaults.user2email, Defaults.user2pass);
            gs = usi.getUserGroups();
            Assert.assertEquals("Республиканская 35", gs.get(0).getName());

        } catch (InvalidOperation e) {
            e.printStackTrace();
            fail("exception: " + e.getMessage());
        }
    }

    @Test
    public void testDefaultsUserCreation() {
        PersistenceManager pm = PMF.getPm();
        try {

            VoUser user = asi.getUserByEmail(Defaults.user1email, pm);
            VoUserGroup ug0Id = pm.getObjectById( VoUserGroup.class, user.getGroups().get(0));
            Assert.assertEquals(0, ug0Id.getRadius());
            Assert.assertEquals("Парадная 1", ug0Id.getName());
            Assert.assertEquals(Defaults.zan32k3Long + 0.000002F * 1, ug0Id.getLongitude(), 0F);
            System.out.print("a: " + ug0Id.getLongitude());

            user = asi.getUserByEmail(Defaults.user2email, pm);
            Assert.assertEquals(0, ug0Id.getRadius());
            Assert.assertEquals("Парадная 2", ug0Id.getName());
            Assert.assertEquals(Defaults.zan32k3Long + 0.000002F * 2, ug0Id.getLongitude(), 0F);
            System.out.print("b: " + ug0Id.getLongitude());

            user = asi.getUserByEmail(Defaults.user3email, pm);
            Assert.assertEquals(0, ug0Id.getRadius());
            Assert.assertEquals("Парадная 1", ug0Id.getName());
        } finally {
            pm.close();
        }
    }

    @Test
    public void testLogin() {
        try {
            asi.login("test", "ppp");
        } catch (InvalidOperation e) {
            assertEquals(VoError.IncorrectParametrs, e.what);
        }

    }

    @Test
    public void testLoginSuccess() {
        try {
            asi.login(Defaults.user1email, Defaults.user1pass);
            AuthServiceImpl.checkIfAuthorised(httpSessionId);
        } catch (InvalidOperation e) {
            fail("user a with pass a should be valid");
        }

    }

    @Test
    public void testGetSessionNotAuthorized() {
        try {
            AuthServiceImpl.checkIfAuthorised("ttemptySession");
            fail("session should throw exception");
        } catch (InvalidOperation e) {
            assertEquals(VoError.NotAuthorized, e.what);
        }
    }

    @Test
    public void testRegisterNewUser() {
        List<String> locations;
        try {
            locations = UserServiceImpl.getLocationCodesForRegistration();
        } catch (InvalidOperation e1) {
            e1.printStackTrace();
            fail(e1.getMessage());
            return;
        }
        try {
            PersistenceManager pm = PMF.getPm();
            long ret = asi.registerNewUser("testName", "testFamily", "testPassword", "test@eml", "1", 0);
            VoUser user = asi.getUserByEmail("test@eml", pm);
            assertEquals("testName", user.getName());
            assertEquals("testPassword", user.getPassword());
			/*
			 * Assert.assertNotNull(user.getHomeGroup()); assertEquals(0,
			 * user.getHomeGroup().getRadius());
			 */

            VoUser userByRet = pm.getObjectById(VoUser.class, ret);
            assertEquals(userByRet.getName(), user.getName());
            assertEquals(userByRet.getPassword(), user.getPassword());

/*			BigDecimal longitude = postalAddress.getBuilding().getLongitude();
			assertEquals(user.getLongitude(), longitude);
			BigDecimal latitude = postalAddress.getBuilding().getLatitude();
			assertEquals(user.getLatitude(), latitude);
			List<VoRubric> rubrics = user.getRubrics();
			assertEquals(rubrics.isEmpty(), false);
*/

            List<Long> groups = user.getGroups();
            assertEquals(groups.isEmpty(), false);
/*			for (VoUserGroup ug : groups) {
				assertEquals(ug.getLatitude(), latitude);
				assertEquals(ug.getLongitude(), longitude);
			}
*/			assertEquals(true, asi.login("test@eml", "testPassword"));

        } catch (TException e) {
            e.printStackTrace();
            fail(e.getMessage());
        }
    }

    @Test
    public void testCheckEmailRegistered() {

        String email = "aaa@bbb.com";
        assertFalse(asi.checkEmailRegistered(email));
        try {
            asi.registerNewUser("testName", "testFamily", "testPassword", email, null, 0);
        } catch (InvalidOperation e) {
            e.printStackTrace();
            assertFalse(true);
        }
        assertTrue(asi.checkEmailRegistered(email));
    }

    @Test
    public void testSendChangePasswordCodeRequest() {
        String email = "brozer@pisem.net";
        assertFalse(asi.checkEmailRegistered(email));
        try {
            long uid = asi.registerNewUser("testName", "testFamily", "testPassword", email, null, 0);
            asi.sendConfirmCode(email, "mailTemplates/changePasswordConfirm.html");
            PersistenceManager pm = PMF.getPm();
            try {
                VoUser vu = pm.getObjectById(VoUser.class, uid);
                vu.getConfirmCode();

                try {
                    asi.confirmRequest(email, "1" + vu.getConfirmCode(), "111");
                    fail();
                } catch (Exception e) {
                    assertTrue(e instanceof InvalidOperation);
                    assertEquals(((InvalidOperation) e).what, VoError.IncorrectParametrs);
                }
                asi.confirmRequest(email, "" + vu.getConfirmCode(), "111");
                // InvalidOperation(VoError.IncorrectParametrs,
                // "No such code registered for user!")
            } finally {
                pm.close();
            }
            pm = PMF.getPm();
            try {
                VoUser vu = pm.getObjectById(VoUser.class, uid);
                assertEquals(vu.getPassword(), "111");
            } finally {
                pm.close();
            }

        } catch (Exception e) {
            e.printStackTrace();
            assertFalse(true);
        }
        assertTrue(asi.checkEmailRegistered(email));
    }
    @Test
    public void testRegisterNewUserByAddress() throws Exception {

        try {
            long nuid = asi.registerNewUserByAddress("FN", "LN", "PW", "aaa@bbb.com", "Россия, Ленинградская область, Парголово, улица Ленинградская дом 7", (short) 1);
            assertTrue(nuid != 0L);
            VoUser vu = pm.getObjectById(VoUser.class, nuid);
            VoPostalAddress pa = pm.getObjectById(VoPostalAddress.class, vu.getAddress());
            VoBuilding building = pm.getObjectById(VoBuilding.class, pa.getBuilding());
            assertEquals(building.getFullNo(), "7");
            assertEquals(pa.getFloor(), 0);
            assertEquals(pa.getStaircase(), 0);
            assertEquals(pa.getFlatNo(), 0);
            VoStreet voStreet = pm.getObjectById(VoStreet.class, building.getStreetId());
            assertEquals(voStreet.getName(),"улица Ленинградская");
            VoCity voCity = pm.getObjectById(VoCity.class, voStreet.getCity());
            assertEquals(voCity.getName(),"Ленинградская область, поселок Парголово");
            VoCountry voCountry = pm.getObjectById(VoCountry.class, voCity.getCountry());
            assertEquals(voCountry.getName(),"Российчкая Федерация");
        } catch (Exception e) {
            System.out.println();
            assertFalse(true);
        }
    }
}
