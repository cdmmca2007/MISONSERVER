Ext.define('MyApp.store.QuestionList', {
    extend: 'Ext.data.Store',
     model:'MyApp.model.QuestionList',
     pageSize: 25,
     proxy: {
         type: 'ajax',
         url: 'onlinexam/getques.do',
         reader: {
             type: 'json',
             root: 'rows',
             totalProperty: 'totalCount'
         }
     }
});

