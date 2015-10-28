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
import com.dlabs.mis.dao.PaymentDAO;
import com.dlabs.mis.model.FeeStructure;
import com.dlabs.mis.model.TemplateDetail;
import com.dlabs.mis.model.Templates;
import com.kjava.base.db.DbPool;
import java.sql.Connection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class PaymentController {
    Connection conn = null;
    
    @Autowired
    private PaymentDAO paymentDAO;
    
    public void setPaymentDAO(PaymentDAO paymentDAO) {
        this.paymentDAO = paymentDAO;
    }
      
    @RequestMapping(value=URLMap.ADD_TEMPLATES, method=RequestMethod.POST)
    @ResponseBody
    public Templates addTemplate(@RequestBody Templates template){
        try{
            conn = DbPool.getConnection();
           template =paymentDAO.addOrEditTemplate(conn,template);
           conn.commit();
        }
        catch(Exception ex){
            DbPool.rollback(conn);
        }finally{
            DbPool.close(conn);
        }
        return template;
    }
    @RequestMapping(value=URLMap.DEL_TEMPLATE, method=RequestMethod.POST)
    @ResponseBody
    public String delTemplate(@RequestBody Templates template){
        String result="";
        try{
            conn = DbPool.getConnection();
           result= paymentDAO.delTemplate(conn,template);
           conn.commit();
        }
        catch(Exception ex){
            DbPool.rollback(conn);
        }finally{
            DbPool.close(conn);
        }
        return result;
    }
    @RequestMapping(value=URLMap.GET_TEMPLATE, method= RequestMethod.GET)
    @ResponseBody
    public String getTemplate(@RequestParam("id") String id){
       String res = "";
        try{
            conn = DbPool.getConnection();
            res =paymentDAO.getTemplate(conn,id).toString();
        }
       
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return res; 
     }
     @RequestMapping(value=URLMap.ADD_TEMPLATE_DETAILS, method=RequestMethod.POST)
    @ResponseBody
    public String addTemplateDetails(@RequestBody TemplateDetail[] details){
        String result =MISConstant.SUCCESS_FALSE;
         try{
            conn = DbPool.getConnection();
           paymentDAO.addOrEditTemplateDetails(conn,details);
           result = MISConstant.SUCCESS_TRUE;
           conn.commit();
        }
        catch(Exception ex){
            DbPool.rollback(conn);
        }finally{
            DbPool.close(conn);
        }
        return result;
    }
    @RequestMapping(value=URLMap.GET_TEMPLATES, method= RequestMethod.GET)
    @ResponseBody
    public String getTemplates(@RequestParam("sessionid") String sessionid){
       try{
            conn = DbPool.getConnection();
           return paymentDAO.getTemplatesAsJson(conn,sessionid,0,100).toString();
        }
       
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }
     @RequestMapping(value=URLMap.GET_ALL_FEESTRUCTURE, method= RequestMethod.GET)
    @ResponseBody
    public String getFeeStructures(){
       try{
            conn = DbPool.getConnection();
           return paymentDAO.getAllFeeStructure(conn,0,25).toString();
        }
       
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }
    @RequestMapping(value=URLMap.ADD_FEE_STRUCTURE, method=RequestMethod.POST)
    @ResponseBody
    public FeeStructure addFeeStructure(@RequestBody FeeStructure fees){
        try{
            conn = DbPool.getConnection();
           fees =paymentDAO.addOrEditFeeStructure(conn,fees);
           conn.commit();
        }
        catch(Exception ex){
            DbPool.rollback(conn);
        }finally{
            DbPool.close(conn);
        }
        return fees;
    }
    @RequestMapping(value=URLMap.DEL_FEE_STRUCTURE, method=RequestMethod.POST)
    @ResponseBody
    public String delFeeStructure(@RequestBody FeeStructure fees){
        String result="";
        try{
            conn = DbPool.getConnection();
           result= paymentDAO.delFeeStructure(conn,fees);
           conn.commit();
        }
        catch(Exception ex){
            DbPool.rollback(conn);
        }finally{
            DbPool.close(conn);
        }
        return result;
    }
}
