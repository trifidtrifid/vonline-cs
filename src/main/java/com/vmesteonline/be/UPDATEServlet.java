package com.vmesteonline.be;

import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.GeoLocation;
import com.vmesteonline.be.jdo2.VoFileAccessRecord;
import com.vmesteonline.be.jdo2.VoGroup;
import com.vmesteonline.be.jdo2.VoMulticastMessage;
import com.vmesteonline.be.jdo2.VoPoll;
import com.vmesteonline.be.jdo2.VoTopic;
import com.vmesteonline.be.jdo2.VoUser;
import com.vmesteonline.be.jdo2.VoUserGroup;
import com.vmesteonline.be.jdo2.postaladdress.VoBuilding;
import com.vmesteonline.be.jdo2.postaladdress.VoCity;
import com.vmesteonline.be.jdo2.postaladdress.VoCountry;
import com.vmesteonline.be.jdo2.postaladdress.VoGeocoder;
import com.vmesteonline.be.jdo2.postaladdress.VoPostalAddress;
import com.vmesteonline.be.jdo2.postaladdress.VoStreet;
import com.vmesteonline.be.jdo2.utility.VoCounterService;
import com.vmesteonline.be.notifications.Notification;
import com.vmesteonline.be.thrift.GroupType;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.utilityservice.CounterType;
import com.vmesteonline.be.utils.Defaults;
import com.vmesteonline.be.utils.VoHelper;

import javax.jdo.Extent;
import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.net.URL;
import java.util.*;

import static com.vmesteonline.be.utils.VoHelper.executeQuery;

public class UPDATEServlet extends QueuedServletWithKeyHelper {

	@Override
	protected void service(HttpServletRequest arg0, HttpServletResponse arg1) throws ServletException, IOException {

		long now = System.currentTimeMillis();

		/* if( keyRequestAndQueuePush(arg0, arg1) ){ */
		String resultText = "init";
		String action = (String) arg0.getParameter("action");
		try {
			if ("addrl".equalsIgnoreCase(action)) {

				String gid = arg0.getParameter("gid");
				if (null == gid) {
					resultText = "gid parametr must define a group";
				} else {
					PersistenceManager pm = PMF.getPm();
					resultText = "Visible names for group " + gid + "<br/>";
					List<String> vnl = UserServiceImpl.getVIsibleNamesByGroup(Long.parseLong(gid), pm);
					for (String vn : vnl) {
						resultText += vn + "<br/>";
					}
				}

			} else if ("init".equalsIgnoreCase(action)) {
				Defaults.initDefaultData(PMF.getPm());
				resultText = "Init DONE";

			} else if ("broadcastTopic".equalsIgnoreCase(action)) {
				String topicId = arg0.getParameter("topicId");
				String radius = arg0.getParameter("radius");

				if (null == radius || null == topicId) {
					resultText += "<h1>topicId and radius parameters must be set</h1>";
				} else {
					PersistenceManager pm = PMF.getPm();
					VoTopic topic = pm.getObjectById(VoTopic.class, Long.parseLong(topicId));
					BigDecimal baseLat = topic.getLatitude();
					BigDecimal baseLong = topic.getLongitude();
					int dist = Defaults.radiusNeighbors * 2;
					List<VoTopic> newTopics = new ArrayList<VoTopic>();
					int rad = Integer.parseInt(radius);

					pm.currentTransaction().begin();
					try {

						if (topic.getUserGroupType() == GroupType.BUILDING.getValue()) {
							Extent<VoBuilding> buildings = pm.getExtent(VoBuilding.class);
							for (VoBuilding b : buildings)
								if (rad > VoHelper.calculateRadius(new GeoLocation(b.getLongitude().toPlainString(), b.getLatitude().toPlainString()), topic))
									newTopics.add(topic.createCopy(b.getLatitude(), b.getLongitude(), null, pm));

						} else if (topic.getUserGroupType() == GroupType.NEIGHBORS.getValue()) {

							float stepLimit = ((float) rad) / ((float) dist);
							for (int stepLat = 0; stepLat < stepLimit; stepLat++) {
								BigDecimal maxLat = VoHelper.getLatitudeMax(baseLat, stepLat * dist);
								BigDecimal minLat = VoHelper.getLatitudeMin(baseLat, stepLat * dist);

								if( 0!=stepLat ){
									checkDiatanceAndAddTopic(topic, newTopics, rad, maxLat, baseLong);
									checkDiatanceAndAddTopic(topic, newTopics, rad, minLat, baseLong);
								}
								
								for (int stepLong = 1; stepLong < stepLimit; stepLong++) {

									BigDecimal maxLatMaxLongLong = VoHelper.getLongitudeMax(baseLong, maxLat, stepLong * dist);
									BigDecimal maxLatMinLongLong = VoHelper.getLongitudeMin(baseLong, maxLat, stepLong * dist);

									checkDiatanceAndAddTopic(topic, newTopics, rad, maxLat, maxLatMaxLongLong); 
									checkDiatanceAndAddTopic(topic, newTopics, rad, maxLat, maxLatMinLongLong); 
									 
									if( 0!=stepLat ){
										BigDecimal minLatMaxLongLong = VoHelper.getLongitudeMax(baseLong, minLat, stepLong * dist);
										BigDecimal minLatMinLongLong = VoHelper.getLongitudeMin(baseLong, minLat, stepLong * dist);
										
										checkDiatanceAndAddTopic(topic, newTopics, rad, minLat, minLatMaxLongLong); 
										checkDiatanceAndAddTopic(topic, newTopics, rad, minLat, minLatMinLongLong);	
									}
								}
							}
						} else {
							resultText += "Invalid group Type: " + topic.getUserGroupType();
							pm.currentTransaction().rollback();
							return;
						}

						String href = "http://static-maps.yandex.ru/1.x/?l=map&size=600,450&pt=";
						Collections.sort(newTopics, new Comparator<VoTopic>() {
							@Override
							public int compare(VoTopic o1, VoTopic o2) {
								return o1.getLongitude().compareTo(o2.getLongitude()) == 0 ? o1.getLatitude().compareTo(o2.getLatitude()) : o1.getLongitude()
										.compareTo(o2.getLongitude());
							}
						});
						pm.makePersistentAll(newTopics);
						resultText += "Created " + newTopics.size() + " copy of topics</br>";
						resultText += "<table><tr><td>ID</td><td>latitude</td><td>longitude</td></tr>";
						for (VoTopic t : newTopics) {
							resultText += "<tr><td>" + t.getId() + "</td><td>" + t.getLatitude() + "</td><td>" + t.getLongitude() + "</td></tr>";
							href += t.getLongitude().toPlainString() + "," + t.getLatitude().toPlainString() + ",pm2gnm~";
						}
						href += topic.getLongitude().toPlainString() + "," + topic.getLatitude().toPlainString() + ",pm2rdl";
						resultText += "</table><p><a href=" + href + ">Карта размещения</a></p>";

						pm.currentTransaction().commit();

					} catch (Exception e) {
						pm.currentTransaction().rollback();
						e.printStackTrace();
						resultText += "<h1>" + e.getMessage() + "</h1>";
					}
				}

			} else if ("moveUser".equalsIgnoreCase(action)) {

				String emailStr = arg0.getParameter("userEmail");
				String paIdStr = arg0.getParameter("paId");
				String bIdStr = arg0.getParameter("buildingId");

				if (null == emailStr || null == paIdStr && null == bIdStr) {
					resultText = "Parameters required: userEmail, (paIdStr or buildingId)";

				} else {

					try {
						PersistenceManager pm = PMF.getPm();

						VoPostalAddress pa = null != paIdStr ? pm.getObjectById(VoPostalAddress.class, Long.parseLong(paIdStr)) : VoPostalAddress
								.createVoPostalAddress(pm.getObjectById(VoBuilding.class, Long.parseLong(bIdStr)), (byte) 0, (byte) 0, 0, "", pm);

						List<VoUser> users = (List<VoUser>) pm.newQuery(VoUser.class, "email=='" + emailStr + "'").execute();
						if (0 != users.size()) {

							VoUser user = users.get(0);
							VoBuilding building = pm.getObjectById(VoBuilding.class, pa.getBuilding());
							// check if location is set
							if (null == building.getLatitude() || 0 == building.getLatitude().intValue()) {
								try {
									VoGeocoder.getPosition(building, false, pm);
									pm.makePersistent(building);

								} catch (InvalidOperation e) {
									e.printStackTrace();
								}
							}

							user.setAddress(pa.getId());
							Vector<Long> groups = new Vector<>();
							for (int gid = Defaults.getDefaultGroups().size(); gid > 0; gid--) {
								VoGroup group = Defaults.getDefaultGroups().get(gid - 1);
								VoUserGroup ug = VoUserGroup.createVoUserGroup(building.getLongitude(), building.getLatitude(), group.getRadius(), pa.getStaircase(),
										pa.getFloor(), group.getVisibleName(), group.getImportantScore(), group.getGroupType(), pm);

								UserServiceImpl.usersByGroup.forget(new Object[] { ug.getId() });
								groups.add(ug.getId());
							}
							Collections.reverse(groups);
							user.setGroups(groups);
							user.setLongitude(building.getLongitude());
							user.setLatitude(building.getLatitude());

							pm.makePersistent(user);
							resultText = user.getName() + " " + user.getLastName() + " moved to " + pa.getAddressText(pm);
						}
					} catch (Exception e) {
						e.printStackTrace();
						resultText = e.getMessage();
					}
				}

			} else if ("updateImages".equalsIgnoreCase(action)) {
				resultText = "Download Images: ";
				String host = arg0.getParameter("host");
				if (null == host) {
					resultText += "Parameter 'host' must contain the base URL to download files from.";
				} else {
					PersistenceManager pm = PMF.getPm();
					Extent<VoFileAccessRecord> files = pm.getExtent(VoFileAccessRecord.class);
					for (Iterator<VoFileAccessRecord> it = files.iterator(); it.hasNext();) {
						VoFileAccessRecord nfar = it.next();
						try {
							resultText += "\n<br/> " + nfar + "ID: " + nfar.getId();
							String urlStr = "http://" + host + nfar.getURL();
							resultText += " " + urlStr;
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
							resultText += " OK <a href=\"" + nfar.getURL() + "\">downloaded " + baos.size() + "</a>";

							pm.makePersistent(nfar);
						} catch (Exception e) {
							resultText += "DELETED. Failed to download: " + e.getMessage();
							// pm.deletePersistent(nfar);
						}
					}
				}

			} else if ("enableCounters".equalsIgnoreCase(action)) {
				
				String bId = arg0.getParameter("buildingId");
				String start = arg0.getParameter("start");
				String end = arg0.getParameter("end");
				
				
				if( null!=bId && null != start && null!=end){
					PersistenceManager pm = PMF.getPm();
					VoBuilding vb = pm.getObjectById(VoBuilding.class, Long.parseLong(bId.trim()));
					ArrayList<CounterType> defaultCounterTypes = new ArrayList<CounterType>();
					defaultCounterTypes.add(CounterType.COLD_WATER);
					defaultCounterTypes.add(CounterType.HOT_WATER);
					defaultCounterTypes.add(CounterType.COLD_WATER);
					defaultCounterTypes.add(CounterType.HOT_WATER);
					defaultCounterTypes.add(CounterType.ELECTRICITY_DAY);
					defaultCounterTypes.add(CounterType.ELECTRICITY_NIGHT);
					
					
					pm.makePersistent( new VoCounterService(vb.getId(), 
							Short.parseShort(start),
							Short.parseShort(end), 
									defaultCounterTypes));
					resultText = "<p>Enable counters in: "+vb.getAddressString()+"</p>";
					
					{
						List<VoUser> users = executeQuery(pm.newQuery( VoUser.class, "longitude=='"+vb.getLongitude().toPlainString()+"' && latitude=='"+vb.getLatitude().toPlainString()+"'"));
						for (Iterator<VoUser> it = users.iterator(); it.hasNext();) {
							resultText += it.next().enableCountersFor(defaultCounterTypes, pm);
						}
					}
				} else {
					resultText = "Enable countesr comand required parameter absend: buildingId, start, end";
				}

			} else if ("updatePools".equalsIgnoreCase(action)) {
				resultText = "Update Pools: ";

				{
					PersistenceManager pm = PMF.getPm();
					Query query = pm.newQuery("SQL", "SELECT * FROM VOPOLL WHERE ID>-1");
					List results = executeQuery(query);
					Iterator rit = results.iterator();
					while (rit.hasNext()) {
						Object[] pool = (Object[]) rit.next();
						VoPoll nextPool = new VoPoll();
						try {
							nextPool.setId(Long.parseLong("" + pool[0]));
							nextPool = pm.getObjectById(VoPoll.class, Long.parseLong("" + pool[0]));
							List<Long> ap = loadListFromString(new String((byte[]) pool[1]), new Long(0L));
							if (null != ap) {
								Set<Long> alreadyPoll = new TreeSet<>();
								alreadyPoll.addAll(ap);
								nextPool.setAlreadyPoll(alreadyPoll);
							}
							List<String> names = loadListFromString(new String((byte[]) pool[2]), new String());
							if (null != names)
								nextPool.setNames(names);
							nextPool.setSubject("" + pool[3]);
							List<Integer> vals = loadListFromString(new String((byte[]) pool[4]), new Integer(0));
							nextPool.setValues(vals);
							pm.makePersistent(nextPool);
							resultText += resultText += "\n<br/> " + nextPool.getSubject() + " Updated";
						} catch (NumberFormatException e) {
							resultText += resultText += "\n<br/> Failed to load VOPool: " + nextPool.getSubject() + ": " + e.getMessage();
						}
					}
				}

			} else if ("joinBuildings".equalsIgnoreCase(action)) {

				String srcId = arg0.getParameter("srcId");
				String dstId = arg0.getParameter("dstId");
				if (null != srcId && null != dstId) {
					PersistenceManager pm = PMF.getPm();

					pm.currentTransaction().begin();

					VoBuilding srcB = pm.getObjectById(VoBuilding.class, Long.parseLong(srcId));
					long dstBuildingId = Long.parseLong(dstId);
					VoBuilding dstB = pm.getObjectById(VoBuilding.class, dstBuildingId);

					resultText = "Join:<br/>";
					resultText += "From:" + srcB.getAddressString() + "<br/>";
					resultText += "To: " + dstB.getAddressString() + "<br/>";
					resultText += "<br/>";

					// replace all postal addresses of source to dest if postal address
					// exsits for dest building,
					// move VoCounterService to dest building's postalAddressId
					List<VoPostalAddress> srcPA = executeQuery(pm.newQuery(VoPostalAddress.class, "buildingId==" + srcId));
					List<VoPostalAddress> dstPA = new ArrayList<>();
					Map<Long, Long> paMap = new HashMap<>();
					for (VoPostalAddress spa : srcPA) {
						try {
							VoPostalAddress dpa = VoPostalAddress.createVoPostalAddress(dstB, spa.getStaircase(), spa.getFloor(), spa.getFlatNo(), "", pm);
							dstPA.add(dpa);
							paMap.put(spa.getId(), dpa.getId());

						} catch (InvalidOperation e) {
							dstPA.add(null);
							e.printStackTrace();
						}
					}

					// move VoCounterService from src to dest
					List<VoCounterService> csS = executeQuery(pm.newQuery(VoCounterService.class, "buildingId==" + srcId));
					for (VoCounterService vcs : csS) {
						vcs.setBuildingId(dstBuildingId);
					}
					pm.makePersistentAll(csS);

					// get user groups for both of buildings
					if (srcB.getLongitude().equals(dstB.getLongitude()) && srcB.getLatitude().equals(dstB.getLatitude())) { // groups
																																																									// are
																																																									// the
																																																									// same
						resultText += "Building Locations are the same, so UserGroups a the same too<br/>";

					} else
						try {
							resultText += "Building Locations don't mutch<br/>";
							// replace all user groups of source building with groups of dest
							// building
							List<VoUser> srcUsers = executeQuery(pm.newQuery(VoUser.class,
									"longitude=='" + srcB.getLongitude() + "' && latitude=='" + srcB.getLatitude() + "'"));
							for (VoUser su : srcUsers) {

								VoPostalAddress upa = pm.getObjectById(VoPostalAddress.class, su.getAddress());
								List<Long> dstGroups = new ArrayList<Long>();
								for (Long sgId : su.getGroups()) {
									VoUserGroup srcG = pm.getObjectById(VoUserGroup.class, sgId);
									dstGroups.add(VoUserGroup.createVoUserGroup(dstB.getLongitude(), dstB.getLatitude(), srcG.getRadius(), srcG.getStaircase(),
											srcG.getFloor(), srcG.getName(), srcG.getImportantScore(), srcG.getGroupType(), pm).getId());
								}

								resultText += "Move user " + Notification.createContactHref(su) + "<br/>";
								su.setAddress(paMap.get(su.getAddress()));
								su.setAddressStringsByGroupType(null);
								su.setGroups(dstGroups);
								su.setLongitude(dstB.getLongitude());
								su.setLatitude(dstB.getLatitude());
							}
							resultText += "<br/>";
							// replace topic groups
							List<Long> srcGroups = executeQuery(pm.newQuery("SQL", "SELECT ID from VOUSERGROUP WHERE longitude='" + srcB.getLongitude()
									+ "' AND latitude='" + srcB.getLatitude() + "'"));

							for (Long sgId : srcGroups) {
								VoUserGroup srcG = pm.getObjectById(VoUserGroup.class, sgId);
								VoUserGroup dstG = VoUserGroup.createVoUserGroup(dstB.getLongitude(), dstB.getLatitude(), srcG.getRadius(), srcG.getStaircase(),
										srcG.getFloor(), srcG.getName(), srcG.getImportantScore(), srcG.getGroupType(), pm);

								List<VoTopic> srcTopics = executeQuery(pm.newQuery(VoTopic.class, "userGroupId==" + sgId));
								for (VoTopic st : srcTopics) {
									resultText += "Move topic " + VoHelper.getShortMessageForm(st.getContent(), 32, 45) + "<br/>";

									st.setUserGroupId(dstG.getId());
									st.setLongitude(dstB.getLongitude());
									st.setLatitude(dstB.getLatitude());
								}
								pm.makePersistentAll(srcTopics);

								// move all multicast messages
								List<VoMulticastMessage> mmSA = executeQuery(pm.newQuery(VoMulticastMessage.class, "userGroup==:ug"), srcG);
								for (VoMulticastMessage smm : mmSA) {
									resultText += "Move multicast message " + VoHelper.getShortMessageForm(smm.getMessage(), 32, 45) + "<br/>";
									smm.setUserGroup(pm.getObjectById(VoUserGroup.class, dstG));
								}
							}

						} catch (Exception e) {
							e.printStackTrace();
							resultText += "EXCEPTION!!! " + e.getMessage();
							pm.currentTransaction().rollback();
							return;
						}

					long sid = srcB.getStreetId();
					// remove src building
					pm.deletePersistent(srcB);

					// check if it was the only building on street - remove street
					List<VoBuilding> ssBuildings = executeQuery(pm.newQuery(VoBuilding.class, "streetId==" + sid));
					if (null == ssBuildings || ssBuildings.size() == 0) {
						VoStreet street = null;
						try {
							street = pm.getObjectById(VoStreet.class, sid);
						} catch (Exception e) {
							resultText += "Street " + sid + " not found!<br/>";
							e.printStackTrace();
						}
						if (null != street) {
							long cityId = street.getCity();
							resultText += "Street " + street.getId() + " '" + street.getName() + "' became empty and deleted<br/>";
							pm.deletePersistent(street);
							// check if it was the only street of city - remove the city
							VoCity city = null;
							try {
								city = pm.getObjectById(VoCity.class, cityId);
							} catch (Exception e) {
								resultText += "City " + cityId + " not found!<br/>";
								e.printStackTrace();
							}
							if (null != city) {
								List<VoStreet> cslist = executeQuery(pm.newQuery(VoStreet.class, "cityId==" + cityId));

								if (null == cslist || cslist.size() == 0) {
									long countryId = city.getCountry();
									resultText += "City " + city.getId() + " '" + city.getName() + "' became empty and deleted<br/>";
									pm.deletePersistent(city);

									// check if it was the only city of country - remove the
									// country
									try {
										VoCountry country = pm.getObjectById(VoCountry.class, countryId);
										List<VoCity> cylist = executeQuery(pm.newQuery(VoCity.class, "countryId==" + countryId));
										if (null == cylist || cylist.size() == 0) {
											resultText += "Country " + countryId + " '" + country.getName() + "' became empty and deleted<br/>";
											pm.deletePersistent(country);

										} else {
											resultText += "Country contains at least one more city: '" + cylist.get(0).getName() + "' so Country will not be deleted<br/>";
										}
									} catch (Exception e) {
										resultText += "Country " + countryId + " not found!<br/>";
										e.printStackTrace();
									}
								} else {
									resultText += "City contains at least one more street: '" + cslist.get(0).getName() + "' so City will not be deleted<br/>";
								}
							}
						}
					} else {
						resultText += "Street contains at least one more building: '" + ssBuildings.get(0).getAddressString()
								+ "' so Street will not be deleted<br/>";
					}
					pm.currentTransaction().commit();

				} else {
					resultText = "srcId and dstId parameters must be defined";
				}

			}
		} catch (Exception e) {
			resultText = "EXCEPTION: " + e.getMessage();
			e.printStackTrace();
		} finally {
			arg1.setHeader("Content-Type", "text/html");
			resultText = "<html><head><meta charset=\"utf-8\"/></head><body>" + resultText + "</body></html>";
			arg1.getOutputStream().write(resultText.getBytes());
		}
		/* sendTheResultNotification(arg0, arg1, now, resultText); */
	}

	public void checkDiatanceAndAddTopic(VoTopic topic, List<VoTopic> newTopics, int rad, BigDecimal maxLat, BigDecimal maxLatMaxLongLong) throws InvalidOperation {
		if( VoHelper.calculateRadius( topic, new GeoLocation(maxLatMaxLongLong.toPlainString(),maxLat.toPlainString())) < rad)
			newTopics.add(topic.createCopy(maxLat, maxLatMaxLongLong, null, null));
	}

	private <T> List<T> loadListFromString(String s, T obj) {
		List res = null;
		if (s.startsWith("[") && s.endsWith("]")) {
			s = s.substring(1, s.length() - 1);
		}
		res = new ArrayList<>();
		String[] list = s.split(obj instanceof String ? "[|]" : ",");
		for (String ni : list) {
			ni = ni.trim();
			if (obj instanceof Long) {
				res.add(Long.parseLong(ni.substring(0, ni.length() - 1)));
			} else if (obj instanceof Integer) {
				res.add(Integer.parseInt(ni.substring(0, ni.length() - 1)));
			} else
				res.add(ni.trim());
		}
		return res;
	}

	/*
	 * PersistenceManager pm = PMF.getPm(); pm.setMultithreaded(false);
	 * pm.setIgnoreCache(true); try { VoBuilding vb; VoStreet cs; VoCity vcty;
	 * VoCountry vc; try {
	 * 
	 * Extent<VoUser> users = pm.getExtent(VoUser.class); for (VoUser voUser :
	 * users) { voUser.setLastNotified(0); } pm.makePersistent(users);
	 * 
	 * /*Extent<VoUserGroup> userGroupE = pm.getExtent(VoUserGroup.class); for
	 * (VoUserGroup voUserGroup : userGroupE) {
	 * voUserGroup.setVisibleGroups(null); List<Long> visibleGroups =
	 * voUserGroup.getVisibleGroups(pm);
	 * 
	 * List<VoTopic> topics = executeQuery( pm.newQuery(VoTopic.class,
	 * "userGroupId=="+voUserGroup.getId()) ); for (VoTopic voTopic : topics) {
	 * voTopic.setVisibleGroups( new ArrayList<Long>(visibleGroups) ); }
	 * pm.makePersistentAll(topics); pm.makePersistent(voUserGroup); }
	 * 
	 * 
	 * } catch( Exception e){ e.printStackTrace();
	 * arg1.getOutputStream().write(("Failed to initialize! "
	 * +e.getMessage()).getBytes()); } finally { pm.close(); }
	 * 
	 * } catch( Exception e){ e.printStackTrace();
	 * arg1.getOutputStream().write(("Failed to initialize! "
	 * +e.getMessage()).getBytes()); } finally { pm.close(); } }
	 */
}
