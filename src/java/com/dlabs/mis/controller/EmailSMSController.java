/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.controller;

/**
 *
 * @author XPPRESP3
 */
import com.dlabs.constants.MISConstant;
import com.dlabs.constants.URLMap;
import com.dlabs.mis.dao.ClassDAO;
import com.dlabs.mis.dao.EmailSMSDAO;
import com.dlabs.mis.model.*;
import com.dlabs.session.AuthHandler;

import com.kjava.base.db.DbPool;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
@Controller
public class EmailSMSController {
    Connection conn = null;
    
    @Autowired
    private EmailSMSDAO emailSMSDAO;

    public void setEmailSMSDAO(EmailSMSDAO emailSMSDAO) {
        this.emailSMSDAO = emailSMSDAO;
    }
    @RequestMapping(value=URLMap.GET_EMAILSMS_STUDLIST, method= RequestMethod.GET)
    @ResponseBody
    public String getClasses(@RequestParam("sessionid") String sessionid,
            @RequestParam("classid") String classid,
            @RequestParam("studentid") String studentid                    
            ){
       try{
            conn = DbPool.getConnection();
           return emailSMSDAO.getAllListAsJson(conn,sessionid,classid,studentid,0,250).toString();
        }
       
        catch(Exception ex){            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
    }
    @RequestMapping(value=URLMap.EMAILSMS_ENABLE_DISABLE, method=RequestMethod.POST)
    @ResponseBody
    public EmailSMS enableDisableEMailSMS(HttpServletRequest request,@RequestBody EmailSMS obj){
        try{
           conn = DbPool.getConnection();
           obj.setCreatedby(AuthHandler.getUserId(request)); 
           obj.setModifiedby(AuthHandler.getUserId(request)); 
           return emailSMSDAO.enableDisableEMailSMS(conn,obj);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return obj;
    }
}
