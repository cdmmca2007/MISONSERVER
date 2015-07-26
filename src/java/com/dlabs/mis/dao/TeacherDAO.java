/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

import com.dlabs.mis.model.Teacher;
import com.dlabs.mis.model.TeacherExperience;
import com.dlabs.mis.model.TeacherQualification;
import com.dlabs.mis.model.User;
import com.kjava.base.ReadableException;
import com.kjava.base.db.DaoUtil;
import com.kjava.base.util.ExtJsonUtil;
import com.kjava.base.util.JSONUtil;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.simple.JSONObject;

/**
 *
 * @author cd
 */
public class TeacherDAO {

    JSONUtil jsonUtil = new ExtJsonUtil();
    
    public Teacher getTeacherAsJson(Connection conn, String tchrid) throws ReadableException {
        JSONObject job = null;
        Teacher usr=new Teacher();
        Map<String, Object> p = new HashMap<String, Object>();
        String selectquery= "SELECT t.teacherid, t.fullname, t.firstname, t.middlename, t.lastname,m.value AS teachertype, " +
                            "	m1.value AS jobtype ,m2.value AS designation,FROM_UNIXTIME(t.dob/1000,'%d-%M-%Y') AS dob, t.address, t.cityid, t.stateid, t.countryid, t.maritialstatus, " +
                            "	doj,m3.value AS department, t.empno, t.fathername, t.mothername, t.alternateemailid, " +
                            "	t.mobilenumber, t.alternatemobile,t.nationality, t.mother_tounge, t.passport_no, t.ssn, t.visadetail, t.uid, t.aadhar_id, t.blood_group," +
                            "	u.contactno , u.emailid AS  emailid , u.profilepic  " +
                            "  FROM  teacher t " +
                            "  JOIN users u ON u.userid=t.teacherid " +
                            "  LEFT JOIN master m  ON m.id=t.teachertype " +
                            "  LEFT JOIN master m1 ON m1.id=t.jobtype " +
                            "  LEFT JOIN master m2 ON m2.id=t.designation " +
                            "  LEFT JOIN master m3 ON m3.id=t.department " +
                            "  WHERE t.teacherid=?";
        
        int count =0;        
        try{
            ResultSet rs = DaoUtil.executeQuery(conn, "select count(1) as count from teacher where teacherid=?",new Object[]{tchrid});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{tchrid});
            while(rs.next()){
             if(rs.getObject("empno")!=null)usr.setEmpno(rs.getInt("empno"));      
             if(rs.getObject("fullname")!=null)usr.setFullname(rs.getString("fullname"));   
             if(rs.getObject("firstname")!=null)usr.setFirstname(rs.getString("firstname"));      
             if(rs.getObject("middlename")!=null)usr.setMiddlename(rs.getString("middlename"));      
             if(rs.getObject("lastname")!=null)usr.setLastname(rs.getString("lastname"));      
             if(rs.getObject("teachertype")!=null)usr.setTeachertype(rs.getString("teachertype"));      
             if(rs.getObject("jobtype")!=null)usr.setJobtype(rs.getString("jobtype"));      
             if(rs.getObject("designation")!=null)usr.setDesignation(rs.getString("designation"));      
             if(rs.getObject("dob")!=null)usr.setDob(rs.getString("dob"));      
             if(rs.getObject("address")!=null)usr.setAddress(rs.getString("address"));      
             if(rs.getObject("cityid")!=null)usr.setCityid(rs.getString("cityid"));      
             if(rs.getObject("stateid")!=null)usr.setStateid(rs.getString("stateid"));      
             if(rs.getObject("countryid")!=null)usr.setCountryid(rs.getString("countryid"));      
             if(rs.getObject("maritialstatus")!=null)usr.setMaritialstatus(rs.getString("maritialstatus"));      
             if(rs.getObject("department")!=null)usr.setDepartment(rs.getString("department"));      
             if(rs.getObject("fathername")!=null)usr.setFathername(rs.getString("fathername"));      
             if(rs.getObject("mothername")!=null)usr.setMothername(rs.getString("mothername"));       
             if(rs.getObject("emailid")!=null)usr.setEmailid(rs.getString("emailid"));       
             if(rs.getObject("alternateemailid")!=null)usr.setAlternateemailid(rs.getString("alternateemailid"));       
             if(rs.getObject("mobilenumber")!=null)usr.setMobilenumber(rs.getString("mobilenumber"));       
             if(rs.getObject("alternatemobile")!=null)usr.setAlternatemobile(rs.getString("alternatemobile"));       
             if(rs.getObject("nationality")!=null)usr.setNationality(rs.getString("nationality"));       
             if(rs.getObject("mother_tounge")!=null)usr.setMother_tounge(rs.getString("mother_tounge"));       
             if(rs.getObject("passport_no")!=null)usr.setPassport_no(rs.getString("passport_no"));       
             if(rs.getObject("ssn")!=null)usr.setSsn(rs.getString("ssn"));       
             if(rs.getObject("visadetail")!=null)usr.setVisadetail(rs.getString("visadetail"));       
             if(rs.getObject("uid")!=null)usr.setUid(rs.getString("uid"));       
             if(rs.getObject("aadhar_id")!=null)usr.setAadhar_id(rs.getString("aadhar_id"));       
             if(rs.getObject("blood_group")!=null)usr.setBlood_group(rs.getString("blood_group"));  
             if(rs.getObject("contactno")!=null)usr.setContactno(rs.getString("contactno"));  
             if(rs.getObject("profilepic")!=null)usr.setProfilepic(rs.getString("profilepic"));  
             
            }
        }
        catch (SQLException ex) {
            Logger.getLogger(TeacherDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return usr;

    }

    public Teacher editTeacherProf(Connection conn, Teacher obj) {
        try {
            String update="UPDATE  teacher " +
                          "   SET  fullname = ? , firstname = ? , " +
                          "        middlename = ? , lastname = ?, dob = ? , address = ? , " +
                          "	cityid = ? , 	stateid = ? , 	countryid = ? , 	maritialstatus = ? , " +
                          "	fathername = ? , 	mothername = ? , 	emailid = ? , 	alternateemailid = ? , " +
                          "	mobilenumber = ? , 	alternatemobile = ? , 	nationality = ? , 	mother_tounge = ? , " +
                          "	passport_no = ? , 	ssn = ? , 	visadetail = ? , 	uid = ? , 	aadhar_id = ?, " +
                          "	blood_group = ? , 	anniversarydate = ? , 	modifiedby =  ?" +
                          " WHERE	teacherid= ?";
            
            
           if(DaoUtil.executeUpdate(conn, update,new Object[]{
                                obj.getFullname(),obj.getFirstname(),obj.getMiddlename(),
                                obj.getLastname(),obj.getDob(),obj.getAddress(),
                                obj.getCityid(),obj.getStateid(),obj.getCountryid(),obj.getMaritialstatus(),
                                obj.getFathername(),obj.getMothername(),obj.getEmailid(),
                                obj.getAlternateemailid(),obj.getMobilenumber(),obj.getAlternatemobile(),
                                obj.getNationality(),obj.getMother_tounge(),obj.getPassport_no(),
                                obj.getSsn(),obj.getVisadetail(),obj.getUid(),obj.getAadhar_id(),obj.getBlood_group(),
                                obj.getAnniversarydate(),obj.getTeacherid(),obj.getTeacherid()})==1)
           {
              conn.commit();
              obj.setResult(1);
           }   
            
            return obj;  
        }catch (SQLException ex) {
            Logger.getLogger(TeacherDAO.class.getName()).log(Level.SEVERE, null, ex);
        }catch (ReadableException ex) {
            Logger.getLogger(TeacherDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return obj;  
    }

    public TeacherQualification editTeacherQualification(Connection conn, TeacherQualification obj) throws ReadableException {

        if(obj.getPid().equals("") || obj.getPid()==null){
           insertTeacherQualification(conn,obj);
        }
        else{
           updateTeacherQualification(conn,obj);
        }
        return obj;
    }

    private TeacherQualification insertTeacherQualification(Connection conn, TeacherQualification obj) throws ReadableException {
       
        String insert=" INSERT  INTO teacherqualification (pid, teacherid, educationlevel, qualification, " +
                      "	university, collegename, scoretype, score, dicipline, passingyear, createdby, modifiedby,createdon)" +
                      " VALUES	(?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_DATE)";
        String pid = java.util.UUID.randomUUID().toString();
        if(DaoUtil.executeUpdate(conn, insert, new Object[]{
                                               pid , obj.getTeacherid(),
                                               obj.getEducationlevel(),
                                               obj.getQualification(),
                                               obj.getUniversity(),obj.getCollegename(),
                                               obj.getScoretype(),obj.getScore(),obj.getDicipline(),
                                               obj.getPassingyear(),obj.getTeacherid(),obj.getTeacherid()
                                        })==1){
            try {
                conn.commit();
                obj.setPid(pid);
            } catch (SQLException ex) {
                Logger.getLogger(TeacherDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        
        return obj;
    }

    private TeacherQualification updateTeacherQualification(Connection conn, TeacherQualification obj) {
        return obj;
    }
    
    public Object getTeacherQualifAsJson(Connection conn, String teacherid) throws ReadableException {
          
        JSONObject job = null;
        int count =0;
        String countquery=  "SELECT 	COUNT(1) as count" +
                            "  FROM  teacherqualification tq " +
                            "  JOIN  master m ON m.id   = tq.educationlevel" +
                            "  JOIN  master m1 ON m1.id = tq.qualification " +
                            "  JOIN  master m2 ON m2.id = tq.university " +
                            "  JOIN  master m3 ON m3.id = tq.scoretype " +
                            "  JOIN  master m4 ON m4.id = tq.dicipline where tq.teacherid=?";
        String selectquery= "SELECT pid,teacherid,m.value AS educationlevel,m1.value AS qualification, " +
                            "	m2.value AS  university,collegename,m3.value AS scoretype, 	score, " +
                            "	m4.value AS  dicipline,FROM_UNIXTIME(passingyear/1000,'%d-%M-%Y') AS passingyear, 	createdby, 	createdon, 	modifiedby, 	modifiedon" +
                            "  FROM  teacherqualification tq " +
                            "  JOIN  master m ON m.id   = tq.educationlevel " +
                            "  JOIN  master m1 ON m1.id = tq.qualification " +
                            "  JOIN  master m2 ON m2.id = tq.university " +
                            "  JOIN  master m3 ON m3.id = tq.scoretype " +
                            "  JOIN  master m4 ON m4.id = tq.dicipline where tq.teacherid=?";
        
        try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery,new Object[]{teacherid});
            
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{teacherid});
            job = jsonUtil.getJsonObject(rs, count,0,15, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(TeacherDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;
    }

    public TeacherQualification delTeacherQualificationNdExp(Connection conn, TeacherQualification obj) throws ReadableException {

        
        String delete=null;
        if(obj.getTab().equals("expirence"))
         delete="DELETE FROM teacherexperience WHERE pid = ? ";
        else
         delete="DELETE FROM teacherqualification WHERE	pid = ?" ;

        if(DaoUtil.executeUpdate(conn,delete,new Object[]{obj.getPid()})==1){
            try {
                conn.commit();
                obj.setPid(null);
            } catch (SQLException ex) {
                Logger.getLogger(TeacherDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return obj;
        
        
    }

    public TeacherExperience editTeacherExperience(Connection conn, TeacherExperience obj) throws ReadableException {

        if(obj.getPid().equals("") || obj.getPid()==null){
           insertTeacherExperience(conn,obj);
        }
        else{
           updateTeacherExperience(conn,obj);
        }
        return obj;
    }

    public TeacherExperience insertTeacherExperience(Connection conn, TeacherExperience obj) throws ReadableException {
        String insert="INSERT  INTO teacherexperience " +
        "	(pid,teacherid,schoolname, affilatedto, fromdate, todate, positionheld, " +
        "	city, country, workprofile, contactno, reasonofleaving, otherdetails, " +
        "	createdby, modifiedby,createdon)" +
        "VALUES	(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_DATE)";
        
        String pid = java.util.UUID.randomUUID().toString();
        if(DaoUtil.executeUpdate(conn, insert, new Object[]{
                                               pid,obj.getTeacherid(),obj.getSchoolname(),
                                               obj.getAffilatedto(),obj.getFromdate(),obj.getTodate(),
                                               obj.getPositionheld(),obj.getCity(),obj.getCountry(),
                                               obj.getWorkprofile(),obj.getContactno(),obj.getReasonofleaving(),
                                               obj.getOtherdetails(),obj.getCreatedby(),obj.getCreatedby()
                                        })==1){
            try {
                conn.commit();
                obj.setPid(pid);
            } catch (SQLException ex) {
                Logger.getLogger(TeacherDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return obj;
    }

    private void updateTeacherExperience(Connection conn, TeacherExperience obj) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    public Object getTeacherExpAsJson(Connection conn, String teacherid) throws ReadableException {
        JSONObject job = null;
        int count =0;
        String countquery=  "SELECT 	COUNT(1) as count FROM  teacherexperience te  JOIN  master m ON m.id=te.affilatedto WHERE  teacherid= ?";
        String selectquery= "SELECT 	teacherid, pid, schoolname, m.value AS affilatedto, FROM_UNIXTIME(fromdate/1000,'%d-%M-%Y') AS fromdate,FROM_UNIXTIME(todate/1000,'%d-%M-%Y') AS  todate, positionheld, " +
                            "  city, country, workprofile, contactno, reasonofleaving, otherdetails, createdby, createdon, modifiedby, 	modifiedon " +
                            "  FROM  teacherexperience te JOIN  master m ON m.id=te.affilatedto WHERE  teacherid= ?";
        
        try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery,new Object[]{teacherid});
            
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{teacherid});
            job = jsonUtil.getJsonObject(rs, count,0,15, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(TeacherDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;
    }

    public Object getTeacherListForParentPageAsJson(Connection conn, String studid,
                                                    String sessionid
        ) throws ReadableException {
        JSONObject job = null;
        int count =0;
        String batch_id= new GetBatch().getBatchId(conn, studid, sessionid);
        String countquery= "SELECT count(1) as count " +
                            "  FROM classsubjectteacher cst  " +
                            "  JOIN master m ON m.id =  cst.subjectid " +
                            "  JOIN users  u ON u.userid=  cst.teacherid AND u.roleid=3 " +
                            " WHERE batchid=?";
        
        String selectquery= "SELECT cst.subjectid ,m.value AS subject ,       cst.teacherid , " +
                            "   u.profilepic,u.name , u.profilepic , u.contactno ,        u.address ,        u.emailid " +
                            "  FROM classsubjectteacher cst  " +
                            "  JOIN master m ON m.id =  cst.subjectid " +
                            "  JOIN users  u ON u.userid=  cst.teacherid AND u.roleid=3 " +
                            " WHERE batchid=?";
        
        try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery,new Object[]{batch_id});
            
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{batch_id});
            job = jsonUtil.getJsonObject(rs, count,0,15, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(TeacherDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;
    }
}
