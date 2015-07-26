Ext.define('MyApp.store.BookTransaction', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.BookTransaction',
    proxy: {
         type: 'ajax',
         url: 'library/getbktrsn.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
