/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dlabs.mis.dao;

import com.dlabs.mis.model.Email;
import com.kjava.base.ReadableException;
//import com.mysql.jdbc.Connection;
import com.kjava.base.db.DaoUtil;
import com.kjava.base.util.ExtJsonUtil;
import com.kjava.base.util.JSONUtil;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Connection;
//import java.util.HashSet;
//import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
/**
 *
 * @author cd
 */
@Repository
public class EmailDAO {
    JSONUtil jsonUtil = new ExtJsonUtil();
     public Email addOrEditEmail(Connection conn, Email obj) throws ReadableException {
        int flag=0;
        try {
            String query = "insert into class(schoolid,classid,name,classteacher,feetemplate,comment) values(?,?,?,?,?,?)";
            String classid = "";
            obj.setSchoolid("1000");
            if (obj.getSchoolid()!=null) {
                query = "update class set feetemplate=? , classteacher=? , comment=? where schoolid=? and classid = ?";
                classid =obj.getSchoolid();
            }else{
               classid = java.util.UUID.randomUUID().toString();
               obj.setEmailid(classid);
            }
           if( DaoUtil.executeUpdate(conn, query, new Object[]{obj.getSchoolid()})==1)
           {
               flag=1;
               conn.commit();
           }
        } catch (SQLException ex) {
            throw new ReadableException(ex,ex.getMessage(),"ClassDAO", "addoredit");
        }
        return obj;
    }

    public Object getAllEmailAsJson(Connection conn, int page,int rows) throws ReadableException {
        JSONObject job = null;
        ResultSet rs = null;
        int count =0;
        String schoolid="1000";
        try{
            rs = DaoUtil.executeQuery(conn, "SELECT count(1) as count from class");
            if(rs.next()) {
                count = rs.getInt("count");

            }
            rs = DaoUtil.executeQuery(conn,"SELECT name,classteacher,feetemplate,comment from class where schoolid=? limit ? offset ?",new Object[]{schoolid,15,0});
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;
    }  
     public Email getMail(Connection conn, int mailTplId) throws ReadableException {
        ResultSet rs = DaoUtil.executeQuery(conn, "select * from mail_template where template_id=?", new Object[]{mailTplId});
        return getMailObject(rs);
    }

    private Email getMailObject(ResultSet rs) {
       Email mail = new Email();
        try {
            if(rs.next()){
                mail.setSubject(rs.getString("subject"));
                mail.setValue(rs.getString("template"));
            }
        } catch (SQLException ex) {
            Logger.getLogger(MailDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return mail;
    }
}
