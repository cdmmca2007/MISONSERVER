/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dlabs.mis.dao;


import com.dlabs.mis.model.Classes;
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
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author cd
 */
public class ComboDAO {

    JSONUtil jsonUtil = new ExtJsonUtil();
    public JSONObject getAllComboAsJson(Connection conn, int propertyid,int page,int rows) throws ReadableException {
        JSONObject job = null;
        ResultSet rs = null;
        int count = 0;
        String countQuery=null;
        String schoolid="1000";
        String dataQuery =null;
        boolean parameter=false;
        if(propertyid==-1)///retrun session
        {
            countQuery="SELECT count(1) as count FROM sessions s, master m WHERE s.session_id=m.id";
            dataQuery ="SELECT DISTINCT session_id as id, m.value as value FROM sessions s, master m WHERE s.session_id=m.id";
            parameter=true;
        }   
        if(propertyid==1)///Then return techer id ,value for combo box
        {
            countQuery="Select count(1) as count from teacher where schoolid=?";
            dataQuery ="select teacherid as id , concat(concat(firstname,' '),lastname) as value from teacher where schoolid=? limit ? offset ?";
        }
        if(propertyid==2)///Then return class id ,value for combo box
        {
            countQuery="SELECT count(1) as count from class where sessionid=?";
            dataQuery ="select classid as id , name as value from class where sessionid=? limit ? offset ?";
        }
        if(propertyid==3)///Then return class id ,value for combo box
        {
            countQuery="SELECT count(1) as count from states";
            dataQuery ="select stateid as id,name as value from states";
            parameter=true;
        }
        if(propertyid==5)///Then return class id ,value for combo box
        {
            countQuery="SELECT count(1) as count from users where roleid=3";
            dataQuery ="select userid as id,name as value from users where roleid=3";
            parameter=true;
        }
        if(propertyid==6)///Then return class id ,value for combo box
        {
            countQuery="SELECT count(1) as count from templates where expire=0";
            dataQuery ="select id as id,name as value from templates where expire=0";
            parameter=true;
        }
        if(propertyid==7)///Then return class id ,value for combo box
        {
            countQuery="SELECT count(1) as count from student where classid=";
            dataQuery ="select id as id,name as value from templates";
            parameter=true;
        }
        if(propertyid==8)///retrun fee strcuture
        {
            countQuery="SELECT count(1) as count from feestructure";
            dataQuery ="select fee_Structure_id as id,concat(concat(CONCAT(CONCAT(fee_name,' / '),fee_Amount),' - '),fee_type) as value from feestructure";
            parameter=true;
        }    
        
        if(propertyid==9)///retrun Route Combo
        {
            countQuery="SELECT count(1) as count FROM route";
            dataQuery ="SELECT routeid as id, name as value FROM route";
            parameter=true;
        }    
        if(propertyid==-2)///
        {
            countQuery="SELECT count(1) as count FROM class";
            dataQuery ="SELECT classid as id, name as value FROM class";
            parameter=true;
        }    
        if(propertyid==-200)///
        {
            countQuery="SELECT count(distinct SUBSTR(NAME,1,LENGTH(NAME)-2)) as count FROM class";
            dataQuery ="SELECT DISTINCT SUBSTR(NAME,1,LENGTH(NAME)-2) as id,SUBSTR(NAME,1,LENGTH(NAME)-2) as value FROM class";
            parameter=true;
        }    
        if(propertyid==21)///
        {
            countQuery="SELECT count(1) as count FROM feefine WHERE deleted=0 AND sessionid=?";
            dataQuery ="SELECT finetypeid AS id , finename as value FROM feefine WHERE deleted=0 AND sessionid=?";
            parameter=true;
        }
        if(propertyid==22)///
        {
            countQuery="SELECT count(1) as count  FROM feefine ff  JOIN finetemplate ft ON ft.finetypeid=ff.finetypeid AND ft.deleted=0  AND  ft.finetypeid=?";
            dataQuery ="SELECT ft.fineid as id, CASE WHEN ft.finetypecategory='88cb77d4-8259-41c9-953d-bafeaf070762'   THEN CONCAT('If Fee payment Late by ',ft.fromdate) WHEN ft.finetypecategory='b2611c13-1395-4e6e-98ae-d349ec991813'        THEN CONCAT(CONCAT(CONCAT(CONCAT('If Payment Made between ',ft.fromdate),' To '),ft.todate),' of Month')               END AS finerule as value FROM feefine ff  JOIN finetemplate ft ON ft.finetypeid=ff.finetypeid AND ft.deleted=0  AND  ft.finetypeid=?";
            parameter=true;
        }
        
        

        try {
            if(parameter)
            rs = DaoUtil.executeQuery(conn,countQuery);
            else
            rs = DaoUtil.executeQuery(conn,countQuery,schoolid);
            if (rs.next()) {
                count = rs.getInt("count");
            }
            if(parameter)
            rs = DaoUtil.executeQuery(conn,dataQuery);
            else
            rs = DaoUtil.executeQuery(conn,dataQuery,new Object[]{schoolid,15,0});
            job = new ExtJsonUtil().getJsonObject(rs, count, page,rows, false);
        } catch (SQLException ex) {
            Logger.getLogger(ComboDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;
    }

    public JSONObject getAllComboAsJson(Connection conn, int propertyId, String id, String teacherid ,int page, int rows) throws ReadableException  {
        JSONObject job = null;
        ResultSet rs = null;
        int count = 0;
        String countQuery=null;
        String dataQuery =null;
        boolean parameter=false;
        int flag=0;
        if(propertyId!=-1000){
        if(propertyId==7)///Then return Student id ,value for combo box
        {
            String data[]=id.split("&");
            id=new GetBatch(data[0],data[1]).BatchId(conn);
            countQuery="SELECT COUNT(1) as count FROM student_class_map scm INNER JOIN student st ON scm.student_id=st.studentid WHERE scm.batch_id=?";
            dataQuery ="SELECT scm.student_id AS id ,CONCAT(CONCAT(CONCAT(CONCAT(st.fname,' '),case when st.mname is null then '' else st.mname end),' '),st.lname) AS value FROM student_class_map scm INNER JOIN student st ON scm.student_id=st.studentid where scm.batch_id= ? ";
        }
        if(propertyId==2)///Then return class id ,value for combo box
        {
            /*Check Role of teacherid  , if admin then return all classes 
                    Role of teacherid  , if teacher then return only classes he/she teacher
            */
            int roleid=new UserDAO().getUserRole(conn,teacherid);
            if(roleid==1 || roleid==2) {             
                countQuery="SELECT count(1) as count FROM sessions    WHERE session_id=?";
                dataQuery ="SELECT classid AS id, c.name AS value FROM sessions s JOIN class c ON s.class_id=c.classid  WHERE session_id=?";
            }       
            else if(roleid==3){
                flag=1;
                countQuery="SELECT count(1) as count " +
                "  FROM sessions s" +
                "  INNER JOIN class c ON c.classid=s.class_id" +
                "  INNER JOIN classsubjectteacher css ON css.batchid=s.batch_id AND css.teacherid= ? " +
                " WHERE session_id= ? ";
                dataQuery ="SELECT DISTINCT c.name as value ,c.classid as id " +
                "  FROM sessions s" +
                "  INNER JOIN class c ON c.classid=s.class_id" +
                "  INNER JOIN classsubjectteacher css ON css.batchid=s.batch_id AND css.teacherid= ? " +
                " WHERE session_id= ? ";
            }
        }
        try {
            
            if(flag==1) {
            rs = DaoUtil.executeQuery(conn,countQuery,new Object[]{teacherid,id});
            if (rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,dataQuery,new Object[]{teacherid,id});
            job = new ExtJsonUtil().getJsonObject(rs, count, page,rows, false);
                
            }
            else{
            rs = DaoUtil.executeQuery(conn,countQuery,new Object[]{id});
            if (rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,dataQuery,new Object[]{id});
            job = new ExtJsonUtil().getJsonObject(rs, count, page,rows, false);
            }
        } catch (SQLException ex) {
            Logger.getLogger(ComboDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        } 
        return job;
    }

    public Object getAllClassSubjectComboAsJson(Connection conn, int propertyId, String classid, String teacherid, String sessionid, int page, int rows) throws ReadableException {

        JSONObject job = null;
        ResultSet rs = null;
        int count = 0;
        int flag=0;
        String countQuery=null;
        String dataQuery=null;
        int class_teacher=new UserDAO().isClassTeacher(conn,sessionid,classid,teacherid);
        int role=new UserDAO().getUserRole(conn, teacherid);
        if(class_teacher==0 && role==3) {
         countQuery="SELECT  count(1) as count " +
                        "  FROM classsubjectteacher css " +
                        "       JOIN sessions s ON s.batch_id=css.batchid AND s.session_id=?  AND s.class_id= ? " +
                        "       JOIN master   m ON css.subjectid=m.id " +
                        " WHERE css.teacherid= ? ";
         dataQuery ="SELECT m.value as value , m.id as id" +
                        "  FROM classsubjectteacher css " +
                        "       JOIN sessions s ON s.batch_id=css.batchid AND s.session_id=?  AND s.class_id= ? " +
                        "       JOIN master   m ON css.subjectid=m.id " +
                        " WHERE css.teacherid= ? ";
        }
        else if((class_teacher==1 && role==3) || role==1 || role==2) {
         flag=1;    
         countQuery="SELECT  count(1) as count " +
                        "  FROM classsubjectteacher css " +
                        "       JOIN sessions s ON s.batch_id=css.batchid AND s.session_id=?  AND s.class_id= ? " +
                        "       JOIN master   m ON css.subjectid=m.id ";
                       // " WHERE css.teacherid= ? ";
         dataQuery ="SELECT m.value as value , m.id as id" +
                        "  FROM classsubjectteacher css " +
                        "       JOIN sessions s ON s.batch_id=css.batchid AND s.session_id=?  AND s.class_id= ? " +
                        "       JOIN master   m ON css.subjectid=m.id ";
                        //" WHERE css.teacherid= ? ";
        }
        try {
            if(flag==0) {
            rs = DaoUtil.executeQuery(conn,countQuery,new Object[]{sessionid,classid,teacherid});
            if (rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,dataQuery,new Object[]{sessionid,classid,teacherid});
            job = new ExtJsonUtil().getJsonObject(rs, count, page,rows, false);
            }else{
            rs = DaoUtil.executeQuery(conn,countQuery,new Object[]{sessionid,classid});
            if (rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,dataQuery,new Object[]{sessionid,classid});
            job = new ExtJsonUtil().getJsonObject(rs, count, page,rows, false);
            
            }
         }
         catch (SQLException ex) {
            Logger.getLogger(ComboDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;
    }

    public Object getHostelCombo(Connection conn, int page, int rows) throws ReadableException {
        JSONObject job = null;
        ResultSet rs = null;
        int count = 0;
        String countQuery=null;
        String dataQuery =null;
            countQuery="SELECT count(1) as count FROM hostel";
            dataQuery ="SELECT pid AS id ,name AS value FROM hostel";
        
        try {
            rs = DaoUtil.executeQuery(conn,countQuery);
            if (rs.next()) {
                count = rs.getInt("count");
                rs = DaoUtil.executeQuery(conn,dataQuery);
            }
            
            job = new ExtJsonUtil().getJsonObject(rs, count, page,rows, false);
        } catch (SQLException ex) {
            Logger.getLogger(ComboDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;

    }

    public Object getRoomCombo(Connection conn, String hostelId, int page, int rows) throws ReadableException {
        JSONObject job = null;
        ResultSet rs = null;
        int count = 0;
        String countQuery=null;
        String dataQuery =null;
            countQuery="SELECT count(1) as count FROM hostelroom WHERE hostelid= ?";
            dataQuery ="Select pid as id, roomno As value from hostelroom WHERE hostelid= ?";
        
        try {
            rs = DaoUtil.executeQuery(conn,countQuery,new Object[]{hostelId});
            if (rs.next()) {
                count = rs.getInt("count");
                rs = DaoUtil.executeQuery(conn,dataQuery,new Object[]{hostelId});
            }
            job = new ExtJsonUtil().getJsonObject(rs, count, page,rows, false);
        } catch (SQLException ex) {
            Logger.getLogger(ComboDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;
    }

    public Object getFineCombo(Connection conn, String sessionsid, int page, int rows) throws ReadableException {

        JSONObject job = null;
        ResultSet rs = null;
        int count = 0;
        String countQuery=null ,dataQuery =null;

        countQuery="SELECT COUNT(1) AS count  FROM feefine WHERE sessionid=? AND deleted=0";
        dataQuery ="SELECT finetypeid AS id, finename  AS value FROM feefine WHERE sessionid=? AND deleted=0";
        
        try {
            rs = DaoUtil.executeQuery(conn,countQuery,new Object[]{sessionsid});
            if (rs.next()) {
                count = rs.getInt("count");
                rs = DaoUtil.executeQuery(conn,dataQuery,new Object[]{sessionsid});
            }
            job = new ExtJsonUtil().getJsonObject(rs, count, page,rows, false);
        } catch (SQLException ex) {
            Logger.getLogger(ComboDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;
        
    }

    public Object getFineRuleCombo(Connection conn, String finetpyeid, int page, int rows) throws ReadableException {
       
        JSONObject job = null;
        ResultSet rs = null;
        int count = 0;
        String countQuery=null,dataQuery =null;
        countQuery="SELECT COUNT(1) AS count FROM finetemplate ft WHERE ft.finetypeid=? AND ft.deleted=0";
        dataQuery ="SELECT dat.id , CONCAT(CONCAT(CONCAT(CONCAT(dat.finerule,':'),dat.finechargecategory),':'),fineamountpercent) AS value FROM (SELECT ft.fineid AS id , CASE WHEN ft.finetypecategory='88cb77d4-8259-41c9-953d-bafeaf070762' THEN CONCAT('If Fee payment Late by ',ft.fromdate) WHEN ft.finetypecategory='b2611c13-1395-4e6e-98ae-d349ec991813'                   THEN CONCAT(CONCAT(CONCAT(CONCAT('If Payment Made between ',ft.fromdate),' To '),ft.todate),' of Month')        END AS finerule        ,CASE  WHEN finechargecategory=0 THEN 'Fixed Amount' WHEN  finechargecategory=1 THEN 'Percent' END AS finechargecategory,       fineamountpercent  FROM finetemplate ft WHERE ft.finetypeid=? AND ft.deleted=0) dat ";
        
        try {
            rs = DaoUtil.executeQuery(conn,countQuery,new Object[]{finetpyeid});
            if (rs.next()) {
                count = rs.getInt("count");
                rs = DaoUtil.executeQuery(conn,dataQuery,new Object[]{finetpyeid});
            }
            job = new ExtJsonUtil().getJsonObject(rs, count, page,rows, false);
        } catch (SQLException ex) {
            Logger.getLogger(ComboDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;
    }
    
}
