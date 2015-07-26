/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

import com.dlabs.mis.model.User;
import com.dlabs.mis.model.UserLogin;
import com.kjava.base.ReadableException;
import com.kjava.base.db.DaoUtil;
import com.kjava.base.util.ExtJsonUtil;
import com.kjava.base.util.JSONUtil;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.simple.JSONObject;

/**
 *
 * @author cd
 */
public class WebServiceCallDAO {

    JSONUtil jsonUtil = new ExtJsonUtil();
    
    public Object validateUserFromMobile(Connection conn, UserLogin obj) throws ReadableException {
        UserDAO userDAO = new UserDAO();
        User u = userDAO.validateUser(conn, obj.getUserName(), obj.getPassword());
        String query="INSERT INTO mobileuserlogin (pid, username) VALUES(?,?)";
        String pid=java.util.UUID.randomUUID().toString();
                       
        JSONObject j = new JSONObject();
        if (u != null) {
                j.put("result",0);
                j.put("zpv", u.getPermValue());
                j.put("userrole", u.getRoleId());
                j.put("userid",u.getUserId());
                j.put("name",u.getName());
                j.put("resultText","Login SuccessFull");
                if( DaoUtil.executeUpdate(conn, query, new Object[]{pid+'i',obj.getUserName()})==1)
        {
            try {
                conn.commit();
            } catch (SQLException ex) {
                Logger.getLogger(WebServiceCallDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
                return j.toString();  
                
        }else{
                j.put("result",1);
                j.put("zpv", u.getPermValue());
                j.put("userrole", u.getRoleId());
                j.put("resultText","Login Failed,Please Contact Admin");
                if( DaoUtil.executeUpdate(conn, query, new Object[]{pid+'e',obj.getUserName()})==1)
        {
            try {
                conn.commit();
            } catch (SQLException ex) {
                Logger.getLogger(WebServiceCallDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
                
           return j.toString();               
        }    
    }    
}
