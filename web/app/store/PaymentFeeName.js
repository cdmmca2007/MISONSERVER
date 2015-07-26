Ext.define('MyApp.store.PaymentFeeName', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.PaymentFeeName',
    proxy: {
         type: 'ajax',
         url: 'paymentfeename/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});

