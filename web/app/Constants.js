/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

BASE_URL ="http://localhost:8084/MIS/";
//BASE_URL ="http://schoolomanager.in/MIS/";
PORTAL_ICON =BASE_URL+"resources/images/portal-icon/";
SETTING = {};
Ext.namespace('SETTING', 'SETTING.Users','SETTING.ROLES');
var rolesPermission = Ext.create('Ext.data.Store', {
    fields:['roleId', 'role'],
            data:[
            {
                id:'1',
                value:'Admin'
            },{
                id:'2',
                value:'Faculty'
            }, {
                id:'3',
                value:'Parent'
            },{
                id:'4',
                value:'Student'
            }
            ]
});



 var chartStore =Ext.create('Ext.data.JsonStore', {
            fields: ['name', 'data1'],
            data:[{
                name:'Nursary', 
                data1:20
            },{
                name:'Class 1', 
                data1:10
            }, {
                name:'Class 2', 
                data1:40
            },{
                name:'Class 3', 
                data1:50
            },{
                name:'Class 4', 
                data1:30
            }, {
                name:'Class 5', 
                data1:40
            }]
        });

var userRoles = Ext.create('Ext.data.Store', {
    fields:['roleId', 'role'],
            data:[
            {
                id:'1',
                value:'Admin'
            },{
                id:'2',
                value:'Faculty'
            }, {
                id:'3',
                value:'Parent'
            },{
                id:'4',
                value:'Student'
            }
            ]
});

Ext.example = function(){
    var msgCt;

    function createBox(t, s){
       return '<div class="msg"><h3>' + t + '</h3><p>' + s + '</p></div>';
    }
    return {
        msg : function(title, message){
            if(!msgCt){
                msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
            }
            var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
            var m = Ext.DomHelper.append(msgCt, createBox(title,s), true);
            m.hide();
            m.slideIn('t').ghost("t", { delay: 1000, remove: true});
        },

        init : function(){
            if(!msgCt){
                // It's better to create the msg-div here in order to avoid re-layouts 
                // later that could interfere with the HtmlEditor and reset its iFrame.
                msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
            }
        }
    };
}();
Ext.onReady(Ext.example.init, Ext.example);
