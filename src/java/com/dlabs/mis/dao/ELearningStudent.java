/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dlabs.mis.dao;

import com.dlab.spring.web.dao.AbstractSimpleDao;
import com.kjava.base.db.DbPool;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author LENOVO
 */
@Repository("eLearningStudent")
public class ELearningStudent extends AbstractSimpleDao{
    
    Connection conn = null;
    
    public Map<String, Object> verifyLogin(String u, String p) throws SQLException{
        
        Map<String, Object> obj=new HashMap<String, Object>();
        obj.put("tempuserid", u);
        obj.put("temppassword",p);
        try {
            conn =DbPool.getConnection();
            String query = this.sqlQueries.getProperty("ELEARNING_STUDENT_VERIFICATION"); 
            List<Map<String, Object>> stud=this.jdbcTemplate.queryForList(query,obj);
            if(stud.size()==1) {
                 obj.put("result", 1);
            }else
                 obj.put("result", 0);
           
        } catch (SQLException ex) {
            Logger.getLogger(ELearningStudent.class.getName()).log(Level.SEVERE, null, ex);
        }finally{
            DbPool.close(conn);
        }
       return obj;  
    }
}
