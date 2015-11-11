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
public class GenerateFee {
String monthly_fee_id	;
String school_id	;
String class_id	        ;
String student_id	;
int    month	        ;
String for_year	        ;
float amount	        ;
String due_date	        ;
String templateid	;
boolean  markpaid       ;
String fee_structure_id ;
float  paid_amount	;
String received_from    ;
String relationtype     ;
String paid_by          ;
String payment_mode     ;
String cheque_dd_number ;

    public String getPayment_mode() {
        return payment_mode;
    }

    public void setPayment_mode(String payment_mode) {
        this.payment_mode = payment_mode;
    }

    public String getCheque_dd_number() {
        return cheque_dd_number;
    }

    public void setCheque_dd_number(String cheque_dd_number) {
        this.cheque_dd_number = cheque_dd_number;
    }



    public String getPaid_by() {
        return paid_by;
    }

    public void setPaid_by(String paid_by) {
        this.paid_by = paid_by;
    }

    public float getPaid_amount() {
        return paid_amount;
    }

    public void setPaid_amount(float paid_amount) {
        this.paid_amount = paid_amount;
    }

    public String getReceived_from() {
        return received_from;
    }

    public void setReceived_from(String received_from) {
        this.received_from = received_from;
    }

    public String getRelationtype() {
        return relationtype;
    }

    public void setRelationtype(String relationtype) {
        this.relationtype = relationtype;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }
    public String getFee_structure_id() {
        return fee_structure_id;
    }

    public void setFee_structure_id(String fee_structure_id) {
        this.fee_structure_id = fee_structure_id;
    }

    public String getMonthly_fee_id() {
        return monthly_fee_id;
    }

    public void setMonthly_fee_id(String monthly_fee_id) {
        this.monthly_fee_id = monthly_fee_id;
    }

    public String getSchool_id() {
        return school_id;
    }

    public void setSchool_id(String school_id) {
        this.school_id = school_id;
    }

    public String getClass_id() {
        return class_id;
    }

    public void setClass_id(String class_id) {
        this.class_id = class_id;
    }

    public String getStudent_id() {
        return student_id;
    }

    public void setStudent_id(String student_id) {
        this.student_id = student_id;
    }

    public String getFor_year() {
        return for_year;
    }

    public void setFor_year(String for_year) {
        this.for_year = for_year;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public String getDue_date() {
        return due_date;
    }

    public void setDue_date(String due_date) {
        this.due_date = due_date;
    }

    public String getTemplateid() {
        return templateid;
    }

    public void setTemplateid(String templateid) {
        this.templateid = templateid;
    }

    public boolean isMarkpaid() {
        return markpaid;
    }

    public void setMarkpaid(boolean markpaid) {
        this.markpaid = markpaid;
    }

}
