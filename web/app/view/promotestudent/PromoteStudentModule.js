Ext.define('MyApp.view.promotestudent.PromoteStudentModule' ,{
    extend: 'Ext.panel.Panel',
    closable:true,
    title: 'Promote Student Module',
    alias: 'widget.promotestudentmodule',    
    id:'promotestudentmodule',
    closable:true,
    //id :'psmgrid',
    //features: [{ftype:'grouping'}],
    //features: [{ftype:'summary'},{ftype:'grouping'}],
    //store:'PromoteStudentModule',    
    viewConfig:{
        forceFit:true
    },
    layout:{
        type:'hbox',
        align:'stretch'
    },
    initComponent: function() {
        
    var masterSM = Ext.create('Ext.selection.CheckboxModel',{
            singleSelect:true,
            listeners:{
                selectionchange : function(sm){
                } 
            }
        });    
        
    this.items=[{
                xtype:'grid',  
                id :'psmstudentgrid',
                store:'PSMStudent',    
                //selModel:masterSM,
                width:250,       
                viewConfig:{
                     forceFit:true
                },
                columns:[Ext.create('Ext.grid.RowNumberer'),
                {
                    header: 'StudentID',
                    dataIndex: 'studentid',
                    hidden   :true
                },
                {
                    header: 'Student Name',
                    dataIndex: 'studentname',
                    width :100,
                    style :'color:#17385B;font-weight:bold'
                },{
                    header: 'Pass/Fail',
                    dataIndex: 'resultstatus',
                    id:'resultstatus',
                    width :80,
                    xtype:'checkcolumn',                    
                    style :'color:#17385B;font-weight:bold',
                    stopSelection: false,
                    listeners :{
                        checkchange: function(box, rowIndex,checked,eOpts ){
                            
                        }
                    }
                    }],
                   selModel:Ext.create('Ext.selection.CheckboxModel',{
                       singleSelect:true,
                       listeners:{
                       selectionchange:function(){
                           var rec=Ext.getCmp('psmstudentgrid').getSelectionModel().getSelection()[0];  
                           
                           Ext.getCmp('psmgrid').getStore().load({
                           params:{
                             batch_id   :rec.data.batch_id,
                             studentid  :rec.data.studentid
                               }
                           });
                }
              }        
                })               
             },            
             {
                xtype:'grid',  
                id :'psmgrid',
                store:'PromoteStudentModule',    
                //features: [{ftype:'grouping'}],
                columns:[Ext.create('Ext.grid.RowNumberer'),
                {
                    header: 'StudentID',
                    dataIndex: 'studentid',
                    hidden   :true
                },
                {
                    header: 'Exam Type',
                    dataIndex: 'examtypename',
                    width :120,
                    style :'color:#17385B;font-weight:bold'
                   // summaryType: 'count',
                   // summaryRenderer: function(value, summaryData, dataIndex) {
                   //     return Ext.String.format('{0} student{1}', value, value !== 1 ? 's' : ''); 
                   // }
                },{
                    header: 'Exam Name',
                    dataIndex: 'examname',
                    width :120,
                    style :'color:#17385B;font-weight:bold'
                },{
                    header: 'Tot Mark',
                    dataIndex: 'totalmark',
                    width :80,
                    style :'color:#17385B;font-weight:bold'
                },{
                    header: 'Tot Pass Mark',
                    dataIndex: 'totpassmark',
                    width :100,
                    style :'color:#17385B;font-weight:bold'
                },{
                    header: 'Mark Obtained',
                    dataIndex: 'totmarkobtained',
                    width :100,
                    style :'color:#17385B;font-weight:bold'
                },{
                    header: 'Percentage',
                    dataIndex: 'percentage',
                    width :100,
                    style :'color:#17385B;font-weight:bold'
                },{
                    header: 'Exam Status',
                    dataIndex: 'examstatus',
                    width :120,
                    style :'color:#17385B;font-weight:bold'
    }]
    }];    
    this.selModel=Ext.create('Ext.selection.CheckboxModel',{
        singleSelect:true
    });
    this.tbar =[{
       xtype:'button',
       style:'background:#17385B;margin:0px 110px 0px 0px',/*#05555V*/
       tooltip:'Select Student Below list and Click on it to promote the student to next class ',
       text: '<font color=white><b>Promote To Next Class</b></font>',     
    handler: function() {
      
      var records = Ext.StoreManager.lookup('PSMStudent').getModifiedRecords();
      var data = [];
      var sessionid=Ext.getCmp('psmsessioncombo').getValue(); 
            Ext.each(records, function(rec1){

                if(rec1.data.resultstatus===true){
                   rec1.data.resultstatus=1; 
                   rec1.data.sessionid=sessionid; 
                }   
                 else{
                   rec1.data.resultstatus=0;  
                   rec1.data.sessionid=sessionid;
                 }  
                data.push(rec1.data);
                
            });
            Ext.Ajax.request({
                url:'psm/promotestudent.do',
                type:'json',
                scope:this,
                headers:{
                    'Content-Type':'application/json'  
                },
                params:Ext.JSON.encode(data),
                success: function(res){
                    
                    var rec = eval('('+res.responseText+')');
                    if(rec=='1')
                    Ext.Msg.alert('Success','Student Promoted to next class, successfully');
                    else
                    Ext.Msg.alert('Failure','Error occured, Please contact Administrator');    
                }
            });         
    }
    },{
       xtype: 'combo',
       emptyText: 'Select Session',
       text   : 'Session',
       id:'psmsessioncombo',
       store:Ext.create('MyApp.store.Combo').load({
                                      params:{propertyId:-1}}),//For Session
       typeAhead: true,
       queryMode: 'local',
       Autoload:true,
       valueField :'id',
       displayField :'value', 
       value:SETTING.Users.properties.session_id,
       listeners:{
            select: function(component){
                var sessionid=Ext.getCmp('psmsessioncombo').getValue();
                Ext.getCmp('psmclasscombo').getStore().reload({
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
       id:'psmclasscombo',
       store:Ext.create('MyApp.store.ClassCombo1').load({
                                      params:{
                                          propertyId:2,
                                          classid   :SETTING.Users.properties.session_id,
                                          teacherid :SETTING.Users.userId
                                      }}),//For Session'ClassCombo1',
       typeAhead: true,
       queryMode: 'local',
       Autoload:true,
       valueField :'id',
       displayField :'value',  
       listeners:{
            select: function(component){
                
           var sessionid=Ext.getCmp('psmsessioncombo').getValue();
           var classid  =Ext.getCmp('psmclasscombo').getValue();
           
           if(sessionid!=null && classid!=null)    
                {
                   /*  Ext.getCmp('psmgrid').getStore().load({
                     params:{                             
                             classid   :classid ,
                             sessionid :sessionid
                     }
                     });
                   */  
                     Ext.getCmp('psmstudentgrid').getStore().load({
                     params:{                             
                             classid   :classid ,
                             sessionid :sessionid
                     }
                     });

                     
                }    

           }
       }
    },{
       xtype:'button',
       text: 'View Student List',     
       handler: function() {
          
           var sessionid=Ext.getCmp('psmsessioncombo').getValue();
           var classid  =Ext.getCmp('psmclasscombo').getValue();
           if(sessionid!=null && classid!=null)    
                {
                     Ext.getCmp('psmgrid').getStore().load({
                     params:{                             
                             classid   :classid ,
                             sessionid :sessionid
                     }
                     });
                }    

    }
    },{
       xtype:'button',
       text: 'Complete Exam Detail',  
       tooltip:'Select Student in Left panel to View All Exam details of Current Year',
       handler: function() {
        alert('Please Select the row to view full detail');
       }
    },{
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
    }
   ];
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

