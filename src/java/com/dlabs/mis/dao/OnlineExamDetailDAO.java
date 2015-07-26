/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

import com.dlab.spring.web.dao.AbstractSimpleDao;
import com.dlabs.mis.model.Notification;
import com.dlabs.mis.model.OnlineExamDetail;
import com.dlabs.mis.model.OnlineExamQuestion;
import com.kjava.base.ReadableException;
import com.kjava.base.db.DaoUtil;
import com.kjava.base.util.ExtJsonUtil;
import com.kjava.base.util.JSONUtil;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Repository;

/**
 *
 * @author XPPRESP3
 */
@Repository("onlineExamDetailDAO")
public class OnlineExamDetailDAO extends AbstractSimpleDao{
    
    JSONUtil jsonUtil = new ExtJsonUtil(); 

    public OnlineExamDetail addOnlineExamDetail(Connection conn, OnlineExamDetail obj) throws ReadableException {

           try {
           String query = "INSERT INTO onlineexamdetail(id,examname,classid,classname,subjectid,ismandatory,publishexam,tot_ques_in_exam,pass_percent,createdby,modifiedby,comment,createddon,instruction)	VALUES(?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_DATE,?)";
           String getClassListQuery="SELECT classid FROM class WHERE NAME LIKE ?";
           ResultSet rs=null; 
           String classname="";
           classname=obj.getClassname();
           if(obj.getId()==null) {

           if(obj.getClassname()!=null) {    
               obj.setClassname(obj.getClassname()+"-%");
               rs = DaoUtil.executeQuery(conn,getClassListQuery,new Object[]{obj.getClassname()});    
           }
           if(rs==null){
             String id = java.util.UUID.randomUUID().toString();    
                        if( DaoUtil.executeUpdate(conn, 
                                     query, 
                                     new Object[]{
                                          id,obj.getExamname(),
                                          null,/*If No Class is select means exam is aplicable to all*/
                                          null,
                                          obj.getSubjectid(),
                                          obj.getIsmandatory(),obj.getPublishexam(),obj.getTot_ques_in_exam(),
                                          obj.getPass_percent(),obj.getCreatedby(),obj.getModifiedby(),obj.getComment(),obj.getInstruction()
                                     })==1)
           {
             
               obj.setId(id);
               obj.setOperation_result(1);
               conn.commit();
           }
           } 
           else{
           String id = java.util.UUID.randomUUID().toString();      
           
           if( DaoUtil.executeUpdate(conn, 
                                     query, 
                                     new Object[]{
                                          id,obj.getExamname(),
                                          null,
                                          classname,
                                          obj.getSubjectid(),
                                          obj.getIsmandatory(),obj.getPublishexam(),obj.getTot_ques_in_exam(),
                                          obj.getPass_percent(),obj.getCreatedby(),obj.getModifiedby(),obj.getComment(),obj.getInstruction()
                                     })==1)
           {
               obj.setId(id);
           }
           String onlineexamclassmap="INSERT INTO onlineexamclassmapping (examid, classid)VALUES(?,?)";
           while(rs!=null && rs.next()){  
               if( DaoUtil.executeUpdate(conn, 
                                     onlineexamclassmap, 
                                     new Object[]{
                                          id,rs.getString("classid")
                                     })==1)
           {
               obj.setId(id);
           }
           }  
           }
             conn.commit();
             obj.setOperation_result(1);
           
           }else{
             String updatequery="UPDATE onlineexamdetail SET  examname = ?, subjectid = ? ,ismandatory = ?, publishexam = ?, tot_ques_in_exam = ? , pass_percent = ? , modifiedby = ? , comment= ? , instruction=? WHERE id=?";
           if( DaoUtil.executeUpdate(conn, 
                                     updatequery, 
                                     new Object[]{
                                          obj.getExamname(),
                                          obj.getSubjectid(),
                                          obj.getIsmandatory(),obj.getPublishexam(),obj.getTot_ques_in_exam(),
                                          obj.getPass_percent(),obj.getModifiedby(),obj.getComment(),obj.getInstruction(),
                                          obj.getId()
                                     })==1)
           {
             
               obj.setOperation_result(1);
               conn.commit();
           }
             
           }
        } catch (SQLException ex) {
            obj.setOperation_result(0);
            throw new ReadableException(ex.getCause(),ex.getMessage(),"OnlineExamDetailDAO", "addOnlineExamDetail");
        }
        return obj;
        
    }

    
    
    public Object getOnlineExamDetail(Connection conn, String classname, int page, int rows) throws ReadableException {
        JSONObject job = null;
        String selectquery= "SELECT oed.id, oed.examname,oed.classid, oed.subjectid, m.value AS subject,oed.ismandatory, " +
                            "        oed.publishexam, oed.tot_ques_in_exam,oed.pass_percent,oed.instruction, " +
                            "	oed.createddon ,oed.comment , u.name AS createdby, oed.classname as class " +
                            "  FROM 	onlineexamdetail oed " +
                            "LEFT JOIN master m ON m.id=oed.subjectid	" +
                            "LEFT JOIN users  u ON u.userid=oed.createdby";
        String countquery= "select count(1) as count " +
                            "  FROM onlineexamdetail oed " +
                            "LEFT JOIN master m ON m.id=oed.subjectid	" +
                            "LEFT JOIN users  u ON u.userid=oed.createdby";
        int flag=0;
        int count =0; 
        ResultSet rs=null; 
        
        if(classname!=null && !classname.equals("")){
          selectquery=selectquery+" where oed.classname=?";
          countquery=countquery+" where oed.classname=?";
          flag=1;
        }
        selectquery=selectquery+ " LIMIT ? OFFSET ? ";
        try{
            if(flag==1)
             rs = DaoUtil.executeQuery(conn,countquery,new Object[]{classname});
            else
             rs = DaoUtil.executeQuery(conn,countquery);   
            if(rs.next()) {
                count = rs.getInt("count");
            }
            if(flag==1)
               rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{classname,rows,page});
            else
               rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{rows,page}); 
            job = jsonUtil.getJsonObject(rs, count, rows,page, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;

    }

    public OnlineExamQuestion addOnlineExamQuestion(Connection conn, OnlineExamQuestion obj) throws ReadableException {
      
        String questioninsert="INSERT INTO onlineexamquestion (id, examid, question,createdby, modifiedby, createdon) VALUES(?,?,?,?,?,CURRENT_DATE)";
        String examquestionoptioninsrt="INSERT INTO onlineexamquesoptions (onlineexamquesid, ans_type, option_1_name, option_1_isawnser, option_2_name," +
                                "	option_2_isawnser, option_3_name, option_3_isawnser, option_4_name, option_4_isawnser," +
                                "	all_of_above_option, 	all_of_d_abv_opt_is_ans,none_of_the_above_option,none_of_d_abv_opt_is_ans," +
                                "	createdby, modifiedby, createdon,marks,negativemarks, timeallocated )" +
                                "VALUES	(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_DATE,?,?,?)";
        String questionid = java.util.UUID.randomUUID().toString();      
        try{
           if(obj.getPid()==null){
              
              if(DaoUtil.executeUpdate(conn, 
                                     questioninsert, 
                                     new Object[]{
                                          questionid,
                                          obj.getOnlineexamquesid(),
                                          obj.getQuestion(),
                                          obj.getCreatedby(),obj.getModifiedby()
                                     })==1) {
              
                  if(DaoUtil.executeUpdate(conn, 
                                     examquestionoptioninsrt, 
                                     new Object[]{
                                          questionid,
                                          obj.getAns_type(),obj.getOption_1_name(),obj.getOption_1_isawnser()
                                          ,obj.getOption_2_name(),obj.getOption_2_isawnser()
                                          ,obj.getOption_3_name(),obj.getOption_3_isawnser()
                                          ,obj.getOption_4_name(),obj.getOption_4_isawnser()
                                          ,obj.getAll_of_the_above_option(),obj.getAll_of_d_abv_opt_is_ans()
                                          ,obj.getNone_of_the_above_option(),obj.getNone_of_d_abv_opt_is_ans()
                                          ,obj.getCreatedby(),obj.getModifiedby(),obj.getMarks(),obj.getNegativemarks(),obj.getTimeallocated()
                                          
                                     })==1){
                     obj.setPid(questionid);
                     obj.setResult(1);
                     conn.commit();
                  }
                  
              }
               
           } 
           else{
               obj.setPid(questionid);
           }
        }
        catch (SQLException ex) {
            throw new ReadableException(ex.getCause(),ex.getMessage(),"OnlineExamDetailDAO", "addOnlineExamDetail");
        }
        catch (Exception ex) {
            throw new ReadableException(ex.getCause(),ex.getMessage(),"OnlineExamDetailDAO", "addOnlineExamDetail");
        }
        
      return obj;    
    }

    public Object getOnlineExamQuestionList(Connection conn, String examid, int page, int rows) throws ReadableException {
        JSONObject job = null;
        String selectquery= "SELECT olq.id,  olq.question ,olqo.ans_type  FROM onlineexamquestion olq LEFT JOIN  onlineexamquesoptions olqo ON olqo.onlineexamquesid=olq.id WHERE examid=? AND olq.deleted=0 LIMIT ? OFFSET ? ";
        String countquery= "SELECT count(1) as count  FROM onlineexamquestion olq LEFT JOIN  onlineexamquesoptions olqo ON olqo.onlineexamquesid=olq.id WHERE examid=? AND olq.deleted=0";
        
        int count =0; 
        
        if(examid!=null && !examid.equals("")){
        try{
            ResultSet rs = DaoUtil.executeQuery(conn,countquery,new Object[]{examid});
            if(rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn,selectquery,new Object[]{examid,rows,page});
            job = jsonUtil.getJsonObject(rs, count, rows,page, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(MasterDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        }
        return job;
    }

    public Map<String, Object> schOnlineExam(Connection conn, Map<String, Object> model) throws ReadableException {
        //logger.debug("Paaram:"+model);
        String schexampid="";
        if(conn!=null && model!=null)    {
        String batchid=new GetBatch(model.get("classid").toString(),model.get("sessionid").toString()).BatchId(conn);
        String query = this.sqlQueries.getProperty("GET_STUDENT_LIST"); 
        model.put("batchid", batchid);
        List<Map<String, Object>> stud=this.jdbcTemplate.queryForList(query,model);
        query = this.sqlQueries.getProperty("ADD_SCHEDULE_ONLINE_EXAM"); 
        schexampid=UUID.randomUUID().toString();
        model.put("pid",schexampid);
        if(this.jdbcTemplate.update(query, model) > 0) {
        query = this.sqlQueries.getProperty("ADD_SCHEDULE_ONLINE_EXAM_FOR_STUD"); 
        for (int i = 0; i < stud.size(); i++) {
            Map record = (Map) stud.get(i);
            model.put("id",UUID.randomUUID().toString());
            model.put("schonlineexamid", schexampid);
            model.put("studentid",record.get("studentid").toString());
            model.put("tempuserid",java.util.UUID.randomUUID().toString().split("-")[i%4].toUpperCase());
            model.put("temppassword",java.util.UUID.randomUUID().toString().split("-")[i%4]);
            if(this.jdbcTemplate.update(query, model) > 0){
              ////Put Audit Trial Code 
              //// Send an email to PM for project allocation
              //// Map<String,String> pm_emailid=getUserEmailId(project.get("projectmanagerid").toString());
        }
        }
        }
        }
        return model;
    }

    public Object getOnlineSchExamList(Connection conn, Map<String,Object> model, int page, int rows) throws ReadableException {
        
        
        JSONObject job = null;
        ResultSet rs = null;
        int count = 0;
        String countQuery=null;
        String dataQuery =null;
        String batchid=new GetBatch(model.get("classid").toString(),model.get("sessionid").toString()).BatchId(conn);
            countQuery=this.sqlQueries.getProperty("GET_ONLINE_SCH_EXAM_COUNT");
            dataQuery =this.sqlQueries.getProperty("GET_ONLINE_SCH_EXAM");
        
        try {
            rs = DaoUtil.executeQuery(conn,countQuery,new Object[]{batchid,model.get("userid")});
            if (rs.next()) {
                count = rs.getInt("count");
                rs = DaoUtil.executeQuery(conn,dataQuery,new Object[]{batchid,model.get("userid")});
            }
            
            job = new ExtJsonUtil().getJsonObject(rs, count, page,rows, false);
        } catch(SQLException ex) {
            Logger.getLogger(ComboDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;
        
    }
 
    public Map<String, Object> reschOnlineExam(Connection conn, Map<String, Object> model) throws ReadableException {
        //logger.debug("Paaram:"+model);
        if(conn!=null && model!=null)    {
        String query = this.sqlQueries.getProperty("RE_SCHEDULE_ONLINE_EXAM"); 

        if(this.jdbcTemplate.update(query, model) > 0) {
            model.put("result", 1);
        }else
            model.put("result", 0);
  
        }
        return model;
    }
    public Map<String, Object> delSchOnlineExam(Connection conn, Map<String, Object> model) throws ReadableException {
        //logger.debug("Paaram:"+model);
        if(conn!=null && model!=null)    {
        String query = this.sqlQueries.getProperty("DEL_SCHEDULE_ONLINE_EXAM"); 

        if(this.jdbcTemplate.update(query, model) > 0) {
            model.put("result", 1);
        }else
            model.put("result", 0);
  
        }
        return model;
    }
    public Object getOnlineSchUserPassList(Connection conn, Map<String,Object> model, int page, int rows) throws ReadableException {
        
        
        JSONObject job = null;
        ResultSet rs = null;
        int count = 0;
        String countQuery=null;
        String dataQuery =null;
        
        countQuery=this.sqlQueries.getProperty("GET_EXAM_USER_PASS_COUNT");
        dataQuery =this.sqlQueries.getProperty("GET_EXAM_USER_PASS");
        
        try {
            rs = DaoUtil.executeQuery(conn,countQuery,new Object[]{model.get("pid")});
            if (rs.next()) {
                count = rs.getInt("count");
                rs = DaoUtil.executeQuery(conn,dataQuery,new Object[]{model.get("pid")});
            }
            
            job = new ExtJsonUtil().getJsonObject(rs, count, page,rows, false);
        } catch(SQLException ex) {
            Logger.getLogger(ComboDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;
        
    }
}
