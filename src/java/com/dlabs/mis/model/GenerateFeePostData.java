/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.model;

/**
 *
 * @author cd
 */
public class GenerateFeePostData {
    private String sessionid;
    private String classid;
    private int    monthid;
    private long   duedate;
    public long getDuedate() {
        return duedate;
    }

    public void setDuedate(long duedate) {
        this.duedate = duedate;
    }
    
    
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

    public int getMonthid() {
        return monthid;
    }

    public void setMonthid(int monthid) {
        this.monthid = monthid;
    }        
    
}
