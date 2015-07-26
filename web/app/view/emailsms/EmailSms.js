function sendEmergencyAlert(){
    
    var win = Ext.getCmp('sendEmergencyAlert_win');
    if(!win){
        win=Ext.create('Ext.app.view.component.AppWindow', {
            title:'<Font color=red><b>Emergency Alert Window',
            id:'sendEmergencyAlert_win',
            width:400,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/mobile_icon.png',
                formTitle:'Send New Emergency Alert'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:300
            },
            formItems :[
            {
                name : 'sessionid',
                hidden:true,
                id:'sessionid',
                value:SETTING.Users.properties.session_id
            },
            {
                name : 'createdby',
                hidden:true,
                id:'createdby',
                value:SETTING.Users.userId
            },
            {
                xtype   : 'textareafield',
                grow    : true,
                name : 'description',
                fieldLabel: 'Description',
                id:'description'
            },{
                xtype:'combobox',
                fieldLabel :'Alert Type',
                id:'alerttype',
                name:'alerttype',
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:44}}),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Alert Type',
                Autoload:true,               
                valueField :'id',
                displayField :'value'
            }
            ],
            buttons :[
            {
                text: 'Send',
                action: 'save',
                scope:this,
                handler:send
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
}
function send(){
    
}

function enableDisableEmailSMS(p_type,p_action,p_studentid,obj){
     var sessionid=Ext.getCmp('sessioncombo').getValue(); 
                     var classid=Ext.getCmp('classcombo').getValue();                     
                     var data={sessionid:sessionid,
                               classid:classid,
                               type:p_type,
                               action:p_action,
                               studentid:p_studentid
                              };  
                      Ext.Ajax.request({
                        url:'emailsms/markaction.do',
                        type:'json',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        params:Ext.JSON.encode(data),
                        success: function(res){
                            var rec = eval('('+res.responseText+')');
                            if(rec.result=='1'){
                            if(!p_action)  
                                p_action='Disable';
                              else
                                p_action='Enable';      
                            if(p_type==1)  
                                p_type='Email';
                              else
                                p_type='SMS';      
                            if(p_studentid!=null)
                            var msg=p_type+' Notification is '+p_action+' for Student :<b>'+obj.name+'</b>';                                
                            else
                            var msg=p_type+" Notification is "+p_action+" for Students of Class :<b>"+Ext.getCmp('classcombo').getRawValue()+"</b>";
                            Ext.Msg.alert('Success',msg);
                            var sessionid=Ext.getCmp('sessioncombo').getValue();
                             var classid  =Ext.getCmp('classcombo').getValue(); 
                             if(sessionid!=null && classid!=null)    
                             {
                                  Ext.getCmp('emailsmsgrid').getStore().load({
                                  params:{                             
                                         classid   :classid ,
                                         sessionid :sessionid,
                                         studentid :null
                                 }
                                });
                             } 
                            }
                            else
                            Ext.Msg.alert('Failure','Error Occured , Please Contact Admin');    
                        }
      });
}

Ext.define('MyApp.view.emailsms.EmailSms' ,{
    extend: 'Ext.grid.Panel',
    closable:true,
    title: 'Email-SMS Setting',
    id:'emailsmsgrid',
    layout:'fit',
    alias: 'widget.class',
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },    
    store:'StudentEmailSMS',
    initComponent: function() {

    this.columns=[
    Ext.create('Ext.grid.RowNumberer'),
    {
        header:'Student Name',
        dataIndex:'name',
        style :'color:#17385B;font-weight:bold',
        width:'15%'
    },
    {
        header:'Father Name',
        dataIndex:'fathername',
        style :'color:#17385B;font-weight:bold',
        width:'15%'
    },{
        header:'Email-Id',
        dataIndex:'parentemailid',
        style :'color:#17385B;font-weight:bold',
        width:'15%'
    },{
        header:'Enable Email Alert',
        dataIndex:'emailalert',
        style :'color:#17385B;font-weight:bold',
        width:'15%',
        xtype:'checkcolumn',
        listeners :{
            checkchange: function(box, rowIndex,checked,eOpts ){
            var obj =Ext.StoreMgr.lookup('StudentEmailSMS').getAt(rowIndex).data;
            if(obj!=null){
                var action='';
                if(!checked)  
                  action='Disable';
                else
                  action='Enable';  
              
            Ext.Msg.confirm("Alert","Are you sure want "+action+" email Alert for Student :<b>"+obj.name+'</b>', function(btn){
            if(btn=='yes'){
                   if(checked)
                       enableDisableEmailSMS(1,1,obj.studentid,obj);
                   else
                       enableDisableEmailSMS(1,0,obj.studentid,obj);
            }
            });
            } 
          }
        }
    },{
        header:'SMS-ContactNo',
        dataIndex:'parentmobile',
        style :'color:#17385B;font-weight:bold',
        width:'15%'
    },{
        header:'Enable SMS Alert',
        dataIndex:'smsalert',
        style :'color:#17385B;font-weight:bold',
        width:'15%',
        xtype:'checkcolumn',
        listeners :{
            checkchange: function(box, rowIndex,checked,eOpts ){
            var obj =Ext.StoreMgr.lookup('StudentEmailSMS').getAt(rowIndex).data;
            if(obj!=null){
                var action='';
                if(!checked)  
                  action='Disable';
                else
                  action='Enable';  
              
            Ext.Msg.confirm("Alert","Are you sure want "+action+" SMS Alert for Student :<b>"+obj.name+'</b>', function(btn){
            if(btn=='yes'){
                if(checked)
                       enableDisableEmailSMS(2,1,obj.studentid,obj); 
                else
                       enableDisableEmailSMS(2,0,obj.studentid,obj); 
            }
            });
            } 
          }
        }
    }
    ];
    this.selModel=Ext.create('Ext.selection.CheckboxModel',{
        singleSelect:true,
        listeners:{
                selectionchange:function(){
                   //var  button = Ext.getCmp('classEdit');
                   //button.setDisabled(false);
                   //var  delbutton = Ext.getCmp('classDelete');
                   //delbutton.setDisabled(false);
                }
            }
    });
    this.tbar =[{
        xtype: 'searchfield',
        width: 120,
        store: Ext.create('Ext.data.Store', {
            autoLoad: false,
            fields:['id','name'],
            proxy: {
                type: 'ajax',
                url: 'users.json',
                reader: {
                    type: 'json',
                    root: 'users'
                }
            }
        })
    },{
       xtype: 'combo',
       emptyText: 'Select Session',
       text   : 'Session',
       id:'sessioncombo',
       width: 120,
       hidden:true,
       store:Ext.create('MyApp.store.Combo').load({
                                      params:{propertyId:-1}}),//For Session
       typeAhead: true,
       queryMode: 'local',
       Autoload:true,
       valueField :'id',
       displayField :'value',  
       value:SETTING.Users.properties.session_id,
       listeners:{
            select: function(component){
                var sessionid=Ext.getCmp('sessioncombo').getValue();
                Ext.getCmp('classcombo').getStore().load({
                     params:{
                             propertyId:2,
                             classid   :sessionid,
                             teacherid :SETTING.Users.userId
                     }
               });
            }
       }
    },{
       xtype: 'combo',
       emptyText: 'Select Class',
       text   : 'Class',
       id:'classcombo',
       width: 120,
       store:Ext.create('MyApp.store.ClassCombo1').load({
                                      params:{propertyId:2,
                                              classid:SETTING.Users.properties.session_id,
                                              teacherid :SETTING.Users.userId
                                    }}),
       typeAhead: true,
       queryMode: 'local',
       Autoload:true,
       valueField :'id',
       displayField :'value',  
       listeners:{
            select: function(component){
                var sessionid=Ext.getCmp('sessioncombo').getValue();
                var classid  =Ext.getCmp('classcombo').getValue(); 
                if(sessionid!=null && classid!=null)    
                {
                     Ext.getCmp('emailsmsgrid').getStore().load({
                     params:{                             
                             classid   :classid ,
                             sessionid :sessionid,
                             studentid :null
                     }
                     });
                }    
           }
       }
    },{
        xtype:'splitbutton',
        text:'Email@Class Level',
        arrowAlign:'right',
        menu: [{text: 'Enable',
                handler: function(){
                    var p_studentid=null;
                       enableDisableEmailSMS(1,1,p_studentid,null);
                   }
               },
               {
                text: 'Disable',
                handler: function(){
                       var p_studentid=null;
                       enableDisableEmailSMS(1,0,p_studentid,null);
                   }   
            }
        ],
    },{
        xtype:'splitbutton',
        text:'SMS@Class Level',
        arrowAlign:'right',
        width:120,
        menu: [{text: 'Enable',
                handler: function(){
                    var p_studentid=null;
                       enableDisableEmailSMS(2,1,p_studentid,null);
                }
               },
               {text: 'Disable',
                handler: function(){
                    var p_studentid=null;
                       enableDisableEmailSMS(2,0,p_studentid,null);
                }
               }
        ]
        
    },{
        xtype:'button',
        text:'<b>Send Emergency Alert</b>',
        iconCls: 'icon-add',
        width:120,
        style:'background:orangered;margin:0px 110px 0px 0px;float:right',
        tooltip:'Use this functionality to broadcast Email & SMS to All Parent in case of Emergency Notification',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                        sendEmergencyAlert();
                });

            }
        }
    }
    ];
    this.bbar = Ext.create('Ext.PagingToolbar', {
        store: this.store,
        displayInfo: true,
        displayMsg: 'Displaying users {0} - {1} of {2}',
        emptyMsg: "No user to display",
        items:[{
        xtype:'button',
        text:'Print',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    //addFeeTemplate();
                    })

            }
        }
    },{
        xtype:'splitbutton',
        text:'Export Data',
        arrowAlign:'right',
        menu: [{text: 'PDF'},{text: 'Excelsheet'}],
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    //addFeeTemplate();
                    })

            }
        }
    },{
        xtype:'button',
        text:'Class Room Detail',
        iconCls: 'icon-add',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    //addFeeTemplate();
                });

            }
        }
    },{
        xtype:'button',
        text:'Class Room Detail',
        iconCls: 'icon-add',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    //addFeeTemplate();
                });

            }
        }
    }]
    });
    this.callParent(arguments);
    },
    onRender : function(){
        //this.selModel.on('selectionchange', this.onSelectChange);
        this.callParent(arguments);
    },
    selectionchange : function(sm, selected,eOpts){
        if(sm.getCount()){
              
    }
    }
});



