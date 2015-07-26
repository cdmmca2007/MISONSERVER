Ext.define('MyApp.store.MisReport', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.MisReport',
    proxy: {
         type: 'ajax',
         url: 'misreport/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});

