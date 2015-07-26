/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dlabs.mis.dao;

import com.dlabs.mis.model.Classes;
import com.dlabs.mis.model.Session;
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
import org.springframework.web.bind.annotation.RequestBody;

/**
 *
 * @author cd
 */
public class SessionDAO {
    
    JSONUtil jsonUtil = new ExtJsonUtil();
    
    
    public Session addSession(Connection conn , Session obj) throws ReadableException{
        
        if(obj.getSessionid().equals(""))
        {
            String sessionid= java.util.UUID.randomUUID().toString();   
            String query="INSERT INTO mainsession (sessionid,sessionyear,sessionname,activatedate,endactivatedate,description,createdby) VALUES (? , ? ,? , ? ,?, ? , ?)";    
            String checlquery="select * from mainsession where sessionyear=?";             
            ResultSet rs=DaoUtil.executeQuery(conn, checlquery, new Object[]{obj.getSessionyear()});
            try {
                if(rs.next()){
                    obj.setSessionid("1");
                }
                else{
                    if(DaoUtil.executeUpdate(conn, query,new Object[]{
                                                                   sessionid,
                                                                   obj.getSessionyear(),
                                                                   obj.getSessionname(),
                                                                   obj.getActivatedate(),
                                                                   obj.getEndactivatedate(),
                                                                   obj.getDescription(),
                                                                   obj.getCreatedby()
                                                                  })==1)
                    {
                        obj.setSessionid(sessionid);
                        conn.commit();
                    } 
                }
                
            } catch (SQLException ex) {
                Logger.getLogger(SessionDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        else{
          //for Update 
        }
            
        return obj;
    }

    public Classes addSessionClass(Connection conn, Classes obj) throws ReadableException {

        if(obj.getClassid().equals("")){
         
            String checkclass="select name from class where name=?";
            ResultSet rs=DaoUtil.executeQuery(conn, checkclass, new Object[]{obj.getName()});
            try {
                if(rs.next()){
                    obj.setClassid("1");
                }
                else{
                  
                    String insertquery="INSERT INTO class (classid,NAME,createdby) VALUES(?,?,?)";
                    String classid=java.util.UUID.randomUUID().toString();   
                    if(DaoUtil.executeUpdate(conn, insertquery,new Object[]{classid,obj.getName(),obj.getCreatedby()})==1){
                        obj.setClassid(classid);
                        conn.commit();
                    }
                }
            } catch (SQLException ex) {
                Logger.getLogger(SessionDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        else{
        }
        return obj;
    }

    public Object getSessionsAsJson(Connection conn, int page, int rows) throws ReadableException {
        JSONObject job = null;
        String selectquery= " SELECT sessionid,mas.value AS sessionyear,sessionyear as sessionyearid, case currentsession when 1 then 'Current Session' end as status ,sessionname," +
                            "   FROM_UNIXTIME(activatedate/1000,'%d-%m-%Y : %h-%i-%s') activatedate," +
                            "   FROM_UNIXTIME(endactivatedate/1000,'%d-%m-%Y : %h-%i-%s') as endactivatedate ," +
                            "	description,createdby , u.name AS createdbyname , m.createdon " +
                            "   FROM mainsession m  INNER JOIN users u ON m.createdby=u.userid INNER JOIN master mas ON mas.id=m.sessionyear LIMIT ? OFFSET ?";
        int count =0;        
        try{
            ResultSet rs = DaoUtil.executeQuery(conn, "SELECT COUNT(1) AS count  FROM mainsession m  INNER JOIN users u ON m.createdby=u.userid");
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{15,0});
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(SessionDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;

    }

    public String markAsCurrentSession(Connection conn, Session obj) throws ReadableException {

        String updatequery="UPDATE mainsession SET	currentsession = ? , modifiedby = ? , modifiedon=current_date WHERE	sessionid = ?";
      
        if(DaoUtil.executeUpdate(conn, updatequery,new Object[]{1,obj.getModifiedby(),obj.getSessionid()})==1)
        {
            try {
                conn.commit();
            } catch (SQLException ex) {
                Logger.getLogger(SessionDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
            return "1";
        }
        
        return "0";
    }

    public Classes addSessionClassMap(Connection conn, Classes obj) throws ReadableException {

        String getquery=   "SELECT m.value as year , currentsession ,ms.sessionname , activatedate , endactivatedate " +
                        "  FROM mainsession ms " +
                        "  INNER JOIN master m ON m.id=ms.sessionyear " +
                        " WHERE  ms.sessionyear= ? ";
        String check="SELECT * FROM sessions WHERE session_id=? AND class_id=?";
        String insertquery="INSERT INTO sessions (batch_id,session_id,class_id,YEAR,currentsession,sessionname,batchname,validfrom,validto,COMMENT) VALUES(?,?,?,?,?,?,?,?,?,?)";
        
        ResultSet rs=DaoUtil.executeQuery(conn, check,new Object[]{obj.getSessionid(),obj.getClassid()});
        try {
            if(rs.next()){
                obj.setBatch_id("1");
            }
            else{
                String year=null,sessionname=null;
                int currentsession=0;
                long validfrom=0,validto=0;                  
               
                
                rs=DaoUtil.executeQuery(conn, getquery,new Object[]{obj.getSessionid()});
                if(rs.next()){
                    if(rs.getObject("year")!=null)year=rs.getString("year");
                    if(rs.getObject("sessionname")!=null)sessionname=rs.getString("sessionname");
                    if(rs.getObject("currentsession")!=null)currentsession=rs.getInt("currentsession");
                    if(rs.getObject("activatedate")!=null)validfrom=rs.getLong("activatedate");
                    if(rs.getObject("endactivatedate")!=null)validto=rs.getLong("endactivatedate");
                    
                String batchid=java.util.UUID.randomUUID().toString();    
                if(DaoUtil.executeUpdate(conn, insertquery, new Object[]{batchid,
                                                                         obj.getSessionid(),
                                                                         obj.getClassid(),year,currentsession,
                                                                         sessionname,obj.getBatchname(),validfrom,
                                                                         validto,obj.getComment()
                                                                           })==1){
                     obj.setBatch_id(batchid);
                     conn.commit();
                }    
                }
            
            }
        } catch (SQLException ex) {
            Logger.getLogger(SessionDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return obj;
    }
}
