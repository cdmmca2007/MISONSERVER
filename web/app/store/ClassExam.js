Ext.define('MyApp.store.ClassExam', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.ClassExam',
    proxy: {
         type: 'ajax',
         url: 'classexam/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});



