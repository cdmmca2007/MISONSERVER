Ext.define('MyApp.store.TransportPlace', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.TransportPlace',
    proxy: {
         type: 'ajax',
         url: 'transportroute/getPlace.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});

