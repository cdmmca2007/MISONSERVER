Ext.define('MyApp.store.StudentReportCardComparison', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.PromoteStudentModule',
    groupField:'studentname',
    proxy: {
         type: 'ajax',
         url: 'studentmark/getresltcomprsn.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});