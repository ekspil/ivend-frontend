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
					return createTooltip('primary', `${gradation.seconds} ${getWordEnding(gradation.minutes, 'секунда')} назад`);
				}  else if (gradation.minutes < 60) {
					return createTooltip('primary', `${gradation.minutes} ${getWordEnding(gradation.minutes, 'минута')} назад`);
				} else if (gradation.hours < 24) {
					return createTooltip('primary', `${gradation.hours} ${getWordEnding(gradation.hours, 'час')} назад`);
				}

				return createTooltip('alert', `${gradation.days} ${getWordEnding(gradation.days, 'день')} назад`);
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

				if (gradation.minutes < 60) {
					return createTooltip('primary', `${getTimestamp(lastSaleTime)}`);
				} else if (gradation.hours < 24) {
					return createTooltip('warning', `${getTimestamp(lastSaleTime)}`);
				}

				return createTooltip('alert', `${getTimestamp(lastSaleTime)}`);
			}

			return createTooltip('info', 'НЕТ');
		}
	},
	{
		name: 'Ошибки',
		key: 'lastErrorTime'
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
	},
	{
		name: 'Инкассация',
		key: 'collection',
		critery () { return createTooltip('info', 'ОТКЛ'); }
	},
	{
		name: 'Загрузка',
		key: 'load',
		critery () { return createTooltip('info', 'ОТКЛ'); }
	}
];

export const getTableFields = data => data.map(machine => ({
	name: machine.name,
	lastSaleTime: machine.lastSaleTime,
	lastErrorTime: getTimestamp(machine.controller?.lastErrorTime),
	registrationTime: machine.controller?.lastState?.registrationTime,

	collection: 'ОТКЛ',
	load: 'ОТКЛ',
	audit1: 'ОТКЛ',
	audit2: 'ОТКЛ',

	route: `/monitoring/${machine.id}`
}));
