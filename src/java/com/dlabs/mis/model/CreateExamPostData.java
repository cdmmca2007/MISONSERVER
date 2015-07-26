/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.model;

/**
 *
 * @author cd
 */
public class CreateExamPostData {
    
    private String classid;
    private String sessionid;
    private String examtypeidid;

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

    public String getExamtypeidid() {
        return examtypeidid;
    }

    public void setExamtypeidid(String examtypeidid) {
        this.examtypeidid = examtypeidid;
    }
        
}
