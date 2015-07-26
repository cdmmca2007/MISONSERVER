Ext.define('MyApp.store.DepartmentHeadSetting', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.DepartmentHeadSetting',
    proxy: {
         type: 'ajax',
         url: 'setting/getdeptheadseting.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
