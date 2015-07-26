/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

( function(){
    TopController = can.Control({
        defaults:{
            view : BASE_URL+"/app/ejs/topview.ejs",
            usermenu:BASE_URL+"/app/ejs/menu/usermenu.ejs",
            passdialog:BASE_URL+"/app/ejs/dialog/changepass.ejs"
        }
        },{
            init: function(){
                $(this.element).html(can.view(this.options.view,this.options));

            },
            '.usermenu click': function(el, event){
                $(this.element).append(can.view(this.options.usermenu));
                $(this.element).find('.menu-options').slideDown('slow');
            },
            '.top-menu-profile click': function(el, event){
                 $("#tab-content *").remove();
            },
            '.top-menu-help click': function(el, ev){
                alert("This feature is not available");
            },
            usermenu: function(){
                
                
            },
            '.chnage-password click': function(el,event){
                this.closeMenu();
                var self =this;
                var el =$('<div id="change_pass_dialog"></div>').
                append(can.view(self.options.passdialog)).dialog({
                    modal:true,
                    width:500,
                    
                     buttons :[{
                    text: 'Change Password',
                    click: function(){
                       $(el).dialog('close');
                    }
                },{
                    text: 'Cancel',
                    click: function(){
                          $(el).dialog('close');
                    }
                }
                ]
                });
                console.log(el)
            },
            '.signout click': function(el,event){
                this.closeMenu();
                $.ajax({
                    url:"user/signOut.do",
                    method:"POST",
                    success:function(result){
                        _rc('zpv');
                        _rc('zrole');
                        window.top.location.href = "./";
                    }
                });
            },
            closeMenu: function(){
                 $(this.element).find('.menu-options').hide(1000);
                 $(this.element).find('.usermenu-div').remove();
            }
        })
            
})();
