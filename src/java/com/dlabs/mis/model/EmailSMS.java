/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.model;

/**
 *
 * @author XPPRESP3
 */
public class EmailSMS {
private String studentid;
private String name;
private String classid;
private String sessionid;
private String fathername;
private String mothername;
private String parentemailid;
private String parentmobile;
private String alternateemailid;
private String alternatemobile;
private int    emailalert;
private int    smsalert;
private int    type;
private int    action;        
private String schoolid;
private String result;
private String createdby;
private String modifiedby;

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

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public int getAction() {
        return action;
    }

    public void setAction(int action) {
        this.action = action;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getStudentid() {
        return studentid;
    }

    public void setStudentid(String studentid) {
        this.studentid = studentid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getFathername() {
        return fathername;
    }

    public void setFathername(String fathername) {
        this.fathername = fathername;
    }

    public String getMothername() {
        return mothername;
    }

    public void setMothername(String mothername) {
        this.mothername = mothername;
    }

    public String getParentemailid() {
        return parentemailid;
    }

    public void setParentemailid(String parentemailid) {
        this.parentemailid = parentemailid;
    }

    public String getParentmobile() {
        return parentmobile;
    }

    public void setParentmobile(String parentmobile) {
        this.parentmobile = parentmobile;
    }

    public String getAlternateemailid() {
        return alternateemailid;
    }

    public void setAlternateemailid(String alternateemailid) {
        this.alternateemailid = alternateemailid;
    }

    public String getAlternatemobile() {
        return alternatemobile;
    }

    public void setAlternatemobile(String alternatemobile) {
        this.alternatemobile = alternatemobile;
    }

    public int getEmailalert() {
        return emailalert;
    }

    public void setEmailalert(int emailalert) {
        this.emailalert = emailalert;
    }

    public int getSmsalert() {
        return smsalert;
    }

    public void setSmsalert(int smsalert) {
        this.smsalert = smsalert;
    }

    public String getSchoolid() {
        return schoolid;
    }

    public void setSchoolid(String schoolid) {
        this.schoolid = schoolid;
    }

}
