function init(stats) {
	document.getElementById('pages').innerHTML = stats.pages;
	document.getElementById('path').innerHTML = Math.floor(stats.path) + ' пкс. ('+pxToKm(stats.path).toFixed(2)+'км)'; 
	document.getElementById('clicks').innerHTML = stats.clicks;
	document.getElementById('keys').innerHTML = stats.pressed.length;
}

function pxToKm(px) {
	return px/getDPI()*2.54/100000
}
function getDPI() {
	return document.getElementById("dpi").offsetHeight;
}



chrome.storage.local.get({
		pages: 0,
		path: 0,
		pressed: {
			length: 0,
			keys: {}
		},
		clicks: 0,
		achivments: []
	}, init);