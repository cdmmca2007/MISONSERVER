/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.util;

import com.dlabs.mis.model.Timetable;
import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

/**
 *
 * @author cd
 */
public class JasperService {
    
    public JasperService() {
        
    }
    
    public JasperPrint getJasperPrintDocumentByConnection(String jasperfilename, Map parameters, Connection conn) {

        JasperReport jasperReport;
        JasperPrint  obj=null;
        try {
            jasperReport = JasperCompileManager.compileReport(jasperfilename);
            obj          = JasperFillManager.fillReport(jasperReport,parameters,conn);
            
        } catch (JRException ex) {
            Logger.getLogger(JasperService.class.getName()).log(Level.SEVERE, null, ex);
        }
        return obj;
    }
}
