Ext.define('MyApp.view.AuditTrail' ,{
    extend: 'Ext.grid.Panel',
    closable:true,
    title: 'Audit Trail',
    layout:'fit',
    viewConfig:{
        forceFit:true
    },
    id:'audittrialgrid',
    store:'AuditTrail',
    constructor: function(config){
        
        this.callParent(Ext.apply([{
            columns:[
            Ext.create('Ext.grid.RowNumberer'),
            {
                header: 'Action',  
                dataIndex: 'details',
                flex:2
            },{
                header: 'Action By',  
                dataIndex: 'actionby',
                flex:1
            },{
                header: 'Time',  
                dataIndex: 'ts',
                flex:1,
                renderer: function(value){
                    return Ext.Date.format(new Date(value),"d/m/Y h:m:s");
                }
            },{
                header: 'IP Address',  
                dataIndex: 'ipaddr',
                flex:1
            }
            ],
            
            tbar :[{
                xtype: 'searchfield',
                width:200,
                name :'searchname',
                id :'searchname',
                emptyText:'Search by action, action by..',
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
            },'|', {
                xtype:'datefield',
                emptyText:'Start date',
                name :'startdate',
                id :'startdate',
                listeners:{
                    select: function(component){

                        var v_ss; 
                        var search=Ext.getCmp('searchname').getValue();
                        if(Ext.getCmp('startdate').getValue()!=null)
                        var start_date= new Date(Ext.getCmp('startdate').getValue()).getTime();
                    
                        if(Ext.getCmp('enddate').getValue()!=null)
                        var end_date  = new Date(Ext.getCmp('enddate').getValue()).getTime();
                        
                        if(start_date!=null)
                           v_ss='ts > '+start_date;
                        if(start_date!=null && end_date!=null)
                           v_ss='ts > '+start_date+' and ts < ' + end_date;
                        if(end_date!=null && start_date==null)
                           v_ss='ts < ' + end_date;

                        Ext.StoreManager.lookup('AuditTrail').reload({
                                 params:{ss:v_ss
                                 }
                         });                
                        
                    }
               }
            },'|',{
                xtype:'datefield',
                emptyText:'End Date',
                name :'enddate',
                id :'enddate',
                listeners:{
                    select: function(component){

                        var v_ss; 
                        var search=Ext.getCmp('searchname').getValue();
                        if(Ext.getCmp('startdate').getValue()!=null)
                        var start_date= new Date(Ext.getCmp('startdate').getValue()).getTime();
                    
                        if(Ext.getCmp('enddate').getValue()!=null)
                        var end_date  = new Date(Ext.getCmp('enddate').getValue()).getTime();
                        
                        if(start_date!=null)
                           v_ss='ts > '+start_date;
                        if(start_date!=null && end_date!=null)
                           v_ss='ts > '+start_date+' and ts < ' + end_date;
                        if(end_date!=null && start_date==null)
                           v_ss='ts < ' + end_date;

                        Ext.StoreManager.lookup('AuditTrail').reload({
                                 params:{ss:v_ss
                                 }
                         });                
                        
                    }
               }
            },'|',
        {
        xtype:'splitbutton',
        text:'<b>Export Log Data</b>',
        arrowAlign:'right',        
        menu: [{text: 'PDF'},{text: 'Excelsheet'}],
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    //addFeeTemplate();
                });

            }
        }
        }
        ]
         
        },config])); 
         
    },
    initComponent: function() {
        //        
        //        this.selModel = Ext.create('Ext.selection.CheckboxModel',{
        //            singleSelect:true
        //        });
        //        this.bbar = Ext.create('Ext.PagingToolbar', {
        //            store: this.store,
        //            displayInfo: true,
        //            displayMsg: 'Displaying users {0} - {1} of {2}',
        //            emptyMsg: "No user to display"
        //        }),
        //app.getController('Master').init();
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

