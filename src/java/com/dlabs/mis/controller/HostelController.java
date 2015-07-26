/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.controller;

/**
 *
 * @author cd
 */
import com.dlabs.constants.MISConstant;
import com.dlabs.constants.URLMap;
import com.dlabs.mis.dao.HomeWorkDAO;
import com.dlabs.mis.dao.HostelDAO;
import com.dlabs.mis.dao.MasterDAO;
import com.dlabs.mis.model.*;

import com.kjava.base.db.DbPool;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HostelController {
   Connection conn = null;
    
    @Autowired
    private HostelDAO hostelDAO;
    
    public void setHostelDAO(HostelDAO hostelDAO) {
        this.hostelDAO = hostelDAO;        
    } 
    
    @RequestMapping(value=URLMap.ADD_HOSTEL, method=RequestMethod.POST)
    @ResponseBody
    public Hostel addHostel(@RequestBody Hostel hostel){
        try{
            conn = DbPool.getConnection();
            hostel= hostelDAO.addOrEditHostel(conn,hostel);
            if(hostel.getResult().equals("1"))
                conn.commit();
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return hostel;
    }
    @RequestMapping(value=URLMap.GET_HOSTEL, method=RequestMethod.GET)
    @ResponseBody
    public String getHostel(){

        try{
           conn = DbPool.getConnection();
           return hostelDAO.getHostelAsJSON(conn,15,0).toString();
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return "{failure:true}";    
    }
    @RequestMapping(value=URLMap.ADD_HOSTEL_ROOM, method=RequestMethod.POST)
    @ResponseBody
    public HostelRoom addHostelRoom(@RequestBody HostelRoom hostelroom){
        try{
            
            conn = DbPool.getConnection();
            hostelroom= hostelDAO.addOrEditHostelRoom(conn,hostelroom);
            
            if(hostelroom.getResult().equals("1"))
                conn.commit();
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return hostelroom;
    }
    @RequestMapping(value=URLMap.GET_HOSTEL_ROOM, method=RequestMethod.GET)
    @ResponseBody
    public String getHostelRoom(@RequestParam("id") String id){

        try{
           conn = DbPool.getConnection();
           return hostelDAO.getHostelRoomAsJSON(conn,id,25,0).toString();
           
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return "{failure:true}";    
    }
    @RequestMapping(value=URLMap.ALLOCATE_HOSTEL_ROOM, method=RequestMethod.POST)
    @ResponseBody
    public HostelRoomAllocation addHostelRoom(@RequestBody HostelRoomAllocation hostelroomallocation){
        try{
            
            conn = DbPool.getConnection();
            hostelroomallocation= hostelDAO.addOrEditHostelRoomAllocation(conn,hostelroomallocation);
            
            if(hostelroomallocation.getResult().equals("1"))
                conn.commit();
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return hostelroomallocation;
    }
     
    @RequestMapping(value=URLMap.GET_HOSTEL_ROOM_ALLOCATION, method=RequestMethod.GET)
    @ResponseBody
    public String getHostelRoomAllocation(@RequestParam("hostelid") String hostelid,
                                          @RequestParam("roomid") String roomid,
                                          @RequestParam("sessionid") String sessionid
    ){

        try{
           conn = DbPool.getConnection();
           return hostelDAO.getAllocatedHostelRoomAsJSON(conn,hostelid,roomid,sessionid,25,0).toString();
           
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return "{failure:true}";    
    }
    @RequestMapping(value=URLMap.MARK_HOSTEL_FEE_PAID, method=RequestMethod.POST)
    @ResponseBody
    public HostelRoomAllocation addPayHostelFee(@RequestBody HostelRoomAllocation hostelroomallocation){
        try{
            
            conn = DbPool.getConnection();
            if(hostelDAO.markPaid(conn,hostelroomallocation,hostelroomallocation.getPid()))
                conn.commit();
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return hostelroomallocation;
    }
}
