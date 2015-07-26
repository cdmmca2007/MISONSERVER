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
public class ScheduleStrudentInterviewExam {
    
    private String     formno;
    private String  sessionid;
    private String  classid;
    private long    interviewdate;
    private long    examdate;
    private int     intrwapplicable;
    private int     examapplicable;
    private int     result;
    private String  modifiedby;
    private String  emailid;

    public String getEmailid() {
        return emailid;
    }

    public void setEmailid(String emailid) {
        this.emailid = emailid;
    }
    
    public String getModifiedby() {
        return modifiedby;
    }

    public void setModifiedby(String modifiedby) {
        this.modifiedby = modifiedby;
    }
    
    public String getFormno() {
        return formno;
    }

    public void setFormno(String formno) {
        this.formno = formno;
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

    public long getInterviewdate() {
        return interviewdate;
    }

    public void setInterviewdate(long interviewdate) {
        this.interviewdate = interviewdate;
    }

    public long getExamdate() {
        return examdate;
    }

    public void setExamdate(long examdate) {
        this.examdate = examdate;
    }

    public int getIntrwapplicable() {
        return intrwapplicable;
    }

    public void setIntrwapplicable(int intrwapplicable) {
        this.intrwapplicable = intrwapplicable;
    }

    public int getExamapplicable() {
        return examapplicable;
    }

    public void setExamapplicable(int examapplicable) {
        this.examapplicable = examapplicable;
    }

    public int getResult() {
        return result;
    }

    public void setResult(int result) {
        this.result = result;
    }
    
}
