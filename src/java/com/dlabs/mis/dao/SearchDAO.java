/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

import com.dlabs.mis.controller.PermissionController;
import com.dlabs.mis.model.Master;
import com.dlabs.mis.model.Permission;
import com.dlabs.mis.model.PermissionGroup;
import com.kjava.base.ReadableException;
import com.kjava.base.db.DaoUtil;
import com.kjava.base.util.ExtJsonUtil;
import com.kjava.base.util.JSONUtil;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Kamlesh the admin
 */
@Repository
public class SearchDAO {
    @Autowired
    JSONUtil jsonUtil;
    @Autowired
    Properties sqlQueries;

    public JSONObject getSearchResult(Connection conn, String ss, int start, int limit) throws ReadableException {
        String p = "%"+ss+"%";
        String query = "SELECT userid id, name text,'user' type FROM users WHERE name LIKE ?";
        return jsonUtil.getJsonObject(DaoUtil.executeQuery(conn, query, new Object[]{p}),0,1,25);
    }

    public JSONObject getSearchTypeComboBox(Connection conn, String module) throws ReadableException  {
        JSONObject job = null;
        ResultSet rs = null;
        int count = 0;
        String countQuery="SELECT count(1) as count FROM search WHERE modulename=?";
        String dataQuery ="SELECT columnname AS id , displayname AS value FROM search WHERE modulename=?";
        
        try {
            rs = DaoUtil.executeQuery(conn,countQuery,new Object[]{module});
            if (rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,dataQuery,new Object[]{module});
            job = new ExtJsonUtil().getJsonObject(rs, count, 1,100, false);
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
    
    
}
