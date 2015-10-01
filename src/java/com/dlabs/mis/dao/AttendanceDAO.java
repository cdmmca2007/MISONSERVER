/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

import com.dlabs.mis.model.Attendance;
import com.dlabs.mis.model.AttendanceSheet;
import com.dlabs.mis.model.AttendanceUpdateModel;
import com.kjava.base.ReadableException;
import com.kjava.base.db.DaoUtil;
import com.kjava.base.util.JSONUtil;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Kamlesh the admin
 */
@Repository
public class AttendanceDAO {
    @Autowired
    JSONUtil jsonUtil;
    @Autowired
    private Properties sqlQueries;

    public JSONUtil getJsonUtil() {
        return jsonUtil;
    }

    public void setJsonUtil(JSONUtil jsonUtil) {
        this.jsonUtil = jsonUtil;
    }

    public Properties getSqlQueries() {
        return sqlQueries;
    }

    public void setSqlQueries(Properties sqlQueries) {
        this.sqlQueries = sqlQueries;
    }
    
   public int deleteAttendanceSheet(Connection conn, int sheetId) throws ReadableException {
        return DaoUtil.executeUpdate(conn, sqlQueries.getProperty("DEL_SHEET"), new Object[]{sheetId});
    }

    public void updateAttendanceSheet(Connection conn,int sheetId,AttendanceUpdateModel[] sheets) throws ReadableException {
        try {
        String query = "UPDATE monthly_attendance SET "+sheets[0].getFieldName()+" = ? WHERE sheet_id = ? AND student_id=?";
        ///String smsquery ="SELECT parentmobile AS contactno FROM student WHERE studentid IN (";
        ///String studentids="'";
        for(int i=0; i < sheets.length; i++){
            DaoUtil.executeUpdate(conn,query,new Object[]{sheets[i].getPresence(),sheetId,sheets[i].getStudentId()});
           // studentids=studentids+sheets[i].getStudentId()+"','";
        }
       /* if(studentids.length() > 1){
           studentids=studentids.substring(0,studentids.length()-2);
           query=query+studentids+")";
           
        }*/
        }catch(Exception ex){
             Logger.getLogger(AttendanceDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
    }   

    public JSONObject getAttendanceSheets(Connection conn, AttendanceSheet obj) throws ReadableException {
        ResultSet rs=null;  
        String query = sqlQueries.getProperty("GET_SHEET");
        if(obj.getSessionid()==null)
           rs = DaoUtil.executeQuery(conn, query,new Object[]{obj.getBatchId()});
        else
           rs = DaoUtil.executeQuery(conn, query,new Object[]{new GetBatch(obj.getBatchId(),obj.getSessionid()).BatchId(conn)}); 
        
        return jsonUtil.getJsonObject(rs, 0, 1, 25);
    }
    public JSONObject getAttendanceSheet(Connection conn, String month,String batchId) throws ReadableException{
        String query = "SELECT m.*, m.sheet_id sheetId,map.roll_no rollNo,CONCAT(CONCAT(CONCAT(CONCAT(s.fname,' '),case when s.mname is null then '' else s.mname end),' '),s.lname) as name  FROM "
                + " monthly_attendance m INNER JOIN student_class_map map ON m.student_id=map.student_id "
                + "inner join student s on map.student_id = s.studentid WHERE sheet_id=(SELECT sheet_id FROM attendance_sheet WHERE MONTH = ? AND batch_id=?) ";//sqlQueries.getProperty("GET_SHEET");
        ResultSet rs = DaoUtil.executeQuery(conn, query, new Object[]{month,batchId});
        return jsonUtil.getJsonObject(rs, 0, 1, 25);
    }
    public AttendanceSheet addAttendanceSheet(Connection conn, AttendanceSheet sheet) throws ReadableException, SQLException {
        try {
        if(sheet.getClassId().equalsIgnoreCase(""))
          sheet.setClassId(null);
        else
        {
        sheet.setBatchId(new GetBatch(sheet.getClassId(),sheet.getSessionid()).BatchId(conn));
        
        String checkquery=sqlQueries.getProperty("CHECK_SHEET");
        ResultSet rs_check=DaoUtil.executeQuery(conn, checkquery,new Object[]{sheet.getMonth(),sheet.getBatchId()});
        if(rs_check!=null && rs_check.next() && rs_check.getInt("count")==0) {
            
        DaoUtil.executeUpdate(conn, sqlQueries.getProperty("ADD_SHEET"),new Object[]{sheet.getMonth(),sheet.getBatchId()});
        ResultSet rs = DaoUtil.executeQuery(conn, sqlQueries.getProperty("NEW_SHEET"), null);
       
        if(rs.next()){
            sheet.setId(rs.getInt("sheetId"));  
            // get all student id ResultSet rsStudent
            ResultSet rsStudent = DaoUtil.executeQuery(conn, "SELECT student_id FROM student_class_map  WHERE batch_id=? ", new Object[]{sheet.getBatchId()}); 
            while(rsStudent.next()){
                String studentId = rsStudent.getString("student_id");
                this.addMonthlyAttendance(conn,sheet.getId(),studentId);              
            }
            sheet.setResult(1);
        }
        }else{
          sheet.setResult(-1);
        }
        }
        }catch(Exception ex) {
          sheet.setResult(0);
           Logger.getLogger(AttendanceDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return sheet;
    }

    
    private void addMonthlyAttendance(Connection conn,int sheetId,String sId) throws ReadableException {
        DaoUtil.executeUpdate(conn, sqlQueries.getProperty("ADD_ATTENDANCE"), 
                new Object[]{sheetId,sId});
    }

    public JSONObject getAttendanceSheet(Connection conn, int id) throws ReadableException {
        String query = "SELECT m.*, m.sheet_id sheetId,s.addmission_no,map.roll_no rollNo,CONCAT(CONCAT(CONCAT(CONCAT(s.fname,' '),case when s.mname is null then '' else s.mname end),' '),s.lname) as name  FROM "
                + " monthly_attendance m INNER JOIN attendance_sheet a ON a.sheet_id=m.sheet_id  INNER JOIN student_class_map map ON m.student_id=map.student_id AND map.batch_id=a.batch_id "
                + "inner join student s on map.student_id = s.studentid WHERE m.sheet_id=? ";//sqlQueries.getProperty("GET_SHEET");
        ResultSet rs = DaoUtil.executeQuery(conn, query, new Object[]{id});
        return jsonUtil.getJsonObject(rs, 0, 1, 25);
    }
    public Attendance getAttendanceOfStudent(Connection conn,String studentId,String sessionid, String month) throws ReadableException, SQLException{
        String query = sqlQueries.getProperty("GET_ATTENDACE_MON_STUDENT");
        ResultSet rs = DaoUtil.executeQuery(conn, query, new Object[]{month, studentId});
        return getObject(rs);
    }
    
    Attendance getObject(ResultSet rs) throws SQLException{
        Attendance obj = new Attendance();
        obj.setD1(rs.getString("d1"));
        obj.setD2(rs.getString("d2"));
        obj.setD3(rs.getString("d3"));
        obj.setD4(rs.getString("d4"));
        obj.setD5(rs.getString("d5"));
        obj.setD6(rs.getString("d6"));
        obj.setD7(rs.getString("d7"));
        obj.setD8(rs.getString("d8"));
        obj.setD9(rs.getString("d9"));
        obj.setD10(rs.getString("d10"));
        obj.setD11(rs.getString("d11"));
        obj.setD12(rs.getString("d12"));
        obj.setD13(rs.getString("d13"));
        obj.setD14(rs.getString("d14"));
        obj.setD15(rs.getString("d15"));
        obj.setD16(rs.getString("d16"));
        obj.setD17(rs.getString("d17"));
        obj.setD18(rs.getString("d18"));
        obj.setD19(rs.getString("d19"));
        obj.setD20(rs.getString("d20"));
        obj.setD21(rs.getString("d21"));
        obj.setD22(rs.getString("d22"));
        obj.setD23(rs.getString("d23"));
        obj.setD24(rs.getString("d24"));
        obj.setD25(rs.getString("d25"));
        obj.setD26(rs.getString("d26"));
        obj.setD27(rs.getString("d27"));
        obj.setD28(rs.getString("d28"));
        obj.setD29(rs.getString("d29"));
        obj.setD30(rs.getString("d30"));
        return obj;
    }
}
