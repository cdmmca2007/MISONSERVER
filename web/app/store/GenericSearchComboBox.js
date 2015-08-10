Ext.define('MyApp.store.GenericSearchComboBox', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.GenericSearchComboBox',
    proxy: {
         type: 'ajax',
         url: 'search/getsearchtype.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});


