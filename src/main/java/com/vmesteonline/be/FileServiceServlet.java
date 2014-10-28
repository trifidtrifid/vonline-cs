package com.vmesteonline.be;

import com.vmesteonline.be.access.VoServiceMapAccessValidator;
import com.vmesteonline.be.thrift.fileservice.FileService;
import org.apache.thrift.TBaseProcessor;
import org.apache.thrift.protocol.TJSONProtocol;

@SuppressWarnings("serial")
public class FileServiceServlet extends VoServlet {

	public FileServiceServlet() {
		super(new TJSONProtocol.Factory());
		FileServiceImpl servImpl = new FileServiceImpl();
		serviceImpl = servImpl;
		TBaseProcessor<FileServiceImpl> proc = new FileService.Processor<FileServiceImpl>(servImpl);
		proc.setAccessValidator( new VoServiceMapAccessValidator(servImpl));
		super.setProcessor(proc);
	}
}
