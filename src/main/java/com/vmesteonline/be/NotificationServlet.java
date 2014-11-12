package com.vmesteonline.be;

import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.VoTopic;
import com.vmesteonline.be.jdo2.VoUser;
import com.vmesteonline.be.jdo2.VoUserGroup;
import com.vmesteonline.be.jdo2.dialog.VoDialog;
import com.vmesteonline.be.notifications.NewsNotification;
import com.vmesteonline.be.notifications.Notification;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.VoError;

import javax.jdo.PersistenceManager;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@SuppressWarnings("serial")
public class NotificationServlet extends HttpServlet {

	@Override
	protected void service(HttpServletRequest req, HttpServletResponse rsp) throws ServletException, IOException {
		try {
			String reqType = req.getParameter("rt");
			if( "swm".equals(reqType)){
				sendWelcomeMsg(req);
			
			} else if( "mbi".equals(reqType)){
				sendNewImportantMsg(req);
			
			} else if( "ndm".equals(reqType)){
				sendNewDialogMsg(req);
			
			} else if( "news".equals(reqType)){
				new NewsNotification().sendNotifications();
		
			} else if( "pwdrem".equals(reqType)){
				sendRemindPasswordMsg(req);
			
			}  
			rsp.setStatus(HttpServletResponse.SC_OK);
		} catch (InvalidOperation e) {

			e.printStackTrace();
			rsp.setStatus(HttpServletResponse.SC_OK, e.why);
		} catch (Exception e) {
			e.printStackTrace();
			rsp.setStatus(HttpServletResponse.SC_OK, e.getMessage());
		} 
	}

	//=============================================================================================================
	
	private void sendRemindPasswordMsg(HttpServletRequest req) throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		Notification.sendRemindCodeMessage( 
						(VoUser)getVoObjectByParam( req, "user", VoUser.class.getName(), pm));
	}

	private void sendNewImportantMsg(HttpServletRequest req) throws InvalidOperation {
		
		PersistenceManager pm = PMF.getPm();
		Notification.messageBecomeImportantNotification( 
						(VoTopic)getVoObjectByParam( req, "it", VoTopic.class.getName(), pm),
						(VoUserGroup)getVoObjectByParam( req, "ug", VoUserGroup.class.getName(), pm));
	}
	
private void sendNewDialogMsg(HttpServletRequest req) throws InvalidOperation {
		
		PersistenceManager pm = PMF.getPm();
		Notification.dialogMessageNotification(
						(VoDialog)getVoObjectByParam( req, "dg", VoDialog.class.getName(), pm),
						(VoUser)getVoObjectByParam( req, "ar", VoUser.class.getName(), pm),
						(VoUser)getVoObjectByParam( req, "rcpt", VoUser.class.getName(), pm));

	}

	private void sendWelcomeMsg(HttpServletRequest req) {
		String uid = req.getParameter("uid");
		if( null!=uid ){
			PersistenceManager pm = PMF.getPm();
			Notification.welcomeMessageNotification(pm.getObjectById(VoUser.class, Long.parseLong(uid)), pm);
		}
	}
	
	private Object getVoObjectByParam( HttpServletRequest req, String pName, String className, PersistenceManager pm ) throws InvalidOperation{
		try {
			return pm.getObjectById( Class.forName(className), Long.parseLong( req.getParameter(pName)));
		} catch (Exception e) {
			throw new InvalidOperation( VoError.IncorrectParametrs, "Failed to get Oject of "+className+" by key "+pName+"="+req.getParameter(pName)+". "+e.getMessage());
		}
	}

}
