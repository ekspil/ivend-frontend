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
        case "WAITING":
          return createTooltip('warning', 'Ожидание');
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
export const getTableHeadersNoLimit = () => [
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

export const getTableFields = ({sales}, props) => sales.map(({price, type, createdAt, item, receipt, id}) => ({
  id,
  itemName: item.name,
  timestamp: receipt ? new Date(receipt.timestamp) : new Date(createdAt),
  itemPrice: price,
  receiptStatus: receipt ? receipt.status : null,
  receiptPaymentType: receipt ? getPaymentTypeStr(receipt.paymentType) : getPaymentTypeStr(type),
  props,
  route: `/bill/${receipt ? receipt.id : null}`
}));

export const getTableFieldsNoLimit = ({salesNoLimit}) => salesNoLimit.map(({price, type, createdAt, item, status}) => ({
  itemName: item.name,
  timestamp: new Date(createdAt).toLocaleString(),
  itemPrice: price,
  receiptStatus: status,
  receiptPaymentType: getPaymentTypeStr(type),
  route: `/bill/`
}));
