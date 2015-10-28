Ext.define('MyApp.view.payment.StudentDiscount' ,{
    extend: 'Ext.grid.Panel',
    closable:false,
    id:'studentdiscountgrid',
    layout:'fit',
    width :580,
    height:280,
    alias: 'widget.studentdiscountgrid',
    scrollable:true,
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },    
    store:'StudentDiscount',
    initComponent: function() {

    this.columns=[
    Ext.create('Ext.grid.RowNumberer'),
    {// discountname , fee_name , discountmodetext , discount
        header: 'Discount Name',
        dataIndex:'discountname',
        width :'25%',
        style :'color:#17385B;font-weight:bold'
    },
    {
        header:'Fee Name',
        dataIndex:'fee_name',
        width :'15%',
        style :'color:#17385B;font-weight:bold'
    },
    {
        header:'Fixed Amount/Percent',
        dataIndex:'discountmodetext',
        width :'15%',
        style :'color:#17385B;font-weight:bold'
    },
    { 
        header:'Amount/Percent',
        dataIndex:'discount',
        style :'color:#17385B;font-weight:bold',
        width :'15%',
    },{ 
        header:'Discount Amount/Percent',
        dataIndex:'include',
        xtype:'checkcolumn',
        style :'color:#17385B;font-weight:bold',
        stopSelection: false,
        width :'15%',
        listeners :{
            checkchange: function(box, rowIndex,checked,eOpts ){
            }
        }    
    }
    ];

    /*this.tbar =[{
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
