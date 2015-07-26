Ext.define('MyApp.store.ClassCombo1', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.Combo',
    proxy: {
         type: 'ajax',
         url: 'classcombo/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
