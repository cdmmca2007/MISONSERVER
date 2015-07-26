Ext.define('MyApp.view.payment.FeeStrucGrid' ,{
    extend: 'Ext.grid.Panel',
    alias:'widget.feestructure',
    id:'feestructure',
    closable:true,
    title: 'Fee Structure',
    layout:'fit',
    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            dragGroup: 'secondGridDDGroup',
            dropGroup: 'firstGridDDGroup'
        },
        listeners: {
            drop: function(node, data, dropRec, dropPosition) {
                var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
                Ext.example.msg("Drag from left to right", 'Dropped ' + data.records[0].get('name') + dropOn);
            }
        }
    },
    store:'FeeStructure',
    
    initComponent: function() {
    this.columns=[
    Ext.create('Ext.grid.RowNumberer'),{
        header: 'Fee Name',
        id:'name',
        dataIndex:'name',
        style :'color:#17385B;font-weight:bold',
        width :'20%'
    },{
         header: 'Header',
         dataIndex:'header',
         id:'header',
         style :'color:#17385B;font-weight:bold',
         width :'15%'
    },{
        header:'Fee Type',
        dataIndex:'type',
        id:'type',
        style :'color:#17385B;font-weight:bold',
        width :'15%'
        
    }, {
        header:'Amount',
        dataIndex:'amount',
        id:'amount',
        style :'color:#17385B;font-weight:bold',
        width :'15%'
    }, {
        header:'Frequency',
        dataIndex:'frequency',
        id:'frequency',
        style :'color:#17385B;font-weight:bold',
        width :'15%'
    }, {
        header:'Comment',
        dataIndex:'comment',
        id:'comment',
        style :'color:#17385B;font-weight:bold',
        width :'20%'
    }];
   this.selModel=Ext.create('Ext.selection.CheckboxModel',{
        singleSelect:true
    });
    this.bbar = Ext.create('Ext.PagingToolbar', {
        store:this.store,
        displayInfo: true,
        displayMsg: 'Displaying users {0} - {1} of {2}',
        emptyMsg: "No user to display"
    });
        this.tbar =[{
        iconCls: 'icon-add',
        text: 'Add',
        scope:this,
        handler: function(btn){
            this.addFeeStructure();
        }
    },this.iconEdit = Ext.create('Ext.Button',{
        iconCls: 'icon-edit',
        text: 'Edit',
        scope:this,
        disabled: true,
        handler: function(btn){
             this.addFeeStructure(this.getSelectionModel().getSelection()[0]);
        }
    }), {
        iconCls: 'icon-delete',
        text: 'Delete',
        disabled: true,
        itemId: 'delete'
    },{
        iconCls: 'icon-add',
        id:'fine_rule_btn',
        text: 'Fine Rule',
        scope:this,
        handler: function(btn){
           // this.addFeeStructure();
        }
    },{        iconCls: 'icon-add',
        text: 'Discount Rule',
        scope:this,
        id:'discnt_rule_btn',
        handler: function(btn){
            //this.addFeeStructure();
        }
    },'->',this.addToTemplate = Ext.create('Ext.Button',{
        iconCls: 'icon-add',
        text: 'Add To Template',
       // disabled: true,
        itemId: 'delete',
        scope:this,
        handler:this.addToTemplate
    })
    ],
        this.callParent(arguments);
        this.store.load();
    },
    onRender : function(){
        this.callParent(arguments);
    },
    selectionchange : function(sm, selected,eOpts){
        if(sm.getCount()){            
        }
    },
    addFeeStructure : function(rec){
        var grid = this;
        var win = Ext.getCmp('feestructure_win'+this.id);
        if(!win){
            win = Ext.create('Ext.app.view.component.AppWindow', {
                title:'Add New Fee Structure',
                id:'feestructure_win'+this.id,
                width:500,
                closeAction:'destroy',
                top:{
                    image:BASE_URL+'resources/images/createuser.png',
                    formTitle:'Create Fee Structure'
                },
                defaults:{
                    xtype:'textfield',              
                    value:'',
                    width:400
                },
                formItems :[
                {
                    name : 'name',
                    fieldLabel: 'Fee Name',
                    allowBlank: false
                },{
                    name:'header',
                    fieldLabel:'Header'
                },{
                    xtype:'combobox',
                    fieldLabel :'Type',
                    store:
                    Ext.create('Ext.data.Store', {
                        fields: ['abbr', 'name'],
                        data : [
                        {
                            "abbr":"REF",
                            "name":"Refundable"
                        },{
                            "abbr":"NONREF",
                            "name":"Non Refundable"
                        }]
                    }),
                    Autoload:true,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'abbr',
                    name:'type'

                }, {
                    name : 'amount',
                    fieldLabel: 'Amount'
                },{
                    xtype:'combobox',
                    fieldLabel :'Frequency',
                    store:
                    Ext.create('Ext.data.Store', {
                        fields: ['abbr', 'name'],
                        data : [{
                            "abbr":"ANN",
                            "name":"Annually"
                        },{
                            "abbr":"MM",
                            "name":"Monthly"
                        },{
                            "abbr":"OT",
                            "name":"One Timer"
                        }]
                    }),
                    Autoload:true,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'abbr',
                    name:'frequency'
                },{
                    name : 'comment',
                    fieldLabel: 'Comment',
                    xtype:'textarea',
                    height:50
                },{
                    name:'id',
                    value:rec?rec.data.id:"",
                    hidden:true
                }],
                buttons :[{
                    text: 'Save',
                    action: 'save',
                    handler: function(){
                        var form = win.down('form').getForm();
                        if(form.isValid()){
                            var obj = form.getValues();
                            Ext.Ajax.request({
                                url:'payment/addFee.do',
                                type:'json',
                                scope:this,
                                headers:{
                                    'Content-Type':'application/json'  
                                },
                                params:Ext.JSON.encode(obj),
                                success: function(res){
                                    win.close();
                                    var response = eval('('+res.responseText+')');
                                    grid.getStore().reload();
                                }
                            });
                        }
                    }
                },
                {xtype:'btncancel'}
                ]
            });
        }
        if(rec){
            win.down('form').getForm().setValues(rec.data);
        } else{
            win.down('form').getForm().reset();
        }
        win.show();
    },
    addToTemplate : function(btn){
        var records = this.selModel.getSelection();
       // this.store.remove(records);
        this.fireEvent('addRecordsToTemplate',records,'FEE_STRICTURE');
    }
});



