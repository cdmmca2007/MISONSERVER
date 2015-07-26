Ext.define('MyApp.view.elearning.PrintUserPass' ,{
    extend: 'Ext.grid.Panel',
    closable:false,
    title: 'Login User / Pass',
    id:'onlineexamschuserpass',
    layout:'fit',
    width :580,
    height:482,
    alias: 'widget.onlineexamschuserpass',
    scrollable:true,
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },    
    store:'OnlineExamUserPass',
   
    initComponent: function() {

    this.columns=[
    Ext.create('Ext.grid.RowNumberer'),
    {
        header: 'Student Name',
        dataIndex:'student',
        width :'30%',
        style :'color:#17385B;font-weight:bold'
    },
    {
        header:'Admissionno',
        dataIndex:'admissionno',
        width :'20%',
        style :'color:#17385B;font-weight:bold'
    },
    {
        header:'Userid',
        dataIndex:'userid',
        width :'25%',
        style :'color:#17385B;font-weight:bold'
    },{
        header:'Password',
        dataIndex:'pass',
        width :'25%',
        style :'color:#17385B;font-weight:bold'
    },
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
