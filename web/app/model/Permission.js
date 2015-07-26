Ext.define('MyApp.model.Permission', {
   extend: 'Ext.data.Model',
    fields: [{
            name:'id', type:'int'
    },{
        name:'groupid'
    },{
        name:'name'
    },{
        name:'timeStamps'
    },{
        name:'image'
    },{
        name:'tooltip'
    },{
        name:'callback'
    }]
});
