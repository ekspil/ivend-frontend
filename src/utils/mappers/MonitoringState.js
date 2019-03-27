import { createTooltip, getTimestamp, getGradation, getWordEnding } from '@/utils';

export const getTableHeaders = () => [
	{
		name: 'Автомат',
		key: 'name',
		link: true,
	},
	{
		name: 'Связь',
		key: 'registrationTime',
		critery ({ registrationTime, lastSaleTime }) {
			let latestTime = registrationTime > lastSaleTime ? registrationTime : lastSaleTime;
			const localeTimestamp = getTimestamp(latestTime);

			if (localeTimestamp !== '-') {
				const gradation = getGradation(Date.now() - latestTime);

				if (gradation.minutes <= 60) {
					return createTooltip('primary', `${gradation.minutes} ${getWordEnding(gradation.minutes, 'минута')}`);
				} else if (gradation.hours < 24) {
					return createTooltip('primary', `${gradation.hours} ${getWordEnding(gradation.hours, 'час')}`);
				}

				return createTooltip('alert', `${gradation.days} ${getWordEnding(gradation.days, 'день')}`);
			}

			return createTooltip('info', 'НЕТ');
		}
	},
	{
		name: 'Продажи',
		key: 'lastSaleTime',
		critery ({ lastSaleTime }) {
			const localeTimestamp = getTimestamp(lastSaleTime);

			if (localeTimestamp !== '-') {
				const gradation = getGradation(Date.now() - lastSaleTime);

				if (gradation.minutes <= 60) {
					return createTooltip('primary', `${gradation.minutes} ${getWordEnding(gradation.minutes, 'минута')}`);
				} else if (gradation.hours < 24) {
					return createTooltip('warning', `${gradation.hours} ${getWordEnding(gradation.hours, 'час')}`);
				}

				return createTooltip('alert', `${gradation.days} ${getWordEnding(gradation.days, 'день')}`);
			}

			return createTooltip('info', 'НЕТ');
		}
	},
	{
		name: 'Контроллер',
		key: 'uid'
	},
	{
		name: 'Монетник',
		key: 'coinAmount',
		critery ({ coinAmount, coinAcceptorStatus }) {
			switch (coinAcceptorStatus) {
				case 'OK':
					return createTooltip('primary', coinAmount);
				case 'ERROR':
					return createTooltip('alert', coinAmount);

				default:
					return createTooltip('info', 'ОТКЛ');
			}
		}
	},
	{
		name: 'Купюрник',
		key: 'billAmount',
		critery ({ billAmount, billAcceptorStatus }) {
			switch (billAcceptorStatus) {
				case 'OK':
					return createTooltip('primary', billAmount);
				case 'ERROR':
					return createTooltip('alert', billAmount);

				default:
					return createTooltip('info', 'ОТКЛ');
			}
		}
	},
	{
		name: 'Терминал',
		key: 'terminal',
		critery () { return createTooltip('info', 'ОТКЛ'); }
	},
	{
		name: 'Касса',
		key: 'cashbox',
		critery () { return createTooltip('info', 'ОТКЛ'); }
	},
	{
		name: 'Аудит 1',
		key: 'audit1',
		critery () { return createTooltip('info', 'ОТКЛ'); }
	},
	{
		name: 'Аудит 2',
		key: 'audit2',
		critery () { return createTooltip('info', 'ОТКЛ'); }
	}
];

export const getTableFields = data => data.map(controller => ({
	id: controller.id,
	uid: controller.uid,
	name: controller.machine?.name || '-',
	lastSaleTime: controller.lastSaleTime,

	registrationTime: controller.lastState?.registrationTime,
	coinAmount: controller.lastState?.coinAmount,
	billAmount: controller.lastState?.billAmount,

	coinAcceptorStatus: controller.lastState?.coinAcceptorStatus,
	billAcceptorStatus: controller.lastState?.billAcceptorStatus,

	route: `/monitoring/${controller.machine.id}`
}));
