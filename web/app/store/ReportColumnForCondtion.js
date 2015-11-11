Ext.define('MyApp.store.ReportColumnForCondtion', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.Combo',
    proxy: {
         type: 'ajax',
         url: 'misreport/getColumnForCondition.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
