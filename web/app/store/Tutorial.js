Ext.define('MyApp.store.Tutorial', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.Tutorial',
    proxy: {
         type: 'ajax',
         url: 'tutorial/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
