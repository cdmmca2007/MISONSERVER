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
import com.dlabs.mis.dao.ClassDAO;
import com.dlabs.mis.dao.ComboDAO;
import com.dlabs.mis.dao.MasterDAO;
import com.dlabs.mis.dao.PaymentDAO;
import com.dlabs.mis.model.Classes;
import com.dlabs.mis.model.Master;
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

@Controller
public class ComboController {
    Connection conn = null;

    @Autowired
    private ComboDAO comboDAO;

    public void setClassDAO(ComboDAO comboDAO) {
        this.comboDAO = comboDAO;

    }
    @RequestMapping(value=URLMap.GET_COMBO, method= RequestMethod.GET)
    @ResponseBody
    public String getCombo(@RequestParam("propertyId") int propertyId){
       try{
            conn = DbPool.getConnection();
           return comboDAO.getAllComboAsJson(conn,propertyId,0,15).toString();
        }

        catch(Exception ex){

        }finally{
            DbPool.close(conn);
        }
        return "";
     }
    @RequestMapping(value=URLMap.GET_STUDENT_LIST, method= RequestMethod.GET)
    @ResponseBody
    public String getCombo(@RequestParam("propertyId") int propertyId,
                           @RequestParam("classid") String classid,
                           @RequestParam("teacherid") String teacherid
                          ){
       try{
            conn = DbPool.getConnection();
           return comboDAO.getAllComboAsJson(conn,propertyId,classid,teacherid,0,15).toString();
        }

        catch(Exception ex){

        }finally{
            DbPool.close(conn);
        }
        return "";
     }
    @RequestMapping(value=URLMap.CLASSSUBJECTCOMBO, method= RequestMethod.GET)
    @ResponseBody
    public String getClassSubjectCombo(@RequestParam("propertyId") int propertyId,
                           @RequestParam("sessionid") String sessionid,
                           @RequestParam("classid") String classid,
                           @RequestParam("teacherid") String teacherid
                          ){
       try{
            conn = DbPool.getConnection();
           return comboDAO.getAllClassSubjectComboAsJson(conn,propertyId,classid,teacherid,sessionid,0,15).toString();
        }

        catch(Exception ex){

        }finally{
            DbPool.close(conn);
        }
        return "";
     }
    @RequestMapping(value=URLMap.HOSTEL_COMBO, method= RequestMethod.GET)
    @ResponseBody
    public String getHostelCombo(){
       try{
            conn = DbPool.getConnection();
            return comboDAO.getHostelCombo(conn,0,150).toString();
        }

        catch(Exception ex){

        }finally{
            DbPool.close(conn);
        }
        return "";
     }

    @RequestMapping(value=URLMap.ROOM_COMBO, method= RequestMethod.GET)
    @ResponseBody
    public String getRoomCombo(@RequestParam("hostelId") String hostelId){
       try{
            conn = DbPool.getConnection();
            return comboDAO.getRoomCombo(conn,hostelId,0,150).toString();
        }
        catch(Exception ex){

        }finally{
            DbPool.close(conn);
        }
        return "";
     }
    
}
