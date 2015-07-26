/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 *
 * @author cd
 */
@JsonIgnoreProperties(ignoreUnknown=true)
public class UserChangePassword {
   
    private String userid;
    private String old;
    private String newp;

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getOld() {
        return old;
    }

    public void setOld(String old) {
        this.old = old;
    }

    public String getNewp() {
        return newp;
    }

    public void setNewp(String newp) {
        this.newp = newp;
    }
}
