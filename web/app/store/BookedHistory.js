Ext.define('MyApp.store.BookedHistory', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.BookedHistory',
    proxy: {
         type: 'ajax',
         url: 'library/getbkhstrylst.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
