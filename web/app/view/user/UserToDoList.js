function addToMyWorkList(rec){

 var win = Ext.getCmp('addmyorklst_win');
    if(!win){
        win = Ext.create('Ext.app.view.component.AppWindow', {
            title:'Add Task Window to Work List',
            id:'addmyorklst_win',
            width:500,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:'Add Task to My Work List'
            },
            defaults:{
                width:450,
                xtype:'textfield'
            },
            url:'ppppp',
            formItems :[
            {
                name : 'pid',
                id:'pid',
                value:rec?rec.data.pid:null,
                hidden :true
            },    
            {
                name : 'title',
                fieldLabel: 'Title/Task Name',
                id:'title',
                value:rec?rec.data.title:null
            },  
            {
                name : 'status',
                fieldLabel: 'Progress Status',
                id:'status',
                xtype:'combobox',
                emptyText: 'Select Status',
                store:Ext.create('Ext.data.Store', {
                    fields: ['id', 'value'],
                    data : [
                    {"id":"1","value":"Completed"},
                    {"id":"2","value":"Pending"},
                    {"id":"3","value":"In Progress"},
                    {"id":"4","value":"Started"},
                    {"id":"5","value":"Yet To Start"}
                ]
                }),
                Autoload:true,
                typeAhead: true,
                queryMode: 'local',
                valueField :'id',
                displayField :'value'
            },{
                xtype:'datefield',
                name : 'duedate',
                fieldLabel: 'Due Date To Complete',
                id:'duedate',
                format: 'm d Y',
                altFormats: 'm-d-Y|m.d.Y'
            },{
                xtype:'checkbox',
                name : 'imp',
                fieldLabel: 'Is It Important',
                id:'imp'
            },                  
            {   
                xtype:'textarea',
                name : 'description',
                fieldLabel: 'Description',
                id:'description',
                value:rec?rec.data.description:null
            },{
                xtype:'textarea',
                name : 'comment',
                fieldLabel: 'Comment',
                id:'comment',
                value:rec?rec.data.comment:null
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
                    obj.duedate=new Date(obj.duedate).getTime();
                    if(obj.imp=='on')
                        obj.imp=1;
                    else
                        obj.imp=0;
                    Ext.Ajax.request({
                        url:'user/addtasktoworklist.do',
                        type:'json',
                        headers:{
                            'Content-Type':'application/json'
                        },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    var rec1 = eval('('+res.responseText+')');
                    if(rec1.pid!=null){
                      Ext.Msg.alert('Success','Task Saved successfully');
                      
                      Ext.getCmp("usertodolistgrid").getStore().reload({
                       params:{                             
                       status:0 
                       }
                     });
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

Ext.define('MyApp.view.user.UserToDoList' ,{
    extend: 'Ext.grid.Panel',
    closable:false,
    title: 'My work List',
    id:'usertodolistgrid',
    layout:'fit',
    width :700,
    height:600,
    alias: 'widget.usertodolistgrid',
    scrollable:true,
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>',
        stripeRows:false ,
        enableRowBody: true,
        showPreview: true,      
        getRowClass: function(record, rowIndex,rp){
            if(record.data.imp==1){              
            return "imp";
            }/*else{
                return "rowcontent1";
            }*/
    }    },    
    store:'MyWorkList',
   
    initComponent: function() {

    this.columns=[
    Ext.create('Ext.grid.RowNumberer'),
    {
        header:'',
        dataIndex:'imp',
        width :'4%',
        style :'color:#17385B;font-weight:bold',
        renderer:function(value){
            if(value=='1')
            return '<img height="15px" width="20px" src="'+BASE_URL+'resources/images/portal-icon/imp.png">';
            else
            return "";    
        }
    },
    {
        header:'Title Name',
        dataIndex:'title',
        width :'15%',
        style :'color:#17385B;font-weight:bold'
    },
    {
        header:'Task Status',
        dataIndex:'status',
        width :'10%',
        style :'color:#17385B;font-weight:bold'
    },
    {
        header:'Discription',
        dataIndex:'description',
        width :'35%',
        style :'color:#17385B;font-weight:bold'
    },{
        header:'Due Date',
        dataIndex:'duedate',
        width :'15%',
        style :'color:#17385B;font-weight:bold'
    },
    {
        header:'Comment',
        dataIndex:'comment',
        width :'15%',
        style :'color:#17385B;font-weight:bold'
    }
    ];
    this.selModel=Ext.create('Ext.selection.CheckboxModel',{
        singleSelect:true,
        listeners:{
                selectionchange:function(){

                   var  button = Ext.getCmp('remove');
                   button.setDisabled(false);
                   var  button = Ext.getCmp('markimp');
                   button.setDisabled(false);
                   var  button = Ext.getCmp('markcmpltd');
                   button.setDisabled(false);
                }
            }
    });

    this.tbar =[{
        iconCls: 'icon-add',
        text: 'Add',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    addToMyWorkList();
                });
            }
        }
    },{
        iconCls: 'icon-delete',
        text: '<b>Remove</b>',
        disabled: true,
        id:'remove',
        scope:this,
        listeners: {
            render: function(component){
                component.getEl().on('click', function(){
                  
                   
                   var rec=Ext.getCmp('usertodolistgrid').getSelectionModel().getSelection()[0];
                   if(rec!=null) {
                   Ext.Msg.confirm("Alert","Are you sure want to delete Task", function(btn){
                   if(btn=='yes'){
                   
                     var obj={pid:rec.data.pid}; 
                     Ext.Ajax.request({
                         url:'user/delusrtsk.do',
                         scope:this,
                         type:'json',
                         headers:{
                            'Content-Type':'application/json'
                         },
                         params:Ext.JSON.encode(obj),
                         success: function(res){
                             var response = eval('('+res.responseText+')');
                             if(response.pid==null)
                                     {
                             Ext.Msg.alert('Success','Task deleted successfully');

                            var grid = Ext.getCmp('usertodolistgrid');
                            grid.getStore().remove(grid.getSelectionModel().getSelection());
                           }
                         }
                     });
                     }
                });
                 }
                });
           }
        }
    },{
        iconCls: 'icon-edit',
        text: '<font color=red><b>Mark imp</b></font>',
        disabled: true,
        id:'markimp',
        scope:this,
        listeners: {
            render: function(component){
                component.getEl().on('click', function(){
                   
                   var rec=Ext.getCmp('usertodolistgrid').getSelectionModel().getSelection()[0];
                   if(rec!=null) {
                   Ext.Msg.confirm("Alert","Are you sure want to Mark Task as Important", function(btn){
                   if(btn=='yes'){
                   
                     var obj={pid:rec.data.pid}; 
                     if(rec.data.imp=='0') {
                     Ext.Ajax.request({
                         url:'user/mrktskimp.do',
                         scope:this,
                         type:'json',
                         headers:{
                            'Content-Type':'application/json'
                         },
                         params:Ext.JSON.encode(obj),
                         success: function(res){
                           var response = eval('('+res.responseText+')');
                           if(response.result=='1')
                           {
                            Ext.Msg.alert('Success','Task Marked important successfully');
                            var status=Ext.getCmp('c_status').getValue();
                            if(status==null)
                              status=0;  
                            var grid = Ext.getCmp('usertodolistgrid');
                            
                            grid.getStore().reload({
                            params:{                             
                              status:status 
                            }
                            });
                           }
                         }
                     });
                     }
                     else{
                        Ext.Msg.alert('Success','Task is already marked Important'); 
                     }
                     
                     }
                });
                 }                   
                   
                });
           }
        }
    },{
        iconCls: 'icon-edit',
        text: '<font color=green><b>Mark Completed</b></font>',
        disabled: true,
        id:'markcmpltd',
        scope:this,
        listeners: {
            render: function(component){
                component.getEl().on('click', function(){

                 var rec=Ext.getCmp('usertodolistgrid').getSelectionModel().getSelection()[0];
                   if(rec!=null) {
                   Ext.Msg.confirm("Alert","Are you sure want to Mark Task as Completed", function(btn){
                   if(btn=='yes'){
                   
                     var obj={pid:rec.data.pid}; 
                     if(rec.data.imp=='0') {
                     Ext.Ajax.request({
                         url:'user/mrktskcmptd.do',
                         scope:this,
                         type:'json',
                         headers:{
                            'Content-Type':'application/json'
                         },
                         params:Ext.JSON.encode(obj),
                         success: function(res){
                           var response = eval('('+res.responseText+')');
                           if(response.result=='1')
                           {
                            Ext.Msg.alert('Success','Task Marked Completed successfully');
                            var status=Ext.getCmp('c_status').getValue();
                            if(status==null)
                              status=0; 
                            var grid = Ext.getCmp('usertodolistgrid');
                            grid.getStore().reload({
                            params:{                             
                              status:status 
                            }
                            });
                           }
                         }
                     });
                     }
                     else{
                        Ext.Msg.alert('Success','Task is already marked Important'); 
                     }
                     
                     }
                });
                 }  
                
                });
           }
        }
    },{
       xtype: 'combobox',
       emptyText: 'Select Status',
       id:'c_status',
       store:Ext.create('Ext.data.Store', {
            fields: ['id', 'value'],
            data : [
                    {"id":"0","value":"All"},
                    {"id":"1","value":"Completed"},
                    {"id":"2","value":"Pending"},
                    {"id":"3","value":"In Progress"},
                    {"id":"4","value":"Started"},
                    {"id":"5","value":"Yet To Start"}
        ]
        }),
       typeAhead: true,
       queryMode: 'local',
       displayField: 'value',
       valueField: 'id',
       name:'type',
       listeners:{
            select: function(component){
                var status=Ext.getCmp('c_status').getValue();                
                if(status!=null)    
                {
                    
                     Ext.getCmp('usertodolistgrid').getStore().load({
                     params:{                             
                       status:status 
                     }
                     });
                }    

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



