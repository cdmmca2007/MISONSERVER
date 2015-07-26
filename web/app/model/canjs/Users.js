/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
(function(ns){
    var Users = can.Model({
		findOne: 'GET '+BASE_URL+'/users/get.do'
    },{});
    var Student = can.Model({
		//findOne: 'GET '+BASE_URL+'/users/get.do'
	},{});
     var RecentUpdates = can.Model({
	     findAll: 'GET '+BASE_URL+'/parent/get-recent-updates.do'
	},{});    
	ns.Models = ns.Models || {};
	ns.Models.Users = Users;
        ns.Models.Student = Student;
        ns.Models.RecentUpdates = RecentUpdates;

})(this);

