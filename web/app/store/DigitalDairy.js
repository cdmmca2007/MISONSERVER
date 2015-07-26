Ext.define('MyApp.store.DigitalDairy', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.DigitalDairy',
    groupField:'pid',
    proxy: {
         type: 'ajax',
         url: 'digitaldairy/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
