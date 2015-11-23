/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

import com.dlabs.mis.model.*;
import com.dlabs.util.FileHandler;
import com.dlabs.util.Paging;
import com.kjava.base.ReadableException;
import com.kjava.base.db.DaoUtil;
import com.kjava.base.util.ConfigReader;
import com.kjava.base.util.ExtJsonUtil;
import com.kjava.base.util.JSONUtil;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author Kamlesh the admin
 */
public class StudentDAO {

    JSONUtil jsonUtil = new ExtJsonUtil();
    public NewStudent addOrEditStudent(Connection conn, NewStudent obj) throws ReadableException
    {
        int flag=0;
        String userid="";
        String studentquery="INSERT INTO student (studentid,fname,lname,mname,dob,address,fathername,mothername, " +
                            "	caretakername,parentemailid,parentmobile,alternateemailid,alternatemobile, " +
                            "	classid,createdby,createdon,modifiedby,modifiedon,religion,cityid, " +
                            "	stateid,countryid,userid,admissiondate,gender,blood_group, " +
                            "	nationality,mother_tounge,image_path,passportno,visadetails,ssn,uid,adharno,admissiontype, old_admission_no , category  , previledged_student , occupation, fatherhighedu, motherhishedu, annualincome "  +
                            "	)" +
                            "	VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_DATE,?,CURRENT_DATE,?,? " +
                            "	      ,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        String classstudentquery="INSERT INTO student_class_map " +
                            "	(student_id,batch_id)" +
                            "	VALUES(?,?)";
        try 
        {
          if(obj.getSession_id()!=null && obj.getClassid()!=null && obj.getStudentid()==null)
           {
            String batchid=new GetBatch(obj.getClassid(),obj.getSession_id()).BatchId(conn);
            String studentid=java.util.UUID.randomUUID().toString();
            if(DaoUtil.executeUpdate(conn,studentquery,new Object[]{
                                                            studentid,obj.getFname(),obj.getLname(),obj.getMname(),
                                                            obj.getDob(),obj.getAddress(),obj.getFathername(),obj.getMothername(),
                                                            obj.getCaretakername(),obj.getParentemailid(),obj.getParentmobile(),
                                                            obj.getAlternateemailid(),obj.getAlternatemobile(),
                                                            obj.getClassid(),obj.getCreatedby(),obj.getModifiedby(),obj.getReligion(),obj.getCityid(),
                                                            obj.getStateid(),"",obj.getParentemailid(),obj.getAdmissiondate1(),
                                                            obj.getGender(),obj.getBlood_group(),obj.getNationality(),obj.getMother_tounge(),
                                                            obj.getImage_path(),obj.getPassport_no(),obj.getVisadetail(),obj.getSsn(),obj.getUid(),
                                                            obj.getAadhar_id(),obj.getAdmissiontype(),obj.getAdmissionno() , obj.getCategory() , obj.getPreviledged_student(), obj.getOccupation() , obj.getFatherhighestedu() , obj.getMotherhishedu() , obj.getAnnualincome()
                                                          })==1){  
                if(DaoUtil.executeUpdate(conn,classstudentquery,new Object[]{studentid,batchid})==1){
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
                            userobj=userdaoobj.addOrEditUser(conn, userobj);
                            String updatequry="update student set userid=? where studentid=?";
                            if(DaoUtil.executeUpdate(conn,updatequry,new Object[]{userobj.getUserId(),studentid})==1){
                            }
                            obj.setStudentid(studentid);
                            ResultSet rs_1=DaoUtil.executeQuery(conn,"select addmission_no from student where studentid=?",new Object[]{obj.getStudentid()});       
                            if(rs_1.next()){
                            obj.setAdmissionno(rs_1.getString("addmission_no"));
                            }
                            
                 } 
                
            } 
            conn.commit();
            }
          else if(obj.getSession_id()!=null && obj.getClassid()!=null && obj.getStudentid()!=null){
               
             String updatequery="UPDATE student SET  fname = ? , lname = ? , mname = ? , dob   = ? , address = ? , fathername = ? , " +
                                "	mothername = ? , caretakername = ? , parentemailid = ? , parentmobile =  ? , " +
                                "	alternateemailid = ? , alternatemobile =  ?, classid = ? , " +
                                "	modifiedby = ? , modifiedon = current_date , religion = ? , cityid = ? , stateid = ? , " +
                                "	countryid = ? , admissiondate = ? , gender = ? , blood_group = ? , " +
                                "	nationality = ? , mother_tounge = ? , passportno = ? , visadetails = ? , " +
                                "	ssn = ?, uid = ? , adharno = ? , category= ? , previledged_student = ?  , occupation = ? ,fatherhighestedu = ? , motherhishedu = ? , annualincome = ? " +
                                " WHERE	addmission_no = ? AND studentid= ?";
           
             if(DaoUtil.executeUpdate(conn,updatequery,new Object[]{
                                           
                                        obj.getFname(),obj.getLname(),obj.getMname(),obj.getDob(),obj.getAddress(),obj.getFathername(),
                                        obj.getMothername(),obj.getCaretakername(),obj.getParentemailid(),obj.getParentmobile(),
                                        obj.getAlternateemailid(),obj.getAlternatemobile(),obj.getClassid(),
                                        obj.getModifiedby(),obj.getReligion(),obj.getCityid(),obj.getStateid(),
                                        "",obj.getAdmissiondate1(),obj.getGender(),obj.getBlood_group(),
                                        obj.getNationality(),obj.getMother_tounge(),obj.getPassport_no(),
                                        obj.getVisadetail(),obj.getSsn(),obj.getUid(),obj.getAadhar_id(),obj.getCategory(),obj.getPreviledged_student(),obj.getOccupation() , obj.getFatherhighestedu() , obj.getMotherhishedu() , obj.getAnnualincome(),
                                        obj.getAdmissionno(),obj.getStudentid()
                                })==1){
                 conn.commit();
                 
             } 
             
          }
              
        }
         catch (SQLException ex) {
            Logger.getLogger(StudentDAO.class.getName()).log(Level.SEVERE, null, ex);
        }         
        return obj;
    }

    public Object getAllStudentsAsJson(Connection conn,String classid,String sessionid,Paging page) throws ReadableException {
        JSONObject job = null;
        ResultSet rs = null;
        int count =0;
        String schoolid="1000";
        String batch_id=new GetBatch(classid,sessionid).BatchId(conn);
        try{
            rs = DaoUtil.executeQuery(conn, "SELECT count(1) as count from student_class_map where batch_id=?",new Object[]{batch_id});
            if(rs.next()) {
                count = rs.getInt("count");

            }
            String query=" SELECT scm.roll_no AS rollno,studentid,CONCAT(CONCAT(CONCAT(CONCAT(fname,' '),CASE WHEN mname IS NULL THEN '' ELSE mname END),' '),lname) AS name,		 fname,	 lname,	 mname,	 FROM_UNIXTIME(dob/1000,'%d-%m-%Y') AS dob,	 address,	 fathername,	 mothername,        caretakername, parentemailid, parentmobile, alternateemailid,         alternatemobile, classid, schoolid, createdby,  FROM_UNIXTIME(admissiondate/1000,'%d-%m-%Y') AS admissiondate1,		 modifiedby,              religion,m.value AS religiontxt,cityid,stateid,		 countryid, userid ,addmission_no AS admissionno, gender, blood_group, nationality, m1.value AS  nationalitytxt,		 mother_tounge, image_path,passportno AS passport_no, visadetails as visadetail,ssn,	 uid, adharno AS aadhar_id, admissiontype , m4.value AS admissiontypetext, category ,		 m2.value AS categorytext , 		 m3.value AS previledged_student  , occupation as occupation, fatherhighestedu , motherhishedu, annualincome  FROM student_class_map scm     JOIN student s ON scm.student_id=s.studentid    LEFT JOIN master m  ON m.id=s.religion             AND m.propertyid=4    LEFT JOIN master m1 ON m1.id=s.religion            AND m1.propertyid=16    LEFT JOIN master m2 ON m2.id=s.category            AND m2.propertyid=47  LEFT JOIN master m3 ON m3.id=s.previledged_student AND m3.propertyid=52    LEFT JOIN master m4 ON m4.id=s.admissiontype       AND m4.propertyid=17  WHERE batch_id= ? LIMIT ? OFFSET ? ";
            rs = DaoUtil.executeQuery(conn,query,new Object[]{batch_id,page.getLimit(),page.getStart()});
            job = jsonUtil.getJsonObject(rs, count,page.getLimit(), page.getStart(), false);
        }
        catch (SQLException ex) {
            Logger.getLogger(StudentDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;
    }    

    public int addStudentMark(Connection conn, StudentMarkPostRequest obj) throws ReadableException {
       String selectquery="SELECT id ,subjectid FROM classexam WHERE batch_id   = ? AND examtypeid= ?";
       String selectcountquery="SELECT COUNT(1) AS count FROM classexam WHERE batch_id   = ? AND examtypeid= ?";
       String selectmarkquery="SELECT COUNT(1) AS count FROM studentexam WHERE classid   = ? AND examtypeid= ? AND studentid=?";
       String insertquery="INSERT INTO studentexam (id,classexamid,classid,sessionid,examtypeid,studentid,subjectid,appeared,markobtained,passstatus,createdby,createdon,modifiedby,modifiedon) VALUES(?,?,?,?,?,?,?,?,?,?,?,null,?,null)";
       String batchid=new GetBatch(obj.getClassid(),obj.getSessionid()).BatchId(conn);
       
       //if(obj.getStudentid().equals(""))obj.setStudentid(null);
       //if(obj.getSubjectid().equals(""))obj.setSubjectid(null);
       
       if(obj.getSubjectid()!=null){
            return AddStudMarkForParticularSubject(conn,obj);
       }
       else {        
       try{
         ResultSet rs=DaoUtil.executeQuery(conn,selectmarkquery,new Object[]{batchid,obj.getExamtypeidid(),obj.getStudentid()});      
         if(rs.next()){
           if(rs.getInt("count")==0){              
            rs=DaoUtil.executeQuery(conn,selectcountquery,new Object[]{batchid,obj.getExamtypeidid()});  
              if(rs.next()){
                if(rs.getInt("count")==0){
                    return 2;
                }
                else{
                   rs= DaoUtil.executeQuery(conn,selectquery,new Object[]{batchid,obj.getExamtypeidid()});  
                   while(rs.next()){
                   
                      String id=java.util.UUID.randomUUID().toString();                       
                      DaoUtil.executeUpdate(conn,insertquery,new Object[]{id,rs.getString("id"),batchid,obj.getSessionid(),obj.getExamtypeidid(),obj.getStudentid(),rs.getString("subjectid"),0,null,0,null,null});
                   }
                 return 3;  
                }
            }       
           }
           else
           {
             return 1;  //If Mark rows already created
           }
         }
       }
       catch (SQLException ex) {
            Logger.getLogger(StudentDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
       }
       return 0;
    }

    public Object getAllStudentsMarkAsJson(Connection conn, StudentMarkPostRequest obj, int page, int rows) throws ReadableException {
        JSONObject job = null;
        ResultSet rs = null;
        int count =0;
        String countquery="";
        String selectquery="";
        
        String batchid=new GetBatch(obj.getClassid(),obj.getSessionid()).BatchId(conn);
        
        if(obj.getStudentid().equals(""))obj.setStudentid(null);
        if(obj.getSubjectid().equals(""))obj.setSubjectid(null);
        
        if(obj.getStudentid()!=null && obj.getSubjectid()==null){
            countquery="SELECT COUNT(1) as count FROM studentexam s JOIN classexam ce ON s.classexamid=ce.id JOIN master m  ON s.sessionid  =m.id  JOIN master m1 ON s.examtypeid =m1.id JOIN master m2 ON s.subjectid  =m2.id JOIN student o ON s.studentid  =o.studentid WHERE s.examtypeid=?  AND s.classid=? AND s.studentid=?";
            selectquery="SELECT s.id ,m.value AS sessionname ,m1.value AS examtype , " +
                        "       m2.value AS subjectname  , ce.examname ,s.appeared ," +
                        "       ce.maxmark , ce.passmark , s.markobtained , s.comment ,       CONCAT(CONCAT(CONCAT(CONCAT(o.fname,' '),case when o.mname is null then '' else o.mname end),' '),o.lname) AS studentname  " +
                        "  FROM studentexam s JOIN classexam ce ON s.classexamid=ce.id JOIN master m  ON s.sessionid  =m.id  JOIN master m1 ON s.examtypeid =m1.id JOIN master m2 ON s.subjectid  =m2.id JOIN student o ON s.studentid  =o.studentid WHERE s.examtypeid=?  AND s.classid=? AND s.studentid=?";
        }
        else if(obj.getStudentid()==null && obj.getSubjectid()!=null){
            countquery="SELECT COUNT(1) AS count FROM studentexam WHERE examtypeid=?  AND classid=?  AND sessionid=?  AND subjectid=?";
            selectquery="SELECT s.id ,m.value AS sessionname ,m1.value AS examtype , m2.value AS subjectname  , ce.examname ,s.appeared , ce.maxmark ,ce.passmark , s.markobtained , s.comment,       CONCAT(CONCAT(CONCAT(CONCAT(o.fname,' '),case when o.mname is null then '' else o.mname end),' '),o.lname) AS studentname " +
                        "  FROM studentexam s JOIN classexam ce ON s.classexamid=ce.id JOIN master m  ON s.sessionid  =m.id  " +
                        "  JOIN master m1 ON s.examtypeid =m1.id JOIN master m2 ON s.subjectid  =m2.id JOIN student o ON s.studentid  =o.studentid " +
                        " WHERE s.examtypeid= ?   AND s.classid   = ?   AND s.sessionid = ?   AND s.subjectid = ?";
        }
        try{
            
            if(obj.getStudentid()!=null)
                 rs = DaoUtil.executeQuery(conn,countquery,new Object[]{obj.getExamtypeidid(),batchid,obj.getStudentid()});
            else
                 rs = DaoUtil.executeQuery(conn,countquery,new Object[]{obj.getExamtypeidid(),batchid,obj.getSessionid(),obj.getSubjectid()});  
            
            if(rs.next()) {
                count = rs.getInt("count");
            }
            
            if(obj.getStudentid()!=null)
                 rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{obj.getExamtypeidid(),batchid,obj.getStudentid()});
            else
                 rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{obj.getExamtypeidid(),batchid,obj.getSessionid(),obj.getSubjectid()});            
            
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(StudentDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;
    }

    public int saveStudentMarks(Connection conn, StudentMark[] obj) throws ReadableException {
         
        String updatestring="UPDATE studentexam SET appeared=? , markobtained=? , passstatus=? ,modifiedby=? , modifiedon=current_date , comment=? WHERE id=?";
        
        try{
            
         int i=0;
         int flag=0;
         for(i=0;i<obj.length;i++){             
             
            if(obj[i].getPassmark() > obj[i].getMarkobtained())
               obj[i].setPassstatus(0);
            else
               obj[i].setPassstatus(1); 
            DaoUtil.executeUpdate(conn,updatestring,new Object[]{obj[i].getAppeared(),obj[i].getMarkobtained(),obj[i].getPassstatus(),obj[i].getModifiedby(),obj[i].getComment(),obj[i].getId()});   
            flag=1;
         }  
         
         if(flag==1)
             return 1;
        }
        catch (Exception ex) {
            Logger.getLogger(StudentDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return 0;
        
    }

    public StudentTransport saveStudentTransport(Connection conn, StudentTransport obj) throws ReadableException {

        String insertquery="INSERT INTO studenttransport (pid, routeid, studentid, fromlocation, tolocation, startdate, STATUS, createdby, modifiedby,vehicleid,createdon) VALUES (?,?,?,?,?,?,?,?,?,?,CURRENT_DATE)";
        String selectquery="select count(1) as count from studenttransport where routeid=? and studentid=?";        

        ResultSet rs=DaoUtil.executeQuery(conn,selectquery,new Object[]{obj.getRouteid(),obj.getStudentid()});
        try {
        if(rs.next()){
    
           if(rs.getObject("count")!=null){
             
               if(rs.getInt("count")==0){
                 String id=java.util.UUID.randomUUID().toString();   
                 obj.setCreatedby("111");
                 obj.setModifiedby("111");
                 if(DaoUtil.executeUpdate(conn,insertquery,new Object[]{id,obj.getRouteid(),obj.getStudentid(),obj.getFromlocation(),obj.getTolocation(),obj.getStartdate(),obj.isSatus(),obj.getCreatedby(),obj.getModifiedby(),obj.getVehicle()})==1){
                     conn.commit();
                     obj.setPid(id);
                     return obj;
                 } 
                   
               }
               else
                   return obj;
               
           }
      
        }
        }catch (SQLException ex) {
            Logger.getLogger(StudentDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return obj;
    }
    public Object getAllStudentReportCardAsJson(Connection conn, StudentMarkPostRequest obj, int i, int i0) {
        /*
         School Details,Student Details,Class Teacher,Exam Details,Mark SUBJECT wise,Total Mark , 
         STATUS : ,Percentage :,Teacher COMMENT
         */
        
        JSONObject job = new JSONObject();        
        Collection<JSONObject> items = new ArrayList<JSONObject>();
        
        String schooldetails ="SELECT schoolname ,logopath , websiteurl,addressline1,addressline2 ,city,state,country,pinnumber ,contact1 ,contact2 , emailid1 , pricipalname FROM schooladmin"; 
        String teacherdetails="SELECT u.name teachername ,c.name as classname FROM sessions s , users u , class c WHERE s.batch_id=? AND s.class_teacher=u.userid AND c.classid=s.class_id";
        String markdetail    ="SELECT CONCAT(CONCAT(CONCAT(CONCAT(o.fname,' '),case when o.mname is null then '' else o.mname end),' '),o.lname) AS studentname,m.value AS sessionname ,m1.value AS examtype , " +
                                "       m2.value AS subjectname  , ce.examname ,s.appeared ," +
                                "       ce.maxmark , ce.passmark , s.markobtained,s.comment ,o.addmission_no , o.fathername , o.mothername" +
                                "  FROM studentexam s " +
                                "       JOIN classexam ce ON s.classexamid=ce.id " +
                                "       JOIN master m  ON s.sessionid  =m.id  " +
                                "       JOIN master m1 ON s.examtypeid =m1.id " +
                                "       JOIN master m2 ON s.subjectid  =m2.id " +
                                "       JOIN student o ON s.studentid  =o.studentid " +
                                " WHERE s.examtypeid=?" +
                                "   AND s.classid   =?" +
                                "   AND s.studentid =?";
        try {
            String batchid=new GetBatch(obj.getClassid(),obj.getSessionid()).BatchId(conn);
            ResultSet rs=DaoUtil.executeQuery(conn,schooldetails);
            ResultSet rs1=DaoUtil.executeQuery(conn,teacherdetails,new Object[]{batchid});
            ResultSet rs2=DaoUtil.executeQuery(conn,markdetail,new Object[]{obj.getExamtypeidid(),batchid,obj.getStudentid()});
            
            while(rs.next()){
                
                if(rs.getObject("pricipalname")!=null)
                job.put("principalname",rs.getString("pricipalname"));
                        
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
            
           while(rs1.next()){
                if(rs1.getObject("teachername")!=null)
                job.put("teachername",rs1.getString("teachername"));
                if(rs1.getObject("classname")!=null)
                job.put("classname",rs1.getString("classname"));
           } 
           String studentname="";
           String session="";
           String examtype="";
           String examname="",fathername="",mothername="";
           int totmaxmark=0,totpassmark=0,totobtained=0,addmission_no=0;
           int maxmark=0,passmark=0,obtained=0;
           while(rs2.next()){

               
               studentname=rs2.getString("studentname");
               if(rs2.getObject("fathername")!=null)
               fathername=rs2.getString("fathername"); 

               if(rs2.getObject("mothername")!=null)
               mothername=rs2.getString("mothername"); 
               
               if(rs2.getObject("addmission_no")!=null)
               addmission_no=rs2.getInt("addmission_no"); 
               
               session=rs2.getString("sessionname");
               examtype=rs2.getString("examtype");
               if(rs2.getObject("examname")!=null)
               examname=rs2.getString("examname");        
               
               JSONObject obj1 =new JSONObject();
               
               if(rs2.getObject("subjectname")!=null)
               obj1.put("subjectname",rs2.getString("subjectname"));
               
               if(rs2.getObject("maxmark")!=null)
               {  
                  maxmark= rs2.getInt("maxmark");
                  obj1.put("maxmark",maxmark);
               }   
               
               if(rs2.getObject("passmark")!=null)
               {  
                  passmark= rs2.getInt("passmark");
                  obj1.put("passmark",passmark);
               }     
               
               if(rs2.getObject("appeared")!=null){
                    
                   
                   if(rs2.getInt("appeared")==1)
                    obj1.put("appeared","Present");   
                   else
                    obj1.put("appeared","Absent");      
               }

               if(rs2.getObject("markobtained")!=null)
               {
                   obtained=rs2.getInt("markobtained");
                   obj1.put("markobtained",obtained);
               }
               if(rs2.getObject("comment")!=null)
               obj1.put("comment",rs2.getString("comment"));
               
               
               totmaxmark=maxmark+totmaxmark;
               totpassmark=passmark+totpassmark;
               totobtained=totobtained+obtained;
               items.add(obj1);
           } 

           job.put("studentname",studentname);
           job.put("fathername",fathername);       
           job.put("mothername",mothername);           
           job.put("addmission_no",addmission_no);
           job.put("session",session);
           job.put("examtype",examtype);
           job.put("examname",examname);
           job.put("subjectmark", items);
           job.put("totmaxmark",totmaxmark);
           job.put("totpassmark",totpassmark);
           job.put("totobtained",totobtained);
           if(totobtained!=0 && totmaxmark !=0)
           job.put("percentage",(totobtained*100)/totmaxmark);
           else
           job.put("percentage",0);    
           
        } catch (ReadableException ex) {
            Logger.getLogger(StudentDAO.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(StudentDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;
    }

    public int saveStudentRoleNumber(Connection conn, StudentMarkPostRequest obj) throws ReadableException {
        
        String batchid=new GetBatch(obj.getClassid(),obj.getSessionid()).BatchId(conn);
        String updatequery="UPDATE student_class_map SET roll_no = ? WHERE student_id = ? AND batch_id = ?";
        String query="SELECT scm.student_id " +
                     "  FROM student_class_map scm INNER JOIN student s ON scm.student_id=s.studentid " +
                     " WHERE scm.batch_id=? order by "; 
        if(obj.getRolltype()==1)
            query=query+" fname";
        if(obj.getRolltype()==2)
            query=query+" mname";
        if(obj.getRolltype()==3)
            query=query+" lname";
        
        ResultSet rs=DaoUtil.executeQuery(conn, query, new Object[]{batchid});
        int x=1;
        try {
            while(rs.next()){
              DaoUtil.executeUpdate(conn,updatequery,new Object[]{x++,rs.getString("student_id"),batchid});
            }
          if(x > 0) conn.commit();            
        } catch (SQLException ex) {
            Logger.getLogger(StudentDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return x;        
    }

    public int AddStudMarkForParticularSubject(Connection conn, StudentMarkPostRequest obj) throws ReadableException {

        /*
         * Get Student List of Class
           First Check existence of record
         */
        int return_flag=0;
        String batchid=new GetBatch(obj.getClassid(), obj.getSessionid()).BatchId(conn);
        ResultSet rs=this.getStudentListofClass(conn,obj.getClassid(),obj.getSessionid());
        String insertquery="INSERT INTO studentexam (id,classexamid,classid,sessionid,examtypeid,studentid,subjectid,appeared,markobtained,passstatus,createdby,createdon,modifiedby,modifiedon) VALUES(?,?,?,?,?,?,?,?,?,?,?,current_date,?,current_date)";
        String selectquery="SELECT id ,subjectid FROM classexam WHERE batch_id   = ? AND examtypeid= ?";
        
        String classexamid=this.getClassExamId(conn,batchid,obj.getSubjectid(),obj.getExamtypeidid());
        
        try {
            if(classexamid!=null)
            while(rs.next()){
                String student_id=rs.getString("student_id");
                if(!IsStudentMarkExist(conn,obj,batchid,student_id)){
                  String id=java.util.UUID.randomUUID().toString();                       
                  DaoUtil.executeUpdate(conn,insertquery,new Object[]{id,
                                                                      classexamid,
                                                                      batchid,
                                                                      obj.getSessionid(),
                                                                      obj.getExamtypeidid(),
                                                                      student_id,
                                                                      obj.getSubjectid(),0,null,0,null,null});
                  return_flag=3;
                }        
           }
          else
             return_flag=2;   
        } catch (SQLException ex) {
            Logger.getLogger(StudentDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return return_flag;
    }
    private ResultSet getStudentListofClass(Connection conn,String classid,String sessionid) throws ReadableException{

      String batchid=new GetBatch(classid, sessionid).BatchId(conn);
      String query  ="SELECT student_id FROM student_class_map WHERE batch_id=? AND resultstatus=-1";
      ResultSet rs=DaoUtil.executeQuery(conn,query,new Object[]{batchid});
      return rs;        
    }

    private boolean IsStudentMarkExist(Connection conn,StudentMarkPostRequest obj, String batchid,String studentid) throws ReadableException {

        String query="SELECT COUNT(1) AS count FROM studentexam WHERE examtypeid = ? AND classid    = ?   AND sessionid  = ?   AND studentid  = ?   AND subjectid  = ?";
        boolean flag=false;
        ResultSet rs=DaoUtil.executeQuery(conn, query,new Object[]{obj.getExamtypeidid(),batchid,obj.getSessionid(),studentid,obj.getSubjectid()});
        try {
            if(rs.next() && rs.getInt("count")==1){
                  flag=true;     
            }else{
                  flag=false;
            }
        } catch (SQLException ex) {
            Logger.getLogger(StudentDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
       return flag;   
    }

    private String getClassExamId(Connection conn,String batchid, String subjectid, String examtypeidid) throws ReadableException {
        String classexamid=null; 
        String query="SELECT id FROM classexam WHERE batch_id  =? AND examtypeid=?  AND subjectid = ?";
        
        ResultSet rs=DaoUtil.executeQuery(conn, query,new Object[]{batchid,examtypeidid,subjectid});
        try {
            if(rs.next() && rs.getObject("id")!=null){
              classexamid=rs.getString("id");
            }
        } catch (SQLException ex) {
            Logger.getLogger(StudentDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return classexamid;
    }

    public JSONObject getStudent(Connection conn, String studentId,String sessionid) throws ReadableException {
        String batchid=new GetBatch().getBatchId(conn, studentId, sessionid);
        //String q = "SELECT s.* ,CASE s.gender WHEN 0 THEN 'Male' WHEN 1 THEN 'Female'END as gender , m.value AS religiontxt , m1.value AS nationality,FROM_UNIXTIME(s.dob/1000,'%d-%M-%Y') AS dob,YEAR(CURRENT_DATE) - YEAR(FROM_UNIXTIME(s.dob/1000)) AS age FROM student s LEFT JOIN master m ON s.religion=m.id LEFT JOIN master m1 ON m1.id=s.nationality WHERE studentid= ? ";
        String q="SELECT s.* ,CASE s.gender WHEN 0 THEN 'Male' WHEN 1 THEN 'Female'END AS gender , " +
                 "      m.value AS religiontxt , m1.value AS nationality,FROM_UNIXTIME(s.dob/1000,'%d-%M-%Y') AS dob,YEAR(CURRENT_DATE) - YEAR(FROM_UNIXTIME(s.dob/1000)) AS age ,      scm.roll_no , c.name as classname" +
                 "  FROM student s JOIN student_class_map scm ON scm.student_id=s.studentid AND scm.batch_id=? " +
                 "  JOIN sessions ss ON ss.batch_id=scm.batch_id  JOIN class    c ON c.classid =ss.class_id  LEFT JOIN master m ON s.religion=m.id " +
                 "  LEFT JOIN master m1 ON m1.id=s.nationality   WHERE studentid= ?";        
        return jsonUtil.getJsonObject(DaoUtil.executeQuery(conn, q, new Object[]{batchid,studentId}), 1,1, 15);
    }

    public Object getStudentResultComparison(Connection conn, String studentId, String class_id, String sessionid) throws ReadableException {

        JSONObject job = null;
        ResultSet rs = null;
        int count =0;
        String batch_id=new GetBatch(class_id,sessionid).BatchId(conn);
        String countQuery="SELECT COUNT(1) AS count FROM studentexam s ,classexam c ,master m  WHERE s.classid=?  AND s.studentid=? AND s.classexamid=c.id AND m.id=s.examtypeid  GROUP BY s.examtypeid";
        String selectQuery="SELECT m.value AS examtypename ,c.examname AS examname,SUM(maxmark) AS totalmark,SUM(passmark) AS totpassmark ,SUM(s.markobtained) AS totmarkobtained,(SUM(s.markobtained)/SUM(maxmark))*100 AS percentage        ,CASE WHEN SUM(passmark) <=  SUM(s.markobtained) THEN 'Passed' WHEN SUM(passmark) >  SUM(s.markobtained) THEN 'Failed'  END AS examstatus  FROM studentexam s ,classexam c ,master m  WHERE s.classid=?  AND s.studentid=? AND s.classexamid=c.id AND m.id=s.examtypeid  GROUP BY s.examtypeid ORDER BY examdate";
        try{
            rs = DaoUtil.executeQuery(conn,countQuery,new Object[]{batch_id,studentId});
            if(rs.next()) {
                count = rs.getInt("count");

            }
            rs = DaoUtil.executeQuery(conn,selectQuery,new Object[]{batch_id,studentId});
            job = jsonUtil.getJsonObject(rs, count,1,15, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(StudentDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;
        
    }
  public Object getStudentResultComparisonSecondChart(Connection conn, String studentId, String class_id, String sessionid) throws ReadableException {

        JSONObject job = new JSONObject();
        Collection<JSONObject> items = new ArrayList<JSONObject>();
        ResultSet rs = null;
        ResultSet rs_1 = null;
        String current_exam=null;
        int count =0 , tot=0;
        String batch_id=new GetBatch(class_id,sessionid).BatchId(conn);
        String countQuery="SELECT count(1) as count  FROM studentexam s ,classexam c ,master m , master m1 WHERE s.classid=?  AND s.studentid=? AND s.classexamid=c.id AND c.subjectid=m1.id AND m.id=s.examtypeid";
        String selectQuery="SELECT m.value AS examtypename ,c.examname AS examname,m1.value AS subjectname,c.maxmark,c.passmark,s.markobtained,(s.markobtained/c.maxmark)*100 AS mod_mark  FROM studentexam s ,classexam c ,master m , master m1 WHERE s.classid=?  AND s.studentid=? AND s.classexamid=c.id AND c.subjectid=m1.id AND m.id=s.examtypeid and s.examtypeid=?  ORDER BY examdate , examtypename";
        String examname="SELECT DISTINCT examtypeid FROM classexam WHERE batch_id=?";
        try{
            rs = DaoUtil.executeQuery(conn,countQuery,new Object[]{batch_id,studentId});
            if(rs.next()) {
                count = rs.getInt("count");
                if(count > 0){
                
                  rs_1=DaoUtil.executeQuery(conn,examname,new Object[]{batch_id});
                  while(rs_1!=null && rs_1.next())
                  {
                    tot++;  
                    current_exam=rs_1.getString("examtypeid"); 
                    JSONObject obj = new JSONObject();
                    rs=DaoUtil.executeQuery(conn,selectQuery,new Object[]{batch_id,studentId,current_exam});    
                    if(rs!=null && rs.next()){
                        if(rs.getObject("examtypename")!=null)obj.put("examtypename",rs.getString("examtypename"));
                        if(rs.getObject("subjectname")!=null)obj.put(rs.getString("subjectname"),rs.getFloat("markobtained"));
                        while(rs.next()){
                        if(rs.getObject("subjectname")!=null)obj.put(rs.getString("subjectname"),rs.getFloat("markobtained"));
                        }  
                    }
                    items.add(obj);
                  }
                }
            }
           job.put("rows", items);
           job.put("totalCount", tot);
            
        }
        catch (SQLException ex) {
            Logger.getLogger(StudentDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;
    }

public HashMap changeStudentProfilePic(Connection conn,HttpServletRequest request, HttpServletResponse response) throws ReadableException {
        String path=new ConfigReader().get("prof_pic_store");
        String studentid="", filename="";
        String updatequery="update student set image_path=? where studentid=?";
        HashMap arrParam = new HashMap();
        arrParam = (HashMap) FileHandler.uploadFile(path, request);        
        
        if(arrParam.containsKey("id"))studentid=(String)arrParam.get("id");
        if(arrParam.containsKey("modifiedfilename"))filename=(String)arrParam.get("modifiedfilename");
        
        if(DaoUtil.executeUpdate(conn,updatequery,new Object[]{filename,studentid})==1){
            try {
                conn.commit();
            } catch (SQLException ex) {
                java.util.logging.Logger.getLogger(UserDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return arrParam;
    }
  
}
    
