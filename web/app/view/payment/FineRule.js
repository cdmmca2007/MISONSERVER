function addEditFineRule(rec){
    var win = Ext.getCmp('addfinerule_win');
    if(!win){
        win=Ext.create('Ext.app.view.component.AppWindow', {
            title:rec?'Edit Fine Form':'Add New Fine Form',
            id:rec?'editfinerule_win':'addfinerule_win',
            width:400,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/portal-icon/fee_struc.jpg',
                formTitle:rec?'Edit Fine Rule Details':'New Fine Rule Details'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:300
            },
            url:'ppppp',
            formItems :[
            {
                name : 'sessionid',                
                id:'sessionid',
                hidden:true,
                value:SETTING.Users.properties.session_id
            },    
            {
                name : 'finetypeid',                
                id:'finetypeid',
                hidden:true,
                value:rec?rec.data.finetypeid:null
            },{
                name : 'fineid',                
                id:'fineid',
                hidden:true,
                value:rec?rec.data.fineid:null
            },
            {
                name : 'finename',
                fieldLabel: 'Fine Name',
                id:'finename',
                value:rec?rec.data.finename:null,
                readOnly:true
            },{
                xtype:'combobox',
                fieldLabel :'Select Fine Type Category',
                id:'finetypecategory',
                name:'finetypecategory',                
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:49}}),//For Class
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select a Fine Type Category.... ',
                Autoload:true,
                valueField :'id',
                displayField :'value',
                listeners:{
                    select: function(component){                        
                       var issueto=Ext.getCmp('finetypecategory').getValue();
                       if(issueto==='88cb77d4-8259-41c9-953d-bafeaf070762'){
                            Ext.getCmp('fromdate').hide();
                            Ext.getCmp('todate').hide();
                            Ext.getCmp('fineday').show();
                        }else if(issueto==='b2611c13-1395-4e6e-98ae-d349ec991813'){
                            Ext.getCmp('fineday').hide();
                            Ext.getCmp('fromdate').show();
                            Ext.getCmp('todate').show();
                        }
                    }
               }
            },{
                xtype:'combobox',
                fieldLabel :'Select Fine Charge Category',
                id:'finechargecategory',
                name:'finechargecategory',                
                store:Ext.create('Ext.data.Store', {
                     fields: ['id', 'value'],
                     data : [
                     {"id":"1","value":"Percentage"},
                     {"id":"2","value":"Fixed Amount"}
                 ]
                 }),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select a Fine Charge Category.... ',
                Autoload:true,
                valueField :'id',
                displayField :'value',
                listeners:{
                    select: function(component){                        
                   // Ext.getCmp('name').setValue(Ext.getCmp('classlevel').getRawValue());
                    }
               }
            },{
                name : 'fineday',
                fieldLabel: 'Day from Due Date',
                id:'fineday',
                value:rec?rec.data.fineday:null,
                hidden:true
            },{
                xtype:'datefield',
                name : 'fromdate',
                fieldLabel: 'From Date',
                id:'fromdate',
                format: 'd',
                //altFormats: 'm-d-Y|m.d.Y',
                hidden:true
                },{
                xtype:'datefield',
                name : 'todate',
                fieldLabel: 'To Date',
                id:'todate',
                format: 'd',
                //altFormats: 'm-d-Y|m.d.Y',
                hidden:true
                },{
                name : 'fineamountpercent',
                fieldLabel: 'Fine Amount/Percent',
                id:'fineamountpercent',
                value:rec?rec.data.fineamountpercent:null
            }
            ],
            buttons :[
            {
                text: rec.data.fineid?'Edit':'Add',
                action: 'save',
                scope:this,
                handler:saveFineRule
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
}

function saveFineRule(btn){
     var form = btn.up('window').down('form').getForm();
        if(form.isValid()){
            var obj = form.getValues();
            
            if(obj.finetypecategory==='88cb77d4-8259-41c9-953d-bafeaf070762'){
                obj.fromdate=obj.fineday;
                obj.todate  =obj.fineday;
            }
            Ext.Ajax.request({
                url:'finediscount/addfinerule.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                Ext.Msg.alert('Success','Fine Rule Details added successfully');
                Ext.StoreManager.lookup('Fine').load({
                params:{sessionid:SETTING.Users.properties.session_id
                }
              });
                }
            });
        }
}
function addFine(rec){

    var win = Ext.getCmp('addfine_win');
    if(!win){
        win=Ext.create('Ext.app.view.component.AppWindow', {
            title:rec?'Edit Fine Form':'Add New Fine Form',
            id:rec?'editfine_win':'addfine_win',
            width:400,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/portal-icon/fee_struc.jpg',
                formTitle:rec?'Edit Fine Details':'New Fine Details'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:300
            },
            url:'ppppp',
            formItems :[
            {
                name : 'sessionid',                
                id:'sessionid',
                hidden:true,
                value:SETTING.Users.properties.session_id
            },    
            {
                name : 'finetypeid',                
                id:'finetypeid',
                hidden:true,
                value:rec?rec.data.finetypeid:null
            },
            {
                name : 'finename',
                fieldLabel: 'Fine Name',
                id:'finename',
                value:rec?rec.data.finename:null
            }
            ],
            buttons :[
            {
                text: rec?'Edit':'Add',
                action: 'save',
                scope:this,
                handler:saveFine
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();

}

function saveFine(btn){

      var form = btn.up('window').down('form').getForm();
        if(form.isValid()){
            var obj = form.getValues();
                       
            Ext.Ajax.request({
                url:'finediscount/addfine.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                Ext.Msg.alert('Success','Fine Details added successfully');
                Ext.StoreManager.lookup('Fine').load({
                params:{sessionid:SETTING.Users.properties.session_id
                }
              });
                }
            });
        }
}

Ext.define('MyApp.view.payment.FineRule' ,{
    extend: 'Ext.grid.Panel',
    closable:true,
    title: 'Finance- Fine Rules',
    id:'finepanel',    
    alias: 'widget.finepanel',    
    layout:'fit',
    store:'Fine',
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
                dataIndex: 'finetypeid', 
                flex:1,
                style :'color:#17385B;font-weight:bold',
                hidden:true
            },{
                dataIndex: 'fineid', 
                flex:1,
                style :'color:#17385B;font-weight:bold',
                hidden:true
            },
            {
                header: 'Fine Name',  
                dataIndex: 'finename', 
                flex:1,
                style :'color:#17385B;font-weight:bold',
                width:'20%'
            },
            {
                header: 'Fine-Rule',  
                dataIndex: 'finerule', 
                flex:1,
                style :'color:#17385B;font-weight:bold',
                width:'50%'
            },
            {
                header: 'Amount/Percent',  
                dataIndex: 'fineamountpercent', 
                flex:1,
                style :'color:#17385B;font-weight:bold',
                width:'20%',
                renderer : function(value,metadata,record){
            	  if(record.data.finechargecategory==1) 
                  return value+' %';
                  else{
                  return value;  
                }
            }
            },{
                
                dataIndex: 'finechargecategory',
                hidden:true
            },{
                dataIndex: 'finetypecategory',
                hidden:true
            },{
                dataIndex: 'fromdate' ,
                hidden:true
            },{
                dataIndex: 'todate' ,
                hidden:true
            }
            ];
           this.selModel=Ext.create('Ext.selection.CheckboxModel',{
                            singleSelect:true,
                            listeners:{
                                    selectionchange:function(sm){
                                    Ext.getCmp('fineEdit').setDisabled((sm.getCount()==0));
                                    Ext.getCmp('fineDelete').setDisabled((sm.getCount()==0));
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
                            text: 'Add Fine',
                            id:'addFine',
                            listeners:{
                                render: function(component){
                                    component.getEl().on('click', function(){                    
                                       addFine(null); 
                                    })

                                }
                            }
                        },{
                            iconCls: 'icon-edit',
                            text: 'Edit Fine',
                            disabled: true,
                            id:'fineEdit',
                            scope:this,
                            handler: function(component){
                                        var rec=Ext.getCmp('finepanel').getSelectionModel().getSelection()[0];
                                        if(rec!=null){
                                            addFine(rec); 
                                        }
                                        
                            }
                        },{
                            iconCls: 'icon-delete',
                            text: 'Delete Fine',
                            disabled: true,        
                            id:'fineDelete',
                            handler: function(component){
                                var grid = Ext.getCmp('finepanel');
                                var rec=grid.getSelectionModel().getSelection()[0];
                                if(rec!=null) {
                                var data={
                                        'finetypeid':rec.data.finetypeid
                                  };    
                                Ext.Msg.confirm("Alert","Are you sure want to delete Fine Details", function(btn){
                                if(btn==='yes'){
                                    Ext.Ajax.request({
                                        url:'finediscount/delFine.do',
                                        type:'json',
                                        headers:{
                                            'Content-Type':'application/json'
                                        },
                                        params:Ext.JSON.encode(data),
                                        success: function(res){
                                            grid.getStore().remove(grid.getSelectionModel().getSelection());
                                            Ext.Msg.alert('Success','Fine Details deleted successfully');
                                            /*
                                             Ext.StoreManager.lookup('Fine').load({
                                             params:{sessionid:SETTING.Users.properties.session_id
                                             } 
                                             */
                                        }
                                    });
                                    
                                    
                                }
                            });
                            }
                            }
                        },{
                            iconCls: 'icon-add',
                            text: 'Add/Edit Fine-Rule',
                            id:'addFinerule',
                            listeners:{
                                render: function(component){
                                    component.getEl().on('click', function(){                    
                                    var grid = Ext.getCmp('finepanel');
                                    var rec=grid.getSelectionModel().getSelection()[0];
                                    if(rec!=null){
                                        addEditFineRule(rec);
                                    }
                                        
                                })

                                }
                            }
                        }
             ];
             this.bbar =Ext.create('Ext.PagingToolbar', {
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




