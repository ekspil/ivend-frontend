import { getTimestamp } from '@/utils';

export const getTableHeaders = () => [
	{ name: 'Товар', key: 'name', link: true },
	{ name: 'Продажа', key: 'lastSaleTime' },
	{ name: 'Кол-во', key: 'salesCount' },
	{ name: 'Сумма', key: 'overallAmount' },
	{ name: 'Безнал', key: 'cashlessAmount' },
	{ name: 'Терминал', key: 'terminal' },
	{ name: 'Кошелек', key: 'wallet' },
	{ name: 'Наличные', key: 'cashAmount' },
	{ name: 'Купюры', key: 'billAmount' },
	{ name: 'Монеты', key: 'coinAmount' }
];

export const getTableFields = (data, machineId) => data.map(({ item }) => ({
	id: item.id,
	name: item.name,
	lastSaleTime: getTimestamp(item.lastSaleTime),
	...item.salesSummary,

	invisible: () => item.salesSummary.salesCount <= 0,

	billAmount: 'ОТКЛ',
	coinAmount: 'ОТКЛ',
	terminal: 'ОТКЛ',
	wallet: 'ОТКЛ',
	route: `/sales/machine/${machineId}/item/${item.id}`
}));
