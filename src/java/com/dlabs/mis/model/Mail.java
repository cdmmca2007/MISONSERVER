/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.model;

/**
 *
 * @author Kamlesh the admin
 */
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;

@Configurable
public class Mail{

    @Autowired
    private MailSender mailSender;

    private final SimpleMailMessage message = new SimpleMailMessage();
    
    public Mail() {
    }
    
    public Mail(final String from) {
        message.setFrom(from);
    }

    public Mail setReply(final String replyTo) {
        message.setReplyTo(replyTo);
        return this;
    }

    public Mail setTo(final String to) {
        message.setTo(to);
        return this;
    }

    public Mail setCc(final String cc) {
        message.setCc(cc);
        return this;
    }

    public Mail setBcc(final String bcc) {
        message.setBcc(bcc);
        return this;
    }

    public Mail setSubject(final String subject) {
        message.setSubject(subject);
        return this;
    }

    public Mail setBody(final String body) {
        message.setText(body);
        return this;
    }

    public void send() {
        mailSender.send(message);
    }
}
