/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.controller;

import com.dlabs.constants.MISConstant;
import com.dlabs.constants.URLMap;
import com.dlabs.mis.dao.GetBatch;
import com.dlabs.mis.dao.MasterDAO;
import com.dlabs.mis.dao.StudentAdmissionDAO;
import com.dlabs.mis.dao.StudentDAO;
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
import com.dlabs.mis.model.NewStudent;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
/**
 *
 * @author cd
 */
@Controller
public class StudentAdmissionController {
    
    Connection conn = null;
    @Autowired
    StudentAdmissionDAO studentAdmissionDAO;
    public void setStudentAdmissionDAO(StudentAdmissionDAO studentAdmissionDAO) {
        this.studentAdmissionDAO = studentAdmissionDAO;
    }

    @RequestMapping(value=URLMap.INITIATE_ADMISSION_PROCESS, method=RequestMethod.POST)
    @ResponseBody
    public InitiateAdmissionProcess initiateStudentAdmissionProcess(@RequestBody InitiateAdmissionProcess obj){
        try{
            conn = DbPool.getConnection();
           return studentAdmissionDAO.initiateAdmissionProcess(conn,obj);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return obj;
    }

    @RequestMapping(value=URLMap.INITIATE_ADMISSION_PROCESS_GUEST, method=RequestMethod.POST)
    @ResponseBody
    public String initiateStudentAdmissionProcessForGuest(HttpServletRequest request,HttpServletResponse response){
        String res = "{success:'true'}";
        InitiateAdmissionProcess obj=new InitiateAdmissionProcess();
        if(request.getParameter("sessionid")!=null)        
           obj.setSessionid(request.getParameter("sessionid"));
        if(request.getParameter("classid")!=null)        
           obj.setClassid(request.getParameter("classid"));
        if(request.getParameter("emailid")!=null)        
           obj.setEmailid(request.getParameter("emailid"));
        if(request.getParameter("mobileno")!=null)        
           obj.setMobileno(request.getParameter("mobileno"));
        
        try{
           conn = DbPool.getConnection();
           obj=studentAdmissionDAO.initiateAdmissionProcess(conn,obj);
           res = "{success:'true'}";
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return res;
    }    
    @RequestMapping(value=URLMap.GET_ADMISSION_LIST, method=RequestMethod.GET)
    @ResponseBody
    public String getInitiateStudentAdmissionProcess(
                   @RequestParam("classid") String classid,
                   @RequestParam("sessionid") String sessionid

            ){
        try{
            conn = DbPool.getConnection();
            int page = 0, rows = 25;
           return studentAdmissionDAO.getInitiateAdmissionProcess(conn,sessionid,classid,page,rows).toString();
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return "";
    }

    @RequestMapping(value=URLMap.GET_PERSONAL_DATA, method=RequestMethod.GET)
    @ResponseBody
    public String getStudentPersonalData(@RequestBody  NewStudent obj){
        try{
            conn = DbPool.getConnection();           
           return studentAdmissionDAO.getStudentPersonalData(conn,obj).toString();
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return "";
    }   
    
    @RequestMapping(value=URLMap.GET_PERSONAL_DATA_WEB, method=RequestMethod.GET)
    @ResponseBody
    public String getStudentPersonalDataonWeb(@RequestParam String formno ){
        try{
            conn = DbPool.getConnection();           
           return studentAdmissionDAO.getStudentPersonalDataForWeb(conn,formno).toString();
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return "";
    } 
    
    
    @RequestMapping(value=URLMap.ADD_NEW_STUDENT, method=RequestMethod.POST)
    @ResponseBody
    public NewStudent addNewStudent(@RequestBody  NewStudent obj){
        try{
            conn = DbPool.getConnection();           
           return studentAdmissionDAO.addNewStudent(conn,obj);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return obj;
    }   

    
    
    @RequestMapping(value=URLMap.SAVE_ADDMISION_STUDENT_DET, method=RequestMethod.POST)
    @ResponseBody
    public NewStudent saveNewStudentDetails(@RequestBody  NewStudent obj){
        try{
            conn = DbPool.getConnection();           
           return studentAdmissionDAO.editNewStudentOnline(conn,obj);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return obj;
    } 
    @RequestMapping(value=URLMap.CONFIRM_ADDMISION_STUDENT_DET, method=RequestMethod.POST)
    @ResponseBody
    public NewStudent confirmNewStudentAddmision(@RequestBody  NewStudent obj){
        try{
            conn = DbPool.getConnection();           
           return studentAdmissionDAO.confirmNewStudentAddmision(conn,obj);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return obj;
    }
    
    @RequestMapping(value=URLMap.UPDATE_NEW_STUDENT, method=RequestMethod.POST)
    @ResponseBody
    public NewStudent editNewStudentOnline(@RequestBody  NewStudent obj){
        try{
           conn = DbPool.getConnection();           
           return studentAdmissionDAO.editNewStudentOnline(conn,obj);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return obj;
    }   
  
    
    @RequestMapping(value=URLMap.GET_EXISTING_STUDENT, method=RequestMethod.GET)
    @ResponseBody
    public String getExistingStudentData(
                   @RequestParam("classid") String classid,
                   @RequestParam("sessionid") String sessionid
            )
    {
        try{
           conn = DbPool.getConnection();           
           return studentAdmissionDAO.getExistingStudentData(conn,classid,sessionid,0,15).toString();
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return "";
    } 
    @RequestMapping(value=URLMap.GET_OFFLINE_STUDENT, method=RequestMethod.GET)
    @ResponseBody
    public String getOfflineStudentData(
                   @RequestParam("classid") String classid,
                   @RequestParam("sessionid") String sessionid    
            )
    {
        try{
           conn = DbPool.getConnection();           
           return studentAdmissionDAO.getOfflineStudentData(conn,classid,sessionid,0,15).toString();
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return "";
    }
    @RequestMapping(value=URLMap.SEND_INTERVIW_EXAM_DATE, method=RequestMethod.POST)
    @ResponseBody
    public ScheduleStrudentInterviewExam sendInterviewExamDetail(@RequestBody  ScheduleStrudentInterviewExam obj){
        try{
           conn = DbPool.getConnection();           
           obj=studentAdmissionDAO.sendInterviewExamDetail(conn,obj);
           if(obj.getResult()==1){
              conn.commit();
           }
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return obj;
    } 
    
}
