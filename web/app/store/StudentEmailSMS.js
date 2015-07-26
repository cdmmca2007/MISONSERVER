Ext.define('MyApp.store.StudentEmailSMS', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.StudentEmailSMS',
    pageSize: 25,
    proxy: {
         type: 'ajax',
         url: 'emailsms/getsl.do',
         reader: {
             type: 'json',
             root: 'rows',
             totalProperty: 'totalCount'
         }
     },
     autoLoad:false
});
