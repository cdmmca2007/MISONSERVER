/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

import com.dlabs.mis.model.GenerateString;
import com.dlabs.mis.model.InitiateAdmissionProcess;
import com.dlabs.mis.model.NewStudent;
import com.dlabs.mis.model.ScheduleStrudentInterviewExam;
import com.dlabs.mis.model.User;
import com.dlabs.mis.model.UserLogin;
import com.dlabs.mis.services.MailService;
import com.kjava.base.ReadableException;
import com.kjava.base.db.DaoUtil;
import com.kjava.base.util.ExtJsonUtil;
import com.kjava.base.util.JSONUtil;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author cd
 */
@Repository
public class StudentAdmissionDAO {

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
        String selectquery= "SELECT  anp.status,anp.formid AS formno, " +
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
            String studentid=java.util.UUID.randomUUID().toString();
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
                                " (formid, fname, mname, lname, dob, address, fathername, mothername, caretakername, " +
                                " parentemailid, parentmobile, alternateemailid, alternatemobile, classid, createdby, " +
                                " modifiedby,religion, cityid, stateid, countryid, gender, " +
                                " bloodgroup, nationality, mother_tounge, image_path, passport_no, visadetails, uid, " +
                                " adhar_id, ssn,annualincome,fatherhighestedu,occupation)" +
                                " VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
             
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
                        if(DaoUtil.executeUpdate(conn,insertquery,new Object[]{obj.getFormno(),obj.getFname(),obj.getMname(),obj.getLname(),obj.getDob(),obj.getAddress(),
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
                            obj.setStudentid("1");
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
    
}
