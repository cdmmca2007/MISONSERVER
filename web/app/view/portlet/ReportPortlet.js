function showReport(rec){
    
    if(rec.data.id==4 && rec.data.name=='Attendence Report'){ 
    var app1=app.getController('Dashboard')
    var Tab = Ext.create('MyApp.view.misreport.AttendenceReport');
    app1.getDashboard().add(Tab);
    app1.getDashboard().setActiveTab(Tab);  
   }
   else if(rec.data.id==2 && rec.data.name=='Payment Report'){
    var app1=app.getController('Dashboard')
    var Tab = Ext.create('MyApp.view.misreport.PaymentReports');
    app1.getDashboard().add(Tab);
    app1.getDashboard().setActiveTab(Tab);  
   }
   else if(rec.data.id==22 && rec.data.name=='Monthly Class Fee'){
    var app1=app.getController('Dashboard')
    var Tab = Ext.create('MyApp.view.misreport.PaymentMonthlyReport');
    app1.getDashboard().add(Tab);
    app1.getDashboard().setActiveTab(Tab);  
   }
   else if(rec.data.id==25 && rec.data.name=='Monthly Student Attendence Reports'){
    var app1=app.getController('Dashboard')
    var Tab = Ext.create('MyApp.view.misreport.ClassAttendenceForMonthReport');
    app1.getDashboard().add(Tab);
    app1.getDashboard().setActiveTab(Tab);  
   }
   else if(rec.data.id==1 && rec.data.name=='Class Report'){
    Ext.StoreManager.lookup('ClassReport').load({
                                params:{sessionid:SETTING.Users.properties.session_id
                            }
    });    
    var app1=app.getController('Dashboard')
    var Tab = Ext.create('MyApp.view.misreport.ClassReport');
    app1.getDashboard().add(Tab);
    app1.getDashboard().setActiveTab(Tab);  
   } 
   else{
       Ext.Msg.alert("This Report is in development phase");     
   }
    
}


Ext.define('Ext.app.view.portlet.ReportPortlet', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportportlet',
    layout: 'fit',
    title:'MIS Report Folder',
    frame: true,
    closable: true,
    collapsible: true,
    animCollapse: true,
    draggable: {
        moveOnDrag: false    
    },
    cls: 'report-portlet',
    initComponent: function() {
        
        this.items=Ext.create('Ext.view.View', {
            store: 'MisReport',
            tpl: [
                '<tpl for=".">',
                    '<div class="thumb-wrap" id="{name}">',
                    '<div class="f-thumb"><img src="'+PORTAL_ICON+'{image}" title="{description}"></div>',
                    '<span class="x-editable">{name}</span></div>',
                '</tpl>',
                '<div class="x-clear"></div>'
            ],
            multiSelect: false,
            trackOver: true,
            overItemCls: 'x-item-over',
            itemSelector: 'div.thumb-wrap',
            id:'reportportlet',
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
                itemdblclick: function(dv, record ){
                //record_global=record;  
                showReport(record);
                }
            }
        });
        
       this.tbar =[{
       xtype: 'combo',
       emptyText: 'Select Session',
       text   : 'Session',
       id:'sessioncombo1',
       store:Ext.create('MyApp.store.Combo').load({
                                      params:{propertyId:-1}}),//Get Session Details
       
       width : 110,        
       queryMode: 'local',
       Autoload:true,
       valueField :'id',
       displayField :'value',   
       hidden:true,
       editable: false,
       value:SETTING.Users.properties.session_id,
       listeners:{
            select: function(component){
            }
       }
    },{
       xtype: 'combobox',
       emptyText: 'Select Report Type',
       id:'reporttype',
       store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:35}}),//For Session,
       typeAhead: true,
       queryMode: 'local',
       displayField: 'value',
       valueField: 'id',
       name:'reporttype',
        listeners:{
            select: function(component){
                var reporttype=Ext.getCmp('reporttype').getValue();                
                
                if(reporttype!=null)    
                {
                    
                    Ext.getCmp('reportportlet').getStore().load({
                     params:{     
                         'reporttypeid':reporttype
                         }
                     });
                }    

            }
       }
    }
    ];
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
