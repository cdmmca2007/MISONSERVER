<html>
    <head>
        <script type="text/javascript" src="login.js"></script>
        <script type="text/javascript" src="lib/jquery/jquery-1.9.1.js"></script>
        <script type="text/javascript" src="lib/jquery/jquery-ui.js"></script>
    </head>
<body>    
<div>
    <div id="fp-header" style="height: 80px;background-color: #04468c">
        <h1 style="font-family: inherit;font-size: 28px;padding-top: 45px;padding-left: 10px">
            <font color="white">Developers lab , SchoolOManager </font>
        </h1>   
    </div>
    
    <div style="padding: 60px 120px 0px 120px" >
      <form action="javascript:forgotPassword();">        
          <fieldset name="fp-fieldset" style="height: 270px;background-color: gainsboro">
            
            <div style="background-color: white;height: 250px">
             <p style="font-weight: bold;margin: 5px 5px 5px 5px">Please enter your Username to Reset your Password.</p>
             <hr style="width: 90%;float: left;height:1px;border-width:0;background-color:#db6800;background: #db6800;">
           
             <label style="font-size:14px;float: left;margin: 2px 0px 0px 10px">Enter your Username </label><br><br>
             <img style="height:22px;float: left;margin: 2px 0px 0px 10px" src="resources/images/portal-icon/forgotpass.png">
             <input style="height: 22px;float: left;width: 400px;margin: 2px 0px 0px 2px" id="username" type="text" name="emailid">
             <input style="width: 75px;margin: 2px 3px 3px 3px;background-color: #04468c;border-color: #ffffff;color: white;font-weight: bold" type="button" onclick="javascript:getQuestion()" value="Check Me">
            <br><br>
            <p hidden id="p_txt" style="color: seagreen;font-size: 11px;margin: 2px 5px 5px 5px"><font color="red">*</font>Please provide answer of below Question</p>
            <div style="background-color: white">
                <label hidden id="label_pq" style="color: red;font-size:12px;float: left;margin: 2px 0px 0px 10px;font-weight: bold">Primary Question:</label>
                <label style="color: #008000;font-size:12px;float: left;margin: 2px 0px 0px 23px;font-weight: bold" id="question-1"></label><br>
                <input hidden  style="width: 425px;height:18px;float: left;margin: 2px 0px 0px 10px" type="text" name="panswer" id="panswer"><br>
                <input type="hidden" id="question1_id" value="">
                
                <label hidden id="label_sq" style="color: red;font-size:12px;float: left;margin: 2px 0px 0px 10px;font-weight: bold">Secondary Question:</label>
                <label style="color: #008000;font-size:12px;float: left;margin: 2px 0px 0px 10px;font-weight: bold" id="question-2"></label><br>
                <input type="hidden" id="question2_id" value="">                
              <input hidden style="width: 425px;height:18px;float: left;margin: 2px 0px 0px 10px" type="text" name="panswer" id="sanswer">              
            </div>
            <br>
            <p style="color: seagreen;font-size: 12px;margin: 5px 5px 5px 5px"><font color="red">*</font>Email will be send to registered email-id with school.In Case forgot your Username ,Please click on below link.</p>  
            </div> 
            
            <div style="background-color: gainsboro">
                <p style="float: left;font-size: 11px"><a href="">Forgot Username,Contact Administrator</a></p> 
                
                <input style="width: 70px;float: right;margin: 5px 3px 3px 3px;background-color: #04468c;border-color: #ffffff;color: white;font-weight: bold" type="reset" value="Cancel">
                <input id="send_req_1" disabled style="width: 250px;float: right;margin: 5px 3px 3px 3px;background-color: #04468c;border-color: #ffffff;color: white;font-weight: bold" type="submit" value="Send Reset Password Request">
            </div>
        </fieldset>    
        </form>    
    </div>
    <div  id="dialog-modal"></div>
</div>
</body>        
</html>
