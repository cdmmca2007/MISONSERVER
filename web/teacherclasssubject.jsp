<%@page import="com.kjava.base.db.DaoUtil"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="com.kjava.base.db.DbPool"%>
<%@page import="java.sql.Connection"%>
<%
    Connection conn =DbPool.getConnection();       
    String teacherid=request.getParameter("teacherid"); 
    String selectquery="SELECT * FROM teacherclasssubject WHERE teacherid=?  ORDER BY classteacher DESC";
    ResultSet rs=DaoUtil.executeQuery(conn,selectquery,new Object[]{teacherid});
    String subject=null;
    String classname=null;
    int classteacher=0;
    out.print("<br><table><tr>");
    while(rs.next()){
     classteacher=0;
      if(rs.getObject("name")!=null)classname=rs.getString("name");  
      if(rs.getObject("classteacher")!=null)classteacher=rs.getInt("classteacher");  
      if(rs.getObject("subject")!=null)subject=rs.getString("subject");  

      if(classteacher==1)
        out.print("Class Teacher Of Class :<b>"+classname+"</b><br><br>");      
      else
        out.print("<Teaches in Class :><b>"+classname+"</b>--Subject :"+subject+"<br>");        
      out.print("</tr>");    
    }      
    out.print("</table>");
%>
