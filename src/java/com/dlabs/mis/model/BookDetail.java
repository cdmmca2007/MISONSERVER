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
public class BookDetail {
    private String batch_id;
    private String sessionid;
    private String id;
    private int    bookno;
    private String booktype;
    private String title;
    private String publisher;
    private String author;
    private String bookcode;
    private String bookedition;
    private String description;
    private float  price;
    private String forsubject;
    private String forclass;
    private String softcopyavailable;
    private int    totalcopy;
    private int    totissued;
    private int    deleted;
    private String createdby;
    private long   createdon;
    private long   modifiedon;
    private String modifiedby;

    public String getBatch_id() {
        return batch_id;
    }

    public void setBatch_id(String batch_id) {
        this.batch_id = batch_id;
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

    public int getBookno() {
        return bookno;
    }

    public void setBookno(int bookno) {
        this.bookno = bookno;
    }

    public String getBooktype() {
        return booktype;
    }

    public void setBooktype(String booktype) {
        this.booktype = booktype;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getBookcode() {
        return bookcode;
    }

    public void setBookcode(String bookcode) {
        this.bookcode = bookcode;
    }

    public String getBookedition() {
        return bookedition;
    }

    public void setBookedition(String bookedition) {
        this.bookedition = bookedition;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getForsubject() {
        return forsubject;
    }

    public void setForsubject(String forsubject) {
        this.forsubject = forsubject;
    }

    public String getForclass() {
        return forclass;
    }

    public void setForclass(String forclass) {
        this.forclass = forclass;
    }

    public String getSoftcopyavailable() {
        return softcopyavailable;
    }

    public void setSoftcopyavailable(String softcopyavailable) {
        this.softcopyavailable = softcopyavailable;
    }

    public int getTotalcopy() {
        return totalcopy;
    }

    public void setTotalcopy(int totalcopy) {
        this.totalcopy = totalcopy;
    }

    public int getTotissued() {
        return totissued;
    }

    public void setTotissued(int totissued) {
        this.totissued = totissued;
    }

    public int getDeleted() {
        return deleted;
    }

    public void setDeleted(int deleted) {
        this.deleted = deleted;
    }

    public String getCreatedby() {
        return createdby;
    }

    public void setCreatedby(String createdby) {
        this.createdby = createdby;
    }

    public long getCreatedon() {
        return createdon;
    }

    public void setCreatedon(long createdon) {
        this.createdon = createdon;
    }

    public long getModifiedon() {
        return modifiedon;
    }

    public void setModifiedon(long modifiedon) {
        this.modifiedon = modifiedon;
    }

    public String getModifiedby() {
        return modifiedby;
    }

    public void setModifiedby(String modifiedby) {
        this.modifiedby = modifiedby;
    }
    
}