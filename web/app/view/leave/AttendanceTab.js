Ext.define('MyApp.view.leave.AttendanceTab' ,{
    extend: 'Ext.container.Container',
    alias: 'widget.attandance',
    closable:true,
    requires:['MyApp.view.leave.MonthlyAttendanceSheet'],
    title: 'Attendance Sheet',
    layout:{
        type:'border'
    },
    id:'attandancegridpanel',
    constructor : function(config){
        var items =[{
            xtype:'grid',
            region:'west',
            id:'grid-att-sheet',
            store:'AttendanceSheet',
            title:'Sheets',
            split:'true',
            collapsible:true,
            hideHeaders:true,
            width:160,
            vieConfig:{
                forceFit:true,
                loadMask:true
            },
            features: [Ext.create('Ext.grid.feature.Grouping', {
                groupHeaderTpl: '{[Ext.Date.format(values.name,"M-Y")]}',
                hideGroupedHeader: true,
                startCollapsed: true,
                id: 'sheetGrouping'
            })
            ],
            
            bbar: [{
                xtype: 'combo',
                emptyText: 'Select Class',
                text   : 'Class',
                id:'attenclasscombo',
                store:Ext.create('MyApp.store.ClassCombo1').load({
                                               params:{propertyId:2,
                                                       classid:SETTING.Users.properties.session_id,
                                                       teacherid :SETTING.Users.userId
                                             }}),
                typeAhead: true,
                queryMode: 'local',
                width:100,
                Autoload:true,
                hidden:SETTING.Users.roleId===1 || SETTING.Users.roleId===2 || SETTING.Users.roleId===3?false:true,
                valueField :'id',
                displayField :'value',  
                listeners:{
                     select: function(component){
                         var classid  =Ext.getCmp('attenclasscombo').getValue();                                
                         Ext.StoreManager.lookup("AttendanceSheet").load({
                                    params:{                             
                                            sessionid :SETTING.Users.properties.session_id,        
                                            batchId   :classid,
                                            month     :Ext.Date.format(new Date(),"M-Y")
                                    }
                     });
               }
              }
              
            },{
                iconCls: 'icon-add',
                text: '<b>Add</b>',
                handler: function(){
                    this.up('attandance').onAddClick();
                }
            }],
            columns:[
            Ext.create('Ext.grid.RowNumberer'),
            {
                header: 'Month',  
                dataIndex: 'month', 
                flex:1
            },{
                header: 'Class',  
                dataIndex: 'class', 
                flex:1
            }
            ],
            listeners:{
                'itemclick': function(view,record,item,index){
                    this.up('attandance').onRowSelect(view,record,item,index)  
                },
                'viewready': function(){
                    this.up('attandance').sheetViewReady()
                }
            }
        },{
            xtype:'monthlyattendance',
            region:'center',
            listeners:{
                'updateDayAttendance': this.updateDayAttendance
            }
            
        }];
        this.callParent([Ext.apply({
            items:items   
        }),config]);
    },
    initComponent: function() {
        this.callParent(arguments);
    },
    onRender : function(){
        this.callParent(arguments);
        var p ={};
        if(true){
            p.sessionid=null;
            p.batchId=SETTING.Users.properties.isclassteacher===1?SETTING.Users.properties.batchid:null;///'06d6a929-f6c2-4e46-9b8a-4214c3fbb138';
            p.month = Ext.Date.format(new Date(),"M-Y");
        }
        var self = this;
        var store = Ext.StoreManager.lookup("AttendanceSheet");
        store.load({
            params:p,
            callback: function(recs){
                self.onSheetLoad(store,p);
            }
        });
    },
    onDestroy : function(){
        this.callParent(arguments);
    },
    onSheetLoad : function(store,p){
        
        var rec = null;
        var record = null;
        if(p){
            // find the record from store
            rec = store.findBy(function(rec){
                return rec.data.batchId==p.batchId;
            })
           
        }else{ //select the first record from store;
            rec = store.getAt(0);
            
        }
        if(rec>-1){
        record = store.getAt(rec);
        this.down('monthlyattendance').setTitle(rec.month);
        //Ext.getCmp('grid-att-sheet').getSelectionModel().select(rec);
        Ext.StoreManager.lookup('MonthlyAttendance').loadData(record.attendance().getRange());
        }
    },
    sheetViewReady: function(){
        if(this.sheetSelected)
            Ext.getCmp('grid-att-sheet').getSelectionModel().select(this.sheetSelected)
    },
    onAddClick: function(btn){
        var self= this;
        this.activeRecord = Ext.create('MyApp.model.AttendanceSheet');
        var month = Ext.Date.format(new Date(),'M-Y');
        this.activeRecord.set('month',month);
        var store = this.sheetGrid.getStore();
        if(SETTING.Users.roleId===3 && SETTING.Users.properties.isclassteacher===1){
        var  classid=Ext.getCmp('attenclasscombo').getValue();    
        this.activeRecord.set('batchId',SETTING.Users.properties.batchid);
        this.activeRecord.set('classId',classid);
        this.activeRecord.set('sessionid',SETTING.Users.properties.session_id);
        }
        else{
           if(SETTING.Users.roleId===1 || SETTING.Users.roleId===2){
               var  classid=Ext.getCmp('attenclasscombo').getValue();
               if(classid!==null) {
                   this.activeRecord.set('batchId',SETTING.Users.properties.session_id);//Send sessionid here
                   this.activeRecord.set('classId',classid);
                   this.activeRecord.set('sessionid',SETTING.Users.properties.session_id);
               }    
           } 
        }    
        
        this.activeRecord.save({
            success: function(sheet) {
                store.add(sheet);
                self.sheetGrid.getView().refresh();
                self.sheetGrid.getSelectionModel().select(sheet);
                self.attendanceGrid.getStore().loadData([]);
                store.commitChanges();
            }
        });
    //} else{
    //    Ext.Msg.msgO("Warning","Please select a record");
    //}
         
    },
    afterRender: function(){
        this.callParent(arguments);
        this.sheetGrid = this.down('grid');
        this.attendanceGrid = this.down('monthlyattendance');
        this.sheetGrid = Ext.getCmp('grid-att-sheet');
    },
    onRowSelect: function(view,record,item,index){
        var sheetId = record.data.id;
        Ext.ModelManager.getModel('MyApp.model.AttendanceSheet').load(sheetId, {
            success: function(sheet) {
                Ext.StoreManager.lookup('MonthlyAttendance').loadData(sheet.attendance().getRange());
            }
        });
    },
    updateDayAttendance: function(grid,field){
        var store = grid.getStore();
        var data=[];
        store.each(function(rec){
            var c ={};
            c.studentId = rec.data.studentId;
            c.fieldName=field;
            c.presence = rec.data[field];
            data.push(c);
        });
        Ext.Ajax.request({
             url:'mis/attendancesheet/'+store.getAt(0).data.sheetId,
             method:'PUT',
             type:'json',
             headers:{
                    'Content-Type':'application/json'  
             },
             scope:this,
             params:Ext.JSON.encode(data),
             success: function(res){
            	 var response = eval('('+res.responseText+')');
                 if(response.success)
               	 {
                        Ext.Msg.alert('Success','Attendence Sheet Updated successfully');
               	 }else
                        Ext.Msg.alert('Failure','Unexpected Error occured ,Please Contact Administrator');
                 
             }
         });
    }
});

