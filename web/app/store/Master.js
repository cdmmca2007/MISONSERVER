Ext.define('MyApp.store.Master', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.Master',
    proxy: {
         type: 'ajax',
         url: 'master/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     }
     
});


