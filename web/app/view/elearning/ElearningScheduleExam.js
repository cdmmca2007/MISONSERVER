/*Author :Chandra*/
function reScheduleExam(rec){

    var win = Ext.getCmp('eleraningaddexam_win');
    if(!win){
        win=Ext.create('Ext.app.view.component.AppWindow', {
            title:'<b>E-learning Exam Schedule</b>',
            id:rec?'eleraningeditexamsch_win':'eleraningaddexamsch_win',
            width:530,
            height:350,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:'E-learning Exam Schedule'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:460
            },
            formItems :[
            {
                name : 'sessionid',
                hidden:true,
                id:'sessionid',
                value:SETTING.Users.properties.session_id
            },
            {
                name : 'pid',
                hidden:true,
                id:'pid',
                value:rec.data.pid
            },{
                name : 'classname',
                id:'classname',
                fieldLabel :'Class',
                 readOnly:true,
                value:rec.data.class
            },{
                name : 'examname',
                id:'examname',
                fieldLabel :'Exam Name',
                value:rec.data.examname,
                 readOnly:true
            },{
                name : 'subject',
                id:'subject',
                fieldLabel :'Subject',
                value:rec.data.subject,
                 readOnly:true
            },
            {
                xtype:'datefield',
                name : 'examdate',
                fieldLabel: 'Exam Date',
                id:'examdate',
                format: 'm d Y',
                altFormats: 'm-d-Y|m.d.Y',
                allowBlank: false
                },{
                xtype   : 'textarea',
                grow    : true,
                name : 'comment',
                fieldLabel: 'Comment',
                id:'comment'
            }
            ],
            buttons :[
            {
                text: 'Re-Schedule Exam',
                action: 'save',
                scope:this,
                handler:saveReScheduleOnlineExam
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
    
}
function saveReScheduleOnlineExam(btn){     
     var form = btn.up('window').down('form').getForm();
     if(form.isValid()){
            var obj = form.getValues();
            obj.examdate=new Date(obj.examdate).getTime();
            Ext.Ajax.request({
                url:'onlinexam/reschexam.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    var rec = eval('('+res.responseText+')');
                    if(rec.result==1) {                       
                    Ext.Msg.alert('Success','Online Exam Re-Scheduled Successfully');
                    }
                    else
                    Ext.Msg.alert('Failure','Unexpected Error Occured , Please Contact Admin');                 
                }
            });
        }
}


function printUserPass(rec){

    
    var classid=rec.data.batch_id;
    var win;
    if(!win){
        win=Ext.create('Ext.window.Window', {
            title:'Print Userid / Password for Student For:<b><font color=red>'+rec.data.examname+'</font></b>',
            id:'printuserpass',
            width:600,
            height:500,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:'Print Userid / Password for Student For:<b><font color=red>'+rec.data.examname+'</font></b>'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:580
            },
            url:'ppppp',
            items :[
              {
                  xtype: 'fieldcontainer',
                  combineErrors: true,
                  layout: 'hbox',
                  items: [
                       {
                        xtype:Ext.create('MyApp.view.elearning.PrintUserPass'),                        
                        store:Ext.StoreManager.lookup('OnlineExamUserPass').load({
                                      params:{pid:rec.data.pid}
                        })
                  }]
              } 
            ],
            buttons :[
            {
                text: 'Print',
                action: 'print',
                scope:this,
                listeners:{
                render: function(component){
                component.getEl().on('click', function(){                                        
                    ///saveClassSubject(rec)
                 });
                }
              }
                    
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
}


function showResult(rec){

    
    var classid=rec.data.batch_id;
    var win;
    if(!win){
        win=Ext.create('Ext.window.Window', {
            title:'Result board Online Exam For:<b><font color=red>'+rec.data.examname+'</font></b>',
            id:'showresult',
            width:600,
            height:500,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:'Result board Online Exam For:<b><font color=red>'+rec.data.examname+'</font></b>'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:580
            },
            url:'ppppp',
            items :[
              {
                  xtype: 'fieldcontainer',
                  combineErrors: true,
                  layout: 'hbox',
                  items: [
                       {
                        xtype:Ext.create('MyApp.view.elearning.ShowResult'),                        
                        store:Ext.StoreManager.lookup('OnlineExamUserPassResult').load({
                                      params:{pid:rec.data.pid}
                        })
                  }]
              } 
            ],
            buttons :[
            {
                text: 'Print',
                action: 'print',
                scope:this,
                listeners:{
                render: function(component){
                component.getEl().on('click', function(){                                        
                    ///saveClassSubject(rec)
                 });
                }
              }
                    
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
}

/*Control Start here*/
Ext.define('MyApp.view.elearning.ElearningScheduleExam' ,{
    extend: 'Ext.grid.Panel',
    closable:true,
    title: 'E-Exam Schedules & Result ',
    id:'elearninschexam',
    layout:'fit',
    alias: 'widget.elearninschexam',
    uses:['MyApp.view.elearning.PrintUserPass'],
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },    
    store:'OnlineSchExamDetail',
    initComponent: function() {

    this.columns=[
    Ext.create('Ext.grid.RowNumberer'),
    {
        header: 'pid',
        dataIndex:'pid',
        hidden   :true
    },
    {
        header: '<font color=#17385B><b>Title</b></font>',
        dataIndex:'examname',
        width    :'15%',
        renderer:function(value){
                return '<font color=brown><b>'+value+'</b></font>';
        }
    },
    {
        header:'<font color=#17385B><b>Subject</b></font>',
        dataIndex:'subject',
        width    :'10%'
    },
    {
        header:'<font color=#17385B><b>Class</b></font>',
        dataIndex:'subjectid',
        hidden:true
    },
    {
        header:'<font color=#17385B><b>Subject</b></font>',
        dataIndex:'classid',
        hidden:true
    },    
    {
        header:'<font color=#17385B><b>Class</b></font>',
        dataIndex:'class',
        width    :'10%',
        renderer:function(value){
            if(value=='')
                return "<font color=green><b>For All Class</b></font>";
            else
                return '<font color=orange><b>'+value+'</b></font>';
        }
    },{
        header:'<font color=#17385B><b>Total Ques</b></font>',
        dataIndex:'tot_ques_in_exam',
        width    :'10%'
    },{
        header:'<font color=#17385B><b>Mandatory</b></font>',
        dataIndex:'ismandatory',        
        width    :'10%',
        renderer:function(value){
            if(value==1)
                return "Yes";
            else
                return "No";
        }
    },{
        header:'<font color=#17385B><b>ExamScheduled By</b></font>',
        dataIndex:'scheduledby',
        width    :'12%',
        hidden:true
    },{
        header:'<font color=#17385B><b>Scheduled Date</b></font>',
        dataIndex:'scheduleddatetxt',
        width    :'12%',
        renderer:function(value,metadata,record){
            var todaysdate=new Date().getTime();  
            if (todaysdate < record.data.scheduleddate)
            return '<font color=green><b>'+value+'</b></font>';
            else
            return '<font color=red><b>'+value+'</b></font>';
                
        }
        
    },{
        header:'<font color=#17385B><b>Status</b></font>',
        dataIndex:'statustext',
        width    :'16%'        
    },{
        header:'<font color=#17385B><b>Comment</b></font>',
        dataIndex:'comment',
        width    :'16%' 
        
    }

    ];
    this.selModel=Ext.create('Ext.selection.CheckboxModel',{
        singleSelect:true,
        listeners:{
                selectionchange:function(sm){
                 
                   Ext.getCmp('eleranschEdit').setDisabled((sm.getCount()==0));
                   Ext.getCmp('eleranschDelete').setDisabled((sm.getCount()==0));
                   Ext.getCmp('elrnprint').setDisabled((sm.getCount()==0));
                   Ext.getCmp('elrnshowresult').setDisabled((sm.getCount()==0));

                }
            }
    });
    this.tbar =[{
        xtype: 'searchfield',
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
        xtype:'combobox',
        id:'elrngschsession',
        emptyText: 'Select Session',       
        store:Ext.create('MyApp.store.Combo').load({
                                      params:{propertyId:-1}}),//For Session
        Autoload:true,
        queryMode: 'local',
        displayField: 'value',
        valueField: 'id',
        name:'type',
        hidden:true,
        value:SETTING.Users.properties.session_id,        
        listeners:{
            select: function(component){
                var sessionid=Ext.getCmp('elrngschsession').getValue();                                                
                Ext.getCmp('elrngschclasscombo').getStore().load({
                     params:{
                             propertyId:-200,///Class List
                }
               });
            }
       }

    },
    {
       xtype: 'combo',
       emptyText: 'Select Class',
       id:'elrngschclasscombo',
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
                
                var store=Ext.getCmp('elearninschexam').getStore();
                store.load({
                            params:{'classid':Ext.getCmp('elrngschclasscombo').getValue(),
                                    'sessionid':SETTING.Users.properties.session_id
                }});
                
       }
       }
    },{
        iconCls: 'view-sch',
        text: 'Reschedule Exam',
        disabled: true,
        id:'eleranschEdit',
        scope:this,
        handler: function(component){
                    var rec=Ext.getCmp('elearninschexam').getSelectionModel().getSelection()[0];
                    if(rec!=null)
                        reScheduleExam(rec);
                    
        }
    },{
        iconCls: 'icon-cross',
        text: 'Delete',
        disabled: true,        
        id:'eleranschDelete',
        handler: function(component){
            Ext.Msg.confirm("Alert","Are you sure want to delete this scheduled exam", function(btn){
            if(btn==='yes'){
                var grid = Ext.getCmp('elearninschexam').getSelectionModel().getSelection()[0];
                var data={  
                            'pid':grid.data.pid
                         }; 
                if(grid!=null){
                  Ext.Ajax.request({
                    url:'onlinexam/delschexam.do',
                    type:'json',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    params:Ext.JSON.encode(data),
                    success: function(res){
                        var rec = eval('('+res.responseText+')');
                        if(rec.result==1)
                        Ext.Msg.alert('Success','Scheduled Exam Deleted Successfully');
                        else
                        Ext.Msg.alert('Failure','Error Occured , Please Contact Admin');    
                    }
                });  
                 Ext.getCmp('elearninschexam').getStore().remove(Ext.getCmp('elearninschexam').getSelectionModel().getSelection());

                }
            }
        });
        }
    },'<b><font color=red>|</font></b>',{
        iconCls: 'icon-print',
        id:'elrnprint',        
        text: 'Print Userid/Password',
        disabled: true,        
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                   var rec=Ext.getCmp('elearninschexam').getSelectionModel().getSelection()[0];
                   if(rec!=null){
                     printUserPass(rec);
                   }  
                   else
                     Ext.Msg.alert('Warning','Please select Exam to Print user/pass');  
                });
            }
        }
    },{
        iconCls: 'icon-add',
        id:'elrnshowresult',        
        text: 'Show Result',
        disabled: true,        
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                   var rec=Ext.getCmp('elearninschexam').getSelectionModel().getSelection()[0];
                   if(rec!=null){
                     showResult(rec);
                   }  
                   else
                     Ext.Msg.alert('Warning','Please select Exam from grid to view Result.');  
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






