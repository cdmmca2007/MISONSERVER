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
import com.dlabs.mis.dao.MasterDAO;
import com.dlabs.mis.dao.SchoolDAO;
import com.dlabs.mis.dao.WebService;
import com.dlabs.mis.dao.WebServiceCallDAO;
import com.dlabs.mis.model.Master;
import com.dlabs.mis.model.Property;
import com.dlabs.mis.model.SchoolAdmin;
import com.dlabs.mis.model.Session;
import com.dlabs.mis.model.UserLogin;
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
public class WebServiceCallController {
 
    Connection conn = null;
    
    @Autowired
    WebServiceCallDAO webServiceCallDAO;

    public void setWebServiceCallDAO(WebServiceCallDAO webServiceCallDAO) {
        this.webServiceCallDAO = webServiceCallDAO;
    }      
    
    @RequestMapping(value=URLMap.VALIDATE_MOBILE_USER, method= RequestMethod.POST)
    @ResponseBody
    public String validateUserFromMobile(@RequestBody UserLogin obj){
       try{
            conn = DbPool.getConnection();
            return webServiceCallDAO.validateUserFromMobile(conn,obj).toString();
        }
       
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }
}
