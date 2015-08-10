Ext.define('MyApp.view.library.BookRequesterList' ,{
    extend: 'Ext.grid.Panel',
    closable:true,
    title: 'Requester Name Window',
    id:'bookrequesternamelist',
    layout:'fit',
    alias: 'widget.bookrequesternamelist',
    height:480,
    width:580,
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },    
    store:'BookRequesterList',
    initComponent: function() {

    this.columns=[
    Ext.create('Ext.grid.RowNumberer'),
            {
                header: 'Requester Name',
                dataIndex:'requestername',
                width :'25%',
                style :'color:#17385B;font-weight:bold',
                renderer:function(value){
                  return  '<font color=green><b>'+value+'</b></font>';
                }
            },
            {
                header: 'Requester IS ',
                dataIndex:'requestedbytxt',
                width :'25%',
                style :'color:#17385B;font-weight:bold',
                renderer:function(value){
                  return  '<font color=green><b>'+value+'</b></font>';
                }
            },
            {
                header: 'Requested Date',
                dataIndex:'requestedon',
                width :'25%',
                style :'color:#17385B;font-weight:bold'
                
            },
            {
                header: 'Comments',
                dataIndex:'description',
                width :'25%',
                style :'color:#17385B;font-weight:bold'
            }
            
            
    ];
    this.selModel=Ext.create('Ext.selection.CheckboxModel',{
        singleSelect:true,
        listeners:{
                selectionchange:function(sm){
                   Ext.getCmp('notifyreq').setDisabled((sm.getCount()==0));
                   Ext.getCmp('cencelreq').setDisabled((sm.getCount()==0));
                   
                }
        }
    });
    this.tbar =[{
        iconCls: 'icon-cross',
        text: 'Cancel Request',
        disabled: true,        
        id:'cencelreq',
        handler: function(component){
            Ext.Msg.confirm("Alert","Are you sure want Cancel the Request ", function(btn){
            if(btn==='yes'){
                var grid = Ext.getCmp('bookrequesternamelist');
                grid.getStore().remove(grid.getSelectionModel().getSelection());
            }
        });
        }
    },{
        xtype:'splitbutton',
        text:'Notify Requester',
        iconCls: 'icon-green',
        arrowAlign:'right',
        id:'notifyreq',
        disabled: true,        
        menu: [{text: 'Email',
                handler: function(){
                    var rec=Ext.getCmp('bookrequesternamelist').getSelectionModel().getSelection()[0];
                    Ext.Msg.alert('Success','An Email alert is sent to '+ rec.data.requestername); 
                } 
               }, 
               
               {text: 'SMS',
               handler: function(){
                    var rec=Ext.getCmp('bookrequesternamelist').getSelectionModel().getSelection()[0];
                    Ext.Msg.alert('Success','An Email alert is sent to '+ rec.data.requestername); 
                   
               } 
               
               }
              ]
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
    }
});

