<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
  pageEncoding="ISO-8859-1"%>

<%@page import="java.io.UnsupportedEncodingException"%>
<%@page import="java.net.URLEncoder"%>
<%@page import="org.apache.http.client.utils.URLEncodedUtils"%>

<%@ page import="java.math.BigDecimal"%>
<%@ page import="java.util.Map"%>
<%@ page import="net.authorize.*"%>
<%@ page import="net.authorize.aim.*"%>
<%@ page import="net.authorize.data.*"%>
<%@ page import="net.authorize.data.creditcard.*"%>


<%!

  /* EDIT THE FOLLOWING FOR YOUR SPECIFIC ENVIRONMENT */

  // API login ID
  static String apiLoginID = "9USY9w8a33x6";
  // API transaction key
  static String transactionKey = "5d5sb32P3C9GCn2r";
  // SIM/DPM relay response URL
  static String relayResponseUrl = "http://localhost:8084/relayResponse.jsp";
  // SIM/DPM order receipt URL
  static String orderReceiptUrl = "http://localhost:8084/order_receipt.jsp";
  // merchant defined MD5 Hash key
  static String merchantMD5Key = "5d5sb32P3C9GCn2r";


  // create the merchant
  static Merchant sandboxMerchant = Merchant.createMerchant(Environment.SANDBOX,
          apiLoginID, transactionKey);

  /**
   *  Creates an order from form data passed in.
   */
  public Order createOrder(Map<String, String[]> requestMap) {
      Order order = Order.createOrder();

      order.setDescription("Fee Payment");

      try {
	order.setInvoiceNumber(Long.toString(System.currentTimeMillis()));
        OrderItem paymentOrderItem = OrderItem.createOrderItem();
        paymentOrderItem.setItemQuantity(new BigDecimal(1.00));

	    if(requestMap.containsKey("amount")) {

	      int amount = Integer.parseInt(requestMap.get("amount")[0]);
	      
	      paymentOrderItem.setItemName(requestMap.get("studentname")[0]);
              paymentOrderItem.setItemTaxable(true);
              paymentOrderItem.setItemId(requestMap.get("monthlyfeeid")[0]);
              paymentOrderItem.setItemPrice(new BigDecimal(amount));
              
	      ShippingCharges shippingCharges = ShippingCharges.createShippingCharges();
	      shippingCharges.setTaxExempt(false);
	      shippingCharges.setTaxItemName("Service Tax (1.5%)");
	      shippingCharges.setTaxAmount(paymentOrderItem.getItemPrice().multiply(new BigDecimal(0.015)));

              order.addOrderItem(paymentOrderItem);
              order.setShippingCharges(shippingCharges);
	      order.setTotalAmount(paymentOrderItem.getItemPrice().add(shippingCharges.getTaxAmount()));
	    }
      } catch (Exception e) {
          order = null;
      }

      return order;
  }

  /**
   * sanitize strings for output
   */
  public String sanitizeString(String string) {

     java.lang.StringBuilder retval = new java.lang.StringBuilder();
     java.text.StringCharacterIterator iterator = new java.text.StringCharacterIterator(string);
     char character =  iterator.current();

     while (character != java.text.CharacterIterator.DONE ) {
       if (character == '<') {
         retval.append("&lt;");
       }
       else if (character == '>') {
         retval.append("&gt;");
       }
       else if (character == '&') {
         retval.append("&amp;");
      }
       else if (character == '\"') {
         retval.append("&quot;");
       }
       else if (character == '\t') {
         addCharEntity(9, retval);
       }
       else if (character == '!') {
         addCharEntity(33, retval);
       }
       else if (character == '#') {
         addCharEntity(35, retval);
       }
       else if (character == '$') {
         addCharEntity(36, retval);
       }
       else if (character == '%') {
         addCharEntity(37, retval);
       }
       else if (character == '\'') {
         addCharEntity(39, retval);
       }
       else if (character == '(') {
         addCharEntity(40, retval);
       }
       else if (character == ')') {
         addCharEntity(41, retval);
       }
       else if (character == '*') {
         addCharEntity(42, retval);
       }
       else if (character == '+') {
         addCharEntity(43, retval);
       }
       else if (character == ',') {
         addCharEntity(44, retval);
       }
       else if (character == '-') {
         addCharEntity(45, retval);
       }
       else if (character == '.') {
         addCharEntity(46, retval);
       }
       else if (character == '/') {
         addCharEntity(47, retval);
       }
       else if (character == ':') {
         addCharEntity(58, retval);
       }
       else if (character == ';') {
         addCharEntity(59, retval);
       }
       else if (character == '=') {
         addCharEntity(61, retval);
       }
       else if (character == '?') {
         addCharEntity(63, retval);
       }
       else if (character == '@') {
         addCharEntity(64, retval);
       }
       else if (character == '[') {
         addCharEntity(91, retval);
       }
       else if (character == '\\') {
         addCharEntity(92, retval);
       }
       else if (character == ']') {
         addCharEntity(93, retval);
       }
       else if (character == '^') {
         addCharEntity(94, retval);
       }
       else if (character == '_') {
         addCharEntity(95, retval);
       }
       else if (character == '`') {
         addCharEntity(96, retval);
       }
       else if (character == '{') {
         addCharEntity(123, retval);
       }
       else if (character == '|') {
         addCharEntity(124, retval);
       }
       else if (character == '}') {
         addCharEntity(125, retval);
       }
       else if (character == '~') {
         addCharEntity(126, retval);
       }
       else {
         retval.append(character);
       }
       character = iterator.next();
      }
      return retval.toString();
    }

    /**
     * Convert integer to char entity
     */
   public void addCharEntity(int i, StringBuilder sb){

      String padding = "";
      if( i <= 9 ){
         padding = "00";
      }
      else if( i <= 99 ){
        padding = "0";
      }
      String number = padding + i;
      sb.append("&#" + number + ";");
    }
%>
