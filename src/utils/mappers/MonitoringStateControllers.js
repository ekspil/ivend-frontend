
export const getTableHeadersC = () => [
	{
		name: 'Статус автомата',
		key: 'status',
		link: false,
	},
	{
		name: 'Количество',
		key: 'count',
		link: false,
	},

];

export const getTableFieldsC = data => data.map(({status, count}) => ({
	count,
	status

}));
