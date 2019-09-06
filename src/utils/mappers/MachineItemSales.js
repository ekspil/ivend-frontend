import { createTooltip, getTimestamp, getGradation, getWordEnding } from '@/utils';

export const getTableHeaders = () => [
  {name: 'Товар', key: 'itemName'},
  {
    name: 'Дата', key: 'timestamp',
    critery({timestamp}) {
      return getTimestamp(timestamp)
    },
  },
  {name: 'Сумма', key: 'itemPrice'},
  {name: 'Чек', key: 'receiptStatus',
    critery ({receiptStatus}) {
      switch (receiptStatus) {
        case "PENDING":
          return createTooltip('warning', 'В очереди');
        case "ERROR":
          return createTooltip('alert', 'Ошибка');
        case "OK":
          return createTooltip('primary', 'OK');
        default:
          return createTooltip(null, 'Нет');
      }
    }
  },
];

export const getTableFields = ({sales}) => sales.map(({id, price, createdAt, item, receipt}) => ({
  itemName: item.name,
  timestamp: receipt ? new Date(receipt.timestamp) : new Date(createdAt),
  itemPrice: price,
  receiptStatus: receipt ? receipt.status : null
}));
