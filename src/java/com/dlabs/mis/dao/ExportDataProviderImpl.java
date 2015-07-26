/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

import com.kjava.base.ReadableException;
import com.kjava.base.db.DaoUtil;
import com.kjava.base.db.DbPool;
import com.kjava.export.ExportBean;
import com.kjava.export.ExportDataProvider;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
/**
 *
 * @author Kamlesh the admin
 */
@Repository
public class ExportDataProviderImpl extends ExportDataProvider {
    @Autowired
    Properties sqlQueries;
    public ExportBean getCalibration(ExportBean bean, String reportName, String type) {
        Connection conn = null;
        try {
            conn = DbPool.getConnection();
            String q = "SELECT hc_no AS hcNo, calibration_id id,item_code itemCode,item_desc itemDescription,itemtype typeId,itemrange as range,least_count leastCount,location_id locationId,frequency,calibration_date calibrationDate,Calibration_due_date calibrationDueDate,modified_date FROM calibration_details";//sqlQueries.getProperty("GET_COLIBRATION");
            ResultSet rs = DaoUtil.executeNamedQuery(conn, q, new HashMap<String, Object>());
            bean.setReportData(rs);
        } catch (ReadableException ex) {
            Logger.getLogger(ExportDataProviderImpl.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(ExportDataProviderImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
        return bean;
    }
}
