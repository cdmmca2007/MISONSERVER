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
public class AccountSetting {
    private String pid;
    private String pquestion;
    private String panswer;
    private String squestion;
    private String sanswer;
    private String passwarning;
    private String recvry_emailid;
    private String createdby;
    private String modifiedby;  
    private String result;

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }
    
    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }
    
    public String getPquestion() {
        return pquestion;
    }

    public void setPquestion(String pquestion) {
        this.pquestion = pquestion;
    }

    public String getPanswer() {
        return panswer;
    }

    public void setPanswer(String panswer) {
        this.panswer = panswer;
    }

    public String getSquestion() {
        return squestion;
    }

    public void setSquestion(String squestion) {
        this.squestion = squestion;
    }

    public String getSanswer() {
        return sanswer;
    }

    public void setSanswer(String sanswer) {
        this.sanswer = sanswer;
    }

    public String getPasswarning() {
        return passwarning;
    }

    public void setPasswarning(String passwarning) {
        this.passwarning = passwarning;
    }

    public String getRecvry_emailid() {
        return recvry_emailid;
    }

    public void setRecvry_emailid(String recvry_emailid) {
        this.recvry_emailid = recvry_emailid;
    }

    public String getCreatedby() {
        return createdby;
    }

    public void setCreatedby(String createdby) {
        this.createdby = createdby;
    }

    public String getModifiedby() {
        return modifiedby;
    }

    public void setModifiedby(String modifiedby) {
        this.modifiedby = modifiedby;
    }
    
    
}

