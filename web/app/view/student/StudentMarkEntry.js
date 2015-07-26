var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 1
});


Ext.define('MyApp.view.student.StudentMarkEntry' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.studentmarkentry',
    closable:true,
    title: 'Mark Entry For Class',
    id:'studentmarkentry',
    layout:'fit',
    store:'StudentMarkEntry',    
    selModel: {
        selType: 'cellmodel'
    },
    plugins: [cellEditing],
    tbar :[{
       xtype: 'combo',
       emptyText: 'Select Session',
       text   : 'Session',
       id:'sessioncombo_id',
       hidden:true,
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
                var sessionid=Ext.getCmp('sessioncombo_id').getValue();

                Ext.getCmp('classcombo_id').getStore().load({
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
       emptyText: 'Select Exam Type',
       text   : 'Exam Type',
       id:'examtypecombo',
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
    },{
       xtype: 'combo',
       emptyText: 'Select Class',
       text   : 'Class',
       id:'classcombo_id',
       store:Ext.create('MyApp.store.ClassCombo1').load({
                                      params:{
                                          propertyId:2,
                                          classid   :SETTING.Users.properties.session_id,
                                          teacherid :SETTING.Users.userId
                       }}),
       typeAhead: true,
       queryMode: 'local',
       Autoload:true,
       valueField :'id',
       displayField :'value', 
       
       listeners:{
            select: function(component){
                var id=Ext.getCmp('classcombo_id').getValue();
                var sessionid=Ext.getCmp('sessioncombo_id').getValue();

                Ext.getCmp('subjectcombo_id').getStore().load({
                     params:{
                             propertyId:1,///Get Subject list teacher tought
                             classid   :id,
                             teacherid :SETTING.Users.userId,
                             sessionid :sessionid
                     }
                });
               
                Ext.getCmp('studentcombo_id').getStore().load({
                     params:{
                             propertyId:7,///Student List
                             classid   :id+'&'+sessionid  ,
                             teacherid :SETTING.Users.userId
                     }
               });
            }
       }
    },{
       xtype: 'combobox',
       emptyText: 'Select Subject',
       id:'subjectcombo_id',
       store:'ClassSubjectCombo',
       typeAhead: true,
       queryMode: 'local',
       Autoload:true,
       valueField :'id',
       displayField :'value',  
       listeners:{
            select: function(component){

                var classid     =Ext.getCmp('classcombo_id').getValue();                
                var sessionid   =Ext.getCmp('sessioncombo_id').getValue();                
                var examtypeidid=Ext.getCmp('examtypecombo').getValue();                
                var studentid   =Ext.getCmp('studentcombo_id').getValue();    
                var subjectid   =Ext.getCmp('subjectcombo_id').getValue();
                
                
                if(classid!==null && examtypeidid!==null && studentid!==null) {
                Ext.getCmp('studentmarkentry').getStore().reload({
                            params:{'classid':classid,
                                    'sessionid':sessionid,
                                    'examtypeidid':examtypeidid,
                                    'studentid':studentid,
                                    'subjectid':null
                }});
                }
                else if(classid!==null && examtypeidid!==null && studentid===null && subjectid!==null){
                Ext.getCmp('studentmarkentry').getStore().reload({
                            params:{'classid':classid,
                                    'sessionid':sessionid,
                                    'examtypeidid':examtypeidid,
                                    'studentid':null,
                                    'subjectid':subjectid
                }});
                }                
                
                
            }
       }
    },
    {
       xtype: 'combobox',
       emptyText: 'Select Student',
       text   : 'Student',
       id:'studentcombo_id',
       //hidden:true,
       store:'ClassCombo',
       typeAhead: true,
       queryMode: 'local',
       Autoload:true,
       valueField :'id',
       displayField :'value',  
       listeners:{
            select: function(component){
                var classid     =Ext.getCmp('classcombo_id').getValue();                
                var sessionid   =Ext.getCmp('sessioncombo_id').getValue();                
                var examtypeidid=Ext.getCmp('examtypecombo').getValue();                
                var studentid   =Ext.getCmp('studentcombo_id').getValue();    
                var subjectid   =Ext.getCmp('subjectcombo_id').getValue();
                
                
                if(classid!==null && examtypeidid!==null && studentid!==null) {
                Ext.getCmp('studentmarkentry').getStore().reload({
                            params:{'classid':classid,
                                    'sessionid':sessionid,
                                    'examtypeidid':examtypeidid,
                                    'studentid':studentid,
                                    'subjectid':null
                }});
                }
                else if(classid!==null && examtypeidid!==null && studentid===null && subjectid!==null){
                Ext.getCmp('studentmarkentry').getStore().reload({
                            params:{'classid':classid,
                                    'sessionid':sessionid,
                                    'examtypeidid':examtypeidid,
                                    'studentid':null,
                                    'subjectid':subjectid
                }});
                }                
            }
       }
    },{
        iconCls: 'icon-add',
        text: '<b>View Mark</b>',
        listeners:{
          render: function(component){
                component.getEl().on('click', function(){
                    
                var classid     =Ext.getCmp('classcombo_id').getValue();                
                var sessionid   =Ext.getCmp('sessioncombo_id').getValue();                
                var examtypeidid=Ext.getCmp('examtypecombo').getValue();                
                var studentid   =Ext.getCmp('studentcombo_id').getValue();    
                var subjectid   =Ext.getCmp('subjectcombo_id').getValue();
                
                
                if(classid!==null && examtypeidid!==null && studentid!==null) {
                Ext.getCmp('studentmarkentry').getStore().reload({
                            params:{'classid':classid,
                                    'sessionid':sessionid,
                                    'examtypeidid':examtypeidid,
                                    'studentid':studentid,
                                    'subjectid':null
                }});
                }
                else if(classid!==null && examtypeidid!==null && studentid===null && subjectid!==null){
                Ext.getCmp('studentmarkentry').getStore().reload({
                            params:{'classid':classid,
                                    'sessionid':sessionid,
                                    'examtypeidid':examtypeidid,
                                    'studentid':null,
                                    'subjectid':subjectid
                }});
                }
              });

            }
        }
    },{
        iconCls: 'icon-add',
        text: '<b>Add Mark</b>',
        listeners:{
          render: function(component){
                component.getEl().on('click', function(){
                var classid     =Ext.getCmp('classcombo_id').getValue();                
                var sessionid   =Ext.getCmp('sessioncombo_id').getValue();                
                var examtypeidid=Ext.getCmp('examtypecombo').getValue();                
                var studentid   =Ext.getCmp('studentcombo_id').getValue();    
                var subjectid   =Ext.getCmp('subjectcombo_id').getValue();    
                var data={'classid':classid,'sessionid':sessionid,'examtypeidid':examtypeidid,'studentid':studentid,'subjectid':subjectid};
                Ext.Ajax.request({
                url:'studentmark/add.do',
                type:'json',
                scope:this,
                headers:{
                    'Content-Type':'application/json'  
                },
                params:Ext.JSON.encode(data),
                success: function(res){                                       
                      //var rec = eval('(' + res.responseText+ ')' );                
                if(res.responseText==='2')
                   Ext.Msg.alert('Success','Exam details not added');
                if(res.responseText==='3')
                  {
                    Ext.getCmp('studentmarkentry').getStore().reload({
                            params:{'classid':classid,
                                    'sessionid':sessionid,
                                    'examtypeidid':examtypeidid,
                                    'studentid':studentid,
                                    'subjectid':subjectid
                    }});
                  } 
                }
               });        
         });
       } 
    } 
    },{
        iconCls: 'icon-add',
        text: '<b>Save Marks</b>',
        listeners:{
        render: function(component){
                component.getEl().on('click', function(){
                
            var classid     =Ext.getCmp('classcombo_id').getValue();                
            var sessionid   =Ext.getCmp('sessioncombo_id').getValue();                
            var examtypeidid=Ext.getCmp('examtypecombo').getValue();                
    
            var records = Ext.StoreManager.lookup('StudentMarkEntry').getModifiedRecords();
            var data = []; 
            var data = [];
            Ext.each(records, function(rec1){
                if(rec1.data.appeared=='1')
                    rec1.data.appeared=1;
                else                    
                    rec1.data.appeared=0;
                data.push(rec1.data);
            });
   
            Ext.Ajax.request({
                url:'savestudentmark/save.do',
                type:'json',
                scope:this,
                headers:{
                    'Content-Type':'application/json'  
                },
                params:Ext.JSON.encode(data),
                success: function(res){

                   if(res.responseText==='1')
                   Ext.Msg.alert('Success','Marks Saved Seccessfully');
                   else
                   Ext.Msg.alert('Failure','Error Occured, Please Contact Admin');    
                }
            });
                
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
    }]
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
            header    : 'Student Name',
            dataIndex :'studentname',
            style :'color:#17385B;font-weight:bold',
            id        :'studentname' ,
            name      :'studentname',
            width     :'12%',
            renderer : function(value){
                      return '<font color=green><b>'+value+'</font></b>';
            } 
        },
        {
          
            header    : 'Session',
            dataIndex :'sessionname',
            style :'color:#17385B;font-weight:bold',
            width     :'10%'
        },
         {
          
            header    : 'Exam Type',
            dataIndex :'examtype',
            style :'color:#17385B;font-weight:bold',
            width     :'8%'
        },{
            header: 'Exam Name',
            dataIndex:'examname',
            style :'color:#17385B;font-weight:bold',
            width     :'10%'
        },
        {
            header: 'Class Name',
            dataIndex:'classname',
            style :'color:#17385B;font-weight:bold',
            hidden:true
        },
        {
          
            header    : 'Subject',
            dataIndex :'subjectname',
            id        :'subjectname' ,
            name      :'subjectname' ,
            width     :'10%',
            style :'color:#17385B;font-weight:bold',
            renderer : function(value){
                  return '<b>'+value+'</b>';
            }  
        },{
            header:'Max Mark',
            dataIndex:'maxmark',
            width     :'8%',
            style :'color:#17385B;font-weight:bold',
            renderer : function(value){
                      return '<font color=green><b>'+value+'</font></b>';
            }  
        },
        {
            header:'Pass Mark',
            dataIndex:'passmark',
            width     :'8%',
            style :'color:#17385B;font-weight:bold',
            renderer : function(value){
                       return '<font color=red>'+value+'</font>';
                      //return '<font color=red><b>'+value+'</font></b>';
            }  
            
        },{
          
            header    : 'Appeared',
            dataIndex :'appeared',
            width     :'8%',
            style :'color:#17385B;font-weight:bold',
            editor: {
                
                xtype : 'combobox',
                allowBlank : false,                    //xtype: 'numberfield'
                triggerAction : 'all',
                store:
                Ext.create('Ext.data.Store', {
                fields: ['id', 'value'],
                data : [
                           {"id":"1", "value":"Present"},
                           {"id":"0", "value":"Absent"}
                          ]
                }),
                Autoload:true,
                queryMode: 'local',
                displayField: 'value',
                valueField: 'id',
                typeAhead: true
            },
            renderer : function(value){
                var record=me.examtypeStore.findRecord('id',value);
                if(value=='1')
                return '<font color=green><b>Present</b></font>';
                else if(value=='0')
                return '<font color=red><b>Absent</b></font>';    
            }
        },
        {
            header:'Mark Obtained',
            dataIndex:'markobtained',
            width     :'8%',
            style :'color:#17385B;font-weight:bold',
            editor :{
                    xtype: 'numberfield',
                    anchor: '100%',
                    maxValue: 100,
                    minValue: 0
            },
            renderer : function(value,meta ,record){
                
                       if(record.data.passmark <= value)
                       return '<b>'+value+'</b>';
                       else return '<font color=red><b>'+value+'</font></b>';
            }  
        
        },{
            header: 'Add Comment',
            dataIndex:'comment',
            width     :'18%',
            style :'color:#17385B;font-weight:bold',
            editor :{
                    xtype: 'textfield'
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








