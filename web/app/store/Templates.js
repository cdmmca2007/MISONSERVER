Ext.define('MyApp.store.Templates', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.Templates',
    groupField:'name',
     proxy: {
         type: 'ajax',
         url: 'payment/getTemplates.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});



   


