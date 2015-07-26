Ext.define('MyApp.store.Email', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.Email',
    proxy: {
         type: 'ajax',
         url: '/mail/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
