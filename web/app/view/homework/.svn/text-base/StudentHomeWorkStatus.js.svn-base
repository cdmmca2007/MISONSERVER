Ext.define('MyApp.view.homework.StudentHomeWorkStatus' ,{
    extend: 'Ext.grid.Panel',
    closable:false,
    title: 'Student Home Work Completion Status ',
    id:'studhwstatusgrid',
    layout:'fit',
    width :600,
    height:280,
    alias: 'widget.studhwstatusgrid',
    scrollable:true,
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },    
    store:'StudentHomeWorkStatus',
   
    initComponent: function() {

   /*this.subjectStore=Ext.create('MyApp.store.ClassSubject');
         this.subjectStore.load({
            params:{classid:'99b93bcc-eed0-4101-b643-9bd6958c1546'}
     });
    */   
    this.columns=[
    Ext.create('Ext.grid.RowNumberer'),

    {
        header: 'Student Name',
        dataIndex:'studentname',
        width :120,
        style :'color:#17385B;font-weight:bold'
    },
    {
        header:'Status',
        dataIndex:'statusname',
        width :60,
        style :'color:#17385B;font-weight:bold',
        renderer : function(value,metadata,record){
            	  if(record.data.status==1) 
                  return '<font color=green><b>'+value+'</font></b>';
                  else{                    
                  return '<font color=red><b>'+value+'</font></b>';
                  }                   
            } 
    },
    {
        header:'Submitted Date',
        dataIndex:'submiteddate',
        width :140,
        style :'color:#17385B;font-weight:bold'
    },{ 
        header:'Mark Completed',
        dataIndex:'status',
        xtype:'checkcolumn',
        stopSelection: false,
        style :'color:#17385B;font-weight:bold',
        listeners :{
            checkchange: function(box, rowIndex,checked,eOpts ){
            }
        }    
    },
    { 
        header:'Download Solution Doc',
        dataIndex:'docpath',
        width :150,
        style :'color:#17385B;font-weight:bold',
        renderer : function(value,metadata,record){
            	  if(value=='') 
                  return '<font color=green><b>'+'N/A'+'</font></b>';
                  else{
                    var val='"'+record.data.pid+'"'; 
                  return '<a href="#" onclick=download('+val+');><font color=red><b>'+value+'</font></b></a>';    
                  }                   
            } 
    },
        { 
        header:'Uploaded By',
        dataIndex:'uploadedby',
        width :130,
        style :'color:#17385B;font-weight:bold'
    }
    ];

    this.tbar =[{
    }
    ];
    this.bbar = Ext.create('Ext.PagingToolbar', {
        store: this.store,
        displayInfo: true,
        displayMsg: 'Displaying users {0} - {1} of {2}',
        emptyMsg: "No user to display",
        items:[]
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
