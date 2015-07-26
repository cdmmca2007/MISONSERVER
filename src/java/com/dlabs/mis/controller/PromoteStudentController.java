/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.controller;

import com.dlabs.constants.URLMap;
import com.dlabs.mis.dao.NotificationDAO;
import com.dlabs.mis.dao.PromoteStudentDAO;
import com.dlabs.mis.model.Notification;
import com.dlabs.mis.model.StudentPromoteToNextClass;
import com.kjava.base.db.DbPool;
import java.sql.Connection;
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
public class PromoteStudentController {
    Connection conn = null;

    @Autowired
    private PromoteStudentDAO   promoteStudentDAO;
    
    public void setPromoteStudentDAO(PromoteStudentDAO promoteStudentDAO) {
        this.promoteStudentDAO = promoteStudentDAO;

    }
    
    @RequestMapping(value=URLMap.GET_PSM, method= RequestMethod.GET)
    @ResponseBody
    public String getPSM(@RequestParam("batch_id") String batch_id,
                         @RequestParam("studentid") String studentid
                         
            ){
       try{
           String userid="";
           conn = DbPool.getConnection();            
           return promoteStudentDAO.getAllPSMAsJson(conn,batch_id,studentid,0,15).toString();
           
        }

        catch(Exception ex){

        }finally{
            DbPool.close(conn);
        }
        return "";
     }

    @RequestMapping(value=URLMap.GET_PSMSTUD_LIST, method= RequestMethod.GET)
    @ResponseBody
    public String getPSMStudentList(@RequestParam("classid") String classid,
                         @RequestParam("sessionid") String sessionid
                         
            ){
       try{
           String userid="";
           conn = DbPool.getConnection();            
           return promoteStudentDAO.getAllPSMStdListAsJson(conn,classid,sessionid,0,15).toString();
           
        }

        catch(Exception ex){

        }finally{
            DbPool.close(conn);
        }
        return "";
     }
    @RequestMapping(value=URLMap.PROMOTE_STUDENT, method=RequestMethod.POST)
    @ResponseBody
    public int promoteStudent(@RequestBody StudentPromoteToNextClass[] obj){
        int flag=0;
        try{
            conn = DbPool.getConnection();
           flag=promoteStudentDAO.promoteStudent(conn,obj);
           if(flag==1)
               conn.commit();

        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return flag;
    }   
}
