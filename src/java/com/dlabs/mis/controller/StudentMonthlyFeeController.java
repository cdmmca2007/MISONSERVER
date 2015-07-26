/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.controller;
import com.dlabs.constants.MISConstant;
import com.dlabs.constants.URLMap;
import com.dlabs.mis.dao.ClassDAO;
import com.dlabs.mis.dao.MasterDAO;
import com.dlabs.mis.dao.PaymentDAO;
import com.dlabs.mis.dao.StudentMonthlyFeeDAO;
import com.dlabs.mis.model.Classes;
import com.dlabs.mis.model.ExtraFeeModel;
import com.dlabs.mis.model.GenerateFee;
import com.dlabs.mis.model.Master;
import com.dlabs.mis.model.Property;
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
public class StudentMonthlyFeeController {
    
    Connection conn = null;
    
    @Autowired
    private StudentMonthlyFeeDAO studentmonthlyfeeDAO;

    @RequestMapping(value=URLMap.MARK_FEE_PAID, method=RequestMethod.POST)
    @ResponseBody
    public GenerateFee markPaid(@RequestBody GenerateFee obj){
       
        try{
            conn = DbPool.getConnection();
           return studentmonthlyfeeDAO.markPaid(conn,obj);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
       return obj;
    }

    @RequestMapping(value=URLMap.DELETE_MONTHLY_FEE, method=RequestMethod.POST)
    @ResponseBody
    public GenerateFee deleteMonthlyFee(@RequestBody GenerateFee obj){
       
        try{
            conn = DbPool.getConnection();
           return studentmonthlyfeeDAO.deleteMonthlyFee(conn,obj);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
       return obj;
    }
    
    
    public void setStudentMonthlyFeeDAO(StudentMonthlyFeeDAO studentmonthlyfeeDAO) {
        this.studentmonthlyfeeDAO = studentmonthlyfeeDAO;
        
    }
    
    @RequestMapping(value=URLMap.ADD_EDIT_STUDENT_MONTHLY_FEE, method=RequestMethod.POST)
    @ResponseBody
    public ExtraFeeModel addStudentFee(@RequestBody ExtraFeeModel obj){
        try{
            conn = DbPool.getConnection();
           return studentmonthlyfeeDAO.addOrEditFee(conn,obj);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return obj;
    }
    @RequestMapping(value=URLMap.GET_STUDENT_MONTHLY_FEE, method= RequestMethod.GET)
    @ResponseBody
    public String getStudentFee(@RequestParam("monthly_fee_id") String monthly_fee_id){
    //public String getStudentFee(){        
       try{
            conn = DbPool.getConnection();
           return studentmonthlyfeeDAO.getAllFeeAsJson(conn,monthly_fee_id,0,15).toString();
        }
       
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }

    
    @RequestMapping(value=URLMap.GET_STUDENT_FEE_PARENT, method= RequestMethod.GET)
    @ResponseBody
    public String getStudentMonthlyFeeParent(@RequestParam("userid") String userid,
                                             @RequestParam("sessionid") String sessionid
            ){   
       try{
            conn = DbPool.getConnection();
           return studentmonthlyfeeDAO.getAllMonthlyFeeParentAsJson(conn,userid,sessionid,0,15).toString();
        }
       
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }
    
    @RequestMapping(value=URLMap.GET_STUDENT_FEE_NAME, method= RequestMethod.GET)
    @ResponseBody
    public String getStudentMonthlyFeeNames(@RequestParam("monthly_fee_id") String monthly_fee_id){   
       try{
            conn = DbPool.getConnection();
            
            return studentmonthlyfeeDAO.getAllMonthlyFeeNameAsJson(conn,monthly_fee_id,0,15).toString();
        }       
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }

}

