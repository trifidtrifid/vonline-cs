package com.vmesteonline.be;

import java.util.List;

import org.apache.thrift.TException;

import com.vmesteonline.be.thrift.GroupType;
import com.vmesteonline.be.thrift.businesservice.BuisinessService.Iface;
import com.vmesteonline.be.thrift.businesservice.BusinessDescription;
import com.vmesteonline.be.thrift.businesservice.BusinessInfo;
import com.vmesteonline.be.thrift.messageservice.WallItem;

public class BusinessServiceImpl extends ServiceImpl implements Iface {

	@Override
	public BusinessDescription getMyBusinessInfo() throws TException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<BusinessInfo> getBusinessList(GroupType groupType, long rubricId) throws TException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public BusinessDescription getBusinesDescription(long buisinessId) throws TException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public BusinessDescription createBusinesDescription(BusinessDescription description) throws TException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public BusinessDescription updatrBusinesDescription(BusinessDescription newDescription) throws TException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public WallItem getWallItem(long businessId) throws TException {
		// TODO Auto-generated method stub
		return null;
	}

}
