/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

import com.dlabs.mis.model.Classes;
import com.dlabs.mis.model.ExtraFeeModel;
import com.dlabs.mis.model.GenerateFee;
import com.kjava.base.ReadableException;

import com.kjava.base.db.DaoUtil;
import com.kjava.base.db.DbPool;
import com.kjava.base.util.ExtJsonUtil;
import com.kjava.base.util.JSONUtil;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
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
public class StudentMonthlyFeeDAO {

    JSONUtil jsonUtil = new ExtJsonUtil();
    public ExtraFeeModel addOrEditFee(Connection conn,ExtraFeeModel obj) throws ReadableException {
                int flag=0;
        try {
            String query = "";
            String fee_structure_id = "";
            if(obj.getFeename()==null) {
                query="";     
                fee_structure_id = java.util.UUID.randomUUID().toString();
                String insertnewfeestructure="INSERT INTO feestructure,(fee_structure_id,fee_name,fee_amount,comment) VALUES (?,?,?,?,?,?,?)";
                
                if(DaoUtil.executeUpdate(conn, insertnewfeestructure, new Object[]{fee_structure_id,obj.getFeename(),obj.getFeeamount(),obj.getComment()})==1){
                    
                      String insertquery="INSERT INTO monthlyfeedetails (monthly_fee_id,student_id ,fee_structure_id, amount) VALUES(?,?,?,?)";                              
                                if(DaoUtil.executeUpdate(conn, insertquery, new Object[]{obj.getMonhtly_fee_id(),obj.getStudent_id(),fee_structure_id,obj.getFeeamount()})==1){
                                    String updatequery="UPDATE generatemonthlyfee SET amount=amount + ? WHERE monthly_fee_id=? AND student_id=? AND for_month=?";                  

                                    if(DaoUtil.executeUpdate(conn, updatequery , new Object[]{obj.getFeeamount(),obj.getMonhtly_fee_id(),obj.getStudent_id(),obj.getMonth()})==1){ 
                                          flag=1;
                                          obj.setMonhtly_fee_id(fee_structure_id);
                                       }

                             }        
                    
                }
            }    
            else{
               String insertquery="INSERT INTO monthlyfeedetails (monthly_fee_id,student_id ,fee_structure_id, amount) VALUES(?,?,?,?)";                              
               if(DaoUtil.executeUpdate(conn, insertquery, new Object[]{obj.getMonhtly_fee_id(),obj.getStudent_id(),obj.getFeetype(),obj.getFeeamount()})==1){
                   String updatequery="UPDATE generatemonthlyfee SET amount=amount + ? WHERE monthly_fee_id=? AND student_id=? AND for_month=?";                  
                   ResultSet rs=DaoUtil.executeQuery(conn,"SELECT fee_name,fee_amount FROM feestructure WHERE fee_structure_id=?",new Object[]{obj.getFeetype()});
                   int amount=0;
                   if(rs.next()){
                      
                      if(rs.getObject("fee_amount")!=null)
                          amount=rs.getInt("fee_amount");
                      if(DaoUtil.executeUpdate(conn, updatequery , new Object[]{amount,obj.getMonhtly_fee_id(),obj.getStudent_id(),obj.getMonth()})==1){ 
                         flag=1;
                         if(rs.getObject("fee_name")!=null)
                              obj.setFeename(rs.getString("fee_name"));    
                              obj.setFeeamount(amount);
                      }
                   }
                   
            }
            }
           if(flag==1)
           {               
               conn.commit();
           }
        } catch (SQLException ex) {
            throw new ReadableException(ex.getCause(),ex.getMessage(),"StudentMonthlyFeeDAO", "addoredit");
        }
        return obj;

    }

    public Object getAllFeeAsJson(Connection conn,String monthly_fee_id ,int page, int rows) throws ReadableException {

        JSONObject job = null;
        int count =0;
        String schoolid="1000";
        String countquery="SELECT COUNT(1) as count " +
                        "  FROM monthlyfeedetails m, student s,feestructure f  ,class c,generatemonthlyfee g , templates t ,sessions ss" +
                        " WHERE m.monthly_fee_id=?" +
                        "   AND m.student_id    =s.studentid  " +
                        "   AND m.fee_structure_id=f.fee_structure_id " +
                        "   AND ss.batch_id=g.class_id " +
                        "   AND ss.class_id=c.classid " +
                        "   AND g.monthly_fee_id=m.monthly_fee_id " +
                        "   AND g.templateid=t.id";
        String dataquery="SELECT m.monthly_fee_id,s.studentid as student_id,CONCAT(CONCAT(CONCAT(CONCAT(s.fname,' '),case when s.mname is null then '' else s.mname end),' '),s.lname) AS studentname, c.classid , c.name AS classname, f.fee_structure_id , f.fee_name AS feename, f.fee_amount AS amount,g.for_month , g.templateid, t.name AS template " +
                        "  FROM monthlyfeedetails m, student s,feestructure f  ,class c,generatemonthlyfee g , templates t ,sessions ss" +
                        " WHERE m.monthly_fee_id=?" +
                        "   AND m.student_id    =s.studentid  " +
                        "   AND m.fee_structure_id=f.fee_structure_id " +
                        "   AND ss.batch_id=g.class_id " +
                        "   AND ss.class_id=c.classid " +
                        "   AND g.monthly_fee_id=m.monthly_fee_id " +
                        "   AND g.templateid=t.id";
        try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery,new Object[]{monthly_fee_id});
            //ResultSet rs = DaoUtil.executeQuery(conn,countquery);
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,dataquery,new Object[]{monthly_fee_id});
           // rs = DaoUtil.executeQuery(conn,dataquery);
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(StudentMonthlyFeeDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;
        
    }

    public GenerateFee markPaid(Connection conn, GenerateFee obj) throws ReadableException  {
        
        String updatequery="UPDATE generatemonthlyfee SET paid_status=? , paid_on=? , paid_by= ? , paid_amount=? , paymentreceicvedfrom=? , releationwithstud=? WHERE monthly_fee_id=?";
        int flag=0;
        try {
        if(DaoUtil.executeUpdate(conn, updatequery , new Object[]{1,new Date().getTime(),obj.getPaid_by(),obj.getPaid_amount(),obj.getReceived_from(),obj.getRelationtype() ,obj.getMonthly_fee_id()})==1){ 
             conn.commit();
             flag=1;        
             obj.setMarkpaid(true);
        }}
        catch (SQLException ex) {
            Logger.getLogger(StudentMonthlyFeeDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return obj; 
    }

    public GenerateFee deleteMonthlyFee(Connection conn, GenerateFee obj) throws ReadableException {
        String updatequery="UPDATE generatemonthlyfee SET amount = amount - ? WHERE monthly_fee_id = ?";
        String deletequery="DELETE FROM monthlyfeedetails WHERE monthly_fee_id = ?  AND fee_structure_id = ? AND student_id = ?";
        int flag=0;
        try {
        if(DaoUtil.executeUpdate(conn, deletequery , new Object[]{obj.getMonthly_fee_id(),obj.getFee_structure_id(),obj.getStudent_id()})==1){ 
             
            if(DaoUtil.executeUpdate(conn, updatequery , new Object[]{obj.getAmount(),obj.getMonthly_fee_id()})==1){
               conn.commit();
               obj.setAmount(0);
            }
            
             
        }}
        catch (SQLException ex) {
            Logger.getLogger(StudentMonthlyFeeDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return obj;
     
    }

    public Object getAllMonthlyFeeParentAsJson(Connection conn, String userid,String sessionid, int page, int rows) throws ReadableException {
      JSONObject job = null;
      int count =0;
      String schoolid="1000";
      String countquery="Select count(1) as count "+
                        "    FROM generatemonthlyfee g  " +
                        "  INNER JOIN sessions ss ON ss.batch_id=g.class_id " +
                        "  INNER JOIN class c     ON c.classid=ss.class_id " +
                        "  INNER JOIN student s   ON s.studentid=g.student_id  " +
                        "  INNER JOIN master m    ON m.id=g.for_year " +
                        "  INNER JOIN userlogin u ON u.userid=s.userid " +
                        "WHERE u.userid= ?  AND ss.session_id= ? ";


      String dataquery="select 	g.monthly_fee_id, 	g.school_id, 	g.class_id, 	c.name as classname, " +
                    "	g.student_id, 	CONCAT(CONCAT(CONCAT(CONCAT(fname,' '),case when mname is null then '' else mname end),' '),lname) as studentname,	" +
                    "        CASE g.for_month WHEN 1 THEN 'January' WHEN 2 THEN 'February' WHEN 3 THEN 'March' WHEN 4 THEN 'April' WHEN 5 THEN 'May' WHEN 6 THEN 'June' WHEN 7 THEN 'July' WHEN 8 THEN 'August' WHEN 9 THEN 'September' WHEN 10 THEN 'October' WHEN 11 THEN 'November' WHEN 12 THEN 'December' END AS month,	" +
                    "	g.for_month, " +
                    "	g.for_year, 	m.value as year,	g.amount, FROM_UNIXTIME(g.due_date/1000,'%d-%m-%Y') as	due_date, " +
                    "	g.templateid,CASE g.paid_status WHEN 0 THEN '0' WHEN 1 THEN '1' END as paid_status,CASE g.paid_status WHEN 0 THEN 'Not Paid' WHEN 1 THEN 'Paid' END as status,FROM_UNIXTIME(g.paid_on/1000,'%d-%m-%Y') as	paid_on, 	g.paid_by, 	g.paid_amount " +
                    "  FROM generatemonthlyfee g  " +
                    "  INNER JOIN sessions ss ON ss.batch_id=g.class_id " +
                    "  INNER JOIN class c     ON c.classid=ss.class_id  " +
                    "  INNER JOIN student s   ON s.studentid=g.student_id  " +
                    "  INNER JOIN master m    ON m.id=g.for_year " +
                    "  INNER JOIN userlogin u ON u.userid=s.userid " +
                    "  WHERE u.userid= ?  AND ss.session_id= ? ORDER BY status ";
                           

       try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery,new Object[]{userid,sessionid});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,dataquery,new Object[]{userid,sessionid});
           // rs = DaoUtil.executeQuery(conn,dataquery);
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(StudentMonthlyFeeDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;

    }

    public Object getAllMonthlyFeeNameAsJson(Connection conn, String monthly_fee_id, int page, int rows) throws ReadableException {
     JSONObject job = null;
      int count =0;      
      String countquery="SELECT count(1) as count  " +
                        "  FROM monthlyfeedetails m " +
                        "       INNER JOIN generatemonthlyfee g ON g.monthly_fee_id=m.monthly_fee_id " +
                        "       INNER JOIN feestructure f  ON f.fee_structure_id=m.fee_structure_id " +
                        " WHERE m.monthly_fee_id=?" ;
      String dataquery="SELECT m.monthly_fee_id ,m.fee_structure_id , f.fee_name as feename, f.fee_type , m.amount " +
                        "  FROM monthlyfeedetails m " +
                        "       INNER JOIN generatemonthlyfee g ON g.monthly_fee_id=m.monthly_fee_id " +
                        "       INNER JOIN feestructure f  ON f.fee_structure_id=m.fee_structure_id " +
                        " WHERE m.monthly_fee_id=?" ;
                           

       try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery,new Object[]{monthly_fee_id});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,dataquery,new Object[]{monthly_fee_id});
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(StudentMonthlyFeeDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;
        
    }
   
   public void webFeePayment(String transactionid,
                             String custname,
                             String monthlyfeeid,
                             String username
           ) throws SQLException, ReadableException{
   
       String updatequery="UPDATE generatemonthlyfee SET paid_status = ?  , paid_on = ? , paid_by = ? ,"+
                          "	paid_amount = ? WHERE  monthtransid = ? ";
       
       String insertquery="INSERT INTO successfltransaction "+
	                  "(id, transactionid, monthlyfeeid, pidamount, paidby, username) "+
                          "VALUES (?,?,?,?,?,?) ";
       String selectquery="SELECT paid_status FROM generatemonthlyfee WHERE monthly_fee_id= ?";
       
       Connection conn = DbPool.getConnection();
       
       ResultSet rs=DaoUtil.executeQuery(conn, selectquery,monthlyfeeid);
       if(checkStatus(rs)){
       }else{

         if(DaoUtil.executeUpdate(conn, updatequery,new Object[]{
                                                  1,new Date().getTime(),username,0,monthlyfeeid
                                               })==1){
         
              String id = java.util.UUID.randomUUID().toString();
             if(DaoUtil.executeUpdate(conn, insertquery, new Object[]{
                                         id , transactionid,monthlyfeeid,0,custname,username          
                                     })==1){
                 conn.commit();
             }
         }   
       }
   } 
   
   public boolean checkStatus(ResultSet rs){
       
       boolean flag=false;
       try {
            if(rs.next()){
               if(rs.getObject("paid_status")!=null){
                  if(rs.getInt("paid_status")==1)
                    flag=true;  
               } 
            }
        } catch (SQLException ex) {
            Logger.getLogger(StudentMonthlyFeeDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
      return flag;        
   }
   public void failedwebFeePayment(String rectxt,
                                   int code,
                                   int reasoncode,
                                   String custname,
                                   String monthlyfeeid,
                                   String username
           ) throws ReadableException{
            String insert="INSERT INTO failed_payment_transaction " +
                   "(id,monthly_fee_id,paidby,username,responsecode,responsetext,responsereason) "+
                   "VALUES(?,?,?,?,?,?,?)";

            String id = java.util.UUID.randomUUID().toString();

        try {
            Connection conn = DbPool.getConnection();
            if(DaoUtil.executeUpdate(conn, insert,new Object[]{
                                      id , monthlyfeeid,custname,username,code,rectxt,reasoncode
            })==1){
            
                conn.commit();
            }
        } catch (SQLException ex) {
            Logger.getLogger(StudentMonthlyFeeDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
   } 
    
}
