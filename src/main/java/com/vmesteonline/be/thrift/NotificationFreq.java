/**
 * Autogenerated by Thrift Compiler (0.9.1)
 *
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
 *  @generated
 */
package com.vmesteonline.be.thrift;


import java.util.Map;
import java.util.HashMap;
import org.apache.thrift.TEnum;

public enum NotificationFreq implements org.apache.thrift.TEnum {
  DAYLY(2),
  TWICEAWEEK(4),
  WEEKLY(8),
  NEVER(128);

  private final int value;

  private NotificationFreq(int value) {
    this.value = value;
  }

  /**
   * Get the integer value of this enum value, as defined in the Thrift IDL.
   */
  public int getValue() {
    return value;
  }

  /**
   * Find a the enum type by its integer value, as defined in the Thrift IDL.
   * @return null if the value is not found.
   */
  public static NotificationFreq findByValue(int value) { 
    switch (value) {
      case 2:
        return DAYLY;
      case 4:
        return TWICEAWEEK;
      case 8:
        return WEEKLY;
      case 128:
        return NEVER;
      default:
        return null;
    }
  }
}
