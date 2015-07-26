/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.controller;

/**
 *
 * @author Kamlesh the admin
 */
import com.dlabs.constants.MISConstant;
import com.dlabs.constants.URLMap;
import com.dlabs.mis.dao.MasterDAO;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
@Controller
public class StudentController {
    Connection conn = null;
    @Autowired
    StudentDAO studentDAO;
    @Autowired MailService mailService;
    @Autowired AuditTrailService auditTrailService;

    public void setStudentDAO(StudentDAO studentDAO) {
        this.studentDAO = studentDAO;
    }
    @RequestMapping(value=URLMap.ADD_STUDENT, method=RequestMethod.POST)
    @ResponseBody
    public NewStudent addStudent(@RequestBody NewStudent student){
        try{
            conn = DbPool.getConnection();
           student= studentDAO.addOrEditStudent(conn,student);
          /// mailService.onCreateStudent(conn, student);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return student;
    }
    @RequestMapping(value=URLMap.GET_STUDENTS, method= RequestMethod.GET)
    @ResponseBody
    public String getStudents(HttpServletRequest req,
              @RequestParam("classid")      String classid,
              @RequestParam("sessionid")    String sessionid
            ){
       try{
           Paging page =Paging.getInstance(req);
           conn = DbPool.getConnection();
           return studentDAO.getAllStudentsAsJson(conn,classid,sessionid,page).toString();
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }
    @RequestMapping(value=URLMap.ADD_STUD_MARK, method=RequestMethod.POST)
    @ResponseBody
    public String addStudentMarks(
                    @RequestBody StudentMarkPostRequest obj
            ){
        int flag=0;
        try{
            conn = DbPool.getConnection();
            flag=studentDAO.addStudentMark(conn,obj);
          
          if(flag==0)
             return ""; 
          if(flag==1)
             return "1";//"Mark already Added ,you can view Mark";  
          if(flag==2)
             return "2";//"Exam does not exits";  
          if(flag==3)   {
              conn.commit();
              return "3";//success:true";               
          }  
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return "";
    }
    
   @RequestMapping(value=URLMap.GET_STUDENTS_MARKS, method= RequestMethod.GET)
   @ResponseBody
    public String getStudentMarks(
              
              @RequestParam("classid")      String classid,
              @RequestParam("sessionid")    String sessionid,
              @RequestParam("examtypeidid") String examtypeidid,
              @RequestParam("studentid")    String studentid,
              @RequestParam("subjectid")    String subjectid
           )
   {
       StudentMarkPostRequest obj=new StudentMarkPostRequest();       
       obj.setClassid(classid);
       obj.setExamtypeidid(examtypeidid);
       obj.setSessionid(sessionid);
       obj.setStudentid(studentid);
       obj.setSubjectid(subjectid);
       try{
            conn = DbPool.getConnection();
           return studentDAO.getAllStudentsMarkAsJson(conn,obj,0,15).toString();
        }
       
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     } 
   
    @RequestMapping(value=URLMap.SAVE_STUDENTS_MARKS, method=RequestMethod.POST)
    @ResponseBody
    public String saveStudentMarks(
                    @RequestBody StudentMark[] obj
            ){
        int flag=0;
        try{
            conn = DbPool.getConnection();
            flag=studentDAO.saveStudentMarks(conn,obj);
          
          if(flag==0)
             return "0"; 
          if(flag==1)   {
              conn.commit();
              return "1";//success:true";               
          }  
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return "";
    }
    @RequestMapping(value=URLMap.SAVE_STUDENT_TRANSPORT, method=RequestMethod.POST)
    @ResponseBody
    public StudentTransport saveStudentTransport(
                    @RequestBody StudentTransport obj
            ){

        try{
            conn = DbPool.getConnection();
            return studentDAO.saveStudentTransport(conn,obj);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return obj;
    }
   
    
   
   @RequestMapping(value=URLMap.STUDENT_REPORTCARD, method= RequestMethod.POST)
   @ResponseBody
    public String getStudentReportCard(
              @RequestBody StudentMarkPostRequest obj
              /*@RequestParam("classid")      String classid,
              @RequestParam("sessionid")    String sessionid,
              @RequestParam("examtypeid")   String examtypeid,
              @RequestParam("studentid")    String studentid*/
           )
   {
       /*StudentMarkPostRequest obj=new StudentMarkPostRequest();       
       obj.setClassid(classid);
       obj.setExamtypeidid(examtypeid);
       obj.setSessionid(sessionid);
       obj.setStudentid(studentid);
       obj.setSubjectid(null);*/
       try{
            conn = DbPool.getConnection();
           return studentDAO.getAllStudentReportCardAsJson(conn,obj,0,15).toString();
        }
       
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }         
 
    @RequestMapping(value=URLMap.STUDENT_ROLE_NUMBER, method=RequestMethod.POST)
    @ResponseBody
    public String saveStudentRoleNumber(
                    @RequestBody StudentMarkPostRequest obj
            ){
        int flag=0;
        try{
            conn = DbPool.getConnection();
            flag=studentDAO.saveStudentRoleNumber(conn,obj);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        if(flag > 0)return "{Success:true}";
        else return "{Success:false}";
    }
    /**
     * 
     * this service is used to get one student detail
     */
    @RequestMapping(value=URLMap.GET_STUDENT, method= RequestMethod.GET)
    @ResponseBody
    public String getStudent(@PathVariable("id") String studentId,HttpServletRequest obj){
       try{
            User usr=new User();
            conn = DbPool.getConnection();
            usr=(AuthHandler.getUser(obj));
            String sessionid=(String)usr.getProperties().get("session_id");
            return studentDAO.getStudent(conn,studentId,sessionid).toString();
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }
   
    @RequestMapping(value=URLMap.GET_STUDENT_RESULT_COMPARISON, method= RequestMethod.GET)
    @ResponseBody
    public String getStudentResultComparison(@RequestParam("studentid") String studentId,
                                             @RequestParam("classid") String class_id,
                                             @RequestParam("sessionid") String sessionid
                                             ){
       try{

            conn = DbPool.getConnection();
            return studentDAO.getStudentResultComparison(conn,studentId,class_id,sessionid).toString();
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }
    @RequestMapping(value=URLMap.GET_STUDENT_RESULT_COMPARISON_SEC_CHART, method= RequestMethod.GET)
    @ResponseBody
    public String getStudentResultComparisonSecondChart(@RequestParam("studentid") String studentId,
                                             @RequestParam("classid") String class_id,
                                             @RequestParam("sessionid") String sessionid
                                             ){
       try{

            conn = DbPool.getConnection();
            return studentDAO.getStudentResultComparisonSecondChart(conn,studentId,class_id,sessionid).toString();
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }    
    
}   


