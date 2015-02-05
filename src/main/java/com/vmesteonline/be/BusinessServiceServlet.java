package com.vmesteonline.be;

import com.vmesteonline.be.access.VoServiceMapAccessValidator;
import com.vmesteonline.be.thrift.businesservice.BusinessService;

import org.apache.thrift.TBaseProcessor;
import org.apache.thrift.protocol.TJSONProtocol;

public class BusinessServiceServlet extends VoServlet {

	public BusinessServiceServlet() {
		super(new TJSONProtocol.Factory());
		BusinessServiceImpl servImpl = new BusinessServiceImpl();
		serviceImpl = servImpl;
		TBaseProcessor<BusinessServiceImpl> proc = new BusinessService.Processor<BusinessServiceImpl>(servImpl);
		proc.setAccessValidator( new VoServiceMapAccessValidator(servImpl));
		super.setProcessor(proc);
	}

	private static final long serialVersionUID = -9014665255913474235L;
}
