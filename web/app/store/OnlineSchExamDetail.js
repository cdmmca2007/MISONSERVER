Ext.define('MyApp.store.OnlineSchExamDetail', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.OnlineSchExamDetail',
    proxy: {
         type: 'ajax',
         url: 'onlineschxam/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
