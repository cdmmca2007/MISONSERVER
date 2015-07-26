/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.model;

/**
 *
 * @author cd
 */
public class Session {
    
    private String batchid;
    private String sessionid;
    private String sessionname;
    private String sessionyear;
    private String batchname;
    private boolean markcurrentsession;
    private boolean classsestting;
    private boolean classfeesestting;
    private boolean subjectsetting;
    private boolean examsetting;
    private long activatedate;
    private long endactivatedate;
    private String createdby;
    private String createdon;
    private String modifiedby;
    private String description;
    private long validfrom;
    private long validto;

    public String getModifiedby() {
        return modifiedby;
    }

    public void setModifiedby(String modifiedby) {
        this.modifiedby = modifiedby;
    }
    
    public long getValidfrom() {
        return validfrom;
    }

    public void setValidfrom(long validfrom) {
        this.validfrom = validfrom;
    }

    public long getValidto() {
        return validto;
    }

    public void setValidto(long validto) {
        this.validto = validto;
    }
    
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCreatedby() {
        return createdby;
    }

    public void setCreatedby(String createdby) {
        this.createdby = createdby;
    }

    public String getCreatedon() {
        return createdon;
    }

    public void setCreatedon(String createdon) {
        this.createdon = createdon;
    }

    public String getBatchid() {
        return batchid;
    }

    public void setBatchid(String batchid) {
        this.batchid = batchid;
    }

    public long getActivatedate() {
        return activatedate;
    }

    public void setActivatedate(long activatedate) {
        this.activatedate = activatedate;
    }

    public long getEndactivatedate() {
        return endactivatedate;
    }

    public void setEndactivatedate(long endactivatedate) {
        this.endactivatedate = endactivatedate;
    }
    
    
    public String getSessionid() {
        return sessionid;
    }

    public void setSessionid(String sessionid) {
        this.sessionid = sessionid;
    }

    public String getSessionname() {
        return sessionname;
    }

    public void setSessionname(String sessionname) {
        this.sessionname = sessionname;
    }

    public String getSessionyear() {
        return sessionyear;
    }

    public void setSessionyear(String sessionyear) {
        this.sessionyear = sessionyear;
    }

    public String getBatchname() {
        return batchname;
    }

    public void setBatchname(String batchname) {
        this.batchname = batchname;
    }

    public boolean isMarkcurrentsession() {
        return markcurrentsession;
    }

    public void setMarkcurrentsession(boolean markcurrentsession) {
        this.markcurrentsession = markcurrentsession;
    }

    public boolean isClasssestting() {
        return classsestting;
    }

    public void setClasssestting(boolean classsestting) {
        this.classsestting = classsestting;
    }

    public boolean isClassfeesestting() {
        return classfeesestting;
    }

    public void setClassfeesestting(boolean classfeesestting) {
        this.classfeesestting = classfeesestting;
    }

    public boolean isSubjectsetting() {
        return subjectsetting;
    }

    public void setSubjectsetting(boolean subjectsetting) {
        this.subjectsetting = subjectsetting;
    }

    public boolean isExamsetting() {
        return examsetting;
    }

    public void setExamsetting(boolean examsetting) {
        this.examsetting = examsetting;
    }
    
}
