Ext.define('MyApp.store.ExamReportAnalysisSubjectWise', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.ExamReportAnalysisSubjectWise',
    proxy: {
         type: 'ajax',
         url: 'misreport/geterassubjectwise.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});


