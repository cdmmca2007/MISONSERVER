/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.controller;

import com.dlabs.constants.URLMap;
import com.dlabs.mis.dao.MasterDAO;
import com.dlabs.mis.dao.SearchDAO;
import com.dlabs.mis.model.Master;
import com.kjava.base.db.DbPool;
import java.sql.Connection;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author Kamlesh
 */
@Controller
public class SearchController {
    @Autowired
    SearchDAO searchDAO;
    Connection conn = null;
    @RequestMapping(value = URLMap.NORMAL_SEARCH, method = RequestMethod.GET)
    @ResponseBody
    public String getSerachResult(
            @RequestParam("query") String ss,
            @RequestParam("start") int start,
            @RequestParam("limit") int limit) {
        try {
            conn = DbPool.getConnection();
            return searchDAO.getSearchResult(conn, ss, start, limit).toString();
        } catch (Exception ex) {
           System.out.print(ex);
        } finally {
            DbPool.close(conn);
        }
        return "";
    }
    @RequestMapping(value = URLMap.ADVANCE_SEARCH, method = RequestMethod.GET)
    @ResponseBody
    public String getAdvSearchResult(
            @RequestParam("query") String ss,
            @RequestParam("start") int start,
            @RequestParam("limit") int limit) {
        try {
            conn = DbPool.getConnection();
            return searchDAO.getSearchResult(conn, ss, start, limit).toString();
        } catch (Exception ex) {
        } finally {
            DbPool.close(conn);
        }
        return "";
    }
}
