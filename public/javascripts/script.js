$(function() {
	//GET/READ -- az oldal első betöltésekor kell, hogy megjelenjenek a már beírt üzenetek
	// pollingal megoldott ajax GET kérés
	// setInterval-al megvalosított polling
	(function doPolling() {
		$.ajax({
			url: 'messages',
			dataType: 'JSON',	//dataType-ot akkor használunk ha a szevertől várjuk az adatot
			success:  function(response_get) {
				console.log(response_get);
				console.log(response_get.messages.length);
				$('#default-panel').html('');		//ha ez nem lenne itt akkor a setTimeout által beállított 3 mp enkénti GET kérésre kapott választ minden 3. másodpercben kiírná egymás alá

				for(var i = 0; i <= response_get.messages.length-1; i++){
					$('#default-panel').append('<div class="panel panel-default"><div class="panel-heading" id="name-content">' + response_get.messages[i].username + '</div><div class="panel-body" id="message-content">' + response_get.messages[i].messagesss + '</div></div>');
					}
			},
		});
	setTimeout(doPolling, 3000);	//3 másodpercenként végrehajtja a setInterval-on belül leírt kódot
	}());
	//POST/CREAT
	$(document).bind('keypress', function(e) {
			if(e.keyCode==13){
					$('#button_message').trigger('click');
			}
	});

	$('#create-form').on('submit', function(event) {
		event.preventDefault();	//"az alapértelmezett működési mechanizmus mgakadályozása"???

		var createUsername = $('#create-username').val();
		var createMessage = $('#create-message').val();

		$.ajax({
			url: '/messages',
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({username:createUsername, messagesss:createMessage}),
			success: function(response_post) {
							console.log(response_post);
              console.log('success');
							$('#default-panel').append('<div class="panel panel-default"><div class="panel-heading" id="name-content">' + response_post.username + '</div><div class="panel-body" id="message-content">' + response_post.messagesss + '</div></div>');
            },
            error: function() {
        					console.log('Cannot retrieve data.');
    		}
		});
	});
});
