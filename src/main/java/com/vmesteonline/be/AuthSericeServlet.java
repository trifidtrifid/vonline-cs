package com.vmesteonline.be;

import com.vmesteonline.be.access.VoServiceMapAccessValidator;
import com.vmesteonline.be.thrift.authservice.AuthService;
import org.apache.thrift.TBaseProcessor;
import org.apache.thrift.protocol.TJSONProtocol;

public class AuthSericeServlet extends VoServlet {

	public AuthSericeServlet() {
		super(new TJSONProtocol.Factory());
		AuthServiceImpl servImpl = new AuthServiceImpl();
		serviceImpl = servImpl;
		TBaseProcessor<AuthServiceImpl> proc = new AuthService.Processor<AuthServiceImpl>(servImpl);
		proc.setAccessValidator( new VoServiceMapAccessValidator(servImpl));
		super.setProcessor(proc);
	}

	private static final long serialVersionUID = -9014665255913474234L;
}
