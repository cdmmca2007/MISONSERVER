Ext.define('MyApp.view.addmission.AdmissionFeeWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.feepreview',
    bodyStyle: 'background:transparent;padding:5px 10px 10px;background:#FFF',
    constructor: function(config) {
//        this.panel = {
//            xtype: 'panel',
//            bodyStyle: 'background:transparent;padding:5px 10px 10px;',
//            bodyBorder: false,
//            border: false,
//            tpl:this.getTpl()
//        };
        this.callParent([Ext.apply({
            width: 700,
            autocreate: true,
            border: true,
            closeAction: 'destroy',
            modal: true,
            resizable: false,
            buttonAlign: 'left',
            layout: 'fit',
            defaultFocus: 'title',
            onEsc: function(key, event){
                   event.target.blur(); // Remove the focus to avoid doing the validity checks when the window is shown again.
                   this.onCancel();
             },

            fbar: ['->',
                   {  text: 'Confirm Payment & Print Reciept',
                    action: 'save',
                     scope:this
                   },
                   {xtype:'btncancel'}]//,
//            items: this.panel
        },
        config)]);
    },

    // private
    getTemplate: function(){
       var tpl = new Ext.XTemplate(
        '<hr>',
        '<div style="overflow:auto;width:650px">',
        '<div style="width:320px;float:left;height:100px">',
        '<div class="f-item"><div class="f-label">School Name</div>:{schoolname}</div>',
        '<div class="f-item"><div class="f-label">Address</div><div style="float:left;width:140px;">:{address}</div></div>',
        '</div>',
        '<div style="width:320px;float:left">',
           '<div class="f-label">Payment Date</div>:{date}',
        '</div>',
        '</div>',
        '<div style="text-align:center;">Fee Details for the period of {startDate} To {endDate}</div>',
        '<hr>',
        '<div style="overflow:auto;width:650px">',
        '<div style="width:320px;float:left;">',
        '<div class="f-item"><div class="f-label">Roll No:</div>{rollno}</div>',
        '<div class="f-item"><div class="f-label">Name:</div>{studentname}</div>',
        '<div class="f-item"><div class="f-label">Class:</div>{class}</div>',
        '</div>',
        '<div style="width:320px;float:left">',
        '<div class="f-item"><div class="f-label1">Bank Authorisation id</div>:{authid}</div>',
        '<div class="f-item"><div class="f-label1">Paid Using:</div>{bankname}</div>',
        '<div class="f-item"><div class="f-label1">Paid By:</div>{paidby}</div>',
        '</div>',
        '</div>',
        '<table class="f-table-top">',
        '<tr class="p-row-header" style="border-bottom: 1px dashed #000000;"><th class="p-item-cell" style="width:250px"><span>Fee Name</span></th><th style="width:150px"><span>Amount</span></th></tr>',
        '<tpl for="feedata">',
        '<tr class="p-row-item"><td class="p-item-cell" style="width:150px"><span>{feeName}</span></td><td style="width:150px"><span>{amount}</span></td></tr>',
        '</tpl>',
        '<tr class="p-row-header" style="border-bottom: 1px dashed #000000;"><th class="p-item-cell" style="width:250px"><span>Deduction</span></th><th style="width:150px"><span>Amount</span></th></tr>',
        '<tpl for="deduction">',
        '<tr class="p-row-item"><td class="p-item-cell" style="width:150px"><span>{feeName}</span></td><td style="width:150px"><span>{amount}</span></td></tr>',
        '</tpl>',
        '<tr class="p-row-item"><td class="p-item-cell" style="width:150px"><span>Total Fee</span></td><td style="width:150px"><span>{amount}</span></td></tr>',
        '</table>'
    );
        return tpl;
    },
    initComponent: function() {
        this.callParent();
        this.prepareData();
        //this.tplItem = this.items.items[0];
    },
    onRender: function(){
        this.callParent();
        var tpl = this.getTemplate();
        var data = this.templateDetailStore.data.items;
        tpl.overwrite(this.body,this.data);
        
    },
     afterRender: function() {
        this.callParent();  
       
    },
    prepareData: function(){
      //  var d = this.templateDetailStore.getRange();
        this.data = {
            schoolname:'Bamini High Scholl',
            startDate:'1-APR 2013',
            endDate:'31-APR-2013',
            rollno:'512',
            studentname:'Barun Kumar',
            'class':'Class X',
            authid:'1909898',
            bankname:'HDFC BANLK LTD',
            paidby:'Harish Rawat',
            address:'Ketunga, Po-Madupur<br/>Serailkela Kharswan<br>Jharkhand',
            date:Ext.Date.format(new Date(),'d-m-Y'),
            feedata:[]
        }
      /*  for(var i=0;i<d.length;i++){
            var r = d[i].data;
            var obj={};
            obj['feeName'] = r.name;
            obj['amount'] = r.amount;
            this.data.feedata.push(obj)
        }*/
        
    }
});


