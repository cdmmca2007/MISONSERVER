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
Ext.define('MyApp.view.leave.MonthlyAttendanceSheet' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.monthlyattendance',
    title: 'Month',
    store:'MonthlyAttendance',
    enableLocking:true,
    columns:[{
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
        width: 140,
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
       text:'Submit',
       handler: function(){
           this.up('monthlyattendance').updateAttendance();
       }
    }],
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
