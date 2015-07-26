/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.controller;

import com.dlabs.constants.MISConstant;
import com.dlabs.constants.URLMap;
import com.dlabs.mis.dao.ClassDAO;
import com.dlabs.mis.dao.DigitalDairyDAO;
import com.dlabs.mis.dao.MasterDAO;
import com.dlabs.mis.dao.PaymentDAO;
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
public class DigitalDairyController {
    Connection conn = null;
    
    @Autowired
    private DigitalDairyDAO digitaldairyDAO;

    public void setDigitalDairyDAO(DigitalDairyDAO digitaldairyDAO) {
        this.digitaldairyDAO = digitaldairyDAO;
        
    }
    @RequestMapping(value=URLMap.ADD_DIGITALDAIRY_PARENT, method=RequestMethod.POST)
    @ResponseBody
    public DigitalDairy addDD(@RequestBody DigitalDairy obj){
        try{
            conn = DbPool.getConnection();
           return digitaldairyDAO.addOrEditDDParent(conn,obj);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return obj;
    }
    @RequestMapping(value=URLMap.GET_DIGITALDAIRY_PARENT, method= RequestMethod.GET)
    @ResponseBody
    public String getDD(@RequestParam("classid") String classid,
                             @RequestParam("studentid") String studentid,
                             @RequestParam("createdby") String createdby,
                             @RequestParam("sessionid") String sessionid
            ){
       try{
            conn = DbPool.getConnection();
           return digitaldairyDAO.getAllDDAsJson(conn,classid,studentid,createdby,sessionid,0,15).toString();
        }
       
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }
   
    @RequestMapping(value=URLMap.ADD_STUDENT_MONTHLY_PROGRESS, method=RequestMethod.POST)
    @ResponseBody
    public String addSMP(@RequestBody MonthlyProgress obj){
        String data=null;
        try{
            conn = DbPool.getConnection();
            return digitaldairyDAO.addSMP(conn,obj);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return "";
    }
    
    @RequestMapping(value=URLMap.GET_STUDENT_MONTHLY_PROGRESS, method= RequestMethod.GET)
    @ResponseBody
    public String getSMP(    @RequestParam("sessionid") String sessionid,
                             @RequestParam("month") int month,
                             @RequestParam("classid") String classid,
                             @RequestParam("studentid") String studentid, 
                             @RequestParam("createdby") String createdby 
            ){ MonthlyProgress obj=new MonthlyProgress();
       try{    
            obj.setSessionid(sessionid);
            obj.setStudentid(studentid);
            obj.setClassid(classid);
            obj.setMonth(month);
            obj.setCreatedby(createdby);
            conn = DbPool.getConnection();
           return digitaldairyDAO.getAllSMPAsJson(conn,obj,0,15).toString();
        }
       
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }
    
   
    @RequestMapping(value=URLMap.SAVE_STUDENT_MONTHLY_PROGRESS, method=RequestMethod.POST)
    @ResponseBody
    public String saveSMP(@RequestBody MonthlyProgress obj){
        int x=0;
        try{
            conn = DbPool.getConnection();
            x=digitaldairyDAO.saveSMP(conn,obj);
            if(x==1)
                return "1";
            else
                return "0";
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }        
        return "";
    }
    
    @RequestMapping(value=URLMap.GET_PRAENT_TEACHER_INTERACTION, method= RequestMethod.GET)
    @ResponseBody
    public String getParentTeacherInteractionChat(   
                             @RequestParam("pid") String pid,
                             @RequestParam("userid") String userid 
            ){ 
       try{    
           
           
           conn = DbPool.getConnection();
           return digitaldairyDAO.getParentTeacherInteractionChat(conn,pid,userid).toString();
        }
       
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }
    @RequestMapping(value=URLMap.SET_PRAENT_TEACHER_INTERACTION,method=RequestMethod.POST)
    @ResponseBody
    public ReplyOnStudentDairy setParentTeacherInteractionChat(@RequestBody ReplyOnStudentDairy obj){
        int x=0;
        try{
            conn = DbPool.getConnection();
            obj=digitaldairyDAO.setParentTeacherInteractionChat(conn,obj);
            if(obj.getReplyid()!=null) conn.commit();
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }        
        return obj;
    }
    
    @RequestMapping(value=URLMap.GET_STUDENT_DIGITALDAIRY, method= RequestMethod.GET)
    @ResponseBody
    public String getStudentDigitalDairy(@RequestParam("batchid") String batchid,
                        @RequestParam("studentid") String studentid
            ){
       try{
            conn = DbPool.getConnection();
           return digitaldairyDAO.getStudentDigitalDairy(conn,batchid,studentid,0,100).toString();
        }
       
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }
    
}
