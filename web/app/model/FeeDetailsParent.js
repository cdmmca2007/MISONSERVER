Ext.define('MyApp.model.FeeDetailsParent', {
        extend: 'Ext.data.Model',
        fields: [
            { name: 'studentname' },
            { name: 'classname' },
            { name: 'duedate' },
            { name: 'totamount' },
            { name: 'fineamount' },
            { name: 'frommonth' },
            { name: 'tomonth' }
        ],
        hasMany: {
            model: 'MyApp.model.FeeStructure',
            name: 'feestructure'
        }
    });