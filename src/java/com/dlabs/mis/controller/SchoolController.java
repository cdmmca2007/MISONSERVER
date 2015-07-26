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
import com.dlabs.mis.dao.SchoolDAO;
import com.dlabs.mis.dao.WebService;
import com.dlabs.mis.model.Master;
import com.dlabs.mis.model.Property;
import com.dlabs.mis.model.SchoolAdmin;
import com.dlabs.mis.model.Session;
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
@Controller
public class SchoolController {
    Connection conn = null;
    
    @Autowired
    SchoolDAO schoolDAO;

    public void setSchoolDAO(SchoolDAO schoolDAO) {
        this.schoolDAO = schoolDAO;
    }
    @RequestMapping(value=URLMap.SAVE_SCHOOL_DETAILS, method=RequestMethod.POST)
    @ResponseBody
    public SchoolAdmin addClass(@RequestBody SchoolAdmin obj){
        try{
            
            conn = DbPool.getConnection();            
          
            return schoolDAO.addOrEditSchoolDetails(conn,obj);           
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return obj;
    }
    
    @RequestMapping(value=URLMap.GET_SCHOOL_DETAILS, method= RequestMethod.GET)
    @ResponseBody
    public String getSchoolAdmin(){
       try{
            conn = DbPool.getConnection();
           return schoolDAO.getAllSchoolAdminAsJson(conn,0,15).toString();
        }
       
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }

    @RequestMapping(value=URLMap.SAVE_SESSION_DETAILS, method=RequestMethod.POST)
    @ResponseBody
    public int saveSessionDetails(@RequestBody Session obj){
        int flag=0;
        try{
            
            conn = DbPool.getConnection();                      
            flag=schoolDAO.addOrEditSessionDetails(conn,obj);  
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
