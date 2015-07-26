Ext.define('MyApp.view.master.Classes' ,{
    extend: 'Ext.grid.Panel',
    closable:true,
    title: 'Fee Structures',
    layout:'fit',
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },
    columns:[
    Ext.create('Ext.grid.RowNumberer'),
   
        {header: 'Name',dataIndex:'feeName'},
        {header:'Type',dataIndex:'feeType'},
        {header:'Amount',dataIndex:'amount'}
    ],
    store:Ext.create('Ext.data.Store',{
        fields: [ {name:'studentId'},
        {name:'fee_structure_id'},
        {name:'feeName'},
        {name:'feeType'},
        {name:'amount'},
        ],
        data: [
        
        ]
    }),
    selModel:Ext.create('Ext.selection.CheckboxModel',{
        singleSelect:true
    }),
    tbar :[{
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
    }],
     bbar : Ext.create('Ext.PagingToolbar', {
            store: this.store,
            displayInfo: true,
            displayMsg: 'Displaying users {0} - {1} of {2}',
            emptyMsg: "No user to display"
        }),
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



