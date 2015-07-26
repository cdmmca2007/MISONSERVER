Ext.define('MyApp.store.Property', {
    extend: 'Ext.data.Store',
    fields: ['id', 'value'],
    proxy: {
         type: 'ajax',
         url: 'master/properties.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
