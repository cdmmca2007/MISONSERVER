var v_batch_id;
var v_classname;

function getListOfAbsentStudent(p_batch_id,p_classname){
    
    var sessionid=Ext.getCmp('reportdattsessioncombo').getValue();
    var month;
    var colField;
                var date    =Ext.getCmp('selecteddate').getValue();                                
                if(date!==null)    
                {
                     month=Ext.Date.format(new Date(date),"M")+'-' + Ext.Date.format(new Date(date),"Y");
                     colField=Ext.Date.format(new Date(date),"d");
                } 
    var win;
    if(!win){
        win=Ext.create('Ext.window.Window', {
            title:'Absent Student List For Class : '+p_classname,
            id:'listofabsentstudent',
            width:400,
            height:300,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:'Absent Student List For Class : '+p_classname
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
                        xtype:Ext.create('MyApp.view.misreport.ListOfAbsentStudent'),                        
                        store:Ext.StoreManager.lookup('ListOfAbsentStudent').load({
                            params:{
                             batchid:p_batch_id,
                             colfield: colField,
                             month     :month,
                             sessionid :sessionid//SETTING.Users.properties.session_id        
                         }
                        })
                  }]
              } 
            ],
            buttons :[
            {
                text: 'Print',
                action: 'print',
                scope:this,
                listeners:{
                render: function(component){
                component.getEl().on('click', function(){                                        
                    ///saveClassSubject(rec)
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

Ext.define('MyApp.view.misreport.DailyAttendenceReportForAllClass' ,{
    extend: 'Ext.panel.Panel',
    closable:true,
    title: 'Daily Attendence Report',
    id:'dailyattendreport',
    alias: 'widget.dailyattendreport',
    uses:['MyApp.view.misreport.ListOfAbsentStudent'],
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },  
    layout:{
        type:'vbox',
        align:'stretch'
    },
    initComponent: function() {
    this.items=[{
            xtype:'grid',
            store:'DailyAttendenceReportForAllClass',
            id:'dailyattendreportgrid',
            title:'Daily Attendence Report in Grid Form',
            height:200,
            vieConfig:{
                forceFit:true
            },
            columns :[
            Ext.create('Ext.grid.RowNumberer'),
            {
                dataIndex:'batch_id',
                hidden:true,
                id:'batch_id',
                name:'batch_id'
            },
           {
                header:'Class Name',
                dataIndex:'classname',
                style :'color:#17385B;font-weight:bold',
                width:'20%',
                 renderer:function(value){
                    return '<b>'+value+'</b>';
                }
            },
            {
                header:'Class Stength',
                dataIndex:'total',
                style :'color:#17385B;font-weight:bold',
                width:'20%',
                 renderer:function(value){
                    return '<b>'+value+'</b>';
                }
            },
            {
                header:'Tot Present',
                dataIndex:'present',
                style :'color:#17385B;font-weight:bold',
                width:'20%'
            },
            {
                header:'Total Absent',
                dataIndex:'absent',
                style :'color:#17385B;font-weight:bold',
                width:'20%'
            },
            {
                header:'Percentage',
                dataIndex:'percent',
                style :'color:#17385B;font-weight:bold',
                width:'15%',
                renderer:function(value){
                    return '<font color=green><b>'+value+'</b></font>';
             }
            }
            ]},{
            xtype:'panel',
            extend: 'Ext.panel.Panel',
            id:'dailyattendencepanel',
            layout:'fit',
            viewConfig:{
                forceFit:true
            },
            flex:1,
            items:[
                {
                    xtype:'panel',
                    extend: 'Ext.panel.Panel',
                    id   :'dailyattendencegraph',
                    height:250,
                    width :1000,
                    name   :'dailyattendencegraph',
                    vieConfig:{
                           forceFit:true
                    },
                    items:[{
                        xtype:'grid',
                        height:250,
                        id    :'dailyattendencechart',
                        name  :'dailyattendencechart',
                        columns :[
                           {
                                hidden:true,
                                header:'Class',
                                dataIndex:'classname',
                                style :'color:#17385B;font-weight:bold'
                           }] 
                    }
                    ]
                }
               ]
             }];
    this.selModel=Ext.create('Ext.selection.CheckboxModel',{
        singleSelect:true
    });
    this.tbar =[
      {
                xtype:'datefield',
                name : 'activatedate',
                fieldLabel: 'Select Date',
                id:'selecteddate',
                format: 'm-d-Y',
                altFormats: 'm-d-Y|m.d.Y',
                listeners:{
                  select: function(component){
                  var sessionid=Ext.getCmp('reportdattsessioncombo').getValue();
                  var date    =Ext.getCmp('selecteddate').getValue();                                
                if(date!==null)    
                {
                   // month=new Date(obj.fromdate).getTime();
                    var month=Ext.Date.format(new Date(date),"M")+'-' + Ext.Date.format(new Date(date),"Y");
                    var colField=Ext.Date.format(new Date(date),"d");
                    Ext.getCmp('dailyattendreportgrid').getStore().load({
                    params:{   
                             colfield: colField,
                             month     :month,
                             sessionid :sessionid//SETTING.Users.properties.session_id        
                    }
                    }); 
                    
                    var chart = Ext.create('Ext.chart.Chart', {
                        style: 'background:#fff',
                        animate: true,
                        shadow: true,
                        height:300,
                        width :1000,
                        id    :'dailyattchart',
                        store: Ext.getCmp('dailyattendreportgrid').getStore(),
                        axes: [{
                            type: 'Numeric',
                            position: 'left',
                            fields: ['percent'],
                            label: {
                                renderer: Ext.util.Format.numberRenderer('0,0')
                            },
                            title: 'Daily Attendence Percentage',
                            grid: true,
                            minimum: 0,
                            maximum:100
                        }, {
                            type: 'Category',
                            position: 'bottom',
                            fields: ['classname'],
                            title: 'Class Name'
                        }],
                        series: [{
                            type: 'column',
                            axis: 'left',
                            highlight: true,
                            //seriesColor:'blue',
                            style:{
                               width:'20',
                            },
                            tips: {
                              trackMouse: true,
                              width: 200,
                              height: 100,
                              renderer: function(storeItem, item) {
                                v_batch_id= storeItem.get('batch_id');
                                v_classname=storeItem.get('classname');
                                this.setTitle(storeItem.get('classname') + ': ' + storeItem.get('percent') + ' %<br>Total Stength : '+storeItem.get('total')+' <br> <font color=green>Total Present :'+ storeItem.get('present') +'</font> <br><font color=red>Total Absent :'+storeItem.get('absent')+'</font><br><br><font color=red>Click on bar to get more details</font>');
                                                               
                              }
                            },
                            label: {
                              display: 'insideEnd',
                              'text-anchor': 'middle',
                              field: 'month',
                              renderer: Ext.util.Format.numberRenderer('0'),
                              orientation: 'vertical',
                              color: 'red'
                            },
                            xField: 'classname',
                            yField: 'percent',
                            renderer: function(sprite, record, attr, index, store) {
                            var fieldValue = Math.random() * 20 + 10;
                            var value = (record.get('percent') >> 0) % 5;
                            var color = ['rgb(23, 70, 121)', 
                                         'rgb(494, 153, 201)', 
                                         'rgb(16, 6, 157)', 
                                         'rgb(49, 149, 0)', 
                                         'rgb(229, 153, 0)'][value];
                            return Ext.apply(attr, {
                                fill: color
                            });
                        }
                        }],
                       listeners: { 
                        click: {
                            //element: store, 
                            fn: function(o, a){
                                getListOfAbsentStudent(v_batch_id,v_classname);
                                
                            }
                        }

                    } 
                    });
              Ext.getCmp('dailyattendencegraph').remove(Ext.getCmp('dailyattendencechart'));
              Ext.getCmp('dailyattendencegraph').add(chart);
              Ext.getCmp('dailyattendencegraph').doLayout();


               } 
              }
       }
       },{
       xtype: 'combo',
       emptyText: 'Select Session',
       hidden:true,
       text   : 'Session',
       id:'reportdattsessioncombo',
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
                var sessionid=Ext.getCmp('reportdattsessioncombo').getValue();
            }
       }
    },{
        iconCls: 'icon-add',
        text: '<font color:"#17385B"><b>Show Graph Report</b></font>',
        hidden:true,
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                var date    =Ext.getCmp('selecteddate').getValue();                                
                if(date!==null)    
                {
                 var chart = Ext.create('Ext.chart.Chart', {
                        style: 'background:#fff',
                        animate: true,
                        shadow: true,
                        id    :'dailyattchart',
                        store: Ext.getCmp('dailyattendreportgrid').getStore(),
                        axes: [{
                            type: 'Numeric',
                            position: 'left',
                            fields: ['percent'],
                            label: {
                                renderer: Ext.util.Format.numberRenderer('0,0')
                            },
                            title: 'Daily Attendence Percentage',
                            grid: true,
                            minimum: 0,
                            maximum:100
                        }, {
                            type: 'Category',
                            position: 'bottom',
                            fields: ['classname'],
                            title: 'Class Name'
                        }],
                        series: [{
                            type: 'column',
                            axis: 'left',
                            highlight: true,
                            seriesColor:'blue',
                            style:{
                               width:'40',
                            },
                            tips: {
                              trackMouse: true,
                              width: 200,
                              height: 100,
                              renderer: function(storeItem, item) {
                                v_batch_id= storeItem.get('batch_id');
                                v_classname=storeItem.get('classname');
                                this.setTitle(storeItem.get('classname') + ': ' + storeItem.get('percent') + ' %<br>Total Stength : '+storeItem.get('total')+' <br> <font color=green>Total Present :'+ storeItem.get('present') +'</font> <br><font color=red>Total Absent :'+storeItem.get('absent')+'</font><br><br><font color=red>Click on bar to get more details</font>');
                                                               
                              }
                            },
                            label: {
                              display: 'insideEnd',
                              'text-anchor': 'middle',
                              field: 'month',
                              renderer: Ext.util.Format.numberRenderer('0'),
                              orientation: 'vertical',
                              color: 'red'
                            },
                            xField: 'classname',
                            yField: 'percent',
                            renderer: function(sprite, record, attr, index, store) {
                            var fieldValue = Math.random() * 20 + 10;
                            var value = (record.get('percent') >> 0) % 5;
                            var color = ['rgb(23, 70, 121)', 
                                         'rgb(494, 153, 201)', 
                                         'rgb(16, 6, 157)', 
                                         'rgb(49, 149, 0)', 
                                         'rgb(229, 153, 0)'][value];
                            return Ext.apply(attr, {
                                fill: color
                            });
                        }
                        }],
                       listeners: { 
                        click: {
                            //element: store, 
                            fn: function(o, a){
                                getListOfAbsentStudent(v_batch_id,v_classname);
                                
                            }
                        }

                    } 
                    });
              var app1=app.getController('Dashboard')
              
              var tabPanel = app1.getDashboard().getActiveTab();
              tabPanel.remove(Ext.getCmp('dailyattendreportgrid'));
              tabPanel.add(chart);
              }
             });
            }
        }
    },{
        iconCls: 'icon-add',
        text: '<font color:"#17385B"><b>Show Grid Report</b></font>',
        hidden:true,        
        listeners:{
            render: function(component){
             component.getEl().on('click', function(){                    
             var date    =Ext.getCmp('selecteddate').getValue();                                
             if(date!==null)    
              {
               var sessionid=Ext.getCmp('reportdattsessioncombo').getValue();
               var date    =Ext.getCmp('selecteddate').getValue();                                
               var store;
                if(date!==null)    
                {
                   // month=new Date(obj.fromdate).getTime();
                    var month=Ext.Date.format(new Date(date),"M")+'-' + Ext.Date.format(new Date(date),"Y");
                    var colField=Ext.Date.format(new Date(date),"d");
                    
                    store=Ext.StoreMgr.lookup('DailyAttendenceReportForAllClass').load({
                    params:{   
                             colfield: colField,
                             month     :month,
                             sessionid :sessionid//SETTING.Users.properties.session_id        
                    }
                 });  

                }     
                  
              var grid=Ext.create('Ext.grid.Panel',{
                    store:store,
                    id:'dailyattendreportgrid',
                    title:'Daily Attendence Report in Grid Form',
                    width:300,
                    vieConfig:{
                        forceFit:true
                    },
                    columns :[
                    Ext.create('Ext.grid.RowNumberer'),
            {
                dataIndex:'batch_id',
                hidden:true,
                id:'batch_id',
                name:'batch_id'
            },
           {
                header:'Class Name',
                dataIndex:'classname',
                style :'color:#17385B;font-weight:bold',
                width:'25%',
                 renderer:function(value){
                    return '<b>'+value+'</b>';
                }
            },
            {
                header:'Class Stength',
                dataIndex:'total',
                style :'color:#17385B;font-weight:bold',
                width:'25%',
                 renderer:function(value){
                    return '<b>'+value+'</b>';
                }
            },
            {
                header:'Tot Present',
                dataIndex:'present',
                style :'color:#17385B;font-weight:bold',
                width:'25%'
            },
            {
                header:'Total Absent',
                dataIndex:'absent',
                style :'color:#17385B;font-weight:bold',
                width:'25%'
            },
            {
                header:'Percentage',
                dataIndex:'percent',
                style :'color:#17385B;font-weight:bold',
                width:'25%',
                renderer:function(value){
                    return '<font color=green><b>'+value+'</b></font>';
             }
            }
            ]
            });                  
              var app1=app.getController('Dashboard')
              var tabPanel = app1.getDashboard().getActiveTab();
              tabPanel.remove(Ext.getCmp('dailyattchart'));
              tabPanel.add(grid);
              }
             });
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
        text:'Print Report',
        iconCls: 'icon-add',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                  
                    //addFeeTemplate();
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
