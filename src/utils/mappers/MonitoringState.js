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

				if (gradation.seconds < 60) {
					return createTooltip('primary', `${gradation.seconds} ${getWordEnding(gradation.seconds, 'секунда')}`);
				} else if (gradation.minutes < 15) {
					return createTooltip('primary', `${gradation.minutes} ${getWordEnding(gradation.minutes, 'минута')}`);
				} else if (gradation.minutes >= 15 && gradation.minutes <= 30) {
					return createTooltip('warning', `${gradation.minutes} ${getWordEnding(gradation.minutes, 'минута')}`);
				} else if (gradation.minutes > 30 && gradation.hours < 24) {
					return createTooltip('alert', `${gradation.hours} ${getWordEnding(gradation.hours, 'час')}`);
				} else if (gradation.days > 0) {
					createTooltip('alert', `${gradation.days} ${getWordEnding(gradation.days, 'день')}`);
				}
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

				if (gradation.seconds < 60) {
					return createTooltip('primary', `${gradation.seconds} ${getWordEnding(gradation.minutes, 'секунда')}`);
				} else if (gradation.minutes < 60) {
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
		key: 'controllerRegistrationTime',
		critery ({ controllerRegistrationTime }) {
			const localeTimestamp = getTimestamp(controllerRegistrationTime);
			if (localeTimestamp !== '-') {
				return createTooltip('primary', localeTimestamp);
			}

			return createTooltip('info', 'ОТКЛ');
		}
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
		critery ({terminal}) {
			switch (terminal) {
				case 'OK':
					return createTooltip('primary', "Ок");
				case 'ERROR':
					return createTooltip('alert', "Ошибка");
				case '24H':
					return createTooltip('warning', "24 часа");

				case 'OK (100руб/мес)':
					return createTooltip('primary', "Ок");
				case 'ERROR (100руб/мес)':
					return createTooltip('alert', "Ошибка");
				case '24H (100руб/мес)':
					return createTooltip('warning', "24 часа");


				default:
					return createTooltip('info', terminal);
			}}
	},
	{
		name: 'Касса',
		key: 'cashbox',
		critery ({cashbox}) {
			switch (cashbox) {
				case 'OK':
					return createTooltip('primary', "Ок");
				case 'ERROR':
					return createTooltip('alert', "Ошибка");
				case '24H':
					return createTooltip('warning', "24 часа");

				default:
					return createTooltip('info', cashbox);
			}}
	}
];

export const getTableFields = data => data.map(({ id, name, lastSaleTime, controller, kktStatus, terminalStatus }) => ({
	id,
	controllerRegistrationTime: controller?.registrationTime,
	name,
	lastSaleTime,
	cashbox: kktStatus,
	terminal: terminalStatus,

	registrationTime: controller?.lastState?.registrationTime,
	coinAmount: controller?.lastState?.coinAmount,
	billAmount: controller?.lastState?.billAmount,

	coinAcceptorStatus: controller?.lastState?.coinAcceptorStatus,
	billAcceptorStatus: controller?.lastState?.billAcceptorStatus,

	route: `/monitoring/${id}`
}));
