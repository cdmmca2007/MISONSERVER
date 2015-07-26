function addClasses(rec,sessionid,session){
    
    var win = Ext.getCmp('class_win');
    if(!win){
        win=Ext.create('Ext.app.view.component.AppWindow', {
            title:rec?'Edit Class Form':'Add New Class Form for Session :<font color=green><b>'+session+'</b></font>',
            id:rec?'editfeestructure_win':'addfeestructure_win',
            width:400,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:'Create Class Data'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:300
            },
            url:'ppppp',
            formItems :[
            {
                name : 'batch_id',
                fieldLabel: 'batch Name',
                value:rec===null?null:rec.data.batch_id,
                hidden:true
            },{
                name : 'sessionid',
                fieldLabel: 'session Name',
                value:sessionid,
                hidden:true
            },{
                name : 'classid',
                fieldLabel: 'classid',
                value:rec?rec.data.classid:null,
                hidden:true
            },
            {
                name : 'year',
                fieldLabel: 'session year',
                value:Ext.getCmp('hwsessioncombo').getRawValue(),
                hidden:true
            },
            {
                xtype:'combobox',
                fieldLabel :'Select Class',
                id:'classlevel',
                name:'classlevel',                
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:18}}),//For Class
                typeAhead: true,
                queryMode: 'local',
                readOnly:rec?true:false,
                hidden:rec?true:false,
                emptyText: 'Select a Class.... ',
                Autoload:true,
                valueField :'id',
                displayField :'value',
                listeners:{
                    select: function(component){                        
                    Ext.getCmp('name').setValue(Ext.getCmp('classlevel').getRawValue());
                    }
               }
                
            },
            
            {
                xtype:'combobox',
                fieldLabel :'Select Section',
                id:'classsection',
                name:'classsection', 
                hidden:rec?true:false,
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:19}}),//For Section
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select a Section....',
                Autoload:true,
                readOnly:rec?true:false,
                valueField :'id',
                displayField :'value',
                listeners:{
                    select: function(component){
                    Ext.getCmp('name').setValue(Ext.getCmp('classlevel').getRawValue()+'-'+Ext.getCmp('classsection').getRawValue());
                    }
               }
            },
            {
                name : 'name',
                fieldLabel: 'Class Name',
                id:'name',
                readOnly:true
            },{
                xtype:'combobox',
                fieldLabel :'Class Teacher',
                id:'classteacher',
                name:'classteacher',                
                store:Ext.create('MyApp.store.Combo').load({
                                      params:{propertyId:5}}),//For Teacher
                queryMode: 'local',
                emptyText: 'Select a Class Teacher...',
                Autoload:true,
                valueField :'id',
                displayField :'value',
                value:rec?rec.data.class_teacher:null
            },
            {
                xtype:'combobox',
                fieldLabel :'Fee Template',
                id:'feetemplateid',
                name:'feetemplateid',
                store:Ext.create('MyApp.store.Combo').load({
                                      params:{propertyId:6}}),//For FeeTemplates
                //typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select a Fee Templates...',
                Autoload:true,
                valueField :'id',
                displayField :'value'
            },{
                name : 'comment',
                fieldLabel: 'Comment',
                id:'comment'
            }
            ],
            buttons :[
            {
                text: rec?'Edit':'Add',
                action: 'save',
                scope:this,
                handler:saveMaster/*function (){
                
                var r = Ext.create('MyApp.model.ClassMod', {
                    name:Ext.getCmp('name').getValue(),
                    classteacher:Ext.getCmp('classteacher').getValue(),
                    feetemplate:Ext.getCmp('feetemplate').getValue(),
                    comment:Ext.getCmp('comment').getValue()                    
                });
             
                    classdata.insert(0,r);
                }*/
            },{xtype:'btncancel'}
            
         ]
        });
    }
    if(rec){
        
        Ext.getCmp('name').setValue(rec.data.name);
        Ext.getCmp('classteacher').setValue(rec.data.class_teacher);
        Ext.getCmp('comment').setValue(rec.data.comment);
        Ext.getCmp('feetemplateid').setValue(rec.data.feetemplateid);
      
    }
    win.show();
}

function saveMaster(btn){

      var form = btn.up('window').down('form').getForm();
      var grid =  Ext.getCmp('classgrid');
        if(form.isValid()){
            var obj = form.getValues();
            var sessionid=Ext.getCmp('hwsessioncombo').getValue(); 
            
            obj.sessionid=sessionid;            
            Ext.Ajax.request({
                url:'classes/add.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                   Ext.StoreManager.lookup('Class').load({
                                params:{sessionid:Ext.getCmp('hwsessioncombo').getValue()
                            }
                   });                
                    Ext.Msg.alert('Success','Class added successfully');
                }
            });
        }
}

function addSubjects(rec){

    
    var subjectstore = Ext.StoreManager.lookup('ClassSubject');
    var classid=rec.data.batch_id;
    var win;
    if(!win){
        win=Ext.create('Ext.window.Window', {
            title:'Add Subject for Class :<b><font color=red>'+rec.data.name+'</font></b>',
            id:'addSubjects',
            width:600,
            height:300,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:'Add Subject for Class :<b><font color=red>'+rec.data.name+'</font></b>'
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
                        xtype:Ext.create('MyApp.view.class.Subject'),                        
                        store:Ext.StoreManager.lookup('ClassSubject').load({
                                      params:{classid:classid}///provide batch_id here
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
                    saveClassSubject(rec)
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
function saveClassSubject(rec){      
      
      var classid=rec.data.batch_id;
      var records = Ext.StoreManager.lookup('ClassSubject').getModifiedRecords();
      var data = []; 
      var data = [];
            Ext.each(records, function(rec1){
                rec1.data.classid=classid;
                if(rec1.data.added===true)
                   rec1.data.added=1; 
                 else
                   rec1.data.added=0;   
                data.push(rec1.data);
                
            });
   
            Ext.Ajax.request({
                url:'classsubject/add.do',
                type:'json',
                scope:this,
                headers:{
                    'Content-Type':'application/json'  
                },
                params:Ext.JSON.encode(data),
                success: function(res){
                    Ext.Msg.alert('Success','Subject added successfully');
                    var rec = eval('('+res.responseText+')');
                }
            });
}

function addClassExam(rec){
    
       Ext.StoreManager.lookup('ClassExam').load({
         params:{classid :rec.data.classid,
                 sessionid:null,
                 examtypeidid:null
         }
       });
       var app1=app.getController('Dashboard')
       var Tab = Ext.create('MyApp.view.class.ClassExam');
       app1.getDashboard().add(Tab);
       app1.getDashboard().setActiveTab(Tab);  
}


function addSubjectTeachers(rec){
    
    var subjectstore = Ext.StoreManager.lookup('ClassSubjectTeacher');
    var classid=rec.data.batch_id;
    var win;
    if(!win){
        win=Ext.create('Ext.window.Window', {
            title:'Add Subject Teacher for Class :<b><font color=red>'+rec.data.name+'</font></b>',
            id:'addSubjectteacher',
            width:600,
            height:300,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:'Add Subject Teacher for Class :<b><font color=red>'+rec.data.name+'</font></b>'
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
                        xtype:Ext.create('MyApp.view.class.ClassSubjectTeacher'),                        
                        store:Ext.StoreManager.lookup('ClassSubjectTeacher').load({
                                      params:{classid:classid}///provide batch_id here
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
                    saveSubjectTeachers(rec)
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

function saveSubjectTeachers(rec){

  var classid=rec.data.batchid;
      var records = Ext.StoreManager.lookup('ClassSubjectTeacher').getModifiedRecords();

      var data = [];
            Ext.each(records, function(rec1){
                data.push(rec1.data);
            });
  
            Ext.Ajax.request({
                url:'classsubjectteacher/add.do',
                type:'json',
                scope:this,
                headers:{
                    'Content-Type':'application/json'  
                },
                params:Ext.JSON.encode(data),
                success: function(res){
                    
                    var rec = eval('('+res.responseText+')');
                    if(rec.success)
                    Ext.Msg.alert('Success','Subject-Teachers added successfully');
                    else
                    Ext.Msg.alert('Failure','Unexpected Error Occured, Please Contact Admisitrator');    
                }
            });
}

Ext.define('MyApp.view.class.Class' ,{
    extend: 'Ext.grid.Panel',
    closable:true,
    title: 'Class Management',
    id:'classgrid',
    layout:'fit',
    alias: 'widget.class',
    uses:['MyApp.view.class.Subject','MyApp.view.class.ClassSubjectTeacher'],
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },    
    store:'Class',
    initComponent: function() {

    this.columns=[
    Ext.create('Ext.grid.RowNumberer'),

    {
        header: 'Session Name',
        dataIndex:'sessionname',
        style :'color:#17385B;font-weight:bold',
        width:'15%',
        renderer:function(value){
            return '<b>'+value+'</b>';
        }
    },
    {
        header: 'Class Name',
        dataIndex:'name',
        style :'color:#17385B;font-weight:bold',
        width:'15%',
        renderer:function(value){
            return '<font color=green><b>'+value+'</b></font>';
        }
    },

    {
        header:'Class Teacher',
        dataIndex:'teachername',
        style :'color:#17385B;font-weight:bold',
        width:'15%'
    },
    {
        header:'Fee Teamplate',
        dataIndex:'feetemplate',
        style :'color:#17385B;font-weight:bold',
        width:'15%'
    },{
        header:'Comment',
        dataIndex:'comment',
        style :'color:#17385B;font-weight:bold',
        width:'40%'
    }
    ];
    this.selModel=Ext.create('Ext.selection.CheckboxModel',{
        singleSelect:true,
        listeners:{
                selectionchange:function(){
                   var  button = Ext.getCmp('classEdit');
                   button.setDisabled(false);
                   var  delbutton = Ext.getCmp('classDelete');
                   delbutton.setDisabled(false);
                }
            }
    });
    this.tbar =[{
        xtype: 'searchfield',
        width : 90,                
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
       store:Ext.create('MyApp.store.Combo').load({
                                      params:{propertyId:-1}}),//Get Session Details
       //typeAhead: true,
       width : 110,        
       queryMode: 'local',
       Autoload:true,
       valueField :'id',
       displayField :'value',   
       editable: false,
       value:SETTING.Users.properties.session_id,
       listeners:{
            select: function(component){
                
                var sessionid=Ext.getCmp('hwsessioncombo').getValue();
              
                Ext.StoreManager.lookup('Class').load({
                         params:{sessionid:sessionid
                         }
                 });                
            }
       }
    },{
        iconCls: 'icon-add',
        text: 'Add Class',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                    var sessionid=Ext.getCmp('hwsessioncombo').getValue(); 
                    var session=Ext.getCmp('hwsessioncombo').getRawValue(); 
                    ///if(sessionid!=null)
                       addClasses(null,sessionid,session);
                    ///else
                    ///   Ext.Msg.alert('Warning','<font color=red><b>You must Select Session to Continue other Operation</b></font>');    
                });
            }
        }
    },{
        iconCls: 'icon-edit',
        text: 'Edit',
        disabled: true,
        id:'classEdit',
        scope:this,
        handler: function(component){
                    var sessionid=Ext.getCmp('hwsessioncombo').getValue();                     
                    var sessionname=Ext.getCmp('hwsessioncombo').getRawValue();                     
                    if(sessionid!=null){
                        var rec=Ext.getCmp('classgrid').getSelectionModel().getSelection()[0];
                        addClasses(rec,sessionid,sessionname);
                    }   
                    else
                       Ext.Msg.alert('Warning','<font color=red><b>You must Select Session to Continue other Operation</b></font>');    

            
        }
    }, {
        iconCls: 'icon-delete',
        text: 'Delete',
        disabled: true,        
        id:'classDelete',
        handler: function(component){
            Ext.Msg.confirm("Alert","Are you sure want to delete records", function(btn){
            if(btn=='yes'){
                var grid = Ext.getCmp('classgrid');
                var rec=Ext.getCmp('classgrid').getSelectionModel().getSelection()[0]; 
                var data={batch_id:rec.data.batch_id};
               
                Ext.Ajax.request({
                url:'classes/del.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(data),
                success: function(res){
                    var response = eval('('+res.responseText+')');
                    if(response===1){
                    Ext.Msg.alert('Success','Class Deeleted successfully');
                    grid.getStore().remove(grid.getSelectionModel().getSelection());
                    var sessionid=Ext.getCmp('hwsessioncombo').getValue();
              
                        Ext.StoreManager.lookup('Class').load({
                                 params:{sessionid:Ext.getCmp('hwsessioncombo').getValue()
                                 }
                         });                

                    }
                    else{
                    Ext.Msg.alert('Warning','Unexpected Error Occured , Please Contact Admin');    
                    }
                }
                });
                
                
            }
        });
        }
    },{
        xtype:'button',
        text:'Add Subject',
        iconCls: 'icon-add',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                    var sessionid=Ext.getCmp('hwsessioncombo').getValue();                     
                    if(sessionid!=null){
                       var rec=Ext.getCmp('classgrid').getSelectionModel().getSelection()[0];
                       addSubjects(rec);                    }   
                    else
                       Ext.Msg.alert('Warning','<font color=red><b>You must Select Session to Continue other Operation</b></font>');    
                });

            }
        }
    },{
        xtype:'button',
        text:'Add Teacher',
        iconCls: 'icon-add',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    var sessionid=Ext.getCmp('hwsessioncombo').getValue();                          
                    if(sessionid!=null){
                       var rec=Ext.getCmp('classgrid').getSelectionModel().getSelection()[0];
                       addSubjectTeachers(rec);                       
                    }
                    else
                       Ext.Msg.alert('Warning','<font color=red><b>You must Select Session to Continue other Operation</b></font>');    
                    
                });

            }
        }
    },{
        xtype:'button',
        text:'Create Time Table',
        iconCls: 'icon-add',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    var sessionid=Ext.getCmp('hwsessioncombo').getValue();                     
                    if(sessionid!=null){
                        var rec=Ext.getCmp('classgrid').getSelectionModel().getSelection()[0];  
                        
                        var app1=app.getController('Dashboard')
                        var Tab = Ext.create('MyApp.view.timetable.Timetable',{p_sessionid:sessionid,p_classid:rec.data.classid});
                        app1.getDashboard().add(Tab);
                        app1.getDashboard().setActiveTab(Tab);  
                    }
                    else
                       Ext.Msg.alert('Warning','<font color=red><b>You must Select Session to Continue other Operation</b></font>');    

                });

            }
        }
    },{
        xtype:'button',
        text:'Add Exam',
        iconCls: 'icon-add',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    var rec=Ext.getCmp('classgrid').getSelectionModel().getSelection()[0];
                    addClassExam(rec);
                });

            }
        }
    },{
        xtype:'button',
        text:'Add Special Fee',
        iconCls: 'icon-add',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    var sessionid=Ext.getCmp('hwsessioncombo').getValue();                     
                    if(sessionid!=null){
                      Ext.Msg.alert('Warning','This Module in under Development');                            
                    }
                    else
                       Ext.Msg.alert('Warning','<font color=red><b>You must Select Session to Continue other Operation</b></font>');    

                });

            }
        }
    },{
        xtype:'button',
        text:'Room Detail',
        iconCls: 'icon-add',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    var sessionid=Ext.getCmp('hwsessioncombo').getValue();                     
                    if(sessionid!=null){
                      Ext.Msg.alert('Warning','This Module in under Development');                            
                    }
                    else
                       Ext.Msg.alert('Warning','<font color=red><b>You must Select Session to Continue other Operation</b></font>');    

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
                    })

            }
        }
    },{
        xtype:'button',
        text:'Class Room Detail',
        iconCls: 'icon-add',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    //addFeeTemplate();
                });

            }
        }
    },{
        xtype:'button',
        text:'Class Room Detail',
        iconCls: 'icon-add',
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



