/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

import com.dlabs.mis.controller.PermissionController;
import com.dlabs.mis.model.Master;
import com.dlabs.mis.model.Permission;
import com.dlabs.mis.model.PermissionGroup;
import com.kjava.base.ReadableException;
import com.kjava.base.db.DaoUtil;
import com.kjava.base.util.JSONUtil;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Kamlesh the admin
 */
@Repository
public class SearchDAO {
    @Autowired
    JSONUtil jsonUtil;
    @Autowired
    Properties sqlQueries;

    public JSONObject getSearchResult(Connection conn, String ss, int start, int limit) throws ReadableException {
        String p = "%"+ss+"%";
        String query = "SELECT userid id, name text,'user' type FROM users WHERE name LIKE ?";
        return jsonUtil.getJsonObject(DaoUtil.executeQuery(conn, query, new Object[]{p}),0,1,25);
    }
    
    
}
