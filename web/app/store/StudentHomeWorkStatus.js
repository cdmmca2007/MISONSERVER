Ext.define('MyApp.store.StudentHomeWorkStatus', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.StudentHomeWorkStatus',
    proxy: {
         type: 'ajax',
         url: 'workstatus/smwsget.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
