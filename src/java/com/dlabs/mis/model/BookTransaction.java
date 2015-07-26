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
public class BookTransaction {
    private String id;
    private String bookid;
    private String classid;
    private String teacherid;
    private int    issueto;
    private String sessionid;
    private String batchid;
    private String studentid;
    private long   fromdate;
    private long   todate;
    private long   issueddate;
    private String issuedby;
    private int    returnedflag;
    private long   returndate;
    private int    renewedflag;
    private int    renewdnumber;
    private int    latefineflag;
    private float  fineamount;
    private String description;
    private int    result;

    public int getResult() {
        return result;
    }

    public void setResult(int result) {
        this.result = result;
    }
    public int getIssueto() {
        return issueto;
    }

    public void setIssueto(int issueto) {
        this.issueto = issueto;
    }

    public String getTeacherid() {
        return teacherid;
    }

    public void setTeacherid(String teacherid) {
        this.teacherid = teacherid;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBookid() {
        return bookid;
    }

    public void setBookid(String bookid) {
        this.bookid = bookid;
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

    public long getFromdate() {
        return fromdate;
    }

    public void setFromdate(long fromdate) {
        this.fromdate = fromdate;
    }

    public long getTodate() {
        return todate;
    }

    public void setTodate(long todate) {
        this.todate = todate;
    }

    public long getIssueddate() {
        return issueddate;
    }

    public void setIssueddate(long issueddate) {
        this.issueddate = issueddate;
    }

    public String getIssuedby() {
        return issuedby;
    }

    public void setIssuedby(String issuedby) {
        this.issuedby = issuedby;
    }

    public int getReturnedflag() {
        return returnedflag;
    }

    public void setReturnedflag(int returnedflag) {
        this.returnedflag = returnedflag;
    }

    public long getReturndate() {
        return returndate;
    }

    public void setReturndate(long returndate) {
        this.returndate = returndate;
    }

    public int getRenewedflag() {
        return renewedflag;
    }

    public void setRenewedflag(int renewedflag) {
        this.renewedflag = renewedflag;
    }

    public int getRenewdnumber() {
        return renewdnumber;
    }

    public void setRenewdnumber(int renewdnumber) {
        this.renewdnumber = renewdnumber;
    }

    public int getLatefineflag() {
        return latefineflag;
    }

    public void setLatefineflag(int latefineflag) {
        this.latefineflag = latefineflag;
    }

    public float getFineamount() {
        return fineamount;
    }

    public void setFineamount(float fineamount) {
        this.fineamount = fineamount;
    }
}
