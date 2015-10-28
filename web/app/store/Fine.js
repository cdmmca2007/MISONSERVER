Ext.define('MyApp.store.Fine', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.Fine',
    groupField:'finename',
    proxy: {
         type: 'ajax',
         url: 'finediscount/getFineList.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
