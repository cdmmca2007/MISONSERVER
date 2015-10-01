Ext.define('MyApp.store.DailyAttendenceReportForAllClass', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.Report',
    proxy: {
         type: 'ajax',
         url: 'misreport/getdailyattdnc.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});


