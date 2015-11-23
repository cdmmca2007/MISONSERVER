function saveSession(btn){
    
     var form = btn.up('window').down('form').getForm();

        if(form.isValid()){
            var obj = form.getValues();
            Ext.Ajax.request({
                url:'session/add.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    var rec = eval('('+res.responseText+')');
                    if(rec.routeid!=null){
                     Ext.Msg.alert('Success','Session added successfully');
                     app.getController('Route').getClassStore().add(rec);
                    }
                    else
                    Ext.Msg.alert('Failer','Unexpected Error Occured,Please Contact Admin');    
                 //   var rec = eval('('+res.responseText+')');
                 //   app.getController('Class').getClassStore().add(rec);
                }
            });
        }
    
}


var rec='';  

Ext.define('MyApp.view.student.CompleteProfile',{
    extend:'Ext.container.Container',
    alias:'widget.schooladmin',
    title:'Student Profile',
    closable:true,
    cls:'school',
    id:'studentprofile',
    //store :'SchoolAdmin',
    layout:{
        type:'vbox',
        align:'stretch'
    },    
    viewConfig:{
        forceFit:true
    },        

    initComponent: function() {
      
    this.items=[{
            xtype:'panel',
            extend: 'Ext.panel.Panel',
            title:'Student Information',
            store:'Master',
            id:'panel1',
            cls:'samainpanel',
            viewConfig:{
                forceFit:true
            },
            layout:{
               type:'hbox',
               align:'stretch'
            },
            flex:1,
            items:[
                 {
                         xtype:'panel',
                         extend: 'Ext.panel.Panel',
                         width :240,
                         height:300,
                         items:[{    
                            xtype:Ext.create('Ext.form.Panel', {
                            bodyPadding: 10,
                            readOnly:true,
                            items: [{  
                                xtype:'image',
                                width :180,
                                height:230,
                                src:'/MIS/img/'+this.currentRecord.data.image_path
                            }]
                            })
                            }]
                 },
                 {
                         xtype:'panel',
                         extend: 'Ext.panel.Panel',
                         width :'25%',
                         cls:'detailpanel', 
                         id :'studentdetailspanel',         
                         items:[{                                
                            xtype:Ext.create('Ext.form.Panel', {
                            id :'studentdetails',         
                            bodyPadding: 10,
                            cls:'detailform',
                            fieldDefaults: {
                                labelAlign: 'left',
                                labelWidth: 120,
                                anchor: '100%',
                                readOnly:true,
                                readOnlyCls:'readOnly'                                
                            },

                            items: [{
                                xtype: 'textfield',
                                name: 'name',
                                id  : 'name',
                                fieldLabel: 'Student Full Name',
                                height:15,                                
                                style :'color:#17385B;',
                                value:this.currentRecord.data.name
                            },{
                                xtype: 'textfield',
                                name: 'fname',
                                id  : 'fname',
                                fieldLabel: 'First Name',
                                height:15,                                
                                style :'color:#17385B;',
                                value:this.currentRecord.data.lname
                            },{
                                xtype: 'textfield',
                                name: 'mname',
                                id  : 'mname',
                                fieldLabel: 'Middle Name',
                                height:15,                                
                                style :'color:#17385B;',
                                value:this.currentRecord.data.mname
                            },{
                                xtype: 'textfield',
                                name: 'lname',
                                id  : 'lname',
                                fieldLabel: 'Last Name',
                                height:15,                                
                                style :'color:#17385B;',
                                value:this.currentRecord.data.lname
                            },{
                                xtype: 'textfield',
                                name: 'admissiondate',
                                id   : 'admissiondate',
                                fieldLabel: 'Admission Date',
                                height:15,                                
                                style :'color:#17385B;',
                                value:this.currentRecord.data.admissiondate
                            },{
                                xtype: 'textfield',
                                name : 'admissionno',
                                id   : 'admissionno',
                                fieldLabel: 'Admission No',
                                height:15,                                
                                style :'color:#17385B;',
                                value:this.currentRecord.data.admissionno
                            },{
                                xtype: 'textfield',
                                name: 'rollno',
                                id   : 'rollno',
                                fieldLabel: 'Roll Number',
                                height:15,                                
                                style :'color:#17385B;',
                                value:this.currentRecord.data.rollno
                            },{
                                xtype: 'textfield',
                                name: 'sessionname',
                                id   : 'sessionname',
                                fieldLabel: 'Session Name',
                                style :'color:#17385B;',
                                height:15,                  
                                value:this.currentRecord.data.sessionname             
                            },{
                                xtype: 'textfield',
                                name: 'classname',
                                id   : 'classname',
                                fieldLabel: 'Current-Class',
                                height:15,                                
                                style :'color:#17385B;',
                                value:this.currentRecord.data.classname
                            },{
                                xtype: 'textfield',
                                name: 'classteacher',
                                id   : 'classteacher',
                                fieldLabel: 'Class Teacher',
                                height:15,                                
                                style :'color:#17385B;',
                                value:this.currentRecord.data.classteacher
                            },{
                                xtype: 'textfield',
                                name: 'dob',
                                id   : 'dob',
                                fieldLabel: 'Date of Birth',
                                height:15,                                
                                style :'color:#17385B;',
                                value:this.currentRecord.data.dob
                            }
                            ]
                        })
                         }
                     ]
                   },{
                         xtype:'panel',
                         extend: 'Ext.panel.Panel',
                         width :'25%',
                         cls:'detailpanel', 
                         id :'parentdetailspanel',         
                         items:[{                                
                            xtype:Ext.create('Ext.form.Panel', {
                            id :'parentdetails',         
                            bodyPadding: 10,
                            cls:'detailform',
                            fieldDefaults: {
                                labelAlign: 'left',
                                labelWidth: 120,
                                anchor: '100%',
                                readOnly:true,
                                readOnlyCls:'readOnly'                                
                            },

                            items: [{
                                xtype: 'textfield',
                                name: 'fathername',
                                id  : 'fathername',
                                fieldLabel: 'Father Name',
                                height:15,                                
                                style :'color:#17385B;',
                                value:this.currentRecord.data.fathername
                            },{
                                xtype: 'textfield',
                                name: 'mothername',
                                id  : 'mothername',
                                fieldLabel: 'Mother Name',
                                height:15,                                
                                style :'color:#17385B;',
                                value:this.currentRecord.data.mothername
                            },{
                                xtype: 'textfield',
                                name: 'caretakername',
                                id  : 'caretakername',
                                fieldLabel: 'Care Taker Name',
                                height:15,                                
                                style :'color:#17385B;',
                                value:this.currentRecord.data.caretakername
                            },{
                                xtype: 'textfield',
                                name: 'parentemailid',
                                id  : 'parentemailid',
                                fieldLabel: 'Parent EmailId',
                                height:15,                                
                                style :'color:#17385B;',
                                value:this.currentRecord.data.parentemailid
                            },{
                                xtype: 'textfield',
                                name: 'alternateemailid',
                                id   : 'alternateemailid',
                                fieldLabel: 'Alternate Email-Id',
                                height:15,                                
                                style :'color:#17385B;',
                                value:this.currentRecord.data.alternateemailid
                            },{
                                xtype: 'textfield',
                                name : 'parentmobileno',
                                id   : 'parentmobileno',
                                fieldLabel: 'Parent Mobile No',
                                height:15,                                
                                style :'color:#17385B;',
                                value:this.currentRecord.data.parentmobileno
                            },{
                                xtype: 'textfield',
                                name: 'fatherhighestqualification',
                                id   : 'fatherhighestqualification',
                                fieldLabel: 'Father Qualification',
                                height:15,                                
                                style :'color:#17385B;',
                                value:this.currentRecord.data.fatherhighestqal
                            },{
                                xtype: 'textfield',
                                name: 'motherhighqal',
                                id   : 'motherhighqal',
                                fieldLabel: 'Mother Qualification',
                                style :'color:#17385B;',
                                height:15,                  
                                value:this.currentRecord.data.sessionname             
                            },{
                                xtype: 'textfield',
                                name: 'occupation',
                                id   : 'occupation',
                                fieldLabel: 'Father Occupation',
                                height:15,                                
                                style :'color:#17385B;',
                                value:this.currentRecord.data.occupation
                            },{
                                xtype: 'textfield',
                                name: 'annualincome',
                                id   : 'annualincome',
                                fieldLabel: 'Annual Income',
                                height:15,                                
                                style :'color:#17385B;',
                                value:this.currentRecord.data.annualincome
                            }
                            ]
                        })
                         }
                     ]
                   },{
                         xtype:'panel',
                         extend: 'Ext.panel.Panel',
                         width :'25%',
                         cls:'detailpanel', 
                         id :'studentextradetailspanel',         
                         items:[{                                
                            xtype:Ext.create('Ext.form.Panel', {
                            id :'studentextradetail',         
                            bodyPadding: 10,
                            cls:'detailform',
                            fieldDefaults: {
                                labelAlign: 'left',
                                labelWidth: 120,
                                anchor: '100%',
                                readOnly:true,
                                readOnlyCls:'readOnly'                                
                            },

                            items: [{
                                xtype: 'textfield',
                                name: 'address',
                                id  : 'address',
                                fieldLabel: 'Address',
                                height:15,                                
                                style :'color:#17385B;',
                                value:this.currentRecord.data.address
                            },{
                                xtype: 'textfield',
                                name: 'religion',
                                id  : 'religion',
                                fieldLabel: 'Religion',
                                height:15,                                
                                style :'color:#17385B;',
                                value:this.currentRecord.data.religion
                            },{
                                xtype: 'textfield',
                                name: 'cityid',
                                id  : 'cityid',
                                fieldLabel: 'City',
                                height:15,                                
                                style :'color:#17385B;',
                                value:this.currentRecord.data.cityid
                            },{
                                xtype: 'textfield',
                                name: 'stateid',
                                id  : 'stateid',
                                fieldLabel: 'State',
                                height:15,                                
                                style :'color:#17385B;',
                                value:this.currentRecord.data.stateid
                            },{
                                xtype: 'textfield',
                                name: 'gender',
                                id   : 'gender',
                                fieldLabel: 'Gender',
                                height:15,                                
                                style :'color:#17385B;',
                                value:this.currentRecord.data.gender
                            },{
                                xtype: 'textfield',
                                name : 'blood_group',
                                id   : 'blood_group',
                                fieldLabel: 'Blood Group',
                                height:15,                                
                                style :'color:#17385B;',
                                value:this.currentRecord.data.blood_group
                            },{
                                xtype: 'textfield',
                                name: 'nationality',
                                id   : 'nationality',
                                fieldLabel: 'Nationality',
                                height:15,                                
                                style :'color:#17385B;',
                                value:this.currentRecord.data.nationality
                            },{
                                xtype: 'textfield',
                                name: 'mother_tounge',
                                id   : 'mother_tounge',
                                fieldLabel: 'Mother Tounge',
                                style :'color:#17385B;',
                                height:15,                  
                                value:this.currentRecord.data.mother_tounge             
                            },{
                                xtype: 'textfield',
                                name: 'passportno',
                                id   : 'passportno',
                                fieldLabel: 'Passport NO',
                                height:15,                                
                                style :'color:#17385B;',
                                value:this.currentRecord.data.passportno
                            },{
                                xtype: 'textfield',
                                name: 'uid',
                                id   : 'uid',
                                fieldLabel: 'UID',
                                height:15,                                
                                style :'color:#17385B;',
                                value:this.currentRecord.data.uid
                            }
                            ]
                        })
                         }
                     ]
                   }
               ]            
        },{            
            xtype:'panel',
            extend: 'Ext.panel.Panel',
            id:'pane2',
            cls:'samainpanel',
            viewConfig:{
                forceFit:true
            },
            flex:1,
            layout:{
               type:'hbox',
               align:'stretch'
            },
            items:[
                   {
                         xtype:'panel',
                         extend: 'Ext.panel.Panel',
                         cls:'detailpanel', 
                         
                         width :'25%',
                         items:[{                                
                            xtype:Ext.create('Ext.form.Panel', {
                            id :'extradetails',         
                            bodyPadding: 10,
                            cls:'detailform',
                            fieldDefaults: {
                                labelAlign: 'left',
                                labelWidth: 90,
                                anchor: '100%',
                                readOnly:true,                                
                                readOnlyCls:'readOnly'                                
                                
                            },

                            items: [{
                                xtype: 'textfield',
                                name: 'ud',
                                id: 'ud',
                                fieldLabel: 'UID Number',
                                height:16,                                
                                style :'color:#17385B;font-weight:bold'
                            }
                            ]
                        })
                         }
                     ]
                   },
                   {
                         xtype:'panel',
                         extend: 'Ext.panel.Panel',
                         width :'25%',
                         cls:'detailpanel', 
                         items:[{    
                            
                            xtype:Ext.create('Ext.form.Panel', {
                            id :'othersform',         
                            cls:'detailform',
                            bodyPadding: 10,
                            fieldDefaults: {
                                labelAlign: 'left',
                                labelWidth: 90,
                                anchor: '100%',
                                readOnly:true,
                                readOnlyCls:'readOnly'                                
                                
                            },

                            items: [{
                                xtype: 'textfield',
                                name: 'starttime',
                                id: 'starttime',
                                fieldLabel: 'Start Time',
                                height:16,                                
                                style :'color:#17385B;font-weight:bold'
                            },{
                                xtype: 'textfield',
                                name: 'endtime',
                                id: 'endtime',
                                fieldLabel: 'End Time',
                                height:16,                                
                                style :'color:#17385B;font-weight:bold'
                            },{
                                xtype: 'textfield',
                                name: 'totnoofperiod',
                                id: 'totnoofperiod',
                                fieldLabel: 'Total No OF Period',
                                height:16,                                
                                style :'color:#17385B;font-weight:bold'
                            },{
                                xtype: 'textfield',
                                name: 'maxschstanderd',
                                id: 'maxschstanderd',
                                fieldLabel: 'Max School Standerd',
                                style :'color:#17385B;font-weight:bold'
                            },{
                                xtype: 'textfield',
                                name: 'minstandered',
                                id: 'minstandered',
                                fieldLabel: 'Min School Standerd',
                                height:16,                                
                                style :'color:#17385B;font-weight:bold'
                            }
                            ]
                        })
                         }
                     ]
                   },
                   {  
                         xtype:'panel',
                         extend: 'Ext.panel.Panel',
                         width :'25%', 
                         cls:'detailpanel', 
                         items:[{    
                            id :'form-6',    
                            
                            xtype:Ext.create('Ext.form.Panel', {
                            bodyPadding: 10,
                            cls:'detailform',
                            style :'border :none',
                            fieldDefaults: {
                                labelAlign: 'left',
                                labelWidth: 90,
                                anchor: '100%'
                            },

                            items: [{
                                xtype: 'radiofield',
                                name: 'smsalert',
                                id: 'smsalert',
                                fieldLabel: 'Enable SMS Alert',                                
                                style :'color:#17385B;font-weight:bold'
                            },{
                                xtype: 'radiofield',
                                name: 'emailalert',
                                id: 'emailalert',
                                fieldLabel: 'Enable Email Alert',
                                style :'color:#17385B;font-weight:bold'
                            }
                            ]
                        })}
                     ]
                   }
            ]
       }];
       
       this.setAllData();
       this.callParent(arguments);
    },
    onRender : function(){
        this.callParent(arguments);
    },
    selectionchange : function(sm, selected,eOpts){
        if(sm.getCount()){
              
    }            
    },
    setAllData:function(){
        var rec;
        Ext.Ajax.request({
                url:'schooladmin/get.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                success: function(res){
                    
                     rec = eval('('+res.responseText+')');                                          
                     this.currentRecord , this.currentRecord
                     Ext.getCmp('name').setValue(this.currentRecord.data.name);                      
                     Ext.getCmp('fname').setValue(this.currentRecord.data.fname); 
                     Ext.getCmp('mname').setValue(this.currentRecord.data.mname); 
                     Ext.getCmp('lname').setValue(this.currentRecord.data.lname); 
                     Ext.getCmp('admissionno').setValue(this.currentRecord.data.admissionno); 
                     Ext.getCmp('rollno').setValue(this.currentRecord.data.rollno); 
                     Ext.getCmp('admissiondate').setValue(this.currentRecord.data.admissiondate); 
                 /*    Ext.getCmp('').setValue(this.currentRecord.data.addressline2); 
                     Ext.getCmp('').setValue(this.currentRecord.data.city); 
                     Ext.getCmp('').setValue(this.currentRecord.data.state); 
                     Ext.getCmp('').setValue(this.currentRecord.data.country); 
                     Ext.getCmp('').setValue(this.currentRecord.data.pinnumber); 
                     Ext.getCmp('').setValue(this.currentRecord.data.contact1); 
                     Ext.getCmp('').setValue(this.currentRecord.data.contact2); 
                     Ext.getCmp('').setValue(this.currentRecord.data.contact3); 
                     Ext.getCmp('').setValue(this.currentRecord.data.emailid1); 
                     Ext.getCmp('').setValue(this.currentRecord.data.emailid2); 
                     Ext.getCmp('').setValue(this.currentRecord.data.affiliationwith); 
                     Ext.getCmp('').setValue(this.currentRecord.data.affilationdate); 
                     Ext.getCmp('').setValue(this.currentRecord.data.schoolgrade); 
                     Ext.getCmp('').setValue(this.currentRecord.data.starttime); 
                     Ext.getCmp('').setValue(this.currentRecord.data.endtime); 
                     Ext.getCmp('').setValue(this.currentRecord.data.totnoofperiod); 
                     Ext.getCmp('').setValue(this.currentRecord.data.maxschstanderd); 
                     Ext.getCmp('').setValue(this.currentRecord.data.minstandered); 
                     Ext.getCmp('').setValue(this.currentRecord.data.totnoofperiod);                     
                     Ext.getCmp('').setValue(this.currentRecord.data.totnoofperiod); */
                   
                }  
            });
    }        
    
});

