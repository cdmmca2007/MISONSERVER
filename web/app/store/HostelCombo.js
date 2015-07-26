Ext.define('MyApp.store.HostelCombo', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.Combo',
    proxy: {
         type: 'ajax',
         url: 'hostel/gethostelcmbo.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
