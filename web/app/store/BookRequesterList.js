Ext.define('MyApp.store.BookRequesterList', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.BookRequesterList',
    proxy: {
         type: 'ajax',
         url: 'library/getbkreqerlist.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
