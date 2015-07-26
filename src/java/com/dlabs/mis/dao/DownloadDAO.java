/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

import com.dlabs.mis.model.JasperReportClass;
import com.dlabs.mis.model.Timetable;
import com.dlabs.mis.model.User;
import com.dlabs.session.AuthHandler;
import com.dlabs.util.JasperService;
import com.kjava.base.ReadableException;
import com.kjava.base.db.DaoUtil;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.jasperreports.engine.JasperPrint;
import org.codehaus.jackson.map.ObjectMapper;
import org.json.simple.JSONObject;

/**
 *
 * @author cd
 */
public class DownloadDAO {
    
    public JasperReportClass dstt(//downloadStudentTimetable
                              Connection conn,
                              HttpServletRequest request
                          ) throws ReadableException{
        JasperPrint obj=null;
        Map parameters = new HashMap(); 
        JasperReportClass jrc=new JasperReportClass();
        parameters     =getFileParametersDetails(conn,request);

        TimeTableDAO ttdao=new TimeTableDAO();
        JSONObject job    =new JSONObject();
        
        job=(JSONObject)ttdao.getAllTimeTableAsJson(conn,"","",0,0);
        Collection<JSONObject> items = new ArrayList<JSONObject>();
        items=(Collection<JSONObject>) job.get("rows");
        ObjectMapper objmap=new ObjectMapper();
        //Timetable tt=objmap.readValue(items,Timetable.class);
        for(int i=0;i<items.size();i++){
            //Timetable tt=objmap.readValue(items.,Timetable.class);
        }
        
        String filename=null;
        ResultSet rs= DaoUtil.executeQuery(conn,"SELECT jasperfilename,filetitle FROM jasperdownloadconfig WHERE id=1");
        try {
            if(rs.next()){
               if(rs.getObject("jasperfilename")!=null)
                 filename=rs.getString("jasperfilename");  
               if(rs.getObject("filetitle")!=null)
                 parameters.put("title",rs.getString("filetitle"));
               obj=new JasperService().getJasperPrintDocumentByConnection(filename,parameters,conn);
               jrc.setJasperPrint(obj);
               jrc.setParameter(parameters);
            }
        } catch (SQLException ex) {
            Logger.getLogger(DownloadDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return jrc;
    }

    private Map getFileParametersDetails(Connection conn, HttpServletRequest request) throws ReadableException {

        //get Batchid , schoolname , schooladdress, contact details , 
        //principal name
        Map parameters = new HashMap(); 
        String batchid=new GetBatch(request.getParameter("classid"),request.getParameter("sessionid")).BatchId(conn);
        String bname  =new GetBatch().getBatchName(conn, batchid);
        User usr= AuthHandler.getUser(request);
        String session=(String)usr.getProperties().get("year");

        if(request.getParameter("doctype").equals("1"))parameters.put("filename",session+'_'+bname+".pdf");
        else if(request.getParameter("doctype").equals("2"))parameters.put("filename",session+'_'+bname+".xml");
        else if(request.getParameter("doctype").equals("3"))parameters.put("filename",session+'_'+bname+".doc");
        else if(request.getParameter("doctype").equals("4"))parameters.put("filename",session+'_'+bname+".xls");
        
        parameters.put("batchid",batchid);
        
        parameters.put("sessionid",request.getParameter("sessionid"));
        String query="  SELECT schoolname , pricipalname , websiteurl , addressline1 , addressline2 , city , state , country , pinnumber ,       contact1 , contact2 " +
                     "  FROM schooladmin WHERE sessionid=? AND active=1";
        ResultSet rs= DaoUtil.executeQuery(conn,query,new Object[]{request.getParameter("sessionid")});
        try {
            if(rs.next()){
               if(rs.getObject("schoolname")!=null)                
                parameters.put("schoolname",rs.getString("schoolname"));
               if(rs.getObject("addressline1")!=null && rs.getObject("addressline2")!=null)   
                parameters.put("address",rs.getString("addressline1") + " " +rs.getString("addressline2"));
              if(rs.getObject("city")!=null) 
                parameters.put("city",rs.getString("city"));
              if(rs.getObject("state")!=null)   
                parameters.put("state",rs.getString("state"));
              if(rs.getObject("country")!=null)     
                parameters.put("country",rs.getString("country"));
              if(rs.getObject("contact1")!=null)     
                parameters.put("contact1",rs.getString("contact1"));
              if(rs.getObject("contact2")!=null)     
                parameters.put("contact2",rs.getString("contact2"));              
              if(rs.getObject("websiteurl")!=null)     
                parameters.put("websiteurl",rs.getString("websiteurl"));              
              if(rs.getObject("pricipalname")!=null)     
              parameters.put("pricipalname",rs.getString("pricipalname"));
              parameters.put("sessionname","2013-2014");
              parameters.put("classname","Class-1-A");
              
              
              
            }
        } catch (SQLException ex) {
            Logger.getLogger(DownloadDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return parameters;
    }
    
    public Timetable[] getTimetableClass(Collection<JSONObject> obj){
    
        
        Timetable[] tt   =new Timetable[8];
        
        
        
        
        return tt;
    }
    
}
