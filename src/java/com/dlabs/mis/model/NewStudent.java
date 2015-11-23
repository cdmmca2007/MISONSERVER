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
public class NewStudent {
 
    
    private String batchid;
    private String studentid;
    private String sessionname;
    private String admissionno;
    private String formno;
    private String session_id;
    private String fname;
    private String mname;
    private String lname;
    private String classid;
    private long   dob;
    private long   admissiondate1;
    private String religion;
    private String nationality;
    private String mother_tounge;
    private String passport_no;
    private String ssn;
    private String visadetail;
    private String uid;
    private String aadhar_id;
    private String fathername;
    private String mothername;
    private String caretakername;
    private String occupation;
    private String fatherhighestedu;
    private float  annualincome;
    private String parentemailid;
    private String alternateemailid;
    private String parentmobile;
    private String alternatemobile;
    private String address;
    private String stateid;
    private String cityid;
    private long   intrvexamdate;
    private String selectteststatus;
    private int    totscore;
    private long   intrviewdate;
    private String selectinterstatus;
    private String intervcomment;
    private int    gender;
    private String blood_group;
    private String image_path;
    private String createdby;
    private String modifiedby;
    private String admissiontype;
    private int    online;
    private String interviewid,entranceexamid , category ;
    private String previledged_student;
    private String motherhishedu;

    public String getMotherhishedu() {
        return motherhishedu;
    }

    public void setMotherhishedu(String motherhishedu) {
        this.motherhishedu = motherhishedu;
    }
    

    public String getPreviledged_student() {
        return previledged_student;
    }

    public void setPreviledged_student(String previledged_student) {
        this.previledged_student = previledged_student;
    }

    
    
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
    

    public String getInterviewid() {
        return interviewid;
    }

    public void setInterviewid(String interviewid) {
        this.interviewid = interviewid;
    }

    public String getEntranceexamid() {
        return entranceexamid;
    }

    public void setEntranceexamid(String entranceexamid) {
        this.entranceexamid = entranceexamid;
    }
    
    public int getOnline() {
        return online;
    }

    public void setOnline(int online) {
        this.online = online;
    }
    
    public String getAdmissiontype() {
        return admissiontype;
    }

    public void setAdmissiontype(String admissiontype) {
        this.admissiontype = admissiontype;
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

    public String getImage_path() {
        return image_path;
    }

    public void setImage_path(String image_path) {
        this.image_path = image_path;
    }
    
    

    public String getBlood_group() {
        return blood_group;
    }

    public void setBlood_group(String blood_group) {
        this.blood_group = blood_group;
    }

    public int getGender() {
        return gender;
    }

    public void setGender(int gender) {
        this.gender = gender;
    }

    public String getBatchid() {
        return batchid;
    }

    public void setBatchid(String batchid) {
        this.batchid = batchid;
    }

    public String getStudentid() {
        return studentid;
    }

    public void setStudentid(String studentid) {
        this.studentid = studentid;
    }

    public String getSessionname() {
        return sessionname;
    }

    public void setSessionname(String sessionname) {
        this.sessionname = sessionname;
    }

    public String getAdmissionno() {
        return admissionno;
    }

    public void setAdmissionno(String admissionno) {
        this.admissionno = admissionno;
    }

    public String getFormno() {
        return formno;
    }

    public void setFormno(String formno) {
        this.formno = formno;
    }

    public String getSession_id() {
        return session_id;
    }

    public void setSession_id(String session_id) {
        this.session_id = session_id;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getMname() {
        return mname;
    }

    public void setMname(String mname) {
        this.mname = mname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getClassid() {
        return classid;
    }

    public void setClassid(String classid) {
        this.classid = classid;
    }

    public long getDob() {
        return dob;
    }

    public void setDob(long dob) {
        this.dob = dob;
    }

    public long getAdmissiondate1() {
        return admissiondate1;
    }

    public void setAdmissiondate1(long admissiondate1) {
        this.admissiondate1 = admissiondate1;
    }

    public String getReligion() {
        return religion;
    }

    public void setReligion(String religion) {
        this.religion = religion;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getMother_tounge() {
        return mother_tounge;
    }

    public void setMother_tounge(String mother_tounge) {
        this.mother_tounge = mother_tounge;
    }

    public String getPassport_no() {
        return passport_no;
    }

    public void setPassport_no(String passport_no) {
        this.passport_no = passport_no;
    }

    public String getSsn() {
        return ssn;
    }

    public void setSsn(String ssn) {
        this.ssn = ssn;
    }

    public String getVisadetail() {
        return visadetail;
    }

    public void setVisadetail(String visadetail) {
        this.visadetail = visadetail;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getAadhar_id() {
        return aadhar_id;
    }

    public void setAadhar_id(String aadhar_id) {
        this.aadhar_id = aadhar_id;
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

    public String getCaretakername() {
        return caretakername;
    }

    public void setCaretakername(String caretakername) {
        this.caretakername = caretakername;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getFatherhighestedu() {
        return fatherhighestedu;
    }

    public void setFatherhighestedu(String fatherhighestedu) {
        this.fatherhighestedu = fatherhighestedu;
    }

    public float getAnnualincome() {
        return annualincome;
    }

    public void setAnnualincome(float annualincome) {
        this.annualincome = annualincome;
    }

   public String getParentemailid() {
        return parentemailid;
    }

    public void setParentemailid(String parentemailid) {
        this.parentemailid = parentemailid;
    }

    public String getAlternateemailid() {
        return alternateemailid;
    }

    public void setAlternateemailid(String alternateemailid) {
        this.alternateemailid = alternateemailid;
    }

    public String getParentmobile() {
        return parentmobile;
    }

    public void setParentmobile(String parentmobile) {
        this.parentmobile = parentmobile;
    }

    public String getAlternatemobile() {
        return alternatemobile;
    }

    public void setAlternatemobile(String alternatemobile) {
        this.alternatemobile = alternatemobile;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getStateid() {
        return stateid;
    }

    public void setStateid(String stateid) {
        this.stateid = stateid;
    }

    public String getCityid() {
        return cityid;
    }

    public void setCityid(String cityid) {
        this.cityid = cityid;
    }

    public long getIntrvexamdate() {
        return intrvexamdate;
    }

    public void setIntrvexamdate(long intrvexamdate) {
        this.intrvexamdate = intrvexamdate;
    }

    public String getSelectteststatus() {
        return selectteststatus;
    }

    public void setSelectteststatus(String selectteststatus) {
        this.selectteststatus = selectteststatus;
    }

    public int getTotscore() {
        return totscore;
    }

    public void setTotscore(int totscore) {
        this.totscore = totscore;
    }

    public long getIntrviewdate() {
        return intrviewdate;
    }

    public void setIntrviewdate(long intrviewdate) {
        this.intrviewdate = intrviewdate;
    }

    public String getSelectinterstatus() {
        return selectinterstatus;
    }

    public void setSelectinterstatus(String selectinterstatus) {
        this.selectinterstatus = selectinterstatus;
    }

    public String getIntervcomment() {
        return intervcomment;
    }

    public void setIntervcomment(String intervcomment) {
        this.intervcomment = intervcomment;
    }

}
