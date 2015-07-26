/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

/**
 *
 * @author cd
 */
import com.dlabs.util.FileHandler;
import com.dlabs.mis.model.ClassExam;
import com.dlabs.mis.model.ClassSubject;
import com.dlabs.mis.model.Classes;
import com.dlabs.mis.model.CreateExamPostData;
import com.dlabs.mis.model.HomeWork;
import com.dlabs.mis.model.StudentHomeWorkStatusModel;
import com.dlabs.mis.model.User;
import com.kjava.base.ReadableException;

import com.kjava.base.db.DaoUtil;
import com.kjava.base.util.ExtJsonUtil;
import com.kjava.base.util.JSONUtil;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
//import java.util.HashSet;
//import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
public class HomeWorkDAO {
    
    JSONUtil jsonUtil = new ExtJsonUtil();
    
    public int addOrEditHomeWork(Connection conn, HttpServletRequest obj) throws ReadableException {
        int flag=0;
        ResultSet rs=null;
        String path="D:\\kamlesh";
        HashMap arrParam = new HashMap();
        HomeWork hwobj=new HomeWork();
        
        String id="";
        try {
            String query =  "INSERT INTO homework " +
                            "	(pid, 	sessionid, 	classid, 	subjectid, 	title, 	description, " +
                            "	assigndate, 	duedate, 	STATUS, 	attachmentpath, 	createdby, " +
                            "	createdon)" +
                            "VALUES  (?,?,?,?,?,?,?,?,?,?,?,CURRENT_DATE)";
            
            String pid = java.util.UUID.randomUUID().toString();
            arrParam = (HashMap) FileHandler.uploadFile(path, obj);        
            hwobj=getObject(arrParam); 
            
            String batchid=new GetBatch(hwobj.getClassid(),hwobj.getSessionid()).BatchId(conn);
            
            if(DaoUtil.executeUpdate(conn,query,new Object[]{pid,hwobj.getSessionid(),batchid,
                                                           hwobj.getSubjectid(),hwobj.getTitle(),
                                                           hwobj.getDescription(),hwobj.getAssigndate(),
                                                           hwobj.getDuedate(),hwobj.getStatus(),hwobj.getAttachmentpath(),hwobj.getCreatedby()})==1)
            {
                String studentlist="SELECT studentid FROM student WHERE classid=?";
                String insertquery="INSERT INTO studenthomeworkstatus (pid,homeworkid,studentid)VALUES(?,?,?)";
                ResultSet rssl=DaoUtil.executeQuery(conn, studentlist,new Object[]{hwobj.getClassid()});
                while(rssl.next()){
                     id = java.util.UUID.randomUUID().toString();
                     DaoUtil.executeUpdate(conn, insertquery, new Object[]{id,pid,rssl.getString("studentid")});
                }
                conn.commit();
                flag=1;
            } 
        } catch (SQLException ex) {
            throw new ReadableException(ex.getCause(),ex.getMessage(),"ClassDAO", "addoredit");         
        }
        return flag;
    }
    
    public HomeWork getObject(HashMap obj){
      
        HomeWork hwobj=new HomeWork();
        if(obj.containsKey("classid"))
            hwobj.setClassid((String)obj.get("classid"));
        if(obj.containsKey("sessionid"))
            hwobj.setSessionid((String)obj.get("sessionid"));
        if(obj.containsKey("hwsubject"))
            hwobj.setSubjectid((String)obj.get("hwsubject"));
        if(obj.containsKey("title"))
            hwobj.setTitle((String)obj.get("title"));
        if(obj.containsKey("description"))
            hwobj.setDescription((String)obj.get("description"));
        if(obj.containsKey("activatedate")){
            Date assigndate=new Date();   
              try {
                
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-mm-yy");
                assigndate = sdf.parse((String)obj.get("activatedate"));
             } catch (ParseException ex) {
                Logger.getLogger(User.class.getName()).log(Level.SEVERE, null, ex);
            }
            hwobj.setAssigndate(assigndate.getTime());
        }
        if(obj.containsKey("endactivatedate")){
         
            Date duedate=new Date();   
              try {
                
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-mm-yy");
                duedate = sdf.parse((String)obj.get("endactivatedate"));
             } catch (ParseException ex) {
                Logger.getLogger(User.class.getName()).log(Level.SEVERE, null, ex);
            }
            hwobj.setDuedate(duedate.getTime());
        }
        if(obj.containsKey("status"))
            hwobj.setStatus((String)obj.get("status"));
        if(obj.containsKey("createdby"))
            hwobj.setCreatedby((String)obj.get("createdby"));
        if(obj.containsKey("modifiedby"))
            hwobj.setModifiedby((String)obj.get("modifiedby"));
        if(obj.containsKey("notification")){
            String data=(String)obj.get("notification");
            int x =data.equalsIgnoreCase("on")?1:0;
            hwobj.setNotification(x);
        }
        if(obj.containsKey("filename"))
            hwobj.setAttachmentpath((String)obj.get("filename"));
        return hwobj;
         
    }

    public Object getHomeWorkAsJSON(Connection conn, String sessionid, String classid,String createdby ,int page,int rows) throws ReadableException {
        JSONObject job = null;
        int count =0; 
        
        String batchid=new GetBatch(classid ,sessionid).BatchId(conn);
        String countquery=  "SELECT 	COUNT(1) as count " +
                            "  FROM  homework hw " +
                            "  JOIN  master m  ON m.id =hw.sessionid " +
                            "  JOIN  master m1 ON m1.id=hw.subjectid " +
                            "  JOIN  users  u  ON u.userid=hw.createdby " +
                            " WHERE  hw.sessionid= ? " +
                            "   AND  hw.classid  = ? " +
                            "   AND  hw.createdby= ?";
        String selectquery="SELECT 	hw.pid,	hw.sessionid,m.value AS session ,hw.classid,hw.subjectid,m1.value AS subject,	hw.title, " +
                            "	hw.description,FROM_UNIXTIME(hw.assigndate/1000,'%d-%m-%Y') assigndate,FROM_UNIXTIME(hw.duedate/1000,'%d-%m-%Y') duedate, 	hw.status as statusid ,m2.value as status ,	hw.attachmentpath, " +
                            "	hw.createdby as createdbyid, 	hw.createdon, 	hw.modifiedby, 	hw.modifiedon	,u.name as createdby " +
                            "  FROM  homework hw " +
                            "  JOIN  master m  ON m.id =hw.sessionid " +
                            "  JOIN  master m1 ON m1.id=hw.subjectid " +
                            "  JOIN  users  u  ON u.userid=hw.createdby " +
                            "  JOIN  master m2 ON m2.id=hw.status " +  
                            " WHERE  hw.sessionid= ? " +
                            "   AND  hw.classid  = ? " +
                            "   AND  hw.createdby= ? limit ? offset ?";
        try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery,new Object[]{sessionid,batchid,createdby});
            if(rs.next()) {
                count = rs.getInt("count");

            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{sessionid,batchid,createdby,15,0});
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);            
        }
        catch (SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;
    }

    public Object downloadFile(Connection conn, HttpServletRequest request, HttpServletResponse response) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    public Object getStudentsHomeWorkAsJSON(Connection conn, String pid, int page, int rows) throws ReadableException {
        JSONObject job = null;
        int count =100; 
        String countquery="SELECT count(1) as count "+
                            "  FROM  studenthomeworkstatus shws " +
                            "  JOIN  student s ON s.studentid=shws.studentid " +
                            " WHERE  shws.homeworkid=?";
        String selectquery="SELECT  shws.pid,shws.homeworkid,shws.studentid,CONCAT(CONCAT(CONCAT(CONCAT(fname,' '),case when mname is null then '' else mname end),' '),lname) AS studentname , " +
                            "        case shws.status when 1 then 1 else null end as status, " +
                            "        CASE shws.STATUS WHEN 1 THEN 'Completed' WHEN 0 THEN 'Pending' END AS statusname," +
                            "        shws.submitteddate,shws.docpath, " +
                            "	shws.uploadedby,shws.uploadedon " +
                            "  FROM  studenthomeworkstatus shws " +
                            "  JOIN  student s ON s.studentid=shws.studentid " +
                            " WHERE  shws.homeworkid=?";
      try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery,new Object[]{pid});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{pid});
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);            
        }
        catch (SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;
    }        
    public int markHWC(Connection conn, StudentHomeWorkStatusModel obj[]) throws ReadableException{
      int flag=0;      
      String query = "UPDATE  studenthomeworkstatus SET STATUS = ?, submitteddate = CURRENT_DATE , uploadedby = ? where pid = ?";
      
      try {
      for (int i = 0; i < obj.length; i++) {
            obj[i].setUploadedby("1006");
            try {
                DaoUtil.executeUpdate(conn, query, new Object[]{obj[i].getStatus(),obj[i].getUploadedby(),obj[i].getPid()});
                flag=1;
            } catch (ReadableException ex) {
                Logger.getLogger(HomeWorkDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
        } 
          if(flag==1)
              conn.commit();       
          
      }catch (SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
    return flag;    
}

    public Object getStudentHomeWorkAsJSON(Connection conn, String sid,String batchid) throws ReadableException {
       JSONObject job = null;
       int count =100; 
       String countquery="SELECT COUNT(1) AS count  FROM homework hw  LEFT JOIN  studenthomeworkstatus hws ON hw.pid=hws.homeworkid   JOIN master m ON hw.subjectid=m.id  JOIN users  u ON u.userid=hw.createdby    AND hws.studentid= ? WHERE hw.classid   = ? ORDER BY assigndate DESC";
       String selectquery="SELECT m.value AS sub ,hw.title ,hw.description ,FROM_UNIXTIME(hw.assigndate/1000,'%d-%m-%Y') assigndate," +
                           "       FROM_UNIXTIME(hw.duedate/1000,'%d-%m-%Y') duedate,hw.attachmentpath, u.name AS createdby , CASE hws.status WHEN 0 THEN 'Not Completed' WHEN 1 THEN 'Completed' END AS status " +
                           "  FROM homework hw  LEFT JOIN  studenthomeworkstatus hws ON hw.pid=hws.homeworkid " +
                           "  JOIN master m ON hw.subjectid=m.id  JOIN users  u ON u.userid=hw.createdby    AND hws.studentid=? " +
                           " WHERE hw.classid= ? ORDER BY assigndate DESC";
      try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery,new Object[]{sid,batchid});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{sid,batchid});
            job = jsonUtil.getJsonObject(rs, count, 1,100, false);            
        }
        catch (SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;
    }
}
