$(document).ready( function() {
	if ($.cookie('email') == null) {
		//alert("000 yes")
		$('#navbar1').hide()
	} else {
		//alert("111 yes")
		//$('<a>', {class: 'navbar-brand'}).text('Sign Out')
		//$('<nav>', {class: 'navbar-brand'}).text('Sign Out')
		$('#navbar1').show()
	}
})