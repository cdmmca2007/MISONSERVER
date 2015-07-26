/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dlabs.mis.controller;

import com.dlabs.constants.URLMap;
import com.dlabs.mis.model.User;
import com.dlabs.session.AuthHandler;
import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.portlet.ModelAndView;

/**
 *
 * @author cd
 */
@Controller
public class HomeController {
    
@RequestMapping(value ="/index.htm", method = RequestMethod.GET)
public String redirect(HttpServletRequest req){
    User user =AuthHandler.getUser(req);
if(user==null){
    return "/WEB-INF/jsp/home.jsp";
}
else if(user.getRoleId()>=4)
        return "/WEB-INF/jsp/student.jsp";
    else
        return "/WEB-INF/jsp/home.jsp";
}
   
}
