Ext.define('MyApp.store.VehicleCombo', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.Combo',
    proxy: {
         type: 'ajax',
         url: 'vehiclecombo/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});