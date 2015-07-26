Ext.define('Ext.calendar.data.MemoryCalendarStore', {
    extend: 'Ext.data.Store',
    model: 'Ext.calendar.data.CalendarModel',
    requires: [
        'Ext.calendar.data.CalendarMappings',
        'Ext.calendar.data.CalendarModel'
    ],
    proxy: {
        type: 'rest',
        url:'mis/calendar',
        reader: {
            type: 'json',
            root: 'rows'
        },
        writer: {
            type: 'json'
        }
    },
    sorters: [{
            property: 'Title',
            direction: 'ASC'
    }],
    idProperty:'id',
    getColor: function(calId){
        var idx = this.find(Ext.calendar.data.CalendarMappings.CalendarId.name,calId);
        return idx==-1?'ddd':this.getAt(idx).data[Ext.calendar.data.CalendarMappings.ColorId.name];
    }
});