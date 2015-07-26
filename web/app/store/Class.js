Ext.define('MyApp.store.Class', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.Class',
    proxy: {
         type: 'ajax',
         url: 'classes/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
