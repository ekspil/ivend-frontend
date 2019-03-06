import { map } from 'ramda';
import { getTimestamp } from '@/utils';

export const getTableHeaders = () => [
	{ name: 'Автомат', key: 'name' },
	{ name: 'Связь', key: 'signalStrength' },
	{ name: 'Продажи', key: 'lastSaleTime' },
	{ name: 'Контроллер', key: 'uid' },
	{ name: 'Монетник', key: 'coinAmount' },
	{ name: 'Купюрник', key: 'billAmount' }
];

export const getTableFields = data => map(controller => ({
	id: controller.id,
	uid: controller.uid,
	name: controller.name,
	lastSaleTime: getTimestamp(controller.lastSaleTime),

	signalStrength: controller.lastState?.signalStrength || '-',
	coinAmount: controller.lastState?.coinAmount || '-',
	billAmount: controller.lastState?.billAmount || '-'
}), data);
