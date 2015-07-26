Ext.Loader.setConfig({
    enabled:true,
    disableCaching:false,
    paths: {
        'Ext.app': 'app',
        'Ext.ux': 'extjs/ux',
        'MyApp':'app',
        'Ext.calendar':'app/calendar/src'
    }
});
Ext.require([
    'Ext.layout.container.*',
    'Ext.ux.DataView.DragSelector',
    'Ext.ux.DataView.LabelEditor',
    'Ext.app.view.portlet.IconPortlet',
    'Ext.resizer.Splitter',
    //'Ext.fx.target.Element',
    //'Ext.fx.target.Component',
    'Ext.ux.CheckColumn',
    'Ext.ux.form.SearchField',
    'Ext.ux.form.MultiSelect',
    'MyApp.store.GenericAjaxStore',
    'Ext.app.view.portlet.Portlet',
    'Ext.app.view.portlet.PortalColumn',
    'Ext.app.view.portlet.PortalPanel',
    'Ext.app.view.portlet.FolderPortlet',
    'MyApp.store.Search'
    ]);
    Ext.getBody().mask("Please Wait while Application is Loading....");
    Ext.Ajax.request({
    url:'user/getUser.do',
    success : function(response){
        if(response.responseText){
            SETTING.Users = eval('('+response.responseText+')'); 
            if(new Date().getTime()>new Date('09/09/2015').getTime()){
                 window.top.location.href = "./mis/login.html";
            }
        }else{
            window.top.location.href = "./login.html";
        }                
    }
});
 quickLinks.load({
            params:{
                id:'Widget_QUICKLINKS'
            }
 });
 leaveLinks.load({
            params:{
                id:'Widget_LEAVE'
            }
 });
Ext.define('Ext.cancelButton', {
    extend:'Ext.Button',
    alias: 'widget.btncancel',
    text: 'Cancel',
    handler: function() {
        this.up('window').close();
    }
});
if(getRolesGroup()=="School"){
    Ext.require('MyApp.view.component.DashBoardTab');
    adminLinks.load({
        params:{
            id:'Widget_ADMIN'
        }
    });
}
else
    Ext.require('Ext.app.view.user.StudentHome');
var app;
Ext.application({
    name: 'MyApp',
    autoCreateViewport:true,
    controllers: ['Dashboard'],
    init:function(){
       
    },
    launch: function() {
        //Ext.create('MyApp.view.Viewport');
        app =this;
    }
});
