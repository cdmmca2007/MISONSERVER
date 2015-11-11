Ext.define('MyApp.store.ReportColumnDetails', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.ReportColumnDetails',
    proxy: {
         type: 'ajax',
         url: 'misreport/getColumnForReports.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
