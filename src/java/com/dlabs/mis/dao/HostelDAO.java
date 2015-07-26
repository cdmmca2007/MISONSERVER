/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

import com.dlabs.mis.model.Hostel;
import com.dlabs.mis.model.HostelRoom;
import com.dlabs.mis.model.HostelRoomAllocation;
import com.dlabs.session.AuthHandler;
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
 * @author cd
 */
public class HostelDAO {

    JSONUtil jsonUtil = new ExtJsonUtil();
    
    public Hostel addOrEditHostel(Connection conn, Hostel obj) throws ReadableException {

        int flag=0;
        try {            
            String query = "INSERT INTO hostel (pid,NAME,hosteltype,address,COMMENT,contactno,contactperson,createdby,createdon,modifiedby) VALUES(?,?,?,?,?,?,?,?,CURRENT_DATE,?)";
            String pid = java.util.UUID.randomUUID().toString();
            obj.setResult("0");
            if(obj.getPid().equals(""))obj.setPid(null);
           if(obj.getPid()==null)
           {
               if(DaoUtil.executeUpdate(conn, query, new Object[]{pid , obj.getName(), obj.getHosteltype(),obj.getAddress(),obj.getComment(),obj.getContactno(),obj.getContactperson(),obj.getCreateby(),obj.getCreateby()})==1){
                obj.setPid(pid);
                obj.setResult("1");
               }  
           }else
           {
           if(obj.getPid()!=null)
           {
               String updatequery="UPDATE hostel SET NAME = ?,hosteltype = ? , address =? , COMMENT = ? , contactno=? , contactperson=? WHERE pid = ?";
               if(DaoUtil.executeUpdate(conn,updatequery,new Object[]{obj.getName(),obj.getHosteltype(),obj.getAddress(),obj.getComment(),obj.getContactno(),obj.getContactperson(),obj.getPid()})==1){
                obj.setResult("1");                    
               }
           }   
         }
        }
        catch (Exception ex) {
            throw new ReadableException(ex.getCause(),ex.getMessage(),"HostelDAO", "addoredit");
            
        }
        return obj;
        
    }

    public Object getHostelAsJSON(Connection conn, int rows, int page) throws ReadableException {

        JSONObject job = null;
        String selectquery= "SELECT pid,name,m.value AS type,address,comment,contactno ,contactperson,createdby, " +
                            "  createdon,modifiedby,modifiedon " +
                            "  FROM 	hostel " +
                            "  LEFT  JOIN  master m ON hostel.hosteltype=m.id  LIMIT ? OFFSET ?";
        int count =0;        
        try{
            ResultSet rs = DaoUtil.executeQuery(conn, "SELECT 	COUNT(1) as count FROM 	hostel LEFT  JOIN  master m ON hostel.hosteltype=m.id");
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{rows,0});
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;
        
    }

    public HostelRoom addOrEditHostelRoom(Connection conn, HostelRoom obj) throws ReadableException {
        int flag=0;
        try {            
            String query = "INSERT INTO hostelroom (pid, hostelid, floorno, roomno, roomtype, roomrent, totstudent, COMMENT, createdby , modifiedby,createdon) VALUES (?,?,?,?,?,?,?,?,?,?,CURRENT_DATE)";
            String pid = java.util.UUID.randomUUID().toString();
            obj.setResult("0");
            if(obj.getPid().equals(""))obj.setPid(null);
           if(obj.getPid()==null)
           {
               if(DaoUtil.executeUpdate(conn, query, new Object[]{pid,obj.getHostelpid(),obj.getFloorno(),obj.getRoomno(),obj.getRoomtype(),obj.getRoomrent(),obj.getTotstudent(),obj.getComment(),obj.getCreatedby(),obj.getCreatedby()})==1){
                obj.setPid(pid);
                obj.setResult("1");
               }  
           }else
           {
           if(obj.getPid()!=null)
           {
               String updatequery="";
               if(DaoUtil.executeUpdate(conn,updatequery,new Object[]{})==1){
                obj.setResult("1");                    
               }
           }   
         }
        }
        catch (Exception ex) {
            throw new ReadableException(ex.getCause(),ex.getMessage(),"HostelDAO", "addOrEditHostelRoom");
            
        }
        return obj;
    }

    
    public Object getHostelRoomAsJSON(Connection conn,String id ,int rows, int page) throws ReadableException {
       JSONObject job = null;
        String selectquery="SELECT hr.pid,hr.hostelid,h.name AS hostelname,m.value AS floorno,roomno,m1.value AS roomtype, " +
                            " hr.roomrent,hr.totstudent,hr.comment 	" +
                            "FROM 	hostelroom hr " +
                            "JOIN hostel h ON h.pid=hr.hostelid " +
                            "JOIN master m ON m.id=hr.floorno " +
                            "JOIN master m1 ON m1.id=hr.roomtype WHERE hr.hostelid=? LIMIT ? OFFSET ?";
        int count =0;        
        try{
            ResultSet rs = DaoUtil.executeQuery(conn, "SELECT 	COUNT(1) as count FROM 	hostelroom hr JOIN hostel h ON h.pid=hr.hostelid JOIN master m ON m.id=hr.floorno JOIN master m1 ON m1.id=hr.roomtype WHERE hr.hostelid=?",new Object[]{id});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{id,rows,page});
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;
    }

    public HostelRoomAllocation addOrEditHostelRoomAllocation(Connection conn, HostelRoomAllocation hostelroomallocation) throws ReadableException {

       if(hostelroomallocation.getPid()!=null && hostelroomallocation.getPid().equals(""))hostelroomallocation.setPid(null); 
       String getemailid="";
       if(hostelroomallocation.getAllocateto()==2)
          getemailid=new GetBatch().getParentEmailIdForStudent(conn,hostelroomallocation.getStudentid());
        //send mail to email id;
       
       String query="INSERT INTO hostelroomallocation (pid,hostelid,roomid,batchid,studentid,teacherid,sessionid,allocateto," +
                    " fromdate, todate,totamount ,createdby,modifiedby," +
                    " COMMENT,createdon)" +
                    " VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_DATE)";
       
       
       if(hostelroomallocation.getPid()==null){
           
           if(hostelroomallocation.getAllocateto()==2){
              return  allocateToStudent(conn,query,hostelroomallocation);
           }
           else{
              return  allocateToTeacher(conn,query,hostelroomallocation);
           }           
       }
       else{//update query
         
       }
       
       return hostelroomallocation;
    }

    private HostelRoomAllocation allocateToStudent(Connection conn, String query, HostelRoomAllocation obj) throws ReadableException {
     
        String batchid= new GetBatch(obj.getClassid(),obj.getSessionid()).BatchId(conn);
        String pid = java.util.UUID.randomUUID().toString();
        if(DaoUtil.executeUpdate(conn, query, new Object[]{pid,obj.getHostelid(),obj.getRoomid(),
                                                           batchid ,obj.getStudentid(),
                                                           null,obj.getSessionid(),obj.getAllocateto(),
                                                           obj.getFromdate(),obj.getTodate(),obj.getTotamount(),
                                                           obj.getCreatedby(),obj.getCreatedby(),
                                                           obj.getComment()})==1){
                if(obj.getPaid()==1){
                    if(markPaid(conn,obj,pid))
                    {
                       obj.setPid(pid);
                       obj.setResult("1");
                    } 
                }else if(obj.getPaid()==0){
                       obj.setPid(pid);
                       obj.setResult("1");

                }
        } 
        return obj;
    }

    private HostelRoomAllocation allocateToTeacher(Connection conn, String query, HostelRoomAllocation obj) throws ReadableException {
        
        String pid = java.util.UUID.randomUUID().toString();
        if(DaoUtil.executeUpdate(conn, query, new Object[]{pid,obj.getHostelid(),obj.getRoomid(),
                                                           null ,null,
                                                           obj.getTeacherid(),obj.getSessionid(),obj.getAllocateto(),
                                                           obj.getFromdate(),obj.getTodate(),
                                                           obj.getCreatedby(),obj.getCreatedby(),
                                                           obj.getComment()})==1){
                obj.setPid(pid);
                obj.setResult("1");
        } 
        return obj;
        
    }

    public Object getAllocatedHostelRoomAsJSON(Connection conn, String hostelid, String roomid, String sessionid, int rows, int page) throws ReadableException {
        JSONObject job = null;
        String selectquery= "SELECT hra.pid,h.name AS hostel ,CONCAT(CONCAT(m.value,' : '), hr.roomno) AS room ,FROM_UNIXTIME(hra.fromdate/1000,'%d-%m-%Y') as fromdate ," +
                            "       FROM_UNIXTIME(hra.todate/1000,'%d-%m-%Y') as todate ,CASE WHEN hra.feepaidstatus=1 THEN 'Amount Received' ELSE 'Pending' END AS feepaidstatus ," +
                            "       hra.paidon AS paidon ,CONCAT(CONCAT(CONCAT(CONCAT(s.fname,' '),CASE WHEN s.mname IS NULL THEN '' ELSE s.mname END),' '),s.lname) AS name , " +
                            "       CASE WHEN hra.allocateto=1 THEN 'Teacher' WHEN hra.allocateto=2 THEN 'Student' END AS allocateto , case when hra.feepaidstatus=1 then 1 else 0 end as paid , hra.totamount " +
                            "  FROM hostelroomallocation hra " +
                            "  INNER JOIN hostel     h  ON h.pid =hra.hostelid INNER JOIN hostelroom hr ON hr.pid=hra.roomid  INNER JOIN master     m  ON m.id  =hr.floorno INNER JOIN student    s  ON hra.studentid=s.studentid " +
                            "  WHERE hra.hostelid =?    AND hra.roomid   =?    AND hra.sessionid=?  LIMIT ? OFFSET ?";
        String countquery=  "SELECT COUNT(1) as count FROM hostelroomallocation hra " +
                            "  INNER JOIN hostel     h  ON h.pid =hra.hostelid INNER JOIN hostelroom hr ON hr.pid=hra.roomid  INNER JOIN master     m  ON m.id  =hr.floorno INNER JOIN student    s  ON hra.studentid=s.studentid " +
                            "  WHERE hra.hostelid =?    AND hra.roomid   =?    AND hra.sessionid=? ";        
        int count =0;        
        try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery ,new Object[]{hostelid,roomid,sessionid});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{hostelid,roomid,sessionid,rows,page});
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;
    }

    public boolean markPaid(Connection conn, HostelRoomAllocation obj, String pid) throws ReadableException {

        boolean flag=false;
        String query="UPDATE  hostelroomallocation SET feepaidstatus = ? , "
                + " paidon = current_date , paidby = ? , modifiedby = ?, paidmedium = ? , "
                + "COMMENT = ? WHERE	pid = ?";
        
        if(pid!=null && DaoUtil.executeUpdate(conn, query,new Object[]{
                                                           obj.getPaid(),
                                                           obj.getCreatedby(),
                                                           obj.getCreatedby(),
                                                           1,
                                                           obj.getComment(),
                                                           pid
                                                    })==1){
        
                    flag=true;
        
        }
        
        return flag;
    }
    
}
