(function(){
	var stats = resetStats();

	chrome.runtime.sendMessage(null, {pages: 1});

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

		stats = resetStats();
	}, 20000);

	function resetStats() {
		return {
			path: 0,
			keys: [],
			clicks: 0
		};
	}
})();