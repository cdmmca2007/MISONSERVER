Ext.define('MyApp.view.component.DashBoardTab',{
    extend:'Ext.app.view.portlet.PortalPanel',
    alias: 'widget.dashboard',
    title:'Dashboard',
    layout : {
            type : 'column'
    },
    items:[{
            id: 'col-1',
            columnWidth:.33,
            items: [{
                       title:'Calendar',
                       width:150,
                       height:260,
                       layout:'vbox',
                       items:[{
                             xtype: 'datepicker',
                             id: 'app-calendar-picker',
                             anchor:'70%',
                             margin:'5 20 5 20',
                             //cls: 'ext-cal-nav-picker',
                             listeners: {
                                'select': {
                                   fn: function(dp, dt){
                                         //  Ext.getCmp('app-calendar').setStartDate(dt);
                                   },
                                   scope: this
                             }
                           }
                       },{
                           xtype:'box',
                           margin:'0 20 5 20',
                           autoEl:{
                               tag:'a',
                               href:'#',
                               html:'View Calendar'
                           },
                           listeners:{
                               render: function(c){
                                   c.getEl().on('click',function(){
                                       app.getController('Dashboard').onShowCalendar();
                                   })
                                   
                               }
                           }
                           
                       },{
                           xtype:'image',
                           margin:'0 20 5 20',
                           src:'users/getprofile.pic',
                           name:'profilepic'
                       }
                   ]
                  }
            ]
        },{
            id: 'col-2',
            columnWidth:.33,
            items:[ Ext.create('Ext.app.view.portlet.IconPortlet',{
                id:'portlet_'+'school',
                title: 'Quick Links',
                //tools: this.getTools(),
                store:quickLinks,
                listeners: {
                    'close': Ext.bind(this.onPortletClose, this)
                }
            })]
        },{
            id: 'col-3',
            columnWidth:.33,
            items:[
                Ext.create('Ext.app.view.portlet.Portlet',{
                id:'portlet_'+'noticeboard',
                height:300,
                title: 'Notice Board',          
                tpl: '<tpl for="rows"><div style="padding :2px 2px 2px 4px;margin :5px 5px 5px 5px;height:46px;border:.1px solid #17B8E3"><div style="float:left;font-size:10px"><span style="float: left;font-weight:bold"><font style="font-weight:bold" color=#17385B><b>Created By :</b></font>{createdby}</span><span style="float:right;padding-left:2px"><font color=#17385B><b>Date:</b></font>{createdon}</span></div><br><div style="float: left;font-size:11px"><font color=green><b>Title :</b></font><font color="#db6800" style="font-weight:bold;font-size:10px">{title}</font></div>\n\
                     <br><div style="float:right;font-size:9px"><a style:"color:red;padding:2px 2px 5px 2px;margin:2px 2px 5px 2px;font-weight:bold" align=right href="#" onClick="javascript:showMoreNotification();">More</a></div></div></tpl>',
                loader: {
                    autoLoad: true,
                    url: 'notification/get.do',
                    renderer: 'data'                    
                },                
                listeners: {
                    'close': Ext.bind(this.onPortletClose, this)
                }
               /* tbar:[{text:'<font color=#17385B><b>Click to View More</b></font>',
                       style:'font-size:10px',
                       handler: function(){
                           Ext.StoreMgr.lookup('Notification').load();  
                           var app1=app.getController('Dashboard');
                           var Tab = Ext.create('MyApp.view.notice.Notification');
                           app1.getDashboard().add(Tab);
                           app1.getDashboard().setActiveTab(Tab);         
                }
               }] */       
            })
          ]
    }
    ],
    initComponent: function(){
       this.callParent(arguments);
        Ext.getBody().mask("Loading....");
        Ext.suspendLayouts();
        var WIDGETS =[];
          if(getPermission(SETTING.Perm.Widget_ADMIN.widgetNo)){
            WIDGETS.push(Ext.create('Ext.app.view.portlet.IconPortlet',{
                id:'portlet_'+'admin',
                title: 'Administration',
                tools: this.getTools(),
                store:adminLinks
            }));
        }

        if(getPermission(SETTING.Perm.Widget_PAYMENT.widgetNo)){
            WIDGETS.push(Ext.create('Ext.app.view.portlet.PaymentPortlet',{
                id:'portlet_'+'payment',
                title: 'Reports',
                tools: this.getTools(),
                listeners: {
                    'close': Ext.bind(this.onPortletClose, this)
                }
            }));
        }
        if(getPermission(SETTING.Perm.Widget_LEAVE.widgetNo)){
            WIDGETS.push(Ext.create('Ext.app.view.portlet.IconPortlet',{
                id:'portlet_'+'leave',
                title: 'Leave & Attendance',               
                tools: this.getTools(),
                store:leaveLinks,
                listeners: {
                    'close': Ext.bind(this.onPortletClose, this)
                }
            }));
        }
        if(getPermission(SETTING.Perm.Widget_ALERT.widgetNo)){
            WIDGETS.push(Ext.create('Ext.app.view.portlet.Portlet',{
                id:'portlet_'+'widget5',
                title: 'Alerts',
                height:240,
                tools: this.getTools(),
                //tpl: '<tpl for="rows"><div style="padding:2px 2px 2px 2px;margin :3px 3px 3px 3px;height:36px;border:.1px solid #17B8E3"><div style="float:left;font-size:11px"><span style="float: left;font-weight:bold"><font><b>Module :</b></font>{m_name}</span><span style="float:right;padding-left:60px;left><font color=#17385B><b>Sub :</b></font>{alert_name}</span></div><br><div style="float: left;font-size:9"><font color=#17385B><b>Title :</b></font>{title}</div></div></tpl>',
                tpl:'<tpl for="rows"><div style="padding :2px 2px 2px 4px;margin :5px 5px 5px 5px;height:41px;border:.1px solid #17B8E3"><div style="float:left;font-size:10px"><span style="float: left;font-weight:bold"><font style="font-weight:bold" color=#17385B><b>Module : :</b></font>{m_name}</span><span style="float:right;padding-left:2px"><font color=#17385B><b>Sub :</b></font>{alert_name}</span></div><br><div style="float: left;font-size:11px"><font color=green><b>Title :</b></font><font color="#db6800" style="font-weight:bold;font-size:10px">{title}</font></div></div></tpl>',
                loader: {
                    autoLoad: true,
                    url: 'alert/get.do?sessionid=00a24b9a-5bb2-4466-b629-f9d91de9e551&userid=b223524a-cace-42e4-9404-6993efcde14b',
                    renderer: 'data'
                },                
                listeners: {
                    'close': Ext.bind(this.onPortletClose, this)
                },
                tbar:[{text:'<font color=#17385B><b>View More Alert</b></font>',
                       handler: function(){
                           Ext.StoreMgr.lookup('Alert').load();  
                           var app1=app.getController('Dashboard');
                           var Tab = Ext.create('MyApp.view.notice.Notification');
                           app1.getDashboard().add(Tab);
                           app1.getDashboard().setActiveTab(Tab);         
                }
               }] 
            }));
        }
//        if(getPermission(SETTING.Perm.Widget_PERANT.widgetNo)){
//            Ext.create('Ext.app.view.portlet.IconPortlet',{
//                id:'portlet_'+'widget6',
//                title: 'Parent Portal',
//                tools: this.getTools(),
//                store:parentLinks,
//                listeners: {
//                    'close': Ext.bind(this.onPortletClose, this)
//                }
//            });            
//        }
       
        if(getPermission(SETTING.Perm.Widget_FORUM.widgetNo)){
            WIDGETS.push(Ext.create('Ext.app.view.portlet.Portlet',{
                id:'portlet_'+'forum',
                title: 'Discussion Forum',
                tools: this.getTools(),
                html: 'test',
                listeners: {
                    'close': Ext.bind(this.onPortletClose, this)
                }
            }));
        }
        this.renderWidgets(WIDGETS);
        if(SETTING.Users.ROLE==SETTING.ROLES.STUDENT){
            var userProfile = Ext.create('Ext.app.view.user.UserProfile',{
                title:SETTING.Users.NAME,
                userName:SETTING.Users.FULL_NAME
            });
            globalTab.add(userProfile);
            globalTab.setActiveTab(userProfile);
        }
        Ext.resumeLayouts();
        Ext.getBody().unmask();
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

