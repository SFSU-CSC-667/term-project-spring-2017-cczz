const appendScore = score => {	
	$('.money').append(score)
}

const scoreElement = (score) =>
    $('<div>',{class:'money'}) 
      .text( score )


$(document).ready( () => {

	$(".money").append(data[0]["money"]); 

})