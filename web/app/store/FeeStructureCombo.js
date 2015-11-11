Ext.define('MyApp.store.FeeStructureCombo', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.Combo',
    proxy: {
         type: 'ajax',
         url: 'payment/getFeeStrucForCombo.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
