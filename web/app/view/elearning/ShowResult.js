Ext.define('MyApp.view.elearning.ShowResult' ,{
    extend: 'Ext.grid.Panel',
    closable:false,
    title: 'Resultboard',
    id:'onlineexamresult',
    layout:'fit',
    width :595,
    height:482,
    alias: 'widget.onlineexamresult',
    scrollable:true,
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },    
    store:'OnlineExamUserPassResult',
   
    initComponent: function() {

    this.columns=[
    Ext.create('Ext.grid.RowNumberer'),
    {
        header: 'Student',
        dataIndex:'student',
        width :'15%',
        style :'color:#17385B;font-weight:bold'
    },
    {
        header:'Adm No',
        dataIndex:'admissionno',
        width :'10%',
        style :'color:#17385B;font-weight:bold'
    },{
        header:'Exam Status',
        dataIndex:'state',
        width :'15%',
        style :'color:#17385B;font-weight:bold',
                renderer : function(value,metadata,record){
            	  if(value==0) 
                  return '<font color=green><b>'+'NotAppeared'+'</font></b>';
                  else{
                  return '<font color=green><b>'+'Appeared'+'</font></b>';
                  }                   
        }
    },
    {
        header:'Appeared Date',
        dataIndex:'apearedondate',
        width :'17%',
        style :'color:#17385B;font-weight:bold'
    },{
        header:'Total Score',
        dataIndex:'totalscore',
        width :'15%',
        style :'color:#17385B;font-weight:bold',
        style :'color:#17385B;font-weight:bold',
        renderer : function(value,metadata,record){
            	  if(record.data.state==0) 
                  return '';
                  else{
                  return value;
                  }                   
        }
    },{
        header:'Result',
        dataIndex:'examstatus',
        width :'10%',
        style :'color:#17385B;font-weight:bold',
        renderer : function(value,metadata,record){
            	  if(record.data.state==0) 
                  return 'Pending';
                  else{
                  return value;
                  }                   
        }
    },{
        header:'Total Time',
        dataIndex:'tot_time',
        width :'13%',
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
