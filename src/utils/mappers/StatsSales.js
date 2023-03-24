import { all, equals, pickBy, values } from 'ramda';

export const getTableHeaders = () => [
	{ name: 'Товар', key: 'name', link: true },
	{ name: 'Кол продаж', key: 'salesCount' },
	{ name: 'Сумма', key: 'overallAmount' },
	{ name: 'Наличные', key: 'cashAmount' },
	{ name: 'Безнал', key: 'cashlessAmount' },
];

export const getTableFields = data => data.map(({ id, name, salesSummary }) => ({
	name,
	salesCount: Number(salesSummary.salesCount.toFixed(2)),
	overallAmount: Number(salesSummary.overallAmount.toFixed(2)),
	cashAmount: Number(salesSummary.cashAmount.toFixed(2)),
	cashlessAmount: Number(salesSummary.cashlessAmount.toFixed(2)),

	invisible: () => {
		const salesData = values(pickBy(val => {
			return typeof(val) === 'number';
		}, salesSummary));

		// Filter all zero numeric fields
		return all(equals(0))(salesData);
	},

	route: `/stats/good/${id}`
})).filter(e => e.salesCount);
