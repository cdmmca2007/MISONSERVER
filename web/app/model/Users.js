Ext.define('MyApp.model.Users', {
    extend: 'Ext.data.Model',
    fields: [
    {
        name:'userId'
    },{
          name:'userName'  
    }, {
        name:'salutation'
    },

    {
        name:'name'
    },

    {
        name:'roleId',
        type : 'int'
    },

    {
        name:'role'
    },

    {
        name:'dob', 
        type:'int'
    },

    {
        name:'emailId'
    },

    {
        name:'contactNo'
    },

    {
        name:'address'
    },

    {
        name:'city'
    },

    {
        name:'gender'
    }
    ]
});



