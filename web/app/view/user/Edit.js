Ext.define('MyApp.view.user.Edit', {
    extend: 'Ext.app.view.component.AppWindow',
    alias: 'widget.useredit',
    title: 'Edit User',
    width:460,
    id:'user_win',
    constructor: function(config) {
        Ext.apply(this,config);
        var me = this;
    	Ext.StoreManager.lookup('UserRoles').load();
        this.formItems = [
        {
            xtype: 'textfield',
            name : 'name',
            fieldLabel: 'Name',
            value : this.rec?this.rec.name:"",
            width:400,
            allowBlank: false
        },{
            xtype: 'textfield',
            name : 'userName',
            fieldLabel: 'Login Id',
            value : this.rec?this.rec.userName:"",
            width:400,
            allowBlank: false
            
        }, {
            xtype: 'combo',
            fieldLabel:'Role',
            store:'UserRoles',
            triggerAction:'all',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name:'roleId',
            id:'roleId',
            value : this.rec?this.rec.roleId:"",
            width:400,
            allowBlank: false,
            listeners:{
                select: function(component){
                   var issueto=Ext.getCmp('roleId').getValue();
                   if(issueto===3){
                        Ext.getCmp('teachertype').show();
                        Ext.getCmp('jobtype').show();
                        Ext.getCmp('designation').show();
                        Ext.getCmp('department').show();
                   }                        
                   else {    
                        Ext.getCmp('teachertype').hide();
                        Ext.getCmp('jobtype').hide();
                        Ext.getCmp('designation').hide();
                        Ext.getCmp('department').hide();
                   }     
                }
             }
             },{
                xtype:'combobox',
                fieldLabel :'Select Department',
                id:'department',
                allowBlank: false,
                width:400,
                emptyText: 'Select  Department',
                store:Ext.create('MyApp.store.Master').load({
                  params:{propertyId:27}}),
                queryMode: 'local',
                Autoload:true,               
                valueField :'id',
                displayField :'value',
                name:'department',
                hidden:true

            },{
             xtype:'combobox',
                fieldLabel :'Select Teacher Type',
                id:'teachertype',
                emptyText: 'Select Teacher Type',
                store:Ext.create('MyApp.store.Master').load({
                  params:{propertyId:24}}),
                queryMode: 'local',
                Autoload:true,               
                valueField :'id',
                displayField :'value',
                name:'teachertype',
                hidden:true,
                width:400,
                allowBlank: false

            },{
                xtype:'combobox',
                fieldLabel :'Select Job Type',
                id:'jobtype',
                emptyText: 'Select Job Type',
                store:Ext.create('MyApp.store.Master').load({
                  params:{propertyId:25}}),
                Autoload:true,
                queryMode: 'local',
                valueField :'id',
                displayField :'value',
                name:'jobtype',
                hidden:true,
                width:400,
                allowBlank: false
            },
            {
                xtype:'combobox',
                name : 'designation',
                fieldLabel: 'Designation',
                id:'designation',
                store:Ext.create('MyApp.store.Master').load({
                params:{propertyId:1}}),
                Autoload:true,
                queryMode: 'local',
                valueField :'id',
                displayField :'value',
                hidden:true,
                width:400,
                allowBlank: false
            },{
            name : 'emailId',
            fieldLabel: 'Email',
            vtype : 'email',
            width:400,
            value : this.rec?this.rec.emailId:"",
            allowBlank: false
        },
        {
            fieldLabel: 'DOB',  
            xtype:'datefield',
            name: 'dob',
            id:'dob_'+this.id,
            value : this.rec? new Date(this.rec.dob):"",
            width:400
            
        },
        {
            fieldLabel: 'Contact No',  
            name: 'contactNo',
            value : this.rec?this.rec.contactNo:"",
            width:400,
            allowBlank: false
        },{
            fieldLabel: 'City',  
            name: 'city',
            value : this.rec?this.rec.city:"",
            width:400
        },{
            xtype:'textarea',
            fieldLabel: 'Address',  
            name: 'address',
            value : this.rec?this.rec.address:"",
            width:400
        }
        ];
        this.buttons = [
        {
            text: 'Save',
            action: 'save',
            scope:this,
            handler: function(btn){
                app.getController('Users').onSaveClick(this,btn,me.rec);
            }
        },
        {
            text: 'Cancel',
            scope: this,
            handler: this.close
        }
        ];

        this.callParent([Ext.apply({
            top:{
        image:BASE_URL+'resources/images/portal-icon/add_user.jpg',
        formTitle:'<b>Create New User Form</b>'
    },defaults : {
        width:300,
        xtype:'textfield'
    }
        },this)]);
    }
});


