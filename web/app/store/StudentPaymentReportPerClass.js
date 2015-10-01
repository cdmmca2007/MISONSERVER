Ext.define('MyApp.store.StudentPaymentReportPerClass', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.StudentPaymentReportPerClass',
    proxy: {
         type: 'ajax',
         url: 'misreport/getsprfc.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});