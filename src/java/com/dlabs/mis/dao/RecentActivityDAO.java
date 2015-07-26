/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

import com.dlabs.mis.model.*;
import com.dlabs.mis.services.AuditTrailService;
import com.dlabs.mis.services.MailService;
import com.dlabs.util.Paging;
import com.kjava.base.ReadableException;
import com.kjava.base.db.DaoUtil;
import com.kjava.base.util.ExtJsonUtil;
import com.kjava.base.util.JSONUtil;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
/**
 *
 * @author cd
 */
public class RecentActivityDAO {
  
  JSONUtil jsonUtil = new ExtJsonUtil();   
    
  public List<StudentActivity> getRecentUpdates(Connection conn, String studentid,String sessionid ,Paging page,boolean self) throws ReadableException {
       List<StudentActivity> list=new ArrayList<StudentActivity>();
       
       String sql = getRecentActivityQuery(); 
       String batchid=new GetBatch().getBatchId(conn, studentid, sessionid);
       ResultSet rs=DaoUtil.executeQuery(conn,sql,new Object[]{batchid , studentid , batchid  ,batchid , studentid ,batchid , studentid ,sessionid});
       
       int i=0;
        try {
            while(rs!=null && rs.next()){
                StudentActivity sa =new StudentActivity();
                
                if(rs.getObject("mod_id")!=null)sa.setActivityType(rs.getInt("mod_id"));
                if(rs.getObject("mod_name")!=null)sa.setActivityname(rs.getString("mod_name"));
                if(rs.getObject("alert_name")!=null)sa.setSubject(rs.getString("alert_name")+" : "+rs.getString("title"));
                if(rs.getObject("dsc")!=null)sa.setComment(rs.getString("dsc"));
                if(rs.getObject("postedon")!=null)sa.setTimestamp(rs.getTimestamp("postedon"));
                if(rs.getObject("postedby")!=null)sa.setUserName(rs.getString("postedby"));
                if(rs.getObject("pid")!=null)sa.setActivityid(rs.getString("pid"));
                if(rs.getObject("img")!=null)sa.setImage(rs.getString("img"));
                ///if(rs.getObject("")!=null)sa.setUserid("19e2e30f-9ada-41fa-95bd-c9d499b88fe2");
                int j=0;
                /*while(j<3){
                    Comment comment = new Comment();
                    comment.setComment("Test comment");
                    comment.setPostId("66666");
                    comment.setReplyId("12345");
                    comment.setUserId("rrrrrrrr");
                    comment.setTimeStamp(new Date().getTime());
                    sa.addPost(comment);
                    j++;
                }*/
                 list.add(sa);
                i++;
            }
        } catch (SQLException ex) {
            Logger.getLogger(RecentActivityDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
       return list;
       
    }
    
   public String getRecentActivityQuery(){
   
     return "SELECT dat.* FROM (SELECT c.id AS pid,'Examination' AS mod_name,1 AS mod_id,MIN(FROM_UNIXTIME(examdate/1000,'%d-%m-%Y')) AS alert_name ,m.value AS title, examname AS dsc, " +
            "       'Exam Head' AS postedby , c.createdon AS postedon , 'classexam.png' as img " +
            "  FROM classexam c " +
            "  JOIN master m ON c.examtypeid=m.id " +
            " WHERE batch_id=? " +
            "   AND examdate > CURRENT_DATE AND examdate < ADDDATE(SYSDATE(), INTERVAL 31 DAY) " +
            "UNION ALL " +
            "SELECT h.pid AS pid,'Homework' AS mod_name,2 AS mod_id ,m.value AS alert_name , title  ,NULL AS dsc ," +
            "       u.name AS postedby , h.createdon AS postedon , 'homework.png' as img  " +
            "  FROM homework h " +
            "  JOIN master m ON h.subjectid=m.id  " +
            "  JOIN users  u ON h.createdby=u.userid " +
            "  JOIN studenthomeworkstatus hs ON (hs.homeworkid=h.pid AND hs.studentid=?   AND hs.status=0) " +
            " WHERE h.classid=? " +
            "   AND assigndate >= CURRENT_DATE " +
            "UNION ALL   " +
            "SELECT sd.pid AS pid,'Digital Dairy' AS mod_name,3 AS mod_id,m.value AS alert_name, m1.value AS title ,matter AS dsc," +
            "       u.name AS postedby , sd.createdon AS postedon , 'studentdairy.png' as img  " +
            "  FROM studentdairy sd " +
            "  JOIN master m ON  m.id= sd.subjectid " +
            "  JOIN master m1 ON m1.id=sd.requesttype " +
            "  JOIN users  u ON sd.createdby=u.userid " +
            " WHERE classid=? " +
            "   AND studentid=? " +
            "   AND sd.createdon < SYSDATE() " +
            "   AND sd.createdon > SUBDATE(SYSDATE(), INTERVAL 7 DAY) " +
            "UNION ALL " +
            "SELECT monthly_fee_id AS pid,'Fee Payment' AS mod_name,4 AS mod_id,CASE for_month WHEN 1 THEN 'January' WHEN 2 THEN 'Feburary' " +
            "       WHEN 3 THEN 'March' WHEN 4 THEN 'April'           " +
            "       WHEN 5 THEN 'May' WHEN 6 THEN 'June'              " +
            "       WHEN 7 THEN 'July' WHEN 8 THEN 'August'           " +
            "       WHEN 9 THEN 'September' WHEN 10 THEN 'October'    " +
            "       WHEN 11 THEN 'November' WHEN 12 THEN 'December' END AS alert_name," +
            "       ADDDATE(createdon, INTERVAL 30 DAY) AS title," +
            "       NULL  AS dsc," +
            "       'Fee Admin' AS postedby , createdon AS postedon , 'feedue.png' as img " +
            "  FROM generatemonthlyfee " +
            " WHERE class_id=? " +
            "   AND student_id=? " +
            "   AND paid_status=0 " +
            " UNION ALL " +
            "SELECT id AS pid,'Notice Board' AS mod_name,5 AS mod_id,title AS alert_name, " +
            "       description AS dsc,NULL AS title,'Notica Board Head' AS postedby , createdon AS postedon , 'notice.png' as img " +
            "  FROM notification " +
            " WHERE recipient IN ('4dc312dd-b923-4e19-9072-8c4844fafae9','72aa52b8-076f-4032-b35c-a441009725da') " +
            "   AND sessionid=? " +
            "   AND CURRENT_DATE >= FROM_UNIXTIME(activatedate/1000) " +
            "   AND CURRENT_DATE < FROM_UNIXTIME(endactivatedate/1000)) dat ORDER BY dat.postedon DESC";

   }    

    public String setCommentOnRecentUpdatesOfParent(Connection conn, String commentedbyId, String refid, String comment) throws ReadableException  {
        String res = "{Success:false}";
        String query="INSERT INTO recentactivitycommomtab (pid, refid, COMMENT, commentedby) VALUES(?,?,?,?)";
        String id = java.util.UUID.randomUUID().toString();
        if(DaoUtil.executeUpdate(conn, query,new Object[]{id ,
                                                          refid,
                                                          comment,
                                                          commentedbyId
                                                         })==1)        
        {
            try {
                conn.commit();
                return "{Success:true}";
            } catch (SQLException ex) {
                Logger.getLogger(RecentActivityDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
       return res;        
    }
    public String setLikeOnRecentUpdatesOfParent(Connection conn, String likedbyId, String refid , int likeunlike) throws ReadableException  {
        String res = "{Success:false}";
        String query="INSERT INTO recentactivitylikedtab (pid,refid,likedby,likeunLike)VALUES(?,?,?,?)";
        String id = java.util.UUID.randomUUID().toString();
        if(DaoUtil.executeUpdate(conn, query,new Object[]{id ,
                                                          refid,
                                                          likedbyId,
                                                          likeunlike
                                                         })==1)        
        {
            try {
                conn.commit();
                return "{Success:true}";
            } catch (SQLException ex) {
                Logger.getLogger(RecentActivityDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
       return res;        
    }
}
