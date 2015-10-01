package com.dlabs.mis.controller;

import com.dlabs.constants.URLMap;
import com.dlabs.mis.dao.MasterDAO;
import com.dlabs.mis.model.ContactAdmin;
import com.dlabs.mis.model.LogBug;
import com.dlabs.mis.model.Master;
import com.dlabs.mis.services.AuditTrailService;
import com.dlabs.session.AuthHandler;
import com.kjava.base.db.DbPool;
import java.sql.Connection;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author Kamlesh the admin
 */
@Controller
public class MasterController {

    @Autowired
    MasterDAO masterDAO;
    Connection conn = null;
    @Autowired AuditTrailService auditTrailService;

    public void setMasterDAO(MasterDAO masterDAO) {
        this.masterDAO = masterDAO;
    }

    @RequestMapping(value = URLMap.ADD_MASTER, method = RequestMethod.POST)
    @ResponseBody
    public Master addMaster(@RequestBody Master master) {
        try {
            conn = DbPool.getConnection();
            return masterDAO.addOrEditMaster(conn, master);
        } catch (Exception ex) {
        } finally {
            DbPool.close(conn);
        }
        return master;
    }

    @RequestMapping(value = URLMap.GET_MASTER, method = RequestMethod.GET)
    @ResponseBody
    public String getMasters(@RequestParam("propertyId") int propertyId) {
        try {
            conn = DbPool.getConnection();
            return masterDAO.getAllMasterAsJson(conn, propertyId, 0, 50).toString();
        } catch (Exception ex) {
        } finally {
            DbPool.close(conn);
        }
        return "";
    }

    @RequestMapping(value = URLMap.GET_PROPRTIES, method = RequestMethod.GET)
    @ResponseBody
    public String getProperties() {
        try {
            conn = DbPool.getConnection();
            return masterDAO.getAllAsJson(conn, 1, 50).toString();
        } catch (Exception ex) {
        } finally {
            DbPool.close(conn);
        }
        return "";

    }
    
    @RequestMapping(value = URLMap.LOG_BUG, method = RequestMethod.POST)
    @ResponseBody
    public LogBug addBug(@RequestBody  LogBug obj) {
        try {
            conn = DbPool.getConnection();
            return masterDAO.addBug(conn, obj);
        } catch (Exception ex) {
        } finally {
            DbPool.close(conn);
        }
        return obj;
    }
    
    @RequestMapping(value = URLMap.CONTACT_ADMIN, method = RequestMethod.POST)
    @ResponseBody
    public ContactAdmin contactAdmin(@RequestBody  ContactAdmin obj) {
        try {
            conn = DbPool.getConnection();
            return masterDAO.contactAdmin(conn, obj);
        } catch (Exception ex) {
        } finally {
            DbPool.close(conn);
        }
        return obj;
    }

    @RequestMapping(value=URLMap.ADD_DEPARTMENT_HEAD, method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> addDepartmentHead(HttpServletRequest request,@RequestBody Map<String,Object> model){
        
       try{
           conn = DbPool.getConnection();
           String id=AuthHandler.getUserId(request);
           model.put("createdby",id);
           model.put("modifiedby",id);
           return masterDAO.addDepartmentHead(conn,model);
        }
        catch(Exception ex){
              
        }finally{
            DbPool.close(conn);
        }
        return model;
     }
    @RequestMapping(value = URLMap.GET_DEPT_HEADLIST, method = RequestMethod.GET)
    @ResponseBody
    public String getAllDepartmentHead(@RequestParam("sessionid") String sessionid) {
        try {
            conn = DbPool.getConnection();
            return masterDAO.getAllDepartmentHead(conn, sessionid, 0, 50).toString();
        } catch (Exception ex) {
        } finally {
            DbPool.close(conn);
        }
        return "";
    }

}
