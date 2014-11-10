/**
 * Autogenerated by Thrift Compiler (0.9.1)
 *
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
 *  @generated
 */
package com.vmesteonline.be.thrift.messageservice;


import java.util.Map;
import java.util.HashMap;
import org.apache.thrift.TEnum;

public enum MessageType implements org.apache.thrift.TEnum {
  BASE(1),
  DIALOG(2),
  SHOP(3),
  NEWS(4),
  WALL(5),
  ADVERT(6),
  BLOG(7);

  private final int value;

  private MessageType(int value) {
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
  public static MessageType findByValue(int value) { 
    switch (value) {
      case 1:
        return BASE;
      case 2:
        return DIALOG;
      case 3:
        return SHOP;
      case 4:
        return NEWS;
      case 5:
        return WALL;
      case 6:
        return ADVERT;
      case 7:
        return BLOG;
      default:
        return null;
    }
  }
}