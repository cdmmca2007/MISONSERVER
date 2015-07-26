Ext.define('MyApp.model.RolesPermission', {
   extend: 'Ext.data.Model',
   
    fields: [{name:'id', type:'int'},
        {name:'groupid'},
        {name:'name'},
        {name:'groupName'},
        {name:'read', type:'bool'},
        {name:'edit',type:'bool'}]
});
