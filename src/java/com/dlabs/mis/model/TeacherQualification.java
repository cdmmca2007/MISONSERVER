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
public class TeacherQualification {
 
private String  pid; 
private String  teacherid; 
private String	educationlevel; 
private String	qualification; 
private String	university; 
private String	collegename; 
private String	scoretype; 
private String	score; 
private String	dicipline; 
private long	passingyear; 
private String	createdby;
private String  tab;


    public String getTab() {
        return tab;
    }

    public void setTab(String tab) {
        this.tab = tab;
    }



    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getTeacherid() {
        return teacherid;
    }

    public void setTeacherid(String teacherid) {
        this.teacherid = teacherid;
    }

    public String getEducationlevel() {
        return educationlevel;
    }

    public void setEducationlevel(String educationlevel) {
        this.educationlevel = educationlevel;
    }

    public String getQualification() {
        return qualification;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    public String getUniversity() {
        return university;
    }

    public void setUniversity(String university) {
        this.university = university;
    }

    public String getCollegename() {
        return collegename;
    }

    public void setCollegename(String collegename) {
        this.collegename = collegename;
    }

    public String getScoretype() {
        return scoretype;
    }

    public void setScoretype(String scoretype) {
        this.scoretype = scoretype;
    }

    public String getScore() {
        return score;
    }

    public void setScore(String score) {
        this.score = score;
    }

    public String getDicipline() {
        return dicipline;
    }

    public void setDicipline(String dicipline) {
        this.dicipline = dicipline;
    }

    public long getPassingyear() {
        return passingyear;
    }

    public void setPassingyear(long passingyear) {
        this.passingyear = passingyear;
    }

    public String getCreatedby() {
        return createdby;
    }

    public void setCreatedby(String createdby) {
        this.createdby = createdby;
    }
    
}
