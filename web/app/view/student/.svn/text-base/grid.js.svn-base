
function addStudent(rec){
    
    var win;// = Ext.getCmp('addstudent_win');
    if(!win){
        win = Ext.create('Ext.app.view.component.AppWindow', {
            title:rec?'Edit New Student Form':'Add New Student Form',
            id: rec?'editstudent_win':'addstudent_win',
            width:400,
            closeAction:'hide',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:'Create New Student Data'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:300
            },
            url:'ppppp',
            formItems :[
            {
                name : 'name',
                fieldLabel: 'Student Name',
                id:'name'
            },
            {
                xtype:'combobox',
                fieldLabel :'Class',
                id:'class_id',
                store:
                Ext.create('Ext.data.Store', {
                    fields: ['abbr', 'name'],
                    data : [
                    {
                        "abbr":"1-A",
                        "name":"Claas-1-A"
                    },
                    {
                        "abbr":"1-B",
                        "name":"Class-1-B"
                    },
                    {
                        "abbr":"2-A",
                        "name":"Claas-2-A"
                    },
                    {
                        "abbr":"2-B",
                        "name":"Class-2-B"
                    }
                    ]
                }),
                autoLoad:true,
                queryMode: 'local',
                displayField: 'name',
                valueField: 'abbr'

            },
            {
                xtype:'datefield',
                name : 'dob',
                fieldLabel: 'Date of Birth',
                id:'dob'
                },{
                name : 'address',
                fieldLabel: 'Address',
                id:'address'
            },
            {
                name : 'father_name',
                fieldLabel:  'Father Name',
                id:'father_name'
            },
            {
                name : 'mother_name',
                fieldLabel: 'Mother Name',
                id : 'mother_name'
            },
            {
                name : 'caretaker_name',
                fieldLabel: 'Care Taker Name',
                id : 'caretaker_name'
            },
            {
                name : 'parent_email_id',
                fieldLabel: 'Parent Email Id',
                id : 'parent_email_id'
            },
            {
                name : 'parent_mobile',
                fieldLabel: 'Parent Mobile',
                id : 'parent_mobile'
            },
            {
                name : 'alternate_emailid',
                fieldLabel: 'Alternate Email Id',
                id: 'alternate_emailid'
            }
            ],
            buttons :[
            {
                text: rec?'Edit':'Add',
                action: 'save',
                scope:this,
                handler:function (){
                
                var grid = Ext.getCmp('studentgrid');

                var r = Ext.create('Student', {
                    name:Ext.getCmp('name').getValue(),
                    dob:Ext.getCmp('dob').getValue(),
                    address:Ext.getCmp('address').getValue(),
                    father_name:Ext.getCmp('father_name').getValue(),
                    mother_name:Ext.getCmp('mother_name').getValue(),
                    caretaker_name:Ext.getCmp('caretaker_name').getValue(),
                    parent_email_id:Ext.getCmp('parent_email_id').getValue(),
                    parent_mobile:Ext.getCmp('parent_mobile').getValue(),
                    alternate_emailid:Ext.getCmp('alternate_emailid').getValue(),
                   // addmission_date:Ext.getCmp('addmission_date').getValue(),
                    class_id:Ext.getCmp('class_id').getValue()
                    
                });
                studentdata.insert(0, r);

               /* if (this.up('form').getForm().isValid()) {
                            // In a real application, this would submit the form to the configured url
                            // this.up('form').getForm().submit();
                            this.up('form').getForm().reset();
                            this.up('window').hide();
                            Ext.MessageBox.alert('Thank you!', 'Your inquiry has been sent. We will respond as soon as possible.');
                        }*/
                   
                }
            },
            {xtype:'btncancel'}
            ]
        })
    }
    if(rec){
        Ext.getCmp('name').setValue(rec.data.name);
        Ext.getCmp('class_id').setValue(rec.data.class_id);
        Ext.getCmp('dob').setValue(rec.data.dob);
        Ext.getCmp('address').setValue(rec.data.address);
        Ext.getCmp('father_name').setValue(rec.data.father_name);
        Ext.getCmp('mother_name').setValue(rec.data.mother_name);
        Ext.getCmp('caretaker_name').setValue(rec.data.caretaker_name);
        Ext.getCmp('parent_email_id').setValue(rec.data.parent_email_id);
        Ext.getCmp('parent_mobile').setValue(rec.data.parent_mobile);
        Ext.getCmp('alternate_emailid').setValue(rec.data.alternate_emailid);
    }
    win.show();
}

Ext.define('MyApp.view.student.grid' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.studentlist',
    closable:true,
    title: 'Student Details',
    id:'studentgrid',
    layout:'fit',
   
   /* selModel:Ext.create('Ext.selection.CheckboxModel',{
            singleSelect:true,
            listeners:{
                //selectionchange : app.getController('Master').selectionChange
                selectionchange:function(){alert('gggg');}
            }
        }),*/
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },
    columns:[
    Ext.create('Ext.grid.RowNumberer'),   
    {
        header: 'Name',
        dataIndex:'name'
    },

    {
        header:'Date Of Birth',
        dataIndex:'dob'
    },

    {
        header:'Address',
        dataIndex:'address'
    },

    {
        header:'Father Name',
        dataIndex:'father_name'
    },

    {
        header:'Mother Name',
        dataIndex:'mother_dataIndex'
    },

    {
        header:'CareTaker Name',
        dataIndex:'caretaker_name'
    },

    {
        header:'Parent email',
        dataIndex:'parent_email_id'
    },

    {
        header:'Parent Mobile',
        dataIndex:'parent_mobile'
    },

    {
        header:'Alertname Email',
        dataIndex:'alternate_emailid'
    },

    {
        header:'Addmission Date',
        dataIndex:'addmission_date'
    },

    {
        header:'Class',
        dataIndex:'class_id'
    }
    ],
    store:'Student',
    selModel:Ext.create('Ext.selection.CheckboxModel',{
        singleSelect:true,
        listeners:{                
                selectionchange:function(){
                  
                   var  button = Ext.getCmp('StudentEdit');
                   button.setDisabled(false);
                   var  delbutton = Ext.getCmp('Studentdelete');
                   delbutton.setDisabled(false);                   
                }
            }
    }),
    tbar :[{
        xtype: 'searchfield',
        store: Ext.create('Ext.data.Store', {
            autoLoad: false,
            fields:['id','name'],
            proxy: {
                type: 'ajax',
                url: 'users.json',
                reader: {
                    type: 'json',
                    root: 'users'
                }
            }
        })
    },{
        iconCls: 'icon-add',
        text: 'Add Student',
       // listeners:{
          handler: function(component){
               // component.getEl().on('click', function(){
                    addStudent(null);
               // })

            }
       // }
    },{
        iconCls: 'icon-edit',
        text: 'Edit',
        id:'StudentEdit',
        disabled: true,
        scope:this,
        handler: function(component){
                    var rec=Ext.getCmp('studentgrid').getSelectionModel().getSelection()[0];
                    addStudent(rec);
        }
    }, {
        iconCls: 'icon-delete',
        text: 'Delete',
        disabled: true,
        id: 'Studentdelete',
        handler: function(component){
            Ext.Msg.confirm("Alert","Are you sure want to delete records", function(btn){
            if(btn=='yes'){
                var grid = Ext.getCmp('studentgrid');
                grid.getStore().remove(grid.getSelectionModel().getSelection());
            }
        });
        }
      
    },{
        xtype:'button',
        text:'Full Detail',
        iconCls: 'icon-add',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                  
                    //addFeeTemplate();
                    })

            }
        }
    }
    ],
    bbar : Ext.create('Ext.PagingToolbar', {
        store: this.store,
        displayInfo: true,
        displayMsg: 'Displaying users {0} - {1} of {2}',
        emptyMsg: "No user to display",
        items:[{
        xtype:'button',
        text:'Print',        
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    //addFeeTemplate();
                    })

            }
        }
    },{
        xtype:'splitbutton',
        text:'Export Data',
        arrowAlign:'right',        
        menu: [{text: 'PDF'},{text: 'Excelsheet'}],
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    //addFeeTemplate();
                    })

            }
        }
    }]
    }),    
    initComponent: function() {
        this.callParent(arguments);
    },

    onRender : function(){
        //this.selModel.on('selectionchange', this.onSelectChange);
        this.callParent(arguments);
    },
    selectionChange : function(sm, selected,eOpts){
        alert('fff');
        if(sm.getCount()){
          alert('fff');
    }
    }
});



