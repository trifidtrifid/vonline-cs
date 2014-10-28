package com.vmesteonline.be.utils;

import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.VoError;
import org.apache.log4j.Logger;

import java.io.IOException;
import java.io.OutputStream;
import java.lang.reflect.Field;
import java.nio.charset.Charset;
import java.util.*;
import java.util.Map.Entry;

public class CSVHelper {

	private static Logger logger = Logger.getLogger(CSVHelper.class.getName());

	public static <T> List<T> loadCSVData(/* InputStream is */byte[] data, Map<Integer, String> fieldPosMap, T otf) throws IOException {
		return CSVHelper.loadCSVData(data, fieldPosMap, otf, null, null, null);
	}

	public static List<List<String>> parseCSV(byte[] data, String fieldDelim, String setDelim, String avpDelim) throws IOException {
		List<List<String>> res = new ArrayList<List<String>>();
		String fd = null == fieldDelim ? ";" : fieldDelim;
		String sd = null == setDelim ? "|" : setDelim;
		String avpd = null == avpDelim ? ":" : avpDelim;

		List<String> lines = readLines(data);
		for (String nextLine : lines) {
			ArrayList<String> lineCols = new ArrayList<String>();
			String[] items = nextLine.split("[" + fd + "]", -500);
			int delimSkipped = 0;
			for (int pos = 0; pos < items.length; pos++) {

				String nextItem = items[pos].replaceAll("[\\p{Cc}\\p{Cf}\\p{Co}\\p{Cn}]", "");
				if (nextItem.trim().startsWith("\"") && !nextItem.trim().endsWith("\"")) {
					for (pos++; pos < items.length; pos++) {
						delimSkipped++;
						nextItem += fd + items[pos];
						if (items[pos].trim().endsWith("\""))
							break;
					}
				}
				nextItem = nextItem.trim();
				if (nextItem.startsWith("\""))
					nextItem = nextItem.substring(1);
				if (nextItem.endsWith("\""))
					nextItem = nextItem.substring(0, nextItem.length() - 1);

				lineCols.add(nextItem);
			}
			if (lineCols.size() > 0)
				res.add(lineCols);
		}

		return res;
	}

	public static <T> List<T> loadCSVData(/* InputStream is */byte[] data, Map<Integer, String> fieldPosMap, T otf, String fieldDelim, String setDelim,
			String avpDelim) throws IOException {
		List<T> rslt = new ArrayList<T>();

		String fd = null == fieldDelim ? ";" : fieldDelim;
		String sd = null == setDelim ? "|" : setDelim;
		String avpd = null == avpDelim ? ":" : avpDelim;

		String fieldName;
		List<String> lines = readLines(data);// is);
		try {
			for (String nextLine : lines) {
				T nextOtf = (T) otf.getClass().getConstructor(new Class[] {}).newInstance(new Object[] {});
				String[] items = nextLine.split("[" + fd + "]");
				int delimSkipped = 0;
				for (int pos = 0; pos < items.length; pos++) {
					if (null != (fieldName = fieldPosMap.get(pos - delimSkipped))) {
						Field field = otf.getClass().getField(fieldName);
						String nextItem = items[pos].replaceAll("[\\p{Cc}\\p{Cf}\\p{Co}\\p{Cn}]", "");
						if (nextItem.trim().startsWith("\"") && !nextItem.trim().endsWith("\"")) {
							for (pos++; pos < items.length; pos++) {
								delimSkipped++;
								nextItem += fd + items[pos];
								if (items[pos].trim().endsWith("\""))
									break;
							}
						}
						nextItem = nextItem.trim();
						if (nextItem.startsWith("\""))
							nextItem = nextItem.substring(1);
						if (nextItem.endsWith("\""))
							nextItem = nextItem.substring(0, nextItem.length() - 1);

						Object fo = field.get(nextOtf);
						if (null == fo) { // try to create fo by default constructor
							if (field.getType() == List.class)
								fo = new ArrayList();
							else if (field.getType() == Set.class)
								fo = new HashSet();
							else if (field.getType() == Map.class)
								fo = new HashMap();
							else if (field.getType().getSuperclass() == Number.class) {
								fo = field.getType().getConstructor(new Class[] { String.class }).newInstance(new Object[] { "0" });
							} else {
								fo = field.getType().getConstructor(new Class[] {}).newInstance(new Object[] {});
							}
							field.set(nextOtf, fo);
						}
						if (nextItem.trim().length() > 0)
							try {
								if (fo instanceof Double)
									field.set(nextOtf, Double.parseDouble(nextItem));
								else if (fo instanceof Integer)
									field.set(nextOtf, Integer.parseInt(nextItem));
								else if (fo instanceof Boolean) {
									field.set(nextOtf, Boolean.parseBoolean(nextItem));
									try {
										field.set(nextOtf, Integer.parseInt(nextItem) != 0);
									} catch (NumberFormatException nfe) {
									}
								} else if (fo instanceof Long)
									field.set(nextOtf, Long.parseLong(nextItem));
								else if (fo instanceof Float)
									field.set(nextOtf, Float.parseFloat(nextItem));
								else if (fo instanceof String)
									field.set(nextOtf, nextItem);
								else if (fo instanceof Set) {
									String[] setItems = nextItem.split("[" + sd + "]");
									for (String string : setItems) {
										if ((string = string.trim()).length() > 0)
											((Set) fo).add(string);
									}
								} else if (fo instanceof List) {
									String[] setItems = nextItem.split("[" + sd + "]");
									for (String string : setItems) {
										if ((string = string.trim()).length() > 0)
											((List) fo).add(string);
									}
								} else if (fo instanceof Map) {
									String[] setItems = nextItem.split("[" + sd + "]");
									for (String string : setItems) {
										String[] avp = string.split("[" + avpd + "]");
										if (avp.length > 1 && (avp[0] = avp[0].trim()).length() > 0 && (avp[1] = avp[1].trim()).length() > 0)
											((Map) fo).put(avp[0], avp[1]);
									}
								}
							} catch (Throwable t) {
								t.printStackTrace();
								String errStr = "Failed to parse data Filed:" + fieldName + " could not be filled with:'" + nextItem + "' content. Line was: '"
										+ nextLine + "'. Exception:" + t.getMessage();
								logger.error(errStr);
								throw new InvalidOperation(VoError.IncorrectParametrs, errStr);
							}
					} else {
						continue;
					}
				}
				rslt.add(nextOtf);
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new IOException("Failed to reda data. " + e.getMessage(), e);
		}
		return rslt;
	}

	// =====================================================================================================================
	public static <T> void writeCSV(OutputStream os, List<List<T>> matrixToWrite, String fieldDelim, String setDelim, String avpDelim)
			throws IOException {
		String fd = null == fieldDelim ? ";" : fieldDelim;
		String sd = null == setDelim ? "|" : setDelim;
		String avpd = null == avpDelim ? ":" : avpDelim;

		for (List<T> row : matrixToWrite) {
			boolean isFirst = true;
			for (T col : row) {
				if (isFirst) {
					isFirst = false;
				} else {
					os.write(fd.getBytes(Charset.forName("Cp1251")));
				}
				os.write(writeFieldToCSVCell(col, fd, sd, avpDelim).getBytes(Charset.forName("Cp1251")));
			}
			os.write("\r\n".getBytes(Charset.forName("Cp1251")));
		}
	}

	// =====================================================================================================================

	public static <T> void writeCSVData(OutputStream os, Map<Integer, String> fieldsMap, List<T> listToRead, List<List<String>> fieldsToFill)
			throws IOException, InvalidOperation {
		writeCSVData(os, fieldsMap, listToRead, fieldsToFill, null, null, null);
	}

	// ====================================================================================================================
	/**
	 * MEthod writes a list of object 'listToRead'. Fields of object are written
	 * in order that is determined by 'fieldsMap'
	 * 
	 * @param os
	 *          stream to write csv data to
	 * @param fieldsMap
	 *          map that determines the order of fields according to field name
	 * @param listToRead
	 *          list of objects to wrote
	 * @param fieldsToFill
	 *          list of fields that should be written
	 * @param fieldDelim
	 *          csv delimiter
	 * @param setDelim
	 *          delimiter that used to write a set into a cell
	 * @param avpDelim
	 *          delimiter that used to write a key-value cell
	 * @throws IOException
	 *           thrown if can't write
	 * @throws InvalidOperation
	 *           thrown if a data is invalid
	 */
	public static <T> void writeCSVData(OutputStream os, Map<Integer, String> fieldsMap, List<T> listToRead, List<List<String>> fieldsToFill,
			String fieldDelim, String setDelim, String avpDelim) throws IOException, InvalidOperation {

		if (fieldsMap.size() == 0)
			throw new InvalidOperation(VoError.IncorrectParametrs, "At least one field must be selected to produce report");

		String fd = null == fieldDelim ? ";" : fieldDelim;
		String sd = null == setDelim ? "|" : setDelim;
		String avpd = null == avpDelim ? ":" : avpDelim;

		Collection<Object> fieldNames = new ArrayList<Object>();
		;
		if (null != fieldsMap) {
			SortedMap<Integer, String> sortedFields = new TreeMap<Integer, String>();
			sortedFields.putAll(fieldsMap);
			fieldNames.addAll(sortedFields.values());
		}

		int maxLineLength = 0;
		try {
			for (T objectToWrite : listToRead) {
				String lineStr = "";

				ArrayList<String> nextFieldsLine = null;
				if (null != fieldsToFill) {
					nextFieldsLine = new ArrayList<String>();
					fieldsToFill.add(nextFieldsLine);
				}

				if (fieldsMap == null) {
					fieldNames.clear();
					fieldNames.addAll(Arrays.asList(objectToWrite.getClass().getFields()));
				}
				int lineLength = 0;
				for (Object value : fieldNames) {
					lineStr += fd;
					String outStr = "";
					Field field = value instanceof Field ? (Field) value : objectToWrite.getClass().getField(value.toString());
					Object fieldToWrite = field.get(objectToWrite);
					if (null != fieldToWrite) {
						outStr = writeFieldToCSVCell(fieldToWrite, fd, sd, avpd);

						if (nextFieldsLine != null) {
							nextFieldsLine.add(outStr);
							lineLength++;
						}

						lineStr += outStr;
					}
				}
				if (lineLength > maxLineLength)
					maxLineLength = lineLength;

				os.write((lineStr.substring(fd.length()) + "\n").getBytes(Charset.forName("Cp1251")));
			}
			// arrange all lines to be the same size
			if (null != fieldsToFill)
				for (List<String> line : fieldsToFill) {
					while (line.size() < maxLineLength)
						line.add("");
				}
		} catch (Exception e) {
			e.printStackTrace();
			throw new IOException("Failed to write CSV:" + e.getMessage(), e);
		}
	}

	// =====================================================================================================================

	private static String writeFieldToCSVCell(Object fieldToWrite, String fieldDelim, String setDelim, String avpDelim) {
		String outStr;

		String fd = null == fieldDelim ? ";" : fieldDelim;
		String sd = null == setDelim ? "|" : setDelim;
		String avpd = null == avpDelim ? ":" : avpDelim;

		if (fieldToWrite instanceof Number) {
			outStr = quoteCell(trimFloatPointAsString(fieldToWrite.toString()), fd, sd, avpd);

		} else if (fieldToWrite instanceof Set || fieldToWrite instanceof List) {
			outStr = "";
			for (Object object : (Collection) fieldToWrite) {
				outStr += sd + quoteCell(writeFieldToCSVCell(object, fd, sd, avpd), fd, sd, avpd);
			}
			if (outStr.length() >= sd.length())
				outStr = outStr.substring(sd.length());

		} else if (fieldToWrite instanceof Map) {
			outStr = "";
			for (Object en : ((Map) fieldToWrite).entrySet()) {
				outStr += sd + quoteCell(writeFieldToCSVCell(((Entry) en).getKey(), fd, sd, avpd), fd, sd, avpd) + avpd
						+ quoteCell(writeFieldToCSVCell(((Entry) en).getValue(), fd, sd, avpd), fd, sd, avpd);
			}
			if (outStr.length() >= sd.length())
				outStr = outStr.substring(sd.length());
		} else {
			outStr = quoteCell(fieldToWrite.toString(), fd, sd, avpd);
		}
		return outStr;
	}

	private static String quoteCell(String outStr, String fd, String sd, String avpd) {
		if (outStr.contains(fd) || outStr.contains(sd) || outStr.contains(avpd))
			outStr = "\"" + outStr + "\"";
		return outStr;
	}

	// =====================================================================================================================

	private static String trimFloatPointAsString(String floatPointAsString) {
		int delP;
		if ((delP = floatPointAsString.indexOf('.')) != -1) {
			if (delP < floatPointAsString.length() - 4) {
				floatPointAsString = floatPointAsString.substring(0, delP + 4);
			}
			while (floatPointAsString.length() > delP + 2 && floatPointAsString.endsWith("0"))
				floatPointAsString = floatPointAsString.substring(0, floatPointAsString.length() - 2);
		}
		return floatPointAsString;
	}

	// ====================================================================================================================
	/*public static <T> SortedMap<Integer, String> getFieldsMap(T instance, ExchangeFieldType id, Map<Integer, ExchangeFieldType> requiredFields)
			throws InvalidOperation {
		SortedMap<Integer, String> fmap = new TreeMap<Integer, String>();
		Field[] fields = instance.getClass().getFields();
		int i = 0;
		for (Entry<Integer, ExchangeFieldType> fte : requiredFields.entrySet()) {
			int idx = fte.getValue().getValue() - id.getValue();
			if (idx >= 0 && idx < fields.length) {
				fmap.put(fte.getKey(), fields[idx].getName());
			} else {
				throw new InvalidOperation(VoError.IncorrectParametrs, "Field[" + fte.getValue().name() + "] is not described in the class or id["
						+ id.name() + "] is incorrect");
			}
		}
		return fmap;
	}*/

	// ====================================================================================================================
	private static List<String> readLines(byte[] buf) throws IOException {

		List<String> lines = new ArrayList<String>();
		int lastPos = 0, pos = 0;
		lastPos = 0;
		if (buf.length > 0)
			do {
				char c;
				if (pos == buf.length || (c = (char) buf[pos]) == '\n' || c == '\r') {

					String nl = new String(buf, lastPos, pos - lastPos, Charset.forName("Cp1251"));
					if (nl.trim().length() > 0)
						lines.add(nl);

					// skip emptyLines
					for (lastPos = pos; lastPos + 1 < buf.length/* read */&& (buf[lastPos] == '\r' || buf[lastPos] == '\n'); lastPos++)
						pos = lastPos;
				}
				if (pos++ == buf.length)
					break;

			} while (true);

		if (lastPos != pos && lastPos < buf.length) {
			String nl = new String(buf, lastPos, pos - lastPos);
			if (nl.trim().length() > 0)
				lines.add(nl);
		}
		return lines;
	}
}
