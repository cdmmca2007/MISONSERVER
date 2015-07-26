package com.dlabs.mis.dao;

import com.dlabs.mis.model.ContactAdmin;
import com.dlabs.mis.model.LogBug;
import com.dlabs.mis.model.Master;
import com.dlabs.mis.model.Property;
import com.dlabs.mis.services.MailService;
import com.kjava.base.ReadableException;
import com.kjava.base.db.DaoUtil;
import com.kjava.base.util.ExtJsonUtil;
import com.kjava.base.util.JSONUtil;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashSet;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Kamlesh Kumar Sah
 */
@Repository
public class MasterDAO {
    JSONUtil jsonUtil = new ExtJsonUtil();
    @Autowired MailService mailService;
//    public Set<Property> getAll(Connection conn) throws ReadableException{
//        Set<Property> set = new HashSet<Property>();
//        try {
//            String query = "SELECT * from configtype";
//            ResultSet rs = DaoUtil.executeQuery(conn, query);
//            while (rs.next()) {
//                Property obj = ConfigHelper.getTypeObject(rs);
//                set.add(obj);
//            }
//        } catch (SQLException ex) {
//            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
//        }
//        return set;
//    }
     public JSONObject getAllAsJson(Connection conn, int page,int rows) throws ReadableException {
        JSONObject job = null;
        ResultSet rs = null;
        int count = 0;
        try {
            rs = DaoUtil.executeQuery(conn, "SELECT count(1) as count from properties" );
            if (rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn, "SELECT * from properties limit ? offset ?",
                    new Object[]{rows,(page-1)*rows});
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        } catch (SQLException ex) {
            Logger.getLogger(Property.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;
    }
    public int addOrEditConfig(Connection conn, Property obj)throws ReadableException{
       
            String query = "insert into configtype(configname) values(?)";
            Object[] params = null;
            if (obj.getId() != 0) {
                query = "update configtype set configname = ? where configid = ?";
                params = new Object[]{obj.getValue(), obj.getId()};
            } else {
                params = new Object[]{obj.getValue()};
            }
            return DaoUtil.executeUpdate(conn, query, params);
        
    }
    
     public JSONObject getAllMasterAsJson(Connection conn, int propertyid, int page,int rows) throws ReadableException {
        JSONObject job = null;
        ResultSet rs = null;
        int count = 0;
        try {
            rs = DaoUtil.executeQuery(conn, "SELECT count(1) as count from master where propertyid=?",propertyid );
            if (rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn, "SELECT * from master where propertyid=? limit ? offset ?",
                    new Object[]{propertyid,15,0});
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        } catch (SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;
    }
    public Master addOrEditMaster(Connection conn,Master config) throws ReadableException{
        int flag=0;
        try {
            String query = "insert into master(value,id,propertyid) values(?,?,?)";
            String masterID = "";
            if (config.getId()!=null) {
                query = "update master set value=? where id=? and propertyid = ?";
                masterID =config.getId();
            }else{
               masterID = java.util.UUID.randomUUID().toString();
               config.setId(masterID);
            }
           if( DaoUtil.executeUpdate(conn, query, new Object[]{config.getValue(),masterID,config.getProperty().getId()})==1)
           {
               flag=1;
               conn.commit();
           }
        } catch (SQLException ex) {
            throw new ReadableException(ex,ex.getMessage(),"ConfigDAO", "addoredit");
        }
        return config;
    }
    
        public LogBug addBug(Connection conn,LogBug obj) throws ReadableException{
        int flag=0;
        String query = "INSERT INTO logbug (bugid, NAME,priority,serverity,modulename,pagename,functionality, " +
                            "	createdby, createdon, modifiedby,assignedto, description, steptoduplicateissue)" +
                            "VALUES(?,?,?,?,?,?,?,?,CURRENT_DATE,?,?,?,?)";
        String bugID = java.util.UUID.randomUUID().toString();
        
        try {

            if(obj.getBugid()==null){
                if(DaoUtil.executeUpdate(conn, query, new Object[]{
                                           bugID , obj.getName(),
                                           obj.getPriority(),obj.getServerity(),
                                           obj.getModulename(),obj.getPagename(),
                                           obj.getFunctionality(),obj.getCreatedby(),obj.getCreatedby(),
                                           obj.getAssignedto(),obj.getDescription(),obj.getSteptoduplicateissue()
                })==1){
                  
                   obj.setBugid(bugID);
                   conn.commit();
                }
            }
            else{
            //Edit Bug
            }
            
        } catch (SQLException ex) {
            throw new ReadableException(ex,ex.getMessage(),"ConfigDAO", "addoredit");
        }
        return obj;
    }

    public ContactAdmin contactAdmin(Connection conn,ContactAdmin obj) throws ReadableException{
    
        String query="INSERT INTO contactadmin (pid,userid,NAME,emailid,title,SUBJECT,reason)	VALUES(?,?,?,?,?,?,?)";
        String id = java.util.UUID.randomUUID().toString();
        try {
        if(DaoUtil.executeUpdate(conn,query,new Object[]{
                                              id ,obj.getUserid(),
                                              obj.getName(),
                                              obj.getEmail(),
                                              obj.getTitle(),
                                              obj.getSubject(),obj.getMessage()
                                            })==1){
                conn.commit();
                obj.setResult("1");
                mailService.onContactAdmin(conn, obj);
                
        }
        } catch (SQLException ex) {
                Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
       }
        return obj;
    }     
        
}
