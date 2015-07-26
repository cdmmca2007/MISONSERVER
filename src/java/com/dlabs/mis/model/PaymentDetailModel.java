/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dlabs.mis.model;

/**
 *
 * @author cd
 */
public class PaymentDetailModel {


      private String studentname;
      private String classname;
      private String duedate;
      private String totamount;
      private String fineamount;
      private String frommonth;
      private String tomonth;
      private PaymentFeeStructure feestructure[];

    public String getClassname() {
        return classname;
    }

    public void setClassname(String classname) {
        this.classname = classname;
    }

    public String getDuedate() {
        return duedate;
    }

    public void setDuedate(String duedate) {
        this.duedate = duedate;
    }

    public PaymentFeeStructure[] getFeestructure() {
        return feestructure;
    }

    public void setFeestructure(PaymentFeeStructure[] feestructure) {
        this.feestructure = feestructure;
    }

    public String getFineamount() {
        return fineamount;
    }

    public void setFineamount(String fineamount) {
        this.fineamount = fineamount;
    }

    public String getFrommonth() {
        return frommonth;
    }

    public void setFrommonth(String frommonth) {
        this.frommonth = frommonth;
    }

    public String getStudentname() {
        return studentname;
    }

    public void setStudentname(String studentname) {
        this.studentname = studentname;
    }

    public String getTomonth() {
        return tomonth;
    }

    public void setTomonth(String tomonth) {
        this.tomonth = tomonth;
    }

    public String getTotamount() {
        return totamount;
    }

    public void setTotamount(String totamount) {
        this.totamount = totamount;
    }

      
}
