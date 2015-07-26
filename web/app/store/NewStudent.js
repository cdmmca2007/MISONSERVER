Ext.define('MyApp.store.NewStudent', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.NewStudent',
    proxy: {
         type: 'ajax',
         url: 'studentadmission/getpd.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
