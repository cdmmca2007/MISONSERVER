package com.dlabs.mis.controller;

import com.kjava.base.ReadableException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Kamlesh Kumar Sah
 */
public abstract class AbstractUserController {

   

    //public abstract String verifyUser(Connection conn, HttpServletRequest request) throws ReadableException;

    //public abstract String changePassword(Connection conn, HttpServletRequest request) throws ReadableException;

    public abstract String signOut(HttpServletRequest request) throws ReadableException;

    public abstract boolean isFormSubmit();
    
    public abstract String changeProfilePic(HttpServletRequest request,HttpServletResponse response) throws ReadableException;
}
