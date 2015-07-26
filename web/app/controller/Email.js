Ext.define('MyApp.controller.Email', {
    extend: 'Ext.app.Controller',
    views: ['mail.Email'],//'user.Edit'],
    store: ['Email'],
    //models: ['Users'],
    refs :[{
            ref:'editButton',
            selector:'emaillist button[text=Edit]'
    },{
            ref:'deleteButton',
            selector:'emaillist button[text=Delete]'
    }],
    init: function() {
        console.log(Ext.ComponentQuery.query('emaillist button[text=Add]'));
        this.control({
            'emaillist button[text=Add]': {
                click: this.addMaster
            },
            'emaillist button[text=Edit]': {
                click: this.editMaster
            },
            'emaillist button[text=Delete]': {
                click: this.deleteMaster
            },
            'emaillist ': {
                click: this.deleteMaster
            },'#emailgrid':{
                selectionchange: this.propertyChange
            }
        });
    },
    propertyId:0,
    editMaster: function(button) {
        var rec = Ext.getCmp('emailgrid').getSelectionModel().getSelection()[0];
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
            closeAction:'hide',
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
        var grid =  Ext.getCmp('emailgrid');
        var recs =grid.getSelectionModel().getSelection();
        if(form.isValid()){
            var obj = form.getValues();
            obj.property = recs[0].data
            Ext.Ajax.request({
                url:'mail/add.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    Ext.Msg.alert('Success','Master value added successfully');
                    var rec = eval('('+res.responseText+')');
                    app.getController('Email').getMasterStore().add(rec);
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
        app.getController('Email').getDeleteButton().setDisabled((sm.getCount()==0));
    },
    deleteMaster : function(){
        Ext.Msg.confirm("Alert","Are you sure want to delete records", function(btn){
            if(btn=='yes'){
                var grid = Ext.getCmp('emailgrid');
                grid.getStore().remove(grid.getSelectionModel().getSelection());
            }
        });
    }

});

