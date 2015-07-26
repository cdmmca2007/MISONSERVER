Ext.define('MyApp.view.elearning.QuestionListGrid' ,{
    extend: 'Ext.grid.Panel',
    closable:true,
    title: 'Question List In Exam',
    id:'questionlistgrid',
    layout:'fit',
    alias: 'widget.questionlistgrid',
    height:560,
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },    
    store:'QuestionList',
    initComponent: function() {

    this.columns=[
    Ext.create('Ext.grid.RowNumberer'),
            {
                header: 'Question',
                dataIndex:'question',
                width :'75%',
                style :'color:#17385B;font-weight:bold',
                renderer:function(value){
                  return  '<font color=green><b>'+value+'</b></font>';
            }
            },
            {
                header: 'Answer type',
                dataIndex:'ans_type',
                width :'20%',
                style :'color:#17385B;font-weight:bold',
                renderer:function(value){
                  if(value==1)
                  return  '<font color=green><b>Multi-Option Type</b></font>';
                  if(value==2)
                  return  '<font color=brown><b>True-False Type</b></font>';
                  if(value==3)
                  return  '<font color=blue><b>Yes - No Type</b></font>';
              
              
            }
            }
            
    ];
    this.selModel=Ext.create('Ext.selection.CheckboxModel',{
                                                    singleSelect:true,
                                                    listeners:{
                                                            selectionchange:function(){
                                                               var  button = Ext.getCmp('admsnStudentEdit');
                                                               button.setDisabled(false);
                                                               var  delbutton = Ext.getCmp('admsnStudentDelete');
                                                               delbutton.setDisabled(false);
                                                            }
                                                        }
    });
    this.tbar =[{
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
        iconCls: 'icon-delete',
        text: 'Delete Question',
        disabled: true,        
        id:'hwDelete',
        handler: function(component){
            Ext.Msg.confirm("Alert","Are you sure want to delete records", function(btn){
            if(btn==='yes'){
                var grid = Ext.getCmp('notificationgrid');
                grid.getStore().remove(grid.getSelectionModel().getSelection());
            }
        });
        }
    }
    ];
    this.bbar = Ext.create('Ext.PagingToolbar', {
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
                    });

            }
        }
    
    }]
    });
    this.callParent(arguments);
    },
    onRender : function(){
        //this.selModel.on('selectionchange', this.onSelectChange);
        this.callParent(arguments);
    },
    selectionchange : function(sm, selected,eOpts){
        if(sm.getCount()){
              
    }
    }
});

