Ext.define('MyApp.store.PSMStudent', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.PSMStudent',
    proxy: {
         type: 'ajax',
         url: 'psm/getpsmslist.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
