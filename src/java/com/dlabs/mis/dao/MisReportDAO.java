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
import java.util.ArrayList;
import java.util.Collection;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.simple.JSONObject;

/**
 *
 * @author cd
 */
public class MisReportDAO {
   
    JSONUtil jsonUtil = new ExtJsonUtil();

    public Object getAllReportListAsJson(Connection conn,String reporttypeid,int page, int rows) throws ReadableException {
        JSONObject job = null;
        String selectquery= "SELECT id,name,description, CASE STATUS WHEN 0 THEN 'Inactive' WHEN 1 THEN 'Active' END AS status, " +
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
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;
    }

    public Object getAllClassAttendenceForMonth(Connection conn,String sessionid,String month) throws ReadableException {
      
      JSONObject job = new JSONObject();        
      Collection<JSONObject> items = new ArrayList<JSONObject>();
      int count=0;
      month="Jan-2014";
      sessionid="00a24b9a-5bb2-4466-b629-f9d91de9e551";
      
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
        
        String month_name[]={"January","February","March","April","May","June","July","August","September","October","November","December"};
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
                            "       WHEN 1 THEN 'January' WHEN 2 THEN 'February' WHEN 3 THEN 'March' " +
                            "       WHEN 4 THEN 'April' WHEN 5 THEN 'May' WHEN 6 THEN 'June' " +
                            "       WHEN 7 THEN 'July' WHEN 8 THEN 'August' WHEN 9 THEN 'September' " +
                            "       WHEN 10 THEN 'October' WHEN 11 THEN 'November' " +
                            "       WHEN 12 THEN 'December' END AS month " +
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
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;
    }
    
}
