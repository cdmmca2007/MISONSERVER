/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.controller;

import com.dlabs.constants.URLMap;
import com.dlabs.mis.dao.NotificationDAO;
import com.dlabs.mis.model.Notification;
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
public class NotificationController {
    Connection conn = null;

    @Autowired
    private NotificationDAO notificationDAO;

    public void setNotificationDAO(NotificationDAO notificationDAO) {
        this.notificationDAO = notificationDAO;

    }
    @RequestMapping(value=URLMap.ADD_NOTIFICATION, method= RequestMethod.POST)
    @ResponseBody
    public Notification addNotification(@RequestBody Notification obj){
        
       try{
           conn = DbPool.getConnection();
           return notificationDAO.addNotification(conn,obj,0,15);
        }

        catch(Exception ex){
              
        }finally{
            DbPool.close(conn);
        }
        return obj;
     }
    @RequestMapping(value=URLMap.GET_NOTIFICATION, method= RequestMethod.GET)
    @ResponseBody
    public String getNotification(){
       try{
           String userid="";
            conn = DbPool.getConnection();
            
           return notificationDAO.getAllNotificationsAsJson(conn,userid,0,15).toString();
        }

        catch(Exception ex){

        }finally{
            DbPool.close(conn);
        }
        return "";
     }
}
