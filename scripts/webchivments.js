(function(){
	var stats = {
		path: 0,
		keys: [],
		clicks: 0
	}

	chrome.runtime.sendMessage(null, {tabs: 1});

	document.body.addEventListener('mousemove', function(e) {
		stats.path += Math.sqrt(e.movementX * e.movementX + e.movementY * e.movementY);
	});

	document.body.addEventListener('keyup', function(e) {
		stats.keys.push(e.keyCode);		
	});

	document.body.addEventListener('click', function(e) {
		stats.clicks ++;
	});

	setInterval(function() {
		chrome.runtime.sendMessage(null, stats); 
		stats.path = 0;
		stats.keys = [];
		stats.clicks = 0;
	}, 20000)
})();