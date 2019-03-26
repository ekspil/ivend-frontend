import { getTimestamp } from '@/utils';

export const getTableHeaders = () => [
	{ name: 'Автомат', key: 'name', link: true },
	{ name: 'Связь', key: 'signalStrength' },
	{ name: 'Продажи', key: 'lastSaleTime' },
	{ name: 'Контроллер', key: 'uid' },
	{ name: 'Монетник', key: 'coinAmount' },
	{ name: 'Купюрник', key: 'billAmount' },
	{ name: 'Терминал', key: 'terminal' },
	{ name: 'Касса', key: 'cashbox' },
	{ name: 'Аудит 1', key: 'audit1' },
	{ name: 'Аудит 2', key: 'audit2' }
];

export const getTableFields = data => data.map(controller => ({
	id: controller.id,
	uid: controller.uid,
	name: controller.machine?.name || '-',
	lastSaleTime: getTimestamp(controller.lastSaleTime),

	signalStrength: controller.lastState?.signalStrength || '-',
	coinAmount: controller.lastState?.coinAmount || '-',
	billAmount: controller.lastState?.billAmount || '-',

	terminal: 'ОТКЛ',
	cashbox: 'ОТКЛ',
	audit1: 'ОТКЛ',
	audit2: 'ОТКЛ',

	route: `/monitoring/${controller.machine.id}`
}));
