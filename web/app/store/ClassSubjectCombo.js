Ext.define('MyApp.store.ClassSubjectCombo', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.Combo',
    proxy: {
         type: 'ajax',
         url: 'classsubjectcombo/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
