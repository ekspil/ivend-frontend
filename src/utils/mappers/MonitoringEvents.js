import { map } from 'ramda';
import { getTimestamp } from '@/utils';

export const getTableHeaders = () => [
	{ name: 'Автомат', key: 'name', link: true },
	{ name: 'Связь', key: 'signalStrength' },
	{ name: 'Продажи', key: 'lastSaleTime' },
	{ name: 'Ошибки', key: 'lastErrorTime' }
];

export const getTableFields = data => map(controller => ({
	name: controller.name,
	lastSaleTime: getTimestamp(controller.lastSaleTime),
	lastErrorTime: getTimestamp(controller.lastErrorTime),
	signalStrength: controller.lastState?.signalStrength || '-',

	route: `/monitoring/${controller.id}`
}), data);
