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
import com.dlabs.mis.dao.DocumentDAO;
import com.dlabs.mis.dao.EmailDAO;
import com.dlabs.mis.dao.MasterDAO;
import com.dlabs.mis.dao.PaymentDAO;
import com.dlabs.mis.model.Classes;
import com.dlabs.mis.model.Email;
import com.dlabs.mis.model.FileUploadBean;
import com.dlabs.mis.model.Master;
import com.dlabs.mis.model.Permission;
import com.dlabs.mis.model.Property;
import com.dlabs.mis.model.Tutorial;
import com.kjava.base.ReadableException;
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
public class DocumentController {
    
    Connection conn = null;
    
    @Autowired
    private DocumentDAO documentDAO;
    

    public void setDocumentDAO(DocumentDAO docDAO) {
        this.documentDAO = docDAO;

    }
    
    @RequestMapping(value = URLMap.ADD_DOCUMENT, method = RequestMethod.POST)
    @ResponseBody
    public String addDocument(HttpServletRequest obj){
       int flag=0;
        try{
           conn = DbPool.getConnection();
            flag=documentDAO.addDocument(conn,obj);
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
 /* @RequestMapping(value = URLMap.GET_DOCUMENT, method = RequestMethod.GET)
  @ResponseBody
    public String getDocument(@RequestParam("pid") String pid,
                              @RequestParam("downloadedby")  String downloadedby,
                              @RequestParam("action")  int action
    ){
        try {
            conn = DbPool.getConnection();
            return documentDAO.getDocument(conn,pid,downloadedby,action);
        } catch (Exception ex) {
        } finally {
            DbPool.close(conn);
        }
        return "";
    }
*/
    
    @RequestMapping(value = URLMap.GET_FOLDERS, method = RequestMethod.GET)
    @ResponseBody
    public List<Tutorial> getAllFolder(@RequestParam("sessionid") String sessionid,
                                       @RequestParam("isparent")  int  isparent,
                                       @RequestParam("batchid") String batchid) throws ReadableException, SQLException {
        List<Tutorial> res = null;
        if(isparent==1){ 
        try {
            conn = DbPool.getConnection();
            res=documentDAO.getAllFolder(conn,sessionid);
        } catch (Exception ex) {
        } finally {
            DbPool.close(conn);
        }
        }
        else{
           conn = DbPool.getConnection(); 
           res=documentDAO.getAllDocument(conn,batchid); 
        }
        return res;
    }

}

