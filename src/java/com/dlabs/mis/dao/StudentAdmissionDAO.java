/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

import com.dlab.spring.web.dao.AbstractSimpleDao;
import com.dlabs.mis.model.AdmissionDocument;
import com.dlabs.mis.model.GenerateString;
import com.dlabs.mis.model.HomeWork;
import com.dlabs.mis.model.InitiateAdmissionProcess;
import com.dlabs.mis.model.NewStudent;
import com.dlabs.mis.model.ScheduleStrudentInterviewExam;
import com.dlabs.mis.model.User;
import com.dlabs.mis.model.UserLogin;
import com.dlabs.mis.services.MailService;
import com.dlabs.util.FileHandler;
import com.kjava.base.ReadableException;
import com.kjava.base.db.DaoUtil;
import com.kjava.base.util.ExtJsonUtil;
import com.kjava.base.util.JSONUtil;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author cd
 */
@Repository
public class StudentAdmissionDAO extends AbstractSimpleDao{

    JSONUtil jsonUtil = new ExtJsonUtil();
    @Autowired MailService mailService;
    
    public InitiateAdmissionProcess initiateAdmissionProcess(Connection conn, InitiateAdmissionProcess obj) throws ReadableException {

        
        String batchid=new GetBatch(obj.getClassid(),obj.getSessionid()).BatchId(conn);
        
        String insertquery=" INSERT INTO admission_notfy_parent " +
                           " (isformlinkmailsent,formlinksentdate,createdby,modifiedon,modifiedby,frmlinkexpiredate," +
                           " parentemailid,parentmobile,sessionid,batchid,status) VALUES(?,current_date,?,current_date,?,?,?,?,?,?,'Initiated')";
        //Send link to email-id and sms to mobile no
        if(DaoUtil.executeUpdate(conn,insertquery,new Object[]{1,obj.getCreatedby(),obj.getModifiedby(),obj.getLastdate(),obj.getEmailid(),obj.getMobileno(),obj.getSessionid(),batchid})==1){            
        try {
                conn.commit();
                ResultSet rs=DaoUtil.executeQuery(conn,"SELECT formid FROM admission_notfy_parent WHERE parentemailid=? AND parentmobile=?",new Object[]{obj.getEmailid(),obj.getMobileno()});
                if(rs.next() && rs.getObject("formid")!=null) obj.setFormid(rs.getInt("formid"));
                if(obj.getFormid() > 0)
                mailService.onSendAddmissionLinkToPArent(conn, obj);
            } catch (SQLException ex) {
                Logger.getLogger(StudentAdmissionDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return obj;
    }
   
    public Object getInitiateAdmissionProcess(Connection conn,String sessionid,String classid,int page,int rows) throws ReadableException{
    
        JSONObject data = null;
        ResultSet rs = null;
        int count =0;
        String batchid=new GetBatch(classid,sessionid).BatchId(conn);
        String selectquery= "SELECT  asr.pid as studentid,anp.status,anp.formid AS formno, " +
                            "        CASE anp.isformlinkmailsent WHEN 1 THEN 'Link Sent' ELSE 'Link Not Sent' END," +
                            "        anp.formlinksentdate,anp.receivedate," +
                            "        CASE anp.isinterviewtestmailsent WHEN 1 THEN 'Interview & Test Detial Sent' ELSE 'Link Not Sent' END AS  isinterviewtestmailsent," +
                            "	anp.interviewtestsentdate, anp.interviewtestdone,frmlinkexpiredate," +
                            "	anp.parentemailid AS parentemailid, " +
                            "	anp.parentmobile AS parentmobile , " +
                            "	anp.sessionid,asr.fname AS sname,asr.mname AS mname,asr.lname AS lname,asr.fathername," +
                            "	asr.classid,asr.pid, asr.formid,CONCAT(CONCAT(CONCAT(CONCAT(asr.fname,' '), " +
                            "	CASE WHEN asr.mname IS NULL THEN '' ELSE asr.mname END),' '),asr.lname)AS name, " +
                            "	asr.fname, asr.mname, asr.lname, FROM_UNIXTIME(asr.dob/1000,'%d-%m-%Y') AS dob, " +
                            "	asr.address, asr.fathername AS fathername, " +
                            "	asr.mothername, asr.caretakername, /*asr.parentemailid, asr.parentmobile,*/ " +
                            "	asr.alternateemailid, asr.alternatemobile, asr.classid, asr.religion," +
                            "	asr.cityid, asr.stateid, asr.countryid, asr.gender, " +
                            "	asr.bloodgroup, asr.nationality, asr.mother_tounge, " +
                            "	asr.image_path, asr.passport_no, asr.visadetails, " +
                            "	asr.uid, asr.adhar_id, asr.ssn,asr.annualincome,asr.fatherhighestedu,asr.occupation ," +
                            "	asi.pid AS interviewid ,asi.interviewdate AS intrviewdate, asi.status AS selectinterstatus,asi.comment AS intervcomment," +
                            "	ast.pid AS entranceexamid ,ast.testdate AS intrvexamdate, " +
                            "	ast.teststatus AS selectteststatus ,ast.comment ," +
                            "	ast.markobatained AS totscore " +
                            "FROM 	admission_notfy_parent anp " +
                            "LEFT  JOIN  admission_stud_registration  asr ON anp.formid=asr.formid  " +
                            "LEFT  JOIN  admission_stud_interview     asi ON asi.formid =asr.formid " +
                            "LEFT  JOIN  admission_stud_test          ast ON ast.formid =asr.formid " +
                            "WHERE anp.sessionid= ? AND anp.batchid= ?";

        rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{sessionid,batchid});
        data = jsonUtil.getJsonObject(rs, count, page,rows, false);
        return data;
    }

    public NewStudent getStudentPersonalData(Connection conn, NewStudent obj) throws ReadableException {
        JSONObject data = null;
        ResultSet rs = null;
        int count =0;
        String selectquery= "SELECT pid,formid,CONCAT(CONCAT(CONCAT(CONCAT(fname,' '),case when mname is null then '' else mname end),' '),lname) as name,fname,mname, " +
                            "	lname,FROM_UNIXTIME(dob/1000,'%d-%m-%Y') as dob,address,fathername,mothername,caretakername,parentemailid, " +
                            "	parentmobile,alternateemailid,alternatemobile, " +
                            "	classid, createdby, createdon, 	modifiedby, " +
                            "	modifiedon, religion, cityid, stateid, countryid, " +
                            "	gender, bloodgroup, nationality, mother_tounge, " +
                            "	image_path, passport_no, visadetails, uid, adhar_id, ssn " +
                            "	FROM " +
                            "	admission_stud_registration where formid=?";

        rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{});
        
        return obj;         
    }

    public Object getStudentPersonalDataForWeb(Connection conn, String formno) throws ReadableException {
       JSONObject data = null;
       ResultSet rs = null;
       
       String selectquery="SELECT  anp.formid, anp.parentemailid, anp.parentmobile, asr.formid,"+ 
	" asr.fname, 	asr.mname, 	asr.lname, 	asr.dob, 	asr.address, "+ 
	" asr.fathername, 	asr.mothername, 	asr.caretakername, 	asr.parentemailid, "+ 
	" asr.parentmobile, 	asr.alternateemailid, 	asr.alternatemobile, 	asr.classid, "+ 
	" asr.religion, "+ 
	" asr.cityid, 	asr.stateid, 	asr.countryid, 	asr.gender, 	asr.bloodgroup, "+ 
	" asr.nationality, 	asr.mother_tounge, 	asr.image_path, 	asr.passport_no, "+ 
	" asr.visadetails, 	asr.uid, 	asr.adhar_id, 	asr.ssn"+ 
        " FROM admission_notfy_parent anp LEFT JOIN admission_stud_registration  asr ON anp.formid=asr.formid WHERE anp.formid=? ";
       
       ResultSet rs1=DaoUtil.executeQuery(conn,selectquery,new Object[]{formno});

       rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{formno});
       data = jsonUtil.getJsonObject(rs, 1, 1,15, false); 
       return data;         
    }
    
    public NewStudent addNewStudent(Connection conn, NewStudent obj) throws ReadableException {
        String studentquery="INSERT INTO student (studentid,fname,lname,mname,dob,address,fathername,mothername, " +
                            "	caretakername,parentemailid,parentmobile,alternateemailid,alternatemobile, " +
                            "	classid,createdby,createdon,modifiedby,modifiedon,religion,cityid, " +
                            "	stateid,countryid,userid,admissiondate,gender,blood_group, " +
                            "	nationality,mother_tounge,image_path,passportno,visadetails,ssn,uid,adharno,admissiontype" +
                            "	)" +
                            "	VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_DATE,?,CURRENT_DATE,?,? " +
                            "	      ,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        String classstudentquery="INSERT INTO student_class_map " +
                            "	(student_id,batch_id)" +
                            "	VALUES(?,?)";
        try {
        if(obj.getSession_id()!=null && obj.getClassid()!=null && (obj.getAdmissionno().equals("")||obj.getAdmissionno()==null) && obj.getStudentid()==null)
        {
            String batchid=new GetBatch(obj.getClassid(),obj.getSession_id()).BatchId(conn);
            String studentid =new String();
            if(obj.getStudentid()!=null && !obj.getStudentid().equals(""))
               studentid=obj.getStudentid();
            else
               studentid=java.util.UUID.randomUUID().toString();
            if(DaoUtil.executeUpdate(conn,studentquery,new Object[]{
                                                            studentid,obj.getFname(),obj.getLname(),obj.getMname(),
                                                            obj.getDob(),obj.getAddress(),obj.getFathername(),obj.getMothername(),
                                                            obj.getCaretakername(),obj.getParentemailid(),obj.getParentmobile(),
                                                            obj.getAlternateemailid(),obj.getAlternatemobile(),
                                                            obj.getClassid(),obj.getCreatedby(),obj.getModifiedby(),obj.getReligion(),obj.getCityid(),
                                                            obj.getStateid(),"",obj.getParentemailid(),obj.getAdmissiondate(),
                                                            obj.getGender(),obj.getBlood_group(),obj.getNationality(),obj.getMother_tounge(),
                                                            obj.getImage_path(),obj.getPassport_no(),obj.getVisadetail(),obj.getSsn(),obj.getUid(),
                                                            obj.getAadhar_id(),obj.getAdmissiontype()
                                                          })==1){  
                
                 if(DaoUtil.executeUpdate(conn,classstudentquery,new Object[]{studentid,batchid})==1){
                        obj.setStudentid(studentid);
                        
                            User userobj=new User();
                            UserDAO userdaoobj =new UserDAO();
                            UserLogin loginobj=new UserLogin();
                            userobj.setAddress(obj.getAddress());
                            userobj.setCity(obj.getCityid());
                            userobj.setContactNo(obj.getParentmobile());
                            userobj.setEmailId(obj.getParentemailid());
                            userobj.setName(obj.getFathername());
                            userobj.setRoleId(4);
                            loginobj.setUserName(obj.getParentemailid());
                            loginobj.setPassword(new GenerateString().getString());
                            userobj.setUserLogin(loginobj);               
                            userdaoobj.addOrEditUser(conn, userobj);
                            
                            ResultSet rs_1=DaoUtil.executeQuery(conn,"select addmission_no from student where studentid=?",new Object[]{obj.getStudentid()});       
                            if(rs_1.next()){
                            obj.setAdmissionno(rs_1.getString("addmission_no"));
                            }
                            if(obj.getIntrvexamdate()> 0)insertExamDetails(conn,obj);
                            if(obj.getIntrviewdate()> 0)insertInterviewDetails(conn,obj);
                            conn.commit();
                 }            
            }
        }
        else{            
        }
        } catch (SQLException ex) {
                Logger.getLogger(StudentAdmissionDAO.class.getName()).log(Level.SEVERE, null, ex);
        } 
        return obj;
    }

    public Object getExistingStudentData(Connection conn, String classid, String sessionid, int page, int rows) throws ReadableException {
        JSONObject job = null;
        ResultSet rs = null;
        int count =0;
        String schoolid="1000";
        String batch_id=new GetBatch(classid,sessionid).BatchId(conn);
        try{
            rs = DaoUtil.executeQuery(conn, "SELECT count(1) as count from student_Class_map where batch_id=?",new Object[]{batch_id});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            String query=" SELECT scm.batch_id as batch_id, studentid,CONCAT(CONCAT(CONCAT(CONCAT(fname,' '),case when mname is null then '' else mname end),' '),lname) as name,fname,mname,lname,FROM_UNIXTIME(dob/1000,'%d-%m-%Y') as dob,address,fathername,mothername," +
                        "         caretakername,parentemailid,parentmobile,alternateemailid," +
                        "         alternatemobile,classid,schoolid,createdby," +
                        "         FROM_UNIXTIME(admissiondate/1000,'%d-%m-%Y') as admissiondate,modifiedby/*,createdon,modifiedon*/," +
                        "         religion,cityid,stateid,countryid,userid," +
                        "         addmission_no as admissionno,gender,blood_group,nationality,mother_tounge,image_path,passportno as passport_no, " +
                        "         visadetails,ssn,uid,adharno as aadhar_id,admissiontype" +                    
                        "    FROM student_class_map scm " +
                        "    JOIN student s ON scm.student_id=s.studentid" +
                        "   WHERE batch_id= ?" +
                        "     AND FROM_UNIXTIME(admissiondate/1000,'%Y') < DATE_FORMAT(SYSDATE(), '%Y')" +
                        "     AND admissiontype=(SELECT id FROM master WHERE propertyid=17 AND VALUE LIKE '%Existing%') LIMIT ? OFFSET ? ";
            page=0;rows=15;
            rs = DaoUtil.executeQuery(conn,query,new Object[]{batch_id,rows,page});
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        }
        
        catch (SQLException ex) {
            Logger.getLogger(StudentAdmissionDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;
    }

    public Object getOfflineStudentData(Connection conn, String classid, String sessionid, int page, int rows) throws ReadableException {
        JSONObject job = null;
        ResultSet rs = null;
        int count =0;
        String schoolid="1000";
        String batch_id=new GetBatch(classid,sessionid).BatchId(conn);
        try{
            rs = DaoUtil.executeQuery(conn, "SELECT count(1) as count from student_Class_map where batch_id=?",new Object[]{batch_id});
            if(rs.next()) {
                count = rs.getInt("count");

            }
            String query="  SELECT scm.batch_id as batch_id,studentid,fname,mname,lname,CONCAT(CONCAT(CONCAT(CONCAT(fname,' '),case when mname is null then '' else mname end),' '),lname) as name,fname,mname,lname,FROM_UNIXTIME(dob/1000,'%d-%m-%Y') as dob,address,fathername,mothername," +
                        "         caretakername,parentemailid,parentmobile,alternateemailid," +
                        "         alternatemobile,classid,schoolid,createdby," +
                        "         FROM_UNIXTIME(admissiondate/1000,'%d-%m-%Y') as admissiondate,modifiedby/*,createdon,modifiedon*/," +
                        "         religion,cityid,stateid,countryid,userid ," +
                        "         addmission_no as admissionno,gender,blood_group,nationality,mother_tounge,image_path,passportno as passport_no, " +
                        "         visadetails,ssn,uid,adharno as aadhar_id,admissiontype" +                                        
                        "    FROM student_class_map scm " +
                        "    JOIN student s ON scm.student_id=s.studentid" +
                        "   WHERE scm.batch_id= ? "+
                        "     AND FROM_UNIXTIME(s.admissiondate/1000,'%Y')=DATE_FORMAT(SYSDATE(), '%Y')" +
                        "     AND s.admissiontype=(SELECT id FROM master WHERE propertyid=17 AND VALUE LIKE '%offline%') LIMIT ? OFFSET ? ";
            page=0;rows=15;
            rs = DaoUtil.executeQuery(conn,query,new Object[]{batch_id,rows,page});
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(StudentAdmissionDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;        
    }
   
    public NewStudent editNewStudentOnline(Connection conn, NewStudent obj) throws ReadableException {

          String batchid=new GetBatch(obj.getClassid(),obj.getSession_id()).BatchId(conn); 
          if(obj.getFormno()!=null && obj.getSession_id()!=null && obj.getClassid()!=null){
          
             
             String updatestring="UPDATE  admission_notfy_parent SET receivedate = CURRENT_DATE, isinterviewtestmailsent =1, " +
                                 " interviewtestsentdate = current_date , modifiedon =  CURRENT_DATE,  modifiedby =  ? , " +
                                 "parentemailid = ? , parentmobile = ? , status='Applied' , batchid=? WHERE formid = ? and sessionid = ?";
 	     String selectdata  ="select * from admission_stud_registration where formid=?";
             String updatestring1="UPDATE admission_stud_registration SET fname = ? , mname = ? , lname = ? , dob   = ? ,"+ 
                                  " address = ?, fathername = ? , mothername = ? , caretakername = ? , parentemailid = ? , " +
                                  " parentmobile =  ? , alternateemailid = ? , alternatemobile = ? , classid = ?, "+
                                  " createdby = ? , modifiedby = ? , modifiedon =  CURRENT_DATE, religion = ?, "+
                                  " cityid = ?,stateid = ?,countryid = ?,gender =?,bloodgroup = ?,nationality = ?,"+
                                  " mother_tounge = ?,passport_no = ?,visadetails = ?,uid = ?,adhar_id =?,ssn = ? , annualincome=? , fatherhighestedu=? , occupation=? "+
                                  " WHERE formid = ?";
             String insertquery="INSERT INTO admission_stud_registration " +
                                " (pid,formid, fname, mname, lname, dob, address, fathername, mothername, caretakername, " +
                                " parentemailid, parentmobile, alternateemailid, alternatemobile, classid, createdby, " +
                                " modifiedby,religion, cityid, stateid, countryid, gender, " +
                                " bloodgroup, nationality, mother_tounge, image_path, passport_no, visadetails, uid, " +
                                " adhar_id, ssn,annualincome,fatherhighestedu,occupation)" +
                                " VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
             
             ResultSet rs=DaoUtil.executeQuery(conn, selectdata,new Object[]{obj.getFormno()});
              try {
                  if(rs.next()){
                      if(DaoUtil.executeUpdate(conn,updatestring,new Object[]{obj.getModifiedby(),obj.getParentemailid(),obj.getParentmobile(),batchid,obj.getFormno(),obj.getSession_id()})==1){
                        if(DaoUtil.executeUpdate(conn,updatestring1,new Object[]{obj.getFname(),obj.getMname(),obj.getLname(),obj.getDob(),obj.getAddress(),
                                   obj.getFathername(),obj.getMothername(),obj.getCaretakername(),obj.getParentemailid(),
                                   obj.getParentmobile(),obj.getAlternateemailid(),obj.getParentmobile(),batchid,
                                   obj.getCreatedby(),obj.getModifiedby(),obj.getReligion(),obj.getCityid(),obj.getStateid(),
                                   "",obj.getGender(),obj.getBlood_group(),obj.getNationality(),obj.getMother_tounge(),
                                   obj.getParentmobile(),obj.getVisadetail(),obj.getUid(),obj.getAadhar_id(),obj.getSsn(),
                                   obj.getAnnualincome(),obj.getFatherhighestedu(),obj.getOccupation(),obj.getFormno()
                        })==1){
                            //send mail to Parent Emailid regarding Interview & Testdate
                            if(obj.getIntrvexamdate()> 0)insertExamDetails(conn,obj);
                            if(obj.getIntrviewdate()> 0)insertInterviewDetails(conn,obj);
                            conn.commit();
                            obj.setStudentid("1");
                        }
                      }  
                  }
                  else
                  {
                      if(DaoUtil.executeUpdate(conn,updatestring,new Object[]{obj.getModifiedby(),obj.getParentemailid(),obj.getParentmobile(),batchid,obj.getFormno(),obj.getSession_id()})==1){
                          String pid=java.util.UUID.randomUUID().toString();
                        if(DaoUtil.executeUpdate(conn,insertquery,new Object[]{pid,obj.getFormno(),obj.getFname(),obj.getMname(),obj.getLname(),obj.getDob(),obj.getAddress(),
                                   obj.getFathername(),obj.getMothername(),obj.getCaretakername(),obj.getParentemailid(),
                                   obj.getParentmobile(),obj.getAlternateemailid(),obj.getParentmobile(),batchid,
                                   obj.getCreatedby(),obj.getModifiedby(),obj.getReligion(),obj.getCityid(),obj.getStateid(),
                                   "",obj.getGender(),obj.getBlood_group(),obj.getNationality(),obj.getMother_tounge(),
                                   obj.getImage_path(),obj.getParentmobile(),obj.getVisadetail(),obj.getUid(),obj.getAadhar_id(),obj.getSsn(),
                                   obj.getAnnualincome(),obj.getFatherhighestedu(),obj.getOccupation()
                        })==1){
                           //send mail to Parent Emailid regarding Interview & Testdate
                            if(obj.getIntrvexamdate()> 0)insertExamDetails(conn,obj);
                            if(obj.getIntrviewdate()> 0)insertInterviewDetails(conn,obj);

                            conn.commit();
                            obj.setStudentid(pid);
                        }
                      }                        
                  }
              } catch (SQLException ex) {
                  Logger.getLogger(StudentAdmissionDAO.class.getName()).log(Level.SEVERE, null, ex);
              }
          }                      
        
       return obj; 
    }

    public ScheduleStrudentInterviewExam sendInterviewExamDetail(Connection conn, ScheduleStrudentInterviewExam obj) throws ReadableException {

        String updatequery="UPDATE admission_notfy_parent SET isinterviewtestmailsent = 1 ," +
                            " interviewtestsentdate = CURRENT_DATE, " +
                            " modifiedon    = CURRENT_DATE , 	" +
                            " modifiedby    = ? , examdate      = ? ," +
                            " interviewdate = ? , examapplicable= ? , interviewapplicable = ?" +
                            " WHERE formid = ? AND sessionid=? AND batchid=?";
        String batchid=new GetBatch(obj.getClassid(),obj.getSessionid()).BatchId(conn); 
        
        if(batchid!=null &&  obj.getFormno() !=null){

            if(DaoUtil.executeUpdate(conn, updatequery,new Object[]{obj.getModifiedby(),obj.getExamdate(),
                                                                obj.getInterviewdate(),obj.getExamapplicable(),
                                                                obj.getIntrwapplicable(),obj.getFormno(),
                                                                obj.getSessionid(),batchid
                                                               })==1){
                 NewStudent nobj=new NewStudent();
                 nobj.setFormno(obj.getFormno());
                 nobj.setSession_id(obj.getSessionid());
                 nobj.setClassid(obj.getClassid());
                 nobj.setCreatedby(obj.getModifiedby());
                 nobj.setModifiedby(obj.getModifiedby());
                 nobj.setIntrvexamdate(obj.getExamdate());
                 nobj.setIntrviewdate(obj.getInterviewdate());
                 insertExamDetails(conn,nobj);
                 insertInterviewDetails(conn,nobj);
                 obj.setResult(1);
                 mailService.onSendInterViewExamDateToPArent(conn, obj);           
            }
        }
        return obj;
    }

    public NewStudent confirmNewStudentAddmision(Connection conn, NewStudent obj) throws ReadableException {

      String updatequery="UPDATE admission_notfy_parent SET STATUS = 'Confirm' , modifiedby = ?  WHERE formid = ? AND sessionid=? AND batchid=? ";
      String batchid=new GetBatch(obj.getClassid(),obj.getSession_id()).BatchId(conn);   
      
      if(obj.getFormno()!=null && obj.getSession_id()!=null && batchid!=null){
      
           if(DaoUtil.executeUpdate(conn,updatequery,new Object[]{obj.getModifiedby(),obj.getFormno(),obj.getSession_id(),batchid})==1){
               this.addNewStudent(conn, obj);
               //send mail for admission confirmation
               if(obj.getAdmissionno()!=null)
                  try {
                   conn.commit();
               } catch (SQLException ex) {
                   Logger.getLogger(StudentAdmissionDAO.class.getName()).log(Level.SEVERE, null, ex);
               }
           }
      }
      return obj;  
    }

    private void insertExamDetails(Connection conn, NewStudent obj) throws ReadableException {

        String batchid=new GetBatch(obj.getClassid(),obj.getSession_id()).BatchId(conn);
        if(obj.getEntranceexamid() ==null || obj.getEntranceexamid().equals("")){
            
            String insert=" INSERT INTO admission_stud_test (pid,formid, sessionid, batchid, testdate, teststatus, markobatained, COMMENT," +
                          " createdby, modifiedby ,createdon) " +
                          " VALUES	(?,?,?,?,?,?,?,?,?,?,CURRENT_DATE)";

            String pid=java.util.UUID.randomUUID().toString();
            if(DaoUtil.executeUpdate(conn, insert,new Object[]{pid , obj.getFormno(),obj.getSession_id(),batchid,obj.getIntrvexamdate(),obj.getTotscore(),obj.getSelectteststatus(),obj.getIntervcomment(),
                                                               obj.getCreatedby(),obj.getModifiedby()
            })==1){
                     
            }
        }
        else{
            String update=" UPDATE admission_stud_test SET	testdate = ? , teststatus = ? , markobatained = ? ," +
                          " COMMENT = ? , modifiedby = ?  " +
                          " WHERE pid=?";
            if(DaoUtil.executeUpdate(conn, update,new Object[]{obj.getIntrvexamdate(),obj.getSelectteststatus(),obj.getTotscore(),obj.getIntervcomment(),obj.getModifiedby(),obj.getEntranceexamid()})==1){
            
            }
        }
    }

    private void insertInterviewDetails(Connection conn, NewStudent obj) throws ReadableException {
        String batchid=new GetBatch(obj.getClassid(),obj.getSession_id()).BatchId(conn);
        if(obj.getInterviewid() ==null || obj.getInterviewid().equals("")){
            String insert=" INSERT INTO admission_stud_interview " +
                          " (pid,formid,sessionid,batchid,interviewdate,STATUS,createdby,modifiedby,comment,createdon)" +
                          " VALUES  (?,?,?,?,?,?,?,?,?,CURRENT_DATE)";
            String pid=java.util.UUID.randomUUID().toString();
            if(DaoUtil.executeUpdate(conn, insert,new Object[]{pid,obj.getFormno(),obj.getSession_id(),batchid,obj.getIntrviewdate(),obj.getSelectinterstatus(),obj.getCreatedby(),obj.getModifiedby(),obj.getIntervcomment()})==1){
              
            }
        }
        else{
            String update="UPDATE admission_stud_interview SET interviewdate = ?,STATUS =? , COMMENT =? , modifiedby = ? " +
                          "WHERE pid = ? ";
            if(DaoUtil.executeUpdate(conn, update,new Object[]{obj.getIntrviewdate(),obj.getSelectinterstatus(),obj.getIntervcomment(),obj.getModifiedby(),obj.getInterviewid()})==1){
            
            }
        }

    }
   
    public int attachAdmissionDocument(Connection conn, HttpServletRequest obj) throws ReadableException {
        int flag=0;
        ResultSet rs=null;
        String path=new ApplicationPathDAO().getPathById(conn,1);
        HashMap arrParam = new HashMap();
        AdmissionDocument addocobj=new AdmissionDocument();
        
        String id="";
        try {
            String query =  "INSERT INTO admissiondocument (id, studentid, batchid, documenttype, documentname, originalname,  createdby) VALUES(?,?,?,?,?,?,?)";
            
            String pid = java.util.UUID.randomUUID().toString();
            arrParam = (HashMap) FileHandler.uploadFile(path, obj);        
            addocobj=getObject(arrParam); 
            
            String batchid=new GetBatch(addocobj.getClassid(),addocobj.getSessionid()).BatchId(conn);
            
            if(DaoUtil.executeUpdate(conn,query,new Object[]{pid,
                                                             addocobj.getStudentid(),
                                                             batchid,
                                                             addocobj.getDocumenttype(),
                                                             addocobj.getDocumentname(),
                                                             addocobj.getOriginalname(),addocobj.getCreatedby()
                                                            })==1)
            {
                conn.commit();
                flag=1;
            } 
        } catch (SQLException ex) {
            throw new ReadableException(ex.getCause(),ex.getMessage(),"StudentAdmissionDAO", "attachAdmissionDocument");         
        }
        return flag;
    }
    public AdmissionDocument getObject(HashMap obj){
      
        AdmissionDocument hwobj=new AdmissionDocument();
        if(obj.containsKey("classid"))
            hwobj.setClassid((String)obj.get("classid"));
        if(obj.containsKey("sessionid"))
            hwobj.setSessionid((String)obj.get("sessionid"));
        if(obj.containsKey("id"))
            hwobj.setStudentid((String)obj.get("id"));
        if(obj.containsKey("documenttype"))
            hwobj.setDocumenttype((String)obj.get("documenttype"));
        if(obj.containsKey("createdby"))
            hwobj.setCreatedby((String)obj.get("createdby"));
        if(obj.containsKey("modifiedfilename"))
            hwobj.setDocumentname((String)obj.get("modifiedfilename"));
        if(obj.containsKey("filename"))
            hwobj.setOriginalname((String)obj.get("filename"));

        
        return hwobj;
         
    }

    public Object getAdmissionFeePaymentReciept(Connection conn,  Map<String, Object> model) {
       
       String schooldetail="SELECT schoolname ,logopath,schooltitle,websiteurl,addressline1,addressline2 ,city ,state,country , pinnumber,contact1,contact2, emailid1 FROM schooladmin";

       String mainquery="SELECT   g.pid,CONCAT(CONCAT(CONCAT(CONCAT(s.fname,' '),CASE WHEN s.mname IS NULL THEN '' ELSE s.mname END),' '),s.lname) AS studentname,	" +
                        "	 s.fathername ,CONCAT(CONCAT(s.address,' , '),s.cityid) AS studadd," +
                        "	 s.addmission_no,c.name as classname " +
                        "  FROM   admission_stud_registration g " +
                        "  JOIN   student s ON s.studentid=g.pid  " +
                        "  JOIN   sessions ss ON ss.batch_id=g.classid " +
                        "  JOIN   class c ON c.classid=ss.class_id " +
                        "  WHERE  g.pid=?";
       
       String feequery="select t.id as templateid , fs.fee_structure_id ,  fs.fee_name AS feename, fs.fee_type , fs.fee_amount as amount " +
                        "  from templates t " +
                        "  join template_structure_mapping tsm on tsm.template_id=t.id  "+
                        "  join feestructure fs                on fs.fee_structure_id=tsm.fee_structure_id " +
                        "  where t.id= ? ";
        JSONObject job = new JSONObject();        
        Collection<JSONObject> items = new ArrayList<JSONObject>();
        int totamount=0;
        int feeamount=0;
        int netamount=0,fineamount=0,discountamount=0;
        String feedesc =null;
        String feename=null;
        
        try {
            
            ResultSet rs=DaoUtil.executeQuery(conn,schooldetail);
            ResultSet rs1=DaoUtil.executeQuery(conn,mainquery,new Object[]{model.get("studentid").toString()});
            ResultSet rs2=DaoUtil.executeQuery(conn,feequery,new Object[]{model.get("templateid").toString()});
            
            while(rs.next()){
                
               // if(rs.getObject("pricipalname")!=null)
               // job.put("principalname",rs.getString("pricipalname"));
                        
                if(rs.getObject("schoolname")!=null)
                job.put("schoolname",rs.getString("schoolname"));

                if(rs.getObject("logopath")!=null)
                job.put("logopath",rs.getString("logopath"));
                
                if(rs.getObject("websiteurl")!=null)
                job.put("websiteurl",rs.getString("websiteurl"));
                        
                if(rs.getObject("addressline1")!=null)
                job.put("addressline1",rs.getString("addressline1"));
                
                if(rs.getObject("addressline2")!=null)
                job.put("addressline2",rs.getString("addressline2"));
                
                if(rs.getObject("city")!=null)
                job.put("city",rs.getString("city"));
                
                if(rs.getObject("state")!=null)                
                job.put("state",rs.getString("state"));
                
                if(rs.getObject("country")!=null)
                job.put("country",rs.getString("country"));
                
                if(rs.getObject("pinnumber")!=null)
                job.put("pinnumber",rs.getString("pinnumber"));
                
                if(rs.getObject("contact1")!=null)
                job.put("contact1",rs.getString("contact1"));
                
                if(rs.getObject("contact2")!=null)
                job.put("contact2",rs.getString("contact1"));
                
                if(rs.getObject("emailid1")!=null)
                job.put("emailid1",rs.getString("emailid1"));
            }

          if(rs1.next()){
          if(rs1.getObject("studentname")!=null)job.put("studentname",rs1.getString("studentname"));  
          if(rs1.getObject("fathername")!=null) job.put("fathername",rs1.getString("fathername"));
          if(rs1.getObject("classname")!=null)  job.put("classname",rs1.getString("classname"));            
          if(rs1.getObject("addmission_no")!=null) job.put("addmission_no",rs1.getString("addmission_no"));            
          if(rs1.getObject("studadd")!=null)    job.put("studadd",rs1.getString("studadd"));
       }
         totamount=0;
                      while(rs2.next()){
                         if(rs2.getObject("feename")!=null && rs2.getObject("amount")!=null)
                         {
                           JSONObject obj1 =new JSONObject();  
                           feeamount=rs2.getInt("amount");  
                           obj1.put("feeName",rs2.getString("feename"));
                           obj1.put("amount",feeamount);
                           totamount=totamount +feeamount;
                           items.add(obj1);
                         }
                      }
         netamount=totamount-fineamount+discountamount;             
         job.put("totamount",totamount);
         job.put("fineamount",fineamount);
         job.put("discountamount",discountamount);
         job.put("netamount",netamount);
         job.put("feedata",items);
         
        } catch (ReadableException ex) {
            Logger.getLogger(StudentDAO.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(StudentDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;
    }

    public Object getAllAdmissionFeeAsJson(Connection conn,Map<String, Object> model) throws ReadableException {

        JSONObject job = null;
        String countquery =this.sqlQueries.getProperty("GET_COUNT_ADMISSION_FEE_FOR_TEMPLATE");
        String selectquery=this.sqlQueries.getProperty("GET_ADMISSION_FEE_FOR_TEMPLATE");
        
        selectquery = selectquery  + " LIMIT ? OFFSET ?";
        
        int count =0;        
        try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery,new Object[]{model.get("templateid").toString()});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{model.get("templateid").toString(),15,0});
            job = jsonUtil.getJsonObject(rs, count,1,100, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;
    }
    
    public Map<String, Object> payAdmissionFee(Connection conn, Map<String, Object> model) throws ReadableException {

        try {
        if(conn!=null && model!=null)    {

        String feequery = this.sqlQueries.getProperty("GET_ADMISSION_FEE_FOR_TEMPLATE");
        ResultSet rs = DaoUtil.executeQuery(conn,feequery,new Object[]{model.get("templateid").toString()});
                
        String query = this.sqlQueries.getProperty("ADD_BOOK_REQUEST_DEMAND"); 
        model.put("requestid",UUID.randomUUID().toString());
        if(this.jdbcTemplate.update(query, model) > 0) {
            model.put("result",1);
            conn.commit();
              
        }
        }
        } 
        catch (SQLException ex) {
            model.put("result",2);
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return model;
        
        
    }

    public Object addAdmissionFeePayment(Connection conn, Map<String, Object>[] model) {

        int i=0;
        boolean flag=false;
        double totamt=0;
        Map<String, Object> obj=new HashMap<String, Object>();
        obj.put("studentid", model[1].get("studentid").toString());
        obj.put("templateid", model[1].get("templateid").toString());
        
        try {
        if(conn!=null && model!=null)    {

        String feequery = this.sqlQueries.getProperty("ADD_ADMISSION_FEE");
        String feeupdatequery = this.sqlQueries.getProperty("UPDATE_ADMISSION_FEE");
        for(int j=0;j<model.length;j++){
        if(this.jdbcTemplate.update(feequery, model[j]) > 0) {
            model[j].put("result",1);
            totamt=totamt+Double.parseDouble(model[j].get("fee_amount").toString());
            flag=true;
        }
        }
        obj.put("totamountpaid", totamt);
        obj.put("feepaid", 1);
        
        if(flag){
        if(this.jdbcTemplate.update(feeupdatequery, obj) > 0) {
               conn.commit();
        }
        }
        }
        } 
        catch (SQLException ex) {
            model[i].put("result",2);
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        
        
      return model;  
    }
    
}
