function addNumberOfPeriod(){
    
    var win;
    if(!win){
        win = Ext.create('Ext.app.view.component.AppWindow', {
            title:'Add Number of Period',
            id: 'addperiodno_win',
            width:400,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/portal-icon/period_setting.jpg',
                formTitle:'Specify Number of Periods'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:300
            },
            url:'ppppp',
            formItems :[
            {
                name : 'totnoofperiod',
                fieldLabel: 'Specify Number of Periods',
                id:'totnoofperiod'
            }            
            ],
            buttons :[
            {
                text: 'Add',
                action: 'save',
                scope:this,
                handler:saveData                
            },
            {xtype:'btncancel'}
            ]
        });
    }
    
    win.show();
}

function saveData(btn){
   
      var form = btn.up('window').down('form').getForm();
      var grid =  Ext.getCmp('periodgrid');
      //var recs =grid.getSelectionModel().getSelection();
        if(form.isValid()){
            var obj = form.getValues();

            Ext.Ajax.request({
                url:'period/add.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    Ext.Msg.alert('Success','Period added successfully');
                 //   var rec = eval('('+res.responseText+')');
                 //   app.getController('Class').getClassStore().add(rec);
                }
            });
        }
}

function addPeriodData(btn){
      
     var grid =  Ext.getCmp('periodgrid');
     var store=  Ext.getStore('Period');
     // alert(store.getAt(1));
     var rec=[];
     for (x=0;x<store.getCount();x++){
         rec[x]=store.getAt(x).data;
     }
      Ext.Ajax.request({
                url:'period/addTT.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(rec),
                success: function(res){
                    Ext.Msg.alert('Success','Period Data added successfully');
                 //   var rec = eval('('+res.responseText+')');
                 //   app.getController('Class').getClassStore().add(rec);
                }
            });
        
}


Ext.define('MyApp.view.timetable.Period' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.periodlist',
    closable:true,
    title: 'Period Details',
    id:'periodgrid',
    layout:'fit',

    /*selModel:Ext.create('Ext.selection.CheckboxModel',{
            singleSelect:true,
            listeners:{
                //selectionchange : app.getController('Master').selectionChange
                selectionchange:function(){alert('gggg');}
            }
        }),*/
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },
    columns:[
    Ext.create('Ext.grid.RowNumberer'),
    {
        header: 'Period',
        dataIndex:'periodnumber',
        id:'periodnumber',
        name:'periodnumber',
        style :'color:#17385B;font-weight:bold',
        width:'30%'
    },
    {
        header:'Start Time',
        dataIndex:'starttime',
        id:'starttime',
        name:'starttime',
        width:'30%',
        style :'color:#17385B;font-weight:bold',
        editor: {
                allowBlank: false
                //xtype: 'numberfield'
            }
    },
    {
        header:'End Time',
        dataIndex:'endtime',
        id:'endtime',
        width:'30%',
        name:'endtime',
        style :'color:#17385B;font-weight:bold',        
        editor: {
                allowBlank: false
                //xtype: 'numberfield'
            }
    }

  ],
    store:'Period',
    /*selModel:Ext.create('Ext.selection.CheckboxModel',{
    singleSelect:true,
    style :'color:#17385B;font-weight:bold'
    }),
    selModel: {
            selType: 'cellmodel'
    },*/   
    selModel:Ext.create('Ext.selection.CheckboxModel',{
            singleSelect:true,
            listeners:{
                //selectionchange : app.getController('Master').selectionChange
                selectionchange:function(sm){
                    //Ext.getCmp('periodEdit').setDisabled((sm.getCount()==0));
                    Ext.getCmp('periodDelete').setDisabled((sm.getCount()==0));
                }
            }
    }),
    plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    })],
    tbar :[{
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
        iconCls: 'icon-add',
        text: 'Add Period Number',
       // listeners:{
          handler: function(component){
               // component.getEl().on('click', function(){
                    addNumberOfPeriod(null);
               // })

            }
       // }
    },
    {
        iconCls: 'icon-add',
        text: 'Save Data',
       // listeners:{
          handler: function(component){
               // component.getEl().on('click', function(){
                    addPeriodData(null);
               // })

            }
       // }
    },
    {
        iconCls: 'icon-edit',
        text: 'Edit',
        id:'periodEdit',
        disabled: true,
        scope:this,
        handler: function(component){
                   /* var rec=Ext.getCmp('studentgrid').getSelectionModel().getSelection()[0];
                    addStudent(rec);*/
        }
    },{
        iconCls: 'icon-delete',
        text: 'Delete',
        disabled: true,
        id: 'periodDelete',
        handler: function(component){
            Ext.Msg.confirm("Alert","Are you sure want to delete records", function(btn){
            if(btn==='yes'){
                var grid = Ext.getCmp('periodgrid');
                var data={  
                            'periodid':grid.data.periodid
                         }; 
                if(grid!=null){
                  Ext.Ajax.request({
                    url:'period/del.do',
                    type:'json',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    params:Ext.JSON.encode(data),
                    success: function(res){
                        var rec = eval('('+res.responseText+')');
                        if(rec.result==1)
                        Ext.Msg.alert('Success','Period Deleted Successfully');
                        if(rec.result==2)
                        Ext.Msg.alert('Warning','You can not delete the Period which is already used in Timetables.');
                    
                        else
                        Ext.Msg.alert('Failure','Error Occured , Please Contact Admin');    
                    }
                });  
                 grid.getStore().remove(grid.getSelectionModel().getSelection());
                }
                
            }
        });
        }

    }
    ],
    bbar : Ext.create('Ext.PagingToolbar', {
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
    }]
    }),
    initComponent: function() {
        this.callParent(arguments);
    },

    onRender : function(){
        //this.selModel.on('selectionchange', this.onSelectChange);
        this.callParent(arguments);
    }
});





