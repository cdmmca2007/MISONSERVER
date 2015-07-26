var rec=new Array();
var p_classid,p_sessionid;
var contrl;

function addTimetableData(btn){

    var grid =  Ext.getCmp('timetablegrid');
    var store=  Ext.getStore('Timetable');
    var rec=[];
    for (x=0;x<store.getCount();x++){
        rec[x]=store.getAt(x).data;
    }
    Ext.Ajax.request({
        url:'timetable/add.do',
        type:'json',
        headers:{
            'Content-Type':'application/json'
        },
        params:Ext.JSON.encode(rec),
        success: function(res){
            Ext.Msg.alert('Success','Timetable updated successfully');

          var sessionid=Ext.getCmp('timesheetsession').getValue();
          var classid  =Ext.getCmp('timesheetclasscombo').getValue();                                
            Ext.getCmp('timetablegrid').getStore().load({
            params:{                            
                     classid     :classid,
                     sessionid   :sessionid,
                     teacherid   :null
             }
            });
        }
    });
}


var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 1
});

Ext.define('MyApp.view.timetable.Timetable' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.timetablelist',
    closable:true,
    title: 'Time Table',
    id:'timetablegrid',
    layout:'fit',
    store:'Timetable',    
    selModel: {
        selType: 'cellmodel'
    },
    config :{
        p_sessionid:null,
        p_classid  :null        
    },    
    constructor: function(config) {
           p_classid  =config.p_classid;
           p_sessionid=config.p_sessionid;
           this.callParent(arguments);
    },        
    plugins: [cellEditing],
    tbar :[/*{
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
    },*/{
        xtype:'combobox',
        id:'timesheetsession',
        emptyText: 'Select Session', 
        width:100,
        store:Ext.create('MyApp.store.Combo').load({
                                      params:{propertyId:-1}}),//For Teacher
        Autoload:true,
        queryMode: 'local',
        displayField: 'value',
        valueField: 'id',
        value:SETTING.Users.properties.session_id,
        name:'type',
        listeners:{
            select: function(component){
                var sessionid=Ext.getCmp('timesheetsession').getValue();
                Ext.getCmp('timesheetclasscombo').getStore().load({
                     params:{
                             propertyId:2,///Class List
                             classid   :sessionid,///Provide Batch_id
                             teacherid :SETTING.Users.userId
                     }
               });
            }
       }
    },{
       xtype: 'combobox',
       emptyText: 'Select Class',
       width:100,
       text   : 'Class',
       id:'timesheetclasscombo',
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
       value:p_classid?this.p_classid:null,
       listeners:{
            select: function(component){
                var sessionid=Ext.getCmp('timesheetsession').getValue();
                var classid  =Ext.getCmp('timesheetclasscombo').getValue();                                
            }
       }
    },
    {
        iconCls: 'icon-add',
        text: '<b>View Timetable</b>',
        listeners:{
          render: function(component){
                component.getEl().on('click', function(){
                    contrl=1;
                    var sessionid=Ext.getCmp('timesheetsession').getValue();
                    var classid  =Ext.getCmp('timesheetclasscombo').getValue();                                

                    
                    var  button = Ext.getCmp('savett');
                    button.setDisabled(false);

                    Ext.getCmp('timetablegrid').getStore().load({
                    params:{                            
                             classid     :classid,
                             sessionid   :sessionid,
                             teacherid   :null
                     }
                    });
                });

            }
        }
    },{
        iconCls: 'icon-add',
        text: '<b>Create Timetable</b>',
        id:'creatett',
        listeners:{
          render: function(component){
                component.getEl().on('click', function(){
                    
                        var  button = Ext.getCmp('savett');
                        button.setDisabled(false);

                        var sessionid=Ext.getCmp('timesheetsession').getValue();
                        var classid  =Ext.getCmp('timesheetclasscombo').getValue();                                
                        var data={'classid':classid,'sessionid':sessionid};
                        Ext.Ajax.request({
                        url:'timetable/create.do',
                        type:'json',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        params:Ext.JSON.encode(data),
                        success: function(res){
                            var rec = eval('('+res.responseText+')');
                            if(rec==1)
                            Ext.Msg.alert('Success','Timetable Created successfully');
                            else if(rec==2)
                            Ext.Msg.alert('Warning','Timetable Already created.');
                            else
                            Ext.Msg.alert('Warning','Timetable Creation Failed due to Some issue ,Please contact Administrator.');
                        
                            var sessionid=Ext.getCmp('timesheetsession').getValue();
                            var classid  =Ext.getCmp('timesheetclasscombo').getValue();                                
                            Ext.getCmp('timetablegrid').getStore().load({
                            params:{                            
                                     classid     :classid,
                                     sessionid   :sessionid,
                                     teacherid   :null
                             }
                            });
                        }
                    });
                    
                });

            }
        }
    },
    {
        iconCls: 'icon-add',
        id:'savett',
        text: '<b>Save Timetable</b>',
        listeners:{
          render: function(component){
                component.getEl().on('click', function(){
                    addTimetableData(null);
                });

            }
        }
    },
    {
        iconCls: 'icon-add',
        text: '<b>My Timetable</b>',
        id:'mytt',
        listeners:{
          render: function(component){
                  component.getEl().on('click', function(){
                  contrl=2; 
                  var  button = Ext.getCmp('savett');
                  button.setDisabled(true);

                  var sessionid=Ext.getCmp('timesheetsession').getValue();
                     Ext.getCmp('timetablegrid').getStore().load({
                        params:{                            
                                 classid     :null,
                                 sessionid   :sessionid,
                                 teacherid   :SETTING.Users.userId
                     }
                     });
                 });

            }
       }
    },{
        iconCls: 'icon-add',
        text: '<b>Print</b>',
        listeners:{
          render: function(component){
                component.getEl().on('click', function(){
                });

            }
        }
    },{
        xtype:'splitbutton',
        text:'<b>Export Data</b>',
        arrowAlign:'right',        
        menu: [{text: 'PDF',
                handler: function(){
                       
                var sessionid=Ext.getCmp('timesheetsession').getValue();
                var classid  =Ext.getCmp('timesheetclasscombo').getValue();                                
                var data={sessionid   :sessionid,
                          classid     :classid,
                          downloadedby:SETTING.Users.userId,
                          doctype     :1,
                          reqfor      :1
                        };  
               Ext.Msg.alert('Message','<font color=green>Thank you, For downloading this file</font>');                            
               document.getElementById("downloadfile").src="download/download.get?"+
                                                            "m=dstt&requestby="+SETTING.Users.userId+
                                                            "&doctype=1&sessionid="+sessionid+
                                                            "&classid="+classid;
                        
                   }
               },
            {text: 'XML',
                handler: function(){
                       
                var sessionid=Ext.getCmp('timesheetsession').getValue();
                var classid  =Ext.getCmp('timesheetclasscombo').getValue();                                
                var data={sessionid   :sessionid,
                          classid     :classid,
                          downloadedby:SETTING.Users.userId,
                          doctype     :1,
                          reqfor      :1
                        };  
               Ext.Msg.alert('Message','<font color=green>Thank you, For downloading this file</font>');                            
               document.getElementById("downloadfile").src="download/download.get?"+
                                                            "m=dstt&requestby="+SETTING.Users.userId+
                                                            "&doctype=2&sessionid="+sessionid+
                                                            "&classid="+classid;
                        
                   }             
            },
            {text: 'Word Doc',
                handler: function(){
                       
                var sessionid=Ext.getCmp('timesheetsession').getValue();
                var classid  =Ext.getCmp('timesheetclasscombo').getValue();                                
                var data={sessionid   :sessionid,
                          classid     :classid,
                          downloadedby:SETTING.Users.userId,
                          doctype     :1,
                          reqfor      :1
                        };  
               Ext.Msg.alert('Message','<font color=green>Thank you, For downloading this file</font>');                            
               document.getElementById("downloadfile").src="download/download.get?"+
                                                            "m=dstt&requestby="+SETTING.Users.userId+
                                                            "&doctype=3&sessionid="+sessionid+
                                                            "&classid="+classid;
                        
                   }             
            },
           {text: 'Excel Sheet',
                handler: function(){
                       
                var sessionid=Ext.getCmp('timesheetsession').getValue();
                var classid  =Ext.getCmp('timesheetclasscombo').getValue();                                
                var data={sessionid   :sessionid,
                          classid     :classid,
                          downloadedby:SETTING.Users.userId,
                          doctype     :1,
                          reqfor      :1
                        };  
               Ext.Msg.alert('Message','<font color=green>Thank you, For downloading this file</font>');                            
               document.getElementById("downloadfile").src="download/download.get?"+
                                                            "m=dstt&requestby="+SETTING.Users.userId+
                                                            "&doctype=4&sessionid="+sessionid+
                                                            "&classid="+classid;
                        
                   }             
            }                    
         
        ]
    }
    ],
    initComponent: function() {
        var me=this;

        this.subjectStore=Ext.create('MyApp.store.Master');
        this.subjectStore.load({
            params:{propertyId:2}
        });
        this.teacherStore=Ext.create('MyApp.store.Combo');
        this.teacherStore.load({
            params:{propertyId:5}
        });
        this.columns=[
        {
            header: 'Periods',
            dataIndex:'perioddisplay',
            width:143,
            style :'color:#17385B;font-weight:bold',
            renderer  : function(value,meta,record){
                if(record.data.perioddisplay!=null && record.data.perioddisplay!='')
                   return value;   
                else    
                   return '<b>'+record.data.periodnumber+'</b><hr><b>'+record.data.starttime+'</b>-<b>'+record.data.endtime+'</b>';
            }
        },
                
        {
            header    : 'Monday',
            dataIndex : 'monday',
            width:143,
            style :'color:#17385B;font-weight:bold',
            renderer  : function(value,meta,record){
                if(record.data.monday!=null && record.data.monday!='')
                   return value;   
                else    
                return '<b>'+record.data.mon_tch_text+'</b><br><b>'+record.data.mon_sub_text+'</b>';
            }
        },
        {
            header     : 'Tuesday',
            dataIndex  : 'tuesday',
            width:143,
            style :'color:#17385B;font-weight:bold',
            renderer  : function(value,meta,record){
                if(record.data.tuesday!=null && record.data.tuesday!='')
                   return value;   
                else    
              return '<b>'+record.data.tues_tch_text+'</b><br><b>'+record.data.tues_sub_text+'</b>';
            }
        }
        ,    
        {
            header     : 'Wednesday',
            dataIndex  : 'wednesday',
            width:143,
            style :'color:#17385B;font-weight:bold',
            renderer  : function(value,meta,record){
                if(record.data.wednesday!=null && record.data.wednesday!='')
                   return value;   
                else    
              return '<b>'+record.data.wednes_tch_text+'</b><br><b>'+record.data.wednes_sub_text+'</b>';
            }
        }, {
            header     : 'Thursday',
            dataIndex: 'thursday',
            width:143,
            style :'color:#17385B;font-weight:bold',
            renderer  : function(value,meta,record){
                if(record.data.thursday!=null && record.data.thursday!='')
                   return value;   
                else    
              return '<b>'+record.data.thurs_tch_text+'</b><br><b>'+record.data.thurs_sub_text+'</b>';
            }
        },
        {
            header     : 'Friday',
            dataIndex  : 'friday',
            width:143,
            style :'color:#17385B;font-weight:bold',
            renderer  : function(value,meta,record){
                if(record.data.friday!=null && record.data.friday!='')
                   return value;   
                else    
              return '<b>'+record.data.fri_tch_text+'</b><br><b>'+record.data.fri_sub_text+'</b>';
            }
            
        }, {
            header     : 'Saturday',
            dataIndex  : 'saturday',
            width:143,
            style :'color:#17385B;font-weight:bold',
            renderer  : function(value,meta,record){
                if(record.data.saturday!=null && record.data.saturday!='')
                   return value;   
                else    
              return '<b>'+record.data.satur_tch_text+'</b><br><b>'+record.data.satur_sub_text+'</b>';
            }
            
        }
        ];
        this.listeners={
        cellclick: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
            
            if(cellIndex > 0 && contrl==1){
            if(SETTING.Users.roleId > 3)
            {
               var  button = Ext.getCmp('creatett');
                    button.setDisabled(true);
               var  delbutton = Ext.getCmp('savett');
                   delbutton.setDisabled(true);    
            }    
            else {
                colIndex1 = cellIndex; 
                el = e.getTarget();
                record = grid.getStore().getAt(rowIndex).data;
                record2 = grid.getStore().getAt(rowIndex);
                var data = record2.get('mon_subject'); // get data in a cell
                //Ext.Msg.alert('Selected Record',cellIndex + ' / '+rowIndex + data);               
                var day;
                if(cellIndex==1) day='Monday';
                if(cellIndex==2) day='Tuesday';
                if(cellIndex==3) day='Wdnesday';
                if(cellIndex==4) day='Thursday';
                if(cellIndex==5) day='Friday';
                if(cellIndex==6) day='Saturday';
            var win = Ext.getCmp('class_win');
            if(!win){
                win=Ext.create('Ext.app.view.component.AppWindow', {
                    title:'<font color=#17385B><b>Timetable Entry Form</b></font>',
                    id:'timetable_win',
                    width:400,
                    closeAction:'destroy',
                    top:{
                        image:BASE_URL+'resources/images/createuser.png',
                        formTitle:'<font color=green><b>'+'Please Select Subject & Teacher For Period-'+(rowIndex+1)+' ,'+day+'</b></font>'
                    },
                    defaults:{
                        xtype:'textfield',
                        value:'',
                        width:300
                    },
                    url:'ppppp',
                    formItems :[
                    {
                        xtype:'combobox',
                        fieldLabel :'Select Subject',
                        id:'subject',
                        name:'subject',                
                        store:Ext.create('MyApp.store.Master').load({
                                              params:{propertyId:2}}),//For Class
                        typeAhead: true,
                        queryMode: 'local',
                        emptyText: 'Select a Subject.... ',
                        Autoload:true,
                        valueField :'id',
                        displayField :'value',
                        allowBlank: false,
                        listeners:{
                            select: function(component){                        
                           // Ext.getCmp('name').setValue(Ext.getCmp('classlevel').getRawValue());
                            }
                       }

                    },
                    {
                        xtype:'combobox',
                        fieldLabel :'Subject Teacher',
                        id:'teacher',
                        name:'teacher',                
                        store:Ext.create('MyApp.store.Combo').load({
                                              params:{propertyId:5}}),//For Teacher
                        allowBlank: false,
                        queryMode: 'local',
                        emptyText: 'Select a Teacher...',
                        Autoload:true,
                        valueField :'id',
                        displayField :'value'
                    },
                    {
                        name : 'comment',
                        fieldLabel: 'Comment',
                        id:'comment'
                    }
                    ],
                    buttons :[
                    {
                        text: 'Add',
                        action: 'save',
                        scope:this,
                        handler:function(){
                           
                           var comment=Ext.getCmp('comment').getValue();
                           var teacher=Ext.getCmp('teacher').getValue();
                           var subject=Ext.getCmp('subject').getValue();
                           var raw_teacher=Ext.getCmp('teacher').getRawValue();
                           var raw_subject=Ext.getCmp('subject').getRawValue();
                           
                           var showdata='<font color=red><b>Teacher :'+raw_teacher+'</b></font><br><font color=green><b>Subject :'+raw_subject+'</b></font><br><font color=blue>Comment :'+comment+'</font>';
                           record2 = grid.getStore().getAt(rowIndex);
                           
                           var colname=grid.getHeaderAtIndex(cellIndex).dataIndex;
                           var subjectfield    =colname.substring(0,colname.indexOf('day'))+'_subject';
                           var teacherfiled    =colname.substring(0,colname.indexOf('day'))+'_teacher';                                   
                           var coomentfiled    =colname.substring(0,colname.indexOf('day'))+'_comment';                                                              

                           var subjecttxt      =colname.substring(0,colname.indexOf('day'))+'_sub_text';
                           var teachertxt      =colname.substring(0,colname.indexOf('day'))+'_tch_text';                                   

                            
                        var checkdata= {
                                         'sessionid'      :Ext.getCmp('timesheetsession').getValue(),
                                         'teacherid'      :teacher,
                                         'periodnumber'   :record2.data.periodnumber,
                                         'day'            :teacherfiled
                                       };   
                        Ext.Ajax.request({
                        url:'timetable/check.do',
                        type:'json',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        params:Ext.JSON.encode(checkdata),
                        success: function(res){
                           
                            var rec = eval('('+res.responseText+')');
                            
                            
                           if(rec=='0')
                               {
                                    if(cellIndex==1){
                                    record2.set('monday',showdata);
                                    }
                                    if(cellIndex==2){
                                    record2.set('tuesday',showdata); 
                                    
                                    }
                                    if(cellIndex==3){
                                    record2.set('wednesday',showdata); 
                                    }
                                    if(cellIndex==4){
                                    record2.set('thursday',showdata); 
                                    }
                                    if(cellIndex==5){
                                    record2.set('friday',showdata); 
                                    }
                                    if(cellIndex==6){
                                    record2.set('saturday',showdata); 
                                /*    record2.set('saturday_tch_text',raw_teacher);
                                    record2.set('saturday_sub_text',raw_subject);*/
                                 
                                    }
                                    record2.set(subjectfield,subject);
                                    record2.set(teacherfiled,teacher);
                                    record2.set(coomentfiled,comment);
                                    record2.set(subjecttxt,raw_subject);
                                    record2.set(teachertxt,raw_teacher);    
                               }
                           else{
                             Ext.Msg.alert('Warning',raw_teacher+' is Already Assigned to Class :<font color=red><b>'+rec.rows[0].name+'</b></font> for <font color=red><b>Period'+(rowIndex+1)+'</b></font>');  
                           }    
                         }
                      });
                           

                        }
                    },{xtype:'btncancel'}

                 ]
                });
            }
            win.show();
          }
        }  
        }
       },
       
            /* this.selModel = Ext.create('Ext.selection.CheckboxModel',{
            singleSelect:true
        });*/
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
        if(SETTING.Users.roleId > 3)
            {
               var  button = Ext.getCmp('creatett');
                    button.setDisabled(true);
               var  delbutton = Ext.getCmp('savett');
                   delbutton.setDisabled(true);    
               var  delbutton = Ext.getCmp('mytt');
                   delbutton.setDisabled(true);    
            }    
        this.callParent(arguments);

    },
    selectionChange : function(sm, selected,eOpts){
       
        if(sm.getCount()){
            
        }
    }
});





