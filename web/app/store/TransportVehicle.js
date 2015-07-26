Ext.define('MyApp.store.TransportVehicle', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.TransportVehicle',
    proxy: {
         type: 'ajax',
         url: 'transportroute/getVehicle.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});


