function addOnlineExam(rec){

    
    var classname=Ext.getCmp('elrngclasscombo').getValue();
    if(classname!=null)
      title='Create New Online Exam<br><font style="font-weight:bold;font-size:10px;color:red;">Exam will be for all section of :</font>'+classname;
    else
      title='Create New Online Exam<br><font style="font-weight:bold;font-size:10px;color:red;">You have not selected any class so this exam will be considered for All Classes</font>';  
    
    var win = Ext.getCmp('eleraningaddexam_win');
    if(!win){
        win=Ext.create('Ext.app.view.component.AppWindow', {
            title:'<b>E-learning Exam Management</b>',
            id:rec?'eleraningeditexam_win':'eleraningaddexam_win',
            width:530,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:title
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:460
            },
            formItems :[
            {
                name : 'sessionid',
                hidden:true,
                id:'sessionid',
                value:SETTING.Users.properties.session_id
            },
            {
                name : 'createdby',
                hidden:true,
                id:'createdby',
                value:SETTING.Users.userId
            },{
                name : 'modifiedby',
                hidden:true,
                id:'modifiedby',
                value:SETTING.Users.userId
            },
            {
                name : 'examname',
                fieldLabel: 'Exam Name',
                id:'examname'
            },{
                xtype:'combobox',
                fieldLabel :'Subject',
                id:'subjectid',
                name:'subjectid',
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:2}}),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Subject',
                Autoload:true,               
                valueField :'id',
                displayField :'value'

            },{
                xtype:'checkbox',
                fieldLabel :'Is Exam Mandatory',
                id:'ismandatory',
                name:'ismandatory'
            },{
                name : 'tot_ques_in_exam',
                fieldLabel: 'Total Number of Question in Exam to Show',
                id:'tot_ques_in_exam'
            },{
                name : 'pass_percent',
                fieldLabel: 'Pass mark/percentage in Exam',
                id:'pass_percent'
            },{
                xtype   : 'textarea',
                grow    : true,
                name : 'comment',
                fieldLabel: 'Comment',
                id:'comment'
            }
            ],
            buttons :[
            {
                text: rec?'Edit':'Add',
                action: 'save',
                scope:this,
                handler:saveOnlineExam
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
}

function saveOnlineExam(btn){
    
     var form = btn.up('window').down('form').getForm();
     if(form.isValid()){
            var obj = form.getValues();
            
            if(obj.ismandatory=='on')
                obj.ismandatory=1;
            else
                obj.ismandatory=0;
            
            obj.classname=Ext.getCmp('elrngclasscombo').getValue();
            
            Ext.Ajax.request({
                url:'onlinexam/add.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    var rec = eval('('+res.responseText+')');
                    if(rec.id!=null) {                       
                    Ext.Msg.alert('Success','Online Exam added successfully');
                    Ext.getCmp('elearningsetup').getStore().reload(); 
                    Ext.Msg.confirm("Alert",'Want to Add Question in Examination ?', function(btn){
                        if(btn=='yes'){
                            addQuestionInExam(rec);
                        }
                   });
                    }
                    else
                    Ext.Msg.alert('Failure','Unexpected Error Occured , Please Contact Admin');                 
                }
            });
        }
}

function addQuestionInExam(rec){
   
    Ext.StoreManager.lookup('QuestionList').load({
         params:{examid:rec.id
         }
    });
    var win= Ext.getCmp('addquesinexam_win');
    if(!win){
      win = Ext.create('Ext.window.Window', {
            title:'Online Exam Question For Exam: <font color=green><b>'+rec.examname+'</font></b>',
            id: 'addquesinexam_win',
            width:650,
            height:580,
            closeAction:'hide',
            items :[{
                        xtype:'tabpanel',
                        id:'elearninnerpanel',
                        style:'background:white;margin:2px 2px 2px 2px;font-size:12px;font-weight:bold;',    
                        viewConfig:{
                            forceFit:true
                        },
                        flex:1,
                        items:[
                            {
                                    title:'Add / Edit Question in Exam',
                                    id   :'formpanel',
                                    height:580,
                                    defaults:{
                                        xtype:'textfield',
                                        value:'',
                                        labelWidth:200,
                                        height:18
                                    },
                                    items:[
                                    {
                                        name : 'question',
                                        fieldLabel: 'Enter Question',
                                        id:'question',
                                        width:600,
                                        style:'background:white;margin:5px 5px 5px 5px;font-size:12px;font-weight:bold;'    
                                    },
                                    {
                                        xtype:'combobox',
                                        fieldLabel :'Question Type',
                                        style:'background:white;margin:5px 5px 5px 5px;font-size:12px;font-weight:bold;',    
                                        id:'ans_type',
                                        name:'ans_type',
                                        width:600,
                                        store:Ext.create('Ext.data.Store', {
                                            fields: ['id', 'value'],
                                            data : [
                                            {"id":"1","value":"Multi-Option Type"},
                                            {"id":"2","value":"True-False Type"},
                                            {"id":"3","value":"Yes - No Type"}
                                        ]
                                        }),
                                        typeAhead: true,
                                        queryMode: 'local',
                                        emptyText: 'Select Question Type',
                                        Autoload:true,        
                                        valueField :'id',
                                        displayField :'value',
                                        listeners:{
                                        select: function(component){
                                           var ans_type_=Ext.getCmp('ans_type').getValue();
                                           if(ans_type_==='1'){
                                               
                                                if(Ext.getCmp('option_1_name').getValue()!=null)                                                                                               
                                                Ext.getCmp('option_1_name').setValue('');
                                                if(Ext.getCmp('option_2_name').getValue()!=null)                                                                                                                                           
                                                Ext.getCmp('option_2_name').setValue('');
                                                
                                                Ext.getCmp('option_1_name').show();
                                                Ext.getCmp('option_2_name').show();
                                                Ext.getCmp('option_3_name').show();
                                                Ext.getCmp('option_4_name').show();
                                                Ext.getCmp('none_of_the_above_option').show();
                                                Ext.getCmp('all_of_the_above_option').show();

                                                Ext.getCmp('option_1_isawnser').show();
                                                Ext.getCmp('option_2_isawnser').show();
                                                
                                                Ext.getCmp('option_3_isawnser').show();
                                                Ext.getCmp('option_4_isawnser').show();
                                                Ext.getCmp('all_of_d_abv_opt_is_ans').show();
                                                Ext.getCmp('none_of_d_abv_opt_is_ans').show();
                                                

                                            }else if(ans_type_==='2'){
                                                Ext.getCmp('option_1_name').show();
                                                Ext.getCmp('option_1_name').setValue('True');
                                                
                                                Ext.getCmp('option_2_name').show();
                                                Ext.getCmp('option_2_name').setValue('False');
                                                
                                                Ext.getCmp('option_3_name').hide();
                                                Ext.getCmp('option_4_name').hide();
                                                Ext.getCmp('none_of_the_above_option').hide();
                                                Ext.getCmp('all_of_the_above_option').hide();
                                                Ext.getCmp('option_1_isawnser').show();
                                                Ext.getCmp('option_2_isawnser').show();
                                               
                                                Ext.getCmp('option_3_isawnser').hide();
                                                Ext.getCmp('option_4_isawnser').hide();
                                                Ext.getCmp('all_of_d_abv_opt_is_ans').hide();
                                                Ext.getCmp('none_of_d_abv_opt_is_ans').hide();
                                                
                                            }else if(ans_type_==='3'){
                                                Ext.getCmp('option_1_name').show();
                                                Ext.getCmp('option_1_name').setValue('Yes');
                                                
                                                Ext.getCmp('option_2_name').show();
                                                Ext.getCmp('option_2_name').setValue('No');
                                                
                                                Ext.getCmp('option_3_name').hide();
                                                Ext.getCmp('option_4_name').hide();
                                                Ext.getCmp('option_1_isawnser').show();
                                                Ext.getCmp('option_2_isawnser').show();
                                                
                                                Ext.getCmp('none_of_the_above_option').hide();
                                                Ext.getCmp('all_of_the_above_option').hide();
                                                Ext.getCmp('option_3_isawnser').hide();
                                                Ext.getCmp('option_4_isawnser').hide();
                                                Ext.getCmp('all_of_d_abv_opt_is_ans').hide();
                                                Ext.getCmp('none_of_d_abv_opt_is_ans').hide();
                                            }
                                            
                                        }
                                    }
                                    },{
                                        xtype:'textfield',    
                                        name : 'marks',
                                        fieldLabel: 'Mark(Points)',
                                        id:'marks',
                                        style:'background:white;margin:5px 5px 5px 5px;font-size:12px;font-weight:bold;',    
                                        width:600
                                    },{
                                        xtype:'textfield',    
                                        name : 'negativemarks',
                                        fieldLabel: 'Negative Marking(%)',
                                        id:'negativemarks',
                                        style:'background:white;margin:5px 5px 5px 5px;font-size:12px;font-weight:bold;',    
                                        width:600
                                    },{
                                        xtype:'textfield',    
                                        name : 'timeallocated',
                                        fieldLabel: 'Time Allocation in Seconds',
                                        id:'timeallocated',
                                        style:'background:white;margin:5px 5px 5px 5px;font-size:12px;font-weight:bold;',    
                                        width:600
                                    },
                                    {
                                        xtype:'textfield',    
                                        name : 'option_1_name',
                                        fieldLabel: 'Option-1',
                                        id:'option_1_name',
                                        style:'background:white;margin:5px 5px 5px 5px;font-size:12px;font-weight:bold;',    
                                        width:600,
                                        hidden:true
                                    },
                                    {
                                        xtype:'textfield',    
                                        name : 'option_2_name',
                                        fieldLabel: 'Option-2',
                                        id:'option_2_name',
                                        style:'background:white;margin:5px 5px 5px 5px;font-size:12px;font-weight:bold;',    
                                        width:600,
                                        hidden:true
                                    },
                                    {
                                        xtype:'textfield',    
                                        name : 'option_3_name',
                                        fieldLabel: 'Option-3',
                                        id:'option_3_name',
                                        style:'background:white;margin:5px 5px 5px 5px;font-size:12px;font-weight:bold;',    
                                        width:600,
                                        hidden:true
                                    },
                                    {
                                        xtype:'textfield',    
                                        name : 'option_4_name',
                                        fieldLabel: 'Option-4',
                                        id:'option_4_name',
                                        width:600,
                                        style:'background:white;margin:5px 5px 5px 5px;font-size:12px;font-weight:bold;',    
                                        hidden:true
                                    },
                                    {
                                        xtype:'checkbox',    
                                        name : 'all_of_the_above_option',
                                        fieldLabel: 'Include all of the Above option',
                                        id:'all_of_the_above_option',
                                        width:600,
                                        style:'background:white;margin:5px 5px 5px 5px;font-size:12px;font-weight:bold;',    
                                        hidden:true
                                    },
                                    {
                                        xtype:'checkbox',    
                                        name : 'none_of_the_above_option',
                                        fieldLabel: 'Include none of the Above option',
                                        id:'none_of_the_above_option',
                                        width:600,
                                        style:'background:white;margin:5px 5px 5px 5px;font-size:12px;font-weight:bold;',    
                                        hidden:true
                                    },
                                    {
                                            fieldLabel: '<font color=brown><b>Specify-Answer</b></font> :Option-1',
                                            name: 'option_1_isawnser',
                                            id: 'option_1_isawnser',
                                            xtype:'checkbox',
                                            style:'background:white;margin:5px 5px 5px 5px;font-size:12px;font-weight:bold;',    
                                            hidden:true
                                    },{
                                            fieldLabel: '<font color=brown><b>Specify-Answer</b></font> :Option-2',
                                            name: 'option_2_isawnser',
                                            id: 'option_2_isawnser',
                                            xtype:'checkbox',
                                            style:'background:white;margin:5px 5px 5px 5px;font-size:12px;font-weight:bold;',    
                                            hidden:true
                                    },{
                                            fieldLabel: '<font color=brown><b>Specify-Answer</b></font> :Option-3',
                                            name: 'option_3_isawnser',
                                            id: 'option_3_isawnser',
                                            xtype:'checkbox',
                                            style:'background:white;margin:5px 5px 5px 5px;font-size:12px;font-weight:bold;',    
                                            hidden:true
                                    },{
                                            fieldLabel: '<font color=brown><b>Specify-Answer</b></font> :Option-4',
                                            name: 'option_4_isawnser',
                                            id: 'option_4_isawnser',
                                            xtype:'checkbox',
                                            style:'background:white;margin:5px 5px 5px 5px;font-size:12px;font-weight:bold;',    
                                            hidden:true
                                     },{
                                            fieldLabel: '<font color=brown><b>Specify-Answer</b></font> :All of the Above option ',
                                            name: 'all_of_d_abv_opt_is_ans',
                                            id: 'all_of_d_abv_opt_is_ans',
                                            xtype:'checkbox',
                                            style:'background:white;margin:5px 5px 5px 5px;font-size:12px;font-weight:bold;',    
                                            hidden:true
                                     },{
                                            fieldLabel: '<font color=brown><b>Specify-Answer</b></font> :None of the Above option ',
                                            name: 'none_of_d_abv_opt_is_ans',
                                            id: 'none_of_d_abv_opt_is_ans',
                                            xtype:'checkbox',
                                            style:'background:white;margin:5px 5px 5px 5px;font-size:12px;font-weight:bold;',    
                                            hidden:true
                                        }
                            ]
                            },
                            {
                              xtype:'questionlistgrid'  
                            }
                        ]
                 } 
            ],
            buttons :[
            {
                text: '<b>Save Details</b>',
                action: 'save',
                scope:this,
                id:'savebtn',
                style:'background:lightskyblue',
                listeners:{
                render: function(component){
                component.getEl().on('click', function(){                                        
                  
                var data={  'pid'             :null,
                            'question'        :Ext.getCmp('question').getValue(),
                            'onlineexamquesid':rec?rec.id:null,
                            'ans_type'        :Ext.getCmp('ans_type').getValue(),
                            'option_1_name'   :Ext.getCmp('option_1_name').getValue(),
                            'option_2_name'   :Ext.getCmp('option_2_name').getValue(),
                            'option_3_name'   :Ext.getCmp('option_3_name').getValue(),
                            'option_4_name'   :Ext.getCmp('option_4_name').getValue(),
                            'option_1_isawnser'   :Ext.getCmp('option_1_isawnser').getValue(),
                            'option_2_isawnser'   :Ext.getCmp('option_2_isawnser').getValue(),
                            'option_3_isawnser'   :Ext.getCmp('option_3_isawnser').getValue(),
                            'option_4_isawnser'   :Ext.getCmp('option_4_isawnser').getValue(),
                            'all_of_the_above_option'   :Ext.getCmp('all_of_the_above_option').getValue(),
                            'none_of_the_above_option'   :Ext.getCmp('none_of_the_above_option').getValue(),
                            'all_of_d_abv_opt_is_ans'   :Ext.getCmp('all_of_d_abv_opt_is_ans').getValue(),
                            'none_of_d_abv_opt_is_ans'   :Ext.getCmp('none_of_d_abv_opt_is_ans').getValue(),
                            'createdby':SETTING.Users.userId,
                            'modifiedby':SETTING.Users.userId,
                            'marks':Ext.getCmp('marks').getValue(),
                            'negativemarks':Ext.getCmp('negativemarks').getValue(),
                            'timeallocated':Ext.getCmp('timeallocated').getValue()
                            
                        };  
                  if(data.ans_type==2 ||data.ans_type==2)      
                  {
                      data.option_3_name=null;
                      data.option_4_name=null;
                      data.all_of_the_above_option=0;
                      data.none_of_the_above_option=0;
                      data.option_3_isawnser=0;
                      data.option_4_isawnser=0;
                      data.all_of_d_abv_opt_is_ans=0;
                      data.none_of_d_abv_opt_is_ans=0;
                  }
                  
                    if(data.option_1_isawnser==true)
                        data.option_1_isawnser=1 
                    else 
                        data.option_1_isawnser=0;

                    if(data.option_2_isawnser==true)
                        data.option_2_isawnser=1 
                    else 
                        data.option_2_isawnser=0;
 
                    if(data.option_3_isawnser==true)
                        data.option_3_isawnser=1 
                    else 
                        data.option_3_isawnser=0;
                    
                    if(data.option_4_isawnser==true)
                        data.option_4_isawnser=1 
                    else 
                        data.option_4_isawnser=0;
                    
                    if(data.all_of_the_above_option==true)
                        data.all_of_the_above_option=1;
                    else
                        data.all_of_the_above_option=0;

                    if(data.all_of_d_abv_opt_is_ans==true)
                        data.all_of_d_abv_opt_is_ans=1;
                    else
                        data.all_of_d_abv_opt_is_ans=0;

                    if(data.none_of_the_above_option==true)
                        data.none_of_the_above_option=1;
                    else
                        data.none_of_the_above_option=0;

                    if(data.none_of_d_abv_opt_is_ans==true)
                        data.none_of_d_abv_opt_is_ans=1;
                    else
                        data.none_of_d_abv_opt_is_ans=0;
                    
                  Ext.Ajax.request({
                    url:'onlinexam/addques.do',
                    type:'json',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    params:Ext.JSON.encode(data),
                    success: function(res){
                        var rec = eval('('+res.responseText+')');
                        if(rec.pid!=null)
                        Ext.Msg.alert('Success','Question Added successfully for Exam :'+rec.examname);
                        else
                        Ext.Msg.alert('Error','Error Occured , Please Contact Administrator');    
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
    win.show();
}

Ext.define('MyApp.view.elearning.ElearningTeacher' ,{
    extend: 'Ext.grid.Panel',
    closable:true,
    title: 'E-learning Setup',
    id:'elearningsetup',
    layout:'fit',
    alias: 'widget.elearningsetup',
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },    
    ///store:'OnlineExamDetail',
    uses:['MyApp.view.elearning.QuestionListGrid'],
    initComponent: function() {

    this.columns=[
    Ext.create('Ext.grid.RowNumberer'),
    {
        header: 'id',
        dataIndex:'id',
        hidden   :true
    },
    {
        header: '<font color=#17385B><b>Title</b></font>',
        dataIndex:'examname',
        width    :'25%',
        renderer:function(value){
                return '<font color=brown><b>'+value+'</b></font>';
        }
    },
    {
        header:'<font color=#17385B><b>Subject</b></font>',
        dataIndex:'subject',
        width    :'10%'
    },
    {
        header:'<font color=#17385B><b>Class</b></font>',
        dataIndex:'subjectid',
        width    :200,
        hidden:true
    },
    {
        header:'<font color=#17385B><b>Subject</b></font>',
        dataIndex:'classid',
        width    :100,
        hidden:true
    },    
    {
        header:'<font color=#17385B><b>Class</b></font>',
        dataIndex:'class',
        width    :'10%',
        renderer:function(value){
            if(value=='')
                return "<font color=green><b>For All Class</b></font>";
            else
                return '<font color=orange><b>'+value+'</b></font>';
        }
    },{
        header:'<font color=#17385B><b>Total Ques</b></font>',
        dataIndex:'tot_ques_in_exam',
        width    :'10%'
    },{
        header:'<font color=#17385B><b>Mandatory</b></font>',
        dataIndex:'ismandatory',        
        width    :'10%',
        renderer:function(value){
            if(value==1)
                return "Yes";
            else
                return "No";
        }
    },{
        header:'<font color=#17385B><b>Created By</b></font>',
        dataIndex:'createdby',
        width    :'15%'
        
    },{
        header:'<font color=#17385B><b>Created On</b></font>',
        dataIndex:'createddon',
        width    :'15%'
    },{
        header:'<font color=#17385B><b>Status</b></font>',
        dataIndex:'status',
        width    :'15%',
        hidden:true,
        renderer : function(value){
            	  if(value==='Active') 
                  return '<font color=green><b>'+value+'</font></b>';
                  else
                  return '<font color=red><b>'+value+'</font></b>';    
        }       
    }

    ];
    this.selModel=Ext.create('Ext.selection.CheckboxModel',{
        singleSelect:true,
        listeners:{
                selectionchange:function(){

                   var  button = Ext.getCmp('eleranEdit');
                   button.setDisabled(false);
                   var  delbutton = Ext.getCmp('eleranDelete');
                   delbutton.setDisabled(false);
                  
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
        id:'elrngsession',
        emptyText: 'Select Session',       
        store:Ext.create('MyApp.store.Combo').load({
                                      params:{propertyId:-1}}),//For Session
        Autoload:true,
        queryMode: 'local',
        displayField: 'value',
        valueField: 'id',
        name:'type',
        hidden:true,
        value:SETTING.Users.properties.session_id,        
        listeners:{
            select: function(component){
                var sessionid=Ext.getCmp('elrngsession').getValue();                                                
                Ext.getCmp('elrngclasscombo').getStore().load({
                     params:{
                             propertyId:-200,///Class List
                }
               });
            }
       }

    },
    {
       xtype: 'combo',
       emptyText: 'Select Class',
       id:'elrngclasscombo',
       store:Ext.create('MyApp.store.Combo').load({
                                      params:{propertyId:-200
                                    }}),
       typeAhead: true,
       queryMode: 'local',
       Autoload:true,
       valueField :'id',
       displayField :'value',  
       listeners:{
            select: function(component){
                
                var store=Ext.getCmp('elearningsetup').getStore();
                store.load({
                            params:{'classid':Ext.getCmp('elrngclasscombo').getValue()
                }});
                
       }
       }
    },{
        iconCls: 'icon-add',
        text: 'Add Online Exam',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                    addOnlineExam(null);
                });

            }
        }
    },{
        iconCls: 'icon-edit',
        text: 'Edit',
        disabled: true,
        id:'eleranEdit',
        scope:this,
        handler: function(component){
                    var rec=Ext.getCmp('elearningsetup').getSelectionModel().getSelection()[0];
                    //addClasses(rec);
        }
    }, {
        iconCls: 'icon-delete',
        text: 'Delete',
        disabled: true,        
        id:'eleranDelete',
        handler: function(component){
            Ext.Msg.confirm("Alert","Are you sure want to delete records", function(btn){
            if(btn==='yes'){
                var grid = Ext.getCmp('elearningsetup');
                grid.getStore().remove(grid.getSelectionModel().getSelection());
            }
        });
        }
    },{
        iconCls: 'icon-add',
        text: 'View Exam Details',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                   var rec=Ext.getCmp('elearningsetup').getSelectionModel().getSelection()[0];
                    viewNotice(rec);
                });
            }
        }
    },'<b><font color=red>|</font></b>',{
        iconCls: 'icon-add',
        id:'ques_btn',        
        text: 'Add/Edit/Delete Question',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                   var rec=Ext.getCmp('elearningsetup').getSelectionModel().getSelection()[0];
                   if(rec!=null){
                     
                     addQuestionInExam(rec.data);
                   }  
                   else
                     Ext.Msg.alert('Warning','Please select Exam to Add/Edit/Delete Question');  
                });
            }
        }
    }
    ];
    this.bbar = Ext.create('Ext.PagingToolbar', {
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
                    });

            }
        }
    
    }]
    });
    this.callParent(arguments);
    },
    onRender : function(){
        //this.selModel.on('selectionchange', this.onSelectChange);
        this.callParent(arguments);
    },
    selectionchange : function(sm, selected,eOpts){
        if(sm.getCount()){
              
    }
    }
});






