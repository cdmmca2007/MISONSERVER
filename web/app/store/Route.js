Ext.define('MyApp.store.Route', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.Route',
    proxy: {
         type: 'ajax',
         url: 'transportroute/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});

