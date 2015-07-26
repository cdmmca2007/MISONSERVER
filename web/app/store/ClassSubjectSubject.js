Ext.define('MyApp.store.ClassSubjectTeacher', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.ClassSubjectTeacher',
    proxy: {
         type: 'ajax',
         url: 'classes/getstl.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
