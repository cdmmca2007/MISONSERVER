/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.controller;

/**
 *
 * @author Kamlesh the admin
 */
import com.dlabs.constants.MISConstant;
import com.dlabs.constants.URLMap;
import com.dlabs.mis.dao.MailDAO;
import com.dlabs.mis.dao.MasterDAO;
import com.dlabs.mis.model.Master;
import com.dlabs.mis.model.Property;
import com.kjava.base.db.DbPool;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
@Controller
public class MailController {
    Connection conn = null;
    MailDAO mailDAO;

    public void setMailDAO(MailDAO mailDAO) {
        this.mailDAO = mailDAO;
    }
    
}
