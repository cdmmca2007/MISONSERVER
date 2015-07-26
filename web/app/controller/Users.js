
Ext.define('MyApp.controller.Users', {
    extend: 'Ext.app.Controller',
    views: ['user.UserList','user.Edit'],
    stores: ['Users'],
    models: ['Users'],
    refs :[{
        ref:'editButton',
        selector:'userlist button[text=Edit]'
    },{
        ref:'deleteButton',
        selector:'userlist button[text=Delete]'
    }],
    init: function() {
        console.log(Ext.ComponentQuery.query('userlist button[text=Add]'));
        this.control({
            'viewport > userlist': {
                itemdblclick: this.editUser
            },
            'userlist button[text=Add]': {
                click: this.addUser
            },
            'userlist button[text=Edit]': {
                click: this.editUser
            },
            'userlist button[text=Delete]': {
                click: this.deleteUser
            },
            'userlist button[text=DisableUser]': {
                click: this.disableUser
            }
//            'useredit button[action=save]': {
//                click: this.updateUser
//            }
        });
    },
    editUser: function(button) {
    	 var rec = Ext.getCmp('userList').getSelectionModel().getSelection()[0];
         if(rec)
            this.addEditUserList(rec);
     },
     addEditUserList : function(rec){
    	 var win = Ext.create('MyApp.view.user.Edit', {
    	        title:rec?'Edit User':'Add User',
    	        closeAction:'destroy',
    	        id:'user_win',
                rec : rec?rec.data:null
          });                    
    	 win.show();
     },
     userSelectionChange : function(grid,sm){
         var  button = this.getEditButton();
         button.setDisabled(sm.getCount()!=1);
         app.getController('Users').getDeleteButton().setDisabled((sm.getCount()==0));
     },
    
    addUser: function(button) {
        this.addEditUserList(null);
    },
    deleteUser: function(button) {
    	var me = this;
        //var user = Ext.create('MyApp.view.user.Edit');
    	Ext.Msg.confirm("Alert","Are you sure want to delete User", function(btn){
            if(btn=='yes'){
    	var rec = Ext.getCmp('userList').getSelectionModel().getSelection()[0];
    	
    	 Ext.Ajax.request({
             url:'user/deleteUser.do',
             scope:this,
             params:{
            	 userId:rec.data.userId
             },
             success: function(res){
            	 var response = eval('('+res.responseText+')');
                 if(response.Success)
                	 {
            	 Ext.Msg.alert('Success','User deleted successfully');
                 	
                var grid = Ext.getCmp('userList');
                grid.getStore().remove(grid.getSelectionModel().getSelection());
                me.getUsersStore().reload();
                        
                }
             }
         });
         }
    });
    },
    showUsers: function(){
        var users = Ext.create('MyApp.view.user.UserList');
        globalTab.add(users);
        globalTab.setActiveTab(users);
    },
    disableUser:function(){

      var me = this;
       
       Ext.Msg.confirm("Alert","Are you sure want to Disable this user", function(btn){
       if(btn=='yes'){
    	var rec = Ext.getCmp('userList').getSelectionModel().getSelection()[0];
    	
    	 Ext.Ajax.request({
             url:'user/disableUser.do',
             scope:this,
             params:{
            	 userId:rec.data.userId
             },
             success: function(res){
            	 var response = eval('('+res.responseText+')');
                 if(response.Success)
                	 {
            	 Ext.Msg.alert('Success','User Disabled successfully');
                 	
                 var grid = Ext.getCmp('userList');
                 grid.getStore().remove(grid.getSelectionModel().getSelection());
                 me.getUsersStore().reload();
                        
                 }
             }
         });
         }
    });

    },        
    onSaveClick : function(win, btn,rec){
        var form = win.down('form').getForm();
        if(form.isValid()){
            var obj = form.getValues();
            if(rec){
            obj.userId = rec.userId;
             }
            obj.dob = Ext.getCmp('dob_'+win.id).getValue().getTime();
            obj.userLogin = {
                userName : obj.userName
            },
            Ext.Ajax.request({
                url:'user/addUser.do',
                type:'json',
                scope:this,
                headers:{
                    'Content-Type':'application/json'  
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                	var response = eval('('+res.responseText+')');
                	if(response.userId!== null )
                    {
                	Ext.Msg.alert('Success','User added successfully');
                	win.close();
                   
                    	this.getUsersStore().reload();
                    }
                	else
            		{
            		Ext.Msg.alert('Failure','Duplicate Login ID');
            		}
                }
                    	
                   
                })
           
        }
       
    }
    
});
