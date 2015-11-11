Ext.define('MyApp.store.Users', {
    extend: 'Ext.data.Store',
     model:'MyApp.model.Users',
     pageSize: 25,
     proxy: {
         type: 'ajax',
         url: 'user/getUsers.do',
         reader: {
             type: 'json',
             root: 'rows',
             totalProperty: 'totalCount'
         }
     },
     autoLoad:false
});
