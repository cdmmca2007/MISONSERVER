Ext.define('Ext.app.view.component.AppWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.appwindow',
    constructor: function(config){
        var items = [{
             xtype:'container',
             style:'border-bottom:1px solid #000',      
             items:[{
                     xtype:'container',
                     height:60,
                     style:'background:#fff;padding:5px;',
                     layout:'hbox',
                     items:[{
                     xtype:'image',
                     src:'',//this.top.image,
                     height:50,
                     width:50
                 },{
                     xtype:'displayfield',
                     //id:'formTitle',
                     value:config.top.formTitle
                 }]
             }]
        }, {
                xtype: 'form',
                padding:'10 10 10 20',
                defaults:config.defaults,
                url:config.url,
                items: config.formItems,
                border:false,
                style:'background:#ddd',
                bodyStyle:'background:#ddd'
            }]
        this.callParent([Ext.apply({
                modal:true,
    layout: {
        type:'vbox',
        align:'stretch'
    },
            items:items
        },config)]);
    },
    initComponent: function() {
        this.callParent(arguments);
    },
     afterRender: function() {
        this.callParent(); 
        var top = this.top||{};
        this.down('image').setSrc(top.image);
        //Ext.getCmp("formTitle").setValue(top.formTitle);
    }
});
