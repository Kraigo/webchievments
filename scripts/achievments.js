'use strict';
function getAchievments(stats) {
	var achievments = [
		new Achievment(stats, {
			id: 0,
			material: 'gold',
			title: 'Добро пожаловать',
			description: 'Установить расширение Webchievment',
			relation: 'path',
			target: 0
		}),
		new Achievment(stats, {
			id: 1,
			material: 'gold',
			title: 'Сразу в бой',
			description: 'Получить больше одного достижения',
			relation: function() {
				return this.stats.achievmentsFired.length;
			},
			target: 2
		}),		
		new Achievment(stats, {
			id: 2,
			material: 'gold',
			title: 'Твои первые шаги',
			description: 'Пройти путь в 1,000,000 пикселей',
			relation: 'path',
			target: 1000000
		}),

		
		
		new Achievment(stats, {
			id: 3,
			material: 'gold',
			title: 'Расширить кругозор',
			description: 'Открыть 100 страниц',
			relation: 'pages',
			target: 100
		}),
		new Achievment(stats, {
			id: 4,
			material: 'gold',
			title: 'Ни шагу назад',
			description: 'Открыть 10,000 страниц',
			relation: 'pages',
			target: 10000
		}),
		new Achievment(stats, {
			id: 5,
			material: 'gold',
			title: 'Миллионный сайт',
			description: 'Открыть 1,000,000 страниц',
			relation: 'pages',
			target: 1000000
		}),

		new Achievment(stats, {
			id: 6,
			material: 'gold',
			title: 'Пожиратель трафика',
			description: 'Перейти на 30 страниц за минуту',
			relation: 'pagesSpeed',
			target: 30
		}),

		new Achievment(stats, {
			id: 7,
			material: 'gold',
			title: 'Полезная прогулка',
			description: 'Пройти 3,000 метров (96dpi)',
			relation: function() {
				return this.stats.path / (96 / 0.0254);
			},
			target: 3000,
		}),
		new Achievment(stats, {
			id: 8,
			material: 'gold',
			title: 'Нетерпеливый',
			description: '1,000 проверить свои достижения',
			relation: 'popup',
			target: 1000
		}),

		new Achievment(stats, {
			id: 9,
			material: 'brozne',
			title: 'Освоить клавиатуру',
			description: 'Нажать 1,000 кнопок',
			relation: 'presses',
			target: 1000
		}),
		new Achievment(stats, {
			id: 10,
			material: 'silver',
			title: 'Писатель',
			description: 'Нажать 100,000 кнопок',
			relation: 'presses',
			target: 100000
		}),
		new Achievment(stats, {
			id: 11,
			material: 'gold',
			title: 'Повелитель клавиатуры',
			description: 'Нажать 10,000,000 кнопок',
			relation: 'presses',
			target: 10000000
		}),

		new Achievment(stats, {
			id: 12,
			material: 'silver',
			title: 'Быстрый стукач',
			description: 'Напечатать 200 символов в минуту',
			relation: 'pressesSpeed',
			target: 200
		}),
		new Achievment(stats, {
			id: 13,
			material: 'gold',
			title: 'Горящие клавиши',
			description: 'Напечатать 400 символов в минуту',
			relation: 'pressesSpeed',
			target: 400
		}),

		new Achievment(stats, {
			id: 15,
			material: 'gold',
			title: 'Мышка в ловушке',
			description: '60 кликов мышкой в минуту',
			relation: 'clicksSpeed',
			target: 60
		}),

		new Achievment(stats, {
			id: 16,
			material: 'gold',
			title: 'Активный палец',
			description: '120 кликов мышкой в минуту',
			relation: 'clicksSpeed',
			target: 120
		}),

		new Achievment(stats, {
			id: 17,
			material: 'gold',
			title: 'От Земли до Луны',
			description: 'Проскролить 384,467 километров (145,300,715,840 пкс при 96 ppi)',
			relation: 'scroll',
			target: 145300715840
		}),

		new Achievment(stats, {
			id: 18,
			material: 'gold',
			title: 'Дорожный бегун',
			description: 'Скролить со скоростью 30,000 пикселей в минуту',
			relation: 'scrollSpeed',
			target: 30000
		}),

		new Achievment(stats, {
			id: 19,
			material: 'gold',
			title: 'Хомяк в колесе',
			description: 'Прокрутить колесо 10,000 щелчков',
			relation: 'wheel',
			target: 10000
		}),
		new Achievment(stats, {
			id: 20,
			material: 'gold',
			title: 'Крутой крутун',
			description: 'Крути колесо со скоростью 300 щелчков в минуту',
			relation: 'wheelSpeed',
			target: 300
		}),
		new Achievment(stats, {
			id: 21,
			material: 'gold',
			title: 'Отправиться в путешествие',
			description: 'Прокрутить 1,000,000,000 пикселей колёсиком',
			relation: 'wheelPath',
			target: 1000000000
		}),

		new Achievment(stats, {
			id: 9999,
			material: 'gold',
			title: 'Властелин достижений',
			description: 'Собрать ВСЕ достижения',
			relation: function() {
				return this.stats.achievmentsFired.length;
			},
			target: function() {
				return achievments.length;
			}
		}),
	]

	return achievments;
};


function Achievment(stats, options, trigger) {
	this.stats = stats;	

	this.id = options.id;
	this.material = options.material || 'regular';
	this.icon = options.icon || 'icon-48.png';
	this.title = options.title || 'Достижение';
	this.description = options.description || 'Описание';

	this.relation = options.relation;
	this.target = options.target;

	if (trigger) this.trigger = trigger;
}

Achievment.prototype = {
	current: function() {
		return (typeof this.relation == 'function') ? this.relation.apply(this) : this.stats[this.relation];
	},
	done: function() {
		return (typeof this.target == 'function') ? this.target.apply(this) : this.target;
	},
	trigger: function () {
		return this.current() >= this.done();
	},
	progress: function() {
		var progress = this.current() / this.done() * 100;
		return progress < 100 ? progress : 100;
	},
	isFired: function() {
		return this.stats.achievmentsFired.indexOf(this.id) >= 0;
	},
	isRecent: function() {
		return this.stats.achievmentsRecent.indexOf(this.id) >=0;
	}
}