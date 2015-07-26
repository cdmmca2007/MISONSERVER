Ext.define('MyApp.store.OnlineExamUserPassResult', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.OnlineExamUserPassResult',
    groupField:'pid',
    proxy: {
         type: 'ajax',
         url: 'onlinexam/printuserpass.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});

