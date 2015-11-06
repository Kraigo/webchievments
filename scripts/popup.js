function init(options) {
	document.getElementById('tabs').innerHTML = options.tabs;
	var pathKm = options.path/getDPI()*2.54/100000;
	document.getElementById('path').innerHTML = Math.floor(options.path) + ' пкс. ('+pathKm.toFixed(2)+'км)'; 
	document.getElementById('clicks').innerHTML = options.clicks;

	var keysCount = 0;
	for (var i in options.keys) {
		keysCount += options.keys[i];
	}

	document.getElementById('keys').innerHTML = keysCount;
}

chrome.storage.local.get({
	tabs: 0,
	path: 0,
	keys: {},
	clicks: 0
}, init);

function getDPI() {
	return document.getElementById("dpi").offsetHeight;
}