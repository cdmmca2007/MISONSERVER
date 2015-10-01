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
import com.dlabs.mis.dao.LibraryDAO;
import com.dlabs.mis.dao.MasterDAO;
import com.dlabs.mis.dao.MisReportDAO;
import com.dlabs.mis.dao.PaymentDAO;
import com.dlabs.mis.model.*;

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
public class MisReportController {
 
        Connection conn = null;
       
        @Autowired
        private MisReportDAO misreportDAO;

        public void setMisReportDAO(MisReportDAO misreportDAO) {
        this.misreportDAO = misreportDAO;
        }
        
    @RequestMapping(value=URLMap.GET_MISREPORT, method= RequestMethod.GET)
    @ResponseBody
    public String getReportList(@RequestParam("reporttypeid") String reporttypeid){
       try{
            conn = DbPool.getConnection();
           return misreportDAO.getAllReportListAsJson(conn,reporttypeid,0,25).toString();
        }
       
        catch(Exception ex){            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }
    @RequestMapping(value=URLMap.ATTENDENCE_MISREPORT, method= RequestMethod.GET)
    @ResponseBody
    public String getAttendenceReportList(
            @RequestParam("sessionid") String sessionid,
            @RequestParam("classid") String classid
            ){
       try{
            conn = DbPool.getConnection();
            return misreportDAO.getAllAttendenceReportListAsJson(conn,sessionid,classid,0,25).toString();
        }
       
        catch(Exception ex){            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }
    @RequestMapping(value=URLMap.ATTENDENCE_MONTHLY_MISREPORT, method= RequestMethod.GET)
    @ResponseBody
    public String getAllClassAttendenceForMonth(
            @RequestParam("sessionid") String sessionid,
            @RequestParam("month") String month
            ){
       try{
            conn = DbPool.getConnection();
            return misreportDAO.getAllClassAttendenceForMonth(conn,sessionid,month).toString();
            
        }
       
        catch(Exception ex){            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }
    
    @RequestMapping(value=URLMap.GET_PAYMENT_REPORT, method= RequestMethod.GET)
    @ResponseBody
    public String getPaymentReportList(
            @RequestParam("sessionid") String sessionid,
            @RequestParam("classid") String classid
            ){
       try{
            conn = DbPool.getConnection();
            return misreportDAO.getAllPaymentReportListAsJson(conn,sessionid,classid,0,25).toString();
        }
       
        catch(Exception ex){            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }

    @RequestMapping(value=URLMap.GET_MONTHLY_PAYMENT_REPORT, method= RequestMethod.GET)
    @ResponseBody
    public String getMonthlyPaymentReportList(
            @RequestParam("sessionid") String sessionid,
            @RequestParam("month") int month
            ){
       try{
            conn = DbPool.getConnection();
            return misreportDAO.getMonthlyPaymentReportListAsJson(conn,sessionid,month,0,25).toString();
        }
       
        catch(Exception ex){            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }
    
@RequestMapping(value=URLMap.GET_CLASS_REPORT, method= RequestMethod.GET)
    @ResponseBody
    public String getClassReportList(
            @RequestParam("sessionid") String sessionid
            ){
       try{
            conn = DbPool.getConnection();
            return misreportDAO.getClassReportListAsJson(conn,sessionid).toString();
        }
       
        catch(Exception ex){            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }

@RequestMapping(value=URLMap.GET_DASHBOARD_CHART_REPORT, method= RequestMethod.GET)
@ResponseBody
    public String getDashboardReport(
            @RequestParam("sessionid") String sessionid
            ){
       try{
            conn = DbPool.getConnection();
            return misreportDAO.getDashboardReport(conn,sessionid).toString();
       }
      
        catch(Exception ex){            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
  }

@RequestMapping(value=URLMap.GET_AUDITTRAIL_REPORT, method= RequestMethod.GET)
@ResponseBody
    public String getAuditTrialReport(){
       try{
            conn = DbPool.getConnection();
            return misreportDAO.getAuditTrialReport(conn).toString();
       }
      
        catch(Exception ex){            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }

   
 @RequestMapping(value=URLMap.GET_DAILY_ATTENDENCE_REPORT, method= RequestMethod.GET)
    @ResponseBody
    public String getAllClassAttendenceForDaily(
            @RequestParam("sessionid") String sessionid,
            @RequestParam("month") String month,
            @RequestParam("colfield") int colfield
            
            ){
       try{
            conn = DbPool.getConnection();
            return misreportDAO.getAllClassAttendenceForDaily(conn,sessionid,month,colfield).toString();
            
        }
       
        catch(Exception ex){            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
  }       
  @RequestMapping(value=URLMap.GET_LIST_OF_ABSENT_STUDENT, method= RequestMethod.GET)
  @ResponseBody
    public String getListofAbsentStudentForDaily(
            @RequestParam("sessionid") String sessionid,
            @RequestParam("month") String month,
            @RequestParam("colfield") int colfield,
            @RequestParam("batchid") String batchid
            ){
       try{
            conn = DbPool.getConnection();
            return misreportDAO.getListofAbsentStudentForDaily(conn,batchid,sessionid,month,colfield).toString();
            
        }
       
        catch(Exception ex){            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }
    
@RequestMapping(value=URLMap.GET_STUDENT_YEARLY_PAYMENT_REPORT, method= RequestMethod.GET)
@ResponseBody
    public String getStudentYearlyPaymentReport(
            @RequestParam("classid") String classid,
            @RequestParam("sessionid") String sessionid
            ){
       try{
            conn = DbPool.getConnection();
            return misreportDAO.getStudentYearlyPaymentReport(conn,sessionid,classid).toString();
       }
      
        catch(Exception ex){            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
 }
@RequestMapping(value=URLMap.GET_EXAM_REPORT_ANALYSIS   , method= RequestMethod.GET)
@ResponseBody
    public String getExamReportAnalysisData(
            @RequestParam("examtypeid") String examtypeid,
            @RequestParam("sessionid") String sessionid
            ){
       try{
            conn = DbPool.getConnection();
            return misreportDAO.getExamReportAnalysisData(conn,sessionid,examtypeid).toString();
       }
      
        catch(Exception ex){            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
  }   
@RequestMapping(value=URLMap.GET_EXAM_REPORT_ANALYSIS_SUBJECT_WISE  , method= RequestMethod.GET)
@ResponseBody
    public String getExamReportAnalysisSubjectWiseData(
            @RequestParam("examtypeid") String examtypeid,
            @RequestParam("sessionid") String sessionid,
            @RequestParam("classid") String classid
            ){
       try{
            conn = DbPool.getConnection();
            return misreportDAO.getExamReportAnalysisSubjectWiseData(conn,sessionid,examtypeid,classid).toString();
       }
      
        catch(Exception ex){            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
  }  
}
