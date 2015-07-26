Ext.define('MyApp.store.AccountSetting', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.AccountSetting',
    proxy: {
         type: 'ajax',
         url: 'user/useraccseting.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
