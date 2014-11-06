package com.vmesteonline.be;

import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.*;
import com.vmesteonline.be.jdo2.utility.VoCounter;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.ServiceType;
import com.vmesteonline.be.thrift.utilityservice.CounterType;
import com.vmesteonline.be.utils.Defaults;
import com.vmesteonline.be.utils.StorageHelper;

import javax.jdo.Extent;
import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.mail.internet.ContentType;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.*;


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

        } else if ("enableCounters".equalsIgnoreCase(action)) {
            resultText = "Enable counters: ";

            {
                PersistenceManager pm = PMF.getPm();
                Extent<VoUser> files = pm.getExtent(VoUser.class);
                for (Iterator<VoUser> it = files.iterator(); it.hasNext(); ) {
                    VoUser nfar = it.next();
                    Set<ServiceType> services = nfar.getServices();
                    if( null == services )
                        services = new HashSet();
                    else services = new HashSet<>( services );
                    if( !services.contains( ServiceType.CountersEnabled )){
                        services.add(ServiceType.CountersEnabled);
                        nfar.setServices(services);
                        pm.makePersistent( nfar);
                        resultText += "\n<br/> Enabled for: "+ nfar.getName() + " " + nfar.getLastName();
                    }
                    long address = nfar.getAddress();
                    List cntrs = (List) pm.newQuery(VoCounter.class, "postalAddressId==" + address).execute();
                    if( null==cntrs || cntrs.size() == 0){
                        pm.makePersistent( new VoCounter(CounterType.COLD_WATER, "", "", address));
                        pm.makePersistent( new VoCounter(CounterType.HOT_WATER, "", "", address));
                        pm.makePersistent( new VoCounter(CounterType.COLD_WATER, "", "", address));
                        pm.makePersistent( new VoCounter(CounterType.HOT_WATER, "", "", address));
                        pm.makePersistent( new VoCounter(CounterType.ELECTRICITY_DAY, "", "", address));
                        pm.makePersistent( new VoCounter(CounterType.ELECTRICITY_NIGHT, "", "", address));
                    }
                }
            }

        } else if ("updatePools".equalsIgnoreCase(action)) {
            resultText = "Update Pools: ";

           {
               PersistenceManager pm = PMF.getPm();
               Query query = pm.newQuery("SQL", "SELECT * FROM VOPOLL WHERE ID>-1");
               List results = (List) query.execute();
               Iterator rit = results.iterator();
               while(rit.hasNext()) {
                   Object[] pool = (Object[]) rit.next();
                   VoPoll nextPool = new VoPoll();
                   try {
                       nextPool.setSubject( ""+pool[3]);
                       nextPool.setId( Long.parseLong( ""+pool[0]));
                       List<Long> ap = loadListFromString(new String( (byte[])pool[1]), new Long(0L));
                       nextPool.setAlreadyPoll( new HashSet<>(ap));
                       List<String> names = loadListFromString(new String( (byte[])pool[2]), new String());
                       nextPool.setNames(names);
                       nextPool.setSubject( ""+pool[3]);
                       List<Integer> vals = loadListFromString(new String((byte[])pool[4]), new Integer(0));
                       nextPool.setValues(vals);
                       pm.makePersistent(nextPool);
                       resultText += resultText += "\n<br/> "+ nextPool.getSubject()+" Updated";
                   } catch (NumberFormatException e) {
                       resultText += resultText += "\n<br/> Failed to load VOPool: "+ nextPool.getSubject()+": "+e.getMessage();
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

    private<T> List<T> loadListFromString(String s, T obj) {
        List res = null;
        if( s.startsWith("[") && s.endsWith("]")){
            res = new ArrayList<>();
            String[] list = s.substring(1,s.length()-1).split(",");
            for( String ni: list ){
                ni = ni.trim();
                if( obj instanceof Long ){
                    res.add( Long.parseLong( ni.substring(0,ni.length()-1) ));
                } else if( obj instanceof Integer ){
                    res.add( Integer.parseInt(ni.substring(0,ni.length()-1)));
                } else
                    res.add(  ni.trim() );
            }
        }
        return res;
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
