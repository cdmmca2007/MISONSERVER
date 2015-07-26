package com.dlabs.mis.controller;

import com.dlabs.constants.URLMap;
import com.dlabs.mis.dao.AttendanceDAO;
import com.dlabs.mis.model.AttendanceSheet;
import com.dlabs.mis.model.AttendanceUpdateModel;
import com.dlabs.mis.services.AttendanceService;
import com.dlabs.mis.services.AttendanceServiceImpl;
import com.kjava.base.ReadableException;
import java.sql.Connection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author Kamlesh the admin
 */
@Controller
public class AttendanceController {

    @Autowired
    AttendanceServiceImpl attendanceService;

    @RequestMapping(value = URLMap.ATTENDANC_SHEETS, method = RequestMethod.GET)
    @ResponseBody
    public String getAttendanceSheets(String batchId,String month,String sessionid) {
            AttendanceSheet sheet = new AttendanceSheet();
            sheet.setBatchId(batchId);
            sheet.setMonth(month);
            sheet.setSessionid(sessionid.equals("")==true?null:sessionid);
            return attendanceService.getAttendanceSheets(sheet).toString();
    }
    @RequestMapping(value = URLMap.ATTENDANC_SHEET, method = RequestMethod.GET)
    @ResponseBody
    public String getAttendanceSheet(@PathVariable int id) {
            return attendanceService.getAttendanceSheet(id).toString();
    }
    
    @RequestMapping(value = URLMap.ATTENDANC_SHEETS, method = RequestMethod.POST)
    @ResponseBody
    public AttendanceSheet addAttendanceSheet(@RequestBody AttendanceSheet sheet) {
           return attendanceService.addAttendanceSheet(sheet); 
    }
    
    @RequestMapping(value = URLMap.ATTENDANC_SHEET, method = RequestMethod.DELETE)
    @ResponseBody
    public String deleteAttendaceSheet(@PathVariable("id") int sheetId) {
           return attendanceService.deleteAttendanceSheet(sheetId);
    }
    @RequestMapping(value = URLMap.ATTENDANC_SHEET, method = RequestMethod.PUT)
    @ResponseBody
    public String updateAttendaceSheet(@PathVariable("id") int id,@RequestBody AttendanceUpdateModel[] sheets) {
            return attendanceService.updateAttendanceSheet(id,sheets);
    }
    
    @RequestMapping(value = URLMap.ATTENDANC_MONTH, method = RequestMethod.GET)
    @ResponseBody
    public String getMonthlyAttendanceByStudent(String studentId,String sessionid, String month) throws ReadableException {
               return attendanceService.getAttnedanceOfMonth(studentId,sessionid,month);
    }

    @RequestMapping(value = URLMap.STUD_ATTENDANC_MONTH, method = RequestMethod.GET)
    @ResponseBody
    public String getMonthlyAttendanceOfStudent(String studentid,
                                                String batchid  ,
                                                String month) throws ReadableException {
               return attendanceService.getMonthlyAttendanceOfStudent(studentid,batchid,month).toString();
    }
    
}
