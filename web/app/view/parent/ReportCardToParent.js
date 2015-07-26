function reportcard(alldata){

    Ext.create('MyApp.view.parent.ReportCardWindow',{
          title:'Student Report Card',
          reportCard:alldata
      }).show();
}


Ext.define('MyApp.view.parent.ReportCardToParent' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.reportcardtoparent',
    closable:true,
    title: 'Exam & Report Card',
    id:'reportcardtoparent',
    layout:'fit',
    store:'StudentMarkEntry',    
    selModel: {
        selType: 'cellmodel'
    },
    features: [{
        ftype: 'summary'
    }],
    tbar :[{
       xtype: 'combobox',
       emptyText: 'Select Session',
       id:'sessioncombo',
       store:Ext.create('MyApp.store.Combo').load({
                                      params:{propertyId:-1}}),//For Session
       queryMode: 'local',
       width : 100,        
       Autoload:true,
       valueField :'id',
       displayField :'value',  
       value:SETTING.Users.properties.session_id,
       listeners:{
            select: function(component){
                var sessionid=Ext.getCmp('sessioncombo').getValue();


               Ext.getCmp('classcombo').getStore().load({
                     params:{
                             propertyId:2,///Class List
                             classid   :sessionid,
                             teacherid :SETTING.Users.userId
                     }
               });
            }
       }
    },{
       xtype: 'combo',
       emptyText: 'Select Class',
       text   : 'Class',
       id:'classcombo',
       width : 100,        
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
                var id=Ext.getCmp('classcombo').getValue();
                var sessionid=Ext.getCmp('sessioncombo').getValue();
                
                Ext.getCmp('studentcombo').getStore().load({
                     params:{
                             propertyId:7,///Student List
                             classid   :id+'&'+sessionid,
                             teacherid:SETTING.Users.userId
                     }
               });
            }
       }
    },{
       xtype: 'combo',
       emptyText: 'Select Exam Type',
       text   : 'Exam Type',
       id:'examtypecombo',
       width : 100,        
       store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:5}}),//For Teacher
       typeAhead: true,
       queryMode: 'local',
       Autoload:true,
       valueField :'id',
       displayField :'value',  
       listeners:{
            select: function(component){
            }
       }
    },
    {
       xtype: 'combobox',
       emptyText: 'Select Student',
       text   : 'Student',
       id:'studentcombo',
       store:'ClassCombo',
       typeAhead: true,
       queryMode: 'local',
       Autoload:true,
       valueField :'id',
       displayField :'value',  
       listeners:{
            select: function(component){
                
            }
       }
    },{
        iconCls: 'icon-add',
        text: 'Exam Detail', 
        tooltip:'Examination date Timing Detail ',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    
                var classid     =Ext.getCmp('classcombo').getValue();                
                var sessionid   =Ext.getCmp('sessioncombo').getValue();                
                var examtypeid=Ext.getCmp('examtypecombo').getValue();                
                var studentid   =Ext.getCmp('studentcombo').getValue();    
                var subjectid =null;
              });

            }
        }     
    },{
        iconCls: 'icon-add',
        text: 'View Result', 
        tooltip:'View Student Result',
        listeners:{
          render: function(component){
                component.getEl().on('click', function(){
                    
                var classid     =Ext.getCmp('classcombo').getValue();                
                var sessionid   =Ext.getCmp('sessioncombo').getValue();                
                var examtypeidid=Ext.getCmp('examtypecombo').getValue();                
                var studentid   =Ext.getCmp('studentcombo').getValue();    
                var subjectid =null;
                
                Ext.getCmp('reportcardtoparent').getStore().load({
                            params:{'classid':classid,
                                    'sessionid':sessionid,
                                    'examtypeidid':examtypeidid,
                                    'studentid':studentid,
                                    'subjectid':subjectid
                }});                
              });

            }
        }    
    },{
        iconCls: 'icon-add',
        text: 'View Report Card', 
        tooltip:'View Student Report Card',
        listeners:{
          render: function(component){
                component.getEl().on('click', function(){
                    
                var classid     =Ext.getCmp('classcombo').getValue();                
                var sessionid   =Ext.getCmp('sessioncombo').getValue();                
                var examtypeid=Ext.getCmp('examtypecombo').getValue();                
                var studentid   =Ext.getCmp('studentcombo').getValue();    
                var data={
                    'classid':classid,   
                    'sessionid':sessionid,
                    'examtypeidid':examtypeid,
                    'studentid':studentid,
                    'subjectid':null
                };
              
                Ext.Ajax.request({
                    url:'reportcard/get.do',
                    type:'json',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    params:Ext.JSON.encode(data),
                    success: function(res){
                        var alldata = eval('('+res.responseText+')');
                        reportcard(alldata);
                    }
                });    
              });
              
              
              
       /*       var store=  Ext.getStore('StudentMarkEntry');
                
              Ext.create('MyApp.view.parent.ReportCardWindow',{
                    title:'Student Report Card',
                    reportCard:null
                }).show();*/
            }
        }      
    },{
        xtype:'button',
        text:'<b>Previous Result Comparison</b>',
        iconCls: 'icon-add',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                var classid     =Ext.getCmp('classcombo').getValue();                
                var sessionid   =Ext.getCmp('sessioncombo').getValue();                
                var studentid   =Ext.getCmp('studentcombo').getValue();    
                  
                if(classid!=null && sessionid!=null && studentid!=null){
                 
                        
                 var chart = Ext.create('Ext.chart.Chart', {
                        style: 'background:#fff',
                        animate: true,
                        shadow: true,
                        id    :'srccompchart',
                        /*legend: {
                              position: 'center'
                        },*/
                        store: Ext.create('MyApp.store.StudentReportCardComparison').load({
                                      params:{
                                          'classid':classid,
                                          'sessionid':sessionid,
                                          'studentid':studentid
                                      }}),
                        axes: [{
                            type: 'Numeric',
                            position: 'left',
                            fields: ['percentage'],
                            title: 'Percentage Scored',
                            label: {
                                renderer: Ext.util.Format.numberRenderer('0,0')
                            },
                            grid: true,
                            minimum: 0,
                            maximum:100
                        }, {
                            type: 'Category',
                            position: 'bottom',
                            fields: ['examtypename'],
                            title: 'Exam Name'
                        }],
                        series: [{
                            type: 'column',
                            axis: 'left',
                            highlight: true,
                            tips: {
                              trackMouse: true,
                              width: 210,
                              height: 100,
                              renderer: function(storeItem, item) {
                                this.setTitle('Examination : '+storeItem.get('examtypename') + ' <br>Percentage : ' + storeItem.get('percentage') );
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
                            xField: 'examtypename',
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
                var field=[];
                var rec=[];
                var subjectStore=Ext.create('MyApp.store.ClassSubjectCombo');
                var store_1;
                var series1 = [];
                var sec_chart;
                subjectStore.load({
                    params:{
                             propertyId:1,///Get Subject list teacher tought
                             classid   :Ext.getCmp('classcombo').getValue(),
                             teacherid :SETTING.Users.userId,
                             sessionid :SETTING.Users.properties.session_id
                    }
                    ,callback:function(record,option,success){
                       
                             for (x=0;x<subjectStore.getCount();x++){
                               rec[x]=subjectStore.getAt(x).data;
                               field.push(rec[x].value);
                             }
                             field.push('examtypename');
                             store_1=Ext.create('MyApp.store.StudentReportCardComparisonSecChart', {
                                   extend: 'Ext.data.Store',
                                   fields :field, 
                                   proxy: {
                                        type: 'ajax',
                                        url: 'studentmark/getresltcomprsn1.do',
                                        reader: {
                                            type: 'json',
                                            root: 'rows'
                                        }
                                    },
                                    autoLoad:false
                             });
                      rec=[];
                      for(var i=0;i<subjectStore.getCount();i++){
                          rec[i]=subjectStore.getAt(i).data;   
                          
                          var obj1 = 
                                    {
                                          id:rec[i].value,
                                          type: 'line'
                                         ,axis: 'left'
                                         ,smooth: true,
                                          xField: 'examtypename',
                                          yField: rec[i].value,
                                          markerConfig: {
                                           type: 'circle',
                                           size: 6,
                                           radius: 6,
                                           'stroke-width': 0
                                       }
                                    };
                          /*var obj1= new Ext.create('Ext.chart.LineSeries', {
                                       type: 'line',
                                       smooth: true,
                                       axis: 'left',
                                       id:rec[i].value,
                                       xField: 'examtypename',
                                       yField: rec[i].value,
                                       markerConfig: {
                                           type: 'circle',
                                           size: 4,
                                           radius: 4,
                                           'stroke-width': 0
                                       }
                                       });*/
                           series1.push(obj1);
                       };   
                 
                 store_1.load({params:{
                            'classid':classid,
                            'sessionid':sessionid,
                            'studentid':studentid
                             }}); 
                
                sec_chart = new Ext.create('Ext.chart.Chart', {
                        style: 'background:#fff',
                        animate: true,
                        shadow: true,
                        id    :'secsrccompchart',
                        legend: {
                           position: 'right'
                        },
                        store: store_1,
                        axes: [{
                            type: 'Numeric',
                            position: 'left',
                            fields: field,
                            minorTickSteps: 1,
                            grid: {
                                odd: {
                                    opacity: 1,
                                    fill: '#ddd',
                                    stroke: '#bbb',
                                    'stroke-width': 0.5
                                }
                            },        
                            title: 'Number Obtained',
                            label: {
                        
                                renderer: Ext.util.Format.numberRenderer('0,0')
                            },
                            grid: true,
                            minimum: 0,
                            maximum:100
                        }, {
                            type: 'Category',
                            position: 'bottom',
                            fields: ['examtypename'],
                            title: 'Exam Name'
                        }],
                        series: series1
                    });  
                    
              

                var classname     =Ext.getCmp('classcombo').getRawValue();                
                var studentname   =Ext.getCmp('studentcombo').getRawValue();    
                var win;
                if(!win){
                    
                   win=Ext.create('Ext.window.Window', {
                        title:'Class: <b><font color=red>'+classname+'</font></b> | Student Name :<b><font color=red>'+studentname+'</font></b> | Result Comparison',
                        id:'studreslcomp',
                        width:650,
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
                                            title:'Exam Result Comparison By All Exam',
                                            xtype:'panel',
                                            extend: 'Ext.panel.Panel',
                                            id   :'byexamname',
                                            layout: 'fit',
                                            items:chart,
                                            height:250
                                    },
                                    {
                                            title:'Exam Result Comparison Subject-wise',
                                            xtype:'panel',
                                            extend: 'Ext.panel.Panel',
                                            id   :'bysubjectname',
                                            layout: 'fit',
                                            items:sec_chart,
                                            height:250
                                    }
                                ]

                          } 
                        ],
                        buttons :[
                        {
                            text: 'Save',
                            action: 'save',
                            scope:this,
                            listeners:{
                            render: function(component){
                            component.getEl().on('click', function(){                                        
                                
                             });
                            }
                          }
                        },
                        {xtype:'btncancel'}
                        ]
                    });
                }
                win.show();          
                         
                 }});
                                   
                }    
                    
                });

            }
        }
    }    
    ],
     bbar : Ext.create('Ext.PagingToolbar', {
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
    },]
    }),
    initComponent: function() {
        
        var me=this;
        
        this.teacherStore=Ext.create('MyApp.store.Combo');
        this.teacherStore.load({
            params:{propertyId:1}
        });

        this.examtypeStore=Ext.create('MyApp.store.Master');
        this.examtypeStore.load({
               params:{propertyId:5}
        }),//For Exam Type
                  
        this.SessionStore=Ext.create('MyApp.store.Master');
        this.SessionStore.load({
               params:{propertyId:6}
        });
      /*  this.appearedStore=Ext.create('MyApp.store.Master');
        this.appearedStore.load({
               params:{propertyId:7},callback :function(){
                   Ext.getCmp('studentmarkentry').getStore().reload();
               } 
        });*/
        this.columns=[
        Ext.create('Ext.grid.RowNumberer'),
        {
          
            header    : 'Current Session',
            dataIndex :'sessionname',
            width : '10%',        
            style :'color:#17385B;font-weight:bold'
        },
         {
          
            header    : 'Exam Type',
            dataIndex :'examtype' ,
            width : '10%',        
            style :'color:#17385B;font-weight:bold'
        },{
            header: 'Exam Name',
            dataIndex:'examname',
            width : '13%',        
            style :'color:#17385B;font-weight:bold'
        },
        {
            header: 'Class Name',
            dataIndex:'classname',
            width : '10%',        
            style :'color:#17385B;font-weight:bold',
            hidden:true
        },
        {
          
            header    : 'Subject',
            dataIndex :'subjectname',
            width : '13%',        
            style :'color:#17385B;font-weight:bold',
            renderer : function(value){
                  return '<font color=green><b>'+value+'</font></b>';
            }       

        },{
            header:'Max Mark',
            dataIndex:'maxmark',
            width : '10%',        
            style :'color:#17385B;font-weight:bold',
            summaryType:'sum',
            renderer : function(value){
                  return '<font color=green><b>'+value+'</font></b>';
            }       
            
        },
        {
            header:'Pass Mark',
            dataIndex:'passmark',
            width : '10%',        
            style :'color:#17385B;font-weight:bold',
            summaryType:'sum',
            renderer : function(value){
                  return '<font color=green><b>'+value+'</font></b>';
            }       
            
        },{
          
            header    : 'Appeared',
            dataIndex :'appeared',
            width : '10%',        
            style :'color:#17385B;font-weight:bold',
            renderer : function(value){
                if(value=='1')
                return '<b>Present</b>';
                else
                return '<font color=red><b>Absent</b></font>';    
            }
        },
        {
            header:'Mark Obtained',
            dataIndex:'markobtained',
            width : '10%',        
            style :'color:#17385B;font-weight:bold',
            summaryType:'sum',
            renderer : function(value,metadata,record){
            	  if(record.data.markobtained >= record.data.passmark) 
                  return '<font color=green><b>'+value+'</font></b>';
                  else{
                  return '<font color=red><b>'+value+'</font></b>';    
                  }
            }
        },
        {
            header:'Grade',
            dataIndex:'grade',
            width : '10%',        
            style :'color:#17385B;font-weight:bold',
            renderer : function(value,metadata,record){
            }
        }         
        
        ];
        this.selModel = Ext.create('Ext.selection.CheckboxModel',{
            singleSelect:true
        });
        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: this.store,
            displayInfo: true,
            displayMsg: 'Displaying users {0} - {1} of {2}',
            emptyMsg: "No user to display"
        }),

        this.callParent(arguments);
       // this.store.load();
    },

    onRender : function(){
        //this.selModel.on('selectionchange', this.onSelectChange);
        
        
        this.callParent(arguments);

    },
    selectionChange : function(sm, selected,eOpts){
        alert('fff');
        if(sm.getCount()){
            alert('fff');
        }
    }
});











