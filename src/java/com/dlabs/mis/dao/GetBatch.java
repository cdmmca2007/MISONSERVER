/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

import com.dlabs.session.AuthHandler;
import com.kjava.base.ReadableException;
import com.kjava.base.db.DaoUtil;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Collection;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author cd
 */
public class GetBatch {
    private String classid;
    private String sessionid;
    private String batchid;

    public GetBatch(){      
    }
    
    public GetBatch(String classid,String sessionid){      
        this.classid=classid;
        this.sessionid=sessionid;                        
    }
    
    public String getClassid() {
        return classid;
    }

    public void setClassid(String classid) {
        this.classid = classid;
    }

    public String getSessionid() {
        return sessionid;
    }

    public void setSessionid(String sessionid) {
        this.sessionid = sessionid;
    }

    public String getBatchid() {
        return batchid;
    }

    public void setBatchid(String batchid) {
        this.batchid = batchid;
    }
    
    public String BatchId(Connection conn) throws ReadableException{
    
        String query="select batch_id from sessions where class_id=? and session_id=?";
     
        ResultSet rs=DaoUtil.executeQuery(conn,query,new Object[]{classid,sessionid});
        try {
            if(rs.next()){   
               this.batchid=rs.getString("batch_id");   
            }
        } catch (SQLException ex) {
            Logger.getLogger(GetBatch.class.getName()).log(Level.SEVERE, null, ex);
        }
        return batchid;
    }
    
    public String getBatchName(Connection conn,String batchid) throws ReadableException{
    
        String query="SELECT c.name FROM sessions s INNER JOIN class c ON c.classid= s.class_id WHERE batch_id=?";
        String bname=null;
        ResultSet rs=DaoUtil.executeQuery(conn,query,new Object[]{batchid});
        try {
            if(rs.next()){   
               bname=rs.getString("name");   
            }
        } catch (SQLException ex) {
            Logger.getLogger(GetBatch.class.getName()).log(Level.SEVERE, null, ex);
        }
        return bname;
    }
    public int roleId(Connection conn ,String userid) throws ReadableException{
     int roleid=0;
     ResultSet rs= DaoUtil.executeQuery(conn,"select roleid from users where userid=?",new Object[]{userid});
        try {
            if(rs.next()){
                roleid=rs.getInt(1);
            }
        } catch (SQLException ex) {
            Logger.getLogger(GetBatch.class.getName()).log(Level.SEVERE, null, ex);
        }
     return roleid;
   } 
   
   public String getStudentIdOfParent(Connection conn ,String userid) throws ReadableException
   {
       String studentid="";
       String query="SELECT studentid FROM student WHERE userid=?";    
       ResultSet rs= DaoUtil.executeQuery(conn,query,new Object[]{userid});
        try {
            if(rs.next()){
                studentid=rs.getString(1);
            }
        } catch (SQLException ex) {
            Logger.getLogger(GetBatch.class.getName()).log(Level.SEVERE, null, ex);
        }
       return studentid;
   }
   
  public String getBatchidForStudent(Connection conn ,String sessionid,String studentid) throws ReadableException{
  
    String batchid="";   

    String query="SELECT scm.batch_id FROM student_class_map  scm JOIN sessions s ON s.batch_id=scm.batch_id AND s.session_id=?  WHERE scm.student_id=?";    
    ResultSet rs= DaoUtil.executeQuery(conn,query,new Object[]{sessionid,studentid});
     try {
         if(rs.next()){
             batchid=rs.getString(1);
         }
     } catch (SQLException ex) {
         Logger.getLogger(GetBatch.class.getName()).log(Level.SEVERE, null, ex);
     }
    return batchid;
  }
  public String getParentEmailIdForStudent(Connection conn ,String studentid) throws ReadableException{
  
    String emailid="";   

    String query="SELECT parentemailid FROM student WHERE studentid=?";    
    ResultSet rs= DaoUtil.executeQuery(conn,query,new Object[]{studentid});
     try {
         if(rs.next()){
             emailid=rs.getString(1);
         }
     } catch (SQLException ex) {
         Logger.getLogger(GetBatch.class.getName()).log(Level.SEVERE, null, ex);
     }
    return emailid;
  }
  public String getParentMobileForStudent(Connection conn ,String studentid) throws ReadableException{
  
    String mobile="";   

    String query="SELECT parentmoble FROM student WHERE studentid=?";    
    ResultSet rs= DaoUtil.executeQuery(conn,query,new Object[]{studentid});
     try {
         if(rs.next()){
             mobile=rs.getString(1);
         }
     } catch (SQLException ex) {
         Logger.getLogger(GetBatch.class.getName()).log(Level.SEVERE, null, ex);
     }
    return mobile;
  }
  
 public Map getMapObjectOfQuery(Connection conn ,String query) throws ReadableException{
      
      ResultSet rs =DaoUtil.executeQuery(conn, query);
      Map obj=new HashMap();
      if(rs!=null)
      {
          try {
              while(rs.next()){
                
                if(rs.getObject("id")!=null && rs.getObject("name")!=null)
                  obj.put(rs.getString("id"),rs.getString("name"));
              }
          } catch (SQLException ex) {
              Logger.getLogger(GetBatch.class.getName()).log(Level.SEVERE, null, ex);
          }
      }   
    return obj;       
  }
 
  public String getBatchId(Connection conn, String studentid , String sessionid) throws ReadableException{
  
      String batchid="";
      String query="SELECT scm.batch_id as batch_id " +
                   "  FROM student_class_map scm" +
                   "  JOIN sessions s ON s.batch_id= scm.batch_id AND s.session_id=?" +
                   " WHERE student_id=? ";
      ResultSet rs=DaoUtil.executeQuery(conn,query,new Object[]{sessionid ,studentid});
        try {
            if(rs!=null && rs.next()){
                if(rs.getObject("batch_id")!=null)batchid=rs.getString("batch_id");
            }
        } catch (SQLException ex) {
            Logger.getLogger(GetBatch.class.getName()).log(Level.SEVERE, null, ex);
        }
      return batchid;
  }
}
