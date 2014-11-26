package com.vmesteonline.be.notifications;

import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.VoGroup;
import com.vmesteonline.be.jdo2.VoTopic;
import com.vmesteonline.be.jdo2.VoUser;
import com.vmesteonline.be.thrift.GroupType;
import com.vmesteonline.be.thrift.messageservice.MessageType;
import com.vmesteonline.be.utils.Defaults;
import com.vmesteonline.be.utils.VoHelper;
import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.log4j.Logger;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import java.io.IOException;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

import static com.vmesteonline.be.utils.VoHelper.executeQuery;

public class NewTopicsNotification extends Notification {
	private static Logger logger = Logger.getLogger(NewTopicsNotification.class.getSimpleName());
	
	public NewTopicsNotification( Map< VoUser, List<NotificationMessage>> ntf ) {
		this.messagesToSend = ntf;
	}

	public void makeNotification( Set<VoUser> users ) {

		int now = (int)(System.currentTimeMillis()/1000L);

		PersistenceManager pm = PMF.getPm();

		Query query = pm.newQuery(VoTopic.class, "createDate>" + (now - 86400 * 7));
		List<VoTopic> newTopics = executeQuery( query );
		Map<VoUser, List[]> userTopics = new HashMap<>();
		for( VoTopic topic: newTopics ){
			if( topic.getType() == MessageType.BLOG )
				continue;
			VoGroup voGroup = Defaults.defaultGroups.get(topic.getUserGroupType() - Defaults.FIRST_USERS_GROUP);
			int radius = voGroup.getRadius();
			String ufilter;
			if( voGroup.getGroupType() <= GroupType.BUILDING.getValue() )
				ufilter = "longitude=='"+topic.getLongitude()+"' && latitude=='"+topic.getLatitude()+"'";
			else {
				BigDecimal latitudeMax = VoHelper.getLatitudeMax(topic.getLatitude(), radius);
				BigDecimal latitudeMin = VoHelper.getLatitudeMin(topic.getLatitude(), radius);
				BigDecimal longitudeMax = VoHelper.getLongitudeMax(topic.getLongitude(), topic.getLatitude(), radius);
				BigDecimal longitudeMin = VoHelper.getLongitudeMin(topic.getLongitude(), topic.getLatitude(), radius);
				ufilter = "longitude >= '" + longitudeMin + "' && longitude <= '" + longitudeMax +
						"' && latitude >= '" + latitudeMin + "' && latitude <= '" + latitudeMax + "'";
			}
			List<VoUser> ulist = executeQuery(pm.newQuery(VoUser.class, ufilter));
			for( VoUser u: ulist ){
				if( u.getLastNotified() < topic.getCreatedAt() ) {
					List[] topics = userTopics.get(u);
					if (null == topics)
						userTopics.put(u, topics = new List[GroupType.values().length]);
					if (topics[topic.getUserGroupType()] == null)
						topics[topic.getUserGroupType()] = new ArrayList<>();
					topics[topic.getUserGroupType()].add( topic );
				}
			}
		}

		// create message for each user
		for (VoUser u : userTopics.keySet()) {
			String body = "<p><b>Близкие события</b></p>";
			boolean somethingToSend = false;
			for ( VoGroup ug: Defaults.defaultGroups ) {
				List topicsList = userTopics.get(u)[ug.getGroupType()];
				if (topicsList != null) {
					String tc = createGroupContent(pm, ug, topicsList);
					if (tc != null) {
						somethingToSend = true;
						body += tc;
					}
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

	private String createGroupContent(PersistenceManager pm, VoGroup ug, List<VoTopic> topics) {
		try {
			List<VoTopic> orderedTopics = new ArrayList<>( topics );
			Collections.sort(orderedTopics, topicCreatedDateComp);
			
			int weekAgo = (int) (System.currentTimeMillis()/1000L) - 7 * 86400;
			if( orderedTopics.get(0).getCreatedAt() < weekAgo )
				return null;
			
			String groupContent = "<p><b>Пишут в группе '" + ug.getVisibleName() + "'</b>";
				
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

	private String createTopicContent(PersistenceManager pm, VoGroup ug, VoTopic tpc) {
		VoUser author = pm.getObjectById(VoUser.class, tpc.getAuthorId());
		String contactTxt = "<a href=\"https://"+host+"/profile/"+author.getId()+"\">"+StringEscapeUtils.escapeHtml4(author.getName() + " " + author.getLastName())+"</a>";
		DateFormat df = new SimpleDateFormat("yyyy.MM.dd 'в' HH:mm:ss z");
		df.setTimeZone(TimeZone.getTimeZone("Europe/Moscow"));
		Date date = new Date(((long) tpc.getCreatedAt()) * 1000L);

		String topicTxt = "<p>"+ df.format(date) + " " + contactTxt;
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
