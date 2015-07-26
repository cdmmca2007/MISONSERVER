/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.services;

import com.dlabs.mis.model.AttendanceSheet;
import com.dlabs.mis.model.AttendanceUpdateModel;
import org.json.simple.JSONObject;


/**
 *
 * @author Kamlesh the admin
 */
public interface AttendanceService {

    public JSONObject getAttendanceSheets(AttendanceSheet fefaultSheet);
    public JSONObject getAttendanceSheet(int id);
    public AttendanceSheet addAttendanceSheet(AttendanceSheet sheet);

    public String deleteAttendanceSheet(int sheetId);

    public String updateAttendanceSheet(int sheetId,AttendanceUpdateModel[] sheets);

   
   
}
