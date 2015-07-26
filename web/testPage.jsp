<%@page import="org.json.simple.JSONArray" %>
<%@page import="org.json.simple.JSONObject" %>

<%
int t = Integer.parseInt(request.getParameter("code"));
switch(t){
       case 1:
           JSONObject j = new JSONObject();
           j.put("name", "Kamlesh");
           j.put("age", 28);
           j.put("fathername", "Sarju Parsad Sah");
           j.put("mothername", "MotherName");
           j.put("image", "http://localhost:8084/MIS/images/kamlesh.jpg");
           out.print(j);
           break;
}


%>
