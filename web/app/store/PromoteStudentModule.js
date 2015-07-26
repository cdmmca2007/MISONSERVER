Ext.define('MyApp.store.PromoteStudentModule', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.PromoteStudentModule',
    groupField:'studentname',
    proxy: {
         type: 'ajax',
         url: 'psm/get.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});