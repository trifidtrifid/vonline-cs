package com.vmesteonline.be.notifications;

import static com.vmesteonline.be.utils.VoHelper.executeQuery;
import static com.vmesteonline.be.utils.VoHelper.logger;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.TreeSet;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;

import org.apache.commons.lang3.StringEscapeUtils;

import com.vmesteonline.be.UserServiceImpl;
import com.vmesteonline.be.jdo2.VoUser;
import com.vmesteonline.be.jdo2.VoUserGroup;
import com.vmesteonline.be.jdo2.postaladdress.VoBuilding;
import com.vmesteonline.be.jdo2.postaladdress.VoPostalAddress;
import com.vmesteonline.be.jdo2.postaladdress.VoStreet;
import com.vmesteonline.be.thrift.GroupType;
import com.vmesteonline.be.utils.Defaults;
import com.vmesteonline.be.utils.VoHelper;


public class NewNeigboursNotification extends Notification {

	public NewNeigboursNotification( Map< VoUser, List<NotificationMessage>> ntf ) {
		this.messagesToSend = ntf;
	}

	@Override
	public void makeNotification( Set<VoUser> users, PersistenceManager pm ) {
		int now = (int)(System.currentTimeMillis()/1000L);

		Map< Long, Set<VoUser>> groupUsersMap = getNewNeighbors(pm);
		
					// create message for each user
		for (VoUser u : users) {
			
			Map<GroupType,Set<VoUser>> neibInGroups = new TreeMap<GroupType, Set<VoUser> >(  );						
			boolean somethingToSend = getUsersNewNeighbors(u, groupUsersMap, neibInGroups, pm);			
			if(somethingToSend){
				String body = createMessageWithNewNeibs( neibInGroups, pm );
				sendMessageToUser(u, body, now);
			}
		}
		
	}

	protected boolean getUsersNewNeighbors(VoUser u, Map<Long, Set<VoUser>> groupUsersMap, Map< GroupType, Set<VoUser>> neibInGroups, PersistenceManager pm) {

		boolean somethingToSend = false;			
		for( Long updatedGroupId : groupUsersMap.keySet() ){
			VoUserGroup updateduserGroup = pm.getObjectById(VoUserGroup.class, updatedGroupId);
			BigDecimal latMax = VoHelper.getLatitudeMax( updateduserGroup.getLatitude(), updateduserGroup.getRadius());
			BigDecimal latMin = VoHelper.getLatitudeMin( updateduserGroup.getLatitude(), updateduserGroup.getRadius());
			BigDecimal lonMax = VoHelper.getLongitudeMax( updateduserGroup.getLongitude(), updateduserGroup.getLatitude(), updateduserGroup.getRadius());
			BigDecimal lonMin = VoHelper.getLongitudeMin( updateduserGroup.getLongitude(), updateduserGroup.getLatitude(), updateduserGroup.getRadius());
			
			/*Query visibleUSersSQL = pm.newQuery("SQL", "select U.ID FROM VOUSER WHERE emailConfirmed AND longitude<= '" +lonMax + "' AND longitude>='"+lonMin+
					"' AND latitude>='" + latMin +"' AND latitude<='"+latMax+"'");
			List<Long> usersToNotify = executeQuery(visibleUSersSQL);*/
		
			if( null == u.getLongitude() && null!=u.getGroups() && u.getGroups().size() > 0) {
				VoUserGroup group = pm.getObjectById(VoUserGroup.class, u.getGroups().get(0));
				u.setLongitude( group.getLongitude());
				u.setLatitude( group.getLatitude());
			}
			if( null!=u.getLongitude() && null!=u.getLatitude() &&
					u.getLongitude().compareTo( lonMin ) >= 0 && u.getLongitude().compareTo( lonMax ) <= 0 &&
					u.getLatitude().compareTo( latMin ) >= 0 && u.getLatitude().compareTo( latMax ) <= 0 ) { //users of this group are visible
				for( VoUser newUSer: groupUsersMap.get(updatedGroupId)) {
					if( u.getId() != newUSer.getId() && u.getLastNotified() < newUSer.getRegistered() ){
						somethingToSend = true;
						
						GroupType relations = UserServiceImpl.getRelations(u, newUSer, pm);
						Set<VoUser> setForGroup = neibInGroups.get(relations);
						if( null==setForGroup){
							neibInGroups.put(relations, setForGroup = new TreeSet<VoUser>());
						}
						setForGroup.add(newUSer);
					}
				}
			}				
		}
		return somethingToSend;
	}

	protected String createMessageWithNewNeibs(Map< GroupType, Set<VoUser>> neibInGroups, PersistenceManager pm) {
		String body = "<h3>Новые соседи:</h3>";
		for( GroupType gt: GroupType.values()){
			Set<VoUser> newNbrs = neibInGroups.get(gt);
			if( null != newNbrs && !newNbrs.isEmpty()){
				body+= "<p><b>В группе '"+Defaults.getDefaultGroups().get(gt.getValue() - Defaults.FIRST_USERS_GROUP).getVisibleName()+"':</b><br/>";
				for( VoUser nn: newNbrs ){
					String contactTxt = "<a href=\"https://"+host+"/profile/"+nn.getId()+"\">"+StringEscapeUtils.escapeHtml4(nn.getName() + " " + nn.getLastName())+"</a>";
					body += contactTxt + " : " + nn.getAddressString(gt, pm)+"<br/>";
				}
				body += "</p>";
			}
		}
		return body;
	}

	private void sendMessageToUser(VoUser u, String body, int now) {
		NotificationMessage mn = new NotificationMessage();
		mn.message = body;
		mn.subject = "Новые соседи";
		mn.to = u.getEmail();
		try {
			sendMessage(mn, u);			
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	private String createNeighborsContent(PersistenceManager pm, VoUser user, Long ugId, Set<VoUser> neghbors) {
		VoUserGroup ug = pm.getObjectById(VoUserGroup.class, ugId);
		String groupContent = "<p>В группе '" + ug.getName() + "'<br/>";
		boolean newUsers = false;
		int lastNotified = user.getLastNotified();
		for (VoUser vuc : neghbors) {
			if(vuc.getRegistered() > lastNotified){
				String contactTxt = createUserContactContent(pm, ug.getGroupType(), vuc);
				groupContent += contactTxt;
				newUsers = true;
			}
		}
		groupContent += "</p>";
		return newUsers ? groupContent : null;
	}

	private String createUserContactContent(PersistenceManager pm, int ugt, VoUser vuc) {
		
		VoPostalAddress address = pm.getObjectById(VoPostalAddress.class,vuc.getAddress());
		String contactTxt = "<a href=\"https://"+host+"/profile/"+vuc.getId()+"\">"+StringEscapeUtils.escapeHtml4(vuc.getName() + " " + vuc.getLastName())+"</a>";
		
		if( ugt <= GroupType.BUILDING.getValue() && 0!=address.getStaircase()) 
				contactTxt += " живет в парадной " + address.getStaircase();
		
		if(  ugt <= GroupType.STAIRCASE.getValue() && 0!=address.getFlatNo()) 
				contactTxt += " в квартире " + address.getFlatNo() + ( 0!=address.getFloor() ? " на "+address.getFloor()+" этаже":"");
		
		if( ugt == GroupType.NEIGHBORS.getValue() ){
			
			VoBuilding vb = pm.getObjectById(VoBuilding.class, address.getBuilding());
			VoStreet vs = pm.getObjectById(VoStreet.class, vb.getStreet());
			contactTxt += " из дома " + vb.getFullNo() +" по " + vs.getName();
		} 
		
		if( ugt == GroupType.BLOCK.getValue())  {
				contactTxt += " из вашего района"; 
		}
	
		contactTxt += "<br/>";
		return contactTxt;
	}

	//новые соседи зарегестрировавшиеся за последнюю неделю
	protected Map< Long, Set<VoUser>> getNewNeighbors( PersistenceManager pm ){
		
		//Map< VoUserGroup, List<VoUser>> nuMap = new TreeMap<VoUserGroup, List<VoUser>>( super.ugComp );

		int weekAgo = (int) (System.currentTimeMillis() / 1000L) - 86400 * 2;

		Map<Long, Set<VoUser>> groupUserMap = new TreeMap<Long, Set<VoUser>>();
		Query sql = pm.newQuery("SQL", "select `GROUP`,U.ID "
				+ "FROM VOUSER as U RIGHT JOIN USERGROUPS as UG ON UG.ID=U.ID LEFT JOIN VOUSERGROUP G on UG.GROUP=G.ID "
				+ "WHERE U.registered > " + weekAgo +" AND G.GROUPTYPE="+GroupType.NEIGHBORS.getValue());
		List<Object[]> results = executeQuery(sql);
		Iterator<Object[]> rit = results.iterator();
		while(rit.hasNext()) {
			Object[] groupAndUserIds = rit.next();
			Long groupId = (Long) groupAndUserIds[0];
			Long userId = (Long) groupAndUserIds[1];
			Set<VoUser> voUsers = groupUserMap.get(groupId);
			if (null == voUsers)
				groupUserMap.put(groupId, voUsers = new TreeSet<>());
			
			try {
				voUsers.add(pm.getObjectById(VoUser.class, userId));
			} catch (Exception e) {
				logger.warn("Failed to load Uer that was created, ID:" + userId);
			}
		}
		return groupUserMap;
	}
}
