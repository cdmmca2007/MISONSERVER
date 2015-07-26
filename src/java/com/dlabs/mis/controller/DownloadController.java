/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.controller;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.dlabs.file.FileDownLoadImpl;
import com.dlabs.mis.dao.DocumentDAO;
import com.dlabs.mis.dao.DownloadDAO;
import com.dlabs.mis.dao.TimeTableDAO;
import com.dlabs.mis.model.DownloadRequest;
import com.dlabs.mis.model.JasperReportClass;
import com.dlabs.mis.model.StudentBean;
import com.dlabs.mis.model.Timetable;
import com.dlabs.mis.model.User;
import com.dlabs.session.AuthHandler;
import com.kjava.base.ReadableException;
import com.kjava.base.db.DbPool;
import java.io.FileNotFoundException;
import java.lang.reflect.Method;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletOutputStream;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.design.JasperDesign;
import org.codehaus.jackson.map.ObjectMapper;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.export.JRXlsExporter;
import net.sf.jasperreports.view.JasperViewer;
import java.lang.reflect.InvocationTargetException;

/**
 *
 * @author cd
 */
public class DownloadController extends HttpServlet{
    
  
    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
   
        JasperPrint jasperPrint = null;
        JasperReportClass jrc=new JasperReportClass();
        String mname = "";
        String fname = "";
        DownloadDAO uc =null;
        Connection conn = null;
        Object res=null;
        try {
            String u= request.getParameter("u");
            if (request.getParameter("m") != null) {
                mname = request.getParameter("m");
                conn = DbPool.getConnection();
                uc = new DownloadDAO();
                Method m = uc.getClass().getMethod(mname, new Class[]{Connection.class, HttpServletRequest.class});
                
                jrc =(JasperReportClass)m.invoke(uc, conn,request);
                fname=(String)jrc.getParameter().get("filename");
                response.setHeader("Content-Disposition", "attachment;filename="+fname);///Send here filename
                response.setHeader("Cache-Control","must-revalidate, post-check=0, pre-check=0");
                ServletOutputStream sos=response.getOutputStream();
                
                if(request.getParameter("doctype").equals("1"))
                  JasperExportManager.exportReportToPdfStream(jrc.getJasperPrint(), sos);
                else if(request.getParameter("doctype").equals("2"))
                {
                  JasperExportManager.exportReportToXmlStream(jrc.getJasperPrint(),sos);
                }    
                sos.flush();
                sos.close();
            }
        } catch (SQLException ex) {
            DbPool.rollback(conn);
            Logger.getLogger(DownloadController.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            DbPool.rollback(conn);
            Logger.getLogger(DownloadController.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IllegalArgumentException ex) {
            DbPool.rollback(conn);
            Logger.getLogger(DownloadController.class.getName()).log(Level.SEVERE, null, ex);
        } catch (InvocationTargetException ex) {
            DbPool.rollback(conn);
            res = ex.getTargetException().getMessage();
        } catch (NoSuchMethodException ex) {
            DbPool.rollback(conn);
            res = ex.getMessage();
        } catch (SecurityException ex) {
            DbPool.rollback(conn);
            Logger.getLogger(DownloadController.class.getName()).log(Level.SEVERE, null, ex);
        } catch (JRException ex) {
            Logger.getLogger(DownloadController.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            try {
                conn.close();
            } catch (SQLException ex) {
                Logger.getLogger(DownloadController.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

   
    }
// <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
}
