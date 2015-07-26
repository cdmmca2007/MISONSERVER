var template_id;

Ext.define('MyApp.view.payment.FeeDetails' ,{
    extend: 'Ext.container.Container',
    requires:['MyApp.view.payment.FeeStrucGrid','MyApp.view.payment.FeeTemplate'],
    alias: 'widget.tab_feedetailsgrid',
    title: 'Fee Template',
    id:'tab_feeDatailGrid',
    layout:{
        type:'hbox',
        align:'stretch'
    },
    constructor : function(){
        this.callParent(arguments);
    },
    initComponent: function() {
        this.items=[
        {
            xtype:'feetemplategrid',
            id:'feetemplategrid',
            width:300,
            listeners:{
                selectionChange : this.templateChange
            }
        },{
            xtype:'feetemplate',
            flex:.7
        },{
            xtype:'container',
            layout:{
                type:'vbox',
                align:'stretch'
            },
            items:[
              {
                  id:'feestructure',
                  xtype:'feestructure',
                  flex:1,
            listeners:{
                selectionChange :function(sm){
                    this.iconEdit.setDisabled(sm.getCount()==0);
                },
                addRecordsToTemplate : this.addRecorsToTemplate
            }
              }  
            ],
            flex:1
        }
        ];
        this.callParent(arguments);
    },
    onRender : function(){
        //this.selModel.on('selectionchange', this.onSelectChange);
        this.callParent(arguments);
    },
    selectionchange : function(sm, selected,eOpts){
        if(sm.getCount()){
              
        }
    },
    templateChange : function(sm){
        this.iconDelete.setDisabled(sm.getCount()==0); 
        this.iconEdit.setDisabled(sm.getCount()==0);
        var data = sm.getSelection()[0].data;
        Ext.StoreManager.lookup('TemplateDetails').load({
            id:data.id
        });
        template_id=data.id;
        Ext.getCmp('comment_'+'feetemplate').setValue(data.comment);
        
    },
    addRecorsToTemplate : function(records,type){
        var store = Ext.StoreManager.lookup('TemplateDetails');
        var c = store.getCount();
        
        Ext.each(records, function(rec){
            store.add({
                id:template_id,
                referenceId:rec.data.id,
                type:type,
                name:rec.data.name,
                order:c-1
            });
        });
    }
});

