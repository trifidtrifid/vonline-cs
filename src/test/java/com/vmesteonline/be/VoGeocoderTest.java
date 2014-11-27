package com.vmesteonline.be;

import com.vmesteonline.be.jdo2.postaladdress.VoBuilding;
import com.vmesteonline.be.jdo2.postaladdress.VoGeocoder;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.utils.Pair;
import junit.framework.Assert;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import javax.jdo.Extent;

import static org.junit.Assert.fail;

public class VoGeocoderTest extends TestWorkAround{
	//private final LocalServiceTestHelper helper = new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());

	@Before
	public void setUp() throws Exception {
	//	helper.setUp();
	}

	@After
	public void tearDown() throws Exception {
	//	helper.tearDown();
	}

	@Test
	public void testGetPosition() {
		Extent<VoBuilding> vbe = pm.getExtent(VoBuilding.class);
		UserServiceImpl usi = new UserServiceImpl("123");
		try {
			UserServiceImpl.getLocationCodesForRegistration();
		} catch (InvalidOperation e1) {
			e1.printStackTrace();
			fail("Failed! " + e1.getMessage());
			return;
		}
		for (VoBuilding voBuilding : vbe) {
			try {
				Pair<String, String> position = VoGeocoder.getPosition(voBuilding,true,pm);
				Assert.assertTrue(position != null);
				Assert.assertTrue(Float.valueOf(position.left) > -90);
				Assert.assertTrue(Float.valueOf(position.left) < 90);
				Assert.assertTrue(Float.valueOf(position.left) > -180);
				Assert.assertTrue(Float.valueOf(position.left) < 180);

			} catch (InvalidOperation e) {
				e.printStackTrace();
				fail("Failed! " + e.getMessage());
			}
		}
	}

}
