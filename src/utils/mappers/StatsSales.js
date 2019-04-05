export const getTableHeaders = () => [
	{ name: 'Товар', key: 'name' },
	{ name: 'Количество', key: 'salesCount' },
	{ name: 'Сумма', key: 'overallAmount' },
	{ name: 'Безнал', key: 'cashlessAmount' },
	{ name: 'Наличные', key: 'cashAmount' }
];

export const getTableFields = data => data.map(({ name, salesSummary }) => ({
	name,
	...salesSummary
}));
