/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.services;

import com.dlabs.mis.model.ExcelModel;
import java.util.List;
import java.util.Map;
import jxl.write.WritableWorkbook;
import org.springframework.jdbc.support.rowset.SqlRowSet;

/**
 *
 * @author user
 */
public interface DownloadService {

    public WritableWorkbook writeToWorkBook(WritableWorkbook workbook, ExcelModel model);
    public WritableWorkbook writeToWorkBookFromSqlRowSet(WritableWorkbook workbook, SqlRowSet data);
}
