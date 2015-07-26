/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.controller;


import com.dlabs.constants.URLMap;
import com.dlabs.mis.dao.MasterDAO;
import com.dlabs.mis.dao.TransportDAO;
import com.dlabs.mis.model.Route;
import com.dlabs.mis.model.RouteVehicle;

import com.kjava.base.db.DbPool;
import java.sql.Connection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author cd
 */
@Controller
public class TransportController {
     Connection conn = null;

    @Autowired
    private TransportDAO transportDAO;
    
     public void setTransportDAO(TransportDAO transportDAO){
         this.transportDAO=transportDAO;
     }
    
    @RequestMapping(value=URLMap.SAVE_ROUTE, method=RequestMethod.POST)
    @ResponseBody
    public Route addRoute(@RequestBody Route obj){
        try{
            conn = DbPool.getConnection();
           return transportDAO.addOrEditRoute(conn,obj);
        }
        catch(Exception ex){

        }finally{
            DbPool.close(conn);
        }
        return obj;
    }
    
    @RequestMapping(value=URLMap.GET_ROUTE , method= RequestMethod.GET)
    @ResponseBody
    public String getRoute(@RequestParam("routeid") String routeid){
       try{
            conn = DbPool.getConnection();
           return transportDAO.getAllRoute(conn,routeid,0,15).toString();
        }

        catch(Exception ex){

        }finally{
            DbPool.close(conn);
        }
        return "";
     }
    @RequestMapping(value=URLMap.GET_TRAN_PLACE , method= RequestMethod.GET)
    @ResponseBody
    public String getRoutePlace(@RequestParam("routeid") String routeid){
       try{
            conn = DbPool.getConnection();
           return transportDAO.getRoutePlace(conn,routeid,0,15).toString();
        }

        catch(Exception ex){

        }finally{
            DbPool.close(conn);
        }
        return "";
     }
   @RequestMapping(value=URLMap.SAVE_VEHICLE, method=RequestMethod.POST)
   @ResponseBody
    public RouteVehicle addRouteVehicle(@RequestBody RouteVehicle obj){
        try{
            conn = DbPool.getConnection();
           return transportDAO.addOrEditRouteVehicle(conn,obj);
        }
        catch(Exception ex){

        }finally{
            DbPool.close(conn);
        }
        return obj;
    }

   @RequestMapping(value=URLMap.GET_VEHICLE, method=RequestMethod.GET)
   @ResponseBody
    public String getRouteVehicle(@RequestParam("routeid") String routeid){
       try{
            conn = DbPool.getConnection();
           return transportDAO.getRouteVehicle(conn,routeid,0,15).toString();
        }

        catch(Exception ex){

        }finally{
            DbPool.close(conn);
        }
        return "";
    }
   
@RequestMapping(value=URLMap.GET_ROUTE_VEHICLE, method=RequestMethod.GET)
@ResponseBody
    public String getRouteVehicleCombo(@RequestParam("routeid") String routeid){
       try{
            conn = DbPool.getConnection();
           return transportDAO.getRouteVehicleCombo(conn,routeid,0,15).toString();
        }

        catch(Exception ex){

        }finally{
            DbPool.close(conn);
        }
        return "";
    }

}
