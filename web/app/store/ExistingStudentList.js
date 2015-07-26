Ext.define('MyApp.store.ExistingStudentList', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.ExistingStudentList',
    proxy: {
         type: 'ajax',
         url: 'studentadmission/getexisting.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});