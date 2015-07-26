/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.services;

import com.dlabs.mis.model.ContactAdmin;
import com.dlabs.mis.model.InitiateAdmissionProcess;
import com.dlabs.mis.model.NewStudent;
import com.dlabs.mis.model.ScheduleStrudentInterviewExam;
import com.dlabs.mis.model.Student;
import com.dlabs.mis.model.Timetable;
import com.dlabs.mis.model.User;
import java.sql.Connection;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author Kamlesh
 */
public interface MailService {
    int CREATE_USER_TPL = 1, CREATE_STUDENT_TPL =2,STUDENT_ABSENT_TPL =3,
    ADD_CLASS_TEACHER =4, TIMETABLE_TPL= 5,
    PAYMENT_SUCCESS_TPL = 6, PATMENT_DUE_TPL = 7,
    ADD_STUDENT_TRANSPORT_TPL=8,
    CREATE_NOTIFICATION_TPL = 9,
    BOOK_DUE_TPL = 10,
    BOOK_ISSUE_TPL=11,
    HOME_WORK_TPL=12,
    REPORT_CARD_TPL=13,
    DIGITAL_DIARY_TPL = 14, CREATE_EXAM_TPL =15,
    PROPMOT_STUDENT_TPL = 16, EVENT_CREATION_TPL =17, SEND_ADMISSION_LINK_TO_PARENT=101,
    SEND_INTER_EXAM_DATE=102,CONTACT_ADMIN=103,SEND_LINK_FORGOT_PASSWORD=104;  
    
    
    
   
    void sendCreateUserNotification(Connection conn, User user);
    void sendAbsentNotification(Connection conn);
    void onCreateStudent(Connection conn, NewStudent student);
    void onAddClassTeacher(Connection conn);
    void onCreateTimeTable(Connection conn, Timetable timeTable);
    void onPayment(Connection conn);
    void paymentNotification(Connection conn);
    void onAddTransport(Connection conn);
    void onCreateNotification(Connection conn);
    void bookDueNotification(Connection conn); 
    void onBookIssue(Connection conn);
    void unCompleteHWNotification(Connection conn);
    void notifyReportCard(Connection conn);
    void notifyDigitalDiary(Connection conn);
    void oncreateExamp(Connection conn);
    void notifyPromotStudent(Connection conn);
    void notifyAlert(Connection conn);
    void onEventCreation(Connection conn);
    void onSendAddmissionLinkToPArent(Connection conn,InitiateAdmissionProcess obj);
    
    String getTeacherEmailId(Connection conn,String teacherid);
    Map getAllTeacherEmailId(Connection conn,String sessionid);
    Map getAllTeacherOfClassEmailId(Connection conn,String classid);
    
    String getParentEmailId(Connection conn,String parentid);
    Map getAllParentOfClassEmailId(Connection conn,String classid);
    Map getAllParentEmailId(Connection conn,String sessionid);
    
    String getEmailIdOfUser(Connection conn,String userid);
    
    String getTeacherContactNumber(Connection conn,String teacherid);
    Map getAllTeacherContactNumber(Connection conn,String sessionid);
    Map getAllTeacherOfClassContactNumber(Connection conn,String teacherid);
    String getParentContactNumber(Connection conn,String parentid);
    Map getAllParentOfClassContactNumber(Connection conn,String parentid);
    Map getAllParentContactNumber(Connection conn,String sessionid);

    public void onSendInterViewExamDateToPArent(Connection conn, ScheduleStrudentInterviewExam obj);

    public void onContactAdmin(Connection conn, ContactAdmin obj);
   
    public void sendLinkOnForgotPassword(Connection conn,String name,String emailid,String pass);
    
}
