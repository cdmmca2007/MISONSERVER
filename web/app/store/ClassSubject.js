Ext.define('MyApp.store.ClassSubject', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.ClassSubject',
    proxy: {
         type: 'ajax',
         url: 'classsubject/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});


