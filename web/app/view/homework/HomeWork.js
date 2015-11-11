function viewNotice(rec){
        
        var store=  Ext.getStore('Notification');
                
        Ext.create('MyApp.view.notice.NoticeViewWindow',{
            title:'School Notice Board',
            noticeView:rec
        }).show();
    
}

function StudentStatus(rec){
   
   /* Ext.StoreManager.lookup('StudentHomeWorkStatus').load({
         params:{pid:rec.data.pid
         }
       });*/
    
    var win;
    if(!win){
        win=Ext.create('Ext.window.Window', {
            title:'Student HomeWork Status:<b><font color=red>'+rec.data.classname+'</font></b><b><font color=red> : Subject -'+rec.data.subject+'</font></b>',
            id:'studenthwstatus',
            width:600,
            height:300,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:'<b><font color=red>'+rec.data.classname+'</font></b><b><font color=red> : Subject -'+rec.data.subject+'</font></b>'
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
                        xtype:Ext.create('MyApp.view.homework.StudentHomeWorkStatus'),                        
                        store:Ext.StoreManager.lookup('StudentHomeWorkStatus').load({
                                      params:{pid:rec.data.pid}
                        })
                  }]
              } 
            ],
            buttons :[
            {
                text: 'Save',
                action: 'save',
                scope:this,
                listeners:{
                render: function(component){
                component.getEl().on('click', function(){                                        
                    saveStudentHWStatus(rec);
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


function saveStudentHWStatus(rec){

      var classid=rec.data.classid;
      var records = Ext.StoreManager.lookup('StudentHomeWorkStatus').getModifiedRecords();     
      var data = [];
            Ext.each(records, function(rec1){
                rec1.data.classid=classid;
                if(rec1.data.status===true)
                   rec1.data.status=1; 
                 else
                   rec1.data.status=0;   
                data.push(rec1.data);                
            });
   
            Ext.Ajax.request({
                url:'homework/markcompleted.do',
                type:'json',
                scope:this,
                headers:{
                    'Content-Type':'application/json'  
                },
                params:Ext.JSON.encode(data),
                success: function(res){
                    Ext.Msg.alert('Success','Student Homework Saved successfully');
                    var rec = eval('('+res.responseText+')');
                }
            });

}

function addHomework(rec,classid,sessionid){

    var win = Ext.getCmp('homework_win');
    if(!win){//Ext.app.view.component.AppWindow
        win=Ext.create('Ext.app.view.component.AppWindow', {
            title:'<font color=#17385B><b>Student Homework Management</b></font>',
            id:rec?'edithomework_win':'addhomework_win',
            width:400,                       
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/portal-icon/homework.png',
                formTitle:'Create New Homework For Class'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:300
            },
            url:'ppppp',
            formItems :[
            {
                name : 'createdby',
                id:'createdby',
                hidden:true,
                value:SETTING.Users.userId
            },{
                name : 'modifiedby',
                id:'modifiedby',
                hidden:true,
                value:SETTING.Users.userId
            },    
            {
                xtype:'combobox',
                fieldLabel :'Subject',
                id:'hwsubject',
                name:'hwsubject',
                store:Ext.create('MyApp.store.ClassSubjectCombo').load({
                                      params:{  propertyId:1,///Get Subject list teacher tought
                                                classid   :Ext.getCmp('hwclasscombo').getValue(),
                                                teacherid :SETTING.Users.userId,
                                                sessionid :SETTING.Users.properties.session_id
                         }}),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Subject',
                Autoload:true,               
                valueField :'id',
                displayField :'value'
            },
            {
                name : 'classid',
                fieldLabel: 'classid',
                id:'classid',
                hidden:true,
                value:classid
            },{
                name : 'sessionid',
                fieldLabel: 'sessionid',
                id:'sessionid',
                hidden:true,
                value:sessionid
            },
            {
                name : 'title',
                fieldLabel: 'HomeWork Title',
                id:'title'
            },{
                xtype   : 'textareafield',
                grow    : true,
                name : 'description',
                fieldLabel: 'Description',
                id:'description'
            },{
                xtype:'datefield',
                name : 'activatedate',
                fieldLabel: 'Homework Start Date',
                id:'activatedate',
                format: 'm d Y',
                altFormats: 'm-d-Y|m.d.Y'
                },{
                xtype:'datefield',
                name : 'endactivatedate',
                fieldLabel: 'Submission Due Date',
                id:'endactivatedate',
                format: 'm d Y',
                altFormats: 'm-d-Y|m.d.Y'
                },
                {
                xtype:'combobox',
                fieldLabel :'Status',
                id:'status',
                name:'status',
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:12}}),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Status',
                Autoload:true,               
                valueField :'id',
                displayField :'value'
            },{
                xtype: 'fileuploadfield',
                fieldLabel :'Upload File',
                id:'file',
                name:'file',
                buttonText: '',
                buttonConfig: {
                iconCls: 'upload-icon'
            }
            },{
                xtype:'checkbox',
                fieldLabel :'Send Notification to Parent',
                id:'notification',
                name:'notification'
            }
            ],
            buttons :[
            {
                text: rec?'Edit':'Add',
                action: 'save',
                scope:this,
                handler:saveHomework
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
}

function saveHomework(btn){
    
     var form = btn.up('window').down('form').getForm();
     if(form.isValid()){
           form.submit({
                    url: 'homework/add.do',
                    success: function(fp, o) {
                    Ext.example.msg('Success','Homework Added Successfully');
                    var classid=Ext.getCmp('hwclasscombo').getValue();                    
                    var sessionid=Ext.getCmp('hwsessioncombo').getValue();    
                    if(sessionid!=null && classid!=null)
                     {
                         Ext.StoreManager.lookup('HomeWork').load({
                                params:{sessionid:sessionid,
                                        classid:classid,
                                        createdby:SETTING.Users.userId
                                }
                         });
                     }
                    },
                    failure: function(fp, o) {
                        Ext.example.msg('Failure','Unexpected Error Occured,Please Contact Administrator');
                    }
          }); 
      }
}

Ext.define('MyApp.view.homework.HomeWork' ,{
    extend: 'Ext.grid.Panel',
    closable:true,
    title: 'Student HomeWork Management',
    id:'homeworkgrid',
    layout:'fit',
    alias: 'widget.homework',
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },    
    store:'HomeWork',
    uses:['MyApp.view.homework.StudentHomeWorkStatus'],
    initComponent: function() {

    this.columns=[
    Ext.create('Ext.grid.RowNumberer'),
    {
        header: 'id',
        dataIndex:'id',
        hidden   :true,
        style :'color:#17385B;font-weight:bold'
    },{
        header: '<font color=#17385B><b>Subject</b></font>',
        dataIndex:'subject',
        width : '10%',        
        renderer : function(value){
                  return '<b>'+value+'</b>';
            }   ,
        style :'color:#17385B;font-weight:bold'
    },
    {
        header: '<font color=#17385B><b>Title</b></font>',
        dataIndex:'title',
        width : '10%',        
        style :'color:#17385B;font-weight:bold'
    },
    {
        header:'<font color=#17385B><b>Valid From</b></font>',
        dataIndex:'assigndate',        
        width : '8%',        
        style :'color:#17385B;font-weight:bold'
    },{
        header:'<font color=#17385B><b>Valid To </b></font>',
        dataIndex:'duedate',
        width : '8%',        
        style :'color:#17385B;font-weight:bold'
        
    },{
        header:'<font color=#17385B><b>Status</b></font>',
        dataIndex:'status',
        width : '8%',        
        style :'color:#17385B;font-weight:bold',
        renderer : function(value){
            	  if(value==='Active') 
                  return '<font color=green><b>'+value+'</font></b>';
                  else
                  return '<font color=red><b>'+value+'</font></b>';    
            }       
        
    },{
        header:'<font color=#17385B><b>Created By</b></font>',
        dataIndex:'createdby',
        width : '8%',        
        style :'color:#17385B;font-weight:bold'
        
    },{
        header:'<font color=#17385B><b>Created On</b></font>',
        dataIndex:'createdon',
        width : '10%',        
        style :'color:#17385B;font-weight:bold'
    },
        {
        header:'<font color=#17385B><b>Description</b></font>',
        dataIndex:'description',
        width : '20%',        
        style :'color:#17385B;font-weight:bold'
    },
    {
        header:'<font color=#17385B><b>Download Attachement</b></font>',
        dataIndex:'attachmentpath',
        style :'color:#17385B;font-weight:bold',
        width : '14%',        
        renderer : function(value,metadata,record){
            	  if(value=='') 
                  return '<font color=green><b>'+'N/A'+'</font></b>';
                  else{
                    var val='"'+record.data.pid+'"'; 
                  return '<a href="#" onclick=download('+val+');><font color=red><b>'+value+'</font></b></a>';    
                  }                   
            } 
    }
    ];
    this.selModel=Ext.create('Ext.selection.CheckboxModel',{
        singleSelect:true,
        listeners:{
                selectionchange:function(sm){

                   Ext.getCmp('hwDelete').setDisabled((sm.getCount()==0));
                   Ext.getCmp('hwEdit').setDisabled((sm.getCount()==0));
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
       emptyText: 'Select Session',
       text   : 'Session',
       id:'hwsessioncombo',
       store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:6}}),//For Teacher
       typeAhead: true,
       width : 100,        
       queryMode: 'local',
       Autoload:true,
       valueField :'id',
       displayField :'value',
       value:SETTING.Users.properties.session_id,
        listeners:{
            select: function(component){
                var sessionid=Ext.getCmp('hwsessioncombo').getValue();                
               
                
                Ext.getCmp('hwclasscombo').getStore().load({
                     params:{
                             propertyId:2,///Class List
                             classid   :sessionid,
                             teacherid :SETTING.Users.userId
                     }
               });
               
            }
       }
    },{
       xtype: 'combo',
       emptyText: 'Select Class',
       text   : 'Class',
       id:'hwclasscombo',
       store:Ext.create('MyApp.store.ClassCombo1').load({
                                      params:{
                                          propertyId:2,
                                          classid   :SETTING.Users.properties.session_id,
                                          teacherid :SETTING.Users.userId
                                      }}),
       typeAhead: true,
       width :100,                
       queryMode: 'local',
       Autoload:true,       
       valueField :'id',
       displayField :'value',  
       listeners:{
            select: function(component){
           }
       }
    },{
        iconCls: 'icon-add',
        text: 'View HomeWork',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                    var classid=Ext.getCmp('hwclasscombo').getValue();                    
                    var sessionid=Ext.getCmp('hwsessioncombo').getValue();    
                    if(sessionid!=null && classid!=null)
                     {
                         Ext.StoreManager.lookup('HomeWork').load({
                                params:{sessionid:sessionid,
                                        classid:classid,
                                        createdby:SETTING.Users.userId
                                }
                         });
                     }
                    else
                     Ext.Msg.alert('Warning','Please Select Session & Class');   
               });

            }
        }
    },{
        iconCls: 'icon-add',
        text: 'Add HomeWork',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                    
                    var classid=Ext.getCmp('hwclasscombo').getValue();                    
                    var sessionid=Ext.getCmp('hwsessioncombo').getValue();                    
                    if(sessionid!=null && classid!=null)
                     addHomework(null,classid,sessionid);
                    else
                     Ext.Msg.alert('Warning','Please Select Session & Class');   
                });

            }
        }
    },{
        iconCls: 'icon-edit',
        text: 'Edit HomeWork',
        disabled: true,
        id:'hwEdit',
        scope:this,
        handler: function(component){
                    var rec=Ext.getCmp('homeworkgrid').getSelectionModel().getSelection()[0];
                 
                    //studentHomeWorkStatus(rec);
        }
    }, {
        iconCls: 'icon-delete',
        text: 'Delete HomeWork',
        disabled: true,        
        id:'hwDelete',
        handler: function(component){
            Ext.Msg.confirm("Alert","Are you sure want to delete records", function(btn){
            if(btn==='yes'){
                var grid = Ext.getCmp('notificationgrid');
                grid.getStore().remove(grid.getSelectionModel().getSelection());
            }
        });
        }
    },{
        iconCls: 'icon-add',
        text: 'Student HomeWork Status',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                    var rec=Ext.getCmp('homeworkgrid').getSelectionModel().getSelection()[0];
                    if(rec.data.pid!=null)
                       StudentStatus(rec);
                    else
                     Ext.Msg.alert('Warning','Please Select HomeWork form List');   
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




