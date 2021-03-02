import { getTimestamp } from '@/utils';

const mapType = type => {
	switch (type) {
		case 'CONNECTION': return 'Связь';
		case 'COINACCEPTOR': return 'Монетник';
		case 'BILLACCEPTOR': return 'Купюроприемник';
		case 'BUS_ERROR': return 'Ошибка шины';
		case 'REGISTRATION': return 'Регистрация';
		case 'NO_RECEIPT_24H': return 'Касса';
		case 'NO_CASHLESS_24H': return 'Банковский терминал';
		case 'NO_CASH_24H': return 'Купюроприемник';
		case 'NO_COINS_24H': return 'Монетник';
		default: return '?';
	}
}

export const getTableHeaders = () => [
    { name: 'Событие', key: 'type' },
    { name: 'Время', key: 'timestamp' },
    { name: 'Причина', key: 'message' }
];

export const getTableFields = data => data.map(({ type, timestamp, message }) => ({
    type: mapType(type),
    timestamp: getTimestamp(timestamp),
    message,
    class: ''
}));
