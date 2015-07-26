Ext.define('MyApp.model.RolesPermissionGroup', {
   extend: 'Ext.data.Model',
   fields: [
       {name:'roleId', type:'int'},
       {name:'groupid'},
       {name:'title'},
       {name:'no', type:'int'},
       {name:'readonly', type:'int'},
       {name:'editable', type:'int'}]
});
