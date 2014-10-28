package com.vmesteonline.be.utilityservices;

import org.apache.thrift.TBaseProcessor;
import org.apache.thrift.protocol.TJSONProtocol;
import org.apache.thrift.protocol.TProtocolFactory;

import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.VoServlet;
import com.vmesteonline.be.access.VoServiceMapAccessValidator;
import com.vmesteonline.be.thrift.utilityservice.UtilityService;

public class UtilityServicesServlet extends VoServlet {

	public UtilityServicesServlet() throws InvalidOperation {
		super(new TJSONProtocol.Factory());
		UtilityServiceImpl servImpl = new UtilityServiceImpl();
		serviceImpl = servImpl;
		super.setProcessor(new UtilityService.Processor<UtilityServiceImpl>(servImpl));
	}

	public UtilityServicesServlet(TProtocolFactory protocolFactory) throws InvalidOperation {
		super(new TJSONProtocol.Factory());
		UtilityServiceImpl servImpl = new UtilityServiceImpl();
		serviceImpl = servImpl;
		TBaseProcessor<UtilityServiceImpl> proc = new UtilityService.Processor<UtilityServiceImpl>(servImpl);
		proc.setAccessValidator(new VoServiceMapAccessValidator(servImpl));
		super.setProcessor(proc);
	}

	private static final long serialVersionUID = -9014665255913474234L;
}

