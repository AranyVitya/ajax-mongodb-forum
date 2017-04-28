$(function() {
	//GET/READ -- az oldal első betöltésekor kell, hogy megjelenjenek a már beírt üzenetek
	$.ajax({
		url: '/messages',
		contentType: 'application/json',
		success:  function(response_get) {

			var contentP = $('#content');

			contentP.html('');

			response_get.messages.forEach(function(message){
				contentP.append('<li id="content">' + message.username + ': ' + message.messagesss + '</li>');
			});
		}
	});
	//POST/CREAT
	$('#create-form').on('submit', function(event) {
		event.preventDefault();

		var createUsername = $('#create-username');
		var createMessage = $('#create-message');

		$.ajax({
			url: '/messages',
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({ username: createUsername.val(), messagesss: createMessage.val()}),
			success: function(response_post) {
							console.log(response_post);
                            console.log('success');
							var contentP = $('#content');
							contentP.append('<li id="content">' + response_post.username + ': ' + response_post.messagesss + '</li>');
            }
		});
	});
});