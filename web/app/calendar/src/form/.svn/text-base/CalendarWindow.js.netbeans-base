Ext.define('Ext.calendar.form.CalendarWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.caleditwindow',
    requires: [
        'Ext.calendar.data.CalendarModel',
        'Ext.calendar.data.CalendarMappings'
    ],
    constructor: function(config) {
        var formPanelCfg = {
            xtype: 'form',
            fieldDefaults: {
                msgTarget: 'side',
                labelWidth: 150
            },
            frame: false,
            bodyStyle: 'background:transparent;padding:5px 10px 10px;',
            bodyBorder: false,
            border: false,
            items: [{
                itemId: 'title',
                name: Ext.calendar.data.CalendarMappings.Title.name,
                fieldLabel: 'Calendar Name',
                xtype: 'textfield',
                allowBlank: false,
                emptyText: 'Event Title',
                anchor: '100%'
            },{
                xtype:'fieldcontainer',
                fieldLabel: 'Color',
                anchor: '100%',
                items:[{
                      xtype:'colorpicker',
                      width:200,
                       listeners: {
                        'select':{
                            fn: function(picker, selColor) {
                              this.activeRecord.set("color",selColor)
                            },
                            scope:this
                        }
                    },
                name: Ext.calendar.data.CalendarMappings.ColorId.name  
                }]
            },{
                name: Ext.calendar.data.CalendarMappings.Description.name,
                fieldLabel: 'Title',
                xtype: 'textarea',
                emptyText: 'calendar description',
                anchor: '100%'
            }]
        };
        this.callParent([Ext.apply({
            titleTextAdd: 'Add Event',
            titleTextEdit: 'Edit Event',
            width: 600,
            autocreate: true,
            border: true,
            closeAction: 'hide',
            modal: true,
            resizable: false,
            buttonAlign: 'left',
            savingMessage: 'Saving changes...',
            deletingMessage: 'Deleting event...',
            layout: 'fit',
    
            defaultFocus: 'title',
            onEsc: function(key, event) {
                        event.target.blur(); // Remove the focus to avoid doing the validity checks when the window is shown again.
                        this.onCancel();
                    },

            fbar: ['->',{
                text: 'Save',
                itemId:'save-btn',
                disabled: false,
                handler: this.onSave,
                scope: this
            },{
                text: 'Cancel',
                disabled: false,
                handler: this.onCancel,
                scope: this
            }],
            items: formPanelCfg
        },
        config)]);
    },

    // private
    initComponent: function() {
        this.callParent();

        this.formPanel = this.items.items[0];

        this.addEvents({
           caladd: true,
           calupdate: true,
           eventdelete: true,
           eventcancel: true,
           editdetails: true
        });
    },
    // private
    onEditDetailsClick: function(e){
        e.stopEvent();
        this.updateRecord(this.activeRecord, true);
        this.fireEvent('editdetails', this, this.activeRecord, this.animateTarget);
    },

    // private
    onCancel: function() {
        this.cleanup(true);
        this.fireEvent('eventcancel', this);
    },

    // private
    cleanup: function(hide) {
        if (this.activeRecord && this.activeRecord.dirty) {
            this.activeRecord.reject();
        }
        delete this.activeRecord;

        if (hide === true) {
            // Work around the CSS day cell height hack needed for initial render in IE8/strict:
            //var anim = afterDelete || (Ext.isIE8 && Ext.isStrict) ? null : this.animateTarget;
            this.hide();
        }
    },

    // private
    updateRecord: function(record, keepEditing) {
        var fields = record.fields,
            values = this.formPanel.getForm().getValues(),
            name, obj = {};

        fields.each(function(f) {
            name = f.name;
            if (name in values) {
                obj[name] = values[name];
            }
        });
        record.beginEdit();
        record.set(obj);
        
        if (!keepEditing) {
            record.endEdit();
        }

        return this;
    },
    
    // private
    onSave: function(btn){
        if(this.formPanel.form.isValid()){
           this.activeRecord.set(this.formPanel.getForm().getValues());
           this.activeRecord.save();
           this.fireEvent(btn.text=='Save' ? 'caladd' : 'calupdate', this, this.activeRecord);
           //this.activeRecord.commit();
        }
    },
    show: function(o, animateTarget) {
        var me = this;
        this.callParent([null, function(){
            me.titleField.focus(true);
        }]);
        this.saveButton.setText(o?'Update':'Save');
        this.setTitle( o? this.titleTextEdit: this.titleTextAdd);
        if (o) {
           this.formPanel.form.loadRecord(o);
           this.activeRecord = o;
        }else{
            this.activeRecord = Ext.create('Ext.calendar.data.CalendarModel');
            this.formPanel.form.reset();
        }
        return this;
    },
     afterRender: function() {
        this.callParent();       
        this.titleField = this.down('#title');
        this.saveButton = this.down('#save-btn');
    }
});


