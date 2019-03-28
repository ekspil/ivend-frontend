export const getTableHeaders = () => [
	{ name: 'Автомат', key: 'name', link: true },
	{ name: 'Кол-во продаж', key: 'salesCount' },
	{ name: 'Сумма', key: 'overallAmount' },
	{ name: 'Безнал', key: 'cashlessAmount' },
	{ name: 'Наличные', key: 'cashAmount' }
];

export const getTableFields = data => data.map(({ id, overallSalesSummary, machine }) => ({
	id,
	name: machine.name,
	...overallSalesSummary,

	route: `/stats/${id}`
}));
