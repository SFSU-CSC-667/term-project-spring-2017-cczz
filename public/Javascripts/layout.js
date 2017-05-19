$(document).ready( function() {
	if ($.cookie('email') == null) {
		$('#navbar1').hide()
	} else {
		$('#navbar1').show()
	}
})