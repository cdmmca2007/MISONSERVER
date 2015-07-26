Ext.define('MyApp.view.misreport.PaymentReports' ,{
    extend: 'Ext.panel.Panel',
    closable:true,
    title: 'Payment Report',
    id:'paymentreport',
    layout:'fit',
    height :300,
    alias: 'widget.paymentreport',
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },    
    initComponent: function() {
    this.items={
            xtype:'grid',
            store:'PaymentReportPerClass',
            id:'paymentreportgrid',
            title:'Payment Report in Grid Form',
            width:300,
            vieConfig:{
                forceFit:true
            },
            columns :[
            Ext.create('Ext.grid.RowNumberer'),
           {
                header:'Month Name',
                dataIndex:'month',
                style :'color:#17385B;font-weight:bold',
                width:'20%',
                 renderer:function(value){
                    return '<b>'+value+'</b>';
                }
            },
            {
                header:'Total Fee',
                dataIndex:'tot_amount',
                style :'color:#17385B;font-weight:bold',
                width:'20%'
            },
            {
                header:'Total Amount Recived',
                dataIndex:'tot_received',
                style :'color:#17385B;font-weight:bold',
                width:'20%'
            },
            {
                header:'Total Amount Pending',
                dataIndex:'tot_pending',
                style :'color:#17385B;font-weight:bold',
                width:'20%'
            },
            {
                header:'Percentage',
                dataIndex:'percent',
                style :'color:#17385B;font-weight:bold',
                width:'20%',
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
       emptyText: 'Select Class',
       text   : 'Class',
       id:'paymentclasscombo',
       width:90,
       store:Ext.create('MyApp.store.ClassCombo1').load({
                                      params:{propertyId:2,
                                              classid:SETTING.Users.properties.session_id,
                                              teacherid :SETTING.Users.userId
                                    }}),
       typeAhead: true,
       queryMode: 'local',
       Autoload:true,
       valueField :'id',
       displayField :'value',  
       listeners:{
            select: function(component){
               var classid  =Ext.getCmp('paymentclasscombo').getValue();                                
                if(classid!==null)    
                {
                 Ext.getCmp('paymentreportgrid').getStore().load({
                    params:{                            
                             classid   :classid,
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
                var classid  =Ext.getCmp('paymentclasscombo').getValue();                                
                if(classid!==null)    
                {
                 var chart = Ext.create('Ext.chart.Chart', {
                        style: 'background:#fff',
                        animate: true,
                        shadow: true,
                        id    :'paymentchart',
                        store: Ext.getCmp('paymentreportgrid').getStore(),
                        axes: [{
                            type: 'Numeric',
                            position: 'left',
                            fields: ['percent'],
                            label: {
                                renderer: Ext.util.Format.numberRenderer('0,0')
                            },
                            title: 'Payment Percentage',
                            grid: true,
                            minimum: 0,
                            maximum:100
                        }, {
                            type: 'Category',
                            position: 'bottom',
                            fields: ['month'],
                            title: 'Month of the Year'
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
                                this.setTitle(storeItem.get('month') + ': ' + storeItem.get('percent') + ' % <br> <font color=green>Total Fee :'+ storeItem.get('tot_amount') +'</font> <br><font color=red>Total Received :'+storeItem.get('tot_received')+'</font>');
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
                            xField: 'month',
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
              tabPanel.remove(Ext.getCmp('paymentreportgrid'));
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
             var classid  =Ext.getCmp('paymentclasscombo').getValue();                                
             if(classid!==null)    
              {
              var grid=Ext.create('Ext.grid.Panel',{
                    store:Ext.StoreMgr.lookup('PaymentReportPerClass').load({
                            params:{
                                classid   :Ext.getCmp('paymentclasscombo').getValue(),
                                sessionid :SETTING.Users.properties.session_id        

                    }}
                    ),
                    id:'paymentreportgrid',
                    title:'Payment Report in Grid Form',
                    width:300,
                    vieConfig:{
                        forceFit:true
                    },
                    columns :[
                    Ext.create('Ext.grid.RowNumberer'),
                    {
                header:'Month Name',
                dataIndex:'month',
                style :'color:#17385B;font-weight:bold',
                width:'20%',
                 renderer:function(value){
                    return '<b>'+value+'</b>';
                }
            },
            {
                header:'Total Fee',
                dataIndex:'tot_amount',
                style :'color:#17385B;font-weight:bold',
                width:'20%'
            },
            {
                header:'Total Amount Recived',
                dataIndex:'tot_received',
                style :'color:#17385B;font-weight:bold',
                width:'20%'
            },
            {
                header:'Total Amount Pending',
                dataIndex:'tot_pending',
                style :'color:#17385B;font-weight:bold',
                width:'20%'
            },
            {
                header:'Percentage',
                dataIndex:'percent',
                style :'color:#17385B;font-weight:bold',
                width:'20%',
                renderer:function(value){
                    return '<font color=green><b>'+value+'</b></font>';
                }
            }
            ]
            });                  
              var app1=app.getController('Dashboard')
              var tabPanel = app1.getDashboard().getActiveTab();
              tabPanel.remove(Ext.getCmp('paymentchart'));
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
