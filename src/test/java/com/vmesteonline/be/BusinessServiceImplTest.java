package com.vmesteonline.be;

import static org.junit.Assert.*;

import java.util.ArrayList;

import org.apache.thrift.TException;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import com.vmesteonline.be.thrift.businesservice.BusinessDescription;
import com.vmesteonline.be.thrift.messageservice.Attach;

public class BusinessServiceImplTest extends TestWorkAround {

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
		fail("Not yet implemented");
	}

	@Test
	public void testGetBusinessList() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetBusinessDescription() {
		fail("Not yet implemented");
	}

	@Test
	public void testUpdateBusinessDescription() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetWallItem() {
		fail("Not yet implemented");
	}

	@Test
	public void testCreateBusinessDescription() {
		BusinessDescription bd = new BusinessDescription( 0, "Бизнес1", "Длинное название Бизнеса 1", 
				"кратакая инфа по Бизнесу 1", "Длинная инфа по Бизнесу1", 
				new Attach("B1.logo.jpeg", "image/jpeg", "http://localhost:64284/file/FwwAAAAAAA=.jpg"),
				new ArrayList<Attach>(), "Адрес Бизнеса 1", "30.0000", "60.0000", 350); 
				
		try {
			asi.login("info@vmesteonline.ru", "123456");
			Assert.assertNull(bsi.createBusinessDescription(bd, "a", "a"));
			Assert.assertNull(bsi.createBusinessDescription(bd, "bzns1", "123456"));
		} catch (TException e) {			
			e.printStackTrace();
			Assert.fail();
		}
	}
}
