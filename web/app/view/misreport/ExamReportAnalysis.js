Ext.define('MyApp.view.misreport.ExamReportAnalysis' ,{
    extend: 'Ext.panel.Panel',
    closable:true,
    title: 'Exam Report Analysis',
    id:'exmareportanalysis',
    layout:'fit',
    height :300,
    alias: 'widget.exmareportanalysis',
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },    
    initComponent: function() {
        
    this.items={
            xtype:'panel',
            extend: 'Ext.panel.Panel',
            id:'innerpanel-1',
            layout:{
               type:'vbox',
               align:'stretch'
            },
            viewConfig:{
                forceFit:true
            },
            flex:1,
            items:[{
            xtype:'grid',
            store:'ExamReportAnalysis',
            id:'exmareportanalysisgrid',
            title:'Exam Report in Grid Form',
            width:300,
            vieConfig:{
                forceFit:true
            },
            columns :[
            Ext.create('Ext.grid.RowNumberer'),
            {
                header:'Class Name',
                dataIndex:'classid',
                hidden:true
            },{
                header:'Class Name',
                dataIndex:'classname',
                style :'color:#17385B;font-weight:bold',
                width:'20%',
                 renderer:function(value){
                    return '<b>'+value+'</b>';
                }
            },
            {
                header:'Class Teacher Name',
                dataIndex:'classteacher',
                style :'color:#17385B;font-weight:bold',
                width:'20%',
                 renderer:function(value){
                    return '<b>'+value+'</b>';
                }
            },{
                header:'Tot Sudent',
                dataIndex:'totstudent',
                style :'color:#17385B;font-weight:bold',
                width:'15%',
                 renderer:function(value){
                    return '<b>'+value+'</b>';
                }
            },
            {
                header:'Average Result',
                dataIndex:'percent',
                style :'color:#17385B;font-weight:bold',
                width:'15%'
            },{
                header:'Topper %',
                dataIndex:'topper',
                style :'color:#17385B;font-weight:bold',
                width:'15%'
            },{
                header:'Lower %',
                dataIndex:'low',
                style :'color:#17385B;font-weight:bold',
                width:'10%'
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
                    id   :'examreportanalysisgraph',
                    height:250,
                    width :1000,
                    name   :'examreportanalysisgraph',
                    vieConfig:{
                           forceFit:true
                    },
                    items:[{
                        xtype:'grid',
                        height:250,
                        id    :'examreportanalysischart',
                        name  :'examreportanalysischart',
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
             }
    ]
    };
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
    },,{
       xtype: 'combo',
       emptyText: 'Select Session',
       hidden:true,
       text   : 'Session',
       id:'examreportanalysissessioncombo',
       store:Ext.create('MyApp.store.Combo').load({
                                      params:{propertyId:-1}}),//Get Session Details
       width : 110,        
       queryMode: 'local',
       Autoload:true,
       valueField :'id',
       displayField :'value',   
       editable: false,
       value:SETTING.Users.properties.session_id,
       listeners:{
            select: function(component){
                //var sessionid=Ext.getCmp('reportdattsessioncombo').getValue();
            }
       }
    },{
       xtype: 'combo',
       emptyText: 'Select Exam Type',
       text   : 'Exam Type',
       id:'reportanalyexamtypecombo',
       width: 90,
       store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:5}}),//For Teacher
       typeAhead: true,
       queryMode: 'local',
       Autoload:true,
       valueField :'id',
       displayField :'value',  
       listeners:{
            select: function(component){
                
                 var sessionid =Ext.getCmp('examreportanalysissessioncombo').getValue();
                 var examtypeid=Ext.getCmp('reportanalyexamtypecombo').getValue();
                if(examtypeid!==null && sessionid!=null)    
                {
                    Ext.getCmp('exmareportanalysisgrid').getStore().load({
                    params:{   
                             sessionid :sessionid,//SETTING.Users.properties.session_id        
                             examtypeid:examtypeid
                    }
                    }); 
                    
                    var chart = Ext.create('Ext.chart.Chart', {
                        style: 'background:#fff',
                        animate: true,
                        shadow: true,
                        height:300,
                        width :1000,
                        id    :'examreportanalysischart',
                        store: Ext.getCmp('exmareportanalysisgrid').getStore(),
                        axes: [{
                            type: 'Numeric',
                            position: 'left',
                            fields: ['percent'],
                            label: {
                                renderer: Ext.util.Format.numberRenderer('0,0')
                            },
                            title: 'Aveenrage Class Percentage',
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
                              width: 350,
                              height: 130,
                              renderer: function(storeItem, item) {
                                v_batch_id= storeItem.get('classid');
                                v_classname=storeItem.get('classname');
                                this.setTitle('Class Name : '+storeItem.get('classname') + '<br>Class Teacher : ' + storeItem.get('classteacher') + '<br>Average Result : ' + storeItem.get('percent')+ '<br>Topper Result : ' + storeItem.get('topper')+ '<br>Lowest Result : ' + storeItem.get('low')+'<br><br><font color=red>Click on Bar to see subject-wise for: </font>'+storeItem.get('classname'));
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
                            
                            var sessionid =Ext.getCmp('examreportanalysissessioncombo').getValue();
                            var examtypeid=Ext.getCmp('reportanalyexamtypecombo').getValue();
                                
                            var v_store=Ext.create('MyApp.store.ExamReportAnalysisSubjectWise');
                            v_store.load({
                                params:{
                                     sessionid:sessionid,
                                     examtypeid:examtypeid,
                                     classid :v_batch_id
                                    }
                            });    
                                
                            var win;
                            if(!win){

                               win=Ext.create('Ext.window.Window', {
                                    title:'Class: <b><font color=red>'+v_classname+'</font></b> Result subject-wise',
                                    id:'studreslcomp',
                                    width:750,
                                    height:550,
                                    closeAction:'destroy',
                                    layout: 'fit',
                                    items :[
                                      {
                                            xtype:'panel',
                                            extend: 'Ext.panel.Panel',
                                            id:'rcinnerpanel',
                                            layout:{
                                               type:'vbox',
                                               align:'stretch'
                                            },
                                            viewConfig:{
                                                forceFit:true
                                            },
                                            flex:1,
                                            items:[
                                                {
                                                        title:'Subject-wise Result Analysis',
                                                        xtype:'panel',
                                                        extend: 'Ext.panel.Panel',
                                                        id   :'subjectwiseresultofclassgrid',
                                                        layout: 'fit',
                                                        items:{
                                                                    xtype:'grid',
                                                                    store:v_store,
                                                                    id:'exmareportanalysissubjectwisegrid',
                                                                    width:250,
                                                                    vieConfig:{
                                                                        forceFit:true
                                                                    },
                                                                    columns :[
                                                                    Ext.create('Ext.grid.RowNumberer'),
                                                                    {
                                                                        header:'Subject Name',
                                                                        dataIndex:'subjectname',
                                                                        style :'color:#17385B;font-weight:bold',
                                                                        width:'20%',
                                                                         renderer:function(value){
                                                                            return '<b>'+value+'</b>';
                                                                        }
                                                                    },
                                                                    {
                                                                        header:'Subject Teacher Name',
                                                                        dataIndex:'subjectteacher',
                                                                        style :'color:#17385B;font-weight:bold',
                                                                        width:'20%',
                                                                         renderer:function(value){
                                                                            return '<b>'+value+'</b>';
                                                                        }
                                                                    },{
                                                                        header:'Average Result',
                                                                        dataIndex:'percent',
                                                                        style :'color:#17385B;font-weight:bold',
                                                                        width:'20%',
                                                                         renderer:function(value){
                                                                            return '<b>'+value+'</b>';
                                                                        }
                                                                    },
                                                                    {
                                                                        header:'Topper %',
                                                                        dataIndex:'topperno',
                                                                        style :'color:#17385B;font-weight:bold',
                                                                        width:'20%'
                                                                    },{
                                                                        header:'Lower %',
                                                                        dataIndex:'lowno',
                                                                        style :'color:#17385B;font-weight:bold',
                                                                        width:'10%'
                                                                    }
                                                                    ]},
                                                        height:250
                                                },
                                                {
                                                        title:'Exam Result Analysis Subject-wise',
                                                        xtype:'panel',
                                                        extend: 'Ext.panel.Panel',
                                                        id   :'subjectwiseresultofclassgraphpanel',
                                                        layout: 'fit',
                                                        items:[{
                                                                xtype:'panel',
                                                                extend: 'Ext.panel.Panel',
                                                                id   :'graph',
                                                                height:300,
                                                                width :740,
                                                                name   :'subjectwiseresultofclassgraph',
                                                                vieConfig:{
                                                                       forceFit:true
                                                                },
                                                                items:[
                                                                    {
                                                                    xtype:'chart',style: 'background:#fff',
                                                                    animate: true,
                                                                    shadow: true,
                                                                    height:200,
                                                                    width :730,
                                                                    id    :'subjectwiseresultofclasschart1',
                                                                    store: v_store,
                                                                    axes: [{
                                                                        type: 'Numeric',
                                                                        position: 'left',
                                                                        fields: ['percent'],
                                                                        label: {
                                                                            renderer: Ext.util.Format.numberRenderer('0,0')
                                                                        },
                                                                        title: 'Average Subject-wise Result',
                                                                        grid: true,
                                                                        minimum: 0,
                                                                        maximum:100
                                                                    }, {
                                                                        type: 'Category',
                                                                        position: 'bottom',
                                                                        fields: ['subjectname'],
                                                                        title: 'Subject Name'
                                                                    }],
                                                                    series: [{
                                                                        type: 'column',
                                                                        axis: 'left',
                                                                        highlight: true,
                                                                        style:{
                                                                           width:'20',
                                                                        },
                                                                        tips: {
                                                                          trackMouse: true,
                                                                          width: 200,
                                                                          height: 100,
                                                                          renderer: function(storeItem, item) {
                                                                            this.setTitle(storeItem.get('classname') + ': ' + storeItem.get('percent') + ' %<br>Total Stength : '+storeItem.get('total')+' <br> <font color=green>Total Present :'+ storeItem.get('present') +'</font> <br><font color=red>Total Absent :'+storeItem.get('absent')+'</font><br><br><font color=red>Click on bar to get more details</font>');

                                                                          }
                                                                        },
                                                                        label: {
                                                                          display: 'insideEnd',
                                                                          'text-anchor': 'middle',
                                                                          renderer: Ext.util.Format.numberRenderer('0'),
                                                                          orientation: 'vertical',
                                                                          color: 'red'
                                                                        },
                                                                        xField: 'subjectname',
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
                                                                            //getListOfAbsentStudent(v_batch_id,v_classname);

                                                                        }
                                                                    }

                                                                }   
                                                                        
                                                                    }    
                                                                ]
                                                            }],
                                                        height:300
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
                
              }

              } 
              });
              Ext.getCmp('examreportanalysisgraph').remove(Ext.getCmp('examreportanalysischart'));
              Ext.getCmp('examreportanalysisgraph').add(chart);
              Ext.getCmp('examreportanalysisgraph').doLayout();
             } 
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
