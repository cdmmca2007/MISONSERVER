Ext.define('MyApp.store.DepartmentHeadSetting', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.DepartmentHeadSetting',
    proxy: {
         type: 'ajax',
         url: 'master/getdeptheadseting.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
