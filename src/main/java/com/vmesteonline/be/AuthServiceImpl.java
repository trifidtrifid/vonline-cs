package com.vmesteonline.be;

import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.VoInviteCode;
import com.vmesteonline.be.jdo2.VoSession;
import com.vmesteonline.be.jdo2.VoUser;
import com.vmesteonline.be.jdo2.VoUserGroup;
import com.vmesteonline.be.jdo2.business.VoBusiness;
import com.vmesteonline.be.jdo2.postaladdress.*;
import com.vmesteonline.be.jdo2.utility.VoCounterService;
import com.vmesteonline.be.notifications.Notification;
import com.vmesteonline.be.thrift.GroupType;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.UserLocation;
import com.vmesteonline.be.thrift.VoError;
import com.vmesteonline.be.thrift.authservice.AuthService;
import com.vmesteonline.be.thrift.authservice.LoginResult;
import com.vmesteonline.be.thrift.messageservice.Dialog;
import com.vmesteonline.be.thrift.messageservice.MessageService.AsyncProcessor.getTopics;
import com.vmesteonline.be.thrift.messageservice.WallItem;
import com.vmesteonline.be.thrift.utilityservice.CounterType;
import com.vmesteonline.be.utils.Defaults;
import com.vmesteonline.be.utils.EMailHelper;
import com.vmesteonline.be.utils.VoHelper;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.apache.thrift.TException;

import javax.jdo.JDOObjectNotFoundException;
import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.servlet.http.HttpServletRequest;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static com.vmesteonline.be.utils.VoHelper.executeQuery;

public class AuthServiceImpl extends ServiceImpl implements AuthService.Iface {

	public AuthServiceImpl() {
	}

	public AuthServiceImpl(HttpServletRequest req) {
		super(req);
	}

	@Override
	public boolean checkIfAuthorized() throws InvalidOperation {
		return null != getCurrentSession().getUser();
	}

	public static void checkIfAuthorised(HttpServletRequest req) throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		String httpSessId = ServiceImpl.createSessId(req);
		VoSession session = getSession(httpSessId, pm);
		if (null == session || null == session.getUser())
			throw new InvalidOperation(VoError.NotAuthorized, "Not authorized");
	}

	public LoginResult allowUserAccess(String email, String pwd, boolean checkPwd) throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		VoUser u = getUserByEmail(email, pm);
		if (u != null) {
			pm.refresh(u);
			if (u.getPassword().equals(pwd) || !checkPwd) {
				if (!u.isEmailConfirmed())
					return LoginResult.EMAIL_NOT_CONFIRMED;
				logger.info("save session '" + getCurrentSession().getId() + "' userId " + u.getId());
				saveUserInSession(getCurrentSession(), pm, u);
				return u instanceof VoBusiness ? LoginResult.USER_IS_COMERC : LoginResult.SUCCESS;
			} else
				logger.info("incorrect password " + email + " pass " + pwd);

		}
		if (checkPwd)
			throw new InvalidOperation(VoError.IncorrectParametrs, "incorrect login or password");

		return LoginResult.NOT_MATCH;
	}

	void saveUserInSession(VoSession sess, PersistenceManager pm, VoUser u) throws InvalidOperation {
		sess.setUser(u);
		Query q = pm.newQuery(VoSession.class, "user==u");
		q.declareParameters("VoUser u"); 
		q.setOrdering("lastActivityTs DESC");
		List<VoSession> sessL = executeQuery(q, u);

		int lastActivityTs;
		VoSession lastSess = null;
		if (sessL.size() > 0) {
			lastActivityTs = (lastSess = sessL.get(0)).getLastActivityTs();
			sess.setLastActivityTs(lastActivityTs);
		} else {
			// weekAgo
			lastActivityTs = (int) (System.currentTimeMillis() / 1000L) - 86400 * 7;
		}
		loadPersonalMessages(sess, lastSess, lastActivityTs);
		loadBroadcastMessages(sess, lastSess, lastActivityTs);
		loadImportantMessages(sess, lastSess, lastActivityTs);
		pm.makePersistent(sess);
	}

	private void loadImportantMessages(VoSession sess, VoSession lastSess, int lastActivityTs) {
		PersistenceManager pm = PMF.getPm();
		try {
			MessageServiceImpl msi = new MessageServiceImpl(this);
			VoUser user = sess.getUser();
			VoUserGroup nbgroup = user.getGroup(GroupType.NEIGHBORS, pm);
			if(null!=nbgroup){
				List<WallItem> importantNews = msi.getImportantNews(nbgroup.getId(), 0, 0, 100);
				int count = 0;
				for (WallItem wi : importantNews)
					if (wi.getTopic().lastUpdate > lastActivityTs)
						count++;
				sess.setNewImportantMessages(count + lastSess.getNewImportantMessages());
			}
		} catch (InvalidOperation e) {
			e.printStackTrace();
		}
	} 

	private void loadBroadcastMessages(VoSession sess, VoSession lastSess, int lastActivityTs) {
		try {
			MessageServiceImpl msi = new MessageServiceImpl(this);
			sess.setNewBroadcastMessage(null != msi.getMulticastMessage());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private void loadPersonalMessages(VoSession sess, VoSession lastSess, int lastActivityTs) {
		try {
			DialogServiceImpl dsi = new DialogServiceImpl(this);
			List<Dialog> dialogs = dsi.getDialogs(lastActivityTs);
			sess.setLastUpdateTs(dialogs.size() > 0 ? dialogs.get(0).lastMessageDate : lastActivityTs);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static VoSession getSession(String sessId, PersistenceManager pm) throws InvalidOperation {

		try {
			VoSession sess = pm.getObjectById(VoSession.class, sessId);
			if (sess == null)
				throw new InvalidOperation(VoError.NotAuthorized, "can't find active session for " + sessId);
			return sess;
		} catch (JDOObjectNotFoundException e) {
			throw new InvalidOperation(VoError.NotAuthorized, "can't find active session for " + sessId);
		} catch (Exception e) {
			logger.debug("exception: " + e.toString());
		}
		throw new InvalidOperation(VoError.NotAuthorized, "can't find active session for " + sessId);

	}

	@Override
	public LoginResult login(final String email, final String password) throws InvalidOperation {
		logger.info("try authentificate user " + email + " pass " + password);
		return allowUserAccess(email, password, true);
	}

	public void allowUserAccess(PersistenceManager pm, VoUser u) throws InvalidOperation {
		logger.info("save session '" + getCurrentSession().getId() + "' userId " + u.getId());
		saveUserInSession(getCurrentSession(), pm, u);
	}

	@Override
	public String requestInviteCode(String address, String email) {

		try {
			AddressInfo resolvedAddress = VoGeocoder.resolveAddressString(address);
			EMailHelper.sendSimpleEMail("trifid@gmail.com", email + "wants to register", email + " " + resolvedAddress.getAddresText() + "(" + address
					+ ") wants to join");
			return VoGeocoder.createMapImageURL(resolvedAddress.getLongitude(), resolvedAddress.getLattitude(), 450, 450);
		} catch (Exception e) {
			e.printStackTrace();
			logger.warn("warning when try to send email from join. user " + email + " address " + address);
		}
		return "";
	}

	@Override
	public UserLocation checkInviteCode(String code) throws InvalidOperation {

		PersistenceManager pm = PMF.getPm();

		VoInviteCode invite = VoInviteCode.getInviteCode(code.trim().toUpperCase(), pm);
		VoPostalAddress pa = pm.getObjectById(VoPostalAddress.class, invite.getPostalAddressId());
		VoBuilding vBuilding = pm.getObjectById(VoBuilding.class, pa.getBuilding());
		if (vBuilding.getLatitude() == null || vBuilding.getLongitude() == null) {
			VoGeocoder.getPosition(vBuilding, false, pm);
			pm.makePersistent(vBuilding);
		}
		return new UserLocation(pa.getAddressText(pm), Long.toString(invite.getPostalAddressId()), VoGeocoder.createMapImageURL(vBuilding.getLongitude(),
				vBuilding.getLatitude(), 450, 450));

	}

	@SuppressWarnings("unchecked")
	@Override
	public long registerNewUser(String firstname, String lastname, String password, String email, String inviteCode, int gender)
			throws InvalidOperation {
		return registerNewUser(firstname, lastname, password, email, inviteCode, gender, true);
	}

	public long registerNewUser(String firstname, String lastname, String password, String email, String inviteCode, int gender,
			boolean needConfirmEmail) throws InvalidOperation {

		VoUser userByEmail = getUserByEmail(email);
		if (userByEmail != null && userByEmail.isEmailConfirmed() && userByEmail.isAddressConfirmed())
			throw new InvalidOperation(VoError.RegistrationAlreadyExist, "registration exsist for user with email " + email);
		if (null == inviteCode || "".equals(inviteCode.trim()))
			throw new InvalidOperation(VoError.IncorrectParametrs, "unknown invite code " + inviteCode);

		PersistenceManager pm = PMF.getPm();

		inviteCode = inviteCode.toUpperCase();
		VoInviteCode voInviteCode = VoInviteCode.getInviteCode(inviteCode, pm);
		voInviteCode.registered();

		final VoUser user = null == userByEmail ? new VoUser(firstname.trim(), lastname.trim(), email.toLowerCase().trim(), password) : userByEmail;
		user.setGender(gender);
		user.setEmailConfirmed(!needConfirmEmail);
		user.setAddressConfirmed(true);

		pm.makePersistent(user);
		pm.makePersistent(voInviteCode);
		pm.flush();

		VoPostalAddress uaddress;
		try {
			uaddress = user.setLocation(voInviteCode.getPostalAddressId(), pm);
		} catch (NumberFormatException | InvalidOperation e) {
			throw new InvalidOperation(VoError.IncorectLocationCode, "Incorrect code." + e);
		}

		List<Long> groups = user.getGroups();
		logger
				.info("register "
						+ email
						+ " pass "
						+ password
						+ " id "
						+ user.getId()
						+ " location code: "
						+ inviteCode
						+ " home group: "
						+ (0 == groups.size() ? "Undefined!" : pm.getObjectById(VoUserGroup.class, groups.get(0)).getName() + "[" + uaddress.getAddressText(pm)
								+ "]"));
		// Add the send welcomeMessage Task to the default queue.
		if (needConfirmEmail) {
			Notification.welcomeMessageNotification(user, pm);
		}
		if(  uaddress.getFlatNo() != 0 ){			
		
			enableCountersForUser(user, uaddress, pm);
		}
		return user.getId();
	}

	public void enableCountersForUser(final VoUser user, VoPostalAddress uaddress, PersistenceManager pm) {
		List<VoCounterService> cs = executeQuery( pm.newQuery(VoCounterService.class, "buildingId=="+uaddress.getBuilding()));
		if( null != cs && cs.size() > 0){ //enable counter for the user
			ArrayList<CounterType> defaultCounterTypes = new ArrayList<CounterType>();
			defaultCounterTypes.add(CounterType.COLD_WATER);
			defaultCounterTypes.add(CounterType.HOT_WATER);
			defaultCounterTypes.add(CounterType.COLD_WATER);
			defaultCounterTypes.add(CounterType.HOT_WATER);
			defaultCounterTypes.add(CounterType.ELECTRICITY_DAY);
			defaultCounterTypes.add(CounterType.ELECTRICITY_NIGHT);
			user.enableCountersFor(defaultCounterTypes, pm);			
		}
	}

	@Override
	public long registerNewUserByAddress(String firstname, String lastname, String password, String email, String addressString, short gender)
			throws InvalidOperation {

		if( null==addressString || -1==addressString.indexOf(','))
			throw new InvalidOperation(VoError.IncorrectParametrs, "Incorrect address '"+addressString+"'");
		VoUser userByEmail = getUserByEmail(email);
		if (userByEmail != null && userByEmail.isEmailConfirmed())
			throw new InvalidOperation(VoError.RegistrationAlreadyExist, "registration exsist for user with email " + email);

		AddressInfo addressInfo = VoGeocoder.resolveAddressString(addressString.substring(0,addressString.lastIndexOf(',')));
		if (!addressInfo.isExact() || !addressInfo.isKindHouse()) {
			logger.warn("Failed to resolve address '" + addressString + "'");
			throw new InvalidOperation(VoError.IncorrectParametrs, "Failed to resolve address '" + addressString + "'");
		}

		PersistenceManager pm = PMF.getPm();
		VoCountry voCountry = VoCountry.createVoCountry(addressInfo.getCountryName(), pm);
		VoCity voCity = VoCity.createVoCity(voCountry, addressInfo.getCityName(), pm);
		VoStreet voStreet = VoStreet.createVoStreet(voCity, addressInfo.getStreetName(), pm);
		VoBuilding voBuilding = VoBuilding.createVoBuilding(addressInfo.getZipCode(), voStreet, addressInfo.getBuildingNo(), addressInfo.getLongitude(),
				addressInfo.getLattitude(), pm);
		String flatNo =  addressString.substring( addressString.lastIndexOf(',') + 1).replaceAll("[^0-9]*", "").trim();
		VoPostalAddress pa = VoPostalAddress.createVoPostalAddress(voBuilding, (byte) 0, (byte) 0, Integer.parseInt(flatNo), "", pm);

		final VoUser user = null == userByEmail ? new VoUser(firstname.trim(), lastname.trim(), email.toLowerCase().trim(), password) : userByEmail;
		user.setGender(gender);
		user.setEmailConfirmed(false);
		user.setCurrentPostalAddress(pa, pm);
		user.setAddressConfirmed(false);
		VoInviteCode ic = VoHelper.createNewInviteCode(3, 3, pa, null, pm);
		pm.makePersistent(ic);
		pm.makePersistent(user);

		try {
			EMailHelper.sendSimpleEMail("trifid@gmail.com", "Wants to register: " + addressString,
					"ID:" + user.getId() + " <br/>Full name:" + user.getName() + " " + user.getLastName() + "<br/>email:" + user.getEmail() + "<br/>Address: "
							+ addressString + "<br/>Code: " + ic.getCode());
		} catch (Exception e) {
			e.printStackTrace();
		}
		logger.info("register " + email + " pass " + password + " id " + user.getId() + " location '" + addressString + "'");
		// Add the send welcomeMessage Task to the default queue.
		Notification.welcomeMessageNotification(user, pm);
		return user.getId();
	}

	@Override
	public boolean emailRegistered(String email) throws InvalidOperation, TException {
		return getUserByEmail(email) == null;
	}

	@Override
	public void logout() throws TException {		
		PersistenceManager pm = PMF.getPm();
		VoSession cs = getCurrentSession(pm);
		cs.deactivate(pm);
		pm.deletePersistent(cs);
	}

	public VoUser getUserByEmail(String email) {
		PersistenceManager pm = PMF.getPm();
		return getUserByEmail(email, pm);
	}

	@SuppressWarnings("unchecked")
	public static VoUser getUserByEmail(String email, PersistenceManager pm) {

		Query q = pm.newQuery("SQL", "SELECT ID FROM VOUSER where EMAIL='" + email.toLowerCase().trim() + "'");
		List<Long> users = executeQuery(q);
		if (users.isEmpty())
			return null;
		if (users.size() != 1)
			logger.error("has more than one user with email " + email);
		return pm.getObjectById(VoUser.class, users.get(0));
	}

	private static Logger logger = Logger.getLogger("com.vmesteonline.be.AuthServiceImpl");

	@Override
	public void setCurrentAttribute(Map<Integer, Long> typeValueMap) throws InvalidOperation {
		super.setCurrentAttribute(typeValueMap);
	}

	@Override
	public Map<Integer, Long> getCurrentAttributes() throws InvalidOperation {
		return getCurrentSessionAttributes();
	}

	@Override
	public boolean checkEmailRegistered(String email) {
		PersistenceManager pm = PMF.getPm();
		return null != getUserByEmail(email, pm);
	}

	@Override
	public void sendConfirmCode(String to, String localfileName) throws TException {
		PersistenceManager pm = PMF.getPm();
		try {
			VoUser vu = getUserByEmail(to, pm);
			if (null == vu)
				throw new InvalidOperation(VoError.IncorrectParametrs, "Nobody found by email '" + to + "'");

			long code = System.currentTimeMillis() % 123456L;
			vu.setConfirmCode(code);
			pm.makePersistent(vu);

			if (!Defaults.isItTests) {
				File localFIle = new File(localfileName);

				FileInputStream fis = new FileInputStream(localFIle);
				byte[] content = new byte[(int) localFIle.length()];
				fis.read(content);
				fis.close();

				EMailHelper.sendSimpleEMail(to, "Код для смены пароля на сайте Во!",
						new String(content, "UTF-8").replace("%code%", "" + code).replace("%name%", vu.getName() + " " + vu.getLastName()));
			}
			logger.info("Code to change password is: " + code);

		} catch (Exception e) {
			e.printStackTrace();
			throw new InvalidOperation(VoError.GeneralError, "Failed to send email to '" + to + "'. " + e);
		}
	}

	@Override
	public void confirmRequest(String email, String confirmCode, String newPassword) throws TException {
		PersistenceManager pm = PMF.getPm();
		VoUser vu = getUserByEmail(email, pm);
		if (null != vu && Long.parseLong(confirmCode) == vu.getConfirmCode()) {
			vu.setEmailConfirmed(true);
			if (null != newPassword && !"".equals(newPassword.trim()))
				vu.setPassword(newPassword);
			pm.makePersistent(vu);
		} else
			throw new InvalidOperation(VoError.IncorrectParametrs, "No such code registered for user!");
	}

	@Override
	public boolean checkIfEmailConfirmed(String email) throws TException {
		PersistenceManager pm = PMF.getPm();
		VoUser vu = getUserByEmail(email, pm);
		return null != vu && vu.isEmailConfirmed();
	}

	// TODO what is this? This is a part of the method access restrictions
	// implementation
	@Override
	public boolean isPublicMethod(String method) {
		return true;// publicMethods.contains(method);
	}

	// ======================================================================================================================

	@Override
	public long categoryId() {
		return ServiceCategoryID.AUTH_SI.ordinal();
	}

	@Override
	public boolean remindPassword(String emal) throws TException {
		PersistenceManager pm = PMF.getPm();
		VoUser user = getUserByEmail(emal, pm);
		if (null != user) {
			user.setConfirmCode(System.currentTimeMillis() % 998765);
			Notification.sendRemindCodeMessage(user);
			return true;
		}
		return false;
	}

	@Override
	public boolean checkRemindCode(String remindeCode, String emal) throws TException {
		PersistenceManager pm = PMF.getPm();
		VoUser user = getUserByEmail(emal, pm);
		if (null != user) {
			if (remindeCode != null && remindeCode.equals("" + user.getConfirmCode()))
				return true;
		}
		return false;
	}

	@Override
	public boolean changePasswordByRemidCode(String remindCode, String emal, String newPwd) throws TException {
		PersistenceManager pm = PMF.getPm();
		VoUser user = getUserByEmail(emal, pm);
		if (null != user) {
			if (remindCode != null && remindCode.equals("" + user.getConfirmCode())) {

				user.setPassword(newPwd);
				user.setConfirmCode(System.currentTimeMillis()); // just to reset
				user.setEmailConfirmed(true);

				pm.makePersistent(user);
				saveUserInSession(getCurrentSession(), pm, user);
				return true;
			}
		}
		return false;
	}

}