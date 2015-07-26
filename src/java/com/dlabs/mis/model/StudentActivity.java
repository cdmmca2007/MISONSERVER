/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 *
 * @author Kamlesh
 */
public class StudentActivity {
    public final static int DIGITAL_DIARY=1;
    private String activityid;
    private int activityType;
    private String activityname;
    private String commentId;
    private String subject;
    private String comment;
    private String userid;
    private String userName;
    private Date timestamp;
    private String image;  

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
    
    private List<Comment> posts = new ArrayList<Comment>();

    public String getActivityid() {
        return activityid;
    }

    public void setActivityid(String activityid) {
        this.activityid = activityid;
    }
    
    public String getActivityname() {
        return activityname;
    }

    public void setActivityname(String activityname) {
        this.activityname = activityname;
    }
    public int getActivityType() {
        return activityType;
    }

    public void setActivityType(int activityType) {
        this.activityType = activityType;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }
    public void addPost(Comment comment){
        this.posts.add(comment);
    }

    public List<Comment> getPosts() {
        return posts;
    }

    public String getCommentId() {
        return commentId;
    }

    public void setCommentId(String commentId) {
        this.commentId = commentId;
    }
    
}
