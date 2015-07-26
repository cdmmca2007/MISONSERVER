Ext.define('MyApp.store.MonthlyPaymentReport', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.Report',
    proxy: {
         type: 'ajax',
         url: 'misreport/getmonpay.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
