/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.controller;

/**
 *
 * @author Kamlesh the admin
 */
import com.dlabs.constants.URLMap;
import com.dlabs.mis.dao.DashboardDAO;
import com.dlabs.mis.model.Permission;
import com.dlabs.session.AuthHandler;
import com.kjava.base.db.DbPool;
import java.sql.Connection;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
@Controller
public class DashboardController {
    Connection conn = null;
    
    @Autowired
    DashboardDAO dashboardDAO;

    public void setDashboardDAO(DashboardDAO dashboardDAO) {
        this.dashboardDAO = dashboardDAO;
    }
    @RequestMapping(value = URLMap.GET_DASHBOARD_LINK, method = RequestMethod.GET)
    @ResponseBody
    public  List<Permission> getDashboardLink(HttpServletRequest req,@RequestParam("id") String id) {
        List<Permission> res = null;
        try {
            conn = DbPool.getConnection();
            res = dashboardDAO.getDashboardLink(conn,AuthHandler.getUser(req).getRoleId(), id);
        } catch (Exception ex) {
            System.out.print(ex.getMessage());
        } finally {
            DbPool.close(conn);
        }
        return res;
    }
}
