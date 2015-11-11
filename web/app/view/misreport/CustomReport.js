function viewNotice(rec){
        
        var store=  Ext.getStore('Notification');
                
        Ext.create('MyApp.view.notice.NoticeViewWindow',{
            title:'School Notice Board',
            noticeView:rec
        }).show();
    
}

function addCustomReport(rec){

    var win = Ext.getCmp('_win');
    if(!win){
        win=Ext.create('Ext.app.view.component.AppWindow', {
            title:'<Font color=red><b>MIS Custom Report Management',
            id:rec?'editmiscustomreports_win':'addmiscustomreports_win',
            width:400,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/portal-icon/reports.jpg',
                formTitle:'Create New Custom Report'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:350
            },
            formItems :[
                {
                name : 'reportid',
                hidden:true,
                id:'reportid',
                value:rec?rec.data.reportid:'',
            },    
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
                    xtype:'combobox',
                    fieldLabel: 'Module Name',
                    id:'moduleid',
                    name : 'moduleid',
                    store:Ext.create('MyApp.store.Master').load({
                                                  params:{propertyId:102} //peorpetty religion id =4
                                         }),
                    typeAhead: true,
                    queryMode: 'local',
                    emptyText: 'Select Module.',
                    Autoload:true,
                    valueField :'id',
                    displayField :'value',
                    width:350,
                    value:rec?rec.data.moduleid:'',
                    listeners:{
                    select: function(component){
                    var moduleid=Ext.getCmp('moduleid').getValue();
                    Ext.getCmp('column_grid').getStore().load({
                                         params:{
                                                 moduleid:moduleid
                                         }
                     });
                    }
                } 
                },{
                        xtype: 'combobox',
                        emptyText: 'Select Report Type',
                        fieldLabel: 'Select Report Type',
                        id:'customreporttype',
                        store:Ext.create('MyApp.store.Master').load({
                                                       params:{propertyId:35}}),//For Session,
                        typeAhead: true,
                        queryMode: 'local',
                        width:350,
                        displayField: 'value',
                        valueField: 'id',
                        name:'customreporttype',
                         listeners:{
                             select: function(component){
                             }
                       },
                       value:rec?rec.data.reporttype:'',
                },{
                    xtype:'combobox',
                    fieldLabel :'Report For',
                    id:'reportfor',
                    emptyText: 'Select Report For',       
                    store:
                        Ext.create('Ext.data.Store', {
                            fields: ['id', 'name'],
                            data : [
                            {
                                "id":"1",
                                "name":"For Each Batch"
                            },{
                                "id":"0",
                                "name":"For All Batch"
                            }]
                        }),
                        Autoload:true,
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'id',
                        name:'reportfor',
                        width:350,
                        value:rec?rec.data.reportfor:'',
                },
                {
                    name : 'reportname',
                    fieldLabel: 'Report Name',
                    id:'reportname',
                    width:350,
                    value:rec?rec.data.reportname:'',
                },
                {
                    xtype:'textareafield',
                    name : 'reportdiscription',
                    fieldLabel: 'Report Description',
                    id:'reportdiscription',
                    width:350,
                    value:rec?rec.data.description:'',
                }
            ],
            buttons :[
            {
                text: rec?'Edit':'Add',
                action: 'save',
                scope:this,
                handler:saveCustomReport
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
}

function saveCustomReport(btn){
    
     var form = btn.up('window').down('form').getForm();
     if(form.isValid()){
            var obj = form.getValues();
            
            Ext.Ajax.request({
                url:'misreport/addcustomreport.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    var rec = eval('('+res.responseText+')');
                    if(rec.result!=null) {                       
                    Ext.Msg.alert('Success','Report added successfully');
                    Ext.getCmp('customreportmanagementgrid').getStore().reload(); 
                    }
                    else
                    Ext.Msg.alert('Failure','Unexpected Error Occured , Please Contact Admin');                 
                }
            });
        }
}

function showColumnAndCondition(rec){

    Ext.StoreManager.lookup('ReportColumnDetails').load({
                                      params:{
                                          moduleid:rec.data.moduleid,
                                          reportid:rec.data.reportid
                                      }///provide batch_id here
                        });

    var win;
    if(!win){
        win = Ext.create('Ext.window.Window', {
            title:'MIS Custom Report',
            id: 'miscustomreports',
            width:620,
            height:580,
            closeAction:'destroy',
            top:{
                formTitle:'MIS Custom Report'
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
                    items:[{ 
                            title: 'Report Column Details',
                            width:620,
                            height:500,     
                            readOnly:true,
                            items:[
                            {
                            xtype:'grid',
                            store:'ReportColumnDetails',
                            id:'column_grid',
                            height:500,     
                            title:'Report Column Details',
                            vieConfig:{
                               forceFit:true
                            },
                            defaults:{
                            },
                            columns:[
                                 Ext.create('Ext.grid.RowNumberer'),
                                 {
                                 header:'<font color=#17385B><b>Column Name</b></font>',
                                 dataIndex:'columnname',
                                 width    :'60%'
                                 },{
                                 header:'Include in Report',
                                 dataIndex:'includeme',
                                 xtype:'checkcolumn',
                                 style :'color:#17385B;font-weight:bold;align:center',
                                 width:'30%'
                             }
                             ],
                               tbar :[{
                                    iconCls: 'icon-add',
                                    id     :'savecolumndetails',
                                    text: 'Save Added Column',
                                    scope:this,
                                    listeners:{
                                        render: function(component){
                                            component.getEl().on('click', function(){                    
                                               saveColumnForReport(rec);
                                            });
                                        }
                                    }
                                 }
                                ],
                                selModel:Ext.create('Ext.selection.CheckboxModel',{
                                singleSelect:true,
                                listeners:{
                                        selectionchange:function(){
                                        }
                                    }
                            })
                             }
                            ]
                           },  
                           {
                            title: 'Report Condition',
                            width:620,
                            height:580, 
                            items:[ {
                            xtype:'grid',
                            store:'ReportColumnCondition',
                            id:'reportcondition_grid',
                            title:'Add Condition For Report',
                            vieConfig:{
                               forceFit:true
                            },
                            defaults:{
                            },
                            columns:[
                                 Ext.create('Ext.grid.RowNumberer'),
                                 {
                                 header:'<font color=#17385B><b>Column Name</b></font>',
                                 dataIndex:'columnname',
                                 width    :'35%'
                                 },
                                 {
                                 header:'<font color=#17385B><b>Condition</b></font>',
                                 dataIndex:'condition',
                                 width    :'30%'
                                 },
                                 {
                                 header:'<font color=#17385B><b>Value</b></font>',
                                 dataIndex:'value',
                                 width    :'30%'
                                 }
                               ],
                               tbar :[{
                                    iconCls: 'icon-add',
                                    id:'addcndition',        
                                    text: 'Add Condition',
                                    listeners:{
                                        render: function(component){
                                            component.getEl().on('click', function(){                    
                                               addConditionForReport(rec); 
                                            });

                                        }
                                    }
                                }
                                ]
                             }]
                           }
                    ]
            }
            
            ],
            buttons :[
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
    
    
}

function saveColumnForReport(rec){
      var records = Ext.StoreManager.lookup('ReportColumnDetails').getModifiedRecords();
      var data = [];
            Ext.each(records, function(rec1){
                rec1.data.reportid=rec.data.reportid;
                rec1.data.createdby=SETTING.Users.userId;
                rec1.data.modifiedby=SETTING.Users.userId;
                        
                if(rec1.data.includeme)
                    rec1.data.includeme=1;
                else
                    rec1.data.includeme=0;
                data.push(rec1.data);
            });
   
            Ext.Ajax.request({
                url:'misreport/addcolumnforreport.do',
                type:'json',
                scope:this,
                headers:{
                    'Content-Type':'application/json'  
                },
                params:Ext.JSON.encode(data),
                success: function(res){
                    Ext.Msg.alert('Success','Column added successfully for report');
                    var rec = eval('('+res.responseText+')');
                }
    });
}

function addConditionForReport(rec){
   
    var win = Ext.getCmp('_win');
    if(!win){
        win=Ext.create('Ext.app.view.component.AppWindow', {
            title:'<Font color=red><b>MIS Custom Report -> Add Report Condition',
            id:rec?'editmisreportscondition_win':'addmmisreportscondition_win',
            width:400,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/portal-icon/reports.jpg',
                formTitle:'Create New Custom Report Filter Condition'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:350
            },
            formItems :[
                {
                name : 'reportid',
                hidden:true,
                id:'reportid',
                value:rec?rec.data.reportid:'',
            },    
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
                    xtype:'combobox',
                    fieldLabel: 'Module Name',
                    id:'moduleid',
                    name : 'moduleid',
                    store:Ext.create('MyApp.store.Master').load({
                                                  params:{propertyId:102} //peorpetty religion id =4
                                         }),
                    typeAhead: true,
                    queryMode: 'local',
                    emptyText: 'Select Module.',
                    Autoload:true,
                    valueField :'id',
                    displayField :'value',
                    width:350,
                    readOnly:true,
                    value:rec?rec.data.moduleid:'',
                    listeners:{
                    select: function(component){
                    var moduleid=Ext.getCmp('moduleid').getValue();
                    Ext.getCmp('column_grid').getStore().load({
                                         params:{
                                                 moduleid:moduleid
                                         }
                     });
                    }
                } 
                },{
                    name : 'reportname',
                    fieldLabel: 'Report Name',
                    id:'reportname',
                    width:350,
                    value:rec?rec.data.reportname:'',
                },{
                        xtype: 'combobox',
                        emptyText: 'Select Column For Condition',
                        fieldLabel: 'Select Condition Column',
                        id:'conditioncolumn',
                        store:Ext.create('MyApp.store.ReportColumnForCondtion').load({
                                                       params:{moduleid:rec?rec.data.moduleid:''}}),//For Session,
                        typeAhead: true,
                        queryMode: 'local',
                        width:350,
                        displayField: 'value',
                        valueField: 'id',
                        name:'conditioncolumn',
                         listeners:{
                             select: function(component){
                                 
                                var p=Ext.getCmp('conditioncolumn').getValue();
                                    p=p.substring(p.lastIndexOf(' - ')+3,p.length);
                                    Ext.getCmp('conditionvalue').getStore().load({
                                     params:{
                                             propertyId:p
                                     }
                               });
                             }
                       }
              },{
                        xtype: 'combobox',
                        emptyText: 'Select Operation',
                        fieldLabel: 'Select Condition Operation',
                        id:'conditionoperation',
                        store:Ext.create('MyApp.store.Master').load({
                                                       params:{propertyId:61}}),//For Session,
                        typeAhead: true,
                        queryMode: 'local',
                        width:350,
                        displayField: 'value',
                        valueField: 'id',
                        name:'conditionoperation',
                         listeners:{
                             select: function(component){
                             }
                       }
              },{
                        xtype: 'combobox',
                        emptyText: 'Select Value',
                        fieldLabel: 'Select Condition Value',
                        id:'conditionvalue',
                        store:'Master',
                        typeAhead: true,
                        queryMode: 'local',
                        width:350,
                        displayField: 'value',
                        valueField: 'id',
                        name:'conditionvalue',
                         listeners:{
                             select: function(component){
                             }
                       }
              }
                
            ],
            buttons :[
            {
                text: 'Add',
                action: 'save',
                scope:this,
                handler:saveCustomReportCondition
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
    
}

function saveCustomReportCondition(btn){
 
  var form = btn.up('window').down('form').getForm();
     if(form.isValid()){
            var obj = form.getValues();
            obj.conditioncolumn=obj.conditioncolumn.substring(0,obj.conditioncolumn.lastIndexOf(' - '));            
            Ext.Ajax.request({
                url:'misreport/addcustomreportcondition.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    var rec = eval('('+res.responseText+')');
                    if(rec.result!=null) {                       
                    Ext.Msg.alert('Success','Report Condition added successfully');
                    //Ext.getCmp('customreportmanagementgrid').getStore().reload(); 
                    }
                    else
                    Ext.Msg.alert('Failure','Unexpected Error Occured , Please Contact Admin');                 
                }
            });
   }
    
}

Ext.define('MyApp.view.misreport.CustomReport' ,{
    extend: 'Ext.grid.Panel',
    closable:true,
    title: 'Custom Report Management',
    id:'customreportmanagementgrid',
    layout:'fit',
    alias: 'widget.customreportgrid',
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },    
    store:'CustomReportDetailsStore',
    
    initComponent: function() {

    this.columns=[
    Ext.create('Ext.grid.RowNumberer'),
    {
        header: 'reportid',
        dataIndex:'reportid',
        hidden   :true
    },{
        header: 'moduleid',
        dataIndex:'moduleid',
        hidden   :true
    },{
        header: '<font color=#17385B><b>Module</b></font>',
        dataIndex:'modulename',
        width    :'15%'
    },
    {
        header: '<font color=#17385B><b>Report Title</b></font>',
        dataIndex:'reportname',
        width    :'15%'
    },
    {
        header: '<font color=#17385B><b>Report Type</b></font>',
        dataIndex:'reporttypetxt',
        width    :'15%'
    },
    {
        header:'<font color=#17385B><b>Report For</b></font>',
        dataIndex:'reportfortxt',
        width    :'15%'
    },{
        header:'<font color=#17385B><b>Description</b></font>',
        dataIndex:'description',
        width    :'15%'
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
                selectionchange:function(sm){
                Ext.getCmp('reportEdit').setDisabled((sm.getCount()==0));
                Ext.getCmp('reportDelete').setDisabled((sm.getCount()==0));
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
        text: 'Add Custom Report',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                    addCustomReport(null);
                });

            }
        }
    },{
        iconCls: 'icon-edit',
        text: 'Edit Report',
        disabled: true,
        id:'reportEdit',
        scope:this,
        handler: function(component){
                    var rec=Ext.getCmp('customreportmanagementgrid').getSelectionModel().getSelection()[0];
                    if(rec!=null) addCustomReport(rec);
        }
    }, {
        iconCls: 'icon-delete',
        text: 'Delete Report',
        disabled: true,        
        id:'reportDelete',
        handler: function(component){
            Ext.Msg.confirm("Alert","Are you sure want to delete records", function(btn){
            if(btn==='yes'){
                var grid = Ext.getCmp('customreportmanagementgrid');
                grid.getStore().remove(grid.getSelectionModel().getSelection());
            }
        });
        }
    },{
        iconCls: 'icon-add',
        text: 'Report Column & Filters',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                   var rec=Ext.getCmp('customreportmanagementgrid').getSelectionModel().getSelection()[0];
                   showColumnAndCondition(rec);        
                });

            }
        }
    },{
        iconCls: 'icon-add',
        text: 'View Report Detail',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                   var rec=Ext.getCmp('customreportmanagementgrid').getSelectionModel().getSelection()[0];
                           
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




