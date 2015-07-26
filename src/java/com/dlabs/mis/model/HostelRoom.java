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
public class HostelRoom {
    private String pid; 
    private String	hostelpid; 
    private String	floorno; 
    private String	roomno; 
    private String	roomtype; 
    private float	roomrent; 
    private int	totstudent; 
    private String	comment; 
    private String	createdby; 
    private String	modifiedby; 
    private String  result;

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getHostelpid() {
        return hostelpid;
    }

    public void setHostelpid(String hostelpid) {
        this.hostelpid = hostelpid;
    }

    public String getFloorno() {
        return floorno;
    }

    public void setFloorno(String floorno) {
        this.floorno = floorno;
    }

    public String getRoomno() {
        return roomno;
    }

    public void setRoomno(String roomno) {
        this.roomno = roomno;
    }

    public String getRoomtype() {
        return roomtype;
    }

    public void setRoomtype(String roomtype) {
        this.roomtype = roomtype;
    }

    public float getRoomrent() {
        return roomrent;
    }

    public void setRoomrent(float roomrent) {
        this.roomrent = roomrent;
    }

    public int getTotstudent() {
        return totstudent;
    }

    public void setTotstudent(int totstudent) {
        this.totstudent = totstudent;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
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

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }
    
    
}
