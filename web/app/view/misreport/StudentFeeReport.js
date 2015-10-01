Ext.define('MyApp.view.misreport.StudentFeeReport' ,{
    extend: 'Ext.panel.Panel',
    closable:true,
    title: 'Student Fee Payment Report',
    id:'studentpaymentreport',
    layout:'fit',
    alias: 'widget.studentpaymentreport',
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },    
    initComponent: function() {
    this.items={
            xtype:'grid',
            store:'StudentPaymentReportPerClass',
            id:'studentpaymentreportgrid',
            title:'Student Payment Report in Grid Form',
            vieConfig:{
                forceFit:true
            },
            columns :[
            Ext.create('Ext.grid.RowNumberer'),
            {
                header:'Student Name',
                dataIndex:'studentname',
                style :'color:#17385B;font-weight:bold',
                 renderer:function(value){
                    return '<b>'+value+'</b>';
                }
            },
           {
                header:'Admission No',
                dataIndex:'admissionno',
                style :'color:#17385B;font-weight:bold',
                width:80,
            },{
                header:'Roll No',
                dataIndex:'rollno',
                style :'color:#17385B;font-weight:bold',
                width:60,
                hidden:true
                
            },{
                header:'January',
                dataIndex:'january',
                style :'color:#17385B;font-weight:bold',
                columns: [{
                        text     : 'Tot-Fee',
                        sortable : true,
                        dataIndex: 'jan_totfee',
                        width:60
                    }, {
                        text     : 'Paid-Fee',
                        sortable : true,
                        dataIndex: 'jan_paidfee',
                        width:60
                    }, {
                        text     : 'Status',
                        sortable : true,
                        dataIndex: 'jan_status',
                        width:40 , 
                        renderer:function(value,meta,record){
                        if(value=='Pending')                             
                        return '<center><img style="float:center;"  src="'+BASE_URL+'resources/images/blue.bmp"></center>';
                        else
                        return '<center><img style="float:center;"  src="'+BASE_URL+'resources/images/green.bmp"></center>';                            
                   }
                }]
            },{
                header:'February',
                dataIndex:'february',
                style :'color:#17385B;font-weight:bold',
                columns: [{
                        text     : 'Tot-Fee',
                        sortable : true,
                        dataIndex: 'feb_totfee',
                        width:60
                    }, {
                        text     : 'Paid-Fee',
                        sortable : true,
                        dataIndex: 'feb_paidfee',
                        width:60
                    }, {
                        text     : 'Status',
                        sortable : true,
                        dataIndex: 'feb_status',
                        width:40 , 
                        renderer:function(value,meta,record){
                        if(value=='Pending')                             
                        return '<center><img style="float:center;"  src="'+BASE_URL+'resources/images/blue.bmp"></center>';
                        else
                        return '<center><img style="float:center;"  src="'+BASE_URL+'resources/images/green.bmp"></center>';                            
                   }
                }]
            },{
                header:'March',
                dataIndex:'march',
                style :'color:#17385B;font-weight:bold',
                columns: [{
                        text     : 'Tot-Fee',
                        sortable : true,
                        dataIndex: 'mar_totfee',
                        width:60
                    }, {
                        text     : 'Paid-Fee',
                        sortable : true,
                        dataIndex: 'mar_paidfee',
                        width:60
                    }, {
                        text     : 'Status',
                        sortable : true,
                        dataIndex: 'mar_status',
                        width:40 , 
                        renderer:function(value,meta,record){
                        if(value=='Pending')                             
                        return '<center><img style="float:center;"  src="'+BASE_URL+'resources/images/blue.bmp"></center>';
                        else
                        return '<center><img style="float:center;"  src="'+BASE_URL+'resources/images/green.bmp"></center>';                            
                   }
                }]
            },{
                header:'April',
                dataIndex:'april',
                style :'color:#17385B;font-weight:bold',
                columns: [{
                        text     : 'Tot-Fee',
                        sortable : true,
                        dataIndex: 'apr_totfee',
                        width:60
                    }, {
                        text     : 'Paid-Fee',
                        sortable : true,
                        dataIndex: 'apr_paidfee',
                        width:60
                    }, {
                        text     : 'Status',
                        sortable : true,
                        dataIndex: 'apr_status',
                        width:40 , 
                        renderer:function(value,meta,record){
                        if(value=='Pending')                             
                        return '<center><img style="float:center;"  src="'+BASE_URL+'resources/images/blue.bmp"></center>';
                        else
                        return '<center><img style="float:center;"  src="'+BASE_URL+'resources/images/green.bmp"></center>';                            
                   }
                }]
            },{
                header:'May',
                dataIndex:'may',
                style :'color:#17385B;font-weight:bold',
                columns: [{
                        text     : 'Tot-Fee',
                        sortable : true,
                        dataIndex: 'may_totfee',
                        width:60
                    }, {
                        text     : 'Paid-Fee',
                        sortable : true,
                        dataIndex: 'may_paidfee',
                        width:60
                    }, {
                        text     : 'Status',
                        sortable : true,
                        dataIndex: 'may_status',
                        width:40 , 
                        renderer:function(value,meta,record){
                        if(value=='Pending')                             
                        return '<center><img style="float:center;"  src="'+BASE_URL+'resources/images/blue.bmp"></center>';
                        else
                        return '<center><img style="float:center;"  src="'+BASE_URL+'resources/images/green.bmp"></center>';                            
                   }
                }]
            },{
                header:'June',
                dataIndex:'june',
                style :'color:#17385B;font-weight:bold',
                 columns: [{
                        text     : 'Tot-Fee',
                        sortable : true,
                        dataIndex: 'jun_totfee',
                        width:60
                    }, {
                        text     : 'Paid-Fee',
                        sortable : true,
                        dataIndex: 'jun_paidfee',
                        width:60
                    }, {
                        text     : 'Status',
                        sortable : true,
                        dataIndex: 'jun_status',
                        width:40 , 
                        renderer:function(value,meta,record){
                        if(value=='Pending')                             
                        return '<center><img style="float:center;"  src="'+BASE_URL+'resources/images/blue.bmp"></center>';
                        else
                        return '<center><img style="float:center;"  src="'+BASE_URL+'resources/images/green.bmp"></center>';                            
                   }
                }]
            },{
                header:'July',
                dataIndex:'july',
                style :'color:#17385B;font-weight:bold',
                columns: [{
                        text     : 'Tot-Fee',
                        sortable : true,
                        dataIndex: 'jul_totfee',
                        width:60
                    }, {
                        text     : 'Paid-Fee',
                        sortable : true,
                        dataIndex: 'jul_paidfee',
                        width:60
                    }, {
                        text     : 'Status',
                        sortable : true,
                        dataIndex: 'jul_status',
                        width:40 , 
                        renderer:function(value,meta,record){
                        if(value=='Pending')                             
                        return '<center><img style="float:center;"  src="'+BASE_URL+'resources/images/blue.bmp"></center>';
                        else
                        return '<center><img style="float:center;"  src="'+BASE_URL+'resources/images/green.bmp"></center>';                            
                   }
                }]
            },{
                header:'August',
                dataIndex:'august',
                style :'color:#17385B;font-weight:bold',
                columns: [{
                        text     : 'Tot-Fee',
                        sortable : true,
                        dataIndex: 'aug_totfee',
                        width:60
                    }, {
                        text     : 'Paid-Fee',
                        sortable : true,
                        dataIndex: 'aug_paidfee',
                        width:60
                    }, {
                        text     : 'Status',
                        sortable : true,
                        dataIndex: 'aug_status',
                        width:40 , 
                        renderer:function(value,meta,record){
                        if(value=='Pending')                             
                        return '<center><img style="float:center;"  src="'+BASE_URL+'resources/images/blue.bmp"></center>';
                        else
                        return '<center><img style="float:center;"  src="'+BASE_URL+'resources/images/green.bmp"></center>';                            
                   }
                }]
            },{
                header:'September',
                dataIndex:'september',
                style :'color:#17385B;font-weight:bold',
                columns: [{
                        text     : 'Tot-Fee',
                        sortable : true,
                        dataIndex: 'sep_totfee',
                        width:60
                    }, {
                        text     : 'Paid-Fee',
                        sortable : true,
                        dataIndex: 'sep_paidfee',
                        width:60
                    }, {
                        text     : 'Status',
                        sortable : true,
                        dataIndex: 'sep_status',
                        width:40 , 
                        renderer:function(value,meta,record){
                        if(value=='Pending')                             
                        return '<center><img style="float:center;"  src="'+BASE_URL+'resources/images/blue.bmp"></center>';
                        else
                        return '<center><img style="float:center;"  src="'+BASE_URL+'resources/images/green.bmp"></center>';                            
                   }
                }]
            },{
                header:'October',
                dataIndex:'october',
                style :'color:#17385B;font-weight:bold',
                columns: [{
                        text     : 'Tot-Fee',
                        sortable : true,
                        dataIndex: 'oct_totfee',
                        width:60
                    }, {
                        text     : 'Paid-Fee',
                        sortable : true,
                        dataIndex: 'oct_paidfee',
                        width:60
                    }, {
                        text     : 'Status',
                        sortable : true,
                        dataIndex: 'oct_status',
                        width:40 , 
                        renderer:function(value,meta,record){
                        if(value=='Pending')                             
                        return '<center><img style="float:center;"  src="'+BASE_URL+'resources/images/blue.bmp"></center>';
                        else
                        return '<center><img style="float:center;"  src="'+BASE_URL+'resources/images/green.bmp"></center>';                            
                   }
                }]
            },{
                header:'November',
                dataIndex:'november',
                style :'color:#17385B;font-weight:bold',
                columns: [{
                        text     : 'Tot-Fee',
                        sortable : true,
                        dataIndex: 'nov_totfee',
                        width:60
                    }, {
                        text     : 'Paid-Fee',
                        sortable : true,
                        dataIndex: 'nov_paidfee',
                        width:60
                    }, {
                        text     : 'Status',
                        sortable : true,
                        dataIndex: 'nov_status',
                        width:60,
                        renderer:function(value,meta,record){
                        if(value=='Pending')                             
                        return '<center><img style="float:center;"  src="'+BASE_URL+'resources/images/blue.bmp"></center>';
                        else
                        return '<center><img style="float:center;"  src="'+BASE_URL+'resources/images/green.bmp"></center>';                            
                   }
                }]
            },{
                header:'December',
                dataIndex:'december',
                style :'color:#17385B;font-weight:bold',
                columns: [{
                        text     : 'Tot-Fee',
                        sortable : true,
                        dataIndex: 'dec_totfee',
                        width:60
                    }, {
                        text     : 'Paid-Fee',
                        sortable : true,
                        dataIndex: 'dec_paidfee',
                        width:60
                    }, {
                        text     : 'Status',
                        sortable : true,
                        dataIndex: 'dec_status',
                        width:60,
                        renderer:function(value,meta,record){
                        if(value=='Pending')                             
                        return '<center><img style="float:center;"  src="'+BASE_URL+'resources/images/blue.bmp"></center>';
                        else
                        return '<center><img style="float:center;"  src="'+BASE_URL+'resources/images/green.bmp"></center>';                            
                   }
                }]
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
       id:'studentpaymentclasscombo',
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
               var classid  =Ext.getCmp('studentpaymentclasscombo').getValue();                                
                if(classid!==null)    
                {
                 Ext.getCmp('studentpaymentreportgrid').getStore().load({
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
                            style:{
                               width:'40',
                            },
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
