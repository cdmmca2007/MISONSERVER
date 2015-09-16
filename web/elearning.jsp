
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <title>SchoolOManager.Com</title>
        <link rel="shortcut icon" href="resources/images/DL2.png" />
        <link rel="stylesheet" type="text/css" href="resources/css/style.css?v=5"/>
        <link rel="shortcut icon" href="images/logo_changethis.gif"/>
        <link rel="stylesheet" type="text/css" href="resources/css/login.css" />
        <link rel="stylesheet" type="text/css" href="resources/css/style_1.css" />
        <link rel="stylesheet" type="text/css" href="resources/css/acustom.css" />
        <script type="text/javascript" src="login.js"></script>
    </head>
    <body onload="checkCookie(); formFocus();">
         <div id="loading-mask-div" style="width:100%;height:100%;background:#444444;opacity:.6;position:absolute;z-index:20000;left:0;top:0;visibility:hidden;">
            <div id="loading-div" style="position:absolute;top:100px;left:250px;">
                <img src="images/load.gif" style="vertical-align:middle" alt="Loading" />
            </div>
        </div>
        <div class="container">
            <div class="codrops-top">
                <img src="resources/images/DL2.jpg" style="height: 15px;width: 15px;margin: 5px 0px 0px 5px;float: left;"/>
                <a href="">
                    <strong>Developers-Lab.Com</strong>
                </a>
                <span class="right">
                    <a href="www.SchooloManager.com">
                        <strong>Click Here for SchooloManager.com</strong>
                    </a>
                </span>
                <div class="clr"></div>
            </div>
            <header>
                <h2 style="height: 14px;">Complete Solution for <span>School Management System</span></h3>
				<nav class="codrops-demos">
					<span>Solution for : </span>
					<a href="#">Administrator</a>
					<a href="#">Teacher</a>
					<a href="#">Parent</a>
                                        <a href="#">Student</a>
				</nav>
            </header>
           
             <%
             if(request.getAttribute("page")==null && request.getAttribute("page").equals("error")) {
             %>
             <section>    
                <div id="container_demo" >
                    <div id="wrapper">
                        <div id="login" class="animate form">
                            <form action="onlineExamPaper.jsp" method="POST" name="loginForm" id="loginForm" autocomplete="on"> 
                                <h1>SchoolOManager e-Learning Login Console</h1> 
                                <p> 
                                    <label for="username" class="uname" data-icon="u">Enter Your username </label>
                                    <input id="UserName" name="UserName" required="required" type="text" />
                                </p>
                                <p> 
                                    <label for="password" class="youpasswd" data-icon="p"> Your password </label>
                                    <input id="Password" name="Password" required="required" type="password" /> 
                                    <input type="hidden" name="page" value="login">
                                </p>
                                <%
                                      String visibility="hidden";
                                      String msg=new String();
                                      if(request.getAttribute("msg")!=null){
                                          msg=request.getAttribute("msg").toString();  
                                          visibility="visible";
                                          
                                %>
                                <span id="loginvalidatemsg" style="font-size:10px; color:red;visibility: <%=visibility%>">
                                     <%=msg%>
                                <%
                                 }
                                %>
                               </span>                                
                                <p class="login button"> 
                                    <input type="submit" value="Login" /> 
				</p>
                                
                            </form>
                        </div>
						
                    </div>
                </div>  
            </section>
            <%
              }
             else if(request.getAttribute("page") != null && request.getAttribute("page").equals("studentinfopage")) {
             %>
             <section>    
                <div id="container_demo" >
                    <div id="wrapper">
                        <div id="login" class="animate form">
                            <form action="onlineExamPaper.jsp" method="POST" name="loginForm" id="loginForm" autocomplete="on"> 
                                <h1>SchoolOManager e-Learning Login Console</h1> 
                                <p> 
                                    <label for="username" class="uname" data-icon="u">Enter Your Admission Number </label>
                                    <input id="adminssionno" name="adminssionno" required="required" type="text"/>
                                </p>
                                <p> 
                                    <label for="password" class="youpasswd" data-icon="p">Date Of Birth(DD-MM-YYYY)</label>
                                    <input id="dob" name="dob" required="required" type="text"/> 
                                    <input type="hidden" name="page" value="studentinfosubmit">
                                </p>
                                <%
                                      String visibility="hidden";
                                      String msg=new String();
                                      if(request.getAttribute("msg")!=null){
                                          msg=request.getAttribute("msg").toString();  
                                          visibility="visible";
                                          
                                %>
                                <span id="loginvalidatemsg" style="font-size:10px; color:red;visibility: <%=visibility%>">
                                     <%=msg%>
                                <%
                                 }
                                %>
                               </span>                                
                                <p class="login button"> 
                                    <input type="submit" value="Continue" /> 
				</p>
                                
                            </form>
                        </div>
						
                    </div>
                </div>  
            </section>             
            <% 
             }
             else if(request.getAttribute("page") != null && request.getAttribute("page").equals("Startexampage")) {
            %>
            <section>    
                <div id="container_demo" >
                    <div id="wrapper">
                        <div id="login" class="animate form">
                            <form action="onlineExamPaper.jsp" method="POST" name="loginForm" id="loginForm" autocomplete="on"> 
                                <h1>SchoolOManager e-Learning Login Console</h1> 
                                <p> 
                                    <label for="username" class="uname" data-icon="u">Start exam </label>
                                    <input id="adminssionno" name="adminssionno" required="required" type="text"/>
                                </p>
                                <p> 
                                    <label for="password" class="youpasswd" data-icon="p">Date Of Birth(DD-MM-YYYY)</label>
                                    <input id="dob" name="dob" required="required" type="text"/> 
                                    <input type="hidden" name="page" value="studentinfosubmit">
                                </p>
                                <%
                                      String visibility="hidden";
                                      String msg=new String();
                                      if(request.getAttribute("msg")!=null){
                                          msg=request.getAttribute("msg").toString();  
                                          visibility="visible";
                                          
                                %>
                                <span id="loginvalidatemsg" style="font-size:10px; color:red;visibility: <%=visibility%>">
                                     <%=msg%>
                                <%
                                 }
                                %>
                               </span>                                
                                <p class="login button"> 
                                    <input type="submit" value="Continue" /> 
				</p>
                                
                            </form>
                        </div>
						
                    </div>
                </div>  
            </section> 
            <%
             }
            %>
            <div class="codrops-bottom">
            </div>
        </div>
    </body>
</html>


