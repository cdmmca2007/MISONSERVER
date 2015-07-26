Ext.define('MyApp.store.TeacherQualification', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.TeacherQualification',
    proxy: {
         type: 'ajax',
         url: 'teacher/getqualif.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
