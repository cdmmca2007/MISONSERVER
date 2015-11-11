/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.controller;

import com.dlabs.constants.URLMap;
import com.dlabs.mis.dao.FineDiscountDAO;
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


        
/**
 *
 * @author XPPRESP3
 */
@Controller
public class  FineDiscountController{
    
    Connection conn = null;
    @Autowired
    private FineDiscountDAO fineDiscountDAO;

    public void FineDiscountDAO(FineDiscountDAO fineDiscountDAO) {
        this.fineDiscountDAO = fineDiscountDAO;

    }
    @RequestMapping(value=URLMap.ADD_FINE, method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> addFine(HttpServletRequest request,@RequestBody Map<String,Object> model){
        
       try{
           conn = DbPool.getConnection();
           String id=AuthHandler.getUserId(request);
           
           if(model.get("finetypeid")==null || model.get("finetypeid").equals("")) model.put("createdby",id);
           model.put("modifiedby",id);
           return fineDiscountDAO.addFine(conn,model);
        }

        catch(Exception ex){
              
        }finally{
            DbPool.close(conn);
        }
        return model;
    }
    @RequestMapping(value=URLMap.DELETE_FINE, method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> deleteFine(HttpServletRequest request,@RequestBody Map<String,Object> model){
        
       try{
           conn = DbPool.getConnection();
           String id=AuthHandler.getUserId(request);
           
           if(model.get("finetypeid")==null || model.get("finetypeid").equals("")) model.put("createdby",id);
           model.put("modifiedby",id);
           return fineDiscountDAO.deleteFine(conn,model);
        }

        catch(Exception ex){
              
        }finally{
            DbPool.close(conn);
        }
        return model;
    }
    @RequestMapping(value=URLMap.ADD_FINE_RULE, method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> addFineRule(HttpServletRequest request,@RequestBody Map<String,Object> model){
        
       try{
           conn = DbPool.getConnection();
           String id=AuthHandler.getUserId(request);
           
           if(model.get("fineid")==null || model.get("fineid").equals("")) model.put("createdby",id);
           model.put("modifiedby",id);
           return fineDiscountDAO.addFineRule(conn,model);
        }

        catch(Exception ex){
              
        }finally{
            DbPool.close(conn);
        }
        return model;
    }
    @RequestMapping(value=URLMap.GET_FINE, method= RequestMethod.GET)
    @ResponseBody
    public String getFineList(@RequestParam("sessionid") String sessionid){
       try{
            conn = DbPool.getConnection();
           return fineDiscountDAO.getFineList(conn,sessionid,0,250).toString();
        }
       
        catch(Exception ex){            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }
   @RequestMapping(value=URLMap.ADD_DISCOUNT, method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> addDiscount(HttpServletRequest request,@RequestBody Map<String,Object> model){
        
       try{
           conn = DbPool.getConnection();
           String id=AuthHandler.getUserId(request);
           
           if(model.get("discountid")==null || model.get("discountid").equals(""))
           model.put("createdby",id);
           
           model.put("modifiedby",id);
           return fineDiscountDAO.addDiscount(conn,model);
        }

        catch(Exception ex){
              
        }finally{
            DbPool.close(conn);
        }
        return model;
     }
    @RequestMapping(value=URLMap.GET_DISCOUNT, method= RequestMethod.GET)
    @ResponseBody
    public String getDiscountList(@RequestParam("sessionid") String sessionid){
       try{
            conn = DbPool.getConnection();
           return fineDiscountDAO.getDiscountList(conn,sessionid,0,250).toString();
        }
       
        catch(Exception ex){            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }
    @RequestMapping(value=URLMap.ADD_FINE_TO_STUDENT_MON_FEE, method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> addFineToStudMonthlyFee(HttpServletRequest request,@RequestBody Map<String,Object> model){
        
       try{
           conn = DbPool.getConnection();
           String id=AuthHandler.getUserId(request);
           model.put("modifiedby",id);
           return fineDiscountDAO.addFineToStudMonthlyFee(conn,model);
        }

        catch(Exception ex){
              
        }finally{
            DbPool.close(conn);
        }
        return model;
    
    }
    @RequestMapping(value=URLMap.ADD_DISCOUNT_TO_STUD_MON_FEE, method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object>[] addDiscountToStudMonthlyFee(HttpServletRequest request,@RequestBody Map<String,Object>[] model){
        
       try{
           conn = DbPool.getConnection();
           return fineDiscountDAO.addDiscountToStudMonthlyFee(conn,model);
        }

        catch(Exception ex){
              
        }finally{
            DbPool.close(conn);
        }
        return model;
    }
    //payment/adddiscounttostudmonfee.do
    
    @RequestMapping(value=URLMap.GET_DISCOUNT_FOR_STUDENT, method= RequestMethod.GET)
    @ResponseBody
    public Map<String,Object> getDiscountListForStudent(HttpServletRequest request,@RequestParam("sessionid") String sessionid, 
            @RequestParam("classid") String classid, 
            @RequestParam("studentid") String studentid 
            ){
       Map<String,Object> model=new HashMap<String, Object>(); 
       try{
           
           conn = DbPool.getConnection();
           model.put("sessionid",sessionid);
           model.put("classid",classid);
           model.put("studentid",studentid);
           String id=AuthHandler.getUserId(request);
           model.put("modifiedby",id);
           return fineDiscountDAO.getDiscountListForStudent(conn,model,0,250);
        }

        catch(Exception ex){
              
        }finally{
            DbPool.close(conn);
        }
       return model;
    }
    
}
