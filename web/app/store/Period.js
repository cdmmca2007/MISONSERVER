Ext.define('MyApp.store.Period', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.Period',
    proxy: {
         type: 'ajax',
         url: 'period/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
