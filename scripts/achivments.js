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
	}
];