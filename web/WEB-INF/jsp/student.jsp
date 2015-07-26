<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>School Info System</title>
        <link rel="stylesheet" type="text/css" href="lib/jquery/themes/cupertino/jquery-ui-1.10.4.custom.min.css" />
        <link rel="stylesheet" type="text/css" href="resources/css/app.css" />
        <link rel="stylesheet" type="text/css" href="resources/css/student.css" />
        <link rel="stylesheet" type="text/css" href="resources/css/demo.css" />
        <link rel="stylesheet" type="text/css" href="lib/canjs/grid/css/grid.css" />
        
    <!-- GC -->
    <!-- <x-bootstrap> -->
    <script type="text/javascript">
        var BASE_URL ="<%=request.getContextPath()%>";
        PORTAL_ICON = BASE_URL+"resources/images/portal-icon/";
		/*<![CDATA[*/
			function _cC(){ _u = _gC('zrole'); if (!_u || _u == "") _r('login.html');}
			function _gC(_c){ _ck = document.cookie; if (_ck.length > 0) { _s = _ck.indexOf(_c + "="); if (_s != -1) { _s = _s + _c.length + 1; _e = _ck.indexOf(";", _s); if (_e == -1) _e = _ck.length; return unescape(_ck.substring(_s, _e));}} return "";}
			function _r(url){ window.top.location.href = url;}
			_cC();
		/*]]>*/
    </script> 
   
    <!-- </x-compile> -->
</head>
<body class="x-border-layout-ct">
        <div id="app-header" style="height : 55px;" class="ui-layout-north"></div>
        <div id="tab-student-profile" class="ui-dialog ui-layout-center" style="overflow: auto;">
            <div class="ui-dialog-titlebar ui-widget-header ui-helper-clearfix">
                <span id="ui-id-1" class="ui-dialog-title">Student Profile</span>
            </div>
        <div id="tab-content" style="border:1px solid #AED0EA;border-top-style: none;">
            <div id="student-body"></div> 
            <div id="student-content-body" style="background: white;margin-top: 3px;height:500px;">
                 <div id="quick-links" class="ui-layout-west"></div>
                <div class="ui-layout-center">
                    <div class="content-header">
                        <div class="toolbar right">
                            
                        </div>
                        <h5 class="content-title">Recent Activity </h5>
                    </div>
                      <div id="content-body">
                          
                      </div>
                    
                </div>
                <div id="widget-list" class="ui-layout-east">
                   
                </div>
            </div>
            </div>
        </div>
<script type="text/javascript" src="lib/jquery/jquery-1.9.1.js"></script>
 <script type="text/javascript" src="lib/jquery/jquery-ui.js"></script>
 <script type="text/javascript" src="lib/jquery/jquery.layout.js"></script>
 <script type="text/javascript" src="lib/jquery/jquery-migrate.js"></script>
 <script type="text/javascript" src="lib/canjs/can.jquery.min.js"></script>
 <script type="text/javascript" src="lib/canjs/grid/grid.js"></script>
 <script type="text/javascript" src="lib/canjs/turn.js"></script>
  
 <script type="text/javascript" src="app/settings.js"></script>
 <script type="text/javascript" src="app/model/canjs/Users.js"></script>
 
 <script type="text/javascript" src="app/controller/canjs/topcontroller.js"></script>
 <script type="text/javascript" src="app/controller/canjs/bradcrumcontroller.js"></script>
 <script type="text/javascript" src="app/controller/canjs/quicklinkscontroller.js"></script>
 <script type="text/javascript" src="app/controller/canjs/student-profile.js"></script>
 <script type="text/javascript" src="app/controller/canjs/widgetcontroller.js"></script>
 <script type="text/javascript" src="app/controller/canjs/ContentController.js"></script>
 <script type="text/javascript" src="app/studentview.js"></script>
  <script type="text/javascript" src="app/controller/canjs/DiaryController.js"></script>
 <iframe id="downloadfile" hidden="true"></iframe>
 </body>
</html>

