/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dlabs.mis.controller;

import org.springframework.stereotype.Controller;
import com.dlabs.constants.MISConstant;
import com.dlabs.constants.URLMap;
import com.dlabs.mis.dao.ClassDAO;
import com.dlabs.mis.dao.MasterDAO;
import com.dlabs.mis.dao.PaymentDAO;
import com.dlabs.mis.dao.TimeTableDAO;
import com.dlabs.mis.model.Classes;
import com.dlabs.mis.model.Master;
import com.dlabs.mis.model.Property;
import com.dlabs.mis.model.Timetable;
import com.kjava.base.db.DbPool;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
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
public class TimetableController {

    Connection conn = null;

    @Autowired
    private TimeTableDAO timetableDAO;

    public void setClassDAO(TimeTableDAO timetableDAO) {
        this.timetableDAO = timetableDAO;

    }
    @RequestMapping(value=URLMap.ADD_TIMETABLE, method=RequestMethod.POST)
    @ResponseBody
    public Timetable[] addTimetable(@RequestBody Timetable[] tt){
        try{
            conn = DbPool.getConnection();
           return timetableDAO.addOrEditTimeTable(conn,tt);
        }
        catch(Exception ex){

        }finally{
            DbPool.close(conn);
        }
        return tt;
    }
    
    @RequestMapping(value=URLMap.CREATE_TIMETABLE, method=RequestMethod.POST)
    @ResponseBody
    public int createTimetable(@RequestBody Timetable tt){
        try{
            conn = DbPool.getConnection();
            int x=timetableDAO.createTimeTable(conn,tt);
            if(x==1)conn.commit();
            return x;
        }
        catch(Exception ex){

        }finally{
            DbPool.close(conn);
        }
        return 0;
    }
    
    @RequestMapping(value=URLMap.GET_TIMETABLE, method= RequestMethod.GET)
    @ResponseBody
    public String getTimetable(@RequestParam("classid") String classid,
                               @RequestParam("sessionid") String sessionid, 
                               @RequestParam(value="teacherid", required=false) String teacherid
            ){
       try{
            conn = DbPool.getConnection();
            if((classid!=null || !classid.equals("")) && (teacherid==null || teacherid.equals("")))
            return timetableDAO.getAllTimeTableAsJson(conn,classid,sessionid,0,15).toString();
            else
            return timetableDAO.getTeacherTimeTableAsJson(conn,teacherid,sessionid,0,15).toString();    
        }

        catch(Exception ex){

        }finally{
            DbPool.close(conn);
        }
        return "";
     }

    @RequestMapping(value=URLMap.CHECK_TEACHER_AVAILBILITY, method=RequestMethod.POST)
    @ResponseBody
    public String check_Teacher_Availbility(@RequestBody Timetable tt){
        try{
            conn = DbPool.getConnection();
            return timetableDAO.check_Teacher_Availbility(conn,tt).toString();
        }
        catch(Exception ex){

        }finally{
            DbPool.close(conn);
        }
        return "1";
    }

    
}
