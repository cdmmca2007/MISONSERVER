/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

import com.dlabs.mis.model.Classes;
import com.dlabs.mis.model.DigitalDairy;
import com.dlabs.mis.model.MonthlyProgress;
import com.dlabs.mis.model.ReplyOnStudentDairy;
import com.dlabs.mis.model.User;
import com.kjava.base.ReadableException;
import com.kjava.base.db.DaoUtil;
import com.kjava.base.util.ExtJsonUtil;
import com.kjava.base.util.JSONUtil;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.simple.JSONObject;

/**
 *
 * @author cd
 */
public class DigitalDairyDAO {

    JSONUtil jsonUtil = new ExtJsonUtil();
    
    public DigitalDairy addOrEditDDParent(Connection conn, DigitalDairy obj) throws ReadableException {

        
        String batchid=new GetBatch(obj.getClassid(),obj.getSessionid()).BatchId(conn);
        String pid=null;
        try {
            String query = "";
               query="INSERT INTO studentdairy (pid, 	classid,classteacherid, studentid,subjectid, requesttype, matter, priority, " +
                     "description,createdby ,createdon)" +
                     "VALUES (?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)"; 
               pid = java.util.UUID.randomUUID().toString();

           if( DaoUtil.executeUpdate(conn, query, new Object[]{pid,batchid,
                                                               obj.getCreatedby(),
                                                               obj.getStudentid(),
                                                               obj.getSubject(),
                                                               obj.getType(),
                                                               obj.getTitle(),
                                                               obj.getPriority(),
                                                               obj.getDescription(),
                                                               obj.getCreatedby()
                                                              })==1)
           {
               obj.setPid(pid);
               conn.commit();
           }
        } catch (SQLException ex) {
            throw new ReadableException(ex.getCause(),ex.getMessage(),"Digital Dairy DAO", "addoredit");
        }
        return obj;

    }

    public Object getAllDDAsJson(Connection conn, String classid, String studentid,String createdby, String sessionid, int page, int rows) throws ReadableException {
        JSONObject job = null;
        int count =0;
        String countquery="";
        String selectquery="";
        String batchid=new GetBatch(classid,sessionid).BatchId(conn);
        if(studentid.equals(""))
            studentid=null;
        
        if(classid!=null && studentid==null){
        
            selectquery="SELECT sd.pid,sd.classid, c.name AS classname, sd.classteacherid,u.name AS username,sd.studentid,CONCAT(CONCAT(CONCAT(CONCAT(s.fname,' '),case when s.mname is null then '' else s.mname end),' '),s.lname) AS studentname," +
                        "       sd.subjectid,m2.value AS subjectname,sd.requesttype,m1.value AS type,sd.priority,m.value AS priorityname," +
                        "       sd.matter,sd.description,sd.createdby , sd.createdon "+
                        "  FROM  studentdairy  sd " +
                        " INNER  JOIN master  m  ON m.id=sd.priority INNER  JOIN master  m1 ON m1.id=sd.requesttype  INNER  JOIN master  m2 ON m2.id=sd.subjectid INNER  JOIN student s  ON s.studentid=sd.studentid  INNER  JOIN sessions ss ON ss.batch_id=sd.classid INNER  JOIN class c ON c.classid=ss.class_id INNER  JOIN users u ON u.userid=sd.createdby " +
                        " WHERE  sd.classid='"+batchid+"'  AND  sd.createdby='"+createdby+"' limit ? offset ?";
            
            countquery ="SELECT count(1) as count " +
                        "  FROM  studentdairy  sd " +
                        " INNER  JOIN master  m  ON m.id=sd.priority INNER  JOIN master  m1 ON m1.id=sd.requesttype  INNER  JOIN master  m2 ON m2.id=sd.subjectid INNER  JOIN student s  ON s.studentid=sd.studentid  INNER  JOIN sessions ss ON ss.batch_id=sd.classid INNER  JOIN class c ON c.classid=ss.class_id INNER  JOIN users u ON u.userid=sd.createdby " +
                        " WHERE  sd.classid='"+batchid+"'  AND  sd.createdby='"+createdby+"'";            
        }
        
        if(classid!=null && studentid!=null){
            selectquery="SELECT sd.pid,sd.classid, c.name AS classname, sd.classteacherid,u.name AS username,sd.studentid,CONCAT(CONCAT(CONCAT(CONCAT(s.fname,' '),case when s.mname is null then '' else s.mname end),' '),s.lname) AS studentname," +
                        "       sd.subjectid,m2.value AS subjectname,sd.requesttype,m1.value AS type,sd.priority,m.value AS priorityname," +
                        "       sd.matter,sd.description,sd.createdby , sd.createdon "+
                        "  FROM  studentdairy  sd " +
                        " INNER  JOIN master  m  ON m.id=sd.priority INNER  JOIN master  m1 ON m1.id=sd.requesttype  INNER  JOIN master  m2 ON m2.id=sd.subjectid INNER  JOIN student s  ON s.studentid=sd.studentid  INNER  JOIN sessions ss ON ss.batch_id=sd.classid INNER  JOIN class c ON c.classid=ss.class_id INNER  JOIN users u ON u.userid=sd.createdby " +
                        " WHERE  sd.classid='"+batchid+"'  AND  sd.createdby='"+createdby+"' AND  sd.studentid='"+studentid+"' limit ? offset ?";
            
            countquery ="SELECT count(1) as count " +
                        "  FROM  studentdairy  sd " +
                        " INNER  JOIN master  m  ON m.id=sd.priority INNER  JOIN master  m1 ON m1.id=sd.requesttype  INNER  JOIN master  m2 ON m2.id=sd.subjectid INNER  JOIN student s  ON s.studentid=sd.studentid  INNER  JOIN sessions ss ON ss.batch_id=sd.classid INNER  JOIN class c ON c.classid=ss.class_id INNER  JOIN users u ON u.userid=sd.createdby " +
                        " WHERE  sd.classid='"+batchid+"'  AND  sd.createdby='"+createdby+"' AND  sd.studentid='"+studentid+"' "; 
        
        }
         try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery);
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{15,0});
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;

    }

    public String addSMP(Connection conn, MonthlyProgress obj) throws ReadableException {
        ResultSet rs=null;
        String subjectid=null;
        String insertquery="INSERT INTO studentmonthlyprogress (pid,classid,studentid,monthid,subjectid,createdby, createddate) VALUES(?,?,?,?,?,?,CURRENT_TIMESTAMP)";
        String pid=null;
        int flag=0;
        String createdby="10006";
        String batchid=new GetBatch(obj.getClassid(),obj.getSessionid()).BatchId(conn);
        String selectquery="SELECT subjectid FROM classsubject WHERE classid=?";
        String countquery="SELECT count(1) as count FROM classsubject WHERE classid=?";
        String checkquery="SELECT COUNT(1) as count  FROM studentmonthlyprogress WHERE classid   = ?   AND studentid = ?  AND monthid   = ?";
        try {
        if(obj.getClassid()!=null && (obj.getMonth() >0 && obj.getMonth() <=12) && obj.getSessionid()!=null && obj.getStudentid()!=null)
        {
          
            rs=DaoUtil.executeQuery(conn,checkquery,new Object[]{batchid,obj.getStudentid(),obj.getMonth()});      
            rs.next();
            if(rs.getInt("count")==0) {
            rs= DaoUtil.executeQuery(conn,countquery,new Object[]{batchid});    
            rs.next();
                if(rs.getInt("count") > 0){

                   rs= DaoUtil.executeQuery(conn,selectquery,new Object[]{batchid});    
                   while(rs.next()){
                      subjectid=rs.getString("subjectid");
                      pid = java.util.UUID.randomUUID().toString();
                      if(DaoUtil.executeUpdate(conn,insertquery, new Object[]{pid,batchid,obj.getStudentid(),obj.getMonth(),subjectid,obj.getCreatedby()})==1){
                         flag=1;  
                      }
                   }
                }
                if(flag==1)
                    conn.commit();
                else
                    return "1";
           }
            else{
                return getAllSMPAsJson(conn,obj,15,0).toString();                
            } 
          }        
       }
        catch(SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return "";        
    }

    public Object getAllSMPAsJson(Connection conn, MonthlyProgress obj, int page, int rows) throws ReadableException {
        JSONObject job = null;
        int count =0;
        String batchid=new GetBatch(obj.getClassid(),obj.getSessionid()).BatchId(conn);
        String selectquery="SELECT smp.pid, smp.classid, smp.studentid, smp.sessionid, smp.monthid, " +
                            "       smp.subjectid,smp.progressdescription, m1.value as progressstatus, " +
                            "       smp.suggestion, smp.createddate, smp.createdby , m.value as subjectname" +
                            "  FROM studentmonthlyprogress smp INNER JOIN master m ON m.id=smp.subjectid left outer JOIN master m1 ON m1.id=smp.progressstatus " +                
                            " WHERE smp.classid   = ?   " +
                            "   AND smp.studentid = ?   " +
                            "   AND smp.monthid   = ? and smp.createdby=? limit ? offset ?";
        
        String countquery ="SELECT COUNT(1) as count  FROM studentmonthlyprogress smp WHERE classid=? AND studentid=? AND monthid=? and smp.createdby=?";
        String userid="10006";//Need to change with current userid
        
         try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery,new Object[]{batchid,obj.getStudentid(),obj.getMonth(),obj.getCreatedby()});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{batchid,obj.getStudentid(),obj.getMonth(),obj.getCreatedby(),15,0});
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;

    }

    public int saveSMP(Connection conn, MonthlyProgress obj) throws ReadableException {
        
        String updatequery="UPDATE studentmonthlyprogress SET progressdescription=? , progressstatus=? ,suggestion=? ,modifiedby=? WHERE pid=?";
        String modifiedby="10006";
        int flag=0;
        if(DaoUtil.executeUpdate(conn, updatequery,new Object[]{obj.getProgressdescription(),obj.getStatus(),obj.getSuggestion(),modifiedby,obj.getPid()})==1)
        {
            try {
                conn.commit();
                flag=1;
            } catch (SQLException ex) {
                Logger.getLogger(DigitalDairyDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
        }          
        return flag;
    }

    public Object getParentTeacherInteractionChat(Connection conn,String pid, String userid) throws ReadableException {
        JSONObject job = null;
        int count =0;
        
        String selectquery="SELECT u.name AS username,CASE sdr.responseto WHEN 1 THEN 'Parent' WHEN 0 THEN 'Teacher' END AS res_from, sdr.comment AS text ,sdr.createdon AS ondate  FROM studentdairyreply sdr JOIN users u ON  sdr.responsefrom=u.userid WHERE sdr.studentdairypid=?  ORDER BY sdr.createdon";
        
        String countquery ="SELECT count(1) as count  FROM studentdairyreply sdr JOIN users u ON  sdr.responsefrom=u.userid WHERE sdr.studentdairypid=?  ORDER BY sdr.createdon";
         try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery,new Object[]{pid});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{pid});
            job = jsonUtil.getJsonObject(rs, count, 1,15, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;
        
    }

    public ReplyOnStudentDairy setParentTeacherInteractionChat(Connection conn, ReplyOnStudentDairy obj) throws ReadableException {

        String insertquery="INSERT INTO studentdairyreply (pid,studentdairypid,responsefrom,responseto,COMMENT) VALUES(?,?,?,?,?)";
        String pid = java.util.UUID.randomUUID().toString();        
        int responseto=new UserDAO().getUserRole(conn, obj.getUserid());

        if(responseto==4)responseto=1;//1 mean response to teacher
        else responseto=0;            //0 mean response to parent 
        
        if(DaoUtil.executeUpdate(conn,insertquery,new Object[]{pid , obj.getDdid(),obj.getUserid(),responseto,obj.getText()})==1){
             obj.setReplyid(pid);
        }
        
        return obj;
    }

    public Object getStudentDigitalDairy(Connection conn, String batchid, String studentid, int i, int i0) throws ReadableException {

        JSONObject job = new JSONObject();
        Collection<JSONObject> items = new ArrayList<JSONObject>();
        int count=0;
        String selectquery="SELECT sd.pid , u.name AS postby, m.value AS  for_subject , m1.value AS requesttype ,sd.matter ,  m2.value AS priority , " +
                            "       sd.description , sd.createdon  FROM studentdairy sd  JOIN users u ON  u.userid=sd.classteacherid   LEFT JOIN master m ON m.id=sd.subjectid  LEFT JOIN master m1 ON m1.id=sd.requesttype " +
                            "  LEFT JOIN master m2 ON m2.id=sd.priority WHERE sd.classid= ?   AND sd.studentid=?  ORDER BY createdon DESC ";
        String subselectquery="SELECT u.name AS postby,CASE sdr.responseto WHEN 1 THEN 'Parent' WHEN 0 THEN 'Teacher' END AS res_from, sdr.comment AS text ,sdr.createdon AS postdate  FROM studentdairyreply sdr JOIN users u ON  sdr.responsefrom=u.userid WHERE sdr.studentdairypid=?  ORDER BY sdr.createdon";
        ResultSet rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{batchid , studentid});        
        String pid="";
        if(rs!=null){
            try {
                while(rs.next()){
                 
                    JSONObject obj =new JSONObject();
                    pid=rs.getString("pid");
                    obj.put("pid",pid);
                    obj.put("postby",rs.getString("postby"));
                    obj.put("for_subject",rs.getString("for_subject"));
                    obj.put("requesttype",rs.getString("requesttype"));
                    obj.put("matter",rs.getString("matter"));
                    obj.put("priority",rs.getString("priority"));
                    obj.put("description",rs.getString("description"));
                    obj.put("createdon",rs.getString("createdon"));
             
             items.add(obj);
             ResultSet rs_1 = DaoUtil.executeQuery(conn,subselectquery,new Object[]{pid});                             
             
             if(rs_1!=null) {
                 JSONObject obj_1 =new JSONObject();       
                 
                 while(rs_1.next()) {
                    obj_1.put("pid",pid);
                    obj_1.put("postby",rs_1.getString("postby"));
                    obj_1.put("res_from",rs_1.getString("res_from"));
                    obj_1.put("text",rs_1.getString("text"));
                    obj_1.put("postdate",rs_1.getString("postdate"));
                    items.add(obj_1);
                    count++;
                 }                
             }
             count++;
            }
            job.put("totalCount",count);
            job.put("rows",items);
    
            } catch (SQLException ex) {
                Logger.getLogger(DigitalDairyDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
            
        }
        return job;
    }
    
}

