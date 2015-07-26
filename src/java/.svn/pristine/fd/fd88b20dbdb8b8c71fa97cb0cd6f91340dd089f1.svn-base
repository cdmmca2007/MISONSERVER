package com.dlabs.users;

import com.dlabs.mis.controller.UserController;
import com.dlabs.mis.controller.AbstractUserController;
import com.kjava.base.db.DbPool;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
/**
 *
 * @author Kamlesh Kumar Sah
 */
public class UserServlet extends HttpServlet {
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        String mname = "";
        AbstractUserController uc =null;
        Connection conn = null;
         Object res=null;
        try {
            if (request.getParameter("m") != null) {
                mname = request.getParameter("m");
                conn = DbPool.getConnection();
                uc = new UserController();
                Method m = uc.getClass().getMethod(mname, new Class[]{Connection.class, HttpServletRequest.class});
                res = m.invoke(uc, conn,request);
                conn.commit();
            }
        } catch (SQLException ex) {
            DbPool.rollback(conn);
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            DbPool.rollback(conn);
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IllegalArgumentException ex) {
            DbPool.rollback(conn);
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (InvocationTargetException ex) {
            DbPool.rollback(conn);
            res = ex.getTargetException().getMessage();
        } catch (NoSuchMethodException ex) {
            DbPool.rollback(conn);
            res = ex.getMessage();
        } catch (SecurityException ex) {
            DbPool.rollback(conn);
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            DbPool.close(conn);
            if(uc.isFormSubmit()){
                out.print(res.toString());
            }else{
                out.print(res.toString());
            }
            out.close();
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
