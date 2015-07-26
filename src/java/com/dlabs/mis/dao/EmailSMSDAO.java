/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

import com.dlabs.mis.model.Classes;
import com.dlabs.mis.model.EmailSMS;
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
 * @author XPPRESP3
 */
public class EmailSMSDAO {
    JSONUtil jsonUtil = new ExtJsonUtil();
    
    public Object getAllListAsJson(Connection conn, String sessionid, String classid, String studentid, int page, int rows) throws ReadableException {
        JSONObject job = null;
        String countquery= "SELECT   COUNT(1) as count " +
                            "  FROM student_class_map scm " +
                            "  JOIN student s ON scm.student_id=s.studentid" +
                            "  LEFT JOIN studentsmsemailalert sesa ON sesa.studentid=s.studentid AND sesa.batchid=scm.batch_id" +
                            " WHERE batch_id= ? ";
        String selectquery= "SELECT   scm.roll_no AS rollno," +
                            "         s.studentid,CONCAT(CONCAT(CONCAT(CONCAT(fname,' '),CASE WHEN mname IS NULL THEN '' ELSE mname END),' '),lname) AS name,fathername,mothername," +
                            "         parentemailid,parentmobile,alternateemailid," +
                            "         alternatemobile, addmission_no AS admissionno," +
                            "         CASE sesa.smsalert   when 1 then sesa.smsalert when 0 then null end as smsalert , " +
                            "	      CASE sesa.emailalert when 1 then sesa.emailalert when 0 then null end as emailalert  " +
                            "  FROM student_class_map scm " +
                            "  JOIN student s ON scm.student_id=s.studentid" +
                            "  LEFT JOIN studentsmsemailalert sesa ON sesa.studentid=s.studentid AND sesa.batchid=scm.batch_id" +
                            " WHERE batch_id= ? LIMIT ? OFFSET ? ";
        int count =0;   
        String batchid=new GetBatch(classid, sessionid).BatchId(conn);
        try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery,new Object[]{batchid});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{batchid,rows,page});
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;
    }  

    public EmailSMS enableDisableEMailSMS(Connection conn, EmailSMS obj) throws ReadableException {
        
        
        if(obj!=null && (obj.getStudentid()==null ||obj.getStudentid().equals("")))
        {
            obj.setResult(enableDisableAtClassLevel(conn,obj));
        }else{
            obj.setResult(enableDisableAtStudentLevel(conn,obj));
        }
        return obj;
    }

    private String enableDisableAtClassLevel(Connection conn, EmailSMS obj) throws ReadableException {
        String result="0";
        String studlist="select student_id as studentid from student_class_map where batch_id=?"; 
        int smsalert=obj.getType()==2&&obj.getAction()==1?1:0;
        int emailalert=obj.getType()==1&&obj.getAction()==1?1:0;
        String updatequry=new String();
        int val=0;
        if(obj.getType()==1){
            updatequry="update studentsmsemailalert set emailalert=? , modifiedby=? where batchid=?";            
            
        }            
        else if(obj.getType()==2) {               
            updatequry="update studentsmsemailalert set smsalert=?, modifiedby=? where batchid=?";            
            
        }            
        try {
        String batchid=new GetBatch(obj.getClassid(),obj.getSessionid()).BatchId(conn);
        if(!checkRecExistence(conn,batchid)){
           
           String inrtqry ="INSERT INTO studentsmsemailalert (studentid, batchid, smsalert, emailalert, createdby, modifiedby ,createdon) VALUES(?,?,?,?,?,?,current_date)";
           ResultSet rs =DaoUtil.executeQuery(conn,studlist,new Object[]{batchid});
           while(rs.next()){
              DaoUtil.executeUpdate(conn, inrtqry, new Object[]{rs.getString("studentid"),batchid,smsalert,emailalert,obj.getCreatedby(),obj.getModifiedby()}); 
           }
        }
        
        if(DaoUtil.executeUpdate(conn, updatequry, new Object[]{obj.getAction(),obj.getModifiedby(),batchid})>1) 
        {    
            result="1";           
            conn.commit();
        }
        }catch (SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return result;
    }

    private String enableDisableAtStudentLevel(Connection conn, EmailSMS obj) throws ReadableException {
        String result="0";
        int smsalert=obj.getType()==2&&obj.getAction()==1?1:0;
        int emailalert=obj.getType()==1&&obj.getAction()==1?1:0;
        String updatequry=new String();
        try {
        String batchid=new GetBatch(obj.getClassid(),obj.getSessionid()).BatchId(conn);
        if(obj.getType()==1){
            updatequry="update studentsmsemailalert set emailalert=? , modifiedby=? where batchid=? and studentid=?";            
            
        }            
        else if(obj.getType()==2) {               
            updatequry="update studentsmsemailalert set smsalert=?, modifiedby=? where batchid=? and studentid=?";            
            
        }
        if(DaoUtil.executeUpdate(conn, updatequry, new Object[]{obj.getAction(),obj.getModifiedby(),batchid,obj.getStudentid()})==1) 
        {
            result="1";           
            conn.commit();
        }             
        }catch (Exception ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return result;
    }
    private  boolean checkRecExistence(Connection conn,String batchid) throws ReadableException{
     String query="SELECT COUNT(1) as count FROM studentsmsemailalert WHERE batchid=?";
     boolean flag=false;
     try {
     ResultSet rs =DaoUtil.executeQuery(conn,query,new Object[]{batchid});
     if(rs!=null && rs.next()){
         if(rs.getInt("count")==0)
            flag=false;
         else
            flag=true; 
     }
     }
     catch (SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
     }
     return flag;
    }
}
