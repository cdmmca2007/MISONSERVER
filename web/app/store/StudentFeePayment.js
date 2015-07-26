Ext.define('MyApp.store.StudentFeePayment', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.StudentFeePayment',
    proxy: {
         type: 'ajax',
         url: 'studentmonthlyfeeparent/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
