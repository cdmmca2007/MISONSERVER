Ext.define('MyApp.store.PayAdmissionFee', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.PayAdmissionFee',
    proxy: {
         type: 'ajax',
         url: 'admission/getadmissionfee.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});



