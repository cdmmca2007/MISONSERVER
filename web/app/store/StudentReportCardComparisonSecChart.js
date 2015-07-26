Ext.define('MyApp.store.StudentReportCardComparisonSecChart', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.StudentReportCardComparisonSecChart',
    groupField:'examtypename',
    proxy: {
         type: 'ajax',
         url: 'studentmark/getresltcomprsn1.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});

