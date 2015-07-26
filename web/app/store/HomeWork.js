Ext.define('MyApp.store.HomeWork', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.HomeWork',
    proxy: {
         type: 'ajax',
         url: 'homework/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});

