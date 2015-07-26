Ext.define('MyApp.store.TeacherExp', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.TeacherExp',
    proxy: {
         type: 'ajax',
         url: 'teacher/gettchrexp.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
