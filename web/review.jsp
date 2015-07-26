<%@ page import="java.math.BigDecimal" %>
<%@ page import="net.authorize.*" %>
<%@ page import="net.authorize.sim.*" %>
<%@ page import="net.authorize.aim.*" %>
<%@ page import="net.authorize.data.*" %>
<%@ page import="net.authorize.data.creditcard.*" %>
<%@ include file="helper1.jsp" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <title>Your Store</title>
    <link rel="stylesheet" href="../css/style.css">
  </head>
  <body>
    <h1>Your Store</h1>
    <h2>Order</h2>
<%
  Order order = createOrder(request.getParameterMap());
  if(order != null) {
%>
    <table>
      <tfoot>
        <tr>
          <td>Total</td>
          <td>$<%=sanitizeString(order.getTotalAmount().setScale(2, BigDecimal.ROUND_HALF_UP).toPlainString()) %></td>
        </tr>
      </tfoot>
      <tbody>
<%
  for(OrderItem orderItem : order.getOrderItems()) {
%>
        <tr>
          <td><%=sanitizeString(orderItem.getItemName()) %></td>
          <td>$<%=sanitizeString(orderItem.getItemPrice().setScale(2, BigDecimal.ROUND_HALF_UP).toPlainString()) %></td>
        </tr>
<%
  }
  if(order.getShippingCharges() != null) {
%>
        <tr>
          <td><%=sanitizeString(order.getShippingCharges().getTaxItemName()) %></td>
          <td>$<%=sanitizeString(order.getShippingCharges().getTaxAmount().setScale(2, BigDecimal.ROUND_HALF_UP).toPlainString()) %></td>
        </tr>
<%
  }
%>
      </tbody>
    </table>
<%
  } else {
    out.println("<div style='position:absolute; top:50%;right:50%'>Error with your order.</div>");
  }
%>
    <form action="customer_info.jsp">
      <input type="hidden" name="size" value="<%=sanitizeString(((String[])request.getParameterMap().get("size"))[0])%>"/>
      <input type="image" src="../image/purchase.png" class="purchase">
    <input type="submit" class="submit" value="Start Over">
    </form>

    
  </body>
</html>
