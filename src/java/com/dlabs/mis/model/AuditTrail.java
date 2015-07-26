package com.dlabs.mis.model;

/**
 *
 * @author Kamlesh Kumar Sah
 */
public class AuditTrail {

    int actionID;
    String actionType, params, ipaddress, usernane;
    String userid;
    Long timestamp;

    public AuditTrail(int actionID,  String params, String ipaddress, String userid) {
        this.actionID = actionID;
        this.params = params;
        this.ipaddress = ipaddress;
        this.userid = userid;
        this.timestamp = System.currentTimeMillis();
    }

    public int getActionID() {
        return actionID;
    }

    public void setActionID(int actionID) {
        this.actionID = actionID;
    }

    public String getActionType() {
        return actionType;
    }

    public void setActionType(String actionType) {
        this.actionType = actionType;
    }

   
    public String getIpaddress() {
        return ipaddress;
    }

    public void setIpaddress(String ipaddress) {
        this.ipaddress = ipaddress;
    }

    public String getParams() {
        return params;
    }

    public void setParams(String params) {
        this.params = params;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getUsernane() {
        return usernane;
    }

    public void setUsernane(String usernane) {
        this.usernane = usernane;
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }
    
}
