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
public class StudentHomeWorkStatusModel {
    
        private String pid;
	private String homeworkid;
	private String studentid;
        private String studentname;
	private int    status;
        private String statusname;
	private String submitteddate;
	private String docpath;
	private String uploadedby;
        private String uploadedname;
	private String uploadedon;

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getHomeworkid() {
        return homeworkid;
    }

    public void setHomeworkid(String homeworkid) {
        this.homeworkid = homeworkid;
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

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getStatusname() {
        return statusname;
    }

    public void setStatusname(String statusname) {
        this.statusname = statusname;
    }

    public String getSubmitteddate() {
        return submitteddate;
    }

    public void setSubmitteddate(String submitteddate) {
        this.submitteddate = submitteddate;
    }

    public String getDocpath() {
        return docpath;
    }

    public void setDocpath(String docpath) {
        this.docpath = docpath;
    }

    public String getUploadedby() {
        return uploadedby;
    }

    public void setUploadedby(String uploadedby) {
        this.uploadedby = uploadedby;
    }

    public String getUploadedname() {
        return uploadedname;
    }

    public void setUploadedname(String uploadedname) {
        this.uploadedname = uploadedname;
    }

    public String getUploadedon() {
        return uploadedon;
    }

    public void setUploadedon(String uploadedon) {
        this.uploadedon = uploadedon;
    }
    
}
