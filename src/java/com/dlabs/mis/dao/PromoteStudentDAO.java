/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

import com.dlabs.mis.model.Notification;
import com.kjava.base.ReadableException;
import com.kjava.base.db.DaoUtil;
import java.sql.Connection;
import java.sql.ResultSet;
import com.dlabs.mis.model.ClassExam;
import com.dlabs.mis.model.ClassSubject;
import com.dlabs.mis.model.Classes;
import com.dlabs.mis.model.CreateExamPostData;
import com.dlabs.mis.model.StudentPromoteToNextClass;
import com.kjava.base.ReadableException;

import com.kjava.base.db.DaoUtil;
import com.kjava.base.util.ExtJsonUtil;
import com.kjava.base.util.JSONUtil;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
//import java.util.HashSet;
//import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
/**
 *
 * @author cd
 */
public class PromoteStudentDAO {
    JSONUtil jsonUtil = new ExtJsonUtil(); 
    
    public Object getAllPSMAsJson(Connection conn, String batch_id,String studentid , int page, int rows) throws ReadableException {
        JSONObject job = null;
        int count =0;
       /* String countquery="SELECT COUNT(1) as count" +
                            "  FROM studentexam se,(SELECT examtypeid , examname , m.value AS examtypename, SUM(maxmark) AS maxmark , SUM(passmark) AS passmark " +
                            "  FROM classexam c, master m " +
                            " WHERE sessionid=? " +
                            "   AND classid=? " +
                            "   AND c.examtypeid=m.id " +
                            " GROUP BY examtypeid) examdata  , student s " +
                            " WHERE se.sessionid=? " +
                            "   AND se.classid=? " +
                            "   AND s.studentid=se.studentid " +
                            "   AND se.examtypeid=examdata.examtypeid " +
                            " GROUP BY  se.studentid ,  se.examtypeid";
        
        String selectquery= "SELECT se.studentid,s.name AS studentname,examdata.examtypeid ,examdata.examname,examdata.examtypename AS examtypename, " +
                            "       examdata.maxmark AS totalmark , examdata.passmark AS totpassmark," +
                            "       SUM(markobtained) AS totmarkobtained , (SUM(markobtained)/examdata.maxmark)*100 AS percentage " +
                            "  FROM studentexam se,(SELECT examtypeid , examname , m.value AS examtypename, SUM(maxmark) AS maxmark , SUM(passmark) AS passmark " +
                            "  FROM classexam c, master m " +
                            " WHERE sessionid=?" +
                            "   AND classid=? " +
                            "   AND c.examtypeid=m.id " +
                            " GROUP BY examtypeid) examdata  , student s " +
                            " WHERE se.sessionid=? " +
                            "   AND se.classid=? " +
                            "   AND s.studentid=se.studentid " +
                            "   AND se.examtypeid=examdata.examtypeid " +
                            " GROUP BY  se.studentid ,  se.examtypeid ";
        */
        String countquery="SELECT COUNT(1) AS count" +
                            "  FROM studentexam s ,classexam c ,master m" +
                            " WHERE s.classid=?   AND s.studentid=?   AND s.classexamid=c.id   AND m.id=s.examtypeid GROUP BY s.examtypeid";
        String selectquery="SELECT m.value AS examtypename ,c.examname AS examname,SUM(maxmark) AS totalmark," +
                            "      SUM(passmark) AS totpassmark ,SUM(s.markobtained) AS totmarkobtained,(SUM(s.markobtained)/SUM(maxmark))*100 AS percentage " +
                            "      ,CASE WHEN SUM(passmark) <=  SUM(s.markobtained) THEN 'Passed' WHEN SUM(passmark) >  SUM(s.markobtained) THEN 'Failed'  END as examstatus "+
                            "  FROM studentexam s ,classexam c ,master m " +
                            " WHERE s.classid=?   AND s.studentid=?   AND s.classexamid=c.id   AND m.id=s.examtypeid GROUP BY s.examtypeid";
        try{            
            ResultSet rs = DaoUtil.executeQuery(conn,countquery,new Object[]{batch_id,studentid});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{batch_id,studentid});
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(PromoteStudentDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;        
    }

    
    public Object getAllPSMStdListAsJson(Connection conn, String classid, String sessionid, int page, int rows) throws ReadableException {
        JSONObject job = null;
        int count =0;
        String countquery="SELECT count(1) as count FROM student_class_map scm INNER JOIN student st ON scm.student_id=st.studentid WHERE scm.batch_id=?";        
        String selectquery= "SELECT scm.batch_id,scm.student_id AS studentid ,CONCAT(CONCAT(CONCAT(CONCAT(st.fname,' '),case when st.mname is null then '' else st.mname end),' '),st.lname) AS studentname,case when resultstatus=-1 then null when resultstatus=1 then resultstatus end as resultstatus FROM student_class_map scm INNER JOIN student st ON scm.student_id=st.studentid WHERE scm.batch_id=?";
        String batchid=new GetBatch(classid, sessionid).BatchId(conn);
        try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery,new Object[]{batchid});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{batchid});
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(PromoteStudentDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;                 
    }

    public int promoteStudent(Connection conn, StudentPromoteToNextClass[] obj) throws ReadableException {
        int flag=0;
        //Check for new session added or not 
        String check1=  "SELECT tab1.sessionyear AS sessionid " +
                    "FROM         (SELECT sessionyear,tab.new_session_from,tab.new_seesion_to  FROM mainsession ," +
                    "		  (SELECT MAX(activatedate) AS new_session_from ," +
                    "		       MAX(endactivatedate) AS new_seesion_to " +
                    "		  FROM mainsession " +
                    "		  ) tab " +
                    "		 WHERE activatedate=tab.new_session_from AND endactivatedate=tab.new_seesion_to " +
                    "		) tab1,                       " +
                    "             (SELECT activatedate AS old_session_from ,endactivatedate AS old_session_to " +
                    "		FROM mainsession WHERE sessionyear=? ) tab2 " +
                    " WHERE tab1.new_session_from > tab2.old_session_from " +
                    "   AND tab1.new_seesion_to   > tab2.old_session_to";
        ResultSet rs=null;
        
        try {
            rs=DaoUtil.executeQuery(conn, check1,new Object[]{obj[0].getSessionid()});
            if(rs.next()){
                String newsessionid=rs.getString("sessionid");
                String newclassid  =getPromotedToClass_id(conn,obj[0].getBatch_id());
                String newbatchid  =new GetBatch(newclassid, newsessionid).BatchId(conn);
                //Pass strudent for current year and promote to next year
                //update student_class_map table for existing class & add new row in student_class_map for new class promoted to
                String updatequery="UPDATE student_class_map SET resultstatus = ? WHERE student_id = ? AND batch_id = ?";
                String insertquery="INSERT INTO student_class_map(student_id,batch_id) VALUES(?,?)";
                 
           for (int i = 0; i < obj.length; i++) {
            StudentPromoteToNextClass obj_1 = obj[i];
            DaoUtil.executeUpdate(conn,updatequery, new Object[]{obj_1.getResultstatus(),obj_1.getStudentid(),obj_1.getBatch_id()});
            DaoUtil.executeUpdate(conn,insertquery, new Object[]{obj_1.getStudentid(),newbatchid});
            flag=1;
           }
         }
        } catch (SQLException ex) {
            Logger.getLogger(PromoteStudentDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return flag;
    }
    
    private String getPromotedToClass_id(Connection conn,String batchid) throws ReadableException{
        String oldclassname="";
        String newclassname="";
        String newclassid="";
        ResultSet rs=DaoUtil.executeQuery(conn,"SELECT c.name AS classname FROM sessions s, class c WHERE s.batch_id=? AND s.class_id=c.classid",new Object[]{batchid});
        try {
            if(rs.next())
            {  
               if(rs.getObject("classname")!=null)oldclassname=rs.getString("classname");  
               
                 String []details=oldclassname.split("-");
                 if(details.length==3)
                 newclassname="Class-"+(Integer.parseInt(details[1])+1)+"-"+details[2];
                 if(details.length==2)
                 newclassname="Class-"+(Integer.parseInt(details[1])+1);
               rs=DaoUtil.executeQuery(conn,"select classid from class where name=?",new Object[]{newclassname});                
               if(rs.next())
                   newclassid=rs.getString("classid");
            }
        } catch (SQLException ex) {
            Logger.getLogger(PromoteStudentDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return newclassid;
    }
}


