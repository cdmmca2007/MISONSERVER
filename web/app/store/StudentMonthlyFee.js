Ext.define('MyApp.store.StudentMonthlyFee', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.StudentMonthlyFee',
    proxy: {
         type: 'ajax',
         url: 'studentmonthlyfee/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
