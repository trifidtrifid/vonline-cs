package com.vmesteonline.be.notifications;

import com.vmesteonline.be.thrift.GroupType;
import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.VoUser;
import com.vmesteonline.be.jdo2.VoUserGroup;
import com.vmesteonline.be.jdo2.postaladdress.VoBuilding;
import com.vmesteonline.be.jdo2.postaladdress.VoPostalAddress;
import com.vmesteonline.be.jdo2.postaladdress.VoStreet;
import org.apache.commons.lang3.StringEscapeUtils;

import javax.jdo.PersistenceManager;
import java.io.IOException;
import java.util.*;

import static com.vmesteonline.be.utils.VoHelper.executeQuery;


public class NewNeigboursNotification extends Notification {

	public NewNeigboursNotification( Map< VoUser, List<NotificationMessage>> ntf ) {
		this.messagesToSend = ntf;
	}

	@Override
	public void makeNotification( Set<VoUser> users ) {
		int now = (int)(System.currentTimeMillis()/1000L);
		
		PersistenceManager pm = PMF.getPm();

		Map< Long, Set<VoUser>> groupUsersMap = getNewNeighbors(pm);

		// create message for each user
		
		for (VoUser u : users) {
			boolean somethingToSend = false;
			Set<VoUser> neghbors = new TreeSet<VoUser>( vuComp );
			neghbors.add(u);
			String body = "<p><b>Новые соседи</b></p>";
			for (Long ug : u.getGroups()) {
				Set<VoUser> usersOfGroup = groupUsersMap.get(ug);
				if( null!=usersOfGroup && usersOfGroup.size()>0){
					Set<VoUser> ggoupNeighbors = new TreeSet<VoUser>(vuComp);
					ggoupNeighbors.addAll(usersOfGroup);
					ggoupNeighbors.removeAll(neghbors);
					if (ggoupNeighbors.size() != 0) {
						String ucont = createNeighborsContent(pm, u, ug, ggoupNeighbors);
						if(null!=ucont){
							body += ucont;
							somethingToSend = true;
						}
					}
					neghbors.addAll(ggoupNeighbors);
				}
			}
			if(somethingToSend){
				NotificationMessage mn = new NotificationMessage();
				mn.message = body;
				mn.subject = "Новые соседи";
				mn.to = u.getEmail();
				try {
					sendMessage(mn, u);
					u.setLastNotified(now);
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
	
	private String createNeighborsContent(PersistenceManager pm, VoUser user, Long ugId, Set<VoUser> neghbors) {
		VoUserGroup ug = pm.getObjectById(VoUserGroup.class, ugId);
		String groupContent = "<p>В группе '" + ug.getName() + "'<br/>";
		boolean newUsers = false;
		int lastNotified = user.getLastNotified();
		for (VoUser vuc : neghbors) {
			if(vuc.getRegistered() > lastNotified){
				String contactTxt = createUserContactContent(pm, ug, vuc);
				groupContent += contactTxt;
				newUsers = true;
			}
		}
		groupContent += "</p>";
		return newUsers ? groupContent : null;
	}

	private String createUserContactContent(PersistenceManager pm, VoUserGroup ug, VoUser vuc) {
		
		VoPostalAddress address = pm.getObjectById(VoPostalAddress.class,vuc.getAddress());
		String contactTxt = "<a href=\"https://"+host+"/profile/"+vuc.getId()+"\">"+StringEscapeUtils.escapeHtml4(vuc.getName() + " " + vuc.getLastName())+"</a>";
		
		if( ug.getGroupType() <= GroupType.BUILDING.getValue() && 0!=address.getStaircase()) 
				contactTxt += " живет в подъезде " + address.getStaircase();
		
		if(  ug.getGroupType() <= GroupType.STAIRCASE.getValue() && 0!=address.getFlatNo()) 
				contactTxt += " в квартире " + address.getFlatNo() + ( 0!=address.getFloor() ? " на "+address.getFloor()+" этаже":"");
		
		if( ug.getGroupType() == GroupType.NEIGHBORS.getValue() ){
			
			VoBuilding vb = pm.getObjectById(VoBuilding.class, address.getBuilding());
			VoStreet vs = pm.getObjectById(VoStreet.class, vb.getStreet());
			contactTxt += " из дома " + vb.getFullNo() +" по " + vs.getName();
		} 
		
		if( ug.getGroupType() == GroupType.BLOCK.getValue())  {
				contactTxt += " из вашего района"; 
		}
	
		contactTxt += "<br/>";
		return contactTxt;
	}

	//новые соседи зарегестрировавшиеся за последнюю неделю
	private Map< Long, Set<VoUser>> getNewNeighbors( PersistenceManager pm ){
		
		Map< VoUserGroup, List<VoUser>> nuMap = new TreeMap<VoUserGroup, List<VoUser>>( super.ugComp );

		int weekAgo = (int) (System.currentTimeMillis() / 1000L) - 86400 * 2;
		List<VoUser> newUsers = executeQuery( pm.newQuery(VoUser.class, "registered>="+weekAgo) );
		Set<VoUser> userSet = new TreeSet<VoUser>(vuComp);
		userSet.addAll(newUsers);
		return arrangeUsersInGroups(userSet);
	}
}
