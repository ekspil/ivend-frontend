import { map } from 'ramda';
import { getTimestamp } from '@/utils';

export const getTableHeaders = () => [
	{ name: 'Товар', key: 'name' },
	{ name: 'Продажа', key: 'lastSaleTime' },
	{ name: 'Кол-во', key: 'salesCount' },
	{ name: 'Сумма', key: 'overallAmount' },
	{ name: 'Безнал', key: 'cashlessAmount' },
  { name: 'Наличные', key: 'cashAmount' }
];

export const getTableFields = data => map(({ item, salesSummary, lastSaleTime }) => ({
	id: item.id,
	name: item.name,
	lastSaleTime: getTimestamp(lastSaleTime),
  ...salesSummary
}), data);
