Ext.define('MyApp.store.ReportColumnCondition', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.ReportColumnCondition',
    proxy: {
         type: 'ajax',
         url: 'misreport/getConditionForReport.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
