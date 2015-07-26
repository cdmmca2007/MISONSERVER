Ext.define('MyApp.store.Timetable', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.Timetable',
    proxy: {
         type: 'ajax',
         url: 'timetable/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});

