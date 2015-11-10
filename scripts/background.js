'use strict';

var achievments;
var stats;

function init(chromeStats) {
	stats = new Stats(chromeStats);
	achievments = getAchievments(stats.stats);
	setListeners();
	setInterval(saveStats, 10000)
}


function setListeners() {
	chrome.runtime.onMessage.addListener(function(msg) {

		if (msg.pages) {
			stats.add('pages', msg.pages);
		}

		if (msg.path) {
			stats.add('path', msg.path);
		}
		
		if (msg.clicks) {
			stats.add('clicks', msg.clicks);
		}

		if (msg.keys) {
			// for(var i = 0, k; i < msg.keys.length; i++) {
			// 	k = msg.keys[i];

			// 	if (!stats.keys[KEYS[k]]) {
			// 		stats.keys[KEYS[k]] = 0;
			// 	}
			// 	stats.keys[KEYS[k]] ++;
			// }
			stats.add('presses', msg.keys.length);
		}

		if (msg.popup) {
			stats.add('popup', 1);
			stats.stats.achievmentsRecent = stats.stats.achievmentsRecent.filter(function(item){
				return msg.popup.indexOf(item) < 0;
			});
			chrome.browserAction.setBadgeText({text: ''});
		}

		if (msg.scroll) {
			stats.add('scroll', msg.scroll);
		}

		if (msg.wheel) {
			stats.add('wheel', msg.wheel);
		}

		if (msg.wheelPath) {
			stats.add('wheelPath', msg.wheelPath);
		}

	});
}

function checkStack() {

	stats.stackPush();

	var lastClicksSpeed = stats.sum('clicks');
	var lastPressesSpeed = stats.sum('presses');
	var lastScrollSpeed = stats.sum('scroll');
	var lastWheelSpeed = stats.sum('wheel');

	if (lastPressesSpeed > stats.stats.pressesSpeed) {
		stats.stats.pressesSpeed = lastPressesSpeed;
	}

	if (lastClicksSpeed > stats.stats.clicksSpeed) {
		stats.stats.clicksSpeed = lastClicksSpeed;
	}

	if (lastScrollSpeed > stats.stats.scrollSpeed) {
		stats.stats.scrollSpeed = lastScrollSpeed;
	}

	if (lastWheelSpeed > stats.stats.wheelSpeed) {
		stats.stats.wheelSpeed = lastWheelSpeed;
	}
}

function saveStats() {
	checkStack();
	checkAchievments();
	chrome.storage.local.set(stats.stats);
}

function checkAchievments() {
	for(var i=0, achievment; i<achievments.length; i++) {
		achievment = achievments[i];
		if (!achievment.isFired() && achievment.trigger()) {
			fireAchievment(achievment);
		}
	}
}

function fireAchievment(achievment) {
	console.log('Fire achievment', achievment.title);
	stats.stats.achievmentsFired.push(achievment.id);
	stats.stats.achievmentsRecent.push(achievment.id);
	var badge = stats.stats.achievmentsRecent.length;
	chrome.browserAction.setBadgeText({text: badge > 0 ? badge.toString() : ''})
	chrome.notifications.create(null, {type:'basic', title: 'Новое достижение!', message: achievment.title, contextMessage: achievment.description, iconUrl: 'images/'+achievment.icon});
}


chrome.storage.local.clear(function() {
	chrome.storage.local.get({
			pages: 0,
			path: 0,
			presses: 0,
			pressesSpeed: 0,
			clicks: 0,
			clicksSpeed: 0,
			popup: 0,
			scroll: 0,
			scrollSpeed: 0,
			wheel: 0,
			wheelSpeed: 0,
			wheelPath: 0,
			keys: {},
			achievmentsFired: [],
			achievmentsRecent: [],
		}, init);
});