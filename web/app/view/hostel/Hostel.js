
function addRoomToHostel(rec,rec2){

    var win = Ext.getCmp('hostelroom_win');
    if(!win){
        win=Ext.create('Ext.app.view.component.AppWindow', {
            title:rec?'Edit Room Detail':'Add New Room Detail',
            id:rec?'edithostelroom_win':'addhostelroom_win',
            width:400,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/hostel.png',
                formTitle:'Create Room Details'
            },
            defaults:{
                xtype:'textfield',
                width:300
            },
            formItems :[
            {
                name : 'hostelpid',                
                id:'hostelpid',
                hidden:true,
                value : rec.data.pid
            },
            {
                name : 'pid',                
                id:'pid',
                hidden:true,
                fieldLabel: 'Room Id'
            },{
                xtype:'combobox',
                fieldLabel :'Floor',
                id:'floorno',
                name:'floorno',                
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:38}}),//For Location
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select a Floor...',
                Autoload:true,
                valueField :'id',
                displayField :'value'
            },{
                xtype:'combobox',
                fieldLabel :'Room Type',
                id:'roomtype',
                name:'roomtype',                
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:37}}),//For Location
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select a Room Type...',
                Autoload:true,
                valueField :'id',
                displayField :'value'
            },
            {
                xtype:'textfield',
                name : 'roomno',
                fieldLabel: 'Room Name/Number',
                id:'roomno'
            },{
                xtype:'textfield',
                name : 'roomrent',
                fieldLabel: 'Room Rent',
                id:'roomrent'
            },
            {
                xtype:'textfield',
                name : 'totstudent',
                fieldLabel: 'Student Capacity',
                id:'totstudent'
            },
            {
                xtype:'textarea',
                name : 'comment',
                fieldLabel: 'Comment',
                id:'comment'
            },
            {
                
                name : 'createdby',
                hidden:true,
                id:'createdby',
                value:SETTING.Users.userId
            }
            ],
            buttons :[
            {
                text: rec2?'Edit':'Add',
                action: 'save',
                scope:this,
                handler:saveRoom
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
}



function saveRoom(btn){
    
        var form = btn.up('window').down('form').getForm();
        if(form.isValid()){
            var obj = form.getValues();
            Ext.Ajax.request({
                url:'hostel/addhstlrm.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    var rec = eval('('+res.responseText+')');
                    if(rec.pid!=null ){
                     Ext.Msg.alert('Success','Room Detail added successfully');
                     Ext.getCmp('room_grid').getStore().add(rec);
                    }
                    else
                    Ext.Msg.alert('Failer','Room Detail not Saved,Please Contact Admin');    
                }
            });
        }

}

function addHostel(rec){

    var win = Ext.getCmp('hostel_win');
    if(!win){
        win=Ext.create('Ext.app.view.component.AppWindow', {
            title:rec?'Edit Hostel Detail':'Add New Hostel Detail',
            id:rec?'edithostel_win':'addhostel_win',
            width:400,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/hostel.png',
                formTitle:'Create Hostel Details'
            },
            defaults:{
                xtype:'textfield',
                width:300
            },
            formItems :[
            {
                name : 'pid',                
                id:'pid',
                hidden:true,
                fieldLabel: 'Hostel Id'
            },
            {
                xtype:'textfield',
                name : 'name',
                fieldLabel: 'Hostel Name',
                id:'name'
            },{
                xtype:'combobox',
                fieldLabel :'Hostel Type',
                id:'hosteltype',
                name:'hosteltype',                
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:36}}),//For Location
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select a Hostel Type...',
                Autoload:true,
                valueField :'id',
                displayField :'value'
            },{
                xtype:'textfield',
                name : 'contactperson',
                fieldLabel: 'Contact Person',
                id:'contactperson'
            },{
                xtype:'textfield',
                name : 'contactno',
                fieldLabel: 'Contact No',
                id:'contactno'
            },
            {
                xtype:'textarea',
                name : 'address',
                fieldLabel: 'Address',
                id:'address'
            },
            {
                xtype:'textarea',
                name : 'comment',
                fieldLabel: 'Comment',
                id:'comment'
            },
            {
                
                name : 'createdby',
                hidden:true,
                id:'createdby',
                value:SETTING.Users.userId
            }
            ],
            buttons :[
            {
                text: rec?'Edit':'Add',
                action: 'save',
                scope:this,
                handler:saveHostel
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();

}

function saveHostel(btn){
    
      var form = btn.up('window').down('form').getForm();
      //var grid =  Ext.getCmp('transportgrid');
      //var recs =grid.getSelectionModel().getSelection();
        if(form.isValid()){
            var obj = form.getValues();
            Ext.Ajax.request({
                url:'hostel/addhstl.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    var rec = eval('('+res.responseText+')');
                    if(rec.pid!=null ){
                     Ext.Msg.alert('Success','Hostel Detail added successfully');
                     Ext.getCmp('hostel_grid').getStore().add(rec);
                    }
                    else
                    Ext.Msg.alert('Failer','Hostel Detail not Saved,Please Contact Admin');    
                }
            });
        }
}

function allocateRoom(rec,rec_hos){
    
    var win = Ext.getCmp('allocateroom_win');
    if(!win){
        win=Ext.create('Ext.app.view.component.AppWindow', {
            title:'Room Allocation',
            id:'allocateroom_win',
            width:450,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/hostel.png',
                formTitle:'Allocate Room You Are Allocating Room In Hostel :<font color=red><b><br> '+rec_hos.data.name+'</b></font>'+' , <font color=green><b>'+rec.data.floorno+' : '+rec.data.roomno+'</b>',
            },
            defaults:{
                xtype:'textfield',
                width:400
            },
            formItems :[
            {
                name : 'hostelid',                
                id:'hostelid',
                hidden:true,
                value:rec.data.hostelid
            },
            {
                name : 'roomid',                
                id:'roomid',
                hidden:true,
                value:rec.data.pid
            },
            {
                name : 'sessionid',                
                id:'sessionid',
                hidden:true,
                value:SETTING.Users.properties.session_id
            },
            {
                name : 'hostelname',
                fieldLabel: 'Hostel Name',
                id:'hostelname',
                value:rec_hos.data.name
            },{
                name : '',
                fieldLabel: 'Floor Name',
                id:'floorno',
                value:rec.data.floorno
            },{
                name : '',
                fieldLabel: 'Room No',
                id:'roomno',
                value:rec.data.roomno
            },{
                xtype:'combobox',
                fieldLabel :'Issue To',
                id:'allocateto',
                name:'allocateto',                
                store:Ext.create('Ext.data.Store', {
                    fields: ['id', 'value'],
                    data : [
                    {"id":"1","value":"Teacher"},
                    {"id":"2","value":"Student"}
                ]
                }),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Allocate to ...',
                Autoload:true,
                valueField :'id',
                displayField :'value',
                listeners:{
                    select: function(component){
                        var issueto=Ext.getCmp('allocateto').getValue();
                        
                       if(issueto==='1'){
                            Ext.getCmp('classid').hide();
                            Ext.getCmp('studentid').hide();
                            Ext.getCmp('teacherid').show();
                        }else if(issueto==='2'){
                            Ext.getCmp('teacherid').hide();
                            Ext.getCmp('classid').show();
                            Ext.getCmp('studentid').show();
                        }
                    }
               }
            },{
                xtype:'combobox',
                fieldLabel :'Select Teacher',
                id:'teacherid',
                name:'teacherid',                
                store:Ext.create('MyApp.store.Combo').load(
                          {
                                      params:{propertyId:5
                          }}
                ),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Teacher Name',
                Autoload:true,
                valueField :'id',
                displayField :'value',
                hidden:true
            },{
                xtype:'combobox',
                fieldLabel :'Select Class',
                id:'classid',
                name:'classid',                
                store:Ext.create('MyApp.store.ClassCombo1').load({
                                      params:{propertyId:2,
                                              classid:SETTING.Users.properties.session_id,
                                              teacherid :SETTING.Users.userId
                                    }}),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Class Name',
                Autoload:true,
                valueField :'id',
                displayField :'value',
                hidden:true,
                listeners:{
                    select: function(component){
                    var classid=Ext.getCmp('classid').getValue();
                    Ext.getCmp('studentid').getStore().load({
                     params:{
                             propertyId:7,///Student List
                             classid   :classid+'&'+SETTING.Users.properties.session_id,
                             teacherid :SETTING.Users.userId
                     }
               });
                       
                    }
               }
                
            },{
                xtype:'combobox',
                fieldLabel :'Select Student',
                id:'studentid',
                name:'studentid',                
                store:'ClassCombo',
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Student Name',
                Autoload:true,
                valueField :'id',
                displayField :'value',
                hidden:true
            },{
                xtype:'datefield',
                name : 'fromdate',
                fieldLabel: 'Issue Date From ',
                id:'fromdate',
                format: 'm d Y',
                altFormats: 'm-d-Y|m.d.Y',
                listeners:{
                    select: function(component){
                    var totmon;
                    if(Ext.getCmp('todate').getValue()!=null) {
                     totmon=Ext.Date.format(Ext.getCmp('todate').getValue(),"m") - Ext.Date.format(Ext.getCmp('fromdate').getValue(),"m") + 1;    
                     Ext.getCmp('totamount').setValue(totmon * rec.data.roomrent);
                    }
                  }
               }
                },
            {
                xtype:'datefield',
                name : 'todate',
                fieldLabel: 'Return Date',
                id:'todate',
                format: 'm d Y',
                altFormats: 'm,d,Y|m.d.Y',
                listeners:{
                    select: function(component){
                    var totmon=Ext.Date.format(Ext.getCmp('todate').getValue(),"m") - Ext.Date.format(Ext.getCmp('fromdate').getValue(),"m") + 1;    
                    Ext.getCmp('totamount').setValue(totmon * rec.data.roomrent);
                  }
               }
                
            },{
                name : 'totamount',
                fieldLabel: 'Total Amount',
                id:'totamount',
                readOnly:true
            },{
                xtype:'checkbox',
                fieldLabel :'Is Fee Paid',
                id:'paid',
                name:'paid',
                checked:true
            },{
                xtype:'checkbox',
                fieldLabel :'Send Email Notification',
                id:'notification',
                name:'notification',
                checked:true
            },
            {
                xtype: 'textarea',
                name : 'comment',
                fieldLabel: 'Description',
                id:'comment'
            },
            {
                
                name : 'createdby',
                hidden:true,
                id:'createdby',
                value:SETTING.Users.userId
            }
            ],
            buttons :[
            {
                text: 'Confirm Allocation',
                action: 'save',
                scope:this,
                handler:saveAllocateRoom
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
}

function saveAllocateRoom(btn){

    var form = btn.up('window').down('form').getForm();
        if(form.isValid()){
            var obj = form.getValues();
            obj.fromdate=new Date(obj.fromdate).getTime();        
            obj.todate=new Date(obj.todate).getTime();        
            if(obj.paid=='on')
                obj.paid=1;
            else
               obj.paid=0; 
            if(obj.notification=='on')
                obj.notification=1;
            else
                obj.notification=0;
            Ext.Ajax.request({
                url:'hostel/allocatehstlrm.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    var rec = eval('('+res.responseText+')');
                    if(rec.pid!=null ){
                     Ext.Msg.alert('Success','Room Booked Successfully');
                     Ext.StoreMgr.lookup('HostelRoomAllocation').load({
                            params:{'hostelid':rec.hostelid,
                                    'roomid'  :rec.roomid,
                                    'sessionid':SETTING.Users.properties.session_id
                     }}
                     );
                    }
                    else
                    Ext.Msg.alert('Failer','Hostel Detail not Saved,Please Contact Admin');    
                }
            });
        }
}

function payHostelFee(rec){
    
    var win = Ext.getCmp('paymenthostelroom_win');
    if(!win){
        win=Ext.create('Ext.app.view.component.AppWindow', {
            title:'Make Payment for Room',
            id:rec?'paymenthostelroom_win':'paymenthostelroom_win',
            width:400,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/hostel.png',
                formTitle:'Pay Hostel Fee'
            },
            defaults:{
                xtype:'textfield',
                width:350
            },
            formItems :[
            {
                name : 'pid',                
                id:'pid',
                hidden:true,
                value :rec.data.pid
            },
            {
                xtype:'textfield',
                name : 'roomno',
                fieldLabel: 'Room Name/Number',
                id:'roomno',
                value:rec.data.hostel+' , '+rec.data.room
            },{
                xtype:'textfield',
                name : 'roomrent',
                fieldLabel: 'Room Rent',
                id:'roomrent',
                value :rec.data.totamount
            },{
                xtype:'checkbox',
                fieldLabel :'Mark Paid',
                id:'paid',
                name:'paid',
                checked:true
            },{
                xtype:'checkbox',
                fieldLabel :'Send Email Notification',
                id:'notification',
                name:'notification',
                checked:true
            },
            {
                xtype:'textarea',
                name : 'comment',
                fieldLabel: 'Comment',
                id:'comment'
            },
            {
                
                name : 'createdby',
                hidden:true,
                id:'createdby',
                value:SETTING.Users.userId
            }
            ],
            buttons :[
            {
                text: rec?'Edit':'Add',
                action: 'save',
                scope:this,
                handler:makePayment
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
    
}

function makePayment(btn){
    
    var form = btn.up('window').down('form').getForm();
        if(form.isValid()){
            var obj = form.getValues();
            if(obj.paid=='on')
                obj.paid=1;
            else
               obj.paid=0; 
            if(obj.notification=='on')
                obj.notification=1;
            else
                obj.notification=0;
            if(obj.paid==1) {
            Ext.Ajax.request({
                url:'hostel/makepayhstlrmfee.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    var rec = eval('('+res.responseText+')');
                    if(rec.pid!=null ){
                     Ext.Msg.alert('Success','Hostel Fee paid Successfully');
                    }
                    else
                    Ext.Msg.alert('Failer','Hostel Fee not paid,Please Contact Admin');    
                }
            });
        } 
        }
}

Ext.define('MyApp.view.hostel.Hostel' ,{
    extend: 'Ext.panel.Panel',
    closable:true,
    title: 'Hostel Management',
    id:'hostelgrid',    
    alias: 'widget.hostel',    
    layout:{
        type:'vbox',
        align:'stretch'
    },

    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },        
    
    initComponent: function() {
    var masterSM = Ext.create('Ext.selection.CheckboxModel',{
            singleSelect:true,
            listeners:{

                selectionchange : function(sm){
                    
                 var rec=Ext.getCmp('hostel_grid').getSelectionModel().getSelection()[0];
                 
                 Ext.StoreMgr.lookup('HostelRoom').load({
                            params:{'id':rec.data.pid
                    }}
                 );
              /*   Ext.StoreMgr.lookup('TransportPlace').reload({
                            params:{'routeid':rec.data.routeid
                    }}
                                 
                 );  
                 Ext.StoreMgr.lookup('TransportVehicle').load({
                            params:{'routeid':rec.data.routeid
                    }}
                                 
                 );  
              */ 
                     
                } 
            }
        });
    this.items=[
        {
            xtype:'grid',
            store:'Hostel',
            id:'hostel_grid',
            title:'Hostel Details',
            selModel:masterSM,
            height:170,
            vieConfig:{
                forceFit:true
            },
            columns:[
            Ext.create('Ext.grid.RowNumberer'),
            {
                header: 'Hostel Name',  
                dataIndex: 'name', 
                flex:1,
                style :'color:#17385B;font-weight:bold'
            },
            {
                header: 'Type',  
                dataIndex: 'type', 
                flex:1,
                style :'color:#17385B;font-weight:bold'
            },
            {
                header: 'Address',  
                dataIndex: 'address', 
                flex:1,
                style :'color:#17385B;font-weight:bold'
            },
            {
                header: 'Contact No',  
                dataIndex: 'contactno', 
                flex:1,
                style :'color:#17385B;font-weight:bold'
            },
            {
                header: 'Contact Person',  
                dataIndex: 'contactperson', 
                flex:1,
                style :'color:#17385B;font-weight:bold'
            },
            {
                header: 'Comment',  
                dataIndex: 'comment', 
                flex:1,
                style :'color:#17385B;font-weight:bold'
            }
            ]
            
        },{

            xtype:'panel',
            extend: 'Ext.panel.Panel',
            store:'Master',
            id:'innerpanel',
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
                    xtype:'panel',
                    extend: 'Ext.panel.Panel',
                    id   :'room',
                    items:[{
                        xtype:'grid',
                        id   :'room_grid',
                        store:'HostelRoom',
                        height:200,
                        vieConfig:{
                           forceFit:true
                        },
                        selModel:Ext.create('Ext.selection.CheckboxModel',{
                             singleSelect:true,
                             listeners:{                
                                selectionchange:function(){
                                        var rec=Ext.getCmp('room_grid').getSelectionModel().getSelection()[0];
                                        Ext.StoreMgr.lookup('HostelRoomAllocation').load({
                                                   params:{'hostelid':rec.data.hostelid,
                                                           'roomid'  :rec.data.pid,
                                                           'sessionid':SETTING.Users.properties.session_id
                                        }}
                                       );
                                }
                            }
                        }),
                        columns:[
                            Ext.create('Ext.grid.RowNumberer'),
                            {header :'<font color=green><b>Floor-No</b></font>',
                             dataIndex:'floorno',
                             width:'10%',   
                             renderer: function(value) {         
                                  return "<font color=green><b>" + value + "</b></font>";
                             }   
                             },        
                            {header :'<font color=red><b>Room-No</b></font>',
                             dataIndex:'roomno',
                             width:'10%',   
                             renderer: function(value) {         
                                  return "<font color=red><b>" + value + "</b></font>";
                             }   
                             },
                            {header :'<font color=green><b>Room Type</b></font>',dataIndex:'roomtype',width:'15%'},
                            {header :'<font color=green><b>Student Bed Capacity</b></font>',dataIndex:'totstudent',width:'15%'},
                            {header :'<font color=green><b>Avialable Bed</b></font>',dataIndex:'place4',width:'15%'},
                            {header :'<font color=green><b>Rent Per Bed</b></font>',dataIndex:'roomrent',width:'15%'},
                            {header :'<font color=green><b>Comment</b></font>',dataIndex:'comment',width:'14%'}
                        ]
                       }
                    ],
                       tbar :[{
                            iconCls: 'icon-add',
                            text: '<b>Allocate Room</b>',
                            listeners:{
                                render: function(component){
                                    component.getEl().on('click', function(){                    
                                        
                                    var rec=Ext.getCmp('room_grid').getSelectionModel().getSelection()[0];                                
                                    var rec_hos=Ext.getCmp('hostel_grid').getSelectionModel().getSelection()[0];                                
                                    if((rec!=null && rec.data.pid!=null) && (rec_hos!=null && rec_hos.data.pid!=null)){
                                      allocateRoom(rec,rec_hos);  
                                    }    
                                  });
                              
                                }
                            }
                         },
                         {
                            iconCls: 'icon-add',
                            text: '<b>Re-Allocate Room</b>',
                            disabled: true,
                            listeners:{
                                render: function(component){
                                    component.getEl().on('click', function(){                    
                                   /* var rec=Ext.getCmp('room_grid').getSelectionModel().getSelection()[0];                                
                                    var rec_hos=Ext.getCmp('hostel_grid').getSelectionModel().getSelection()[0];                                
                                    if((rec!=null && rec.data.pid!=null) && (rec_hos!=null && rec_hos.data.pid!=null)){
                                      allocateRoom(rec,rec_hos);  
                                    } */   
                                  });
                                 
                                }
                            }
                         },        
                  ]  
                },
                {
                    xtype:'grid',
                    id   :'roomallocationgrid',
                    store:'HostelRoomAllocation',
                    height:300,
                    selModel:Ext.create('Ext.selection.CheckboxModel',{
                             singleSelect:true,
                             listeners:{                
                                selectionchange:function(){
                                }
                            }
                        }),
                    columns:[
                            {header :'<font color=green><b>Hostel</b></font>',dataIndex:'hostel',width:'15%'},
                            {header :'<font color=green><b>Room No</b></font>',dataIndex:'room',width:'10%'},
                            {header :'<font color=green><b>Allocated To</b></font>',dataIndex:'allocateto',width:'10%'},
                            {header :'<font color=green><b>Name</b></font>',dataIndex:'name',width:'15%'},
                            {header :'<font color=green><b>From</b></font>',dataIndex:'fromdate',width:'10%'},
                            {header :'<font color=green><b>To</b></font>',dataIndex:'todate',width:'8%'},
                            {header :'<font color=green><b>Fee Paid Status</b></font>',
                             dataIndex:'feepaidstatus',
                             width:'12%',
                             renderer:function(value,metadata,row){
                                  if(row.data.paid==1)
                                      return '<font color=green><b>'+value+'</b></font>';
                                  else
                                      return '<font color=red><b>'+value+'</b><font>';
                             }
                            },
                            {header :'<font color=green><b>Paid On</b></font>',dataIndex:'paidon',width:'15%'}
                        ],
                        tbar :[{
                        xtype:'combobox',
                        id:'hosallocateto',
                        name:'hosallocateto',                
                        store:Ext.create('Ext.data.Store', {
                            fields: ['id', 'value'],
                            data : [
                            {"id":"1","value":"Teacher"},
                            {"id":"2","value":"Student"}
                        ]
                        }),
                        typeAhead: true,
                        queryMode: 'local',
                        emptyText: 'Select Allocated to ...',
                        Autoload:true,
                        valueField :'id',
                        displayField :'value',
                        listeners:{
                            select: function(component){
                                var issueto=Ext.getCmp('hosallocateto').getValue();

                               if(issueto==='1'){
                                    Ext.getCmp('hosrclassid').hide();
                                    Ext.getCmp('hosrstudentid').hide();
                                    Ext.getCmp('hosrteacherid').show();

                               }else if(issueto==='2'){
                                    Ext.getCmp('hosrteacherid').hide();
                                    Ext.getCmp('hosrclassid').show();
                                    Ext.getCmp('hosrstudentid').show();
                                }
                            }
                            }
                     },{
                        xtype:'combobox',
                        id:'hosrteacherid',
                        name:'hosrteacherid',                
                        store:Ext.create('MyApp.store.Combo').load(
                                  {
                                       params:{propertyId:5
                                  }}
                        ),
                        typeAhead: true,
                        queryMode: 'local',
                        emptyText: 'Select Teacher Name',
                        Autoload:true,
                        valueField :'id',
                        displayField :'value',
                        hidden:true,
                        listeners:{
                            select :function(component){
                                var issueto=Ext.getCmp('hosallocateto').getValue();
                                if(issueto!==null){
                                var teacherid=Ext.getCmp('hosrteacherid').getValue();
                              }
                              else{
                                 Ext.Msg.alert('Warning','Please Select Issued To....');   
                              }
                            }
                        }
                    },{
                        xtype:'combobox',
                        id:'hosrclassid',
                        name:'hosrclassid',                
                        store:Ext.create('MyApp.store.ClassCombo1').load({
                                              params:{propertyId:2,
                                                      classid:SETTING.Users.properties.session_id,
                                                      teacherid :SETTING.Users.userId
                                            }}),
                        typeAhead: true,
                        queryMode: 'local',
                        emptyText: 'Select Class Name',
                        Autoload:true,
                        valueField :'id',
                        displayField :'value',
                        hidden:true,
                        listeners:{
                            select: function(component){
                            var classid=Ext.getCmp('hosrclassid').getValue();
                             Ext.getCmp('hosrstudentid').getStore().load({
                             params:{
                                     propertyId:7,///Student List
                                     classid   :classid+'&'+SETTING.Users.properties.session_id,
                                     teacherid :SETTING.Users.userId
                             }
                             });

                            }
                       }

                    },{
                        xtype:'combobox',
                        id:'hosrstudentid',
                        name:'hosrstudentid',                
                        store:'ClassCombo',
                        typeAhead: true,
                        queryMode: 'local',
                        emptyText: 'Select Student .....',
                        Autoload:true,
                        valueField :'id',
                        displayField :'value',
                        hidden:true,
                        listeners:{
                            select: function(component){

                           var classid=Ext.getCmp('hosrclassid').getValue();
                           var studid=Ext.getCmp('hosrstudentid').getValue();
                              
                        }
                        }                  
                    },{
                            iconCls: 'icon-add',
                            text: '<b>Pay Hostel Fee</b>',
                            listeners:{
                                render: function(component){
                                    component.getEl().on('click', function(){                    
                                       var rec=Ext.getCmp('roomallocationgrid').getSelectionModel().getSelection()[0];                                
                                       
                                        if(rec.data.pid!=null){
                                           if(rec.data.paid==0)
                                               payHostelFee(rec);
                                           else
                                           Ext.Msg.alert('Warning','<font color=red><b>Hostel Fee Already Paid for </b></font>'+ rec.data.name);
                                       } 
                                    });

                                }
                            }
                         },
                         {
                            iconCls: 'icon-add',
                            text: '<b>Vecant Room</b>',
                            listeners:{
                                render: function(component){
                                    component.getEl().on('click', function(){                    
                                        
                                    });

                                }
                            }
                        },        
                         {
                            iconCls: 'icon-add',
                            text: '<b>Hostel Fee Defaulter List</b>',
                            listeners:{
                                render: function(component){
                                    component.getEl().on('click', function(){                    
                                        
                                    });

                                }
                            }
                        }      
                        ]
                        
                }
            ]
        }
    ];
    this.selModel=Ext.create('Ext.selection.CheckboxModel',{
        singleSelect:true,
        listeners:{
                selectionchange:function(){

                   var  button = Ext.getCmp('classEdit');
                   button.setDisabled(false);
                   var  delbutton = Ext.getCmp('classDelete');
                   delbutton.setDisabled(false);
                }
            }
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
        iconCls: 'icon-add',
        text: '<b>Add Hostel</b>',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                    addHostel(null);
                });

            }
        }
    },{
        iconCls: 'icon-edit',
        text: '<b>Edit Hostel</b>',
        disabled: true,
        id:'routeEdit',
        scope:this,
        handler: function(component){
                    var rec=Ext.getCmp('classgrid').getSelectionModel().getSelection()[0];
                    addClasses(rec);
        }
    },{
        iconCls: 'icon-delete',
        text: '<b>Delete Hostel</b>',
        disabled: true,        
        id:'routeDelete',
        handler: function(component){
            Ext.Msg.confirm("Alert","Are you sure want to delete records", function(btn){
            if(btn==='yes'){
                var grid = Ext.getCmp('classgrid');
                grid.getStore().remove(grid.getSelectionModel().getSelection());
            }
        });
        }
    },{
        xtype:'button',
        text:'<b>Add Room</b>',
        iconCls: 'icon-add',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                     var rec=Ext.getCmp('hostel_grid').getSelectionModel().getSelection()[0];                                
                          if(rec!=null && rec.data.pid!=null){
                                 addRoomToHostel(rec,null);  
                     }    
                
                });

            }
        }
    },{
        xtype:'button',
        text:'<b>Edit Room</b>',
        iconCls: 'icon-edit',
        disabled: true,
        scope :this,
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                    var rec=Ext.getCmp('classgrid').getSelectionModel().getSelection()[0];
                    addSubjects(rec);
                });

            }
        }
    },{
        iconCls: 'icon-delete',
        text: '<b>Delete Room</b>',
        disabled: true,        
        id:'vendorDelete',
        handler: function(component){
            Ext.Msg.confirm("Alert","Are you sure want to delete records", function(btn){
            if(btn==='yes'){
                var grid = Ext.getCmp('classgrid');
                grid.getStore().remove(grid.getSelectionModel().getSelection());
            }
        });
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
        text:'<b>Print</b>',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    //addFeeTemplate();
                    });

            }
        }
    },{
        xtype:'splitbutton',
        text:'<b>Export Data</b>',
        arrowAlign:'right',
        menu: [{text: 'PDF'},{text: 'Excelsheet'}],
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




