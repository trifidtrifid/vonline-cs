package com.vmesteonline.be.utils;

import java.io.Serializable;

public class CacheHelper<T extends Serializable> {
	
	public static String getKey(String methodName, Object ...objects ){
		String key = methodName;
		for( Object object: objects){
			key += ":" + object;
		}
		return key;
	}
	
}
