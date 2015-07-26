/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.model;

/**
 *
 * @author cd
 */
public class StudentMark {
 
    private String id ;
    private String classname;
    private String studentid ;
    private String studentname;
    private String examtype;
    private String sessionname;
    private int    appeared ;
    private int    markobtained;
    private String subjectname;
    private int    maxmark;
    private String examname;
    private int    passmark;
    private int    passstatus; 
    private String createdby ;
    private String createdon ;
    private String modifiedby ;
    private String modifiedon;
    private String comment;

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getClassname() {
        return classname;
    }

    public void setClassname(String classname) {
        this.classname = classname;
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

    public String getExamtype() {
        return examtype;
    }

    public void setExamtype(String examtype) {
        this.examtype = examtype;
    }

    public String getSessionname() {
        return sessionname;
    }

    public void setSessionname(String sessionname) {
        this.sessionname = sessionname;
    }

    public int getAppeared() {
        return appeared;
    }

    public void setAppeared(int appeared) {
        this.appeared = appeared;
    }

    public int getMarkobtained() {
        return markobtained;
    }

    public void setMarkobtained(int markobtained) {
        this.markobtained = markobtained;
    }

    public String getSubjectname() {
        return subjectname;
    }

    public void setSubjectname(String subjectname) {
        this.subjectname = subjectname;
    }

    public int getMaxmark() {
        return maxmark;
    }

    public void setMaxmark(int maxmark) {
        this.maxmark = maxmark;
    }

    public String getExamname() {
        return examname;
    }

    public void setExamname(String examname) {
        this.examname = examname;
    }

    public int getPassmark() {
        return passmark;
    }

    public void setPassmark(int passmark) {
        this.passmark = passmark;
    }

    public int getPassstatus() {
        return passstatus;
    }

    public void setPassstatus(int passstatus) {
        this.passstatus = passstatus;
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

    public String getModifiedby() {
        return modifiedby;
    }

    public void setModifiedby(String modifiedby) {
        this.modifiedby = modifiedby;
    }

    public String getModifiedon() {
        return modifiedon;
    }

    public void setModifiedon(String modifiedon) {
        this.modifiedon = modifiedon;
    }    
    
}
