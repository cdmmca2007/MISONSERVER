function askParent(rec,classid,studentid){

    var win = Ext.getCmp('askparent_win');
    if(!win){
        win = Ext.create('Ext.app.view.component.AppWindow', {
            title:'Ask Parent Form',
            id:'askteacher_win',
            width:400,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/portal-icon/parent.jpg',
                formTitle:'Ask Parent'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:300
            },
            url:'ppppp',
            formItems :[
            {
                name : 'createdby',
                fieldLabel: 'createdby',
                id:'createdby',
                value:SETTING.Users.userId,
                hidden:true
            },    
            {
                name : 'sessionid',
                fieldLabel: 'sessionid',
                id:'sessionid',
                value:SETTING.Users.properties.session_id,
                hidden:true
            },    
            {
                name : 'classid',
                fieldLabel: 'Classid',
                id:'classid',
                value:classid,
                hidden:true
            },  
            {
                name : 'studentid',
                fieldLabel: 'studentid',
                id:'studentid',
                value:studentid,
                hidden:true
            },  
                
            {
                name : 'title',
                fieldLabel: 'Title',
                id:'title'
            },            {
             
                xtype:'combobox',
                fieldLabel :'Subject',
                id:'subject',
                name:'subject',
                emptyText: 'Select Subject',
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:2}}),
                Autoload:true,
                typeAhead: true,
                queryMode: 'local',
                valueField :'id',
                displayField :'value'

            }, {
             
                xtype:'combobox',
                fieldLabel :'Request Type',
                id:'type',
                name:'type',
                emptyText: 'Select Reason',
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:14}}),
                Autoload:true,
                typeAhead: true,
                queryMode: 'local',
                valueField :'id',
                displayField :'value'

            },
            {
             
                xtype:'combobox',
                fieldLabel :'Priority',
                id:'priority',
                name:'priority',
                emptyText: 'Select Priority',
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:13}}),
                Autoload:true,
                typeAhead: true,
                queryMode: 'local',
                valueField :'id',
                displayField :'value'

            },{
                xtype:'textarea',
                name : 'description',
                fieldLabel: 'Discription',
                id:'description'
            }
            ],
            buttons :[
            {
                text: 'Add',
                action: 'save',
                scope:this,
                handler:saveParent
                
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
}


function saveParent(btn){
    
      var form = btn.up('window').down('form').getForm();
        if(form.isValid()){
            var obj = form.getValues();
            Ext.Ajax.request({
                url:'digitaldairy/addparent.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    var rec = eval('('+res.responseText+')');
                    if(rec.pid!=null){
                    Ext.Msg.alert('Success','Request added successfully');
                     var classid  =Ext.getCmp('ddclasscombo').getValue();
                     var studentid  =Ext.getCmp('ddstudentcombo').getValue();

                    Ext.getCmp('teacherdairygrid').getStore().load({
                    params:{                            
                             classid   :classid,
                             studentid :studentid,
                             createdby :SETTING.Users.userId,
                             sessionid :SETTING.Users.properties.session_id        
                       }
                    });
                    }
                    else
                    Ext.Msg.alert('Warning','Unexpected Error Occured ,Please Contact Admin');    
                    var rec = eval('('+res.responseText+')');
                }
            });
        }
    
}

function addMonthlyProgress(classid ,studentid){
   
    var win=Ext.getCmp('addStudentprogress');;
    if(!win){
        win=Ext.create('Ext.window.Window', {
            title:'Add Monthly Progress Report for Student',
            id:'addStudentprogress',
            width:700,
            height:400,
            closeAction:'hide',
             layout:'fit',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:'Add Monthly Progress Form'
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
                        xtype:Ext.create('MyApp.view.dairy.MonthlyProgress',{ classid:classid,
                                      studentid:studentid})
                      /*  store:Ext.StoreManager.lookup('MonthlyProgress').load({
                            params:{
                                      classid:classid,
                                      studentid:studentid  
                                   }
                        })*/
                  }]
              } 
            ],
            buttons :[
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();       

}

Ext.define('MyApp.view.dairy.TeacherDigitalDairy' ,{
    extend: 'Ext.grid.Panel',
    closable:true,
    title: 'Student Digital Dairy',    
    id:'teacherdairygrid',
    layout:'fit',
    uses:['MyApp.view.dairy.MonthlyProgress'],
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },
    store:'DigitalDairy',
    features: [Ext.create('Ext.grid.feature.Grouping', {
            groupHeaderTpl: '{columnName}: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
            hideGroupedHeader: true,
            startCollapsed: true,
            id: 'digitaldairyGrouping'
        })
],
    initComponent: function() {
        
     this.ClassCombo=Ext.create('MyApp.store.ClassCombo1');
        this.ClassCombo.load({
            params:{propertyId:2,
                    classid:SETTING.Users.properties.session_id,
                    teacherid :SETTING.Users.userId
            }
            
        }); 
        
        this.columns=[
    Ext.create('Ext.grid.RowNumberer'),
    
    {
        header:'Student Name',
        dataIndex:'studentname',
        style :'color:#17385B;font-weight:bold',
        width:'10%',
        renderer:function(value){
            return '<font color=green><b>'+value+'</b></font>';
        }
    },
    {
        header:'Subject',
        dataIndex:'subjectname',
        style :'color:#17385B;font-weight:bold',
        width:'10%',
        renderer:function(value){
            return '<b>'+value+'</b>';
        }
    },
    {
        header:'Type',
        dataIndex:'type',
        style :'color:#17385B;font-weight:bold',
        width:'9%',
        renderer:function(value){
            return '<b>'+value+'</b>';
        }
    },
    {
        header:'Priority',
        dataIndex:'priorityname',
        style :'color:#17385B;font-weight:bold',
        width:'6%'
    },
    {
        header:'Matter',
        dataIndex:'matter',
        style :'color:#17385B;font-weight:bold',
        width:'10%'
    },        
    {
        header:'Discription',
        dataIndex:'description',
        style :'color:#17385B;font-weight:bold',
        width:'26%'
    },
    {
        header:'Posted Date',
        dataIndex:'createdon',
        style :'color:#17385B;font-weight:bold',
        width:'10%'
    },
    {
        header:'Response/Reply',
        dataIndex:'rpid',
        style :'color:#17385B;font-weight:bold;',
        width:'10%',
        renderer:function(value,meta,record){
              //return '<input type="button" style="margin-top: 2px;border: none;background-image:url('+BASE_URL+'resources/images/portal-icon/discussionform.jpg);" onclick=replyToParent("'+record.data.pid+'")><img  width="20px" height="20px" src="'+BASE_URL+'resources/images/portal-icon/discussionform.jpg"></button>';
              return '<center><img style="float:;" width="20px" height="20px" src="'+BASE_URL+'resources/images/portal-icon/discussionform.jpg" onclick=replyToParent("'+record.data.pid+'")></center>';
        }
    }
    /* {
        header:'Reply',
        dataIndex:'rrpid',
        style :'color:#17385B;font-weight:bold',
        width:'5%',
        renderer:function(value,meta,record){
             return '<img width="20px" height="20px" src="'+BASE_URL+'resources/images/portal-icon/discussionform.jpg">';
     }
    } */   
    ];
    
    this.selModel=Ext.create('Ext.selection.CheckboxModel',{
        singleSelect:true,
        listeners:{
                selectionchange:function(){

                   var  button = Ext.getCmp('tDairyEdit');
                   button.setDisabled(false);
                   var  delbutton = Ext.getCmp('tDairydelete');
                   delbutton.setDisabled(false);
                }
            }
    });
    this.tbar =[{
        xtype: 'searchfield',
        width:110,        
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
       width:110,                
       emptyText: 'Select Class',
       text   : 'Class',
       id:'ddclasscombo',
       store:this.ClassCombo,
       typeAhead: true,
       queryMode: 'local',
       Autoload:true,
       valueField :'id',
       displayField :'value',  
       listeners:{
            select: function(component){
               var classid  =Ext.getCmp('ddclasscombo').getValue();

               
               Ext.getCmp('teacherdairygrid').getStore().load({
                    params:{                            
                             classid   :classid,
                             studentid :null,
                             createdby :SETTING.Users.userId,
                             sessionid :SETTING.Users.properties.session_id        
                     }
               });

                Ext.getCmp('ddstudentcombo').getStore().load({
                     params:{
                             propertyId:7,///Student List
                             classid   :classid+'&'+SETTING.Users.properties.session_id,        
                             teacherid :SETTING.Users.userId
                     }
               });
            }
       }
    },
    {
       xtype: 'combobox',
       width:110,                
       emptyText: 'Select Student',
       text   : 'Student',
       id:'ddstudentcombo',
       store:'ClassCombo',
       typeAhead: true,
       queryMode: 'local',
       Autoload:true,
       valueField :'id',
       displayField :'value',  
       listeners:{
            select: function(component){

                var classid  =Ext.getCmp('ddclasscombo').getValue();
                var studentid  =Ext.getCmp('ddstudentcombo').getValue();
                Ext.getCmp('teacherdairygrid').getStore().load({
                    params:{                            
                             classid   :classid,
                             studentid :studentid,
                             createdby :SETTING.Users.userId,
                             sessionid :SETTING.Users.properties.session_id        
                     }
               });

            }
       }
    },{
        iconCls: 'icon-add',
        text: 'Ask Parent',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    var rec=Ext.getCmp('teacherdairygrid').getSelectionModel().getSelection()[0];
                    
                    var studentid=Ext.getCmp('ddstudentcombo').getValue();
                    var classid =Ext.getCmp('ddclasscombo').getValue();
                    if(rec!=null || studentid!=null)
                       askParent(rec ,classid,studentid);
                });

            }
        }
    },{
        iconCls: 'icon-edit',
        text: 'Edit',
        disabled: true,
        id:'tDairyEdit',
        scope:this,
        handler: function(component){
                    var rec=Ext.getCmp('teacherdairygrid').getSelectionModel().getSelection()[0];
                    askParent(rec);
        }
    }, {
        iconCls: 'icon-delete',
        text: 'Delete',
        disabled: true,
        id: 'tDairydelete',
        handler: function(component){
            Ext.Msg.confirm("Alert","Are you sure want to delete records", function(btn){
            if(btn=='yes'){
                var grid = Ext.getCmp('stucturegrid');
                grid.getStore().remove(grid.getSelectionModel().getSelection());
            }
        });
        }
    },{
        xtype:'button',
        text:'Reply',
        iconCls: 'icon-add',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                   reply(); 
                });

            }
        }
    },{
        xtype:'button',
        text:'Add Monthly Progress',
        iconCls: 'icon-add',
        listeners:{
            render: function(component){

                component.getEl().on('click', function(){
                    
                    var studentid=Ext.getCmp('ddstudentcombo').getValue();
                    var classid =Ext.getCmp('ddclasscombo').getValue();

                    if(classid!=null && studentid!=null) 
                     addMonthlyProgress(classid,studentid);
                    else
                     Ext.Msg.alert('Warning','Please select Student to Add Monthly Progress');    
                });

            }
        }
    },{
        xtype:'button',
        text:'Achievment/Involvement',
        iconCls: 'icon-add',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    addAcheivment();
                });
            }
        }
    }
    ];
    this.bbar =Ext.create('Ext.PagingToolbar', {
        store: this.store,
        displayInfo: true,
        displayMsg: 'Displaying users {0} - {1} of {2}',
        emptyMsg: "No user to display"
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





