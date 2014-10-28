package com.vmesteonline.be.utilityservices;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.SortedMap;
import java.util.TreeMap;
import java.util.TreeSet;

import javax.jdo.PersistenceManager;

import org.apache.thrift.TException;

import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.ServiceImpl;
import com.vmesteonline.be.thrift.VoError;
import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.VoUser;
import com.vmesteonline.be.jdo2.utility.VoCounter;
import com.vmesteonline.be.thrift.utilityservice.Counter;
import com.vmesteonline.be.thrift.utilityservice.CounterType;
import com.vmesteonline.be.thrift.utilityservice.UtilityService.Iface;

public class UtilityServiceImpl extends ServiceImpl implements Iface {

	@Override
	public long registerCounter(Counter newCounter) throws InvalidOperation, TException {
		PersistenceManager pm = PMF.getPm();
		VoUser currentUser = getCurrentUser(pm);
		VoCounter cntr = new VoCounter(
				null == newCounter.getType() ? CounterType.COLD_WATER : newCounter.getType(),
						null == newCounter.getLocation() ? "" : newCounter.getLocation(),
								null == newCounter.getNumber() ? "" : newCounter.getNumber(), currentUser.getAddress());
		pm.makePersistent(cntr);
		return cntr.getId();
	}
	
	

	@Override
	public void updateCounter(Counter updatedCounter) throws InvalidOperation, TException {
		if(0!=updatedCounter.getId()){
			PersistenceManager pm = PMF.getPm();
			try {
				VoCounter cntr = pm.getObjectById(VoCounter.class, updatedCounter.getId());
				cntr.setNumber( updatedCounter.getNumber());
				cntr.setType( updatedCounter.getType());
				cntr.setLocation(updatedCounter.getLocation());
				pm.makePersistent(cntr);
				return;
			} catch (Exception e) {
				throw new InvalidOperation(VoError.IncorrectParametrs, "Failed to update counter: "+updatedCounter.getId() + ":"+e.getMessage());
			}
		}
		throw new InvalidOperation(VoError.IncorrectParametrs, "Failed to update counter, got 0 as ID");
	}



	@Override
	public void removeCounter(long counterId) throws InvalidOperation, TException {
		PersistenceManager pm = PMF.getPm();
		if( 0 != counterId) 
			try{
				pm.deletePersistent( pm.getObjectById(VoCounter.class, counterId));
			} catch (Exception e) {
				throw new InvalidOperation(VoError.IncorrectParametrs, "No counter found by id: "+counterId);
			}
		else 
			throw new InvalidOperation(VoError.IncorrectParametrs, "Failed to delete counter by ID=0");
	}

	public static Comparator<Counter> countersComparator = new Comparator<Counter>() {
		@Override
		public int compare(Counter o1, Counter o2) {
			if( null == o1.getType()) return -1;
			if( null == o2.getType()) return 1;
			int res = o1.getType().compareTo( o2.getType() );
			return res == 0 ? ("" + o1.getLocation() + o1.getNumber()+o1.getId()).compareTo(""+o2.getLocation() + o2.getNumber()+o2.getId()) : res ;
		}
	};
	public static Comparator<VoCounter> voCountersComparator = new Comparator<VoCounter>() {
		@Override
		public int compare(VoCounter o1, VoCounter o2) {
			if( null == o1.getType()) return -1;
			if( null == o2.getType()) return 1;
			int res = o1.getType().compareTo( o2.getType() );
			return res == 0 ? ("" + o1.getLocation() + o1.getNumber()+o1.getId()).compareTo(""+o2.getLocation() + o2.getNumber()+o2.getId()) : res ;
		}
	};

	@Override
	public List<Counter> getCounters() throws InvalidOperation, TException {
		PersistenceManager pm = PMF.getPm();
		List<VoCounter> counters = (List<VoCounter>) pm.newQuery(VoCounter.class, "postalAddressId=="+getCurrentUser(pm).getAddress()).execute();
		List<Counter> outList = new ArrayList<>();
		for (VoCounter voCounter : counters) {
			outList.add( voCounter.getCounter());
		}
		
		Collections.sort(outList, countersComparator);
		return outList;
	}

	@Override
	public Map<Integer, Double> getCounterHistory(long counterId, int fromDate, int toDate) throws InvalidOperation, TException {
		PersistenceManager pm = PMF.getPm();
		try {
			VoCounter cntr = pm.getObjectById(VoCounter.class, counterId);
			if( fromDate > toDate && toDate != 0 )
				return new HashMap<Integer, Double>();
			
			return new TreeMap<Integer,Double>(cntr.getValues()).subMap(fromDate, 0==toDate ? Integer.MAX_VALUE : toDate);
		} catch (Exception e) {
			throw new InvalidOperation(VoError.IncorrectParametrs, "No counter found by id: "+counterId);
		}
	}

	@Override
	public double setCurrentCounterValue(long counterId, double counterValue, int date) throws InvalidOperation, TException {
		PersistenceManager pm = PMF.getPm();
		try {
			VoCounter cntr = pm.getObjectById(VoCounter.class, counterId);
			Map<Integer, Double> values = cntr.getValues();
			double delta = counterValue;
			if( null!=values && values.size()>0 ){
				Integer last = new TreeSet<Integer>( values.keySet() ).last();
				
				if( values.size() > 0 && last < date )
					delta = counterValue - values.get(last);
			}
			
			values.put(date, counterValue);
			cntr.setValues(values);
			pm.makePersistent(cntr);
			return delta;
		} catch (Exception e) {
			throw new InvalidOperation(VoError.IncorrectParametrs, "No counter found by id: "+counterId);
		}
		
	}
	
	public UtilityServiceImpl() {
	}

	public UtilityServiceImpl(String sessId) {
		super(sessId);
	}

}
