Ext.define('MyApp.store.HostelRoomAllocation', {
    extend: 'Ext.data.Store',
     model:'MyApp.model.HostelRoomAllocation',
     pageSize: 25,
     proxy: {
         type: 'ajax',
         url: 'hostel/getallocatehstlrm.do',
         reader: {
             type: 'json',
             root: 'rows',
             totalProperty: 'totalCount'
         }
     }
});

