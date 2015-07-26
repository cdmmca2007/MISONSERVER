function addAdmissionSetting(rec){

    var win = Ext.getCmp('addadmissionsetting_win');
    if(!win){
        win=Ext.create('Ext.app.view.component.AppWindow', {
            title:'<Font color=red><b>Add Admission Setting Window',
            id:rec?'editadmissionsetting_win':'addadmissionsetting_win',
            width:550,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/portal-icon/admission_setting.jpg',
                //image:'resources/images/portal-icon/admission_setting.jpg',
                formTitle:'Add Admission Setting for Session :<b>'+SETTING.Users.properties.year+'</b>'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:500
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
                name : 'sessionname',
                fieldLabel: 'Session Name',
                id:'sessionname'
            },{
                xtype:'datefield',
                name : 'admission_start_date',
                fieldLabel: 'Admission Start date',
                id:'admission_start_date',
                format: 'm d Y',
                altFormats: 'm-d-Y|m.d.Y'
              },
              {
                xtype:'datefield',
                name : 'admission_end_date',
                fieldLabel: 'Admission End Date',
                id:'admission_end_date',
                format: 'm d Y',
                altFormats: 'm-d-Y|m.d.Y'
              },
              {
                xtype:'combobox',
                fieldLabel :'Admission Department Head',
                id:'admission_department_head',
                name:'admission_department_head',
                store:Ext.create('MyApp.store.Combo').load({
                              params:{propertyId:5}
                 }),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Head of Admission Process',
                Autoload:true,               
                valueField :'id',
                displayField :'value'

            },{
                name : 'default_day_sch_aft_apply',
                fieldLabel: 'No of Day After to conduct Interview/Intrance Exam after Online Apply',
                id:'default_day_sch_aft_apply'
            },{
              xtype:'checkbox',
              fieldLabel :'Enable Email Sending',
              id   :'enable_email_sending',
              name   :'Enable Email Sending'
            },{
              xtype:'checkbox',
              fieldLabel :'Enable SMS Sending',
              id   :'enable_sms_sending',
              name   :'enable_sms_sending'
            },{
              xtype:'checkbox',
              fieldLabel :'Is Interview Mandate',
              id   :'is_interview_mandate',
              name   :'is_interview_mandate'
            },{
              xtype:'checkbox',
              fieldLabel :'Is_Intracne Exam Mandate',
              id   :'is_instracneexam_mandate',
              name   :'is_instracneexam_mandate'
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

Ext.define('MyApp.view.setting.AddmissionSetting' ,{
    extend: 'Ext.grid.Panel',
    closable:true,
    title: 'Admission Setting',
    id:'addmissionsettingpanel',
    layout:'fit',
    alias: 'widget.addmissionsettingpanel',
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },    
    store:'AdmissionSetting',
    
    initComponent: function() {

    this.columns=[
    Ext.create('Ext.grid.RowNumberer'),
    {
        header: '<font color=#17385B><b>Session Name</b></font>',
        dataIndex:'sessionname',
        width    :'10%'
    },

    {
        header:'<font color=#17385B><b>Admission Start Date</b></font>',
        dataIndex:'admission_start_date',
        width    :'10%'
    },

    {
        header:'<font color=#17385B><b>Admission End Date</b></font>',
        dataIndex:'admission_end_date',
        width    :'10%'
    },{
        header:'<font color=#17385B><b>Admission Head</b></font>',
        dataIndex:'admission_dept_head_name',        
        width    :'10%',
        flex: 1
    },{
        header:'<font color=#17385B><b>Email-Enable</b></font>',
        dataIndex:'enable_email_sending',
        width    :'10%'
        
    },{
        header:'<font color=#17385B><b>SMS Enable</b></font>',
        dataIndex:'enable_sms_sending',
        width    :'10%'
    },{
        header:'<font color=#17385B><b>Default Day for Intv/Exam</b></font>',
        dataIndex:'default_day_sch_aft_apply',
        width    :'10%'
    },{
        header:'<font color=#17385B><b>Interview Mandate</b></font>',
        dataIndex:'is_interview_mandate',
        width    :'10%'
        
    },{
        header:'<font color=#17385B><b>Intrance Mandate</b></font>',
        dataIndex:'is_instracneexam_mandate',
        width    :'10%'
        
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
                   var  button = Ext.getCmp('admsnsetngEdit');
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
        text: 'Add Admission Setting',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                    addAdmissionSetting(null);
                });

            }
        }
    },{
        iconCls: 'icon-edit',
        text: 'Edit',
        disabled: true,
        id:'admsnsetngEdit',
        scope:this,
        handler: function(component){
                    var rec=Ext.getCmp('notificationgrid').getSelectionModel().getSelection()[0];
                    //addClasses(rec);
        }
    }/* {
        iconCls: 'icon-delete',
        text: 'Delete',
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
    }*/
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







