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
public class Timetable {

        private String id;
        private String teacherid;
        private String timetableid;
        private String classid ;
        private String sessionid;
	private String periodnumber ;
	private String mon_subject ;
	private String mon_teacher ;
	private String tues_subject ;
	private String tues_teacher ;
	private String wednes_subject;
	private String wednes_teacher ;
	private String thurs_subject;
	private String thurs_teacher ;
	private String fri_subject;
	private String fri_teacher ;
	private String satur_subject ;
	private String satur_teacher;
	private String createdby ;
	private String modifiedby ;
	private String schoolid;
        private String mon_comment;
	private String tues_comment;
        private String wednes_comment;
	private String thurs_comment;        
	private String fri_comment;        
	private String satur_comment;        
        private String monday;
        private String tuesday;
        private String wednesday;
        private String thursday;
        private String friday;
        private String saturday;
        private String day;
        private String mon_tch_text; 
        private String mon_sub_text;
        private String tues_tch_text;
        private String tues_sub_text;
        private String wednes_tch_text;
        private String wednes_sub_text;
        private String thurs_tch_text;
        private String thurs_sub_text;
        private String fri_tch_text;
        private String fri_sub_text;
        private String satur_tch_text;
        private String satur_sub_text;

    public String getMon_tch_text() {
        return mon_tch_text;
    }

    public void setMon_tch_text(String mon_tch_text) {
        this.mon_tch_text = mon_tch_text;
    }

    public String getMon_sub_text() {
        return mon_sub_text;
    }

    public void setMon_sub_text(String mon_sub_text) {
        this.mon_sub_text = mon_sub_text;
    }

    public String getTues_tch_text() {
        return tues_tch_text;
    }

    public void setTues_tch_text(String tues_tch_text) {
        this.tues_tch_text = tues_tch_text;
    }

    public String getTues_sub_text() {
        return tues_sub_text;
    }

    public void setTues_sub_text(String tues_sub_text) {
        this.tues_sub_text = tues_sub_text;
    }

    public String getWednes_tch_text() {
        return wednes_tch_text;
    }

    public void setWednes_tch_text(String wednes_tch_text) {
        this.wednes_tch_text = wednes_tch_text;
    }

    public String getWednes_sub_text() {
        return wednes_sub_text;
    }

    public void setWednes_sub_text(String wednes_sub_text) {
        this.wednes_sub_text = wednes_sub_text;
    }

    public String getThurs_tch_text() {
        return thurs_tch_text;
    }

    public void setThurs_tch_text(String thurs_tch_text) {
        this.thurs_tch_text = thurs_tch_text;
    }

    public String getThurs_sub_text() {
        return thurs_sub_text;
    }

    public void setThurs_sub_text(String thurs_sub_text) {
        this.thurs_sub_text = thurs_sub_text;
    }

    public String getFri_tch_text() {
        return fri_tch_text;
    }

    public void setFri_tch_text(String fri_tch_text) {
        this.fri_tch_text = fri_tch_text;
    }

    public String getFri_sub_text() {
        return fri_sub_text;
    }

    public void setFri_sub_text(String fri_sub_text) {
        this.fri_sub_text = fri_sub_text;
    }

    public String getSatur_tch_text() {
        return satur_tch_text;
    }

    public void setSatur_tch_text(String satur_tch_text) {
        this.satur_tch_text = satur_tch_text;
    }

    public String getSatur_sub_text() {
        return satur_sub_text;
    }

    public void setSatur_sub_text(String satur_sub_text) {
        this.satur_sub_text = satur_sub_text;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public String getTeacherid() {
        return teacherid;
    }

    public void setTeacherid(String teacherid) {
        this.teacherid = teacherid;
    }

    public String getSessionid() {
        return sessionid;
    }

    public void setSessionid(String sessionid) {
        this.sessionid = sessionid;
    }
        
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getWednes_subject() {
        return wednes_subject;
    }

    public void setWednes_subject(String wednes_subject) {
        this.wednes_subject = wednes_subject;
    }

    public String getWednes_teacher() {
        return wednes_teacher;
    }

    public void setWednes_teacher(String wednes_teacher) {
        this.wednes_teacher = wednes_teacher;
    }

    public String getSatur_subject() {
        return satur_subject;
    }

    public void setSatur_subject(String satur_subject) {
        this.satur_subject = satur_subject;
    }

    public String getSatur_teacher() {
        return satur_teacher;
    }

    public void setSatur_teacher(String satur_teacher) {
        this.satur_teacher = satur_teacher;
    }

    public String getMon_comment() {
        return mon_comment;
    }

    public void setMon_comment(String mon_comment) {
        this.mon_comment = mon_comment;
    }

    public String getTues_comment() {
        return tues_comment;
    }

    public void setTues_comment(String tues_comment) {
        this.tues_comment = tues_comment;
    }

    public String getWednes_comment() {
        return wednes_comment;
    }

    public void setWednes_comment(String wednes_comment) {
        this.wednes_comment = wednes_comment;
    }

    public String getThurs_comment() {
        return thurs_comment;
    }

    public void setThurs_comment(String thurs_comment) {
        this.thurs_comment = thurs_comment;
    }

    public String getFri_comment() {
        return fri_comment;
    }

    public void setFri_comment(String fri_comment) {
        this.fri_comment = fri_comment;
    }

    public String getSatur_comment() {
        return satur_comment;
    }

    public void setSatur_comment(String satur_comment) {
        this.satur_comment = satur_comment;
    }

    public String getMonday() {
        return monday;
    }

    public void setMonday(String monday) {
        this.monday = monday;
    }

    public String getTuesday() {
        return tuesday;
    }

    public void setTuesday(String tuesday) {
        this.tuesday = tuesday;
    }

    public String getWednesday() {
        return wednesday;
    }

    public void setWednesday(String wednesday) {
        this.wednesday = wednesday;
    }

    public String getThursday() {
        return thursday;
    }

    public void setThursday(String thursday) {
        this.thursday = thursday;
    }

    public String getFriday() {
        return friday;
    }

    public void setFriday(String friday) {
        this.friday = friday;
    }

    public String getSaturday() {
        return saturday;
    }

    public void setSaturday(String saturday) {
        this.saturday = saturday;
    }
    public String getClassid() {
        return classid;
    }

    public void setClassid(String classid) {
        this.classid = classid;
    }

    public String getCreatedby() {
        return createdby;
    }

    public void setCreatedby(String createdby) {
        this.createdby = createdby;
    }

    public String getFri_subject() {
        return fri_subject;
    }

    public void setFri_subject(String fri_subject) {
        this.fri_subject = fri_subject;
    }

    public String getFri_teacher() {
        return fri_teacher;
    }

    public void setFri_teacher(String fri_teacher) {
        this.fri_teacher = fri_teacher;
    }

    public String getModifiedby() {
        return modifiedby;
    }

    public void setModifiedby(String modifiedby) {
        this.modifiedby = modifiedby;
    }

    public String getMon_subject() {
        return mon_subject;
    }

    public void setMon_subject(String mon_subject) {
        this.mon_subject = mon_subject;
    }

    public String getMon_teacher() {
        return mon_teacher;
    }

    public void setMon_teacher(String mon_teacher) {
        this.mon_teacher = mon_teacher;
    }

    public String getPeriodnumber() {
        return periodnumber;
    }

    public void setPeriod(String periodnumber) {
        this.periodnumber = periodnumber;
    }

    public String getSchoolid() {
        return schoolid;
    }

    public void setSchoolid(String schoolid) {
        this.schoolid = schoolid;
    }

    public String getThurs_subject() {
        return thurs_subject;
    }

    public void setThurs_subject(String thurs_subject) {
        this.thurs_subject = thurs_subject;
    }

    public String getThurs_teacher() {
        return thurs_teacher;
    }

    public void setThurs_teacher(String thurs_teacher) {
        this.thurs_teacher = thurs_teacher;
    }

    public String getTimetableid() {
        return timetableid;
    }

    public void setTimetableid(String timetableid) {
        this.timetableid = timetableid;
    }

    public String getTues_subject() {
        return tues_subject;
    }

    public void setTues_subject(String tues_subject) {
        this.tues_subject = tues_subject;
    }

    public String getTues_teacher() {
        return tues_teacher;
    }

    public void setTues_teacher(String tues_teacher) {
        this.tues_teacher = tues_teacher;
    }
}
