(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

const socket = io()

const intializeSocket = () => {
  socket.on( USER_JOINED, userJoined )
  socket.on( MESSAGE_SEND, messageReceived )
}



$(document).ready( () => {
	
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

	intializeSocket()

})


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInB1YmxpYy9qYXZhc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG5jb25zdCBzb2NrZXQgPSBpbygpXG5cbmNvbnN0IGludGlhbGl6ZVNvY2tldCA9ICgpID0+IHtcbiAgc29ja2V0Lm9uKCBVU0VSX0pPSU5FRCwgdXNlckpvaW5lZCApXG4gIHNvY2tldC5vbiggTUVTU0FHRV9TRU5ELCBtZXNzYWdlUmVjZWl2ZWQgKVxufVxuXG5cblxuJChkb2N1bWVudCkucmVhZHkoICgpID0+IHtcblx0XG5cdCQuZ2V0KFwiL2FwaS91c2Vyc1wiLCBmdW5jdGlvbihkYXRhLCBzdGF0dXMpe1xuICAgIFx0XG4gICAgXHRmb3IoIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgIFx0XHQkKCcuc2NvcmUxJykuYXBwZW5kKGRhdGFbaV0ubW9uZXkpOyBcbiAgICBcdFx0JCgnLnNjb3JlMScpLmFwcGVuZChcIjwvYnI+XCIpOyBcbiAgICBcdH0gXG5cblx0fSlcblxuXHQkLmdldChcIi9hcGkvcm9vbXNcIiwgZnVuY3Rpb24oZGF0YSwgc3RhdHVzKXtcblx0XHRmb3IoIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKyl7XG5cblx0XHRcdCQoJy5yb29tMScpLmFwcGVuZChkYXRhW2ldLmlkKS5hcHBlbmQoXCIgXCIpLmFwcGVuZChkYXRhW2ldLnNtYWxsX2JsaW5kKTsgXG5cdFx0XHQkKCcucm9vbTEnKS5hcHBlbmQoXCI8L2JyPlwiKTsgXG5cdFx0fVxuXHR9KVxuXG5cdGludGlhbGl6ZVNvY2tldCgpXG5cbn0pXG5cbiJdfQ==
