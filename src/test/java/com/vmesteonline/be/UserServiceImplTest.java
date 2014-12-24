package com.vmesteonline.be;

import com.vmesteonline.be.jdo2.VoUser;
import com.vmesteonline.be.jdo2.VoUserGroup;
import com.vmesteonline.be.thrift.*;
import com.vmesteonline.be.thrift.userservice.FullAddressCatalogue;
import com.vmesteonline.be.utils.Defaults;
import com.vmesteonline.be.utils.VoHelper;
import org.apache.thrift.TException;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import javax.jdo.PersistenceManager;
import java.util.List;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

public class UserServiceImplTest extends TestWorkAround {

	private static final String COMMENT = "Комент";
	private static final String BUILDING_NO = "31";
	private static final String STREET = "шоссе Революции";
	private static final String STREET1 = "Полюстровский пр";
	private static final String CITY = "Saint-Petersburg";
	private static final String COUNTRY = "Russia";

	private String userHomeLocation;
	private long userId;
	Country newCountry;
	City newCity;
	Street newStreet;
	Street newStreet1;
	Building newBuilding;

	@Before
	public void setUp() throws Exception {
		super.setUp();
		Assert.assertTrue(init());
		// register and login current user
		// Initialize USer Service

		userHomeLocation ="1";

		userId = asi.registerNewUser("fn", "ln", "pswd", "eml", userHomeLocation, Integer.parseInt(userHomeLocation));
		Assert.assertTrue(userId > 0);
		asi.login(Defaults.user1email, Defaults.user1pass);

		newCountry = usi.createNewCountry(COUNTRY);
		newCity = usi.createNewCity(newCountry.getId(), CITY);
		newStreet = usi.createNewStreet(newCity.getId(), STREET);
		newStreet1 = usi.createNewStreet(newCity.getId(), STREET1);

		newBuilding = usi.createNewBuilding("zip", newStreet.getId(), BUILDING_NO, "17", "53");

		Assert.assertEquals(newBuilding.getFullNo(), BUILDING_NO);
		Assert.assertEquals(newBuilding.getStreetId(), newStreet.getId());
		Assert.assertTrue(newBuilding.getId() > 0);

	}

	private void profileIsVisible(String user, String pwd, long userAid) throws InvalidOperation {
		UserProfile up;
		asi.login(user, pwd);
		up = usi.getUserProfile(userAid);
		Assert.assertNotNull(up);
		Assert.assertNotNull(up.family);
		Assert.assertEquals(RelationsType.MARRIED, up.family.relations);
	}

	private void profileIsInVisible(String user, String pwd, long userAid) throws InvalidOperation {
		UserProfile up;
		asi.login(user, pwd);
		up = usi.getUserProfile(userAid);
		Assert.assertNotNull(up);
		Assert.assertNull(up.family);

	}

	private long updateFamily(GroupType grType) throws InvalidOperation, TException {
		long userAid = asi.getCurrentUserId();
		usi.updateFamily(new UserFamily(RelationsType.MARRIED, null, null));
		usi.updatePrivacy(new UserPrivacy(userAid, grType, grType));
		return userAid;
	}

	private void contactsIsVisible(String user, String pwd, long userAid) throws InvalidOperation {

		UserProfile up;
		asi.login(user, pwd);
		up = usi.getUserProfile(userAid);
		Assert.assertNotNull(up);
		Assert.assertNotNull(up.contacts);
		Assert.assertEquals("+79213367346", up.contacts.mobilePhone);
	}

	private void contactsIsInVisible(String user, String pwd, long userAid) throws InvalidOperation {
		UserProfile up;
		asi.login(user, pwd);
		up = usi.getUserProfile(userAid);
		Assert.assertNotNull(up);
		Assert.assertNull(up.contacts);
	}

	private long updateContacts(GroupType grType) throws InvalidOperation, TException {
		long userAid = asi.getCurrentUserId();
		usi.updateContacts(new UserContacts(0, UserStatus.CONFIRMED, null, "+79213367346", null));
		usi.updatePrivacy(new UserPrivacy(userAid, grType, grType));
		return userAid;
	}

	@Test
	public void testGetUserShortProfile() {

		try {
			asi.login(Defaults.user1email, Defaults.user1pass);

			VoUser voUserA = asi.getCurrentUser(pm);
			ShortProfile sp = usi.getShortProfile();

			Assert.assertEquals(voUserA.getId(), sp.getId());
			Assert.assertEquals(Defaults.user1name, sp.getFirstName());
			Assert.assertEquals(Defaults.user1lastName, sp.getLastName());
			Assert.assertEquals("Россия,Санкт Петербург,Заневский,32к3", sp.getAddress());
			Assert.assertEquals("/data/da.gif", sp.getAvatar());
			Assert.assertEquals("", sp.getBalance());
			Assert.assertEquals(0, sp.getRating());

		} catch (Exception e) {
			e.printStackTrace();
			fail(e.getMessage());
		} 
	}

	@Test
	public void testGetUserInfo() {

		try {
			asi.login(Defaults.user1email, Defaults.user1pass);

			VoUser voUserA = asi.getCurrentUser(pm);
			UserProfile ui = usi.getUserProfile(voUserA.getId());
			Assert.assertNotNull(ui);
			Assert.assertNotNull(ui.userInfo);
			Assert.assertNotNull(ui.contacts);
			Assert.assertEquals(voUserA.getId(), ui.userInfo.userId);
			Assert.assertEquals(Defaults.user1name, ui.userInfo.firstName);
			Assert.assertEquals(Defaults.user1lastName, ui.userInfo.lastName); //

		} catch (Exception e) {
			e.printStackTrace();
			fail(e.getMessage());
		} 
	}

	/*
	 * @Test public void testUpdateUserInfo() {
	 * 
	 * PersistenceManager pm = PMF.getPm(); try { asi.login(Defaults.user1email, Defaults.user1pass);
	 * 
	 * UserInfo ui = new UserInfo(); ui.birthday = "1984-07-18"; ui.firstName = "FirstName"; ui.lastName = "LastName"; ui.relations =
	 * RelationsType.MARRIED; usi.updateUserInfo(ui);
	 * 
	 * UserInfo uiBack = usi.getUserInfo();
	 * 
	 * Assert.assertEquals(ui.birthday, uiBack.birthday); Assert.assertEquals(ui.firstName, uiBack.firstName); Assert.assertEquals(ui.lastName,
	 * uiBack.lastName); Assert.assertEquals(ui.relations, uiBack.relations);
	 * 
	 * } catch (Exception e) { e.printStackTrace(); fail(e.getMessage()); } finally { s; } }
	 */
	@Test
	public void testUpdateUserContacts() {

		try {
			asi.login(Defaults.user1email, Defaults.user1pass);

			UserContacts uc = new UserContacts();
			uc.email = "z@z.zzz";
			uc.mobilePhone = "7921336";
			usi.updateContacts(uc);

			UserContacts ucBack = usi.getUserContacts();

			Assert.assertEquals(uc.email, ucBack.email);
			Assert.assertEquals(uc.mobilePhone, ucBack.mobilePhone);

			VoUser u = asi.getCurrentUser(pm);
			Assert.assertEquals(u.getEmail(), ucBack.email);
			Assert.assertEquals(u.isEmailConfirmed(), false);

		} catch (Exception e) {
			e.printStackTrace();
			fail(e.getMessage());
		} 
	}

	@Test
	public void testGetUserAandBVoGroups() {

		try {
			PersistenceManager pmA = pm;
			PersistenceManager pmB = pm;

			try {

				asi.login(Defaults.user1email, Defaults.user1pass);
				VoUser uA = asi.getCurrentUser(pmA);
				List<Long> voUserGroupsA = uA.getGroups();

				asi.login(Defaults.user3email, Defaults.user3pass);
				VoUser uB = asi.getCurrentUser(pmB);
				List<Long> voUserGroupsB = uB.getGroups();

				Assert.assertEquals(4, voUserGroupsB.size());
				Assert.assertEquals(0, pmA.getObjectById(VoUserGroup.class, voUserGroupsB.get(0)).getRadius());
				Assert.assertEquals(0, pmA.getObjectById(VoUserGroup.class, voUserGroupsB.get(1)).getRadius());
				Assert.assertEquals(Defaults.radiusBuilding, pmA.getObjectById(VoUserGroup.class, voUserGroupsB.get(2)).getRadius());
				Assert.assertEquals(Defaults.radiusNeighbors, pmA.getObjectById(VoUserGroup.class, voUserGroupsB.get(3)).getRadius());

				/*
				 * Assert.assertEquals(voUserGroupsA.get(0).getLongitude(), new BigDecimal("59.9331461"));
				 * Assert.assertEquals(voUserGroupsB.get(0).getLongitude(), new BigDecimal("59.9331462"));
				 */System.out.print("max = "
						+ VoHelper.getLongitudeMax(pmA.getObjectById(VoUserGroup.class, voUserGroupsA.get(0)).getLatitude(),
								pmA.getObjectById(VoUserGroup.class, voUserGroupsA.get(0)).getLongitude(), 200).toPlainString() + " origin = "
						+ pmA.getObjectById(VoUserGroup.class, voUserGroupsA.get(0)).getLongitude() + "\n");
				System.out.print("lat max = "
						+ VoHelper.getLatitudeMax(pmA.getObjectById(VoUserGroup.class, voUserGroupsA.get(0)).getLatitude(), 200).toPlainString() + " origin = "
						+ pmA.getObjectById(VoUserGroup.class, voUserGroupsA.get(0)).getLatitude() + "\n");

				System.out.print("delta = "
						+ VoHelper.calculateRadius(pmA.getObjectById(VoUserGroup.class, voUserGroupsA.get(0)),
								pmA.getObjectById(VoUserGroup.class, voUserGroupsB.get(0))));
			} finally {
				pmA.close();
				pmB.close();

			}
		} catch (Exception e) {
			e.printStackTrace();
			fail(e.getMessage());
		}
	}

	@Test
	public void testGetUserAandBGroups() {

		try {
			asi.login(Defaults.user1email, Defaults.user1pass);
			List<Group> userAgroups = usi.getUserGroups();
			asi.login(Defaults.user2email, Defaults.user2pass);
			List<Group> userBgroups = usi.getUserGroups();

			Assert.assertEquals(4, userAgroups.size());
			Assert.assertEquals(Defaults.radiusZero, userAgroups.get(0).getRadius());
			Assert.assertEquals(Defaults.radiusZero, userAgroups.get(1).getRadius());
			Assert.assertEquals(Defaults.radiusBuilding, userAgroups.get(2).getRadius());
			Assert.assertEquals(Defaults.radiusNeighbors, userAgroups.get(3).getRadius());
			
			Assert.assertEquals(4, userBgroups.size());
			Assert.assertEquals(Defaults.radiusZero, userBgroups.get(0).getRadius());
			Assert.assertEquals(Defaults.radiusZero, userBgroups.get(1).getRadius());
			Assert.assertEquals(Defaults.radiusBuilding, userBgroups.get(2).getRadius());
			Assert.assertEquals(Defaults.radiusNeighbors, userBgroups.get(3).getRadius());
			
		} catch (Exception e) {
			e.printStackTrace();
			fail(e.getMessage());
		}
	}

	@Test
	public void testGetUserGroups() {
		try {
			List<Group> userGroups = usi.getUserGroups();
			int homeFound = 0;
			for (Group ug : userGroups) {
				if (0 == ug.getRadius()) {
					Assert.assertFalse(homeFound==3);
					homeFound++;
					ug.getName();
				}
			}
			Assert.assertTrue(userGroups.size() > 0);
		} catch (TException e) {
			e.printStackTrace();
			fail(e.getMessage());
		}
	}

	@Test
	public void testGetUserRubrics() {
		try {
			List<Rubric> userRubrics = usi.getUserRubrics();
			assertTrue(userRubrics.size() > 0);
		} catch (TException e) {
			e.printStackTrace();
			fail(e.getMessage());
		}
	}

	@Test
	public void testGetAddressCatalogue() {
		try {
			FullAddressCatalogue addressCatalogue = usi.getAddressCatalogue();
			Assert.assertTrue(addressCatalogue.countries.size() > 0);
			Assert.assertTrue(addressCatalogue.cities.size() > 0);
			Assert.assertTrue(addressCatalogue.streets.size() > 0);
			Assert.assertTrue(addressCatalogue.buildings.size() > 0);
		} catch (TException e) {
			e.printStackTrace();
			fail(e.getMessage());
		}
	}

	@Test
	public void testCreateNewCountry() {
		try {
			Country newCountry = usi.createNewCountry(COUNTRY);
			Assert.assertEquals(newCountry.getName(), COUNTRY);
			Assert.assertTrue(newCountry.getId() > 0);

			List<Country> countries = usi.getCounties();
			Assert.assertTrue(countries.size() > 0);
			long foundId = 0L;
			for (Country c : countries) {
				if (COUNTRY.equals(c.getName()))
					foundId = c.getId();
			}
			Assert.assertEquals(foundId, newCountry.getId());

		} catch (TException e) {
			e.printStackTrace();
			fail(e.getMessage());
		}
	}

	@Test
	public void testCreateNewCity() {
		try {
			Country newCountry = usi.createNewCountry(COUNTRY);
			City newCity = usi.createNewCity(newCountry.getId(), CITY);

			Assert.assertEquals(newCity.getName(), CITY);
			Assert.assertEquals(newCity.getCountryId(), newCountry.getId());
			Assert.assertTrue(newCity.getId() > 0);

			List<City> cities = usi.getCities(newCountry.getId());
			Assert.assertTrue(cities.size() > 0);
			City found = null;
			for (City c : cities) {
				if (CITY.equals(c.getName()))
					found = c;
			}
			Assert.assertEquals(found.getId(), newCity.getId());
			Assert.assertEquals(found.getCountryId(), newCountry.getId());

		} catch (TException e) {
			e.printStackTrace();
			fail(e.getMessage());
		}
	}

	@Test
	public void testCreateNewStreet() {
		try {
			Country newCountry = usi.createNewCountry(COUNTRY);
			City newCity = usi.createNewCity(newCountry.getId(), CITY);
			Street newStreet = usi.createNewStreet(newCity.getId(), STREET);

			Assert.assertEquals(newStreet.getName(), STREET);
			Assert.assertEquals(newStreet.getCityId(), newCity.getId());
			Assert.assertTrue(newStreet.getId() > 0);

			List<Street> streets = usi.getStreets(newCity.getId());
			Assert.assertTrue(streets.size() > 0);
			Street found = null;
			for (Street c : streets) {
				if (STREET.equals(c.getName()))
					found = c;
			}
			Assert.assertNotNull(found);
			Assert.assertEquals(found.getId(), newStreet.getId());
			Assert.assertEquals(found.getCityId(), newCity.getId());

		} catch (TException e) {
			e.printStackTrace();
			fail(e.getMessage());
		}
	}

	@Test
	public void testCreateNewBuilding() {
		try {

			List<Building> buildings = usi.getBuildings(newStreet.getId());
			Assert.assertTrue(buildings.size() > 0);
			Building found = null;
			for (Building c : buildings) {
				if (BUILDING_NO.equals(c.getFullNo()))
					found = c;
			}
			Assert.assertNotNull(found);
			Assert.assertEquals(found.getId(), newBuilding.getId());
			Assert.assertEquals(found.getStreetId(), newStreet.getId());

		} catch (TException e) {
			e.printStackTrace();
			fail(e.getMessage());
		}
	}

	
	@Test
	public void testGetUserAddress() {
		try {
			byte floor;
			byte flat;
			byte staircase;
			PostalAddress newAddress = new PostalAddress(newCountry, newCity, newStreet, newBuilding, staircase = 1, floor = 2, flat = 3, COMMENT);

			boolean created = usi.setUserAddress(newAddress);
			PostalAddress userHomeAddress = usi.getUserHomeAddress();
			Assert.assertTrue(userHomeAddress.equals(newAddress));
		} catch (InvalidOperation e) {
			e.printStackTrace();
			fail("Exception " + e.getMessage());
		}
	}

	@Test
	public void testsetUserContacts() {
		try {
			byte floor = 2, flat = 3, staircase = 1;
			PostalAddress newAddress = new PostalAddress(newCountry, newCity, newStreet, newBuilding, staircase, floor, flat, COMMENT);

			usi.updateContacts(new UserContacts(userId, UserStatus.CONFIRMED, null, "8(812)123-45-67", "a@b.com"));
			usi.updateContacts(new UserContacts(userId, UserStatus.CONFIRMED, newAddress, null, null));
			usi.updateContacts(new UserContacts(userId, UserStatus.CONFIRMED, newAddress, "+7 812 123-45-67", " a@b.com"));

			// Assert.assertTrue(userHomeAddress.equals(newAddress));
		} catch (InvalidOperation e) {
			e.printStackTrace();
			fail("Exception " + e.getMessage());
		}
	}

	@Test
	public void testsetUserMap() {

		try {
			asi.login(Defaults.user1email, Defaults.user1pass);

			for (Long vug : usi.getCurrentUser(pm).getGroups()) {
				String map = usi.getGroupMap(vug, "8822DDC0");
				System.out.println(map);
			}

			// Assert.assertTrue(userHomeAddress.equals(newAddress));
		} catch (Exception e) {
			e.printStackTrace();
			fail("Exception " + e.getMessage());
		}
	}

	@Test
	public void testGetUserProfileFloor() {
		try {
			asi.login(Defaults.user2email, Defaults.user2email);
			long userAid = updateFamily(GroupType.FLOOR);
			// same building same staircase same floor
			profileIsVisible(Defaults.user3email, Defaults.user3pass, userAid);
			// same building another staircase
			profileIsInVisible(Defaults.user1email, Defaults.user1pass, userAid);
			// another building
			profileIsInVisible(Defaults.user4email, Defaults.user4pass, userAid);

		} catch (Exception e) {
			e.printStackTrace();
			fail("Exception " + e.getMessage());
		}
	}

	@Test
	public void testGetUserProfileStarecase() {
		try {
			asi.login(Defaults.user2email, Defaults.user2email);
			long userAid = updateFamily(GroupType.STAIRCASE);
			// same building same staircase same floor
			profileIsVisible(Defaults.user3email, Defaults.user3pass, userAid);
			// same building another staircase
			profileIsInVisible(Defaults.user1email, Defaults.user1pass, userAid);
			// another building
			profileIsInVisible(Defaults.user4email, Defaults.user4pass, userAid);

		} catch (Exception e) {
			e.printStackTrace();
			fail("Exception " + e.getMessage());
		}
	}

	@Test
	public void testGetUserProfileBuilding() {
		try {
			asi.login(Defaults.user1email, Defaults.user1pass);
			long userAid = updateFamily(GroupType.BUILDING);
			// same building same staircase same floor
			profileIsVisible(Defaults.user3email, Defaults.user3pass, userAid);
			// same building another staircase
			profileIsVisible(Defaults.user1email, Defaults.user1pass, userAid);
			// another building
			profileIsInVisible(Defaults.user4email, Defaults.user4pass, userAid);

		} catch (Exception e) {
			e.printStackTrace();
			fail("Exception " + e.getMessage());
		}
	}

	@Test
	public void testGetUserProfileNeighbors() {
		try {
			long userAid = updateFamily(GroupType.NEIGHBORS);
			profileIsVisible(Defaults.user2email, Defaults.user2pass, userAid);
			profileIsVisible(Defaults.user3email, Defaults.user3pass, userAid);
			profileIsVisible(Defaults.user4email, Defaults.user4pass, userAid);

		} catch (Exception e) {
			e.printStackTrace();
			fail("Exception " + e.getMessage());
		}
	}

	@Test
	public void testGetUserContactsNeighbors() {
		try {
			long userAid = updateContacts(GroupType.NEIGHBORS);
			contactsIsVisible(Defaults.user2email, Defaults.user2pass, userAid);
			contactsIsVisible(Defaults.user4email, Defaults.user4pass, userAid);

		} catch (Exception e) {
			e.printStackTrace();
			fail("Exception " + e.getMessage());
		}
	}

	@Test
	public void testGetUserContactsBuilding() {
		try {
			long userAid = updateContacts(GroupType.BUILDING);
			asi.login(Defaults.user2email, Defaults.user2pass);
			contactsIsVisible(Defaults.user2email, Defaults.user2pass, userAid);
			contactsIsInVisible(Defaults.user4email, Defaults.user4pass, userAid);

		} catch (Exception e) {
			e.printStackTrace();
			fail("Exception " + e.getMessage());
		}
	}

	@Test
	public void testGetUserContactsStarecase() {
		try {
			asi.login(Defaults.user2email, Defaults.user2email);
			long userAid = updateContacts(GroupType.STAIRCASE);
			// same building same staircase same floor
			contactsIsVisible(Defaults.user3email, Defaults.user3pass, userAid);
			// same building another staircase
			contactsIsInVisible(Defaults.user1email, Defaults.user1pass, userAid);
			// another building
			contactsIsInVisible(Defaults.user4email, Defaults.user4pass, userAid);

		} catch (Exception e) {
			e.printStackTrace();
			fail("Exception " + e.getMessage());
		}
	}

	@Test
	public void testGetUserContactsFloor() {
		try {
			asi.login(Defaults.user2email, Defaults.user2email);
			long userAid = updateContacts(GroupType.FLOOR);
			// same building same staircase same floor
			contactsIsVisible(Defaults.user2email, Defaults.user2pass, userAid);
			// same building another staircase
			contactsIsInVisible(Defaults.user1email, Defaults.user1pass, userAid);
			// another building
			contactsIsInVisible(Defaults.user4email, Defaults.user4pass, userAid);

		} catch (Exception e) {
			e.printStackTrace();
			fail("Exception " + e.getMessage());
		}
	}

	@Test
	public void testGetUserAandBRelation() {

		try {
			PersistenceManager pmA = pm;
			PersistenceManager pmB = pm;

			try {

				asi.login(Defaults.user1email, Defaults.user1pass);
				//VoUser uA = asi.getCurrentUser(pmA);
				
				List<Group> uAgroups = usi.getUserGroups();

				Assert.assertEquals(4, uAgroups.size());
				List<ShortUserInfo> uAFloorGroup = usi.getNeighboursByGroup( uAgroups.get(0).getId() );
				List<ShortUserInfo> uAStaircaseGroup = usi.getNeighboursByGroup( uAgroups.get(1).getId() );
				List<ShortUserInfo> uABuildingGroup = usi.getNeighboursByGroup( uAgroups.get(2).getId() );
				List<ShortUserInfo> uANgrGroup = usi.getNeighboursByGroup( uAgroups.get(3).getId() );
				
				Assert.assertEquals(1, uAFloorGroup.size());
				Assert.assertEquals(1, uAStaircaseGroup.size());
				Assert.assertEquals(3, uABuildingGroup.size());
				Assert.assertEquals(1, uANgrGroup.size());
				
				asi.login(Defaults.user2email, Defaults.user2pass);
				uAgroups = usi.getUserGroups();
				Assert.assertEquals(4, uAgroups.size());
				uAFloorGroup = usi.getNeighboursByGroup( uAgroups.get(0).getId() );
				uAStaircaseGroup = usi.getNeighboursByGroup( uAgroups.get(1).getId() );
				uABuildingGroup = usi.getNeighboursByGroup( uAgroups.get(2).getId() );
				uANgrGroup = usi.getNeighboursByGroup( uAgroups.get(3).getId() );
				
				Assert.assertEquals(2, uAFloorGroup.size());
				Assert.assertEquals(2, uAStaircaseGroup.size());
				Assert.assertEquals(3, uABuildingGroup.size());
				Assert.assertEquals(1, uANgrGroup.size());

			} finally {
				pmA.close();
				pmB.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
			fail(e.getMessage());
		}
	}
}
