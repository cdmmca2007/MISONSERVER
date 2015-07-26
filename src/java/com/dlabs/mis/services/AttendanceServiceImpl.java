package com.dlabs.mis.services;

import com.dlabs.mis.dao.AttendanceDAO;
import com.dlabs.mis.dao.GetBatch;
import com.dlabs.mis.model.Attendance;
import com.dlabs.mis.model.AttendanceSheet;
import com.dlabs.mis.model.AttendanceUpdateModel;
import com.kjava.base.ReadableException;
import com.kjava.base.db.DaoUtil;
import com.kjava.base.db.DbPool;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Calendar;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 *
 * @author Kamlesh the admin
 */
@Component
public class AttendanceServiceImpl implements AttendanceService {

    @Autowired
    AttendanceDAO attendanceDAO;
    Connection conn = null;
    @Autowired MailService mailService;

    public AttendanceDAO getAttendanceDAO() {
        return attendanceDAO;
    }

    public void setAttendanceDAO(AttendanceDAO attendanceDAO) {
        this.attendanceDAO = attendanceDAO;
    }

    public void setMailService(MailService mailService) {
        this.mailService = mailService;
    }

    
    @Override
    public JSONObject getAttendanceSheets(AttendanceSheet defaultSheet) {
         JSONObject job =null;
        try {
            conn = DbPool.getConnection();
            job = attendanceDAO.getAttendanceSheets(conn,defaultSheet);         
            JSONObject monthSheet = attendanceDAO.getAttendanceSheet(conn, defaultSheet.getMonth(), defaultSheet.getBatchId());
            JSONArray rows = (JSONArray)job.get("rows");
            for(int i=0; i<rows.size();i++){
                JSONObject obj = (JSONObject)rows.get(i);
                if(obj.get("month").equals(defaultSheet.getMonth()) && obj.get("batchId").equals(defaultSheet.getBatchId())){
                     obj.put("attendance", monthSheet.get("rows"));
                     break;
                }
            }
        } catch (Exception ex) {
           job = null;
        } finally {
            DbPool.close(conn);
        }
        return job;
    }
    @Override
    public JSONObject getAttendanceSheet(int id) {
        JSONObject obj = new JSONObject();
        try {
            conn = DbPool.getConnection();
            JSONObject jobj = attendanceDAO.getAttendanceSheet(conn, id);
            obj.put("sheetId", id);
            obj.put("attendance", jobj.get("rows"));
            conn.commit();
        } catch (Exception ex) {
            DbPool.rollback(conn);
        } finally {
            DbPool.close(conn);
        }
        return obj;
    }
    @Override
    public AttendanceSheet addAttendanceSheet(AttendanceSheet sheet) {
        try {
            conn = DbPool.getConnection();
            sheet = attendanceDAO.addAttendanceSheet(conn,sheet);
            conn.commit();
        } catch (Exception ex) {
            DbPool.rollback(conn);
        } finally {
            DbPool.close(conn);
        }
        return sheet;
    }

    @Override
    public String deleteAttendanceSheet(int sheetId) {
        String result = "{sucess:true}";
        try {
            conn = DbPool.getConnection();
            attendanceDAO.deleteAttendanceSheet(conn,sheetId);
            conn.commit();
        } catch (Exception ex) {
            result = "{sucess:false}";
        } finally {
            DbPool.close(conn);
        }
        return result;
    }

    @Override
    public String updateAttendanceSheet(int sheetId,AttendanceUpdateModel[] sheets) {
       String result = "{success:true}";
        try {
            conn = DbPool.getConnection();
            attendanceDAO.updateAttendanceSheet(conn,sheetId,sheets);
            conn.commit();
        } catch (Exception ex) {
            DbPool.rollback(conn);
            result = "{success:false}";
        } finally {
            DbPool.close(conn);
        }
        return result;
    }

    public String getAttnedanceOfMonth(String studentId,String sessionid, String month) throws ReadableException {
        sessionid ="00a24b9a-5bb2-4466-b629-f9d91de9e551";
        studentId = "06bd64f3-c532-41ab-9032-3535e49c93be";
        month = "Jan-2014";
        String batchid=new GetBatch().getBatchId(conn, studentId, sessionid);
        String result ="";
        try {
            conn = DbPool.getConnection();
            Attendance att = this.attendanceDAO.getAttendanceOfStudent(conn, month,batchid,studentId);
            conn.commit();
            Calendar cal = Calendar.getInstance();
            cal.set(Calendar.DATE, 1);
            //cal.get(Calendar.);
        } catch (Exception ex) {
            DbPool.rollback(conn);
            result = "{success:false}";
        } finally {
            DbPool.close(conn);
        }
        return result;
    }

    public Object getMonthlyAttendanceOfStudent(String studentid, String batchid, String month) throws ReadableException {
        JSONObject job = new JSONObject();
        String qury_1="SELECT sheet_id FROM attendance_sheet WHERE batch_id=? AND MONTH=?";
        String qury_2="SELECT * FROM monthly_attendance WHERE sheet_id=?  AND student_id=?";
        int present=0;
        int absent=0;
        try {
            conn = DbPool.getConnection();
        } catch (SQLException ex) {
            Logger.getLogger(AttendanceServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
        ResultSet rs = DaoUtil.executeQuery(conn,qury_1,new Object[]{batchid ,month});        
        try {
            if(rs!=null && rs.next()){
        
                if(rs.getObject("sheet_id")!=null){
                  int sheet_id=rs.getInt("sheet_id");  
                  rs = DaoUtil.executeQuery(conn,qury_2,new Object[]{sheet_id,studentid});        
                  if(rs!=null && rs.next()){
                    
                    for(int x=1 ;x<32;x++){
                      String day="d"+x;
                      if(rs.getObject(day)!=null){
                         if(rs.getString(day).equals("P"))                          
                         {
                            present++;  
                            job.put(day,"P");
                         }
                         else
                         {
                             absent++;
                             job.put(day,"A");
                         }    
                      }
                      else{
                             job.put(day,"");
                      }
                    }  
                  }
                 
                  job.put("tot_present",present);
                  job.put("tot_absent",absent);
                  
                }
            }
        } catch (SQLException ex) {
            Logger.getLogger(AttendanceServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return job;
    }

   
}
