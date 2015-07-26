Ext.define('MyApp.store.Session', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.Session',
    proxy: {
         type: 'ajax',
         url: 'sessions/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});