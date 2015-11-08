function getAchivments(stats) {
	return [
		new Achivment(stats, {
			id: 1,
			title: 'Твои первые шаги',
			description: 'Пройти путь в 1,000,000 пикселей',
			relation: 'path',
			target: 1000000
		}),
		new Achivment(stats, {
			id: 2,
			title: 'От Земли до Луны',
			description: '1,000,000,000,000 пикселей в интернете, <br> я даже цифру такую не знаю',
			relation: 'path',
			target: 1000000000000
		}),
		new Achivment(stats, {
			id: 3,
			title: 'Освоить клавиатуру',
			description: 'Нажать 1,000 кнопок',
			relation: 'presses',
			target: 1000
		}),
		new Achivment(stats, {
			id: 4,
			title: 'Расширить кругозор',
			description: 'Открыть 100 новых вкладок',
			relation: 'pages',
			target: 100
		}),
		new Achivment(stats, {
			id: 5,
			title: 'Полезная прогулка',
			description: 'Пройти 5,000 метров (96dpi)',
			relation: 'path',
			target: 5000,
		}, function() {
			return this.stats.path / (96 / 0.0254);
		})
	]
};


function Achivment(stats, options, calculate) {
	this.stats = stats;	
	this.calculate = calculate;

	this.id = options.id || 0;
	this.icon = options.icon || 'icon-48.png';
	this.title = options.title || 'Достижение';
	this.description = options.description || 'Описание';
	this.target = options.target || 0;
	this.relation = options.relation;
}

Achivment.prototype = {
	current: function() {
		if (this.calculate) return this.calculate();
		return this.stats[this.relation];
	},
	trigger: function () {
		return this.current() >= this.target;
	},
	progress: function() {
		var progress = this.current() / this.target * 100;
		return progress < 100 ? progress : 100;
	},
	isFired: function() {
		return this.stats.achivmentsFired.indexOf(this.id) >= 0;
	},
	isRecent: function() {
		return this.stats.achivmentsRecent.indexOf(this.id) >=0;
	}
}