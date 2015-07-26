/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dlabs.mis.dao;

import com.dlabs.mis.model.Timetable;
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
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author cd
 */
public class TimeTableDAO {

    JSONUtil jsonUtil = new ExtJsonUtil();
    public Timetable[] addOrEditTimeTable(Connection conn, Timetable[] tt) throws ReadableException {
        
        int flag=0,x=0;
        String periodid;
        ResultSet rs = null;
      
        
        String query=   "UPDATE  timetable SET	        periodnumber = ? , 	mon_subject  = ? , 	mon_teacher  = ? , " +
                        "	tues_subject = ? , 	tues_teacher = ? , 	wednes_subject  = ? , 	wednes_teacher  = ? , " +
                        "	thurs_subject= ? , 	thurs_teacher= ? , 	fri_subject  = ? , 	fri_teacher  = ? , " +
                        "	satur_subject= ? , 	satur_teacher= ? , 	" +
                        "	mon_comment  = ? ,      tues_comment = ? , 	wednes_comment  = ? ,   thurs_comment  = ? , fri_comment  = ? ,satur_comment  = ? , " +
                        "	createdby    = ? , 	modifiedby   = ? " +
                        " WHERE timetableid = ? AND classid= ?";
        
        try {
        for(x=0;x<tt.length;x++){
             flag=0;
             if(DaoUtil.executeUpdate(conn,query ,new Object[]{tt[x].getPeriodnumber(),tt[x].getMon_subject(),tt[x].getMon_teacher(),
                                                tt[x].getTues_subject(),tt[x].getTues_teacher(),tt[x].getWednes_subject(),
                                                tt[x].getWednes_teacher(),tt[x].getThurs_subject(),tt[x].getThurs_teacher(),
                                                tt[x].getFri_subject(),tt[x].getFri_teacher(),tt[x].getSatur_subject(),tt[x].getSatur_teacher(),
                                                tt[x].getMon_comment(),tt[x].getTues_comment(),tt[x].getWednes_comment(),
                                                tt[x].getThurs_comment(),tt[x].getFri_comment(),tt[x].getSatur_comment(),
                                                tt[x].getCreatedby(),tt[x].getModifiedby(),
                                                tt[x].getTimetableid(),tt[x].getClassid()
                                                              })==1)
                      {
                         flag=1;
                      }

        }
        if(flag==1)
            conn.commit();
        }
        catch (SQLException ex) {
            throw new ReadableException(ex,ex.getMessage(),"TimetableDAO", "addoredit");
        }

        return tt;
    }

    public Object getAllTimeTableAsJson1(Connection conn,String classid,String sessionid,int page, int rows) throws ReadableException {
        JSONObject job = null;
        ResultSet rs = null;
        int count =0;
        String schoolid="1000";
        String batchid = new GetBatch(classid,sessionid).BatchId(conn);
        String query="SELECT 	t.timetableid,t.classid,t.periodnumber ,CONCAT(CONCAT(CONCAT(CONCAT(t.periodnumber,'<br><hr>'),r.starttime),' / '),r.endtime) AS perioddisplay ,t.mon_subject,t.mon_teacher,t.tues_subject,t.tues_teacher, " +
                        "      	t.wednes_subject, t.wednes_teacher, t.thurs_subject, t.thurs_teacher,t.fri_subject, t.fri_teacher," +
                        "     	t.satur_subject, t.satur_teacher, t.monday, t.tuesday, t.wednesday, t.thursday, t.friday, t.mon_comment," +
                        "     	t.tues_comment,	t.wednes_comment, t.thurs_comment, t.fri_comment, 	t.satur_comment, " +
                        "      	t.saturday,t.createdby, t.createdon, 	t.modifiedby, 	t.modifiedon " +
                        "  FROM 	timetable  t INNER JOIN ref_period r ON r.periodnumber=t.periodnumber " +
                        " WHERE  t.classid=? order by r.periodnumber limit ? offset ?";
        
        try{
            //rs = DaoUtil.executeQuery(conn, "SELECT count(1) as count from timetable where schoolid=? and classid=?");
            rs = DaoUtil.executeQuery(conn, "SELECT count(1) as count from timetable where classid=?",new Object[]{batchid});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,query,new Object[]{batchid,15,0});
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(TimeTableDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;
    }

    
    public Object getAllTimeTableAsJson(Connection conn,String classid,String sessionid,int page, int rows) throws ReadableException {
        JSONObject job = new JSONObject();
        Collection<JSONObject> items = new ArrayList<JSONObject>();
        ResultSet rs = null;
        int count =0;
	String mon_subject=null,mon_teacher=null,tues_subject=null,tues_teacher=null,
	wednes_subject=null,wednes_teacher=null,thurs_subject=null,thurs_teacher=null,
        fri_subject=null,fri_teacher=null,satur_subject=null,satur_teacher=null;
        
        
        String batchid = new GetBatch(classid,sessionid).BatchId(conn);         
        String query="SELECT t.timetableid, classid,t.periodnumber,rp.starttime , rp.endtime,mon_subject,mon_teacher," +
                    "       tues_subject,tues_teacher,wednes_subject, " +
                    "       wednes_teacher,thurs_subject,thurs_teacher," +
                    "       fri_subject,fri_teacher,satur_subject,satur_teacher " +
                    " FROM  timetable t " +
                    "INNER JOIN ref_period rp ON t.periodnumber=rp.periodnumber " +
                    "WHERE classid=? order by t.periodnumber ";
        String listquery="SELECT id , VALUE AS name FROM master WHERE propertyid=2 " +
                      "UNION ALL " +
                      "SELECT userid AS id , name FROM users WHERE roleid=3";
        if(batchid!=null){
          
        Map collection= new HashMap();
        collection=new GetBatch().getMapObjectOfQuery(conn,listquery);   
            
        rs=DaoUtil.executeQuery(conn,query,new Object[]{batchid});
        try {
            while(rs.next()){
               JSONObject obj =new JSONObject();
  
               obj.put("timetableid",rs.getString("timetableid"));
               obj.put("classid",rs.getString("classid"));
               obj.put("periodnumber",rs.getString("periodnumber"));
               obj.put("starttime",rs.getString("starttime"));
               obj.put("endtime",rs.getString("endtime"));
               
               if(rs.getObject("mon_subject")!=null)mon_subject=rs.getString("mon_subject");else mon_subject=null;
               if(rs.getObject("mon_teacher")!=null)mon_teacher=rs.getString("mon_teacher");else mon_teacher=null;
               if(rs.getObject("tues_subject")!=null)tues_subject=rs.getString("tues_subject");else tues_subject=null;
               if(rs.getObject("tues_teacher")!=null)tues_teacher=rs.getString("tues_teacher");else tues_teacher=null;
               if(rs.getObject("wednes_subject")!=null)wednes_subject=rs.getString("wednes_subject");else wednes_subject=null;
               if(rs.getObject("wednes_teacher")!=null)wednes_teacher=rs.getString("wednes_teacher");else wednes_teacher=null;
               if(rs.getObject("thurs_subject")!=null)thurs_subject=rs.getString("thurs_subject");else thurs_subject=null;
               if(rs.getObject("thurs_teacher")!=null)thurs_teacher=rs.getString("thurs_teacher");else thurs_teacher=null;
               if(rs.getObject("fri_subject")!=null)fri_subject=rs.getString("fri_subject");else fri_subject=null;
               if(rs.getObject("fri_teacher")!=null)fri_teacher=rs.getString("fri_teacher");else fri_teacher=null;
               if(rs.getObject("satur_subject")!=null)satur_subject=rs.getString("satur_subject");else satur_subject=null;
               if(rs.getObject("satur_teacher")!=null)satur_teacher=rs.getString("satur_teacher");else satur_teacher=null;

               obj.put("mon_subject",mon_subject);
               obj.put("mon_teacher",mon_teacher);
               obj.put("tues_subject",tues_subject);
               obj.put("tues_teacher",tues_teacher);
               obj.put("wednes_subject",wednes_subject);
               obj.put("wednes_teacher",wednes_teacher);
               obj.put("thurs_subject",thurs_subject);
               obj.put("thurs_teacher",thurs_teacher);
               obj.put("fri_subject",fri_subject);
               obj.put("fri_teacher",fri_teacher);
               obj.put("satur_subject",satur_subject);
               obj.put("satur_teacher",satur_teacher);
               
               obj.put("mon_tch_text",collection.get(mon_teacher));
               obj.put("mon_sub_text",collection.get(mon_subject));
               obj.put("tues_tch_text",collection.get(tues_teacher));
               obj.put("tues_sub_text",collection.get(tues_subject));
               obj.put("wednes_tch_text",collection.get(wednes_teacher));
               obj.put("wednes_sub_text",collection.get(wednes_subject));
               obj.put("thurs_tch_text",collection.get(thurs_teacher));
               obj.put("thurs_sub_text",collection.get(thurs_subject));
               obj.put("fri_tch_text",collection.get(fri_teacher));
               obj.put("fri_sub_text",collection.get(fri_subject));
               obj.put("satur_tch_text",collection.get(satur_teacher));
               obj.put("satur_sub_text",collection.get(satur_subject));
               items.add(obj);
               count++;
            }
            job.put("totalCount",count);
            job.put("rows",items);
            
        } catch (SQLException ex) {
            Logger.getLogger(TimeTableDAO.class.getName()).log(Level.SEVERE, null, ex);
        } catch (Exception ex) {
            Logger.getLogger(TimeTableDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        } 
        return job;
    }
    
    public int createTimeTable(Connection conn, Timetable tt) throws ReadableException {

        String insertquery="INSERT INTO timetable (timetableid, classid, periodnumber, createdby,modifiedby, modifiedon)VALUES (?,?,?,?,?,current_date)";
        String selectperiod="SELECT periodnumber FROM ref_period WHERE periodnumber!='PeriodConfig'";
        String checkquery="SELECT COUNT(1) as count FROM timetable WHERE classid= ?";
        String batchid;
        int flag=0;
        try {
            batchid = new GetBatch(tt.getClassid(),tt.getSessionid()).BatchId(conn);
            ResultSet rs = DaoUtil.executeQuery(conn, checkquery,new Object[]{batchid});
            
            while(rs.next()){
                if(rs.getInt("count") > 0){
                   return 2;                
                }
                else{
                    rs = DaoUtil.executeQuery(conn, selectperiod);
                    while(rs.next()){
                        
                         String pid = java.util.UUID.randomUUID().toString();
                         
                         String period=null;
                         if(rs.getObject("periodnumber")!=null)
                             period=rs.getString("periodnumber");
                         DaoUtil.executeUpdate(conn,insertquery,new Object[]{pid,
                                                               batchid,
                                                               period,
                                                               tt.getCreatedby(),
                                                               tt.getModifiedby()
                                                            });
                         flag=1;
                    }
                    
                }
            }
            
            
        } catch (ReadableException ex) {
            Logger.getLogger(TimeTableDAO.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(TimeTableDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        
        
        
        return flag;
    }

    public Object check_Teacher_Availbility(Connection conn, Timetable tt) throws ReadableException {
        JSONObject job = null;
        String countquery="SELECT count(class.name) as count FROM timetable ,sessions , class WHERE timetable.classid=sessions.batch_id " + "   AND sessions.session_id  = ?   AND timetable."+tt.getDay()+" = ?  AND timetable.periodnumber=?   AND class.classid=sessions.class_id";
        String checkquery="SELECT class.name as name FROM timetable ,sessions , class WHERE timetable.classid=sessions.batch_id " + "   AND sessions.session_id  = ?   AND timetable."+tt.getDay()+" = ?  AND timetable.periodnumber=?   AND class.classid=sessions.class_id";
        String classname =null;
        int flag=0;
        ResultSet rs=DaoUtil.executeQuery(conn, countquery,new Object[]{tt.getSessionid(),tt.getTeacherid(),tt.getPeriodnumber()});
        try {
            if(rs.next() && rs.getInt("count") > 0){
            rs=DaoUtil.executeQuery(conn, checkquery,new Object[]{tt.getSessionid(),tt.getTeacherid(),tt.getPeriodnumber()});
            job = jsonUtil.getJsonObject(rs, 1, 15,0, false);
            return job;
            }
        } catch (SQLException ex) {
            Logger.getLogger(TimeTableDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return "0";
    }

    public Object getTeacherTimeTableAsJson(Connection conn, String teacherid, String sessionid, int i, int i0) throws ReadableException {
        
        JSONObject job = new JSONObject();        
        Collection<JSONObject> items = new ArrayList<JSONObject>();

        if(teacherid!=null && sessionid!=null){

         ResultSet rs= DaoUtil.executeQuery(conn,getTeacherTTQuery(),new Object[]{
                                                           sessionid , teacherid,sessionid , teacherid,
                                                           sessionid , teacherid,sessionid , teacherid,
                                                           sessionid , teacherid,sessionid , teacherid
                                                         });
         
         int periodno=getPeriodNumber(conn);
         String[][] arry = new String [periodno*6][3];
         int        size=0;
            try {
                while(rs.next()){
                  if(rs.getObject("period")!=null){
                     arry[size][0]=rs.getString("period");                  
                     if(rs.getObject("val")!=null && rs.getObject("week_day")!=null){
                        arry[size][1]=rs.getString("val");                  
                        arry[size][2]=rs.getString("week_day");                  
                     }   
                  }
                  size++;
                }    
          ResultSet rs2=DaoUtil.executeQuery(conn,"SELECT periodnumber , starttime , endtime FROM ref_period WHERE periodnumber!='PeriodConfig'");
             
            while(rs2.next()){
              JSONObject obj =new JSONObject();
              if(rs2.getObject("periodnumber")!=null){
                String period=rs2.getString("periodnumber");

                //obj.put("periodnumber",period);
                //obj.put("starttime",rs2.getString("starttime"));
                //obj.put("endtime",rs2.getString("endtime"));
                
                obj.put("perioddisplay",period+ "<hr>" + rs2.getString("starttime")+"/"+rs2.getString("endtime"));  
                for(int x=0;x<size;x++){
               
                   if(period.equals(arry[x][0])) 
                   {
                     if(arry[x][2]!=null && arry[x][2].equals("Monday") && arry[x][1]!=null)
                        obj.put("monday",arry[x][1]);
                     else if(arry[x][2]!=null && arry[x][2].equals("Tuesday")&& arry[x][1]!=null)
                        obj.put("tuesday",arry[x][1]);
                     else if(arry[x][2]!=null && arry[x][2].equals("Wednesday")&& arry[x][1]!=null)
                        obj.put("wednesday",arry[x][1]);
                     else if(arry[x][2]!=null && arry[x][2].equals("Thursday")&& arry[x][1]!=null)
                        obj.put("thursday",arry[x][1]);
                     else if(arry[x][2]!=null && arry[x][2].equals("Friday")&& arry[x][1]!=null)   
                        obj.put("friday",arry[x][1]);
                     else if(arry[x][2]!=null && arry[x][2].equals("Saturday")&& arry[x][1]!=null)
                        obj.put("saturday",arry[x][1]);
                   } 
                }  
              }  
             items.add(obj); 
             
            }
         job.put("rows",items);
         job.put("totalCount",periodno);         
            } catch (SQLException ex) {
                Logger.getLogger(TimeTableDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
        
        }
        
        
        return job;
    }
    
   public String getTeacherTTQuery(){
     return " SELECT rp.periodnumber AS period ,dat.val AS val, dat.week_day AS week_day " +
            " FROM " +
            "   (" +
            "  SELECT  t.periodnumber ,CONCAT(CONCAT(c.name,'/'),m.value) AS val, 'Monday' AS week_day" +
            "    FROM timetable t  " +
            "    JOIN sessions  s ON s.session_id=? AND s.batch_id=t.classid " +
            "    JOIN class     c ON c.classid   =s.class_id " +
            "    JOIN master    m ON m.id        =t.mon_subject  " +
            "   WHERE mon_teacher=? " +
            "    ) dat  " +
            " RIGHT JOIN ref_period rp ON rp.periodnumber=dat.periodnumber WHERE rp.periodnumber!='PeriodConfig' " +
            " " +
            "UNION ALL  " +
            " " +
            "SELECT rp.periodnumber AS period ,dat.val AS val, dat.week_day AS week_day FROM  " +
            "(SELECT  t.periodnumber ,CONCAT(CONCAT(c.name,'/'),m.value) AS val , 'Tuesday' AS week_day " +
            "  FROM timetable t  " +
            "  JOIN sessions  s ON s.session_id=? AND s.batch_id=t.classid " +
            "  JOIN class     c ON c.classid   =s.class_id " +
            "  JOIN master    m ON m.id        =t.tues_subject  " +
            " WHERE tues_teacher=? " +
            " ) dat  " +
            " RIGHT JOIN ref_period rp ON rp.periodnumber=dat.periodnumber  " +
            " WHERE rp.periodnumber!='PeriodConfig' " +
            " " +
            "UNION ALL  " +
            " " +
            "SELECT rp.periodnumber AS period , dat.val AS val, dat.week_day AS week_day FROM  " +
            "(SELECT  t.periodnumber ,CONCAT(CONCAT(c.name,'/'),m.value) AS val , 'Wednesday' AS week_day " +
            "  FROM timetable t  " +
            "  JOIN sessions  s ON s.session_id=? AND s.batch_id=t.classid " +
            "  JOIN class     c ON c.classid   =s.class_id " +
            "  JOIN master    m ON m.id        =t.wednes_subject  " +
            "WHERE wednes_teacher=? " +
            " ) dat  " +
            " RIGHT JOIN ref_period rp ON rp.periodnumber=dat.periodnumber  " +
            " WHERE rp.periodnumber!='PeriodConfig' " +
            " " +
            "UNION ALL  " +
            " " +
            "SELECT rp.periodnumber AS period , dat.val AS val, dat.week_day AS week_day FROM  " +
            "(SELECT  t.periodnumber ,CONCAT(CONCAT(c.name,'/'),m.value) AS val , 'Thursday' AS week_day " +
            "  FROM timetable t  " +
            "  JOIN sessions  s ON s.session_id=? AND s.batch_id=t.classid " +
            "  JOIN class     c ON c.classid   =s.class_id " +
            "  JOIN master    m ON m.id        =t.thurs_subject  " +
            " WHERE thurs_teacher=? " +
            " ) dat  " +
            " RIGHT JOIN ref_period rp ON rp.periodnumber=dat.periodnumber  " +
            " WHERE rp.periodnumber!='PeriodConfig' " +
            "  " +
            "UNION ALL  " +
            " " +
            "SELECT rp.periodnumber AS period , dat.val AS val, dat.week_day AS week_day FROM  " +
            "(SELECT  t.periodnumber ,CONCAT(CONCAT(c.name,'/'),m.value) AS val , 'Friday' AS week_day " +
            "  FROM timetable t  " +
            "  JOIN sessions  s ON s.session_id=? AND s.batch_id=t.classid " +
            "  JOIN class     c ON c.classid   =s.class_id " +
            "  JOIN master    m ON m.id        =t.fri_subject  " +
            " WHERE fri_teacher=? " +
            " ) dat  " +
            " RIGHT JOIN ref_period rp ON rp.periodnumber=dat.periodnumber  " +
            " WHERE rp.periodnumber!='PeriodConfig' " +
            " " +
            "UNION ALL  " +
            " " +
            "SELECT rp.periodnumber AS period ,dat.val AS val, dat.week_day AS week_day FROM  " +
            "(SELECT  t.periodnumber ,CONCAT(CONCAT(c.name,'/'),m.value) AS val , 'Saturday' AS week_day " +
            "  FROM timetable t  " +
            "  JOIN sessions  s ON s.session_id=? AND s.batch_id=t.classid " +
            "  JOIN class     c ON c.classid   =s.class_id " +
            "  JOIN master    m ON m.id        =t.satur_subject  " +
            " WHERE satur_teacher=? " +
            " ) dat  " +
            " RIGHT JOIN ref_period rp ON rp.periodnumber=dat.periodnumber  " +
            " WHERE rp.periodnumber!='PeriodConfig'";
   } 
   
  public int getPeriodNumber(Connection conn) throws ReadableException{
   
     int x=0;  
     ResultSet rs=DaoUtil.executeQuery(conn,"SELECT starttime FROM ref_period WHERE periodnumber='PeriodConfig'");
        try {
            if(rs.next()){
               if(rs.getObject("starttime")!=null)
                   x=rs.getInt("starttime");
            }
        } catch (SQLException ex) {
            Logger.getLogger(TimeTableDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
     
    return x;  
   }

}
