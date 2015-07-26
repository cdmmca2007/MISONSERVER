function viewNotice(rec){
        
        var store=  Ext.getStore('Notification');
                
        Ext.create('MyApp.view.notice.NoticeViewWindow',{
            title:'School Notice Board',
            noticeView:rec
        }).show();
    
}

function addRequest(rec){

    var win = Ext.getCmp('arta_win');
    if(!win){
        win=Ext.create('Ext.app.view.component.AppWindow', {
            title:'<Font color=red><b>Attendance Management',
            id:rec?'editnotification_win':'addnotification_win',
            width:400,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:'Create Attendance Request for Missed Attendance'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:300
            },
            url:'',
            formItems :[
            {
                name :'studentid',
                id:'studentid',
                hidden:true,
                value:Ext.getCmp('artastudentcombo').getValue()
            },{
                name : 'sessionid',
                id:'sessionid',
                hidden:true,
                value:SETTING.Users.properties.session_id
            },{
                name : 'classid',
                id:'classid',
                hidden:true,
                value:SETTING.Users.properties.class_id
            },            {
                name : 'createdby',
                id:'createdby',
                hidden:true,
                value:SETTING.Users.userId
            },     
            {
                name : 'studentname',
                fieldLabel: 'Student Name',
                id:'studentname',
                value:Ext.getCmp('artastudentcombo').getRawValue(),
                readOnly:true
            },{
                xtype:'datefield',
                name : 'attendencefromdate',
                fieldLabel: 'Mark Attendance From',
                id:'attendencefromdate',
                format: 'm d Y',
                altFormats: 'm-d-Y|m.d.Y'
                },{
                xtype:'datefield',
                name : 'attendencetodate',
                fieldLabel: 'Mark Attendance To',
                id:'attendencetodate',
                format: 'm d Y',
                altFormats: 'm-d-Y|m.d.Y'
                },
                {
                xtype:'combobox',
                fieldLabel :'Attendance Status',
                id:'markattendencestatus',
                name:'markattendencestatus',
                store:Ext.create('Ext.data.Store', {
                fields: ['id', 'value'],
                data : [
                        {"id":"1","value":"Present"},
                        {"id":"2","value":"Absent"}
                    ]
                    }),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Status',
                Autoload:true,               
                valueField :'id',
                displayField :'value'
            },{
                xtype:'textarea',
                name : 'reason',
                fieldLabel: 'Reason for Late Request',
                id:'reason'
            }
            ],
            buttons :[
            {
                text: rec?'Edit':'Add',
                action: 'save',
                scope:this,
                handler:saveArta
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
}


function editRequest(rec){
    
    var win = Ext.getCmp('artaedit_win');
    if(!win){
        win=Ext.create('Ext.app.view.component.AppWindow', {
            title:'<Font color=red><b>Attendance Management',
            id:'artaedit_win',
            width:400,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:'Edit Attendance Request for Missed Attendance'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:300
            },
            url:'',
            formItems :[
            {
                name :'pid',
                id:'pid',
                hidden:true,
                value:rec.data.pid
            },{
                name : 'classname',
                id:'classname',
                value:Ext.getCmp('atracombo').getRawValue(),
                readOnly:true,
                fieldLabel:'Class'
            },{
                name : 'modifiedby',
                id:'modifiedby',
                value:SETTING.Users.userId,
                hidden:true
            },{
                name : 'createdby',
                id:'createdby',
                value:rec.data.createdby,
                readOnly:true,
                fieldLabel:'Requester Name'
            },     
            {
                name : 'studentname',
                fieldLabel: 'Student Name',
                id:'studentname',
                value:rec.data.studentname,
                readOnly:true
            },{
                xtype:'combobox',
                fieldLabel :'Select Request Status',
                id:'requeststatus',
                name:'requeststatus',                
                store:Ext.create('Ext.data.Store', {
                fields: ['id', 'value'],
                        data : [
                        {"id":"0","value":"Pending"},
                        {"id":"1","value":"Completed"},
                        {"id":"2","value":"Rejected"}
                    ]
                    }),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Request Status.... ',
                Autoload:true,
                valueField :'id',
                displayField :'value',
                listeners:{
                    select: function(component){                        
                    
                    }
               }
            },{
                xtype:'textarea',
                name : 'reason',
                fieldLabel: 'Reason for Late Request',
                id:'reason'
            }
            ],
            buttons :[
            {
                text: 'Add',
                action: 'save',
                scope:this,
                handler:editArta
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
}

function editArta(btn){
    
     var form = btn.up('window').down('form').getForm();
     if(form.isValid()){
            var obj = form.getValues();
            
            Ext.Ajax.request({
                url:'arta/adminedit.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    var rec = eval('('+res.responseText+')');
                    if(rec===1) {                       
                    Ext.Msg.alert('Success','Attendance Request Edited successfully');
                    
                    }
                    else
                    Ext.Msg.alert('Failure','Unexpected Error Occured , Please Contact Admin');                 
                }
            });
        }
}


function saveArta(btn){
    
      var form = btn.up('window').down('form').getForm();
     if(form.isValid()){
            var obj = form.getValues();
            
            obj.attendencefromdate=new Date(obj.attendencefromdate).getTime();        
            obj.attendencetodate=new Date(obj.attendencetodate).getTime();        
            
            Ext.Ajax.request({
                url:'arta/add.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    var rec = eval('('+res.responseText+')');
                    if(rec===1) {                       
                    Ext.Msg.alert('Success','Attendance Request added successfully');
                    ///Ext.getCmp('notificationgrid').getStore().reload(); 
                    }
                    else
                    Ext.Msg.alert('Failure','Unexpected Error Occured , Please Contact Admin');                 
                }
            });
        }
}

Ext.define('MyApp.view.leave.AttendenceRequestToAdmin' ,{
    extend: 'Ext.grid.Panel',
    closable:true,
    title: 'Attendence Request To Admin',
    id:'artmgrid',
    layout:'fit',
    alias: 'widget.artmgrid',
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },    
    store:'AttendenceRequestToAdmin',
    
    initComponent: function() {

    this.columns=[
    Ext.create('Ext.grid.RowNumberer'),
    {
        header: 'pid',
        dataIndex:'pid',
        hidden   :true
    },
    {
        header: '<font color=#17385B><b>Class</b></font>',
        dataIndex:'classname',
        width    :'8%',
        hidden:true
    },
    {
        header: '<font color=#17385B><b>Student</b></font>',
        dataIndex:'studentname',
        width    :'15%'
    },

    {
        header:'<font color=#17385B><b>From Date</b></font>',
        dataIndex:'attendencefromdate',
        width    :'12%'
    },

    {
        header:'<font color=#17385B><b>To Date</b></font>',
        dataIndex:'attendencetodate',
        width    :'12%'
    },{
        header:'<font color=#17385B><b>Request Status</b></font>',
        dataIndex:'requeststatustext',        
        width    :'15%',
        flex: 1
    },{
        header:'<font color=#17385B><b>Reason </b></font>',
        dataIndex:'reason',
        width    :'25%'
        
    },{
        header:'<font color=#17385B><b>Created By</b></font>',
        dataIndex:'createdby',
        width    :'10%'
        
    },{
        header:'<font color=#17385B><b>Created On</b></font>',
        dataIndex:'createdon',
        width    :'10%'
    }

    ];
    this.selModel=Ext.create('Ext.selection.CheckboxModel',{
        singleSelect:true,
        listeners:{
                selectionchange:function(){

                   var  button = Ext.getCmp('noticeEdit');
                   button.setDisabled(false);
                   var  delbutton = Ext.getCmp('noticeDelete');
                   delbutton.setDisabled(false);
                }
            }
    });
    this.tbar =[{
        xtype: 'searchfield',
        store: Ext.create('Ext.data.Store', {
            autoLoad: false,
            fields:['id','name'],
            proxy: {
                type: 'ajax',
                url: 'users.json',
                reader: {
                    type: 'json',
                    root: 'users'
                }
            }
        })
    },{
       xtype: 'combo',
       emptyText: 'Select Class',
       text   : 'Class',
       id:'atracombo',
       hidden:SETTING.Users.roleId===1 || SETTING.Users.roleId===2?false:true,
       store:Ext.create('MyApp.store.ClassCombo1').load({
                                      params:{propertyId:2,
                                              classid:SETTING.Users.properties.session_id,
                                              teacherid :SETTING.Users.userId
                                    }}),
       typeAhead: true,
       queryMode: 'local',
       Autoload:true,
       valueField :'id',
       displayField :'value',  
       listeners:{
            select: function(component){
                var classid  =Ext.getCmp('atracombo').getValue();

                if(classid!=null)    
                {
                     Ext.getCmp('artmgrid').getStore().load({
                     params:{                             
                             classid   :classid,
                             studentid :null,
                             createdby :SETTING.Users.userId,
                             sessionid :SETTING.Users.properties.session_id        
                     }
                     });
                }    
            }
       }
    },{
       xtype: 'combobox',
       width:110,                
       emptyText: 'Select Student',
       text   : 'Student',
       id:'artastudentcombo',
       hidden:SETTING.Users.roleId===3?false:true,
       store:Ext.create('MyApp.store.ClassCombo').load({
                     params:{
                             propertyId:7,
                             classid   :SETTING.Users.properties.class_id+'&'+SETTING.Users.properties.session_id,
                             teacherid :SETTING.Users.userId
                     }
               }),
       typeAhead: true,
       queryMode: 'local',
       Autoload:true,
       valueField :'id',
       displayField :'value',  
       listeners:{
            select: function(component){

                
                var studentid  =Ext.getCmp('artastudentcombo').getValue();
                
                Ext.getCmp('artmgrid').getStore().load({
                    params:{                            
                             classid   :SETTING.Users.properties.class_id,
                             studentid :studentid,
                             createdby :SETTING.Users.userId,
                             sessionid :SETTING.Users.properties.session_id        
                     }
               });

            }
       }
    },{
        iconCls: 'icon-add',
        text: 'Create Attendance Request',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                    addRequest(null);
                });

            }
        }
    },{
        iconCls: 'icon-edit',
        text: 'Edit Request',
        hidden: SETTING.Users.roleId===1?false:true,
        id:'noticeEdit',
        scope:this,
        handler: function(component){
                    var rec=Ext.getCmp('artmgrid').getSelectionModel().getSelection()[0];
                    editRequest(rec);
        }
    },{
        iconCls: 'icon-edit',
        text: 'Cancel Request',
        disabled: true,
        id:'cancelbtn',
        scope:this,
        handler: function(component){
                    var rec=Ext.getCmp('notificationgrid').getSelectionModel().getSelection()[0];
                    addClasses(rec);
        }
    },{
       xtype: 'checkboxfield',
       boxLabel   : '<font color=red><b>Pending</b></font>',
       id:'artapendingcheck',
       ///hidden:SETTING.Users.roleId===3?false:true,
       listeners:{
            select: function(component){
        }
       }
    },{
       xtype: 'checkboxfield',
       boxLabel   : '<font color=blue><b>Rejected</b></font>',
       id:'artarejectedcheck',
       ///hidden:SETTING.Users.roleId===3?false:true,
       listeners:{
            select: function(component){
            }
       }
    },{
       xtype: 'checkboxfield',
       boxLabel   : '<font color=green><b>Completed</b></font>',
       id:'artacomplcheck',
       ///hidden:SETTING.Users.roleId===3?false:true,
       listeners:{
            select: function(component){
            }
       }
    },{
        xtype:'splitbutton',
        text:'Send Notification',
        arrowAlign:'right',
        menu: [{text: 'By Email'},{text: 'By SMS'}],
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    //addFeeTemplate();
                    });

            }
        }
    
    }
    ];
    this.bbar = Ext.create('Ext.PagingToolbar', {
        store: this.store,
        displayInfo: true,
        displayMsg: 'Displaying users {0} - {1} of {2}',
        emptyMsg: "No user to display",
        items:[{
        xtype:'button',
        text:'Print',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    //addFeeTemplate();
                    })

            }
        }
    },{
        xtype:'splitbutton',
        text:'Export Data',
        arrowAlign:'right',
        menu: [{text: 'PDF'},{text: 'Excelsheet'}],
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    //addFeeTemplate();
                    });

            }
        }
    
    }]
    });
    this.callParent(arguments);
    },
    onRender : function(){
        //this.selModel.on('selectionchange', this.onSelectChange);
        this.callParent(arguments);
    },
    selectionchange : function(sm, selected,eOpts){
        if(sm.getCount()){
              
    }
    }
});




