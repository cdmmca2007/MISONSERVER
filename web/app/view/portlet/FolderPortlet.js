var mystore;
var record_global;
function addDocument(rec){
    
    var win = Ext.getCmp('tut_doc_win');
    if(!win){//Ext.app.view.component.AppWindow
        win=Ext.create('Ext.app.view.component.AppWindow', {
            title:'<font color=#17385B><b>Student Homework Management</b></font>',
            id:'add_doc_tut',
            width:400,                       
            closeAction:'hide',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:'Add Tutorial Document to Class :'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:300
            },
            url:'ppppp',
            formItems :[
            {
                name : 'batchid',
                id:'batchid',
                hidden:true,
                value:rec.data.batchid
            },    
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
                id:'tutsubject',
                name:'tutsubject',
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:2}}),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Subject',
                Autoload:true,               
                valueField :'id',
                displayField :'value'
            },
            
            {
                name : 'title',
                fieldLabel: 'Tutorial Title',
                id:'title'
            },{
                xtype   : 'textareafield',
                grow    : true,
                name : 'description',
                fieldLabel: 'Description',
                id:'description'
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
                fieldLabel :'Send Notification to Student of this Class',
                id:'notification',
                name:'notification'
            }
            ],
            buttons :[
            {
                text: 'Add',
                action: 'save',
                scope:this,
                handler:adddoc
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
    
}

function adddoc(btn){
    
     var form = btn.up('window').down('form').getForm();
     if(form.isValid()){
           form.submit({
                    url: 'tutorial/add.do',
                    success: function(fp, o) {
                        Ext.example.msg('Success','Document Added Successfully');
                     mystore.reload({
                     params:{     sessionid:SETTING.Users.properties.session_id,
                                  isparent :0,
                                  batchid  :record_global.data.batchid
                         }
                 });
                    },
                    failure: function(fp, o) {
                        Ext.example.msg('Failure','Unexpected Error Occured,Please Contact Administrator');
                    }
          }); 
        }

    
}

Ext.define('Ext.app.view.portlet.FolderPortlet', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.folderportlet',
    layout: 'fit',
    title:'Tutorial Documents',
    frame: true,
    closable: true,
    collapsible: true,
    animCollapse: true,
    draggable: {
        moveOnDrag: false    
    },
    cls: 'folder-portlet',
    initComponent: function() {
        
        this.items=Ext.create('Ext.view.View', {
            store: this.store,
            tpl: [
                '<tpl for=".">',
                    '<div class="thumb-wrap" id="{name}">',
                    '<div class="f-thumb"><img src="'+PORTAL_ICON+'{image}" title="{tooltip}"></div>',
                    '<span class="x-editable">{shortName}</span></div>',
                '</tpl>',
                '<div class="x-clear"></div>'
            ],
            multiSelect: false,
            trackOver: true,
            overItemCls: 'x-item-over',
            itemSelector: 'div.thumb-wrap',
            emptyText: 'No images to display',
            plugins: [
                Ext.create('Ext.ux.DataView.DragSelector', {}),
                Ext.create('Ext.ux.DataView.LabelEditor', {dataIndex: 'name'})
            ],
            prepareData: function(data) {
                Ext.apply(data, {
                    shortName: Ext.util.Format.ellipsis(data.name, 18)
                });
                return data;
            },
            listeners: {
                itemdblclick: function(dv, record ){
                record_global=record;    
                if(record.data.isparent===1){

                   var  button = Ext.getCmp('addocumentbtn');
                   button.setDisabled(false);
                   var  button = Ext.getCmp('returnbtn');
                   button.setDisabled(false);
  
                   this.store.reload({
                     params:{     sessionid:SETTING.Users.properties.session_id,
                                  isparent :0,
                                  batchid  :record.data.batchid
                         }
                 });
                }
                else
                   {
                    if(record.data.isparent===2)   
                    {    
                    Ext.Msg.alert('Message','<font color=green>Thank you, For downloading this file</font>');                            
                    document.getElementById("downloadfile").src="tutorial/document.get?pid="+record.data.pid+"&downloadedby="+SETTING.Users.userId+"&acion=1";
                   }
                   }
                }
            }
        });
        
       this.tbar =[{
       xtype: 'combo',
       emptyText: 'Select Session',
       text   : 'Session',
       id:'sessioncombo1',
       store:Ext.create('MyApp.store.Combo').load({
                                      params:{propertyId:-1}}),//Get Session Details
       
       width : 110,        
       queryMode: 'local',
       Autoload:true,
       valueField :'id',
       displayField :'value',   
       editable: false,
       value:SETTING.Users.properties.session_id,
       listeners:{
            select: function(component){
            }
       }
    },{
     iconCls: 'icon-add',
     text: '<font color="#17385B"><b>Add Document</b></font>',
     id  :'addocumentbtn',
     disabled: true,
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){  
                     addDocument(record_global);                    
                });
            }
        }
    },{
     iconCls: 'icon-add',
     text: '<font color="#17385B"><b>Go Back</b></font>',
     scope:this,
     disabled: true,
     id  :'returnbtn',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){         
                 mystore.reload({
                     params:{sessionid:SETTING.Users.properties.session_id,
                                 isparent :1,
                                 batchid  :null
                         }
                 });
                 
                   var  button = Ext.getCmp('addocumentbtn');
                   button.setDisabled(true);
                   var  button = Ext.getCmp('returnbtn');
                   button.setDisabled(true);

                });
                

            }
        }
    }
    ];
         this.callParent(arguments);
         mystore=this.store;
    },
    doClose: function() {
        if (!this.closing) {
            this.closing = true;
            this.el.animate({
                opacity: 0,
                callback: function(){
                    this.fireEvent('close', this);
                    this[this.closeAction]();
                },
                scope: this
            });
        }
    }
});
