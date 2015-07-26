Ext.define('MyApp.store.Search', {
    extend:'Ext.data.Store',
    fields: ['id','text','type','field1','field2','field3'],
     proxy: {
         type: 'ajax',
         url: 'search/getAll.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad: false
 });

