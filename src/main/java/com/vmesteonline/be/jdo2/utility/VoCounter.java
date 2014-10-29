package com.vmesteonline.be.jdo2.utility;

import com.vmesteonline.be.thrift.utilityservice.Counter;
import com.vmesteonline.be.thrift.utilityservice.CounterType;

import javax.jdo.annotations.*;
import java.util.HashMap;
import java.util.Map;
import java.util.SortedMap;
import java.util.TreeMap;


@PersistenceCapable
@Index(name = "paid_idx", members = {"postalAddressId"})
public class VoCounter {
	
	public VoCounter(CounterType type, String location, String number, long postalAddressId) {
		super();
		this.type = type;
		this.location = location;
		this.number = number;
		this.postalAddressId = postalAddressId;
		this.values = new HashMap<Integer, Double>();
	}
	
	public void setValues(Map<Integer, Double> values) {
		this.values = values;
	}

	public CounterType getType() {
		return type;
	}

	public void setType(CounterType type) {
		this.type = type;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public Long getId() {
		return id;
	}

	public String getLocation() {
		return location;
	}
	
	
	public Map<Integer, Double> getValues() {
		if (null == values){
			setValues(new TreeMap<Integer,Double>());
		} 
		return values;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public long getPostalAddressId() {
		return postalAddressId;
	}

	@PrimaryKey
	@Persistent(valueStrategy = IdGeneratorStrategy.INCREMENT)
	private Long id;

	@Persistent
	private CounterType type;
	
	@Persistent
	private String location;
	
	@Persistent
	private String number;
	
	@Persistent
	private long postalAddressId;
	
	@Persistent
	private Map<Integer,Double> values;

	public Counter getCounter() {
		if( null==values )
			return new Counter(id, location, type, number,  0.0);
		
		SortedMap<Integer,Double> vm = new TreeMap<Integer,Double>(values);
		return new Counter(id, location, type, number, 
				0 == vm.size() ? 0.0 : vm.get(vm.lastKey()));
	}
}
