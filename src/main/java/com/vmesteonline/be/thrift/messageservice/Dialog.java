/**
 * Autogenerated by Thrift Compiler (0.9.1)
 *
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
 *  @generated
 */
package com.vmesteonline.be.thrift.messageservice;

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

public class Dialog implements org.apache.thrift.TBase<Dialog, Dialog._Fields>, java.io.Serializable, Cloneable, Comparable<Dialog> {
  private static final org.apache.thrift.protocol.TStruct STRUCT_DESC = new org.apache.thrift.protocol.TStruct("Dialog");

  private static final org.apache.thrift.protocol.TField ID_FIELD_DESC = new org.apache.thrift.protocol.TField("id", org.apache.thrift.protocol.TType.I64, (short)1);
  private static final org.apache.thrift.protocol.TField USERS_FIELD_DESC = new org.apache.thrift.protocol.TField("users", org.apache.thrift.protocol.TType.LIST, (short)2);
  private static final org.apache.thrift.protocol.TField CREATE_DATE_FIELD_DESC = new org.apache.thrift.protocol.TField("createDate", org.apache.thrift.protocol.TType.I32, (short)3);
  private static final org.apache.thrift.protocol.TField LAST_MESSAGE_DATE_FIELD_DESC = new org.apache.thrift.protocol.TField("lastMessageDate", org.apache.thrift.protocol.TType.I32, (short)4);

  private static final Map<Class<? extends IScheme>, SchemeFactory> schemes = new HashMap<Class<? extends IScheme>, SchemeFactory>();
  static {
    schemes.put(StandardScheme.class, new DialogStandardSchemeFactory());
    schemes.put(TupleScheme.class, new DialogTupleSchemeFactory());
  }

  public long id; // required
  public List<com.vmesteonline.be.thrift.ShortUserInfo> users; // required
  public int createDate; // required
  public int lastMessageDate; // required

  /** The set of fields this struct contains, along with convenience methods for finding and manipulating them. */
  public enum _Fields implements org.apache.thrift.TFieldIdEnum {
    ID((short)1, "id"),
    USERS((short)2, "users"),
    CREATE_DATE((short)3, "createDate"),
    LAST_MESSAGE_DATE((short)4, "lastMessageDate");

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
        case 1: // ID
          return ID;
        case 2: // USERS
          return USERS;
        case 3: // CREATE_DATE
          return CREATE_DATE;
        case 4: // LAST_MESSAGE_DATE
          return LAST_MESSAGE_DATE;
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
  private static final int __ID_ISSET_ID = 0;
  private static final int __CREATEDATE_ISSET_ID = 1;
  private static final int __LASTMESSAGEDATE_ISSET_ID = 2;
  private byte __isset_bitfield = 0;
  public static final Map<_Fields, org.apache.thrift.meta_data.FieldMetaData> metaDataMap;
  static {
    Map<_Fields, org.apache.thrift.meta_data.FieldMetaData> tmpMap = new EnumMap<_Fields, org.apache.thrift.meta_data.FieldMetaData>(_Fields.class);
    tmpMap.put(_Fields.ID, new org.apache.thrift.meta_data.FieldMetaData("id", org.apache.thrift.TFieldRequirementType.DEFAULT, 
        new org.apache.thrift.meta_data.FieldValueMetaData(org.apache.thrift.protocol.TType.I64)));
    tmpMap.put(_Fields.USERS, new org.apache.thrift.meta_data.FieldMetaData("users", org.apache.thrift.TFieldRequirementType.DEFAULT, 
        new org.apache.thrift.meta_data.ListMetaData(org.apache.thrift.protocol.TType.LIST, 
            new org.apache.thrift.meta_data.StructMetaData(org.apache.thrift.protocol.TType.STRUCT, com.vmesteonline.be.thrift.ShortUserInfo.class))));
    tmpMap.put(_Fields.CREATE_DATE, new org.apache.thrift.meta_data.FieldMetaData("createDate", org.apache.thrift.TFieldRequirementType.DEFAULT, 
        new org.apache.thrift.meta_data.FieldValueMetaData(org.apache.thrift.protocol.TType.I32)));
    tmpMap.put(_Fields.LAST_MESSAGE_DATE, new org.apache.thrift.meta_data.FieldMetaData("lastMessageDate", org.apache.thrift.TFieldRequirementType.DEFAULT, 
        new org.apache.thrift.meta_data.FieldValueMetaData(org.apache.thrift.protocol.TType.I32)));
    metaDataMap = Collections.unmodifiableMap(tmpMap);
    org.apache.thrift.meta_data.FieldMetaData.addStructMetaDataMap(Dialog.class, metaDataMap);
  }

  public Dialog() {
  }

  public Dialog(
    long id,
    List<com.vmesteonline.be.thrift.ShortUserInfo> users,
    int createDate,
    int lastMessageDate)
  {
    this();
    this.id = id;
    setIdIsSet(true);
    this.users = users;
    this.createDate = createDate;
    setCreateDateIsSet(true);
    this.lastMessageDate = lastMessageDate;
    setLastMessageDateIsSet(true);
  }

  /**
   * Performs a deep copy on <i>other</i>.
   */
  public Dialog(Dialog other) {
    __isset_bitfield = other.__isset_bitfield;
    this.id = other.id;
    if (other.isSetUsers()) {
      List<com.vmesteonline.be.thrift.ShortUserInfo> __this__users = new ArrayList<com.vmesteonline.be.thrift.ShortUserInfo>(other.users.size());
      for (com.vmesteonline.be.thrift.ShortUserInfo other_element : other.users) {
        __this__users.add(new com.vmesteonline.be.thrift.ShortUserInfo(other_element));
      }
      this.users = __this__users;
    }
    this.createDate = other.createDate;
    this.lastMessageDate = other.lastMessageDate;
  }

  public Dialog deepCopy() {
    return new Dialog(this);
  }

  @Override
  public void clear() {
    setIdIsSet(false);
    this.id = 0;
    this.users = null;
    setCreateDateIsSet(false);
    this.createDate = 0;
    setLastMessageDateIsSet(false);
    this.lastMessageDate = 0;
  }

  public long getId() {
    return this.id;
  }

  public Dialog setId(long id) {
    this.id = id;
    setIdIsSet(true);
    return this;
  }

  public void unsetId() {
    __isset_bitfield = EncodingUtils.clearBit(__isset_bitfield, __ID_ISSET_ID);
  }

  /** Returns true if field id is set (has been assigned a value) and false otherwise */
  public boolean isSetId() {
    return EncodingUtils.testBit(__isset_bitfield, __ID_ISSET_ID);
  }

  public void setIdIsSet(boolean value) {
    __isset_bitfield = EncodingUtils.setBit(__isset_bitfield, __ID_ISSET_ID, value);
  }

  public int getUsersSize() {
    return (this.users == null) ? 0 : this.users.size();
  }

  public java.util.Iterator<com.vmesteonline.be.thrift.ShortUserInfo> getUsersIterator() {
    return (this.users == null) ? null : this.users.iterator();
  }

  public void addToUsers(com.vmesteonline.be.thrift.ShortUserInfo elem) {
    if (this.users == null) {
      this.users = new ArrayList<com.vmesteonline.be.thrift.ShortUserInfo>();
    }
    this.users.add(elem);
  }

  public List<com.vmesteonline.be.thrift.ShortUserInfo> getUsers() {
    return this.users;
  }

  public Dialog setUsers(List<com.vmesteonline.be.thrift.ShortUserInfo> users) {
    this.users = users;
    return this;
  }

  public void unsetUsers() {
    this.users = null;
  }

  /** Returns true if field users is set (has been assigned a value) and false otherwise */
  public boolean isSetUsers() {
    return this.users != null;
  }

  public void setUsersIsSet(boolean value) {
    if (!value) {
      this.users = null;
    }
  }

  public int getCreateDate() {
    return this.createDate;
  }

  public Dialog setCreateDate(int createDate) {
    this.createDate = createDate;
    setCreateDateIsSet(true);
    return this;
  }

  public void unsetCreateDate() {
    __isset_bitfield = EncodingUtils.clearBit(__isset_bitfield, __CREATEDATE_ISSET_ID);
  }

  /** Returns true if field createDate is set (has been assigned a value) and false otherwise */
  public boolean isSetCreateDate() {
    return EncodingUtils.testBit(__isset_bitfield, __CREATEDATE_ISSET_ID);
  }

  public void setCreateDateIsSet(boolean value) {
    __isset_bitfield = EncodingUtils.setBit(__isset_bitfield, __CREATEDATE_ISSET_ID, value);
  }

  public int getLastMessageDate() {
    return this.lastMessageDate;
  }

  public Dialog setLastMessageDate(int lastMessageDate) {
    this.lastMessageDate = lastMessageDate;
    setLastMessageDateIsSet(true);
    return this;
  }

  public void unsetLastMessageDate() {
    __isset_bitfield = EncodingUtils.clearBit(__isset_bitfield, __LASTMESSAGEDATE_ISSET_ID);
  }

  /** Returns true if field lastMessageDate is set (has been assigned a value) and false otherwise */
  public boolean isSetLastMessageDate() {
    return EncodingUtils.testBit(__isset_bitfield, __LASTMESSAGEDATE_ISSET_ID);
  }

  public void setLastMessageDateIsSet(boolean value) {
    __isset_bitfield = EncodingUtils.setBit(__isset_bitfield, __LASTMESSAGEDATE_ISSET_ID, value);
  }

  public void setFieldValue(_Fields field, Object value) {
    switch (field) {
    case ID:
      if (value == null) {
        unsetId();
      } else {
        setId((Long)value);
      }
      break;

    case USERS:
      if (value == null) {
        unsetUsers();
      } else {
        setUsers((List<com.vmesteonline.be.thrift.ShortUserInfo>)value);
      }
      break;

    case CREATE_DATE:
      if (value == null) {
        unsetCreateDate();
      } else {
        setCreateDate((Integer)value);
      }
      break;

    case LAST_MESSAGE_DATE:
      if (value == null) {
        unsetLastMessageDate();
      } else {
        setLastMessageDate((Integer)value);
      }
      break;

    }
  }

  public Object getFieldValue(_Fields field) {
    switch (field) {
    case ID:
      return Long.valueOf(getId());

    case USERS:
      return getUsers();

    case CREATE_DATE:
      return Integer.valueOf(getCreateDate());

    case LAST_MESSAGE_DATE:
      return Integer.valueOf(getLastMessageDate());

    }
    throw new IllegalStateException();
  }

  /** Returns true if field corresponding to fieldID is set (has been assigned a value) and false otherwise */
  public boolean isSet(_Fields field) {
    if (field == null) {
      throw new IllegalArgumentException();
    }

    switch (field) {
    case ID:
      return isSetId();
    case USERS:
      return isSetUsers();
    case CREATE_DATE:
      return isSetCreateDate();
    case LAST_MESSAGE_DATE:
      return isSetLastMessageDate();
    }
    throw new IllegalStateException();
  }

  @Override
  public boolean equals(Object that) {
    if (that == null)
      return false;
    if (that instanceof Dialog)
      return this.equals((Dialog)that);
    return false;
  }

  public boolean equals(Dialog that) {
    if (that == null)
      return false;

    boolean this_present_id = true;
    boolean that_present_id = true;
    if (this_present_id || that_present_id) {
      if (!(this_present_id && that_present_id))
        return false;
      if (this.id != that.id)
        return false;
    }

    boolean this_present_users = true && this.isSetUsers();
    boolean that_present_users = true && that.isSetUsers();
    if (this_present_users || that_present_users) {
      if (!(this_present_users && that_present_users))
        return false;
      if (!this.users.equals(that.users))
        return false;
    }

    boolean this_present_createDate = true;
    boolean that_present_createDate = true;
    if (this_present_createDate || that_present_createDate) {
      if (!(this_present_createDate && that_present_createDate))
        return false;
      if (this.createDate != that.createDate)
        return false;
    }

    boolean this_present_lastMessageDate = true;
    boolean that_present_lastMessageDate = true;
    if (this_present_lastMessageDate || that_present_lastMessageDate) {
      if (!(this_present_lastMessageDate && that_present_lastMessageDate))
        return false;
      if (this.lastMessageDate != that.lastMessageDate)
        return false;
    }

    return true;
  }

  @Override
  public int hashCode() {
    return 0;
  }

  @Override
  public int compareTo(Dialog other) {
    if (!getClass().equals(other.getClass())) {
      return getClass().getName().compareTo(other.getClass().getName());
    }

    int lastComparison = 0;

    lastComparison = Boolean.valueOf(isSetId()).compareTo(other.isSetId());
    if (lastComparison != 0) {
      return lastComparison;
    }
    if (isSetId()) {
      lastComparison = org.apache.thrift.TBaseHelper.compareTo(this.id, other.id);
      if (lastComparison != 0) {
        return lastComparison;
      }
    }
    lastComparison = Boolean.valueOf(isSetUsers()).compareTo(other.isSetUsers());
    if (lastComparison != 0) {
      return lastComparison;
    }
    if (isSetUsers()) {
      lastComparison = org.apache.thrift.TBaseHelper.compareTo(this.users, other.users);
      if (lastComparison != 0) {
        return lastComparison;
      }
    }
    lastComparison = Boolean.valueOf(isSetCreateDate()).compareTo(other.isSetCreateDate());
    if (lastComparison != 0) {
      return lastComparison;
    }
    if (isSetCreateDate()) {
      lastComparison = org.apache.thrift.TBaseHelper.compareTo(this.createDate, other.createDate);
      if (lastComparison != 0) {
        return lastComparison;
      }
    }
    lastComparison = Boolean.valueOf(isSetLastMessageDate()).compareTo(other.isSetLastMessageDate());
    if (lastComparison != 0) {
      return lastComparison;
    }
    if (isSetLastMessageDate()) {
      lastComparison = org.apache.thrift.TBaseHelper.compareTo(this.lastMessageDate, other.lastMessageDate);
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
    StringBuilder sb = new StringBuilder("Dialog(");
    boolean first = true;

    sb.append("id:");
    sb.append(this.id);
    first = false;
    if (!first) sb.append(", ");
    sb.append("users:");
    if (this.users == null) {
      sb.append("null");
    } else {
      sb.append(this.users);
    }
    first = false;
    if (!first) sb.append(", ");
    sb.append("createDate:");
    sb.append(this.createDate);
    first = false;
    if (!first) sb.append(", ");
    sb.append("lastMessageDate:");
    sb.append(this.lastMessageDate);
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

  private static class DialogStandardSchemeFactory implements SchemeFactory {
    public DialogStandardScheme getScheme() {
      return new DialogStandardScheme();
    }
  }

  private static class DialogStandardScheme extends StandardScheme<Dialog> {

    public void read(org.apache.thrift.protocol.TProtocol iprot, Dialog struct) throws org.apache.thrift.TException {
      org.apache.thrift.protocol.TField schemeField;
      iprot.readStructBegin();
      while (true)
      {
        schemeField = iprot.readFieldBegin();
        if (schemeField.type == org.apache.thrift.protocol.TType.STOP) { 
          break;
        }
        switch (schemeField.id) {
          case 1: // ID
            if (schemeField.type == org.apache.thrift.protocol.TType.I64) {
              struct.id = iprot.readI64();
              struct.setIdIsSet(true);
            } else { 
              org.apache.thrift.protocol.TProtocolUtil.skip(iprot, schemeField.type);
            }
            break;
          case 2: // USERS
            if (schemeField.type == org.apache.thrift.protocol.TType.LIST) {
              {
                org.apache.thrift.protocol.TList _list76 = iprot.readListBegin();
                struct.users = new ArrayList<com.vmesteonline.be.thrift.ShortUserInfo>(_list76.size);
                for (int _i77 = 0; _i77 < _list76.size; ++_i77)
                {
                  com.vmesteonline.be.thrift.ShortUserInfo _elem78;
                  _elem78 = new com.vmesteonline.be.thrift.ShortUserInfo();
                  _elem78.read(iprot);
                  struct.users.add(_elem78);
                }
                iprot.readListEnd();
              }
              struct.setUsersIsSet(true);
            } else { 
              org.apache.thrift.protocol.TProtocolUtil.skip(iprot, schemeField.type);
            }
            break;
          case 3: // CREATE_DATE
            if (schemeField.type == org.apache.thrift.protocol.TType.I32) {
              struct.createDate = iprot.readI32();
              struct.setCreateDateIsSet(true);
            } else { 
              org.apache.thrift.protocol.TProtocolUtil.skip(iprot, schemeField.type);
            }
            break;
          case 4: // LAST_MESSAGE_DATE
            if (schemeField.type == org.apache.thrift.protocol.TType.I32) {
              struct.lastMessageDate = iprot.readI32();
              struct.setLastMessageDateIsSet(true);
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

    public void write(org.apache.thrift.protocol.TProtocol oprot, Dialog struct) throws org.apache.thrift.TException {
      struct.validate();

      oprot.writeStructBegin(STRUCT_DESC);
      oprot.writeFieldBegin(ID_FIELD_DESC);
      oprot.writeI64(struct.id);
      oprot.writeFieldEnd();
      if (struct.users != null) {
        oprot.writeFieldBegin(USERS_FIELD_DESC);
        {
          oprot.writeListBegin(new org.apache.thrift.protocol.TList(org.apache.thrift.protocol.TType.STRUCT, struct.users.size()));
          for (com.vmesteonline.be.thrift.ShortUserInfo _iter79 : struct.users)
          {
            _iter79.write(oprot);
          }
          oprot.writeListEnd();
        }
        oprot.writeFieldEnd();
      }
      oprot.writeFieldBegin(CREATE_DATE_FIELD_DESC);
      oprot.writeI32(struct.createDate);
      oprot.writeFieldEnd();
      oprot.writeFieldBegin(LAST_MESSAGE_DATE_FIELD_DESC);
      oprot.writeI32(struct.lastMessageDate);
      oprot.writeFieldEnd();
      oprot.writeFieldStop();
      oprot.writeStructEnd();
    }

  }

  private static class DialogTupleSchemeFactory implements SchemeFactory {
    public DialogTupleScheme getScheme() {
      return new DialogTupleScheme();
    }
  }

  private static class DialogTupleScheme extends TupleScheme<Dialog> {

    @Override
    public void write(org.apache.thrift.protocol.TProtocol prot, Dialog struct) throws org.apache.thrift.TException {
      TTupleProtocol oprot = (TTupleProtocol) prot;
      BitSet optionals = new BitSet();
      if (struct.isSetId()) {
        optionals.set(0);
      }
      if (struct.isSetUsers()) {
        optionals.set(1);
      }
      if (struct.isSetCreateDate()) {
        optionals.set(2);
      }
      if (struct.isSetLastMessageDate()) {
        optionals.set(3);
      }
      oprot.writeBitSet(optionals, 4);
      if (struct.isSetId()) {
        oprot.writeI64(struct.id);
      }
      if (struct.isSetUsers()) {
        {
          oprot.writeI32(struct.users.size());
          for (com.vmesteonline.be.thrift.ShortUserInfo _iter80 : struct.users)
          {
            _iter80.write(oprot);
          }
        }
      }
      if (struct.isSetCreateDate()) {
        oprot.writeI32(struct.createDate);
      }
      if (struct.isSetLastMessageDate()) {
        oprot.writeI32(struct.lastMessageDate);
      }
    }

    @Override
    public void read(org.apache.thrift.protocol.TProtocol prot, Dialog struct) throws org.apache.thrift.TException {
      TTupleProtocol iprot = (TTupleProtocol) prot;
      BitSet incoming = iprot.readBitSet(4);
      if (incoming.get(0)) {
        struct.id = iprot.readI64();
        struct.setIdIsSet(true);
      }
      if (incoming.get(1)) {
        {
          org.apache.thrift.protocol.TList _list81 = new org.apache.thrift.protocol.TList(org.apache.thrift.protocol.TType.STRUCT, iprot.readI32());
          struct.users = new ArrayList<com.vmesteonline.be.thrift.ShortUserInfo>(_list81.size);
          for (int _i82 = 0; _i82 < _list81.size; ++_i82)
          {
            com.vmesteonline.be.thrift.ShortUserInfo _elem83;
            _elem83 = new com.vmesteonline.be.thrift.ShortUserInfo();
            _elem83.read(iprot);
            struct.users.add(_elem83);
          }
        }
        struct.setUsersIsSet(true);
      }
      if (incoming.get(2)) {
        struct.createDate = iprot.readI32();
        struct.setCreateDateIsSet(true);
      }
      if (incoming.get(3)) {
        struct.lastMessageDate = iprot.readI32();
        struct.setLastMessageDateIsSet(true);
      }
    }
  }

}
