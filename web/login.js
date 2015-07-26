/**
 * @author :Kamlesh
 */
function formFocus(){
    document.getElementById("UserName").focus();
}
function SetCookie(name, value){
    document.cookie = name + "=" + value + ";path=/;";
}

function getCookie(c_name){
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) 
                c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}
function checkCookie(){
    var u = getCookie('username');
    if (!(u == null || u == "")) {
        window.top.location.href = "./";
    }
}

function sendRequest(url,u,p){
    var xmlhttp;
    if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200){
            var s =xmlhttp.responseText;
            var obj =eval('('+s+')');
            if(obj.valid){
                SetCookie("zpv", obj.zpv);
                SetCookie("zrole", obj.userrole);
                var load = document.getElementById('loading-div');
                var lm = document.getElementById('loading-mask-div');
                load.style.visibility="visible";
                lm.style.visibility="visible";
                 window.top.location.href = "./";
                load.style.visibility="hidden";
            }
            else{
                showErrorMsg(true);
                //load.style.visibility="visible";
                //lm.style.visibility="visible";
            }

        //            document.getElementById("second_lower1_1").innerHTML=s;
                    
        }
    }
    xmlhttp.open("POST",url,true);
     var param ='u='+u+'&p='+p;
    xmlhttp.setRequestHeader("Content-length", param.length);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(param);

}
function validatelogin(){
    var _u = document.getElementById("UserName");
    var _p = document.getElementById("Password");
   
    var t= isEmpty(_u,_p);
    if(t){
       showErrorMsg(t);
    }else{
        sendRequest("user/verifyUser.do",_u.value,_p.value);
    }
    showErrorMsg(t);
}

function forgotPassword(){
   var _u = document.getElementById("username");
   var question1 = document.getElementById("question1_id");
   var question2 = document.getElementById("question2_id");
   var answer1 = document.getElementById("panswer");
   var answer2 = document.getElementById("sanswer");
   var data={u :_u.value,
             q1:question1.value,
             a1:answer1.value,
             q2:question2.value,
             a2:answer2.value
            }; 
   
   $.ajax({
                    url:"user/fotgotpass.do",
                    method:"POST",
                    data:data,
                    dataType:"json",
                    success:function(result){
                        alert('Thanks for, Your new Password has been sent to your registered Email-id');
                    },
                    error: function(data) {
                        alert("Credential provided by You does not match, Please try Again");
                    },                            
                    failure:function(result){
                      $(function() {
                        $( "#dialog-modal" ).dialog({
                        height: 140,
                        modal: true
                        });
                        });
                        alert("Please Contact Administrator , Some error occued in processing your request");
                    }        
    });
}

function getQuestion(){
   var _u = document.getElementById("username");
   var data={u:_u.value}; 
   $.ajax({
            url:"user/getquest.do",
            method:"GET",
            data:data,
            dataType:"json",
            success:function(result){
                $(function() {
                $( "#dialog-modal" ).dialog({
                height: 140,
                modal: true
                });
                });
                $( "#p_txt" ).show();
                $( "#label_pq" ).show();
                $( "#label_sq" ).show();
                $( "#question-1" ).append(result.question1).show();
                $( "#question-2" ).append(result.question2).show();
                $( "#question1_id" ).attr("value",result.question1_id);
                $( "#question2_id" ).attr("value",result.question2_id);
                $( "#panswer" ).show();
                $( "#sanswer" ).show();
                $( "#send_req_1" ).removeAttr('disabled');
                
            },
            error: function(data) {
               
            },                            
            failure:function(result){
              $(function() {
                $( "#dialog-modal" ).dialog({
                height: 140,
                modal: true
                });
                });
                alert("Please Contact Administrator , Some error occued in processing your request");
            }        
    }); 
    
}

function showErrorMsg(t){
  //  setVisibility(t, document.getElementById("errmsg"));
  //  setVisibility(t, document.getElementById("errmsg1"));
    var _m = document.getElementById("validateMsg");
    _m.innerHTML="Invalid User Name or Password";
    setVisibility(t, _m);
}

function isEmpty(u,p){
    if(u.value=="" || p.value=="")
        return true;
    else
        return false;
}
function setVisibility(v, el){
    el.style.visibility = (v ? 'visible' : 'hidden');
}

function sendLink(){
   var emailid = document.getElementById("emailid");
   var mobileno = document.getElementById("mobileno");
   var data={'emailid' :emailid.value,
             'mobileno':mobileno.value,
             'lastdate':new Date().getTime(),        
             'classid':'f3cb8779-99be-46ab-9014-680c42af36d8',
             'sessionid':'47ee876b-9880-4067-bfff-3fb73742d103'
            }; 
   $.ajax({
                    url:"studentadmission/initgust.do",
                    method:"POST",
                    data:data,
                    dataType:"json",
                    success:function(result){
                        alert('Thanks for Registration with us.Please check Your mail-box.We have sent an email with link for Online Student admission.');
                    },
                    error: function(data) {
                         alert('Thanks for Registration with us.Please check Your mail-box.We have sent an email with link for Online Student admission.');
                        //alert("Credential provided by You does not valid, Please try Again");
                    },                            
                    failure:function(result){
                      $(function() {
                        $( "#dialog-modal" ).dialog({
                        height: 140,
                        modal: true
                        });
                        });
                        alert("Please Contact Administrator , Some error occued in processing your request");
                    }        
    });
}