package com.vmesteonline.be.notifications;

import com.vmesteonline.be.MessageServiceImpl;
import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.VoTopic;
import com.vmesteonline.be.jdo2.VoUser;
import com.vmesteonline.be.jdo2.VoUserGroup;
import com.vmesteonline.be.thrift.messageservice.MessageType;
import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.log4j.Logger;

import javax.jdo.PersistenceManager;
import java.io.IOException;
import java.util.*;

public class NewTopicsNotification extends Notification {
	private static Logger logger = Logger.getLogger(NewTopicsNotification.class.getSimpleName());
	
	public NewTopicsNotification( Map< VoUser, List<NotificationMessage>> ntf ) {
		this.messagesToSend = ntf;
	}

	public void makeNotification( Set<VoUser> users ) {

		int now = (int)(System.currentTimeMillis()/1000L);

		PersistenceManager pm = PMF.getPm();

		Map<Long, Set<VoTopic>> groupTopicMap = collectTopicsByGroups(users, pm);
		// create message for each user
		for (VoUser u : users) {
			String body = "<p><b>Близкие события</b></p>";
			boolean somethingToSend = false;
			Set<VoTopic> userTopics = new TreeSet<VoTopic>( topicIdComp );
			for (Long ug : u.getGroups()) {
				Set<VoTopic> tpcs = groupTopicMap.get(ug);
				if( null!=tpcs && tpcs.size()>0) {
					Set<VoTopic> topics = new TreeSet<VoTopic>( topicIdComp );
					topics.addAll(tpcs);
					topics.removeAll(userTopics);
					if (topics.size() != 0) {
						/*Set<VoTopic>topicsByOtherUSers = new HashSet<VoTopic>( );
						for (VoTopic voTopic : topics) {
							if(voTopic.getAuthorId().getId() != u.getId())
								topicsByOtherUSers.add(voTopic);
						}
						if( topicsByOtherUSers.size() > 0)*/{
							String tc = createGroupContent(pm, ug, topics);
							if( tc != null ){
								somethingToSend = true;
								body += tc;
							}
						}
					}
					userTopics.addAll(topics);
				}
			}
			if(somethingToSend){
				NotificationMessage mn = new NotificationMessage();
				mn.message = body;
				mn.subject = "Близкие события";
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

	private Map<Long, Set<VoTopic>> collectTopicsByGroups(Set<VoUser> users, PersistenceManager pm) {
		// collect topics by group
		Map<Long, Set<VoUser>> groupUserMap = arrangeUsersInGroups(users, pm);
		Map<Long, Set<VoTopic>> groupTopicMap = new TreeMap<Long, Set<VoTopic>>();
		
		List<Long> groups = new ArrayList<Long>();
		groups.addAll(groupUserMap.keySet());
		
		Set<VoTopic> topics = new TreeSet<VoTopic>(topicIdComp);
		for( int gsi = 0; gsi < groups.size(); gsi += 10){
			topics.addAll(
					MessageServiceImpl.getTopics( 
							groups.subList(gsi, Math.min( gsi+10, groups.size())), null, MessageType.WALL, 0, 10, false, pm));
		}
		
		for( VoTopic topic: topics){
			VoUserGroup topicGroup = pm.getObjectById(VoUserGroup.class, topic.getUserGroupId());
			for (Long tvg : topic.getVisibleGroups()) {
				VoUserGroup visibkeGroup = pm.getObjectById(VoUserGroup.class, tvg);
				if( topicGroup.getGroupType() <= visibkeGroup.getGroupType()){ 
					Set<VoTopic> tsg = groupTopicMap.get( tvg );
					if( tsg == null) {
						groupTopicMap.put( tvg, tsg = new TreeSet<VoTopic>(topicIdComp));
					}
					tsg.add(topic);
				}
			}
		}
		logger.debug("Total topics to send "+topics.size()+" topics are created in "+groupTopicMap.size()+" groups" );
		return groupTopicMap;
	}

	private String createGroupContent(PersistenceManager pm, Long ugId, Set<VoTopic> topics) {
		VoUserGroup ug;
		try {
			ug = pm.getObjectById(VoUserGroup.class, ugId);
			List<VoTopic> orderedTopics = new ArrayList<VoTopic>( topics );
			Collections.sort(orderedTopics, topicCreatedDateComp);
			
			int weekAgo = (int) (System.currentTimeMillis()/1000L) - 7 * 86400;
			if( orderedTopics.get(0).getCreatedAt() < weekAgo )
				return null;
			
			String groupContent = "<p><b>Пишут в группе '" + ug.getName() + "'</b>";
				
			for (VoTopic tpc : orderedTopics) {
				if( tpc.getCreatedAt() < weekAgo )
					break;
				String topicTxt = createTopicContent(pm, ug, tpc);
				groupContent += topicTxt;
			}
			return groupContent;
		} catch (Exception e) {
			logger.error("Failed to create news for group "+e.getMessage());
			e.printStackTrace();
			return null;
		}
	}

	private String createTopicContent(PersistenceManager pm, VoUserGroup ug, VoTopic tpc) {
		VoUser author = pm.getObjectById(VoUser.class, tpc.getAuthorId());
		String contactTxt = "<a href=\"https://"+host+"/profile/"+author.getId()+"\">"+StringEscapeUtils.escapeHtml4(author.getName() + " " + author.getLastName())+"</a>";
		
		String topicTxt = "<p>"+new Date(((long) tpc.getCreatedAt()) * 1000L) + " " + contactTxt;
		topicTxt += "<br/>"+(ug.getImportantScore() <= tpc.getImportantScore() ? "<b>Важно!</b><br/>" : "");
		//topicTxt += StringEscapeUtils.escapeHtml4(tpc.getContent().substring( 0, Math.min(255, tpc.getContent().length())));
		topicTxt += tpc.getContent().substring( 0, Math.min(255, tpc.getContent().length()));
		if( tpc.getContent().length() > 255 ) topicTxt += "<a href=\"https://"+host+"/wall-single/"+tpc.getId()+"\">...</a>";
		topicTxt += "</p>--";
		return topicTxt;
	}

	
	Comparator<VoTopic> topicIdComp = new Comparator<VoTopic>(){
		@Override
		public int compare(VoTopic o1, VoTopic o2) {
			return Long.compare( o1.getId(), o2.getId());
		}
	};
	
	Comparator<VoTopic> topicCreatedDateComp = new Comparator<VoTopic>(){

		@Override
		public int compare(VoTopic o1, VoTopic o2) {
			return -Integer.compare(o1.getCreatedAt(), o2.getCreatedAt());
		}
		
	};
}
