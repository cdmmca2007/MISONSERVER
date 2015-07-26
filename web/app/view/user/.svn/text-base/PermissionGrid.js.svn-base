Ext.define('MyApp.view.user.PermissionGrid' ,{
    extend: 'Ext.container.Container',
    alias: 'widget.permissiongrid',
    closable:true,
    title: 'User Permission',
    layout:{
        type:'hbox',
        align:'stretch'
    },
    constructor : function(){
      
        this.callParent(arguments);
    },
    initComponent: function() {
        var masterSM = Ext.create('Ext.selection.CheckboxModel',{
            singleSelect:true,
            listeners:{
                selectionchange : app.getController('User').permissionSelectionChange
            }
        });
        this.items=[
        {
            xtype:'grid',
            store:userRoles,
            title:'User Role',
            width:150,
            viewConfig:{
                forceFit:true
            },
            columns:[
            Ext.create('Ext.grid.RowNumberer'),
            {
                header: '',  
                dataIndex: 'role', 
                flex:1
            }
            ]
        },{
            xtype:'grid',
            store:'Master',
            viewConfig:{
                forceFit:true
            },
            flex:1,
            selModel :masterSM,
            id:'mastergrid',
            bbar :Ext.create('Ext.PagingToolbar', {
                store: 'Master',
                displayInfo: true,
                displayMsg: 'Displaying users {0} - {1} of {2}',
                emptyMsg: "No user to display"
            }),
            columns:[{
                Name:'Master Items',
                dataIndex:'masterValue',
                flex:1
            },
            {
                menuDisabled: true,
                sortable: false,
                xtype: 'actioncolumn',
                width: 50,
                items: [{
                    icon   : 'resources/images/icons/delete.gif',  // Use a URL in the icon config
                    tooltip: 'Delete',
                    handler: function(grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        grid.getStore().remove(rec);
                    }
                }]
            
            }],
            dockedItems :[{
                xtype: 'toolbar',
                items: [{
                    iconCls: 'icon-add',
                    text: 'Add'
                },{
                    iconCls: 'icon-edit',
                    text: 'Edit',
                    disabled: true
                }, {
                    iconCls: 'icon-delete',
                    text: 'Delete',
                    disabled: true,
                    itemId: 'delete'
                }]
            }]
    
        }
        ];
        
        app.getController('Master').init();
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

