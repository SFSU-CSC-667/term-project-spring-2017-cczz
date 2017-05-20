$(document).ready( function() {
	if ($.cookie('email') == null) {
	} else {
		$('.navbar-header').append($('<a>', {'class': 'navbar-brand', 'href': '/api/users/userprofile/' + $.cookie('username'), html: function() {
			return $.cookie('username')
		}}))

		$('.navbar-header').append($('<a>', {'class': 'navbar-brand', 'href': '/logout', html: 'Sign Out'
		}))
	}
})