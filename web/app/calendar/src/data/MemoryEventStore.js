Ext.define('Ext.calendar.data.MemoryEventStore', {
    extend: 'Ext.data.Store',
    model: 'Ext.calendar.data.EventModel',
    
    requires: [
        'Ext.calendar.data.EventModel',
        'Ext.calendar.data.EventMappings'
    ],
    proxy: {
        type: 'rest',
        url:'mis/event',
        reader: {
            type: 'json',
            root: 'rows'
        },
        writer: {
            type: 'json'
        }
    },
    sorters:[{
            property: Ext.calendar.data.EventMappings.StartDate.name,
            direction: 'ASC'
        }],
    idProperty :Ext.calendar.data.EventMappings.EventId.name
});