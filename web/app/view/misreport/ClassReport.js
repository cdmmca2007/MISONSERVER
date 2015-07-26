Ext.define('MyApp.view.misreport.ClassReport' ,{
    extend: 'Ext.grid.Panel',
    closable:true,
    title: 'Complete Class Report',
    id:'classreport',
    layout:'fit',
    height :300,
    alias: 'widget.classreport',
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    }, 
    store:'ClassReport',
    initComponent: function() {
    this.columns =[
            Ext.create('Ext.grid.RowNumberer'),
           {
                header:'Session Name',
                dataIndex:'sessionname',
                style :'color:#17385B;font-weight:bold',
                width:'8%',
                renderer:function(value){
                    return '<font color=#17385B><b>'+value+'</b></font>';
                }
            },
            {
                header:'Class',
                dataIndex:'classname',
                style :'color:#17385B;font-weight:bold',
                width:'7%',
                renderer:function(value){
                    return '<font color=green><b>'+value+'</b></font>';
                }
            },
            {
                header:'Class Teacher',
                dataIndex:'classteacher',
                style :'color:#17385B;font-weight:bold',
                width:'10%',
                renderer:function(value){
                    return '<font color=green><b>'+value+'</b></font>';
                }
            },
            {
                header:'Tot Student',
                dataIndex:'totalstudent',
                style :'color:#17385B;font-weight:bold',
                width:'8%',
                renderer:function(value){
                    return '<font color=voilet><b>'+value+'</b></font>';
                } 
            },
            {
                header:'Pass Student',
                dataIndex:'totalpassstudent',
                style :'color:#17385B;font-weight:bold',
                width:'10%',
                renderer:function(value){
                    return '<font color=green><b>'+value+'</b></font>';
                }
            },{
                header:'Failed Student',
                dataIndex:'totalfailedstudent',
                style :'color:#17385B;font-weight:bold',
                width:'10%',
                renderer:function(value){
                    return '<font color=green><b>'+value+'</b></font>';
                }
            },{
                header:'Avg Result',
                dataIndex:'averageresult',
                style :'color:#17385B;font-weight:bold',
                width:'10%',
                renderer:function(value){
                    return '<font color=green><b>'+value+'</b></font>';
                }
            },{
                header:'Avg Attendance',
                dataIndex:'averageattendence',
                style :'color:#17385B;font-weight:bold',
                width:'10%',
                renderer:function(value){
                    return '<font color=green><b>'+value+'</b></font>';
                }
            },{
                header:'HW By Teacher',
                dataIndex:'totalhomeworkbyteacher',
                style :'color:#17385B;font-weight:bold',
                width:'10%',
                renderer:function(value){
                    return '<font color=green><b>'+value+'</b></font>';
                }
            },{
                header:'HW By Student',
                dataIndex:'homeworkdonebystudent',
                style :'color:#17385B;font-weight:bold',
                width:'10%',
                renderer:function(value){
                    return '<font color=green><b>'+value+'</b></font>';
                }
            },{
                header:'Extra Activity Envolvement',
                dataIndex:'extraactivityinvolment',
                style :'color:#17385B;font-weight:bold',
                width:'15%',
                renderer:function(value){
                    return '<font color=green><b>'+value+'</b></font>';
                }
            },{
                header:'D.D to Parent',
                dataIndex:'digitaldairytoparent',
                style :'color:#17385B;font-weight:bold',
                width:'10%',
                renderer:function(value){
                    return '<font color=green><b>'+value+'</b></font>';
                }
            },{
                header:'D.D to Teacher',
                dataIndex:'digitaldairytoteacher',
                style :'color:#17385B;font-weight:bold',
                width:'10%',
                renderer:function(value){
                    return '<font color=green><b>'+value+'</b></font>';
                }
            },{
                header:'Topper-1st',
                dataIndex:'topper1',
                style :'color:#17385B;font-weight:bold',
                width:'8%',
                renderer:function(value){
                    return '<font color=green><b>'+value+'</b></font>';
                }
            },{
                header:'Topper-2nd',
                dataIndex:'topper2',
                style :'color:#17385B;font-weight:bold',
                width:'8%',
                renderer:function(value){
                    return '<font color=green><b>'+value+'</b></font>';
                }
            },{
                header:'Topper-3rd',
                dataIndex:'topper3',
                style :'color:#17385B;font-weight:bold',
                width:'8%',
                renderer:function(value){
                    return '<font color=green><b>'+value+'</b></font>';
                }
            },{
                header:'Lowest %',
                dataIndex:'lowestpercentage',
                style :'color:#17385B;font-weight:bold',
                width:'8%',
                renderer:function(value){
                    return '<font color=green><b>'+value+'</b></font>';
                }
            },{
                header:'Payment Recived',
                dataIndex:'totalpaymentrecived',
                style :'color:#17385B;font-weight:bold',
                width:'10%',
                renderer:function(value){
                    return '<font color=green><b>'+value+'</b></font>';
                }
            },{
                header:'Payment Pending',
                dataIndex:'averageresult',
                style :'color:#17385B;font-weight:bold',
                width:'10%',
                renderer:function(value){
                    return '<font color=green><b>'+value+'</b></font>';
                }
            }
            ];
    this.selModel=Ext.create('Ext.selection.CheckboxModel',{
        singleSelect:true
    });
    this.tbar =[{
        xtype: 'searchfield',
        store: Ext.create('Ext.data.Store', {
            autoLoad: false,
            fields:['id','name'],
            proxy: {
                type: 'ajax',
                url: 'users.json',
                reader: {
                    type: 'json',
                    root: 'users'
                }
            }
        })
    },{
        xtype:'splitbutton',
        text:'Export Data',
        arrowAlign:'right',        
        menu: [{text: 'PDF'},{text: 'Excelsheet'}],
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    //addFeeTemplate();
                    });

            }
        }
    },{
        xtype:'button',
        text:'Print Report',
        iconCls: 'icon-add',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                  
                    //addFeeTemplate();
                    });

            }
        }
    }
    ];
    this.bbar = Ext.create('Ext.PagingToolbar', {
        store: this.store,
        displayInfo: true,
        displayMsg: 'Displaying users {0} - {1} of {2}',
        emptyMsg: "No user to display",
        items:[{
        xtype:'button',
        text:'Print',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    //addFeeTemplate();
                    });
            }
        }
    }]
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
