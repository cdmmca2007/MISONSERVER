Ext.define('MyApp.store.ListOfAbsentStudent', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.Report',
    proxy: {
         type: 'ajax',
         url: 'misreport/getlistofabsentstudent.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});


