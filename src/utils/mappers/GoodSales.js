import { all, equals, pickBy, values } from 'ramda';

export const getTableHeaders = () => [
	{ name: 'Автомат', key: 'name' },
	{ name: 'Количество', key: 'salesCount' },
	{ name: 'Сумма', key: 'overallAmount' },
	{ name: 'Безнал', key: 'cashlessAmount' },
	{ name: 'Наличные', key: 'cashAmount' }
];

export const getTableFields = data => data.map(({ name, salesSummaryOfItem }) => ({
	name,
	...salesSummaryOfItem,

	invisible: () => {
		const salesData = values(pickBy(val => {
			return typeof(val) === 'number';
		}, salesSummaryOfItem));
		
		// Filter all zero numeric fields
		return all(equals(0))(salesData);
	}
}));
