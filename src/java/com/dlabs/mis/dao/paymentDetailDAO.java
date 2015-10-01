/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dlabs.mis.dao;


import com.dlabs.mis.model.FeeInMonthlyFeeOfClass;
import com.dlabs.mis.model.GenerateFee;
import com.dlabs.mis.model.GenerateFeePostData;
import com.dlabs.mis.model.PaymentFeeStructure;
import com.dlabs.mis.model.Timetable;
import com.kjava.base.ReadableException;
import com.kjava.base.db.DaoUtil;
import com.kjava.base.util.ExtJsonUtil;
import com.kjava.base.util.JSONUtil;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;



public class paymentDetailDAO {

      JSONUtil jsonUtil = new ExtJsonUtil();
     
        public Object getAllPaymentDetailsAsJson(Connection conn, int page, int rows) throws ReadableException {

        JSONObject job = new JSONObject();        
        Collection<JSONObject> items = new ArrayList<JSONObject>();
        ResultSet rs = null;
        int count =0;
        int x=0,i=0;
        String schoolid="1000";
        String studentname= null;;
        String classname= null;;
        String duedate= null;;
        int amount=0;
        int totamount=0;
        String fineamount= null;;
        String frommonth= null;;
        String tomonth= null;;
        

        try{
            //rs = DaoUtil.executeQuery(conn, "SELECT count(1) as count from timetable where schoolid=? and classid=?");
            rs = DaoUtil.executeQuery(conn, "SELECT count(1) as count from timetable");
            if(rs.next()) {
                count = rs.getInt("count");

            }
            rs = DaoUtil.executeQuery(conn,"SELECT S.name NAME, C.name ClASS, T.name Template ,"
                                           +"FS.fee_structure_id id , FS.fee_name feename, FS.fee_amount amount "
                                           + "FROM student S ,class C , "
                                           + "     templates T ,feestructure FS , "
                                           + "     template_structure_mapping M "
                                           + "WHERE S.classid=C.classid AND C.feetemplate=T.id "
                                           + "AND T.id=M.template_id AND FS.fee_structure_id=M.fee_structure_id "
                                           + "AND S.studentid ='208aac44-92cb-4296-b61e-cbd09d27e4fb'");

            while(rs.next()){

               studentname=rs.getString("NAME");
               classname  =rs.getString("CLASS");               
               JSONObject obj =new JSONObject();
               obj.put("fee_structure_id",rs.getString("id"));
               obj.put("fee_name",rs.getString("feename"));
               amount=rs.getInt("amount");
               obj.put("fee_amount",amount);
               totamount=totamount+amount;
               items.add(obj);
               x++;
            }

            job.put("studentname",studentname);
            job.put("classname",classname);
            job.put("duedate","2013-05-31");
            job.put("totamount",totamount);
            job.put("fineamount",0);
            job.put("frommonth","May");
            job.put("tomonth","May");
            job.put("feestructure",items);
        }
        catch (SQLException ex) {
            Logger.getLogger(paymentDetailDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;
    }

  

    public Object generateFee(Connection conn,String sessionid, String classid, int month , long duedate) throws ReadableException, SQLException {

        JSONObject job = new JSONObject();        
        Collection<JSONObject> items = new ArrayList<JSONObject>();
        ResultSet rs = null;
        ResultSet rsfee = null;
        ResultSet rsstud = null;
        ResultSet fsrs=null;
        String createdby="ADMIN";//Need to set createdby 
        int amount=0;
        String templateid="";
        String feeid="";
        String class_id="";
        String schoolid="";
        int flag=0;
        //if user has selected session , 
        //and month then generate fee for all class
        
        if(isFeeGeneratedForMonth(conn,sessionid,classid,month)){
           return "{result:2}";
        }
        if(sessionid!=null && month!=0 && classid==null){
         
         rs= DaoUtil.executeQuery(conn, "SELECT batch_id ,template_id as feetemplate FROM sessions WHERE session_id=?",new Object[]{sessionid});               
    
         while(rs.next()){

            if(rs.getObject("batch_id")!=null)
              class_id=rs.getString("batch_id");//get Batchid
            if(rs.getObject("feetemplate")!=null)
              templateid=rs.getString("feetemplate");
           
           String query="SELECT SUM(F.fee_amount) amount "
                      + " FROM feestructure F, templates T ,template_structure_mapping TM "
                      + " WHERE F.fee_structure_id=TM.fee_structure_id    "
                      + " AND TM.template_id=T.id   "
                      + " AND T.id=?";   
           
           rsfee = DaoUtil.executeQuery(conn,query,new Object[]{templateid});               
           if(rsfee.next()){
           if(rsfee.getObject("amount")!=null)
               amount=rsfee.getInt("amount");
           }
           
           String studquery="SELECT student_id as studentid FROM student_class_map scm WHERE scm.batch_id=?";
           rsstud=DaoUtil.executeQuery(conn,studquery,new Object[]{class_id});               
           String studid="";
           while(rsstud.next()){
               
            if(rsstud.getObject("studentid")!=null)
             studid=rsstud.getString("studentid");
               
               String insetquery="INSERT INTO generatemonthlyfee "
                               + " (monthly_fee_id,class_id,student_id,for_month,"
                               + " for_year,amount,templateid,paid_status,createdby,due_date)	"
                               + " VALUES(?,?,?,?,?,?,?,?,?,?)";
               feeid= java.util.UUID.randomUUID().toString();
                               
               if(DaoUtil.executeUpdate(conn, insetquery, new Object[]{feeid,class_id,studid,month,sessionid,amount,templateid,0,createdby,duedate})==1){
                  flag=1;                                    

                      String feestructure="SELECT f.fee_structure_id , f.fee_amount FROM feestructure f , template_structure_mapping t WHERE t.template_id=?   AND f.fee_structure_id =t.fee_structure_id";
                      fsrs =DaoUtil.executeQuery(conn,feestructure,new Object[]{templateid});               

                      String insertquery="INSERT INTO monthlyfeedetails (monthly_fee_id,student_id ,fee_structure_id, amount) VALUES(?,?,?,?)";

                      while(fsrs.next()){
                      
                          String feestru=null;
                          int    amount1=0;
                          
                          if(fsrs.getObject("fee_structure_id")!=null)
                              feestru=fsrs.getString("fee_structure_id");
                          if(fsrs.getObject("fee_amount")!=null)
                              amount1=fsrs.getInt("fee_amount");
                                                    
                          DaoUtil.executeUpdate(conn, insertquery, new Object[]{feeid,studid,feestru,amount1});                                                  
                      }
               }
           } 
         }
         
        }
        else//if user has selected session , class and month all details then generate fee for that selected class
        {
         if(sessionid!=null && month!=0 && classid!=null)
         {
           rs= DaoUtil.executeQuery(conn, "SELECT batch_id ,template_id as feetemplate FROM sessions WHERE session_id=? and class_id=?",new Object[]{sessionid,classid});               
    
           while(rs.next()){

            if(rs.getObject("batch_id")!=null)
              class_id=rs.getString("batch_id");
            if(rs.getObject("feetemplate")!=null)
              templateid=rs.getString("feetemplate");
           
           String query="SELECT SUM(F.fee_amount) amount "
                      + " FROM feestructure F, templates T ,template_structure_mapping TM "
                      + " WHERE F.fee_structure_id=TM.fee_structure_id    "
                      + " AND TM.template_id=T.id   "
                      + " AND T.id=?";   
           
           rsfee = DaoUtil.executeQuery(conn,query,new Object[]{templateid});               
           if(rsfee.next()){
           if(rsfee.getObject("amount")!=null)
               amount=rsfee.getInt("amount");
           }
           
           String studquery="SELECT student_id as studentid FROM student_class_map scm WHERE scm.batch_id=?";
           rsstud=DaoUtil.executeQuery(conn,studquery,new Object[]{class_id});               
           String studid="";
           while(rsstud.next()){
               
            if(rsstud.getObject("studentid")!=null)
             studid=rsstud.getString("studentid");
               
               String insetquery="INSERT INTO generatemonthlyfee "
                               + " (monthly_fee_id,class_id,student_id,for_month,"
                               + " for_year,amount,templateid,paid_status,createdby,due_date)	"
                               + " VALUES(?,?,?,?,?,?,?,?,?,?)";
               feeid= java.util.UUID.randomUUID().toString();
                               
               if(DaoUtil.executeUpdate(conn, insetquery, new Object[]{feeid,class_id,studid,month,sessionid,amount,templateid,0,createdby,duedate})==1){
                  flag=1;                                    

                      String feestructure="SELECT f.fee_structure_id , f.fee_amount FROM feestructure f , template_structure_mapping t WHERE t.template_id=?   AND f.fee_structure_id =t.fee_structure_id";
                      fsrs =DaoUtil.executeQuery(conn,feestructure,new Object[]{templateid});               

                      String insertquery="INSERT INTO monthlyfeedetails (monthly_fee_id,student_id ,fee_structure_id, amount) VALUES(?,?,?,?)";

                      while(fsrs.next()){
                      
                          String feestru=null;
                          int    amount1=0;
                          
                          if(fsrs.getObject("fee_structure_id")!=null)
                              feestru=fsrs.getString("fee_structure_id");
                          if(fsrs.getObject("fee_amount")!=null)
                              amount1=fsrs.getInt("fee_amount");
                                                    
                          DaoUtil.executeUpdate(conn, insertquery, new Object[]{feeid,studid,feestru,amount1});                                                  
                      }
               }
           } 
                      
         }

       }
         
     }
        if(flag==1)
            conn.commit();
            return "{result:1}";
    }

    public Object getAllAsJson1(Connection conn,GenerateFeePostData obj,int page, int rows) throws ReadableException {
        JSONObject job = null;
        ResultSet rs = null;
        int count =0;
        String batchid="";
        
        batchid=new GetBatch(obj.getClassid(),obj.getSessionid()).BatchId(conn);
        
        String countQuery="SELECT COUNT(1) AS count " +
                        "  FROM class c, templates t , student s ,generatemonthlyfee g ,sessions ss " +
                        " WHERE ss.batch_id=g.class_id " +
                        "   AND ss.class_id = c.classid  " +
                        "   AND ss.template_id = t.id   " +
                        "   AND g.student_id = s.studentid " +
                        "   AND g.class_id   = ? " +
                        "   AND g.for_month  = ? ";
        
        String dataquery="SELECT g.monthly_fee_id,g.school_id,g.class_id,c.name classname,g.student_id,CONCAT(CONCAT(CONCAT(CONCAT(s.fname,' '),case when s.mname is null then '' else s.mname end),' '),s.lname) AS studentname, " +
                        "       CASE g.for_month WHEN 1 THEN 'January' WHEN 2 THEN 'February' WHEN 3 THEN 'March' WHEN 4 THEN 'April' WHEN 5 THEN 'May' WHEN 6 THEN 'June' WHEN 7 THEN 'July' WHEN 8 THEN 'August' WHEN 9 THEN 'September' WHEN 10 THEN 'October' WHEN 11 THEN 'November' WHEN 12 THEN 'December' END AS for_month," +
                        "       g.for_year,g.amount,FROM_UNIXTIME(g.due_date/1000,'%d-%m-%Y') as due_date,g.templateid,t.name AS template,CASE g.paid_status WHEN 0 THEN NULL WHEN 1 THEN TRUE END AS markpaid,CASE g.paid_status WHEN 0 THEN 'Payment Pending' WHEN 1 THEN 'Payment Received' END AS paid_status,g.paid_on,g.paid_by,g.paid_amount,g.comment,g.for_month as month " +
                        "  FROM class c, templates t , student s ,generatemonthlyfee g ,sessions ss " +
                        " WHERE ss.batch_id=g.class_id " +
                        "   AND ss.class_id = c.classid  " +
                        "   AND ss.template_id = t.id   " +
                        "   AND g.student_id = s.studentid " +
                        "   AND g.class_id   = ? " +
                        "   AND g.for_month  = ? " +
                        "   LIMIT ? OFFSET ?";

        try{
            rs = DaoUtil.executeQuery(conn, countQuery,new Object[]{batchid,obj.getMonthid()});
            if(rs.next()) {
                count = rs.getInt("count");

            }
            rs = DaoUtil.executeQuery(conn,dataquery,new Object[]{batchid,obj.getMonthid(),200,0});
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(StudentDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;
    }

    public Object getGeneratedFeeList(Connection conn,GenerateFeePostData obj,int page, int rows) throws ReadableException {
        JSONObject job = null;
        ResultSet rs = null;
        int count =0;
        int flag=0;
        String schoolid="1000";
        String countquery="";
        String dataquery="";
        String classid="";
        String sessionid="";
        String monthid  ="";
        String batchid="";
        if(obj.getClassid().equals(""))classid=null;
        if(obj.getSessionid().equals(""))sessionid=null;        

        if(obj.getSessionid()!=null && obj.getClassid()!=null)
           batchid=new GetBatch(obj.getClassid(),obj.getSessionid()).BatchId(conn);
        
        if(flag==0 && classid==null && sessionid==null && obj.getMonthid()==-1 ){
        
            countquery="SELECT COUNT(1) as count FROM generatemonthlyfee g " +
                                            "       INNER JOIN class   c ON   c.classid=g.class_id " +
                                            "       INNER JOIN templates t ON t.id     =g.templateid " +
                                            " ORDER BY for_month DESC";
            
            dataquery ="SELECT g.monthly_fee_id  ,g.class_id,m.value as for_year,FROM_UNIXTIME(g.due_date/1000,'%d-%m-%Y') as  due_date ,g.templateid ,SUM(g.amount) AS amount,sum(paid_amount) AS tot_received " +
                                            "      ,g.createdby , g.createdon,c.name AS classname , t.name AS template , " +
                                            "      CASE g.for_month WHEN 1 THEN 'January' WHEN 2 THEN 'February' WHEN 3 THEN 'March' WHEN 4 THEN 'April' WHEN 5 THEN 'May' WHEN 6 THEN 'June' WHEN 7 THEN 'July' WHEN 8 THEN 'August' WHEN 9 THEN 'September' WHEN 10 THEN 'October' WHEN 11 THEN 'November' WHEN 12 THEN 'December' END AS for_month " +
                                            "  FROM generatemonthlyfee g " +
                                            "       INNER JOIN class   c ON   c.classid=g.class_id " +
                                            "       INNER JOIN templates t ON t.id     =g.templateid " +
                                            "       INNER JOIN master m  ON m.id=g.for_year  "+
                                            " GROUP BY class_id ,for_month " +
                                            " ORDER BY class_id limit ? offset ?";
            flag=1;
        }
        if(flag==0 &&  classid==null && obj.getMonthid()==0 && sessionid!=null){        
           //list out current year generated fees            
            countquery="SELECT COUNT(1) as count " +
                        "  FROM generatemonthlyfee g " +
                        "       INNER JOIN sessions s ON s.batch_id=g.class_id " +
                        "       INNER JOIN class   c ON   c.classid=s.class_id " +
                        "       INNER JOIN templates t ON t.id     =s.template_id " +
                        " WHERE g.for_year= '" +obj.getSessionid() +"' " +
                        " GROUP BY g.class_id,for_month " +
                        " ORDER BY for_month DESC";
            dataquery ="SELECT g.monthly_fee_id  ,g.class_id,g.for_year,FROM_UNIXTIME(g.due_date/1000,'%d-%m-%Y') as  due_date ,g.templateid ,SUM(g.amount) AS amount,sum(paid_amount) AS tot_received " +
                        "      ,g.createdby , g.createdon,c.name AS classname , t.name AS template ," +
                        "      CASE g.for_month WHEN 1 THEN 'January' WHEN 2 THEN 'February' WHEN 3 THEN 'March' WHEN 4 THEN 'April' WHEN 5 THEN 'May' WHEN 6 THEN 'June' WHEN 7 THEN 'July' WHEN 8 THEN 'August' WHEN 9 THEN 'September' WHEN 10 THEN 'October' WHEN 11 THEN 'November' WHEN 12 THEN 'December' END AS for_month" +
                        "    FROM generatemonthlyfee g " +
                        "       INNER JOIN sessions s ON s.batch_id=g.class_id " +
                        "       INNER JOIN class   c ON   c.classid=s.class_id " +
                        "       INNER JOIN templates t ON t.id     =s.template_id " +
                        " WHERE g.for_year= '" +obj.getSessionid() +"' " +
                        " GROUP BY g.class_id,for_month " +
                        " ORDER BY for_month DESC limit ? offset ?";
            flag=1;
        }
        if(flag==0 && classid!=null && (obj.getMonthid()==0 || obj.getMonthid()==13) && sessionid!=null){        
           
            countquery="SELECT COUNT(1) AS count FROM (SELECT COUNT(1)" +
                        "  FROM generatemonthlyfee g " +
                        "       INNER JOIN sessions  s ON   s.batch_id=g.class_id " +
                        "       INNER JOIN class     c ON   c.classid =s.class_id " +
                        "       INNER JOIN templates t ON   t.id      =s.template_id " +
                        "       INNER JOIN master    m ON   m.id      =g.for_year     " +
                        " WHERE g.for_year ='" + obj.getSessionid()  +"'" +
                        "   AND g.class_id ='" + batchid +"' " +
                        " GROUP BY for_month" +
                        ")  tab";
        
            dataquery ="SELECT g.monthly_fee_id  ,g.class_id,m.value AS for_year,FROM_UNIXTIME(g.due_date/1000,'%d-%m-%Y') as  due_date ,g.templateid ,SUM(g.amount) AS amount,SUM(g.paid_amount) AS tot_received " +
                        "      ,g.createdby , g.createdon,c.name AS classname , t.name AS template ," +
                        "      CASE g.for_month WHEN 1 THEN 'January' WHEN 2 THEN 'February' WHEN 3 THEN 'March' WHEN 4 THEN 'April' WHEN 5 THEN 'May' WHEN 6 THEN 'June' WHEN 7 THEN 'July' WHEN 8 THEN 'August' WHEN 9 THEN 'September' WHEN 10 THEN 'October' WHEN 11 THEN 'November' WHEN 12 THEN 'December' END AS for_month" +
                        " FROM generatemonthlyfee g " +
                        "       INNER JOIN sessions  s ON   s.batch_id=g.class_id " +
                        "       INNER JOIN class     c ON   c.classid =s.class_id " +
                        "       INNER JOIN templates t ON   t.id      =s.template_id " +
                        "       INNER JOIN master    m ON   m.id      =g.for_year     " +
                        " WHERE g.for_year ='" + obj.getSessionid()  +"' " +
                        "   AND g.class_id ='" + batchid +"' " +
                        " GROUP BY for_month  limit ? offset ?";
            flag=1;
        }
        if(flag==0 && classid==null && (obj.getMonthid()!=0 || obj.getMonthid()!=13 || obj.getMonthid()!=-1) && sessionid!=null){
        
            countquery=" SELECT COUNT(1) AS count FROM (SELECT COUNT(1)  " +
                        "  FROM generatemonthlyfee g " +
                        "       INNER JOIN sessions     s   ON s.batch_id=g.class_id " +
                        "       INNER JOIN class   c   ON c.classid =s.class_id  " +
                        "       INNER JOIN templates t ON t.id      =s.template_id " +
                        "       INNER JOIN master   m  ON m.id      =g.for_year    " +
                        " WHERE g.for_year = '" + obj.getSessionid()  +"' " +
                        "   AND g.for_month= '" + obj.getMonthid()    +"' " +
                        " GROUP BY g.class_id " +
                        ") tab";
            dataquery ="SELECT g.monthly_fee_id  ,g.class_id,m.value AS for_year,FROM_UNIXTIME(g.due_date/1000,'%d-%m-%Y') as  due_date ,g.templateid ,SUM(g.amount) AS amount,sum(paid_amount) AS tot_received " +
                        "      ,g.createdby , g.createdon,c.name AS classname , t.name AS template ," +
                        "      CASE g.for_month WHEN 1 THEN 'January' WHEN 2 THEN 'February' WHEN 3 THEN 'March' WHEN 4 THEN 'April' WHEN 5 THEN 'May' WHEN 6 THEN 'June' WHEN 7 THEN 'July' WHEN 8 THEN 'August' WHEN 9 THEN 'September' WHEN 10 THEN 'October' WHEN 11 THEN 'November' WHEN 12 THEN 'December' END AS for_month" +
                        "    FROM generatemonthlyfee g  " +
                        "       INNER JOIN sessions     s   ON s.batch_id=g.class_id " +
                        "       INNER JOIN class   c   ON c.classid =s.class_id " +
                        "       INNER JOIN templates t ON t.id      =s.template_id " +
                        "       INNER JOIN master   m  ON m.id      =g.for_year     " +
                        " WHERE g.for_year ='" + obj.getSessionid()  +"'" +
                        "   AND g.for_month='" + obj.getMonthid()    +"'" +
                        " GROUP BY g.class_id  limit ? offset ?";
           flag=1; 
        }        
        if(flag==0 &&  classid!=null && (obj.getMonthid()>=1 && obj.getMonthid()<=12) && sessionid!=null){
        
            countquery="SELECT COUNT(1) AS count " +
                        "  FROM (SELECT COUNT(1)   FROM generatemonthlyfee g " +
                        "  INNER JOIN sessions s  ON s.batch_id=g.class_id " +
                        "  INNER JOIN class   c   ON   c.classid=s.class_id " +
                        "  INNER JOIN templates t ON t.id     =s.template_id " +
                        "  INNER JOIN master   m  ON m.id=g.for_year   " +
                        "  WHERE g.for_month='"+obj.getMonthid()+"' " +
                        "  AND g.class_id ='"+batchid+"' " +
                        ") tab  ";
            
            dataquery ="SELECT g.monthly_fee_id  ,g.class_id,m.value AS for_year,FROM_UNIXTIME(g.due_date/1000,'%d-%m-%Y') as  due_date ,g.templateid ,SUM(g.amount) AS amount,sum(g.paid_amount) AS tot_received " +
                        "      ,g.createdby , g.createdon,c.name AS classname , t.name AS template ," +
                        "      CASE g.for_month WHEN 1 THEN 'January' WHEN 2 THEN 'February' WHEN 3 THEN 'March' WHEN 4 THEN 'April' WHEN 5 THEN 'May' WHEN 6 THEN 'June' WHEN 7 THEN 'July' WHEN 8 THEN 'August' WHEN 9 THEN 'September' WHEN 10 THEN 'October' WHEN 11 THEN 'November' WHEN 12 THEN 'December' END AS for_month " +
                        " FROM generatemonthlyfee g " +
                        " INNER JOIN sessions s  ON s.batch_id=g.class_id   " +
                        " INNER JOIN class   c   ON   c.classid=s.class_id  " +
                        " INNER JOIN templates t ON t.id     =s.template_id " +
                        " INNER JOIN master   m  ON m.id=g.for_year " +
                        " WHERE g.for_month= '"+obj.getMonthid()+"'" +
                        "   AND g.class_id ='"+batchid+"' GROUP BY g.class_id  , g.for_month limit ? offset ?";
            flag=1;
        }     
        try{
            rs = DaoUtil.executeQuery(conn, countquery);
            if(rs.next()) {
                count = rs.getInt("count");

            }
            rs = DaoUtil.executeQuery(conn,dataquery,new Object[]{150,0});
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(StudentDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;
        
    }

    public Object getAllAsJsonStudentWise(Connection conn, GenerateFeePostData obj, String studentid, int page, int rows) throws ReadableException {
     
        JSONObject jsonobj = new JSONObject();        
        ResultSet rs = null;
        String countquery="";
        String dataquery="";
        int count=0;
        String batchid="";
        
        if(obj.getSessionid()!=null && obj.getClassid()!=null)
          batchid=new GetBatch(obj.getClassid(),obj.getSessionid()).BatchId(conn);

        if((obj.getMonthid() > 0 && obj.getMonthid() < 12) && studentid!=null){
           countquery=  "SELECT COUNT(1) AS count " +
                    "  FROM class c, templates t , student s ,generatemonthlyfee g , sessions ss " +
                    " WHERE ss.batch_id=g.class_id " +
                    "   AND ss.class_id   = c.classid " +
                    "   AND ss.template_id = t.id   " +
                    "   AND g.student_id = s.studentid " +
                    "   AND g.student_id = '"+studentid+"' " +
                    "   AND g.class_id   = '"+batchid+"' " +
                    "   AND g.for_month  = '"+obj.getMonthid()+"' " ;
           
          dataquery="SELECT g.monthly_fee_id,g.school_id,g.class_id,c.name classname,g.student_id,CONCAT(CONCAT(CONCAT(CONCAT(s.fname,' '),case when s.mname is null then '' else s.mname end),' '),s.lname) AS studentname, " +
                    "       CASE g.for_month WHEN 1 THEN 'January' WHEN 2 THEN 'February' WHEN 3 THEN 'March' WHEN 4 THEN 'April' WHEN 5 THEN 'May' WHEN 6 THEN 'June' WHEN 7 THEN 'July' WHEN 8 THEN 'August' WHEN 9 THEN 'September' WHEN 10 THEN 'October' WHEN 11 THEN 'November' WHEN 12 THEN 'December' END AS for_month," +
                    "       g.for_year,g.amount,FROM_UNIXTIME(g.due_date/1000,'%d-%m-%Y') as  due_date,g.templateid,t.name AS template,CASE g.paid_status WHEN 0 THEN NULL WHEN 1 THEN TRUE END AS markpaid,CASE g.paid_status WHEN 0 THEN 'Payment Pending' WHEN 1 THEN 'Payment Received' END AS paid_status,g.paid_on,g.paid_by,g.paid_amount,g.comment,g.for_month AS MONTH " +
                    "  FROM class c, templates t , student s ,generatemonthlyfee g , sessions ss " +
                    " WHERE ss.batch_id=g.class_id " +
                    "   AND ss.class_id   = c.classid " +
                    "   AND ss.template_id = t.id   " +
                    "   AND g.student_id = s.studentid " +
                    "   AND g.student_id = '"+studentid+"' " +
                    "   AND g.class_id   = '"+batchid+"' " +
                    "   AND g.for_month  = '"+obj.getMonthid()+"' " +
                    "   LIMIT ? OFFSET ?";

        }
        if(studentid!=null && (obj.getMonthid()<=0 ||obj.getMonthid() > 12 ) ){
           countquery=  "SELECT count(1) as count " +
                    "  FROM class c, templates t , student s ,generatemonthlyfee g  , sessions ss " +
                    " WHERE ss.batch_id=g.class_id " +
                    "   AND ss.class_id = c.classid  " +
                    "   AND ss.template_id = t.id    " +
                    "   AND g.student_id = s.studentid " +
                    "   AND g.student_id = '"+studentid+"'  " +
                    "   AND g.class_id   = '"+batchid+"'";


                        
          dataquery="SELECT g.monthly_fee_id,g.school_id,g.class_id,c.name classname,g.student_id,CONCAT(CONCAT(CONCAT(CONCAT(s.fname,' '),case when s.mname is null then '' else s.mname end),' '),s.lname) AS studentname, " +
                    "       CASE g.for_month WHEN 1 THEN 'January' WHEN 2 THEN 'February' WHEN 3 THEN 'March' WHEN 4 THEN 'April' WHEN 5 THEN 'May' WHEN 6 THEN 'June' WHEN 7 THEN 'July' WHEN 8 THEN 'August' WHEN 9 THEN 'September' WHEN 10 THEN 'October' WHEN 11 THEN 'November' WHEN 12 THEN 'December' END AS for_month, " +
                    "       g.for_year,g.amount,FROM_UNIXTIME(g.due_date/1000,'%d-%m-%Y') as  due_date,g.templateid,t.name AS template,CASE g.paid_status WHEN 0 THEN NULL WHEN 1 THEN TRUE END AS markpaid,CASE g.paid_status WHEN 0 THEN 'Payment Pending' WHEN 1 THEN 'Payment Received' END AS paid_status,g.paid_on,g.paid_by,g.paid_amount,g.comment,g.for_month AS MONTH " +
                    "  FROM class c, templates t , student s ,generatemonthlyfee g  , sessions ss " +
                    " WHERE ss.batch_id=g.class_id " +
                    "   AND ss.class_id = c.classid  " +
                    "   AND ss.template_id = t.id    " +
                    "   AND g.student_id = s.studentid " +
                    "   AND g.student_id = '"+studentid+"'  " +
                    "   AND g.class_id   = '"+batchid+"'" +
                    "   LIMIT ? OFFSET ?";
        
        }  
        try{
            rs = DaoUtil.executeQuery(conn, countquery);
            if(rs.next()) {
                count = rs.getInt("count");

            }
            rs = DaoUtil.executeQuery(conn,dataquery,new Object[]{15,0});
            jsonobj = jsonUtil.getJsonObject(rs, count, page,rows, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(StudentDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return jsonobj;
    }

    public FeeInMonthlyFeeOfClass addFeeInMonthlyFeeOfClass(Connection conn, FeeInMonthlyFeeOfClass obj) throws ReadableException{

        String batch_id=new GetBatch(obj.getV_classid(), obj.getV_sessionid()).BatchId(conn);
        String templateid=null;
        ResultSet rs = null,rsfee=null,rsstud=null;
        int amount=0;
        String monthly_fee_id=null,student_id=null; 
        String amount_query="SELECT fee_amount FROM feestructure WHERE fee_structure_id=?";
        String update_query="UPDATE generatemonthlyfee SET amount=amount + ? WHERE monthly_fee_id=?";
        String insert_query="INSERT INTO monthlyfeedetails (monthly_fee_id, student_id, fee_structure_id, amount) VALUES(?,?,?,?)";
        String select_query="SELECT monthly_fee_id ,student_id  FROM generatemonthlyfee WHERE class_id=? AND for_month= ?";
        String check_query="SELECT COUNT(1) as count FROM monthlyfeedetails WHERE monthly_fee_id IN (SELECT monthly_fee_id FROM generatemonthlyfee WHERE class_id = '"+batch_id+"' AND for_month = '"+obj.getV_month()+"' ) AND fee_structure_id = '"+obj.getFeetype()+"' ";
        obj.setResult(0);
        try {        
        rs=DaoUtil.executeQuery(conn,check_query);
        if(rs!=null && rs.next())
        {
          if(rs.getInt("count")==0){
            rs=DaoUtil.executeQuery(conn,amount_query,new Object[]{obj.getFeetype()});
            if(rs.next() && rs.getObject("fee_amount")!=null)
                amount=rs.getInt("fee_amount");
            if(obj.getExistencetype()==1){
              rs=DaoUtil.executeQuery(conn,select_query,new Object[]{batch_id,obj.getV_month()});            
             while(rs!=null && rs.next()){
                monthly_fee_id=rs.getString("monthly_fee_id");
                student_id    =rs.getString("student_id");
                DaoUtil.executeUpdate(conn, insert_query, new Object[]{monthly_fee_id,student_id,obj.getFeetype(),amount}); 
                DaoUtil.executeUpdate(conn, update_query, new Object[]{amount,monthly_fee_id}); 
             }
            conn.commit();
            obj.setResult(1);/*Fee Added Successfully*/
        }
        }
          else{
            obj.setResult(2);/*Fee Alreay Added*/
          }
        }
        }
        catch(SQLException sqlexp){
            Logger.getLogger(paymentDetailDAO.class.getName()).log(Level.SEVERE, null, sqlexp);
        }
        return obj;
    }

    private boolean isFeeGeneratedForMonth(Connection conn,String sessionid, String classid, int month) throws ReadableException {

        String check_query="SELECT COUNT(1) as count FROM generatemonthlyfee WHERE class_id=? AND for_month=?";
        ResultSet rs=null;
        String batch_id=new GetBatch(classid,sessionid).BatchId(conn);
        try {
            rs=DaoUtil.executeQuery(conn, check_query,new Object[]{batch_id,month});
            if(rs!=null && rs.next())
            {
               if(rs.getInt("count") > 0 )
                   return true;
               else
                   return false;
            }    
        }
        catch(Exception exp){
            Logger.getLogger(paymentDetailDAO.class.getName()).log(Level.SEVERE, null, exp);
        }
        return false;
    }
    
    public Object getSchoolDetails(Connection conn) throws ReadableException{
    
        JSONObject job = null;
        ResultSet rs = null;
        int count =0;
        String batchid="";
        
        String countQuery="";
        
        String dataquery="";

        try{
            rs = DaoUtil.executeQuery(conn, countQuery);
            if(rs.next()) {
                count = rs.getInt("count");

            }
            rs = DaoUtil.executeQuery(conn,dataquery);
            job = jsonUtil.getJsonObject(rs, count, 1,15, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(StudentDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;
        
       
    }

    public Object getPaymentReciept(Connection conn, String monthly_fee_id, int i, int i0) {
       
       String schooldetail="SELECT schoolname ,logopath,schooltitle,websiteurl,addressline1,addressline2 ,city ,state,country , pinnumber,contact1,contact2, emailid1 FROM schooladmin";

       String mainquery="SELECT g.monthtransid ,g.monthly_fee_id,g.class_id,c.name AS classname,"+
                        " g.student_id,CONCAT(CONCAT(CONCAT(CONCAT(fname,' '),case when mname is null then '' else mname end),' '),lname) AS studentname,	"+
                        " CASE g.for_month WHEN 1 THEN 'January' WHEN 2 THEN 'February' WHEN 3 THEN 'March' WHEN 4 THEN 'April' WHEN 5 THEN 'May' WHEN 6 THEN 'June' WHEN 7 THEN 'July' WHEN 8 THEN 'August' WHEN 9 THEN 'September' WHEN 10 THEN 'October' WHEN 11 THEN 'November' WHEN 12 THEN 'December' END AS MONTH,	"+
                        " g.for_month, "+
                        " g.for_year, 	m.value AS YEAR,	g.amount, FROM_UNIXTIME(g.due_date/1000,'%d-%m-%Y') AS	due_date, "+
                        " g.templateid,CASE g.paid_status WHEN 0 THEN '0' WHEN 1 THEN '1' END AS paid_status,CASE g.paid_status WHEN 0 THEN 'Not Paid' WHEN 1 THEN 'Paid' END AS STATUS,FROM_UNIXTIME(g.paid_on/1000,'%d-%m-%Y') AS paid_on,"+
                        " g.paid_by,g.paid_amount , u.name AS username ,s.fathername ,scm.roll_no  AS rollnumber , CONCAT(CONCAT(s.address,' , '),s.cityid) AS studadd ,u.userid"+
                        " FROM generatemonthlyfee g "+
                        " INNER JOIN sessions ss ON ss.batch_id=g.class_id"+
                        " INNER JOIN class c     ON c.classid=ss.class_id "+
                        " INNER JOIN student s   ON s.studentid=g.student_id  "+
                        " INNER JOIN student_class_map scm ON scm.batch_id=ss.batch_id AND scm.student_id=s.studentid "+
                        " INNER JOIN master m    ON m.id=g.for_year "+
                        " INNER JOIN users  u    ON u.userid=s.userid "+
                        " WHERE g.monthly_fee_id=?";
       
       String feequery="SELECT m.monthly_fee_id ,m.fee_structure_id , f.fee_name AS feename, f.fee_type , m.amount "+
                          "FROM monthlyfeedetails m "+
                          "     INNER JOIN generatemonthlyfee g ON g.monthly_fee_id=m.monthly_fee_id "+
                          "     INNER JOIN feestructure f  ON f.fee_structure_id=m.fee_structure_id "+
                          "WHERE m.monthly_fee_id=?";
        JSONObject job = new JSONObject();        
        Collection<JSONObject> items = new ArrayList<JSONObject>();
        int totamount=0;
        int feeamount=0;
        int netamount=0,fineamount=0,discountamount=0;
        String feedesc =null;
        String feename=null;
        
        try {
            
            ResultSet rs=DaoUtil.executeQuery(conn,schooldetail);
            ResultSet rs1=DaoUtil.executeQuery(conn,mainquery,new Object[]{monthly_fee_id});
            ResultSet rs2=DaoUtil.executeQuery(conn,feequery,new Object[]{monthly_fee_id});
            
            while(rs.next()){
                
               // if(rs.getObject("pricipalname")!=null)
               // job.put("principalname",rs.getString("pricipalname"));
                        
                if(rs.getObject("schoolname")!=null)
                job.put("schoolname",rs.getString("schoolname"));

                if(rs.getObject("logopath")!=null)
                job.put("logopath",rs.getString("logopath"));
                
                if(rs.getObject("websiteurl")!=null)
                job.put("websiteurl",rs.getString("websiteurl"));
                        
                if(rs.getObject("addressline1")!=null)
                job.put("addressline1",rs.getString("addressline1"));
                
                if(rs.getObject("addressline2")!=null)
                job.put("addressline2",rs.getString("addressline2"));
                
                if(rs.getObject("city")!=null)
                job.put("city",rs.getString("city"));
                
                if(rs.getObject("state")!=null)                
                job.put("state",rs.getString("state"));
                
                if(rs.getObject("country")!=null)
                job.put("country",rs.getString("country"));
                
                if(rs.getObject("pinnumber")!=null)
                job.put("pinnumber",rs.getString("pinnumber"));
                
                if(rs.getObject("contact1")!=null)
                job.put("contact1",rs.getString("contact1"));
                
                if(rs.getObject("contact2")!=null)
                job.put("contact2",rs.getString("contact1"));
                
                if(rs.getObject("emailid1")!=null)
                job.put("emailid1",rs.getString("emailid1"));
            }

          if(rs1.next()){
          if(rs1.getObject("studentname")!=null)job.put("studentname",rs1.getString("studentname"));  
          if(rs1.getObject("fathername")!=null) job.put("fathername",rs1.getString("fathername"));
          if(rs1.getObject("classname")!=null)  job.put("classname",rs1.getString("classname"));            
          if(rs1.getObject("rollnumber")!=null) job.put("rollnumber",rs1.getString("rollnumber"));            
          if(rs1.getObject("studadd")!=null)    job.put("studadd",rs1.getString("studadd"));
          if(rs1.getObject("due_date")!=null)   job.put("duedate",rs1.getString("due_date"));
          if(rs1.getObject("month")!=null && rs1.getObject("year")!=null)
              job.put("month",rs1.getString("year") +" , "+rs1.getString("month"));
          if(rs1.getObject("amount")!=null)     job.put("totamount",rs1.getInt("amount"));
          if(rs1.getObject("username")!=null)   job.put("username",rs1.getString("username"));
          if(rs1.getObject("monthtransid")!=null)job.put("monthtransid",rs1.getInt("monthtransid"));
          
       }
         totamount=0;
                      while(rs2.next()){
                         if(rs2.getObject("feename")!=null && rs2.getObject("amount")!=null)
                         {
                           JSONObject obj1 =new JSONObject();  
                           feeamount=rs2.getInt("amount");  
                           obj1.put("feeName",rs2.getString("feename"));
                           obj1.put("amount",feeamount);
                           totamount=totamount +feeamount;
                           items.add(obj1);
                         }
                      }
         netamount=totamount-fineamount+discountamount;             
         job.put("totamount",totamount);
         job.put("fineamount",fineamount);
         job.put("discountamount",discountamount);
         job.put("netamount",netamount);
         job.put("feedata",items);
         
        } catch (ReadableException ex) {
            Logger.getLogger(StudentDAO.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(StudentDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;
    }
            
            
}
