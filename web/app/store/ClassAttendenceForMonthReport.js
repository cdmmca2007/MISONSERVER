Ext.define('MyApp.store.ClassAttendenceForMonthReport', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.Report',
    proxy: {
         type: 'ajax',
         url: 'misreport/getmonattdnc.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});


