var currentItem;


function reLoadAdmissionList(){
    var sessionid=Ext.getCmp('admisnstudsession').getValue();
    var classid  =Ext.getCmp('admsnstudclasscombo').getValue();                                
    if(sessionid!=null && classid!=null)    
    {
         Ext.getCmp('admissionstudentgrid').getStore().reload({
         params:{                             
                 classid   :classid ,
                 sessionid :sessionid
         }
         });
    } 
}

function generateAdmissionFeeReceipt(sessionid,classid,rec){
    
    if(rec.data.feepaid==0){
        Ext.Msg.alert('Warning','Fee receipt can not be generated ,Admission not confirm yet/ Fee Not Paid');   
    }
    else
    {
     var data={
                    'studentid':rec.data.studentid,
                    'templateid':rec.data.templateid
              };   
     Ext.Ajax.request({
                    url:'admission/paymtrecipt.do',
                    type:'json',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    params:Ext.JSON.encode(data),
                    success: function(res){
                        var alldata = eval('('+res.responseText+')');
                        
                       
                        Ext.create
                        ('MyApp.view.addmission.AdmissionPaymentReciept',{
                                    title:'Admission Fee Payment Reciept',
                                    paymentDetail:alldata
                                    
                        }).show();
                    }
     }); 
    }
}


function payFee(sessionid,classid,rec){

    var win=Ext.getCmp('admissionfee_win');
    if(!win){
        win = Ext.create('Ext.app.view.component.AppWindow', {
            title:'Admission Fee Form',
            id: 'admissionfee_win',
            width:400,
            closeAction:'hide',
            top:{
                image:BASE_URL+'resources/images/portal-icon/fee_struc.jpg',
                formTitle:'Select the Fee Template to Generate the admission fee for <b>'+rec?rec.data.name:''+'</b>'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:300,
                labelWidth:130
            },
            formItems :[
            {
                name : 'studentid',
                id:'studentid',
                value:rec?rec.data.studentid:null,
                hidden:true
            },    
            {
                name : 'sessionid',
                fieldLabel: 'SessionName',
                id:'sessionid',
                value:sessionid,
                hidden:true
            },
            {
                name : 'status',
                id:'status',
                value:rec?rec.data.status:null,
                hidden:true
            },
            {
                name : 'classid',
                fieldLabel: 'classid',
                id:'classid',
                value:classid,
                hidden:true
            }, {
                xtype:'combobox',
                fieldLabel :'Select Fee Template',
                id:'templateid',
                name:'templateid',
                store:Ext.create('MyApp.store.Combo').load({
                                      params:{propertyId:6}}),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select a Fee Template...',
                Autoload:true,               
                valueField :'id',
                displayField :'value'
            }
                   
            ],
            buttons :[
            {
                text: 'Submit',
                action: 'Send',
                scope:this,
                handler:payAdmissionFee
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
    
} 
 
function payAdmissionFee(btn) {
    
        var subjectstore = Ext.StoreManager.lookup('PayAdmissionFee');
        var form = btn.up('window').down('form').getForm();
        var obj = form.getValues();           
               if(obj.status!=="Confirm"){
                                    Ext.Msg.alert('Success','Fee Can not be generated ,Admission not confirm yet');   
               }
                else{
        
                var data={
                    'studentid':obj.studentid,
                    'templateid':obj.templateid
                };
                var win;
                if(!win){
                    win=Ext.create('Ext.window.Window', {
                        title:'Pay Admission Fee',
                        id:'payadmissionfeegridwindow',
                        width:600,
                        height:400,
                        closeAction:'destroy',
                        top:{
                            image:BASE_URL+'resources/images/portal-icon/fee_struc.jpg',
                            formTitle:'Admission Fee Payment'
                        },
                        defaults:{
                            xtype:'textfield',
                            value:'',
                            width:580
                        },
                        items :[
                          {
                              xtype: 'fieldcontainer',
                              combineErrors: true,
                              layout: 'hbox',
                              items: [
                                   {
                                    xtype:Ext.create('MyApp.view.addmission.PayAdmissionFee'),                        
                                    store:Ext.StoreManager.lookup('PayAdmissionFee').load({
                                                  params:{   'studentid':obj.studentid,
                                                             'templateid':obj.templateid
                                    }
                                    })
                              }]
                          } 
                        ],
                        buttons :[
                        {
                            text: 'Add More Fee',
                            action: 'save',
                            iconCls: 'icon-add',
                            scope:this,
                            listeners:{
                            render: function(component){
                            component.getEl().on('click', function(){                                        
                                var win;
                                if(!win){
                                    win = Ext.create('Ext.app.view.component.AppWindow', {
                                        title:'<font color=#17385B><b>Additional Fee Details</b></font>',
                                        id: 'addadminfee_win',
                                        width:400,
                                        closeAction:'destroy',
                                        top:{
                                            image:BASE_URL+'resources/images/portal-icon/fee_struc2.jpg',
                                            formTitle:'Add Addtional Fee to Admission fee'
                                        },
                                        defaults:{
                                            xtype:'textfield',
                                            value:'',
                                            width:350
                                        },
                                        formItems :[
                                        {
                                            xtype:'combobox',
                                            fieldLabel :'Select Fee',
                                            id:'selectfeestuc',
                                            emptyText: 'Select',       
                                            store:Ext.create('MyApp.store.Combo').load({
                                                                  params:{propertyId:8}}),
                                            Autoload:true,
                                            queryMode: 'local',
                                            displayField: 'value',
                                            valueField: 'id',
                                            name:'feetype'
                                       },
                                       {
                                            name : 'feename',
                                            fieldLabel: 'Fee Name',
                                            id:'feename',
                                            emptyText: 'In Case Fee not Present'       ,
                                            hidden:true
                                       },
                                       {
                                            name : 'feeamount',
                                            fieldLabel: 'Fee Amount',
                                            id:'feeamount',
                                            hidden:true
                                        }                                        
                                        ],
                                        buttons :[
                                        {
                                            text: 'Add',
                                            action: 'save',
                                            scope:this,
                                            listeners:{
                                            render: function(component){
                                            component.getEl().on('click', function(){                                        
                                                
                                            var grid = Ext.getCmp('payadissionfeewindow');
                                            //grid.getStore().remove(grid.getSelectionModel().getSelection());
                                            if(Ext.getCmp('selectfeestuc').getValue()!=null) {
                                             
                                            var fee=Ext.getCmp('selectfeestuc').getRawValue();
                                            var fee_amount=fee.substring(fee.lastIndexOf(' / ')+3,fee.lastIndexOf(' - '));
                                            var fee_name=fee.substring(1,fee.lastIndexOf(' / '));
                                            var fee_type=fee.substring(fee.lastIndexOf(' - ')+3,fee.length);
                                                
                                            var data={  
                                                           'fee_structure_id':Ext.getCmp('selectfeestuc').getValue(),
                                                           'fee_amount':fee_amount,
                                                           'fee_type'  :fee_type,
                                                           'fee_name'  :fee_name
                                                          }  
                                            grid.getStore().add(data); 
                                            }else{
                                              Ext.Msg.alert('Warning','Please Select Fee from List to add');                   
                                            }
                                            /*my_store.add(record);
                                            my_store.commitChanges();              */
                                             });
                                            }
                                          } 
                                        },
                                        {xtype:'btncancel'}
                                        ]
                                    });
                                }
                                win.show();
                             });
                            }
                          }
                        },    
                        {
                            text: 'Comfirm Payment',
                            action: 'save',
                            iconCls: 'icon-confirm',
                            scope:this,
                            listeners:{
                            render: function(component){
                            component.getEl().on('click', function(){   
                                var id=currentItem.getId();
                                var rec=Ext.getCmp(id).getSelectionModel().getSelection()[0];
                                var records=Ext.StoreManager.lookup('PayAdmissionFee').getRange();
                                
                                var data = [];
                                
                                Ext.each(records, function(rec1){
                                    rec1.data.templateid=obj.templateid;
                                    rec1.data.studentid =rec.data.studentid;   
                                    rec1.data.createdby =SETTING.Users.userId;   

                                    data.push(rec1.data);
                                });
                                Ext.Ajax.request({
                                        url:'admission/addadmfee.do',
                                        type:'json',
                                        scope:this,
                                        headers:{
                                            'Content-Type':'application/json'  
                                        },
                                        params:Ext.JSON.encode(data),
                                        success: function(res){
                                            Ext.Msg.alert('Success','Admission Fee has paid successfully');
                                            var rec = eval('('+res.responseText+')');
                                            reLoadAdmissionList();
                                        }
                                    });            
                             });
                            }
                          }

                        },
                        {xtype:'btncancel',
                         iconCls: 'icon-cancel'
                        }
                        ]
                    });
                }
                win.show();
                
                
               /* Ext.Ajax.request({
                    url:'admission/paymtrecipt.do',
                    type:'json',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    params:Ext.JSON.encode(data),
                    success: function(res){
                        var alldata = eval('('+res.responseText+')');
                        
                       
                        Ext.create
                        ('MyApp.view.addmission.AdmissionPaymentReciept',{
                                    title:'Admission Fee Payment Reciept',
                                    paymentDetail:alldata
                        }).show();
                    }
                    }); */
                        
    }
    
    
}
function addStudent(sessionid,classid,rec){

    var win= Ext.getCmp('admisstudent_win');
    if(!win){
        win = Ext.create('Ext.window.Window', {
            title:rec?'Edit New Student Form':'Add New Student Form',
            id: rec?'admisstudent_win':'admisstudent_win',
            width:620,
            height:590,
            closeAction:'hide',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:'Create New Student Data'
            },
            defaults:{
                xtype:'textfield',
                value:''
            },
            url:'ppppp',
            
            items :[{
                    xtype: 'tabpanel',
                    layout:'fit',     
                    style:'background:white',    
                    width:620,
                    height:580,                            
                    items:[{///Student Details
                            title: 'Student Personal Detail',
                            /*loader: {
                                url: 'studentadmission/getpd.do?formno='+rec.data.formno,
                                contentType: 'application/json',
                                loadMask: true
                            },
                            listeners: {
                                activate: function(tab) {
                                    tab.loader.load();
                                }
                            },*/
                            defaults:{
                                        xtype:'textfield',
                                        value:'',
                                        labelWidth:200,
                                        height:18
                            },
                            items:[
                                {
                                    name : 'studentid',
                                    fieldLabel: 'studentid',
                                    id:'studentid',
                                    value:rec.data.studentid,
                                    readOnly:true,
                                    width:600
                                },
                                {
                                    name : 'sessionname',
                                    fieldLabel: 'SessionName',
                                    id:'sessionname',
                                    value:Ext.getCmp('admisnstudsession').getRawValue(),
                                    readOnly:true,
                                    width:600
                                },
                                {
                                    name : 'admissionno',
                                    fieldLabel: 'School Admission Number',
                                    id:'admissionno',
                                    value:rec?rec.data.admissionno:null,
                                    readOnly:true,
                                    width:600,
                                    emptyText:'Admission Number will be Autogenerated'
                                },{
                                    xtype:'combobox',
                                    fieldLabel :'Admission Type',
                                    id:'admissiontype',
                                    name:'admissiontype',
                                    store:Ext.create('MyApp.store.Master').load({
                                                                  params:{propertyId:17} //peorpetty religion id =4
                                                         }),
                                    typeAhead: true,
                                    queryMode: 'local',
                                    emptyText: 'Select Admission...',
                                    Autoload:true,               
                                    valueField :'id',
                                    displayField :'value',
                                    width:600
                                },
                                {
                                    name : 'formno',
                                    fieldLabel: 'Application Form Number',
                                    id:'formno',
                                    value:rec?rec.data.formno:null,
                                    //readOnly:true,
                                    width:600
                                },
                                {
                                    name : 'session_id',
                                    fieldLabel: 'SessionName',
                                    id:'session_id',
                                    value:sessionid,
                                    hidden:true                                    
                                },
                                {
                                    name : 'fname',
                                    fieldLabel: 'Student First Name',
                                    id:'fname',
                                    width:600,
                                    value:rec?rec.data.fname:null
                                },
                                {
                                    name : 'mname',
                                    fieldLabel: 'Middle Name',
                                    id:'mname',
                                    width:600,
                                    value:rec?rec.data.mname:null
                                },
                                {
                                    name : 'lname',
                                    fieldLabel: 'Last Name',
                                    id:'lname',
                                    width:600,
                                    value:rec?rec.data.lname:null
                                },   
                                
                                {
                                    xtype:'combobox',
                                    fieldLabel :'Admitted to Class',
                                    id:'classid',
                                    name:'classid',
                                    store:Ext.create('MyApp.store.ClassCombo1').load({
                                                          params:{propertyId:2,
                                                                  classid   :sessionid,///Provide Batch_id
                                                                  teacherid :SETTING.Users.userId
                                                          }}),
                                    typeAhead: true,
                                    queryMode: 'local',
                                    emptyText: 'Select a Class...',
                                    Autoload:true,               
                                    valueField :'id',
                                    displayField :'value',
                                    width:600,
                                    value:classid
                                },
                                {
                                    xtype:'datefield',
                                    name : 'dob',
                                    fieldLabel: 'Date of Birth',
                                    id:'dob',
                                    format: 'm/d/Y',
                                   // altFormats: 'm-d-Y|m.d.Y',
                                    width:600,
                                ///    value:rec?rec.data.dob:null
                                    },
                                {
                                    xtype:'datefield',
                                    name : 'admissiondate',
                                    fieldLabel: 'Date of Admission',
                                    id:'admissiondate',
                                    format: 'm/d/Y',
                                    //altFormats: 'm,d,Y|m.d.Y',
                                    width:600,
                                ///    value:rec?rec.data.admissiondate:null
                                },
                                {
                                    xtype:'combobox',
                                    fieldLabel :'Select Gender',
                                    id:'gender',
                                    emptyText: 'Select Gender',       
                                    store:
                                        Ext.create('Ext.data.Store', {
                                            fields: ['abbr', 'name'],
                                            data : [
                                            {
                                                "abbr":"1",
                                                "name":"Male"
                                            },{
                                                "abbr":"0",
                                                "name":"Female"
                                            }]
                                        }),
                                        Autoload:true,
                                        queryMode: 'local',
                                        displayField: 'name',
                                        valueField: 'abbr',
                                        name:'type',
                                        width:600,
                                        value:rec.data.gender

                                },                                                       
                                {
                                    xtype:'combobox',
                                    fieldLabel: 'Religion',
                                    id:'religion',
                                    name : 'religion',
                                    store:Ext.create('MyApp.store.Master').load({
                                                                  params:{propertyId:4} //peorpetty religion id =4
                                                         }),
                                    typeAhead: true,
                                    queryMode: 'local',
                                    emptyText: 'Select Religion.',
                                    Autoload:true,
                                    valueField :'id',
                                    displayField :'value',
                                    width:600 ,
                                    value:rec.data.religion
                                },{
                                    xtype:'combobox',
                                    fieldLabel: 'Category',
                                    id:'category',
                                    name : 'category',
                                    store:Ext.create('MyApp.store.Master').load({
                                                                  params:{propertyId:47} //peorpetty religion id =4
                                                         }),
                                    typeAhead: true,
                                    queryMode: 'local',
                                    emptyText: 'Select Category.',
                                    Autoload:true,
                                    valueField :'id',
                                    displayField :'value',
                                    width:600,
                                    value:rec?rec.data.category:null
                                },{
                                    xtype:'combobox',
                                    fieldLabel: 'Nationality',
                                    id:'nationality',
                                    name : 'nationality',
                                    store:Ext.create('MyApp.store.Master').load({
                                                                  params:{propertyId:16} //peorpetty religion id =4
                                                         }),
                                    typeAhead: true,
                                    queryMode: 'local',
                                    emptyText: 'Select Nationality.',
                                    Autoload:true,
                                    valueField :'id',
                                    displayField :'value',
                                    width:600,
                                    value:rec.data.nationality
                                },{

                                    fieldLabel: 'Mother Tounge',
                                    id:'mother_tounge',
                                    name : 'mother_tounge',
                                    width:600,
                                    value:rec?rec.data.mother_tounge:null
                                },{

                                    fieldLabel: 'Passport No',
                                    id:'passport_no',
                                    name : 'passport_no',
                                    width:600,
                                    value:rec?rec.data.passport_no:null
                                },{

                                    fieldLabel: 'Social Security Number',
                                    id:'ssn',
                                    name : 'ssn',
                                    width:600,
                                    value:rec?rec.data.ssn:null
                                },{

                                    fieldLabel: 'Visa Detail',
                                    id:'visadetail',
                                    name : 'visadetail',
                                    width:600,
                                    value:rec?rec.data.visadetails:null
                                    
                                },{

                                    fieldLabel: 'UID',
                                    id:'uid',
                                    name : 'uid',
                                    width:600,
                                    value:rec?rec.data.uid:null
                                },{

                                    fieldLabel: 'Aadhar Card Id',
                                    id:'aadhar_id',
                                    name : 'aadhar_id',
                                    width:600,
                                    value:rec?rec.data.adhar_id:null
                                },{

                                    fieldLabel: 'Blood Group',
                                    id:'blood_group',
                                    name : 'blood_group',
                                    width:600,
                                    value:rec?rec.data.bloodgroup:null
                                }
                              ]
                           },   
                           {///Parent Details                        
                            title: 'Parent Details',
                            defaults:{
                                        xtype:'textfield',
                                        value:'',
                                        labelWidth:200,
                                        height:18
                            },
                            width:620,
                            height:580,                            
                            items:[
                                {
                                    name : 'fathername',
                                    fieldLabel:  'Father Name',
                                    id:'fathername',
                                    width:600,
                                    value:rec?rec.data.fathername:null
                                },
                                {
                                    name : 'mothername',
                                    fieldLabel: 'Mother Name',
                                    id : 'mothername',
                                    width:600,
                                    value:rec?rec.data.mothername:null
                                },
                                {
                                    name : 'caretakername',
                                    fieldLabel: 'Care Taker Name',
                                    id : 'caretakername',
                                    width:600,
                                    value:rec?rec.data.caretakername:null
                                },
                                {
                                    name : 'occupation',
                                    fieldLabel: 'Fathers Occupation',
                                    id : 'occupation',
                                    width:600,
                                    value:rec?rec.data.occupation:null
                                },{
                                    name : 'fatherhighestedu',
                                    fieldLabel: 'Father Highest Education',
                                    id : 'fatherhighestedu',
                                    width:600,
                                    value:rec?rec.data.fatherhighestedu:null
                                },{
                                    name : 'annualincome',
                                    fieldLabel: 'Annual Income',
                                    id : 'annualincome',
                                    width:600,
                                    value:rec?rec.data.annualincome:null
                                }
                            ]
                           },   
                           
                           {///Contact Details                        
                            title: 'Contact Details',
                            defaults:{
                                        xtype:'textfield',
                                        value:'',
                                        labelWidth:200,
                                        height:18
                            },
                            width:620,
                            height:580,                            
                            items:[
                                {
                                    name : 'parentemailid',
                                    fieldLabel: 'Parent Email Id',
                                    id : 'parentemailid',
                                    width:600,
                                    value:rec?rec.data.parentemailid:null
                                },
                                {
                                    name : 'alternateemailid',
                                    fieldLabel: 'Alternate Email Id',
                                    id: 'alternateemailid',
                                    width:600,
                                    value:rec?rec.data.alternateemailid:null
                                },
                                {
                                    name : 'parentmobile',
                                    fieldLabel: 'Parent Mobile',
                                    id : 'parentmobile',
                                    width:600,
                                    value:rec?rec.data.parentmobile:null
                                },
                                {
                                    name : 'alternatemobile',
                                    fieldLabel: 'Alternate Mobile',
                                    id : 'alternatemobile',
                                    width:600,
                                    value:rec?rec.data.alternatemobile:null
                                },
                                {
                                    xtype:'textarea',
                                    name : 'address',
                                    fieldLabel: 'Address',
                                    id:'address',
                                    width:600,
                                    value:rec?rec.data.address:null
                                },
                                {
                                    name : 'stateid',
                                    fieldLabel: 'State',
                                    id:'stateid',
                                    xtype:'combobox',
                                    store:Ext.create('MyApp.store.Combo').load({
                                                          params:{propertyId:3}}),/*for State detail id is 6*/
                                    typeAhead: true,
                                    queryMode: 'local',
                                    emptyText: 'Select a State...',
                                    Autoload:true,
                                    valueField :'id',
                                    displayField :'value',
                                    width:600,
                                    value:rec?rec.data.state:null

                                },
                                {
                                    name : 'cityid',
                                    fieldLabel: 'City',
                                    id:'cityid',
                                    width:600,
                                    value:rec?rec.data.city:null
                                }
                                
                            ]
                           },   
                           { ///Intrance Exam Result
                            title: 'Intrance Exam Result',
                            width:620,
                            height:580,                            
                            defaults:{
                                        xtype:'textfield',
                                        value:'',
                                        labelWidth:200,
                                        height:18
                            },
                            items:[
                                {
                                    name : 'entranceexamid',
                                    id : 'entranceexamid',
                                    hidden:true,
                                    value:rec.data.entranceexamid
                                },
                                {
                                    xtype:'datefield',
                                    name : 'intrvexamdate',
                                    fieldLabel: 'Date of Intrance Exam',
                                    id:'intrvexamdate',
                                    format: 'm/d/Y',
                                    altFormats: 'm,d,Y|m.d.Y',
                                    width:600,
                                  //  value:rec.data.intrvexamdate
                                },
                                {
                                    xtype:'combobox',
                                    fieldLabel :'Select Test Status',
                                    id:'selectteststatus',
                                    emptyText: 'Select Result',       
                                    store:
                                        Ext.create('Ext.data.Store', {
                                            fields: ['abbr', 'name'],
                                            data : [
                                            {
                                                "abbr":"1",
                                                "name":"Pass"
                                            },{
                                                "abbr":"0",
                                                "name":"Fail"
                                            }]
                                        }),
                                        Autoload:true,
                                        queryMode: 'local',
                                        displayField: 'name',
                                        valueField: 'abbr',
                                        name:'type',
                                    width:600

                                } ,
                                {
                                    name : 'totscore',
                                    fieldLabel: 'Total Mark Obtained',
                                    id : 'totscore',
                                    width:600
                                },
                                {
                                    xtype:'textarea',
                                    name : 'testcomment',
                                    fieldLabel: 'Comment',
                                    id : 'testcomment',
                                    width:600
                                }
                            ]
                               
                           },  
                           {///InterView Result
                            title: 'InterView Result',
                            width:620,
                            height:580,                            
                            defaults:{
                                        xtype:'textfield',
                                        value:'',
                                        labelWidth:200,
                                        height:18
                            },
                            items:[
                                {
                                    name : 'interviewid',
                                    id : 'interviewid',
                                    hidden:true,
                                    value:rec.data.interviewid
                                },
                                {
                                xtype:'datefield',
                                name : 'intrviewdate',
                                fieldLabel: 'Date of Interview',
                                id:'intrviewdate',
                                format: 'm/d/Y',
                                altFormats: 'm,d,Y|m.d.Y',
                                width:600,
                                //value:rec.data.intrviewdate
                                },
                                {
                                    xtype:'combobox',
                                    fieldLabel :'Select Interview Status',
                                    id:'selectinterstatus',
                                    emptyText: 'Select Result',       
                                    store:
                                        Ext.create('Ext.data.Store', {
                                            fields: ['abbr', 'name'],
                                            data : [
                                            {
                                                "abbr":"1",
                                                "name":"Pass"
                                            },{
                                                "abbr":"0",
                                                "name":"Fail"
                                            }]
                                        }),
                                        Autoload:true,
                                        queryMode: 'local',
                                        displayField: 'name',
                                        valueField: 'abbr',
                                        name:'type',
                                    width:600

                                } ,
                                {
                                    xtype:'textarea',
                                    name : 'intervcomment',
                                    fieldLabel: 'Comment',
                                    id : 'intervcomment',
                                    width:600
                                }]
                           }   
                    ]
            }
            
            ],
            buttons :[
            {
                text: '<b>Save Details</b>',
                action: 'save',
                scope:this,
                style:'background:lightskyblue',
                listeners:{
                render: function(component){
                component.getEl().on('click', function(){                                        
                  
                var data={  'sessionname'       :Ext.getCmp('sessionname').getValue(),
                            'admissionno'       :Ext.getCmp('admissionno').getValue(),
                            'formno'            :Ext.getCmp('formno').getValue(),
                            'session_id'	:Ext.getCmp('session_id').getValue(),
                            'fname' 	        :Ext.getCmp('fname').getValue(),
                            'mname'     	:Ext.getCmp('mname').getValue(),
                            'lname'      	:Ext.getCmp('lname').getValue(),
                            'classid'    	:Ext.getCmp('classid').getValue(),
                            'dob'               :new Date(Ext.getCmp('dob').getValue()).getTime(),
                            'admissiondate'     :new Date(Ext.getCmp('admissiondate').getValue()).getTime(),
                            'religion'          :Ext.getCmp('religion').getValue(),
                            'nationality'       :Ext.getCmp('nationality').getValue(),
                            'mother_tounge'     :Ext.getCmp('mother_tounge').getValue(),
                            'passport_no'       :Ext.getCmp('passport_no').getValue(),
                            'ssn'               :Ext.getCmp('ssn').getValue(),
                            'visadetail'        :Ext.getCmp('visadetail').getValue(),
                            'uid'               :Ext.getCmp('uid').getValue(),
                            'aadhar_id'         :Ext.getCmp('aadhar_id').getValue(),
                            'fathername'        :Ext.getCmp('fathername').getValue(),
                            'mothername'        :Ext.getCmp('mothername').getValue(),
                            'caretakername'     :Ext.getCmp('caretakername').getValue(),
                            'occupation'        :Ext.getCmp('occupation').getValue(),
                            'fatherhighestedu'  :Ext.getCmp('fatherhighestedu').getValue(),
                            'annualincome'      :Ext.getCmp('annualincome').getValue(),
                            'parentemailid'     :Ext.getCmp('parentemailid').getValue(),
                            'alternateemailid'  :Ext.getCmp('alternateemailid').getValue(),
                            'parentmobile'      :Ext.getCmp('parentmobile').getValue(),
                            'alternatemobile'   :Ext.getCmp('alternatemobile').getValue(),
                            'address'           :Ext.getCmp('address').getValue(),
                            'stateid'           :Ext.getCmp('stateid').getValue(),
                            'cityid'            :Ext.getCmp('cityid').getValue(),
                            'intrvexamdate'     :new Date(Ext.getCmp('intrvexamdate').getValue()).getTime(),
                            'selectteststatus'  :Ext.getCmp('selectteststatus').getValue(),
                            'totscore'          :Ext.getCmp('totscore').getValue(),
                            'intrviewdate'      :new Date(Ext.getCmp('intrviewdate').getValue()).getTime(),
                            'selectinterstatus' :Ext.getCmp('selectinterstatus').getValue(),
                            'intervcomment'     :Ext.getCmp('intervcomment').getValue(),
                            'blood_group'       :Ext.getCmp('blood_group').getValue(),
                            'admissiontype'     :Ext.getCmp('admissiontype').getValue(),
                            'gender'            :Ext.getCmp('gender').getValue(),
                            'createdby'         :SETTING.Users.userId,
                            'modifiedby'        :SETTING.Users.userId,
                            'interviewid'       :Ext.getCmp('interviewid').getValue() ,
                            'category'          :Ext.getCmp('category').getValue()  ,
                            'entranceexamid'    :Ext.getCmp('entranceexamid').getValue(),
                            'studentid'         :Ext.getCmp('studentid').getValue(),
                            

                         };                             
                  Ext.Ajax.request({
                    url:'studentadmission/saveaddns.do',
                    type:'json',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    params:Ext.JSON.encode(data),
                    success: function(res){
                        var rec = eval('('+res.responseText+')');
                        if(rec.admissionno!=null) {
                        
                        Ext.Msg.alert('Success','Student Detail Saved successfully');
                        
                        var sessionid=Ext.getCmp('admisnstudsession').getValue();
                        var classid  =Ext.getCmp('admsnstudclasscombo').getValue();                                

                        if(sessionid!=null && classid!=null)    
                            {

                                    Ext.getCmp('admissionstudentgrid').getStore().reload({
                                                params:{'classid':classid,
                                                        'sessionid':sessionid
                                    }});
                            }   

                        if(sessionid!=null && classid!=null)    
                            {

                                    Ext.getCmp('offadmissionstudentgrid').getStore().reload({
                                                params:{'classid':classid,
                                                        'sessionid':sessionid
                                    }});
                            } 
                        }
                        else
                        Ext.Msg.alert('Success','Error Occured , Please Contact Administrator');    
                     //   var rec = eval('('+res.responseText+')');
                     //   app.getController('Class').getClassStore().add(rec);
                    }
                });

                 });
                }
              }
            },  
            {
                text:'<b>Confirm Addmission</b>',
                action: 'save',
                scope:this,
                style:'background:lightskyblue',//#37AAEA',
                listeners:{
                render: function(component){
                component.getEl().on('click', function(){                                        
                var data={  'sessionname'       :Ext.getCmp('sessionname').getValue(),
                            'admissionno'       :Ext.getCmp('admissionno').getValue(),
                            'formno'            :Ext.getCmp('formno').getValue(),
                            'session_id'	:Ext.getCmp('session_id').getValue(),
                            'fname' 	        :Ext.getCmp('fname').getValue(),
                            'mname'     	:Ext.getCmp('mname').getValue(),
                            'lname'      	:Ext.getCmp('lname').getValue(),
                            'classid'    	:Ext.getCmp('classid').getValue(),
                            'dob'               :new Date(Ext.getCmp('dob').getValue()).getTime(),
                            'admissiondate'     :new Date(Ext.getCmp('admissiondate').getValue()).getTime(),
                            'religion'          :Ext.getCmp('religion').getValue(),
                            'nationality'       :Ext.getCmp('nationality').getValue(),
                            'mother_tounge'     :Ext.getCmp('mother_tounge').getValue(),
                            'passport_no'       :Ext.getCmp('passport_no').getValue(),
                            'ssn'               :Ext.getCmp('ssn').getValue(),
                            'visadetail'        :Ext.getCmp('visadetail').getValue(),
                            'uid'               :Ext.getCmp('uid').getValue(),
                            'aadhar_id'         :Ext.getCmp('aadhar_id').getValue(),
                            'fathername'        :Ext.getCmp('fathername').getValue(),
                            'mothername'        :Ext.getCmp('mothername').getValue(),
                            'caretakername'     :Ext.getCmp('caretakername').getValue(),
                            'occupation'        :Ext.getCmp('occupation').getValue(),
                            'fatherhighestedu'  :Ext.getCmp('fatherhighestedu').getValue(),
                            'annualincome'      :Ext.getCmp('annualincome').getValue(),
                            'parentemailid'     :Ext.getCmp('parentemailid').getValue(),
                            'alternateemailid'  :Ext.getCmp('alternateemailid').getValue(),
                            'parentmobile'      :Ext.getCmp('parentmobile').getValue(),
                            'alternatemobile'   :Ext.getCmp('alternatemobile').getValue(),
                            'address'           :Ext.getCmp('address').getValue(),
                            'stateid'           :Ext.getCmp('stateid').getValue(),
                            'cityid'            :Ext.getCmp('cityid').getValue(),
                            'intrvexamdate'     :new Date(Ext.getCmp('intrvexamdate').getValue()).getTime(),
                            'selectteststatus'  :Ext.getCmp('selectteststatus').getValue(),
                            'totscore'          :Ext.getCmp('totscore').getValue(),
                            'intrviewdate'      :new Date(Ext.getCmp('intrviewdate').getValue()).getTime(),
                            'selectinterstatus' :Ext.getCmp('selectinterstatus').getValue(),
                            'intervcomment'     :Ext.getCmp('intervcomment').getValue(),
                            'blood_group'       :Ext.getCmp('blood_group').getValue(),
                            'admissiontype'     :Ext.getCmp('admissiontype').getValue(),
                            'gender'            :Ext.getCmp('gender').getValue(),
                            'createdby'         :SETTING.Users.userId,
                            'modifiedby'        :SETTING.Users.userId,
                            'interviewid'       :Ext.getCmp('interviewid').getValue() ,
                            'entranceexamid'    :Ext.getCmp('entranceexamid').getValue(),
                            'category'          :Ext.getCmp('category').getValue(), 
                            'studentid'         :Ext.getCmp('studentid').getValue()
                         };  
                
                Ext.Msg.confirm("Alert","Are You sure you want to confirm Addmision", function(btn){
                if(btn=='yes'){
                    Ext.Ajax.request({
                    url:'studentadmission/cofmadmsn.do',
                    type:'json',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    params:Ext.JSON.encode(data),
                    success: function(res){
                        var rec = eval('('+res.responseText+')');
                        if(rec.admissionno!=null) {
                        Ext.Msg.alert('Success','Student Admission Confirmed , added successfully ,<b> Admission Number </b>:'+rec.admissionno);
                        reLoadAdmissionList();
                        }
                        else
                        Ext.Msg.alert('Success','Error Occured , Please Contact Administrator');    
                    }
                   });
                   }
                });                    
                });
               }
             }
            },
            {xtype:'btncancel',
             text:'<b>Cancel</b>',   
             style:'background:lightskyblue',//#37AAEA',
            }
            ]
        });
    }
    if(rec){
        
        Ext.getCmp('sessionname').setValue(Ext.getCmp('sessionname').getValue());
        Ext.getCmp('admissionno').setValue(rec.data.admissionno);
        Ext.getCmp('formno').setValue(rec.data.formno);
        Ext.getCmp('session_id').setValue(Ext.getCmp('session_id').getValue());
        Ext.getCmp('fname').setValue(rec.data.fname);
        Ext.getCmp('mname').setValue(rec.data.mname);                            
        Ext.getCmp('lname').setValue(rec.data.lname);                            
        Ext.getCmp('classid').setValue(Ext.getCmp('classid').getValue());                            
        Ext.getCmp('dob').setValue(Ext.Date.format(new Date(rec.data.dob),DEFAULT_DATE_FORMAT));  
        Ext.getCmp('admissiondate').setValue(Ext.Date.format(new Date(rec.data.admissiondate),DEFAULT_DATE_FORMAT));                            
        Ext.getCmp('religion').setValue(rec.data.religion);                            
        Ext.getCmp('nationality').setValue(rec.data.nationality);                            
        Ext.getCmp('mother_tounge').setValue(rec.data.mother_tounge);                            
        Ext.getCmp('passport_no').setValue(rec.data.passport_no);                            
        Ext.getCmp('ssn').setValue(rec.data.ssn);                            
        Ext.getCmp('visadetail').setValue(rec.data.visadetails);                            
        Ext.getCmp('uid').setValue(rec.data.uid);                            
        Ext.getCmp('aadhar_id').setValue(rec.data.adhar_id);                            
        Ext.getCmp('fathername').setValue(rec.data.fathername);                            
        Ext.getCmp('mothername').setValue(rec.data.mothername);                            
        Ext.getCmp('caretakername').setValue(rec.data.caretakername);                            
        Ext.getCmp('occupation').setValue(rec.data.occupation);                            
        Ext.getCmp('fatherhighestedu').setValue(rec.data.fatherhighestedu);                            
        Ext.getCmp('annualincome').setValue(rec.data.annualincome);                            
        Ext.getCmp('parentemailid').setValue(rec.data.parentemailid);                            
        Ext.getCmp('alternateemailid').setValue(rec.data.alternateemailid);                            
        Ext.getCmp('parentmobile').setValue(rec.data.parentmobile);                            
        Ext.getCmp('alternatemobile').setValue(rec.data.alternatemobile);                            
        Ext.getCmp('address').setValue(rec.data.address);                            
        Ext.getCmp('stateid').setValue(rec.data.stateid);                            
        Ext.getCmp('cityid').setValue(rec.data.cityid);                            
        Ext.getCmp('intrvexamdate').setValue(Ext.Date.format(new Date(rec.data.intrvexamdate),'m d Y'));                            
        Ext.getCmp('selectinterstatus').setValue(rec.data.selectinterstatus);                            
        Ext.getCmp('totscore').setValue(rec.data.totscore);                            
        Ext.getCmp('intrviewdate').setValue(Ext.Date.format(new Date(rec.data.intrviewdate),'m d Y'));                            
        //Ext.getCmp('intrviewdate').setValue(new Date(rec.data.intrviewdate));                            
        Ext.getCmp('selectinterstatus').setValue(rec.data.selectinterstatus);                            
        Ext.getCmp('intervcomment').setValue(rec.data.intervcomment);                            
        Ext.getCmp('blood_group').setValue(rec.data.bloodgroup);                            
        Ext.getCmp('admissiontype').setValue(rec.data.admissiontype);                            
        Ext.getCmp('gender').setValue(rec.data.gender);    
        Ext.getCmp('entranceexamid').setValue(rec.data.entranceexamid);    
        Ext.getCmp('interviewid').setValue(rec.data.interviewid); 
        Ext.getCmp('category').setValue(rec.data.category);       
        Ext.getCmp('studentid').setValue(rec.data.studentid);    
    }
    win.show();
}

function admissionDocument(sessionid,classid,rec){

var win=Ext.getCmp('addmis_doc_win');
    if(!win){
        win = Ext.create('Ext.app.view.component.AppWindow', {
            title:'Student Admission Document',
            id: 'addmis_doc_win',
            width:400,
            closeAction:'hide',
            top:{
                image:BASE_URL+'resources/images/portal-icon/document2.jpg',
                formTitle:'Attach Student Form, Document Etc for Admission Process'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:300,
                labelWidth:130
            },
            url:'ppppp',
            
            formItems :[
            {
                name : 'id',
                id:'id',
                value:rec?rec.data.studentid:null,
                hidden:true
            },    
            {
                name : 'sessionid',
                fieldLabel: 'SessionName',
                id:'sessionid',
                value:sessionid,
                hidden:true
            },
            {
                name : 'classid',
                fieldLabel: 'classid',
                id:'classid',
                value:classid,
                hidden:true
            },
            {
                xtype:'combobox',
                fieldLabel :'Document Name',
                id:'documenttype',
                name:'documenttype',
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:46}}),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Document',
                Autoload:true,               
                valueField :'id',
                displayField :'value'
            },{
                xtype: 'fileuploadfield',
                fieldLabel :'Upload Document',
                id:'file',
                name:'file',
                buttonText: '',
                buttonConfig: {
                iconCls: 'upload-icon'
            }
            }           
            ],
            buttons :[
            {
                text: 'Add',
                action: 'Send',
                scope:this,
                handler:attachDoc                
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();    
    
}

function attachDoc(btn){
    var form = btn.up('window').down('form').getForm();
     if(form.isValid()){
           form.submit({
                    url: 'studentadmission/adddocument.do',
                    success: function(fp, o) {
                    Ext.example.msg('Success','Document Added Successfully');
                    },
                    failure: function(fp, o) {
                        Ext.example.msg('Failure','Unexpected Error Occured,Please Contact Administrator');
                    }
          }); 
      }
    
}

function initiateAdmissionOnline(sessionid,classid){
    
    var win=Ext.getCmp('initiateaddmis_win');;
    if(!win){
        win = Ext.create('Ext.app.view.component.AppWindow', {
            title:'Send New Student Admission Form Link to Parent',
            id: 'initiateaddmis_win',
            width:400,
            closeAction:'hide',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:'Send New Student Admission Form Link to Parent'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:300,
                labelWidth:130
            },
            url:'ppppp',
            formItems :[
            {
                name : 'sessionname',
                fieldLabel: 'SessionName',
                id:'session_name',
                value:Ext.getCmp('admisnstudsession').getRawValue(),
                readOnly:true,
                style:'font-weight:bold'
            },
            {
                name : 'sessionid',
                fieldLabel: 'SessionName',
                id:'sessionid',
                value:sessionid,
                hidden:true
            },
            {
                name : 'classname',
                fieldLabel: 'Applying class',
                id:'classname',
                style:'font-weight:bold',
                value:Ext.getCmp('admsnstudclasscombo').getRawValue()
            },
            {
                name : 'classid',
                fieldLabel: 'classid',
                id:'classid',
                value:classid,
                hidden:true
            },
            {
                name : 'emailid',
                fieldLabel: 'Parent Email ID',
                id:'emailid',
                style:'font-weight:bold'
            },
           {
                name : 'mobileno',
                fieldLabel: 'Mobile Number',
                id:'mobileno',
                style:'font-weight:bold'
            },
            {
                xtype:'datefield',
                name : 'lastdate',
                fieldLabel: 'Admission Last Date',
                id:'lastdate',
                format: 'm d Y',
                altFormats: 'm-d-Y|m.d.Y',
                style:'font-weight:bold'
            }            
            ],
            buttons :[
            {
                text: 'Add',
                action: 'Send',
                scope:this,
                handler:SendLink                
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
}

function SendLink(btn){
      
      var form = btn.up('window').down('form').getForm();
      var grid =  Ext.getCmp('studentgrid');
      if(form.isValid()){
            var obj = form.getValues();           
            obj.lastdate=new Date(obj.lastdate).getTime();        
            Ext.Ajax.request({
                url:'studentadmission/init.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    var rec = eval('('+res.responseText+')');
                    if(rec.formid!=null)
                    {
                    Ext.Msg.alert('Success','Student Admission Form Link Send to Parent Email-Id successfully');
                        var sessionid=Ext.getCmp('admisnstudsession').getValue();
                        var classid  =Ext.getCmp('admsnstudclasscombo').getValue();                                

                        if(sessionid!=null && classid!=null)    
                            {

                                    Ext.getCmp('admissionstudentgrid').getStore().reload({
                                                params:{'classid':classid,
                                                        'sessionid':sessionid
                                    }});
                            }   

                            if(sessionid!=null && classid!=null)    
                            {

                                    Ext.getCmp('offadmissionstudentgrid').getStore().reload({
                                                params:{'classid':classid,
                                                        'sessionid':sessionid
                                    }});
                            }                     
                    }
                    else
                    Ext.Msg.alert('Success','Unexpected Error Occured during processing , Please Contact Administrator');    
                    var rec = eval('('+res.responseText+')');
                 //   app.getController('Class').getClassStore().add(rec);
                }
            });
        }    
}

function schduleExamInterview(rec){
    var win = Ext.getCmp('schexamintrw_win');
    if(!win){
        win=Ext.create('Ext.app.view.component.AppWindow', {
            title:'Schedule Entrance Examination and Interview For :<font color=green><b>'+rec.data.sname +'</b> : Form No : '+rec.data.formno+'</font>',
            id:'schexamintrw_win',
            width:400,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:'Schedule Entrance Examination and Interview Form'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:350
            },
            url:'ppppp',
            formItems :[
            {
                name : 'formno',
                value:rec.data.formno,
                hidden:true
            },    
            {
                name : 'sessionid',
                value:Ext.getCmp('admisnstudsession').getValue(),
                hidden:true
            },{
                name : 'classid',
                value:Ext.getCmp('admsnstudclasscombo').getValue(),
                hidden:true
            },{
                name : 'modifiedby',
                value:SETTING.Users.userId,
                hidden:true
            },
            {
                name : 'emailid',
                value:rec.data.parentemailid,
                hidden:true
            },
            
            {
                name : 'year',
                fieldLabel: 'Session year',
                value:Ext.getCmp('admisnstudsession').getRawValue()
            },{
                name : 'class',
                fieldLabel: 'Class Name',
                value:Ext.getCmp('admsnstudclasscombo').getRawValue()
            },{
                xtype:'checkbox',
                name : 'examapplicable',
                fieldLabel: 'Enable Examination',
                id:'examapplicable',
                handler:function(){
                    var val=Ext.getCmp('examapplicable').getValue();
                    if(val){
                        Ext.getCmp('examdate').show();
                    }
                    else{
                        Ext.getCmp('examdate').hide();
                    }
                }
             },{
                xtype:'datefield',
                name : 'examdate',
                fieldLabel: 'Date of Examination',
                id:'examdate',
                format: 'm d Y',
                altFormats: 'm-d-Y|m.d.Y',
                width:350,
                hidden:true
             },{
                xtype:'checkbox',
                name : 'intrwapplicable',
                fieldLabel: 'Enable Interview',
                id:'intrwapplicable',
                handler:function(){
                    var val=Ext.getCmp('intrwapplicable').getValue();
                    if(val){
                        Ext.getCmp('interviewdate').show();
                    }
                    else{
                        Ext.getCmp('interviewdate').hide();
                    }
                }
             },
            {
                xtype:'datefield',
                name : 'interviewdate',
                fieldLabel: 'Date of Interview',
                id:'interviewdate',
                format: 'm d Y',
                altFormats: 'm,d,Y|m.d.Y',
                hidden:true,
                width:350                                    
            },
            {
                xtype:'textarea',
                name : 'comment',
                fieldLabel: 'Comment',
                id:'comment'
            }
            ],
            buttons :[
            {
                text: 'Send Email Alert',
                action: 'save',
                scope:this,
                handler:sendExtrcInterveiw
            },{xtype:'btncancel'}
         ]
        });
    }
    win.show();
}

function sendExtrcInterveiw(btn){
    
    var form = btn.up('window').down('form').getForm();
      
      if(form.isValid()){
            var obj = form.getValues();           
            
            if(Ext.getCmp('intrwapplicable').getValue()) {
                 obj.interviewdate=new Date(obj.interviewdate).getTime();        
                 obj.intrwapplicable=1;        
            }else{
                 obj.intrwapplicable=0;        
            }
            if(Ext.getCmp('examapplicable').getValue()){
                 obj.examdate     =new Date(obj.examdate).getTime();        
                 obj.examapplicable=1;        
            }else{
                obj.examapplicable=0;        
            }
            
            Ext.Ajax.request({
                url:'studentadmission/sendintvwexams.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    var rec = eval('('+res.responseText+')');
                    if(rec.result==1) {
                    
                        Ext.Msg.alert('Success','Student Examination & Interview Details Send to Parent Email-Id successfully');
                        
                        var sessionid=Ext.getCmp('admisnstudsession').getValue();
                        var classid  =Ext.getCmp('admsnstudclasscombo').getValue();                                

                        if(sessionid!=null && classid!=null)    
                            {

                                    Ext.getCmp('admissionstudentgrid').getStore().reload({
                                                params:{'classid':classid,
                                                        'sessionid':sessionid
                                    }});
                            }   

                            if(sessionid!=null && classid!=null)    
                            {

                                    Ext.getCmp('offadmissionstudentgrid').getStore().reload({
                                                params:{'classid':classid,
                                                        'sessionid':sessionid
                                    }});
                            } 

                    }
                    else
                    Ext.Msg.alert('Success','Unexpected Error Occured during processing , Please Contact Administrator');    
                }
            });
        }    
}

Ext.define('MyApp.view.addmission.StudentAddmission' ,{
    extend: 'Ext.tab.Panel',
    alias: 'widget.admissionstudentlist',
    closable:true,
    title: 'Student Admission Management',
    layout:'fit',    
    viewConfig:{
                    forceFit:true,
                    emptyText:'<div class="no-results">No Results To display</div>'
            },
    initComponent: function() {

    this.items=[{
            xtype:'grid',
            store:'InitiatedAdmissionProcess',
            title:'<font color=red>Online Student Application</font>',
            id:'admissionstudentgrid',            
            viewConfig:{
                        forceFit:true,
                        emptyText:'<div class="no-results">No Results To display</div>',
                        stripeRows:false ,
                        enableRowBody: true,
                        showPreview: true,      
                        getRowClass: function(record, rowIndex,rp){
                            
                            if(record.data.status=='Initiated' || record.data.status=='Applied' ){              
                            return "initiated";
                            }else {
                                return "rowcontent";
                            }
            }
            },
            listeners: {
               activate: function(tab) {
               currentItem=tab; 
               var  button = Ext.getCmp('inti_add_but');
                    button.setDisabled(false);
               var  delbutton = Ext.getCmp('add_but');
                   delbutton.setDisabled(true);    

                var sessionid=Ext.getCmp('admisnstudsession').getValue();
                var classid  =Ext.getCmp('admsnstudclasscombo').getValue();                                

                if(sessionid!=null && classid!=null)    
                {

                        Ext.getCmp('admissionstudentgrid').getStore().load({
                                    params:{'classid':classid,
                                            'sessionid':sessionid
                        }});
                }   
                
                if(sessionid!=null && classid!=null)    
                {

                        Ext.getCmp('offadmissionstudentgrid').getStore().load({
                                    params:{'classid':classid,
                                            'sessionid':sessionid
                        }});
                } 
                    
              }
            },
            selModel:Ext.create('Ext.selection.CheckboxModel',{
                    singleSelect:true,
                    listeners:{
                            selectionchange:function(sm){
                                Ext.getCmp('admsnStudentEdit').setDisabled((sm.getCount()==0));
                                Ext.getCmp('admsnStudentDelete').setDisabled((sm.getCount()==0));
                                Ext.getCmp('admsnStudentsch').setDisabled((sm.getCount()==0));
                                Ext.getCmp('admsnStudentfee').setDisabled((sm.getCount()==0));
                                Ext.getCmp('admsnStudentdoc').setDisabled((sm.getCount()==0));
                                Ext.getCmp('admsnStudentpayfee').setDisabled((sm.getCount()==0));
                            }
                        }
            }),
            columns:[Ext.create('Ext.grid.RowNumberer'),
            
            {
                
                dataIndex:'studentid',
                id:'studentid',
                name:'studentid',
                hidden:true,
                width :'10%'
            },
            {
                header: 'Form-No',
                dataIndex:'formno',
                style :'color:#17385B;font-weight:bold',
                width :'10%'
            },
            {
                header: 'Status',
                dataIndex:'status',
                width :'10%',
                style :'color:#17385B;font-weight:bold',
                renderer:function(value){
                     if(value=='Initiated')
                         return "<font color=red><b>"+value+"</b></font>";
                     else if(value=="Applied")
                         return "<font color=blue><b>"+value+"</b></font>";
                     else if(value=="Confirm")
                         return "<font color=green><b>"+value+"</b></font>";
                }
            },
                    
            {
                header: 'Student Name',
                dataIndex:'name',
                width :'10%',
                style :'color:#17385B;font-weight:bold'
            },

            {
                header:'Father Name',
                dataIndex:'fathername',
                width :'10%',
                style :'color:#17385B;font-weight:bold'
            },
            {
                header:'Email-Id',
                dataIndex:'parentemailid',
                width :'9%',
                style :'color:#17385B;font-weight:bold'
            },
            {
                header:'ContactNo',
                dataIndex:'parentmobile',
                width :'9%',
                style :'color:#17385B;font-weight:bold'
            },
            {
                header:'Int-Exam',
                dataIndex:'selectteststatus',
                width :'9%',
                style :'color:#17385B;font-weight:bold',
                renderer:function(value){
                 if(value=='1')
                   return "<b>Passed</b>";
                 else if(value=='0')
                   return "<b>Failed</b>";  
                }
            },
            {
                header:'Interview',
                dataIndex:'selectinterstatus',
                width :'8%',
                style :'color:#17385B;font-weight:bold',
                renderer:function(value){
                 if(value=='1')
                   return "<b>Passed</b>";
                 else if(value=='0')
                   return "<b>Failed</b>";  
                }
                
            },
            {
                header:'Final Status',
                dataIndex:'finalstatus',
                width :'7%',
                style :'color:#17385B;font-weight:bold',
                renderer:function(value,metadata,record){
                 if(record.data.selectteststatus==1 && record.data.selectinterstatus==1)
                   return "<b>Passed</b>";
                }
            },{
                header:'Fee Status',
                dataIndex:'feepaid',
                width :'7%',
                style :'color:#17385B;font-weight:bold',
                renderer:function(value,metadata,record){
                 if(value==1)
                   return "<b>Fee Paid</b>";
                 else if(value==0)
                   return "<b>Pending</b>";
 
                }
            },{
                header:'Fee Paid',
                dataIndex:'totamountpaid',
                width :'7%',
                style :'color:#17385B;font-weight:bold'
            },{
                header:'Fee Template',
                dataIndex:'templateid',
                width :'7%',
                hidden:true

            },{
                header:'studentid',
                dataIndex:'studentid',
                width :'7%',
                hidden:true
            },{
                header:'admissiondate',
                dataIndex:'admissiondate',
                width :'7%',
                hidden:true
            },{
                header:'intrvexamdate',
                dataIndex:'intrvexamdate',
                width :'7%',
                hidden:true
            },{
                header:'intrviewdate',
                dataIndex:'intrviewdate',
                width :'7%',
                hidden:true
            },{
                header:'dob',
                dataIndex:'dob',
                width :'7%',
                hidden:true
            },]
          },{
            xtype:'grid',
            store:'OfflineStudentList',
            title:'<font color=green>Offline Student Application</font>',
            id:'offadmissionstudentgrid',            
            listeners: {
                activate: function(tab) {
               currentItem=tab; 
               var  button = Ext.getCmp('inti_add_but');
                    button.setDisabled(true);
               var  delbutton = Ext.getCmp('add_but');
                   delbutton.setDisabled(false);    

                var sessionid=Ext.getCmp('admisnstudsession').getValue();
                var classid  =Ext.getCmp('admsnstudclasscombo').getValue();                                
                if(sessionid!=null && classid!=null)    
                {
                        Ext.getCmp('offadmissionstudentgrid').getStore().load({
                                    params:{'classid':classid,
                                            'sessionid':sessionid
                        }});
                }                        
              }
            },
            selModel:Ext.create('Ext.selection.CheckboxModel',{
                    singleSelect:true,
                    listeners:{
                            selectionchange:function(sm){
                                Ext.getCmp('admsnStudentEdit').setDisabled((sm.getCount()==0));
                                Ext.getCmp('admsnStudentDelete').setDisabled((sm.getCount()==0));
                                Ext.getCmp('admsnStudentsch').setDisabled((sm.getCount()==0));
                                Ext.getCmp('admsnStudentfee').setDisabled((sm.getCount()==0));
                                Ext.getCmp('admsnStudentdoc').setDisabled((sm.getCount()==0));
                                Ext.getCmp('admsnStudentpayfee').setDisabled((sm.getCount()==0));
                            }
                        }
            }),
            viewConfig:{
                    forceFit:true,
                    emptyText:'<div class="no-results">No Results To display</div>'
            },
            columns:[Ext.create('Ext.grid.RowNumberer'),
            {
                header: 'Admission-No',
                dataIndex:'admissionno',
                width :'10%',
                style :'color:#17385B;font-weight:bold'
            },
            {
                header:'Role Number',
                dataIndex:'role_no',
                width :'10%',
                style :'color:#17385B;font-weight:bold'
            },        
            {
                header: 'Student Name',
                dataIndex:'name',
                width :'10%',
                style :'color:#17385B;font-weight:bold'
            },
            {
                header:'Date Of Birth',
                dataIndex:'dob',
                width :'10%',
                style :'color:#17385B;font-weight:bold'
            },
            {
                header:'Father Name',
                dataIndex:'fathername',
                width :'10%',
                style :'color:#17385B;font-weight:bold'
            },
            {
                header:'Email-Id',
                dataIndex:'parentemailid',
                width :'10%',
                style :'color:#17385B;font-weight:bold'
            },
            {
                header:'ContactNo',
                dataIndex:'parentmobile',
                width :'9%',
                style :'color:#17385B;font-weight:bold'
            },
            {
                header:'Status',
                dataIndex:'status',
                width :'9%',
                style :'color:#17385B;font-weight:bold'
            },
            {
                header:'Exam Status',
                dataIndex:'examstatus',
                width :'9%',
                style :'color:#17385B;font-weight:bold'
            },
            {
                header:'Interview Status',
                dataIndex:'interviewstatus',
                width :'13%',
                style :'color:#17385B;font-weight:bold'
            },
            {
                header:'Final Status',
                dataIndex:'finalstatus',
                width :'%7',
                style :'color:#17385B;font-weight:bold',
                renderer:function(value,metadata,record){
                 if(record.data.selectteststatus=='1' && record.data.selectinterstatus=='1')
                   return "<b>Fee Paid</b>";
                 else if(value=='0')
                   return "<b>Pending</b>";  
                 else 
                    return "N/A";
                }
            },{
                header:'Fee Status',
                dataIndex:'feepaid',
                width :'7%',
                style :'color:#17385B;font-weight:bold',
                renderer:function(value,metadata,record){
                 if(value=='1')
                   return "<b>Fee Paid</b>";
                 else if(value=='0')
                   return "<b>Pending</b>";  
                 else 
                    return "N/A";
                }
            },{
                header:'Fee Paid',
                dataIndex:'totamountpaid',
                width :'7%',
                style :'color:#17385B;font-weight:bold'
            },{
                header:'Fee Template',
                dataIndex:'templateid',
                width :'7%',
                hidden:true

            }
           ],
            layout:'fit'
              
          }/*,{
            xtype:'grid',
            store:'ExistingStudentList',
            title:'Existing Student List',
            id:'exadmissionstudentgrid',
            listeners: {
               activate: function(tab) {
               currentItem=tab; 
               var  button = Ext.getCmp('inti_add_but');
                    button.setDisabled(true);
               var  delbutton = Ext.getCmp('add_but');
                   delbutton.setDisabled(true);    
                   
               var sessionid=Ext.getCmp('admisnstudsession').getValue();
               var classid  =Ext.getCmp('admsnstudclasscombo').getValue();
                
               if(sessionid!=null && classid!=null)    
                {
                        Ext.getCmp('exadmissionstudentgrid').getStore().load({
                                    params:{'classid':classid,
                                            'sessionid':sessionid
                        }});
                }
              }
            },
            selModel:Ext.create('Ext.selection.CheckboxModel',{
            singleSelect:true,
                    listeners:{
                            selectionchange:function(){

                               var  button = Ext.getCmp('admsnStudentEdit');
                               button.setDisabled(false);
                               var  delbutton = Ext.getCmp('admsnStudentDelete');
                               delbutton.setDisabled(false);
                            }
                        }
            }),

            viewConfig:{
                    forceFit:true,
                    emptyText:'<div class="no-results">No Results To display</div>'
            },
            columns:[Ext.create('Ext.grid.RowNumberer'),
            {
                header: 'Admission-No',
                dataIndex:'admissionno',
                style :'color:#17385B;font-weight:bold'

            },
            {
                header:'Class',
                dataIndex:'classid',
                style :'color:#17385B;font-weight:bold',
                hidden:true
            },
            {
                header:'Role Number',
                dataIndex:'role_no',
                style :'color:#17385B;font-weight:bold'
            },        
            {
                header: 'Student Name',
                dataIndex:'name',
                style :'color:#17385B;font-weight:bold'
            },
            {
                header:'Date Of Birth',
                dataIndex:'dob',
                style :'color:#17385B;font-weight:bold'
            },
            {
                header:'Father Name',
                dataIndex:'fathername',
                style :'color:#17385B;font-weight:bold'
            },
            {
                header:'Email-Id',
                dataIndex:'parentemailid',
                style :'color:#17385B;font-weight:bold'
            },
            {
                header:'ContactNo',
                dataIndex:'parentmobile',
                style :'color:#17385B;font-weight:bold'
            },
            {
                header:'Address',
                dataIndex:'address',
                style :'color:#17385B;font-weight:bold'
            },
            {
                header:'City',
                dataIndex:'cityid',
                style :'color:#17385B;font-weight:bold'
            },{
                header:'State',
                dataIndex:'stateid',
                style :'color:#17385B;font-weight:bold'
            }
            ],
            layout:'fit'              
          }  */      
  ];
     this.selModel=Ext.create('Ext.selection.CheckboxModel',{
        singleSelect:true,
        listeners:{
                selectionchange:function(sm){
                                Ext.getCmp('admsnStudentEdit').setDisabled((sm.getCount()==0));
                                Ext.getCmp('admsnStudentDelete').setDisabled((sm.getCount()==0));
                                Ext.getCmp('admsnStudentsch').setDisabled((sm.getCount()==0));
                                Ext.getCmp('admsnStudentfee').setDisabled((sm.getCount()==0));
                                Ext.getCmp('admsnStudentdoc').setDisabled((sm.getCount()==0));

                }
            }
    });
     this.tbar =[{
        xtype: 'searchfield',     
        width:110,        
        store: Ext.create('Ext.data.Store', {
            autoLoad: false,
            fields:['id','name'],
            proxy: {
                type: 'ajax',
                url: 'users.json',
                reader: {
                    type: 'json',
                    root: 'users'
                }
            }
        })
    },{
        xtype:'combobox',
        id:'admisnstudsession',
        emptyText: 'Select Session',   
        store:Ext.create('MyApp.store.Combo').load({
                                      params:{propertyId:-1}}),//For Session
        Autoload:true,
        queryMode: 'local',
        displayField: 'value',
        valueField: 'id',
        width:100,
        name:'type',
            listeners:{
            select: function(component){
                var sessionid=Ext.getCmp('admisnstudsession').getValue();
                Ext.getCmp('admsnstudclasscombo').getStore().load({
                     params:{
                             propertyId:2,///Class List
                             classid   :sessionid,///Provide Batch_id,
                             teacherid :SETTING.Users.userId
                     }
               });
            }
       }

    },{
       xtype: 'combo',
       emptyText: 'Select Class',
       text   : 'Class',
       id:'admsnstudclasscombo',
       store:'ClassCombo1',
       typeAhead: true,
       queryMode: 'local',
       Autoload:true,
       valueField :'id',
       displayField :'value', 
       width:100,
       listeners:{
            select: function(component){
                var sessionid=Ext.getCmp('admisnstudsession').getValue();
                var classid  =Ext.getCmp('admsnstudclasscombo').getValue();                                
               
                if(sessionid!=null && classid!=null)    
                {
                     Ext.getCmp('admissionstudentgrid').getStore().load({
                     params:{                             
                             classid   :classid ,
                             sessionid :sessionid
                     }
                     });
                }    
            }
       }
    },{
        iconCls: 'icon-add',
        text: '<b>Initiate Admission Online</b>',
        id:'inti_add_but',
        tooltip:'Send New Student Form Link to Parent',
        listeners:{
          render: function(component){
                component.getEl().on('click', function(){
                     var sessionid=Ext.getCmp('admisnstudsession').getValue(); 
                     var classid=Ext.getCmp('admsnstudclasscombo').getValue(); 
                     if(sessionid!=null && classid !=null)
                     initiateAdmissionOnline(sessionid,classid);
                     else
                     Ext.Msg.alert('Warning','Please Select Sessions and Class to initiate the admission process');    
              });

            }
       }
    },{
        iconCls: 'icon-add',
        text: '<b>New Student</b>',
        id:'add_but',
        tooltip:'Add New Student Offline',
        listeners:{
          render: function(component){
                component.getEl().on('click', function(){
                     var sessionid=Ext.getCmp('admisnstudsession').getValue(); 
                     var classid=Ext.getCmp('admsnstudclasscombo').getValue(); 
                     if(sessionid!=null){                                                    
                           addStudent(sessionid,null,null);
                     }
                     else
                     Ext.Msg.alert('Warning','Please Select Sessions');    
                });

            }
        }
    },{
        iconCls: 'icon-edit',
        text: '<b>Edit</b>',
        id:'admsnStudentEdit',
        disabled: true,
        scope:this,
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                     var rec=Ext.getCmp('admissionstudentgrid').getSelectionModel().getSelection()[0];
                     var sessionid=Ext.getCmp('admisnstudsession').getValue(); 
                     var classid=Ext.getCmp('admsnstudclasscombo').getValue();                     
                     addStudent(sessionid,classid,rec);
         });
       }}
    },{
        iconCls: 'icon-delete',
        text: '<b>Delete</b>',
        disabled: true,
        id: 'admsnStudentDelete',
        listeners:{
            render: function(component){
            component.getEl().on('click', function(){                    
            Ext.Msg.confirm("Alert","Are you sure want to delete records", function(btn){
            if(btn=='yes'){
                var grid = Ext.getCmp('admissionstudentgrid');
                grid.getStore().remove(grid.getSelectionModel().getSelection());
            }
        });
        });  
      }}  
    },{
        xtype:'button',
        text:'<b>Schedule Exam/Interview</b>',
        arrowAlign:'right',        
        disabled: true,
        id: 'admsnStudentsch',
        listeners:{
            render: function(component){
              component.getEl().on('click', function(){
                
                var rec=Ext.getCmp('admissionstudentgrid').getSelectionModel().getSelection()[0];
                
                if(rec!=null && rec.data.status!='Confirm'){
                    schduleExamInterview(rec);
                }else if(rec!=null && rec.data.status=='Confirm'){
                 Ext.getCmp('admsnStudentsch').setDisabled(true);   
                 Ext.Msg.alert('<font color=red><b>Warning</b></font>','Entrance Exam and Interview can not scheduled after admission has been confirmed');     
                 }
                else{
                  Ext.Msg.alert('<font color=red><b>Warning</b></font>','Please select Student from Gird to schedule and send Entrance Exam and Interview Details');  
                }  
                
                    
              });
            }
        }
    },,{
        xtype:'button',
        text:'<b>Attach Document</b>',
        arrowAlign:'right',        
        disabled: true,
        id: 'admsnStudentdoc',
        listeners:{
            render: function(component){
              component.getEl().on('click', function(){
                
                var rec=Ext.getCmp('admissionstudentgrid').getSelectionModel().getSelection()[0];
                var sessionid=Ext.getCmp('admisnstudsession').getValue(); 
                var classid=Ext.getCmp('admsnstudclasscombo').getValue();                     
                
                if(rec!=null){
                    admissionDocument(sessionid , classid , rec);
                }else{
                  Ext.Msg.alert('<font color=red><b>Warning</b></font>','Please select Student from Gird to attach the document');  
                }  
                
                    
              });
            }
        }
    },{
        xtype:'button',
        text:'<b>Pay Fees</b>',
        iconCls: 'icon-add',
        disabled: true,
        id: 'admsnStudentpayfee',        
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                  
                   var id=currentItem.getId();
                   var rec=Ext.getCmp(id).getSelectionModel().getSelection()[0];
                   var sessionid=Ext.getCmp('admisnstudsession').getValue(); 
                   var classid=Ext.getCmp('admsnstudclasscombo').getValue();                     
                   
                    if(rec!=null && rec.data.status!='Confirm')
                        Ext.Msg.alert('Warning','Admission not yet confirm for student : <b>'+rec.data.name +'</b>,Please confirm the admission by editing the student and click on confirm admission');        
                    else if(rec!=null && rec.data.feepaid==1)
                         Ext.Msg.alert('Warning','Admission Fee already paid for'+rec.data.name);        
                    else if(rec!=null && rec.data.feepaid==0)     
                         payFee(sessionid,classid,rec);                         
                    else
                         Ext.Msg.alert('Warning','Please Select Student to Generate Admission Fee');        
                    });
            }
        }
    },{
        xtype:'button',
        text:'<b>Fee Reciept</b>',
        iconCls: 'icon-add',
        disabled: true,
        id: 'admsnStudentfee',        
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                  
                   var id=currentItem.getId();
                   var rec=Ext.getCmp(id).getSelectionModel().getSelection()[0];
                   var sessionid=Ext.getCmp('admisnstudsession').getValue(); 
                   var classid=Ext.getCmp('admsnstudclasscombo').getValue();                     
                   
                    if(rec!=null)
                         generateAdmissionFeeReceipt(sessionid,classid,rec);                         
                    else
                         Ext.Msg.alert('Warning','Please Select Student to Generate Admission Fee');        
                    });
            }
        }
    }
    ];
    this.bbar =[Ext.create('Ext.PagingToolbar', {
        store: this.store,
        displayInfo: true,
        displayMsg: 'Displaying users {0} - {1} of {2}',
        emptyMsg: "No user to display",
        items:[{
        xtype:'button',
        text:'Print',        
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    
                    });
            }
        }
    },{
        xtype:'splitbutton',
        text:'Export Data',
        arrowAlign:'right',        
        menu: [{text: 'PDF'},{text: 'Excelsheet'}],
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                   
                    });

            }
        }
    }]
    })];
     
     this.callParent(arguments);
    },

    onRender : function(){
        //this.selModel.on('selectionchange', this.onSelectChange);
        this.callParent(arguments);
    }    
});



