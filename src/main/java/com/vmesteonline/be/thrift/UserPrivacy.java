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

public class UserPrivacy implements org.apache.thrift.TBase<UserPrivacy, UserPrivacy._Fields>, java.io.Serializable, Cloneable, Comparable<UserPrivacy> {
  private static final org.apache.thrift.protocol.TStruct STRUCT_DESC = new org.apache.thrift.protocol.TStruct("UserPrivacy");

  private static final org.apache.thrift.protocol.TField USER_ID_FIELD_DESC = new org.apache.thrift.protocol.TField("userId", org.apache.thrift.protocol.TType.I64, (short)1);
  private static final org.apache.thrift.protocol.TField PROFILE_FIELD_DESC = new org.apache.thrift.protocol.TField("profile", org.apache.thrift.protocol.TType.I32, (short)2);
  private static final org.apache.thrift.protocol.TField CONTACTS_FIELD_DESC = new org.apache.thrift.protocol.TField("contacts", org.apache.thrift.protocol.TType.I32, (short)3);

  private static final Map<Class<? extends IScheme>, SchemeFactory> schemes = new HashMap<Class<? extends IScheme>, SchemeFactory>();
  static {
    schemes.put(StandardScheme.class, new UserPrivacyStandardSchemeFactory());
    schemes.put(TupleScheme.class, new UserPrivacyTupleSchemeFactory());
  }

  public long userId; // required
  /**
   * 
   * @see GroupType
   */
  public GroupType profile; // required
  /**
   * 
   * @see GroupType
   */
  public GroupType contacts; // required

  /** The set of fields this struct contains, along with convenience methods for finding and manipulating them. */
  public enum _Fields implements org.apache.thrift.TFieldIdEnum {
    USER_ID((short)1, "userId"),
    /**
     * 
     * @see GroupType
     */
    PROFILE((short)2, "profile"),
    /**
     * 
     * @see GroupType
     */
    CONTACTS((short)3, "contacts");

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
        case 1: // USER_ID
          return USER_ID;
        case 2: // PROFILE
          return PROFILE;
        case 3: // CONTACTS
          return CONTACTS;
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
  private static final int __USERID_ISSET_ID = 0;
  private byte __isset_bitfield = 0;
  public static final Map<_Fields, org.apache.thrift.meta_data.FieldMetaData> metaDataMap;
  static {
    Map<_Fields, org.apache.thrift.meta_data.FieldMetaData> tmpMap = new EnumMap<_Fields, org.apache.thrift.meta_data.FieldMetaData>(_Fields.class);
    tmpMap.put(_Fields.USER_ID, new org.apache.thrift.meta_data.FieldMetaData("userId", org.apache.thrift.TFieldRequirementType.DEFAULT, 
        new org.apache.thrift.meta_data.FieldValueMetaData(org.apache.thrift.protocol.TType.I64)));
    tmpMap.put(_Fields.PROFILE, new org.apache.thrift.meta_data.FieldMetaData("profile", org.apache.thrift.TFieldRequirementType.DEFAULT, 
        new org.apache.thrift.meta_data.EnumMetaData(org.apache.thrift.protocol.TType.ENUM, GroupType.class)));
    tmpMap.put(_Fields.CONTACTS, new org.apache.thrift.meta_data.FieldMetaData("contacts", org.apache.thrift.TFieldRequirementType.DEFAULT, 
        new org.apache.thrift.meta_data.EnumMetaData(org.apache.thrift.protocol.TType.ENUM, GroupType.class)));
    metaDataMap = Collections.unmodifiableMap(tmpMap);
    org.apache.thrift.meta_data.FieldMetaData.addStructMetaDataMap(UserPrivacy.class, metaDataMap);
  }

  public UserPrivacy() {
  }

  public UserPrivacy(
    long userId,
    GroupType profile,
    GroupType contacts)
  {
    this();
    this.userId = userId;
    setUserIdIsSet(true);
    this.profile = profile;
    this.contacts = contacts;
  }

  /**
   * Performs a deep copy on <i>other</i>.
   */
  public UserPrivacy(UserPrivacy other) {
    __isset_bitfield = other.__isset_bitfield;
    this.userId = other.userId;
    if (other.isSetProfile()) {
      this.profile = other.profile;
    }
    if (other.isSetContacts()) {
      this.contacts = other.contacts;
    }
  }

  public UserPrivacy deepCopy() {
    return new UserPrivacy(this);
  }

  @Override
  public void clear() {
    setUserIdIsSet(false);
    this.userId = 0;
    this.profile = null;
    this.contacts = null;
  }

  public long getUserId() {
    return this.userId;
  }

  public UserPrivacy setUserId(long userId) {
    this.userId = userId;
    setUserIdIsSet(true);
    return this;
  }

  public void unsetUserId() {
    __isset_bitfield = EncodingUtils.clearBit(__isset_bitfield, __USERID_ISSET_ID);
  }

  /** Returns true if field userId is set (has been assigned a value) and false otherwise */
  public boolean isSetUserId() {
    return EncodingUtils.testBit(__isset_bitfield, __USERID_ISSET_ID);
  }

  public void setUserIdIsSet(boolean value) {
    __isset_bitfield = EncodingUtils.setBit(__isset_bitfield, __USERID_ISSET_ID, value);
  }

  /**
   * 
   * @see GroupType
   */
  public GroupType getProfile() {
    return this.profile;
  }

  /**
   * 
   * @see GroupType
   */
  public UserPrivacy setProfile(GroupType profile) {
    this.profile = profile;
    return this;
  }

  public void unsetProfile() {
    this.profile = null;
  }

  /** Returns true if field profile is set (has been assigned a value) and false otherwise */
  public boolean isSetProfile() {
    return this.profile != null;
  }

  public void setProfileIsSet(boolean value) {
    if (!value) {
      this.profile = null;
    }
  }

  /**
   * 
   * @see GroupType
   */
  public GroupType getContacts() {
    return this.contacts;
  }

  /**
   * 
   * @see GroupType
   */
  public UserPrivacy setContacts(GroupType contacts) {
    this.contacts = contacts;
    return this;
  }

  public void unsetContacts() {
    this.contacts = null;
  }

  /** Returns true if field contacts is set (has been assigned a value) and false otherwise */
  public boolean isSetContacts() {
    return this.contacts != null;
  }

  public void setContactsIsSet(boolean value) {
    if (!value) {
      this.contacts = null;
    }
  }

  public void setFieldValue(_Fields field, Object value) {
    switch (field) {
    case USER_ID:
      if (value == null) {
        unsetUserId();
      } else {
        setUserId((Long)value);
      }
      break;

    case PROFILE:
      if (value == null) {
        unsetProfile();
      } else {
        setProfile((GroupType)value);
      }
      break;

    case CONTACTS:
      if (value == null) {
        unsetContacts();
      } else {
        setContacts((GroupType)value);
      }
      break;

    }
  }

  public Object getFieldValue(_Fields field) {
    switch (field) {
    case USER_ID:
      return Long.valueOf(getUserId());

    case PROFILE:
      return getProfile();

    case CONTACTS:
      return getContacts();

    }
    throw new IllegalStateException();
  }

  /** Returns true if field corresponding to fieldID is set (has been assigned a value) and false otherwise */
  public boolean isSet(_Fields field) {
    if (field == null) {
      throw new IllegalArgumentException();
    }

    switch (field) {
    case USER_ID:
      return isSetUserId();
    case PROFILE:
      return isSetProfile();
    case CONTACTS:
      return isSetContacts();
    }
    throw new IllegalStateException();
  }

  @Override
  public boolean equals(Object that) {
    if (that == null)
      return false;
    if (that instanceof UserPrivacy)
      return this.equals((UserPrivacy)that);
    return false;
  }

  public boolean equals(UserPrivacy that) {
    if (that == null)
      return false;

    boolean this_present_userId = true;
    boolean that_present_userId = true;
    if (this_present_userId || that_present_userId) {
      if (!(this_present_userId && that_present_userId))
        return false;
      if (this.userId != that.userId)
        return false;
    }

    boolean this_present_profile = true && this.isSetProfile();
    boolean that_present_profile = true && that.isSetProfile();
    if (this_present_profile || that_present_profile) {
      if (!(this_present_profile && that_present_profile))
        return false;
      if (!this.profile.equals(that.profile))
        return false;
    }

    boolean this_present_contacts = true && this.isSetContacts();
    boolean that_present_contacts = true && that.isSetContacts();
    if (this_present_contacts || that_present_contacts) {
      if (!(this_present_contacts && that_present_contacts))
        return false;
      if (!this.contacts.equals(that.contacts))
        return false;
    }

    return true;
  }

  @Override
  public int hashCode() {
    return 0;
  }

  @Override
  public int compareTo(UserPrivacy other) {
    if (!getClass().equals(other.getClass())) {
      return getClass().getName().compareTo(other.getClass().getName());
    }

    int lastComparison = 0;

    lastComparison = Boolean.valueOf(isSetUserId()).compareTo(other.isSetUserId());
    if (lastComparison != 0) {
      return lastComparison;
    }
    if (isSetUserId()) {
      lastComparison = org.apache.thrift.TBaseHelper.compareTo(this.userId, other.userId);
      if (lastComparison != 0) {
        return lastComparison;
      }
    }
    lastComparison = Boolean.valueOf(isSetProfile()).compareTo(other.isSetProfile());
    if (lastComparison != 0) {
      return lastComparison;
    }
    if (isSetProfile()) {
      lastComparison = org.apache.thrift.TBaseHelper.compareTo(this.profile, other.profile);
      if (lastComparison != 0) {
        return lastComparison;
      }
    }
    lastComparison = Boolean.valueOf(isSetContacts()).compareTo(other.isSetContacts());
    if (lastComparison != 0) {
      return lastComparison;
    }
    if (isSetContacts()) {
      lastComparison = org.apache.thrift.TBaseHelper.compareTo(this.contacts, other.contacts);
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
    StringBuilder sb = new StringBuilder("UserPrivacy(");
    boolean first = true;

    sb.append("userId:");
    sb.append(this.userId);
    first = false;
    if (!first) sb.append(", ");
    sb.append("profile:");
    if (this.profile == null) {
      sb.append("null");
    } else {
      sb.append(this.profile);
    }
    first = false;
    if (!first) sb.append(", ");
    sb.append("contacts:");
    if (this.contacts == null) {
      sb.append("null");
    } else {
      sb.append(this.contacts);
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
      // it doesn't seem like you should have to do this, but java serialization is wacky, and doesn't call the default constructor.
      __isset_bitfield = 0;
      read(new org.apache.thrift.protocol.TCompactProtocol(new org.apache.thrift.transport.TIOStreamTransport(in)));
    } catch (org.apache.thrift.TException te) {
      throw new java.io.IOException(te);
    }
  }

  private static class UserPrivacyStandardSchemeFactory implements SchemeFactory {
    public UserPrivacyStandardScheme getScheme() {
      return new UserPrivacyStandardScheme();
    }
  }

  private static class UserPrivacyStandardScheme extends StandardScheme<UserPrivacy> {

    public void read(org.apache.thrift.protocol.TProtocol iprot, UserPrivacy struct) throws org.apache.thrift.TException {
      org.apache.thrift.protocol.TField schemeField;
      iprot.readStructBegin();
      while (true)
      {
        schemeField = iprot.readFieldBegin();
        if (schemeField.type == org.apache.thrift.protocol.TType.STOP) { 
          break;
        }
        switch (schemeField.id) {
          case 1: // USER_ID
            if (schemeField.type == org.apache.thrift.protocol.TType.I64) {
              struct.userId = iprot.readI64();
              struct.setUserIdIsSet(true);
            } else { 
              org.apache.thrift.protocol.TProtocolUtil.skip(iprot, schemeField.type);
            }
            break;
          case 2: // PROFILE
            if (schemeField.type == org.apache.thrift.protocol.TType.I32) {
              struct.profile = GroupType.findByValue(iprot.readI32());
              struct.setProfileIsSet(true);
            } else { 
              org.apache.thrift.protocol.TProtocolUtil.skip(iprot, schemeField.type);
            }
            break;
          case 3: // CONTACTS
            if (schemeField.type == org.apache.thrift.protocol.TType.I32) {
              struct.contacts = GroupType.findByValue(iprot.readI32());
              struct.setContactsIsSet(true);
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

    public void write(org.apache.thrift.protocol.TProtocol oprot, UserPrivacy struct) throws org.apache.thrift.TException {
      struct.validate();

      oprot.writeStructBegin(STRUCT_DESC);
      oprot.writeFieldBegin(USER_ID_FIELD_DESC);
      oprot.writeI64(struct.userId);
      oprot.writeFieldEnd();
      if (struct.profile != null) {
        oprot.writeFieldBegin(PROFILE_FIELD_DESC);
        oprot.writeI32(struct.profile.getValue());
        oprot.writeFieldEnd();
      }
      if (struct.contacts != null) {
        oprot.writeFieldBegin(CONTACTS_FIELD_DESC);
        oprot.writeI32(struct.contacts.getValue());
        oprot.writeFieldEnd();
      }
      oprot.writeFieldStop();
      oprot.writeStructEnd();
    }

  }

  private static class UserPrivacyTupleSchemeFactory implements SchemeFactory {
    public UserPrivacyTupleScheme getScheme() {
      return new UserPrivacyTupleScheme();
    }
  }

  private static class UserPrivacyTupleScheme extends TupleScheme<UserPrivacy> {

    @Override
    public void write(org.apache.thrift.protocol.TProtocol prot, UserPrivacy struct) throws org.apache.thrift.TException {
      TTupleProtocol oprot = (TTupleProtocol) prot;
      BitSet optionals = new BitSet();
      if (struct.isSetUserId()) {
        optionals.set(0);
      }
      if (struct.isSetProfile()) {
        optionals.set(1);
      }
      if (struct.isSetContacts()) {
        optionals.set(2);
      }
      oprot.writeBitSet(optionals, 3);
      if (struct.isSetUserId()) {
        oprot.writeI64(struct.userId);
      }
      if (struct.isSetProfile()) {
        oprot.writeI32(struct.profile.getValue());
      }
      if (struct.isSetContacts()) {
        oprot.writeI32(struct.contacts.getValue());
      }
    }

    @Override
    public void read(org.apache.thrift.protocol.TProtocol prot, UserPrivacy struct) throws org.apache.thrift.TException {
      TTupleProtocol iprot = (TTupleProtocol) prot;
      BitSet incoming = iprot.readBitSet(3);
      if (incoming.get(0)) {
        struct.userId = iprot.readI64();
        struct.setUserIdIsSet(true);
      }
      if (incoming.get(1)) {
        struct.profile = GroupType.findByValue(iprot.readI32());
        struct.setProfileIsSet(true);
      }
      if (incoming.get(2)) {
        struct.contacts = GroupType.findByValue(iprot.readI32());
        struct.setContactsIsSet(true);
      }
    }
  }

}

