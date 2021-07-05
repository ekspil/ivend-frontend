import { createTooltip, getTimestamp } from '@/utils';

export const getTableHeaders = () => [
  {name: 'Товар', key: 'itemName'},
  {
    name: 'Дата', key: 'timestamp',
    critery({timestamp}) {
      return getTimestamp(timestamp)
    },
  },
  {name: 'Сумма', key: 'itemPrice'},
  {name: 'Тип платежа', key: 'receiptPaymentType'},
  {name: 'Чек', key: 'receiptStatus', link: true,
    critery ({receiptStatus}) {
      switch (receiptStatus) {
        case "PENDING":
          return createTooltip('warning', 'В очереди');
        case "ERROR":
          return createTooltip('alert', 'Ошибка');
        case "SUCCESS":
          return createTooltip('primary', 'OK');
        default:
          return createTooltip(null, 'Нет');
      }
    }
  },
];

const getPaymentTypeStr = (paymentType) => {
  return {
    CASH: "наличные",
    CASHLESS: "безнал"
  }[paymentType]
}

export const getTableFields = ({sales}) => sales.map(({price, type, createdAt, item, receipt}) => ({
  itemName: item.name,
  timestamp: receipt ? new Date(receipt.timestamp) : new Date(createdAt),
  itemPrice: price,
  receiptStatus: receipt ? receipt.status : null,
  receiptPaymentType: receipt ? getPaymentTypeStr(receipt.paymentType) : getPaymentTypeStr(type),
  route: `/bill/${receipt ? receipt.id : null}`
}));
