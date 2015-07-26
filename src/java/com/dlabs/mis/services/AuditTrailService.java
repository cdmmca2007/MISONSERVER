/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.services;

import com.dlabs.mis.dao.AuditTrailDAO;
import com.dlabs.mis.model.AuditTrail;
import com.dlabs.session.UserSessionBean;
import com.dlabs.util.Paging;
import com.kjava.base.ReadableException;
import java.sql.Connection;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Kamlesh the Admin
 */
@Service
public class AuditTrailService {

    @Autowired
    private AuditTrailDAO auditTrailDAO;
    @Autowired
    UserSessionBean userSessionBean;

    public void insertLog(Connection conn, int actionid, String params) {
        try {
            if (params == null) {
                params = this.userSessionBean.getUserName();
            } else {
                params = this.userSessionBean.getUserName()+ "," + params;
            }
            AuditTrail o = new AuditTrail(actionid, params, userSessionBean.getIpAddress(), userSessionBean.getUserId());
            auditTrailDAO.add(conn, o);
        } catch (ReadableException ex) {
            Logger.getLogger(AuditTrailService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public JSONObject getAuditTrail(Connection conn, Paging page) throws ReadableException {
          return this.auditTrailDAO.getAll(conn,page);   
    }
}
