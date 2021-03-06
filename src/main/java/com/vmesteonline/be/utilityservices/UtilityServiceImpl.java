package com.vmesteonline.be.utilityservices;

import com.vmesteonline.be.ServiceImpl;
import com.vmesteonline.be.data.PMF;
import com.vmesteonline.be.jdo2.VoUser;
import com.vmesteonline.be.jdo2.postaladdress.VoBuilding;
import com.vmesteonline.be.jdo2.postaladdress.VoPostalAddress;
import com.vmesteonline.be.jdo2.utility.VoCounter;
import com.vmesteonline.be.jdo2.utility.VoCounterService;
import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.ServiceType;
import com.vmesteonline.be.thrift.VoError;
import com.vmesteonline.be.thrift.utilityservice.Counter;
import com.vmesteonline.be.thrift.utilityservice.CounterService;
import com.vmesteonline.be.thrift.utilityservice.CounterType;
import com.vmesteonline.be.thrift.utilityservice.UtilityService;
import org.apache.thrift.TException;


import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.servlet.http.HttpServletRequest;
import java.util.*;

import static com.vmesteonline.be.utils.VoHelper.executeQuery;

public class UtilityServiceImpl extends ServiceImpl implements UtilityService.Iface {

    @Override
    public long registerCounter(Counter newCounter) throws TException {
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
    public void updateCounter(Counter updatedCounter) throws TException {
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
    public void removeCounter(long counterId) throws TException {
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
    public List<Counter> getCounters() throws TException {
        PersistenceManager pm = PMF.getPm();
        List<VoCounter> counters = executeQuery(  pm.newQuery(VoCounter.class, "postalAddressId=="+getCurrentUser(pm).getAddress()) );
        List<Counter> outList = new ArrayList<>();
        for (VoCounter voCounter : counters) {
            outList.add( voCounter.getCounter());
        }

        Collections.sort(outList, countersComparator);
        return outList;
    }

    @Override
    public Map<Integer, Double> getCounterHistory(long counterId, int fromDate, int toDate) throws TException {
        PersistenceManager pm = PMF.getPm();
        try {
            VoCounter cntr = pm.getObjectById(VoCounter.class, counterId);
            if( fromDate > toDate && toDate != 0 ) {
                return new HashMap<>();
            }

            return new TreeMap<>(cntr.getValues()).subMap(fromDate, 0==toDate ? Integer.MAX_VALUE : toDate);
        } catch (Exception e) {
            throw new InvalidOperation(VoError.IncorrectParametrs, "No counter found by id: "+counterId);
        }
    }

    @Override
    public double setCurrentCounterValue(long counterId, double counterValue, int date) throws TException {
        PersistenceManager pm = PMF.getPm();
        try {
            VoCounter cntr = pm.getObjectById(VoCounter.class, counterId);
            Map<Integer, Double> values = cntr.getValues();
            if( null==values ){
                values = new HashMap<>();
                cntr.setValues( values );
            }

            double delta = counterValue;
            if( values.size()>0 ){
                Integer last = new TreeSet<>( values.keySet() ).last();
                if( values.size() > 0 && last < date )
                    delta = counterValue - values.get(last);
            }
            values.put(date, counterValue);
            pm.makePersistent(cntr);
            return delta;
        } catch (Exception e) {
            throw new InvalidOperation(VoError.IncorrectParametrs, "No counter found by id: "+counterId);
        }
    }

    @Override
    public void createCounterService(long buildingId, short startDateOfMonth, short endDateOfMonth, List<CounterType> defaultCounters) throws TException {
        PersistenceManager pm = PMF.getPm();
        VoBuilding voBuilding = pm.getObjectById(VoBuilding.class, buildingId);
        Query query = pm.newQuery(VoCounterService.class, "buildingId=="+buildingId);
        List<VoCounterService> csl = executeQuery( query,voBuilding);
        if( csl.size()>0 ){
            throw new InvalidOperation(VoError.IncorrectParametrs,"Already defined");
        }
        VoCounterService vcs = new VoCounterService( buildingId, startDateOfMonth, endDateOfMonth, defaultCounters);
        pm.makePersistent( vcs );

        //enable counters for users
        List<VoPostalAddress> psl = executeQuery(  pm.newQuery(VoPostalAddress.class, "buildingId=="+buildingId ) );
        for( VoPostalAddress ps: psl){
            for( CounterType ct: defaultCounters){
                pm.makePersistent( new VoCounter(ct, "", "", ps.getId()));
            }
            List<VoUser> ul = executeQuery(pm.newQuery(VoUser.class, "address=="+ps.getId()));
            for( VoUser u: ul){
                Set<ServiceType> uservices = u.getServices();
                Set<ServiceType> services = uservices == null ? new HashSet( ) : new HashSet( uservices );
                services.add(ServiceType.CountersEnabled);
                u.setServices( services );
                pm.makePersistent( u );
            }
        }
    }

    public UtilityServiceImpl() {
    }

    public UtilityServiceImpl(HttpServletRequest req) {
        super(req);
    }

    @Override
    public CounterService getCounterService() throws TException {
        PersistenceManager pm = PMF.getPm();
        VoUser currentUser = getCurrentUser();
        try {
            VoPostalAddress address = pm.getObjectById(VoPostalAddress.class, currentUser.getAddress());
            List<VoCounter> vcl = executeQuery(pm.newQuery(VoCounter.class, "postalAddressId==" + address.getId()));
            List<VoCounterService> vcsl = executeQuery(pm.newQuery(VoCounterService.class, "buildingId==" + address.getBuilding()));
            if( vcsl==null || vcsl.size() == 0 )
                return null;
            VoCounterService vcs = vcsl.get(0);
            CounterService cs = new CounterService( );
            Set<ServiceType> services = currentUser.getServices();
            if( null!=services) {
                cs.setAgrementAccepted(services.contains(ServiceType.CountersConfirmed));
                cs.setEmailReminder(services.contains(ServiceType.CountersNotification));
            }
            cs.setEndDateOfMonth( vcs.getEndDate());
            int lastDate = vcl.size() > 0 && vcl.get(0).getValues().size() > 0 ? Collections.max(vcl.get(0).getValues().keySet()) : 0;
            cs.setLastDate(lastDate);
            cs.setStartDateOfMonth(vcs.getStartDate());
            Calendar clndr = Calendar.getInstance();
            clndr.set(Calendar.DAY_OF_MONTH, vcs.getStartDate());
            Date providetAt = new Date(((long) lastDate) * 1000L);
            cs.setInfoProvided(providetAt.after(clndr.getTime()) || providetAt.equals(clndr.getTime()));
            Date now = new Date();
            cs.setTimeToProvideInfo( !cs.infoProvided && now.after(clndr.getTime()) && Calendar.getInstance().get( Calendar.DAY_OF_MONTH) <= vcs.getEndDate());
            return cs;
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public double cancelLastValue(long counterId) throws InvalidOperation {
        PersistenceManager pm = PMF.getPm();
        try {
            VoCounter cntr = pm.getObjectById(VoCounter.class, counterId);
            Map<Integer, Double> values = cntr.getValues();
            if( null==values || values.size() == 0 )
                return 0D;

            TreeSet<Integer> sortedDates = new TreeSet<>(values.keySet());
            Integer last = sortedDates.last();
            values.remove(last);
            sortedDates.remove(last);
            pm.makePersistent(cntr);
            return values.size() > 0 ? values.get(sortedDates.last()) : 0D;

        } catch (Exception e) {
            throw new InvalidOperation(VoError.IncorrectParametrs, "No counter found by id: "+counterId);
        }
    }
}
