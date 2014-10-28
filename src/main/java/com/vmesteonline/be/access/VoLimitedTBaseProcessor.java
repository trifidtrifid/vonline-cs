package com.vmesteonline.be.access;



import org.apache.thrift.TException;
import org.apache.thrift.TProcessor;
import org.apache.thrift.protocol.TProtocol;

public class VoLimitedTBaseProcessor<I> implements TProcessor {
	
	@Override
	public boolean process(TProtocol in, TProtocol out) throws TException {
		return false;
	}
}
