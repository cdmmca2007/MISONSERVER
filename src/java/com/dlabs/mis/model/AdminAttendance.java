/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.model;

import java.util.Date;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 *
 * @author cd
 */
@JsonIgnoreProperties(ignoreUnknown=true)
public class AdminAttendance {

    private String pid;
    private String batchid;
    private String classid;
    private String sessionid;
    private String batchname;
    private String studentid; 
    private String studentname;
    private long   attendencefromdate; 
    private long   attendencetodate; 
    private int    markattendencestatus; 
    private String attendencestatustext;	
    private String createdby; 
    private String modifiedby; 
    private Date   createdon; 
    private Date   modifiedon; 
    private String attendencemarkdate; 
    private String requeststatus; 
    private String requeststatustext; 	
    private String requestby;
    private String reason;

    public String getSessionid() {
        return sessionid;
    }

    public void setSessionid(String sessionid) {
        this.sessionid = sessionid;
    }

    public String getClassid() {
        return classid;
    }

    public void setClassid(String classid) {
        this.classid = classid;
    }
      

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getBatchid() {
        return batchid;
    }

    public void setBatchid(String batchid) {
        this.batchid = batchid;
    }

    public String getBatchname() {
        return batchname;
    }

    public void setBatchname(String batchname) {
        this.batchname = batchname;
    }

    public String getStudentid() {
        return studentid;
    }

    public void setStudentid(String studentid) {
        this.studentid = studentid;
    }

    public String getStudentname() {
        return studentname;
    }

    public void setStudentname(String studentname) {
        this.studentname = studentname;
    }

    public long getAttendencefromdate() {
        return attendencefromdate;
    }

    public void setAttendencefromdate(long attendencefromdate) {
        this.attendencefromdate = attendencefromdate;
    }

    public long getAttendencetodate() {
        return attendencetodate;
    }

    public void setAttendencetodate(long attendencetodate) {
        this.attendencetodate = attendencetodate;
    }

    public int getMarkattendencestatus() {
        return markattendencestatus;
    }

    public void setMarkattendencestatus(int markattendencestatus) {
        this.markattendencestatus = markattendencestatus;
    }

    public String getAttendencestatustext() {
        return attendencestatustext;
    }

    public void setAttendencestatustext(String attendencestatustext) {
        this.attendencestatustext = attendencestatustext;
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

    public Date getCreatedon() {
        return createdon;
    }

    public void setCreatedon(Date createdon) {
        this.createdon = createdon;
    }

    public Date getModifiedon() {
        return modifiedon;
    }

    public void setModifiedon(Date modifiedon) {
        this.modifiedon = modifiedon;
    }

    public String getAttendencemarkdate() {
        return attendencemarkdate;
    }

    public void setAttendencemarkdate(String attendencemarkdate) {
        this.attendencemarkdate = attendencemarkdate;
    }

    public String getRequeststatus() {
        return requeststatus;
    }

    public void setRequeststatus(String requeststatus) {
        this.requeststatus = requeststatus;
    }

    public String getRequeststatustext() {
        return requeststatustext;
    }

    public void setRequeststatustext(String requeststatustext) {
        this.requeststatustext = requeststatustext;
    }

    public String getRequestby() {
        return requestby;
    }

    public void setRequestby(String requestby) {
        this.requestby = requestby;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
        
}
