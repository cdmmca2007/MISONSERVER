Ext.define('MyApp.view.misreport.ListOfAbsentStudent' ,{
    extend: 'Ext.grid.Panel',
    closable:false,
    layout:'fit',
    width :400,
    height:300,
    alias: 'widget.listofabsentstudent',
    scrollable:true,
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },    
    store:'ListOfAbsentStudent',
    initComponent: function() {
    this.columns=[
    {
        header:'Admissionno',
        dataIndex:'admissionno',
        width :'40%',
        style :'color:#17385B;font-weight:bold'
    },
    {
        header: 'Roll Number',
        dataIndex:'rollno',
        width :'20%',
        hidden:true,
        style :'color:#17385B;font-weight:bold'
    },
    {
        header: 'Student Name',
        dataIndex:'student',
        width :'60%',
        style :'color:#17385B;font-weight:bold'
    }
   
    ];

  /*  this.tbar =[{
    }
    ];*/
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
