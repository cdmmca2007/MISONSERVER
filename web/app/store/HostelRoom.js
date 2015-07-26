Ext.define('MyApp.store.HostelRoom', {
    extend: 'Ext.data.Store',
     model:'MyApp.model.HostelRoom',
     pageSize: 25,
     proxy: {
         type: 'ajax',
         url: 'hostel/gethstlrm.do',
         reader: {
             type: 'json',
             root: 'rows',
             totalProperty: 'totalCount'
         }
     }
});

