Ext.define('MyApp.store.FeeStructure', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.FeeStructure',
    proxy: {
         type: 'ajax',
         url: 'payment/getAllFees.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});


