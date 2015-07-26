/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.controller;

import com.dlabs.constants.URLMap;
import com.dlabs.mis.dao.NotificationDAO;
import com.dlabs.mis.dao.OnlineExamDetailDAO;
import com.dlabs.mis.model.Notification;
import com.dlabs.mis.model.OnlineExamDetail;
import com.dlabs.mis.model.OnlineExamQuestion;
import com.dlabs.session.AuthHandler;
import com.kjava.base.db.DbPool;
import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
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
 * @author XPPRESP3
 */
@Controller
public class OnlineExamDetailController {
    
    Connection conn = null;
    @Autowired
    private OnlineExamDetailDAO onlineExamDetailDAO;

    public void setOnlineExamDetailDAO(OnlineExamDetailDAO onlineExamDetailDAO) {
        this.onlineExamDetailDAO = onlineExamDetailDAO;

    }
    @RequestMapping(value=URLMap.ADD_ONLINE_EXAM_DETAIL, method= RequestMethod.POST)
    @ResponseBody
    public OnlineExamDetail addOnlineExamDetail(@RequestBody OnlineExamDetail obj){
        
       try{
           conn = DbPool.getConnection();
           return onlineExamDetailDAO.addOnlineExamDetail(conn,obj);
        }

        catch(Exception ex){
              
        }finally{
            DbPool.close(conn);
        }
        return obj;
     }
    @RequestMapping(value=URLMap.GET_ONLINE_EXAM_DETAIL, method= RequestMethod.GET)
    @ResponseBody
    public String getOnlineExamDetail(@RequestParam("classid") String classname){
       try{
            conn = DbPool.getConnection();
           return onlineExamDetailDAO.getOnlineExamDetail(conn,classname,0,250).toString();
        }
       
        catch(Exception ex){            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }
    @RequestMapping(value=URLMap.ADD_ONLINE_EXAM_QUESTION, method= RequestMethod.POST)
    @ResponseBody
    public OnlineExamQuestion addOnlineExamQuestion(@RequestBody OnlineExamQuestion obj){
        
       try{
           conn = DbPool.getConnection();
           return onlineExamDetailDAO.addOnlineExamQuestion(conn,obj);
        }

        catch(Exception ex){
              
        }finally{
            DbPool.close(conn);
        }
        return obj;
     }
    @RequestMapping(value=URLMap.GET_ONLINE_EXAM_QUESTION, method= RequestMethod.GET)
    @ResponseBody
    public String getOnlineExamQuestionList(@RequestParam("examid") String examid){
       try{
            conn = DbPool.getConnection();
           return onlineExamDetailDAO.getOnlineExamQuestionList(conn,examid,0,250).toString();
        }
       
        catch(Exception ex){            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }
    @RequestMapping(value=URLMap.SCHEDULE_ONLINE_EXAM, method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> schOnlineExam(HttpServletRequest request,@RequestBody Map<String,Object> model){
        
       try{
           conn = DbPool.getConnection();
           String id=AuthHandler.getUserId(request);
           model.put("createdby",id);
           model.put("modifiedby",id);
           return onlineExamDetailDAO.schOnlineExam(conn,model);
        }
        catch(Exception ex){
              
        }finally{
            DbPool.close(conn);
        }
        return model;
     }
    @RequestMapping(value=URLMap.GET_ONLINE_SCH_EXAM, method= RequestMethod.GET)
    @ResponseBody
    public String getOnlineSchExamList(HttpServletRequest request){
       try{
           Map<String, Object> model=new HashMap();
            conn = DbPool.getConnection();
            model.put("userid", AuthHandler.getUserId(request));
            model.put("classid",request.getParameter("classid"));
            model.put("sessionid",request.getParameter("sessionid"));
           return onlineExamDetailDAO.getOnlineSchExamList(conn,model,0,250).toString();
        }
       
        catch(Exception ex){            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }
    @RequestMapping(value=URLMap.RESCHEDULE_ONLINE_EXAM, method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> reschOnlineExam(HttpServletRequest request,@RequestBody Map<String,Object> model){
        
       try{
           conn = DbPool.getConnection();
           String id=AuthHandler.getUserId(request);
           model.put("modifiedby",id);
           return onlineExamDetailDAO.reschOnlineExam(conn,model);
        }
        catch(Exception ex){
              
        }finally{
            DbPool.close(conn);
        }
        return model;
     }
    @RequestMapping(value=URLMap.DELETE_ONLINE_SCH_EXAM, method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> delSchOnlineExam(HttpServletRequest request,@RequestBody Map<String,Object> model){
        
       try{
           conn = DbPool.getConnection();
           String id=AuthHandler.getUserId(request);
           model.put("modifiedby",id);
           return onlineExamDetailDAO.delSchOnlineExam(conn,model);
        }
        catch(Exception ex){
              
        }finally{
            DbPool.close(conn);
        }
        return model;
     }
    @RequestMapping(value=URLMap.PRINT_USER_PASS, method= RequestMethod.GET)
    @ResponseBody
    public String getOnlineSchUserPassList(HttpServletRequest request){
       try{
           Map<String, Object> model=new HashMap();
            conn = DbPool.getConnection();
            model.put("userid", AuthHandler.getUserId(request));
            model.put("pid",request.getParameter("pid"));

           return onlineExamDetailDAO.getOnlineSchUserPassList(conn,model,0,250).toString();
        }
       
        catch(Exception ex){            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }
}
