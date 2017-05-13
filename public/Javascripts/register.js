$(document).ready( function() {
	$('#registerButton').click( function(data) {
		var $password = $('#password').val()
		var $confirmPassword = $('#confirmPassword').val();
		if ($password !== $confirmPassword) {
			if (alert("The confirm Password you input is not the same as Password!")) {}
			else location.reload('localhost:3000/api/register')
		}

	})
})






