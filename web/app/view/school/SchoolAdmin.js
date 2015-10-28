/*
 * 
 * @param {type} param1
 * @param {type} param2
 * 
 * School Details : Name ,Address , Contact 
 * School Setting :Email , SMS 
 * School Principal Details ,Primary and Secondry
 * School Affiliation Details
 * School Timeing , School Number of Periods , 
 * 
 */

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

Ext.define('MyApp.view.school.SchoolAdmin',{
    extend:'Ext.container.Container',
    alias:'widget.schooladmin',
    title:'School Aministration',
    closable:true,
    cls:'school',
    id:'schooladmin',
    store :'SchoolAdmin',
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
            items:[{  
                         title:'School Information',
                         xtype:'panel',
                         extend: 'Ext.panel.Panel',
                         width :'25%',
                         cls:'detailpanel', 
                         tools: [
                               {
                                    
                                     type: 'edit',
                                     tooltip: 'Edit Details',
                                     cls:'edit-form',
                                     handler: function() {                                         
                                         var form=Ext.getCmp('detailform');                                                                                  
                                         var fields=form.items;                                                                                   
                                         for(i=0;i<fields.length;i++)
                                         fields.items[i].setReadOnly(false); 
                                         Ext.getCmp('update_s_d').show();
                              }}
                                     
                          ],
                         items:[{                                
                            cls:'upperdetailform',
                            xtype:Ext.create('Ext.form.Panel',{
                            id :'detailform',
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
                                name: 'schoolname',
                                fieldLabel: 'School Name',
                                height:16,
                                id: 'schoolname',
                                style :'color:#17385B;font-weight:bold'
                                
                            },{
                                xtype: 'textareafield',
                                name: 'description',
                                id: 'description',
                                fieldLabel: 'About School',
                                style :'color:#17385B;font-weight:bold'
                            },/* {
                                xtype: 'filefield',
                                name: 'file1',
                                id: 'file1',
                                fieldLabel: 'School Logo'
                            },*/{
                                xtype: 'textfield',
                                name: 'schooltitle',
                                id: 'schooltitle',
                                height:16,
                                fieldLabel: 'School Mantra',
                                style :'color:#17385B;font-weight:bold'
                            },{
                                xtype: 'datefield',
                                name: 'startdate',
                                id: 'startdate',
                                height:16,
                                fieldLabel: 'School Start Date',
                                style :'color:#17385B;font-weight:bold'
                            },{
                                xtype: 'textfield',
                                name: 'pricipalname',
                                id: 'pricipalname',
                                fieldLabel: 'Pricipal Name',
                                height:16,
                                style :'color:#17385B;font-weight:bold'
                            },{
                                xtype: 'textfield',
                                name: 'websiteurl',
                                id: 'websiteurl',
                                fieldLabel: 'Website URL',
                                height:16,
                                style :'color:#17385B;font-weight:bold'
                            }]
                        })
                         }                         
                     ],
                     buttons:[{text:'Update',
                               id  :'update_s_d',      
                               hidden:true,
                               listeners:{
                               render: function(component){
                               component.getEl().on('click', function(){                                       
                               var data={  
                                            'schoolname'    :Ext.getCmp('schoolname').getValue(),
                                            'schooltitle'   :Ext.getCmp('schooltitle').getValue(),
                                            'pricipalname'  :Ext.getCmp('pricipalname').getValue(),
                                            'websiteurl'    :Ext.getCmp('websiteurl').getValue(),
                                            'startdate'     :new Date(Ext.getCmp('startdate').getValue()).getTime(),
                                            'description'   :Ext.getCmp('description').getValue(),
                                            'schoolid'      :SETTING.Users.properties.schoolid,
                                            'flag'          :'0'
                                         };                             
                               Ext.Ajax.request({
                                    url:'schooladmin/save.do',
                                    type:'json',
                                    headers:{
                                        'Content-Type':'application/json'
                                    },
                                    params:Ext.JSON.encode(data),
                                    success: function(res){
                                        var rec = eval('('+res.responseText+')');
                                        if(rec.flag=='0')
                                        Ext.Msg.alert('Success','School Details Saved successfully');
                                        else
                                        Ext.Msg.alert('Success','Error Occured , Please Contact Admin');    
                                    }
                                });
                              
                                 });
                                }
                           }
                                 
                     }]
                   },
                   {
                         title:'School Address',
                         xtype:'panel',
                         extend: 'Ext.panel.Panel',
                         width :'25%',
                         cls:'detailpanel', 
                         tools: [
                               {
                                     text:'dfdfdf',
                                     type: 'edit',
                                     tooltip: 'Edit Details',
                                     cls:'edit-form',
                                     handler: function() {                                         
                                         var form=Ext.getCmp('addressdetails');                                                                                  
                                         var fields=form.items;                                                                                   
                                         for(i=0;i<fields.length;i++)
                                         fields.items[i].setReadOnly(false); 
                                         Ext.getCmp('update_s_d_2').show();
                              }
                          }],
                         items:[{    
                            cls:'upperdetailform',
                            xtype:Ext.create('Ext.form.Panel', {
                            bodyPadding: 10,
                            readOnly:true,
                            id :'addressdetails',     
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
                                name: 'addressline1',
                                id  : 'addressline1',
                                fieldLabel: 'Address Line-1',
                                height:16,                                
                                style :'color:#17385B;font-weight:bold'
                            },{
                                xtype: 'textfield',
                                name : 'addressline2',
                                id   : 'addressline2',
                                fieldLabel: 'Address Line-2',
                                height:16,                                
                                style :'color:#17385B;font-weight:bold'
                            },{
                                xtype: 'textfield',
                                name : 'city',
                                id   : 'city',
                                fieldLabel: 'City',
                                height:16,                                
                                style :'color:#17385B;font-weight:bold'
                            }, {
                                xtype: 'textfield',
                                name : 'state',
                                id   : 'state',
                                fieldLabel: 'State',
                                height:16,                                
                                style :'color:#17385B;font-weight:bold'
                            },{
                                xtype: 'textfield',
                                name : 'country',
                                id   : 'country',
                                fieldLabel: 'Country',
                                height:16,                                
                                style :'color:#17385B;font-weight:bold'
                            },{
                                xtype: 'textfield',
                                name: 'pinnumber',
                                id: 'pinnumber',
                                fieldLabel: 'Pin Number',
                                height:16,                                
                                style :'color:#17385B;font-weight:bold'
                            }]
                        })
                 }],
                       buttons:[
                           {
                            text:'Update',                            
                            bodyPadding: 20,
                            hidden:true,
                            id:'update_s_d_2',
                            listeners:{
                                render: function(component){
                                component.getEl().on('click', function(){   
                                    
                                var data={  
                                            'addressline1':Ext.getCmp('addressline1').getValue(),
                                            'addressline2'   :Ext.getCmp('addressline2').getValue(),
                                            'city'      :Ext.getCmp('city').getValue(),
                                            'state'    :Ext.getCmp('state').getValue(),
                                            'country'      :Ext.getCmp('country').getValue(),
                                            'pinnumber'   :Ext.getCmp('pinnumber').getValue(),
                                            'schoolid'   :SETTING.Users.properties.schoolid,
                                            'flag'       :'1'
                                         };                             
                                  Ext.Ajax.request({
                                    url:'schooladmin/save.do',
                                    type:'json',
                                    headers:{
                                        'Content-Type':'application/json'
                                    },
                                    params:Ext.JSON.encode(data),
                                    success: function(res){
                                        var rec = eval('('+res.responseText+')');
                                        if(rec.flag=='0')
                                        Ext.Msg.alert('Success','Address Details Saved successfully');
                                        else
                                        Ext.Msg.alert('Success','Error Occured , Please Contact Admin');    
                                    }
                                });
                              
                                 });
                                }
                           }
                        }
                       ]
                   },
                   {
                         title:'School Contact',
                         xtype:'panel',
                         extend: 'Ext.panel.Panel',
                         width :'25%',
                         cls:'detailpanel', 
                         tools: [
                               {
                                     text:'dfdfdf',
                                     type: 'edit',
                                     tooltip: 'Edit Details',
                                     cls:'edit-form',
                                     handler: function() {                                         
                                         var form=Ext.getCmp('contactdetails');                                                                                  
                                         var fields=form.items;                                                                                   
                                         for(i=0;i<fields.length;i++)
                                         fields.items[i].setReadOnly(false); 
                                         Ext.getCmp('update_s_d_3').show();
                              }
                          }],
                         items:[{                                
                            xtype:Ext.create('Ext.form.Panel', {
                            id :'contactdetails',         
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
                                name: 'contact1',
                                id  : 'contact1',
                                fieldLabel: 'Contact-No-1',
                                height:16,                                
                                style :'color:#17385B;font-weight:bold'
                            },{
                                xtype: 'textfield',
                                name : 'contact2',
                                id   : 'contact2',
                                fieldLabel: 'Contact-No-2',
                                height:16,                                
                                style :'color:#17385B;font-weight:bold'
                            },{
                                xtype: 'textfield',
                                name: 'contact3',
                                id   : 'contact3',
                                fieldLabel: 'Contact-No-3',
                                height:16,                                
                                style :'color:#17385B;font-weight:bold'
                            },{
                                xtype: 'textfield',
                                name: 'emailid1',
                                id   : 'emailid1',
                                fieldLabel: 'Email Id-1',
                                height:16,                                
                                style :'color:#17385B;font-weight:bold'
                            },{
                                xtype: 'textfield',
                                name: 'emailid2',
                                id   : 'emailid2',
                                fieldLabel: 'Email Id-2',
                                height:16,                                
                                style :'color:#17385B;font-weight:bold'
                            }
                            ]
                        })
                         }
                     ],buttons:[{ 
                            text:'Update',
                            id:'contactbutton',
                            hidden:true,
                            id:'update_s_d_3',
                            bodyPadding: 20,
                            listeners:{
                                render: function(component){
                                component.getEl().on('click', function(){  
                                alert('gffgkhfgkjfhgs');    
                                var data={ 
                                            'contact1'       :Ext.getCmp('contact1').getValue(),
                                            'contact2'   :Ext.getCmp('contact2').getValue(),
                                            'contact3'      :Ext.getCmp('contact3').getValue(),
                                            'emailid1'    :Ext.getCmp('emailid1').getValue(),
                                            'emailid2'      :Ext.getCmp('emailid2').getValue(),
                                            'schoolid'   :SETTING.Users.properties.schoolid,
                                            'flag'       :'2'
                                         };                             
                                  Ext.Ajax.request({
                                    url:'schooladmin/save.do',
                                    type:'json',
                                    headers:{
                                        'Content-Type':'application/json'
                                    },
                                    params:Ext.JSON.encode(data),
                                    success: function(res){
                                        var rec = eval('('+res.responseText+')');
                                        if(rec.flag=='0')
                                        Ext.Msg.alert('Success','Contact Details added successfully');
                                        else
                                        Ext.Msg.alert('Success','Error Occured , Please Contact Admin');    
                                    }
                                });
                              
                                 });
                                }
                           }
                      }]
                   },{
                    xtype:'grid',
                    store:'Route',
                    id:'route_grid',
                    title:'Session/Batch Details',
                    width:'25%',
                    vieConfig:{
                       forceFit:true
                    },
                    tools: [
                               {
                                     type: 'edit',
                                     tooltip: 'Edit Details',
                                     cls:'edit-form',
                                     handler: function() {                                         
                                            var win = Ext.getCmp('session_win');
                                            if(!win){
                                                //win=Ext.create('Ext.app.view.component.AppWindow', {
                                                  win=Ext.create('Ext.window.Window', {  
                                                    title:'Add New Session Form',
                                                    id:'addsession_win',
                                                    width:530,
                                                    closeAction:'destroy',
                                                    top:{
                                                        image:BASE_URL+'resources/images/createuser.png',
                                                        formTitle:'Create Session Details'
                                                    },
                                                    defaults:{
                                                        xtype:'textfield',
                                                        value:'',
                                                        labelWidth:350,
                                                        style:'backgruond-color:white;font-size:10px;font-weight:bold;margin:5px 5px 5px 5px'
                                                    },
                                                    url:'ppppp',
                                                    items :[
                                                    {
                                                        name : 'session',                
                                                        id:'session',
                                                        hidden:true,
                                                        fieldLabel: 'Session Id'
                                                    },
                                                    {
                                                        name : 'sessionname',
                                                        fieldLabel: 'Session Name',
                                                        id:'sessionname'
                                                    },{
                                                        xtype:'combobox',
                                                        fieldLabel :'Session Year',
                                                        id:'sessionyear',
                                                        name:'sessionyear',                
                                                        store:Ext.create('MyApp.store.Master').load({
                                                                              params:{propertyId:6}}),//For Location
                                                        typeAhead: true,
                                                        queryMode: 'local',
                                                        emptyText: 'Select a Year...',
                                                        Autoload:true,
                                                        valueField :'id',
                                                        displayField :'value'
                                                    },
                                                    {
                                                        name : 'batchname',
                                                        fieldLabel: 'Batch Name',
                                                        id:'batchname'
                                                    },{
                                                        xtype:'datefield',
                                                        name : 'validfrom',
                                                        fieldLabel: 'Session Valid From',
                                                        id:'validfrom',
                                                        format: 'm-d-Y',
                                                        altFormats: 'm-d-Y|m.d.Y'                                                       
                                                     },{
                                                        xtype:'datefield',
                                                        name : 'validto',
                                                        fieldLabel: 'Session Valid To',
                                                        id:'validto',
                                                        format: 'm-d-Y',
                                                        altFormats: 'm-d-Y|m.d.Y'
                                                     },
                                                     {
                                                        xtype:'checkbox',
                                                        name : 'markcurrentsession',
                                                        fieldLabel: 'Mark This Session As Current Seesion Year',
                                                        id:'markcurrentsession'
                                                    },{
                                                        xtype:'checkbox',
                                                        name : 'classsestting',
                                                        fieldLabel: 'Import Previous Year Class',
                                                        id:'classsestting',
                                                        readOnly:true,
                                                        checked:true
                                                    },
                                                    {
                                                        xtype:'checkbox',
                                                        name : 'classfeesestting',
                                                        fieldLabel: 'Import Previous Year Class + Corresponding Fee Details',
                                                        id:'classfeesestting'
                                                    },
                                                    {
                                                        xtype:'checkbox',
                                                        name : 'subjectsetting',
                                                        fieldLabel: 'Import Previous Year Class + Corresponding Subject',
                                                        id:'subjectsetting'
                                                    },
                                                    {
                                                        xtype:'checkbox',
                                                        name : 'examsetting',
                                                        fieldLabel: 'Import Previous Year Class + Corresponding Examination',
                                                        id:'examsetting'
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

                                                            var data={  
                                                                        'sessionname'           :Ext.getCmp('sessionname').getValue(),
                                                                        'sessionyear'           :Ext.getCmp('sessionyear').getValue(),
                                                                        'sessionid'             :Ext.getCmp('sessionyear').getValue(),
                                                                        'batchname'             :Ext.getCmp('batchname').getValue(),
                                                                        'markcurrentsession'    :Ext.getCmp('markcurrentsession').getValue(),
                                                                        'classsestting'         :Ext.getCmp('classsestting').getValue(),
                                                                        'classfeesestting'      :Ext.getCmp('classfeesestting').getValue(),
                                                                        'subjectsetting'        :Ext.getCmp('subjectsetting').getValue(),
                                                                        'examsetting'           :Ext.getCmp('examsetting').getValue(),
                                                                        'validfrom'             :new Date(Ext.getCmp('validfrom').getValue()).getTime(),
                                                                        'validto'               :new Date(Ext.getCmp('validto').getValue()).getTime(),
                                                                     };                             
                                                              Ext.Ajax.request({
                                                                    url:'session/add.do',
                                                                    type:'json',
                                                                    headers:{
                                                                        'Content-Type':'application/json'
                                                                    },
                                                                    params:Ext.JSON.encode(data),
                                                                    success: function(res){
                                                                        var rec = eval('('+res.responseText+')');
                                                                        if(rec=='1'){
                                                                         Ext.Msg.alert('Success','Session added successfully');                                                                         
                                                                        }
                                                                        else
                                                                        Ext.Msg.alert('Failer','Unexpected Error Occured,Please Contact Admin');    
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
                          }],
                    columns:[
                    Ext.create('Ext.grid.RowNumberer'),
                    {
                        header: 'Session Name',  
                        dataIndex: 'name', 
                        flex:1,
                        width:'34%',
                        style :'color:#17385B;font-weight:bold'
                    },
                    {
                        header: 'Session Year',  
                        dataIndex: 'source', 
                        flex:1,
                        width:'33%',
                        style :'color:#17385B;font-weight:bold'
                    },
                    {
                        header: 'Batch',  
                        dataIndex: 'batch', 
                        flex:1,
                        width:'33%',
                        style :'color:#17385B;font-weight:bold'
                    }
                    ]

                    }
               ]            
        },{            
            xtype:'panel',
            extend: 'Ext.panel.Panel',
            store:'Master',
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
                         title:'School Affiliation Details',
                         xtype:'panel',
                         extend: 'Ext.panel.Panel',
                         cls:'detailpanel', 
                         tools: [
                               {
                                     text:'dfdfdf',
                                     type: 'edit',
                                     tooltip: 'Edit Details',
                                     cls:'edit-form',
                                     handler: function() {                                         
                                         var form=Ext.getCmp('affiliationform');                                                                                  
                                         var fields=form.items;                                                                                   
                                         for(i=0;i<fields.length;i++)
                                         fields.items[i].setReadOnly(false); 
                                         Ext.getCmp('update_s_d_4').show(); 
                              }
                          }],
                         width :'25%',
                         items:[{                                
                            xtype:Ext.create('Ext.form.Panel', {
                            id :'affiliationform',         
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
                                name: 'affiliationwith',
                                id: 'affiliationwith',
                                fieldLabel: 'Affiliation With',
                                height:16,                                
                                style :'color:#17385B;font-weight:bold'
                            },{
                                xtype: 'datefield',
                                name: 'affilationdate',
                                id: 'affilationdate',
                                fieldLabel: 'Date Of Affiliation',
                                height:16,                                
                                style :'color:#17385B;font-weight:bold'
                            },{
                                xtype: 'textfield',
                                name: 'schoolgrade',
                                id: 'schoolgrade',
                                fieldLabel: 'School Grade',
                                height:16,                                
                                style :'color:#17385B;font-weight:bold'
                            }
                            ]
                        })
                         }
                     ],
                     buttons:[{text:'Update',
                               bodyPadding: 20,                                 
                               hidden:true,
                               id:'update_s_d_4',
                               listeners:{
                                render: function(component){
                                component.getEl().on('click', function(){                                        
                                var data={  
                                            'affiliationwith'  :Ext.getCmp('affiliationwith').getValue(),
                                            'affilationdate'   :new Date(Ext.getCmp('affilationdate').getValue()).getTime(),
                                            'schoolgrade'      :Ext.getCmp('schoolgrade').getValue(),
                                            'schoolid'         :SETTING.Users.properties.schoolid,
                                            'flag'             :'3'
                                         };                             
                                  Ext.Ajax.request({
                                    url:'schooladmin/save.do',
                                    type:'json',
                                    headers:{
                                        'Content-Type':'application/json'
                                    },
                                    params:Ext.JSON.encode(data),
                                    success: function(res){
                                        var rec = eval('('+res.responseText+')');
                                        if(rec.flag=='0')
                                        Ext.Msg.alert('Success','Vehicle Details added successfully');
                                        else
                                        Ext.Msg.alert('Success','Error Occured , Please Contact Admin');    
                                    }
                                });
                              
                                 });
                                }
                           }
                            //style :'background:;color:white;font-weight:bold'
                     
                     }]
                   },
                   {
                         title:'School Timing / Periods',
                         xtype:'panel',
                         extend: 'Ext.panel.Panel',
                         width :'25%',
                         cls:'detailpanel', 
                         tools: [
                               {
                                     text:'dfdfdf',
                                     type: 'edit',
                                     tooltip: 'Edit Details',
                                     cls:'edit-form',
                                     handler: function() {                                         
                                         var form=Ext.getCmp('othersform');                                                                                  
                                         var fields=form.items;                                                                                   
                                         for(i=0;i<fields.length;i++)
                                         fields.items[i].setReadOnly(false); 
                                         Ext.getCmp('update_s_d_5').show();
                              }
                          }],
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
                     ],
                     buttons:[{text:'Update',
                               bodyPadding: 20,                                
                               hidden:true,
                               id:'update_s_d_5',
                               listeners:{
                                render: function(component){
                                component.getEl().on('click', function(){                                        
                                var data={  
                                            'starttime'       :new Date(Ext.getCmp('starttime').getValue()).getTime(),
                                            'endtime'         :new Date(Ext.getCmp('endtime').getValue()).getTime(),
                                            'totnoofperiod'   :Ext.getCmp('totnoofperiod').getValue(),
                                            'maxschstanderd'  :Ext.getCmp('maxschstanderd').getValue(),
                                            'minstandered'    :Ext.getCmp('minstandered').getValue(),
                                            'schoolid'   :SETTING.Users.properties.schoolid,
                                            'flag'       :'4'
                                         };                             
                                  Ext.Ajax.request({
                                    url:'schooladmin/save.do',
                                    type:'json',
                                    headers:{
                                        'Content-Type':'application/json'
                                    },
                                    params:Ext.JSON.encode(data),
                                    success: function(res){
                                        var rec = eval('('+res.responseText+')');
                                        if(rec.flag=='0')
                                        Ext.Msg.alert('Success','School Setting added successfully');
                                        else
                                        Ext.Msg.alert('Success','Error Occured , Please Contact Admin');    
                                    }
                                });                              
                                 });
                                }
                           }
                            //style :'background:;color:white;font-weight:bold'
                     }]
                   },
                   {  
                         title:'Email / SMS Setting',
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
                     ],
                     buttons:[{text:'Update',
                               bodyPadding: 20,                               
                               cls:'sabutton',                               
                               hidden:true,
                               id:'update_s_d_6',
                                listeners:{
                                render: function(component){
                                component.getEl().on('click', function(){                                        
                                var data={  
                                            'smsalert'       :Ext.getCmp('smsalert').getValue(),
                                            'emailalert'   :Ext.getCmp('emailalert').getValue(),
                                            'schoolid'   :SETTING.Users.properties.schoolid,
                                            'flag'       :'5'
                                         };                             
                                  Ext.Ajax.request({
                                    url:'schooladmin/save.do',
                                    type:'json',
                                    headers:{
                                        'Content-Type':'application/json'
                                    },
                                    params:Ext.JSON.encode(data),
                                    success: function(res){
                                        var rec = eval('('+res.responseText+')');
                                        if(rec.flag=='0')
                                        Ext.Msg.alert('Success','Alert Details added successfully');
                                        else
                                        Ext.Msg.alert('Success','Error Occured , Please Contact Admin');    
                                    }
                                });
                              
                                 });
                                }
                           }                     
                     }]
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
                     
                     Ext.getCmp('schoolname').setValue(rec.rows[0].schoolname);                      
                     Ext.getCmp('description').setValue(rec.rows[0].description); 
                     Ext.getCmp('schooltitle').setValue(rec.rows[0].schooltitle); 
                     Ext.getCmp('startdate').setValue(rec.rows[0].startdate); 
                     Ext.getCmp('pricipalname').setValue(rec.rows[0].pricipalname); 
                     Ext.getCmp('websiteurl').setValue(rec.rows[0].websiteurl); 
                     Ext.getCmp('addressline1').setValue(rec.rows[0].addressline1); 
                     Ext.getCmp('addressline2').setValue(rec.rows[0].addressline2); 
                     Ext.getCmp('city').setValue(rec.rows[0].city); 
                     Ext.getCmp('state').setValue(rec.rows[0].state); 
                     Ext.getCmp('country').setValue(rec.rows[0].country); 
                     Ext.getCmp('pinnumber').setValue(rec.rows[0].pinnumber); 
                     Ext.getCmp('contact1').setValue(rec.rows[0].contact1); 
                     Ext.getCmp('contact2').setValue(rec.rows[0].contact2); 
                     Ext.getCmp('contact3').setValue(rec.rows[0].contact3); 
                     Ext.getCmp('emailid1').setValue(rec.rows[0].emailid1); 
                     Ext.getCmp('emailid2').setValue(rec.rows[0].emailid2); 
                     Ext.getCmp('affiliationwith').setValue(rec.rows[0].affiliationwith); 
                     Ext.getCmp('affilationdate').setValue(rec.rows[0].affilationdate); 
                     Ext.getCmp('schoolgrade').setValue(rec.rows[0].schoolgrade); 
                     Ext.getCmp('starttime').setValue(rec.rows[0].starttime); 
                     Ext.getCmp('endtime').setValue(rec.rows[0].endtime); 
                     Ext.getCmp('totnoofperiod').setValue(rec.rows[0].totnoofperiod); 
                     Ext.getCmp('maxschstanderd').setValue(rec.rows[0].maxschstanderd); 
                     Ext.getCmp('minstandered').setValue(rec.rows[0].minstandered); 
                     Ext.getCmp('totnoofperiod').setValue(rec.rows[0].totnoofperiod);                     
                     Ext.getCmp('totnoofperiod').setValue(rec.rows[0].totnoofperiod); 
                   
                }  
            });
    }        
    
});

