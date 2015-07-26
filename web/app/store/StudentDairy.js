Ext.define('MyApp.store.StudentDairy', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.StudentDairy',
    proxy: {
         type: 'ajax',
         url: 'digitaldairy/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});


