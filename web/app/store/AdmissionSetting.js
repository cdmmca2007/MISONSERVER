Ext.define('MyApp.store.AdmissionSetting', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.AdmissionSetting',
    proxy: {
         type: 'ajax',
         url: 'setting/getadmseting.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});

