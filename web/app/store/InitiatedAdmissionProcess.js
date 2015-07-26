Ext.define('MyApp.store.InitiatedAdmissionProcess', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.InitiatedAdmissionProcess',
    proxy: {
         type: 'ajax',
         url: 'studentadmission/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});