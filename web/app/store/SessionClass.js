Ext.define('MyApp.store.SessionClass', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.SessionClass',
    proxy: {
         type: 'ajax',
         url: 'sessions/getclass.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});

