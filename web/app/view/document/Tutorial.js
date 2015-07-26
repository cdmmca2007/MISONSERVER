Ext.define('MyApp.view.document.Tutorial',{
    extend:'Ext.app.view.portlet.PortalPanel',
    alias: 'widget.tutorial',
    title:'Tutorial Documents',
    layout : {
            type : 'column'
    },
    store:'Tutorial',
    items:[{
            id: 'col-1',
            columnWidth:.99,
            height:700,
            items:[ Ext.create('Ext.app.view.portlet.FolderPortlet',{
                id:'portlet_'+'tutorial',
                title: 'Tutorial Documents',                
                store:this.store,
                listeners: {
                    'close': Ext.bind(this.onPortletClose, this)
                }
            })]
        }
    ],
    initComponent: function(){
       this.callParent(arguments);
    },
    renderWidgets : function(w){
        var i=0;
        while(w.length>0){
            var obj = w.shift();
            Ext.getCmp('col-'+((i%3)+1)).items.add(obj);
            i++;
        }
    },
     onPortletClose: function(portlet) {
        this.showMsg('"' + portlet.title + '" was removed');
    },

    showMsg: function(msg) {
        var el = Ext.get('app-msg'),
        msgId = Ext.id();

        this.msgId = msgId;
        el.update(msg).show();

        Ext.defer(this.clearMsg, 3000, this, [msgId]);
    },

    clearMsg: function(msgId) {
        if (msgId === this.msgId) {
            Ext.get('app-msg').hide();
        }
    },
      getTools: function(){
        return [{
            xtype: 'tool',
            type: 'gear',
            handler: function(e, target, panelHeader, tool){
                var portlet = panelHeader.ownerCt;
                portlet.setLoading('Loading...');
                Ext.defer(function() {
                    portlet.setLoading(false);
                }, 2000);
            }
        }];
    }
});

