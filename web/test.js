
Ext.application({
   launch: function() {
        Ext.create('Ext.container.Viewport',{
            items:[
                {
                    xtype:'panel',
                    title:'test',
                    width:230,
                    layout:'fit',
                    items:{
                         xtype:'attendanceportal'
                    }
                   
                }
            ]
        })
    }
});

