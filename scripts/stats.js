'use strict';

function Stats() {
	var self = this;
	this.stats = {
			pages: 0,
			pagesSpeed: 0,
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
			achievmentsRecent: []
		};	
	this.stack = {};
	this.temp = {};
	this.achievments = getAchievments(this.stats);

	this.setListeners();
	chrome.storage.local.clear();
	this.loadStats();

	setInterval(function() {

		self.stackPush();
		self.checkStack();
		self.checkAchievments();
		self.saveStats();

	}, 10000);
}

Stats.prototype = {
	loadStats: function() {
		var self = this;
		chrome.storage.local.get({stats: this.stats}, function(options) {
			for (var i in options.stats) {
				self.stats[i] = options.stats[i];
			}
		});
	},
	saveStats: function() {
		chrome.storage.local.set({stats: this.stats});
	},
	addStat: function(prop, value) {
		this.stats[prop] += value;
		this.tempAdd(prop, value);
	},
	sumStat: function(prop) {
		if (!this.stack[prop]) return null;

		var result = 0;
		for (var i = 0; i < this.stack[prop].length; i++) {
			result += this.stack[prop][i];
		}
		return result;
	},
	stackAdd: function(prop, value) {
		if (!this.stack[prop]) {
			this.stack[prop] = [];
		}

		this.stack[prop].push(value);

		if (this.stack[prop].length > 6) {
			this.stack[prop].shift();
		}
	},
	stackPush: function () {
		for (var key in this.temp) {
			this.stackAdd(key, this.temp[key]);
		}
		this.tempClear();
	},
	checkStack: function () {
		var lastPagesSpeed = this.sumStat('pages');
		var lastClicksSpeed = this.sumStat('clicks');
		var lastPressesSpeed = this.sumStat('presses');
		var lastScrollSpeed = this.sumStat('scroll');
		var lastWheelSpeed = this.sumStat('wheel');

		if (lastPagesSpeed > this.stats.pagesSpeed) {
			this.stats.pagesSpeed = lastPagesSpeed;
		}

		if (lastPressesSpeed > this.stats.pressesSpeed) {
			this.stats.pressesSpeed = lastPressesSpeed;
		}

		if (lastClicksSpeed > this.stats.clicksSpeed) {
			this.stats.clicksSpeed = lastClicksSpeed;
		}

		if (lastScrollSpeed > this.stats.scrollSpeed) {
			this.stats.scrollSpeed = lastScrollSpeed;
		}

		if (lastWheelSpeed > this.stats.wheelSpeed) {
			this.stats.wheelSpeed = lastWheelSpeed;
		}
	},
	tempAdd: function(prop, value) {
		if (!this.temp[prop]) {
			this.temp[prop] = 0;
		}
		this.temp[prop] += value;
	},
	tempClear: function() {
		this.temp = {};
	},
	checkAchievments: function() {
		for(var i=0, achievment; i<this.achievments.length; i++) {
			achievment = this.achievments[i];
			if (!achievment.isFired() && achievment.trigger()) {
				this.fireAchievment(achievment);
			}
		}
	},
	fireAchievment: function (achievment) {
		console.log('Fire achievment', achievment.title);
		this.stats.achievmentsFired.push(achievment.id);
		this.stats.achievmentsRecent.push(achievment.id);

		var badge = this.stats.achievmentsRecent.length;
		chrome.browserAction.setBadgeText({text: badge > 0 ? badge.toString() : ''})
		chrome.notifications.create(null, {
			type:'basic',
			title: 'Новое достижение!',
			message: achievment.title,
			contextMessage: achievment.description,
			iconUrl: 'images/'+achievment.icon
		});
	},
	setListeners: function() {
		var self = this;
		chrome.runtime.onMessage.addListener(function(msg) {
			
			if (msg.pages) {
				self.addStat('pages', msg.pages);
			}

			if (msg.path) {
				self.addStat('path', msg.path);
			}
			
			if (msg.clicks) {
				self.addStat('clicks', msg.clicks);
			}

			if (msg.keys) {
				// for(var i = 0, k; i < msg.keys.length; i++) {
				// 	k = msg.keys[i];

				// 	if (!stats.keys[KEYS[k]]) {
				// 		stats.keys[KEYS[k]] = 0;
				// 	}
				// 	stats.keys[KEYS[k]] ++;
				// }
				self.addStat('presses', msg.keys.length);
			}

			if (msg.popup) {
				self.addStat('popup', 1);
				self.stats.achievmentsRecent = self.stats.achievmentsRecent.filter(function(item){
					return msg.popup.indexOf(item) < 0;
				});
				chrome.browserAction.setBadgeText({text: ''});
			}

			if (msg.scroll) {
				self.addStat('scroll', msg.scroll);
			}

			if (msg.wheel) {
				self.addStat('wheel', msg.wheel);
			}

			if (msg.wheelPath) {
				self.addStat('wheelPath', msg.wheelPath);
			}

		});
	}
}


var stats = new Stats();