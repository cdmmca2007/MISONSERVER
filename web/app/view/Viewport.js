Ext.define('MyApp.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:['Ext.ux.DataView.LabelEditor','Ext.ux.DataView.DragSelector','MyApp.store.Search'],
    uses: ['MyApp.view.payment.FeeDetails','MyApp.view.payment.FeeTemplateGrid','MyApp.view.permission.PermissionPanel','MyApp.view.user.UserList','MyApp.view.master.List','MyApp.view.AuditTrail','MyApp.view.student.Student','MyApp.view.payment.FeeStrucGrid','MyApp.view.payment.FeeDetails','MyApp.view.class.Class','MyApp.view.mail.Email','MyApp.view.payment.PaymentHistory','MyApp.view.school.SchoolAdmin','MyApp.view.payment.FeeDetails','MyApp.view.dairy.DigitalDairy','MyApp.view.payment.FeeDetailsParent','MyApp.view.timetable.Period','MyApp.view.timetable.Timetable',
        'MyApp.view.payment.StudentFeeModule','MyApp.view.payment.GenerateMonthlyFee'],
    id: 'app-viewport',
    layout: {
                type: 'border',
                padding: '0 5 5 5' // pad the layout from the window edges
    },
     items: [{
                id: 'app-header',
                xtype: 'container',
                height:55,
                region: 'north',
                layout:'hbox',
                items:[
                {
                    xtype:'image',
                    src: BASE_URL+'resources/images/som_logo.png',
                    height: 50,
                    width:130,
                   padding:'5 5 2'
                },{
                  xtype:'displayfield',
                  value:'Hello <b>' + SETTING.Users.name?SETTING.Users.name:null+  '</b><br> Welcome to <b><a style="color:white" href="'+SETTING.Users.properties.websiteurl+'">'+SETTING.Users.properties.schoolname+'</a></b>',
                  width:200,
                  cls:'welcome',
                  height:40
                },{
                    xtype:'panel',
                    html:'',
                    border:false,
                    bodyStyle:'padding:10px 0px 0px 0px;font-weight: bold;',
                    flex:1,
                    tbar:['->',{
                        width: 250,
                        xtype: 'combo',
                        store: Ext.create('MyApp.store.Search'),
                        vslueField:'id',
                        displayField: 'value',
                        hideLabel: true,
                        hideTrigger:true,
                        minLength :4,
                        listConfig:{
                            emptyText:'No Result Found',
                            loadingText:'Seaching...',
                            width:250,
                            cls:'search-result',
                            getInnerTpl: function() {
                             return '<a class="search-item" href="#" onclick="openSearch({id})">' +
                                '<h3>{text}</h3><span>{type}</span><span>{value}</span>' +
                            '</a>';
                            }
                        }
                    },new Ext.Button({
                        text:'My Profile',
                        scale:'small',
                        iconCls: 'myprofile'
                    }),new Ext.Button({
                        text:'Calendar',
                        scale:'small',
                        iconCls: 'cal'
                    }),{
                            xtype:'splitbutton',
                            scale:'small',
                            iconCls: 'setting',
                            text:'<b>'+SETTING.Users.name+'</b>',
                            menu:[{
                                    text:'Account Setting'
                            },{
                                    text:'Change Password'
                            },{
                               text:'Contact Admin'
                            },{
                               text:'Log Issue'
                            },{
                               text:'Your Feedback'
                            },{
                               text:'My Work List' 
                            },{
                               text:'Change Profile Picture' 
                            },{
                               text:'Print Page' 
                            },{
                               text:'About'
                            },{
                               text:'Sign Out'
                            }]
                    }/*,{
                            xtype:'image',
                            src: 'user/getprofpic.do',
                            height: 50,
                            width:100,
                            padding:'10 10 2'
                   }*/
                 ]
                }
                ]
            },{
                xtype:'tabpanel',
                region: 'center',
                id: 'app-portal',
                items:[{
                    xtype:getRolesGroup()=="School"?'dashboard':'studenthome'
                }]
            }
            ]
});



