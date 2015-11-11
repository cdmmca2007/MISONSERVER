Ext.define('MyApp.view.teacher.Teacher' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.teacherlist',
    id:'teacherList',
    closable:true,
    title: 'Teacher Administration',
    store:'Users',
    initComponent: function() {
    	var me =this;
        this.columns = [
             Ext.create('Ext.grid.RowNumberer'),
           // {header: 'User ID',  dataIndex: 'userid',  flex: 1,hidden : true},
            {header: 'Name',  dataIndex: 'name',  flex: 1,
            style :'color:#17385B;font-weight:bold'},
            {header: 'Login Id',  dataIndex: 'userName',  flex: 1,hidden:true,
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
        this.tbar=[{
                        iconCls: 'icon-edit',
                        text: 'View Details',
                        id:'viewDetails',
                        scope:this,
                        handler: function(component){
                                    var rec=Ext.getCmp('teacherList').getSelectionModel().getSelection()[0];
                                    if(rec!=null){
                                        
                                    }
                        }
                    },
                    {
                        iconCls: 'icon-edit',
                        text: 'Teacher Activity',
                        id:'teacheractivity',
                        scope:this,
                        handler: function(component){
                                    var rec=Ext.getCmp('teacherList').getSelectionModel().getSelection()[0];
                                    if(rec!=null){
                                        
                                    }
                        }
                    },{
                        iconCls: 'icon-edit',
                        text: 'Class Performance',
                        id:'classperformance',
                        scope:this,
                        handler: function(component){
                                    var rec=Ext.getCmp('teacherList').getSelectionModel().getSelection()[0];
                                    if(rec!=null){
                                        
                                    }
                        }
                    },{
                        iconCls: 'icon-edit',
                        text: 'Assign-Task',
                        id:'assigntask',
                        scope:this,
                        handler: function(component){
                                    var rec=Ext.getCmp('teacherList').getSelectionModel().getSelection()[0];
                                    if(rec!=null){
                                        
                                    }
                        }
                    }
                    
                   
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
            pageSize:500,
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
       // this.store.loadPage(1);
    }
});
    
    
    