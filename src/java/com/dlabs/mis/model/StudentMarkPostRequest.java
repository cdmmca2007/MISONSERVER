/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.model;

/**
 *
 * @author cd
 */
public class StudentMarkPostRequest {
    private String classid;
    private String sessionid;
    private String examtypeidid;
    private String studentid;
    private String subjectid;
    private int rolltype;

    public int getRolltype() {
        return rolltype;
    }

    public void setRolltype(int rolltype) {
        this.rolltype = rolltype;
    }
    public String getSubjectid() {
        return subjectid;
    }

    public void setSubjectid(String subjectid) {
        this.subjectid = subjectid;
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

    public String getExamtypeidid() {
        return examtypeidid;
    }

    public void setExamtypeidid(String examtypeidid) {
        this.examtypeidid = examtypeidid;
    }

    public String getStudentid() {
        return studentid;
    }

    public void setStudentid(String studentid) {
        this.studentid = studentid;
    }
    
    
}
