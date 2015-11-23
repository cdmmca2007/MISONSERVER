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
import com.dlabs.mis.dao.GetBatch;
import com.dlabs.mis.dao.LibraryDAO;
import com.dlabs.mis.dao.MasterDAO;
import com.dlabs.mis.dao.MisReportDAO;
import com.dlabs.mis.dao.PaymentDAO;
import com.dlabs.mis.model.*;
import com.dlabs.mis.services.DownloadService;
import com.dlabs.session.AuthHandler;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.Pipeline;
import com.itextpdf.tool.xml.XMLWorker;
import com.itextpdf.tool.xml.XMLWorkerHelper;
import com.itextpdf.tool.xml.css.CssFile;
import com.itextpdf.tool.xml.css.StyleAttrCSSResolver;
import com.itextpdf.tool.xml.html.Tags;
import com.itextpdf.tool.xml.parser.XMLParser;
import com.itextpdf.tool.xml.pipeline.css.CSSResolver;
import com.itextpdf.tool.xml.pipeline.css.CssResolverPipeline;
import com.itextpdf.tool.xml.pipeline.end.PdfWriterPipeline;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipeline;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipelineContext;
import com.kjava.base.ReadableException;

import com.kjava.base.db.DbPool;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Map;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import jxl.Workbook;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.support.rowset.SqlRowSet;
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
    @Autowired
    private DownloadService downloadService;

    private String SqlRowSet;

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
//For Custom Report    
@RequestMapping(value=URLMap.GET_COLUMN_LIST_FOR_MODULE  , method= RequestMethod.GET)
@ResponseBody
    public String getColumnListForModule(
            @RequestParam("moduleid") String moduleid,
            @RequestParam("reportid") String reportid
            ){
       try{
            conn = DbPool.getConnection();
            return misreportDAO.getColumnListForModule(conn,moduleid,reportid).toString();
       }
      
        catch(Exception ex){            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
  }
  @RequestMapping(value=URLMap.ADD_CUSTOM_REPORT, method= RequestMethod.POST)
  @ResponseBody
  public Map<String,Object> addCustomReport(HttpServletRequest request,@RequestBody Map<String,Object> model){
        
       try{
           conn = DbPool.getConnection();
           String id=AuthHandler.getUserId(request);
           return misreportDAO.addCustomReport(conn,model);
        }
        catch(Exception ex){
              
        }finally{
            DbPool.close(conn);
        }
        return model;
   }  
  
@RequestMapping(value=URLMap.GET_CUSTOM_REPORT  , method= RequestMethod.GET)
@ResponseBody
    public String getCustomReportList(){
       try{
            conn = DbPool.getConnection();
            return misreportDAO.getCustomReportList(conn).toString();
       }
      
        catch(Exception ex){            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
  } 
    
  @RequestMapping(value=URLMap.ADD_COLUMN_IN_REPORT, method= RequestMethod.POST)
  @ResponseBody
  public Map<String,Object>[] addColumnInCustomReport(HttpServletRequest request,@RequestBody Map<String,Object>[] model){
        
       try{
           conn = DbPool.getConnection();
           return misreportDAO.addColumnInCustomReport(conn,model);
        }
        catch(Exception ex){
              
        }finally{
            DbPool.close(conn);
        }
        return model;
   }   
  @RequestMapping(value=URLMap.ADD_REPORT_CONDITION, method= RequestMethod.POST)
  @ResponseBody
  public Map<String,Object> addColumnConditionInCustomReport(HttpServletRequest request,@RequestBody Map<String,Object> model){
        
       try{
           conn = DbPool.getConnection();
           return misreportDAO.addColumnConditionInCustomReport(conn,model);
        }
        catch(Exception ex){
              
        }finally{
            DbPool.close(conn);
        }
        return model;
   } 
  
  @RequestMapping(value=URLMap.DOWNLOAD_CUSTOM_REPORT, method= RequestMethod.POST)
  @ResponseBody
    public void downloadCustomReport(
                   HttpServletRequest request,HttpServletResponse response
    ) throws DocumentException,ReadableException{
    ServletOutputStream out = null;
    WritableWorkbook workbook = null;
    int reportid=Integer.parseInt(request.getParameter("reportid"));
    
    String sessionid=new String();
    String classid=new String();
    String batchid=new String();
    
    if(request.getParameter("sessionid")!=null)
        sessionid=request.getParameter("sessionid");
    
    if(request.getParameter("classid")!=null)
    classid=request.getParameter("classid");
    
    if(sessionid!=null && classid!=null && !sessionid.equals("") && !classid.equals(""))
    batchid=new GetBatch(classid, sessionid).BatchId(conn);
    
    try {
    conn = DbPool.getConnection();
    String reportname=misreportDAO.getCustomReportName(conn,reportid);
    reportname=reportname.replace(" ", "_");
    SqlRowSet srs=misreportDAO.getCustomReportQueryData(conn,reportid,sessionid,batchid);
        
            out = response.getOutputStream();
            workbook = Workbook.createWorkbook(out);
            response.setContentType("application/vnd.ms-excel");
            response.setHeader("Content-Disposition", "attachment; filename="+reportname+".xls");
            downloadService.writeToWorkBookFromSqlRowSet(workbook,srs);

        } catch (IOException e) {
        } catch (Exception e) {
        } finally {
            try {
                out.flush();
                workbook.write();
                workbook.close();
                out.close();
            } catch (IOException e) {
            } catch (WriteException e) {
            }
        }
   }
}
