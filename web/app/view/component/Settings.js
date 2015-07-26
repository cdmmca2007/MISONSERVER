Ext.define('MyApp.view.component.Settings' ,{
    extend: 'Ext.tab.Panel',
    alias: 'widget.settings',
    requires:['MyApp.view.master.List','MyApp.view.permission.PermissionPanel','MyApp.view.timetable.Period','MyApp.view.mail.Email',
              'MyApp.view.setting.AddmissionSetting',
              'MyApp.view.setting.DepartmentHeadSetting',
              'MyApp.view.setting.EnableEmailSendingSetting',
              'MyApp.view.setting.FinanceSetting',
              'MyApp.view.setting.ImportPreviousYearSetting',
              'MyApp.view.setting.LibrarySetting',
              'MyApp.view.setting.TimetableSetting'
    ],
    closable:true,
    title: 'Settings',
    items:[{
          xtype:'maserlist'  
    },{
        xtype:'permissionpanel'
    },{
        xtype:'periodlist' 
    },{
        xtype:'maillist' 
    },{
        xtype:'addmissionsettingpanel' 
    },{
        xtype:'departmentheadsetting' 
    }/*{
        xtype:'enableemailesendingsetting' 
    },{
        xtype:'financesetting' 
    },{
        xtype:'importprevyrtstg' 
    },{
        xtype:'librarysetting' 
    },{
        xtype:'timetablesetting' 
    }*/],
    show: function(){
        this.callParent(arguments);
    }
});
