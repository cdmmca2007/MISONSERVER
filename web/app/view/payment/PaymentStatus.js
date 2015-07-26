var paydata=Ext.data.StoreManager.lookup(Ext.create('Ext.data.Store',{
        fields: ['studentid', 'name','Class','status','paymentdate','comment','duedate'],
        groupField:'Class',
        data: [
        {
            studentid: '1000',
            name: 'Kamlesh Sah',
            Class: '5-A',
            status: 'Paid',
            paymentdate:new Date(),
            comment:'Done',
            duedate:''//new Date()
        },
        {
            studentid: '1001',
            name: 'Chandra Deo',
            Class: '5-A',
            status: 'Paid',
            paymentdate:new Date(),
            comment:'Done',
            duedate:''//new Date()
        },{
            studentid: '2000',
            name: 'Sameer Sah',
            Class: '5-B',
            status: 'Paid',
            paymentdate:new Date(),
            comment:'Done',
            duedate:''//new Date()
        },{
            studentid: '2001',
            name: 'Pranesh Kumar',
            Class: '5-B',
            status: 'Not paid',
            paymentdate:new Date(),
            comment:'----',
            duedate:new Date()
        },{
            studentid: '3000',
            name: 'Rajesh Yadav',
            Class: '5-C',
            status: 'Paid',
            paymentdate:new Date(),
            comment:'Done',
            duedate:''//new Date()
        },{
            studentid: '4000',
            name: 'Mukesh Kumar',
            Class: '5-D',
            status: 'Not Paid',
            paymentdate:new Date(),
            comment:'----',
            duedate:new Date()
        },
        ]/*,
        filters: [{
         property: 'name',
         value: /Ed/
     }]*/
    }));

Ext.define('MyApp.view.payment.PaymentStatus' ,{
    extend: 'Ext.grid.Panel',
    closable:true,
    title: 'Payment Status',
    layout:'fit',
    features: [{ftype:'grouping'}],
    store:paydata,
    viewConfig:{
        forceFit:true
    },
    initComponent: function() {
        
    this.columns=[
    Ext.create('Ext.grid.RowNumberer'),
    {
        header: 'StudentID',
        dataIndex: 'studentid'
    },{
        header: 'Name',
        dataIndex: 'name'
    },/*{
        header: 'Class',
        dataIndex: 'Class'
    },*/{
        header: 'Status',
        dataIndex: 'status'
    },{
        header: 'PaymentDate',
        dataIndex: 'paymentdate'
    },{
        header: 'Comment',
        dataIndex: 'comment'
    },{
        header: 'DueDate',
        dataIndex: 'duedate'
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
       xtype:'combobox',
       fieldLabel :'Select Option',
       store:
               Ext.create('Ext.data.Store', {
               fields: ['abbr', 'name'],
               data : [
                       {"abbr":"AL", "name":"Paid"},
                       {"abbr":"AK", "name":"Not Paid"},
                       {"abbr":"AK", "name":"Defaulter"}
                      ]
        }),
        Autoload:true,
        queryMode: 'local',
        displayField: 'name',
        valueField: 'abbr'

    },{
       xtype:'button',
       text: 'Full Detail',     
       handler: function() {
        alert('Please Select the row to view full detail');
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

