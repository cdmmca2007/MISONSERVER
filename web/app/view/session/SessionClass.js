Ext.define('MyApp.view.session.SessionClass' ,{
    extend: 'Ext.grid.Panel',
    closable:false,
    id:'sessionclassgrid',
    layout:'fit',
    width :400,
    height:600,
    alias: 'widget.sessionclassgrid',
    scrollable:true,
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },    
    store:'SessionClass',
   
    initComponent: function() {

    this.columns=[
    Ext.create('Ext.grid.RowNumberer'),
      {
            header    : 'Class/Standered',
            dataIndex :'classname'
      },
      {
            xtype:'checkcolumn',
            header    : 'Add to Session',
            dataIndex :'mark',
            stopSelection: false
      }
    ];

    this.tbar =[{
    }
    ];
    this.bbar = Ext.create('Ext.PagingToolbar', {
        //store: this.store,
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

