window.SETTING = window.SETTING || {};
CURRENT_TIME=new Date().getTime();
SETTING.ROLES = {
    STUDENT:"Student",
    ADMIN:'Admin',
    PARENT:'Parent',
    TEACHER:'Teacher',
    GUEST:'Guest'
};
SETTING.Perm = {
    Widget_ADMIN :{
        widgetNo:1,
        title:'Administration'
    },
    Widget_QUICKLINKS:{
        widgetNo:2,
        title:'Administration'
    },
    Widget_PAYMENT:{
        widgetNo:3,
        title:'Payment'
    },
    Widget_LEAVE:{
        widgetNo:4,
        title:'Leave & Attendance'
    },
    Widget_ALERT:{
        widgetNo:5,
        title:'Alerts'
    },
    Widget_PERANT:{
        widgetNo:6,
        title:'Parent Portal'
    },
    Widget_NOTICE:{
        widgetNo:7,
        title:'Noticeboard'
    },
    Widget_FORUM:{
        widgetNo:8,
        title:'Discussion Forum'
    }
}
DEFAULT_DATE_FORMAT="d/m/Y";
var globalTab = null;
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
function _rc(n){
    document.cookie = n + "=" + ";path=/;expires=Thu, 01-Jan-1970 00:00:01 GMT";
}
function getPermission(value){
    var v = Math.pow(2, value);
    return (getCookie('zpv') & v)!=0;
}
function onIconClick (func){
    app.getController('Dashboard')[func]();
}

function getUserRole(){
    var role=getCookie('zrole');
    if(role=="1"){
        return SETTING.ROLES.ADMIN;
    }else if(role=="2"){
        return SETTING.ROLES.ADMIN;
    }else if(role=="3"){
        return SETTING.ROLES.TEACHER;
    } else if(role=="4"){
        return SETTING.ROLES.PARENT;
    } else if(role=="5"){
        return SETTING.ROLES.STUDENT;
    }
    return "";
}
function getRolesGroup(){
    var role=getCookie('zrole');
    if(role=="1" || role=="2" || role=="3"){
        return "School";
    } else{
        return "Student";
    }
}
