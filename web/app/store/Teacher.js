Ext.define('MyApp.store.Teacher', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.Teacher',
    proxy: {
         type: 'ajax',
         url: '/teacher/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});



