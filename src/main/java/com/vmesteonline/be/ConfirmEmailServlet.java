package com.vmesteonline.be;

import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.VoUser;
import com.vmesteonline.be.jdo2.dialog.VoDialog;

import javax.jdo.PersistenceManager;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Set;
import java.util.TreeSet;

public class ConfirmEmailServlet extends HttpServlet {
	
	private static final String MESSAGE_TO_SHOW = "MESSAGE_TO_SHOW";
	private static String reqPrefix="/confirm/profile/";

	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String requestURI = req.getRequestURI();
		if( requestURI.startsWith(reqPrefix) ){
			String[] uidAndConfCode = requestURI.substring(reqPrefix.length()).split(",");
			if( uidAndConfCode.length == 2 ){
				PersistenceManager pm = PMF.getPm();
				try {
					VoUser user = pm.getObjectById(VoUser.class, Long.parseLong(uidAndConfCode[0]));
					if((""+user.getConfirmCode()).equals(uidAndConfCode[1])){
						user.setEmailConfirmed(true);
						user.setConfirmCode(System.currentTimeMillis()*System.currentTimeMillis()); //just to reset
						serviceImpl.setSession(req.getSession());
						serviceImpl.saveUserInSession(pm, user);

						//getUser by Email info@vmesteonline.ru
						sendPersonalWelcomeMessage(user,  pm);
					} else {
						getServletContext().setAttribute(MESSAGE_TO_SHOW, "Вы ввели некорректный код подтверждения или ввели его повторно.");
					}
				} catch (Exception e) {					
					e.printStackTrace();
				} 
			}
		}
		resp.sendRedirect("/main");
		return;
	}

	//Send personal message
	private void sendPersonalWelcomeMessage(VoUser user, PersistenceManager pm) {
		//getUser by Email info@vmesteonline.ru
		VoUser voUser = AuthServiceImpl.getUserByEmail("info@vmesteonline.ru", pm);
		if(null!=voUser) {
			Set<Long> ul = new TreeSet<>();
			ul.add(voUser.getId());
			ul.add(user.getId());
			VoDialog dlg = new VoDialog(new ArrayList<>(ul));
			pm.makePersistent(dlg);
			dlg.postMessage(voUser, user.getName() + ", рады приветствовать вас на сайте! Если у вас возникнут вопросы, связанные с его работой, пишите нам, ответим с удовольствием!", new ArrayList<>(), pm);
		}
	}
	private AuthServiceImpl serviceImpl;

	public ConfirmEmailServlet() {
		super();
		this.serviceImpl = new AuthServiceImpl();
	}
	/**
	 * 
	 */
	private static final long serialVersionUID = -8056053718055418720L;

}
