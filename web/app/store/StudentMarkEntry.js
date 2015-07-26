Ext.define('MyApp.store.StudentMarkEntry', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.StudentMarkEntry',
    proxy: {
         type: 'ajax',
         url: 'studentmark/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});

