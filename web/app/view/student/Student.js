function viewCompleteProfile(rec){

    var app1=app.getController('Dashboard')
    var Tab = Ext.create('MyApp.view.student.CompleteProfile',{currentRecord:rec});
    app1.getDashboard().add(Tab);
    app1.getDashboard().setActiveTab(Tab);  
}

function addStudent(sessionid,classid,rec){
    
    var win;
    if(!win){
        win = Ext.create('Ext.window.Window', {
            title:rec?'Edit New Student Form':'Add New Student Form',
            id: rec?'editstudent_win':'addstudent_win',
            width:620,
            height:580,
            closeAction:'destroy',
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
                            defaults:{
                                        xtype:'textfield',
                                        value:'',
                                        labelWidth:200,
                                        height:18
                            },
                            items:[
                                {
                                    name : 'sessionname',
                                    fieldLabel: 'SessionName',
                                    id:'sessionname',
                                    value:Ext.getCmp('studsession').getRawValue(),
                                    readOnly:true,
                                    width:600,
                                    hidden:true
                                },
                                {
                                    name : 'admissionno',
                                    fieldLabel: 'Old School Admission Number',
                                    id:'admissionno',
                                    value:rec?rec.data.admissionno:null,                                    
                                    width:600                                    
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
                                    width:600,
                                    value:rec?rec.data.admissiontype:null,                                    
                                },
                                {
                                    name : 'formno',
                                    fieldLabel: 'Application Form Number',
                                    id:'formno',
                                    value:rec?rec.data.formno:null,
                                    //readOnly:true,
                                    width:600,
                                    hidden:true
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
                                    value:rec?rec.data.classid:null,                                    
                                },
                                {
                                    xtype:'datefield',
                                    name : 'dob',
                                    fieldLabel: 'Date of Birth',
                                    id:'dob',
                                    format: 'm-d-Y',
                                    altFormats: 'm-d-Y|m.d.Y',
                                    width:600,
                                    value:rec?rec.data.dob:null
                                    },
                                {
                                    xtype:'datefield',
                                    name : 'admissiondate1',
                                    fieldLabel: 'Date of Admission',
                                    id:'admissiondate1',
                                    format: 'm-d-Y',
                                    altFormats: 'm-d-Y|m.d.Y',
                                    width:600       ,
                                    value:rec?rec.data.admissiondate1:null
                                },
                                {
                                    xtype:'combobox',
                                    fieldLabel :'Select Gender',
                                    id:'gender',
                                    name:'gender',
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
                                    value:rec?rec.data.gender:null                                    

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
                                    width:600   ,
                                    value:rec?rec.data.religion:null                                    
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
                                    fieldLabel: 'Previledge Student Category',
                                    id:'previledged_student',
                                    name : 'previledged_student',
                                    store:Ext.create('MyApp.store.Master').load({
                                                                  params:{propertyId:52} //peorpetty religion id =4
                                                         }),
                                    typeAhead: true,
                                    queryMode: 'local',
                                    emptyText: 'Select Previledge Student Category.',
                                    Autoload:true,
                                    valueField :'id',
                                    displayField :'value',
                                    width:600,
                                    value:rec?rec.data.previledged_student:null
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
                                    value:rec?rec.data.nationality:null                                    
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
                                    value:rec?rec.data.visadetail:null
                                    
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
                                    value:rec?rec.data.aadhar_id:null
                                },{

                                    fieldLabel: 'Blood Group',
                                    id:'blood_group',
                                    name : 'blood_group',
                                    width:600,
                                    value:rec?rec.data.aadhar_id:null
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
                                    name : 'motherhishedu',
                                    fieldLabel: 'Mother Highest Education',
                                    id : 'motherhishedu',
                                    width:600,
                                    value:rec?rec.data.motherhishedu:null                                    
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
                                    height:50,
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
                                    value:rec?rec.data.stateid:null

                                },
                                {
                                    name : 'cityid',
                                    fieldLabel: 'City',
                                    id:'cityid',
                                    name:'cityid',
                                    width:600,
                                    value:rec?rec.data.cityid:null
                                }
                            ]
                           },   
                           { ///Intrance Exam Result
                            title: 'Intrance Exam Result',
                            width:620,
                            height:580,     
                            readOnly:true,
                            hidden:true,  
                            defaults:{
                                        xtype:'textfield',
                                        value:'',
                                        labelWidth:200,
                                        height:18
                            },
                            items:[
                                {
                                    xtype:'datefield',
                                    name : 'intrvexamdate',
                                    fieldLabel: 'Date of Intrance Exam',
                                    id:'intrvexamdate',
                                    format: 'm d Y',
                                    altFormats: 'm,d,Y|m.d.Y',
                                    width:600
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
                            hidden:true,  
                            defaults:{
                                        xtype:'textfield',
                                        value:'',
                                        labelWidth:200,
                                        height:18
                            },
                            items:[ {
                                    xtype:'datefield',
                                    name : 'intrviewdate',
                                    fieldLabel: 'Date of Interview',
                                    id:'intrviewdate',
                                    format: 'm d Y',
                                    altFormats: 'm,d,Y|m.d.Y',
                                    width:600
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
                text: 'Save Details',
                action: 'save',
                scope:this,
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
                            'admissiondate1'     :new Date(Ext.getCmp('admissiondate1').getValue()).getTime(),
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
                            'category'          :Ext.getCmp('category').getValue(),
                            'previledged_student':Ext.getCmp('previledged_student').getValue(),
                            'motherhishedu'     :Ext.getCmp('motherhishedu').getValue(),
                            'studentid'         :rec?rec.data.studentid:null
                         };                             
                  Ext.Ajax.request({
                    url:'student/add.do',
                    type:'json',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    params:Ext.JSON.encode(data),
                    success: function(res){
                        var rec = eval('('+res.responseText+')');
                        if(rec.admissionno!=null){
                        var sessionid=Ext.getCmp('studsession').getValue();
                        var classid  =Ext.getCmp('studclasscombo').getValue();                                    
                        Ext.Msg.alert('Success','Student added successfully ,<b> Admission Number </b>:'+rec.admissionno);
                        Ext.getCmp('studentgrid').getStore().reload({
                                            params:{
                                                    classid:classid,
                                                    sessionid   :sessionid
                                            }
                                      }); 
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
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
}

function onChangeStudentProfilePic(rec){
       
        var win = Ext.getCmp('changestudprofile_win');
        if(!win){
            win = Ext.create('Ext.app.view.component.AppWindow', {
                title:'Change Student Profile Page For :<font color="red">'+rec.data.name+'</font>',
                id:'changestudprofile_win',
                width:600,
                closeAction:'hide',
                top:{
                    image:'resources/images/portal-icon/changeprofile.png',
                    formTitle:'<b>Change Student Profile Picture</b>'
                },
                defaults:{
                    width:550,
                    xtype:'textfield'
                },
                formItems :[
                {
                    name : 'id',
                    id : 'id',
                    hidden:true,
                    value:rec.data.studentid
                },
                {
                xtype: 'fileuploadfield',
                fieldLabel :'Upload Your Profile Photo',
                id:'filepic',
                name:'filepic',
                buttonText: 'Browse Your Local Drive',
                buttonConfig: {
                iconCls: 'upload-icon'
                }
                }
                ],
                buttons :[
                {
                    text: 'Upload',
                    action: 'save',
                    scope:this,
                    handler:this.saveStudProfilePic
                },
                {xtype:'btncancel'}
                ]
            });
        }
        win.show();
 } 

function saveStudProfilePic(btn){
     var form = btn.up('window').down('form').getForm();
     if(form.isValid()){
           form.submit({
                    url: 'student/addprofpic.do',
                    success: function(fp, o) {
                    Ext.example.msg('Success','Profile Picture Updated Successfully');

                    },
                    failure: function(fp, o) {
                        Ext.example.msg('Failure','Unexpected Error Occured,Please Contact Administrator');
                    }
          }); 
      }
}
            
function addStudentTransport(rec){
    
    var win;
    if(!win){
        win = Ext.create('Ext.app.view.component.AppWindow', {
            title:'Add Transport For : <b>'+rec.data.name+'</b>',
            id: rec?'edittrans_win':'addtrans_win',
            width:400,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/portal-icon/add_trans.jpg',
                formTitle:'<font color=green>Add Student Transport Data</font>'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:300
            },
            url:'ppppp',
            formItems :[
            {
                name : 'name',
                fieldLabel: 'Student Name',
                id:'name',
                value:rec.data.name
            },
            {
                xtype:'combobox',
                fieldLabel :'From Location',
                id:'fromlocation',
                name:'fromlocation',
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:9}}),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select a Source Location...',
                Autoload:true,               
                valueField :'id',
                displayField :'value'
            },
            {
                name : 'tolocation',
                fieldLabel: 'Destination Location',
                id:'tolocation',
                xtype:'combobox',
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:9}}),/*for State detail id is 6*/
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select a Destination Location...',
                Autoload:true,
                valueField :'id',
                displayField :'value'
            },
            {
                xtype:'combobox',
                fieldLabel: 'Route',
                id:'route',
                name : 'route',
                store:Ext.create('MyApp.store.Combo').load({
                                              params:{propertyId:9} //For Route
                                     }),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Route',
                Autoload:true,
                valueField :'id',
                displayField :'value',
                listeners:{
                select: function(component){
                var id=Ext.getCmp('route').getValue();
                Ext.getCmp('vehicle').getStore().reload({
                     params:{                             
                             routeid   :id 
                     }
               });
               }
              }
            },{
                xtype:'combobox',
                fieldLabel: 'Vehicle',
                id:'vehicle',
                name : 'vehicle',
                store:Ext.create('MyApp.store.VehicleCombo').load({
                                              params:{routeid:null} //For Route
                                }),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Vehicle',
                Autoload:true,
                valueField :'id',
                displayField :'value',
                renderer :function(val)
                {
                    return '<b>'+val+'</b>';
                },
                listeners:{
                select: function(component){
                
               }
             }
            },
            {
                xtype:'datefield',
                name : 'startdate',
                fieldLabel: 'Start Date',
                id:'startdate',
                format: 'm d Y',
                altFormats: 'm-d-Y|m.d.Y'
            },
            {
                xtype:'checkbox',
                fieldLabel: 'Enable',
                id:'status',
                name : 'status'           
            }
            ],
            buttons :[
            {
                text: 'Save',
                action: 'save',
                scope:this,
                listeners:{
                render: function(component){
                component.getEl().on('click', function(){                                        
                  
                var data={  'routeid'         :Ext.getCmp('route').getValue(),
                            'studentid'       :rec.data.studentid,
                            'fromlocation'    :Ext.getCmp('fromlocation').getValue(),
                            'tolocation'      :Ext.getCmp('tolocation').getValue(),
                            'startdate'       :new Date(Ext.getCmp('startdate').getValue()).getTime(),       
                            'status'          :Ext.getCmp('status').getValue(),
                            'vehicle'         :Ext.getCmp('vehicle').getValue() 
                         };                             
                  Ext.Ajax.request({
                    url:'studenttransport/add.do',
                    type:'json',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    params:Ext.JSON.encode(data),
                    success: function(res){
                        var rec = eval('('+res.responseText+')');
                        if(rec.pid!=null)
                        Ext.Msg.alert('Success','Transport Added successfully');
                        else
                        Ext.Msg.alert('Failure','Error Occured , Please Contact Admin');    
                    }
                });

                 });
                }
              }
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
}

function addStudentHostel(rec){
   //hostel/gethostelcmbo.do 
    var win;
    if(!win){
        win = Ext.create('Ext.app.view.component.AppWindow', {
            title:'Add Hostel For : <b>'+rec.data.name+'</b>',
            id: rec?'edittrans_win':'addtrans_win',
            width:400,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/portal-icon/add_trans.jpg',
                formTitle:'<font color=green>Add Student Hostel Data</font>'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:300
            },
            url:'ppppp',
            formItems :[
            {
                xtype:'combobox',
                fieldLabel :'Select Hostel',
                id:'hostel',
                name:'hostel',
                store:Ext.create('MyApp.store.HostelCombo').load(),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select a Hostel...',
                Autoload:true,               
                valueField :'id',
                displayField :'value',
                listeners:{
                    select: function(component){
                    var hostelId=Ext.getCmp('hostel').getValue();
                        //    alert(hostelId);
                    Ext.getCmp('vroom').getStore().load({
                     params:{
                             'hostelId':hostelId///room List
                     }
                    });
                    }
               }
            },
            {
                xtype:'combobox',
                fieldLabel :'Room',
                id:'vroom',
                name:'vroom',
                store:'RoomCombo',
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select a room...',
                Autoload:true,               
                valueField :'id',
                displayField :'value'
            },
            {
                xtype:'datefield',
                name : 'fromdate',
                fieldLabel: 'From Date',
                id:'fromdate',
                format: 'm d Y',
                altFormats: 'm-d-Y|m.d.Y'
            },
            {
                xtype:'datefield',
                name : 'todate',
                fieldLabel: 'To Date',
                id:'todate',
                format: 'm d Y',
                altFormats: 'm-d-Y|m.d.Y'
            },
            {
                name : 'amount',
                fieldLabel: 'Total Amount',
                id:'amount'
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
                text: 'Save',
                action: 'save',
                scope:this,
                listeners:{
                render: function(component){
                component.getEl().on('click', function(){                                        
                  
                var data={  'routeid'         :Ext.getCmp('route').getValue(),
                            'studentid'       :rec.data.studentid,
                            'fromlocation'    :Ext.getCmp('fromlocation').getValue(),
                            'tolocation'      :Ext.getCmp('tolocation').getValue(),
                            'startdate'       :new Date(Ext.getCmp('startdate').getValue()).getTime(),       
                            'status'          :Ext.getCmp('status').getValue(),
                            'vehicle'         :Ext.getCmp('vehicle').getValue() 
                         };                             
                  Ext.Ajax.request({
                    url:'studenttransport/add.do',
                    type:'json',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    params:Ext.JSON.encode(data),
                    success: function(res){
                        var rec = eval('('+res.responseText+')');
                        if(rec.pid!=null)
                        Ext.Msg.alert('Success','Transport Added successfully');
                        else
                        Ext.Msg.alert('Failure','Error Occured , Please Contact Admin');    
                    }
                });

                 });
                }
              }
                    
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
    
}

Ext.define('MyApp.view.student.Student' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.studentlist',
    closable:true,
    title: 'Student Details',
    id:'studentgrid',
    layout:'fit',
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },
    store:'Student',
    initComponent: function() {
    var classid;
    var sessionid;
    this.columns=[
    Ext.create('Ext.grid.RowNumberer'),    
    {
        header: 'Admission No',
        dataIndex:'admissionno',
        style :'color:#17385B;font-weight:bold',
        width:'10%'
    },{
        header: 'Roll No',
        dataIndex:'rollno',
        style :'color:#17385B;font-weight:bold',
        width:'10%'
    },
    {
        header: 'Name',
        dataIndex:'name',
        style :'color:#17385B;font-weight:bold',
        width:'15%'
    },
    {
        header:'Class',
        dataIndex:'classid',
        style :'color:#17385B;font-weight:bold',
        hidden:true
    },
    {
        header:'Date Of Birth',
        dataIndex:'dob',
        style :'color:#17385B;font-weight:bold',
        width:'10%'
    },

    {
        header:'Father Name',
        dataIndex:'fathername',
        style :'color:#17385B;font-weight:bold',
        width:'10%'
    },

    {
        header:'Mother Name',
        dataIndex:'mothername',
        style :'color:#17385B;font-weight:bold',
        width:'10%'
    },

    {
        header:'CareTaker Name',
        dataIndex:'caretakername',
        style :'color:#17385B;font-weight:bold',
        hidden:true
    },

    {
        header:'Parent email',
        dataIndex:'parentemailid',
        style :'color:#17385B;font-weight:bold',
        width:'10%'
    },

    {
        header:'Parent Mobile',
        dataIndex:'parentmobile',
        style :'color:#17385B;font-weight:bold',
        width:'10%'
    },

    {
        header:'Alertname Email',
        dataIndex:'alternateemailid',
        style :'color:#17385B;font-weight:bold',
        hidden:true
    },

    {
        header:'Addmission Date',
        dataIndex:'admissiondate1',
        style :'color:#17385B;font-weight:bold',
        hidden:true
    },
    {
        header:'Religion',
        dataIndex:'religion',
        style :'color:#17385B;font-weight:bold',
        hidden:true
    },
    {
        header:'Address',
        dataIndex:'address',
        style :'color:#17385B;font-weight:bold',
        width:'10%'
    },
    {
        header:'City',
        dataIndex:'cityid',
        style :'color:#17385B;font-weight:bold',
        hidden:true
    },{
        header:'State',
        dataIndex:'stateid',
        style :'color:#17385B;font-weight:bold',
        hidden:true
    },{
        header:'Country',
        dataIndex:'countryid',
        style :'color:#17385B;font-weight:bold',
        hidden:true
    },{
        header:'Occupation',
        dataIndex:'occupation',
        style :'color:#17385B;font-weight:bold',
        hidden:true
    },{
        header:'Father Hisghest Qualification',
        dataIndex:'fatherhighestedu',
        style :'color:#17385B;font-weight:bold',
        hidden:true
    },{
        header:'Mother Hisghest Qualification',
        dataIndex:'motherhishedu',
        style :'color:#17385B;font-weight:bold',
        hidden:true
    },{
        header:'Annual Income',
        dataIndex:'annualincome',
        style :'color:#17385B;font-weight:bold',
        hidden:true
    },{
        header:'Image Path',
        dataIndex:'image_path',
        style :'color:#17385B;font-weight:bold',
    }

  ];
     this.selModel = Ext.create('Ext.selection.CheckboxModel',{
            singleSelect:true,
            listeners:{
            selectionchange:function(sm){

                   Ext.getCmp('StudentEdit').setDisabled((sm.getCount()==0));
                   Ext.getCmp('Studentdelete').setDisabled((sm.getCount()==0));
            }
          }

     });
     this.tbar =[{
        xtype: 'searchfield',
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
        id:'studsession',
        emptyText: 'Select Session',   
        store:Ext.create('MyApp.store.Combo').load({
                                      params:{propertyId:-1}}),//For Session
        Autoload:true,
        queryMode: 'local',
        width:90,
        displayField: 'value',
        valueField: 'id',
        value:SETTING.Users.properties.session_id,        
        name:'type',
            listeners:{
            select: function(component){
                var sessionid=Ext.getCmp('studsession').getValue();
                Ext.getCmp('studclasscombo').getStore().load({
                     params:{
                             propertyId:2,///Class List
                             classid   :sessionid,///Provide Batch_id
                             teacherid :SETTING.Users.userId
                     }
               });
            }
       }
    },{
       xtype: 'combo',
       emptyText: 'Select Class',
       text   : 'Class',
       id:'studclasscombo',
       width:90,
       store:Ext.create('MyApp.store.ClassCombo1').load({
                                      params:{propertyId:2,
                                              classid:SETTING.Users.properties.session_id,
                                              teacherid :SETTING.Users.userId
                                    }}),
       typeAhead: true,
       queryMode: 'local',
       Autoload:true,
       valueField :'id',
       displayField :'value',  
       listeners:{
            select: function(component){
                var sessionid=Ext.getCmp('studsession').getValue();
                var classid  =Ext.getCmp('studclasscombo').getValue(); 
                this.sessionid=Ext.getCmp('studsession').getValue();
                this.classid  =Ext.getCmp('studclasscombo').getValue(); 
                
                if(sessionid!=null && classid!=null)    
                {
                     Ext.getCmp('studentgrid').getStore().load({
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
        text: 'Add Student',
        scope:this,
          handler: function(component){
                     var sessionid=Ext.getCmp('studsession').getValue(); 
                     var classid=Ext.getCmp('studclasscombo').getValue(); 
                     if(sessionid!=null)
                     addStudent(sessionid,classid,null);
                     else
                     Ext.Msg.alert('Warning','Please Select Sessions');    
            }
    },{
        iconCls: 'icon-edit',
        text: 'Edit',
        id:'StudentEdit',
        disabled: true,
        scope:this,
        handler: function(component){
                     var rec=Ext.getCmp('studentgrid').getSelectionModel().getSelection()[0];
                     var sessionid=Ext.getCmp('studsession').getValue(); 
                     var classid=Ext.getCmp('studclasscombo').getValue();                     
                     if(rec!=null)
                     addStudent(sessionid,classid,rec);
        }
    },{
        iconCls: 'icon-delete',
        text: 'Delete',
        disabled: true,
        id: 'Studentdelete',
        handler: function(component){
    
    
            Ext.Msg.confirm("Alert","Are you sure want to delete records", function(btn){
            if(btn=='yes'){
                var grid = Ext.getCmp('studentgrid');
                grid.getStore().remove(grid.getSelectionModel().getSelection());
            }
        });
        }      
    },{
        xtype:'button',
        text:'Complete Profile',
        iconCls: 'icon-add',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    var rec=Ext.getCmp('studentgrid').getSelectionModel().getSelection()[0];
                    if(rec!=null)
                       viewCompleteProfile(rec);
                    });

            }
        }
    },{
        xtype:'splitbutton',
        text:'Set Role-No',
        arrowAlign:'right',        
        menu: [{
                   text: '<font color=#17385B><b>Arrange By First Name</b></font>',
                   handler: function(){
                       
                     var sessionid=Ext.getCmp('studsession').getValue(); 
                     var classid=Ext.getCmp('studclasscombo').getValue();                     
                     var data={sessionid:sessionid,
                               classid:classid,
                               rolltype:1
                              };  
                        Ext.Ajax.request({
                        url:'student/setrollno.do',
                        type:'json',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        params:Ext.JSON.encode(data),
                        success: function(res){
                            var rec = eval('('+res.responseText+')');
                            if(rec.Success)
                            Ext.Msg.alert('Success','Role Number Added successfully');
                            else
                            Ext.Msg.alert('Failure','Error Occured , Please Contact Admin');    
                        }
                    });
                   }
               },{
                   text: '<font color=#17385B><b>Arrange By Middle Name</b></font>',
                   handler: function(){
                        
                   }
               },{
                   text: '<font color=#17385B><b>Arrange By Last Name</b></font>',
                   handler: function(){
                        
                   }
               },
               {text: '<font color=#17385B><b>Arrange By Addmission No</b></font>',
                handler: function(){} 
               },
               {text: '<font color=#17385B><b>Mannual Setup</b></font>',
                handler: function(){} 
               }
              ],
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    });

            }
        }
    },{
        xtype:'button',
        text:'Add Transport',
        iconCls: 'icon-add',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){     
                    var rec=Ext.getCmp('studentgrid').getSelectionModel().getSelection()[0];
                    if(rec!=null)
                    addStudentTransport(rec);
                    });

            }
        }
    },{
        xtype:'button',
        text:'Add Hostel',
        iconCls: 'icon-add',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    var rec=Ext.getCmp('studentgrid').getSelectionModel().getSelection()[0];
                    if(rec!=null)
                    addStudentHostel(rec);
                    });
            }
        }
    },{
        xtype:'button',
        text:'Add Previous School',
        iconCls: 'icon-add',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                  
                    //addFeeTemplate();
                    });

            }
        }
    },{
        xtype:'button',
        text:'Add Profile Picture',
        iconCls: 'icon-add',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    var rec=Ext.getCmp('studentgrid').getSelectionModel().getSelection()[0];
                    if(rec!=null)
                       onChangeStudentProfilePic(rec);
                    });

            }
        }
    },
    ];
    this.bbar =[Ext.create('Ext.PagingToolbar', {
        /*store: this.store.load({
                     params:{                             
                             classid   :this.classid,
                             sessionid :this.sessionid
                     }
                     }),*/
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
                    //addFeeTemplate();
                    })
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
                    //addFeeTemplate();
                    })

            }
        }
    },{
        xtype:'button',
        text:'Add Achievement',
        iconCls: 'icon-add',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                  
                    //addFeeTemplate();
                    });

            }
        }
    },{
        xtype:'button',
        text:'Email-SMS Setting',
        iconCls: 'icon-add',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                  
                    //addFeeTemplate();
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
    },
    selectionChange : function(sm, selected,eOpts){
       
        if(sm.getCount()){
          alert('fff');
    }
    }
});



