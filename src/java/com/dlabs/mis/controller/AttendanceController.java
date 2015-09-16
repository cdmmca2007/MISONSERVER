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
/*
import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
 
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
 
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
 
 
  
public class FileUploadHandler extends HttpServlet {
    private static final long serialVersionUID = 1L;
   
    @SuppressWarnings("unused")
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
       
        List<RegistrationUser> usersList = new ArrayList<RegistrationUser>();
        String filename = request.getParameter("fileName");
        if(filename == null || filename.length() == 0){
            request.setAttribute("error_msg", "Invalid file.Please select file.");
            request.getRequestDispatcher("fileUpload.jsp").include(request, response);
            return;
        }
        try {
            // Read excel file and store email ids in mailIdsArray
            InputStream input = new BufferedInputStream(new FileInputStream(filename));
            POIFSFileSystem fs = new POIFSFileSystem(input);
            HSSFWorkbook wb = new HSSFWorkbook(fs);
            HSSFSheet sheet = wb.getSheetAt(0);
 
            Iterator rows = sheet.rowIterator();
            while (rows.hasNext()) {
                RegistrationUser user= new RegistrationUser();
                HSSFRow row = (HSSFRow) rows.next();
                 
                 
                 
                if(row.getCell(0) != null && !row.getCell(0).equals("First Name")){
                    user.setFirstName(row.getCell(0).toString());
                    user.setLastName(row.getCell(1).toString());
                    user.setAddress(row.getCell(2).toString());
                    user.setDateOfBirth(row.getCell(3).toString());
                    user.setPhoneNumber(row.getCell(4).hashCode());
                    user.setEmailId(row.getCell(5).toString());
                    user.setGender(row.getCell(6).toString());
                    user.setMaritalStatus(row.getCell(7).toString());
                    user.setHighestDegree(row.getCell(8).toString());
                    user.setAggregate(row.getCell(9).hashCode());
                    user.setYearOfPassing(row.getCell(10).hashCode());
                    user.setCollegeName(row.getCell(11).toString());
                    user.setUniversityName(row.getCell(12).toString());
                    user.setTotalExperiences(row.getCell(13).hashCode());
                    user.setCurrentCompany(row.getCell(14).toString());
                    user.setDesignation(row.getCell(15).toString());
                    user.setReferredBy(row.getCell(16).toString());
                     
                }
                 
                 
                usersList.add(user);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }





package test;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Date;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

public class PoiReadExcelFile {
	public static void main(String[] args) {
		try {
			FileInputStream fileInputStream = new FileInputStream("poi-test.xls");
			HSSFWorkbook workbook = new HSSFWorkbook(fileInputStream);
			HSSFSheet worksheet = workbook.getSheet("POI Worksheet");
			HSSFRow row1 = worksheet.getRow(0);
			HSSFCell cellA1 = row1.getCell((short) 0);
			String a1Val = cellA1.getStringCellValue();
			HSSFCell cellB1 = row1.getCell((short) 1);
			String b1Val = cellB1.getStringCellValue();
			HSSFCell cellC1 = row1.getCell((short) 2);
			boolean c1Val = cellC1.getBooleanCellValue();
			HSSFCell cellD1 = row1.getCell((short) 3);
			Date d1Val = cellD1.getDateCellValue();

			System.out.println("A1: " + a1Val);
			System.out.println("B1: " + b1Val);
			System.out.println("C1: " + c1Val);
			System.out.println("D1: " + d1Val);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}




















*/