Ext.define('MyApp.store.AttendanceSheet', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.AttendanceSheet',
    groupField:'month',
    proxy: {
        type: 'rest',
        url:'mis/attendancesheet',
        reader: {
            type: 'json',
            root: 'rows'
        },
        writer: {
            type: 'json'
        }
    },
    sorters:[{
            property: 'month',
            direction: 'DESC'
        }],
    idProperty :'id'
});