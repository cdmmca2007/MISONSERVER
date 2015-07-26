Ext.define('MyApp.store.Notification', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.Notification',
    proxy: {
         type: 'ajax',
         url: 'notification/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
