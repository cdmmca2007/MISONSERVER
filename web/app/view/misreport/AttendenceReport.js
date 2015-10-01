Ext.define('MyApp.view.misreport.AttendenceReport' ,{
    extend: 'Ext.panel.Panel',
    closable:true,
    title: 'Attendence Report',
    id:'atttabendencereport',
    layout:'fit',
    height :300,
    alias: 'widget.attendencereport',
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },    
    initComponent: function() {
    this.items={
            xtype:'grid',
            store:'ClassAttendenceReport',
            id:'attendencereport',
            title:'Attendence Report in Grid Form',
            width:300,
            vieConfig:{
                forceFit:true
            },
            columns :[
            Ext.create('Ext.grid.RowNumberer'),
            {
                header: 'Class Name',
                dataIndex:'classname',
                style :'color:#17385B;font-weight:bold',
                width:'20%'
            },
            {
                header:'Month Name',
                dataIndex:'month',
                style :'color:#17385B;font-weight:bold',
                width:'20%'
            },
            {
                header:'Total Present',
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
                dataIndex:'percentage',
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
       id:'attclasscombo',
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
               var classid  =Ext.getCmp('attclasscombo').getValue();                                
                if(classid!==null)    
                {
                 Ext.getCmp('attendencereport').getStore().load({
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
                var classid  =Ext.getCmp('attclasscombo').getValue();                                
                if(classid!==null)    
                {
                 var chart = Ext.create('Ext.chart.Chart', {
                        style: 'background:#fff',
                        animate: true,
                        shadow: true,
                        id    :'attchart',
                        store: Ext.getCmp('attendencereport').getStore(),
                        axes: [{
                            type: 'Numeric',
                            position: 'left',
                            fields: ['percentage'],
                            label: {
                                renderer: Ext.util.Format.numberRenderer('0,0')
                            },
                            title: 'Total Present Percentage',
                            grid: true,
                            minimum: 0
                        }, {
                            type: 'Category',
                            position: 'bottom',
                            fields: ['month'],
                            title: 'Month of the Year'
                        }],
                        series: [{
                            type: 'column',
                            axis: 'left',
                            style:{
                               width:'40',
                            },
                            highlight: true,
                            tips: {
                              trackMouse: true,
                              width: 110,
                              height: 70,
                              renderer: function(storeItem, item) {
                                this.setTitle(storeItem.get('month') + ': ' + storeItem.get('percentage') + ' % <br> <font color=green>Total Present :'+ storeItem.get('present') +'</font> <br><font color=red>Total Absent :'+storeItem.get('absent')+'</font>');
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
                            yField: 'percentage',
                            renderer: function(sprite, record, attr, index, store) {
                            var fieldValue = Math.random() * 20 + 10;
                            var value = (record.get('percentage') >> 0) % 5;
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
              tabPanel.remove(Ext.getCmp('attendencereport'));
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
             var classid  =Ext.getCmp('attclasscombo').getValue();                                
             if(classid!==null)    
              {
              var grid=Ext.create('Ext.grid.Panel',{
                    store:Ext.StoreMgr.lookup('ClassAttendenceReport').load({
                            params:{
                                classid   :Ext.getCmp('attclasscombo').getValue(),
                                sessionid :SETTING.Users.properties.session_id        

                    }}
                    ),
                    id:'attendencereport',
                    title:'Attendence Report in Grid Form',
                    width:300,
                    vieConfig:{
                        forceFit:true
                    },
                    columns :[
                    Ext.create('Ext.grid.RowNumberer'),
                    {
                        header: 'Class Name',
                        dataIndex:'classname',
                        style :'color:#17385B;font-weight:bold',
                        width:'20%'
                    },
                    {
                        header:'Month Name',
                        dataIndex:'month',
                        style :'color:#17385B;font-weight:bold',
                        width:'20%'
                    },
                    {
                        header:'Total Present',
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
                        dataIndex:'percentage',
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
              tabPanel.remove(Ext.getCmp('attchart'));
              tabPanel.add(grid);
              }
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
