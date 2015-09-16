<%@page import="com.dlabs.mis.dao.OnlineExamDetailDAO"%>
<%@page import="org.springframework.web.context.support.WebApplicationContextUtils"%>
<%@page import="org.springframework.context.ApplicationContext"%>
<%@page import="com.dlabs.mis.controller.OnlineExamDetailController"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.Map"%>
<%@page import="com.kjava.base.db.DbPool"%>
<%@page import="java.sql.Connection"%>
<%@ page import = "javax.servlet.RequestDispatcher" %>
<%
    Map<String, Object> obj= new HashMap<String, Object>();
    OnlineExamDetailDAO bean = new OnlineExamDetailDAO();
    
    if(request.getParameter("page")!=null && request.getParameter("page").equalsIgnoreCase("login")) {
    obj.put("u", request.getParameter("UserName"));
    obj.put("p",request.getParameter("Password"));
    obj=bean.verifyLogin(obj);
    if(Integer.parseInt(obj.get("result").toString())==1){
        RequestDispatcher rd = request.getRequestDispatcher("elearning.jsp");
        session.setAttribute("id", obj.get("id").toString());
        session.setAttribute("studentid", obj.get("studentid").toString());
        session.setAttribute("schexamid", obj.get("schexamid").toString());
        session.setAttribute("page","studentinfopage"); 
        rd.forward(request, response);
    }
    else
    {
        String message = "Invalid Credential , Please contact Admin";
        RequestDispatcher rd = request.getRequestDispatcher("elearning.jsp");
        session.setAttribute("msg",message);
        session.setAttribute("page","error"); 
        rd.forward(request, response);
    }
    }
    
    else if(session.getAttribute("id")!=null && request.getParameter("page")!=null && request.getParameter("page").equalsIgnoreCase("studentinfosubmit")) {
    obj.put("a", request.getParameter("adminssionno"));
    obj.put("d",request.getParameter("dob"));
    obj.put("studentid",session.getAttribute("studentid"));
    obj.put("id",session.getAttribute("id"));
    obj.put("schexamid",session.getAttribute("schexamid"));

    obj=bean.verifyLogin(obj);
    if(Integer.parseInt(obj.get("resultadmisionno").toString())==1){
        session.setAttribute("page","Startexampage"); 
        session.setAttribute("details",obj); 
        RequestDispatcher rd = request.getRequestDispatcher("elearning.jsp");
        rd.forward(request, response);
    }
    else
    {
        String message = "Invalid Admission No or DOB , Please contact Admin";
        RequestDispatcher rd = request.getRequestDispatcher("elearning.jsp");
        request.setAttribute("msg",message);
        request.setAttribute("page","studentinfopage"); 
        rd.forward(request, response);
    }
    }
    
    
%>