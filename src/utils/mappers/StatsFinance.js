import { map } from 'ramda';

export const getTableHeaders = () => [
	{ name: 'Автомат', key: 'name', link: true },
	{ name: 'Кол-во продаж', key: 'salesCount' },
	{ name: 'Сумма', key: 'overallAmount' },
	{ name: 'Безнал', key: 'cashlessAmount' },
	{ name: 'Наличные', key: 'cashAmount' }
];

export const getTableFields = data => map(({ id, name, overallSalesSummary }) => ({
	id,
	name,
	...overallSalesSummary,
	
	route: `/stats/${id}`
}), data);
