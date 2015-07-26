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
import com.dlabs.mis.dao.ClassDAO;
import com.dlabs.mis.dao.MasterDAO;
import com.dlabs.mis.dao.PaymentDAO;
import com.dlabs.mis.model.*;

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
public class ClassController {
    Connection conn = null;
    
    @Autowired
    private ClassDAO classDAO;

    public void setClassDAO(ClassDAO classDAO) {
        this.classDAO = classDAO;
        
    }
    @RequestMapping(value=URLMap.ADD_Class, method=RequestMethod.POST)
    @ResponseBody
    public Classes addClass(@RequestBody Classes clas){
        try{
            conn = DbPool.getConnection();
           return classDAO.addOrEditClass(conn,clas);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return clas;
    }
    
    @RequestMapping(value=URLMap.DELETE_CLASS, method=RequestMethod.POST)
    @ResponseBody
    public int deleteClass(@RequestBody Classes clas){
        int flag=0;
        try{
            conn = DbPool.getConnection();
           if(classDAO.deleteClass(conn,clas)==1)
           {conn.commit();flag=1;}
           else
           flag=0;    
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return flag;
    }
    
    @RequestMapping(value=URLMap.GET_Classes, method= RequestMethod.GET)
    @ResponseBody
    public String getClasses(@RequestParam("sessionid") String sessionid){
       try{
            conn = DbPool.getConnection();
           return classDAO.getAllClassesAsJson(conn,sessionid,0,25).toString();
        }
       
        catch(Exception ex){            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }

   
    
    @RequestMapping(value=URLMap.GET_CLASS_SUBJECT, method= RequestMethod.GET)
    @ResponseBody
    public String getClassSubject(@RequestParam("classid") String classid){
       try{
            conn = DbPool.getConnection();
           return classDAO.getAllClassSubjectAsJson(conn,classid,0,15).toString();
        }
       
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }
    
    @RequestMapping(value=URLMap.GET_CLASS_SUBJECT_TEACHER, method= RequestMethod.GET)
    @ResponseBody
    public String getClassSubjectTeacher(@RequestParam("classid") String classid){
       try{
            conn = DbPool.getConnection();
           return classDAO.getAllClassSubjectTeacherAsJson(conn,classid,0,15).toString();
        }
       
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }
    
    @RequestMapping(value=URLMap.ADD_CLASS_SUBJECT, method=RequestMethod.POST)
    @ResponseBody
    public String addClassSubject(@RequestBody ClassSubject[] clas){
        String res = "{success:false}";
        try{
            conn = DbPool.getConnection();
            classDAO.addOrEditClassSubject(conn,clas);
            conn.commit();
            res="{success:true}";
           return res;
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return res;
    }

    @RequestMapping(value=URLMap.ADD_CLASS_SUBJECT_TEACHER, method=RequestMethod.POST)
    @ResponseBody
    public String addClassSubjectTeacher(@RequestBody ClassSubjectTeacher[] clas){
        String res = "{success:false}";
        try{
            conn = DbPool.getConnection();
            int flag=classDAO.addClassSubjectTeacher(conn,clas);
            if(flag > 0){
            conn.commit();
            res="{success:true}";
            }
            
           return res;
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return res;
    }

    
    @RequestMapping(value=URLMap.SAVE_CLASS_EXAM, method=RequestMethod.POST)
    @ResponseBody
    public String saveClassExam(@RequestBody ClassExam[] clas){
        String res = "{success:false}";
        try{
            conn = DbPool.getConnection();
            int x=classDAO.saveClassExam(conn,clas);
            conn.commit();
            if(x > 0)
            res="1";
            else
            res="0";    
           return res;
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return res;
    }
    
    
    @RequestMapping(value=URLMap.GET_CLASS_EXAM, method= RequestMethod.GET)
    @ResponseBody
    public String getClassExam(@RequestParam("classid") String classid,
                               @RequestParam("sessionid") String sessionid,
                               @RequestParam("examtypeidid") String examtypeidid
            ){
        CreateExamPostData obj=new CreateExamPostData();
        obj.setClassid(classid);
        obj.setExamtypeidid(examtypeidid);
        obj.setSessionid(sessionid);
        try{
            conn = DbPool.getConnection();
            return classDAO.getAllClassExamAsJson(conn,obj,0,15).toString();
        }
       
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }
    @RequestMapping(value=URLMap.ADD_CLASS_EXAM, method= RequestMethod.POST)
    @ResponseBody
    public String addClassExam(@RequestBody CreateExamPostData obj){
      
        try{
            conn = DbPool.getConnection();
            int flag=classDAO.addClassExam(conn,obj);
             
            if(flag==1)
             return "1";//Exam Already created for this Class";    
            if(flag==2)
             return "2";//Subject not created for this class,Please create Subject";    
            if(flag==0)
            {
              conn.commit();
              return "0";
              //return classDAO.getAllCreatedClassExamAsJson(conn,obj,0,15).toString();
            }
            
        }
       
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }
       
    @RequestMapping(value=URLMap.GET_CLASS_EXAM_FOR_PARENT, method= RequestMethod.GET)
    @ResponseBody
    public String getClassExamListForParent(HttpServletRequest request){

        try{
        conn = DbPool.getConnection();
        return classDAO.getClassExamListForParent(conn,request).toString();
        }
        catch(Exception ex){
        Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }finally{
            DbPool.close(conn);
        }
     return ""; 
    }
    
}
