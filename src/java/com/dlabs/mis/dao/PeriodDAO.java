/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dlabs.mis.dao;

import com.dlab.spring.web.dao.AbstractSimpleDao;
import com.dlabs.mis.model.Classes;
import com.dlabs.mis.model.Period;
import com.kjava.base.ReadableException;
import com.kjava.base.db.DaoUtil;
import com.kjava.base.util.ExtJsonUtil;
import com.kjava.base.util.JSONUtil;
import java.sql.ResultSet;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author cd
 */
public class PeriodDAO  extends AbstractSimpleDao{

 JSONUtil jsonUtil = new ExtJsonUtil();
    public Period addOrEditPeriod(Connection conn, Period period) throws ReadableException {
        int count=0;
        int flag=0,x=0;
        String periodid;
        int totnoofperiod=0;
        ResultSet rs = null;
        
        try {
            String query = "select starttime from ref_period where periodnumber='PeriodConfig'";
           
            period.setSchoolid("1000");

            rs = DaoUtil.executeQuery(conn,query);
            if(!rs.next()) {                
                totnoofperiod=period.getTotnoofperiod();
                for(x=1;x<=totnoofperiod;x++){
                    periodid = java.util.UUID.randomUUID().toString();
                    String insertquery="insert into ref_period(periodid,periodnumber,starttime,endtime,createdby,schoolid) values(?,?,?,?,?,?)";

                    if( DaoUtil.executeUpdate(conn, insertquery , new Object[]{periodid,"Period"+x,"","","",period.getSchoolid()})==1)
                      {
                         flag=1;
                      }
                }
                   periodid = java.util.UUID.randomUUID().toString();
                   query="insert into ref_period(periodid,periodnumber,starttime,endtime,createdby,schoolid) values(?,?,?,?,?,?)";
                   if(DaoUtil.executeUpdate(conn, query, new Object[]{periodid,"PeriodConfig",totnoofperiod,"","",period.getSchoolid()})==1 && flag==1)
                       {
                        conn.commit();
                       }            
            }
           else
           {
                count=Integer.parseInt(rs.getString("starttime"));
                totnoofperiod=period.getTotnoofperiod()+count;
                for(x=count;x<=totnoofperiod;x++){
                    periodid = java.util.UUID.randomUUID().toString();
                    String insertquery="insert into ref_period(periodid,periodnumber,starttime,endtime,createdby,schoolid) values(?,?,?,?,?,?)";

                    if( DaoUtil.executeUpdate(conn, insertquery , new Object[]{periodid,"Period"+x,"","","",period.getSchoolid()})==1)
                      {
                         flag=1;
                      }
                }
                   
                   query="update ref_period set starttime=? where periodnumber='PeriodConfig'";
                   if(DaoUtil.executeUpdate(conn, query, new Object[]{totnoofperiod})==1 && flag==1)
                       {
                        conn.commit();
                       } 
           }
        } catch (SQLException ex) {
            throw new ReadableException(ex,ex.getMessage(),"PeriodDAO", "addoredit");
        }
        return period;
    }


    public Period[] addOrEditPeriodData(Connection conn, Period[] period) throws ReadableException  {

        int flag=0,x=0;
        String periodid;
        ResultSet rs = null;
        String query="update ref_period set starttime=? , endtime=? where periodid=? and periodnumber=?";
        try {
        for(x=0;x<period.length;x++){
             flag=0;
             if(DaoUtil.executeUpdate(conn,query ,new Object[]{period[x].getStarttime(),
                                                               period[x].getEndtime(),
                                                               period[x].getPeriodid(),
                                                               period[x].getPeriodnumber()
                                                              })==1)
                      {
                         flag=1;
                      }
        }
        if(flag==1)
            conn.commit();
        }
        catch (SQLException ex) {
            throw new ReadableException(ex,ex.getMessage(),"PeriodDAO", "addOrEditPeriodData");
        }

        return period;
    }

    public Object getAllPeriodAsJson(Connection conn, int page, int rows) throws ReadableException {
        JSONObject job = null;
        ResultSet rs = null;
        int count =0;
        String schoolid="1000";
        try{
            rs = DaoUtil.executeQuery(conn, "SELECT count(1) as count from ref_period where periodnumber!='PeriodConfig'");
            if(rs.next()) {
                count = rs.getInt("count");

            }
            rs = DaoUtil.executeQuery(conn,"SELECT periodid ,periodnumber,starttime,endtime from ref_period where periodnumber!='PeriodConfig' and schoolid=? limit ? offset ?",new Object[]{schoolid,15,0});
            job = jsonUtil.getJsonObject(rs, count, page,rows, false);
        }
        catch (SQLException ex) {
            Logger.getLogger(PeriodDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return job;
    }
    public Map<String, Object> delSchOnlineExam(Connection conn, Map<String, Object> model) throws ReadableException {
        //logger.debug("Paaram:"+model);
        if(conn!=null && model!=null)    {
        String query = this.sqlQueries.getProperty("DEL_PERIOD"); 

        if(this.jdbcTemplate.update(query, model) > 0) {
            model.put("result", 1);
        }else
            model.put("result", 0);
  
        }
        return model;
    }
}
