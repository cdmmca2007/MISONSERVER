/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.model;

import java.util.Date;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown=true)
public class Student {
        private String  studentid;
        private String  name;
        private Long    dob;
        private String  address;
        private String  fathername;
        private String  mothername;
        private String  caretakername;
        private String  parentemailid;
        private String  parentmobile;
        private String  alternateemailid;
        private String  alternatemobile;
        private String  classid;
        private String  schoolid;
        private String  createdby;
        private Date    createdon;
        private String  modifiedby;
        private Date    modifiedon;
        private String  religion;
        private String  cityid;
        private String  stateid;
        private String  countryid;
        private String  userid;
        private Long    admissiondate;
        private String  session_id;

    public String getSession_id() {
        return session_id;
    }

    public void setSession_id(String session_id) {
        this.session_id = session_id;
    }

    public Long getAdmissiondate() {
        return admissiondate;
    }

    public void setAdmissiondate(Long admissiondate) {
        this.admissiondate = admissiondate;
    }

        
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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

    public String getCaretakername() {
        return caretakername;
    }

    public void setCaretakername(String caretakername) {
        this.caretakername = caretakername;
    }

    public String getCityid() {
        return cityid;
    }

    public void setCityid(String cityid) {
        this.cityid = cityid;
    }

    public String getClassid() {
        return classid;
    }

    public void setClassid(String classid) {
        this.classid = classid;
    }

    public String getCountryid() {
        return countryid;
    }

    public void setCountryid(String countryid) {
        this.countryid = countryid;
    }

    public String getCreatedby() {
        return createdby;
    }

    public void setCreatedby(String createdby) {
        this.createdby = createdby;
    }

    public Date getCreatedon() {
        return createdon;
    }

    public void setCreatedon(Date createdon) {
        this.createdon = createdon;
    }

    public Long getDob() {
        return dob;
    }

    public void setDob(Long dob) {
        this.dob = dob;
    }

    public String getFathername() {
        return fathername;
    }

    public void setFathername(String fathername) {
        this.fathername = fathername;
    }

    public String getModifiedby() {
        return modifiedby;
    }

    public void setModifiedby(String modifiedby) {
        this.modifiedby = modifiedby;
    }

    public Date getModifiedon() {
        return modifiedon;
    }

    public void setModifiedon(Date modifiedon) {
        this.modifiedon = modifiedon;
    }

    public String getMothername() {
        return mothername;
    }

    public void setMothername(String mothername) {
        this.mothername = mothername;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getReligion() {
        return religion;
    }

    public void setReligion(String religion) {
        this.religion = religion;
    }

    public String getSchoolid() {
        return schoolid;
    }

    public void setSchoolid(String schoolid) {
        this.schoolid = schoolid;
    }

    public String getStateid() {
        return stateid;
    }

    public void setStateid(String stateid) {
        this.stateid = stateid;
    }

    public String getStudentid() {
        return studentid;
    }

    public void setStudentid(String studentid) {
        this.studentid = studentid;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

}
