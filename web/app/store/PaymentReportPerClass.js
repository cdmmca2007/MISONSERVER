Ext.define('MyApp.store.PaymentReportPerClass', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.PaymentReportPerClass',
    proxy: {
         type: 'ajax',
         url: 'misreport/getpayment.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});


