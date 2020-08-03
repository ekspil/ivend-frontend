import { createTooltip, getTimestamp, getGradation, getWordEnding } from '@/utils';

export const getTableHeaders = () => [
	{
		name: 'Автомат',
		key: 'name',
		link: true,
	},
	{
		name: 'Контроллер',
		key: 'controller',
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
					return createTooltip('primary', `${gradation.seconds} ${getWordEnding(gradation.seconds, 'секунда')} назад`);
				} else if (gradation.minutes < 15) {
					return createTooltip('primary', `${gradation.minutes} ${getWordEnding(gradation.minutes, 'минута')} назад`);
				} else if (gradation.minutes >= 15 && gradation.minutes <= 30) {
					return createTooltip('warning', `${gradation.minutes} ${getWordEnding(gradation.minutes, 'минута')} назад`);
				} else if (gradation.minutes > 30 && gradation.hours < 24) {
					return createTooltip('alert', `${gradation.hours} ${getWordEnding(gradation.hours, 'час')} назад`);
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
		key: 'error',
		critery ({error, terminalStatus, kktStatus, banknoteCollectorStatus, coinCollectorStatus}) {

			if(kktStatus && kktStatus !== "OK" && kktStatus !== "ОТКЛ" && kktStatus !== "ОК"){
				console.log("kktStatus"+kktStatus)
				return createTooltip('alert', "Ошибка кассы");
			}

			if(terminalStatus && terminalStatus !== "OK" && terminalStatus !== "ОТКЛ" && terminalStatus !== "ОК"){

				return createTooltip('alert', "Ошибка терминала");
			}

			if(banknoteCollectorStatus && banknoteCollectorStatus !== "OK"  && banknoteCollectorStatus !== "ОТКЛ" && banknoteCollectorStatus !== "ОК"){
				console.log("banknoteCollectorStatus"+banknoteCollectorStatus)
				return createTooltip('alert', "Ошибка купюроприемника");
			}
			if(coinCollectorStatus && coinCollectorStatus !== "OK"  && coinCollectorStatus !== "ОТКЛ" && coinCollectorStatus !== "ОК"){
				console.log("coinCollectorStatus"+coinCollectorStatus)
				return createTooltip('alert', "Ошибка монетника");
			}


			switch (error) {
			case 'OK':
				return createTooltip('primary', error);
			case 'NO DATA':
				return createTooltip('info', "Нет данных");
			case 'ОТКЛ':
				return createTooltip('info', error);
			case 'NO SALES 24H':
				return createTooltip('warning', "Нет продаж 24 ч.");
			case '31D':
				return createTooltip('alert', "Нет более 30 дней");

			default:
				return createTooltip('warning', error);
		} }
	},
	{
		name: 'Инкассация',
		key: 'encashment',
		critery ({encashment, lastEncashment}) { switch (encashment) {
			case 'OK':
				return createTooltip('primary', encashment);
			case 'NO DATA':
				return createTooltip('info', "Нет данных");
			case 'ОТКЛ':
				return createTooltip('info', encashment);
			case 'NO SALES 24H':
				return createTooltip('warning', "Нет продаж 24 ч.");
			case '31D':
				return createTooltip('alert', "Нет более 30 дней");

			default: {

				const dt = new Date(Number(lastEncashment)).toLocaleString()
				const diff = (new Date().getTime()) - Number(lastEncashment)
				if(diff > 7 * 24 * 60 * 60 * 1000){
					return createTooltip('warning', dt);
				}
				return createTooltip('primary', dt);
			}

		} }
	}
];

export const getTableFields = data => data.map(machine => ({
	name: machine.name,
	lastSaleTime: machine.lastSaleTime,
	lastErrorTime: getTimestamp(machine.controller?.lastErrorTime),
	registrationTime: machine.controller?.lastState?.registrationTime,
	controller: machine.controller?.uid,
	terminalStatus: machine.terminalStatus ,
	kktStatus: machine.kktStatus ,
	banknoteCollectorStatus: machine.banknoteCollectorStatus ,
	coinCollectorStatus: machine.coinCollectorStatus ,
	collection: 'ОТКЛ',
	load: 'ОТКЛ',
	audit1: 'ОТКЛ',
	audit2: 'ОТКЛ',
	encashment: machine.encashment,
    lastEncashment: machine.lastEncashment?.timestamp,
	error: machine.error,

	route: `/monitoring/${machine.id}`
}));
