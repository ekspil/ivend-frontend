import {getTimestamp} from '@/utils';

export const getTableHeaders = () => [
  {name: 'Товар', key: 'itemName'},
  {
    name: 'Дата', key: 'timestamp',
    critery(data) {
    	const {timestamp} = data

			if(!timestamp)  {
				return ''
			}

      return `${timestamp.toLocaleDateString('ru-RU')} ${timestamp.toLocaleTimeString('ru-RU')}`;
    },
  },
  {name: 'Сумма', key: 'itemPrice'},
  {name: 'Чек', key: 'receiptStatus'},
];

export const getTableFields = ({sales, machine}) => sales.map(({id, price, createdAt, item, receipt}) => ({
  itemName: item.name,
  timestamp: receipt ? new Date(receipt.timestamp) : new Date(createdAt),
  itemPrice: price,
  receiptStatus: receipt ? receipt.status : 'Нет'
}));
