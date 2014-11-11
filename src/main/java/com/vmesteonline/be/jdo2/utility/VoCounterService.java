package com.vmesteonline.be.jdo2.utility;

import com.vmesteonline.be.thrift.utilityservice.CounterType;

import javax.jdo.annotations.*;
import java.util.List;

/**
 * Created by brozer on 11.11.2014.
 */
@PersistenceCapable
@Index(name="BUILDING_IDX", members = {"buildingId"})
public class VoCounterService {

    public VoCounterService(long voBuildingId, short startDate, short endDate, List<CounterType> defaultCounterTypes) {
        this.buildingId = voBuildingId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.defaultCounterTypes = defaultCounterTypes;
    }

    public short getStartDate() {
        return startDate;
    }

    public short getEndDate() {
        return endDate;
    }

    public List<CounterType> getDefaultCounterTypes() {
        return defaultCounterTypes;
    }

    @PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.INCREMENT)
    private Long id;

    @Persistent
    private long buildingId;

    @Persistent
    private short startDate;

    @Persistent
    private short endDate;

    @Persistent(serialized = "true")
    List<CounterType> defaultCounterTypes;
}
