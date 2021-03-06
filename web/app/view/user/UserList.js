 Ext.define('MyApp.view.user.UserList' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.userlist',
    id:'userList',
    closable:true,
    title: 'User Administration',
    store:'Users',
    dockedItems :[{
                xtype: 'toolbar',
                items: [{
                    iconCls: 'icon-add',
                    text: 'Add'
                },{
                    iconCls: 'icon-edit',
                    text: 'Edit',
                    disabled: true
                }, {
                    iconCls: 'icon-delete',
                    text: 'Delete',
                    disabled: true,
                    itemId: 'delete'
            },{
                    iconCls: 'icon-delete',
                    text: 'DisableUser',
                    disabled: false,
                    itemId: 'disable'
            },{
                    iconCls: 'icon-edit',
                    text: 'Change User Password',
                    disabled: false,
                    itemId: 'changepassword'
            },{
                    iconCls: 'icon-edit',
                    text: 'Send Email',
                    disabled: false,
                    itemId: 'sendemail'
            }]
    }],

    initComponent: function() {
    	var me =this;
        this.columns = [
             Ext.create('Ext.grid.RowNumberer'),
           // {header: 'User ID',  dataIndex: 'userid',  flex: 1,hidden : true},
            {header: 'Name',  dataIndex: 'name',  flex: 1,
            style :'color:#17385B;font-weight:bold'},
            {header: 'Login Id',  dataIndex: 'userName',  flex: 1,
            style :'color:#17385B;font-weight:bold'},
            {header: 'Role', dataIndex: 'role', flex: 1,
            style :'color:#17385B;font-weight:bold'},
            {header: 'DOB',  dataIndex: 'dob',  flex: 1,
            style :'color:#17385B;font-weight:bold',
            	renderer : function(value){
            		return Ext.Date.format(new Date(value),DEFAULT_DATE_FORMAT);
            }},
            {header: 'Email',  dataIndex: 'emailId',  flex: 1,
            style :'color:#17385B;font-weight:bold'},
            {header: 'Contact No',  dataIndex: 'contactNo',  flex: 1,
            style :'color:#17385B;font-weight:bold'},
            {header: 'Adress',  dataIndex: 'address',  flex: 1,
            style :'color:#17385B;font-weight:bold'},
            {header: 'City',  dataIndex: 'city',  flex: 1,
            style :'color:#17385B;font-weight:bold'},
        ];
        this.selModel = Ext.create('Ext.selection.CheckboxModel',{
            singleSelect:true,
            listeners:{
                selectionchange : function(sm){
                    app.getController('Users').userSelectionChange(me,sm);
                } 
            }
        });
        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: this.store,
            pageSize:25,
            displayInfo: true,
            displayMsg: 'Displaying users {0} - {1} of {2}',
            emptyMsg: "No user to display"
        }),

        this.callParent(arguments);
//        this.store.on('beforeload',function(s){
//            s.getProxy().extraParams = {
//                combo1:'value',
//                combo2:'value2'
//                
//            }          
//        },this);
        this.store.loadPage(1);
    }
});
