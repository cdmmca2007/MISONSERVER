Ext.define('MyApp.store.OnlineExamDetail', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.OnlineExamDetail',
    proxy: {
         type: 'ajax',
         url: 'onlinexam/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
