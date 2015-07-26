Ext.define('MyApp.store.MonthlyProgress', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.MonthlyProgress',
    proxy: {
         type: 'ajax',
         url: 'smp/getsmp.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});