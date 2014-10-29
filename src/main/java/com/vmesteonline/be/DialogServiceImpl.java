package com.vmesteonline.be;

import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.VoSession;
import com.vmesteonline.be.jdo2.VoUser;
import com.vmesteonline.be.jdo2.dialog.VoDialog;
import com.vmesteonline.be.jdo2.dialog.VoDialogMessage;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.VoError;
import com.vmesteonline.be.thrift.messageservice.Attach;
import com.vmesteonline.be.thrift.messageservice.Dialog;
import com.vmesteonline.be.thrift.messageservice.DialogMessage;
import com.vmesteonline.be.thrift.messageservice.DialogService.Iface;
import com.vmesteonline.be.utils.VoHelper;
import org.apache.log4j.Logger;
import org.apache.thrift.TException;

import javax.jdo.JDOObjectNotFoundException;
import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import java.util.*;

public class DialogServiceImpl extends ServiceImpl implements Iface {

	private static Logger logger = Logger.getLogger(DialogServiceImpl.class.getName());

	@Override
	public Dialog getDialog(List<Long> users, int after) throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();

		VoUser cuser;
		long currentUserId = (cuser = getCurrentUser(pm)).getId();
		// sort users
		SortedSet userss = new TreeSet<Long>();
		userss.addAll(users);
		// add current user if not added
		if (!userss.contains(currentUserId))
			userss.add(currentUserId);
		List<Long> usersaSorted = new ArrayList<Long>(userss);

		String filterStr = "";
		for (Long userId : usersaSorted) {
			filterStr += " && users.contains(" + userId + ")";
		}
		Query dlgQuery = pm.newQuery(VoDialog.class, "lastMessageDate>" + after + filterStr);
		dlgQuery.setOrdering("lastMessageDate");
		List<VoDialog> oldDialog = (List<VoDialog>) dlgQuery.execute();

		VoDialog dlg;
		if (oldDialog.size() == 0) { // there is no dialog exists, so create a new one
			dlg = new VoDialog(usersaSorted);
			pm.makePersistent(dlg);
		} else {
			dlg = oldDialog.get(0);
		}
		return dlg.getDialog(cuser, pm);

	}

	@Override
	public List<Dialog> getDialogs(int after) throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();
		long currentUserId = getCurrentUserId();
		List<VoDialog> oldDialogs = (List<VoDialog>) pm.newQuery(VoDialog.class, "users.contains(" + currentUserId+")").execute();
		if( oldDialogs.size() > 0 ) {
            Query dlgQuery = pm.newQuery(VoDialog.class, oldDialogs, "lastMessageDate > "+after);
            dlgQuery.setOrdering("lastMessageDate");
            oldDialogs = (List<VoDialog>) dlgQuery.execute();
        }
		return VoHelper.convertMutableSet(oldDialogs, new ArrayList<Dialog>(), new Dialog(), pm);
	}

	@Override
	public List<DialogMessage> getDialogMessages(long dialogID, int afterDate, int tailSize, long lastLoadedId) throws InvalidOperation, TException {
		
		PersistenceManager pm = PMF.getPm();

		VoSession sess = getCurrentSession(pm);
		long currentUserId = sess.getUserId();
		VoDialog vdlg = pm.getObjectById(VoDialog.class, dialogID);
		if (!new HashSet<Long>(vdlg.getUsers()).contains(currentUserId))
			throw new InvalidOperation(VoError.IncorrectParametrs, "User not involved in this dialog.");

		Collection<VoDialogMessage> msgs = vdlg.getMessages(afterDate, tailSize, lastLoadedId, pm);
		Integer dmsgs = sess.getDialogUpdates().get(dialogID);
		if(null!=dmsgs ) {
			if( dmsgs > msgs.size())
				sess.getDialogUpdates().put(dialogID,dmsgs-msgs.size());
			else
				sess.getDialogUpdates().remove(dialogID);
		}
			
		return VoHelper.convertMutableSet(msgs, new ArrayList<DialogMessage>(), new DialogMessage(), pm);
	}

	@Override
	public DialogMessage postMessage(long dialogId, String content, List<Attach> attachs) throws InvalidOperation {
		if (0 == dialogId)
			throw new InvalidOperation(VoError.IncorrectParametrs, "dialogId should be set to a non ZERO value.");
		if ((null == content || 0 == content.trim().length()) && (null == attachs || 0 == attachs.size()))
			throw new InvalidOperation(VoError.IncorrectParametrs, "Message content should be not empty.");

		PersistenceManager pm = PMF.getPm();
		try {
			VoUser currentUser = getCurrentUser();
			VoDialog vdlg = pm.getObjectById(VoDialog.class, dialogId);
			if (!new HashSet<Long>(vdlg.getUsers()).contains(currentUser.getId()))
				throw new InvalidOperation(VoError.IncorrectParametrs, "User not involved in this dialog.");

			return vdlg.postMessage(currentUser, content, attachs, pm).getDialogMessage(pm);

		} catch (Exception e) {
			throw new InvalidOperation(VoError.IncorrectParametrs, "Failed to post message: "
					+ (e instanceof InvalidOperation ? ((InvalidOperation) e).why : e.getMessage()));
		} 
	}

	@Override
	public void updateDialogMessage(long dlgMsgId, String content, List<Attach> attachs) throws InvalidOperation {

		PersistenceManager pm = PMF.getPm();
		long currentUserId = getCurrentUserId();
		VoDialogMessage vdlg;
		try {
			vdlg = pm.getObjectById(VoDialogMessage.class, dlgMsgId);
		} catch (JDOObjectNotFoundException onfe) {
			throw new InvalidOperation(VoError.IncorrectParametrs, "No dlialog message found by iD '" + dlgMsgId + "'");

		}
		if (currentUserId != vdlg.getAuthorId())
			throw new InvalidOperation(VoError.IncorrectParametrs, "Current User '" + currentUserId + "' not author of message.");

		vdlg.setContent(content);
		vdlg.setAttachs( MessageServiceImpl.updateAttachments( vdlg.getAttachs(), attachs,  currentUserId, pm ));
		
		return;
	}

	@Override
	public void deleteDialogMessage(long dlgMsgId) throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();

		long currentUserId = getCurrentUserId();
		VoDialogMessage vdlg;
		try {
			vdlg = pm.getObjectById(VoDialogMessage.class, dlgMsgId);
		} catch (JDOObjectNotFoundException onfe) {
			throw new InvalidOperation(VoError.IncorrectParametrs, "No dlialog message found by iD '" + dlgMsgId + "'");

		}
		if (currentUserId != vdlg.getAuthorId())
			throw new InvalidOperation(VoError.IncorrectParametrs, "Current User '" + currentUserId + "' not author of message.");

		pm.deletePersistent(vdlg);
		return;
	}

	@Override
	public void addUserToDialog(long dialogId, long userId) throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();

		long currentUserId = getCurrentUserId();
		VoDialog vdlg = pm.getObjectById(VoDialog.class, dialogId);
		HashSet<Long> usersSet = new HashSet<Long>(vdlg.getUsers());
		if (!usersSet.contains(currentUserId))
			throw new InvalidOperation(VoError.IncorrectParametrs, "User not involved in this dialog.");

		if (!usersSet.contains(userId)) {
			vdlg.getUsers().add(userId);
			pm.makePersistent(vdlg);
			logger.debug("USer " + userId + " added to dialog " + dialogId);
		} else {
			logger.debug("USer " + userId + " already involved into dialog " + dialogId);
		}
	}

	@Override
	public void removeUserFromDialog(long dialogId, long userId) throws InvalidOperation {
		PersistenceManager pm = PMF.getPm();

		long currentUserId = getCurrentUserId();
		VoDialog vdlg = pm.getObjectById(VoDialog.class, dialogId);
		HashSet<Long> usersSet = new HashSet<Long>(vdlg.getUsers());
		if (!usersSet.contains(currentUserId))
			throw new InvalidOperation(VoError.IncorrectParametrs, "User not involved in this dialog.");

		if (usersSet.remove(userId)) {

			vdlg.setUsers(new ArrayList<Long>(usersSet));
			pm.makePersistent(vdlg);
			logger.debug("USer " + userId + " removed from dialog " + dialogId);
		} else {
			logger.debug("USer " + userId + " was not involved into dialog " + dialogId);
		}
	}

	@Override
	public Dialog getDialogById(long dialogId) throws InvalidOperation, TException {
		PersistenceManager pm = PMF.getPm();
		try {
			VoUser cuser = getCurrentUser( pm );
			return pm.getObjectById(VoDialog.class, dialogId).getDialog(cuser, pm);
		} catch (JDOObjectNotFoundException onfe) {
			throw new InvalidOperation(VoError.IncorrectParametrs, "No dialog found by ID=" + dialogId);
		} catch (Exception oe) {
			throw new InvalidOperation(VoError.IncorrectParametrs, "Failed to get dialog by ID=" + dialogId + ". " + oe.getMessage());
		} 
	}

}
