$(function() {
	//GET/READ -- az oldal első betöltésekor kell, hogy megjelenjenek a már beírt üzenetek
	$.ajax({
		url: '/messages',
		contentType: 'application/json',
		success:  function(response) {

			var contentP = $('#content');

			contentP.html('');

			response.messages.forEach(function(message){
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
			success: function(response) {
							console.log(response);
                            console.log('success');

							$.ajax({
								url: '/messages',
								contentType: 'application/json',
								success:  function(response) {

									var contentP = $('#content');

									contentP.html('');

									response.messages.forEach(function(message){
										contentP.append('<li id="content">' + message.username + ': ' + message.messagesss + '</li>');
									});
								}
							});
            }
		});
	});
});