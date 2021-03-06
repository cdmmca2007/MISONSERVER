Ext.define('MyApp.view.payment.FeeTemplate' ,{
    extend: 'Ext.panel.Panel',
    alias:'widget.feetemplate',
    title: 'Fee Template-Structure',
    id:'feetemplate',
    layout:{
        type:'vbox',
        align:'stretch'
    },
    
    initComponent: function() {
        this.items=[
    {
        xtype:'displayfield',
        id:'comment_'+'feetemplate',
        text:'',
        height:40
    },{
        xtype:'grid',
        border:false,
        flex:1,
        columns:[
        Ext.create('Ext.grid.RowNumberer'),
        {
            header: 'Fee Structur List',
            dataIndex:'name',
            flex:1
        },{
            header:'Type',
            dataIndex:'type'
        }],
        viewConfig: {
            plugins: {
                ptype: 'gridviewdragdrop',
                dragGroup: 'firstGridDDGroup',
                dropGroup: 'secondGridDDGroup'
            },
            listeners: {
                drop: function(node, data, dropRec, dropPosition) {
                    var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
                    Ext.example.msg("Drag from right to left", 'Dropped ' + data.records[0].get('name') + dropOn);
                }
            }
        },
        store:'TemplateDetails'
    }  
    ];
        this.tbar =[{
            iconCls: 'icon-save',
            text: 'Save',
            scope:this,
            handler:function(btn){
                this.onTemplateSave();
            }
        },'->',{
            iconCls: 'icon-add',
            text: 'Print Preview',
            scope:this,
            handler:function(btn){
                this.priview();
            }
        }];
        this.callParent(arguments);
    },
    onRender : function(){
        this.callParent(arguments);
    },
    onTemplateSave : function(){
        var store = Ext.StoreManager.lookup('TemplateDetails');
        var arr=[];
        store.each(function(rec){
            arr.push(rec.data);
        });
        Ext.Ajax.request({
            url:'payment/templateDetails.do',
            type:'json',
            scope:this,
            headers:{
                'Content-Type':'application/json'  
            },
            params:Ext.JSON.encode(arr),
            success: function(res){
                var response = eval('('+res.responseText+')');
                Ext.Msg.alert('Success','Template-Fee Structure Saved successfully');
            }
        });
    },
    afterRender: function() {
        this.callParent();
        this.templateDetailStore =this.down('grid').getStore();
    },
    priview: function(){
        Ext.create('MyApp.view.payment.TemplatePreviewWindow',{
            title:'Fee Template Preview',
            templateDetailStore:this.templateDetailStore
        }).show();
    }
});







