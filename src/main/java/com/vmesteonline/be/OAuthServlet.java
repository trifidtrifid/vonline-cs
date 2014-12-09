package com.vmesteonline.be;

import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.VoUser;
import com.vmesteonline.be.utils.StorageHelper;
import com.vmesteonline.be.utils.VoHelper;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.jdo.PersistenceManager;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;

public class OAuthServlet extends HttpServlet {

	private static final long serialVersionUID = -6391276180341584453L;
	private static Logger logger = Logger.getLogger(OAuthServlet.class);

	protected String getDomain(String state) {
		return new String();
	}

	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {

		resp.setContentType("text/html; charset=utf-8");
		String authCode = req.getParameter("code");
		String domain = "https://" + new URL(req.getRequestURL().toString()).getHost() + "/";
		String inviteCode = req.getParameter("state");

		logger.info("request " + req.toString() + "try authorize in " + inviteCode + " with code=" + authCode);
		try {
			String response = runUrl(new URL("https://oauth.vk.com/access_token?client_id=4429306&redirect_uri=" + domain
					+ "oauth&client_secret=oQBV8uO3tHyBONHcNsxe&code=" + authCode));

			JSONObject jsonObj = new JSONObject(response.toString());

			AuthServiceImpl authServiceImpl = new AuthServiceImpl();
			authServiceImpl.initCurrentSession(req);
			String email = jsonObj.getString("email");
			logger.info(email + "find");

			if (inviteCode == null || inviteCode.isEmpty()) {
				try {
					switch (authServiceImpl.allowUserAccess(email, "", false)) {
					case SUCCESS:
						resp.sendRedirect(domain + "main");
						break;
					case EMAIL_NOT_CONFIRMED:
						resp.sendRedirect(domain + "login.html?invalid_email=" + email);
						break;
					default:
						resp.sendRedirect(domain + "login.html?cantlogin=" + email);
						break;
					}
				} catch (Exception e) {
					resp.sendRedirect(domain + "login.html?invalid_email=" + email);
					return;
				}

			} else {
				URL url = new URL("https://api.vk.com/method/users.get?user_id=" + jsonObj.getString("user_id") + "&v=5.23&access_token="
						+ jsonObj.getString("access_token") + "&fields=first_name,last_name,sex,bdate,photo_medium");

				String resp2 = runUrl(url);
				JSONObject jsonObj2 = new JSONObject(resp2);

				resp.getWriter().println("<br><br>  sdfsdf " + resp2 + " access token " + jsonObj.getString("access_token") + " req " + url.toString());

				JSONArray vkResp = jsonObj2.getJSONArray("response");
				JSONObject o = (JSONObject) vkResp.get(0);

				if (inviteCode.startsWith("inviteCode:")) {
					inviteCode = inviteCode.substring(inviteCode.lastIndexOf(":") + 1);
					String password = VoHelper.generatePassword();
					authServiceImpl.registerNewUser(o.getString("first_name"), o.getString("last_name"), password, email, inviteCode, o.getInt("sex"), false);
					authServiceImpl.allowUserAccess(email, "", false);

				}

				PersistenceManager pm = PMF.getPm();
				VoUser user = authServiceImpl.getCurrentUser(pm);
				if (user != null) {
					resp.getWriter().println("<br>find user " + user.getEmail() + " avatar " + o.getString("photo_medium"));
					String avatarUrl = StorageHelper.saveImage(o.getString("photo_medium").getBytes(), user.getId(), true, pm);
					user.setAvatarTopic(avatarUrl);
					user.setAvatarMessage(avatarUrl);
					user.setAvatarProfileShort(avatarUrl);
					user.setAvatarProfile(avatarUrl);
					user.setGender(o.getInt("sex"));
					SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");
					Date date = formatter.parse(o.getString("bdate"));
					long ts = date.getTime() / 1000L;
					user.setBirthday((int) ts);
					pm.makePersistent(user);
					// getServletContext().setAttribute("MESSAGE_TO_SHOW", "Из Вконтакте успешно импортированы: Аватар, дата рождения, пол");

				} else {
					// getServletContext().setAttribute("MESSAGE_TO_SHOW", "Не удалось найти пользователя с email " + email);
				}
				if (inviteCode.startsWith("import")) {
					// resp.getWriter().println("<br><br>go to " + domain + "settings");

					resp.sendRedirect(domain + "settings");
				} else
					resp.sendRedirect(domain + "main");

			}

		} catch (Exception e) {
			e.printStackTrace();
			resp.getWriter().println("<br><br>error " + domain + " " + e.getMessage());
			resp.sendRedirect(domain + "main?error=" + e.toString());
		}

	}

	private String runUrl(URL obj) throws IOException {
		HttpURLConnection con = (HttpURLConnection) obj.openConnection();
		BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream(), "utf-8"));
		String inputLine;
		StringBuffer response = new StringBuffer();

		while ((inputLine = in.readLine()) != null) {
			response.append(inputLine);
		}
		in.close();
		return response.toString();
	}
}
