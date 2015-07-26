/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dlabs.mis.controller;
import com.dlabs.constants.URLMap;
import com.dlabs.mis.dao.paymentDetailDAO;
import com.dlabs.mis.model.FeeInMonthlyFeeOfClass;
import com.dlabs.mis.model.GenerateFee;
import com.dlabs.mis.model.GenerateFeePostData;
import com.dlabs.mis.model.PaymentReciept;
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
public class PaymentDetailController {

    Connection conn = null;

    @Autowired
    private paymentDetailDAO paymentdetailDAO;

    public void setClassDAO(paymentDetailDAO paymentdetailDAO) {
        this.paymentdetailDAO = paymentdetailDAO;

    }
    
    @RequestMapping(value=URLMap.GET_PAYMENTDETAILS, method= RequestMethod.GET)
    @ResponseBody
    public String getTimetable(){
       try{
            conn = DbPool.getConnection();
           return paymentdetailDAO.getAllPaymentDetailsAsJson(conn,0,15).toString();
        }

        catch(Exception ex){

        }finally{
            DbPool.close(conn);
        }
        return "";
     }
    
    @RequestMapping(value=URLMap.GET_GENERATED_FEE, method= RequestMethod.GET)
    @ResponseBody
    public String getAdminStudentFeeList(
                   @RequestParam("classid") String classid,
                   @RequestParam("sessionid") String sessionid,
                   @RequestParam("month") int month)
    {
           String studentid; 
           
           GenerateFeePostData obj=new GenerateFeePostData();
           obj.setClassid(classid);
           obj.setMonthid(month);
           obj.setSessionid(sessionid);
           
       try{
            if(classid.indexOf(':') > 0){
               
                studentid=classid.substring(classid.indexOf(':')+1,classid.length());
                obj.setClassid(classid.substring(0,classid.indexOf(':')));  
                 conn = DbPool.getConnection();
                 return paymentdetailDAO.getAllAsJsonStudentWise(conn,obj,studentid,0,15).toString();
            }
            else {
                
            conn = DbPool.getConnection();
            return paymentdetailDAO.getAllAsJson1(conn,obj,0,150).toString();
            }
        }

        catch(Exception ex){

        }finally{
            DbPool.close(conn);
        }
        return "";
     }
    @RequestMapping(value=URLMap.GET_GENERATED_FEE_CLASS, method= RequestMethod.GET)
    @ResponseBody
    public String getGeneratedFeeList(
                   @RequestParam("classid") String classid,
                   @RequestParam("sessionid") String sessionid,
                   @RequestParam("month") int month
            ){
       try{
           GenerateFeePostData obj=new GenerateFeePostData();
           obj.setClassid(classid);
           obj.setMonthid(month);
           obj.setSessionid(sessionid);
            conn = DbPool.getConnection();
           return paymentdetailDAO.getGeneratedFeeList(conn,obj,0,150).toString();
        }

        catch(Exception ex){

        }finally{
            DbPool.close(conn);
        }
        return "";
     }

    @RequestMapping(value=URLMap.GENERATE_FEE, method=RequestMethod.POST)
    @ResponseBody
    public Object addGenerateFee(@RequestBody GenerateFeePostData obj)
    {
        try{
          conn = DbPool.getConnection();
            
          return paymentdetailDAO.generateFee(conn,obj.getSessionid() ,obj.getClassid(),obj.getMonthid(),obj.getDuedate());
           
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return "{result:1}";
    }

    @RequestMapping(value=URLMap.ADD_FEE_IN_MONTHLY_FEE_OF_CLASS, method=RequestMethod.POST)
    @ResponseBody
    public Object addFeeInMonthlyFeeOfClass(@RequestBody FeeInMonthlyFeeOfClass obj)
    {
        
        try{
            conn = DbPool.getConnection();
            return paymentdetailDAO.addFeeInMonthlyFeeOfClass(conn,obj);
           
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return obj;
    }

    @RequestMapping(value=URLMap.GET_PAYMENT_FEE_RECIEPT, method= RequestMethod.POST)
    @ResponseBody
    public String getPaymentReciept(
                   @RequestBody PaymentReciept obj
            ){
       try{
            conn = DbPool.getConnection();
            return paymentdetailDAO.getPaymentReciept(conn,obj.getMonthly_fee_id(),0,150).toString();
        }

        catch(Exception ex){

        }finally{
            DbPool.close(conn);
        }
        return "";
     }
    
}
