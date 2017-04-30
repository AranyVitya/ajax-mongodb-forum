$(function() {
	//GET/READ -- az oldal első betöltésekor kell, hogy megjelenjenek a már beírt üzenetek
	// pollingal megoldott ajax GET kérés
	(function poll() {	//polling
		$.ajax({	
			url: '/messages',
			contentType: 'application/json',
			success:  function(response_get) {
				var contentP = $('#content');
				contentP.html('');			
				response_get.messages.forEach(function(message){
					contentP.append('<li id="content">' + message.username + ': ' + message.messagesss + '</li>');
					});
			}, 
			complete: poll,	//success után végrehajtott parancsokat lehet ide beírni, ez esetben a poll funkciót hívjuk meg
			timeout: 5000
		});
	})();
	// setTimeout-al megvalosított polling
	/*(function poll() {	//polling funkció
		setInterval(function() {
			$.ajax({
			url: '/messages',
			contentType: 'application/json',
			success:  function(response_get) {
				var contentP = $('#content');
				contentP.html('');		//ha ez nem lenne itt akkor a setTimeout által beállított 5 mp enkénti GET kérésre kapott választ minden 5. másodpercben kiírná egymás alá			
				response_get.messages.forEach(function(message){
					contentP.append('<li id="content">' + message.username + ': ' + message.messagesss + '</li>');
				});
			}, complete: poll});	//success után végrehajtott parancsokat lehet ide beírni, ez esetben a poll funkciót hívjuk meg
		},5000);	//5 másodpercenként végrehajtja a setTimeouton belül leírt kódot
	})();*/
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