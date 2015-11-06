var achivments = [
	{
		id: '1',
		icon: '',
		title: '1,000,000 пикселей в интернете',
		description: 'Описание',
		triggered: function(stats) {
			return stats.path >= 1000000;
		}
	},
	{
		id: '2',
		icon: '',
		title: '1,000,000,000 пикселей в интернете',
		description: 'Описание',
		triggered: function(stats) {
			return stats.path >= 1000000000;
		}
	},
	{
		id: '3',
		icon: '',
		title: '1,000,000,000,000 пикселей в интернете',
		description: 'Описание',
		triggered: function(stats) {
			return stats.path >= 1000000000000;
		}
	},
	{
		id: '4',
		icon: '',
		title: 'Оснвоить клавиатуру',
		description: 'Нажать 1,000 кнопок',
		triggered: function(stats) {
			return stats.pressed.length >= 10000;
		}
	},
	{
		id: '5',
		icon: '',
		title: 'Расширить кругозор',
		description: 'Открыть 1,000 новых вкладок',
		triggered: function(stats) {
			return stats.pages >= 10000;
		}
	}
];