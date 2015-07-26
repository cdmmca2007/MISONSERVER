<%@page import="java.util.Date"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@ page import="java.math.BigDecimal" %>
<%@ page import="net.authorize.*" %>
<%@ page import="net.authorize.sim.*" %>
<%@ page import="net.authorize.aim.*" %>
<%@ page import="net.authorize.data.*" %>
<%@ page import="net.authorize.data.creditcard.*" %>
<%@ page import="net.authorize.Merchant" %>
<%@ include file="helper1.jsp" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%@page import="java.math.RoundingMode"%><html>
  <head>
    <title>Customer Information Page</title>
    <link rel="stylesheet" href="resources/css/style.css">
    <link rel="stylesheet" href="resources/css/app.css">
    <script type="text/javascript">
        function preloader(){
            document.getElementById("loading").style.display = "none";
            document.getElementById("content").style.display = "block";
        }//preloader
        window.onload = preloader;

    </script>
  </head>
  <body style="background: white">

<%
  Order order = createOrder(request.getParameterMap());
%>

  <div class="pmain">
    <div class="pheader">
        <div class="companyname">  Developer-Lab , Online School Fee Payment</div>
        <div class="username">Current User : <%="CD"%></div><br>
        <div class="todaysdate">Todays  Date : <%=new Date()%></div>
    </div>    
  <hr class="linestyle" >        
  <h3>
      Please Provide Credit Card details to Proceed the Fee Payment.
  </h3>    
    <FORM NAME='checkout_form' ID='checkout_form' ACTION='order_process.jsp' METHOD='POST'>
      <table>
       <tr><td><label class="heading1">Credit Card Number</label></td>
           <td><input type='text' class='text' name='x_card_num' size='20'></input></td>
       </tr>   
       <tr><td><label class="heading1">Exp Date</label></td>
           <td><input type='text' class='text' name='x_exp_date' size='20'></input></td><td class="heading">(MM/YYYY)</td>
       </tr>   
       <tr><td><label class="heading1">Card Code</label></td>
           <td><input type='text' class='text' name='x_card_code' size='20'></input></td>
       </tr>   
       <tr><td><label class="heading1">Name on Card</label></td>
           <td><input type='text' class='text' name='x_name' size='20'></input></td><td class="heading">(Same as on Card)</td>
       </tr>   
       <tr><td><label class="heading1">Amount</label></td>
           <td><input type='text' class='text' name='x_amount' readonly size='15' value='<%=sanitizeString(order.getTotalAmount().setScale(2, RoundingMode.HALF_UP).toPlainString())%>'></input></td>
       </tr>   
       <tr><td><label class="heading1">Email</label></td>
           <td><input type='text' class='text' name='x_email' size='20'></input></td>
       </tr>   

       <tr>
           <td colspan="2"><INPUT TYPE='SUBMIT' NAME='submit_button' VALUE='Continue' onclick='preloader()'></td>         
       </tr>   
          
      <INPUT TYPE="HIDDEN" NAME="amount" VALUE="<%=sanitizeString(((String[])request.getParameterMap().get("amount"))[0])%>"/>
      <INPUT TYPE="HIDDEN" NAME="studentname" VALUE="<%=sanitizeString(((String[])request.getParameterMap().get("studentname"))[0])%>"/>
      <INPUT TYPE="HIDDEN" NAME="monthlyfeeid" VALUE="<%=sanitizeString(((String[])request.getParameterMap().get("monthlyfeeid"))[0])%>"/>
      
    </table>        
    </FORM>
      
  </div>    
 </body>
</html>
