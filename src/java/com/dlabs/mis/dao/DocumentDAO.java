/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;



import com.dlabs.mis.model.FormD0;
import com.dlabs.mis.model.HomeWork;
import com.dlabs.mis.model.Permission;
import com.dlabs.mis.model.Tutorial;
import com.dlabs.mis.model.User;
import com.dlabs.util.FileHandler;
import com.kjava.base.ReadableException;
import com.kjava.base.db.DaoUtil;
import com.kjava.base.db.DbPool;
import com.kjava.base.util.ExtJsonUtil;
import com.kjava.base.util.JSONUtil;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


/**
 *
 * @author cd
 */

public class DocumentDAO {
     
    JSONUtil jsonUtil = new ExtJsonUtil(); 

    public FormD0 logEditComplain(Connection conn, FormD0 master) {
        String uuid = UUID.randomUUID().toString();
        master.setComplainId(uuid);
        return master;
    }

    public Object getAllComplainsAsJson(Connection conn, int complainId, int i, int i0) {
        throw new UnsupportedOperationException("Not yet implemented");
    }

    public Object getAllMasterAsJson(Connection conn) {
        throw new UnsupportedOperationException("Not yet implemented");
    }

    public List<Tutorial> getAllFolder(Connection conn, String sessionid) throws ReadableException {
        
        List<Tutorial> job = new ArrayList<Tutorial>();
        
        String selectquery= "SELECT s.batch_id as batchid , c.name ,0 AS totdoc ,'folder_icon.png' AS image, 'abc' AS tooltip, 'pqr' AS shortName , 'callfolder' as callback , 1 as isparent " +
                            "  FROM sessions s LEFT JOIN class c ON s.class_id=c.classid  " +
                            " WHERE s.session_id= ?";
        ResultSet rs=null;
        int count =0;        
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{sessionid});
        try {            
            
            while(rs.next()){
                Tutorial obj =new Tutorial();
                
                if(rs.getObject("batchid")!=null)
                  obj.setBatchid(rs.getString("batchid"));  
                if(rs.getObject("name")!=null)
                  obj.setName(rs.getString("name"));  
                if(rs.getObject("totdoc")!=null)
                  obj.setTotdoc(rs.getInt("totdoc"));  
                if(rs.getObject("image")!=null)
                  obj.setImage(rs.getString("image"));  
                if(rs.getObject("tooltip")!=null)
                  obj.setTooltip(rs.getString("tooltip"));  
                if(rs.getObject("shortName")!=null)
                  obj.setShortName(rs.getString("shortName"));  
                if(rs.getObject("callback")!=null)
                  obj.setCallback(rs.getString("callback"));  
                if(rs.getObject("isparent")!=null)
                  obj.setIsparent(rs.getInt("isparent"));  
                        
                job.add(obj);
                
            }
        } catch (SQLException ex) {
            Logger.getLogger(DocumentDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
            
            
        return job;
    }

    public List<Tutorial> getAllDocument(Connection conn, String batchid) throws ReadableException {
                 List<Tutorial> job = new ArrayList<Tutorial>();
        
        String selectquery= "SELECT  t.pid,t.batchid,t.batchname,m.value AS subject ,t.title as shortName ,t.description as tooltip , " +
                            "	t.createdby,t.totallike,t.totaldownload,t.totalview,t.path AS name " +
                            "	,t.createdon ,f.imagename AS image, 2 as isparent " +
                            "  FROM  tutorialdocument t, filetype f , master m " +
                            " WHERE  t.batchid=? " +
                            "   AND  t.filetype=f.filetype " +
                            "   AND  m.id=t.subjectid " +
                            "   AND m.propertyid=2";
        ResultSet rs=null;
        int count =0;        
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{batchid});
        try {            
            
            while(rs.next()){
                Tutorial obj =new Tutorial();
                
                if(rs.getObject("pid")!=null)
                  obj.setPid(rs.getString("pid"));  
                if(rs.getObject("name")!=null)
                  obj.setName(rs.getString("name"));  
                if(rs.getObject("subject")!=null)
                  obj.setSubject(rs.getString("subject"));  
                if(rs.getObject("image")!=null)
                  obj.setImage(rs.getString("image"));  
                if(rs.getObject("tooltip")!=null)
                  obj.setTooltip(rs.getString("tooltip"));  
                if(rs.getObject("shortName")!=null)
                  obj.setShortName(rs.getString("shortName"));  
                if(rs.getObject("isparent")!=null)
                  obj.setIsparent(rs.getInt("isparent"));  

                job.add(obj);
                
            }
        } catch (SQLException ex) {
            Logger.getLogger(DocumentDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;
    }

    public int addDocument(Connection conn, HttpServletRequest obj) throws ReadableException {
                int flag=0;
        ResultSet rs=null;
        String path="D:\\kamlesh";
        HashMap arrParam = new HashMap();
        Tutorial hwobj=new Tutorial();
        
        String id="";
        try {
            String query =  " INSERT INTO tutorialdocument " +
                            "	(pid,batchid,subjectid,title,description,createdby, " +
                            "	path,filetype)" +
                            " VALUES(?,?,?,?,?,?,?,?)";
            
            String pid = java.util.UUID.randomUUID().toString();
            arrParam = (HashMap) FileHandler.uploadFile(path, obj);        
            hwobj=getObject(arrParam);    
            if(DaoUtil.executeUpdate(conn,query,new Object[]{pid,
                                                             hwobj.getBatchid(),
                                                             hwobj.getSubject(),
                                                             hwobj.getTitle(),
                                                             hwobj.getDescription(),
                                                             hwobj.getCreatedby(),
                                                             hwobj.getPath(),
                                                             hwobj.getFiletype()
                                                             })==1)
            {
                conn.commit();
                flag=1;
            } 
        } catch (SQLException ex) {
            throw new ReadableException(ex.getCause(),ex.getMessage(),"DocumentDAO", "addDocument");         
        }
        return flag;

    }
   
    public Tutorial getObject(HashMap obj){
    
       Tutorial hwobj=new Tutorial();
       

        if(obj.containsKey("batchid"))
            hwobj.setBatchid((String)obj.get("batchid"));
        if(obj.containsKey("tutsubject"))
            hwobj.setSubject((String)obj.get("tutsubject"));
        if(obj.containsKey("title"))
            hwobj.setTitle((String)obj.get("title"));
        if(obj.containsKey("description"))
            hwobj.setDescription((String)obj.get("description"));
        if(obj.containsKey("createdby"))
            hwobj.setCreatedby((String)obj.get("createdby"));
        if(obj.containsKey("notification")){
            String data=(String)obj.get("notification");
            int x =data.equalsIgnoreCase("on")?1:0;
            hwobj.setNotification(x);
        }
        if(obj.containsKey("filename")){
            
            hwobj.setPath((String)obj.get("filename"));
            String file=hwobj.getPath();
            hwobj.setFiletype(file.substring(file.indexOf("."),file.length()));
        }    
        
        return hwobj;
    
     
    }

    public String getDocument(String pid,
                              String downloadedby
                              //int action
       ) throws ReadableException {

       String checkquery ="SELECT pid FROM tutorialdocument WHERE pid=?" ;
       String updatequery="UPDATE tutorialdocument SET totaldownload=totaldownload + 1 WHERE pid=?" ;
       String insertquery="INSERT INTO tutorialdocaction (id, pid, downloadedby,ACTION) VALUES (?,?,?,?)" ; 
       
       Connection conn = null;
       
        try {
            conn = DbPool.getConnection();
            ResultSet rs=DaoUtil.executeQuery(conn, checkquery,new Object[]{pid});
            if(rs.next()){
                
                ///Downloading code
               if(DaoUtil.executeUpdate(conn, updatequery, new Object[]{pid})==1){
                   String id = java.util.UUID.randomUUID().toString();
                     
                   if(DaoUtil.executeUpdate(conn,insertquery, new Object[]{id,pid,downloadedby,"Download"})==1){
                       conn.commit();
                   }                    
               }
            }
            else {
            }
        } catch (SQLException ex) {
            Logger.getLogger(DocumentDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return "";
    }
    
}
