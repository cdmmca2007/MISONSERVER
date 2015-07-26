/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

( function(){
    ContentController = can.Control({
        defaults:{
            recentUpdates : BASE_URL+"/app/ejs/recent-updates.ejs"
        }
        
        },{
            init: function(){
                var self = this;
                Models.RecentUpdates.findAll({},function(data){
                    $(self.element).html(can.view(self.options.recentUpdates,data));
                });
               

            }
        })
            
})();