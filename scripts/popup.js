function init(stats) {
	var achivments = getAchivments(stats);
	document.getElementById('achivmentFiredCount').innerHTML = stats.achivmentsFired.length;
	document.getElementById('achivmentAllCount').innerHTML = achivments.length;

	var listPattern = document.getElementById('achivment-tmp').innerHTML;
	var patternResult = '';

	achivments.forEach(function(achivment) {
		console.log(achivment);
		patternData = {
			title: achivment.title,
			description: achivment.description,
			icon: achivment.icon,
			target: achivment.target,
			current: achivment.current().toFixed(),
			progress: achivment.progress(),
			fire: achivment.isFired()? 'fired' : ''
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

function fillPattern(pattern, data, parent) {
	parent = parent ? parent + '.' : '';
	for(var key in data) {
		var dataItem = data[key];
		if (Array.isArray(dataItem)) {
			var reg = new RegExp('{{'+parent+key+':}}([\\s\\S]*){{:'+parent+key+'}}');
			var template = pattern.match(reg)[1];
			var loopResult = '';
			for (var item in dataItem) {
				var loopData = dataItem[item];
				loopResult += fillPattern(template, loopData, parent+key);        
			}
			pattern = pattern.replace(reg, loopResult);
		} else {
			var reg = RegExp('{{'+parent+key+'}}', 'g');
			pattern = pattern.replace(reg, dataItem);
		}
	}
	pattern = pattern.replace(/{{.*?:}}[\s\S]*?{{:.*?}}/g, '');
	pattern = pattern.replace(/{{.*?}}/g, '');

	return pattern;
};