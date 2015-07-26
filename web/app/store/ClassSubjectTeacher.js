Ext.define('MyApp.store.ClassSubjectTeacher', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.ClassSubjectTeacher',
    proxy: {
         type: 'ajax',
         url: 'classsubjectteacher/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
