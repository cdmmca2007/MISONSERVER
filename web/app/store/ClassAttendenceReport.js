Ext.define('MyApp.store.ClassAttendenceReport', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.ClassAttendenceReport',
    proxy: {
         type: 'ajax',
         url: 'misreport/getattdnc.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});


