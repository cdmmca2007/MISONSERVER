/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

import com.dlabs.mis.model.SchoolAdmin;
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

/**
 *
 * @author Kamlesh the admin
 */
public class SchoolDAO {

    JSONUtil jsonUtil = new ExtJsonUtil();
    
    public SchoolAdmin addOrEditSchoolDetails(Connection conn, SchoolAdmin obj) throws ReadableException{
       
        int flag=0;        
        String updatequery=""; 
        
        
        if(obj.getFlag()==0){
            updatequery="UPDATE schooladmin  SET schoolname=?,description=?, schooltitle=?, startdate=?, pricipalname=?, websiteurl=? WHERE schoolid=?";
            flag=DaoUtil.executeUpdate(conn, updatequery ,new Object[]{obj.getSchoolname(),obj.getDescription(),obj.getSchooltitle(),obj.getStartdate(),obj.getPricipalname(),obj.getWebsiteurl(),obj.getSchoolid()});
        }
        else if(obj.getFlag()==1){
            updatequery="UPDATE schooladmin  SET addressid=?, addressline1=?, addressline2=?, city=?, state=?, " +
                        " country=?, pinnumber=? WHERE schoolid=?";
            flag=DaoUtil.executeUpdate(conn, updatequery ,new Object[]{obj.getAddressid(),obj.getAddressline1(),obj.getAddressline2(),obj.getCity(),obj.getState(),obj.getCountry(),obj.getPinnumber(),obj.getSchoolid()});
        }
        else if(obj.getFlag()==2){
            updatequery="UPDATE schooladmin  SET contactid=?,  	contact1=?,  	contact2=?,  contact3=?,  " +
                        " emailid1=?,  emailid2=? WHERE schoolid=?  ";
            flag=DaoUtil.executeUpdate(conn, updatequery ,new Object[]{obj.getContactid(),obj.getContact1(),obj.getContact2(),obj.getContact3(),obj.getEmailid1(),obj.getEmailid2(),obj.getSchoolid()});
        }
        else if(obj.getFlag()==3){
            updatequery="UPDATE schooladmin  SET affiliationid=?,  affiliationwith=?,  affilationdate=?,  schoolgrade=? WHERE schoolid=?";
            flag=DaoUtil.executeUpdate(conn, updatequery ,new Object[]{obj.getAffiliationid(),obj.getAffiliationwith(),obj.getAffilationdate(),obj.getSchoolgrade(),obj.getSchoolid()});
        }
        else if(obj.getFlag()==4){
            updatequery="UPDATE schooladmin  SET othersettingid=?, starttime=?, endtime=?,  totnoofperiod=?,  maxschstanderd=?,  " +
                        " minstandered=? WHERE schoolid=?";
            flag=DaoUtil.executeUpdate(conn, updatequery ,new Object[]{obj.getOthersettingid(),obj.getStarttime(),obj.getEndtime(),obj.getTotnoofperiod(),obj.getMaxschstanderd(),obj.getMinstandered(),obj.getSchoolid()});
            
        }
        else if(obj.getFlag()==5){
            updatequery="UPDATE schooladmin  SET smsemailid=?,  smsalert=?,  emailalert=? WHERE schoolid=?";            
            flag=DaoUtil.executeUpdate(conn, updatequery ,new Object[]{obj.getSmsemailid(),obj.getEmailalert(),obj.getSmsalert(),obj.getSchoolid()});
            
        }
        if(flag==1)
            try {
            conn.commit();
            obj.setFlag(0);
        } catch (SQLException ex) {
            Logger.getLogger(SchoolDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return obj;
    }
    
    
    public Object getAllSchoolAdminAsJson(Connection conn,int page,int rows) throws ReadableException {
        JSONObject job = null;
        String selectquery="SELECT 	schoolid, 	schoolname, 	description, 	logopath, 	schooltitle, " +
                            "	FROM_UNIXTIME(startdate/1000,'%d-%m-%Y') AS startdate, 	pricipalname, 	websiteurl, " +
                            "	addressid, 	addressline1, 	addressline2, 	city, 	state, 	country, " +
                            "	pinnumber, 	contactid, 	contact1, 	contact2, 	contact3, " +
                            "	emailid1, 	emailid2, 	affiliationid, 	affiliationwith, FROM_UNIXTIME(affilationdate/1000,'%d-%m-%Y') AS affilationdate, " +
                            "	schoolgrade, 	othersettingid, FROM_UNIXTIME(starttime/1000,'%d-%m-%Y')  AS starttime, 	FROM_UNIXTIME(endtime/1000,'%d-%m-%Y')  AS endtime, " +
                            "	totnoofperiod, 	maxschstanderd, minstandered, 	smsemailid, 	smsalert, emailalert	 FROM schooladmin ";
        int count =0;        
        try{
            ResultSet rs = DaoUtil.executeQuery(conn, "select count(1) as count from schooladmin");
            if(rs.next()) {
                count = rs.getInt("count");

            }
            rs = DaoUtil.executeQuery(conn,selectquery);
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(SchoolDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;
    }    
    
    public int addOrEditSessionDetails(Connection conn, Session obj) throws ReadableException{
    
        String insertquery="";        
        String batchid = "";
        String selectquery="select count(1) as count from sessions where session_id=?";
        String fselectquery="select count(1) as count from sessions";
        String yearquery="select value from master where id=?";
        ResultSet year_rs=null;
        ResultSet rs=null;
        ResultSet rs1=null;
        int flag=0;
        year_rs=DaoUtil.executeQuery(conn,yearquery,new Object[]{obj.getSessionid()});
        rs=DaoUtil.executeQuery(conn,fselectquery);
  
        if(obj.getSessionid()!=null){
            
            rs=DaoUtil.executeQuery(conn,fselectquery);
            try {
                year_rs.next();
                if(rs.next()&& rs.getInt("count")==0)  {  //First Time                    
                String classquery="SELECT classid FROM class";
                    insertquery = "INSERT INTO sessions " +
                                  "	(batch_id,session_id,class_id,YEAR,class_teacher,validfrom,validto " +
                                  "	)VALUES(?,?,?,?,?,?,?)";
                rs=DaoUtil.executeQuery(conn,classquery);
                while(rs.next()){
                    
                    batchid = java.util.UUID.randomUUID().toString();
                    DaoUtil.executeUpdate(conn,insertquery,new Object[]{
                                                                 batchid,
                                                                 obj.getSessionid(),
                                                                 rs.getString("classid"),
                                                                 year_rs.getString("value"),"",
                                                                 obj.getValidfrom(),
                                                                 obj.getValidto()
                    });
                    flag=1;
                }
                
                }
                else{
                    rs1=DaoUtil.executeQuery(conn,selectquery,new Object[]{obj.getSessionid()});
                    if(rs1.next()&& rs1.getInt("count")==0)  { //Next seesion                     
                       ///Check New session created before current_date end's, Check1
                       ///then check if start date of new session should be greater then end date of current_session check2
                       String  check1="SELECT 1 FROM (SELECT MAX(validfrom) AS validfrom ,MAX(validto) AS validto FROM sessions) tab" +
                                      " WHERE FROM_UNIXTIME(tab.validfrom/1000,'%Y-%m-%d') < CURRENT_DATE" +
                                      "   AND FROM_UNIXTIME(tab.validto/1000,'%Y-%m-%d') > CURRENT_DATE";
                       String check2="SELECT 1 FROM (SELECT MAX(validto) AS validto FROM sessions) tab" +
                                     " WHERE FROM_UNIXTIME(tab.validto/1000,'%Y-%m-%d') < FROM_UNIXTIME(?/1000,'%Y-%m-%d')";                       
                       String classid_prev_session="SELECT s.class_id AS classid FROM sessions s ,(SELECT session_id,class_id , MAX(validto) FROM sessions) tab " +
                                                   " WHERE tab.session_id=s.session_id";
                       
                       rs=DaoUtil.executeQuery(conn,check1);
                       if((rs.next() && rs.getInt(1)==1))
                       { 
                           rs=DaoUtil.executeQuery(conn,check2,new Object[]{obj.getValidfrom()});
                           if(rs.next() && rs.getInt(1)==1){//if both check's are valid then insert into new session
                               
                               rs=DaoUtil.executeQuery(conn,classid_prev_session); 
                               insertquery = "INSERT INTO sessions " +
                                  "	(batch_id,session_id,class_id,YEAR,class_teacher,validfrom,validto " +
                                  "	)VALUES(?,?,?,?,?,?,?)";
                               while(rs.next()){
                                  batchid = java.util.UUID.randomUUID().toString();
                                  DaoUtil.executeUpdate(conn,insertquery,new Object[]{
                                                                 batchid,
                                                                 obj.getSessionid(),
                                                                 rs.getString("classid"),
                                                                 year_rs.getString("value"),
                                                                 "",
                                                                 obj.getValidfrom(),
                                                                 obj.getValidto()
                                 });
                                 flag=1;
                                 
                                 ///if(classteacher setting is select then update for classteacher of previous year)
                                 ///if(Subject setting is select then update for classteacher of previous year)
                                 ///if(Fee Template setting select for previuos year the update of fee  template)
                               }
                           }
                           else{
                             //Send Start  Date of New Session must  be greater 
                             //than end Date of current Session of Previous session
                             flag=2;  
                           }
                       }    
                       else
                       {
                       }
                    }
                    else{
                    }
                }
            } catch (SQLException ex) {
                Logger.getLogger(SchoolDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return flag;
    }

    public int AddWB(Connection conn, WebService obj) throws ReadableException {
        
        String insertquery="insert into webservice(tag,email,password) values(?,?,?)";
        int flag=0;
        flag=DaoUtil.executeUpdate(conn, insertquery ,new Object[]{obj.getTag(),obj.getEmail(),obj.getPassword()});
        if(flag==1)try {
            conn.commit();
        } catch (SQLException ex) {
            Logger.getLogger(SchoolDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return 1;        
    }
}
