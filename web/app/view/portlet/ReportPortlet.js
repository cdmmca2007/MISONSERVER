function showReport(rec){
    
    if(rec.data.id==4 && rec.data.name=='Attendence Report'){ 
    var app1=app.getController('Dashboard')
    var Tab = Ext.create('MyApp.view.misreport.AttendenceReport');
    app1.getDashboard().add(Tab);
    app1.getDashboard().setActiveTab(Tab);  
   }
   else if(rec.data.id==2 && rec.data.name=='Payment Report'){
    var app1=app.getController('Dashboard')
    var Tab = Ext.create('MyApp.view.misreport.PaymentReports');
    app1.getDashboard().add(Tab);
    app1.getDashboard().setActiveTab(Tab);  
   }
   else if(rec.data.id==22 && rec.data.name=='Monthly Class Fee'){
    var app1=app.getController('Dashboard')
    var Tab = Ext.create('MyApp.view.misreport.PaymentMonthlyReport');
    app1.getDashboard().add(Tab);
    app1.getDashboard().setActiveTab(Tab);  
   }
   else if(rec.data.id==25 && rec.data.name=='Monthly Student Attendence Reports'){
    var app1=app.getController('Dashboard')
    var Tab = Ext.create('MyApp.view.misreport.ClassAttendenceForMonthReport');
    app1.getDashboard().add(Tab);
    app1.getDashboard().setActiveTab(Tab);  
   }
   else if(rec.data.id==1 && rec.data.name=='Class Report'){
    Ext.StoreManager.lookup('ClassReport').load({
                                params:{sessionid:SETTING.Users.properties.session_id
                            }
    });    
    var app1=app.getController('Dashboard')
    var Tab = Ext.create('MyApp.view.misreport.ClassReport');
    app1.getDashboard().add(Tab);
    app1.getDashboard().setActiveTab(Tab);  
   }
   else if(rec.data.id==24 && rec.data.name=='Daily Attendence Report'){
    var app1=app.getController('Dashboard')
    var Tab = Ext.create('MyApp.view.misreport.DailyAttendenceReportForAllClass');
    app1.getDashboard().add(Tab);
    app1.getDashboard().setActiveTab(Tab);  
   }
   else if(rec.data.id==21 && rec.data.name=='Student Fee Reports'){
    var app1=app.getController('Dashboard')
    var Tab = Ext.create('MyApp.view.misreport.StudentFeeReport');
    app1.getDashboard().add(Tab);
    app1.getDashboard().setActiveTab(Tab);  
   }
   else if(rec.data.id==3 && rec.data.name=='Exam Report Analysis'){
    var app1=app.getController('Dashboard')
    var Tab = Ext.create('MyApp.view.misreport.ExamReportAnalysis');
    app1.getDashboard().add(Tab);
    app1.getDashboard().setActiveTab(Tab);  
   }
   
   else{
       Ext.Msg.alert("This Report is in development phase");     
   }
    
}




function addCustomReport(){
       
       var app1=app.getController('Dashboard')
       app1.getCustomReportDetailsStoreStore().load(); 
       var Tab = Ext.create('MyApp.view.misreport.CustomReport');
       app1.getDashboard().add(Tab);
       
       app1.getDashboard().setActiveTab(Tab); 
/*
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
                    items:[{///Report Details
                            title: 'Report Detail',
                            defaults:{
                                        xtype:'textfield',
                                        value:'',
                                        labelWidth:200,
                                        height:18
                            },
                            items:[
                                                                                                                    
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
                                    width:600  ,
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
                                        width:600  ,
                                        displayField: 'value',
                                        valueField: 'id',
                                        name:'customreporttype',
                                         listeners:{
                                             select: function(component){
                                             }
                                       }
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
                                                "name":"For Every Batch"
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
                                    width:600
                                },
                                {
                                    name : 'reportname',
                                    fieldLabel: 'Report Name',
                                    id:'reportname',
                                    width:600
                                },
                                {
                                    xtype:'textareafield',
                                    name : 'reportdiscription',
                                    fieldLabel: 'Report Description',
                                    id:'reportdiscription',
                                    width:600
                                }
                              ]
                           },   
                           { 
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
                                               saveColumnForReport();
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
            {
                text: 'Save Details',
                action: 'save',
                scope:this,
                listeners:{
                render: function(component){
                component.getEl().on('click', function(){                                        
                  
                var data={  
                           'createdby' :SETTING.Users.userId,
                           'moduleid'  :Ext.getCmp("moduleid").getValue(),
                           'customreporttype'  :Ext.getCmp("customreporttype").getValue(),
                           'reportfor'  :Ext.getCmp("reportfor").getValue(),
                           'reportdiscription'  :Ext.getCmp("reportdiscription").getValue(),
                           'reportname'  :Ext.getCmp("reportname").getValue()
                         };                             
                  Ext.Ajax.request({
                    url:'misreport/addcustomreport.do',
                    type:'json',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    params:Ext.JSON.encode(data),
                    success: function(res){
                        var rec = eval('('+res.responseText+')');
                        if(rec.result===1){
                        Ext.Msg.alert('Success','Data updated successfully');
                        }
                        else
                        Ext.Msg.alert('Success','Error Occured , Please Contact Administrator');    
                     //   var rec = eval('('+res.responseText+')');
                     //   app.getController('Class').getClassStore().add(rec);
                    }
                });

                 });
                }
              }
            },           
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
    
   */
}
function saveColumnForReport(){
      var records = Ext.StoreManager.lookup('ReportColumnDetails').getModifiedRecords();
      var data = [];
            Ext.each(records, function(rec1){
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

Ext.define('Ext.app.view.portlet.ReportPortlet', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportportlet',
    layout: 'fit',
    title:'MIS Report Folder',
    frame: true,
    closable: true,
    collapsible: true,
    animCollapse: true,
    draggable: {
        moveOnDrag: false    
    },
    cls: 'report-portlet',
    initComponent: function() {
        
        this.items=Ext.create('Ext.view.View', {
            store: 'MisReport',
            tpl: [
                '<tpl for=".">',
                    '<div class="thumb-wrap" id="{name}">',
                    '<div class="f-thumb"><img src="'+PORTAL_ICON+'{image}" title="{description}"></div>',
                    '<span class="x-editable">{name}</span></div>',
                '</tpl>',
                '<div class="x-clear"></div>'
            ],
            multiSelect: false,
            trackOver: true,
            overItemCls: 'x-item-over',
            itemSelector: 'div.thumb-wrap',
            id:'reportportlet',
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
                //record_global=record;  
                showReport(record);
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
       hidden:true,
       editable: false,
       value:SETTING.Users.properties.session_id,
       listeners:{
            select: function(component){
            }
       }
    },{
       xtype: 'combobox',
       emptyText: 'Select Report Type',
       id:'reporttype',
       store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:35}}),//For Session,
       typeAhead: true,
       queryMode: 'local',
       displayField: 'value',
       valueField: 'id',
       name:'reporttype',
        listeners:{
            select: function(component){
                var reporttype=Ext.getCmp('reporttype').getValue();                
                
                if(reporttype!=null)    
                {
                    
                    Ext.getCmp('reportportlet').getStore().load({
                     params:{     
                         'reporttypeid':reporttype
                         }
                     });
                }    

            }
       }
    },{
        iconCls: 'icon-add',
        text: 'Manage Custom Report',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                    //addCustomReport();
                    addCustomReport();
                });

            }
        }
    }
    ];
         this.callParent(arguments);
        
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
