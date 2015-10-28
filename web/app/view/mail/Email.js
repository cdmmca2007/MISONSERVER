var templatedata=Ext.data.StoreManager.lookup(Ext.create('Ext.data.Store',{
    fields: ['name', 'subject','createdon','value','comment'],
    data: [
    {

        name: 'Parent Email',
        subject: 'Information about Student',
        createdon:new Date(),
        value:'<h3>Hi Mr Maksie</h3><br><br>Greeting from School Mgmt <br>This mail is ....',
        comment:'Mail will be sent to parent '
    },
    {

        name: 'Teacher Mail',
        subject: '',
        createdon:new Date(),
        value:'',
        comment:'Mail will be sent to Teacher '

    },{

        name: 'Payment Mail',
        subject: '',
        createdon:new Date(),
        value:'',
        comment:'Mail will be sent to person who Pay'

    },{

        name: 'Admin Mail',
        subject: '',
        createdon:new Date(),
        value:'',
        comment:'Mail will be sent to admin '

    }

    ]/*,
        filters: [{
         property: 'name',
         value: /Ed/
     }]*/
}));



Ext.define('MyApp.view.mail.Email' ,{
    extend: 'Ext.container.Container',
    alias: 'widget.maillist',
    closable:true,
    title: 'Email Template',
    id:'emailtemplate',
    layout:{
        type:'vbox',
        align:'stretch'
    },
    constructor : function(){

        this.callParent(arguments);
    },
    initComponent: function() {
       
        this.items=[
        {
            xtype:'grid',
            store:templatedata,
            title:'Template Grid',
            layout:'fit',
            height :200,
            closable:true,

            vieConfig:{
                forceFit:true
            },
            columns:[
            Ext.create('Ext.grid.RowNumberer'),
            {
                header: 'Template Name',
                dataIndex: 'name'

            },
            {
                header: 'Subject Line',
                dataIndex: 'subject'

            },
            {
                header: 'Created on',
                dataIndex: 'createdon'

            },
            {
                header: 'Comment',
                dataIndex: 'comment'

            }

            ],
            selModel:Ext.create('Ext.selection.CheckboxModel',{
            singleSelect:true
            }),
            bbar : Ext.create('Ext.PagingToolbar', {
            store: this.store,
            displayInfo: true,
            displayMsg: 'Displaying users {0} - {1} of {2}',
            emptyMsg: "No user to display"
    })
        },{
            xtype:'htmleditor',
            enableColors: false,
            enableAlignments: false,
            height:400,
            value:'<h3>Hello Mr Maksie</h3><br>Greeting from School Mgmt <br>This mail is ....<br><br><br><br><br>This is Auto Genereated MAil.Dont reply to this mail<br><b>Thanks ,<br>School Administration</>'

        }
        ];

       // app.getController('Master').init();
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

