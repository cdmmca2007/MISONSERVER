Ext.define('MyApp.store.OnlineExamUserPass', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.OnlineExamUserPass',
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

