function viewSession(rec){
        
        var store=  Ext.getStore('Session');
                
        Ext.create('MyApp.view.session.ViewWindow',{
            title:'School Session Board',
            sessionView:rec
        }).show();
    
}

function mapSessionClass(rec){
    
    var win = Ext.getCmp('mapsessionclass_win');
    if(!win){
        win=Ext.create('Ext.app.view.component.AppWindow', {
            title:'Add Class to Session :<font color=green><b>'+rec.data.sessionyear+'</b></font>',
            id:rec?'editmapsessionclass_win':'addmapsessionclass_win',
            width:400,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:'Add Class To Session'
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
            },     
            {
                name : 'sessionid',
                fieldLabel: 'session Name',
                value:rec.data.sessionyearid,
                hidden:true
            },
            {
                xtype:'combobox',
                fieldLabel :'Select Class',
                id:'classid',
                name:'classid',                
                store:Ext.create('MyApp.store.Combo').load({
                                      params:{propertyId:-2}}),//Get Session Details
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select a Class.... ',
                Autoload:true,
                valueField :'id',
                displayField :'value',
                listeners:{
                    select: function(component){                        
                    ///Ext.getCmp('name').setValue(Ext.getCmp('classid').getRawValue());
                    }
               }
            },{
                name : 'batchname',
                fieldLabel: 'Batch Name',
                id:'batchname'
            },{
                name : 'comment',
                fieldLabel: 'Comment',
                id:'comment'

            }
            ],
            buttons :[
            {
                text: 'Add',
                action: 'save',
                scope:this,
                handler:saveSessionClass
            },{xtype:'btncancel'}
            
         ]
        });
    }
    win.show();
}

function saveSessionClass(btn){

     var form = btn.up('window').down('form').getForm();
     if(form.isValid()){
            var obj = form.getValues();
            
            Ext.Ajax.request({
                url:'sessions/addsessclassmap.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    var rec = eval('('+res.responseText+')');
                    if(rec.batch_id==='1') {                       
                        Ext.Msg.alert('Warning','Class already Added to Session');                 
                    }
                    else
                    {
                    Ext.Msg.alert('Success','Class added successfully  to Session');
                    //Ext.getCmp('sessiongrid').getStore().reload(); 
                    }    
                }
            });
        }


}

function addclasstosession(rec){
    
    var win = Ext.getCmp('sessionclass_win');
    if(!win){
        win=Ext.create('Ext.app.view.component.AppWindow', {
            title:rec?'Edit Class Form':'Add New Class Form for Session :<font color=green><b>'+'session'+'</b></font>',
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
                name : 'createdby',
                id:'createdby',
                hidden:true,
                value:SETTING.Users.userId
            },     
            {
                name : 'batch_id',
                fieldLabel: 'batch Name',
               // value:rec===null?null:rec.data.batch_id,
                hidden:true
            },{
                name : 'sessionid',
                fieldLabel: 'session Name',
                value:'sessionid',
                hidden:true
            },{
                name : 'classid',
                fieldLabel: 'classid',
              //  value:rec?rec.data.classid:null,
                hidden:true
            },
            {
                name : 'year',
                fieldLabel: 'session year',
                ///value:Ext.getCmp('hwsessioncombo').getRawValue(),
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
            }
            ],
            buttons :[
            {
                text: rec?'Edit':'Add',
                action: 'save',
                scope:this,
                handler:saveClass/*function (){
                
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
   /* if(rec){
        
        Ext.getCmp('name').setValue(rec.data.name);
        Ext.getCmp('classteacher').setValue(rec.data.classteacher);
        Ext.getCmp('comment').setValue(rec.data.comment);
        Ext.getCmp('feetemplate').setValue(rec.data.feetemplate);
      
    }*/
    win.show();
    
}

function saveClass(btn){
    
     var form = btn.up('window').down('form').getForm();
     if(form.isValid()){
            var obj = form.getValues();
            
            obj.activatedate=new Date(obj.activatedate).getTime();        
            obj.endactivatedate=new Date(obj.endactivatedate).getTime();        
            
            Ext.Ajax.request({
                url:'sessions/addclass.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    var rec = eval('('+res.responseText+')');
                    if(rec.classid==='1') {                       
                        Ext.Msg.alert('Warning','Class already Exist');                 
                    }
                    else
                    {
                    Ext.Msg.alert('Success','Class added successfully , Now You can Map/Add this class to Session');
                    //Ext.getCmp('sessiongrid').getStore().reload(); 
                    }    
                }
            });
        }
}


function addSession(rec){

    var win = Ext.getCmp('session_win');
    if(!win){
        win=Ext.create('Ext.app.view.component.AppWindow', {
            title:'<Font color=red><b>Session Management',
            id:rec?'editsession_win':'addsession_win',
            width:400,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:'Create New  Session'
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
            },     
            {
                name : 'sessionid',
                id:'sessionid',
                hidden:true
            },    
            {
                name : 'sessionname',
                fieldLabel: 'Session Name',
                id:'sessionname'
            },{
                xtype:'combobox',
                fieldLabel :'Session Year',
                id:'sessionyear',
                name:'sessionyear',
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:6}}),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Year',
                Autoload:true,               
                valueField :'id',
                displayField :'value'

            },{
                xtype:'datefield',
                name : 'activatedate',
                fieldLabel: 'Valid From',
                id:'activatedate',
                format: 'm d Y',
                altFormats: 'm-d-Y|m.d.Y'
                },{
                xtype:'datefield',
                name : 'endactivatedate',
                fieldLabel: 'Valid To',
                id:'endactivatedate',
                format: 'm d Y',
                altFormats: 'm-d-Y|m.d.Y'
                },
             {
                xtype   : 'textareafield',
                grow    : true,
                name : 'description',
                fieldLabel: 'Description',
                id:'description'
            }
            ],
            buttons :[
            {
                text: rec?'Edit':'Add',
                action: 'save',
                scope:this,
                handler:saveSession
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
}



function saveSession(btn){
    
     var form = btn.up('window').down('form').getForm();
     if(form.isValid()){
            var obj = form.getValues();
            
            obj.activatedate=new Date(obj.activatedate).getTime();        
            obj.endactivatedate=new Date(obj.endactivatedate).getTime();        
            
            Ext.Ajax.request({
                url:'sessions/add.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    var rec = eval('('+res.responseText+')');
                    if(rec.sessionid==='1') {                       
                        Ext.Msg.alert('Warning','Sessing already Exist');                 
                    }
                    else
                    {
                    Ext.Msg.alert('Success','Session added successfully');
                    Ext.getCmp('sessiongrid').getStore().reload(); 
                    }    
                }
            });
        }
}

Ext.define('MyApp.view.session.Session' ,{
    extend: 'Ext.grid.Panel',
    closable:true,
    title: 'Session Management',
    id:'sessiongrid',
    layout:'fit',
    alias: 'widget.session',
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },    
    store:'Session',
    initComponent: function() {

    this.columns=[
    Ext.create('Ext.grid.RowNumberer'),
    {
        header: 'id',
        dataIndex:'id',
        hidden   :true
    },
    {
        header: '<font color=#17385B><b>Session Name</b></font>',
        dataIndex:'sessionname',
        width    :100
    },
    {
        header:'<font color=#17385B><b>Year</b></font>',
        dataIndex:'sessionyear',
        width    :200
    },
    {
        header:'<font color=#17385B><b>Valid From</b></font>',
        dataIndex:'activatedate',        
        width    :100,
        flex: 1
    },{
        header:'<font color=#17385B><b>Valid To</b></font>',
        dataIndex:'endactivatedate',
        width    :100
    },{
        header:'<font color=#17385B><b>Session Status</b></font>',
        dataIndex:'status',
        width    :100,
        renderer : function(value){
            	  if(value==='Active') 
                  return '<font color=green><b>'+value+'</font></b>';
                  else
                  return '<font color=red><b>'+value+'</font></b>';    
        }       
    },{
        header:'<font color=#17385B><b>Created By</b></font>',
        dataIndex:'createdbyname',
        width    :100
        
    },{
        header:'<font color=#17385B><b>Created On</b></font>',
        dataIndex:'createdon',
        width    :150
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
        iconCls: 'icon-add',
        text: 'Add Session',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                    addSession(null);
                });

            }
        }
    },{
        iconCls: 'icon-edit',
        text: 'Edit',
        disabled: true,
        id:'sessionEdit',
        scope:this,
        handler: function(component){
                    var rec=Ext.getCmp('sessiongrid').getSelectionModel().getSelection()[0];
                    addClasses(rec);
        }
    },{
        iconCls: 'icon-delete',
        text: 'Delete',
        disabled: true,        
        id:'sessionDelete',
        handler: function(component){
            Ext.Msg.confirm("Alert","Are you sure want to delete records", function(btn){
            if(btn==='yes'){
                var grid = Ext.getCmp('sessiongrid');
                grid.getStore().remove(grid.getSelectionModel().getSelection());
            }
        });
        }
    },{
        iconCls: 'icon-add',
        text: 'Add Batch/Class',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                   var rec=Ext.getCmp('sessiongrid').getSelectionModel().getSelection()[0];
                   
                   addclasstosession();  
                   
                   
                });
            }
        }
    },{
        iconCls: 'icon-add',
        text: 'Map Session-Class',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                   var rec=Ext.getCmp('sessiongrid').getSelectionModel().getSelection()[0];
                    mapSessionClass(rec);
                });

            }
        }
    },{
        iconCls: 'icon-add',
        text: 'Disable Session',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                   var rec=Ext.getCmp('sessiongrid').getSelectionModel().getSelection()[0];
                    viewSession(rec);
                });

            }
        }
    },{
        iconCls: 'icon-add',
        text: 'View Session Details',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                   var rec=Ext.getCmp('sessiongrid').getSelectionModel().getSelection()[0];
                    viewSession(rec);
                });

            }
        }
    },{
        iconCls: 'icon-add',
        text: 'Mark Session as Current',
        listeners:{
            render: function(component){
            component.getEl().on('click', function(){                    
            
            Ext.Msg.confirm("Alert","Are you sure want to Mark this Session as Current ?", function(btn){
            if(btn==='yes'){
    	    var rec=Ext.getCmp('sessiongrid').getSelectionModel().getSelection()[0];
    	
                var data={  
                        'sessionid'    :rec.data.sessionid,
                        'modifiedby'   :SETTING.Users.userId
                     }; 
                
                Ext.Ajax.request({
                url:'sessions/markcur.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(data),
                success: function(res){
                    var rec = eval('('+res.responseText+')');
                    if(rec===1) {                       
                        Ext.Msg.alert('Success','Sessing Marked as Current Session Successfullyt');                 
                    }
                    else
                    {
                    Ext.Msg.alert('Warning','Error Occured , Please contact Administrator');
                    //Ext.getCmp('sessiongrid').getStore().reload(); 
                    }    
                }
            });
                    }
               }); 
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


/* 
 * Session Managmenet
 * Add New Session
 * Copy From Last Session
 * Class Detail
 *         related  SubjectDetails
 *         related passed Student Details 
 *         related  Fee Template
 *           
 */

/*
session ---> 1-a class --> 5 subject --->
session ---> 1-a class --> 6 subject --->  
  


class---1
classsubject  1--1
              1--2
              1--3
              1--4
              1--5
Exam , Markentry              

               
*/               
