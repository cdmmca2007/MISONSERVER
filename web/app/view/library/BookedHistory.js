Ext.define('MyApp.view.library.BookedHistory' ,{
    extend: 'Ext.grid.Panel',
    title: 'Booked History Window',
    id:'bookhistorylist',
    layout:'fit',
    alias: 'widget.bookhistorylist',
    height:480,
    width: '100%',
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },    
    //store:'BookedHistoryList',
    store:'BookedHistory',
    initComponent: function() {

    this.columns=[
    Ext.create('Ext.grid.RowNumberer'),
            {
                header: 'Name',
                dataIndex:'requestername',
                width :'20%',
                style :'color:#17385B;font-weight:bold',
                renderer:function(value){
                  return  '<font color=green><b>'+value+'</b></font>';
                }
            },
            {
                header: 'RequesterIs',
                dataIndex:'requestedbytxt',
                width :'13%',
                style :'color:#17385B;font-weight:bold',
                renderer:function(value){
                  return  '<font color=green><b>'+value+'</b></font>';
                }
            },
            {
                header: 'Class',
                dataIndex:'class',
                width :'12%',
                style :'color:#17385B;font-weight:bold',
                renderer:function(value){
                  return  '<font color=green><b>'+value+'</b></font>';
                }
            },
            {
                header: 'From Date',
                dataIndex:'fromdate',
                width :'11%',
                style :'color:#17385B;font-weight:bold'
            },
            {
                header: 'To Date',
                dataIndex:'todate',
                width :'11%',
                style :'color:#17385B;font-weight:bold'
            },{
                header: 'Status',
                dataIndex:'returnedflag',
                width :'10%',
                style :'color:#17385B;font-weight:bold'
            },{
                header: 'RetDate',
                dataIndex:'returneddate',
                width :'10%',
                style :'color:#17385B;font-weight:bold'
            },
            {
                header: 'Comments',
                dataIndex:'description',
                width :'13%',
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

