/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.controller;

import com.dlabs.constants.URLMap;
import com.dlabs.mis.dao.AdminAttendanceDAO;
import com.dlabs.mis.model.AdminAttendance;
import com.dlabs.mis.services.AuditTrailService;
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
public class AdminAttendanceController {
    
    Connection conn = null;
    
    @Autowired
    private AdminAttendanceDAO adminAttendanceDAO;  
    @Autowired AuditTrailService auditTrailService;
    
    public void setAdminAttendanceDAO(AdminAttendanceDAO adminAttendanceDAO) {
        this.adminAttendanceDAO = adminAttendanceDAO;        
    }
    @RequestMapping(value=URLMap.ADD_ATRA, method=RequestMethod.POST)
    @ResponseBody
    public int addATRA(@RequestBody AdminAttendance obj){
        int flag=0;
        try{
           conn = DbPool.getConnection();
           flag=adminAttendanceDAO.addOrEditAtra(conn,obj);
           auditTrailService.insertLog(conn, 201, obj.getRequestby()+" | "+obj.getStudentid()); 
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return flag;    
    }
    
    @RequestMapping(value=URLMap.ADMIN_EDIT_ATRA, method=RequestMethod.POST)
    @ResponseBody
    public int adminEditATRA(@RequestBody AdminAttendance obj){
        int flag=0;
        try{
           conn = DbPool.getConnection();
           flag=adminAttendanceDAO.adminEditAtra(conn,obj);
           auditTrailService.insertLog(conn, 202,obj.getModifiedby()+" | " + obj.getPid()); 
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return flag;    
    }
    
       
    
    @RequestMapping(value=URLMap.GET_ATRA, method=RequestMethod.GET)
    @ResponseBody
    public String getATRA(@RequestParam("sessionid") String sessionid,
                          @RequestParam("classid") String classid,
                          @RequestParam("studentid") String studentid,
                          @RequestParam("createdby") String createdby
    ){
        try{
           conn = DbPool.getConnection();
           return adminAttendanceDAO.getATRAAsJSON(conn,sessionid,classid,studentid,createdby,15,0).toString();
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return "{failure:true}";    
    }
    
}
