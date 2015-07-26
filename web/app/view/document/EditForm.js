Ext.define('MyApp.view.document.EditForm', {
    extend: 'Ext.app.view.component.AppWindow',
    alias: 'widget.documentedit',
    top:{
        image:BASE_URL+'resources/images/createuser.png',
        formTitle:'Add Document Form'
    },
    width:500,
    defaults : {
        width:300,
        xtype:'textfield'
    },
    initComponent: function() {
       var me = this;
    	this.formItems = [
        {
                xtype: 'combobox',
                emptyText: 'Select Doc Type',
                fieldLabel: 'Select Doc Type',
                id:'doctype',
                store:Ext.create('Ext.data.Store', {
                     fields: ['id', 'value'],
                     data : [
                     {"id":"1","value":"Quantity Mannual"},
                     {"id":"2","value":"Quantity Procedure"},
                     {"id":"3","value":"Work Instruction"},
                     {"id":"4","value":"Flow Diagram"}
                 ]
                 }),
                 typeAhead: true,
                 queryMode: 'local',
                 displayField: 'value',
                 valueField: 'id',
                 name:'type',
                 listeners:{

                 }
        }, 
        {
            xtype: 'textfield',
            name : 'docName',
            fieldLabel: 'Name',
            value : this.rec?this.rec.docName:""
        },{
            xtype: 'numberfield',
            name : 'version',
            fieldLabel: 'Version',
            value : this.rec?this.rec.version:""
            
        }, {
            fieldLabel:'Upload File',
            name:'fileName',
            xtype:'filefield',
            value : this.rec?this.rec.fileName:""
        } 
        ]
        this.buttons = [
        {
            text: 'Save',
            action: 'save',
            scope:this,
            handler: function(btn){
                this.saveDocument(btn)
            }
        },
        {
            text: 'Cancel',
            scope: this,
            handler: function(){
                this.close();
            }
        }
        ];

        this.callParent(arguments);
    },
    saveDocument:function(btn){
       var form = this.down('form').getForm();
       if(form.isValid()){
           form.submit({
               url:'document/document.post',
               success:function(){
                   alert("sdfsdf");
               }
           })
       }
    },
    deleteDocument: function(){
        
    },
    uploadFile: function(){
        
    }
});


