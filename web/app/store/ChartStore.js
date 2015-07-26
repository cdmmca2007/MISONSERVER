Ext.define('MyApp.store.ChartStore', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.ChartStore',
    proxy: {
         type: 'ajax',
         url: 'report/getchartData.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
