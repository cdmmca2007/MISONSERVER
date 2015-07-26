Ext.define('MyApp.store.GenericAjaxStore', {
    extend: 'Ext.data.Store',
    constructor: function(){
        this.callParent(arguments);
        this.proxy.url = this.url;
        console.log(this);
    },
    proxy: {
         type: 'ajax',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});


