Ext.define('MyApp.store.ClassReport', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.ClassReport',
    proxy: {
         type: 'ajax',
         url: 'misreport/getclsrpt.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
