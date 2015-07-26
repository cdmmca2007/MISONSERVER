Ext.define('MyApp.store.AttendenceRequestToAdmin', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.AttendenceRequestToAdmin',
    proxy: {
         type: 'ajax',
         url: 'arta/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});

