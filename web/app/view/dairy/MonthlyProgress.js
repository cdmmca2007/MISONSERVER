var classid1;
var studentid1;


function editSMP(rec){
    
    var win = Ext.getCmp('editsmp_win');
    if(!win){
        win = Ext.create('Ext.app.view.component.AppWindow', {
            title:'Student Monthly Progress Form',
            id:'smp_win',
            width:400,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:'Edit Student Monthly Progress Form'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:300
            },
            url:'ppppp',
            formItems :[
            {
                name : 'pid',
                id:'pid',
                value:rec.data.pid,
                hidden :true
            },    
            {
                name : 'subjectname',
                fieldLabel: 'Subject Name',
                id:'subjectname',
                value:rec.data.subjectname
            },  
            {
                name : 'status',
                fieldLabel: 'Progress Status',
                id:'status',
                xtype:'combobox',
                emptyText: 'Select Status',
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:15}}),
                Autoload:true,
                typeAhead: true,
                queryMode: 'local',
                valueField :'id',
                displayField :'value'
            },                  
            {   
                xtype:'textarea',
                name : 'progressdescription',
                fieldLabel: 'Description',
                id:'progressdescription',
                value:rec?rec.data.progressdescription:""
            },{
                xtype:'textarea',
                name : 'suggestion',
                fieldLabel: 'Suggestion',
                id:'suggestion',
                value:rec?rec.data.suggestion:""
            }
            ],
            buttons :[
            {
                text: 'Save',
                action: 'save',
                scope:this,
                handler:function(btn){
                    
                var form = btn.up('window').down('form').getForm();
                if(form.isValid()){
                    var obj = form.getValues();
                    Ext.Ajax.request({
                        url:'smp/savesmp.do',
                        type:'json',
                        headers:{
                            'Content-Type':'application/json'
                        },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    var rec1 = eval('('+res.responseText+')');
                    if(rec1=='1'){
                    Ext.Msg.alert('Success','Data Saved successfully');
                    rec.data.progressdescription=obj.data.progressdescription;
                    rec.data.suggestion         =obj.data.suggestion;
                    
                    }
                    else
                    Ext.Msg.alert('Warning','Unexpected Error Occured ,Please Contact Admin');    
                 
                }
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


Ext.define('MyApp.view.dairy.MonthlyProgress' ,{
    extend: 'Ext.grid.Panel',
    closable:false,
    title: 'Student Subject Progress',
    id:'monthlyprogressgrid',
    layout:'fit',
    width :700,
    height:380,
    alias: 'widget.monthlyprogressgrid',
    scrollable:true,
    config :{
        classid :null,
        studentid:null
        
    },
    constructor: function(config) {
         //   this.classid=config.classid;
         //   this.studentid=config.studentid;
            classid1=config.classid;
            studentid1=config.studentid;
            this.callParent(arguments);
    },
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },    
    store:'MonthlyProgress',
   
    initComponent: function() {



    this.columns=[
    Ext.create('Ext.grid.RowNumberer'),
    {
        header:'Subject Name',
        dataIndex:'subjectname',
        width :100,
        style :'color:#17385B;font-weight:bold'
    },
    {
        header:'Status',
        dataIndex:'progressstatus',
        width :100,
        style :'color:#17385B;font-weight:bold'
    },
        {
        header:'Discription',
        dataIndex:'progressdescription',
        width :250,
        style :'color:#17385B;font-weight:bold'
    },
    {
        header:'Area Of Improvement',
        dataIndex:'suggestion',
        width :250,
        style :'color:#17385B;font-weight:bold'
    }
    ];
    this.selModel=Ext.create('Ext.selection.CheckboxModel',{
        singleSelect:true,
        listeners:{
                selectionchange:function(){

                   var  button = Ext.getCmp('spedit');
                   button.setDisabled(false);

                }
            }
    });

    this.tbar =[{
        xtype:'combobox',
        id:'mpsession',
        emptyText: 'Select Session',       
        store:Ext.create('MyApp.store.Combo').load({
                                      params:{propertyId:-1}}),//Get Session Details
        Autoload:true,
        queryMode: 'local',
        displayField: 'value',
        valueField: 'id',
        name:'type',
        value:SETTING.Users.properties.session_id

    },{
       xtype: 'combobox',
       emptyText: 'Select Month',
       id:'mpmonth',
       store:Ext.create('Ext.data.Store', {
            fields: ['id', 'value'],
            data : [
            {"id":"1","value":"January"},
            {"id":"2","value":"February"},
            {"id":"3","value":"March"},
            {"id":"4","value":"April"},
            {"id":"5","value":"May"},
            {"id":"6","value":"June"},
            {"id":"7","value":"July"},
            {"id":"8","value":"August"},            
            {"id":"9","value":"September"},
            {"id":"10","value":"October"},
            {"id":"11","value":"November"},
            {"id":"12","value":"December"},
            {"id":"13","value":"All Month"}
        ]
        }),
       typeAhead: true,
        queryMode: 'local',
        displayField: 'value',
        valueField: 'id',
        name:'type',
        listeners:{
            select: function(component){
                
            }
       }
    },{
        iconCls: 'icon-add',
        text: 'View',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    
                    var sessionid=Ext.getCmp('mpsession').getValue();
                    var month    =Ext.getCmp('mpmonth').getValue();
                    
                    if(sessionid!=null && month!=null){
                    Ext.StoreManager.lookup('MonthlyProgress').load({
                            params:{
                                      sessionid:sessionid,
                                      month    :month,
                                      classid  :classid1,
                                      studentid:studentid1,
                                      createdby:SETTING.Users.userId
                                   }
                    });
                    } 
                    else
                     Ext.Msg.alert('Warning','Please select Year & Month to View Student Monthly Progress Report');    
                });
            }
        }
    },{
        iconCls: 'icon-add',
        text: 'Add',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                   
                    var sessionid=Ext.getCmp('mpsession').getValue();
                    var month    =Ext.getCmp('mpmonth').getValue();
                    
                    if(sessionid!=null && month!=null){
                    Ext.StoreManager.lookup('MonthlyProgress').load({
                            params:{
                                      sessionid:sessionid,
                                      month    :month,
                                      classid  :classid1,
                                      studentid:studentid1,
                                      createdby:SETTING.Users.userId
                                   }
                    });                    
                    
                    var obj={sessionid:sessionid,month:month,classid:classid1,studentid:studentid1,createdby:SETTING.Users.userId};
                    
                    Ext.Ajax.request({
                    url:'smp/addsmp.do',
                    type:'json',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    params:Ext.JSON.encode(obj),
                    success: function(res){
                        var rec = eval('('+res.responseText+')');
                        if(rec=='1'){
                        Ext.Msg.alert('Warning','Unexpected Error Occured , Please Contact Admin');
                        }
                        else
                        {   
                            Ext.StoreManager.lookup('MonthlyProgress').load({
                            params:{
                                      sessionid:sessionid,
                                      month    :month,
                                      classid  :classid1,
                                      studentid:studentid1,
                                      createdby:SETTING.Users.userId
                                   }
                    });  
                        }
                     }
                    });
                 } 
                    else
                     Ext.Msg.alert('Warning','Please select Year & Month to View Student Monthly Progress Report');    

                    
                });
            }
        }
    },{
        iconCls: 'icon-edit',
        text: 'Edit',
        disabled: true,
        id:'spedit',
        scope:this,
        listeners: {
            render: function(component){
                component.getEl().on('click', function(){
                  
                   var rec=Ext.getCmp('monthlyprogressgrid').getSelectionModel().getSelection()[0];
                   editSMP(rec);
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
        items:[]
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
