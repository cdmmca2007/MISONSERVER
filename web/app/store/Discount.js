Ext.define('MyApp.store.Discount', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.Discount',
    groupField:'discountcategorytext',
    proxy: {
         type: 'ajax',
         url: 'finediscount/getDiscountList.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
