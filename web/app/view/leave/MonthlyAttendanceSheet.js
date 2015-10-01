Ext.util.Format.attendanceRenderer = function(val,meta,record,row,col,store,grid){
    if(val){
       meta.tdCls = "att-"+val;
       return (val=="P" || val=="A")?"":val;
    } else{
        var date = new Date();
        date.setDate(col+1);
        if(date.getDay()==0){
            meta.tdCls = "att-S";
            return "SUNDAY"[row%6];
        }
    }
};


function uploadExcelSheet(classid,sessionid){

    var win = Ext.getCmp('uploadexcelattendence_win');
    if(!win){//Ext.app.view.component.AppWindow
        win=Ext.create('Ext.app.view.component.AppWindow', {
            title:'<font color=#17385B><b>Student Attendence Excelsheet Upload</b></font>',
            id:'uploadexcelattendence_win',
            width:400,                       
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:'Upload Student Monthly Attendence Excelsheet'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:300
            },
            formItems :[
            {
                name : 'createdby',
                id:'createdby',
                hidden:true,
                value:SETTING.Users.userId
            },{
                xtype:'combobox',
                fieldLabel :'Class',
                id:'classid',
                name:'classid',
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:2}}),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Class',
                Autoload:true,               
                valueField :'id',
                displayField :'value'
            },
            {
                name : 'sessionid',
                fieldLabel: 'sessionid',
                id:'sessionid',
                hidden:true,
                value:sessionid
            },
            {
                xtype:'combobox',
                fieldLabel :'Month',
                id:'month',
                name:'month',
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:12}}),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Month',
                Autoload:true,               
                valueField :'id',
                displayField :'value'
            },{
                xtype: 'fileuploadfield',
                fieldLabel :'Upload File',
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
                text: 'Upload',
                action: 'save',
                scope:this,
                handler:uploadExcelSheetData
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
}

function uploadExcelSheetData(btn){
    
     /*var form = btn.up('window').down('form').getForm();
     if(form.isValid()){
           form.submit({
                    url: 'homework/add.do',
                    success: function(fp, o) {
                    Ext.example.msg('Success','Homework Added Successfully');
                    var classid=Ext.getCmp('hwclasscombo').getValue();                    
                    var sessionid=Ext.getCmp('hwsessioncombo').getValue();    
                    if(sessionid!=null && classid!=null)
                     {
                         Ext.StoreManager.lookup('HomeWork').load({
                                params:{sessionid:sessionid,
                                        classid:classid,
                                        createdby:SETTING.Users.userId
                                }
                         });
                     }
                    },
                    failure: function(fp, o) {
                        Ext.example.msg('Failure','Unexpected Error Occured,Please Contact Administrator');
                    }
          }); 
      }*/
}


Ext.define('MyApp.view.leave.MonthlyAttendanceSheet' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.monthlyattendance',
    title: 'Month',
    store:'MonthlyAttendance',
    enableLocking:true,
    columns:[
        {
        header: 'Admision No',  
        dataIndex: 'addmission_no',
        locked:true,
        style :'color:#17385B;font-weight:bold',
        width: 90,
        renderer:function(value){return '<b>'+value+'</b>';}
    },
        {
        header: 'Roll No',  
        dataIndex: 'rollNo',
        locked:true,
        style :'color:#17385B;font-weight:bold',
        width: 50,
        renderer:function(value){return '<b>'+value+'</b>';}
    },{
        header: 'Name',  
        dataIndex: 'name',
        locked:true,
        width: 120,
        style :'color:#17385B;font-weight:bold',
        renderer:function(value){return '<font color=green><b>'+value+'</b></font>';}
    },{
        header: '1', 
        dataIndex: 'd1', 
        width: 35,
        sortable:false,
        renderer:Ext.util.Format.attendanceRenderer
        
    },{
        header: '2',
        dataIndex: 'd2', 
        width: 35,
        sortable:false,
        align:'center',
        renderer:Ext.util.Format.attendanceRenderer
    },{
        header: '3', 
        dataIndex: 'd3', 
        width: 35,
        sortable:false,
        renderer:Ext.util.Format.attendanceRenderer
    },{
        header: '4', 
        dataIndex: 'd4', 
        width: 30,
        renderer:Ext.util.Format.attendanceRenderer
    },{
        header: '5', 
        dataIndex: 'd5', 
        width: 35,
        sortable:false,
        renderer:Ext.util.Format.attendanceRenderer
    },{
        header: '6', 
        dataIndex: 'd6', 
        width: 35,
        sortable:false,
        renderer:Ext.util.Format.attendanceRenderer
    },{
        header: '7', 
        dataIndex: 'd7', 
        width: 35,
        sortable:false,
        renderer:Ext.util.Format.attendanceRenderer
    },{
        header: '8', 
        dataIndex: 'd8', 
        width: 35,
        sortable:false,
        renderer:Ext.util.Format.attendanceRenderer
    },{
        header: '9', 
        dataIndex: 'd9', 
        width: 35,
        sortable:false,
        renderer:Ext.util.Format.attendanceRenderer
    },{
        header: '10', 
        dataIndex: 'd10', 
        width: 35,
        sortable:false,
        renderer:Ext.util.Format.attendanceRenderer
    },{
        header: '11', 
        dataIndex: 'd11', 
        width: 35,
        sortable:false,
        renderer:Ext.util.Format.attendanceRenderer
    },{
        header: '12', 
        dataIndex: 'd12', 
        width: 35,
        sortable:false,
        renderer:Ext.util.Format.attendanceRenderer
    },{
        header: '13', 
        dataIndex: 'd13', 
        width: 35,
        sortable:false,
        renderer:Ext.util.Format.attendanceRenderer
    },{
        header: '14', 
        dataIndex: 'd14', 
        width: 35,
        sortable:false,
        renderer:Ext.util.Format.attendanceRenderer
    },{
        header: '15', 
        dataIndex: 'd15', 
        width: 30,
        renderer:Ext.util.Format.attendanceRenderer
    },{
        header: '16', 
        dataIndex: 'd16', 
        width: 35,
        sortable:false,
        renderer:Ext.util.Format.attendanceRenderer
    },{
        header: '17', 
        dataIndex: 'd17', 
        width: 35,
        sortable:false,
        renderer:Ext.util.Format.attendanceRenderer
    },{
        header: '18', 
        dataIndex: 'd18', 
        width: 35,
        sortable:false,
        renderer:Ext.util.Format.attendanceRenderer
    },{
        header: '19', 
        dataIndex: 'd19', 
        width: 35,
        sortable:false,
        renderer:Ext.util.Format.attendanceRenderer
    },{
        header: '20', 
        dataIndex: 'd20', 
        width: 35,
        sortable:false,
        renderer:Ext.util.Format.attendanceRenderer
    },{
        header: '21', 
        dataIndex: 'd21', 
        width: 35,
        sortable:false,
        renderer:Ext.util.Format.attendanceRenderer
    },{
        header: '22', 
        dataIndex: 'd22', 
        width: 35,
        sortable:false,
        renderer:Ext.util.Format.attendanceRenderer
    },{
        header: '23', 
        dataIndex: 'd23', 
        width: 35,
        sortable:false,
        renderer:Ext.util.Format.attendanceRenderer
    },{
        header: '24', 
        dataIndex: 'd24', 
        width: 35,
        sortable:false,
        renderer:Ext.util.Format.attendanceRenderer
    },{
        header: '25', 
        dataIndex: 'd25', 
        width: 35,
        sortable:false,
        renderer:Ext.util.Format.attendanceRenderer
    },{
        header: '26', 
        dataIndex: 'd26', 
        width: 35,
        sortable:false,
        renderer:Ext.util.Format.attendanceRenderer
    },{
        header: '27', 
        dataIndex: 'd27', 
        width: 35,
        sortable:false,
        renderer:Ext.util.Format.attendanceRenderer
    },{
        header: '28', 
        dataIndex: 'd28', 
        width: 35,
        sortable:false,
        renderer:Ext.util.Format.attendanceRenderer
    },{
        header: '29', 
        dataIndex: 'd29', 
        width: 35,
        sortable:false,
        renderer:Ext.util.Format.attendanceRenderer
    },{
        header: '30', 
        dataIndex: 'd30', 
        width: 35,
        sortable:false,
        renderer:Ext.util.Format.attendanceRenderer
    },{
        header: '31', 
        dataIndex: 'd31', 
        width: 35,
        sortable:false,
        renderer:Ext.util.Format.attendanceRenderer
    }
    ],
    bbar:[{
       text:'<b>Submit</b>',
       handler: function(){
           this.up('monthlyattendance').updateAttendance();
       }
    },{
        xtype:'splitbutton',
        text:'<b>More</b>',
        arrowAlign:'right',        
        menu: [{
                   text: '<font color=#17385B><b>Upload Attendence Excel</b></font>',
                   handler: function(){
                       
                       uploadExcelSheet(1,2);
//                       
//                     var sessionid=Ext.getCmp('studsession').getValue(); 
//                     var classid=Ext.getCmp('studclasscombo').getValue();                     
//                     var data={sessionid:sessionid,
//                               classid:classid,
//                               rolltype:1
//                              };  
//                        Ext.Ajax.request({
//                        url:'student/setrollno.do',
//                        type:'json',
//                        headers:{
//                            'Content-Type':'application/json'
//                        },
//                        params:Ext.JSON.encode(data),
//                        success: function(res){
//                            var rec = eval('('+res.responseText+')');
//                            if(rec.Success)
//                            Ext.Msg.alert('Success','Role Number Added successfully');
//                            else
//                            Ext.Msg.alert('Failure','Error Occured , Please Contact Admin');    
//                        }
//                    });
                   }
               },{
                   text: '<font color=#17385B><b>Download Excel</b></font>',
                   handler: function(){
                        
                   }
               },{
                   text: '<font color=#17385B><b>Download PDF</b></font>',
                   handler: function(){
                        
                   }
               },
               {text: '<font color=#17385B><b>View Attendence Report</b></font>',
                handler: function(){} 
               }
              ],
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    });

            }
        }
    },],
    initComponent: function() {
        this.callParent(arguments);
        
    },
    onRender: function(){
        this.callParent(arguments);
        var me = this;
        var d = new Date().getDate();
        var m = new Date().getMonth();//// Need to put condition for month check
        for(var i=0; i <d;i++){
        this.normalGrid.getView().getHeaderCt(i).addListener('headerclick', me.onHeaderClick,this);
        this.normalGrid.getView().getHeaderAtIndex(i).addListener('click',me.onCellClick);
        }
        
    },
    onHeaderClick : function(header,column){
        var me =this;
        Ext.Msg.confirm("Starting Attendance","Are You sure want to start mark attendance?<br><br><strong>To mark absent click on paerticular cell.</strong>",
           function(btn){
               if(btn==="yes"){
                   me.currentDate=column.dataIndex;
                   me.markAllPresent(me.currentDate);
               }
           })
    },
    markAllPresent: function(field){
        var store = this.getStore();
        store.each(function(rec){
            rec.set(field,'P');
        })
    },
    onCellClick : function(view,td,row,cellIndex,e, record){
        var val = record.data[this.dataIndex];
        if(val == 'P')
            record.set(this.dataIndex,'A');
        else if(val=='A') 
            record.set(this.dataIndex,'P');
    },
    updateAttendance: function(){
        this.fireEvent('updateDayAttendance', this,this.currentDate);
   
}});
