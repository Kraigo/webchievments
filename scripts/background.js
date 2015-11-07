var KEYS = {
	'65': 'A',			'66': 'B',			'67': 'C',
	'68': 'D',			'69': 'E',			'70': 'F',
	'71': 'G',			'72': 'H',			'73': 'I',
	'74': 'J',			'75': 'K',			'76': 'L',
	'77': 'M',			'78': 'N',			'79': 'O',
	'80': 'P',			'81': 'Q',			'82': 'R',
	'83': 'S',			'84': 'T',			'85': 'U',
	'86': 'V',			'87': 'W',			'88': 'X',
	'89': 'U',			'90': 'Z',

	'48': '0',			'49': '1',			'50': '2',
	'51': '3',			'52': '4',			'53': '5',
	'54': '6',			'55': '7',			'56': '8',
	'57': '9',			

	'32': 'SPACE',		'8': 'BACKSPACE',	'13': 'ENTER',
	'16': 'SHIFT',		'17': 'CTRL',		'18': 'ALT',
	'9': 'TAB',			'27': 'ESC',

	'192': 'TILDE',		'188': 'COMMA',		'190': 'PERIOD',
	'191': 'BSLASH',	'220': 'FSLASH',
	'189': 'MINUS',		'187': 'PLUS'
}
var stats;
var achivments;

function setListeners() {
	chrome.runtime.onMessage.addListener(function(msg) {

		if (msg.pages) {
			stats.pages += msg.pages;
		}

		if (msg.path) {
			stats.path += msg.path;
		}
		
		if (msg.clicks) {
			stats.clicks += msg.clicks;
		}

		if (msg.keys) {
			for(var i = 0, k; i < msg.keys.length; i++) {
				k = msg.keys[i];

				if (!stats.keys[KEYS[k]]) {
					stats.keys[KEYS[k]] = 0;
				}
				stats.keys[KEYS[k]] ++;
				stats.presses ++;
			}
		}

	});
}

function saveStats() {
	checkAchivments();
	chrome.storage.local.set(stats);
}

function init(chromeStats) {
	stats = chromeStats;
	achivments = getAchivments(stats);
	setListeners();
	setInterval(saveStats, 10000)
}

function checkAchivments() {
	for(var i=0, achivment; i<achivments.length; i++) {
		achivment = achivments[i];
		if (!achivment.isFired() && achivment.trigger()) {
			fireAchivment(achivment);
		}
	}
}


function fireAchivment(achivment) {
	console.log('Fire achivment', achivment.title);
	stats.achivmentsFired.push(achivment.id);
	stats.achivmentsRecent.push(achivment.id);
	var badge = stats.achivmentsRecent.length;
	chrome.browserAction.setBadgeText({text: badge > 0 ? badge.toString() : ''})
	chrome.notifications.create(null, {type:'basic', title: 'New achivment!', message: achivment.title, contextMessage: achivment.description, iconUrl: 'images/'+achivment.icon});
}


chrome.storage.local.clear(function() {
chrome.storage.local.get({
		pages: 0,
		path: 0,
		presses: 0,
		clicks: 0,
		keys: {},
		achivmentsFired: [],
		achivmentsRecent: []
	}, init);
});