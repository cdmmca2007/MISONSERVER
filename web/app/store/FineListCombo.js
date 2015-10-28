Ext.define('MyApp.store.FineListCombo', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.Master',
    proxy: {
         type: 'ajax',
         url: 'fine/getFineCombo.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
