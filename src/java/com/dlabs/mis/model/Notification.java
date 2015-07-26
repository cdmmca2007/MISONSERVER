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
public class Notification {
   private String id; 
   private String title; 
   private String description; 
   private String recipient; 
   private String createdby; 
   private long   createdon; 
   private String status; 
   private long   activatedate; 
   private long   endactivatedate;
   private String modifiedby; 
   private long   modifiedon; 
   private String sessionid; 

    public String getSessionid() {
        return sessionid;
    }

    public void setSessionid(String sessionid) {
        this.sessionid = sessionid;
    }

    public String getModifiedby() {
        return modifiedby;
    }

    public void setModifiedby(String modifiedby) {
        this.modifiedby = modifiedby;
    }

    public long getModifiedon() {
        return modifiedon;
    }

    public void setModifiedon(long modifiedon) {
        this.modifiedon = modifiedon;
    }
   
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public String getCreatedby() {
        return createdby;
    }

    public void setCreatedby(String createdby) {
        this.createdby = createdby;
    }

    public long getCreatedon() {
        return createdon;
    }

    public void setCreatedon(long createdon) {
        this.createdon = createdon;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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
   
}
