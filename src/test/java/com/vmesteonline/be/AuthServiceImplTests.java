package com.vmesteonline.be;

import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.VoUser;
import com.vmesteonline.be.jdo2.VoUserGroup;
import com.vmesteonline.be.jdo2.postaladdress.*;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.VoError;
import com.vmesteonline.be.thrift.authservice.LoginResult;
import com.vmesteonline.be.utils.Defaults;
import org.apache.thrift.TException;
import org.junit.Before;
import org.junit.Test;

import javax.jdo.PersistenceManager;
import java.math.BigDecimal;
import java.util.List;

import static org.junit.Assert.*;

public class AuthServiceImplTests extends TestWorkAround{

    AuthServiceImpl asi;
    UserServiceImpl usi;

    static private String httpSessionId = "111";

    @Before
    public void setUp() throws Exception {
        super.setUp();
        Defaults.initDefaultData(pm);
        asi = new AuthServiceImpl();
        usi = new UserServiceImpl();
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
            new AuthServiceImpl().checkIfAuthorized();
        } catch (InvalidOperation e) {
            fail("user a with pass a should be valid");
        }

    }

    @Test
    public void testGetSessionNotAuthorized() {
        try {
            new AuthServiceImpl().checkIfAuthorized();
            fail("session should throw exception");
        } catch (InvalidOperation e) {
            assertEquals(VoError.NotAuthorized, e.what);
        }
    }

    @Test
    public void testRegisterNewUser() {

        try {
            PersistenceManager pm = PMF.getPm();
            long ret = asi.registerNewUser("testName", "testFamily", "testPassword", "test@eml", "1", 0);
            VoUser user = asi.getUserByEmail("test@eml", pm);
            assertEquals("testName", user.getName());
            assertEquals("testPassword", user.getPassword());

            VoUser userByRet = pm.getObjectById(VoUser.class, ret);
            assertEquals(userByRet.getName(), user.getName());
            assertEquals(userByRet.getPassword(), user.getPassword());

            VoPostalAddress postalAddress = pm.getObjectById( VoPostalAddress.class, user.getAddress());
            VoBuilding building = pm.getObjectById(VoBuilding.class, postalAddress.getBuilding());
            BigDecimal longitude = building.getLongitude();
			assertEquals(user.getLongitude(), longitude);
			BigDecimal latitude = building.getLatitude();
			assertEquals(user.getLatitude(), latitude);


            List<Long> groups = user.getGroups();
            assertEquals(groups.isEmpty(), false);
			for (Long ugid : groups) {
                VoUserGroup ug = pm.getObjectById(VoUserGroup.class, ugid);
                assertEquals(ug.getLatitude(), latitude);
				assertEquals(ug.getLongitude(), longitude);
			}
			assertEquals(LoginResult.EMAIL_NOT_CONFIRMED, asi.login("test@eml", "testPassword"));

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
            asi.registerNewUser("testName", "testFamily", "testPassword", email, "1", 0);
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
            long uid = asi.registerNewUser("testName", "testFamily", "testPassword", email, "1", 0);
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
            String addressString = "Россия, Ленинградская область, кудрово, Ленинградская улица д 7";
            long nuid = asi.registerNewUserByAddress("FN", "LN", "PW", "aaa@bbb.com", addressString, (short) 1);
            assertTrue(nuid != 0L);
            VoUser vu = pm.getObjectById(VoUser.class, nuid);
            VoPostalAddress pa = pm.getObjectById(VoPostalAddress.class, vu.getAddress());
            VoBuilding building = pm.getObjectById(VoBuilding.class, pa.getBuilding());
            assertEquals(building.getFullNo(), "7");
            assertEquals(pa.getFloor(), 0);
            assertEquals(pa.getStaircase(), 0);
            assertEquals(pa.getFlatNo(), 0);
            VoStreet voStreet = pm.getObjectById(VoStreet.class, building.getStreetId());
            assertEquals(voStreet.getName(),"Ленинградская улица");
            VoCity voCity = pm.getObjectById(VoCity.class, voStreet.getCity());
            assertEquals(voCity.getName(),"деревня Кудрово");
            VoCountry voCountry = pm.getObjectById(VoCountry.class, voCity.getCountry());
            assertEquals(voCountry.getName(),"Россия");
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e);
            assertFalse(true);
        }
    }
}
