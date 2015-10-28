function addDiscount(rec){
     var win = Ext.getCmp('adddiscount_win');
    if(!win){
        win=Ext.create('Ext.app.view.component.AppWindow', {
            title:rec?'Edit Discount Form':'Add New Discount Form',
            id:rec?'editdiscount_win':'adddiscount_win',
            width:450,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/portal-icon/discount.png',
                formTitle:rec?'Edit Discount Details':'New Discount Details'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:380
            },
            url:'ppppp',
            formItems :[
            {
                name : 'sessionid',                
                id:'sessionid',
                readOnly:true,
                hidden:true,
                value:SETTING.Users.properties.session_id
            },    
            {
                name : 'discountid',                
                id:'discountid',
                hidden:true,
                value:rec?rec.data.discounttypeid:null
            },{
                name : 'discountname',
                fieldLabel: 'Discount Name',
                id:'discountname',
                value:rec?rec.data.discountname:null
            },{
                xtype:'combobox',
                fieldLabel :'Discount Category',
                id:'discountcategoryid',
                name:'discountcategoryid',
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:51}}),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Discount Category',
                Autoload:true,               
                valueField :'id',
                displayField :'value',
                listeners:{
                select: function(component){
                var discountcategoryid  =Ext.getCmp('discountcategoryid').getValue();
                    if(discountcategoryid=='4001eb63-e08c-45f8-b839-3d2fd204d0e6'){
                        Ext.getCmp("classid").show();
                        Ext.getCmp("studentid").hide();
                        Ext.getCmp("studentcategory").hide();
                    }
                    else if(discountcategoryid=='5c800530-2382-4032-aa6a-8dcb740da15f'){
                        Ext.getCmp("classid").hide();
                        Ext.getCmp("studentid").hide();
                        Ext.getCmp("studentcategory").show();
                        
                    }else if(discountcategoryid=='dda1f42b-d3e4-4949-9afe-191934af8362'){
                        Ext.getCmp("classid").show();
                        Ext.getCmp("studentid").show();
                        Ext.getCmp("studentcategory").hide();
                        
                    }
               }
               }
            },   
            {
                xtype:'combobox',
                fieldLabel :'Select Class/Batch',
                id:'classid',
                name:'classid',
                hidden:true,
                store:Ext.create('MyApp.store.ClassCombo1').load({
                                      params:{propertyId:2,
                                              classid   :SETTING.Users.properties.session_id,
                                              teacherid :SETTING.Users.userId
                                      }}),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select a Class...',
                Autoload:true,               
                valueField :'id',
                displayField :'value',
                value:rec?rec.data.batch_id:null,
                listeners:{
                select: function(component){
                var classid  =Ext.getCmp('classid').getValue();
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
                xtype: 'combobox',
                hidden:true,
                emptyText: 'Select Student',
                fieldLabel :'Select Student',
                id:'studentid',
                name:'studentid',
                store:'ClassCombo',
                typeAhead: true,
                queryMode: 'local',
                Autoload:true,
                valueField :'id',
                displayField :'value',  
                listeners:{
                     select: function(component){

                         var classid  =Ext.getCmp('ddclasscombo').getValue();
                         var studentid  =Ext.getCmp('ddstudentcombo').getValue();
                         Ext.getCmp('teacherdairygrid').getStore().load({
                             params:{                            
                                      classid   :classid,
                                      studentid :studentid,
                                      createdby :SETTING.Users.userId,
                                      sessionid :SETTING.Users.properties.session_id        
                              }
                        });

                     }
                }
             },{
                xtype:'combobox',
                fieldLabel :'Select Student Category',
                id:'studentcategory',
                hidden:true,
                name:'studentcategory',
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:52}}),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select a Student Category..',
                Autoload:true,               
                valueField :'id',
                displayField :'value',
                value:rec?rec.data.batch_id:null,
                listeners:{
                select: function(component){
                var classid  =Ext.getCmp('classid').getValue();
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
                fieldLabel :'Fee Category',
                id:'feecategory',
                name:'feecategory',
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:53}}),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select a Fee Category..',
                Autoload:true,               
                valueField :'id',
                displayField :'value',
                value:rec?rec.data.batch_id:null,
                listeners:{
                select: function(component){
                
            }
            }
            },{
                xtype: 'combobox',
                fieldLabel: 'Discount Mode',
                emptyText: 'Discount Percent/Amount',
                id:'discountmode',
                name:'discountmode',
                store:Ext.create('Ext.data.Store', {
                     fields: ['id', 'value'],
                     data : [
                     {"id":"1","value":"Percentage"},
                     {"id":"0","value":"Fixed Amount"}
                 ]
                 }),
                 typeAhead: true,
                 queryMode: 'local',
                 displayField: 'value',
                 valueField: 'id',
                 listeners:{
                     select: function(component){
                     }
                }
             },{
                name : 'discount',
                fieldLabel: 'Discount Percent/Amount',
                id:'discount',
                value:rec?rec.data.discount:null
            },
            {
                xtype:'textarea',
                name : 'description',
                width:380,
                fieldLabel: 'Discount Description',
                id:'description',
                value:rec?rec.data.discription:null
            }
            ],
            buttons :[
            {
                text: rec?'Edit':'Add',
                action: 'save',
                scope:this,
                handler:saveDiscount
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
}

function saveDiscount(btn){
    var form = btn.up('window').down('form').getForm();
        if(form.isValid()){
            var obj = form.getValues();
                       
            Ext.Ajax.request({
                url:'finediscount/adddis.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                Ext.Msg.alert('Success','Discount Details added successfully');
                Ext.StoreManager.lookup('Discount').load({
                params:{sessionid:SETTING.Users.properties.session_id
                }
              });
                }
            });
        }
}

Ext.define('MyApp.view.payment.DiscountRule' ,{
    extend: 'Ext.grid.Panel',
    title: 'Finance- Discount Rule',
    id:'discountpanel',    
    alias: 'widget.discountpanel',    
    layout:'fit',
    store:'Discount',
    closable:true,
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
 
    }, 
    features: [Ext.create('Ext.grid.feature.Grouping', {
            groupHeaderTpl: '{columnName}: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
            hideGroupedHeader: true,
            startCollapsed: true,
            id: 'fineruleGrouping'
        })
    ],
    initComponent: function() {
    var masterSM = Ext.create('Ext.selection.CheckboxModel',{
            singleSelect:true,
            listeners:{
                selectionchange : function(sm){
                    
                } 
            }
    });
    this.columns=[
            Ext.create('Ext.grid.RowNumberer'),
            {
                header: 'Discount Name',  
                dataIndex: 'discountname', 
                flex:1,
                style :'color:#17385B;font-weight:bold'
            },{
                header: 'Discount Category',  
                dataIndex: 'discountcategorytext', 
                flex:1,
                style :'color:#17385B;font-weight:bold'
            },{
                header: 'Session',  
                dataIndex: 'sessions', 
                flex:1,
                style :'color:#17385B;font-weight:bold'
            },{
                header: 'Class/Btach',  
                dataIndex: 'discountcategorytext', 
                flex:1,
                style :'color:#17385B;font-weight:bold'
            },{
                header: 'Fee Category',  
                dataIndex: 'feecategorytext', 
                flex:1,
                style :'color:#17385B;font-weight:bold'
            },
            {
                header: 'Student Category',  
                dataIndex: 'studentcategorytext', 
                flex:1,
                style :'color:#17385B;font-weight:bold'
            },{
                header: 'Discount Category',  
                dataIndex: 'discountcategorytext', 
                hidden:true,
                flex:1,
                style :'color:#17385B;font-weight:bold'
            },
            {
                header: 'Discount Mode',  
                dataIndex: 'discountmodetext', 
                flex:1,
                style :'color:#17385B;font-weight:bold'
            },
            {
                header: 'Amount/Percent',  
                dataIndex: 'discount', 
                flex:1,
                style :'color:#17385B;font-weight:bold',
                renderer : function(value,metadata,record){
            	  if(record.data.discountmode==1) 
                  return value+' %';
                  else{
                  return value;  
                }                   
            } 
            }
            ];
            this.selModel=Ext.create('Ext.selection.CheckboxModel',{
                            singleSelect:true,
                            listeners:{
                                    selectionchange:function(sm){
                                    Ext.getCmp('discountEdit').setDisabled((sm.getCount()==0));
                                    Ext.getCmp('discountDelete').setDisabled((sm.getCount()==0));
                                    }
                                }
                    });
            this.tbar=[{
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
                            text: 'Add Discount',
                            id:'addDiscount',
                            listeners:{
                                render: function(component){
                                    component.getEl().on('click', function(){                    
                                        addDiscount(null);
                                    })

                                }
                            }
                        },{
                            iconCls: 'icon-edit',
                            text: 'Edit Discount',
                            disabled: true,
                            id:'discountEdit',
                            scope:this,
                            handler: function(component){
                                        var rec=Ext.getCmp('classgrid').getSelectionModel().getSelection()[0];
                                        addClasses(rec);
                            }
                        },{
                            iconCls: 'icon-delete',
                            text: 'Delete Discount',
                            disabled: true,        
                            id:'discountDelete',
                            handler: function(component){
                                Ext.Msg.confirm("Alert","Are you sure want to delete Fine Details", function(btn){
                                if(btn==='yes'){
                                    var grid = Ext.getCmp('classgrid');
                                    grid.getStore().remove(grid.getSelectionModel().getSelection());
                                }
                            });
                            }
                        },{
                            iconCls: 'icon-add',
                            text: 'Add/Edit Discount Rule',
                            id:'discountrule',
                            hidden:true,
                            handler: function(component){
                                
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




