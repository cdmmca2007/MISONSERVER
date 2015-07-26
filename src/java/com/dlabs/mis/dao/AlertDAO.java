/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

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

/**
 *
 * @author cd
 */
public class AlertDAO {
    
    JSONUtil jsonUtil = new ExtJsonUtil();

    public Object getAlertJSON(Connection conn, String sessionid, String userid, int i, int i0) throws ReadableException {
        JSONObject job = null;
        GetBatch batchobj=new GetBatch();
        if(sessionid.equalsIgnoreCase(""))sessionid=null;
        if(userid.equalsIgnoreCase(""))userid=null;
        
        String query=getQuery();
        String countquery=getCountQuery();
        
        if(sessionid!=null && userid!=null){
        
        if(batchobj.roleId(conn, userid)==4){    
          String studentid=batchobj.getStudentIdOfParent(conn,userid);  
          String batchid=batchobj.getBatchidForStudent(conn,sessionid,studentid);  
          
          int count =0;        
        try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery,new Object[]{batchid,studentid,batchid,batchid,studentid,batchid,studentid});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,query,new Object[]{batchid,studentid,batchid,batchid,studentid,batchid,studentid});
            job = jsonUtil.getJsonObject(rs, count, 1,15, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        }    
        }
       return job; 
    }
    
    public String getQuery(){
    
              String query="SELECT 'Examination' AS m_name,MIN(FROM_UNIXTIME(examdate/1000,'%d-%m-%Y')) AS alert_name ,m.value AS title, examname AS dsc " +
                    "  FROM classexam c " +
                    "  JOIN master m ON c.examtypeid=m.id " +
                    " WHERE batch_id=? " +
                    "   AND examdate > CURRENT_DATE AND examdate < ADDDATE(SYSDATE(), INTERVAL 31 DAY) " +
                    "UNION ALL " +
                    "SELECT 'Homework' AS m_name ,m.value AS alert_name , title  ,NULL AS dsc " +
                    "  FROM homework h " +
                    "  JOIN master m ON h.subjectid=m.id   " +
                    "  JOIN studenthomeworkstatus hs ON (hs.homeworkid=h.pid AND hs.studentid=? AND hs.status=0)" +
                    " WHERE h.classid=? " +
                    "   AND assigndate >= CURRENT_DATE " +
                    "UNION ALL   " +
                    "SELECT 'Digital Dairy' AS m_name ,m.value AS alert_name, m1.value AS title ,matter AS dsc" +
                    "  FROM studentdairy sd" +
                    "  JOIN master m ON  m.id= sd.subjectid " +
                    "  JOIN master m1 ON m1.id=sd.requesttype " +
                    " WHERE classid=? " +
                    "   AND studentid=? " +
                    "   AND createdon < SYSDATE() " +
                    "   AND createdon > SUBDATE(SYSDATE(), INTERVAL 7 DAY) " +
                    "UNION ALL " +
                    "SELECT 'Fee Payment' AS m_name,CASE for_month WHEN 1 THEN 'January' WHEN 2 THEN 'Feburary'" +
                    "       WHEN 3 THEN 'March' WHEN 4 THEN 'April'               " +
                    "       WHEN 5 THEN 'May' WHEN 6 THEN 'June'              " +
                    "       WHEN 7 THEN 'July' WHEN 8 THEN 'August'           " +
                    "       WHEN 9 THEN 'September' WHEN 10 THEN 'October'      " +
                    "       WHEN 11 THEN 'November' WHEN 12 THEN 'December' END AS alert_name," +
                    "       ADDDATE(createdon, INTERVAL 30 DAY) AS title," +
                    "       NULL  AS dsc                  " +
                    "  FROM generatemonthlyfee " +
                    " WHERE class_id=?"  +
                    "   AND student_id=?" +
                    "   AND paid_status=0 ";

     
      return query;
    }
    public String getCountQuery(){
    
       return "select count(1) as count from (SELECT 'Examination' AS m_name,MIN(FROM_UNIXTIME(examdate/1000,'%d-%m-%Y')) AS alert_name ,m.value AS title, examname AS dsc " +
                    "  FROM classexam c " +
                    "  JOIN master m ON c.examtypeid=m.id " +
                    " WHERE batch_id=? " +
                    "   AND examdate > CURRENT_DATE AND examdate < ADDDATE(SYSDATE(), INTERVAL 31 DAY) " +
                    "UNION ALL " +
                    "SELECT 'Homework' AS m_name ,m.value AS alert_name , title  ,NULL AS dsc " +
                    "  FROM homework h " +
                    "  JOIN master m ON h.subjectid=m.id   " +
                    "  JOIN studenthomeworkstatus hs ON (hs.homeworkid=h.pid AND hs.studentid=? AND hs.status=0)" +
                    " WHERE h.classid=? " +
                    "   AND assigndate >= CURRENT_DATE " +
                    "UNION ALL   " +
                    "SELECT 'Digital Dairy' AS m_name ,m.value AS alert_name, m1.value AS title ,matter AS dsc" +
                    "  FROM studentdairy sd" +
                    "  JOIN master m ON  m.id= sd.subjectid " +
                    "  JOIN master m1 ON m1.id=sd.requesttype " +
                    " WHERE classid=? " +
                    "   AND studentid=? " +
                    "   AND createdon < SYSDATE() " +
                    "   AND createdon > SUBDATE(SYSDATE(), INTERVAL 7 DAY) " +
                    "UNION ALL " +
                    "SELECT 'Fee Payment' AS m_name,CASE for_month WHEN 1 THEN 'January' WHEN 2 THEN 'Feburary'" +
                    "       WHEN 3 THEN 'March' WHEN 4 THEN 'April'               " +
                    "       WHEN 5 THEN 'May' WHEN 6 THEN 'June'              " +
                    "       WHEN 7 THEN 'July' WHEN 8 THEN 'August'           " +
                    "       WHEN 9 THEN 'September' WHEN 10 THEN 'October'      " +
                    "       WHEN 11 THEN 'November' WHEN 12 THEN 'December' END AS alert_name," +
                    "       ADDDATE(createdon, INTERVAL 30 DAY) AS title," +
                    "       NULL  AS dsc                  " +
                    "  FROM generatemonthlyfee " +
                    " WHERE class_id=?"  +
                    "   AND student_id=?" +
                    "   AND paid_status=0 ) data1 ";
       
    }
}
