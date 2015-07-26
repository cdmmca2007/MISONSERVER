Ext.define('MyApp.store.OfflineStudentList', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.OfflineStudentList',
    proxy: {
         type: 'ajax',
         url: 'studentadmission/getoffline.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});