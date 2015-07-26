Ext.define('Ext.app.view.user.StudentHome', {
    extend:'Ext.app.view.portlet.PortalPanel',
    alias: 'widget.studenthome',
    title:'Home',
    requires:['Ext.app.view.user.StudentProfile'],
    layout : {
        type : 'column'
    },
    constructor: function(config){
        this.callParent([Ext.apply({
            items:[{
                columnWidth:.66,
                items:[{
                        xtype:'studentprofile'      
                }
                ]
            },{
                columnWidth:.34,
                items:[Ext.create('Ext.app.view.portlet.IconPortlet',{
                id:'portlet_'+'school',
                title: 'Quick Links',
                //tools: this.getTools(),
                store:quickLinks,
                listeners: {
                    'close': Ext.bind(this.onPortletClose, this)
                }
            })
                ]     
            }]
        },config)]);
    },
    initComponent : function(){ 
        this.callParent(arguments);
    },
    listeners: {
        render : function(){
            Ext.getBody().unmask();
        }
    }
});