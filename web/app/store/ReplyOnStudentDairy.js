Ext.define('MyApp.store.ReplyOnStudentDairy', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.ReplyOnStudentDairy',
    proxy: {
         type: 'ajax',
         url: 'digitaldairy/getchatofprnttech.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});


