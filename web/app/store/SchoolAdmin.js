Ext.define('MyApp.store.SchoolAdmin', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.SchoolAdmin',
    proxy: {
         type: 'ajax',
         url: 'schooladmin/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});


