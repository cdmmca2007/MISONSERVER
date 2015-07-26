Ext.define('MyApp.store.MonthlyAttendance', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.MonthlyAttendance',
    proxy: {
        type: 'rest',
        url:'mis/monthlyattendance',
        reader: {
            type: 'json',
            root: 'rows'
        },
        writer: {
            type: 'json'
        }
    },
    sorters:[{
            property: 'rollNo',
            direction: 'ASC'
        }],
    idProperty :'id'
});