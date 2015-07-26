var paymentdata=Ext.create('Ext.data.Store',{
    fields: [ {
        name:'month'
    },
    {
        name:'paidon'
    },
    {
        name:'paidby'
    },
    {
        name:'relation'
    },
    {
        name:'totalfee'
    },
    {
        name:'paidamount'
    },
    {
        name:'fineamount'
    },
    {
        name:'finedescription'
    },
],
    data: [{
        month:'April',
        paidon:new Date(),
        paidby:'David Otham',
        relation:'Father',
        totalfee:'5000',
        paidamount:'5000',
        fineamount:'0',
        finedescription:'---'
    },{
        month:'May',
        paidon:new Date(),
        paidby:'David Otham',
        relation:'Father',
        totalfee:'5000',
        paidamount:'5000',
        fineamount:'0',
        finedescription:'---'
    },{
        month:'June',
        paidon:new Date(),
        paidby:'Marry Otham',
        relation:'Mother',
        totalfee:'5000',
        paidamount:'5050',
        fineamount:'50',
        finedescription:'5 day late fine'
    },{
        month:'July',
        paidon:new Date(),
        paidby:'David Otham',
        relation:'Father',
        totalfee:'5000',
        paidamount:'5000',
        fineamount:'0',
        finedescription:'---'
    },{
        month:'Aug',
        paidon:new Date(),
        paidby:'Julie',
        relation:'Care Taker',
        totalfee:'5000',
        paidamount:'5000',
        fineamount:'0',
        finedescription:'---'
    }
    ]
});


Ext.define('MyApp.view.payment.PaymentHistory' ,{
    extend: 'Ext.grid.Panel',
    closable:true,
    title: 'Paid Payment Details',
    layout:'fit',
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },
    columns:[
    Ext.create('Ext.grid.RowNumberer'),
    {
        header: 'Month',
        dataIndex:'month'
    },

    {
        header:'Payment Date',
        dataIndex:'paidon'
    },

    {
        header:'Paid By',
        dataIndex:'paidby'
    },

    {
        header:'Relation',
        dataIndex:'relation'
    },

    {
        header:'Total Fees',
        dataIndex:'totalfee'
    },

    {
        header:'Paid Amount',
        dataIndex:'paidamount'
    },

    {
        header:'Fine Amount',
        dataIndex:'fineamount'
    },

    {
        header:'Fee Description',
        dataIndex:'feedescription'
    }
    ],
    store:paymentdata/*Ext.create('Ext.data.Store',{
        fields: [ {name:'studentId'},
        {name:'name'},
        {name:'dob'},
        {name:'address'},
        {name:'father_name'},
        {name:'mother_name'},
        {name:'caretaker_name'},
        {name:'parent_email_id'},
        {name:'parent_mobile'},
        {name:'alternate_emailid'},
        {name:'class_id'},
        {name:'school_id'},
        {name:'created_by'},
        {name:'created_on'},
        {name:'modified_by'},
        {name:'modified_on'}],
        data: [

        ]
    })*/,
    selModel:Ext.create('Ext.selection.CheckboxModel',{
        singleSelect:true
    }),
    tbar :[{
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
        xtype:'button',
        text:'Full Detail',       
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    //addFeeTemplate();
                    })

            }
        }
    },{
        xtype:'button',
        text:'Print',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    //addFeeTemplate();
                    })

            }
        }
    },{
        xtype:'splitbutton',
        text:'Export Data',
        arrowAlign:'right',
        menu: [{ text: 'PDF' },{ text: 'Excelsheet' }],
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    //addFeeTemplate();
                    })

            }
        }
    }
    ],
    bbar : Ext.create('Ext.PagingToolbar', {
        store: this.store,
        displayInfo: true,
        displayMsg: 'Displaying users {0} - {1} of {2}',
        emptyMsg: "No user to display"
        
    }),
    initComponent: function() {
        //
        //        this.selModel = Ext.create('Ext.selection.CheckboxModel',{
        //            singleSelect:true
        //        });
        //        this.bbar = Ext.create('Ext.PagingToolbar', {
        //            store: this.store,
        //            displayInfo: true,
        //            displayMsg: 'Displaying users {0} - {1} of {2}',
        //            emptyMsg: "No user to display"
        //        }),
        //app.getController('Master').init();
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




