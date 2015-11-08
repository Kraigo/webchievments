"use strict";
function init(stats) {
	var achivments = getAchivments(stats);
	document.getElementById('achivmentFiredCount').innerHTML = stats.achivmentsFired.length;
	document.getElementById('achivmentAllCount').innerHTML = achivments.length;
	console.log(stats);

	chrome.browserAction.setBadgeText({text: ''});
	setTimeout(function() {
		chrome.storage.local.set({achivmentsRecent: []});
	},2000)

	var listPattern = document.getElementById('achivment-tmp').innerHTML;

	achivments.sort(function(a,b) {
		var fire = 0;
		a.isFired() ? fire -- : '';
		b.isFired() ? fire ++ : '';
		return fire;
	});

	var patternResult = '';

	achivments.forEach(function(achivment) {
		var patternData = {
			title: achivment.title,
			description: achivment.description,
			icon: achivment.icon,
			target: achivment.target,
			current: achivment.current().toFixed(),
			progress: achivment.progress(),
			fire: achivment.isFired()? 'fired' : '',
			recent: achivment.isRecent()? 'recent' : '',
		};
		patternResult += fillPattern(listPattern, patternData);
	});
	document.getElementById('achivments-list').innerHTML = patternResult;
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
		presses: 0,
		clicks: 0,
		keys: {},
		achivmentsFired: [],
		achivmentsRecent: []
	}, init);

function fillPattern(pattern, data) {
	for(var key in data) {
		var dataItem = data[key];
		var reg = RegExp('{{'+key+'}}', 'g');
		pattern = pattern.replace(reg, dataItem);
	}
	pattern = pattern.replace(/{{.*?}}/g, '');
	return pattern;
};