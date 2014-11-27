package com.vmesteonline.be.utils;

import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.GeoLocation;
import com.vmesteonline.be.jdo2.VoInitKey;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.MatrixAsList;
import com.vmesteonline.be.thrift.VoError;
import org.apache.log4j.Logger;

import javax.jdo.Extent;
import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import java.io.IOException;
import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
import java.util.Map.Entry;

public class VoHelper {

	public static final Logger logger = Logger.getLogger(VoHelper.class);
	public static BigDecimal earthRadius = new BigDecimal(6378137);

	// (180.0 / Math.PI) = 57,29577952383886
	public static BigDecimal degInRad = new BigDecimal("57.29577952");

	// (Pi * R) / 180
	private static BigDecimal piR = new BigDecimal("111319.4907932736");

	// (dLong * Math.cos(Math.PI * latitude/180) * PI * R) / (180 ) - в метрах по широте
	// (dLat * Pi * R) / 180 - в метрах по долготе

	public static boolean isInclude(GeoLocation a, int radius, GeoLocation b) {

		if (VoHelper.getLongitudeMax(a.getLongitude(),a.getLatitude(), radius).compareTo(b.getLongitude()) >= 0)
			if (VoHelper.getLongitudeMin(a.getLongitude(),a.getLatitude(), radius).compareTo(b.getLongitude()) <= 0)
				if (VoHelper.getLatitudeMax(a.getLatitude(), radius).compareTo(b.getLatitude()) >= 0)
					if (VoHelper.getLatitudeMin(a.getLatitude(), radius).compareTo(b.getLatitude()) <= 0)
						return true;
		return false;
	}

	public static int findMinimumGroupRadius(GeoLocation a, GeoLocation b) {

		if (!isInclude(a, Defaults.radiusZero, b)) {
			if (!isInclude(a, Defaults.radiusBuilding, b)) {
				if (!isInclude(a, Defaults.radiusNeighbors, b)) {
/*					if (!isInclude(a, Defaults.radiusMedium, b)) {
						if (!isInclude(a, Defaults.radiusLarge, b)) {
*/							return 100000;
						} else
/*							return Defaults.radiusLarge;
					} else
						return Defaults.radiusMedium;
				} else
*/					return Defaults.radiusNeighbors;
			} else
				return Defaults.radiusBuilding;
		} else
			return Defaults.radiusZero;

	}

	// TODO этот метод не используется. Метод принимает 2 координаты, и определяет расстояние между ними. Почему то, этот метод дает погрешность по
	// сравнению с методом который генерирует дельту
	public static int calculateRadius(GeoLocation a, GeoLocation b) {

		BigDecimal deltaLat = a.getLongitude().subtract(b.getLongitude()).abs();
		BigDecimal deltaLong = a.getLatitude().subtract(b.getLatitude()).abs();

		int rLat = deltaLong.multiply(piR).intValue();

		BigDecimal avgLat = a.getLatitude().add(b.getLatitude());
		avgLat = avgLat.divide(new BigDecimal(2));
		BigDecimal cos = new BigDecimal(Math.cos(Math.PI * avgLat.doubleValue() / 180D));

		int rLong = deltaLat.multiply(cos).multiply(piR).intValue();

		int maxRadius = rLong > rLat ? rLong : rLat;
		if (maxRadius == 0 && (a.getLongitude().compareTo(b.getLongitude()) != 0 || a.getLatitude().compareTo(b.getLatitude()) != 0))
			return Defaults.radiusBuilding;

		return maxRadius;
	}

	// (radius/earthRadius) * (180.0 / Math.PI)
	public static BigDecimal getLongitudeMax(BigDecimal longitude, BigDecimal lattitude, int radius) {
		BigDecimal tmp = getLongDelta(lattitude, radius);
		return longitude.add(tmp).setScale(7, RoundingMode.HALF_UP);
	}

	public static BigDecimal getLongitudeMin(BigDecimal longitude, BigDecimal lattitude, int radius) {
		BigDecimal tmp = getLongDelta(lattitude, radius);
		return longitude.subtract(tmp).setScale(7, RoundingMode.HALF_UP);
	}

	private static BigDecimal getLatDelta(int radius) {
		BigDecimal r = new BigDecimal(radius);
		BigDecimal tmp = r.divide(earthRadius, 10, RoundingMode.HALF_UP);
		tmp = tmp.multiply(degInRad);
		return tmp;
	}

	// (radius / (earthRadius * Math.cos(Math.PI * latitude/180)) * (180.0 / Math.PI);
	public static BigDecimal getLatitudeMin(BigDecimal latitude, int radius) {
		BigDecimal tmp = getLatDelta(radius);
		return latitude.subtract(tmp).setScale(7, RoundingMode.HALF_UP);
	}

	public static BigDecimal getLatitudeMax(BigDecimal latitude, int radius) {
		BigDecimal tmp = getLatDelta(radius);
		return latitude.add(tmp).setScale(7, RoundingMode.HALF_UP);
	}

	private static BigDecimal getLongDelta(BigDecimal latitude, int radius) {
		
		double cosVal = Math.cos(Math.PI * latitude.doubleValue() / 180D);
		BigDecimal r = new BigDecimal(radius);
		BigDecimal tmp = earthRadius.multiply(new BigDecimal(cosVal));
		tmp = r.divide(tmp, 10, RoundingMode.HALF_UP);
		tmp = tmp.multiply(degInRad);
		return tmp;
	}

	// ===================================================================================================================
	public static void copyIfNotNull(Object owner, String fieldName, Object objToCopy) throws NoSuchFieldException {
		if (null != objToCopy && objToCopy instanceof Number && ((Number)objToCopy).doubleValue() != 0.0 ) {
			Field field = null;
			try {
				field = owner.getClass().getField(fieldName);
			} catch (SecurityException | NoSuchFieldException e1) {
				//field is not accessible directly
			}
			try {
				if (null != field && field.isAccessible()){
					if( !objToCopy.equals( field.get(owner)))
						field.set(owner, objToCopy);
					
				} else {
					//get an old value
					Method getMethod = null;
					try {
						getMethod = owner.getClass().getMethod("get" + Character.toUpperCase(fieldName.charAt(0)) + fieldName.substring(1),
								new Class[] { });
					} catch (SecurityException | NoSuchMethodException e2) {
					}
					//if changed
					if( null != getMethod && !objToCopy.equals( getMethod.invoke(owner, new Object[] { }))){
						Method setMethod = owner.getClass().getMethod("set" + Character.toUpperCase(fieldName.charAt(0)) + fieldName.substring(1),
								new Class[] { objToCopy.getClass() });
						setMethod.invoke(owner, new Object[] { objToCopy });
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
				throw new NoSuchFieldException("Failed to set. " + e.getMessage());
			}
		}
	}

	// ===================================================================================================================

	public static void replaceURL(Object owner, String fieldName, String newUrl, long userId, boolean isPublic, PersistenceManager _pm)
			throws NoSuchFieldException {
		if (null != newUrl) {
			String oldVal = null;
			try {
				Field field = null;
				try {
					field = owner.getClass().getField(fieldName);
					if (field.isAccessible())
						oldVal = field.get(owner).toString();
					if(newUrl.equals(field)) return; //is changed
					
				} catch (Exception e) {

					Method method = owner.getClass().getMethod("get" + Character.toUpperCase(fieldName.charAt(0)) + fieldName.substring(1), new Class[] {});
					oldVal = (String) method.invoke(owner, new Object[] {});
				}
				String newStorageUrl;
				if (null == oldVal) { // old URL was not set
					newStorageUrl = StorageHelper.saveImage(newUrl, userId, isPublic, _pm);
				} else {
					newStorageUrl = StorageHelper.replaceImage(newUrl, oldVal, userId, isPublic, _pm);
				}

				if (null == field) {
					Method method = owner.getClass().getMethod("set" + Character.toUpperCase(fieldName.charAt(0)) + fieldName.substring(1),
							new Class[] { newStorageUrl.getClass() });
					method.invoke(owner, new Object[] { newStorageUrl });
				} else
					field.set(owner, newStorageUrl);

			} catch (Exception e) {
				e.printStackTrace();
				throw new NoSuchFieldException("Failed to reset URL: " + e.getMessage());
			}
		}
	}

	// ===================================================================================================================
	public static <A, B> Map<A, B> convertMap(Map<String, String> mapIn, Map<A, B> mapOut, A a, B b) {
		if (null != mapIn) {
			for (Iterator<Entry<String, String>> iterator = mapIn.entrySet().iterator(); iterator.hasNext();) {
				Entry<String, String> e = iterator.next();
				Object key, value;
				if (a instanceof Long)
					key = Long.parseLong(e.getKey());
				else if (a instanceof Integer)
					key = Integer.parseInt(e.getKey());
				else if (a instanceof Byte)
					key = Byte.parseByte(e.getKey());
				else if (a instanceof Double)
					key = Double.parseDouble(e.getKey());
				else if (a instanceof Float)
					key = Float.parseFloat(e.getKey());
				else
					key = e.getKey();

				if (b instanceof Long)
					value = Long.parseLong(e.getValue());
				else if (b instanceof Integer)
					value = Integer.parseInt(e.getValue());
				else if (b instanceof Byte)
					value = Byte.parseByte(e.getValue());
				else if (b instanceof Double)
					value = Double.parseDouble(e.getValue());
				else if (b instanceof Float)
					value = Float.parseFloat(e.getValue());
				else
					value = e.getValue();

				mapOut.put((A) key, (B) value);
			}
		} else {
			return null;
		}
		return mapOut;
	}

	// ===================================================================================================================
	public static <T> List<T> convertSet(List<String> inList, ArrayList<T> outList, T b) {
		if (null != inList) {
			Object value;
			for (String e : inList) {
				if (b instanceof Long)
					value = Long.parseLong(e);
				else if (b instanceof Integer)
					value = Integer.parseInt(e);
				else if (b instanceof Byte)
					value = Byte.parseByte(e);
				else if (b instanceof Double)
					value = Double.parseDouble(e);
				else if (b instanceof Float)
					value = Float.parseFloat(e);
				else
					value = e;
				outList.add((T) value);
			}
		} else {
			return null;
		}
		return outList;
	}

	/*
	 * ============================================================================ =================================== //Method converts list of I
	 * object from list inList to list of O objects using mutation method of O object that //tooks I objects and has name get<O.simpleName()>
	 */

	public static <I, O> List<O> convertMutableSet(Iterable<I> inList, List<O> outList, O o) throws InvalidOperation {
		return convertMutableSet( inList, outList, o, null );
	}
//===================================================================================================================
	public static <I, O> List<O> convertMutableSet(Iterable<I> inList, List<O> outList, O o, PersistenceManager pm) throws InvalidOperation {
		if (null == inList)
			return null;
		if (!inList.iterator().hasNext())
			return outList;
		I i0 = inList.iterator().next();
		try {
			if(null!=pm) {
				Method method = i0.getClass().getMethod("get" + o.getClass().getSimpleName(), new Class[] { PersistenceManager.class });
				for (I i : inList) {
					O obj = (O) method.invoke(i, pm);
					if(null!=obj) outList.add(obj);
				}
			} else {
				Method method = i0.getClass().getMethod("get" + o.getClass().getSimpleName(), new Class[] { });
				for (I i : inList) {
					O obj = (O) method.invoke(i);
					if(null!=obj) outList.add(obj);
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			throw new InvalidOperation(VoError.GeneralError, "Class " + i0.getClass().getSimpleName() + " have no acccesible method get"
					+ o.getClass().getSimpleName());
		}
		return outList;
	}
	// ===================================================================================================================
	public static <T> Map<Integer,T> listToMap( Collection<T> col ){
		int i=0;
		Map<Integer,T> res = new TreeMap<Integer, T>();
		for (T t : col) {
			res.put(i++, t);
		}
		return res;
	}
//===================================================================================================================
	public static void forgetAllPersistent(Class cl, PersistenceManager pm){
		Extent extent = pm.getExtent(cl);
		for (Object object : extent) {
			try {
				pm.deletePersistent(object);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
//===================================================================================================================
	public static double roundDouble(double quantity, int scale) {
		BigDecimal valOfQuantity = BigDecimal.valueOf( quantity );
		valOfQuantity = valOfQuantity.setScale(scale,BigDecimal.ROUND_HALF_UP);
		return valOfQuantity.doubleValue();
	}

	//===================================================================================================================
	public static MatrixAsList matrixToList( List < List <String> > matrix ){
		List<String> list = new ArrayList<String>();
		
		if(0!=matrix.size()){
			int maxRowLen = 0;
			for( int row = 0; row < matrix.size(); row ++)
				if( maxRowLen < matrix.get(row).size() )
					maxRowLen = matrix.get(row).size();
			
			for( int row = 0; row < matrix.size(); row ++) {
		
				List<String> rowVal = matrix.get(row);
				
				for (String val : rowVal) {
					if( !list.add( null == val ? "" : val)) {
						throw new RuntimeException( "Implemetation ERROR! Collection must support add method without check of elemnts uniqueless!");
					}
				}
				while(0 != list.size() % maxRowLen)
					list.add("");
			}
		}
		return new MatrixAsList(matrix.size(), list);
	}
	//===================================================================================================================	
	public static List < List <String> > listToMatrix( MatrixAsList mas ){
		List < List <String> > matrix = new ArrayList<List<String>>();
		int rowLen = mas.getElemsSize() / mas.rowCount;
		for( int row = 0; row < mas.rowCount; row ++ ){
			matrix.add(new ArrayList<String>( mas.elems.subList(row * rowLen, (row + 1) * rowLen )));
		}
		return matrix;
	}

	public static<T> List<List<T>> transMatrix(List<List<T>> matrix) {
		
		int ocols  = matrix.size();
		int orows = ocols > 0 ? matrix.get(0).size() : 0;
		
		List<List<T>> out = new ArrayList<List<T>>(orows);
		for( int row = 0; row < orows; row++){
			out.add(new ArrayList<T>(ocols));
			List<T> nextORow = out.get(row);
			for( int col = 0; col < ocols; col++){
				nextORow.add( matrix.get(col).get(row));
			}
		}
		return out;
	}
	
	public static class CacheObjectUnit<T> implements Serializable {
		public int timestamp;
		public T object;
		public CacheObjectUnit(int timestamp, T object) {
			this.timestamp = timestamp;
			this.object = object;
		}
	}
	
	public static boolean checkInitKey( String key ){
		PersistenceManager pm = PMF.getPm();

		VoInitKey vik = VoInitKey.getVoInitKey(pm);
		boolean result = vik.getCode().equals(key);
		vik.resetCode();
		pm.makePersistent(vik);
		if(!result){
			try {
				EMailHelper.sendSimpleEMail("info@vmesteonline.ru", "initialization code", vik.getCode());
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return result;
	}

	public static final String passwordCharSet = "ABCDEFJHJKLMNPQRSTUVWXYZabcdefjhijkmnpqrstuvwxyz23456789"; // characters to choose from
	
	public static String generatePassword( ) {
		return generatePassword(8);
	}

	public static final String lettersCharSet = "ABCDEFJHJKLMNPQRSTUVWXYZ"; // characters to choose from
	public static final String digitsCharSet = "23456789"; // characters to choose from

	public static String generateCode(int letters, int digits) {
		StringBuilder sb = new StringBuilder();
		Random rand = new Random(System.nanoTime());
		for (int i = 0; i < letters; i++) {
			int k = rand.nextInt(lettersCharSet.length()); // random number between 0 and set.length()-1 inklusive
			sb.append(lettersCharSet.charAt(k));
		}
		for (int i = 0; i < digits; i++) {
			int k = rand.nextInt(digitsCharSet.length()); // random number between 0 and set.length()-1 inklusive
			sb.append(digitsCharSet.charAt(k));
		}
		return sb.toString();
	}

	public static String generatePassword(int n) {
		StringBuilder sb = new StringBuilder();
		Random rand = new Random(System.nanoTime());
		for (int i = 0; i < n; i++) {
			int k = rand.nextInt(passwordCharSet.length()); // random number between 0 and set.length()-1 inklusive
			sb.append(passwordCharSet.charAt(k));
		}
		return sb.toString();
	}
	public static long getMaxPassValue(int len){
		return (long)Math.pow( (double)passwordCharSet.length(), (double)len);
	}
	public static long passwordToLong(String passCode){
		long passValue = 0L;
		for( int cp=passCode.length()-1; cp>=0; cp--){
			passValue = passValue * passwordCharSet.length() + passwordCharSet.indexOf(passCode.charAt(cp));
		}
		return passValue;
	}

	public static <T> Set<T> getAllOfSet(Set<Long> vgs, Class<T> clazz, String condition, String idName, PersistenceManager pm) {
		Set<T> vus = new HashSet<T>();
		boolean condSet = null != condition && condition.trim().length() > 0;
		if (null != vgs) {
			String glist = "";
			int i = 0;
			for (Long gid : vgs) {
				glist += "|| " + idName + "==" + gid;
				i++;
				if (i == vgs.size() || i > 0 && 0 == i % 20) {
					vus.addAll( executeQuery( pm.newQuery(clazz, condSet ? condition + " && (" + glist.substring(2) + ")" : glist.substring(2))));
					glist = "";
				}
			}
		} else {
			vus.addAll((List<T>) pm.newQuery(clazz).execute());
		}
		return vus;
	}

	public static final int executeQueryRetryLimit = 3;
	public static <T> T executeQuery( Query q, Object... params ){
		int tl = executeQueryRetryLimit;
		while(tl>0)
			try {
				//i think it's beter then use reflection
				if( params.length == 0) return (T)q.execute( );
				if( params.length == 1) return (T)q.execute(params[0]);
				if( params.length == 2) return (T)q.execute(params[0],params[1]);
				if( params.length == 3) return (T)q.execute(params[0],params[1],params[2]);

			} catch (NullPointerException e) {
				logger.warn("Got NPE on execute. Try again:"+tl--,e);
			}
		return null;
	}
}
