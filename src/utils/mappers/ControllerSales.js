import { getTimestamp } from '@/utils';

export const getTableHeaders = () => [
	{ name: 'Товар', key: 'name' },
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

export const getTableFields = data => data.map(({ item, salesSummary, lastSaleTime }) => ({
	id: item.id,
	name: item.name,
	lastSaleTime: getTimestamp(lastSaleTime),
  ...salesSummary,

	billAmount: 'ОТКЛ',
	coinAmount: 'ОТКЛ',
	terminal: 'ОТКЛ',
	wallet: 'ОТКЛ'
}));
