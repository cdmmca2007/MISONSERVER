Ext.define('MyApp.store.TemplateDetails', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.TemplateDetails',
    proxy: {
         type: 'ajax',
         url: 'payment/getTemplate.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});


