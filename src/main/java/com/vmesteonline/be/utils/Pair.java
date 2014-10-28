package com.vmesteonline.be.utils;

public class Pair<Left, Right> {
	
	public Left left;
	public Right right;
	
	public Pair( Left left, Right right){
		this.left = left;
		this.right = right;
	}
	public Left getLeft(){ return left;}
	
	public Left getFirst(){ return left;}
	public Right getSecond(){ return right;}
	public Right getRight() {
		return right;
	}
	public void setRight(Right right) {
		this.right = right;
	}
	public void setLeft(Left left) {
		this.left = left;
	}
	public void setSecond(Right right) {
		this.right = right;
	}
	public void setFirst(Left left) {
		this.left = left;
	}
	
}
