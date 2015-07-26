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
public class LogBug {
        private String bugid; 
        private int    bugno; 
        private String name; 
        private String priority; 
        private String serverity; 
        private String modulename; 
        private String pagename; 
        private String functionality; 
        private String createdby; 
        private String createdon; 
        private String modifiedby; 
        private String modifiedon; 
        private String assignedto; 
        private String bugresolvedate; 
        private String bugresolveby; 
        private String description; 
        private String steptoduplicateissue;

    public String getBugid() {
        return bugid;
    }

    public void setBugid(String bugid) {
        this.bugid = bugid;
    }

    public int getBugno() {
        return bugno;
    }

    public void setBugno(int bugno) {
        this.bugno = bugno;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getServerity() {
        return serverity;
    }

    public void setServerity(String serverity) {
        this.serverity = serverity;
    }

    public String getModulename() {
        return modulename;
    }

    public void setModulename(String modulename) {
        this.modulename = modulename;
    }

    public String getPagename() {
        return pagename;
    }

    public void setPagename(String pagename) {
        this.pagename = pagename;
    }

    public String getFunctionality() {
        return functionality;
    }

    public void setFunctionality(String functionality) {
        this.functionality = functionality;
    }

    public String getCreatedby() {
        return createdby;
    }

    public void setCreatedby(String createdby) {
        this.createdby = createdby;
    }

    public String getCreatedon() {
        return createdon;
    }

    public void setCreatedon(String createdon) {
        this.createdon = createdon;
    }

    public String getModifiedby() {
        return modifiedby;
    }

    public void setModifiedby(String modifiedby) {
        this.modifiedby = modifiedby;
    }

    public String getModifiedon() {
        return modifiedon;
    }

    public void setModifiedon(String modifiedon) {
        this.modifiedon = modifiedon;
    }

    public String getAssignedto() {
        return assignedto;
    }

    public void setAssignedto(String assignedto) {
        this.assignedto = assignedto;
    }

    public String getBugresolvedate() {
        return bugresolvedate;
    }

    public void setBugresolvedate(String bugresolvedate) {
        this.bugresolvedate = bugresolvedate;
    }

    public String getBugresolveby() {
        return bugresolveby;
    }

    public void setBugresolveby(String bugresolveby) {
        this.bugresolveby = bugresolveby;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSteptoduplicateissue() {
        return steptoduplicateissue;
    }

    public void setSteptoduplicateissue(String steptoduplicateissue) {
        this.steptoduplicateissue = steptoduplicateissue;
    }
}
