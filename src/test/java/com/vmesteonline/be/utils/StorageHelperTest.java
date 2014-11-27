package com.vmesteonline.be.utils;

import com.vmesteonline.be.AuthServiceImpl;
import com.vmesteonline.be.UserServiceImpl;
import com.vmesteonline.be.data.PMF;
import junit.framework.Assert;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import javax.jdo.PersistenceManager;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.fail;

public class StorageHelperTest extends StorageHelper {
	

		long userId;
		AuthServiceImpl asi;
	  @Before
	  public void setUp() {

			// register and login current user
			// Initialize USer Service
			String sessionId = "11111";
			try {
				Defaults.initDefaultData(PMF.getPm());
				asi = new AuthServiceImpl(sessionId);
				List<String> userLocation = UserServiceImpl.getLocationCodesForRegistration();
				Assert.assertNotNull(userLocation);
				Assert.assertTrue(userLocation.size() > 0);

				String userHomeLocation = userLocation.get(0);
				userId = asi.registerNewUser("fn", "ln", "pswd", "eml", userHomeLocation, 0);
				Assert.assertTrue(userId > 0);
				asi.login("eml", "pswd");
			} catch (Exception e) {
				e.printStackTrace();
			}
	  }


	@After
	public void tearDown() throws Exception {
	}

	@Test
	public void testSaveImage() {
		fail("Not yet implemented");
	}

	static class Result {
		public Result(){};
		public int a;
		public float f;
		public double d;
		public String s = new String();
		public List<String> set = new ArrayList<String>();
		public Map<String,String> map = new HashMap<String, String>();
		public String str;
		public boolean b;
	}
	
	@Test
	public void testLoadCSVData() {
		String input = "TRUE, 1,0.1,0.01, \"AA, AA, A\", A | B | C, A:1 | B : 2, \"  dslkjsldkjflkjsdlfj\",11\n"
				+ "FALSE,2,0.2,0.03, \"bb,bb\", a | b | c, a:1 | b : 2, \" fff,ff\",12\n";
		
		Map<Integer, String> fieldPosMap = new HashMap<Integer, String>();;
		fieldPosMap.put(0, "b");
		fieldPosMap.put(1, "a");
		fieldPosMap.put(2, "f");
		fieldPosMap.put(3, "d");
		fieldPosMap.put(4, "s");
		fieldPosMap.put(5, "set");
		fieldPosMap.put(6, "map");
		fieldPosMap.put(7, "str");
		
		try {
			List<Result> res = CSVHelper.loadCSVData(input.getBytes(), fieldPosMap, new Result(), null, null, null);
			Assert.assertTrue(null!=res);
		} catch (IOException e) {
			e.printStackTrace();
			
		}
	}
	
	@Test 
	public void testStoreData(){
		for(int i=0; i<100; i++) try {
			String origURL = "http://vomoloko.ru/img/logo.jpg";
			PersistenceManager pm = PMF.getPm();
			String newImageUrl;
			newImageUrl = StorageHelper.saveImage(origURL, asi.getCurrentUserId(), true, pm);
			
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			StorageHelperTest.getFile(newImageUrl, baos, null);
			baos.close();
			ByteArrayInputStream is2 = new ByteArrayInputStream(baos.toByteArray());
			
			URL orig = new URL( origURL );
			InputStream is = orig.openStream();
			
			int read1;
			while( -1 !=(read1 = is.read()) )
				Assert.assertEquals(read1, is2.read());
			
			//test to save data
			origURL = "AAAAAAAAAAABBBBBBBBBBBBBCCCCCCCCCCC";
			newImageUrl = StorageHelper.saveImage(origURL, asi.getCurrentUserId(), true, null);
			
			 baos = new ByteArrayOutputStream();
			StorageHelperTest.getFile(newImageUrl, baos, null);
			baos.close();
			String content = new String(baos.toByteArray());
			Assert.assertEquals(origURL, content);
			
		} catch (Exception e) {
			e.printStackTrace();
			fail(e.getMessage());
		}
	}

	@Test 
	public void testStringToLong(){
		String nts = StorageHelper.numberToString( Long.MAX_VALUE);
		Long stn = StorageHelper.stringToNumber( nts );
		Assert.assertEquals(""+Long.MAX_VALUE, ""+stn);
		
		nts = StorageHelper.numberToString( Long.MIN_VALUE );
		stn = StorageHelper.stringToNumber( nts );
		Assert.assertEquals(""+Long.MIN_VALUE, ""+stn);
		
		nts = StorageHelper.numberToString( 0L );
		stn = StorageHelper.stringToNumber( nts );
		Assert.assertEquals(""+0L, ""+stn);
		
		nts = StorageHelper.numberToString( Long.MAX_VALUE/2L );
		stn = StorageHelper.stringToNumber( nts );
		Assert.assertEquals(""+Long.MAX_VALUE/2, ""+stn);
		
		nts = StorageHelper.numberToString( Long.MIN_VALUE/2L );
		stn = StorageHelper.stringToNumber( nts );
		Assert.assertEquals(""+Long.MIN_VALUE/2L, ""+stn);
	}
}
