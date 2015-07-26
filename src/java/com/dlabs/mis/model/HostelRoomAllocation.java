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
public class HostelRoomAllocation {
 private String pid;
 private String hostelid;
 private String roomid;
 private String classid;
 private String sessionid;
 private int    allocatedto;
 private String name;
 private long   fromdate;
 private long   todate;
 private float  tothostelfee;
 private String feepaidstatus;
 private int    paid;
 private int    notification;
 private String paidon;
 private String paidby;
 private String comment;
 private int    allocateto;
 private String studentid;
 private String teacherid;
 private float  totamount; 
 private String result;
 private String createdby;

    public String getCreatedby() {
        return createdby;
    }

    public void setCreatedby(String createdby) {
        this.createdby = createdby;
    }
 
     public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }
 
    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getHostelid() {
        return hostelid;
    }

    public void setHostelid(String hostelid) {
        this.hostelid = hostelid;
    }

    public String getRoomid() {
        return roomid;
    }

    public void setRoomid(String roomid) {
        this.roomid = roomid;
    }

    public String getClassid() {
        return classid;
    }

    public void setClassid(String classid) {
        this.classid = classid;
    }

    public String getSessionid() {
        return sessionid;
    }

    public void setSessionid(String sessionid) {
        this.sessionid = sessionid;
    }

    public int getAllocatedto() {
        return allocatedto;
    }

    public void setAllocatedto(int allocatedto) {
        this.allocatedto = allocatedto;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getFromdate() {
        return fromdate;
    }

    public void setFromdate(long fromdate) {
        this.fromdate = fromdate;
    }

    public long getTodate() {
        return todate;
    }

    public void setTodate(long todate) {
        this.todate = todate;
    }

    public float getTothostelfee() {
        return tothostelfee;
    }

    public void setTothostelfee(float tothostelfee) {
        this.tothostelfee = tothostelfee;
    }

    public String getFeepaidstatus() {
        return feepaidstatus;
    }

    public void setFeepaidstatus(String feepaidstatus) {
        this.feepaidstatus = feepaidstatus;
    }

    public int getPaid() {
        return paid;
    }

    public void setPaid(int paid) {
        this.paid = paid;
    }

    public int getNotification() {
        return notification;
    }

    public void setNotification(int notification) {
        this.notification = notification;
    }

    public String getPaidon() {
        return paidon;
    }

    public void setPaidon(String paidon) {
        this.paidon = paidon;
    }

    public String getPaidby() {
        return paidby;
    }

    public void setPaidby(String paidby) {
        this.paidby = paidby;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public int getAllocateto() {
        return allocateto;
    }

    public void setAllocateto(int allocateto) {
        this.allocateto = allocateto;
    }



    public String getStudentid() {
        return studentid;
    }

    public void setStudentid(String studentid) {
        this.studentid = studentid;
    }

    public String getTeacherid() {
        return teacherid;
    }

    public void setTeacherid(String teacherid) {
        this.teacherid = teacherid;
    }

    public float getTotamount() {
        return totamount;
    }

    public void setTotamount(float totamount) {
        this.totamount = totamount;
    }
 
}
