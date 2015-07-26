/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.session;

import org.springframework.stereotype.Component;

/**
 *
 * @author Kamlesh
 */
@Component
public class UserSessionBean {
    String userId;
    String ipAddress;
    String  userName;

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
    
}
