Ext.define('MyApp.view.payment.FeeTemplateGrid' ,{
    extend: 'Ext.grid.Panel',
    alias:'widget.feetemplategrid',
    title: 'Fee Template',
    layout:'fit',
    id:'feetemplategrid',
    collapsible: true,
    frame: true,
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },
    features: [Ext.create('Ext.grid.feature.Grouping', {
            groupHeaderTpl: '{columnName}: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
            hideGroupedHeader: true,
            id:'feetemplategridgrouping'
        })
    ],
    store:'Templates',
    initComponent: function() {
        this.columns=[
    Ext.create('Ext.grid.RowNumberer'),
    {
        header: 'Template Name',
        dataIndex:'name',
        flex:1,
        style :'color:#17385B;font-weight:bold'
    },{
        header: 'Class',
        dataIndex:'classname',
        flex:1,
        style :'color:#17385B;font-weight:bold',
        renderer: function(value){
            return value?value:'Not Assigned';
        }
    },{
        menuDisabled: true,
        sortable: false,
        xtype: 'actioncolumn',
        width: 50,
        items: [{
            icon   : 'resources/images/icons/delete.gif',  // Use a URL in the icon config
            tooltip: 'Version',
            handler: function(grid, rowIndex, colIndex) {
                var rec = grid.getStore().getAt(rowIndex);
                grid.getStore().remove(rec);
            }
        }]
    }
    ];
        this.tbar =[{
            iconCls: 'icon-add',
            text: 'Add',
            scope:this,
            handler:function(btn){
                this.addTemplate();
            }
        },this.iconEdit = Ext.create('Ext.Button',{
            iconCls: 'icon-edit',
            text: 'Edit',
            disabled: true,
            scope:this,
            handler:function(btn){
                this.addTemplate(this.getSelectionModel().getSelection()[0]);
            }
        }),this.iconDelete = Ext.create('Ext.Button',{
            iconCls: 'icon-delete',
            text: 'Delete',
            disabled: true,
            id: 'delete',
            scope:this,
            handler:function(){
                this.deleteTemplate();
            }
        })
        ];
        this.callParent(arguments);
    },
    listeners:{
        selectionchange:function(sm,selected,e){
            this.iconDelete.setDisabled(sm.getCount()==0);             
            this.fireEvent('templateChange',sm,selected,e );
        }
    },
    onRender : function(){
        this.callParent(arguments);
    },
    addTemplate : function(rec){
                    
        var win = Ext.getCmp('feetempate_win'+this.id);
        if(!win){
            win = Ext.create('Ext.app.view.component.AppWindow', {
                title:'Add New Fee Template',
                id:'feetempate_win'+this.id,
                width:450,
                closeAction:'hide',
                top:{
                    image:BASE_URL+'resources/images/createuser.png',
                    formTitle:'Create Fee Template to Current Session'
                },
                defaults:{
                    xtype:'textfield',
                    value:'',
                    width:350
                },
                formItems :[
                {
                    name : 'name',
                    fieldLabel: 'Template Name',
                    allowBlank: false
                },{
                    name : 'classes',
                    fieldLabel: 'Class',
                    xtype:'combo',
                    multiSelect:true,
                    store:Ext.create('MyApp.store.ClassCombo1').load({
                     params:{
                             propertyId:2,///Class List
                             classid   :SETTING.Users.properties.session_id,        
                             teacherid :SETTING.Users.userId
                     }
                    }),
                    Autoload:true,
                    valueField :'id',
                    displayField :'value',   
                    editable: false,
                    queryMode:'local',
                    triggerAction:'all'
                },{
                    name : 'comment',
                    fieldLabel: 'Comment',
                    xtype:'textarea',
                    height:80
                },{
                    name:'id',
                    value:"",
                    hidden:true
                }
                ],
                buttons :[
                {
                    text: 'Save',
                    action: 'save',
                    scope:this,
                    handler:function(){
                        var form = win.down('form').getForm();
                        if(form.isValid()){
                            var obj = form.getValues();
                            if(obj['classes'].length==1 && obj['classes'][0]==""){
                                obj.classes=[];
                            }
                            obj.createdby =SETTING.Users.userId;
                            obj.modifiedby=obj.createdby;
                            obj.sessionid =SETTING.Users.properties.session_id;
                            Ext.Ajax.request({
                                url:'payment/addTemplates.do',
                                type:'json',
                                headers:{
                                    'Content-Type':'application/json'  
                                },
                                params:Ext.JSON.encode(obj),
                                success: function(res){
                                    Ext.Msg.alert('Success','Template added successfully');
                                    var rec = eval('('+res.responseText+')');
                                    Ext.StoreManager.lookup('Templates').load();
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
        }else{
            win.down('form').getForm().reset();
        }
        win.show();
    },
    deleteTemplate: function(){
        var grid = this;
        var obj = grid.getSelectionModel().getSelection()[0];
        Ext.Msg.confirm("Alert","Are you sure want to delete records", function(btn){
            if(btn=='yes'){
                Ext.Ajax.request({
                    url:'payment/delTemplates.do',
                    method:'POST',
                    type:'json',
                    headers:{
                        'Content-Type':'application/json'  
                    },
                    params:Ext.JSON.encode(obj.data),
                    success: function(res){
                        Ext.Msg.alert('Success','Template deleted successfully');
                        grid.getStore().remove(obj);
                    }
                })
            }
        });  
    }
});





