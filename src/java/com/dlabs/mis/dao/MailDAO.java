/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

import com.dlabs.mis.model.Email;
import com.kjava.base.ReadableException;
import com.kjava.base.db.DaoUtil;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.PropertiesFactoryBean;

/**
 *
 * @author Kamlesh the admin
 */
public class MailDAO {
    
    @Autowired
    PropertiesFactoryBean sqlQueries;

}
