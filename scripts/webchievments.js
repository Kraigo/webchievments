(function(){
	var stats = resetStats();
	var scrollLastPosition = 0;

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

	document.addEventListener('scroll', function(e) {
		stats.scroll += Math.abs(window.pageYOffset - scrollLastPosition)
		scrollLastPosition = window.pageYOffset;
		console.log(stats.scroll);
	});

	setInterval(function() {
		chrome.runtime.sendMessage(null, stats);

		stats = resetStats();
	}, 10000);

	function resetStats() {
		return {
			path: 0,
			keys: [],
			clicks: 0,
			scroll: 0
		};
	}
})();