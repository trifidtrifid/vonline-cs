package com.vmesteonline.be;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import org.apache.thrift.TException;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.omg.PortableInterceptor.SUCCESSFUL;

import com.vmesteonline.be.jdo2.VoUser;
import com.vmesteonline.be.thrift.GroupType;
import com.vmesteonline.be.thrift.authservice.LoginResult;
import com.vmesteonline.be.thrift.businesservice.BusinessDescription;
import com.vmesteonline.be.thrift.businesservice.BusinessInfo;
import com.vmesteonline.be.thrift.messageservice.Attach;
import com.vmesteonline.be.thrift.messageservice.WallItem;
import com.vmesteonline.be.utils.Defaults;
import com.vmesteonline.be.utils.VoHelper;

public class BusinessServiceImplTest extends TestWorkAround {

	private BusinessDescription bd1 = new BusinessDescription( 0, "Бизнес1", "Длинное название Бизнеса 1", 
			"кратакая инфа по Бизнесу 1", "Длинная инфа по Бизнесу1", 
			new Attach("B1.logo.jpeg", "image/jpeg", "http://www.onlineconversion.com/rf_logo.gif"),
			new ArrayList<Attach>(), "Адрес Бизнеса 1", "30.0000", "60.0000", 350);
	
	@Before
	public void setUp() throws Exception {
		super.setUp();
		init();
	}

	@After
	public void tearDown() throws Exception {
		super.tearDown();
	}

	@Test
	public void testGetMyBusinessInfo() {
		try {
			asi.login("info@vmesteonline.ru", "123456");
			BusinessDescription bd1copy = new BusinessDescription(bd1);
			Assert.assertNotNull(bsi.createBusinessDescription(bd1copy, "a", "a"));
			Assert.assertEquals(0, bd1copy.id);
			
			BusinessDescription bd = bsi.createBusinessDescription(bd1, "bzns1", "123456");
			Assert.assertNotNull(bd);
			Assert.assertEquals( LoginResult.USER_IS_COMERC, asi.login("bzns1", "123456"));
			BusinessDescription mbi = bsi.getMyBusinessInfo();
			Assert.assertEquals(bd1.shortName, mbi.shortName);
			Assert.assertEquals(bd1.fullName, mbi.fullName);
			Assert.assertEquals(bd1.shortInfo, mbi.shortInfo);
			Assert.assertEquals(bd1.fullInfo, mbi.fullInfo);
			Assert.assertEquals(bd1.longitude, mbi.longitude);
			Assert.assertEquals(bd1.latitude, mbi.latitude);
			Assert.assertEquals(bd1.radius, mbi.radius);
			Assert.assertTrue(mbi.logo!=null && mbi.logo.isSetURL());
			Assert.assertTrue(mbi.id!=0L);
			
		} catch (TException e) {			
			e.printStackTrace();
			Assert.fail();
		}
	}

	@Test
	public void testGetBusinessList() {
		try {
			asi.login("info@vmesteonline.ru", "123456");
			VoUser user1 = pm.getObjectById(VoUser.class,Defaults.user1id);
			bd1.longitude = user1.getLongitude().toPlainString();
			bd1.latitude = user1.getLatitude().toPlainString();
			BusinessDescription bd11 = bsi.createBusinessDescription(bd1, "bzns1", "123456");			
			
			VoHelper.getLatitudeMax(user1.getLatitude(), Defaults.radiusBuilding+10);
			BusinessDescription bd2 = new BusinessDescription(bd1);
			bd2.setLatitude(VoHelper.getLatitudeMax(user1.getLatitude(), Defaults.radiusBuilding+10).toPlainString());
			BusinessDescription bd22 = bsi.createBusinessDescription(bd2, "bzns2", "123456");
			
			Assert.assertEquals( LoginResult.SUCCESS, asi.login(Defaults.user1email, Defaults.user1pass));
			
			List<BusinessInfo> buildingBD = bsi.getBusinessList(GroupType.BUILDING, 0);
			List<BusinessInfo> nbhBD = bsi.getBusinessList(GroupType.NEIGHBORS, 0);
			
			Assert.assertEquals(1, buildingBD.size());
			Assert.assertEquals(2, nbhBD.size());
			
			Assert.assertEquals(buildingBD.get(0).id, bd11.id);
			Assert.assertEquals(0, buildingBD.get(0).distance);
			
			Assert.assertEquals(nbhBD.get(0).id, bd11.id);
			Assert.assertEquals(0, nbhBD.get(0).distance);
			Assert.assertEquals(nbhBD.get(1).id, bd22.id);
			Assert.assertEquals(Defaults.radiusBuilding+10, nbhBD.get(1).distance);
					
		} catch (TException e) {			
			e.printStackTrace();
			Assert.fail();
		}
	}

	@Test
	public void testGetBusinessDescription() {
		try {
			asi.login("info@vmesteonline.ru", "123456");
			
			BusinessDescription bd = bsi.createBusinessDescription(bd1, "bzns1", "123456");
			Assert.assertNotNull(bd);
			
			Assert.assertEquals( LoginResult.USER_IS_COMERC, asi.login("bzns1", "123456"));
			BusinessDescription mbi = bsi.getBusinessDescription(bd.id);
			
			Assert.assertEquals(bd1.shortName, mbi.shortName);
			Assert.assertEquals(bd1.fullName, mbi.fullName);
			Assert.assertEquals(bd1.shortInfo, mbi.shortInfo);
			Assert.assertEquals(bd1.fullInfo, mbi.fullInfo);
			Assert.assertEquals(bd1.longitude, mbi.longitude);
			Assert.assertEquals(bd1.latitude, mbi.latitude);
			Assert.assertEquals(bd1.radius, mbi.radius);
			Assert.assertTrue(mbi.logo!=null && mbi.logo.isSetURL());
			Assert.assertTrue(mbi.id!=0L);
			
		} catch (TException e) {			
			e.printStackTrace();
			Assert.fail();
		}
	}

	@Test
	public void testUpdateBusinessDescription() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetWallItem() {
		try {
			asi.login("info@vmesteonline.ru", "123456");
			
			BusinessDescription bd = bsi.createBusinessDescription(bd1, "bzns1", "123456");
			Assert.assertEquals( LoginResult.SUCCESS, asi.login(Defaults.user1email, Defaults.user1pass));
			
			WallItem wallItem = bsi.getWallItem(bd.id);
			Assert.assertNotNull(wallItem);
			Assert.assertNotNull(wallItem.topic);
			Assert.assertNotNull(wallItem.topic.message);
			
			Assert.assertEquals(bd1.id, wallItem.topic.message.authorId);
			Assert.assertEquals(GroupType.NOBODY, wallItem.topic.groupType);
			
		} catch (TException e) {			
			e.printStackTrace();
			Assert.fail();
		}
	}

	@Test
	public void testCreateBusinessDescription() {
		 				
		try {
			asi.login("info@vmesteonline.ru", "123456");
			BusinessDescription bd1copy = new BusinessDescription(bd1);			
			Assert.assertNotNull(bsi.createBusinessDescription(bd1copy, "a", "a"));
			Assert.assertEquals(0, bd1copy.id);
			BusinessDescription bd = bsi.createBusinessDescription(bd1, "bzns1", "123456");
			Assert.assertNotNull(bd);
			
		} catch (TException e) {			
			e.printStackTrace();
			Assert.fail();
		}
	}
}
