function Stats(stats) {
	this.stats = stats;	
	this.stack = {};
	this.temp = {};
}

Stats.prototype = {
	add: function(prop, value) {
		this.stats[prop] += value;
		this.stackAdd(prop, value);
		this.tempAdd(prop, value);
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
	tempAdd: function(prop, value) {
		if (!this.temp[prop]) {
			this.temp[prop] = 0;
		}
		this.temp[prop] += value;
	},
	stackSum: function(prop) {
		if (!this.stack[prop]) return null;

		var result = 0;
		for (var i = 0; i < this.stack[prop].length; i++) {
			result += this.stack[prop][i];
		}
		return result;
	}
}