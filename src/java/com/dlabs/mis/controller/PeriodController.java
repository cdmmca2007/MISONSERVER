/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dlabs.mis.controller;


import com.dlabs.constants.MISConstant;
import com.dlabs.constants.URLMap;
import com.dlabs.mis.dao.ClassDAO;
import com.dlabs.mis.dao.MasterDAO;
import com.dlabs.mis.dao.PaymentDAO;
import com.dlabs.mis.dao.PeriodDAO;
import com.dlabs.mis.model.Classes;
import com.dlabs.mis.model.Master;
import com.dlabs.mis.model.Period;
import com.dlabs.mis.model.Property;
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
public class PeriodController {
   Connection conn = null;

    @Autowired
    private PeriodDAO periodDAO;

    public void setPeriodDAO(PeriodDAO periodDAO) {
        this.periodDAO = periodDAO;

    }
    @RequestMapping(value=URLMap.ADD_PERIOD, method=RequestMethod.POST)
    @ResponseBody
    public Period addPeriod(@RequestBody Period period){
        try{
            conn = DbPool.getConnection();
           return periodDAO.addOrEditPeriod(conn,period);
           
        }
        catch(Exception ex){

        }finally{
            DbPool.close(conn);
        }
        
        return period;
    }

    @RequestMapping(value=URLMap.ADD_PERIOD_DATA, method=RequestMethod.POST)
    @ResponseBody
    public Period[] addPeriodData(@RequestBody Period[] period){
        try{
            conn = DbPool.getConnection();
           return periodDAO.addOrEditPeriodData(conn,period);

        }
        catch(Exception ex){

        }finally{
            DbPool.close(conn);
        }

        return period;
    }

    @RequestMapping(value=URLMap.GET_PERIOD, method= RequestMethod.GET)
    @ResponseBody
    public String getPeriod(){
       try{
            conn = DbPool.getConnection();
           return periodDAO.getAllPeriodAsJson(conn,0,15).toString();
        }

        catch(Exception ex){

        }finally{
            DbPool.close(conn);
        }
        return "";
     }
   
}
