Ext.define('MyApp.store.CustomReportDetailsStore', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.CustomReportDetailsModel',
    proxy: {
         type: 'ajax',
         url: 'misreport/getcustrep.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
