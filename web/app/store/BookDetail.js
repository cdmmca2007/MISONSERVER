Ext.define('MyApp.store.BookDetail', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.BookDetail',
    proxy: {
         type: 'ajax',
         url: 'library/getdetl.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
