
<%@page import="java.util.Date"%>
<%@page import="com.kjava.base.db.DaoUtil"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="com.kjava.base.db.DbPool"%>
<%@page import="java.sql.Connection"%>
<%
       Connection conn =DbPool.getConnection();       
       String formno=request.getParameter("formno"); 
       if(formno==null)
          formno="N/A"; 
%>
<html>
  <head>
    <title>online School Admission System</title>
    <link rel="stylesheet" href="resources/css/style.css">
    <link rel="stylesheet" href="resources/css/app.css">
    <script type="text/javascript" src="resources/jquery/js/jquery-1.6.2.min.js"></script>
    <script>
        function sendData(){
            
           var dataString ='{"fname":"'+document.getElementById("fname").value+'",'+
                            '"mname":"'+document.getElementById("mname").value+'",'+
                            '"lname":"'+document.getElementById("lname").value+'",'+
                            '"dob":"'+document.getElementById("dob").value+'",'+
                            '"visadetail":"'+document.getElementById("visadetails").value+'",'+
                            '"passport_no":"'+document.getElementById("passport_no").value+'",'+
                            '"uid":"'+document.getElementById("uid").value+'",'+
                            '"mother_tounge":"'+document.getElementById("mother_tounge").value+'",'+
                            '"nationality":"'+document.getElementById("nationality").value+'",'+
                            '"gender":"'+document.getElementById("gender").value+'",'+
                            '"religion":"'+document.getElementById("religion").value+'",'+
                            '"aadhar_id":"'+document.getElementById("adhar_id").value+'",'+
                            '"ssn":"'+document.getElementById("ssn").value+'",'+
                            '"fathername":"'+document.getElementById("fathername").value+'",'+
                            '"mothername":"'+document.getElementById("mothername").value+'",'+
                            '"caretakername":"'+document.getElementById("caretakername").value+'",'+
                            '"education":"'+document.getElementById("education").value+'",'+
                            '"occupation":"'+document.getElementById("occupation").value+'",'+
                            '"income":"'+document.getElementById("income").value+'",'+
                            '"parentemailid":"'+document.getElementById("emailid").value+'",'+
                            '"alternateemailid":"'+document.getElementById("alternateemailid").value+'",'+
                            '"parentmobile":"'+document.getElementById("mobilenumber").value+'",'+
                            '"alternatemobile":"'+document.getElementById("alternatemobilenumber").value+'",'+
                            '"address":"'+document.getElementById("address").value+'",'+
                            '"cityid":"'+document.getElementById("city").value+'",'+
                            '"country":"'+document.getElementById("country").value+'",'+
                            '"stateid":"'+document.getElementById("state").value+'",'+
                            '"classid":"'+document.getElementById("classid").value+'",'+
                            '"session_id":"'+document.getElementById("session_id").value+'",'+
                            '"formno":"'+document.getElementById("formid").value+'"'+'}';
                  //  alert(document.getElementById('gender')[document.getElementById('gender').selectedIndex].value);
            $.ajax({
                        url:'studentadmission/edtonln.do',
                        type:"POST",
                        data:dataString,
                        datatype: 'json',
                        contentType: 'application/json',
                        success:function(result){
                            var r = eval(result);
                            if (r.studentid!=1){
                                alert("Success");
                            }
                            else
                            {
                                alert("Done");
                            }
                        }
                    });
        }
        
        function onLoad(formno){
        
            $.ajax({
                        url:'studentadmission/getonweb.do?formno='+formno,
                        type:"GET",
                        //data:dataString,
                        //datatype: 'json',
                        ///contentType: 'application/json',
                        success:function(result){
                            var r = eval(result);
                            if (r.studentid!=1){
                                alert(r.rows.dob);
                            }
                            else
                            {
                                alert(r.studentid);
                            }
                        }
                 });
          
        }
    </script>
  </head>
  
  <body style="background: white;" onload="onLoad(<%=formno%>)">
    <%
       String selectquery="SELECT  anp.formid, anp.parentemailid, anp.parentmobile, asr.formid,"+ 
	" asr.fname, 	asr.mname, 	asr.lname, 	asr.dob, 	asr.address, "+ 
	" asr.fathername, 	asr.mothername, 	asr.caretakername, 	asr.parentemailid, "+ 
	" asr.parentmobile, 	asr.alternateemailid, 	asr.alternatemobile, 	asr.classid, "+ 
	" asr.religion, "+ 
	" asr.cityid, 	asr.stateid, 	asr.countryid, 	asr.gender, 	asr.bloodgroup, "+ 
	" asr.nationality, 	asr.mother_tounge, 	asr.image_path, 	asr.passport_no, "+ 
	" asr.visadetails, 	asr.uid, 	asr.adhar_id, 	asr.ssn"+ 
        " FROM admission_notfy_parent anp LEFT JOIN admission_stud_registration  asr ON anp.formid=asr.formid WHERE anp.formid=? ";
       
       ResultSet rs1=DaoUtil.executeQuery(conn,selectquery,new Object[]{formno});
       
            String aadhar_id="",address="",alternateemailid="",alternatemobile="",caretakername="";
            String cityid="",classid="",countryid="",dob="";
            String education="",fathername="",fname="";
            String gender="",income="",lname="",mname="",mother_tounge="";
            String mothername="",nationality="", occupation="",parentemailid="", parentmobile="";
            String passport_no="",religion="", session_id="",ssn="", stateid="";
            String uid="", visadetail="";
                    
       if(rs1.next()){ 
       }       
       String current_session="00a24b9a-5bb2-4466-b629-f9d91de9e551"; 
       String[] query={"SELECT schoolname, description ,websiteurl , addressline1,addressline2,city ,state,country ,pinnumber,contact1 , contact2,contact3 ,emailid1 , emailid2 FROM schooladmin",
                       "SELECT class.classid , class.name  FROM class INNER JOIN sessions  ON sessions.class_id=class.classid AND sessions.session_id='"+current_session+"'",
                       "SELECT id,value FROM master WHERE propertyid=4",//Religion
                       "SELECT id,value FROM master WHERE propertyid=16",//Nationality
                       "SELECT countryid , name FROM country",
                       "SELECT stateid , name FROM states WHERE countryid=1"
                      };
 
       
       ResultSet rs=DaoUtil.executeQuery(conn,selectquery,new Object[]{formno});


       String schoolname="",description="",websiteurl="", addressline1="",addressline2="",city="",state="",country="",pinnumber="";
       String contact1="", contact2="",contact3="",emailid1="", emailid2="";

       if(rs.next()){
              if(rs.getObject("parentemailid")!=null)
                  parentemailid=rs.getString("parentemailid");
       
              if(rs.getObject("parentmobile")!=null)
                  parentmobile=rs.getString("parentmobile");
       }
       
       
       rs=DaoUtil.executeQuery(conn,query[0]);
       if(rs.next()){
              if(rs.getObject("schoolname")!=null)
                  schoolname=rs.getString("schoolname");
              if(rs.getObject("description")!=null)
                  description=rs.getString("description");
              if(rs.getObject("websiteurl")!=null)
                  websiteurl=rs.getString("websiteurl");
              if(rs.getObject("addressline1")!=null)
                  addressline1=rs.getString("addressline1");
              if(rs.getObject("addressline2")!=null)
                  addressline2=rs.getString("addressline2");
              if(rs.getObject("city")!=null)
                  city=rs.getString("city");
              if(rs.getObject("state")!=null)
                  state=rs.getString("state");
              if(rs.getObject("country")!=null)
                  country=rs.getString("country");
              if(rs.getObject("pinnumber")!=null)
                  pinnumber=rs.getString("pinnumber");
              if(rs.getObject("contact1")!=null)
                  contact1=rs.getString("contact1");
              if(rs.getObject("contact2")!=null)
                  contact2=rs.getString("contact2");
              if(rs.getObject("emailid1")!=null)
                  emailid1=rs.getString("emailid1");
              if(rs.getObject("emailid2")!=null)
                  emailid2=rs.getString("emailid2");
       }              
    %>
    <div class="pmain">
    <div class="pheader">
        <div class="companyname"><i>Developer-Lab , Online School Admission System</i></div>
        <div class="username">Current User :Anonymous</div><br>
        <div class="todaysdate">Todays  Date : <%=new Date()%></div>
    </div>    
    <hr class="linestyle" >        
    <div class="pbody">
        <div class="center">
            <div class="schooldesc">
                <table>
                    <tr>
                        <td class="heading">School Name </td><td class="data"><font color="green"><b><%=schoolname%></b></font></td> <td class="heading">Website URL</td><td class="data"><a href="#"><%=websiteurl%></a></td>                        
                    </tr>
                    <tr>
                    <td class="heading">Address</td><td class="data" ><%=addressline1 +" , " + addressline2%><br><%=city+" , "+ state+ " ,"+country +" ," + pinnumber %></td>
                    <td class="heading">Contact Details</td><td class="data"><%=contact1 +" , " + contact2%><br><%=emailid1+" , "+ emailid2%></td>
                    </tr>
                    <tr>
                    <td class="heading">About School </td><td class="data" colspan="3"><font color="green"><b><%=description%></b></font></td>
                    </tr>
                    <tr>
                         <td class="heading" colspan="4"><font color="#db6800">Please fill below details to Apply Online Application and Start Admission procedure</font></td>
                    </tr>
                </table>
            </div>
            <hr class="linestyle" >        
            <div class="studentdesc">
                <table>
                    <tr>
                        <td class="heading" >Application Form Number </td><td class="data"><font color="red"><b><input type="text" id="formid" readonly name="formid" value="<%=formno%>"></b></font></td>
                        <td class="heading" >Select Class </td>
                        <td><select name="classid" id="classid" style="width: 145px">
                                <%
                                    rs=DaoUtil.executeQuery(conn,query[1]);
                                    while(rs.next()){
                                     String id=rs.getString("classid");
                                     String name=rs.getString("name");                                     
                                %>
                                <option value='<%=id%>'><%=name%></option>        
                                <%
                                 }       
                                %>
                            </select>
                        </td>                                                  
                    </tr>
                    <tr>
                        <td class="heading">Student First Name </td><td class="data"><input type="text" id="fname" name="fname"></td> <td class="heading">Middle Name</td><td class="data"><input type="text" id="mname" name="mname"></td>                          
                    </tr>
                    <tr>
                        <td class="heading">Last Name </td><td class="data"><input type="text" id="lname" name="lname"></td> <td class="heading">Date Of Birth</td><td class="data"><input type="text" name="dob" id="dob"></td>                        
                    </tr>                    
                    <tr>
                        <td class="heading">Select Gender</td>
                        <td class="data">
                            <select name="gender" id="gender" style="width: 145px">
                                <option  value="1">Male</option>
                                <option  value="0">Female</option>
                            </select>
                        </td> 
                        <td class="heading">Religion</td>
                        <td class="data">
                            <select name="religion" id="religion" style="width: 145px">
                                <%
                                    rs=DaoUtil.executeQuery(conn,query[2]);
                                    while(rs.next()){
                                     String id=rs.getString("id");
                                     String name=rs.getString("value");                                     
                                %>
                                <option value='<%=id%>'><%=name%></option>        
                                <%
                                 }       
                                %>
                            </select>
                        </td>                                                  
                            
                    </tr>
                    <tr>
                        <td class="heading">Nationality<td class="data">
                             <select name="nationality" id="nationality" style="width: 145px">
                                <%
                                    rs=DaoUtil.executeQuery(conn,query[3]);
                                    while(rs.next()){
                                     String id=rs.getString("id");
                                     String name=rs.getString("value");                                     
                                %>
                                <option value='<%=id%>'><%=name%></option>        
                                <%
                                 }       
                                %>
                            </select>
                        </td> 
                        <td class="heading">Mother Tounge</td><td class="data"><input type="text" name="mother_tounge" id="mother_tounge"></td>                                
                    </tr>
                    <tr> 
                        <td class="heading">Passport Number<td class="data"><input type="text" name="passport_no" id="passport_no"></td> 
                        <td class="heading">UID</td><td class="data"><input type="text" name="uid" id="uid"></td>                                                        
                    </tr>
                    <tr>
                        <td class="heading">Visa Details<td class="data"><input type="text" name="visadetails" id="visadetails"></td> 
                        <td class="heading">Aadhar Card Number</td><td class="data"><input type="text" name="adhar_id" id="adhar_id"></td>                                                        
                    </tr>
                    <tr>
                        <td class="heading">Social Security Number<td class="data"><input type="text" name="ssn" id="ssn"></td> 
                    </tr>
                </table>
            </div>
            <hr class="linestyle" >        
            <div class="feedesc">
                <table>
                    <tr>
                      <td class="heading">Father Name</td><td class="data"><input type="text" name="fathername" id="fathername"></td>
                      <td class="heading">Mother Name</td><td class="data"><input type="text" name="mothername" id="mothername"></td>
                    </tr>
                    <tr>                    
                      <td class="heading">Care Taker Name</td><td class="data"><input type="text" name="caretakername" id="caretakername"></td> 
                      <td class="heading">Father Highest Education</td><td class="data"><input type="text" name="education" id="education"></td> 
                    </tr>                                      
                    <tr>                    
                      <td class="heading">Father Occupation </td><td class="data"><input type="text" name="occupation" id="occupation"></td> 
                      <td class="heading">Annual Income</td><td class="data"><input type="text" name="income" id="income"></td> 
                    </tr>                                      
                </table>
            </div>
            <hr class="linestyle" >        
            <div class="feedesc">
                <table>
                    <tr>
                      <td class="heading">Primary Email-Id</td><td class="data"><input type="text" name="emailid" id="emailid" value="<%=parentemailid%>"></td>
                      <td class="heading">Alternate Email-Id</td><td class="data"><input type="text" name="alternateemailid" id="alternateemailid"></td>
                    </tr>
                    <tr>                    
                      <td class="heading">Mobile Number</td><td class="data"><input type="text" name="mobilenumber" id="mobilenumber" value="<%=parentmobile%>"></td> 
                      <td class="heading">Alternate Mobile Number</td><td class="data"><input type="text" name="alternatemobilenumber" id="alternatemobilenumber"></td> 
                    </tr>                                      
                    <tr>                    
                      <td class="heading">Address</td><td class="data"><input type="textarea" name="address" id="address"></td> 
                      <td class="heading">City</td><td class="data"><input type="text" name="city" id="city"></td> 
                    </tr>                                      
                    <tr>                    
                      <td class="heading">Country</td>
                      <td class="data">
                             <select name="country" id="country" style="width: 145px">
                                <%
                                    rs=DaoUtil.executeQuery(conn,query[4]);
                                    while(rs.next()){
                                     String id=rs.getString("countryid");
                                     String name=rs.getString("name");                                     
                                %>
                                <option value='<%=id%>'><%=name%></option>        
                                <%
                                 }       
                                %>
                            </select>
                          
                      </td>   
                      <td class="heading">State</td>
                      <td class="data">
                             <select name="state" id="state" style="width: 145px">
                                <%
                                    rs=DaoUtil.executeQuery(conn,query[5]);
                                    while(rs.next()){
                                     String id=rs.getString("stateid");
                                     String name=rs.getString("name");                                     
                                %>
                                <option value='<%=id%>'><%=name%></option>        
                                <%
                                 }       
                                %>
                            </select>
                          
                      </td> 
                      
                    </tr>                                      
                </table>
            </div>
                    
            <hr class="linestyle" >        
            <div class="proceed">
                <table>
                    <tr>
                    <input type="hidden" name="session_id" id="session_id" value="<%=current_session%>">
                        <td><input type="button" name="submit" value="Submit Form" onClick="sendData()"></td>
                        <td><input type="reset" name="reset" value="Reset"></td>
                        <td><input type="button" name="cancel" value="Cancel"></td>
                    </tr>
                </table>    
            </div>
        </div>    
    </div>

  </body>
 <%

   conn.close();
 %> 
</html>


