/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.model;

/**
 *
 * @author cd
 */
public class GenerateString {
 
    public GenerateString(){}
    public String getString(){
        return java.util.UUID.randomUUID().toString().split("-")[4];
    }
}
