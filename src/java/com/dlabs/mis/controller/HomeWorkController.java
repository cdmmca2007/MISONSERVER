package com.dlabs.mis.controller;

/**
 *
 * @author cd
 */
import com.dlabs.constants.MISConstant;
import com.dlabs.constants.URLMap;
import com.dlabs.mis.dao.HomeWorkDAO;
import com.dlabs.mis.dao.MasterDAO;
import com.dlabs.mis.model.*;

import com.kjava.base.db.DbPool;
import java.sql.Connection;
import java.sql.SQLException;
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

@Controller
public class HomeWorkController {
    Connection conn = null;
    
    @Autowired
    private HomeWorkDAO homeworkDAO;
    
    public void setHomeWorkDAO(HomeWorkDAO homeworkDAO) {
        this.homeworkDAO = homeworkDAO;        
    }
        
    @RequestMapping(value=URLMap.ADD_HOMEWORK, method=RequestMethod.POST)
    @ResponseBody
    public String addHomework(HttpServletRequest obj){
        int flag=0;
        try{
           conn = DbPool.getConnection();
            flag=homeworkDAO.addOrEditHomeWork(conn,obj);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        if(flag==1)
        return "{success:true}";
        else
        return "{failure:true}";    
    }
    @RequestMapping(value=URLMap.GET_HOMEWORK, method=RequestMethod.GET)
    @ResponseBody
    public String getHomework(@RequestParam("sessionid") String sessionid,
                              @RequestParam("classid") String classid,
                              @RequestParam("createdby") String createdby
            
            ){

        try{
           conn = DbPool.getConnection();
           return homeworkDAO.getHomeWorkAsJSON(conn,sessionid,classid,createdby,15,0).toString();
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return "{failure:true}";    
    }

    
    @RequestMapping(value=URLMap.DOWNLOAD_FILE, method=RequestMethod.GET)
    @ResponseBody
    public String download(HttpServletRequest request,HttpServletResponse response){

        try{
           conn = DbPool.getConnection();
           return homeworkDAO.downloadFile(conn,request,response).toString();
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return "{failure:true}";    
    }
    
    @RequestMapping(value=URLMap.STUDENTHWSTATUS, method=RequestMethod.GET)
    @ResponseBody
    public String getStudentsHomework(@RequestParam("pid") String pid){
        try{
           conn = DbPool.getConnection();
           return homeworkDAO.getStudentsHomeWorkAsJSON(conn,pid,15,0).toString();
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return "{failure:true}";    
    }
    
    @RequestMapping(value=URLMap.MARK_COMPLETED, method=RequestMethod.POST)
    @ResponseBody
    public String addMCHomework(@RequestBody StudentHomeWorkStatusModel obj[]){
        int flag=0;
        try{
           conn = DbPool.getConnection();         
           flag=homeworkDAO.markHWC(conn,obj);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        if(flag==1)
        return "{success:true}";
        else
        return "{failure:true}";    
    }
    
    @RequestMapping(value=URLMap.STUDENT_HOME_WORK, method=RequestMethod.GET)
    @ResponseBody
    public String getStudentHomework(@RequestParam("studentid") String sid,
                                     @RequestParam("batchid") String batchid
            ){
        try{
           conn = DbPool.getConnection();
           return homeworkDAO.getStudentHomeWorkAsJSON(conn,sid,batchid).toString();
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return "{failure:true}";    
    }
    
}


