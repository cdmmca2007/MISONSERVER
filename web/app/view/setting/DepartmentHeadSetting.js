function addHead(rec){

    this.teacherStore=Ext.create('MyApp.store.Combo');
    this.teacherStore.load({
            params:{propertyId:5}
    });
    var win = Ext.getCmp('addhead_win');
    if(!win){
        win=Ext.create('Ext.app.view.component.AppWindow', {
            title:'<Font color=red><b>Add Department Head Window',
            id:rec?'edithead_win':'addhead_win',
            width:550,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:'Add Department Head Form For:<b>'+SETTING.Users.properties.year+'</b>'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:400
            },
            formItems :[
            {
                name : 'pid',
                hidden:true,
                id:'pid',
                //value:SETTING.Users.properties.session_id,
            },    
            {
                name : 'sessionid',
                hidden:true,
                id:'sessionid',
                value:SETTING.Users.properties.session_id,
            },{
                xtype:'combobox',
                fieldLabel :'Select Department',
                id:'departmentid',
                name:'departmentid',
                store:Ext.create('MyApp.store.Master').load({
                                              params:{propertyId:27} //peorpetty religion id =4
                                     }),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Department...',
                Autoload:true,               
                valueField :'id',
                displayField :'value'
              },
            {
                xtype:'combobox',
                fieldLabel :'Head of Department',
                id:'deptheadid',
                name:'deptheadid',
                store:this.teacherStore,
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Head of Department...',
                Autoload:true,               
                valueField :'id',
                displayField :'value',
                height:'5px'
            },{
                xtype   : 'textareafield',
                grow    : true,
                name : 'comment',
                fieldLabel: 'Comment',
                id:'comment'
            },
            ],
            buttons :[
            {
                text: rec?'Edit':'Add',
                action: 'save',
                scope:this,
                handler:saveDepartmentHead
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
}

function saveDepartmentHead(btn){
    
     var form = btn.up('window').down('form').getForm();
     if(form.isValid()){
            var obj = form.getValues();
            
            Ext.Ajax.request({
                url:'master/adddepartmenthead.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    var rec = eval('('+res.responseText+')');
                    if(rec.result==1) {                       
                    Ext.Msg.alert('Success','Department Head added successfully');
                    Ext.getCmp('departmentheadsetting').getStore().reload(); 
                    }
                    else
                    Ext.Msg.alert('Failure','Unexpected Error Occured , Please Contact Admin');                 
                }
            });
        }
}

Ext.define('MyApp.view.setting.DepartmentHeadSetting' ,{
    extend: 'Ext.grid.Panel',
    closable:true,
    title: 'Department Head Setting',
    id:'departmentheadsetting',
    layout:'fit',
    alias: 'widget.departmentheadsetting',
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },    
    store:'DepartmentHeadSetting',
    
    initComponent: function() {

    this.columns=[
    Ext.create('Ext.grid.RowNumberer'),
    {
        header:'<font color=#17385B><b>Department</b></font>',
        dataIndex:'departmentid',
        hidden:true
    },
    {
        header:'<font color=#17385B><b>Department</b></font>',
        dataIndex:'departmentname',
        width    :'25%'
    },
    {
        header:'<font color=#17385B><b>Department Head</b></font>',
        dataIndex:'deptheadid',
        hidden:true,
    },{
        header:'<font color=#17385B><b>Department Head</b></font>',
        dataIndex:'deptheadname',
        width    :'15%'
    },{
        header:'<font color=#17385B><b>From Date</b></font>',
        dataIndex:'fromdate',
        width    :'10%'
    },{
        header:'<font color=#17385B><b>To Date</b></font>',
        dataIndex:'todate',
        width    :'10%',
        renderer:function(value,metadata,record){
                 if(value===null)
                   return "<b>Till Date</b>";
                 else 
                    return value ;
        }
    },{
        header:'<font color=#17385B><b>Created By</b></font>',
        dataIndex:'createdby',
        width    :'15%'
    },{
        header:'<font color=#17385B><b>Last Modified Date</b></font>',
        dataIndex:'modifiedon',
        width    :'15%'
    }
    ];
    this.selModel=Ext.create('Ext.selection.CheckboxModel',{
        singleSelect:true,
        listeners:{
                selectionchange:function(){

                   var  button = Ext.getCmp('deptheadEdit');
                   button.setDisabled(false);
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
        xtype:'combobox',
        id:'hodsession',
        emptyText: 'Select Session',   
        store:Ext.create('MyApp.store.Combo').load({
                                      params:{propertyId:-1}}),//For Session
        Autoload:true,
        queryMode: 'local',
        displayField: 'value',
        valueField: 'id',
        //value:SETTING.Users.properties.session_id,
        width:100,
        name:'type',
        listeners:{
            select: function(component){
                var sessionid=Ext.getCmp('hodsession').getValue();
                Ext.getCmp('departmentheadsetting').getStore().load({
                     params:{
                             sessionid   :sessionid///Provide Batch_id,
                     }
               });
            }
       }
    },{
        iconCls: 'icon-add',
        text: 'Add Head Of Dept',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                    addHead(null);
                });

            }
        }
    },{
        iconCls: 'icon-edit',
        text: 'Edit',
        disabled: true,
        id:'deptheadEdit',
        scope:this,
        handler: function(component){
                    var rec=Ext.getCmp('notificationgrid').getSelectionModel().getSelection()[0];
                    //addClasses(rec);
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








