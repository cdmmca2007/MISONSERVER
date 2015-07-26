/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

import com.dlabs.mis.model.Notification;
import com.kjava.base.ReadableException;
import com.kjava.base.db.DaoUtil;
import java.sql.Connection;
import java.sql.ResultSet;
import com.dlabs.mis.model.ClassExam;
import com.dlabs.mis.model.ClassSubject;
import com.dlabs.mis.model.Classes;
import com.dlabs.mis.model.CreateExamPostData;
import com.dlabs.mis.model.User;
import com.dlabs.session.AuthHandler;
import com.kjava.base.ReadableException;

import com.kjava.base.db.DaoUtil;
import com.kjava.base.util.ExtJsonUtil;
import com.kjava.base.util.JSONUtil;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
//import java.util.HashSet;
//import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
/**
 *
 * @author cd
 */
public class NotificationDAO {
    JSONUtil jsonUtil = new ExtJsonUtil(); 
    public Notification addNotification(Connection conn, Notification obj, int i, int i0) throws ReadableException {
              
        try {
            String query = "insert into notification (id,sessionid,title,description,recipient,activatedate,endactivatedate,STATUS,createdby,modifiedby,createdon) values(?,?,?,?,?,?,?,?,?,?,current_date)";
            String id = "";
            id = java.util.UUID.randomUUID().toString();

           if( DaoUtil.executeUpdate(conn, query, new Object[]{
                                                               id,
                                                               obj.getSessionid(),
                                                               obj.getTitle(),
                                                               obj.getDescription(),
                                                               obj.getRecipient(),
                                                               obj.getActivatedate(),
                                                               obj.getEndactivatedate(),
                                                               obj.getStatus(),
                                                               obj.getCreatedby(),
                                                               obj.getModifiedby()
                                                               })==1)
           {
             
               obj.setId(id);
               conn.commit();
           }
        } catch (SQLException ex) {
            throw new ReadableException(ex.getCause(),ex.getMessage(),"NotificationDAO", "addoredit");
        }
        return obj;
        
    }

    public Object getAllNotificationsAsJson(Connection conn, String userid, int page, int rows) throws ReadableException {
        JSONObject job = null;
        int count =0;
                
        String schoolid="1000";
        try{
            ResultSet rs = DaoUtil.executeQuery(conn, "SELECT count(1) as count  FROM  notification n  JOIN  master m  ON n.recipient=m.id  JOIN  master m1 ON n.status   =m1.id  JOIN  users  u  ON u.userid   =n.createdby   WHERE FROM_UNIXTIME(endactivatedate/1000) >= CURRENT_DATE ");
            if(rs.next()) {
                count = rs.getInt("count");

            }
            rs = DaoUtil.executeQuery(conn,"SELECT n.id,n.title,n.description, m.value	recipient,u.name AS createdby,DATE_FORMAT(n.createdon, '%d-%m-%Y') AS createdon,         m1.value status,FROM_UNIXTIME(n.activatedate/1000,'%d-%m-%Y') AS activatedate,n.modifiedby,n.modifiedon,FROM_UNIXTIME(n.endactivatedate/1000,'%d-%m-%Y') endactivatedate  FROM  notification n  JOIN  master m  ON n.recipient=m.id  JOIN  master m1 ON n.status   =m1.id  JOIN  users  u  ON u.userid   =n.createdby   WHERE FROM_UNIXTIME(n.endactivatedate/1000) >= CURRENT_DATE limit ? offset ?",new Object[]{15,0});
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;        
    }
    
}
