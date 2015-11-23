/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

import com.dlab.spring.web.dao.AbstractNamedDao;
import com.dlab.spring.web.dao.AbstractSimpleDao;
import com.kjava.base.ReadableException;
import com.kjava.base.db.DaoUtil;
import com.kjava.base.util.ExtJsonUtil;
import com.kjava.base.util.JSONUtil;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.simple.JSONObject;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

/**
 *
 * @author cd
 */
@Repository("misreportDAO")
public class MisReportDAO extends AbstractNamedDao{
   
    JSONUtil jsonUtil = new ExtJsonUtil();

    public Object getAllReportListAsJson(Connection conn,String reporttypeid,int page, int rows) throws ReadableException {
        JSONObject job = null;
        String selectquery= "SELECT id,name,description,iscustomreport ,CASE STATUS WHEN 0 THEN 'Inactive' WHEN 1 THEN 'Active' END AS status, " +
                            " image ,totviews, totdownload, createdby, createdon, modifiedby, modifiedon " +
                            " FROM misreport where reporttype=? LIMIT ? OFFSET ? ";
        int count =0;        
        try{
            ResultSet rs = DaoUtil.executeQuery(conn,"SELECT count(1) as count FROM misreport where reporttype=?",new Object[]{reporttypeid});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{reporttypeid,50,0});
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(MisReportDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;
    }

    public Object getAllClassAttendenceForMonth(Connection conn,String sessionid,String month) throws ReadableException {
      
      JSONObject job = new JSONObject();        
      Collection<JSONObject> items = new ArrayList<JSONObject>();
      int count=0;
      
      String attshetquery ="SELECT atts.sheet_id as sheet_id ,c.name as classname FROM attendance_sheet atts " +
                            " INNER JOIN sessions s ON s.batch_id=atts.batch_id AND session_id=?" +
                            " INNER JOIN class    c ON c.classid =s.class_id " +
                            " WHERE MONTH=?"; 
      String mainquery= this.getMainquery();
      if(month!=null && sessionid!=null){
       
         ResultSet rs=DaoUtil.executeQuery(conn,attshetquery,new Object[]{sessionid,month});
          try {
              while(rs.next()){
                  int sheet_id=rs.getInt("sheet_id");
                  float present=0 , absent=0;
                  JSONObject obj1 =new JSONObject();
                  count++;
                  obj1.put("classname",rs.getString("classname"));
               
                  ResultSet rs1=DaoUtil.executeQuery(conn,mainquery,new Object[]{sheet_id ,sheet_id,sheet_id,sheet_id ,sheet_id,sheet_id,sheet_id ,sheet_id,sheet_id,sheet_id ,sheet_id,sheet_id,sheet_id ,sheet_id,sheet_id,sheet_id ,sheet_id,sheet_id,sheet_id ,sheet_id,sheet_id,sheet_id ,sheet_id,sheet_id,sheet_id ,sheet_id,sheet_id,sheet_id ,sheet_id,sheet_id,sheet_id});
                  while(rs1.next()){
                    if(rs1.getObject("status")!=null)
                    {
                       if(rs1.getString("status").equals("P"))
                       {
                           if(rs1.getObject("cnt")!=null)   
                            present=rs1.getInt("cnt");
                       }
                       else{
                           if(rs1.getObject("cnt")!=null)   
                               absent=rs1.getInt("cnt");
                       } 
                    }  
                  }                    
                 obj1.put("present",present);   
                 obj1.put("absent",absent);
                 if(present==0 && absent==0)
                 obj1.put("percent",0);    
                 else    
                 obj1.put("percent",present/(present+absent)*100);
                 items.add(obj1); 
              }
              job.put("rows",items); 
              job.put("totalCount",count);

          } catch (SQLException ex) {
              Logger.getLogger(MisReportDAO.class.getName()).log(Level.SEVERE, null, ex);
          }
       } 
    
      return job;
    }
    
    
    
    public Object getAllAttendenceReportListAsJson(Connection conn,String sessionid,String classid, int i, int i0) throws ReadableException {
        
        JSONObject job = new JSONObject();        
        Collection<JSONObject> items = new ArrayList<JSONObject>();
        int count=0;
        
        String month_name[]={"Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"};
        if(sessionid.equalsIgnoreCase(""))sessionid=null;
        if(classid.equalsIgnoreCase(""))classid=null;
        String mainqueyry=this.getMainquery();
        if(sessionid !=null && classid !=null){
            try {
                String batchid=new GetBatch(classid, sessionid).BatchId(conn);
                String allmonthsheet="SELECT asht.sheet_id,asht.month , c.name  FROM attendance_sheet AS asht  JOIN sessions s ON s.batch_id=asht.batch_id JOIN class    c ON c.classid=s.class_id WHERE asht.batch_id= ? ";
                ResultSet rs=DaoUtil.executeQuery(conn,allmonthsheet,new Object[]{batchid});

                while(rs.next()){
                  
                  int sheet_id=rs.getInt("sheet_id");
                  float present=0 , absent=0;
                  String month=rs.getString("month");
                  JSONObject obj1 =new JSONObject();
                  count++;
                  obj1.put("month",month);
                  obj1.put("classname",rs.getString("name"));
                  ResultSet rs1=DaoUtil.executeQuery(conn, mainqueyry,new Object[]{sheet_id,sheet_id,sheet_id,sheet_id,sheet_id,
                                                                                   sheet_id,sheet_id,sheet_id,sheet_id,sheet_id,
                                                                                   sheet_id,sheet_id,sheet_id,sheet_id,sheet_id,
                                                                                   sheet_id,sheet_id,sheet_id,sheet_id,sheet_id,
                                                                                   sheet_id,sheet_id,sheet_id,sheet_id,sheet_id,
                                                                                   sheet_id,sheet_id,sheet_id,sheet_id,sheet_id,sheet_id 
                                                                          });
                    
                  while(rs1.next()){
                    if(rs1.getObject("status")!=null)
                    {
                       if(rs1.getString("status").equals("P"))
                       {
                           if(rs1.getObject("cnt")!=null)   
                            present=rs1.getInt("cnt");
                       }
                       else{
                           if(rs1.getObject("cnt")!=null)   
                               absent=rs1.getInt("cnt");
                       } 
                    }  
                  }                    
                 obj1.put("present",present);   
                 obj1.put("absent",absent);
                 if(present==0 && absent==0)
                 obj1.put("percentage",0);    
                 else    
                 obj1.put("percentage",present/(present+absent)*100);
                 items.add(obj1);
                }
              job.put("rows",items); 
              job.put("totalCount",count);
            } catch (SQLException ex) {
                Logger.getLogger(MisReportDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
        } 
                
        return job;
    }
    
    public String getMainquery(){
        
        String query="SELECT att_data.sheet_id as sheet_id , att_data.stats as status ,SUM(cnt) as cnt  FROM " +
"(SELECT sheet_Id ,d1 AS stats , COUNT(1) AS cnt FROM monthly_attendance WHERE sheet_id=? AND d1 IS NOT NULL GROUP BY d1 " +
"UNION ALL " +
"SELECT sheet_Id ,d2 AS stats , COUNT(1) AS cnt FROM monthly_attendance WHERE sheet_id=? AND d2 IS NOT NULL GROUP BY d2 " +
"UNION ALL " +
"SELECT sheet_Id ,d3 AS stats , COUNT(1) AS cnt FROM monthly_attendance WHERE sheet_id=? AND d3 IS NOT NULL GROUP BY d3 " +
"UNION ALL " +
"SELECT sheet_Id ,d4 AS stats , COUNT(1) AS cnt FROM monthly_attendance WHERE sheet_id=? AND d4 IS NOT NULL GROUP BY d4 " +
"UNION ALL " +
"SELECT sheet_Id ,d5 AS stats , COUNT(1) AS cnt FROM monthly_attendance WHERE sheet_id=? AND d5 IS NOT NULL GROUP BY d5 " +
"UNION ALL " +
"SELECT sheet_Id ,d6 AS stats , COUNT(1) AS cnt FROM monthly_attendance WHERE sheet_id=? AND d6 IS NOT NULL GROUP BY d6 " +
"UNION ALL " +
"SELECT sheet_Id ,d7 AS stats , COUNT(1) AS cnt FROM monthly_attendance WHERE sheet_id=? AND d7 IS NOT NULL GROUP BY d7 " +
"UNION ALL " +
"SELECT sheet_Id ,d8 AS stats , COUNT(1) AS cnt FROM monthly_attendance WHERE sheet_id=? AND d8 IS NOT NULL GROUP BY d8 " +
"UNION ALL " +
"SELECT sheet_Id ,d9 AS stats , COUNT(1) AS cnt FROM monthly_attendance WHERE sheet_id=? AND d9 IS NOT NULL GROUP BY d9 " +
"UNION ALL " +
"SELECT sheet_Id ,d10 AS stats , COUNT(1) AS cnt FROM monthly_attendance WHERE sheet_id=? AND d10 IS NOT NULL GROUP BY d10 " +
"UNION ALL " +
"SELECT sheet_Id ,d11 AS stats , COUNT(1) AS cnt FROM monthly_attendance WHERE sheet_id=? AND d11 IS NOT NULL GROUP BY d11 " +
"UNION ALL " +
"SELECT sheet_Id ,d12 AS stats , COUNT(1) AS cnt FROM monthly_attendance WHERE sheet_id=? AND d12 IS NOT NULL GROUP BY d12 " +
"UNION ALL " +
"SELECT sheet_Id ,d13 AS stats , COUNT(1) AS cnt FROM monthly_attendance WHERE sheet_id=? AND d13 IS NOT NULL GROUP BY d13 " +
"UNION ALL " +
"SELECT sheet_Id ,d14 AS stats , COUNT(1) AS cnt FROM monthly_attendance WHERE sheet_id=? AND d14 IS NOT NULL GROUP BY d14 " +
"UNION ALL " +
"SELECT sheet_Id ,d15 AS stats , COUNT(1) AS cnt FROM monthly_attendance WHERE sheet_id=? AND d15 IS NOT NULL GROUP BY d15 " +
"UNION ALL " +
"SELECT sheet_Id ,d16 AS stats , COUNT(1) AS cnt FROM monthly_attendance WHERE sheet_id=? AND d16 IS NOT NULL GROUP BY d16 " +
"UNION ALL " +
"SELECT sheet_Id ,d17 AS stats , COUNT(1) AS cnt FROM monthly_attendance WHERE sheet_id=? AND d17 IS NOT NULL GROUP BY d17 " +
"UNION ALL " +
"SELECT sheet_Id ,d18 AS stats , COUNT(1) AS cnt FROM monthly_attendance WHERE sheet_id=? AND d18 IS NOT NULL GROUP BY d19 " +
"UNION ALL " +
"SELECT sheet_Id ,d19 AS stats , COUNT(1) AS cnt FROM monthly_attendance WHERE sheet_id=? AND d19 IS NOT NULL GROUP BY d19 " +
"UNION ALL " +
"SELECT sheet_Id ,d20 AS stats , COUNT(1) AS cnt FROM monthly_attendance WHERE sheet_id=? AND d20 IS NOT NULL GROUP BY d20 " +
"UNION ALL " +
"SELECT sheet_Id ,d21 AS stats , COUNT(1) AS cnt FROM monthly_attendance WHERE sheet_id=? AND d21 IS NOT NULL GROUP BY d21 " +
"UNION ALL " +
"SELECT sheet_Id ,d22 AS stats , COUNT(1) AS cnt FROM monthly_attendance WHERE sheet_id=? AND d22 IS NOT NULL GROUP BY d22 " +
"UNION ALL " +
"SELECT sheet_Id ,d23 AS stats , COUNT(1) AS cnt FROM monthly_attendance WHERE sheet_id=? AND d23 IS NOT NULL GROUP BY d23 " +
"UNION ALL " +
"SELECT sheet_Id ,d24 AS stats , COUNT(1) AS cnt FROM monthly_attendance WHERE sheet_id=? AND d24 IS NOT NULL GROUP BY d24 " +
"UNION ALL " +
"SELECT sheet_Id ,d25 AS stats , COUNT(1) AS cnt FROM monthly_attendance WHERE sheet_id=? AND d25 IS NOT NULL GROUP BY d25 " +
"UNION ALL " +
"SELECT sheet_Id ,d26 AS stats , COUNT(1) AS cnt FROM monthly_attendance WHERE sheet_id=? AND d16 IS NOT NULL GROUP BY d26 " +
"UNION ALL " +
"SELECT sheet_Id ,d27 AS stats , COUNT(1) AS cnt FROM monthly_attendance WHERE sheet_id=? AND d27 IS NOT NULL GROUP BY d27 " +
"UNION ALL " +
"SELECT sheet_Id ,d28 AS stats , COUNT(1) AS cnt FROM monthly_attendance WHERE sheet_id=? AND d28 IS NOT NULL GROUP BY d28 " +
"UNION ALL " +
"SELECT sheet_Id ,d29 AS stats , COUNT(1) AS cnt FROM monthly_attendance WHERE sheet_id=? AND d29 IS NOT NULL GROUP BY d29 " +
"UNION ALL " +
"SELECT sheet_Id ,d30 AS stats , COUNT(1) AS cnt FROM monthly_attendance WHERE sheet_id=? AND d30 IS NOT NULL GROUP BY d30 " +
"UNION ALL " +
"SELECT sheet_Id ,d31 AS stats , COUNT(1) AS cnt FROM monthly_attendance WHERE sheet_id=? AND d30 IS NOT NULL GROUP BY d31 " +
") att_data WHERE att_data.stats IS NOT NULL GROUP BY att_data.stats";
     
     return query;   
        
    }

    public Object getAllPaymentReportListAsJson(Connection conn, String sessionid, String classid, int i, int i0) throws ReadableException {
        
        
        String batchid=new GetBatch(classid, sessionid).BatchId(conn);
        JSONObject job = null;
        String selectquery= "SELECT SUM(g.amount) AS tot_amount,SUM(g.paid_amount) AS tot_received ,(SUM(g.amount)  - SUM(g.paid_amount)) AS tot_pending," +
                            "       SUM(g.paid_amount)/SUM(g.amount)*100 AS percent," +
                            "       CASE g.for_month " +
                            "       WHEN 1 THEN 'Jan' WHEN 2 THEN 'Feb' WHEN 3 THEN 'Mar' " +
                            "       WHEN 4 THEN 'Apr' WHEN 5 THEN 'May' WHEN 6 THEN 'Jun' " +
                            "       WHEN 7 THEN 'Jul' WHEN 8 THEN 'Aug' WHEN 9 THEN 'Sep' " +
                            "       WHEN 10 THEN 'Oct' WHEN 11 THEN 'Nov' " +
                            "       WHEN 12 THEN 'Dec' END AS month " +
                            " FROM generatemonthlyfee g " +
                            "       INNER JOIN sessions  s ON   s.batch_id=g.class_id " +
                            "       INNER JOIN class     c ON   c.classid =s.class_id " +
                            "       INNER JOIN templates t ON   t.id      =s.template_id " +
                            "       INNER JOIN master    m ON   m.id      =g.for_year    " +
                            " WHERE g.for_year = ?  AND g.class_id = ?  GROUP BY for_month  ORDER BY  g.for_month";
                String countquery= "SELECT count(1) as count " +
                            " FROM generatemonthlyfee g " +
                            "       INNER JOIN sessions  s ON   s.batch_id=g.class_id " +
                            "       INNER JOIN class     c ON   c.classid =s.class_id " +
                            "       INNER JOIN templates t ON   t.id      =s.template_id " +
                            "       INNER JOIN master    m ON   m.id      =g.for_year    " +
                            " WHERE g.for_year = ?  AND g.class_id = ?  GROUP BY for_month  ORDER BY  g.for_month";
        
        int count =0;        
        try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery,new Object[]{sessionid,batchid});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{sessionid,batchid});
            job = jsonUtil.getJsonObject(rs, count, 1,15, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(MisReportDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;
    }
    
    public Object getMonthlyPaymentReportListAsJson(Connection conn, String sessionid, int month, int i, int i0) throws ReadableException {

        JSONObject job = null;
        String selectquery= "SELECT c.name AS classname ,SUM(g.amount) AS tot_amount,SUM(g.paid_amount) AS tot_received ," +
                            "       (SUM(g.amount)  - SUM(g.paid_amount)) AS tot_pending," +
                            "       SUM(g.paid_amount)/SUM(g.amount)*100 AS percent " +
                            " FROM generatemonthlyfee g " +
                            "       INNER JOIN sessions  s ON   s.batch_id=g.class_id " +
                            "       INNER JOIN class     c ON   c.classid =s.class_id " +
                            "       INNER JOIN templates t ON   t.id      =s.template_id " +
                            "       INNER JOIN master    m ON   m.id      =g.for_year    " +
                            " WHERE g.for_year = ?   AND g.for_month= ? GROUP BY g.class_id  ORDER BY  g.for_month";
        String countquery= "SELECT count(1) as count " +
                            " FROM generatemonthlyfee g " +
                            "       INNER JOIN sessions  s ON   s.batch_id=g.class_id " +
                            "       INNER JOIN class     c ON   c.classid =s.class_id " +
                            "       INNER JOIN templates t ON   t.id      =s.template_id " +
                            "       INNER JOIN master    m ON   m.id      =g.for_year    " +
                            " WHERE g.for_year = ?   AND g.for_month= ? GROUP BY g.class_id  ORDER BY  g.for_month";
        
        int count =0;        
        try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery,new Object[]{sessionid,month});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{sessionid,month});
            job = jsonUtil.getJsonObject(rs, count, 1,15, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(MisReportDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;

        
    }

    public Object getClassReportListAsJson(Connection conn, String sessionid) throws ReadableException {
        JSONObject job = null;
        String selectquery= "SELECT m.value AS sessionname ,s.batchname,c.name AS classname ,u.name AS classteacher, " +
                            "      (SELECT COUNT(1) FROM student_class_map scm WHERE scm.batch_id=s.batch_id) AS totalstudent, " +
                            "      (SELECT COUNT(1) FROM student_class_map scm WHERE scm.batch_id=s.batch_id AND resultstatus=1) AS totalpassstudent, " +
                            "      (SELECT COUNT(1) FROM student_class_map scm WHERE scm.batch_id=s.batch_id AND resultstatus=0) AS totalfailedstudent " +
                            "  FROM sessions   s " +
                            " INNER JOIN  master m ON m.id=s.session_id       " +
                            " INNER JOIN  class  c ON c.classid=s.class_id " +
                            "  LEFT JOIN  users  u ON u.userid=s.class_teacher " +
                            " WHERE session_id=?";
        
        String countquery=  "SELECT COUNT(1) as count " +
                            "  FROM sessions   s " +
                            " INNER JOIN  master m ON m.id=s.session_id " +
                            " INNER JOIN  class  c ON c.classid=s.class_id " +
                            "  LEFT JOIN  users  u ON u.userid=s.class_teacher " +
                            " WHERE session_id=?";
        
        int count =0;        
        try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery,new Object[]{sessionid});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{sessionid});
            job = jsonUtil.getJsonObject(rs, count, 1,50, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(MisReportDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;
    }

    public Object getDashboardReport(Connection conn, String sessionid) throws ReadableException {

        
        JSONObject job = new JSONObject();
        int count=0;
        Collection<JSONObject> items = new ArrayList<JSONObject>();
        String selectquery="SELECT s.batch_id , c.name AS name ,u.name as classteacher FROM sessions s JOIN class c ON c.classid=s.class_id  JOIN users u ON u.userid=s.class_teacher WHERE s.session_id=? ";
        String countquery="SELECT COUNT(1) AS count FROM student_Class_map WHERE batch_id=?";
        try{
            ResultSet rs= DaoUtil.executeQuery(conn,selectquery,new Object[]{sessionid});
            if(rs!=null) {
            while(rs.next()) {     
               JSONObject obj =new JSONObject();  
               obj.put("name",rs.getString("name"));
               obj.put("classteacher",rs.getString("classteacher"));
               ResultSet rs1=DaoUtil.executeQuery(conn,countquery,new Object[]{rs.getString("batch_id")});     
               if(rs1!=null && rs1.next())
               obj.put("tot_stud",rs1.getInt("count"));
               items.add(obj);
               count++;
            } 
            }
           job.put("totalCount",count);
           job.put("rows",items);
        }
        catch (SQLException ex) {
            Logger.getLogger(MisReportDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;
        
    }

    public Object getAuditTrialReport(Connection conn) throws ReadableException {
        JSONObject job = null;
        String selectquery= "SELECT COUNT(DISTINCT userid) AS tot_user , FROM_UNIXTIME(ts/1000,'%d-%M-%Y') AS v_date  FROM audittrail WHERE FROM_UNIXTIME(ts/1000) >  DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY) GROUP BY FROM_UNIXTIME(ts/1000,'%d-%m-%Y')";
        String countquery=  "SELECT COUNT(1) as count FROM (SELECT COUNT(DISTINCT userid) AS v_count , FROM_UNIXTIME(ts/1000,'%d-%M-%Y') AS v_date  FROM audittrail WHERE FROM_UNIXTIME(ts/1000) >  DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY) GROUP BY FROM_UNIXTIME(ts/1000,'%d-%m-%Y')) dat";
        
        int count =0;        
        try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery);
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery);
            job = jsonUtil.getJsonObject(rs, count, 1,50, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(MisReportDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;
    }

    public Object getAllClassAttendenceForDaily(Connection conn, String sessionid, String month, int colfield) throws ReadableException {
        JSONObject job = null;
        String selectquery= "";
        String countquery=  "";
        
        if(colfield!=0){
            countquery="SELECT COUNT(1) AS COUNT FROM (SELECT atts.batch_id ,COUNT(CASE ma.d"+ colfield +" WHEN 'P' THEN 1 END) AS present , COUNT(CASE ma.d"+colfield+" WHEN 'A' THEN 1 END) AS absent ,COUNT(ma.student_id) AS tot  FROM attendance_sheet atts,  monthly_attendance ma  WHERE atts.month =?   AND ma.sheet_id=atts.sheet_id GROUP BY atts.batch_id) dat  JOIN sessions s ON (s.batch_id=dat.batch_id AND s.session_id=?)  JOIN class    c ON c.classid=s.class_id";
            selectquery="SELECT dat.*,(dat.present/dat.total)*100 AS percent , c.name AS classname FROM (SELECT atts.batch_id ,COUNT(CASE ma.d"+colfield+" WHEN 'P' THEN 1 END) AS present , COUNT(CASE ma.d"+colfield+" WHEN 'A' THEN 1 END) AS absent ,COUNT(ma.student_id) AS total  FROM attendance_sheet atts,  monthly_attendance ma  WHERE atts.month =?   AND ma.sheet_id=atts.sheet_id GROUP BY atts.batch_id) dat  JOIN sessions s ON (s.batch_id=dat.batch_id AND s.session_id=?)  JOIN class    c ON c.classid=s.class_id";
        }
        
        int count =0;        
        try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery,new Object[]{month,sessionid});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{month,sessionid});
            job = jsonUtil.getJsonObject(rs, count, 1,50, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(MisReportDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;
    }

    public Object getListofAbsentStudentForDaily(Connection conn, String batchid, String sessionid, String month, int colfield) throws ReadableException {

        JSONObject job = null;
        String selectquery= "";
        String countquery=  "";
        
        if(colfield!=0){
            countquery="SELECT COUNT(1) AS count FROM attendance_sheet atts, monthly_attendance ma,student s  WHERE atts.month =?  AND ma.sheet_id=atts.sheet_id   AND atts.batch_id=?  AND s.studentid=ma.student_id AND ma.d"+colfield+"='A'";
            selectquery="SELECT CONCAT(CONCAT(CONCAT(CONCAT(fname,' '),CASE WHEN mname IS NULL THEN '' ELSE mname END),' '),lname) AS student, s.addmission_no as admissionno  FROM attendance_sheet atts, monthly_attendance ma,student s  WHERE atts.month =?  AND ma.sheet_id=atts.sheet_id   AND atts.batch_id=?  AND s.studentid=ma.student_id AND ma.d"+colfield+"='A'";
        }
        
        int count =0;        
        try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery,new Object[]{month,batchid});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{month,batchid});
            job = jsonUtil.getJsonObject(rs, count, 1,50, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(MisReportDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;
        
        
    }

    public Object getStudentYearlyPaymentReport(Connection conn, String sessionid, String classid) throws ReadableException {
        JSONObject job = new JSONObject();
        int count=0;
        Collection<JSONObject> items = new ArrayList<JSONObject>();
        String batchid=new GetBatch(classid, sessionid).BatchId(conn);
        String selectquery="SELECT gmf.student_id,s.addmission_no  as admissionno ,CONCAT(CONCAT(CONCAT(CONCAT(s.fname,' '),CASE WHEN s.mname IS NULL THEN '' ELSE s.mname END),' '),s.lname) AS studentname,       gmf.for_month, gmf.amount AS amount, CASE WHEN gmf.paid_status=0 THEN 'Pending' WHEN gmf.paid_status=1 THEN 'Paid' END  AS paid_status,gmf.paid_amount AS paid_amount  FROM generatemonthlyfee gmf   JOIN student s ON s.studentid=gmf.student_id    WHERE gmf.class_id=? ORDER BY gmf.student_id , gmf.for_month";
        String []month=new String[]{"jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"};
        try{
            ResultSet rs= DaoUtil.executeQuery(conn,selectquery,new Object[]{batchid});
            int i=0;
            boolean flag=false;
            String curr_student_id=new String();
            String prev_student_id=new String();
            JSONObject obj=new JSONObject();  
            if(rs!=null) {
            while(rs.next()) {
               
               curr_student_id=rs.getString("student_id");
               if(!curr_student_id.equals(prev_student_id)){
                  if(flag) {
                  items.add(obj);
                  count++;
                  } 
                  obj =new JSONObject();  
                  obj.put("student_id",curr_student_id);
                  obj.put("studentname",rs.getString("studentname"));
                  obj.put("admissionno",rs.getString("admissionno"));
                  int index=rs.getInt("for_month");
                  obj.put(month[index-1]+"_totfee",rs.getString("amount"));
                  obj.put(month[index-1]+"_paidfee",rs.getString("paid_amount"));
                  obj.put(month[index-1]+"_status",rs.getString("paid_status"));
                  
               }else{
                  if(rs.getObject("for_month")!=null){
                     int index=rs.getInt("for_month");
                     obj.put(month[index-1]+"_totfee",rs.getString("amount"));
                     obj.put(month[index-1]+"_paidfee",rs.getString("paid_amount"));
                     obj.put(month[index-1]+"_status",rs.getString("paid_status"));
                     flag=true;
                  }
               }
               prev_student_id=curr_student_id;
            } 
            }
           job.put("totalCount",count);
           job.put("rows",items);
        }
        catch (SQLException ex) {
            Logger.getLogger(MisReportDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;
    }

    
    public Object getExamReportAnalysisData(Connection conn, String sessionid, String examtypeid) throws ReadableException {
        JSONObject job = null;
        String selectquery= "SELECT c.classid AS classid ,c.name AS classname , dat2.avgpercent AS percent , u.name AS classteacher , dat2.totstudent ,dat2.topper , dat2.low   FROM class c JOIN sessions s ON s.class_id=c.classid JOIN users u ON u.userid=s.class_teacher   JOIN (SELECT dat1.classid AS batchid, SUM(dat1.percent)/COUNT(dat1.studentid) avgpercent , COUNT(dat1.studentid) AS totstudent , MAX(dat1.percent) topper , MIN(dat1.percent) low FROM (SELECT dat.classid , dat.studentid , SUM(maxmark) , SUM(markobtained) , COUNT(subjectid) , (SUM(markobtained)/SUM(maxmark))*100 AS percent   FROM  (SELECT se.classid ,se.studentid,se.markobtained , se.subjectid , ce.maxmark     FROM studentexam se   JOIN classexam ce ON ce.id=se.classexamid  WHERE se.sessionid=?    AND se.examtypeid=?) dat    GROUP BY dat.classid,dat.studentid) dat1 GROUP BY dat1.classid) dat2 ON s.batch_id=dat2.batchid ";
        String countquery=  "SELECT COUNT(1) AS count   FROM class c JOIN sessions s ON s.class_id=c.classid JOIN users u ON u.userid=s.class_teacher   JOIN (SELECT dat1.classid AS batchid, SUM(dat1.percent)/COUNT(dat1.studentid) avgpercent , COUNT(dat1.studentid) AS totstudent , MAX(dat1.percent) topper , MIN(dat1.percent) low FROM (SELECT dat.classid , dat.studentid , SUM(maxmark) , SUM(markobtained) , COUNT(subjectid) , (SUM(markobtained)/SUM(maxmark))*100 AS percent   FROM  (SELECT se.classid ,se.studentid,se.markobtained , se.subjectid , ce.maxmark     FROM studentexam se   JOIN classexam ce ON ce.id=se.classexamid  WHERE se.sessionid=?    AND se.examtypeid=?) dat    GROUP BY dat.classid,dat.studentid) dat1 GROUP BY dat1.classid) dat2 ON s.batch_id=dat2.batchid";
        
        int count =0;        
        try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery,new Object[]{sessionid,examtypeid});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{sessionid,examtypeid});
            job = jsonUtil.getJsonObject(rs, count, 1,500, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(MisReportDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;
    }

    public Object getExamReportAnalysisSubjectWiseData(Connection conn, String sessionid, String examtypeid, String classid) throws ReadableException {
        JSONObject job = null;
        String selectquery= "SELECT m.value AS subjectname ,u.name AS subjectteacher ,dat2.topperno , dat2.lowno , dat2.outof , dat2.percent      FROM classsubjectteacher cst   JOIN master m ON cst.subjectid=m.id AND m.propertyid=2 AND cst.batchid=?   JOIN users  u ON u.userid=cst.teacherid   JOIN (SELECT dat.subjectid ,MAX(markobtained) topperno, MAX(maxmark) outof, MIN(markobtained) lowno,SUM(dat.markobtained) , SUM(dat.maxmark) ,(SUM(dat.markobtained)/SUM(dat.maxmark))*100 AS percent FROM (SELECT se.studentid,se.markobtained , se.subjectid , ce.maxmark    FROM studentexam se  JOIN classexam ce ON ce.id=se.classexamid  WHERE se.sessionid=?    AND se.examtypeid=?    AND se.classid=?) dat GROUP BY dat.subjectid ) dat2 ON  dat2.subjectid=cst.subjectid  ";
        String countquery=  "SELECT COUNT(1) AS count      FROM classsubjectteacher cst   JOIN master m ON cst.subjectid=m.id AND m.propertyid=2 AND cst.batchid=?   JOIN users  u ON u.userid=cst.teacherid   JOIN (SELECT dat.subjectid ,MAX(markobtained) topperno, MAX(maxmark) lowno, MIN(markobtained) outof,SUM(dat.markobtained) , SUM(dat.maxmark) ,(SUM(dat.markobtained)/SUM(dat.maxmark))*100 AS percent FROM (SELECT se.studentid,se.markobtained , se.subjectid , ce.maxmark    FROM studentexam se  JOIN classexam ce ON ce.id=se.classexamid  WHERE se.sessionid=?    AND se.examtypeid=?    AND se.classid=?) dat GROUP BY dat.subjectid ) dat2 ON  dat2.subjectid=cst.subjectid ";
        String batchid=new GetBatch(classid, sessionid).BatchId(conn);
        int count =0;        
        try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery,new Object[]{batchid,sessionid,examtypeid,batchid});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{batchid,sessionid,examtypeid,batchid});
            job = jsonUtil.getJsonObject(rs, count, 1,500, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(MisReportDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;        
    }

    public Object getColumnListForModule(Connection conn, String moduleid , String reportid) throws ReadableException {

        JSONObject job = null;
        String selectquery= "SELECT rcm.moduleid , rcm.id,rcm.columnid , rcm.columnname , rcr.included as includeme FROM report_customreport rcr RIGHT JOIN report_modulecolumnmap rcm ON rcr.columnid=rcm.id AND rcr.reportid=? WHERE rcm.showtouser=1 AND rcm.moduleid=? ORDER BY rcm.columnid";
        String countquery=  "SELECT COUNT(1) as count FROM report_customreport rcr RIGHT JOIN report_modulecolumnmap rcm ON rcr.columnid=rcm.id AND rcr.reportid=? WHERE rcm.showtouser=1 AND rcm.moduleid=?  ORDER BY rcm.columnid ";
        int count =0;        
        try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery,new Object[]{reportid,moduleid});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{reportid,moduleid});
            job = jsonUtil.getJsonObject(rs, count, 1,500, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(MisReportDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;                
    }

    public Map<String, Object> addCustomReport(Connection conn, Map<String, Object> model) throws ReadableException {
        //logger.debug("Paaram:"+model);
        String query="";
        if(conn!=null && model!=null)    {
        
        if(model.get("reportid")==null || model.get("reportid").toString().equals(""))    
           query = this.sqlQueries.getProperty("ADD_CUSTOM_REPORT"); 
        else
            query = this.sqlQueries.getProperty("EDIT_CUSTOM_REPORT");  

        if(this.jdbcTemplate.update(query, model) > 0) {
            model.put("result", 1);
        }else
            model.put("result", 0);
  
        }
        return model;
    }

    public Object getCustomReportList(Connection conn) throws ReadableException {

        JSONObject job = null;
        String selectquery= this.sqlQueries.getProperty("GET_CUSTOM_REPORT"); 
        String countquery=  this.sqlQueries.getProperty("GET_CUSTOM_REPORT_COUNT"); 
        int count =0;        
        try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery);
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery);
            job = jsonUtil.getJsonObject(rs, count, 1,500, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(MisReportDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;                
        
        
    }

    public Map<String, Object>[] addColumnInCustomReport(Connection conn, Map<String, Object>[] model) throws ReadableException 
    {
        
        if(conn!=null && model!=null)    {

         for(int i=0;i<model.length;i++){
            boolean exist=checkColumnExistence(conn,model[i]);
             if(exist && Integer.parseInt(model[i].get("includeme").toString())==0){
                 String deleteQuery=this.sqlQueries.getProperty("DELETE_COLUMN_IN_REPORT");
                 if(this.jdbcTemplate.update(deleteQuery, model[i]) > 0) 
                        model[i].put("result", 1);
                else
                        model[i].put("result", 0);
             }else if(!exist && Integer.parseInt(model[i].get("includeme").toString())==1){
                String insertQuery=this.sqlQueries.getProperty("INSERT_COLUMN_IN_REPORT");
                 if(this.jdbcTemplate.update(insertQuery, model[i]) > 0) 
                        model[i].put("result", 1);
                else
                        model[i].put("result", 0);
             }
         }
     }   
        return model;
    }    
    
    private boolean checkColumnExistence(Connection conn,Map<String, Object> map) throws ReadableException {

        String countquery=  this.sqlQueries.getProperty("CHECK_COLUMN_IN_REPORT"); 
        int count =0; 
        
        try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery,new Object[]{map.get("reportid"),map.get("id")});
            if(rs.next()) {
                count = rs.getInt("count");
            }
        }
        catch (SQLException ex) {
            Logger.getLogger(MisReportDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        if(count==1)
        return true;          
        else
        return false;              
    }     

    public Map<String, Object> addColumnConditionInCustomReport(Connection conn, Map<String, Object> model) {
        
        String query="";
        if(conn!=null && model!=null)    {
        
        if(model.get("conditionid")==null || model.get("conditionid").toString().equals(""))    
           query = this.sqlQueries.getProperty("ADD_REPORT_CONDITION"); 
        else
            query = this.sqlQueries.getProperty("EDIT_REPORT_CONDITION");  

        if(this.jdbcTemplate.update(query, model) > 0) {
            model.put("result", 1);
        }else
            model.put("result", 0);
        }
        return model;
        
    }
    
    public SqlRowSet getCustomReportQueryData(Connection conn,int reportid,String sessiondid,String batchid) throws ReadableException {
        String query = getCustomReportQuery(conn,reportid,sessiondid,batchid);
        
        Map<String, Object> model=new HashMap();
        model.put("sessionid", sessiondid);
        return this.jdbcTemplate.queryForRowSet(query, model);
    }

    private String getCustomReportQuery(Connection conn,int reportid,String sessiondid,String batchid) throws ReadableException {
        String selectfield="Select " , frompart="",whereclause="";
        String query="",basequerycondition="";
        int counter=0;
        /*
        Get Select Field
        */      
        query=this.sqlQueries.getProperty("GET_SELECT_FIELD");  
        ResultSet rs = DaoUtil.executeQuery(conn,query,new Object[]{reportid});
        try {
            while(rs!=null && rs.next()){
            if(rs.getObject("selectfield")!=null)
            selectfield+=rs.getString("selectfield");    
            }
            selectfield= selectfield.substring(0,selectfield.length()-1);/* Remove Lasr comma from select part*/
        } catch (SQLException ex) {
            Logger.getLogger(MisReportDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        /*
        Get From Part
        */      
        query=this.sqlQueries.getProperty("GET_FROM_PART");  
        rs = DaoUtil.executeQuery(conn,query,new Object[]{reportid});
        try {
            if(rs!=null && rs.next()){
                if(rs.getObject("basequery")!=null)
                    frompart=rs.getString("basequery");
                if(rs.getObject("basequerycondition")!=null)
                    basequerycondition=rs.getString("basequerycondition");

            }
            
        } catch (SQLException ex) {
            Logger.getLogger(MisReportDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        /*
        Get Where Clause
        */      
        query=this.sqlQueries.getProperty("GET_WHERE_CLAUSE");  
        rs = DaoUtil.executeQuery(conn,query,new Object[]{reportid});
        try {
            while(rs!=null && rs.next()){
                counter++;
                if(counter==1){
                whereclause=" where (";
                }
                if(counter > 1){
                whereclause+=" or ";
                }
                if(rs.getObject("vcondition")!=null)
                    whereclause+=rs.getString("vcondition");
            }
            whereclause=whereclause+" ) ";
            if(basequerycondition!=null)
            whereclause=whereclause+" and " + basequerycondition;
        } catch (SQLException ex) {
            Logger.getLogger(MisReportDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return selectfield+" "+frompart+whereclause;
    }

    public String getCustomReportName(Connection conn,int reportid) throws ReadableException {
    String reportname="" ;
    
    String query="SELECT name FROM misreport WHERE id=?";  
    ResultSet  rs = DaoUtil.executeQuery(conn,query,new Object[]{reportid});
        try {
            if(rs!=null && rs.next()){
                if(rs.getObject("name")!=null)
                    reportname=rs.getString("name");
            }
            
        } catch (SQLException ex) {
            Logger.getLogger(MisReportDAO.class.getName()).log(Level.SEVERE, null, ex);
     }
    return reportname;
    }
}


