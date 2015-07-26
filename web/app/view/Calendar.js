Ext.define('MyApp.view.Calendar', {
    extend:'Ext.panel.Panel',
    requires:[
    'Ext.picker.Date',
    'Ext.calendar.util.Date',
    'Ext.calendar.CalendarPanel',
    'Ext.calendar.data.MemoryCalendarStore',
    'Ext.calendar.data.MemoryEventStore',
    'Ext.calendar.form.EventWindow'
    ],
    layout: 'fit',
    initComponent : function(){
        this.checkScrollOffset();
        this.items = [{
            id: 'app-center',
            title: '...', // will be updated to the current view's date range
            layout: 'border',
            listeners: {
                'afterrender': function(){
                    Ext.getCmp('app-center').header.addCls('app-center-header');
                }
            },
            items: [{
                id:'app-west',
                region: 'west',
                width: 179,
                border: false,
                layout:{
                    type:'vbox'
                },
                items: [{
                    xtype: 'datepicker',
                    id: 'app-nav-picker',
                    cls: 'ext-cal-nav-picker',
                    listeners: {
                        'select': {
                            fn: function(dp, dt){
                                Ext.getCmp('app-calendar1').setStartDate(dt);
                            },
                            scope: this
                        }
                    }
                },{
                    xtype:'grid',
                    store:this.calendarStore,
                    hideHeaders:true,
                    title:'Calendars',
                    width:170,
                    tools:[{
                        type:'plus',
                        tooltip: 'Click to add calendar',
                        scope:this,
                        handler: function(){
                            this.showAddCalendarWin(null, null);
                            this.clearMsg();
                        }
                    }],
                listeners: {
                    'itemdblclick': {
                        fn: function(vw, rec, el){
                            this.showAddCalendarWin(rec, el);
                            this.clearMsg();
                        },
                        scope: this
                    }
                },
                columns:[
                {
                    headers:'',
                    width:130,
                    dataIndex:'title',
                    renderer: function(value,md,record){
                        md.style="background:#"+record.data.color;
                        return value;
                    }
                },{
                    xtype:'actioncolumn',
                    width:30,
                    items: [{
                        icon   : 'resources/images/icons/delete.gif',  // Use a URL in the icon config
                        tooltip: 'Delete',
                        scope:this,
                        handler: function(grid, rowIndex, colIndex) {
                            var rec = grid.getStore().getAt(rowIndex);
                            var title=rec.data.title;
                            var me = this;
                            rec.destroy({
                                success:function(){
                                    Ext.example.msg('Calendar','Calendar {0} was deleted successfully.',title);
                                    grid.getStore().remove(rec);
                                    grid.getStore().commitChanges();
                                }
                            });             
                        }
                    }]
                }
                ] 
            }]
        },{
            xtype: 'calendarpanel',
            eventStore:this.eventStore,
            calendarStore: this.calendarStore,
            border: false,
            id:'app-calendar1',
            region: 'center',
            activeItem: 3, // month view
                    
            monthViewCfg: {
                showHeader: true,
                showWeekLinks: true,
                showWeekNumbers: true
            },
                    
            listeners: {
                'eventclick': {
                    fn: function(vw, rec, el){
                        this.showEditWindow(rec, el);
                        this.clearMsg();
                    },
                    scope: this
                },
                'eventover': function(vw, rec, el){
                //console.log('Entered evt rec='+rec.data.Title+', view='+ vw.id +', el='+el.id);
                },
                'eventout': function(vw, rec, el){
                //console.log('Leaving evt rec='+rec.data.Title+', view='+ vw.id +', el='+el.id);
                },
                'eventadd': {
                    fn: function(cp, rec){
                        this.showMsg('Event '+ rec.data.Title +' was added');
                    },
                    scope: this
                },
                'eventupdate': {
                    fn: function(cp, rec){
                        this.showMsg('Event '+ rec.data.Title +' was updated');
                    },
                    scope: this
                },
                'eventcancel': {
                    fn: function(cp, rec){
                    // edit canceled
                    },
                    scope: this
                },
                'viewchange': {
                    fn: function(p, vw, dateInfo){
                        if(this.editWin){
                            this.editWin.hide();
                        }
                        if(dateInfo){
                            // will be null when switching to the event edit form so ignore
                            Ext.getCmp('app-nav-picker').setValue(dateInfo.activeDate);
                            this.updateTitle(dateInfo.viewStart, dateInfo.viewEnd);
                        }
                    },
                    scope: this
                },
                'dayclick': {
                    fn: function(vw, dt, ad, el){
                        this.showEditWindow({
                            StartDate: dt,
                            IsAllDay: ad
                        }, el);
                        this.clearMsg();
                    },
                    scope: this
                },
                'rangeselect': {
                    fn: function(win, dates, onComplete){
                        this.showEditWindow(dates);
                        this.editWin.on('hide', onComplete, this, {
                            single:true
                        });
                        this.clearMsg();
                    },
                    scope: this
                },
                'eventmove': {
                    fn: function(vw, rec){
                        var mappings = Ext.calendar.data.EventMappings,
                        time = rec.data[mappings.IsAllDay.name] ? '' : ' \\a\\t g:i a';
                                
                        rec.commit();
                                
                        this.showMsg('Event '+ rec.data[mappings.Title.name] +' was moved to '+
                            Ext.Date.format(rec.data[mappings.StartDate.name], ('F jS'+time)));
                    },
                    scope: this
                },
                'eventresize': {
                    fn: function(vw, rec){
                        rec.commit();
                        this.showMsg('Event '+ rec.data.Title +' was updated');
                    },
                    scope: this
                },
                'eventdelete': {
                    fn: function(win, rec){
                        this.eventStore.remove(rec);
                        this.showMsg('Event '+ rec.data.Title +' was deleted');
                    },
                    scope: this
                },
                'initdrag': {
                    fn: function(vw){
                        if(this.editWin && this.editWin.isVisible()){
                            this.editWin.hide();
                        }
                    },
                    scope: this
                }
            }
        }]
    }]
    this.callParent(arguments); 
},
clearMsg: function(){
    Ext.fly('app-msg').update('').addCls('x-hidden');
},
showAddCalendarWin: function(rec, animateTarget){
    if(!this.editCal){
        this.editCal = Ext.create('Ext.calendar.form.CalendarWindow', {
            listeners: {
                'caladd': {
                    fn: function(cp, rec){
                        this.calendarStore.add(rec);
                        Ext.example.msg('Calendar','New Calendar added successfully.');
                        this.editCal.close();
                    },
                    scope: this
                },
                'calupdate': {
                    fn: function(cp, rec){
                        Ext.example.msg('Calendar','Calendar updated successfully.');
                        this.editCal.close();
                    },
                    scope: this
                }
            }
        });
    }
    this.editCal.show(rec, animateTarget);
},
showEditWindow : function(rec, animateTarget){
    if(!this.editWin){
        this.editWin = Ext.create('Ext.calendar.form.EventWindow', {
            calendarStore: this.calendarStore,
            listeners: {
                'eventadd': {
                    fn: function(win, rec){
                        win.hide();
                        rec.data.IsNew = false;
                        this.eventStore.add(rec);
                        this.eventStore.sync();
                        Ext.example.msg('Event','{0} was added', rec.data.Title);
                    },
                    scope: this
                },
                'eventupdate': {
                    fn: function(win, rec){
                        win.hide();
                        this.eventStore.sync();
                        rec.commit();
                        Ext.example.msg('Event','{0} was updated',rec.data.Title);
                    },
                    scope: this
                },
                'eventdelete': {
                    fn: function(win, rec){
                        this.eventStore.remove(rec);
                        this.eventStore.sync();
                        win.hide();
                        Ext.example.msg('Event','{0} was deleted',rec.data.Title);
                    },
                    scope: this
                },
                'editdetails': {
                    fn: function(win, rec){
                        win.hide();
                        Ext.getCmp('app-calendar1').showEditForm(rec);
                    }
                }
            }
        });
    }
    this.editWin.show(rec, animateTarget);
},
checkScrollOffset: function() {
    var scrollbarWidth = Ext.getScrollbarSize ? Ext.getScrollbarSize().width : Ext.getScrollBarWidth();
        
    // We check for less than 3 because the Ext scrollbar measurement gets
    // slightly padded (not sure the reason), so it's never returned as 0.
    if (scrollbarWidth < 3) {
        Ext.getBody().addCls('x-no-scrollbar');
    }
    if (Ext.isWindows) {
        Ext.getBody().addCls('x-win');
    }
},
updateTitle: function(startDt, endDt){
    var p = Ext.getCmp('app-center'),
    fmt = Ext.Date.format;
        
    if(Ext.Date.clearTime(startDt).getTime() == Ext.Date.clearTime(endDt).getTime()){
        p.setTitle(fmt(startDt, 'F j, Y'));
    }
    else if(startDt.getFullYear() == endDt.getFullYear()){
        if(startDt.getMonth() == endDt.getMonth()){
            p.setTitle(fmt(startDt, 'F j') + ' - ' + fmt(endDt, 'j, Y'));
        }
        else{
            p.setTitle(fmt(startDt, 'F j') + ' - ' + fmt(endDt, 'F j, Y'));
        }
    }
    else{
        p.setTitle(fmt(startDt, 'F j, Y') + ' - ' + fmt(endDt, 'F j, Y'));
    }
}
});

Ext.form.Basic.override({
    reset: function() {
        var me = this;
        // This causes field events to be ignored. This is a problem for the
        // DateTimeField since it relies on handling the all-day checkbox state
        // changes to refresh its layout. In general, this batching is really not
        // needed -- it was an artifact of pre-4.0 performance issues and can be removed.
        //me.batchLayouts(function() {
        me.getFields().each(function(f) {
            f.reset();
        });
        //});
        return me;
    }
});
