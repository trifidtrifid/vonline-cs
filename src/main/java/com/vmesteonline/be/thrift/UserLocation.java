/**
 * Autogenerated by Thrift Compiler (0.9.1)
 *
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
 *  @generated
 */
package com.vmesteonline.be.thrift;

import org.apache.thrift.scheme.IScheme;
import org.apache.thrift.scheme.SchemeFactory;
import org.apache.thrift.scheme.StandardScheme;

import org.apache.thrift.scheme.TupleScheme;
import org.apache.thrift.protocol.TTupleProtocol;
import org.apache.thrift.protocol.TProtocolException;
import org.apache.thrift.EncodingUtils;
import org.apache.thrift.TException;
import org.apache.thrift.async.AsyncMethodCallback;
import org.apache.thrift.server.AbstractNonblockingServer.*;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.EnumMap;
import java.util.Set;
import java.util.HashSet;
import java.util.EnumSet;
import java.util.Collections;
import java.util.BitSet;
import java.nio.ByteBuffer;
import java.util.Arrays;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UserLocation implements org.apache.thrift.TBase<UserLocation, UserLocation._Fields>, java.io.Serializable, Cloneable, Comparable<UserLocation> {
  private static final org.apache.thrift.protocol.TStruct STRUCT_DESC = new org.apache.thrift.protocol.TStruct("UserLocation");

  private static final org.apache.thrift.protocol.TField ADDRESS_FIELD_DESC = new org.apache.thrift.protocol.TField("address", org.apache.thrift.protocol.TType.STRING, (short)1);
  private static final org.apache.thrift.protocol.TField LOCATION_ID_FIELD_DESC = new org.apache.thrift.protocol.TField("locationId", org.apache.thrift.protocol.TType.STRING, (short)2);
  private static final org.apache.thrift.protocol.TField MAP_URL_FIELD_DESC = new org.apache.thrift.protocol.TField("mapUrl", org.apache.thrift.protocol.TType.STRING, (short)3);

  private static final Map<Class<? extends IScheme>, SchemeFactory> schemes = new HashMap<Class<? extends IScheme>, SchemeFactory>();
  static {
    schemes.put(StandardScheme.class, new UserLocationStandardSchemeFactory());
    schemes.put(TupleScheme.class, new UserLocationTupleSchemeFactory());
  }

  public String address; // required
  public String locationId; // required
  public String mapUrl; // required

  /** The set of fields this struct contains, along with convenience methods for finding and manipulating them. */
  public enum _Fields implements org.apache.thrift.TFieldIdEnum {
    ADDRESS((short)1, "address"),
    LOCATION_ID((short)2, "locationId"),
    MAP_URL((short)3, "mapUrl");

    private static final Map<String, _Fields> byName = new HashMap<String, _Fields>();

    static {
      for (_Fields field : EnumSet.allOf(_Fields.class)) {
        byName.put(field.getFieldName(), field);
      }
    }

    /**
     * Find the _Fields constant that matches fieldId, or null if its not found.
     */
    public static _Fields findByThriftId(int fieldId) {
      switch(fieldId) {
        case 1: // ADDRESS
          return ADDRESS;
        case 2: // LOCATION_ID
          return LOCATION_ID;
        case 3: // MAP_URL
          return MAP_URL;
        default:
          return null;
      }
    }

    /**
     * Find the _Fields constant that matches fieldId, throwing an exception
     * if it is not found.
     */
    public static _Fields findByThriftIdOrThrow(int fieldId) {
      _Fields fields = findByThriftId(fieldId);
      if (fields == null) throw new IllegalArgumentException("Field " + fieldId + " doesn't exist!");
      return fields;
    }

    /**
     * Find the _Fields constant that matches name, or null if its not found.
     */
    public static _Fields findByName(String name) {
      return byName.get(name);
    }

    private final short _thriftId;
    private final String _fieldName;

    _Fields(short thriftId, String fieldName) {
      _thriftId = thriftId;
      _fieldName = fieldName;
    }

    public short getThriftFieldId() {
      return _thriftId;
    }

    public String getFieldName() {
      return _fieldName;
    }
  }

  // isset id assignments
  public static final Map<_Fields, org.apache.thrift.meta_data.FieldMetaData> metaDataMap;
  static {
    Map<_Fields, org.apache.thrift.meta_data.FieldMetaData> tmpMap = new EnumMap<_Fields, org.apache.thrift.meta_data.FieldMetaData>(_Fields.class);
    tmpMap.put(_Fields.ADDRESS, new org.apache.thrift.meta_data.FieldMetaData("address", org.apache.thrift.TFieldRequirementType.DEFAULT, 
        new org.apache.thrift.meta_data.FieldValueMetaData(org.apache.thrift.protocol.TType.STRING)));
    tmpMap.put(_Fields.LOCATION_ID, new org.apache.thrift.meta_data.FieldMetaData("locationId", org.apache.thrift.TFieldRequirementType.DEFAULT, 
        new org.apache.thrift.meta_data.FieldValueMetaData(org.apache.thrift.protocol.TType.STRING)));
    tmpMap.put(_Fields.MAP_URL, new org.apache.thrift.meta_data.FieldMetaData("mapUrl", org.apache.thrift.TFieldRequirementType.DEFAULT, 
        new org.apache.thrift.meta_data.FieldValueMetaData(org.apache.thrift.protocol.TType.STRING)));
    metaDataMap = Collections.unmodifiableMap(tmpMap);
    org.apache.thrift.meta_data.FieldMetaData.addStructMetaDataMap(UserLocation.class, metaDataMap);
  }

  public UserLocation() {
  }

  public UserLocation(
    String address,
    String locationId,
    String mapUrl)
  {
    this();
    this.address = address;
    this.locationId = locationId;
    this.mapUrl = mapUrl;
  }

  /**
   * Performs a deep copy on <i>other</i>.
   */
  public UserLocation(UserLocation other) {
    if (other.isSetAddress()) {
      this.address = other.address;
    }
    if (other.isSetLocationId()) {
      this.locationId = other.locationId;
    }
    if (other.isSetMapUrl()) {
      this.mapUrl = other.mapUrl;
    }
  }

  public UserLocation deepCopy() {
    return new UserLocation(this);
  }

  @Override
  public void clear() {
    this.address = null;
    this.locationId = null;
    this.mapUrl = null;
  }

  public String getAddress() {
    return this.address;
  }

  public UserLocation setAddress(String address) {
    this.address = address;
    return this;
  }

  public void unsetAddress() {
    this.address = null;
  }

  /** Returns true if field address is set (has been assigned a value) and false otherwise */
  public boolean isSetAddress() {
    return this.address != null;
  }

  public void setAddressIsSet(boolean value) {
    if (!value) {
      this.address = null;
    }
  }

  public String getLocationId() {
    return this.locationId;
  }

  public UserLocation setLocationId(String locationId) {
    this.locationId = locationId;
    return this;
  }

  public void unsetLocationId() {
    this.locationId = null;
  }

  /** Returns true if field locationId is set (has been assigned a value) and false otherwise */
  public boolean isSetLocationId() {
    return this.locationId != null;
  }

  public void setLocationIdIsSet(boolean value) {
    if (!value) {
      this.locationId = null;
    }
  }

  public String getMapUrl() {
    return this.mapUrl;
  }

  public UserLocation setMapUrl(String mapUrl) {
    this.mapUrl = mapUrl;
    return this;
  }

  public void unsetMapUrl() {
    this.mapUrl = null;
  }

  /** Returns true if field mapUrl is set (has been assigned a value) and false otherwise */
  public boolean isSetMapUrl() {
    return this.mapUrl != null;
  }

  public void setMapUrlIsSet(boolean value) {
    if (!value) {
      this.mapUrl = null;
    }
  }

  public void setFieldValue(_Fields field, Object value) {
    switch (field) {
    case ADDRESS:
      if (value == null) {
        unsetAddress();
      } else {
        setAddress((String)value);
      }
      break;

    case LOCATION_ID:
      if (value == null) {
        unsetLocationId();
      } else {
        setLocationId((String)value);
      }
      break;

    case MAP_URL:
      if (value == null) {
        unsetMapUrl();
      } else {
        setMapUrl((String)value);
      }
      break;

    }
  }

  public Object getFieldValue(_Fields field) {
    switch (field) {
    case ADDRESS:
      return getAddress();

    case LOCATION_ID:
      return getLocationId();

    case MAP_URL:
      return getMapUrl();

    }
    throw new IllegalStateException();
  }

  /** Returns true if field corresponding to fieldID is set (has been assigned a value) and false otherwise */
  public boolean isSet(_Fields field) {
    if (field == null) {
      throw new IllegalArgumentException();
    }

    switch (field) {
    case ADDRESS:
      return isSetAddress();
    case LOCATION_ID:
      return isSetLocationId();
    case MAP_URL:
      return isSetMapUrl();
    }
    throw new IllegalStateException();
  }

  @Override
  public boolean equals(Object that) {
    if (that == null)
      return false;
    if (that instanceof UserLocation)
      return this.equals((UserLocation)that);
    return false;
  }

  public boolean equals(UserLocation that) {
    if (that == null)
      return false;

    boolean this_present_address = true && this.isSetAddress();
    boolean that_present_address = true && that.isSetAddress();
    if (this_present_address || that_present_address) {
      if (!(this_present_address && that_present_address))
        return false;
      if (!this.address.equals(that.address))
        return false;
    }

    boolean this_present_locationId = true && this.isSetLocationId();
    boolean that_present_locationId = true && that.isSetLocationId();
    if (this_present_locationId || that_present_locationId) {
      if (!(this_present_locationId && that_present_locationId))
        return false;
      if (!this.locationId.equals(that.locationId))
        return false;
    }

    boolean this_present_mapUrl = true && this.isSetMapUrl();
    boolean that_present_mapUrl = true && that.isSetMapUrl();
    if (this_present_mapUrl || that_present_mapUrl) {
      if (!(this_present_mapUrl && that_present_mapUrl))
        return false;
      if (!this.mapUrl.equals(that.mapUrl))
        return false;
    }

    return true;
  }

  @Override
  public int hashCode() {
    return 0;
  }

  @Override
  public int compareTo(UserLocation other) {
    if (!getClass().equals(other.getClass())) {
      return getClass().getName().compareTo(other.getClass().getName());
    }

    int lastComparison = 0;

    lastComparison = Boolean.valueOf(isSetAddress()).compareTo(other.isSetAddress());
    if (lastComparison != 0) {
      return lastComparison;
    }
    if (isSetAddress()) {
      lastComparison = org.apache.thrift.TBaseHelper.compareTo(this.address, other.address);
      if (lastComparison != 0) {
        return lastComparison;
      }
    }
    lastComparison = Boolean.valueOf(isSetLocationId()).compareTo(other.isSetLocationId());
    if (lastComparison != 0) {
      return lastComparison;
    }
    if (isSetLocationId()) {
      lastComparison = org.apache.thrift.TBaseHelper.compareTo(this.locationId, other.locationId);
      if (lastComparison != 0) {
        return lastComparison;
      }
    }
    lastComparison = Boolean.valueOf(isSetMapUrl()).compareTo(other.isSetMapUrl());
    if (lastComparison != 0) {
      return lastComparison;
    }
    if (isSetMapUrl()) {
      lastComparison = org.apache.thrift.TBaseHelper.compareTo(this.mapUrl, other.mapUrl);
      if (lastComparison != 0) {
        return lastComparison;
      }
    }
    return 0;
  }

  public _Fields fieldForId(int fieldId) {
    return _Fields.findByThriftId(fieldId);
  }

  public void read(org.apache.thrift.protocol.TProtocol iprot) throws org.apache.thrift.TException {
    schemes.get(iprot.getScheme()).getScheme().read(iprot, this);
  }

  public void write(org.apache.thrift.protocol.TProtocol oprot) throws org.apache.thrift.TException {
    schemes.get(oprot.getScheme()).getScheme().write(oprot, this);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder("UserLocation(");
    boolean first = true;

    sb.append("address:");
    if (this.address == null) {
      sb.append("null");
    } else {
      sb.append(this.address);
    }
    first = false;
    if (!first) sb.append(", ");
    sb.append("locationId:");
    if (this.locationId == null) {
      sb.append("null");
    } else {
      sb.append(this.locationId);
    }
    first = false;
    if (!first) sb.append(", ");
    sb.append("mapUrl:");
    if (this.mapUrl == null) {
      sb.append("null");
    } else {
      sb.append(this.mapUrl);
    }
    first = false;
    sb.append(")");
    return sb.toString();
  }

  public void validate() throws org.apache.thrift.TException {
    // check for required fields
    // check for sub-struct validity
  }

  private void writeObject(java.io.ObjectOutputStream out) throws java.io.IOException {
    try {
      write(new org.apache.thrift.protocol.TCompactProtocol(new org.apache.thrift.transport.TIOStreamTransport(out)));
    } catch (org.apache.thrift.TException te) {
      throw new java.io.IOException(te);
    }
  }

  private void readObject(java.io.ObjectInputStream in) throws java.io.IOException, ClassNotFoundException {
    try {
      read(new org.apache.thrift.protocol.TCompactProtocol(new org.apache.thrift.transport.TIOStreamTransport(in)));
    } catch (org.apache.thrift.TException te) {
      throw new java.io.IOException(te);
    }
  }

  private static class UserLocationStandardSchemeFactory implements SchemeFactory {
    public UserLocationStandardScheme getScheme() {
      return new UserLocationStandardScheme();
    }
  }

  private static class UserLocationStandardScheme extends StandardScheme<UserLocation> {

    public void read(org.apache.thrift.protocol.TProtocol iprot, UserLocation struct) throws org.apache.thrift.TException {
      org.apache.thrift.protocol.TField schemeField;
      iprot.readStructBegin();
      while (true)
      {
        schemeField = iprot.readFieldBegin();
        if (schemeField.type == org.apache.thrift.protocol.TType.STOP) { 
          break;
        }
        switch (schemeField.id) {
          case 1: // ADDRESS
            if (schemeField.type == org.apache.thrift.protocol.TType.STRING) {
              struct.address = iprot.readString();
              struct.setAddressIsSet(true);
            } else { 
              org.apache.thrift.protocol.TProtocolUtil.skip(iprot, schemeField.type);
            }
            break;
          case 2: // LOCATION_ID
            if (schemeField.type == org.apache.thrift.protocol.TType.STRING) {
              struct.locationId = iprot.readString();
              struct.setLocationIdIsSet(true);
            } else { 
              org.apache.thrift.protocol.TProtocolUtil.skip(iprot, schemeField.type);
            }
            break;
          case 3: // MAP_URL
            if (schemeField.type == org.apache.thrift.protocol.TType.STRING) {
              struct.mapUrl = iprot.readString();
              struct.setMapUrlIsSet(true);
            } else { 
              org.apache.thrift.protocol.TProtocolUtil.skip(iprot, schemeField.type);
            }
            break;
          default:
            org.apache.thrift.protocol.TProtocolUtil.skip(iprot, schemeField.type);
        }
        iprot.readFieldEnd();
      }
      iprot.readStructEnd();

      // check for required fields of primitive type, which can't be checked in the validate method
      struct.validate();
    }

    public void write(org.apache.thrift.protocol.TProtocol oprot, UserLocation struct) throws org.apache.thrift.TException {
      struct.validate();

      oprot.writeStructBegin(STRUCT_DESC);
      if (struct.address != null) {
        oprot.writeFieldBegin(ADDRESS_FIELD_DESC);
        oprot.writeString(struct.address);
        oprot.writeFieldEnd();
      }
      if (struct.locationId != null) {
        oprot.writeFieldBegin(LOCATION_ID_FIELD_DESC);
        oprot.writeString(struct.locationId);
        oprot.writeFieldEnd();
      }
      if (struct.mapUrl != null) {
        oprot.writeFieldBegin(MAP_URL_FIELD_DESC);
        oprot.writeString(struct.mapUrl);
        oprot.writeFieldEnd();
      }
      oprot.writeFieldStop();
      oprot.writeStructEnd();
    }

  }

  private static class UserLocationTupleSchemeFactory implements SchemeFactory {
    public UserLocationTupleScheme getScheme() {
      return new UserLocationTupleScheme();
    }
  }

  private static class UserLocationTupleScheme extends TupleScheme<UserLocation> {

    @Override
    public void write(org.apache.thrift.protocol.TProtocol prot, UserLocation struct) throws org.apache.thrift.TException {
      TTupleProtocol oprot = (TTupleProtocol) prot;
      BitSet optionals = new BitSet();
      if (struct.isSetAddress()) {
        optionals.set(0);
      }
      if (struct.isSetLocationId()) {
        optionals.set(1);
      }
      if (struct.isSetMapUrl()) {
        optionals.set(2);
      }
      oprot.writeBitSet(optionals, 3);
      if (struct.isSetAddress()) {
        oprot.writeString(struct.address);
      }
      if (struct.isSetLocationId()) {
        oprot.writeString(struct.locationId);
      }
      if (struct.isSetMapUrl()) {
        oprot.writeString(struct.mapUrl);
      }
    }

    @Override
    public void read(org.apache.thrift.protocol.TProtocol prot, UserLocation struct) throws org.apache.thrift.TException {
      TTupleProtocol iprot = (TTupleProtocol) prot;
      BitSet incoming = iprot.readBitSet(3);
      if (incoming.get(0)) {
        struct.address = iprot.readString();
        struct.setAddressIsSet(true);
      }
      if (incoming.get(1)) {
        struct.locationId = iprot.readString();
        struct.setLocationIdIsSet(true);
      }
      if (incoming.get(2)) {
        struct.mapUrl = iprot.readString();
        struct.setMapUrlIsSet(true);
      }
    }
  }

}
