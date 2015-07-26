package com.dlabs.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.dlabs.file.FileDownLoadImpl;
import com.dlabs.mis.dao.DocumentDAO;
import com.kjava.base.ReadableException;
import java.io.FileNotFoundException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletOutputStream;
/**
 *
 * @author Kamlesh Kumar Sah
 */
public class FileDownloadController extends HttpServlet {
    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
            FileDownLoadHandler fdh =new FileDownLoadImpl();
            DocumentDAO obj=new DocumentDAO();
            try {
                obj.getDocument(request.getParameter("pid"),request.getParameter("downloadedby"));
                } catch (ReadableException ex) {
                   Logger.getLogger(FileDownloadController.class.getName()).log(Level.SEVERE, null, ex);
            }
            fdh.fileDownLoad(request,response);
            String path = fdh.getFilePath();
            String filename = fdh.getFileName();
            String ext = fdh.getExtension();
            File fp = new File(path,filename+"."+ext);
            byte buff[] = new byte[(int) fp.length()];
            FileInputStream fis= new FileInputStream(fp);
        try {
            //int read = fis.read(buff);
            response.setContentLength((int) fp.length());
            filename = filename.replace(" ", "_");
            response.setContentType("application/octet-stream");
            
            response.setHeader("Content-Disposition", "attachment;filename=" + filename +"."+ext);
            response.setHeader("Cache-Control","must-revalidate, post-check=0, pre-check=0");
            ServletOutputStream out = response.getOutputStream();
 
            byte[] outputByte = new byte[4096];
            //copy binary contect to output stream
            while(fis.read(outputByte, 0, 4096) != -1)
            {
                    out.write(outputByte, 0, 4096);
            }
            fis.close();
            out.flush();
            out.close();
           // response.getOutputStream().write(buff);
           // response.getOutputStream().flush();
           // fis.close();

        } catch (FileNotFoundException ex) {
            Logger.getLogger(FileDownloadController.class.getName()).log(Level.SEVERE, null, ex);
        }finally{
        
           fis.close();
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





