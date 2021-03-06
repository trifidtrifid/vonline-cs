package com.vmesteonline.be.utils;

import com.vmesteonline.be.AuthServiceImpl;
import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.*;
import com.vmesteonline.be.jdo2.business.VoBusiness;
import com.vmesteonline.be.jdo2.dialog.VoDialog;
import com.vmesteonline.be.jdo2.dialog.VoDialogMessage;
import com.vmesteonline.be.jdo2.postaladdress.*;
import com.vmesteonline.be.thrift.GroupType;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.Rubric;
import com.vmesteonline.be.thrift.ServiceType;
import com.vmesteonline.be.thrift.VoError;

import javax.jdo.Extent;
import javax.jdo.PersistenceManager;
import javax.jdo.Query;

import java.util.*;

import static com.vmesteonline.be.utils.VoHelper.executeQuery;

@SuppressWarnings("unchecked")
public class Defaults {

    public static final String CITY = "Санкт Петербург";
    public static final String COUNTRY = "Россия";
	private static List<VoGroup> defaultGroups;
	private static List<VoRubric> defaultRubrics;

	public static Long user1id = null;
	public static Long user2id = null;
	public static Long user3id = null;
	public static Long user4id = null;
	public static Long user5id = null;
	
	public static String user1lastName = "Aname";
	public static String user1name = "Afamily";
	public static String user1email = "a";
	public static String user1pass = "a";

	public static String user2lastName = "Bfamily";
	public static String user2name = "Bname";
	public static String user2email = "b";
	public static String user2pass = "b";

	public static String user3lastName = "Cfamily";
	public static String user3name = "Cname";
	public static String user3email = "c";
	public static String user3pass = "c";

	public static String user4lastName = "Dfamily";
	public static String user4name = "Dname";
	public static String user4email = "d";
	public static String user4pass = "d";

	public static String user5lastName = "Efamily";
	public static String user5name = "Ename";
	public static String user5email = "e";
	public static String user5pass = "e";
	
	public static String user6lastName = "Онлайн.ru";
	public static String user6name = "Вместе";
	public static String user6email = "info@vmesteonline.ru";
	public static String user6pass = "123456";
	public static String zan32k3Lat = "0.933146";
	public static String zan32k3Long = "0.423117";

	public static String[] unames = new String[] { user1name, user2name, user3name, user4name, user5name, user6name };
	public static String[] ulastnames = new String[] { user1lastName, user2lastName, user3lastName, user4lastName, user5lastName, user6lastName };
	public static String[] uEmails = new String[] { user1email, user2email, user3email, user4email, user5email, user6email };
	public static String[] uPasses = new String[] { user1pass, user2pass, user3pass, user4pass, user5pass, user6pass };

	public static int radiusZero = 0;
	public static int radiusBuilding = 50;
	public static int radiusNeighbors = 350;
	public static int radiusBlock = 700;
	public static int radiusDistrict = 1500;
	public static int radiusTown = 6000;

	//NOBODY(0),	FLAT(1),	FLOOR(2),	STAIRCASE(3),	BUILDING(4),	NEIGHBORS(5),	BLOCK(6),	DISTRICT(7),	TOWN(8)
	public static int[] radiusByType =
			new int[]{ radiusZero, radiusZero, radiusZero, radiusZero, radiusBuilding, radiusNeighbors, radiusBlock, radiusDistrict, radiusTown};
	public static int FIRST_USERS_GROUP = GroupType.FLOOR.getValue();
	
	/*
	 * public static int radiusMedium = 1500; public static int radiusLarge = 5000;
	 */
	public static String defaultAvatarTopicUrl = "/data/da.gif";
	public static String defaultAvatarProfileUrl = "/data/da.gif";
	public static String defaultAvatarShortProfileUrl = "/data/da.gif";

	public static boolean isItTests = false;

	public static VoPostalAddress[] addresses;
	public static boolean initDefaultData(PersistenceManager pm, boolean loadInviteCodes) {

		try {
			clearLocations(pm);
			clearMulticastMesssages(pm);
			clearGroups(pm);
			clearUsers(pm);
			clearFiles(pm);
			pm.flush();
			
			initializeGroups();
			List<String> locCodes = initializeTestLocations(loadInviteCodes, pm);
			initializeUsers(locCodes, pm);

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		} 
		return true;

	}

	private static void clearFiles(PersistenceManager pm) {
		Extent<VoFileAccessRecord> ext = pm.getExtent(VoFileAccessRecord.class);
		if (null != ext)
			for (VoFileAccessRecord far : ext) {
				try {
					pm.deletePersistent(far);
				} catch (Exception rte) {
				}
			}

	}

	public static boolean initDefaultData( PersistenceManager pm ) {
		return initDefaultData(pm,false);
	}

	// ======================================================================================================================
	private static void deletePersistentAll(PersistenceManager pm, Class pc) {
		while(true){
            Query newQuery = pm.newQuery(pc,"");
			newQuery.setRange(0, 200);
			List list = executeQuery(  newQuery );
			if( 0==list.size())
				break;
			pm.deletePersistentAll(list);
		}
	}

	// ======================================================================================================================

	private static void clearUsers(PersistenceManager pm) {
		deletePersistentAll(pm, VoTopic.class);
		deletePersistentAll(pm, VoMessage.class);
		deletePersistentAll(pm, VoSession.class);
		deletePersistentAll(pm, VoDialog.class);
		deletePersistentAll(pm, VoDialogMessage.class);
		deletePersistentAll(pm, VoUser.class);
		deletePersistentAll(pm, VoInviteCode.class);
		deletePersistentAll(pm, VoPoll.class);
		deletePersistentAll(pm, VoRubric.class);
		deletePersistentAll(pm, VoUser.class);
		deletePersistentAll(pm, VoBusiness.class);
	}

	// ======================================================================================================================

	private static void clearLocations(PersistenceManager pm) {
		deletePersistentAll(pm, VoPostalAddress.class);
		deletePersistentAll(pm, VoBuilding.class);
		deletePersistentAll(pm, VoStreet.class);
		deletePersistentAll(pm, VoCity.class);
		deletePersistentAll(pm, VoCountry.class);
	}

	// ======================================================================================================================

	private static void clearMulticastMesssages(PersistenceManager pm) {
		deletePersistentAll(pm, VoMulticastMessage.class);
	}
	private static void clearGroups(PersistenceManager pm) {
		deletePersistentAll(pm, VoUserGroup.class);
	}

	// ======================================================================================================================
	private static void initializeGroups() {
		if( null== defaultGroups)
			defaultGroups = new ArrayList<>();
		
		if (getDefaultGroups().isEmpty()){
			Iterator<Integer> impIterator = Arrays.asList( new Integer[]{ 101, 200, 500, 1000, 5000 }).iterator();
			setDefaultGroups(new ArrayList<VoGroup>());
			for (VoGroup dg : new VoGroup[] { 
					new VoGroup("Мой этаж", radiusZero, GroupType.FLOOR, true), 
					new VoGroup("Моя парадная", radiusZero, GroupType.STAIRCASE, true),
					new VoGroup("Мой дом", radiusBuilding, GroupType.BUILDING, true),
					new VoGroup("Соседние дома", radiusNeighbors, GroupType.NEIGHBORS, true), 
					}) {
				dg.setImportantScore( impIterator.next() );
				getDefaultGroups().add(dg);
			}
		} 
	}

	// ======================================================================================================================
	private static void initializeUsers(List<String> locCodes, PersistenceManager pm) throws InvalidOperation {
		AuthServiceImpl asi = new AuthServiceImpl();
		ArrayList<Long> uids = new ArrayList<Long>();
		int counter = 0;

        Set<ServiceType> services = new HashSet<ServiceType>();
        services.add(ServiceType.CountersEnabled);

        for (String uname : unames) {
				try {
					long uid = asi.registerNewUser(uname, ulastnames[counter], uPasses[counter], uEmails[counter], locCodes.get(counter++), 0,false);
					VoUser user = pm.getObjectById(VoUser.class, uid);
					user.setEmailConfirmed(true);
                    if( counter < 3 ) {
                        user.setServices( services );
                    }

                    if (counter == 1)
						for (Long ug : user.getGroups())
							// the first user would moderate all of groups
							user.setGroupModerator(ug, true);

					pm.makePersistent(user);
					uids.add(uid);

				} catch (Exception e) {
					e.printStackTrace();
				}
			}

		if (uids.size() == 0)
			throw new RuntimeException("NO USERS are CREATED> Initialization totally fucked down");
		user1id = uids.get(0);
		user2id = uids.get(1);
		user3id = uids.get(2);
		user4id = uids.get(3);
		user5id = uids.get(4);
	}

	// ======================================================================================================================
	// inviteCode 1 addr zan 32 k 3 kv 5 staircase 1 user a
	// inviteCode 2 addr zan 32 k 3 kv 50 staircase 2 user b
	// inviteCode 3 addr zan 32 k 3 kv 51 staircase 2 user c
	// inviteCode 4 addr zan 35 kv 35 staircase 1 user d
	// inviteCode 5 addr resp 6 kv 5 staircase 1 user e

	private static List<String> initializeTestLocations(boolean loadInviteCodes, PersistenceManager pm) throws InvalidOperation {
		
		try{
			VoCountry country = VoCountry.createVoCountry(COUNTRY, pm);
			VoCity city = VoCity.createVoCity(country, CITY, pm);
			VoStreet streetZ = VoStreet.createVoStreet(city, "Заневский", pm);
			VoStreet streetR = VoStreet.createVoStreet(city, "Республиканская", pm);
			VoStreet streetH = VoStreet.createVoStreet(city, "Генерала Хазова", pm);

			VoBuilding zanevsky32k3 = VoBuilding.createVoBuilding("195213", streetZ, "32к3", null, null, pm);
			VoBuilding respublikanskaya35 = VoBuilding.createVoBuilding("195213", streetR, "35", null, null, pm);
			VoBuilding resp6 = VoBuilding.createVoBuilding("195213", streetR, "6", null, null, pm);
			VoBuilding gh45 = VoBuilding.createVoBuilding("195213", streetH, "45", null, null, pm);
			
			addresses = new VoPostalAddress[] {

					VoPostalAddress.createVoPostalAddress(zanevsky32k3, (byte) 1, (byte) 1, 5, "", pm),
					VoPostalAddress.createVoPostalAddress(zanevsky32k3, (byte) 2, (byte) 1, 50, "", pm),
					VoPostalAddress.createVoPostalAddress(zanevsky32k3, (byte) 2, (byte) 1, 51, "", pm),
					VoPostalAddress.createVoPostalAddress(respublikanskaya35, (byte) 1, (byte) 11, 35, "", pm),
					VoPostalAddress.createVoPostalAddress(resp6, (byte) 1, (byte) 2, 25, "", pm),
					VoPostalAddress.createVoPostalAddress(gh45, (byte) 1, (byte) 2, 25, "", pm)};

			String invCodes[] = { "1", "2", "3", "4", "5", "6" };


			for (int i = 0; i < addresses.length; i++) {

				pm.makePersistent(addresses[i]);
				VoInviteCode icode = new VoInviteCode(invCodes[i], addresses[i].getId());
				pm.makePersistent(icode);
				pm.flush();
			}

			if (loadInviteCodes)
				InviteCodeUploader.uploadCodes("/data/addresses_len_7_kudrovo.csv");

			return Arrays.asList(invCodes);

		} catch (Exception e) {
			e.printStackTrace();
			throw new InvalidOperation(VoError.GeneralError, "Failed to initTestLocations. "
					+ (e instanceof InvalidOperation ? ((InvalidOperation) e).why : e.getMessage()));
		}
	}

	public static List<VoGroup> getDefaultGroups() {
		if( null == defaultGroups )
			initializeGroups( );
		return defaultGroups;
	}

	public static void setDefaultGroups(List<VoGroup> defaultGroups) {
		Defaults.defaultGroups = defaultGroups;
	}

	public static List<VoRubric> getDefaultRubrics() {
		return defaultRubrics;
	}

	public static void setDefaultRubrics(List<VoRubric> defaultRubrics) {
		Defaults.defaultRubrics = defaultRubrics;
	}

	public static List<Rubric> initializeRubrics() throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		if( null==Defaults.defaultRubrics)
			Defaults.defaultRubrics = Arrays.asList( new VoRubric[]{
				VoRubric.createVoRubric( "Благоустройство и ЖКХ", "#zhkh", "Вопросы связанные с благоустройсвом и решением бытовых вопросов", true, pm),
				VoRubric.createVoRubric( "Родители и Дети", "#childs", "Прогулки и площадки, детсады, школы, кружки и репититоры", true, pm),
				VoRubric.createVoRubric( "Куплю\\продам", "#buysell", "", true, pm),
				VoRubric.createVoRubric( "Происшествия", "#security", "Преступность, что происходит как с этим бороться", true, pm),
//				VoRubric.createVoRubric( "Полезные соседи", "#things", "У кого что полезное есть предложить или нужно попросить", true, pm),
				VoRubric.createVoRubric( "Здоровье и спорт ", "#sport", "Спортзалы, тренера и спортивные мероприятия личные и общественные", true, pm),
				VoRubric.createVoRubric( "Досуг ", "#dosug", "Клубы, рестораны, кафе, бары", true, pm),
				VoRubric.createVoRubric( "Питомцы", "#pets", "", true, pm),
				VoRubric.createVoRubric( "Бюро находок", "#lostnfound", "", true, pm)
				});
		
		return VoHelper.convertMutableSet(Defaults.defaultRubrics, new ArrayList<Rubric>(), new Rubric());
	}
}
