var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 1
});

Ext.define('MyApp.view.addmission.PayAdmissionFee' ,{
    extend: 'Ext.grid.Panel',
    closable:false,
    id:'payadissionfeewindow',
    layout:'fit',
    width :580,
    height:400,
    alias: 'widget.payadissionfeewindow',
    scrollable:true,
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },    
    store:'PayAdmissionFee',
    plugins: [cellEditing],
    initComponent: function() {

    this.columns=[
    Ext.create('Ext.grid.RowNumberer'),
    {
        header: 'Fee Id',
        dataIndex:'fee_structure_id',
        style :'color:#17385B;font-weight:bold',
        hidden:true
    },
    {
        header:'Fee Name',
        dataIndex:'fee_name',
        width :'30%',
        style :'color:#17385B;font-weight:bold',
        readOnly:true
    },    
    {
        header:'Fee Type',
        dataIndex:'fee_type',
        width :'25%',
        style :'color:#17385B;font-weight:bold'
    },{
        header:'Fee Amount',
        dataIndex:'fee_amount',
        width :'25%',
        style :'color:#17385B;font-weight:bold'
    }/*,{
        header:'Fee',
        dataIndex:'fee_add',
        style :'color:#17385B;font-weight:bold;',
        width :'15%',
        value:0,
        renderer:function(value,meta,record){
              //return '<input type="button" style="margin-top: 2px;border: none;background-image:url('+BASE_URL+'resources/images/portal-icon/discussionform.jpg);" onclick=replyToParent("'+record.data.pid+'")><img  width="20px" height="20px" src="'+BASE_URL+'resources/images/portal-icon/discussionform.jpg"></button>';
              return '<center><img style="float:center;" src="'+BASE_URL+'resources/images/OK.png" onclick=replyToParent("'+record.data.fee_structure_id+'")></center>';
        }
    }*/,{
        header:'Remove Fee',
        dataIndex:'fee_remove',
        style :'color:#17385B;font-weight:bold;',
        width :'15%',
        value:0,
        renderer:function(value,meta,record){
              //return '<input type="button" style="margin-top: 2px;border: none;background-image:url('+BASE_URL+'resources/images/portal-icon/discussionform.jpg);" onclick=replyToParent("'+record.data.pid+'")><img  width="20px" height="20px" src="'+BASE_URL+'resources/images/portal-icon/discussionform.jpg"></button>';
              return '<center><img style="float:center;"  src="'+BASE_URL+'resources/images/delete.png" onclick=removeAdmissionFee("'+record.data.fee_structure_id+'")></center>';
        }
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


