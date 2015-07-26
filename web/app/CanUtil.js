/* this is utility class used for
 * load mask
 */
(function (namespace) {	
	can.LoadMask = can.Construct({ }, {
		msg: 'Loading, Please wait...',
		show: function(config) {
			$('#load-mask-body').removeClass('mask-hidden');
			$('#load-mask-body .load-msg').html(this.msg);		
		},
		hide: function(){
			$('#load-mask-body').addClass('mask-hidden');
		}
	});
	
})(this);
var loadMask = new can.LoadMask();
