Ext.define('MyApp.store.AuditTrailReport', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.AuditTrailReport',
    proxy: {
         type: 'ajax',
         url: 'report/getAudittrail.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
