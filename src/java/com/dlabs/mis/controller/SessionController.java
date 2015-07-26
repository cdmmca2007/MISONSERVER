/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dlabs.mis.controller;

import com.dlabs.constants.MISConstant;
import com.dlabs.constants.URLMap;
import com.dlabs.mis.dao.ClassDAO;
import com.dlabs.mis.dao.MasterDAO;
import com.dlabs.mis.dao.PaymentDAO;
import com.dlabs.mis.dao.SessionDAO;
import com.dlabs.mis.model.*;

import com.kjava.base.db.DbPool;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
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
public class SessionController {
    
    Connection conn = null;
    
    @Autowired
    private SessionDAO sessionDAO;

    public void setSessionDAO(SessionDAO sessionDAO) {
        this.sessionDAO = sessionDAO;
    }
    
    @RequestMapping(value=URLMap.SESSION_ADD, method=RequestMethod.POST)
    @ResponseBody
    public Session addSession(@RequestBody Session obj){

        try{
            conn = DbPool.getConnection();
           return sessionDAO.addSession(conn,obj);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return obj;
    }

    @RequestMapping(value=URLMap.SESSION_GET, method=RequestMethod.GET)
    @ResponseBody
    public String getSessionsAsJson(){
       try{
            conn = DbPool.getConnection();
           return sessionDAO.getSessionsAsJson(conn,0,25).toString();
        }
       
        catch(Exception ex){            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
    }
    @RequestMapping(value=URLMap.SESSION_MARK_CURRENT, method=RequestMethod.POST)
    @ResponseBody
    public String markAsCurrentSession(@RequestBody Session obj){
        
        try{
            conn = DbPool.getConnection();
            return sessionDAO.markAsCurrentSession(conn,obj);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        
        return "";
    }

    @RequestMapping(value=URLMap.SESSION_CLASS_ADD, method=RequestMethod.POST)
    @ResponseBody
    public Classes addSessionClass(@RequestBody Classes obj){

        try{
            conn = DbPool.getConnection();
           return sessionDAO.addSessionClass(conn,obj);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return obj;
    }
    
    @RequestMapping(value=URLMap.SESSION_CLASS_MAP, method=RequestMethod.POST)
    @ResponseBody
    public Classes addSessionClassMap(@RequestBody Classes obj){

        try{
            conn = DbPool.getConnection();
           return sessionDAO.addSessionClassMap(conn,obj);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return obj;
    }
}
