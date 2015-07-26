Ext.define('Ext.app.view.portlet.IconPortlet', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.iconportlet',
    layout: 'fit',
    frame: true,
    closable: true,
    collapsible: true,
    animCollapse: true,
    draggable: {
        moveOnDrag: false    
    },
    cls: 'x-portlet',
    initComponent: function() {
        this.items=Ext.create('Ext.view.View', {
            store: this.store,
            tpl: [
                '<tpl for=".">',
                    '<div class="thumb-wrap" id="{name}">',
                    '<div class="thumb"><img src="'+PORTAL_ICON+'{image}" title="{tooltip}"></div>',
                    '<span class="x-editable">{shortName}</span></div>',
                '</tpl>',
                '<div class="x-clear"></div>'
            ],
            multiSelect: false,
            //minHeight: 100,
            trackOver: true,
            overItemCls: 'x-item-over',
            itemSelector: 'div.thumb-wrap',
            emptyText: 'No images to display',
            plugins: [
                Ext.create('Ext.ux.DataView.DragSelector', {}),
                Ext.create('Ext.ux.DataView.LabelEditor', {dataIndex: 'name'})
            ],
            prepareData: function(data) {
                Ext.apply(data, {
                    shortName: Ext.util.Format.ellipsis(data.name, 18)
                });
                return data;
            },
            listeners: {
                itemclick: function(dv, record ){
                     app.getController('Dashboard')[record.data.callback]();
                }
            }
        });
         this.callParent(arguments);
    },
    doClose: function() {
        if (!this.closing) {
            this.closing = true;
            this.el.animate({
                opacity: 0,
                callback: function(){
                    this.fireEvent('close', this);
                    this[this.closeAction]();
                },
                scope: this
            });
        }
    }
});
