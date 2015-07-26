/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.controller;

/**
 *
 * @author cd
 */
import com.dlabs.constants.MISConstant;
import com.dlabs.constants.URLMap;
import com.dlabs.mis.dao.ClassDAO;
import com.dlabs.mis.dao.MasterDAO;
import com.dlabs.mis.dao.PaymentDAO;
import com.dlabs.mis.dao.TeacherDAO;
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
public class TeacherController {
    
    Connection conn = null;
    
    @Autowired
    private TeacherDAO teacherDAO;
    
    public void setTeacherDAO(TeacherDAO teacherDAO) {
        this.teacherDAO = teacherDAO;
        
    }
    @RequestMapping(value=URLMap.GET_TEACHER_PROF, method= RequestMethod.GET)
    @ResponseBody
    public Teacher getTeacherProfile(@RequestParam("tchrid") String tchrid){
       try{
            conn = DbPool.getConnection();
           return teacherDAO.getTeacherAsJson(conn,tchrid);
       }
        catch(Exception ex){            
        }finally{
            DbPool.close(conn);
        }
        return null; 
     }

    @RequestMapping(value=URLMap.UPDATE_TEACHER, method=RequestMethod.POST)
    @ResponseBody
    public Teacher updateTeacher(@RequestBody Teacher obj){
        try{
            conn = DbPool.getConnection();
           return teacherDAO.editTeacherProf(conn,obj);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return obj;
    }

    @RequestMapping(value=URLMap.ADD_TEACHER_QUALIF, method=RequestMethod.POST)
    @ResponseBody
    public TeacherQualification addTeacherQualification(@RequestBody TeacherQualification obj){
        try{
            conn = DbPool.getConnection();
           return teacherDAO.editTeacherQualification(conn,obj);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return obj;
    }
    @RequestMapping(value=URLMap.GET_TEACHER_QUALIF, method= RequestMethod.GET)
    @ResponseBody
    public String getTeacherQualificationAsJson(@RequestParam("tchrid") String tchrid){
       try{
            conn = DbPool.getConnection();
           return teacherDAO.getTeacherQualifAsJson(conn,tchrid).toString();
       }
        catch(Exception ex){            
        }finally{
            DbPool.close(conn);
        }
        return null; 
     }
    @RequestMapping(value=URLMap.DELETE, method=RequestMethod.POST)
    @ResponseBody
    public TeacherQualification delTeacherQualificationNdExp(@RequestBody TeacherQualification obj){
        try{
            conn = DbPool.getConnection();
           return teacherDAO.delTeacherQualificationNdExp(conn,obj);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return obj;
    }
    @RequestMapping(value=URLMap.ADD_TEACHER_EXP, method=RequestMethod.POST)
    @ResponseBody
    public TeacherExperience addTeacherExpeirence(@RequestBody TeacherExperience obj){
        try{
           conn = DbPool.getConnection();
           return teacherDAO.editTeacherExperience(conn,obj);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return obj;
    }
    @RequestMapping(value=URLMap.GET_TEACHER_EXP, method= RequestMethod.GET)
    @ResponseBody
    public String getTeacherExpAsJson(@RequestParam("tchrid") String tchrid){
       try{
            conn = DbPool.getConnection();
            return teacherDAO.getTeacherExpAsJson(conn,tchrid).toString();
       }
        catch(Exception ex){            
        }finally{
            DbPool.close(conn);
        }
        return null; 
     }
    
    @RequestMapping(value=URLMap.TEACHER_LIST_FOR_PRAENT_PAGE, method= RequestMethod.GET)
    @ResponseBody
    public String getTeacherListForParentPageAsJson(HttpServletRequest req  
            ){                       
       try{
            conn = DbPool.getConnection();
            User user= AuthHandler.getUser(req);
            String studid="0d66be0f-6b67-44de-882e-7d31908736b2";//req.getParameter("studentid");
            String sessionid = (String) user.getProperties().get("session_id");
            return teacherDAO.getTeacherListForParentPageAsJson(conn,studid,sessionid).toString();
       }
        catch(Exception ex){            
        }finally{
            DbPool.close(conn);
        }
        return null; 
     }
}
