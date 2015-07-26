Ext.define('MyApp.store.MyWorkList', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.MyWorkList',
    proxy: {
         type: 'ajax',
         url: 'user/getmywrklst.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});

