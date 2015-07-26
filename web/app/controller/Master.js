
Ext.define('MyApp.controller.Master', {
    extend: 'Ext.app.Controller',
    views: ['master.List'],//'user.Edit'],
    stores: ['Property','Master'],
    //models: ['Users'],
    refs :[{
            ref:'editButton',
            selector:'maserlist button[text=Edit]'
    },{
            ref:'deleteButton',
            selector:'maserlist button[text=Delete]'
    }],
    init: function() {
        this.control({
            'maserlist button[text=Add]': {
                click: this.addMaster
            },
            'maserlist button[text=Edit]': {
                click: this.editMaster
            },
            'maserlist button[text=Delete]': {
                click: this.deleteMaster
            },
            'maserlist ': {
                click: this.deleteMaster
            },'#property_grid':{
                selectionchange: this.propertyChange
            }
        });
    },
    propertyId:0,
    editMaster: function(button) {
        var rec = Ext.getCmp('mastergrid').getSelectionModel().getSelection()[0];
        if(rec)
           this.addEditMaster(rec);
    },
    addMaster: function(button) {
        this.addEditMaster(null);
    },
    addEditMaster: function(rec){
        var win = Ext.getCmp('master_win');
        if(!win){
        win = Ext.create('Ext.app.view.component.AppWindow', {
            title:rec?'Edit Master':'Add Master',
            closeAction:'destroy',
            id:'master_win',
            width:300,
            top:{
                image:BASE_URL+'resources/images/import.png',
                formTitle:'Master Config'
            },
            defaults:{
                xtype:'textfield',
                width:250
            },
            url:'ppppp',
            formItems :[
            {
                name : 'value',
                id:'masterValue'+this.id,
                hideLabel: true
            }
            ],
            buttons :[
            {
                text: rec?'Edit':'Add',
                action: 'save',
                handler: this.saveMaster
            },
            {xtype:'btncancel'}
            ]
        });  
        }
        if(rec)
        Ext.getCmp('masterValue'+this.id).setValue(rec.data.masterValue);
        win.show();
    },
    saveMaster : function(btn){
        var form = btn.up('window').down('form').getForm();
        var grid =  Ext.getCmp('property_grid');
        var recs =grid.getSelectionModel().getSelection();
        if(form.isValid()){
            var obj = form.getValues();
            obj.property = recs[0].data
            Ext.Ajax.request({
                url:'master/add.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'  
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    Ext.Msg.alert('Success','Master value added successfully');
                    var rec = eval('('+res.responseText+')');
                    app.getController('Master').getMasterStore().add(rec);
                }
            })
        }
          
    },
    propertyChange :  function( sm,record,eopt ){
        this.propertyId=record[0].data.id;
        this.getMasterStore().load({
                    params:{
                        propertyId:record[0].data.id
                    }
                })
    },
    masterSelectionChange : function(grid,sm){
        var  button = this.getEditButton();
        button.setDisabled(sm.getCount()!=1);
        app.getController('Master').getDeleteButton().setDisabled((sm.getCount()==0));
    },
    deleteMaster : function(){
        Ext.Msg.confirm("Alert","Are you sure want to delete records", function(btn){
            if(btn=='yes'){
                var grid = Ext.getCmp('mastergrid');
                grid.getStore().remove(grid.getSelectionModel().getSelection());
            }
        });
    }

});

