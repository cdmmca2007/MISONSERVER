/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.controller;

import com.dlabs.constants.MISConstant;
import com.dlabs.constants.URLMap;
import com.dlabs.mis.dao.MasterDAO;
import com.dlabs.mis.dao.RecentActivityDAO;
import com.dlabs.mis.dao.StudentDAO;
import com.dlabs.mis.model.*;
import com.dlabs.mis.services.AuditTrailService;
import com.dlabs.mis.services.MailService;
import com.dlabs.session.AuthHandler;
import com.dlabs.util.Paging;
import com.kjava.base.db.DbPool;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
public class RecentActivityController {
    
    Connection conn = null;
    @Autowired
    RecentActivityDAO recentActivityDAO;
    @Autowired MailService mailService;
    @Autowired AuditTrailService auditTrailService;

    
    public void setRecentActivityDAO(RecentActivityDAO recentActivityDAO) {
        this.recentActivityDAO = recentActivityDAO;
        
    }
    
    @RequestMapping(value=URLMap.GET_PARENT_RECENT_UPDATES, method= RequestMethod.GET)
    @ResponseBody
    public List<StudentActivity> getRecentUpdatesOfParent(HttpServletRequest req){
       Paging page = Paging.getInstance(req);
       String res = "";
        try{
            conn = DbPool.getConnection();
            User user= AuthHandler.getUser(req);
            String studentId = (String) user.getProperties().get("studentid");
            String sessionid = (String) user.getProperties().get("session_id");
            return recentActivityDAO.getRecentUpdates(conn,studentId,sessionid,page,false);
        }
        catch(Exception ex){
            ex.printStackTrace();
        }finally{
            DbPool.close(conn);
        }
        return null; 
     }
    @RequestMapping(value=URLMap.SET_PARENT_RECENT_COMMENT, method= RequestMethod.POST)
    @ResponseBody
    public String setCommentOnRecentUpdatesOfParent(HttpServletRequest req){
       
       Paging page = Paging.getInstance(req);
       String res = "";
        try{
            conn = DbPool.getConnection();
            User user= AuthHandler.getUser(req);
            String commentedbyId = (String) user.getUserId();
            String refid ="95498238-5358-4fd3-8369-8d94536622e9";//req.getParameter("refrenceid");//// 
            String comment= req.getParameter("comment"); 
            return recentActivityDAO.setCommentOnRecentUpdatesOfParent(conn,commentedbyId,refid,comment);
            
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return null; 
     }
    @RequestMapping(value=URLMap.SET_PARENT_RECENT_LIKE, method= RequestMethod.POST)
    @ResponseBody
    public String setLikeOnRecentUpdatesOfParent(HttpServletRequest req){
       Paging page = Paging.getInstance(req);
       String res = "";
        try{
            conn = DbPool.getConnection();
            User user= AuthHandler.getUser(req);
            String likebyId = (String) user.getUserId();
            String refid ="95498238-5358-4fd3-8369-8d94536622e9";//  req.getParameter("refrenceid");//"95498238-5358-4fd3-8369-8d94536622e9";//
            int likeunlike= 1;//Integer.parseInt(req.getParameter("likeunlike")); 
            return recentActivityDAO.setLikeOnRecentUpdatesOfParent(conn,likebyId,refid,likeunlike);
            
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return null; 
     }
}
