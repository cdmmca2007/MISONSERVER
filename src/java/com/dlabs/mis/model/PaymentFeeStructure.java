/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dlabs.mis.model;

/**
 *
 * @author cd
 */
public class PaymentFeeStructure {

    private String fee_structure_id;
    private String fee_name;
    private int fee_amount;

    public PaymentFeeStructure(){
    }

    public PaymentFeeStructure(String id,String name,int amt){
        this.fee_structure_id=id;
        this.fee_name        =name;
        this.fee_amount      =amt;
    }



    public int getFee_amount() {
        return fee_amount;
    }

    public void setFee_amount(int fee_amount) {
        this.fee_amount = fee_amount;
    }

    public String getFee_name() {
        return fee_name;
    }

    public void setFee_name(String fee_name) {
        this.fee_name = fee_name;
    }

    public String getFee_structure_id() {
        return fee_structure_id;
    }

    public void setFee_structure_id(String fee_structure_id) {
        this.fee_structure_id = fee_structure_id;
    }

    
}
