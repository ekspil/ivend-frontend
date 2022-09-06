import { createTooltip, getTimestamp, getGradation, getWordEnding } from '@/utils';

export const getTableHeaders = () => [
	{
		name: 'Автомат',
		key: 'name',
		critery ({ name, attentionRequired }) {


				if (attentionRequired) {
					return createTooltip('alert', name);
				} else {
					return name
				}

		},
		link: true,
	},
	{
		name: 'Связь',
		key: 'registrationTime',
		critery ({ registrationTime, lastSaleTime, controllerSim }) {
			let latestTime = registrationTime > lastSaleTime ? registrationTime : lastSaleTime;
			const localeTimestamp = getTimestamp(latestTime);

			if (localeTimestamp !== '-') {
				const gradation = getGradation(Date.now() - latestTime);

				if (gradation.seconds < 60) {
					return createTooltip('primary', `${gradation.seconds} ${getWordEnding(gradation.seconds, 'секунда')}`);
				} else if (gradation.minutes < 15) {
					return createTooltip('primary', `${gradation.minutes} ${getWordEnding(gradation.minutes, 'минута')}`);
				} else if (gradation.minutes >= 15 && gradation.minutes <= 30) {
					return createTooltip('warning', `${gradation.minutes} ${getWordEnding(gradation.minutes, 'минута')}`, controllerSim);
				} else if (gradation.minutes > 30 && gradation.hours < 24) {
					return createTooltip('alert', `${gradation.hours} ${getWordEnding(gradation.hours, 'час')}`, controllerSim);
				} else if (gradation.days > 0) {
					createTooltip('alert', `${gradation.days} ${getWordEnding(gradation.days, 'день')}`, controllerSim);
				}
			}

			return createTooltip('info', 'НЕТ', controllerSim );
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
		name: 'Регистрация',
		key: 'controllerRegistrationTime',
		critery ({ controllerRegistrationTime, controllerCmd }) {
			const localeTimestamp = getTimestamp(controllerRegistrationTime);
			if (localeTimestamp !== '-') {
				if(!controllerCmd){
					return createTooltip('primary', localeTimestamp);
				}
				else {

					return createTooltip('warning', localeTimestamp);
				}
			}

			return createTooltip('info', 'ОТКЛ');
		}
	},
	{
		name: 'Монетник',
		key: 'coinCollectorStatus',
		critery ({ coinCollectorStatus }) {
			switch (coinCollectorStatus) {
				case 'OK':
					return createTooltip('primary', "Ок");
				case 'ERROR':
					return createTooltip('alert', "Ошибка");

				default:
					return createTooltip('info', 'ОТКЛ');
			}
		}
	},
	{
		name: 'Купюрник',
		key: 'banknoteCollectorStatus',
		critery ({banknoteCollectorStatus }) {
			switch (banknoteCollectorStatus) {
				case 'OK':
					return createTooltip('primary', "Ок");
				case 'ERROR':
					return createTooltip('alert', "Ошибка");

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
	},
	{
		name: 'Контроллер',
		key: 'controller',
	},

];

export const getTableFields = data => data.map(({ id, name, lastSaleTime, controller, kktStatus, terminalStatus, coinCollectorStatus,  banknoteCollectorStatus}) => ({
	id,
	controller: controller?.uid,
	controllerSim: controller?.sim,
	attentionRequired: controller?.lastState?.attentionRequired,
	controllerRegistrationTime: controller?.registrationTime,
	controllerCmd: controller?.cmdInfo,
	name,
	lastSaleTime,
	cashbox: kktStatus,
	terminal: terminalStatus,

	registrationTime: controller?.lastState?.registrationTime,
	coinAmount: controller?.lastState?.coinAmount,
	billAmount: controller?.lastState?.billAmount,

	coinCollectorStatus,
	banknoteCollectorStatus,

	route: `/monitoring/${id}`
}));
