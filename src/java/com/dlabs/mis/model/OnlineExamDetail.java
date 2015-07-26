/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.model;

import java.util.Date;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 *
 * @author XPPRESP3
 */
@JsonIgnoreProperties(ignoreUnknown=true)
public class OnlineExamDetail {

private String id; 
private String examname; 
private String classid; 
private String classname; 
private String subjectid; 
private String createdby; 
private String modifiedby; 
private String deletedby; 
private String return_msg;
private String comment;
int     ismandatory; 
int     publishexam; 
int     tot_ques_in_exam; 
int     pass_percent; 
int     deleted; 
int     operation_result;
private Date deletedon;
private Date createddon; 
private Date modifiedon;    
private String instruction;

    public String getInstruction() {
        return instruction;
    }

    public void setInstruction(String instruction) {
        this.instruction = instruction;
    }


    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getReturn_msg() {
        return return_msg;
    }

    public String getClassname() {
        return classname;
    }

    public void setClassname(String classname) {
        this.classname = classname;
    }

    public void setReturn_msg(String return_msg) {
        this.return_msg = return_msg;
    }

    public int getOperation_result() {
        return operation_result;
    }

    public void setOperation_result(int operation_result) {
        this.operation_result = operation_result;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getExamname() {
        return examname;
    }

    public void setExamname(String examname) {
        this.examname = examname;
    }

    public String getClassid() {
        return classid;
    }

    public void setClassid(String classid) {
        this.classid = classid;
    }

    public String getSubjectid() {
        return subjectid;
    }

    public void setSubjectid(String subjectid) {
        this.subjectid = subjectid;
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

    public String getDeletedby() {
        return deletedby;
    }

    public void setDeletedby(String deletedby) {
        this.deletedby = deletedby;
    }

    public int getIsmandatory() {
        return ismandatory;
    }

    public void setIsmandatory(int ismandatory) {
        this.ismandatory = ismandatory;
    }

    public int getPublishexam() {
        return publishexam;
    }

    public void setPublishexam(int publishexam) {
        this.publishexam = publishexam;
    }

    public int getTot_ques_in_exam() {
        return tot_ques_in_exam;
    }

    public void setTot_ques_in_exam(int tot_ques_in_exam) {
        this.tot_ques_in_exam = tot_ques_in_exam;
    }

    public int getPass_percent() {
        return pass_percent;
    }

    public void setPass_percent(int pass_percent) {
        this.pass_percent = pass_percent;
    }

    public int getDeleted() {
        return deleted;
    }

    public void setDeleted(int deleted) {
        this.deleted = deleted;
    }

    public Date getDeletedon() {
        return deletedon;
    }

    public void setDeletedon(Date deletedon) {
        this.deletedon = deletedon;
    }

    public Date getCreateddon() {
        return createddon;
    }

    public void setCreateddon(Date createddon) {
        this.createddon = createddon;
    }

    public Date getModifiedon() {
        return modifiedon;
    }

    public void setModifiedon(Date modifiedon) {
        this.modifiedon = modifiedon;
    }

}
