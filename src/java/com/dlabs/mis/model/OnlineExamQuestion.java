/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 *
 * @author XPPRESP3
 */
@JsonIgnoreProperties(ignoreUnknown=true)
public class OnlineExamQuestion {

    private int    all_of_d_abv_opt_is_ans;	
    private int    all_of_the_above_option;
    private int    ans_type;
    private int    none_of_d_abv_opt_is_ans;
    private int    none_of_the_above_option;
    private String onlineexamquesid;
    private int    option_1_isawnser;
    private String option_1_name;
    private int    option_2_isawnser;
    private String option_2_name;
    private int    option_3_isawnser;
    private String option_3_name;
    private int    option_4_isawnser;
    private String option_4_name;
    private String pid;
    private String question;
    private int    result;
    private String createdby;
    private String modifiedby;
    private double    marks;
    private int negativemarks, timeallocated; 

    public double getMarks() {
        return marks;
    }

    public void setMarks(double marks) {
        this.marks = marks;
    }

    public int getNegativemarks() {
        return negativemarks;
    }

    public void setNegativemarks(int negativemarks) {
        this.negativemarks = negativemarks;
    }

    public int getTimeallocated() {
        return timeallocated;
    }

    public void setTimeallocated(int timeallocated) {
        this.timeallocated = timeallocated;
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

    
    public int getAll_of_d_abv_opt_is_ans() {
        return all_of_d_abv_opt_is_ans;
    }

    public void setAll_of_d_abv_opt_is_ans(int all_of_d_abv_opt_is_ans) {
        this.all_of_d_abv_opt_is_ans = all_of_d_abv_opt_is_ans;
    }

    public int getAll_of_the_above_option() {
        return all_of_the_above_option;
    }

    public void setAll_of_the_above_option(int all_of_the_above_option) {
        this.all_of_the_above_option = all_of_the_above_option;
    }

    public int getAns_type() {
        return ans_type;
    }

    public void setAns_type(int ans_type) {
        this.ans_type = ans_type;
    }

    public int getNone_of_d_abv_opt_is_ans() {
        return none_of_d_abv_opt_is_ans;
    }

    public void setNone_of_d_abv_opt_is_ans(int none_of_d_abv_opt_is_ans) {
        this.none_of_d_abv_opt_is_ans = none_of_d_abv_opt_is_ans;
    }

    public int getNone_of_the_above_option() {
        return none_of_the_above_option;
    }

    public void setNone_of_the_above_option(int none_of_the_above_option) {
        this.none_of_the_above_option = none_of_the_above_option;
    }

    public String getOnlineexamquesid() {
        return onlineexamquesid;
    }

    public void setOnlineexamquesid(String onlineexamquesid) {
        this.onlineexamquesid = onlineexamquesid;
    }

    public int getOption_1_isawnser() {
        return option_1_isawnser;
    }

    public void setOption_1_isawnser(int option_1_isawnser) {
        this.option_1_isawnser = option_1_isawnser;
    }

    public String getOption_1_name() {
        return option_1_name;
    }

    public void setOption_1_name(String option_1_name) {
        this.option_1_name = option_1_name;
    }

    public int getOption_2_isawnser() {
        return option_2_isawnser;
    }

    public void setOption_2_isawnser(int option_2_isawnser) {
        this.option_2_isawnser = option_2_isawnser;
    }

    public String getOption_2_name() {
        return option_2_name;
    }

    public void setOption_2_name(String option_2_name) {
        this.option_2_name = option_2_name;
    }

    public int getOption_3_isawnser() {
        return option_3_isawnser;
    }

    public void setOption_3_isawnser(int option_3_isawnser) {
        this.option_3_isawnser = option_3_isawnser;
    }

    public String getOption_3_name() {
        return option_3_name;
    }

    public void setOption_3_name(String option_3_name) {
        this.option_3_name = option_3_name;
    }

    public int getOption_4_isawnser() {
        return option_4_isawnser;
    }

    public void setOption_4_isawnser(int option_4_isawnser) {
        this.option_4_isawnser = option_4_isawnser;
    }

    public String getOption_4_name() {
        return option_4_name;
    }

    public void setOption_4_name(String option_4_name) {
        this.option_4_name = option_4_name;
    }

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public int getResult() {
        return result;
    }

    public void setResult(int result) {
        this.result = result;
    }
    
}
