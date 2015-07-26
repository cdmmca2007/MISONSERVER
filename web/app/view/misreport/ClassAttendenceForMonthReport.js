Ext.define('MyApp.view.misreport.ClassAttendenceForMonthReport' ,{
    extend: 'Ext.panel.Panel',
    closable:true,
    title: 'Monthly Attendence Report',
    id:'monattendreport',
    layout:'fit',
    height :300,
    alias: 'widget.monattendreport',
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },    
    initComponent: function() {
    this.items={
            xtype:'grid',
            store:'ClassAttendenceForMonthReport',
            id:'monattendreportgrid',
            title:'Monthly Attendence Report in Grid Form',
            width:300,
            vieConfig:{
                forceFit:true
            },
            columns :[
            Ext.create('Ext.grid.RowNumberer'),
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
            ]};
    this.selModel=Ext.create('Ext.selection.CheckboxModel',{
        singleSelect:true
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
       xtype: 'combo',
       emptyText: 'Select Month',
       id:'attmonthlyccombo',
       width:120,
       store:Ext.create('Ext.data.Store', {
            fields: ['id', 'value'],
            data : [
            {"id":"1","value":"January"},
            {"id":"2","value":"February"},
            {"id":"3","value":"March"},
            {"id":"4","value":"April"},
            {"id":"5","value":"May"},
            {"id":"6","value":"June"},
            {"id":"7","value":"July"},
            {"id":"8","value":"August"},            
            {"id":"9","value":"September"},
            {"id":"10","value":"October"},
            {"id":"11","value":"November"},
            {"id":"12","value":"December"}
        ]
        }),
        typeAhead: true,
        queryMode: 'local',
        displayField: 'value',
        valueField: 'id', 
        listeners:{
            select: function(component){
               var month  =Ext.getCmp('attmonthlyccombo').getValue();                                
                if(month!==null)    
                {
                    Ext.getCmp('monattendreportgrid').getStore().load({
                    params:{                            
                             month     :month,
                             sessionid :SETTING.Users.properties.session_id        
                    }
                 });  

                }    
        }
       }
    },{
        iconCls: 'icon-add',
        text: '<font color:"#17385B"><b>Show Graph Report</b></font>',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                var classid  =Ext.getCmp('attmonthlyccombo').getValue();                                
                if(classid!==null)    
                {
                 var chart = Ext.create('Ext.chart.Chart', {
                        style: 'background:#fff',
                        animate: true,
                        shadow: true,
                        id    :'monattchart',
                        store: Ext.getCmp('monattendreportgrid').getStore(),
                        axes: [{
                            type: 'Numeric',
                            position: 'left',
                            fields: ['percent'],
                            label: {
                                renderer: Ext.util.Format.numberRenderer('0,0')
                            },
                            title: 'Monthly Attendence Percentage',
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
                            tips: {
                              trackMouse: true,
                              width: 120,
                              height: 70,
                              renderer: function(storeItem, item) {
                               // this.setTitle(storeItem.get('month') + ': ' + storeItem.get('percent') + ' % <br> <font color=green>Total Fee :'+ storeItem.get('tot_amount') +'</font> <br><font color=red>Total Received :'+storeItem.get('tot_received')+'</font>');
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
                            var color = ['rgb(213, 70, 121)', 
                                         'rgb(44, 153, 201)', 
                                         'rgb(146, 6, 157)', 
                                         'rgb(49, 149, 0)', 
                                         'rgb(249, 153, 0)'][value];
                            return Ext.apply(attr, {
                                fill: color
                            });
                        }
                        }]
                    });
              var app1=app.getController('Dashboard')
              
              var tabPanel = app1.getDashboard().getActiveTab();
              tabPanel.remove(Ext.getCmp('monattendreportgrid'));
              tabPanel.add(chart);
              }
             });
            }
        }
    },{
        iconCls: 'icon-add',
        text: '<font color:"#17385B"><b>Show Grid Report</b></font>',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
             var month  =Ext.getCmp('attmonthlyccombo').getValue();                                
             if(month!==null)    
              {
              var grid=Ext.create('Ext.grid.Panel',{
                    store:Ext.StoreMgr.lookup('ClassAttendenceForMonthReport').load({
                            params:{
                                month   :month,
                                sessionid :SETTING.Users.properties.session_id        

                    }}
                    ),
                    id:'monattendreportgrid',
                    title:'Monthly Attendence Report in Grid Form',
                    width:300,
                    vieConfig:{
                        forceFit:true
                    },
                    columns :[
                    Ext.create('Ext.grid.RowNumberer'),
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
              tabPanel.remove(Ext.getCmp('monattchart'));
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
