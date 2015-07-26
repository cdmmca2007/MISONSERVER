
function addVendor(rec){

    var win = Ext.getCmp('transport_win');
    if(!win){
        win=Ext.create('Ext.window.Window', {
            title:'Transport Management -> Add Vehicle For Route--><font color=green><b>'+rec.data.name+'</b></font>' ,
            id:'addvendor',
            width:600,
            height:300,
            closeAction:'hide',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:'Add Vehicle Detail'
            },
            url:'ppppp',
            items :[{                             
                    xtype: 'tabpanel',
                    layout:'fit',                    
                    items: [{                        
                      
                        title: 'Personal Detail',
                        defaults:{
                                        xtype:'textfield',
                                        value:''                                       
                        },

                        items:[
                            {
                                name : 'name',
                                fieldLabel: 'Vendor Name',
                                id:'name'
                            },
                            {
                                name : 'cname',
                                fieldLabel: 'Company Name',
                                id:'cname'
                                
                            },{
                                name : 'oaddress',
                                fieldLabel: 'Office Address',
                                id:'oaddress'                                
                            }                            
                            
                        ]
                    }, {
                        title: 'Contact Detail',
                        defaults:{
                                xtype:'textfield',
                                value:''
                              
                        },

                        items:[
                            {
                                name : 'pname',
                                fieldLabel: 'Contact Person',
                                id:'pname'
                            },
                            {
                                name : 'mnumber',
                                fieldLabel: 'Mobile Number',
                                id:'mnumber'
                                
                            },{
                                name : 'paddress',
                                fieldLabel: 'Person Address',
                                id:'paddress'                                
                            }                            
                        ]
                    }, {
                        title: 'Vehicle Details',
                        defaults:{
                                xtype:'textfield',
                                value:'',
                                width:300
                        },

                        items:[
                            
                            {
                                xtype: 'combo',
                                emptyText: 'Select Vehicle Type',
                                name : 'vtype',
                                fieldLabel: 'Vehicle Type',
                                id:'vtype',
                                store:Ext.create('MyApp.store.Master').load({
                                                               params:{propertyId:10}}),//For Teacher
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
                                name : 'vname',
                                fieldLabel: 'Vehicle Name',
                                id:'vname'
                            },
                            {
                                name : 'vnumber',
                                fieldLabel: 'Vehicle Number',
                                id:'vnumber'
                                
                            },{
                                name : 'seat',
                                fieldLabel: 'No Of Seats',
                                id:'seat'                                
                            },{
                                name : 'drivername',
                                fieldLabel: 'Driver Name',
                                id: 'drivername'
                            },{
                                name : 'dcontactnum',
                                fieldLabel: 'Driver Contact Number',
                                id:'dcontactnum'
                            },{
                                name : 'altdcontactnum',
                                fieldLabel: 'Driver Alternate Number',
                                id:'altdcontactnum'
                            }                              
                        ]
                    }]
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
                  
                var data={  'routeid'    :rec.data.routeid,
                            'name'       :Ext.getCmp('name').getValue(),
                            'oaddress'   :Ext.getCmp('oaddress').getValue(),
                            'cname'      :Ext.getCmp('cname').getValue(),
                            'mnumber'    :Ext.getCmp('mnumber').getValue(),
                            'pname'      :Ext.getCmp('pname').getValue(),
                            'paddress'   :Ext.getCmp('paddress').getValue(),
                            'vtype'      :Ext.getCmp('vtype').getValue(),
                            'vname'      :Ext.getCmp('vname').getValue(),
                            'vnumber'    :Ext.getCmp('vnumber').getValue(),
                            'seat'       :Ext.getCmp('seat').getValue(),
                            'drivername' :Ext.getCmp('drivername').getValue(),
                            'dcontactnum':Ext.getCmp('dcontactnum').getValue(),
                            'altdcontactnum':Ext.getCmp('altdcontactnum').getValue()
                         };                             
                  Ext.Ajax.request({
                    url:'transportroute/addbus.do',
                    type:'json',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    params:Ext.JSON.encode(data),
                    success: function(res){
                        var rec = eval('('+res.responseText+')');
                        if(rec.id!=null)
                        Ext.Msg.alert('Success','Vehicle Details added successfully');
                        else
                        Ext.Msg.alert('Success','Error Occured , Please Contact Admin');    
                     //   var rec = eval('('+res.responseText+')');
                     //   app.getController('Class').getClassStore().add(rec);
                    }
                });

                 });
                }
              }
                    
            },
            {
                text:'Close',
                handler:function () {
                    this.up('window').close();
                }
            }
            ]
        });
    }
    win.show();
}


function addRoute(rec){

    var win = Ext.getCmp('route_win');
    if(!win){
        win=Ext.create('Ext.app.view.component.AppWindow', {
            title:rec?'Edit Route Form':'Add New Route Form',
            id:rec?'editroute_win':'addroute_win',
            width:400,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:'Create Route Details'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:300
            },
            url:'ppppp',
            formItems :[
            {
                name : 'routeid',                
                id:'name',
                hidden:true,
                fieldLabel: 'Route Id'
            },
            {
                name : 'name',
                fieldLabel: 'Route Name',
                id:'name'
            },{
                xtype:'combobox',
                fieldLabel :'Source Place',
                id:'sid',
                name:'sid',                
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:9}}),//For Location
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select a Source Place...',
                Autoload:true,
                valueField :'id',
                displayField :'value'
            },
            {
                xtype:'combobox',
                fieldLabel :'Destination Place',
                id:'did',
                name:'did',
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:9}}),//For Location
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select a Destination...',
                Autoload:true,
                valueField :'id',
                displayField :'value'
            },{
                name : 'place1',
                fieldLabel: 'Intermediate Place-1',
                id:'place1'
            },{
                name : 'place2',
                fieldLabel: 'Intermediate Place-2',
                id:'place2'
            },{
                name : 'place3',
                fieldLabel: 'Intermediate Place-3',
                id:'place3'
            },{
                name : 'place4',
                fieldLabel: 'Intermediate Place-4',
                id:'place4'
            },{
                name : 'place5',
                fieldLabel: 'Intermediate Place-5',
                id:'place5'
            },{
                name : 'place6',
                fieldLabel: 'Intermediate Place-6',
                id:'place6'
            }
            ],
            buttons :[
            {
                text: rec?'Edit':'Add',
                action: 'save',
                scope:this,
                handler:saveRoute
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();

}


function addBusDetails(rec){
    
    
}

function saveMaster(btn){

      var form = btn.up('window').down('form').getForm();
      var grid =  Ext.getCmp('classgrid');
      //var recs =grid.getSelectionModel().getSelection();
        if(form.isValid()){
            var obj = form.getValues();
           
            
            Ext.Ajax.request({
                url:'classes/add.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    Ext.Msg.alert('Success','Class added successfully');
                 //   var rec = eval('('+res.responseText+')');
                 //   app.getController('Class').getClassStore().add(rec);
                }
            });
        }
}

function saveRoute(btn){
    
      var form = btn.up('window').down('form').getForm();
      var grid =  Ext.getCmp('transportgrid');
      //var recs =grid.getSelectionModel().getSelection();
        if(form.isValid()){
            var obj = form.getValues();
            Ext.Ajax.request({
                url:'transportroute/add.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    var rec = eval('('+res.responseText+')');
                    if(rec.routeid!=null){
                     Ext.Msg.alert('Success','Route added successfully');
                     app.getController('Route').getClassStore().add(rec);
                    }
                    else
                    Ext.Msg.alert('Failer','Route not Saved,Please Contact Admin');    
                 //   var rec = eval('('+res.responseText+')');
                 //   app.getController('Class').getClassStore().add(rec);
                }
            });
        }
}


Ext.define('MyApp.view.transport.Transport' ,{
    extend: 'Ext.panel.Panel',
    closable:true,
    title: 'Transport Management',
    id:'transportgrid',    
    alias: 'widget.transport',    
    layout:{
        type:'hbox',
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
                    
                 var rec=Ext.getCmp('route_grid').getSelectionModel().getSelection()[0];
                 
                 Ext.StoreMgr.lookup('TransportPlace').load({
                            params:{'routeid':rec.data.routeid
                    }}
                 );
                 Ext.StoreMgr.lookup('TransportPlace').reload({
                            params:{'routeid':rec.data.routeid
                    }}
                                 
                 );  
                 Ext.StoreMgr.lookup('TransportVehicle').load({
                            params:{'routeid':rec.data.routeid
                    }}
                                 
                 );  
    
                     
                } 
            }
        });
    this.items=[
        {
            xtype:'grid',
            store:'Route',
            id:'route_grid',
            title:'Route Details',
            width:300,
            selModel:masterSM,
            vieConfig:{
                forceFit:true
            },
            columns:[
            Ext.create('Ext.grid.RowNumberer'),
            {
                header: 'Route Name',  
                dataIndex: 'name', 
                flex:1,
                style :'color:#17385B;font-weight:bold'
            },
            {
                header: 'Source',  
                dataIndex: 'source', 
                flex:1,
                style :'color:#17385B;font-weight:bold'
            },
            {
                header: 'Destination',  
                dataIndex: 'destination', 
                flex:1,
                style :'color:#17385B;font-weight:bold'
            }
            ]
            
        },{
            title:'Route Viya , Bus Details',
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
                    title:'Transport Route Details --> Place Visit',
                    xtype:'panel',
                    extend: 'Ext.panel.Panel',
                    id   :'place',
                    height:150,
                    items:[{
                        xtype:'grid',
                        id   :'placegrid',
                        store:'TransportPlace',
                        height:150,
                        width :700,
                        vieConfig:{
                           forceFit:true
                        },
                        columns:[
                            {header :'<font color=red><b>Source</b></font>',dataIndex:'source',flex:1,
                             renderer: function(value) {         
                                  return "<font color=red><b>" + value + "</b></font>";
                             }   
                             },
                            {header :'<font color=green><b>Place1</b></font>',dataIndex:'place1',flex:1},
                            {header :'<font color=green><b>Place2</b></font>',dataIndex:'place2'},
                            {header :'<font color=green><b>Place3</b></font>',dataIndex:'place3'},
                            {header :'<font color=green><b>Place4</b></font>',dataIndex:'place4'},
                            {header :'<font color=green><b>Place5</b></font>',dataIndex:'place5'},
                            {header :'<font color=green><b>Place6</b></font>',dataIndex:'place6'},
                            {header :'<font color=red><b>Destination</b></font>',dataIndex:'destination',
                             renderer: function(value) {         
                                  return "<font color=red><b>" + value + "</b></font>";
                             }   

                            }                            
                        ]
                    }

                    ]
                },
                {
                    xtype:'grid',
                    id   :'vehiclegrid',
                    store:'TransportVehicle',
                    columns:[
                            {header :'<font color=green><b>Transport</b></font>',dataIndex:'vendor'},
                            {header :'<font color=green><b>Type</b></font>',dataIndex:'type',flex:1},
                            {header :'<font color=green><b>Bus Name</b></font>',dataIndex:'vname'},
                            {header :'<font color=green><b>Bus Number</b></font>',dataIndex:'vnumber',flex:1},
                            {header :'<font color=green><b>Tot Seat</b></font>',dataIndex:'seat'},
                            {header :'<font color=green><b>Driver Name</b></font>',dataIndex:'dname'},
                            {header :'<font color=green><b>Driver Num</b></font>',dataIndex:'dcontact'}
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
        text: 'Add Route',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                    addRoute(null);
                })

            }
        }
    },{
        iconCls: 'icon-edit',
        text: 'Edit Route',
        disabled: true,
        id:'routeEdit',
        scope:this,
        handler: function(component){
                    var rec=Ext.getCmp('classgrid').getSelectionModel().getSelection()[0];
                    addClasses(rec);
        }
    },{
        iconCls: 'icon-delete',
        text: 'Delete Route',
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
        text:'Add Vehicle',
        iconCls: 'icon-add',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                    var rec=Ext.getCmp('route_grid').getSelectionModel().getSelection()[0];
                    addVendor(rec);
                });

            }
        }
    },{
        xtype:'button',
        text:'Edit Vehicle',
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
        text: 'Delete Vehicle',
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
        text:'Print',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    //addFeeTemplate();
                    })

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
        text:'Class Room Detail',
        iconCls: 'icon-add',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    //addFeeTemplate();
                });

            }
        }
    },{
        xtype:'button',
        text:'Class Room Detail',
        iconCls: 'icon-add',
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




