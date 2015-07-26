/**
 * @class Ext.app.Portlet
 * @extends Ext.panel.Panel
 * A {@link Ext.panel.Panel Panel} class that is managed by {@link Ext.app.PortalPanel}.
 */
Ext.define('Ext.app.view.portlet.PaymentPortlet', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.paymentportlet',
    layout:'fit',
    frame: true,
    closable: true,
    collapsible: true,
    animCollapse: true,
    draggable: {
        moveOnDrag: false    
    },
    cls: 'x-portlet',
    tbar:[{text:'<font color=red><b>View More Reports</b></font>',
           handler: function(){

              var app1=app.getController('Dashboard');
              var Tab = Ext.create('MyApp.view.misreport.MisReportBoard');
              app1.getDashboard().add(Tab);
              app1.getDashboard().setActiveTab(Tab);  
        }
    }],

    items:[{
            xtype: 'tabpanel',
            layout:'fit',     
            items:[
            {
               title: 'Classes',
               items:[ Ext.create('Ext.chart.Chart', {
               animate: true,
               width:320,
               height:200,
               store: Ext.create('MyApp.store.ChartStore').load({
                params:{                            
                         sessionid   :SETTING.Users.properties.session_id
                }
                }),
                shadow: false,
                legend: {
                    position: 'right'
                },
                insetPadding: 20,
                theme: 'Base:gradients',
                series: [{
                    type: 'pie',
                    field: 'tot_stud',
                    showInLegend: true,
                    donut: false,
                    highlight: {
                        segment: {
                            margin: 10
                        }
                    },
                    tips: {
                        trackMouse: true,
                        width: 250,
                        height: 100,
                        renderer: function(storeItem, item) {
                         this.setTitle('<font color=black><b>Class Name:</b></font>' + storeItem.get('name') + '<br> <font color=black>Total Student:</font>'+ storeItem.get('tot_stud') +'</font> <br><font color=black>Class Teacher:</font>'+storeItem.get('classteacher')+'<br><b>Average Attendence %</b><br><br><a style="color:red;float:right" href="#" onClick="javascript:showReports()">Click to See Full Reports</a>');
                        }
                    },
                    label: {
                        field: 'name',
                        contrast: true,
                        font: '12px Arial'
                    }
                }]
            })
            ]
            },
            {
               title: 'Payment',
               items:[
                   Ext.create('Ext.chart.Chart', {
                        style: 'background:#fff',
                        animate: true,
                        shadow: true,
                        width:320,
                        height:200,
                        id    :'paymentchart',
                        store: Ext.create('MyApp.store.PaymentReportPerClass').load({
                        params:{                            
                                 classid   :'d6f54930-7210-4bf3-ab90-3976752d4d9a',
                                 sessionid :SETTING.Users.properties.session_id        
                        }
                        }),
                        axes: [{
                            type: 'Numeric',
                            position: 'left',
                            fields: ['percent'],
                            label: {
                                renderer: Ext.util.Format.numberRenderer('0,0')
                            },
                            title: 'Payment Percentage',
                            grid: true,
                            minimum: 0,
                            maximum:100
                        }, {
                            type: 'Category',
                            position: 'bottom',
                            fields: ['month'],
                            title: 'Month of the Year'
                        }],
                        series: [{
                            type: 'column',
                            axis: 'left',
                            highlight: true,
                            seriesColor:'blue',
                            tips: {
                              trackMouse: true,
                              width: 150,
                              height: 100,
                              renderer: function(storeItem, item) {
                                this.setTitle(storeItem.get('month') + ': ' + storeItem.get('percent') + ' % <br> <font color=green>Total Fee :'+ storeItem.get('tot_amount') +'</font> <br><font color=red>Total Received :'+storeItem.get('tot_received')+'</font>');
                              }
                            },
                            label: {
                              display: 'insideEnd',
                              'text-anchor': 'middle',
                              field: 'month',
                              renderer: Ext.util.Format.numberRenderer('0'),
                              orientation: 'vertical',
                              color: 'red'
                            },
                            xField: 'month',
                            yField: 'percent'
                        }]
                    })
               ]
            },
            {
               title: 'Attendence',
               items:[Ext.create('Ext.chart.Chart', {
                        style: 'background:#fff',
                        animate: true,
                        shadow: true,
                        id    :'attchart',
                        width:320,
                        height:200,
                        store: Ext.create('MyApp.store.ClassAttendenceReport').load({
                        params:{                            
                                 classid   :'d6f54930-7210-4bf3-ab90-3976752d4d9a',
                                 sessionid :SETTING.Users.properties.session_id        
                        }
                        }),
                        axes: [{
                            type: 'Numeric',
                            position: 'left',
                            fields: ['percentage'],
                            label: {
                                renderer: Ext.util.Format.numberRenderer('0,0')
                            },
                            title: 'Total Present Percentage',
                            grid: true,
                            minimum: 0
                        }, {
                            type: 'Category',
                            position: 'bottom',
                            fields: ['month'],
                            title: 'Month of the Year'
                        }],
                        series: [{
                            type: 'column',
                            axis: 'left',
                            highlight: true,
                            tips: {
                              trackMouse: true,
                              width: 150,
                              height: 100,
                              renderer: function(storeItem, item) {
                                this.setTitle(storeItem.get('month') + ': ' + storeItem.get('percentage') + ' % <br> <font color=green>Total Present :'+ storeItem.get('present') +'</font> <br><font color=red>Total Absent :'+storeItem.get('absent')+'</font>');
                              }
                            },
                            label: {
                              display: 'insideEnd',
                              'text-anchor': 'middle',
                              field: 'month',
                              renderer: Ext.util.Format.numberRenderer('0'),
                              orientation: 'vertical',
                              color: 'red'
                            },
                            xField: 'month',
                            yField: 'percentage'
                        }]
                    })]
            },{
              title:'AuditTrail',
              items:[ Ext.create('Ext.chart.Chart', {
               animate: true,
               width:320,
               height:200,
               store: Ext.create('MyApp.store.AuditTrailReport').load(),
               shadow: false,
               legend: {
                    position: 'right'
               },
               insetPadding: 20,
               theme: 'Base:gradients',
               series: [{
                    type: 'pie',
                    field: 'tot_user',
                    showInLegend: true,
                    donut: false,
                    highlight: {
                        segment: {
                            margin: 10
                        }
                    },
                    tips: {
                        trackMouse: true,
                        width: 250,
                        height: 100,
                        renderer: function(storeItem, item) {
                         this.setTitle('<font color=black><b>On Date:</b></font>' + storeItem.get('v_date') + '<br> <font color=black>Total Logged Users:</font>'+ storeItem.get('tot_user') +'</font>');
                        }
                    },
                    label: {
                        field: 'v_date',
                        contrast: true,
                        font: '12px Arial'
                    }
                }]
            })
            ]
            }
            ]
            
    }],
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
