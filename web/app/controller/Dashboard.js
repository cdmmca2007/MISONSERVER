
Ext.define('MyApp.controller.Dashboard', {
    extend: 'Ext.app.Controller',
    requires:['Ext.calendar.data.EventMappings'],
    stores: ['Users','Property','Master','Templates','TemplateDetails','FeeStructure','Class','Student','Teacher','Email','Period','Timetable','Combo','UserRoles','RolesPermissionGroup','RolesPermission','FeeDetailsParent','StudentFeeModule','StudentFeeModule','ClassCombo','StudentMonthlyFee','ClassSubject','ClassExam','StudentMarkEntry','Route','TransportPlace','TransportVehicle','Notification','CreatedFeeForClass','StudentFeePayment','PaymentFeeName','StudentDairy','MonthlyProgress','DigitalDairy','HomeWork','StudentHomeWorkStatus','ClassCombo1','SchoolAdmin','PromoteStudentModule',
        'MonthlyAttendance','AttendanceSheet','InitiatedAdmissionProcess','NewStudent','OfflineStudentList','ExistingStudentList','PSMStudent','ClassSubjectTeacher','Tutorial','AttendenceRequestToAdmin','Session','BookList','BookDetail','BookTransaction','MisReport','TeacherQualification','TeacherExp','ClassSubjectCombo','ClassAttendenceReport','Alert','PaymentReportPerClass','MonthlyPaymentReport','ClassAttendenceForMonthReport','ClassReport','Hostel','HostelRoom','HostelRoomAllocation','MyWorkList','AdmissionSetting','DepartmentHeadSetting','ReplyOnStudentDairy','ChartStore','AuditTrail','AccountSetting','RoomCombo','StudentReportCardComparison','StudentReportCardComparisonSecChart','OnlineExamDetail','QuestionList','StudentEmailSMS','OnlineSchExamDetail','OnlineExamUserPass','OnlineExamUserPassResult' ,'BookRequesterList','BookedHistory','PayAdmissionFee' , 'DailyAttendenceReportForAllClass','ListOfAbsentStudent','StudentPaymentReportPerClass','ExamReportAnalysis','ExamReportAnalysisSubjectWise','Fine','Discount','FineRuleComboStore','FineListCombo','StudentDiscount','FeeStructureCombo','ReportColumnCondition','ReportColumnDetails','CustomReportDetailsStore','ReportColumnForCondtion'],
    models: ['Users','Student','Master','Templates','TemplateDetails','FeeStructure','Class','Teacher','Email','Period','Timetable','Combo','UserRoles','RolesPermissionGroup','RolesPermission','FeeDetailsParent','StudentMonthlyFee','ClassExam','StudentMarkEntry','Route','TransportPlace','TransportVehicle','Notification','CreatedFeeForClass','StudentFeePayment','PaymentFeeName','StudentDairy','MonthlyProgress','DigitalDairy','HomeWork','StudentHomeWorkStatus','SchoolAdmin','PromoteStudentModule',
        'MonthlyAttendance','AttendanceSheet','InitiatedAdmissionProcess','NewStudent','OfflineStudentList','ExistingStudentList','PSMStudent','ClassSubjectTeacher','Tutorial','AttendenceRequestToAdmin','Session','BookDetail','BookTransaction','MisReport','TeacherQualification','TeacherExp','ClassAttendenceReport','Alert','PaymentReportPerClass','Report','ClassReport','Hostel','HostelRoom','HostelRoomAllocation','MyWorkList','AdmissionSetting','DepartmentHeadSetting','ReplyOnStudentDairy','AuditTrail','AccountSetting','StudentReportCardComparisonSecChart','OnlineExamDetail','QuestionList','StudentEmailSMS','OnlineSchExamDetail','OnlineExamUserPass','OnlineExamUserPassResult' , 'BookRequesterList','BookedHistory','PayAdmissionFee','StudentPaymentReportPerClass','ExamReportAnalysis','ExamReportAnalysisSubjectWise','Fine','Discount','StudentDiscount','ReportColumnCondition','ReportColumnDetails','CustomReportDetailsModel'],
    controllers:['Users','Master','Permission','Class','Student','Teacher','PaymentStatus','Email','Period','Timetable','StudentFeeModule','EditStudentMonthlyFee','Subject','ClassExam','StudentMarkEntry','Route','TransportPlace','Notification','StudentFeePayment','StudentDairy','MonthlyProgress','DigitalDairy','HomeWork','StudentHomeWorkStatus','PromoteStudentModule','InitiatedAdmissionProcess','NewStudent','ClassSubjectTeacher','Tutorial','AttendenceRequestToAdmin','Session'/*,'BookDetail','BookTransaction'*/],
    refs :[{
            ref:'dashboard',
            selector:'#app-portal'
    }],
    init: function() {
            this.control({
               '#app-viewport button[text=My Profile]' :{
                   click:this.onMyProfileClick
               },
               '#app-viewport menuitem[text=Change Password]' :{
                   click:this.onChangePasswordClick
               },
               '#app-viewport menuitem[text=Sign Out]' :{
                   click:this.onSignOutClick
               },
               '#app-viewport menuitem[text=Log Issue]' :{
                   click:this.onLogIssueClick
               },
               '#app-viewport menuitem[text=Contact Admin]' :{
                   click:this.onContactAdminClick
               },
               '#app-viewport menuitem[text=Your Feedback]' :{
                   click:this.onFeedbackClick
               },
               '#app-viewport menuitem[text=My Work List]' :{
                   click:this.onWorklistClick
               },
               '#app-viewport menuitem[text=Change Profile Picture]' :{
                   click:this.onChangeProfilePicClick
               },
               '#app-viewport menuitem[text=Print Page]' :{
                   click:this.onPrintPageClick
               },
               
               '#portalpanel button[action=showCalendar]':{
                   click:this.onShowCalendar
               },
               '#app-viewport button[text=Calendar]':{
                   click:this.onShowCalendar
               },
               '#app-viewport menuitem[text=Account Setting]':{
                   click:this.onAccountSetting
               },
               '#app-viewport menuitem[text=About]' :{
                   click:this.aboutApplication
               }
               /*'#app-viewport menuitem[text=About]':{
                   click:this.aboutApplication
               }*/
               
            });
        this.onWorklistClick();  
        if(SETTING.Users.properties.setpaswdsetng=='0')
           Ext.Msg.alert('Warning','<font color=red><b>Please set your password setting for Security Reason ,Click on Account Setting of Your Profile name at Right Corner</b></font>');
    },
   aboutApplication:function(){
    var win = Ext.getCmp('about_win');
        if(!win){
            win = Ext.create('Ext.app.view.component.AppWindow', {
                title:'About Application',
                id:'about_win',
                width:600,
                closeAction:'hide',
                top:{
                    //image:BASE_URL+'resources/images/bug.png',
                    image:'resources/images/DL2.jpg',
                    formTitle:'<b>Application Information Window</b>'
                },
                defaults:{
                    width:550
                },
                formItems :[
                {
                    xtype:'fieldset',
                    columnWidth: 0.5,
                    title: 'Company : <b>Developers-Lab.com</b>',
                    collapsible: true,
                    layout: {
                        type: 'column',
                        columnWidth:1    
                    },
                    items: [{
                        
                        xtype: 'label',
                        text: 'Company Name  : Developers Lab',
                        id  :'cname'
                    },{
                        xtype: 'label',
                        text : 'Website : developers-lab.com',
                        id  :'website'
                    },{
                        xtype: 'label',
                        text :'About Company : <b>Developers Lab<br>',
                        id  :'acompany'
                    }]
                },
                {
                    xtype:'fieldset',
                    columnWidth: 0.5,
                    title: 'Application: <b>Schoolomanager.com</b>',
                    collapsible: true,
                    defaults: {anchor: '100%'},
                    layout: {
                        type: 'hbox',
                    },
                    items: [{
                        xtype: 'label',
                        text: 'Company Name  : <b>Developers Lab</b> Website : developers-lab.com<br>\n\
                               About Company : <b>Developers Lab<br>',
                        value : 'sdfsdfdsfsdfsdf'       
                    }]
                }
                ]
            });
        }
        win.show();
    },        
    onAccountSetting:function(){

        var accsetngstore=Ext.StoreManager.lookup('AccountSetting').load({
                                      params:{usrid:SETTING.Users.userId}
                          });
                          
        if(accsetngstore!=null) 
        {    
        
        var rec=accsetngstore.getAt(0);
        
        var win = Ext.getCmp('accsettng_win');
        if(!win){
            win = Ext.create('Ext.app.view.component.AppWindow', {
                title:'Account Setting Page',
                id:'accsettng_win',
                width:600,
                closeAction:'hide',
                top:{
                    //image:BASE_URL+'resources/images/bug.png',
                    image:'resources/images/portal-icon/accsett.png',
                    formTitle:'<b>Personal Account Setting Window....</b>'
                },
                defaults:{
                    xtype:'textfield',
                    value:'',
                    width:550
                },
                formItems :[
                {
                    xtype:'fieldset',
                    columnWidth: 0.5,
                    title: 'Password Recovery Setting',
                    collapsible: true,
                    defaultType: 'textfield',
                    defaults: {anchor: '100%'},
                    layout: 'anchor',
                    items :[{
                        
                        fieldLabel: 'Primary Security Question',
                        name: 'pquestion',
                        id: 'pquestion',
                        xtype:'combobox',
                        store:Ext.create('MyApp.store.Master').load({
                                              params:{propertyId:40}}),
                        typeAhead: true,
                        queryMode: 'local',
                        emptyText: 'Select Primary Question from list...',
                        Autoload:true,
                        valueField :'id',
                        displayField :'value',
                        value:accsetngstore.primary_ques
                        },
                        {
                                fieldLabel: 'Answer',
                                name: 'panswer',
                                value:accsetngstore.primary_ans
                        },
                        {
                        fieldLabel: 'Secondary Security Question',
                        name: 'squestion',
                        id: 'squestion',
                        xtype:'combobox',
                        store:Ext.create('MyApp.store.Master').load({
                                              params:{propertyId:40}}),
                        typeAhead: true,
                        queryMode: 'local',
                        emptyText: 'Select Secondary Question from list...',
                        Autoload:true,
                        valueField :'id',
                        displayField :'value',
                        value:accsetngstore.secondary_ques
                        },
                        {
                                fieldLabel: 'Answer',
                                name: 'sanswer',
                                value:accsetngstore.secondary_ans
                        }]
                },
                {
                    xtype:'fieldset',
                    columnWidth: 0.5,
                    title: 'Others Setting',
                    collapsible: true,
                    defaultType: 'textfield',
                    defaults: {anchor: '100%'},
                    layout: 'anchor',
                    items :[{
                        fieldLabel: 'Password Expiry Warning',
                        name: 'passwarning',
                        xtype:'checkbox',
                        value:accsetngstore.password_expiry_warning
                    }, {
                        fieldLabel: 'Password Recovery Email-Id',
                        name: 'recvry_emailid',
                        value:accsetngstore.password_recovery_emailid
                    },{
                        fieldLabel: 'Preferred Date Format',
                        name: 'preferred_date_format'
                    }]
                }
                ],
                buttons :[
                {
                    text: 'Save',
                    action: 'save',
                    scope:this,
                    handler:saveSettings
                },
                {xtype:'btncancel'}
                ]
            });
        }
        win.show();
       } 
    },
           
    onFeedbackClick :function(){
        var win = Ext.getCmp('feedback_win');
        if(!win){
            win = Ext.create('Ext.app.view.component.AppWindow', {
                title:'User Feedback Page',
                id:'feedback_win',
                width:600,
                closeAction:'hide',
                top:{
                    //image:BASE_URL+'resources/images/bug.png',
                    image:'resources/images/portal-icon/feedback1.png',
                    formTitle:'<b>Your Feedback is Amportant for Us....</b>'
                },
                defaults:{
                    xtype:'textfield',
                    value:'',
                    width:550
                },
                formItems :[
                {
                    name : 'name',
                    fieldLabel: 'User Name'
                },
                {
                xtype:'combobox',
                fieldLabel :'Rate Application By User Interface',
                id:'priority',
                name:'priority',                
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:23}}),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Rate...',
                Autoload:true,
                valueField :'id',
                displayField :'value'
                },{
                xtype:'combobox',
                fieldLabel :'Rate Application By User Performance',
                id:'serverity',
                name:'serverity',                
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:23}}),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Application By User Performance',
                Autoload:true,
                valueField :'id',
                displayField :'value'
                },{
                xtype:'combobox',
                fieldLabel :'Rate Application By Functionality',
                id:'assignedto',
                name:'assignedto',                
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:23}}),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Application By Functionality',
                Autoload:true,
                valueField :'id',
                displayField :'value'
                },{
                xtype:'combobox',
                fieldLabel :'Rate Application By Stablity',
                id:'assignedto',
                name:'assignedto',                
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:23}}),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Application By Stablity',
                Autoload:true,
                valueField :'id',
                displayField :'value'
                },{
                xtype:'combobox',
                fieldLabel :'Rate Application By Usebility',
                id:'assignedto',
                name:'assignedto',                
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:23}}),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Application By Usebility...',
                Autoload:true,
                valueField :'id',
                displayField :'value'
                },
                ,{
                    name : 'createdby',
                    fieldLabel: 'createdby',
                    hidden:true,
                    value:SETTING.Users.userId
                },
                {
                    xtype:'checkbox',
                    name : 'howisadminsupport',
                    fieldLabel: 'Administrator Support is Good'
                },
                {
                    xtype:'textarea',
                    name : 'whatyoulike',
                    fieldLabel: 'What You Like in Application'
                }
                ,{
                    xtype:'textarea',
                    name : 'whatimprovment',
                    fieldLabel: 'What You Think Need to Improve'
                }
                ,{
                    xtype:'textarea',
                    name : 'description',
                    fieldLabel: 'Any More Comment'
                }
                
                ],
                buttons :[
                {
                    text: 'Save',
                    action: 'save',
                    scope:this,
                    handler:savebug
                },
                {xtype:'btncancel'}
                ]
            });
        }
        win.show();


    },   
    saveProfilePic :function(btn){
     var form = btn.up('window').down('form').getForm();
     if(form.isValid()){
           form.submit({
                    url: 'user/addprofpic.do',
                    success: function(fp, o) {
                    Ext.example.msg('Success','Profile Picture Updated Successfully');

                    },
                    failure: function(fp, o) {
                        Ext.example.msg('Failure','Unexpected Error Occured,Please Contact Administrator');
                    }
          }); 
      }
    },        
    onWorklistClick :function(){
    var win=Ext.getCmp('myworklistwin');;
    if(!win){
        win=Ext.create('Ext.window.Window', {
            title:'My work List Window',
            id:'myworklistwin',
            width:700,
            height:400,
            closeAction:'hide',
             layout:'fit',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:'My work List to Do'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:580
            },
            url:'ppppp',
            items :[
              {
                  xtype: 'fieldcontainer',
                  combineErrors: true,
                  layout: 'hbox',
                  items: [
                       {
                        xtype:new Ext.create('MyApp.view.user.UserToDoList'),
                        store:Ext.StoreManager.lookup('MyWorkList').load({
                       params:{                             
                       status:0
                       }
                     })
                  }]
              } 
            ],
            buttons :[
            {xtype:'btncancel'}
            ]
        });
      }
     win.show();       
    },        
    onLockPortalClick :function(){
 
        Ext.Msg.alert("This functionality is in development phase");

    },        
    onChangeProfilePicClick :function(){
       
        var win = Ext.getCmp('changeprofile_win');
        if(!win){
            win = Ext.create('Ext.app.view.component.AppWindow', {
                title:'Change Profile Page',
                id:'changeprofile_win',
                width:600,
                closeAction:'hide',
                top:{
                    //image:BASE_URL+'resources/images/bug.png',
                    image:'resources/images/portal-icon/changeprofile.png',
                    formTitle:'<b>Change Your Profile Picture</b>'
                },
                defaults:{
                    width:550,
                    xtype:'textfield'
                },
                formItems :[
                {
                    name : 'id',
                    id : 'id',
                    fieldLabel: 'id',
                    hidden:true,
                    value:SETTING.Users.userId
                },
                {
                xtype: 'fileuploadfield',
                fieldLabel :'Upload Your Profile Photo',
                id:'filepic',
                name:'filepic',
                buttonText: 'Browse Your Local Drive',
                buttonConfig: {
                iconCls: 'upload-icon'
                }
                }
                ],
                buttons :[
                {
                    text: 'Upload',
                    action: 'save',
                    scope:this,
                    handler:this.saveProfilePic
                },
                {xtype:'btncancel'}
                ]
            });
        }
        win.show();
 },        
    onPrintPageClick :function(){
       Ext.Msg.alert("This functionality is in development phase");
    },        
    onContactAdminClick :function(){
        var win = Ext.getCmp('contactadmin_win');
        if(!win){
            win = Ext.create('Ext.app.view.component.AppWindow', {
                title:'Contact Administrator',
                id:'contactadmin_win',
                width:500,
                closeAction:'hide',
                top:{
                    image:BASE_URL+'resources/images/createuser.png',
                    formTitle:'Contact Admin by sending an Email'
                },
                defaults:{
                    xtype:'textfield',
                    width:450
                },
                url:'ppppp',
                formItems :[
                {
                    name : 'title',
                    fieldLabel: '<b>Title</b>',
                    allowBlank: false

                },
                {
                    name : 'subject',
                    fieldLabel: '<b>Subject</b>',
                    allowBlank: false

                },
                {
                    xtype:'textarea',
                    name : 'message',
                    fieldLabel: '<b>Reason for Contact</b>',
                },
                {
                    name : 'name',
                    fieldLabel: '<b>Your Name</b>',
                    allowBlank: false
                    
                },
                {
                    name : 'email',
                    fieldLabel: '<b>Your Email Id</b>',
                    allowBlank: false
                    
                }
                ],
                buttons :[
                {
                    text: 'Send Email',
                    action: 'contactadmin',
                    scope:this,
                    handler:contactadmin

                },
                {xtype:'btncancel'}
                ]
            });
        }
        win.show();
    },        
    onShowCalendar : function(){
        var me =this;
        Ext.getBody().mask('Loading Calendar....');
        var calendarStore = Ext.create('Ext.calendar.data.MemoryCalendarStore');
        var eventStore = Ext.create('Ext.calendar.data.MemoryEventStore');
        //eventStore.load();
        calendarStore.load({
            
            callback: function(){
                var tab = Ext.create('MyApp.view.Calendar',{
                    title:'Calendar',
                    closable:true,
                    calendarStore:calendarStore,
                    eventStore:eventStore
                });
                me.getDashboard().add(tab);
                me.getDashboard().setActiveTab(tab);
                Ext.getBody().unmask();
            }
        });
       
    },
    
    onMyProfileClick : function(){
        
        if(SETTING.Users.roleId===3 || SETTING.Users.roleId===1 || SETTING.Users.roleId===2){
        Ext.Ajax.request({
        url:"teacher/getTcherPrf.do?tchrid="+SETTING.Users.userId,
        method:"GET",
        scope:this,
        success:function(res){
            var rec = eval('('+res.responseText+')');
            this.getTeacherQualificationStore().load({
                         params:{tchrid:SETTING.Users.userId
                         }
                 });         
            this.getTeacherExpStore().load({
                         params:{tchrid:SETTING.Users.userId
                         }
                 });         
                 
            this.teacherProfile(rec);             
        }
        });
        }
      /*  else{
            var userProfile = Ext.create('Ext.app.view.user.UserProfile',{
                title:'Profile->'+SETTING.Users.name,
                userName:SETTING.Users.FULL_NAME
            });
            this.getDashboard().add(userProfile);
            this.getDashboard().setActiveTab(userProfile);
        }
      */  
    },
        
    onChangePasswordClick:function(){
        var win = Ext.getCmp('changepass_win');
        if(!win){
            win = Ext.create('Ext.app.view.component.AppWindow', {
                title:'Change Passowrd Window',
                id:'changepass_win',
                width:450,
                closeAction:'hide',
                top:{
                    image:BASE_URL+'resources/images/change_password_icon.PNG',
                    formTitle:'Change Password Form<br><font size="1px" color="red">Passwords should be at least 8 characters and contain alpha, numeric.</font>'
                },
                defaults:{
                    xtype:'textfield',
                    inputType:'password',
                    value:'',
                    width:350
                },
                url:'ppppp',
                formItems :[
                {
                    name : 'old',
                    id   : 'old',
                    fieldLabel: 'Old Password'
                },
                {
                    name : 'newp',
                    id   : 'newp',
                    fieldLabel: 'New Password'
                },
                {
                    name : 'new_i',
                    fieldLabel: 'Confirm Password'
                }
                ],
                buttons :[
                {
                    text: 'Save',
                    action: 'save',
                    scope:this,
                    handler:changePassword
                    
                },
                {xtype:'btncancel'}
                ]
            });
        }
        win.show();
    },
            
    onSignOutClick : function(){
        Ext.Ajax.request({
        url:"user/signOut.do",
        method:"POST",
        success:function(result){
            _rc('zpv');
            _rc('zrole');
            window.top.location.href = "./";
        }
    });
    },
    
    managePermission: function(){
        var tab = Ext.getCmp('tab_permissionPanel');
        if(tab==null){
            tab = Ext.create('MyApp.view.permission.PermissionPanel',{
            id:'tab_permissionPanel'
        });
        this.getDashboard().add(tab);
        this.getDashboard().setActiveTab(tab);
        }else{
        this.getDashboard().setActiveTab(tab);
        }
    },
    showUsers: function(){
        
       var users=Ext.getCmp("userList"); 
       if(users==null) {
            users=Ext.create('MyApp.view.user.UserList');
            this.getDashboard().add(users);
            this.getDashboard().setActiveTab(users);
            app.getController('Users').init();
           
       }else{
           this.getDashboard().setActiveTab(users);
       }
    },
    showAttendance: function(){
        
        var obj=Ext.getCmp("attandancegridpanel"); 
        if(obj==null){
        var obj = Ext.create('MyApp.view.leave.AttendanceTab');
        this.getDashboard().add(obj);
        this.getDashboard().setActiveTab(obj);            
            
        }
        else
        {
        this.getDashboard().setActiveTab(obj);                
        }
    },
    showMasterGrid : function(){
        
        var me = this;
        this.getPropertyStore().load({
            callback: function(store){
               var pid = this.getAt(0).get('id');
                me.getMasterStore().load({
                    params:{
                        propertyId:pid
                    }
                })
            }
        });
        
        var masterTab=Ext.getCmp("masterlist"); 
        if(masterTab==null){
        var masterTab = Ext.create('MyApp.view.master.List');
        this.getDashboard().add(masterTab);
        this.getDashboard().setActiveTab(masterTab);
        }
        else
        {
        this.getDashboard().setActiveTab(masterTab);    
        }
    },
    showAuditTrail : function(){
        var obj=Ext.getCmp("audittrialgrid"); 
        
        if(obj==null){
        this.getAuditTrailStore().load();    
        var obj = Ext.create('MyApp.view.AuditTrail');
        this.getDashboard().add(obj);
        this.getDashboard().setActiveTab(obj);
        }
        else
        {
        this.getDashboard().setActiveTab(obj);    
        }
    },
    showStudents: function(){
        
        
        var obj=Ext.getCmp("studentgrid"); 
        this.getStudentStore().loadPage(1);
        if(obj==null){
        var obj = Ext.create('MyApp.view.student.Student');
        this.getDashboard().add(obj);
        this.getDashboard().setActiveTab(obj);
        }
        else
        {
        this.getDashboard().setActiveTab(obj);    
        }
    },
    showFeeStructure :function(){

        var obj=Ext.getCmp("feestructure"); 
        if(obj==null){
            var obj = Ext.create('MyApp.view.payment.FeeStrucGrid');
            this.getDashboard().add(obj);
            this.getDashboard().setActiveTab(obj); 
        }
        else
        {
            this.getDashboard().setActiveTab(obj); 
        }
    },
    showFeeTemplate :function(){
        var me=this;
        this.getTemplatesStore().load({params:{sessionid:SETTING.Users.properties.session_id}},
            {callback: function(store){
                if(store.length>0){
                   var rec = store[0];
                   me.getTemplateDetailsStore().load({
                       params:{
                           id:rec.data.id
                       }
                   });
                }
            }
        });
       // var tab = Ext.getCmp('tab_feeDatailGrid');
        //if(!tab){
          var  tab = Ext.create('MyApp.view.payment.FeeDetails',{
             closable:true//,
             //id:'tab_feeDatailGrid'
        });
       // }
        this.getDashboard().add(tab);
        this.getDashboard().setActiveTab(tab);
    },
    showClasses : function(){
       
        var obj=Ext.getCmp("classgrid"); 
        if(obj==null){
        this.getClassStore().load({
                         params:{sessionid:SETTING.Users.properties.session_id
                         }
                 });             
        var obj = Ext.create('MyApp.view.class.Class');
        this.getDashboard().add(obj);
        this.getDashboard().setActiveTab(obj);
        }
        else
        {
            this.getDashboard().setActiveTab(obj);
        }
    },
    showEmailTpl : function(){
       
        
        var obj=Ext.getCmp("emailtemplate"); 
        if(obj==null){
        this.getEmailStore().load();
        var obj = Ext.create('MyApp.view.mail.Email');
        this.getDashboard().add(obj);
        this.getDashboard().setActiveTab(obj);
        }
        else
        {
        this.getDashboard().setActiveTab(obj);    
        }
    },
   showPaymentHistory : function(){
        var obj=Ext.getCmp("paymenthistory"); 
        if(obj==null){
                var obj = Ext.create('MyApp.view.payment.PaymentHistory');
                this.getDashboard().add(obj);
                this.getDashboard().setActiveTab(obj);
        }
        else
        {
            this.getDashboard().setActiveTab(obj);
        }

    },
   showSchoolAdmin : function(){
      //  this.getSchoolAdminStore().load();
        var obj=Ext.getCmp("schooladmin"); 
        if(obj==null){
                var obj = Ext.create('MyApp.view.school.SchoolAdmin');
                this.getDashboard().add(obj);
                this.getDashboard().setActiveTab(obj);
        }
        else
        {
            this.getDashboard().setActiveTab(obj);
        }
    },
   showFeeDetails : function(){
       var obj=Ext.getCmp("tab_feeDatailGrid"); 
        if(obj==null){
        var obj = Ext.create('MyApp.view.payment.FeeDetails');
        this.getDashboard().add(obj);
        this.getDashboard().setActiveTab(obj);
        }
        else
        {
        this.getDashboard().setActiveTab(obj);    
        }
   },
   showDigitalDairy : function(){
        //Need modification
        /*We have call diffrent class based on user role
         * 
         *  if User is Teacher then call ---MyApp.view.dairy.TeacherDigitalDairy
         *  if User is Parent then  call ---MyApp.view.dairy.DigitalDairy
         * */
       //if(user is teacher then)
       //if(user is parent  then)
       var obj=Ext.getCmp("teacherdairygrid"); 
        if(obj==null){
                var Tab = Ext.create('MyApp.view.dairy.TeacherDigitalDairy');
                this.getDashboard().add(Tab);
                this.getDashboard().setActiveTab(Tab);
        }
        else
        {
            this.getDashboard().setActiveTab(Tab);
        }

   },
   showFeeDetailsParent : function(){
    /*    this.getStudentFeePaymentStore().load({
                            params:{'userid':null
                    }});*/
        var obj=Ext.getCmp("feedetailsparent"); 
        if(obj==null){
                this.getStudentFeePaymentStore().load({
                            params:{'userid':SETTING.Users.userId,
                                    'sessionid':SETTING.Users.properties.session_id
                                    
                    }});              
                var obj = Ext.create('MyApp.view.payment.FeeDetailsParent');
                this.getDashboard().add(obj);
                this.getDashboard().setActiveTab(obj);
        }
        else
        {
            this.getDashboard().setActiveTab(obj);
        }
        
   },
   showTeachers : function(){

       this.getUsersStore().load({
                         params:{roleId:3
                         }
       });
       
       var obj=Ext.getCmp("teacherList"); 
       if(obj==null) {
           var obj = Ext.create('MyApp.view.teacher.Teacher');
           this.getDashboard().add(obj);
           this.getDashboard().setActiveTab(obj);
       }else{
            this.getDashboard().setActiveTab(obj);
       }
   },
   showPeriod :function(){
       
       var obj=Ext.getCmp("periodgrid"); 
        if(obj==null){
            this.getPeriodStore().load();
            var obj = Ext.create('MyApp.view.timetable.Period');
            this.getDashboard().add(obj);
            this.getDashboard().setActiveTab(obj);
        }
        else
        {
             this.getDashboard().setActiveTab(obj);
            
        }


   },
   createTimeTable:function(){
       var obj=Ext.getCmp("timetablegrid"); 
        if(obj==null){
            this.getTimetableStore().load();
            var obj = Ext.create('MyApp.view.timetable.Timetable',{p_sessionid:null,p_classid:null});
            this.getDashboard().add(obj);
            this.getDashboard().setActiveTab(obj);
        }
        else
        {
            this.getDashboard().setActiveTab(obj);
        }
   },

   showTutorial : function(){
     var tab  = Ext.getCmp('tut_documents');
      if(tab==null){
                tab = Ext.create('Ext.app.view.portlet.FolderPortlet',{
                id:'tut_documents',
                store:Ext.create('MyApp.store.Tutorial').load({
                         params:{sessionid:SETTING.Users.properties.session_id,
                                 isparent :1,
                                 batchid  :null
                         }
                 })
            });
             this.getDashboard().add(tab);
       }
     
      this.getDashboard().setActiveTab(tab);
        
    },
   showStudentFeeModule:function(){
     
       this.getStudentFeeModuleStore().load({
                            params:{'classid':null,
                                    'sessionid':null,
                                    'month':0
                                    
                    }}); 
       var obj=Ext.getCmp("StudentFeeModulegrid");
       if(obj==null) {
       var obj = Ext.create('MyApp.view.payment.StudentFeeModule');
       this.getDashboard().add(obj);
       this.getDashboard().setActiveTab(obj);
       }else{
         this.getDashboard().setActiveTab(obj);  
       }
       
   },        
   showFeeGeneration :function(){
       this.getCreatedFeeForClassStore().load({
                            params:{'classid':null,
                                    'sessionid':null,
                                    'month':-1
                    }});
       var obj=Ext.getCmp("GenerateMonthlyFee"); 
        if(obj==null){
                var obj = Ext.create('MyApp.view.payment.GenerateMonthlyFee');
                this.getDashboard().add(obj);
                this.getDashboard().setActiveTab(obj);
        }
        else
        {
            this.getDashboard().setActiveTab(obj);
        }
                

       /*var tab = tabPanel.getItem('ai'+id);
			if(tab){
                                //The tab show,but the items in the tab can't show.Why?
				tabPanel.setActiveTab(tab);
				tabPanel.doLayout();
				return;
			}
       */
       /*this.getDashboard().add({	id : 'GenerateMonthlyFee',
			title: 'Generate Monthly Fee',
			autoLoad : {
			      	url : 'GenerateMonthlyFee.jsp',
			      	scripts:true
			},
			closable:true
		    }).show();
       this.getDashboard().setActiveTab();*/
   },        
   CreateExam :function(){
     
      var obj=Ext.getCmp("classexamgrid"); 
      if(obj==null){
       var obj = Ext.create('MyApp.view.class.ClassExam');
       this.getDashboard().add(obj);
       this.getDashboard().setActiveTab(obj);
        }
        else
        {
       this.getDashboard().setActiveTab(obj);            
        }

       
   },         
   markEntry:function(){
     
       
                
        var obj=Ext.getCmp("studentmarkentry"); 
        if(obj==null){
            this.getStudentMarkEntryStore().load({
                            params:{'classid':null,
                                    'sessionid':null,
                                    'examtypeidid':null,
                                    'studentid':null,
                                    'subjectid':null
            }});
            var obj = Ext.create('MyApp.view.student.StudentMarkEntry');
            this.getDashboard().add(obj);
            this.getDashboard().setActiveTab(obj);
        }
        else
        {
             this.getDashboard().setActiveTab(obj);
        }
                
       
   },        
   gradeSetting :function(){
     
      
       
   },  
   showReportCardToParent :function(){    
     var obj=Ext.getCmp("reportcardtoparent"); 
        if(obj==null){
                var obj = Ext.create('MyApp.view.parent.ReportCardToParent');
                this.getDashboard().add(obj);
                this.getDashboard().setActiveTab(obj);
        }
        else
        {
            this.getDashboard().setActiveTab(obj);
        }
       
       
   },
   showTransport :function(){   
     this.getRouteStore().load({
                            params:{'routeid':null
                    }});   
     var obj=Ext.getCmp("transportgrid"); 
        if(obj==null){
                var obj = Ext.create('MyApp.view.transport.Transport');
                this.getDashboard().add(obj);
                this.getDashboard().setActiveTab(obj);
        }
        else
        {
            this.getDashboard().setActiveTab(obj);
        }
           
       
   },        
   showNotification :function(){
     this.getNotificationStore().load(); 
     var noticetab=Ext.getCmp("notificationgrid"); 
        if(noticetab==null){
            var noticetab = Ext.create('MyApp.view.notice.Notification');
            this.getDashboard().add(noticetab);
            this.getDashboard().setActiveTab(noticetab);
            
            
        }
        else
        {
            this.getDashboard().setActiveTab(noticetab);
            
        }

   },      
   showHomeWork :function(){
     this.getNotificationStore().load(); 
     var obj=Ext.getCmp("homeworkgrid"); 
        if(obj==null){
                var obj = Ext.create('MyApp.view.homework.HomeWork');
                this.getDashboard().add(obj);
                this.getDashboard().setActiveTab(obj);       
        }
        else
        {
            this.getDashboard().setActiveTab(obj);       
        }

   },  
   callfolder:function(batchid){
       alert(batchid);
   },
          
   showPromoteStudentModule:function(){
     var obj=Ext.getCmp("promotestudentmodule"); 
        if(obj==null){
                    var obj = Ext.create('MyApp.view.promotestudent.PromoteStudentModule');
                    this.getDashboard().add(obj);
                    this.getDashboard().setActiveTab(obj);       
        }
        else
        {
                    this.getDashboard().setActiveTab(obj);                   
        }
  
   },
   showAddmission:function(){
     this.getInitiatedAdmissionProcessStore().load();
     var obj=Ext.getCmp("admissionstudentlist"); 
        if(obj==null){
                var obj = Ext.create('MyApp.view.addmission.StudentAddmission');
                this.getDashboard().add(obj);
                this.getDashboard().setActiveTab(obj);       
        }
        else
        {
            this.getDashboard().setActiveTab(obj);       
        }

   },  
   showLibrary:function(){
     this.getBookListStore().load({
                            params:{
                               columnname  :null,
                               columnvalue :null
                        }
                        });   
     var obj=Ext.getCmp("librarygrid"); 
        if(obj==null){
                var obj = Ext.create('MyApp.view.library.Library');
                this.getDashboard().add(obj);
                this.getDashboard().setActiveTab(obj);
        }
        else
        {
            this.getDashboard().setActiveTab(obj);
        }
                   
   }, 
   showAlumni:function(){
       Ext.Msg.alert("This functionality is in development phase");
   },         
   showOnlineExamAdmin:function(){
     this.getOnlineExamDetailStore().load({
                            params:{'classid':null
                    }});
     var obj=Ext.getCmp("elearningsetup"); 
        if(obj==null){
                    var obj = Ext.create('MyApp.view.elearning.ElearningAdmin');
                    this.getDashboard().add(obj);
                    this.getDashboard().setActiveTab(obj);       
        }
        else
        {
            this.getDashboard().setActiveTab(obj);       
        }
   },  
   showOnlineExamScheduleAdmin:function(){
     this.getOnlineSchExamDetailStore().load();
     var obj=Ext.getCmp("elearninschexam"); 
        if(obj==null){
                var obj = Ext.create('MyApp.view.elearning.ElearningScheduleExam');
                this.getDashboard().add(obj);
                this.getDashboard().setActiveTab(obj);       
        }
        else
        {
            this.getDashboard().setActiveTab(obj);       
        }

       
   },
   showStudentOnlineExam:function(){
     /*this.getOnlineExamDetailStore().load({
                            params:{'classid':null
                    }});*/
     var obj=Ext.getCmp("elearningsetup"); 
        if(obj==null){
                    var obj = Ext.create('MyApp.view.elearning.ElearningTeacher');
                    this.getDashboard().add(obj);
                    this.getDashboard().setActiveTab(obj);       
        }
        else
        {
            this.getDashboard().setActiveTab(obj);       
        }
  

   },          
   onLogIssueClick:function(){
        var win = Ext.getCmp('logissue_win');
        if(!win){
            win = Ext.create('Ext.app.view.component.AppWindow', {
                title:'Log Bug in System',
                id:'logissue_win',
                width:600,
                closeAction:'hide',
                top:{
                    //image:BASE_URL+'resources/images/bug.png',
                    image:'resources/images/bug.png',
                    formTitle:'<b>Create New Bug</b>'
                },
                defaults:{
                    xtype:'textfield',
                    value:'',
                    width:550
                },
                formItems :[
                {
                    name : 'name',
                    fieldLabel: 'Bug Name'
                },
                {
                xtype:'combobox',
                fieldLabel :'Bug Resolve Priority',
                id:'priority',
                name:'priority',                
                store:Ext.create('Ext.data.Store', {
                    fields: ['id', 'value'],
                    data : [
                    {"id":"Very High","value":"Very High"},
                    {"id":"High","value":"High"},
                    {"id":"Normal","value":"Normal"},
                    {"id":"Low","value":"Low"}
                ]
                }),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Priority to resolve Bug...',
                Autoload:true,
                valueField :'id',
                displayField :'value'
                },{
                xtype:'combobox',
                fieldLabel :'Bug Serverity',
                id:'serverity',
                name:'serverity',                
                store:Ext.create('Ext.data.Store', {
                    fields: ['id', 'value'],
                    data : [
                    {"id":"Impact Functionality","value":"Impact Functionality"},
                    {"id":"Data Loss","value":"Data Loss"},
                    {"id":"UI Issue","value":"UI Issue"},
                    {"id":"Deisgn Issue","value":"Deisgn Issue"},
                    {"id":"Logical Issue","value":"Logical Issue"}
                ]
                }),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Priority to resolve Bug...',
                Autoload:true,
                valueField :'id',
                displayField :'value'
                },{
                xtype:'combobox',
                fieldLabel :'Bug Assigned To',
                id:'assignedto',
                name:'assignedto',                
                store:Ext.create('Ext.data.Store', {
                    fields: ['id', 'value'],
                    data : [
                    {"id":"Chandra Deo","value":"Chandra Deo"},
                    {"id":"Kamlesh","value":"Kamlesh"}
                ]
                }),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Priority to resolve Bug...',
                Autoload:true,
                valueField :'id',
                displayField :'value'
                },
                {
                    name : 'modulename',
                    fieldLabel: 'Module Name'
                },
                {
                    name : 'pagename',
                    fieldLabel: 'Page Name'
                }
                ,{
                    name : 'functionality',
                    fieldLabel: 'Functionality Name'
                },
                ,{
                    name : 'createdby',
                    fieldLabel: 'createdby',
                    hidden:true,
                    value:SETTING.Users.userId
                },
                {
                    xtype:'textarea',
                    name : 'description',
                    fieldLabel: 'Description'
                }
                ,{
                    xtype:'textarea',
                    name : 'steptoduplicateissue',
                    fieldLabel: 'Step to Duplicate Issue'
                }
                ],
                buttons :[
                {
                    text: 'Save',
                    action: 'save',
                    scope:this,
                    handler:savebug
                },
                {xtype:'btncancel'}
                ]
            });
        }
        win.show();
   },        
   attendanceRequest:function(){
     this.getAttendenceRequestToAdminStore().load({
                    params:{                            
                             classid   :SETTING.Users.properties.class_id,
                             studentid :null,
                             createdby :SETTING.Users.userId,
                             sessionid :SETTING.Users.properties.session_id        
                     }
               });
     var obj=Ext.getCmp("artmgrid"); 
        if(obj==null){
                var obj = Ext.create('MyApp.view.leave.AttendenceRequestToAdmin');
                this.getDashboard().add(obj);
                this.getDashboard().setActiveTab(obj);       
        }
        else
        {
            this.getDashboard().setActiveTab(obj);       
        }
          
   },  
   showSession :function(){
       
     this.getSessionStore().load();
     var obj=Ext.getCmp("sessiongrid"); 
        if(obj==null){
                var obj = Ext.create('MyApp.view.session.Session');
                this.getDashboard().add(obj);
                this.getDashboard().setActiveTab(obj);       
        }
        else
        {
                this.getDashboard().setActiveTab(obj);                   
        }

   },   
   showReport  :function(){
     //this.getMisReportStore().load();
     var obj=Ext.getCmp("misreportboard"); 
        if(obj==null){
                var obj = Ext.create('MyApp.view.misreport.MisReportBoard');
                this.getDashboard().add(obj);
                this.getDashboard().setActiveTab(obj);       
        }
        else
        {
                this.getDashboard().setActiveTab(obj);       
        }

   },     
   showHostel  :function(){
     this.getHostelStore().load();
     var obj=Ext.getCmp("hostelgrid"); 
        if(obj==null){
                var obj = Ext.create('MyApp.view.hostel.Hostel');
                this.getDashboard().add(obj);
                this.getDashboard().setActiveTab(obj);       
        }
        else
        {
                this.getDashboard().setActiveTab(obj);                   
        }

   },             
   showEmailSMSSetting:function(){
     this.getHostelStore().load();
     var obj=Ext.getCmp("emailsmsgrid"); 
        if(obj==null){
                var obj = Ext.create('MyApp.view.emailsms.EmailSms');
                this.getDashboard().add(obj);
                this.getDashboard().setActiveTab(obj);       
        }
        else
        {
            this.getDashboard().setActiveTab(obj);       
        }

   },                     
   inProgress : function(){
        Ext.Msg.alert("This functionality is in development phase");
    },
    openSettings: function(){
        var me = this;
        this.getPropertyStore().load({
            callback: function(store){
               var pid = this.getAt(0).get('id');
                me.getMasterStore().load({
                    params:{
                        propertyId:pid
                    }
                });
            }
        });
        var userProfile = Ext.create('MyApp.view.component.Settings');
        this.getDashboard().add(userProfile);
        this.getDashboard().setActiveTab(userProfile);
        this.getPeriodStore().load();
        this.getEmailStore().load();
    },
   teacherProfile :function(rec){
    var win;
    if(!win){
        win = Ext.create('Ext.window.Window', {
            title:'Edit Profile Page',
            id: 'editprofile_win',
            width:620,
            height:580,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:'Edit Your Profile Data'
            },
            defaults:{
                xtype:'textfield',
                value:''
            },
            items :[{
                    xtype: 'tabpanel',
                    layout:'fit',     
                    style:'background:white',    
                    width:660,
                    height:580,                            
                    items:[{///Student Details
                            title: 'Personal Detail',
                            defaults:{
                                        xtype:'textfield',
                                        value:'',
                                        labelWidth:200,
                                        height:18
                            },
                            items:[
                                {
                                    name : 'fullname',
                                    fieldLabel: 'Teacher Full Name',
                                    id:'fullname',
                                    width:600,
                                    value:rec?rec.fullname:null
                                },
                                
                                {
                                    name : 'firstname',
                                    fieldLabel: 'Teacher First Name',
                                    id:'firstname',
                                    width:600,
                                    value:rec?rec.firstname:null
                                },
                                {
                                    name : 'middlename',
                                    fieldLabel: 'Middle Name',
                                    id:'middlename',
                                    width:600,
                                    value:rec?rec.middlename:null
                                },
                                {
                                    name : 'lastname',
                                    fieldLabel: 'Last Name',
                                    id:'lastname',
                                    width:600,
                                    value:rec?rec.lastname:null
                                },                                {
                                    name : 'fathername',
                                    fieldLabel:  'Father Name',
                                    id:'fathername',
                                    width:600,
                                    value:rec?rec.fathername:null
                                },
                                {
                                    name : 'mothername',
                                    fieldLabel: 'Mother Name',
                                    id : 'mothername',
                                    width:600,
                                    value:rec?rec.mothername:null
                                },
                                {
                                    xtype:'datefield',
                                    name : 'dob',
                                    fieldLabel: 'Date of Birth',
                                    id:'dob',
                                    format: 'm d Y',
                                    altFormats: 'm-d-Y|m.d.Y',
                                    width:600,
                                    value:rec?rec.dob:null
                                    },
                                {
                                    xtype:'combobox',
                                    fieldLabel :'Select Gender',
                                    id:'gender',
                                    emptyText: 'Select Gender',       
                                    store:
                                        Ext.create('Ext.data.Store', {
                                            fields: ['abbr', 'name'],
                                            data : [
                                            {
                                                "abbr":"1",
                                                "name":"Male"
                                            },{
                                                "abbr":"0",
                                                "name":"Female"
                                            }]
                                        }),
                                        Autoload:true,
                                        queryMode: 'local',
                                        displayField: 'name',
                                        valueField: 'abbr',
                                        name:'type',
                                    width:600,
                                    value:rec?rec.gender:null
                                },                                                       
                                {
                                    xtype:'combobox',
                                    fieldLabel: 'Religion',
                                    id:'religion',
                                    name : 'religion',
                                    store:Ext.create('MyApp.store.Master').load({
                                                                  params:{propertyId:4} //peorpetty religion id =4
                                                         }),
                                    typeAhead: true,
                                    queryMode: 'local',
                                    emptyText: 'Select Religion.',
                                    Autoload:true,
                                    valueField :'id',
                                    displayField :'value',
                                    width:600   ,
                                    value:rec?rec.religion:null
                                },{
                                    xtype:'combobox',
                                    fieldLabel: 'Nationality',
                                    id:'nationality',
                                    name : 'nationality',
                                    store:Ext.create('MyApp.store.Master').load({
                                                                  params:{propertyId:16} //peorpetty religion id =4
                                                         }),
                                    typeAhead: true,
                                    queryMode: 'local',
                                    emptyText: 'Select Nationality.',
                                    Autoload:true,
                                    valueField :'id',
                                    displayField :'value',
                                    width:600,
                                    value:rec?rec.nationality:null
                                },{

                                    fieldLabel: 'Mother Tounge',
                                    id:'mother_tounge',
                                    name : 'mother_tounge',
                                    width:600,
                                    value:rec?rec.mother_tounge:null
                                },{

                                    fieldLabel: 'Passport No',
                                    id:'passport_no',
                                    name : 'passport_no',
                                    width:600,
                                    value:rec?rec.passport_no:null
                                },{

                                    fieldLabel: 'Social Security Number',
                                    id:'ssn',
                                    name : 'ssn',
                                    width:600,
                                    value:rec?rec.ssn:null
                                },{

                                    fieldLabel: 'Visa Detail',
                                    id:'visadetail',
                                    name : 'visadetail',
                                    width:600,
                                    value:rec?rec.visadetails:null
                                    
                                },{

                                    fieldLabel: 'UID',
                                    id:'uid',
                                    name : 'uid',
                                    width:600,
                                    value:rec?rec.uid:null
                                },{

                                    fieldLabel: 'Aadhar Card Id',
                                    id:'aadhar_id',
                                    name : 'aadhar_id',
                                    width:600,
                                    value:rec?rec.aadhar_id:null
                                },{

                                    fieldLabel: 'Blood Group',
                                    id:'blood_group',
                                    name : 'blood_group',
                                    width:600,
                                    value:rec?rec.aadhar_id:null
                                },
                                ,{
                                    xtype:'combobox',
                                    fieldLabel: 'Martial Status',
                                    id:'martialstatus',
                                    name : 'martialstatus',
                                    width:600,
                                    store:
                                        Ext.create('Ext.data.Store', {
                                            fields: ['abbr', 'name'],
                                            data : [
                                            {
                                                "abbr":"1",
                                                "name":"Married"
                                            },{
                                                "abbr":"0",
                                                "name":"Unmarried"
                                            }]
                                        }),
                                        Autoload:true,
                                        queryMode: 'local',
                                        displayField: 'name',
                                        valueField: 'abbr',
                                        name:'type',
                                        listeners:{
                                        select: function(component){
                                            var issueto=Ext.getCmp('martialstatus').getValue();

                                           if(issueto==='1')
                                                Ext.getCmp('anniversarydate').show();
                                           else     
                                                Ext.getCmp('anniversarydate').hide();
                                        }
                                   }                                        
                                },{
                                    xtype:'datefield',
                                    name : 'anniversarydate',
                                    fieldLabel: 'Anniversary Date',
                                    id:'anniversarydate',
                                    hidden:true,
                                    format: 'm d Y',
                                    altFormats: 'm-d-Y|m.d.Y',
                                    width:600,
                                    value:rec?rec.dob:null
                                }
                              ]
                           },   
                           {///Parent Details                        
                            title: 'School Profile',
                            defaults:{
                                        xtype:'textfield',
                                        value:'',
                                        labelWidth:200,
                                        height:18
                            },
                            width:620,
                            height:580,                            
                            items:[
                                                                {
                                    name : 'teacherid',
                                    fieldLabel: 'Teacher Emp ID',
                                    id:'teacherid',
                                    width:600,
                                    value:rec?rec.empno:null
                                },{

                                    fieldLabel :'Teacher Type',
                                    id:'teachertype',
                                    name:'teachertype',
                                    width:600,
                                    value:rec?rec.teachertype:null
                                },{
                                    fieldLabel :'Job Type',
                                    id:'jobtype',
                                    name:'jobtype',
                                    width:600,
                                    value:rec?rec.jobtype:null
                                },
                                {
                                    name : 'designation',
                                    fieldLabel: 'Designation',
                                    id:'designation',
                                    name:'designation',
                                    width:600,
                                    value:rec?rec.designation:null
                                },
                                {
                                    xtype:'datefield',
                                    name : 'doj',
                                    fieldLabel: 'Date of Joining',
                                    id:'doj',
                                    format: 'm d Y',
                                    altFormats: 'm,d,Y|m.d.Y',
                                    width:600                                    
                                }
                            ]
                           },   
                           {///Contact Details                        
                            title: 'Contact Details',
                            defaults:{
                                        xtype:'textfield',
                                        value:'',
                                        labelWidth:200,
                                        height:18
                            },
                            width:620,
                            height:580,                            
                            items:[
                                {
                                    name : 'emailid',
                                    fieldLabel: 'Email Id',
                                    id : 'emailid',
                                    width:600,
                                    value:rec?rec.emailid:null
                                },
                                {
                                    name : 'alternateemailid',
                                    fieldLabel: 'Alternate Email Id',
                                    id: 'alternateemailid',
                                    width:600,
                                    value:rec?rec.alternateemailid:null
                                },
                                {
                                    name : 'mobile',
                                    fieldLabel: 'Mobile Number',
                                    id : 'mobile',
                                    width:600,
                                    value:rec?rec.mobilenumber:null
                                },
                                {
                                    name : 'alternatemobile',
                                    fieldLabel: 'Alternate Mobile',
                                    id : 'alternatemobile',
                                    width:600,
                                    value:rec?rec.alternatemobile:null
                                },
                                {
                                    xtype:'textarea',
                                    name : 'address',
                                    fieldLabel: 'Address',
                                    id:'address',
                                    width:600,
                                    value:rec?rec.address:null
                                },
                                {
                                    name : 'stateid',
                                    fieldLabel: 'State',
                                    id:'stateid',
                                    xtype:'combobox',
                                    store:Ext.create('MyApp.store.Combo').load({
                                                          params:{propertyId:3}}),/*for State detail id is 6*/
                                    typeAhead: true,
                                    queryMode: 'local',
                                    emptyText: 'Select a State...',
                                    Autoload:true,
                                    valueField :'id',
                                    displayField :'value',
                                    width:600,
                                    value:rec?rec.state:null

                                },
                                {
                                    name : 'cityid',
                                    fieldLabel: 'City',
                                    id:'cityid',
                                    width:600,
                                    value:rec?rec.city:null
                                }
                                
                            ]
                           },   
                           { 
                            title: 'Education',
                            width:620,
                            height:580,     
                            readOnly:true,
                            items:[
                            {
                            xtype:'grid',
                            store:'TeacherQualification',
                            id:'educ_grid',
                            height:580,     
                            title:'Educational Details',
                            vieConfig:{
                               forceFit:true
                            },
                            defaults:{
                            },
                            columns:[
                                 Ext.create('Ext.grid.RowNumberer'),
                                 {
                                 header:'<font color=#17385B><b>Education Level</b></font>',
                                 dataIndex:'educationlevel',
                                 width    :'15%'
                                 },
                                 {
                                 header:'<font color=#17385B><b>Qualification</b></font>',
                                 dataIndex:'qualification',
                                 width    :'15%'
                                 },
                                 {
                                 header:'<font color=#17385B><b>University</b></font>',
                                 dataIndex:'university',
                                 width    :'15%'
                                 },
                                 {
                                 header:'<font color=#17385B><b>College Name</b></font>',
                                 dataIndex:'collegename',
                                 width    :'15%'
                                 },
                                 {
                                 header:'<font color=#17385B><b>Score</b></font>',
                                 dataIndex:'score',
                                 width    :'7%'
                                 },
                                 {
                                 header:'<font color=#17385B><b>Dicipline</b></font>',
                                 dataIndex:'dicipline',
                                 width    :'10%'
                                 },
                                 {
                                 header:'<font color=#17385B><b>Passing Year </b></font>',
                                 dataIndex:'passingyear',
                                 width    :'15%'
                                 }
                               ],
                               tbar :[{
                                    iconCls: 'icon-add',
                                    id     :'addqualif',
                                    text: 'Add Qulification',
                                    scope:this,
                                    listeners:{
                                        render: function(component){
                                            component.getEl().on('click', function(){                    
                                               addqualification(null);
                                            });
                                        }
                                    }
                                },{
                                    iconCls: 'icon-edit',
                                    text: 'Edit',
                                    disabled: true,
                                    hidden:true,
                                    id:'qualifEdit',
                                    scope:this,
                                    handler: function(component){
                                                var rec=Ext.getCmp('educ_grid').getSelectionModel().getSelection()[0];
                                                addqualification(rec);
                                                
                                    }
                                }, {
                                    iconCls: 'icon-delete',
                                    text: 'Delete',
                                    disabled: true,        
                                    id:'qualiDelete',
                                    handler: function(component){
                                        Ext.Msg.confirm("Alert","Are you sure want to delete records", function(btn){
                                        if(btn==='yes'){
                                            var rec=Ext.getCmp('educ_grid').getSelectionModel().getSelection()[0];
                                            var data={
                                                 'tab':'qualification',
                                                 'pid'  :rec.data.pid
                                            };
                                            Ext.Ajax.request({
                                                url:'teacher/delt.do',
                                                type:'json',
                                                headers:{
                                                    'Content-Type':'application/json'
                                                },
                                                params:Ext.JSON.encode(data),
                                                success: function(res){
                                                   var rec = eval('('+res.responseText+')');
                                                   if(rec.bugid!==""){
                                                    Ext.Msg.alert('Success','Record Deleted successfully');
                                                    var grid=Ext.getCmp('educ_grid');
                                                    grid.getStore().remove(grid.getSelectionModel().getSelection());
                                                    }
                                                    else
                                                    Ext.Msg.alert('Failer','Unexpected Error Occured,Please Contact Admin');    
                                                 //   var rec = eval('('+res.responseText+')');
                                                 //   app.getController('Class').getClassStore().add(rec);
                                                }
                                            });
                                            
                                        }
                                    });
                                    }
                                }
                                ],
                                selModel:Ext.create('Ext.selection.CheckboxModel',{
                                singleSelect:true,
                                listeners:{
                                        selectionchange:function(){

                                           //var  button = Ext.getCmp('qualifEdit');
                                           //button.setDisabled(false);
                                           var  delbutton = Ext.getCmp('qualiDelete');
                                           delbutton.setDisabled(false);
                                        }
                                    }
                            })
                             }
                            ]
                           },  
                           {
                            title: 'Skills',
                            width:620,
                            height:580, 
                            hidden:true,
                            items:[ {
                            xtype:'grid',
                            store:'',
                            id:'skill_grid',
                            title:'Skiil',
                            vieConfig:{
                               forceFit:true
                            },
                            defaults:{
                            },
                            columns:[
                                 Ext.create('Ext.grid.RowNumberer'),
                                 {
                                 header:'<font color=#17385B><b>Skill Name</b></font>',
                                 dataIndex:'name',
                                 width    :'25%'
                                 },
                                 {
                                 header:'<font color=#17385B><b>Total Exp</b></font>',
                                 dataIndex:'totexp',
                                 width    :'25%'
                                 },
                                 {
                                 header:'<font color=#17385B><b>From Date</b></font>',
                                 dataIndex:'fromdate',
                                 width    :'25%'
                                 },
                                         
                                 {
                                 header:'<font color=#17385B><b>To Date</b></font>',
                                 dataIndex:'todate',
                                 width    :'25%'
                                 },
                               ],
                               tbar :[{
                                    iconCls: 'icon-add',
                                    id:'skilladd',        
                                    text: 'Add Skill',
                                    listeners:{
                                        render: function(component){
                                            component.getEl().on('click', function(){                    
                                                addNotice(null);
                                            });

                                        }
                                    }
                                },{
                                    iconCls: 'icon-edit',
                                    text: 'Edit Skill',
                                    disabled: true,
                                    id:'skillEdit',
                                    scope:this,
                                    handler: function(component){
                                                var rec=Ext.getCmp('notificationgrid').getSelectionModel().getSelection()[0];
                                                addClasses(rec);
                                    }
                                }, {
                                    iconCls: 'icon-delete',
                                    text: 'Delete Skill',
                                    disabled: true,        
                                    id:'skillDelete',
                                    handler: function(component){
                                        Ext.Msg.confirm("Alert","Are you sure want to delete records", function(btn){
                                        if(btn==='yes'){
                                                  
                                    }
                                    });
                                    }
                                }
                                ]
                             }]
                           },{///InterView Result
                            title: 'Previous Exp',
                            width:620,
                            height:580, 
                            items:[
                                {
                            xtype:'grid',
                            store:'TeacherExp',
                            id:'prevexp_grid',
                            height:580,     
                            title:'Previous Experience',
                            vieConfig:{
                               forceFit:true
                            },
                            defaults:{
                            },
                            columns:[
                                 Ext.create('Ext.grid.RowNumberer'),
                                 {
                                 header:'<font color=#17385B><b>School Name</b></font>',
                                 dataIndex:'schoolname',
                                 width    :'15%'
                                 },
                                 {
                                 header:'<font color=#17385B><b>From Date</b></font>',
                                 dataIndex:'fromdate',
                                 width    :'15%'
                                 },
                                 {
                                 header:'<font color=#17385B><b>To Date</b></font>',
                                 dataIndex:'todate',
                                 width    :'15%'
                                 },
                                 {
                                 header:'<font color=#17385B><b>School Affiliation</b></font>',
                                 dataIndex:'affilatedto',
                                 width    :'15%'
                                 },
                                 {
                                 header:'<font color=#17385B><b>Position Held</b></font>',
                                 dataIndex:'positionheld',
                                 width    :'15%'
                                 },
                                 {
                                 header:'<font color=#17385B><b>City</b></font>',
                                 dataIndex:'city',
                                 width    :'15%'
                                 },
                                 {
                                 header:'<font color=#17385B><b>Country </b></font>',
                                 dataIndex:'country',
                                 width    :'15%'
                                 }
                               ],
                               tbar :[{
                                    iconCls: 'icon-add',
                                    text: 'Add Experience',
                                    id :'expadd',
                                    listeners:{
                                        render: function(component){
                                            component.getEl().on('click', function(){                    
                                                addExp(null);
                                            });
                                        }
                                    }
                                },{
                                    iconCls: 'icon-edit',
                                    text: 'Edit Exp',
                                    disabled: true,
                                    id:'expEdit',
                                    hidden:true,
                                    scope:this,
                                    handler: function(component){
                                                var rec=Ext.getCmp('prevexp_grid').getSelectionModel().getSelection()[0];
                                                addExp(rec);
                                    }
                                }, {
                                    iconCls: 'icon-delete',
                                    text: 'Delete Exp',
                                    disabled: true,        
                                    id:'expDelete',
                                    handler: function(component){
                                        Ext.Msg.confirm("Alert","Are you sure want to delete records", function(btn){
                                        if(btn==='yes'){

                                            //var grid = Ext.getCmp('prevexp_grid');
                                            //grid.getStore().remove(grid.getSelectionModel().getSelection());
                                            var rec=Ext.getCmp('prevexp_grid').getSelectionModel().getSelection()[0];
                                            var data={
                                                 'tab':'expirence',
                                                 'pid'  :rec.data.pid
                                            };
                                            Ext.Ajax.request({
                                                url:'teacher/delt.do',
                                                type:'json',
                                                headers:{
                                                    'Content-Type':'application/json'
                                                },
                                                params:Ext.JSON.encode(data),
                                                success: function(res){
                                                   var rec = eval('('+res.responseText+')');
                                                   if(rec.pid!==""){
                                                    Ext.Msg.alert('Success','Record Deleted successfully');
                                                    var grid=Ext.getCmp('prevexp_grid');
                                                    grid.getStore().remove(grid.getSelectionModel().getSelection());
                                                    }
                                                    else
                                                    Ext.Msg.alert('Failer','Unexpected Error Occured,Please Contact Admin');    
                                                }
                                        }); 
                                        }
                                    });
                                    }
                                }
                                ],
                                selModel:Ext.create('Ext.selection.CheckboxModel',{
                                singleSelect:true,
                                listeners:{
                                        selectionchange:function(){

                                           //var  button = Ext.getCmp('qualifEdit');
                                           //button.setDisabled(false);
                                           var  delbutton = Ext.getCmp('expDelete');
                                           delbutton.setDisabled(false);
                                        }
                                    }
                            })
                             }
                            ]
                           },{
                            title: 'Classes',
                            width:620,
                            height:580, 
                            defaults:{
                                        xtype:'textfield',
                                        labelWidth:200,
                                        height:18
                            },
                            autoLoad:'teacherclasssubject.jsp?teacherid='+SETTING.Users.userId
                           }
                    ]
            }
            
            ],
            buttons :[
            {
                text: 'Save Details',
                action: 'save',
                scope:this,
                listeners:{
                render: function(component){
                component.getEl().on('click', function(){                                        
                  
                var data={  
                            'teacherid' :SETTING.Users.userId,
                            'fullname' 	:Ext.getCmp('fullname').getValue(),   
                            'firstname' 	:Ext.getCmp('firstname').getValue(),
                            'middlename'     	:Ext.getCmp('middlename').getValue(),
                            'lastname'      	:Ext.getCmp('lastname').getValue(),
                            'dob'               :new Date(Ext.getCmp('dob').getValue()).getTime(),
                            'religion'          :Ext.getCmp('religion').getValue(),
                            'nationality'       :Ext.getCmp('nationality').getValue(),
                            'mother_tounge'     :Ext.getCmp('mother_tounge').getValue(),
                            'passport_no'       :Ext.getCmp('passport_no').getValue(),
                            'ssn'               :Ext.getCmp('ssn').getValue(),
                            'visadetail'        :Ext.getCmp('visadetail').getValue(),
                            'uid'               :Ext.getCmp('uid').getValue(),
                            'aadhar_id'         :Ext.getCmp('aadhar_id').getValue(),
                            'fathername'        :Ext.getCmp('fathername').getValue(),
                            'mothername'        :Ext.getCmp('mothername').getValue(),
                            'emailid'     :Ext.getCmp('emailid').getValue(),
                            'alternateemailid'  :Ext.getCmp('alternateemailid').getValue(),
                            'mobilenumber'      :Ext.getCmp('mobile').getValue(),
                            'alternatemobile'   :Ext.getCmp('alternatemobile').getValue(),
                            'address'           :Ext.getCmp('address').getValue(),
                            'stateid'           :Ext.getCmp('stateid').getValue(),
                            'cityid'            :Ext.getCmp('cityid').getValue(),
                            'blood_group'       :Ext.getCmp('blood_group').getValue(),
                            'gender'            :Ext.getCmp('gender').getValue(),
                            'martialstatus'     :Ext.getCmp('martialstatus').getValue(),
                         };                             
                  Ext.Ajax.request({
                    url:'teacher/updte.do',
                    type:'json',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    params:Ext.JSON.encode(data),
                    success: function(res){
                        var rec = eval('('+res.responseText+')');
                        if(rec.result===1){
                        Ext.Msg.alert('Success','Data updated successfully');
                        }
                        else
                        Ext.Msg.alert('Success','Error Occured , Please Contact Administrator');    
                     //   var rec = eval('('+res.responseText+')');
                     //   app.getController('Class').getClassStore().add(rec);
                    }
                });

                 });
                }
              }
            },           
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
   } 
});


function addExp(rec){

      var win = Ext.getCmp('addexp_win');
        if(!win){
            win=Ext.create('Ext.app.view.component.AppWindow', {
                title:'<Font color=red><b>Add New Experience Detail',
                id:rec?'edidexp_win':'addexp_win',
                width:580,
                closeAction:'destroy',
                top:{
                    image:BASE_URL+'resources/images/createuser.png',
                    formTitle:'Create New  Experience'
                },
                defaults:{
                    xtype:'textfield',
                    value:'',
                    width:520
                },
                url:'ppppp',
                formItems :[
                {
                    id:'pid',
                    name:'pid',
                    value:rec?rec.data.pid:null,
                    hidden:true
                },    
                {
                    id:'teacherid',
                    name:'teacherid',
                    value:SETTING.Users.userId,
                    hidden:true
                },{
                    fieldLabel :'School Name',
                    id:'schoolname',
                    name:'schoolname',
                    typeAhead: true
                },    
                {
                    xtype:'combobox',
                    fieldLabel :'School Affiliation',
                    id:'affilatedto',
                    name:'affilatedto',
                    store:Ext.create('MyApp.store.Master').load({
                                          params:{propertyId:33}}),
                    typeAhead: true,
                    queryMode: 'local',
                    emptyText: 'Select Affiliation Level',
                    Autoload:true,               
                    valueField :'id',
                    displayField :'value'
                },{
                    xtype:'datefield',
                    name : 'fromdate',
                    fieldLabel: 'From Date',
                    id:'fromdate',
                    format: 'm d Y',
                    altFormats: 'm-d-Y|m.d.Y'
                 },{
                    xtype:'datefield',
                    name : 'todate',
                    fieldLabel: 'To Date',
                    id:'todate',
                    format: 'm d Y',
                    altFormats: 'm-d-Y|m.d.Y'
                 },{
                    fieldLabel :'Position Held',
                    id:'positionheld',
                    name:'positionheld',
                    typeAhead: true
                },{
                    fieldLabel :'Country',
                    id:'country',
                    name:'country',
                    typeAhead: true
                },{
                    fieldLabel :'City',
                    id:'city',
                    name:'city',
                    typeAhead: true
                },{
                    fieldLabel :'Contact Number',
                    id:'contactno',
                    name:'contactno',
                    typeAhead: true
                },
                {
                    xtype:'textarea',
                    name : 'workprofile',
                    id   : 'workprofile',
                    fieldLabel: 'Work Profile'
                },
                {
                    xtype:'textarea',
                    name : 'reasonofleaving',
                    id   : 'reasonofleaving',
                    fieldLabel: 'Reason of Leaving'
                }
                ],
                buttons :[
                {
                    text: rec?'Edit':'Add',
                    action: 'save',
                    scope:this,
                    handler:saveExp
                },
                {xtype:'btncancel'}
                ]
            });
        }
        win.show();
}
function saveExp(btn){

      var form = btn.up('window').down('form').getForm();
      if(form.isValid()){
            var obj = form.getValues();
            obj.fromdate=new Date(Ext.getCmp('fromdate').getValue()).getTime();
            obj.todate=new Date(Ext.getCmp('todate').getValue()).getTime();
            obj.createdby=SETTING.Users.userId;
            Ext.Ajax.request({
                url:'teacher/addsexp.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    var rec = eval('('+res.responseText+')');
                    if(rec.pid!==""){
                     Ext.Msg.alert('Success','Teacher Qualification added successfully');
                     Ext.getCmp('prevexp_grid').getStore().load({
                                      params:{tchrid:SETTING.Users.userId}}); 
                    }
                    else
                    Ext.Msg.alert('Failer','Unexpected Error Occured,Please Contact Admin');    
                 //   var rec = eval('('+res.responseText+')');
                 //   app.getController('Class').getClassStore().add(rec);
                }
            });
        }
    
}
function addqualification(rec){

      var win = Ext.getCmp('addqualification_win');
                                    if(!win){
                                        win=Ext.create('Ext.app.view.component.AppWindow', {
                                            title:'<Font color=red><b>Add New Qualification',
                                            id:rec?'editqualification_win':'addqualification_win',
                                            width:400,
                                            closeAction:'destroy',
                                            top:{
                                                image:BASE_URL+'resources/images/createuser.png',
                                                formTitle:'Create New  Qualification'
                                            },
                                            defaults:{
                                                xtype:'textfield',
                                                value:'',
                                                width:300
                                            },
                                            url:'ppppp',
                                            formItems :[
                                            {
                                                id:'pid',
                                                name:'pid',
                                                value:rec?rec.data.pid:null,
                                                hidden:true
                                            },    
                                            {
                                                id:'teacherid',
                                                name:'teacherid',
                                                value:SETTING.Users.userId,
                                                hidden:true
                                            },    

                                            {
                                                xtype:'combobox',
                                                fieldLabel :'Education Level',
                                                id:'educationlevel',
                                                name:'educationlevel',
                                                store:Ext.create('MyApp.store.Master').load({
                                                                      params:{propertyId:28}}),
                                                typeAhead: true,
                                                queryMode: 'local',
                                                emptyText: 'Select Education Level',
                                                Autoload:true,               
                                                valueField :'id',
                                                displayField :'value'
                                            },{
                                                xtype:'combobox',
                                                fieldLabel :'Qualification',
                                                id:'qualification',
                                                name:'qualification',
                                                store:Ext.create('MyApp.store.Master').load({
                                                                      params:{propertyId:29}}),
                                                typeAhead: true,
                                                queryMode: 'local',
                                                emptyText: 'Select Qualification',
                                                Autoload:true,               
                                                valueField :'id',
                                                displayField :'value'

                                            },{
                                                xtype:'combobox',
                                                fieldLabel :'University',
                                                id:'university',
                                                name:'university',
                                                store:Ext.create('MyApp.store.Master').load({
                                                                      params:{propertyId:30}}),
                                                typeAhead: true,
                                                queryMode: 'local',
                                                emptyText: 'Select Qualification',
                                                Autoload:true,               
                                                valueField :'id',
                                                displayField :'value'

                                            },{
                                                fieldLabel :'College Name',
                                                id:'collegename',
                                                name:'collegename',
                                                typeAhead: true,

                                            },{
                                                xtype:'combobox',
                                                fieldLabel :'Score Type',
                                                id:'scoretype',
                                                name:'scoretype',
                                                store:Ext.create('MyApp.store.Master').load({
                                                                      params:{propertyId:32}}),
                                                typeAhead: true,
                                                queryMode: 'local',
                                                emptyText: 'Select Score Type',
                                                Autoload:true,               
                                                valueField :'id',
                                                displayField :'value'
                                            },{
                                                fieldLabel :'Score',
                                                id:'score',
                                                name:'score',
                                                typeAhead: true,

                                            },{
                                                xtype:'combobox',
                                                fieldLabel :'Decipline',
                                                id:'dicipline',
                                                name:'dicipline',
                                                store:Ext.create('MyApp.store.Master').load({
                                                                      params:{propertyId:31}}),
                                                typeAhead: true,
                                                queryMode: 'local',
                                                emptyText: 'Select Decipline',
                                                Autoload:true,               
                                                valueField :'id',
                                                displayField :'value'

                                            },{
                                                xtype:'datefield',
                                                name : 'passingyear',
                                                fieldLabel: 'Passing Date',
                                                id:'passingyear',
                                                format: 'm d Y',
                                                altFormats: 'm-d-Y|m.d.Y'
                                             }
                                             
                                            ],
                                            buttons :[
                                            {
                                                text: rec?'Edit':'Add',
                                                action: 'save',
                                                scope:this,
                                                handler:saveEducation
                                            },
                                            {xtype:'btncancel'}
                                            ]
                                        });
                                    }
                                    win.show();
}

function saveEducation(btn){

      var form = btn.up('window').down('form').getForm();
      if(form.isValid()){
            var obj = form.getValues();
            obj.passingyear=new Date(Ext.getCmp('passingyear').getValue()).getTime();
            obj.createdby=SETTING.Users.userId;
            Ext.Ajax.request({
                url:'teacher/addqualif.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    var rec = eval('('+res.responseText+')');
                    if(rec.pid!==""){
                     Ext.Msg.alert('Success','Teacher Qualification added successfully');
                     Ext.getCmp('educ_grid').getStore().load({
                                      params:{tchrid:SETTING.Users.userId}}); 
                    }
                    else
                    Ext.Msg.alert('Failer','Unexpected Error Occured,Please Contact Admin');    
                 //   var rec = eval('('+res.responseText+')');
                 //   app.getController('Class').getClassStore().add(rec);
                }
            });
        }
}

function  download(pid){
    
  var obj;
  obj.pid=pid;
  Ext.Ajax.request({
                url:'homework/download.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                   
                }
  });
}

function savebug(btn){
    
    var form = btn.up('window').down('form').getForm();
      if(form.isValid()){
            var obj = form.getValues();
            Ext.Ajax.request({
                url:'master/addbug.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    var rec = eval('('+res.responseText+')');
                    if(rec.bugid!==""){
                     Ext.Msg.alert('Success','Bug added successfully');

                    }
                    else
                    Ext.Msg.alert('Failer','Unexpected Error Occured,Please Contact Admin');    
                 //   var rec = eval('('+res.responseText+')');
                 //   app.getController('Class').getClassStore().add(rec);
                }
            });
        }
}

function contactadmin(btn){

      var form = btn.up('window').down('form').getForm();
      if(form.isValid()){
            var obj = form.getValues();
            Ext.Ajax.request({
                url:'master/cntadmn.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    var rec = eval('('+res.responseText+')');
                    if(rec.result!=='1'){
                     Ext.Msg.alert('Success','Email has been sent to administrator successfully');
                    }
                    else
                    Ext.Msg.alert('Failer','Unexpected Error Occured,Please Contact Admin');    
                }
            });
        }
}
////Called from Teacher Digital Dairy
function replyToParent(id){
    var win;
    if(!win){
        win = Ext.create('Ext.window.Window', {
            title:'Reply from Parent',
            id: 'replytoparent',
            width:600,
            height:400,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/portal-icon/reply2parent.jpg',
                formTitle:'Reply to Parent'
            },
            defaults:{
                xtype:'textfield',
                value:''
            },
            items :[{
                    xtype: 'panel',
                    style:'background:white',    
                    width:600,
                    height:350,                            
                    layout: {
                      type: 'vbox',       // Arrange child items vertically
                      align: 'stretch',    // Each takes up full width
                      padding: 5
                    },
                    items:[{               
                        xtype: 'grid',
                        height :200,
                        id     :'chatgrid', 
                        columns: [{
                                header: '<b>From</b>',
                                dataIndex:'username',
                                width : '5%',
                                renderer:function(value,meta,record){
                                    if(record.data.res_from=='Parent')
                                       return '<img height="15px" width="20px" src="'+BASE_URL+'resources/images/portal-icon/parent.jpg">';
                                    else
                                       return '<img height="15px" width="20px" src="'+BASE_URL+'resources/images/portal-icon/teacher.jpg">';
                                }
                        },{
                                header: '<b>Name</b>',
                                dataIndex:'username',
                                width : '20%',
                                renderer:function(value){
                                    return '<b>'+value+'</b>'
                                }
                        },
                        {
                                header: '<b>Comment</b>',
                                width : '50%',
                                dataIndex:'text'
                        },
                                                {
                                header: '<b>On Date</b>',
                                width : '23%',
                                dataIndex:'ondate'
                        }
                        ],            
                        store:Ext.StoreManager.lookup('ReplyOnStudentDairy').load({
                                      params:{pid:id,
                                              userid:SETTING.Users.userId     
                                }
                        })        

                    }, {
                        xtype: 'splitter'   
                    }, {                    
                        title: '<font color=red><b>Reply to Parent</b></font>',
                        bodyPadding: 5,
                        items: [{
                            xtype: 'textarea',
                            height:90,
                            width:570,
                            id   :'comment',
                            emptyText:'Write to Student Dairy',
                            allowBlank: false
                        }],
                        flex: 1            
                    }
                    ]
            }
            
            ],
            buttons :[
            {
                text: 'Send',
                action: 'save',
                scope:this,
                listeners:{
                render: function(component){
                component.getEl().on('click', function(){                                        
                
                if(Ext.getCmp('comment').getValue()!=null){    
                var data={  
                          'text':Ext.getCmp('comment').getValue(),
                          'userid' :SETTING.Users.userId,
                          'ddid'    :id
                         };                             
                  Ext.Ajax.request({
                    url:'digitaldairy/addcommentonstuddairy.do',
                    type:'json',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    params:Ext.JSON.encode(data),
                    success: function(res){
                        var rec = eval('('+res.responseText+')');
                        if(rec.replyid!=null){
                          
                          Ext.getCmp('chatgrid').getStore().load({
                                      params:{pid:id,
                                              userid:SETTING.Users.userId     
                                }
                        })        ;  
                          Ext.Msg.alert('Success','Comment added successfully');
                          Ext.getCmp('comment').setValue("");
                        }
                        else
                        Ext.Msg.alert('Warning','Error Occured , Please Contact Administrator');    
                    }
                });
                }
                });
                }
              }
            },           
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
}

function saveSettings(btn){
      var form = btn.up('window').down('form').getForm();
      if(form.isValid()){
            var obj = form.getValues();
            obj.createdby=SETTING.Users.userId;
            obj.modifiedby=SETTING.Users.userId;
            Ext.Ajax.request({
                url:'user/accntsetng.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    var rec = eval('('+res.responseText+')');
                    if(rec==1){
                     Ext.Msg.alert('Success','Account Setting Saved successfully');
                    }
                    else
                    Ext.Msg.alert('Failer','Unexpected Error Occured,Please Contact Admin');    
                 //   var rec = eval('('+res.responseText+')');
                 //   app.getController('Class').getClassStore().add(rec);
                }
            });
        }
    } 
    
function changePassword(btn) {

      var form = btn.up('window').down('form').getForm();
      if(form.isValid()){
            var obj = form.getValues();
            Ext.Ajax.request({
                url:'user/chngpaswd.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    var rec = eval('('+res.responseText+')');
                    if(rec.value==1){
                     Ext.Msg.alert('Success','Your Password Has been changed successfully');
                    }
                    else
                    Ext.Msg.alert('Failer','Unexpected Error Occured,Please Contact Admin');    
                 //   var rec = eval('('+res.responseText+')');
                 //   app.getController('Class').getClassStore().add(rec);
                }
            });
        }
}   

function showReports(){
       var app1=app.getController('Dashboard')
       var obj=Ext.getCmp("misreportboard"); 
        if(obj==null){
                var obj = Ext.create('MyApp.view.misreport.MisReportBoard');
                app1.getDashboard().add(obj);
                app1.getDashboard().setActiveTab(obj);  
        }
        else
        {
            app1.getDashboard().setActiveTab(obj);  
        }

   }     


function showMoreNotification(){

    Ext.StoreMgr.lookup('Notification').load();  
    var app1=app.getController('Dashboard');
    var obj=Ext.getCmp("notificationgrid"); 
        if(obj==null){
                var obj = Ext.create('MyApp.view.notice.Notification');
                app1.getDashboard().add(obj);
                app1.getDashboard().setActiveTab(obj);         
        }
        else
        {
            app1.getDashboard().setActiveTab(obj);         
        }

    
}

function removeAdmissionFee(fee_structure_id){

    var grid = Ext.getCmp('payadissionfeewindow');
    grid.getStore().remove(grid.getSelectionModel().getSelection());
}