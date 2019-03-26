import { getTimestamp } from '@/utils';

export const getTableHeaders = () => [
	{ name: 'Автомат', key: 'name', link: true },
	{ name: 'Связь', key: 'signalStrength' },
	{ name: 'Продажи', key: 'lastSaleTime' },
	{ name: 'Ошибки', key: 'lastErrorTime' },
	{ name: 'Аудит 1', key: 'audit1' },
	{ name: 'Аудит 2', key: 'audit2' },
	{ name: 'Инкассация', key: 'collection' },
	{ name: 'Загрузка', key: 'load' }
];

export const getTableFields = data => data.map(controller => ({
	name: controller.machine?.name || '-',
	lastSaleTime: getTimestamp(controller.lastSaleTime),
	lastErrorTime: getTimestamp(controller.lastErrorTime),
	signalStrength: controller.lastState?.signalStrength || '-',

	collection: 'ОТКЛ',
	load: 'ОТКЛ',
	audit1: 'ОТКЛ',
	audit2: 'ОТКЛ',

	route: `/monitoring/${controller.machine.id}`
}));
