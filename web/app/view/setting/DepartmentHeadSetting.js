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
                formTitle:'Add Department Head Window For:<b>'+SETTING.Users.properties.year+'</b>'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:500,
            },
            formItems :[
            {
                name : 'sessionid',
                hidden:true,
                id:'sessionid',
                value:SETTING.Users.properties.session_id,
            },
            {
                xtype:'combobox',
                fieldLabel :'Principal',
                id:'principal',
                name:'principal',
                store:this.teacherStore,
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Principal...',
                Autoload:true,               
                valueField :'id',
                displayField :'value',
                height:'5px'
            },
            {
                xtype:'combobox',
                fieldLabel :'Vice Principal',
                id:'viceprincipal',
                name:'viceprincipal',
                store:this.teacherStore,
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Vice Principal...',
                Autoload:true,               
                valueField :'id',
                displayField :'value',
                height:'5px'
            },
            {
                xtype:'combobox',
                fieldLabel :'Head Of Examination',
                id:'head_of_examination',
                name:'head_of_examination',
                store:this.teacherStore,
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Head Of Examination...',
                Autoload:true,               
                valueField :'id',
                displayField :'value',
                height:'5px'                
            },
            {
                xtype:'combobox',
                fieldLabel :'School Librarian',
                id:'librarian',
                name:'librarian',
                store:this.teacherStore,
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select librarian...',
                Autoload:true,               
                valueField :'id',
                displayField :'value',
                height:'5px'                
            },{
                xtype:'combobox',
                fieldLabel :'Head Of Science Department',
                id:'head_science_department',
                name:'head_science_department',
                store:this.teacherStore,
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Head Of Science Department',
                Autoload:true,               
                valueField :'id',
                displayField :'value',
                height:'5px'                
            },{
              
                xtype:'combobox',
                fieldLabel :'Head Mathematics Department',
                id:'head_mathematics_department',
                name:'head_mathematics_department',
                store:this.teacherStore,
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Head Mathematics Department',
                Autoload:true,               
                valueField :'id',
                displayField :'value',
                height:'5px'                
            },{
                xtype:'combobox',
                fieldLabel :'Head Commerce Department',
                id:'head_commerce_department',
                name:'head_commerce_department',
                store:this.teacherStore,
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Head Commerce Department',
                Autoload:true,               
                valueField :'id',
                displayField :'value',
                height:'5px'                
            },{
                xtype:'combobox',
                fieldLabel :'Head Computer Department',
                id:'head_computer_department',
                name:'head_computer_department',
                store:this.teacherStore,
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Head Computer Department',
                Autoload:true,               
                valueField :'id',
                displayField :'value',
                height:'5px'                
            },  {
                xtype:'combobox',
                fieldLabel :'Head Arts Department',
                id:'head_arts_department',
                name:'head_arts_department',
                store:this.teacherStore,
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Head Arts Department',
                Autoload:true,               
                valueField :'id',
                displayField :'value',
                height:'5px'                
            },{
                xtype:'combobox',
                fieldLabel :'Head Sports Department',
                id:'head_sports_department',
                name:'head_sports_department',
                store:this.teacherStore,
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Head Sports Department',
                Autoload:true,               
                valueField :'id',
                displayField :'value',
                height:'5px'                
            },{
                xtype:'combobox',
                fieldLabel :'Head Finance Department',
                id:'head_finance_department',
                name:'head_finance_department',
                store:this.teacherStore,
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Head Finance Department',
                Autoload:true,               
                valueField :'id',
                displayField :'value',
                height:'5px'                
            },{
                xtype:'combobox',
                fieldLabel :'Head Hostel Department',
                id:'head_hostel_department',
                name:'head_hostel_department',
                store:this.teacherStore,
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Head Hostel Department',
                Autoload:true,               
                valueField :'id',
                displayField :'value',
                height:'5px'                
            },{
                xtype:'combobox',
                fieldLabel :'Head Admission Department',
                id:'head_admission_department',
                name:'head_admission_department',
                store:this.teacherStore,
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Head Admission Department',
                Autoload:true,               
                valueField :'id',
                displayField :'value',
                height:'5px'                
            },{
                xtype:'combobox',
                fieldLabel :'Head Transport Department',
                id:'head_transport_department',
                name:'head_transport_department',
                store:this.teacherStore,
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Head Transport Department',
                Autoload:true,               
                valueField :'id',
                displayField :'value',
                height:'5px'                
            },{
                xtype:'combobox',
                fieldLabel :'Head Notice Management',
                id:'head_notice_management',
                name:'head_notice_management',
                store:this.teacherStore,
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Head Notice Management',
                Autoload:true,               
                valueField :'id',
                displayField :'value',
                height:'5px'                
            },{
                xtype:'combobox',
                fieldLabel :'Head Administrator',
                id:'head_administrator',
                name:'head_administrator',
                store:this.teacherStore,
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Head Administrator',
                Autoload:true,               
                valueField :'id',
                displayField :'value',
                height:'5px'                
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
        header: '<font color=#17385B><b>Session</b></font>',
        dataIndex:'sessionname',
        width    :100
    },

    {
        header:'<font color=#17385B><b>Principal</b></font>',
        dataIndex:'principal',
        width    :100
    },

    {
        header:'<font color=#17385B><b>Vice Principal</b></font>',
        dataIndex:'vicepricipal',
        width    :100
    },{
        header:'<font color=#17385B><b>Examination Dept</b></font>',
        dataIndex:'head_of_examination',        
        width    :100,
        flex: 1
    },
    {
        header:'<font color=#17385B><b>Librarian</b></font>',
        dataIndex:'librarian', 
        width    :100
        
    },{
        header:'<font color=#17385B><b>Science Dept</b></font>',
        dataIndex:'head_science_department', 
        width    :100,
        renderer : function(value){
            	  if(value==='Active') 
                  return '<font color=green><b>'+value+'</font></b>';
                  else
                  return '<font color=red><b>'+value+'</font></b>';    
        }       
        
    },{
        header:'<font color=#17385B><b>Mathematics Dept</b></font>',
        dataIndex:'head_mathematics_department', 
        width    :100
        
    },{
        header:'<font color=#17385B><b>Commerce Dept</b></font>',
        dataIndex:'head_commerce_department', 
        width    :100
        
    },{
        header:'<font color=#17385B><b>Computer Dept</b></font>',
        dataIndex:'head_computer_department',
        width    :100
        
    },{
        header:'<font color=#17385B><b>Arts Dept</b></font>',
        dataIndex:'head_arts_department',
        width    :100
        
    },{
        header:'<font color=#17385B><b>Sports Dept</b></font>',
        dataIndex:'head_sports_department',
        width    :100
        
    },{
        header:'<font color=#17385B><b>Finance Dept</b></font>',
        dataIndex:'head_finance_department',
        width    :100
        
    },{
        header:'<font color=#17385B><b>Hostel Dept</b></font>',
        dataIndex:'head_hostel_department',
        width    :100
        
    },{
        header:'<font color=#17385B><b>Admission Dept</b></font>',
        dataIndex:'head_admission_department',
        width    :100
        
    },{
        header:'<font color=#17385B><b>Transport Dept</b></font>',
        dataIndex:'head_transport_department',
        width    :100
        
    },{
        header:'<font color=#17385B><b>Notice Management</b></font>',
        dataIndex:'head_notice_management',
        width    :100
        
    },{
        header:'<font color=#17385B><b>Administrator</b></font>',
        dataIndex:'head_administrator',
        width    :100
        
    },{
        header:'<font color=#17385B><b>Created By</b></font>',
        dataIndex:'createdby',
        width    :100
        
    },{
        header:'<font color=#17385B><b>Created On</b></font>',
        dataIndex:'createdon',
        width    :100
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








