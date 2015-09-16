Ext.define('MyApp.view.addmission.AdmissionPaymentReciept', {
    extend: 'Ext.window.Window',
    alias: 'widget.AdmissionPaymentRecieptwindow',
    bodyStyle: 'background:transparent;padding:5px 10px 10px;background:#FFF;font-size:11px',
    id:'AdmissionPaymentRecieptwindow',

    constructor: function(config) {

        this.callParent([Ext.apply({
            width: '70%',
            height: 600,
            autocreate: true,
            border: true,
            closeAction: 'hide',
            modal: true,
            resizable: false,
            buttonAlign : 'center',
            layout: 'fit',
            defaultFocus: 'title',
            onEsc: function(key, event){
                   event.target.blur(); // Remove the focus to avoid doing the validity checks when the window is shown again.
                   this.onCancel();
             },
                         buttons:[
                        {   
                            text: 'Download PDF',
                            action: 'download',
                            scope:this,                            
                            handler:function (){                              
                              document.getElementById("downloadrecdata").value=document.getElementById('contentmain').innerHTML;
                              document.getElementById("downloadfile").src=document.getElementById("downloadrec").submit();
                              
                            }
                        },{   
                            text: 'Priny',
                            action: 'print',
                            scope:this,                            
                            handler:function (){                              
                            }
                        }
                       ,{   
                            text: 'Cancel',
                            action: 'cancel',
                            scope:this,
                            handler:function(){
                                     this.hide();
                            }
                        },]
                        },
        
        
        config)]);
    },

    // private
    getTemplate: function(){
       var tpl = new Ext.XTemplate(
    '<div class="pmain" id="contentmain">',
    '<div class="pheader">',
    '    <div class="companyname">  Developer-Lab , Online School Fee Payment</div>',
    '    <div class="username">Current User : {username}</div>',
    '    <div class="username">Todays Date :  {date}</div>',
    '</div>    ',
    '        <hr class="linestyle" />        ',
    '<div class="pbody">',
    '    <div class="center">',
    '        <div class="schooldesc">',
    '            <table>',
    '                <tr>',
    '                    <td class="heading">School Name </td><td class="data">{schoolname}</td> <td class="heading">City</td><td class="data">{city}</td>'                        ,
    '                </tr>',
    '                <tr>',
    '                <td class="heading">Address</td><td class="data" colspan="3">{address}</td>',
    '                </tr>',
    '            </table>',
    '        </div>',
    '        <div class="studentdesc">',
    '            <table>',
    '                <tr>',
    '                  <td class="heading">Student Name </td><td class="data">{studentname}</td> <td class="heading">Class</td><td class="data">{classname}</td>                        ',
    '                </tr>',
    '                <tr>',
    '                <td class="heading">Father Name </td><td class="data">{fathername}</td> <td class="heading">Roll Number</td><td class="data">{admissionno}</td>                        ',
    '                </tr>',
    '                <tr>',
    '                <td class="heading">Address</td><td colspan="3" class="data">{studadd}</td>',
    '                </tr>',
    '            </table>',
    '        </div></hr>',
    '        <div class="feedesc">',
    '            <table>',
    '                <tr>',
    '                  <td class="heading">Payment For Month </td><td class="data">{month}</td> <td class="heading">Payment Date</td><td class="data">{duedate}</td>                        ',
    '                </tr>',
    '                <tr>',
    '                <td class="heading">Total Amount</td><td class="data">{totamount}</td> <td class="heading">Fee Description</td><td class="data"></td>                        ',
    '                </tr>                                      ',
    '                <tr>',
    '                    <td colspan="4" class="heading"><b style="color:#db6800"> Complete Fee Description</b></td>',
    '                </tr>',
    '                <tr>',
    '               <b><td class="heading">Fee name</td><td colspan="3" class="heading" align="center">Fee Amount</td></b>',
    '                </tr>',
    '<table class="f-table-top">',
    '<tr class="p-row-header" style="border-bottom: 1px dashed #000000;"><th class="p-item-cell" style="width:250px"><span>Fee Name</span></th><th style="width:150px"><span>Amount</span></th></tr>',
    '<tpl for="feedata">',
    '<tr class="p-row-item"><td class="p-item-cell" style="width:150px"><span>{feeName}</span></td><td style="width:150px"><span>{amount}</span></td></tr>',
    '</tpl>',
    '<tr class="p-row-header" style="border-bottom: 1px dashed #000000;"><th class="p-item-cell" style="width:250px"><span>Deduction</span></th><th style="width:150px"><span>Amount</span></th></tr>',
    '<tpl for="deduction">',
    '<tr class="p-row-item"><td class="p-item-cell" style="width:150px"><span>{feeName}</span></td><td style="width:150px"><span>{amount}</span></td></tr>',
    '</tpl>',
    '<tr class="p-row-item"><td class="p-item-cell" style="width:150px;font-weight:bold"><span>Total Fee</span></td><td style="width:150px"><span>{totamount}</span></td></tr>',
    '<tr class="p-row-item"><td class="p-item-cell" style="width:150px;font-weight:bold"><span>Fine Amount</span></td><td style="width:150px"><span>{fineamount}</span></td></tr>',
    '<tr class="p-row-item"><td class="p-item-cell" style="width:150px;font-weight:bold"><span>Discount Amount</span></td><td style="width:150px"><span>{discountamount}</span></td></tr>',
    '<tr class="p-row-item"><td class="p-item-cell" style="width:150px;font-weight:bold"><span>Total Payable Amount</span></td><td style="width:150px"><span>{netamount}</span></td></tr>',
    '</table>',
    '</div></div></div></div>'
       
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
        var data = this.paymentDetail.data;
        tpl.overwrite(this.body,this.data);
        
    },
     afterRender: function() {
        this.callParent();  
       
    },
    prepareData: function(){
        this.data = {
        studentname:this.paymentDetail.studentname,
        fineamount:this.paymentDetail.fineamount,
        
        netamount:this.paymentDetail.netamount,
        classname:this.paymentDetail.classname,
        state:this.paymentDetail.state,
        emailid1:this.paymentDetail.emailid1,
        contact1:this.paymentDetail.contact1,
        contact2:this.paymentDetail.contact2,
        admissionno:this.paymentDetail.addmission_no,
        totamount:this.paymentDetail.totamount,
        city:this.paymentDetail.city,
        country:this.paymentDetail.country,
        addressline2:this.paymentDetail.addressline2,
        username:SETTING.Users.name?SETTING.Users.name:null,
        schoolname:this.paymentDetail.schoolname,
        addressline1:this.paymentDetail.addressline1,
        websiteurl:this.paymentDetail.websiteurl,
        fathername:this.paymentDetail.fathername,
        month:Ext.Date.format(new Date(),'d-m-Y'),
        duedate:Ext.Date.format(new Date(),'d-m-Y'),
        pinnumber:this.paymentDetail.pinnumber,
        discountamount:this.paymentDetail.discountamount,
        date:Ext.Date.format(new Date(),'d-m-Y'),
        feedata:[]
        };
        for(var i=0;i< this.paymentDetail.feedata.length;i++){
            var r = this.paymentDetail.feedata[i];
            var obj={};
            obj['feeName'] = r.feeName;
            obj['amount'] = r.amount;
            this.data.feedata.push(obj);
        }
    }
});



 