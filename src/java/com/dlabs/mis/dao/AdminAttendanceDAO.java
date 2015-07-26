/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

import com.dlabs.mis.model.AdminAttendance;
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
import org.springframework.stereotype.Controller;

/**
 *
 * @author cd
 */
@Controller
public class AdminAttendanceDAO {

    JSONUtil jsonUtil = new ExtJsonUtil();
    
    public int addOrEditAtra(Connection conn, AdminAttendance obj) throws ReadableException {

        String insertquery="INSERT INTO attendencerequesttoadmin(pid,batchid,studentid,attendencefromdate,attendencetodate,markattendencestatus,createdby,modifiedon,requeststatus,requestby,reason) VALUES(?,?,?,?,?,?,?,CURRENT_DATE,'0',?,?)";
        String batchid=new GetBatch(obj.getClassid(),obj.getSessionid()).BatchId(conn);        
        String pid=null;
        
        pid = java.util.UUID.randomUUID().toString();
        if( DaoUtil.executeUpdate(conn,insertquery, new Object[]{
                                    pid,
                                    batchid,
                                    obj.getStudentid(),
                                    obj.getAttendencefromdate(),
                                    obj.getAttendencetodate(),
                                    obj.getMarkattendencestatus(),
                                    obj.getCreatedby(),
                                    obj.getCreatedby(),
                                    obj.getReason()
                               })==1)
        {
               obj.setPid(pid);
            try {
                conn.commit();
                return 1;
            } catch (SQLException ex) {
                Logger.getLogger(AdminAttendanceDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        
        
        return 0;
    }

    public Object getATRAAsJSON(Connection conn, String sessionid, String classid,String studentid,String createdby,int page, int rows) throws ReadableException {
        JSONObject job = null;
        String selectquery= "",countquery= "";
        String batchid=new GetBatch(classid,sessionid).BatchId(conn); 
        int usertype=new GetBatch().roleId(conn, createdby);
        if(usertype!=1){
        if(studentid=="" )
        {
            selectquery="SELECT arta.pid, arta.batchid, arta.studentid, " +
                        "       FROM_UNIXTIME(arta.attendencefromdate/1000,'%d-%m-%Y') attendencefromdate," +
                        "       FROM_UNIXTIME(arta.attendencetodate/1000,'%d-%m-%Y') attendencetodate, " +
                        "       CASE arta.markattendencestatus WHEN 1 THEN 'Present' WHEN 0 THEN 'Absent' END AS attendencestatustext, arta.createdby, arta.modifiedby, arta.createdon, arta.modifiedon, " +
                        "       arta.attendencemarkdate," +
                        "       CASE arta.requeststatus WHEN 0 THEN 'Pending' WHEN 1 THEN 'Complete' WHEN -1 THEN 'Rejected' END AS requeststatustext, " +
                        "       CONCAT(CONCAT(CONCAT(CONCAT(s.fname,' '),s.mname),' '),s.lname) AS studentname," +
                        "       u.name AS requestby ,arta.reason " +
                        "  FROM attendencerequesttoadmin arta " +
                        " INNER JOIN student s ON s.studentid=arta.studentid " +
                        "  LEFT JOIN users u ON arta.requestby=u.userid " +
                        " WHERE arta.createdby=? " +
                        "   AND arta.batchid=? " +
                        "  ORDER BY arta.createdon , arta.modifiedon DESC";
            countquery ="SELECT COUNT(1) as count " +
                        "  FROM attendencerequesttoadmin arta  INNER JOIN student s ON s.studentid=arta.studentid " +
                        "  LEFT JOIN users u ON arta.requestby=u.userid  WHERE arta.createdby=?   AND arta.batchid=? ";
                   int count =0;        
            try{
                ResultSet rs = DaoUtil.executeQuery(conn,countquery,new Object[]{createdby,batchid});
                if(rs.next()) {
                    count = rs.getInt("count");
                }
                rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{createdby,batchid});
                job = jsonUtil.getJsonObject(rs, count, page,rows, false);
            }
            catch (SQLException ex) {
                Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
            
        }
        else{
            selectquery="SELECT arta.pid, arta.batchid, arta.studentid, " +
                        "       FROM_UNIXTIME(arta.attendencefromdate/1000,'%d-%m-%Y') attendencefromdate," +
                        "       FROM_UNIXTIME(arta.attendencetodate/1000,'%d-%m-%Y') attendencetodate, " +
                        "       CASE arta.markattendencestatus WHEN 1 THEN 'Present' WHEN 0 THEN 'Absent' END AS attendencestatustext, arta.createdby, arta.modifiedby, arta.createdon, arta.modifiedon, " +
                        "       arta.attendencemarkdate," +
                        "       CASE arta.requeststatus WHEN 0 THEN 'Pending' WHEN 1 THEN 'Complete' WHEN -1 THEN 'Rejected' END AS requeststatustext, " +
                        "       CONCAT(CONCAT(CONCAT(CONCAT(s.fname,' '),s.mname),' '),s.lname) AS studentname," +
                        "       u.name AS requestby ,arta.reason" +
                        "  FROM attendencerequesttoadmin arta " +
                        " INNER JOIN student s ON s.studentid=arta.studentid " +
                        "  LEFT JOIN users u ON arta.requestby=u.userid " +
                        " WHERE arta.createdby=? " +
                        "   AND arta.batchid=? and arta.studentid=? " +
                        "  ORDER BY arta.createdon , arta.modifiedon DESC";
            countquery ="SELECT COUNT(1) as count " +
                        "  FROM attendencerequesttoadmin arta  INNER JOIN student s ON s.studentid=arta.studentid " +
                        "  LEFT JOIN users u ON arta.requestby=u.userid  WHERE arta.createdby=?   AND arta.batchid=? and arta.studentid= ? ";
            int count =0;        
        try{
            ResultSet rs = DaoUtil.executeQuery(conn, countquery,new Object[]{createdby,batchid,studentid});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{createdby,batchid,studentid});
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        }
      }        
      else
        {
        selectquery="SELECT arta.pid, arta.batchid, arta.studentid, " +
                        "       FROM_UNIXTIME(arta.attendencefromdate/1000,'%d-%m-%Y') attendencefromdate," +
                        "       FROM_UNIXTIME(arta.attendencetodate/1000,'%d-%m-%Y') attendencetodate, " +
                        "       CASE arta.markattendencestatus WHEN 1 THEN 'Present' WHEN 0 THEN 'Absent' END AS attendencestatustext, arta.createdby, arta.modifiedby, arta.createdon, arta.modifiedon, " +
                        "       arta.attendencemarkdate," +
                        "       CASE arta.requeststatus WHEN 0 THEN 'Pending' WHEN 1 THEN 'Complete' WHEN -1 THEN 'Rejected' END AS requeststatustext, " +
                        "       CONCAT(CONCAT(CONCAT(CONCAT(s.fname,' '),s.mname),' '),s.lname) AS studentname," +
                        "       u.name AS requestby , arta.reason" +
                        "  FROM attendencerequesttoadmin arta " +
                        " INNER JOIN student s ON s.studentid=arta.studentid " +
                        "  LEFT JOIN users u ON arta.requestby=u.userid " +
                        " WHERE " +
                        "  arta.batchid=? and arta.requeststatus=0" +
                        "  ORDER BY arta.createdon , arta.modifiedon DESC";
            countquery ="SELECT COUNT(1) as count " +
                        "  FROM attendencerequesttoadmin arta  INNER JOIN student s ON s.studentid=arta.studentid " +
                        "  LEFT JOIN users u ON arta.requestby=u.userid  WHERE arta.batchid=? ";
            int count =0;        
        try{
            ResultSet rs = DaoUtil.executeQuery(conn, countquery,new Object[]{batchid});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{batchid});
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        }  

        return job;
    }

    public int adminEditAtra(Connection conn, AdminAttendance obj) throws ReadableException {

        String insert="INSERT INTO admnreplyatdncerqust(pid,requestid,requeststatus,replytext,createdby) VALUES(?,?,?,?,?)";
        String update="UPDATE attendencerequesttoadmin SET requeststatus = ? WHERE pid = ?";
        int flag=0;
        if(DaoUtil.executeUpdate(conn,update,new Object[]{obj.getRequeststatus(),obj.getPid()})==1)
        {
             String pid = java.util.UUID.randomUUID().toString();
             if(DaoUtil.executeUpdate(conn,insert,new Object[]{pid,obj.getPid(),obj.getRequeststatus(),obj.getReason(),obj.getModifiedby()})==1)
             {
                 flag=1;
                 try {
                     conn.commit();
                 } catch (SQLException ex) {
                     Logger.getLogger(AdminAttendanceDAO.class.getName()).log(Level.SEVERE, null, ex);
                 }
             }
        }
     return flag;        
    }
}
