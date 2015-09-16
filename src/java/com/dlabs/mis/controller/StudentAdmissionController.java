/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.controller;

import com.dlabs.constants.MISConstant;
import com.dlabs.constants.URLMap;
import com.dlabs.mis.dao.GetBatch;
import com.dlabs.mis.dao.MasterDAO;
import com.dlabs.mis.dao.StudentAdmissionDAO;
import com.dlabs.mis.dao.StudentDAO;
import com.dlabs.mis.model.*;
import com.dlabs.mis.model.NewStudent;
import com.dlabs.session.AuthHandler;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.PageSize;
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
import com.kjava.base.db.DbPool;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.StringReader;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
 * @author cd
 */
@Controller
public class StudentAdmissionController {
    
    Connection conn = null;
    @Autowired
    StudentAdmissionDAO studentAdmissionDAO;
    public void setStudentAdmissionDAO(StudentAdmissionDAO studentAdmissionDAO) {
        this.studentAdmissionDAO = studentAdmissionDAO;
    }

    @RequestMapping(value=URLMap.INITIATE_ADMISSION_PROCESS, method=RequestMethod.POST)
    @ResponseBody
    public InitiateAdmissionProcess initiateStudentAdmissionProcess(@RequestBody InitiateAdmissionProcess obj){
        try{
            conn = DbPool.getConnection();
           return studentAdmissionDAO.initiateAdmissionProcess(conn,obj);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return obj;
    }

    @RequestMapping(value=URLMap.INITIATE_ADMISSION_PROCESS_GUEST, method=RequestMethod.POST)
    @ResponseBody
    public String initiateStudentAdmissionProcessForGuest(HttpServletRequest request,HttpServletResponse response){
        String res = "{success:'true'}";
        InitiateAdmissionProcess obj=new InitiateAdmissionProcess();
        if(request.getParameter("sessionid")!=null)        
           obj.setSessionid(request.getParameter("sessionid"));
        if(request.getParameter("classid")!=null)        
           obj.setClassid(request.getParameter("classid"));
        if(request.getParameter("emailid")!=null)        
           obj.setEmailid(request.getParameter("emailid"));
        if(request.getParameter("mobileno")!=null)        
           obj.setMobileno(request.getParameter("mobileno"));
        
        try{
           conn = DbPool.getConnection();
           obj=studentAdmissionDAO.initiateAdmissionProcess(conn,obj);
           res = "{success:'true'}";
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return res;
    }    
    @RequestMapping(value=URLMap.GET_ADMISSION_LIST, method=RequestMethod.GET)
    @ResponseBody
    public String getInitiateStudentAdmissionProcess(
                   @RequestParam("classid") String classid,
                   @RequestParam("sessionid") String sessionid

            ){
        try{
            conn = DbPool.getConnection();
            int page = 0, rows = 25;
           return studentAdmissionDAO.getInitiateAdmissionProcess(conn,sessionid,classid,page,rows).toString();
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return "";
    }

    @RequestMapping(value=URLMap.GET_PERSONAL_DATA, method=RequestMethod.GET)
    @ResponseBody
    public String getStudentPersonalData(@RequestBody  NewStudent obj){
        try{
            conn = DbPool.getConnection();           
           return studentAdmissionDAO.getStudentPersonalData(conn,obj).toString();
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return "";
    }   
    
    @RequestMapping(value=URLMap.GET_PERSONAL_DATA_WEB, method=RequestMethod.GET)
    @ResponseBody
    public String getStudentPersonalDataonWeb(@RequestParam String formno ){
        try{
            conn = DbPool.getConnection();           
           return studentAdmissionDAO.getStudentPersonalDataForWeb(conn,formno).toString();
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return "";
    } 
    
    
    @RequestMapping(value=URLMap.ADD_NEW_STUDENT, method=RequestMethod.POST)
    @ResponseBody
    public NewStudent addNewStudent(@RequestBody  NewStudent obj){
        try{
            conn = DbPool.getConnection();           
           return studentAdmissionDAO.addNewStudent(conn,obj);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return obj;
    }   

    
    
    @RequestMapping(value=URLMap.SAVE_ADDMISION_STUDENT_DET, method=RequestMethod.POST)
    @ResponseBody
    public NewStudent saveNewStudentDetails(@RequestBody  NewStudent obj){
        try{
            conn = DbPool.getConnection();           
           return studentAdmissionDAO.editNewStudentOnline(conn,obj);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return obj;
    } 
    @RequestMapping(value=URLMap.CONFIRM_ADDMISION_STUDENT_DET, method=RequestMethod.POST)
    @ResponseBody
    public NewStudent confirmNewStudentAddmision(@RequestBody  NewStudent obj){
        try{
            conn = DbPool.getConnection();           
           return studentAdmissionDAO.confirmNewStudentAddmision(conn,obj);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return obj;
    }
    
    @RequestMapping(value=URLMap.UPDATE_NEW_STUDENT, method=RequestMethod.POST)
    @ResponseBody
    public NewStudent editNewStudentOnline(@RequestBody  NewStudent obj){
        try{
           conn = DbPool.getConnection();           
           return studentAdmissionDAO.editNewStudentOnline(conn,obj);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return obj;
    }   
  
    
    @RequestMapping(value=URLMap.GET_EXISTING_STUDENT, method=RequestMethod.GET)
    @ResponseBody
    public String getExistingStudentData(
                   @RequestParam("classid") String classid,
                   @RequestParam("sessionid") String sessionid
            )
    {
        try{
           conn = DbPool.getConnection();           
           return studentAdmissionDAO.getExistingStudentData(conn,classid,sessionid,0,15).toString();
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return "";
    } 
    @RequestMapping(value=URLMap.GET_OFFLINE_STUDENT, method=RequestMethod.GET)
    @ResponseBody
    public String getOfflineStudentData(
                   @RequestParam("classid") String classid,
                   @RequestParam("sessionid") String sessionid    
            )
    {
        try{
           conn = DbPool.getConnection();           
           return studentAdmissionDAO.getOfflineStudentData(conn,classid,sessionid,0,15).toString();
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return "";
    }
    @RequestMapping(value=URLMap.SEND_INTERVIW_EXAM_DATE, method=RequestMethod.POST)
    @ResponseBody
    public ScheduleStrudentInterviewExam sendInterviewExamDetail(@RequestBody  ScheduleStrudentInterviewExam obj){
        try{
           conn = DbPool.getConnection();           
           obj=studentAdmissionDAO.sendInterviewExamDetail(conn,obj);
           if(obj.getResult()==1){
              conn.commit();
           }
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return obj;
    } 
    @RequestMapping(value=URLMap.ATTACH_ADMISSION_DOCUMENT, method=RequestMethod.POST)
    @ResponseBody
    public String attachAdmissionDocument(HttpServletRequest obj){
        int flag=0;
        try{
           conn = DbPool.getConnection();
            flag=studentAdmissionDAO.attachAdmissionDocument(conn,obj);
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
    @RequestMapping(value=URLMap.ADMISSION_FEE_RECIEPT, method= RequestMethod.POST)
    @ResponseBody
    public String getAdmissionFeePaymentReciept(
                   HttpServletRequest request,@RequestBody Map<String,Object> model
            ){
       try{
            conn = DbPool.getConnection();
            return studentAdmissionDAO.getAdmissionFeePaymentReciept(conn,model).toString();
        }

        catch(Exception ex){

        }finally{
            DbPool.close(conn);
        }
        return "";
     }
    
    @RequestMapping(value=URLMap.GET_ADMISSION_FEE, method=RequestMethod.GET)
    @ResponseBody
    public String getAllAdmissionFeeAsJson(
                   @RequestParam("studentid") String studentid,
                   @RequestParam("templateid") String templateid
            )
    {
        try{
           conn = DbPool.getConnection();           
            Map<String, Object> model =new HashMap<String, Object>();
            model.put("studentid", studentid);
            model.put("templateid", templateid);

           return studentAdmissionDAO.getAllAdmissionFeeAsJson(conn,model).toString();
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return "";
    }
    
    
    
    @RequestMapping(value=URLMap.PAY_ADMISSION_FEE, method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> payAdmissionFee(HttpServletRequest request,@RequestBody Map<String,Object> model){
        
       try{
           conn = DbPool.getConnection();
           String id=AuthHandler.getUserId(request);
           model.put("createdby",id);
           return studentAdmissionDAO.payAdmissionFee(conn,model);
        }
        catch(Exception ex){
              
        }finally{
            DbPool.close(conn);
        }
        return model;
    }        
    
    @RequestMapping(value=URLMap.DOWNLOAD_ADM_PAY_REC, method= RequestMethod.POST)
    @ResponseBody
    public HttpServletResponse downloadAdmissionFeePaymentReciept(
                   HttpServletRequest request,HttpServletResponse response
    ) throws DocumentException{
        
     /*   response.setContentType("application/pdf");
        try {
        OutputStream os = response.getOutputStream();
        Document document = new Document(PageSize.LETTER);
        PdfWriter pdfWriter = PdfWriter.getInstance(document,os);
        document.open();
        document.addAuthor("Real Gagnon");
        document.addCreator("Real's HowTo");
        document.addSubject("Thanks for your support");
        document.addCreationDate();
        document.addTitle("Please read this");

        XMLWorkerHelper worker = XMLWorkerHelper.getInstance();
        String data=new String();
        if(request.getParameter("downloadrecdata")!=null){
            data=request.getParameter("downloadrecdata");
        }else
        {
            data="No Data";
        }
        String content="";
        String str = "<html><head></head><body>"+data+"</body></html>";
        worker.parseXHtml(pdfWriter, document, new StringReader(str));
        document.close();
        os.close();
        }
        catch (Exception ex) {
            ex.printStackTrace();
        }*/
        
   try 
    {
        String htmlstring=new String();
        if(request.getParameter("downloadrecdata")!=null){
            htmlstring=request.getParameter("downloadrecdata");
        }else
        {
            htmlstring="No Data";
        }

        InputStream is = new ByteArrayInputStream(htmlstring.getBytes());             
        ByteArrayOutputStream baos = new ByteArrayOutputStream(); 

        // step 1
        Document document = new Document();

        // step 2
        PdfWriter writer = PdfWriter.getInstance(document, baos);

        writer.setInitialLeading(12.5f);

        // step 3
        document.open();

        HtmlPipelineContext htmlContext = new HtmlPipelineContext(null);

        htmlContext.setTagFactory(Tags.getHtmlTagProcessorFactory());

        // CSS
        CSSResolver cssResolver = new StyleAttrCSSResolver();
        InputStream csspathtest = Thread.currentThread().getContextClassLoader().getResourceAsStream("app.css");            
        CssFile cssfiletest = XMLWorkerHelper.getCSS(csspathtest);
        cssResolver.addCss(cssfiletest);             

        Pipeline<?> pipeline =  new CssResolverPipeline(cssResolver, new HtmlPipeline(htmlContext, new PdfWriterPipeline(document, writer)));

        XMLWorker worker = new XMLWorker(pipeline, true);
        XMLParser p = new XMLParser(worker);
        p.parse(is); //new FileInputStream("results/demo2/walden.html"));

        // step     
        document.close();

        response.setContentType("application/pdf");
        response.setHeader("Expires", "0");
        response.setHeader("Cache-Control", "must-revalidate, post-check=0, pre-check=0");           
        response.setHeader("Content-Type", "application/pdf");
        response.setHeader("Content-disposition","attachment;filename=file.pdf");
        response.setContentLength(baos.size());
        OutputStream os = response.getOutputStream();
        baos.writeTo(os);
        os.flush();
        os.close();
     }  catch (IOException ex) {        
            Logger.getLogger(StudentAdmissionController.class.getName()).log(Level.SEVERE, null, ex);
        } 
    return response;

    }
    @RequestMapping(value=URLMap.ADD_ADMISSION_FEE_PAYMENT, method= RequestMethod.POST)
    @ResponseBody
    public String addAdmissionFeePayment(
                   HttpServletRequest request,@RequestBody Map<String,Object>[] model
            ){
       try{
            conn = DbPool.getConnection();
            return studentAdmissionDAO.addAdmissionFeePayment(conn,model).toString();
        }

        catch(Exception ex){

        }finally{
            DbPool.close(conn);
        }
        return "";
     }
    
    
}
