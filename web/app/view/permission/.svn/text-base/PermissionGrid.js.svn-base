
Ext.define('MyApp.view.permission.PermissionGrid' ,{
    extend: 'Ext.grid.Panel',
    alias:'widget.permissiongrid',
    layout:'fit',
//    viewConfig:{
//        forceFit:true,
//        emptyText:'<div class="no-results">No Results To display</div>'
//    },
    columns:[
    Ext.create('Ext.grid.RowNumberer'),
    {
        header: 'Functionality Group',
        dataIndex:'name',
        flex:1,
        style :'color:#17385B;font-weight:bold'
    },{
        header: 'Functionality name',
        dataIndex:'name',
        flex:1,
        style :'color:#17385B;font-weight:bold'
    },{
        header:'Edit Permission',
        dataIndex:'type',
        style :'color:#17385B;font-weight:bold'
    }, {
        header:'Read Permission',
        dataIndex:'',
        style :'color:#17385B;font-weight:bold'
    }
    ],
    store:'RolesPermission',
//    selModel:Ext.create('Ext.selection.CheckboxModel',{
//        singleSelect:true,
//        listeners:{
//                selectionchange : function(sm){
//                    
//                } 
//            }
//    }),
//    tbar :['Groups','-',{
//            xtype:'combo',
//            triggerAction:'all',
//            valueField:'id',
//            displayField:'title',
//            store:'RolesPermissionGroup',
//            queryMode:'local'
//    },{
//        iconCls: 'icon-add',
//        text: 'Add',
//        scope:this,
//        handler:function(btn){
//                  
//        }
//    },{
//        iconCls: 'icon-edit',
//        text: 'Edit',
//        disabled: true
//    }, {
//        iconCls: 'icon-delete',
//        text: 'Delete',
//        disabled: true,
//        itemId: 'delete'
//    }
//    ] ,
//    bbar : Ext.create('Ext.PagingToolbar', {
//        store: this.store,
//        displayInfo: true,
//        displayMsg: 'Displaying users {0} - {1} of {2}',
//        emptyMsg: "No user to display"
//    }),
    initComponent: function() {
        //app.getController('Payment').init();
        this.callParent(arguments);
    }
});







