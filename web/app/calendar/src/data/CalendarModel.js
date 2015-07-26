Ext.define('Ext.calendar.data.CalendarModel', {
    extend: 'Ext.data.Model',
    
    requires: [
        'Ext.util.MixedCollection',
        'Ext.calendar.data.CalendarMappings'
    ],
    fields:[Ext.calendar.data.CalendarMappings.CalendarId,
        Ext.calendar.data.CalendarMappings.Title,
        Ext.calendar.data.CalendarMappings.Description,
        Ext.calendar.data.CalendarMappings.ColorId,
        Ext.calendar.data.CalendarMappings.IsHidden
       ],
     proxy: {
        type: 'rest',
        url : 'mis/calendar'
    }
  });