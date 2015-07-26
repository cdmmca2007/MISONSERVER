<html>
    <head>
        <script type="text/javascript" src="login.js"></script>
        <script type="text/javascript" src="lib/jquery/jquery-1.9.1.js"></script>
        <script type="text/javascript" src="lib/jquery/jquery-ui.js"></script>
    </head>
<body>    
<div>
    <div id="fp-header" style="height: 70px;background-color: #04468c">
         <img style="height:40px;width:140px ;float: left;margin: 2px 2px 2px 2px" src="resources/images/som_logo.png">
         <p style="float: right;font-family:inherit;font-size: 12px;margin:3px 7px 5px 10px"><font color="white"><b>Welcome to SchoolOManager </b></font></p>
        <h1 style="font-family: serif;font-size: 20px;padding-top: 45px;padding-left: 10px">
            <font color="white">Developers lab , SchoolOManager.com </font>
        </h1>   
    </div>
    <div style="padding: 60px 120px 0px 120px" >
      <form action="javascript:sendLink();">        
          <fieldset name="fp-fieldset" style="height: 270px;background-color: gainsboro">
            
            <div style="background-color: white;height: 250px">
             <p style="font-weight: bold;margin: 5px 5px 5px 5px">Please enter your Email-Id and Mobile Number to Apply for online Student Admission </p>
             <hr style="width: 90%;float: left;height:1px;border-width:0;background-color:#db6800;background: #db6800;">
           
             <label style="font-size:14px;float: left;margin: 2px 0px 0px 10px">Enter your Email : </label><br><br>
             
             <div id="emailid_div">
             <img style="height:22px;float: left;margin: 2px 0px 0px 10px" src="resources/images/portal-icon/forgotpass.png">
             <input style="height: 22px;float: left;width: 400px;margin: 2px 0px 0px 2px" id="emailid" type="text" name="emailid">
             </div>
             <br><br>
             <div id="mobileno_dev">
             <img style="height:22px;float: left;margin: 2px 0px 0px 10px" src="resources/images/mobile_icon.jpeg">
             <input style="height: 22px;float: left;width: 400px;margin: 2px 0px 0px 2px" id="mobileno" type="text" name="mobileno">             
             </div>             
            <br><br>
             
            <p style="color: seagreen;font-size: 12px;margin: 5px 5px 5px 5px"><font color="red">*</font>Please provide Valid Email-id and Mobile No.</p>  
            <p style="color: seagreen;font-size: 12px;margin: 5px 5px 5px 5px" hidden="true"><font color="red">*</font>Please check Your mail-box.We have sent an email with link for Online Student admission.</p>  
            </div> 
            
            <div style="background-color: gainsboro">
                <input style="width: 70px;float: right;margin: 5px 3px 3px 3px;background-color: #04468c;border-color: #ffffff;color: white;font-weight: bold" type="reset" value="Cancel">
                <input id="send_req_1"  style="width: 210px;float: right;margin: 5px 3px 3px 3px;background-color: #04468c;border-color: #ffffff;color: white;font-weight: bold" type="submit" value="Click for Online Application">
            </div>
        </fieldset>    
        </form>    
    </div>
    <div  id="dialog-modal"></div>
</div>
</body>        
</html>

