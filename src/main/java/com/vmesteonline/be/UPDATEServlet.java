package com.vmesteonline.be;

import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.VoFileAccessRecord;
import com.vmesteonline.be.jdo2.VoTopic;
import com.vmesteonline.be.jdo2.VoUser;
import com.vmesteonline.be.jdo2.VoUserGroup;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.utils.Defaults;
import com.vmesteonline.be.utils.StorageHelper;

import javax.jdo.Extent;
import javax.jdo.PersistenceManager;
import javax.mail.internet.ContentType;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Iterator;


public class UPDATEServlet extends QueuedServletWithKeyHelper {

    @Override
    protected void service(HttpServletRequest arg0, HttpServletResponse arg1) throws ServletException, IOException {

        long now = System.currentTimeMillis();

		/*if( keyRequestAndQueuePush(arg0, arg1) ){*/
        String resultText = "init";
        String action = (String) arg0.getParameter("action");

        if ("init".equalsIgnoreCase(action)) {
            Defaults.initDefaultData();
            resultText = "Init DONE";


        } else if ("updateImages".equalsIgnoreCase(action)) {
            resultText = "Download Images: ";
            String host = arg0.getParameter("host");
            if (null == host) {
                resultText += "Parameter 'host' must contain the base URL to download files from.";
            } else {
                PersistenceManager pm = PMF.getPm();
                Extent<VoFileAccessRecord> files = pm.getExtent(VoFileAccessRecord.class);
                for (Iterator<VoFileAccessRecord> it = files.iterator(); it.hasNext(); ) {
                    VoFileAccessRecord nfar = it.next();
                    try {
                        resultText += "\n<br/> "+ nfar+"ID: " + nfar.getId();
                        ContentType contentType = new ContentType(nfar.getContentType());
                        String urlStr =  "http://" + host + StorageHelper.getURL(nfar.getId(), contentType.getSubType());
                        resultText += " "+ urlStr;
                        URL fu = new URL(new String(urlStr));
                        InputStream inputStream = fu.openStream();
                        ByteArrayOutputStream baos = new ByteArrayOutputStream();
                        byte[] buf = new byte[10240];
                        int read;
                        while (-1 != (read = inputStream.read(buf))) {
                            baos.write(buf, 0, read);
                        }
                        baos.close();
                        nfar.setData(baos.toByteArray());
                        resultText += " OK downloaded "+baos.size();

                        pm.makePersistent(nfar);
                    } catch (Exception e) {
                        resultText += "DELETED. Failed to download: "+ e.getMessage();
                        //pm.deletePersistent(nfar);
                    }
                }
            }
        } else if ("updateTopics".equalsIgnoreCase(action)) {
            PersistenceManager pm = PMF.getPm();
            try {
                Extent<VoUserGroup> vugs = pm.getExtent(VoUserGroup.class);
                ArrayList<VoUserGroup> vugssrtd = new ArrayList<VoUserGroup>();
                for (VoUserGroup vug : vugs) { //collect all UserGroups and sort it from lowest to higest
                    vugssrtd.add(vug);
                }
                Collections.sort(vugssrtd, new Comparator<VoUserGroup>() {

                    @Override
                    public int compare(VoUserGroup o1, VoUserGroup o2) {
                        return -Integer.compare(o1.getGroupType(), o2.getGroupType());
                    }
                });
                for (VoUserGroup vug : vugssrtd) { //collect all UserGroups and sort it from highest to lowest
                    try {
                        vug.setVisibleGroups(null);
                        vug.getVisibleGroups(pm);

                    } catch (Exception e) {
                        resultText += " </br>\r\ngetVisibleGroups ERROR: " + (e instanceof InvalidOperation ? ((InvalidOperation) e).why : e.getMessage());
                        e.printStackTrace();
                    }
                }
                for (VoUserGroup vug : vugssrtd) { //collect all UserGroups and sort it from highest to lowest
                    try {
                        vug.getUpperLevelGroups(pm);

                    } catch (Exception e) {
                        resultText += " </br>\r\ngetUpperLevelGroups ERROR: " + (e instanceof InvalidOperation ? ((InvalidOperation) e).why : e.getMessage());
                        e.printStackTrace();
                    }
                }


                Extent<VoTopic> topics = pm.getExtent(VoTopic.class);
                for (VoTopic voTopic : topics) {
                    try {
                        voTopic.setVisibleGroups(new ArrayList<Long>(pm.getObjectById(VoUserGroup.class, voTopic.getUserGroupId()).getUpperLevelGroups(pm)));
                    } catch (Exception e) {
                        resultText += " </br>\r\nvoTopic.setVisibleGroups ERROR: " + (e instanceof InvalidOperation ? ((InvalidOperation) e).why : e.getMessage());
                        e.printStackTrace();
                    }
                }
                Extent<VoUser> users = pm.getExtent(VoUser.class);
                for (VoUser user : users) {
                    user.initRootGroup(pm);
                }

            } catch (Exception e) {
                resultText += " </br>\r\nERROR: " + (e instanceof InvalidOperation ? ((InvalidOperation) e).why : e.getMessage());
            } finally {
                pm.close();
            }
        }
        arg1.setHeader("Content-Type","text/html");
        arg1.getOutputStream().write(resultText.getBytes());
            /*sendTheResultNotification(arg0, arg1, now, resultText);*/
    }
		
		/*PersistenceManager pm = PMF.getPm();
		pm.setMultithreaded(false);
		pm.setIgnoreCache(true);
		try {
			VoBuilding vb;
			VoStreet cs;
			VoCity vcty;
			VoCountry vc;
			try {
				
				Extent<VoUser> users = pm.getExtent(VoUser.class);
				for (VoUser voUser : users) {
					voUser.setLastNotified(0);
				}
				pm.makePersistent(users);
						
				/*Extent<VoUserGroup> userGroupE = pm.getExtent(VoUserGroup.class);
				for (VoUserGroup voUserGroup : userGroupE) {
					voUserGroup.setVisibleGroups(null);
					List<Long> visibleGroups = voUserGroup.getVisibleGroups(pm);
					
					List<VoTopic> topics = (List<VoTopic>) pm.newQuery(VoTopic.class, "userGroupId=="+voUserGroup.getId()).execute();
					for (VoTopic voTopic : topics) {
						voTopic.setVisibleGroups( new ArrayList<Long>(visibleGroups) );
					}
					pm.makePersistentAll(topics);
					pm.makePersistent(voUserGroup);
				}
				
				
			} catch( Exception e){
				e.printStackTrace();
				arg1.getOutputStream().write(("Failed to initialize! "+e.getMessage()).getBytes());
			} finally {
				pm.close();
			}
			
		} catch( Exception e){
			e.printStackTrace();
			arg1.getOutputStream().write(("Failed to initialize! "+e.getMessage()).getBytes());
		} finally {
			pm.close();
		}
	}*/
}
