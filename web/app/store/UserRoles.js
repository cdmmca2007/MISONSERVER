Ext.define('MyApp.store.UserRoles', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.UserRoles',
    proxy: {
         type: 'ajax',
         url: 'user/getRoles.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});


