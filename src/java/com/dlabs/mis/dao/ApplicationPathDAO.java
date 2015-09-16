/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dlabs.mis.dao;

import com.kjava.base.ReadableException;
import com.kjava.base.db.DaoUtil;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author LENOVO
 */
public class ApplicationPathDAO {
    
    private int pathid;
    private String pathName;
    
    public void ApplicationPathDAO(int path){
          this.pathid=path;
    }

    public int getPathid() {
        return pathid;
    }

    public void setPathid(int pathid) {
        this.pathid = pathid;
    }

    public String getPathName() {
        return pathName;
    }

    public void setPathName(String pathName) {
        this.pathName = pathName;
    }
    
    public String getPathById(Connection conn,int pathid) throws ReadableException{
    
        String query="SELECT documentpath FROM documentpath WHERE active='Y' AND id=?";
     
        ResultSet rs=DaoUtil.executeQuery(conn,query,new Object[]{pathid});
        try {
            if(rs.next() && rs.getObject("documentpath")!=null){   
               this.pathName=rs.getString("documentpath");   
            }
        } catch (SQLException ex) {
            Logger.getLogger(ApplicationPathDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return this.pathName;
    }
    
    
}
