/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

import com.dlab.spring.web.dao.AbstractSimpleDao;
import com.dlabs.mis.model.BookDetail;
import com.dlabs.mis.model.BookTransaction;
import com.kjava.base.ReadableException;
import com.kjava.base.db.DaoUtil;
import com.kjava.base.util.ExtJsonUtil;
import com.kjava.base.util.JSONUtil;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Repository;

/**
 *
 * @author cd
 */
@Repository("libraryDAO")
public class LibraryDAO extends AbstractSimpleDao{

    JSONUtil jsonUtil = new ExtJsonUtil();
    
    public BookDetail addOrEditBook(Connection conn, BookDetail obj) throws ReadableException {

        try {
        if(obj.getId().equalsIgnoreCase("")){
          String insert="INSERT INTO bookdetail (id,booktype,title,publisher,author,bookcode,bookedition,description, " +
                        " price,forsubject,forclass,softcopyavailable,totalcopy,createdby,modifiedby,createdon) " +
                        " VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_DATE)";  
        
          String id = java.util.UUID.randomUUID().toString();
          
          if(DaoUtil.executeUpdate(conn, insert,new Object[]{
                                       id , obj.getBooktype(),obj.getTitle(),obj.getPublisher(),obj.getAuthor(),
                                       obj.getBookcode(),obj.getBookedition(),obj.getDescription(),
                                       obj.getPrice(),obj.getForsubject(),obj.getForclass(),obj.getSoftcopyavailable(),
                                       obj.getTotalcopy(),obj.getCreatedby(),obj.getModifiedby()
          })==1){
              obj.setId(id);
              conn.commit();
          }
                
        }
        else{
           String updatequery="UPDATE  bookdetail SET booktype = ? , title = ? , publisher = ? , author = ? , 	bookcode = ? ,bookedition = ?, description = ? ,price = ?, forsubject = ? , 	softcopyavailable = ? , 	totalcopy = ? ,	modifiedby = ? 	WHERE id = ?";
           if(DaoUtil.executeUpdate(conn, updatequery,new Object[]{
                                       obj.getBooktype(),obj.getTitle(),obj.getPublisher(),obj.getAuthor(),
                                       obj.getBookcode(),obj.getBookedition(),obj.getDescription(),
                                       obj.getPrice(),obj.getForsubject(),obj.getSoftcopyavailable(),
                                       obj.getTotalcopy(),obj.getModifiedby() , obj.getId()
          })==1){
              conn.commit();
          }       
    
        }
        } catch (SQLException ex) {
            throw new ReadableException(ex.getCause(),ex.getMessage(),"LibraryDAO", "addoredit");
        }
        return obj;
    }

    public Object getAllBooksAsJson(Connection conn, String searchstring,int page, int rows) throws ReadableException {

        JSONObject job = null;
        String countquery = "SELECT count(1) as count FROM bookdetail WHERE deleted=0";
        String selectquery= "SELECT * FROM bookdetail WHERE deleted=0";
        
        if(!searchstring.equals("")){
            countquery  = countquery   + " and " + searchstring;
            selectquery = selectquery  + " and " + searchstring; 
        }
        selectquery = selectquery  + " LIMIT ? OFFSET ?";
        
        int count =0;        
        try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery);
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{15,0});
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;
        
    }

    public Object getBookDetail(Connection conn, String id) throws ReadableException {

       JSONObject job = null; 
       int count=0;
       String query="SELECT 	bd.id,bd.bookno,m.value AS booktype,bd.title, " +
                    "	bd.publisher,bd.author,bd.bookcode,bd.bookedition,bd.description,bd.price," +
                    "	m1.value AS forsubject,c.name AS forclass ,bd.softcopyavailable,bd.totalcopy,bd.totissued " +
                    "  FROM 	bookdetail bd " +
                    "  INNER JOIN master m  ON m.id=bd.booktype " +
                    "  LEFT  JOIN master m1 ON m1.id =bd.forsubject " +
                    "  LEFT  JOIN class  c  ON c.classid =bd.forclass " +
                    " WHERE  deleted=0 AND bd.id=?";
      try{
            ResultSet rs = DaoUtil.executeQuery(conn,"SELECT count(1) as count FROM bookdetail WHERE deleted=0 and id=?",new Object[]{id});
            if(rs.next()) {
                count = rs.getInt("count");
               if(count==1 ) 
                   rs = DaoUtil.executeQuery(conn,query,new Object[]{id});
                   job = jsonUtil.getJsonObject(rs, count,1,10, false);
            }
            
        }
        catch (SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;   
    }

   /*
  1. JDBC DEtails
2. Reports break
3. Edit Fee.....
4. Student one link all data  
   */ 
    
    public BookTransaction addIssueBook(Connection conn, BookTransaction obj) throws ReadableException {
        
      String insert="INSERT INTO booktransaction " +
                    "         	(" +
                    "         	 id,bookid,issueto,batchid,studentid,teacherid,fromdate, " +
                    "	         todate,issuedby,description " +
                    "	        )" +
                    "VALUES(?,?,?,?,?,?,?,?,?,?) "; 
      String update="UPDATE bookdetail SET totissued = totissued + 1  WHERE id= ?" ;
      String batchid=null;
      String id = java.util.UUID.randomUUID().toString();  
      if(obj.getIssueto()==2)
         batchid=new GetBatch(obj.getClassid(),obj.getSessionid()).BatchId(conn);
      if(obj.getIssueto()==1)
         batchid=obj.getSessionid();
    
      try{
      if(DaoUtil.executeUpdate(conn, insert,new Object[]{
                                            id , obj.getBookid(),obj.getIssueto(),
                                            batchid,obj.getStudentid(),obj.getTeacherid(),
                                            obj.getFromdate(),obj.getTodate(),obj.getIssuedby(),
                                            obj.getDescription()
      })==1){
         
          if(DaoUtil.executeUpdate(conn,update,new Object[]{obj.getBookid()})==1){
                obj.setId(id);
                conn.commit();
          }
      }}catch (SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }  
        return obj;
    }
    
     public Object getAllIssuedBooksAsJson(Connection conn,int issueto,String teacherid ,String classid,String sessionid,String studentid,int page, int rows) throws ReadableException {

        JSONObject job = null;
        
        if(issueto==1){
             job=getIssuedToTeacher(conn,teacherid,sessionid,page,rows);
        }
        else if(issueto==2){
             job=getIssuedToStudent(conn,classid,sessionid,studentid,page,rows);
        }
        return job;
    }

    private JSONObject getIssuedToTeacher(Connection conn, String teacherid, String sessionid,int page,int rows) throws ReadableException {

        if(teacherid.equals("")){
           return getIssueToAllTeacher(conn,sessionid,page,rows);  
        }
        else{
           return getIssueToIndTeacher(conn,sessionid,teacherid,page,rows);    
        }
    }

    private JSONObject getIssuedToStudent(Connection conn, String classid, String sessionid, String studentid,int page,int rows) throws ReadableException {
        
        if(classid!=null && studentid.equals("")){
            return getIssuedToClass(conn,sessionid,classid,page,rows);
        }
        else{
            return getIssuedToIndStudent(conn,sessionid,classid,studentid,page,rows);
        }
    }

    private JSONObject getIssueToAllTeacher(Connection conn, String sessionid,int page,int rows) throws ReadableException {

        JSONObject job = null;
        int count=0;
        String selectquery  ="SELECT bd.bookno,bt.id,bt.bookid,bd.title, " +
                            "        bt.teacherid,u.name AS teachername, " +
                            "	FROM_UNIXTIME(bt.fromdate/1000,'%d-%m-%Y') AS fromdate," +
                            "	FROM_UNIXTIME(bt.todate/1000,'%d-%m-%Y') AS todate,bt.todate as todateorg ,bt.issueddate,bt.issuedby,bt.returnedflag, " +
                            "	bt.returneddate,bt.renewedflag,bt.renewdnumber,bt.latefineflag,bt.fineamount,bt.description " +
                            "  FROM 	booktransaction bt " +
                            " INNER  JOIN bookdetail  bd ON bd.id=bt.bookid " +
                            "  LEFT  JOIN users   u      ON u.userid=bt.teacherid " +
                            " WHERE  bt.returnedflag=0 " +
                            "   AND  bt.issueto=1    " +
                            "   AND  bt.batchid=? " +
                            " ORDER  BY fromdate DESC LIMIT ? OFFSET ?";  
        String countquery = "SELECT  COUNT(1) as count " +
                            "  FROM 	booktransaction bt " +
                            " INNER  JOIN bookdetail  bd ON bd.id=bt.bookid " +
                            "  LEFT  JOIN users   u      ON u.userid=bt.teacherid " +
                            " WHERE  bt.returnedflag=0 " +
                            "   AND  bt.issueto=1    " +
                            "   AND  bt.batchid=?";  

        try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery,new Object[]{sessionid});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{sessionid,15,0});
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
       return job; 
    }

    private JSONObject getIssueToIndTeacher(Connection conn, String sessionid, String teacherid,int page,int rows) throws ReadableException {
        JSONObject job = null;
        int count=0;
        String selectquery  ="SELECT 	bt.id,bd.bookno,bt.bookid,bd.title, " +
                            "        bt.teacherid,u.name AS teachername, " +
                            "	FROM_UNIXTIME(bt.fromdate/1000,'%d-%m-%Y') AS fromdate," +
                            "	FROM_UNIXTIME(bt.todate/1000,'%d-%m-%Y') AS todate,bt.todate as todateorg,bt.issueddate,bt.issuedby,bt.returnedflag, " +
                            "	bt.returneddate,bt.renewedflag,bt.renewdnumber,bt.latefineflag,bt.fineamount,bt.description " +
                            "  FROM 	booktransaction bt " +
                            " INNER  JOIN bookdetail  bd ON bd.id=bt.bookid " +
                            "  LEFT  JOIN users   u      ON u.userid=bt.teacherid " +
                            " WHERE  bt.returnedflag=0 " +
                            "   AND  bt.issueto=1    " +
                            "   AND  bt.batchid=? AND  bt.teacherid=? " +
                            " ORDER  BY fromdate DESC LIMIT ? OFFSET ?";  
        String countquery = "SELECT  COUNT(1) as count " +
                            "  FROM 	booktransaction bt " +
                            " INNER  JOIN bookdetail  bd ON bd.id=bt.bookid " +
                            "  LEFT  JOIN users   u      ON u.userid=bt.teacherid " +
                            " WHERE  bt.returnedflag=0 " +
                            "   AND  bt.issueto=1    " +
                            "   AND  bt.batchid=? AND  bt.teacherid=? ";  

        try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery,new Object[]{sessionid,teacherid});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{sessionid,teacherid,15,0});
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
       return job; 

    }

    private JSONObject getIssuedToClass(Connection conn, String sessionid, String classid,int page,int rows) throws ReadableException {
        JSONObject job = null;
        int count=0;
        String selectquery     ="SELECT bt.id,bd.bookno,bt.bookid,bd.title,c.name AS classname,bt.studentid," +
                                "       CONCAT(CONCAT(CONCAT(CONCAT(s.fname,' '),case when s.mname is null then '' else s.mname end),' '),s.lname) AS studentname," +
                                "	FROM_UNIXTIME(bt.fromdate/1000,'%d-%m-%Y') AS fromdate," +
                                "	FROM_UNIXTIME(bt.todate/1000,'%d-%m-%Y') AS todate,bt.todate as todateorg,bt.issueddate,bt.issuedby,bt.returnedflag, " +
                                "	bt.returneddate,bt.renewedflag,bt.renewdnumber,bt.latefineflag,bt.fineamount,bt.description " +
                                "  FROM booktransaction bt" +
                                " INNER JOIN bookdetail  bd ON bd.id=bt.bookid " +
                                " INNER JOIN sessions  ss   ON ss.batch_id=bt.batchid " +
                                " INNER JOIN class    c     ON ss.class_id=c.classid " +
                                "  LEFT JOIN student  s     ON s.studentid=.bt.studentid " +
                                " WHERE bt.returnedflag=0 " +
                                "   AND bt.issueto=2 " +
                                "   AND bt.batchid=? " +
                                " ORDER BY FROMDATE DESC LIMIT ? OFFSET ?";  
        String countquery = "SELECT 	COUNT(1) AS count " +
                            "  FROM 	booktransaction bt " +
                            " INNER  JOIN bookdetail  bd ON bd.id=bt.bookid " +
                            " INNER  JOIN sessions  ss   ON ss.batch_id=bt.batchid " +
                            " INNER  JOIN class    c     ON ss.class_id=c.classid " +
                            "  LEFT  JOIN student  s     ON s.studentid=.bt.studentid " +
                            " WHERE  bt.returnedflag=0 " +
                            "   AND  bt.issueto=2 " +
                            "   AND  bt.batchid=?";  

        String batchid=new GetBatch(classid, sessionid).BatchId(conn);
        try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery,new Object[]{batchid});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{batchid,15,0});
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
       return job; 

    }

    
    private JSONObject getIssuedToIndStudent(Connection conn, String sessionid, String classid,String studentid,int page,int rows) throws ReadableException {
        JSONObject job = null;
        int count=0;
        String selectquery     ="SELECT bt.id,bd.bookno,bt.bookid,bd.title,c.name AS classname,bt.studentid," +
                                "       CONCAT(CONCAT(CONCAT(CONCAT(s.fname,' '),case when s.mname is null then '' else s.mname end),' '),s.lname) AS studentname," +
                                "	FROM_UNIXTIME(bt.fromdate/1000,'%d-%m-%Y') AS fromdate," +
                                "	FROM_UNIXTIME(bt.todate/1000,'%d-%m-%Y') AS todate,bt.todate as todateorg,bt.issueddate,bt.issuedby,bt.returnedflag, " +
                                "	bt.returneddate,bt.renewedflag,bt.renewdnumber,bt.latefineflag,bt.fineamount,bt.description " +
                                "  FROM booktransaction bt" +
                                " INNER JOIN bookdetail  bd ON bd.id=bt.bookid " +
                                " INNER JOIN sessions  ss   ON ss.batch_id=bt.batchid " +
                                " INNER JOIN class    c     ON ss.class_id=c.classid " +
                                "  LEFT JOIN student  s     ON s.studentid=.bt.studentid " +
                                " WHERE bt.returnedflag=0 " +
                                "   AND bt.issueto=2 " +
                                "   AND bt.batchid=? AND  bt.studentid=? " +
                                " ORDER BY FROMDATE DESC LIMIT ? OFFSET ?";  
        String countquery = "SELECT 	COUNT(1) AS count " +
                            "  FROM 	booktransaction bt " +
                            " INNER  JOIN bookdetail  bd ON bd.id=bt.bookid " +
                            " INNER  JOIN sessions  ss   ON ss.batch_id=bt.batchid " +
                            " INNER  JOIN class    c     ON ss.class_id=c.classid " +
                            "  LEFT  JOIN student  s     ON s.studentid=.bt.studentid " +
                            " WHERE  bt.returnedflag=0 " +
                            "   AND  bt.issueto=2 " +
                            "   AND  bt.batchid=? AND  bt.studentid=?";  

        String batchid=new GetBatch(classid, sessionid).BatchId(conn);
        try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery,new Object[]{batchid,studentid});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{batchid,studentid,15,0});
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
       return job; 
    }

    public BookTransaction returnIssueBook(Connection conn, BookTransaction obj) throws ReadableException {

        
        String[] updatequery=new String[2];
        updatequery[0]="UPDATE booktransaction SET returneddate  = ? , latefineflag = ? , fineamount = ? , returncomment = ? , returnedflag  = 1 WHERE id = ? ";
        updatequery[1]="UPDATE bookdetail SET totissued= totissued - 1 WHERE id=?";
        try{
        if(obj.getId()!=null && obj.getBookid()!=null){
           
            if(DaoUtil.executeUpdate(conn, updatequery[0],new Object[]{
                                                     obj.getReturndate(),obj.getLatefineflag(),
                                                     obj.getFineamount(),obj.getDescription(),obj.getId()
            })==1){
            
                if(DaoUtil.executeUpdate(conn, updatequery[1],new Object[]{obj.getBookid()})==1)
                {
                    obj.setResult(1);
                    conn.commit();
                    obj.setTotbookrequest(checkBookRequest(conn,obj));
                }    
            }
            
        }} catch (SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return obj;
    }

    public BookTransaction renewalIssueBook(Connection conn, BookTransaction obj) throws ReadableException {
        String updatequery=new String();
        updatequery="UPDATE booktransaction SET todate = ? , renewedflag = 1 , renewdnumber =renewdnumber + 1 , renewalby = ? WHERE id = ?";
        try{
        if(obj.getId()!=null){
           
                if(DaoUtil.executeUpdate(conn, updatequery,new Object[]{obj.getTodate(),obj.getIssuedby(),obj.getId()})==1)
                {
                    obj.setResult(1);
                    conn.commit();
                }    
        }} catch (SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return obj;

    }
    
    public Map<String, Object> deleteBook(Connection conn, Map<String, Object> model) throws ReadableException {
        //logger.debug("Paaram:"+model);
        
        if(conn!=null && model!=null)    {
            try {
                String checkquery = this.sqlQueries.getProperty("CHECK_BOOK_BOOKING");
                String query = this.sqlQueries.getProperty("DELETE_BOOK");
                ResultSet rs = DaoUtil.executeQuery(conn,checkquery,new Object[]{model.get("id").toString()});
                if(rs.next()) {
                    if(rs.getInt("count") == 0){
                         if(this.jdbcTemplate.update(query, model) > 0) {
                              model.put("result", 1);/*Deleted Succesfully*/
                         }
                    }
                    else
                    {
                        model.put("result", 2);
                    }    
                }
               
            } catch (SQLException ex) {
                model.put("result", 3);
                Logger.getLogger(LibraryDAO.class.getName()).log(Level.SEVERE, null, ex);
                
            }
  
        }
        return model;
    }
   public Map<String, Object> addBookRequest(Connection conn, Map<String, Object> model) throws ReadableException {
        //logger.debug("Paaram:"+model);
        try {
        if(conn!=null && model!=null)    {
            
        if(model.get("requestedby").toString().equals("1")) {
               model.put("requesterid",model.get("teacherid").toString());
               model.put("batchid", null);
        }       
        else {
               String batchid=new GetBatch(model.get("classid").toString(),model.get("sessionid").toString()).BatchId(conn);
               model.put("requesterid",model.get("studentid").toString());
               model.put("batchid", batchid);
        }       
        
        String query = this.sqlQueries.getProperty("ADD_BOOK_REQUEST_DEMAND"); 
        model.put("requestid",UUID.randomUUID().toString());
        if(this.jdbcTemplate.update(query, model) > 0) {
            model.put("result",1);
            conn.commit();
              
        }
        }
        } 
        catch (SQLException ex) {
            model.put("result",2);
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return model;
    }

    private int checkBookRequest(Connection conn, BookTransaction obj) throws ReadableException {
        
        try {
            String checkquery = this.sqlQueries.getProperty("CHECK_BOOK_REQUEST");
            ResultSet rs = DaoUtil.executeQuery(conn,checkquery,new Object[]{obj.getBookid()});
            if(rs.next()) {
               return rs.getInt("count"); 
            }
        } catch (SQLException ex) {
            Logger.getLogger(LibraryDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return 0;
    }

    public Object getBookRequesterListAsJson(Connection conn, String bookid, int page, int rows) throws ReadableException {
        JSONObject job = null;
        int count=0;
        String selectquery  =this.sqlQueries.getProperty("GET_BOOK_REQUESTER_LIST");
        String countquery = this.sqlQueries.getProperty("GET_BOOK_REQUESTER_LIST_COUNT");  

        try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery,new Object[]{bookid});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{bookid,15,0});
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
       return job; 
    }
    
    
    public JSONObject getAllBookHistoryAsJson(Connection conn, String bookid,int page,int rows) throws ReadableException {

        JSONObject job = null;
        int count=0;
        String selectquery  =this.sqlQueries.getProperty("GET_BOOKED_HISTORY");;  
        String countquery   =this.sqlQueries.getProperty("GET_BOOKED_HISTORY_COUNT");;  

        try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery,new Object[]{bookid,bookid});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{bookid,bookid,15,0});
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
       return job; 
    }
}
