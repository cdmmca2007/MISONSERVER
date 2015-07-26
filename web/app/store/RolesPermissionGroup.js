Ext.define('MyApp.store.RolesPermissionGroup', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.RolesPermissionGroup',
    proxy: {
         type: 'ajax',
         url: 'permission/getRolesGroup.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});


