Ext.define('MyApp.store.BookList', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.BookDetail',
    proxy: {
         type: 'ajax',
         url: 'library/getlst.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
