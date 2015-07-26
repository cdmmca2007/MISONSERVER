Ext.define('MyApp.store.Links', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.Permission',
    proxy: {
         type: 'ajax',
         url: 'dashboard/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});

quickLinks = Ext.create('MyApp.store.Links');
adminLinks = Ext.create('MyApp.store.Links');
parentLinks = Ext.create('MyApp.store.Links');
leaveLinks = Ext.create('MyApp.store.Links');
