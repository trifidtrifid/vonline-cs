package com.vmesteonline.be;

import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.utils.Defaults;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class InitServlet extends QueuedServletWithKeyHelper {
	
	@Override
	protected void service(HttpServletRequest arg0, HttpServletResponse arg1) throws ServletException, IOException {
		
		long now = System.currentTimeMillis();
		
		/*if( keyRequestAndQueuePush(arg0, arg1) ){
		*/

		Defaults.initDefaultData(PMF.getPm());
		/*	String resultText = "Init DONE";
			sendTheResultNotification(arg0, arg1, now, resultText);
		}*/
	}

	
}
