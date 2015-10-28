Ext.define('MyApp.store.StudentDiscount', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.StudentDiscount',
    proxy: {
         type: 'ajax',
         url: 'payment/getDiscountForStud.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
