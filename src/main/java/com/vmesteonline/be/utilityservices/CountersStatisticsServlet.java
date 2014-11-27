package com.vmesteonline.be.utilityservices;

import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.postaladdress.*;
import com.vmesteonline.be.jdo2.utility.VoCounter;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.utilityservice.CounterType;
import com.vmesteonline.be.utils.CSVHelper;
import com.vmesteonline.be.utils.Defaults;
import com.vmesteonline.be.utils.StorageHelper;
import com.vmesteonline.be.utils.VoHelper;

import javax.jdo.PersistenceManager;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.text.DateFormat;
import java.util.*;

import static com.vmesteonline.be.utils.VoHelper.executeQuery;

@SuppressWarnings("serial")
public class CountersStatisticsServlet extends HttpServlet {

	private static Map<CounterType,String> counterTypeNames;
	static {
		counterTypeNames = new HashMap<CounterType, String>();
		counterTypeNames.put( CounterType.HOT_WATER, "Гор. вода");
		counterTypeNames.put( CounterType.COLD_WATER, "Хол. вода");
		counterTypeNames.put( CounterType.ELECTRICITY, "Эл-во общ.");
		counterTypeNames.put( CounterType.ELECTRICITY_DAY, "Эл-во день");
		counterTypeNames.put( CounterType.ELECTRICITY_NIGHT, "Эл-во ночь");
		counterTypeNames.put( CounterType.GAS, "Газ");
		counterTypeNames.put( CounterType.OTHER, "Другой");
	}
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String addrs = req.getParameter("addr");
		PersistenceManager pm = PMF.getPm();
		long buildingId = 0;
		
		if( null!=addrs) 
		{ 
			buildingId = getBuildingByAddress( addrs, pm );
			
		} else {
			String bids = req.getParameter("bi");
			buildingId = StorageHelper.stringToNumber(bids);
		}
		String ds = req.getParameter("ds");
		if( 0!=buildingId)
			try {
				int date = ds == null ? (int)(System.currentTimeMillis()/1000L) : (int) StorageHelper.stringToNumber(ds);
				Calendar clndr = Calendar.getInstance();
				clndr.setTimeInMillis(((long)date)*1000L);
				
				List<VoPostalAddress> pal = executeQuery(  pm.newQuery( VoPostalAddress.class, "buildingId=="+buildingId) );
				Set<Long> vgs = new HashSet<Long>();
				for (VoPostalAddress pa : pal) {
					vgs.add(pa.getId());
				}
				List<VoPostalAddress> sortedAddresses = new ArrayList<VoPostalAddress>( pal );
				Collections.sort(sortedAddresses, new Comparator<VoPostalAddress>(){
	
					@Override
					public int compare(VoPostalAddress o1, VoPostalAddress o2) {
						return Integer.compare(o1.getFlatNo(), o2.getFlatNo());
					}});
				Set<VoCounter> allCounters = VoHelper.getAllOfSet(vgs, VoCounter.class, "", "postalAddressId", pm);
				
				VoBuilding voBuilding = pm.getObjectById(VoBuilding.class, buildingId);
				List<List<String>> csvData = new ArrayList<List<String>>();
				csvData.add( Arrays.asList( new String[]{ "Показания счетчиков по дому: "+voBuilding.getAddressString()}));
				csvData.add( Arrays.asList( new String[]{ 
						"Номер подъезда", "Этаж", "Номер квартиры", "Тип счетчика", "Номер счетчика", "Место установки", "Текущее значение", "Дата снятия тз", "Предыдущее значение", "Дата снятия пз", "Расход"}));
				DateFormat df = DateFormat.getDateInstance();
				for (VoPostalAddress pa : sortedAddresses) {
					SortedSet<VoCounter> cl = new TreeSet<VoCounter>( UtilityServiceImpl.voCountersComparator );
					for (VoCounter voCounter : allCounters) {
						if( voCounter.getPostalAddressId() == pa.getId() ){
							cl.add(voCounter);
						}
					}
					allCounters.removeAll(cl);
					for (VoCounter voCounter : cl) {
						Map<Integer, Double> values = voCounter.getValues();
						if( null!=values && values.size() > 0){
							TreeMap<Integer,Double> valSorted = new TreeMap<Integer,Double>(values);
							Integer curDate = valSorted.floorKey(date);
							Integer monthAgoDate = valSorted.floorKey(date - 86400 * 30);
							if( monthAgoDate == null )
								monthAgoDate = valSorted.higherKey(date - 86400 * 30);
							if( null!=curDate) {
								csvData.add( Arrays.asList( new String[]{ 
										""+pa.getStaircase(), ""+pa.getFloor(), ""+pa.getFlatNo(), 
										counterTypeNames.get(voCounter.getType()), voCounter.getNumber(), voCounter.getLocation(), 
										""+valSorted.get(curDate),  "" + df.format(new Date( ((long)curDate)*1000L  )),
										""+valSorted.get(monthAgoDate),  "" + df.format(new Date( ((long)monthAgoDate)*1000L  )),
										""+VoHelper.roundDouble( valSorted.get(curDate) - valSorted.get(monthAgoDate), 2)}));
							}
						}
					}
				}
				//write response
				resp.setStatus(HttpServletResponse.SC_OK);
				String fileName = URLEncoder.encode( "uc."+clndr.get(Calendar.YEAR)+"."+clndr.get(Calendar.MONTH)+"."+clndr.get(Calendar.DAY_OF_MONTH)+".csv","UTF-8");
				resp.setContentType("text/csv; filename=uc."+fileName);
				resp.addHeader( "Content-Disposition", "attachment; filename="+fileName);
				
				ServletOutputStream os = resp.getOutputStream();
				CSVHelper.writeCSV( os, csvData, ";", "|", ":");
				os.close();
				
			} catch (Exception e){
				e.printStackTrace();
				resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
				OutputStream os = resp.getOutputStream();
				os.write((e instanceof InvalidOperation ? ((InvalidOperation)e).why : e.getMessage()).getBytes());
				os.close();
			}
		else {
			resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
			OutputStream os = resp.getOutputStream();
			os.write("Адрес не найден".getBytes("UTF-8"));
			os.close();
		}
	}

	private long getBuildingByAddress(String addrs, PersistenceManager pm) {
		try {
			AddressInfo addr = VoGeocoder.resolveAddressString( Defaults.COUNTRY + " "+addrs );
			if( !addr.isExact() || !addr.isKindHouse() )
				return 0;
			
			VoCountry country = VoCountry.createVoCountry( addr.getCountryName(), pm);
			VoCity city = VoCity.createVoCity(country, addr.getCityName(), pm);
			VoStreet vs = VoStreet.createVoStreet(city, addr.getStreetName(), pm);
			VoBuilding vb = VoBuilding.createVoBuilding(addr.getZipCode(), vs, addr.getBuildingNo(), addr.getLongitude(), addr.getLattitude(), pm);
			return vb.getId();
		} catch (InvalidOperation e) {
			e.printStackTrace();
			return 0;
		}
	}
}
