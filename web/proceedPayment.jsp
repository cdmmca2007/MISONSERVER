<%@page import="java.util.Date"%>
<%@page import="com.kjava.base.db.DaoUtil"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="com.kjava.base.db.DbPool"%>
<%@page import="java.sql.Connection"%>
<html>
  <head>
    <title>School Fee Payment</title>
    <link rel="stylesheet" href="resources/css/style.css">
    <link rel="stylesheet" href="resources/css/app.css">
  </head>
  <body style="background: white">
    
    <%
       Connection conn =DbPool.getConnection();
       String schooldetail="SELECT schoolname ,logopath,schooltitle,websiteurl,addressline1,addressline2 ,city ,state,country , pinnumber,contact1,contact2 FROM schooladmin";

       String mainquery="SELECT g.monthtransid ,g.monthly_fee_id,g.class_id,c.name AS classname,"+
                        " g.student_id,CONCAT(CONCAT(CONCAT(CONCAT(fname,' '),mname),' '),lname) AS studentname,	"+
                        " CASE g.for_month WHEN 1 THEN 'January' WHEN 2 THEN 'February' WHEN 3 THEN 'March' WHEN 4 THEN 'April' WHEN 5 THEN 'May' WHEN 6 THEN 'June' WHEN 7 THEN 'July' WHEN 8 THEN 'August' WHEN 9 THEN 'September' WHEN 10 THEN 'October' WHEN 11 THEN 'November' WHEN 12 THEN 'December' END AS MONTH,	"+
                        " g.for_month, "+
                        " g.for_year, 	m.value AS YEAR,	g.amount, FROM_UNIXTIME(g.due_date/1000,'%d-%m-%Y') AS	due_date, "+
                        " g.templateid,CASE g.paid_status WHEN 0 THEN '0' WHEN 1 THEN '1' END AS paid_status,CASE g.paid_status WHEN 0 THEN 'Not Paid' WHEN 1 THEN 'Paid' END AS STATUS,FROM_UNIXTIME(g.paid_on/1000,'%d-%m-%Y') AS paid_on,"+
                        " g.paid_by,g.paid_amount , u.name AS username ,s.fathername ,scm.roll_no  AS rollnumber , CONCAT(CONCAT(s.address,' , '),s.cityid) AS studadd ,u.userid"+
                        " FROM generatemonthlyfee g "+
                        " INNER JOIN sessions ss ON ss.batch_id=g.class_id"+
                        " INNER JOIN class c     ON c.classid=ss.class_id "+
                        " INNER JOIN student s   ON s.studentid=g.student_id  "+
                        " INNER JOIN student_class_map scm ON scm.batch_id=ss.batch_id AND scm.student_id=s.studentid "+
                        " INNER JOIN master m    ON m.id=g.for_year "+
                        " INNER JOIN users  u    ON u.userid=s.userid "+
                        " WHERE g.monthly_fee_id=?";
       
       String feequery="SELECT m.monthly_fee_id ,m.fee_structure_id , f.fee_name AS feename, f.fee_type , m.amount "+
                          "FROM monthlyfeedetails m "+
                          "     INNER JOIN generatemonthlyfee g ON g.monthly_fee_id=m.monthly_fee_id "+
                          "     INNER JOIN feestructure f  ON f.fee_structure_id=m.fee_structure_id "+
                          "WHERE m.monthly_fee_id=?";
       
       String mpid=request.getParameter("mppid");
       
       ResultSet rssd=DaoUtil.executeQuery(conn,schooldetail);
       ResultSet rs =DaoUtil.executeQuery(conn,mainquery,new Object[]{mpid});
       ResultSet rs1=DaoUtil.executeQuery(conn,feequery,new Object[]{mpid});      
       
       
       
       String schoolname=null;
       String city=null;
       String address=null;
       String studentname=null;
       String fathername=null;
       String classname=null;
       String rollnumber=null;
       String studadd  =null;
       String month    =null;
       String duedate  =null;
       int totamount=0;
       int netamount=0;
       String feedesc =null;
       String feename=null;
       int feeamount=0;
       int fineamount=0;
       int discountamount=0;
       String username=null;
       String logopath,schooltitle,websiteurl;
       String addressline1="",addressline2="",state,country; 
       String pinnumber,contact1,contact2;  
       int monthtransid=0;

       if(rssd.next()){
         if(rssd.getObject("logopath")!=null)logopath=rssd.getString("logopath");  
         if(rssd.getObject("schooltitle")!=null)schooltitle=rssd.getString("schooltitle");  
         if(rssd.getObject("websiteurl")!=null)websiteurl=rssd.getString("websiteurl");  
         if(rssd.getObject("addressline1")!=null)addressline1=rssd.getString("addressline1");  
         if(rssd.getObject("addressline2")!=null)addressline2=rssd.getString("addressline2");  
         if(rssd.getObject("state")!=null) state=rssd.getString("state");  
         if(rssd.getObject("country")!=null)country=rssd.getString("country");  
         if(rssd.getObject("pinnumber")!=null)pinnumber=rssd.getString("pinnumber");  
         if(rssd.getObject("contact1")!=null) contact1=rssd.getString("contact1");  
         if(rssd.getObject("contact2")!=null) contact2=rssd.getString("contact2");  
         if(rssd.getObject("schoolname")!=null)schoolname=rssd.getString("schoolname");  
         if(rssd.getObject("city")!=null) city=rssd.getString("city");  
         address=addressline1+addressline2;
         
       }
       
       if(rs.next()){
          if(rs.getObject("studentname")!=null)studentname=rs.getString("studentname");  
          if(rs.getObject("fathername")!=null)fathername=rs.getString("fathername");  
          if(rs.getObject("classname")!=null)classname=rs.getString("classname");  
          if(rs.getObject("rollnumber")!=null)rollnumber=rs.getString("rollnumber");  
          if(rs.getObject("studadd")!=null)studadd=rs.getString("studadd");  
          if(rs.getObject("due_date")!=null)duedate=rs.getString("due_date");  
          if(rs.getObject("month")!=null && rs.getObject("year")!=null)month=rs.getString("year") +" , "+rs.getString("month") ;  
          if(rs.getObject("amount")!=null)totamount=rs.getInt("amount"); 
          if(rs.getObject("username")!=null)username=rs.getString("username");  
          if(rs.getObject("monthtransid")!=null)monthtransid=rs.getInt("monthtransid");  
          
       }
    %>
    <div class="pmain">
    <div class="pheader">
        <div class="companyname">  Developer-Lab , Online School Fee Payment</div>
        <div class="username">Current User : <%=username%></div><br>
        <div class="todaysdate">Todays  Date : <%=new Date()%></div>
    </div>    
    <hr class="linestyle" >        
    <div class="pbody">
        <div class="center">
            <div class="schooldesc">
                <table>
                    <tr>
                        <td class="heading">School Name </td><td class="data"><%=schoolname%></td> <td class="heading">City</td><td class="data"><%=city%></td>                        
                    </tr>

                    <tr>
                    <td class="heading">Address</td><td class="data" colspan="3"><%=address%></td>
                    </tr>
                </table>
            </div>
            <hr class="linestyle" >        
            <div class="studentdesc">
                <table>
                    <tr>
                      <td class="heading">Student Name </td><td class="data"><%=studentname%></td> <td class="heading">Class</td><td class="data"><%=classname%></td>                        
                    </tr>
                    <tr>
                    <td class="heading">Father Name </td><td class="data"><%=fathername%></td> <td class="heading">Roll Number</td><td class="data"><%=rollnumber%></td>                        
                    </tr>
                    
                    <tr>
                    <td class="heading">Address</td><td colspan="3" class="data"><%=studadd%></td>
                    </tr>
                </table>
            </div>
            <hr class="linestyle" >        
            <div class="feedesc">
                <table>
                    <tr>
                      <td class="heading">Payment For Month </td><td class="data"><%=month%></td> <td class="heading">Due Date</td><td class="data"><%=duedate%></td>                        
                    </tr>
                    <tr>
                    <td class="heading">Total Amount</td><td class="data"><%=totamount%></td> <td class="heading">Fee Description</td><td class="data"></td>                        
                    </tr>                                      
                    <tr>
                        <td colspan="4" class="heading"><b style="color:#db6800"> Complete Fee Description</b></td>
                    </tr>
                    <tr>
                    <b><td class="heading">Fee name</td><td colspan="3" class="heading" align="center">Fee Amount</td></b>
                    </tr>
                    <%totamount=0;
                      while(rs1.next()){
                         if(rs1.getObject("feename")!=null && rs1.getObject("amount")!=null)
                         {
                           feeamount=rs1.getInt("amount");  
                           out.print("<tr><td class='heading'>"+rs1.getString("feename")+"</td><td class='data' colspan='3' align='center'>"+feeamount+"</td></tr>");
                           totamount=totamount +feeamount;
                         }
                      }
                      
                    %>
                    
                    <tr>
                    <td class="heading">Fine Amount</td><td colspan="3" class="data" align='center'><%=fineamount%></td>
                    </tr>
                    <tr>
                    <td class="heading">Discount Amount</td><td colspan="3" class="data" align='center'><%=discountamount%></td>
                    </tr>
                    <%
                      netamount=totamount-fineamount+discountamount;
                    %>
                    <tr>                        
                    <td class="heading">Total Payable Amount to Pay</td><td class="data" colspan="3" align='center'><b><%=netamount%></b></td>
                    </tr>
                    
                </table>
            </div>
                    
            <hr class="linestyle" >        
            <div class="proceed">
                <form action="customer_info.jsp">
                    <input type="hidden" name="amount" value="<%=netamount%>">    
                    <input type="hidden" name="monthlyfeeid" value="<%=monthtransid%>">    
                    <input type="hidden" name="studentname" value="<%=username%>">    
                <table>                    
                    <tr>
                        <td>
                            <input type="checkbox"><p style="font-size:11px;color:#db6800">Please Accept Term & Condition to Proceed</p>                            
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="submit" value="Make Payment">
                        </td>
                    </tr>                    
                </table>
               </form>     
            </div>
        </div>    
    </div>
  </body>
</html>
