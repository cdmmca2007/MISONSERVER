function viewNotice(rec){
        
        var store=  Ext.getStore('Notification');
                
        Ext.create('MyApp.view.notice.NoticeViewWindow',{
            title:'School Notice Board',
            noticeView:rec
        }).show();
    
}

function addNotice(rec){

    var win = Ext.getCmp('notification_win');
    if(!win){
        win=Ext.create('Ext.app.view.component.AppWindow', {
            title:'<Font color=red><b>Notification Management',
            id:rec?'editnotification_win':'addnotification_win',
            width:400,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:'Create New  Notification'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:300
            },
            url:'ppppp',
            formItems :[
            {
                name : 'sessionid',
                hidden:true,
                id:'sessionid',
                value:SETTING.Users.properties.session_id
            },
            {
                name : 'createdby',
                hidden:true,
                id:'createdby',
                value:SETTING.Users.userId
            },{
                name : 'modifiedby',
                hidden:true,
                id:'modifiedby',
                value:SETTING.Users.userId
            },
            {
                name : 'title',
                fieldLabel: 'Notice Title',
                id:'title'
            },{
                xtype   : 'textareafield',
                grow    : true,
                name : 'description',
                fieldLabel: 'Description',
                id:'description'
            },{
                xtype:'combobox',
                fieldLabel :'Recipient',
                id:'recipient',
                name:'recipient',
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:11}}),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Status',
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
            }
            ],
            buttons :[
            {
                text: rec?'Edit':'Add',
                action: 'save',
                scope:this,
                handler:saveNotice
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
}

function saveNotice(btn){
    
     var form = btn.up('window').down('form').getForm();
     if(form.isValid()){
            var obj = form.getValues();
            
            obj.activatedate=new Date(obj.activatedate).getTime();        
            obj.endactivatedate=new Date(obj.endactivatedate).getTime();        
            
            Ext.Ajax.request({
                url:'notification/add.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    var rec = eval('('+res.responseText+')');
                    if(rec.id!=null) {                       
                    Ext.Msg.alert('Success','Notification added successfully');
                    Ext.getCmp('notificationgrid').getStore().reload(); 
                    }
                    else
                    Ext.Msg.alert('Failure','Unexpected Error Occured , Please Contact Admin');                 
                }
            });
        }
}

Ext.define('MyApp.view.setting.FinanceSetting' ,{
    extend: 'Ext.grid.Panel',
    closable:true,
    title: 'Finance Setting',
    id:'financesetting',
    layout:'fit',
    alias: 'widget.financesetting',
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },    
    store:'Notification',
    
    initComponent: function() {

    this.columns=[
    Ext.create('Ext.grid.RowNumberer'),
    {
        header: 'id',
        dataIndex:'id',
        hidden   :true
    },
    {
        header: '<font color=#17385B><b>Title</b></font>',
        dataIndex:'title',
        width    :100
    },

    {
        header:'<font color=#17385B><b>Description</b></font>',
        dataIndex:'description',
        width    :200
    },

    {
        header:'<font color=#17385B><b>Notification For</b></font>',
        dataIndex:'recipient',
        width    :100
    },{
        header:'<font color=#17385B><b>Valid From By</b></font>',
        dataIndex:'activatedate',        
        width    :100,
        flex: 1
    },{
        header:'<font color=#17385B><b>Valid To </b></font>',
        dataIndex:'endactivatedate',
        width    :100
        
    },{
        header:'<font color=#17385B><b>Status</b></font>',
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
        dataIndex:'createdby',
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
        text: 'Add Notice',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                    addNotice(null);
                });

            }
        }
    },{
        iconCls: 'icon-edit',
        text: 'Edit Notice',
        disabled: true,
        id:'noticeEdit',
        scope:this,
        handler: function(component){
                    var rec=Ext.getCmp('notificationgrid').getSelectionModel().getSelection()[0];
                    //addClasses(rec);
        }
    }, {
        iconCls: 'icon-delete',
        text: 'Delete Notice',
        disabled: true,        
        id:'noticeDelete',
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
        text: 'View Notice',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                   var rec=Ext.getCmp('notificationgrid').getSelectionModel().getSelection()[0];
                    viewNotice(rec);
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







