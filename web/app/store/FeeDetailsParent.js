Ext.define('MyApp.store.FeeDetailsParent', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.FeeDetailsParent',
    proxy: {
         type: 'ajax',
         url: 'paymentDetail/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});


