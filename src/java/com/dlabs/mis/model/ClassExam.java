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
public class ClassExam {


        private String createby;
	private String createdname;
        private String createdon ;
	private String modifiedby;
	private String modifiedname; 
	private String modifiedon;         
        private String pid      ;
	private String classid ;
	private String classname;
	private String examtypeid;
	private String examtype;
	private String examname ;
	private String sessionid;
	private String sessionname;
        private String subjectid;
	private String subjectname;
	private int    maxmark;
	private int    passmark;
	private String teacherid;
	private String teachername;
        private long   examdate;
       	private long   starttime;
	private long   endtime;
        private int    submited;

    public int getSubmited() {
        return submited;
    }

    public void setSubmited(int submited) {
        this.submited = submited;
    }
        
    public String getCreateby() {
        return createby;
    }

    public void setCreateby(String createby) {
        this.createby = createby;
    }

    public String getCreatedname() {
        return createdname;
    }

    public void setCreatedname(String createdname) {
        this.createdname = createdname;
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

    public String getModifiedname() {
        return modifiedname;
    }

    public void setModifiedname(String modifiedname) {
        this.modifiedname = modifiedname;
    }

    public String getModifiedon() {
        return modifiedon;
    }

    public void setModifiedon(String modifiedon) {
        this.modifiedon = modifiedon;
    }

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getClassid() {
        return classid;
    }

    public void setClassid(String classid) {
        this.classid = classid;
    }

    public String getClassname() {
        return classname;
    }

    public void setClassname(String classname) {
        this.classname = classname;
    }

    public String getExamtypeid() {
        return examtypeid;
    }

    public void setExamtypeid(String examtypeid) {
        this.examtypeid = examtypeid;
    }

    public String getExamtype() {
        return examtype;
    }

    public void setExamtype(String examtype) {
        this.examtype = examtype;
    }

    public String getExamname() {
        return examname;
    }

    public void setExamname(String examname) {
        this.examname = examname;
    }

    public String getSessionid() {
        return sessionid;
    }

    public void setSessionid(String sessionid) {
        this.sessionid = sessionid;
    }

    public String getSessionname() {
        return sessionname;
    }

    public void setSessionname(String sessionname) {
        this.sessionname = sessionname;
    }

    public String getSubjectid() {
        return subjectid;
    }

    public void setSubjectid(String subjectid) {
        this.subjectid = subjectid;
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

    public int getPassmark() {
        return passmark;
    }

    public void setPassmark(int passmark) {
        this.passmark = passmark;
    }

    public String getTeacherid() {
        return teacherid;
    }

    public void setTeacherid(String teacherid) {
        this.teacherid = teacherid;
    }

    public String getTeachername() {
        return teachername;
    }

    public void setTeachername(String teachername) {
        this.teachername = teachername;
    }

    public long getExamdate() {
        return examdate;
    }

    public void setExamdate(long examdate) {
        this.examdate = examdate;
    }

    public long getStarttime() {
        return starttime;
    }

    public void setStarttime(long starttime) {
        this.starttime = starttime;
    }

    public long getEndtime() {
        return endtime;
    }

    public void setEndtime(long endtime) {
        this.endtime = endtime;
    }
        
        
}
