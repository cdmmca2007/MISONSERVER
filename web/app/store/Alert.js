Ext.define('MyApp.store.Alert', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.Alert',
    proxy: {
         type: 'ajax',
         url: 'alert/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
