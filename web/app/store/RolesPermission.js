Ext.define('MyApp.store.RolesPermission', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.RolesPermission',
    groupField:'groupName',
    proxy: {
         type: 'ajax',
         url: 'permission/getPermissions.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});


