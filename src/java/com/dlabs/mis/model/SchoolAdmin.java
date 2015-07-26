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
public class SchoolAdmin {
    private int    flag;
    private String schoolid;
    private String schoolname;
    private String description;
    private String file1;
    private String schooltitle;
    private long   startdate;
    private String pricipalname;
    private String websiteurl;
    private String addressid;
    private String addressline1;
    private String addressline2;
    private String city;
    private String state;
    private String country;
    private String pinnumber;
    private String contactid;
    private String contact1;
    private String contact2;
    private String contact3;
    private String emailid1;
    private String emailid2;
    private String affiliationid;
    private String affiliationwith;
    private long   affilationdate;
    private String schoolgrade;
    private String othersettingid;
    private long   starttime;
    private long   endtime;
    private int totnoofperiod;
    private int maxschstanderd;
    private int minstandered;
    private String smsemailid;
    private String smsalert;
    private String emailalert;

    public String getSchoolid() {
        return schoolid;
    }

    public void setSchoolid(String schoolid) {
        this.schoolid = schoolid;
    }

    public String getSchoolname() {
        return schoolname;
    }

    public void setSchoolname(String schoolname) {
        this.schoolname = schoolname;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getFile1() {
        return file1;
    }

    public void setFile1(String file1) {
        this.file1 = file1;
    }

    public String getSchooltitle() {
        return schooltitle;
    }

    public void setSchooltitle(String schooltitle) {
        this.schooltitle = schooltitle;
    }

    public long getStartdate() {
        return startdate;
    }

    public void setStartdate(long startdate) {
        this.startdate = startdate;
    }

    public String getPricipalname() {
        return pricipalname;
    }

    public void setPricipalname(String pricipalname) {
        this.pricipalname = pricipalname;
    }

    public String getWebsiteurl() {
        return websiteurl;
    }

    public void setWebsiteurl(String websiteurl) {
        this.websiteurl = websiteurl;
    }

    public String getAddressid() {
        return addressid;
    }

    public void setAddressid(String addressid) {
        this.addressid = addressid;
    }

    public String getAddressline1() {
        return addressline1;
    }

    public void setAddressline1(String addressline1) {
        this.addressline1 = addressline1;
    }

    public String getAddressline2() {
        return addressline2;
    }

    public void setAddressline2(String addressline2) {
        this.addressline2 = addressline2;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPinnumber() {
        return pinnumber;
    }

    public void setPinnumber(String pinnumber) {
        this.pinnumber = pinnumber;
    }

    public String getContactid() {
        return contactid;
    }

    public void setContactid(String contactid) {
        this.contactid = contactid;
    }

    public String getContact1() {
        return contact1;
    }

    public void setContact1(String contact1) {
        this.contact1 = contact1;
    }

    public String getContact2() {
        return contact2;
    }

    public void setContact2(String contact2) {
        this.contact2 = contact2;
    }

    public String getContact3() {
        return contact3;
    }

    public void setContact3(String contact3) {
        this.contact3 = contact3;
    }

    public String getEmailid1() {
        return emailid1;
    }

    public void setEmailid1(String emailid1) {
        this.emailid1 = emailid1;
    }

    public String getEmailid2() {
        return emailid2;
    }

    public void setEmailid2(String emailid2) {
        this.emailid2 = emailid2;
    }

    public String getAffiliationid() {
        return affiliationid;
    }

    public void setAffiliationid(String affiliationid) {
        this.affiliationid = affiliationid;
    }

    public String getAffiliationwith() {
        return affiliationwith;
    }

    public void setAffiliationwith(String affiliationwith) {
        this.affiliationwith = affiliationwith;
    }


    public String getSchoolgrade() {
        return schoolgrade;
    }

    public void setSchoolgrade(String schoolgrade) {
        this.schoolgrade = schoolgrade;
    }

    public String getOthersettingid() {
        return othersettingid;
    }

    public void setOthersettingid(String othersettingid) {
        this.othersettingid = othersettingid;
    }


    public String getSmsemailid() {
        return smsemailid;
    }

    public void setSmsemailid(String smsemailid) {
        this.smsemailid = smsemailid;
    }

    public String getSmsalert() {
        return smsalert;
    }

    public void setSmsalert(String smsalert) {
        this.smsalert = smsalert;
    }

    public String getEmailalert() {
        return emailalert;
    }

    public void setEmailalert(String emailalert) {
        this.emailalert = emailalert;
    }

    public int getFlag() {
        return flag;
    }

    public void setFlag(int flag) {
        this.flag = flag;
    }

    public long getAffilationdate() {
        return affilationdate;
    }

    public void setAffilationdate(long affilationdate) {
        this.affilationdate = affilationdate;
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

    public int getTotnoofperiod() {
        return totnoofperiod;
    }

    public void setTotnoofperiod(int totnoofperiod) {
        this.totnoofperiod = totnoofperiod;
    }

    public int getMaxschstanderd() {
        return maxschstanderd;
    }

    public void setMaxschstanderd(int maxschstanderd) {
        this.maxschstanderd = maxschstanderd;
    }

    public int getMinstandered() {
        return minstandered;
    }

    public void setMinstandered(int minstandered) {
        this.minstandered = minstandered;
    }

    
    
}
