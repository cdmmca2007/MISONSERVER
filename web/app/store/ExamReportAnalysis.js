Ext.define('MyApp.store.ExamReportAnalysis', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.ExamReportAnalysis',
    proxy: {
         type: 'ajax',
         url: 'misreport/geteras.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});


