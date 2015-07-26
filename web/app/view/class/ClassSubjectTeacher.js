var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 1
});

Ext.define('MyApp.view.class.ClassSubjectTeacher' ,{
    extend: 'Ext.grid.Panel',
    closable:false,
    title: 'Class -> Subject ->Teacher Mapping',
    id:'clssubjtchergrid',
    layout:'fit',
    width :580,
    height:280,
    alias: 'widget.clssubjtchergrid',
    scrollable:true,
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },    
    store:'ClassSubjectTeacher',
    plugins: [cellEditing],
    initComponent: function() {


        this.teacherStore=Ext.create('MyApp.store.Combo');
        this.teacherStore.load({
            params:{propertyId:5}
        });

    this.columns=[
    Ext.create('Ext.grid.RowNumberer'),
    {
        header: 'Subject Id',
        dataIndex:'subjectid',
        width :150,
        style :'color:#17385B;font-weight:bold',
        hidden:true
    },
    {
        header:'Subject Name',
        dataIndex:'subjectname',
        width :180,
        style :'color:#17385B;font-weight:bold',
        readOnly:true
    },    
    {
            header     : 'Select Teacher',
            dataIndex  : 'teacherid',
            width :200,
            editor: {
                store  :this.teacherStore,
                xtype  : 'combo',
                allowBlank : false,
                triggerAction : 'all',
                queryMode :'local',
                valueField :'id',
                displayField :'value'
                
           },
            renderer : function(value){
                var record=this.teacherStore.findRecord('id',value);
                return record?record.data.value:'';
            }
     },{
        header:'Comment',
        dataIndex:'comment',
        width :200,
        style :'color:#17385B;font-weight:bold',
        editor: {
                xtype  : 'textfield'
        }
    }
    ];

    this.tbar =[{
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


