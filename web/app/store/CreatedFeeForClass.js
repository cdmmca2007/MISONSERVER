Ext.define('MyApp.store.CreatedFeeForClass', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.CreatedFeeForClass',
    proxy: {
         type: 'ajax',
         url: 'generatefee/getFee.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
