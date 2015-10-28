/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

import com.dlab.spring.web.dao.AbstractSimpleDao;
import com.dlabs.mis.model.Notification;
import com.dlabs.mis.model.OnlineExamDetail;
import com.dlabs.mis.model.OnlineExamQuestion;
import com.dlabs.mis.services.AuditTrailService;
import com.kjava.base.ReadableException;
import com.kjava.base.db.DaoUtil;
import com.kjava.base.db.DbPool;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author XPPRESP3
 */
@Repository("fineDiscountDAO")
public class FineDiscountDAO extends AbstractSimpleDao{
    
   JSONUtil jsonUtil = new ExtJsonUtil(); 
   @Autowired AuditTrailService auditTrailService;

   public Map<String, Object> addFine(Connection conn, Map<String, Object> model) {

        String fineid="";
        if(conn!=null && model!=null)    {
            if(model.get("finetypeid")!=null && !model.get("finetypeid").equals("")){
                    String query = this.sqlQueries.getProperty("UPDATE_FINE"); 
                    try {
                    if(this.jdbcTemplate.update(query, model) > 0) {
                        auditTrailService.insertLog(conn, 1002,null);
                        conn.commit();
                    }
                    }catch(Exception ex){
                    Logger.getLogger(FineDiscountDAO.class.getName()).log(Level.SEVERE, null, ex);
                    }
            }  else{
                    String query = this.sqlQueries.getProperty("ADD_FINE"); 
                    fineid=UUID.randomUUID().toString();
                    model.put("finetypeid",fineid);
                    try {
                    if(this.jdbcTemplate.update(query, model) > 0) {
                        auditTrailService.insertLog(conn, 1001,null);
                        conn.commit();
                    }
                    }catch(Exception ex){
                    Logger.getLogger(FineDiscountDAO.class.getName()).log(Level.SEVERE, null, ex);
                    }
            
            }       
        }
        return model;
        
        
    }
   
   public Map<String, Object> deleteFine(Connection conn, Map<String, Object> model) {

        if(conn!=null && model!=null)    {
            if(model.get("finetypeid")!=null && !model.get("finetypeid").equals("")){
                    String query = this.sqlQueries.getProperty("DELETE_FINE"); 
                    try {
                    if(this.jdbcTemplate.update(query, model) > 0) {
                        auditTrailService.insertLog(conn, 1003,null);
                        conn.commit();
                    }
                    }catch(Exception ex){
                    Logger.getLogger(FineDiscountDAO.class.getName()).log(Level.SEVERE, null, ex);
                    }
            }       
        }
        return model;
        
        
    }
    public Map<String, Object> addFineRule(Connection conn, Map<String, Object> model) {

        //logger.debug("Paaram:"+model);
        String fineid="";
        if(conn!=null && model!=null)    {
            if(model.get("fineid")!=null && !model.get("fineid").equals("")){
                    String query = this.sqlQueries.getProperty("UPDATE_FINE_RULE"); 
                    try {
                    if(this.jdbcTemplate.update(query, model) > 0) {
                        auditTrailService.insertLog(conn, 1004,null);
                        conn.commit();
                    }
                    }catch(Exception ex){
                    Logger.getLogger(FineDiscountDAO.class.getName()).log(Level.SEVERE, null, ex);
                    }
            }  else{
                    String query = this.sqlQueries.getProperty("ADD_FINE_RULE"); 
                    fineid=UUID.randomUUID().toString();
                    model.put("fineid",fineid);
                    try {
                    if(this.jdbcTemplate.update(query, model) > 0) {
                        auditTrailService.insertLog(conn, 1004,null);
                        conn.commit();
                    }
                    }catch(Exception ex){
                    Logger.getLogger(FineDiscountDAO.class.getName()).log(Level.SEVERE, null, ex);
                    }
            
            }       
        }
        return model;
        
        
    }
    public Object getFineList(Connection conn, String sessionid, int page, int rows) throws ReadableException {
        JSONObject job = null;
        ResultSet rs = null;
        int count = 0;
        String countQuery=null;
        String dataQuery =null;
        
        countQuery=this.sqlQueries.getProperty("GET_FINE_COUNT");
        dataQuery =this.sqlQueries.getProperty("GET_FINE");
        
        try {
            rs = DaoUtil.executeQuery(conn,countQuery,new Object[]{sessionid});
            if (rs.next()) {
                count = rs.getInt("count");
                rs = DaoUtil.executeQuery(conn,dataQuery,new Object[]{sessionid});
            }
         
            job = new ExtJsonUtil().getJsonObject(rs, count, page,rows, false);
        } catch(SQLException ex) {
            Logger.getLogger(FineDiscountDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;
    }

    public Map<String, Object> addDiscount(Connection conn, Map<String, Object> model) throws ReadableException {

        String discountid="" , batchid="";
        if(conn!=null && model!=null)    {
            if(model.get("classid")!=null && !model.get("classid").equals("")){
             batchid=new GetBatch(model.get("classid").toString(),model.get("sessionid").toString()).BatchId(conn);   
             model.put("batchid",batchid);
            }
            else{
             model.put("batchid",null);   
            }
            
            if(model.get("studentcategory")==null || model.get("studentcategory").equals(""))
                 model.put("studentcategory",null);   
            if(model.get("studentid")==null || model.get("studentid").equals(""))
                 model.put("studentid",null);   
            
            
            if(model.get("discountid")!=null && !model.get("discountid").equals("")){
                    String query = this.sqlQueries.getProperty("UPDATE_DISCOUNT"); 
                    try {
                    if(this.jdbcTemplate.update(query, model) > 0) {
                        auditTrailService.insertLog(conn, 1006,null);
                        conn.commit();
                    }
                    }catch(Exception ex){
                    Logger.getLogger(FineDiscountDAO.class.getName()).log(Level.SEVERE, null, ex);
                    }
            }  else{
                    String query = this.sqlQueries.getProperty("ADD_DISCOUNT"); 
                    discountid=UUID.randomUUID().toString();
                    model.put("discountid",discountid);
                    try {
                    if(this.jdbcTemplate.update(query, model) > 0) {
                        auditTrailService.insertLog(conn, 1005,null);
                        conn.commit();
                    }
                    }catch(Exception ex){
                    Logger.getLogger(FineDiscountDAO.class.getName()).log(Level.SEVERE, null, ex);
                    }
            
            }       
        }
        return model;
        

        
        
    }

    public Object getDiscountList(Connection conn, String sessionid, int page, int rows) throws ReadableException {

        JSONObject job = null;
        ResultSet rs = null;
        int count = 0;
        String countQuery=null;
        String dataQuery =null;
        
        countQuery=this.sqlQueries.getProperty("GET_DISCOUNT_LIST_COUNT");
        dataQuery =this.sqlQueries.getProperty("GET_DISCOUNT_LIST");
        
        try {
            if(sessionid!=null && !sessionid.equals("")) {
                
            countQuery=countQuery+" and sessionid=?";    
            dataQuery =dataQuery+" and sessionid=?";    
                
            rs = DaoUtil.executeQuery(conn,countQuery,new Object[]{sessionid});
            if (rs.next()) {
                count = rs.getInt("count");
                rs = DaoUtil.executeQuery(conn,dataQuery,new Object[]{sessionid});
            }
            }else{
            rs = DaoUtil.executeQuery(conn,countQuery);
            if (rs.next()) {
                count = rs.getInt("count");
                rs = DaoUtil.executeQuery(conn,dataQuery);
            }
            } 
            job = new ExtJsonUtil().getJsonObject(rs, count, page,rows, false);
        } catch(SQLException ex) {
            Logger.getLogger(FineDiscountDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;
        
    }

    public Map<String, Object> addFineToStudMonthlyFee(Connection conn, Map<String, Object> model) throws ReadableException {

        ResultSet rs = null;
        int    finechargecategory=0;
        float  amountdisc=0;
        float  fineamount=0;
        float  totfee=0;
        if(conn!=null && model!=null)    {
            String fineid=model.get("fineid").toString();
            String monthly_fee_id=model.get("monthly_fee_id").toString();
            if(fineid!=null && !fineid.equals("")){
                String finecharge = this.sqlQueries.getProperty("GET_FINE_COND_AMT");     
                String query = this.sqlQueries.getProperty("UPDATE_FINE_FOR_STUD_MONTH_FEE"); 
                String amountquery=this.sqlQueries.getProperty("GET_MONTHLY_FEE_AMOUNT"); 
                try {
                rs = DaoUtil.executeQuery(conn,finecharge,new Object[]{fineid});    
                
                if(rs.next()) {
                if(rs.getObject("finechargecategory")!=null){
                    finechargecategory=rs.getInt("finechargecategory");
                    amountdisc        =rs.getFloat("fineamountpercent");
                }}
                
                rs = DaoUtil.executeQuery(conn,amountquery,new Object[]{monthly_fee_id});    
                if(rs.next()){
                if(rs.getObject("amount")!=null){
                    totfee        =rs.getFloat("amount");
                }}
                
                if(finechargecategory==0){
                    fineamount=amountdisc;
                }else{
                    fineamount=(totfee*amountdisc/100);
                }
                model.put("fineamount", fineamount);
                if(this.jdbcTemplate.update(query, model) > 0) {
                    auditTrailService.insertLog(conn, 1009,null);
                    conn.commit();
                }
                }catch(Exception ex){
                Logger.getLogger(FineDiscountDAO.class.getName()).log(Level.SEVERE, null, ex);
                }
            }       
            
        }
        return model;
    }

    public Map<String, Object> getDiscountListForStudent(Connection conn, Map<String, Object> model) {

        
        
        return model;
    }
    
    
}
