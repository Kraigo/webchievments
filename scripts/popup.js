'use strict';
function init(stats) {
	var achievments = getAchievments(stats);
	document.getElementById('achievmentFiredCount').innerHTML = stats.achievmentsFired.length;
	document.getElementById('achievmentAllCount').innerHTML = achievments.length;

	chrome.runtime.sendMessage(null, {openPopup: stats.achievmentsRecent});

	var listPattern = document.getElementById('achievment-tmp').innerHTML;

	achievments.sort(function(a,b) {
		var fire = 0;
		a.isFired() ? fire -- : '';
		b.isFired() ? fire ++ : '';
		a.isRecent() ? fire -- : '';
		b.isRecent() ? fire ++ : '';
		return (fire == 0) ? a.id - b.id : fire;
	});

	var patternResult = '';

	achievments.forEach(function(achievment) {
		var patternData = {
			title: achievment.title,
			description: achievment.description,
			icon: achievment.icon,
			target: achievment.target,
			current: achievment.isFired() ? achievment.target : achievment.current().toFixed(),
			progress: achievment.progress(),
			fire: achievment.isFired()? 'fired' : '',
			recent: achievment.isRecent()? 'recent' : '',
		};
		patternResult += fillPattern(listPattern, patternData);
	});
	document.getElementById('achievments-list').innerHTML = patternResult;
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
		pressesSpeed: 0,
		clicks: 0,
		clicksSpeed: 0,
		popup: 0,
		keys: {},
		achievmentsFired: [],
		achievmentsRecent: []
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