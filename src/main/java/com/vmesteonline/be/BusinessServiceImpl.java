package com.vmesteonline.be;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

import javax.jdo.PersistenceManager;

import org.apache.log4j.Logger;
import org.apache.thrift.TException;

import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.VoTopic;
import com.vmesteonline.be.jdo2.VoUser;
import com.vmesteonline.be.jdo2.VoUserGroup;
import com.vmesteonline.be.jdo2.business.VoBusiness;
import com.vmesteonline.be.thrift.GroupType;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.businesservice.BusinessService.Iface;
import com.vmesteonline.be.thrift.businesservice.BusinessDescription;
import com.vmesteonline.be.thrift.businesservice.BusinessInfo;
import com.vmesteonline.be.thrift.messageservice.Message;
import com.vmesteonline.be.thrift.messageservice.MessageListPart;
import com.vmesteonline.be.thrift.messageservice.MessageType;
import com.vmesteonline.be.thrift.messageservice.Topic;
import com.vmesteonline.be.thrift.messageservice.WallItem;
import com.vmesteonline.be.utils.Defaults;
import com.vmesteonline.be.utils.VoHelper;

public class BusinessServiceImpl extends ServiceImpl implements Iface {
	public static Logger logger = Logger.getLogger( BusinessServiceImpl.class);

	@Override
	public BusinessDescription getMyBusinessInfo() throws TException {
		PersistenceManager pm = PMF.getPm();
		VoUser currentUser = getCurrentUser(pm);
		if( currentUser instanceof VoBusiness )
			return ((VoBusiness)currentUser).getBusinessDescription(pm);
		return null;
	}

	@Override
	public List<BusinessInfo> getBusinessList(GroupType groupType, long rubricId) throws TException {
		PersistenceManager pm = PMF.getPm();
		Set<BusinessInfo> bs = new TreeSet<BusinessInfo>( new Comparator<BusinessInfo>() {
			@Override
			public int compare(BusinessInfo o1, BusinessInfo o2) {
				return Integer.compare(o1.distance, o2.distance);
			}});
		VoUser currentUser = getCurrentUser(pm);
		
		List<VoBusiness> businesses = (List<VoBusiness>) pm.newQuery(VoBusiness.class, VoHelper.createFilterByLocation(currentUser, 3000)).execute();
		int maxDist = Defaults.radiusByType[ groupType.getValue()];
		for( VoBusiness b : businesses){
			int dist = VoHelper.calculateRadius(currentUser, b);
			if( maxDist >= dist){
				BusinessInfo businessInfo = b.getBusinessInfo(currentUser, pm);
				businessInfo.distance = dist;
				bs.add(businessInfo);				
			}				
		}
		return new ArrayList<>( bs );
	}

	@Override
	public BusinessDescription getBusinessDescription(long businessId) throws TException {
		PersistenceManager pm = PMF.getPm();
		try {
			return pm.getObjectById(VoBusiness.class,businessId).getBusinessDescription(pm);
		} catch (Exception e) {	
			logger.warn("getBusinesDescription incorrect businessId="+businessId, e);
			e.printStackTrace();			
		}
		return null;
	}


	@Override
	public BusinessDescription updateBusinessDescription(BusinessDescription newDescription) throws TException {
		PersistenceManager pm = PMF.getPm();
		if(newDescription!=null)
			try {
				VoBusiness vb = pm.getObjectById(VoBusiness.class,newDescription.getId());
				vb.update(newDescription, pm);
				return vb.getBusinessDescription(pm);
			} catch (Exception e) {	
				logger.warn("getBusinesDescription incorrect buisinessId="+newDescription.getId(), e);
				e.printStackTrace();			
			}
		return null;
	}

	@Override
	public WallItem getWallItem(long businessId) throws TException {
		PersistenceManager pm = PMF.getPm();
		try {
			VoUser user = getCurrentUser(pm);
			List<VoTopic> topics = (List<VoTopic>) pm.newQuery(VoTopic.class, "userGroupType=="+GroupType.NOBODY.getValue()+" &&"
					+ "authorId=="+businessId+" && type=='"+MessageType.BUSINESS_PAGE.name()+"'").execute();
			VoTopic voTopic = topics.get(0);
			Topic tpc = voTopic.getTopic(user.getId(), pm);
	
			tpc.userInfo = UserServiceImpl.getShortUserInfo(user, voTopic.getAuthorId(), pm);
			MessageListPart mlp = MessageServiceImpl.createMessagesList(tpc.id, 0L, 10, user.getId(), pm );
			if (mlp.totalSize > 0)
				logger.info("find msgs " + mlp.messages.size());
			return new WallItem(mlp.messages, tpc);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public BusinessDescription createBusinessDescription(BusinessDescription description, String email, String password) throws TException {
		PersistenceManager pm = PMF.getPm();
		try {
			VoBusiness newBusiness = VoBusiness.create(description, email, password, pm);
			if( null == newBusiness ) {
				return description;
			}
			pm.makePersistent(newBusiness);
			Message msg = new Message();
			msg.setContent("Текст сообщения для обсуждения");
			msg.setAuthorId(newBusiness.getId());
			msg.setType(MessageType.BUSINESS_PAGE);
			msg.setGroupId(newBusiness.getGroups().get(0));			
			VoTopic bt = new VoTopic( new Topic(0,"Заголовок сообщения", msg, 0,0,0,0,0,0,null,null,null,GroupType.NOBODY,false), newBusiness, pm);
			pm.makePersistent(bt);
			return newBusiness.getBusinessDescription(pm);
		} catch (Exception e) {	
			logger.warn("createBusinesDescription incorrect description="+description, e);
			e.printStackTrace();			
		}
		return null;
	}

	@Override
	public boolean isPublicMethod(String method) {
		VoUser currentUser = null;
		try {
			currentUser = getCurrentUser();
		} catch (InvalidOperation e) {			
			e.printStackTrace();
		}
		return !"createBusinessDescription".endsWith(method) || currentUser != null && currentUser.isTheBigBro();
	}
}
