Ext.define('MyApp.view.parent.ReportCardWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.reportcardview',
    bodyStyle: 'background:transparent;padding:5px 10px 10px;background:#FFF;font-size:11px',
    constructor: function(config) {

        this.callParent([Ext.apply({
            width: 700,
            height: 620, 
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
                         /*                            
                            if(x>0)
                             {   
                            var records = Ext.StoreManager.lookup('Notification').getAt(x-1);
                            x=x-1;
                            var tpl= this.getTemplate();
                            tpl.overwrite(this.body,records.data);
                             }
                         */    
                            }
                            
                        },{
                            text: 'Save Page',
                            action: 'save',
                            scope:this,                            
                            handler:function(){
                          
                            /*var count=Ext.StoreManager.lookup('Notification').getCount();
                            
                            if(x<count-1) {
                            var records = Ext.StoreManager.lookup('Notification').getAt(x+1);
                            x=x+1;
                            var tpl= this.getTemplate();
                            tpl.overwrite(this.body,records.data);
                            
                            }*/
                            
                            }
                        },{   
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
        '<center><fonr size=12px><b>School Information</b></font></center><br>',
        '<div style="overflow:auto;width:650px;">',
        '<div style="width:620px;float:left;height:120px">',
        '<div class="f-item"><div class="f-label"> <b>School Name</b> </div><font color=green><b>{schoolname}</b></font></div>',
        '<div class="f-item"><div class="f-label"> <b>Address </b> </div><font color=green><b>{addressline1} ,{addressline2} , {state},{city},{country}, {pinnumber}</b></font></div>',
        '<div class="f-item"><div class="f-label"> <b>Contact  </b> </div><font color=green><b>{contact1}, {contact2}</b></font></div>',        
        '<div class="f-item"><div class="f-label"> <b>Email       </b> </div><font color=green><b>{emailid1} , {websiteurl}   </b></font></div>',        
        '</div>',
        '</div>',
        '<div style="text-align:center;"><b>Student Information</b></div>',
        '<hr>',
        '<div style="overflow:auto;width:620px">',
        '<div style="width:320px;float:left;">',
        '<div class="f-item"><div class="f-label"> <b>Student Name</b> </div><font color=green><b>{studentname}</b></font></div>',
        '<div class="f-item"><div class="f-label"> <b>Father Name </b> </div><font color=green><b>{fathername}</b></font></div>',
        '<div class="f-item"><div class="f-label"> <b>Mother Name</b> </div><font color=green><b>{mothername}</b></font></div>',        
        '<div class="f-item"><div class="f-label"> <b>Addmission No </b> </div><font color=green><b>{addmission_no}</b></font></div>',        
        '</div>',
        '<div style="width:220px;float:left">',
           '<div class="f-label"><b>Class Name</b></div><font color=green><b>{session} , {classname}</b></font>',
        '</div>',
        '<div style="width:220px;float:left">',
           '<div class="f-label"><b>Class Teacher</b></div><font color=green><b>{teachername}</b></font>',
        '</div>',
        '<div style="width:220px;float:left">',
           '<div class="f-label"><b>Class Role Number</b></div><font color=green><b>{rollnumber}</b></font>',
        '</div>',
        '<div style="width:220px;float:left">',
           '<div class="f-label"><b>Class Ranking</b></div><font color=green><b>{rollnumber}</b></font>',
        '</div>',
        '</div>',
        '<table class="f-table-top">',
        '<tr class="p-row-header" style="border-bottom: 1px dashed #000000;"><th class="p-item-cell" style="width:200px"><span>Subject Name</span></th><th style="width:120px"><span>Max Mark</span></th><th style="width:120px"><span>Pass Mark</span></th><th style="width:120px"><span>Appearence</span></th><th style="width:180px"><span>Mark Obtained</span></th></tr>',
        '<tpl for="subjectmark">',
        '<tr class="p-row-item"><td class="p-item-cell" style="width:150px"><span>{subjectname}</span></td><td style="width:120px"><span>{maxmark}</span></td><td style="width:120px"><span>{passmark}</span></td><td style="width:120px"><span>{appeared}</span></td><td style="width:120px"><span>{markobtained}</span></td></tr>',
        '</tpl>',
        '</table>',
        '<table class="f-table-top">',
        '<tr class="p-row-item"><td class="p-item-cell" style="width:162px"><span><b>Exam Type</b></span></td><td style="width:150px"><span>{examtype}</span></td><td><span><b>Exam Name</b></span></td><td style="width:150px"><span>{examname}</span></td></tr>',        
        '<tr class="p-row-item"><td class="p-item-cell" style="width:162px"><span><b>Total Max Mark</b></span></td><td style="width:150px"><span>{totmaxmark}</span></td><td><span><b>Total Pass Mark</b></span></td><td style="width:150px"><span>{totpassmark}</span></td></tr>',
        '<tr class="p-row-item"><td class="p-item-cell" style="width:162px"><span><b>Total Obtained Mark</b></span></td><td style="width:150px"><span>{totobtained}</span></td><td  style="width:150px"><span><b>Percentage</b></span></td><td style="width:150px"><span>{percentage}</span></td></tr>',
        '</table>',
        '<br>',
        '<div style="width:220px;float:left">',
           '<div class="f-label"><b>Principal :</b></div><font color=green><b>{principalname}</b></font>',
        '</div>',
        '</div>'
        
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
        var data = this.reportCard;
        tpl.overwrite(this.body,this.data);
        
    },
     afterRender: function() {
        this.callParent();  
       
    },
    prepareData: function(){        
        
        this.data = {
            percentage:this.reportCard.percentage,
            classname:this.reportCard.classname,
            state:this.reportCard.state,
            emailid1:this.reportCard.emailid1,
            contact1:this.reportCard.contact1,
            contact2:this.reportCard.contact2,
            totobtained:this.reportCard.totobtained,
            totpassmark:this.reportCard.totpassmark,
            studentname:this.reportCard.studentname,
            city:this.reportCard.city,
            country:this.reportCard.country,
            examtype:this.reportCard.examtype,
            addressline2:this.reportCard.addressline2,
            schoolname:this.reportCard.schoolname,
            addressline1:this.reportCard.addressline1,
            session:this.reportCard.session,
            websiteurl:this.reportCard.websiteurl,
            totmaxmark:this.reportCard.totmaxmark,
            examname:this.reportCard.examname,
            pinnumber:this.reportCard.pinnumber,
            teachername:this.reportCard.teachername,
            addmission_no:this.reportCard.addmission_no,
            fathername   :this.reportCard.fathername,
            mothername   :this.reportCard.mothername,
            principalname:this.reportCard.principalname,
            subjectmark:[] 
            
        }; 
      for(var i=0;i<this.reportCard.subjectmark.length;i++){
            var r = this.reportCard.subjectmark[i];
            var obj={};
            obj['markobtained'] = r.markobtained;
            obj['maxmark'] = r.maxmark;
            obj['subjectname'] = r.subjectname;
            obj['comment'] = r.comment;
            obj['passmark'] = r.passmark;
            obj['appeared'] = r.appeared;
            this.data.subjectmark.push(obj);
        };  
    }
});
