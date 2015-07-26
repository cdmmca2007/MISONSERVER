Ext.define('MyApp.view.permission.PermissionPanel' ,{
    extend: 'Ext.container.Container',
    alias: 'widget.permissionpanel',
    closable:true,
    title: 'Permission Management',
    layout:{
        type:'hbox',
        align:'stretch'
    },
    constructor: function(config){
        var me = this;
        var roleSM = Ext.create('Ext.selection.RowModel',{
            mode:'SINGLE',
            listeners:{
                selectionchange : me.roleChange,
                scope:this
            }
        });
        Ext.StoreManager.lookup('UserRoles').load({
            callback: function(store){
                var rec = this.getAt(0);
                me.load(rec);
            }
        });
        this.callParent([Ext.apply({
            items: [{
            xtype:'grid',    
            width:150,
            title:'&nbsp;',
            store:'UserRoles',
            selModel:roleSM,
            columns:[
                {
                    header:'User Role',
                    dataIndex:'name',
                    flex:1
                }
            ]
        },{
            xtype:'grid',
            flex:1,
            store:'RolesPermission',
            columns:[Ext.create('Ext.grid.RowNumberer'), {
                header: 'Functionality Group',
                dataIndex:'groupName',
                flex:1
            },{
                header: 'Functionality name',
                dataIndex:'name',
                flex:1
            },{
                header:'Edit Permission',
                dataIndex:'edit',
                xtype: 'checkcolumn',
                stopSelection: false,
                listeners :{
            checkchange: function(box, rowIndex,checked,eOpts ){
                var data =Ext.StoreMgr.lookup('RolesPermission').getAt(rowIndex).data;
                var val = Math.pow(2,data.id);
                var rec = Ext.StoreManager.lookup('RolesPermissionGroup').findRecord('groupid',data.groupid);
                var read= rec.data.editable;
                if(checked){
                    rec.set('editable',eval(read+val));
                } else{
                    rec.set('editable',eval(read-val))
                }
            }
        }
        
    }, {
        header:'Read Permission',
        dataIndex:'read',
        xtype:'checkcolumn',
        stopSelection: false,
        listeners :{
            checkchange: function(box, rowIndex,checked,eOpts ){
                var data =Ext.StoreMgr.lookup('RolesPermission').getAt(rowIndex).data;
                var val = Math.pow(2,data.id);
                var rec = Ext.StoreManager.lookup('RolesPermissionGroup').findRecord('groupid',data.groupid);
                var read= rec.data.readonly;
                if(checked){
                    rec.set('readonly',read+val);
                } else{
                    rec.set('readonly',read-val)
                }
            }
        }
    }
    ],
     features: [Ext.create('Ext.grid.feature.Grouping', {
            groupHeaderTpl: '{columnName}: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
            hideGroupedHeader: true,
            startCollapsed: true,
            id: 'permissionGrouping'
        })

        ],
        plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    })],
    tbar :['Groups','-',{
            xtype:'combo',
            triggerAction:'all',
            valueField:'groupid',
            displayField:'title',
            store:'RolesPermissionGroup',
            queryMode:'local'
    },{
        iconCls: 'icon-add',
        text: 'Update',
        scope:this,
        handler:function(btn){
            var records = Ext.StoreManager.lookup('RolesPermissionGroup').getModifiedRecords();
            var data = [];
            Ext.each(records, function(rec){
                data.push(rec.data);
            });
            Ext.Ajax.request({
                url:'permission/updatePermission.do',
                type:'json',
                scope:this,
                headers:{
                    'Content-Type':'application/json'  
                },
                params:Ext.JSON.encode(data),
                success: function(res){
                    Ext.Msg.alert('Success','User added successfully');
                    var rec = eval('('+res.responseText+')');
                }
            });
        }
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
     },config)]); 
    },
    initComponent: function() {
        this.callParent(arguments);
    },
    roleChange : function(sm,selected){
            this.load(selected[0]);  
    },
    load: function(rec){
        var count = 2;
        var me = this;
        var permData=[];
        if(rec){
                    Ext.StoreManager.lookup('RolesPermissionGroup').load({
                        params:{
                            roleId:rec.data.id
                        },
                        callback: function(){
                           count--;
                           if(count==0){
                               me.loadData(permData);
                           }
                        }
                    });     
                }
                Ext.Ajax.request({
                    url:'permission/getPermissions.do',
                    method:'GET',
                    params:{
                            roleId:rec.data.id
                        },
                        success: function(response){
                           permData = eval(response.responseText);
                           count--;
                           if(count==0){
                               me.loadData(permData);
                           }
                        }
                })
    }, 
    loadData : function(data){
       var groupStore = Ext.StoreManager.lookup('RolesPermissionGroup');
       var store = Ext.StoreManager.lookup('RolesPermission');
       store.removeAll();
       for(var i=0;i<data.length;i++){
           var groupId = data[i].groupId;
           var groupName = data[i].title;
           var p = data[i].permissions;
           var rec = groupStore.findRecord('groupid',groupId); 
           var read=0, edit=0;
           if(rec){
               read = rec.data.readonly;
               edit = rec.data.editable;
           }
           for(var j=0;j<p.length; j++){
               store.add({
               id:p[j].id,
               groupid:groupId,
               name:p[j].name,
               groupName:groupName,
               read: (read & Math.pow(2, p[j].id))!=0,
               edit: (edit & Math.pow(2, p[j].id))!=0
               
           });
           }
          
       }
    }
});



