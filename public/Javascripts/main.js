var $ = require('jquery')
var socket = io();



$(document).ready( () => {
	

	$('#chat-board button').click( function() {	
		const message = $('.form-control').val()
		socket.emit('message', message)		 
	})

	socket.on('message-display',function(data){
		$('div.message-board').append(data) 
	})
	
	$.get("/api/users", function(data, status){
    	
    	for( i = 0; i < data.length; i++) {
    		$('.score1').append(data[i].money); 
    		$('.score1').append("</br>"); 
    	} 

	})

	$.get("/api/rooms", function(data, status){
		for( i = 0; i < data.length; i++){

			$('.room1').append(data[i].id).append(" ").append(data[i].small_blind); 
			$('.room1').append("</br>"); 
		}
	})

	
})

