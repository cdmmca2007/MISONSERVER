Ext.define('MyApp.store.RoomCombo', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.Combo',
    proxy: {
         type: 'ajax',
         url: 'hostel/getRoomCombo.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
