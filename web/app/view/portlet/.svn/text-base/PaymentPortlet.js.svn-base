/**
 * @class Ext.app.Portlet
 * @extends Ext.panel.Panel
 * A {@link Ext.panel.Panel Panel} class that is managed by {@link Ext.app.PortalPanel}.
 */
Ext.define('Ext.app.view.portlet.PaymentPortlet', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.paymentportlet',
    layout:'fit',
    //width:300,
    height:300,
    tbar:[{text:'View All Payment Status',
           handler: function(){

              var app1=app.getController('Dashboard');
              var Tab = Ext.create('MyApp.view.payment.PaymentStatus');
              app1.getDashboard().add(Tab);
              app1.getDashboard().setActiveTab(Tab);  
        }
    }],
    items:[Ext.create('Ext.chart.Chart', {
            animate: false,
            store: chartStore,
            shadow: false,
            height:100,
            width:150,
            legend: {
                position: 'right'
            },
            insetPadding: 20,
            theme: 'Base:gradients',
            series: [{
                type: 'pie',
                field: 'data1',
                showInLegend: true,
                donut: false,
                highlight: {
                    segment: {
                        margin: 10
                    }
                },
                label: {
                    field: 'name',
                    contrast: true,
                    font: '12px Arial'
                }
            }]
        })
        ],
    cls: 'x-portlet',
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
