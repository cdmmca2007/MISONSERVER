
<%@page import="com.dlabs.mis.dao.StudentMonthlyFeeDAO"%>
<%@ page import="java.math.BigDecimal" %>
<%@ page import="net.authorize.Environment" %>
<%@ page import="net.authorize.Merchant" %>
<%@ page import="net.authorize.TransactionType" %>
<%@ page import="net.authorize.aim.Result" %>
<%@ page import="net.authorize.aim.Transaction" %>
<%@ page import="net.authorize.data.*" %>
<%@ page import="net.authorize.data.creditcard.*" %>
<%@ include file="helper.jsp" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <title>Customer Information Page</title>
    <link rel="stylesheet" href="resources/css/style.css">
    <link rel="stylesheet" href="resources/css/app.css">
  </head>
  <body>
<%
  // Show the confirmation data
  Map<String, String[]> requestParameterMap = request.getParameterMap();

  String transactionId = requestParameterMap.containsKey("x_trans_id")?requestParameterMap.get("x_trans_id")[0]:"";
  Transaction transaction=null;  
  if(requestParameterMap != null) {
    // create the order
    Order order = createOrder(requestParameterMap);

    // create transaction
     transaction = sandboxMerchant.createAIMTransaction(TransactionType.AUTH_CAPTURE,order.getTotalAmount());

      // create customer
      Customer customer = Customer.createCustomer();
      customer.setFirstName(requestParameterMap.get("x_name")[0]);
      // create credit card
      CreditCard creditCard = CreditCard.createCreditCard();
      creditCard.setCreditCardNumber(requestParameterMap.get("x_card_num")[0]);
      String expiration = requestParameterMap.get("x_exp_date")[0].replaceAll("/","");
      if(expiration.length() >= 4) {
          creditCard.setExpirationMonth(expiration.substring(0,2));
          creditCard.setExpirationYear(expiration.substring(2));
      }

      transaction.setCustomer(customer);
      transaction.setOrder(order);
      transaction.setCreditCard(creditCard);
    }

    Result<Transaction> result = (Result<Transaction>) sandboxMerchant.postTransaction(transaction);

    transactionId = result.getTarget().getTransactionId();
    String id= transactionId;
    StudentMonthlyFeeDAO obj=new StudentMonthlyFeeDAO();    
    // 1 means we have a successful transaction
    if(result.isApproved()) {
      // auth_capture transaction
      if("auth_capture".equalsIgnoreCase(result.getTarget().getTransactionType().getValue())) {


          obj.webFeePayment(sanitizeString(transactionId),
                            requestParameterMap.get("x_name")[0],
                            requestParameterMap.get("monthlyfeeid")[0],
                            requestParameterMap.get("studentname")[0]);
          
%>
    <h2>Thank You</h2>
    <h3>Your transaction ID:</h3>
    <div class="id"><%=sanitizeString(transactionId)%></div>
       
<%
      }  
    }
    // there's a problem processing the transaction request
    else if(result.isDeclined() || result.isError()) {
      String txnType = "order";    
     String restext= sanitizeString(result.getResponseText());
     int    reccode= result.getResponseCode().getCode();
     int   recreson=result.getReasonResponseCode().getResponseReasonCode();

      obj.failedwebFeePayment(restext ,
                              reccode,
                              recreson,
                              requestParameterMap.get("x_name")[0],
                              requestParameterMap.get("monthlyfeeid")[0],
                              requestParameterMap.get("studentname")[0]);
     
%>
    <h2>Error!</h2>
    <div class='error'>
    <h3>We're sorry, but we can't process your <%=sanitizeString(txnType)%> at this time due to the following error:</h3>
    <%=restext%>
      <table>
        <tr>
          <td>response code</td>
          <td><%=reccode%></td>
        </tr>
            <tr>
          <td>response reason code</td>
          <td><%=recreson%></td>
        </tr>
    </table>
    </div>
<%
      }
  
%>
  </body>
</html>
