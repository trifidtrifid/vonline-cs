package com.vmesteonline.be;

import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.VoUser;

import javax.jdo.PersistenceManager;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

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
