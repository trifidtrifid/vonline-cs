package com.vmesteonline.be;

import com.vmesteonline.be.access.VoServiceMapAccessValidator;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.messageservice.DialogService;
import org.apache.thrift.TBaseProcessor;
import org.apache.thrift.protocol.TJSONProtocol;
import org.apache.thrift.protocol.TProtocolFactory;

public class DialogServiceServlet extends VoServlet {

	public DialogServiceServlet() throws InvalidOperation {
		super(new TJSONProtocol.Factory());
		DialogServiceImpl servImpl = new DialogServiceImpl();
		serviceImpl = servImpl;
		super.setProcessor(new DialogService.Processor<DialogServiceImpl>(servImpl));
	}

	public DialogServiceServlet(TProtocolFactory protocolFactory) throws InvalidOperation {
		super(new TJSONProtocol.Factory());
		DialogServiceImpl servImpl = new DialogServiceImpl();
		serviceImpl = servImpl;
		TBaseProcessor<DialogServiceImpl> proc = new DialogService.Processor<DialogServiceImpl>(servImpl);
		proc.setAccessValidator(new VoServiceMapAccessValidator(servImpl));
		super.setProcessor(proc);
	}

	private static final long serialVersionUID = -9014665255913474234L;
}