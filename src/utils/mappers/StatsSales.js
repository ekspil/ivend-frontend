import { all, equals, pickBy, values } from 'ramda';

export const getTableHeaders = () => [
	{ name: 'Товар', key: 'name', link: true },
	{ name: 'Количество', key: 'salesCount' },
	{ name: 'Сумма', key: 'overallAmount' },
	{ name: 'Безнал', key: 'cashlessAmount' },
	{ name: 'Наличные', key: 'cashAmount' }
];

export const getTableFields = data => data.map(({ id, name, salesSummary }) => ({
	name,
	...salesSummary,

	invisible: () => {
		const salesData = values(pickBy(val => {
			return typeof(val) === 'number';
		}, salesSummary));
		
		// Filter all zero numeric fields
		return all(equals(0))(salesData);
	},

	route: `/stats/good/${id}`
}));
