package org.apache.thrift;

import com.vmesteonline.be.access.VoTAccessValidator;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.VoError;
import org.apache.thrift.protocol.*;

import java.util.Collections;
import java.util.Map;

public abstract class TBaseProcessor<I> implements TProcessor {
  private final I iface;
  private final Map<String,ProcessFunction<I, ? extends TBase>> processMap;
  private VoTAccessValidator accessValidator;

  protected TBaseProcessor(I iface, Map<String, ProcessFunction<I, ? extends TBase>> processFunctionMap) {
    this.iface = iface;
    this.processMap = processFunctionMap;
  }

  public Map<String,ProcessFunction<I, ? extends TBase>> getProcessMapView() {
    return Collections.unmodifiableMap(processMap);
  }

  @Override
  public boolean process(TProtocol in, TProtocol out) throws TException {
    TMessage msg = in.readMessageBegin();
    ProcessFunction fn = processMap.get(msg.name);
    if (fn == null ){
      TProtocolUtil.skip(in, TType.STRUCT);
      in.readMessageEnd();
      TApplicationException x = new TApplicationException(TApplicationException.UNKNOWN_METHOD, "Invalid method name: '"+msg.name+"'");
      out.writeMessageBegin(new TMessage(msg.name, TMessageType.EXCEPTION, msg.seqid));
      x.write(out);
      out.writeMessageEnd();
      out.getTransport().flush();
      return true;
      /* Code added to implement authorization*/
    } else if(!checkAccessRights(fn.getMethodName())){
    	TProtocolUtil.skip(in, TType.STRUCT);
      in.readMessageEnd();
      InvalidOperation x = new InvalidOperation(VoError.NotAuthorized, "Access denied for user.");
      out.writeMessageBegin(new TMessage(msg.name, TMessageType.EXCEPTION, msg.seqid));
      x.write(out);
      out.writeMessageEnd();
      out.getTransport().flush();
      return true;
    }
    /* End of added code */
    fn.process(msg.seqid, in, out, iface);
    return true;
  }
  
  public void setAccessValidator( VoTAccessValidator v ){
  	this.accessValidator = v;
  }
  protected boolean checkAccessRights( String functionName ){
  	return null == accessValidator ? true : accessValidator.checkAccessRights(functionName);
  };
}
