Ext.define('MyApp.store.Hostel', {
    extend: 'Ext.data.Store',
     model:'MyApp.model.Hostel',
     pageSize: 25,
     proxy: {
         type: 'ajax',
         url: 'hostel/gethstl.do',
         reader: {
             type: 'json',
             root: 'rows',
             totalProperty: 'totalCount'
         }
     }
});

