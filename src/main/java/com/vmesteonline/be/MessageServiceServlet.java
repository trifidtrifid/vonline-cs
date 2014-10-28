package com.vmesteonline.be;

import com.vmesteonline.be.access.VoServiceMapAccessValidator;
import com.vmesteonline.be.thrift.messageservice.MessageService;
import com.vmesteonline.be.thrift.InvalidOperation;
import org.apache.thrift.TBaseProcessor;
import org.apache.thrift.protocol.TJSONProtocol;
import org.apache.thrift.protocol.TProtocolFactory;

public class MessageServiceServlet extends VoServlet {

	public MessageServiceServlet() throws InvalidOperation {
		super(new TJSONProtocol.Factory());
		MessageServiceImpl servImpl = new MessageServiceImpl();
		serviceImpl = servImpl;
		super.setProcessor(new MessageService.Processor<MessageServiceImpl>(servImpl));
	}

	public MessageServiceServlet(TProtocolFactory protocolFactory) throws InvalidOperation {
		super(new TJSONProtocol.Factory());
		MessageServiceImpl servImpl = new MessageServiceImpl();
		serviceImpl = servImpl;
		TBaseProcessor<MessageServiceImpl> proc = new MessageService.Processor<MessageServiceImpl>(servImpl);
		proc.setAccessValidator(new VoServiceMapAccessValidator(servImpl));
		super.setProcessor(proc);
	}

	private static final long serialVersionUID = -9014665255913474234L;
}
