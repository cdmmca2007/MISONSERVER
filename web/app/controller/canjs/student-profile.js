/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

( function(){
    ProfileController = can.Control({
        defaults:{
            view : BASE_URL+"/app/ejs/studentprofile.ejs"
        }
        
        },{
            init: function(){
                this.$el = $(this.element);
                this.$el.append(can.view(this.options.view,this.options));
            }
        })
            
})();