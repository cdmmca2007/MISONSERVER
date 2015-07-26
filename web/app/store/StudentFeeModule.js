Ext.define('MyApp.store.StudentFeeModule', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.StudentFeeModule',
    proxy: {
         type: 'ajax',
         url: 'generatefee/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});

