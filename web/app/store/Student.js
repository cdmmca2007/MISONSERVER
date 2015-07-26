Ext.define('MyApp.store.Student', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.Student',
    pageSize: 25,
    proxy: {
         type: 'ajax',
         url: 'student/get.do',
         reader: {
             type: 'json',
             root: 'rows',
             totalProperty: 'totalCount'
         }
     },
     autoLoad:false
});
