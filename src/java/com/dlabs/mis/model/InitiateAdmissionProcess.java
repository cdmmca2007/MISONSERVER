/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.model;

import com.kjava.base.util.ConfigReader;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
/**
 *
 * @author cd
 */
@JsonIgnoreProperties(ignoreUnknown=true)
public class InitiateAdmissionProcess {
   
    private String  sessionid;
    private int     formid  ;
    private long    lastdate ;
    private String  emailid;
    private String  mobileno;
    private String  createdby;
    private String  modifiedby;
    private String  classid;
    
    
    public String getHyperLink(int formid){
       String link="";
       String sv=ConfigReader.getinstance().get("context_url");
       if(sv!=null) {
       sv=sv+"onlineApplicationForm.jsp?formno="+formid;
        link="<a href='"+sv+"'>Click Here to Open Online Addmision Form</a>";
       }
       return link;
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

    public String getModifiedby() {
        return modifiedby;
    }

    public void setModifiedby(String modifiedby) {
        this.modifiedby = modifiedby;
    }
    
    public String getSessionid() {
        return sessionid;
    }

    public void setSessionid(String sessionid) {
        this.sessionid = sessionid;
    }

    public int getFormid() {
        return formid;
    }

    public void setFormid(int formid) {
        this.formid = formid;
    }

    public long getLastdate() {
        return lastdate;
    }

    public void setLastdate(long lastdate) {
        this.lastdate = lastdate;
    }

    public String getEmailid() {
        return emailid;
    }

    public void setEmailid(String emailid) {
        this.emailid = emailid;
    }

    public String getMobileno() {
        return mobileno;
    }

    public void setMobileno(String mobileno) {
        this.mobileno = mobileno;
    }
}
