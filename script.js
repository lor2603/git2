$(function(){
	$('button').on('click', function(event){
		event.preventDefault();

		$('[type=email], textarea').removeClass('error');
		$('small').hide();

		var text = $('textarea').val().trim();
		var email = $('[type=email').val().trim();
		if(!email){
			$('[type=email]').addClass('error');
			$('#emailEmpty').show();
			return;
		}
		if(!validateEmail(email)){
			$('[type=email]').addClass('error');
			$('#emailNotValid').show();
			return;
		}
		if(text.length < 3){
			$('textarea').addClass('error');
			$('#comTooShort').show();
			return;
		}
		var li = $('<li>');
		var h3 = $('<h3>')
		var p = $('<p>');
		$('ul').append(li);
		li.append(h3);
		li.append(p);
		p.text(text);
		h3.text(email);
		$('input').val('');
		$('textarea').val('');
		$.ajax({
			method: 'post',
			url: 'https://gs-class.herokuapp.com/add-comment.php',
			data:{
				email : email,
				text : text
				},
			success: function(response){
				
				console.log(response);
				},
			error: function(response){
				console.log(response);
				}
			})
	})
	$('input, textarea').on('keydown', function(){
		$('[type=email], textarea').removeClass('error');
		$('small').hide();

	})
	$(document).on('click', 'p', function(){
		var p = $(this);
		p.hide();
		var textP = $('<textarea>');
		p.after(textP);
		textP.val(p.text());
		textP.focus();
		textP.on('blur', function(){
			if(textP.val().trim()){
				p.text(textP.val());
			}
			p.show();
			textP.off('blur');
			textP.remove();
			textP = null;
			
		})

	})	

})


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
