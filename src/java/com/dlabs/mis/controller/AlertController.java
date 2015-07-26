/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.controller;


import com.dlabs.constants.URLMap;
import com.dlabs.mis.dao.AdminAttendanceDAO;
import com.dlabs.mis.dao.AlertDAO;
import com.dlabs.mis.model.AdminAttendance;
import com.kjava.base.db.DbPool;
import java.sql.Connection;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author cd
 */
@Controller
public class AlertController {
    
    Connection conn = null;
    
    @Autowired
    private AlertDAO alertDAO;  
    
    public void setAlertDAO(AlertDAO alertDAO) {
        this.alertDAO = alertDAO;        
    }
    
    @RequestMapping(value=URLMap.GET_ALERT, method=RequestMethod.GET)
    @ResponseBody
    public String getATRA(@RequestParam("sessionid") String sessionid,
                          @RequestParam("userid") String userid
    ){
        try{
            
           conn = DbPool.getConnection();
           return alertDAO.getAlertJSON(conn,sessionid,userid,15,0).toString();
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return "{failure:true}";    
    }
    
}
