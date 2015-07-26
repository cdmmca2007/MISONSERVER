/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

import com.dlabs.mis.model.Route;
import com.dlabs.mis.model.RouteVehicle;
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
import org.json.simple.JSONObject;

/**
 *
 * @author cd
 */
public class TransportDAO {

    JSONUtil jsonUtil = new ExtJsonUtil();
    public Object getAllRoute(Connection conn,String routeid ,int start, int limit) {
            JSONObject obj = null;
            ResultSet rs = null;

        try {
            if(routeid.equals("") || routeid==null){
            rs = DaoUtil.executeQuery(conn, "SELECT  routeid,sid,m.value AS source,did,m1.value AS destination,createdby,modifiedby,createdon,modifiedon,name " +
                                            "  FROM  route r " +
                                            "  JOIN  master m  ON  r.sid=m.id " +
                                            "  JOIN  master m1 ON  r.did=m1.id");
            }
            else
            rs = DaoUtil.executeQuery(conn, "SELECT  routeid,sid,m.value AS source,did,m1.value AS destination,createdby,modifiedby,createdon,modifiedon,name " +
                                            "  FROM  route r " +
                                            "  JOIN  master m  ON  r.sid=m.id " +
                                            "  JOIN  master m1 ON  r.did=m1.id"+
                                            "  WHERE routeid=?",new Object[]{routeid});   
            
            obj = jsonUtil.getJsonObject(rs, 100, start,limit, false);
            return obj;
        } catch (ReadableException ex) {
            Logger.getLogger(TransportDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return obj;
    }

    public Route addOrEditRoute(Connection conn, Route obj) throws ReadableException {
       String insertroute="INSERT INTO route (routeid,sid,did,createdby,modifiedby,createdon,NAME) VALUES(?,?,?,?,?,CURRENT_DATE,?)";
       String insertrouteviya="INSERT INTO routeviya (routeviyaid,routeid,locationname,seqnum,createdby,modifiedby,createdon) VALUES (?,?,?,?,?,?,CURRENT_DATE)";
       String selectquery="SELECT count(1) as count FROM route WHERE sid=? AND did=?";
       
       ResultSet rs = null;
       try {
       if(obj.getSid()!=null && obj.getDid()!=null){
           
           rs=DaoUtil.executeQuery(conn,selectquery,new Object[]{obj.getSid(),obj.getDid()});
           if(rs.next()){
             
               if(rs.getInt("count")==0)
               {
                    obj.setCreatedby("111111");
                    obj.setModifiedby("111111");
                    String routeid=java.util.UUID.randomUUID().toString();
                    
                    if(DaoUtil.executeUpdate(conn,insertroute,new Object[]{routeid,
                                                                        obj.getSid(),
                                                                        obj.getDid(),
                                                                        obj.getCreatedby(),
                                                                        obj.getModifiedby(),
                                                                        obj.getName()
                                                                        })==1)
                    {
                       obj.setRouteid(routeid);
                       for (int x=1;x<7;x++){
                       String routeviyaid=java.util.UUID.randomUUID().toString();    
                       String place=null;
                       if(x==1)place=obj.getPlace1();
                       if(x==2)place=obj.getPlace2();
                       if(x==3)place=obj.getPlace3();
                       if(x==4)place=obj.getPlace4();
                       if(x==5)place=obj.getPlace5();
                       if(x==6)place=obj.getPlace6();
                       DaoUtil.executeUpdate(conn, insertrouteviya,new Object[]{routeviyaid,routeid,place,x,obj.getCreatedby(),obj.getModifiedby()} );
                       }
                       conn.commit();
                       return obj;
                       }
                    }
                 else
               { 
                   obj.setRouteid(null);
                   return obj;
               }
               }     
           }           
           
         }
        catch (SQLException ex) {
            Logger.getLogger(TransportDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
       return obj;
    }

    public Object getRoutePlace(Connection conn, String routeid, int i, int i0) throws SQLException {
        
        Collection<JSONObject> items = new ArrayList<JSONObject>();
        JSONObject obj1 =new JSONObject();
        JSONObject obj =new JSONObject();
        ResultSet rs = null;

        try {
            if(routeid!=null)

            rs = DaoUtil.executeQuery(conn, "SELECT r.routeid AS routeid , m.value AS source ,m1.value AS destination ,rv.locationname as place FROM route r " +
                                            "  JOIN routeviya rv ON r.routeid=rv.routeid " +
                                            "  JOIN master m     ON m.id=r.sid " +
                                            "  JOIN master m1    ON m1.id=r.did      " +
                                            " WHERE r.routeid= ? ",new Object[]{routeid});   
            
            //obj = jsonUtil.getJsonObject(rs, 100, i,i0, false);
            rs.next();
            
            routeid=rs.getString("routeid");
            String source =rs.getString("source");  
            String destination=rs.getString("destination");
            String place      =rs.getString("place"); 
            
            obj.put("routeid",routeid);
            obj.put("source" ,source);
            obj.put("destination" ,destination);
            obj.put("place1",place);
                
            int x=2;
            while(rs.next()){
                place=rs.getString("place");
                obj.put("place"+x++,place);
            }
            items.add(obj);
            obj1.put("rows",items);
            return obj1;
        } catch (ReadableException ex) {
            Logger.getLogger(TransportDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return obj; 
    }

    public RouteVehicle addOrEditRouteVehicle(Connection conn, RouteVehicle obj) throws ReadableException {

      String insertvehicle="INSERT INTO busdetail (busid, 	busnumber, vendorid, vname,seat,drivername,drivernumber, altdrivernumber, createdby, modifiedby, createdon,vtype) VALUES (?,?,?,?,?,?,?,?,?,?,CURRENT_DATE,?)";
      String insertrouteveh="INSERT INTO routebustran (routebustranid, routeid, busid, starttime, endtime, createdby, modifiedby, createdon) VALUES(?,?,?,?,?,?,?,CURRENT_DATE)";
      String insertvendor  ="INSERT INTO vendor (vendorid, vname,contactperson,mobile, emailid, address, createdby, modifiedby ,createdon) VALUES(?,?,?,?,?,?,?,?,CURRENT_DATE)";
      
      
      
      obj.setCreatedby("111111");
      obj.setModifiedby("1111111");
      String vendorid=java.util.UUID.randomUUID().toString();    
      
      int x=DaoUtil.executeUpdate(conn,insertvendor,new Object[]{
                                                    vendorid,                                                                                                        
                                                    obj.getCname(),
                                                    obj.getPname(),
                                                    obj.getMnumber(),
                                                    null,
                                                    obj.getOaddress(),
                                                    obj.getCreatedby(),
                                                    obj.getModifiedby()
                                                  });
      
      String vehicleid=java.util.UUID.randomUUID().toString();    
      if(DaoUtil.executeUpdate(conn,insertvehicle,new Object[]{
                                                         vehicleid,
                                                         obj.getVnumber(),
                                                         vendorid,
                                                         obj.getVname(),
                                                         obj.getSeat(),
                                                         obj.getDrivername(),
                                                         obj.getDcontactnum(),
                                                         obj.getAltdcontactnum(),
                                                         obj.getCreatedby(),
                                                         obj.getModifiedby(),
                                                         obj.getVtype()
                                                       })==1){
         obj.setVid(vehicleid);
         String rvid=java.util.UUID.randomUUID().toString();       
         if(DaoUtil.executeUpdate(conn,insertrouteveh,new Object[]{
                                                     rvid ,
                                                     obj.getRouteid(),
                                                     obj.getVid(),
                                                     null,
                                                     null,
                                                     obj.getCreatedby(),
                                                     obj.getModifiedby()
                                                  })==1){
                try {
                    obj.setId(rvid);
                    conn.commit();
                } catch (SQLException ex) {
                    Logger.getLogger(TransportDAO.class.getName()).log(Level.SEVERE, null, ex);
                }
         }   
      }
       
      
      return obj;  
    }

    public Object getRouteVehicle(Connection conn, String routeid, int i, int i0) {
        JSONObject obj =new JSONObject();
        ResultSet rs = null;

        try {
            if(routeid!=null)

            rs = DaoUtil.executeQuery(conn, "SELECT r.routebustranid , r.routeid , r.busid , b.busnumber AS vnumber, b.vname AS vname, " +
                                            "       b.drivername AS dname, b.vendorid , b.drivernumber AS dcontact ,b.seat AS seat,  " +
                                            "       v.vname AS vendor,m.value AS type " +
                                            "  FROM routebustran r , vendor v , busdetail b , master m " +
                                            " WHERE r.routeid=? " +
                                            "   AND r.busid  = b.busid " +
                                            "   AND v.vendorid=b.vendorid " +
                                            "   AND m.id=b.vtype",new Object[]{routeid});   
            
            obj = jsonUtil.getJsonObject(rs, 100, i,i0, false);
        } catch (ReadableException ex) {
            Logger.getLogger(TransportDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return obj; 
        
    }

    public Object getRouteVehicleCombo(Connection conn, String routeid, int i, int i0) {
        JSONObject obj =new JSONObject();
        String query="SELECT b.busid as id ,CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(b.vname, ' / '), b.busnumber),' / Tot Seat :'),b.seat),' Seat Left : 0') as value " +
                     " FROM  routebustran r ,busdetail b , master m " +
                     " WHERE r.routeid=? " +
                     "   AND r.busid  =b.busid " +
                     "   AND m.id     =b.vtype";
        ResultSet rs = null;
        try {
            rs=DaoUtil.executeQuery(conn,query,new Object[]{routeid});
            obj = jsonUtil.getJsonObject(rs, 100, i,i0, false);
           
        } catch (ReadableException ex) {
            Logger.getLogger(TransportDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return obj;
    }
    
}
