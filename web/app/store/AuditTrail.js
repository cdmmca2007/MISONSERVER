Ext.define('MyApp.store.AuditTrail', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.AuditTrail',
    proxy: {
         type: 'ajax',
         url: 'user/auditTrail.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});


