import { createTooltip, getTimestamp, getGradation, getWordEnding } from '@/utils';

export const getTableHeaders = () => [
  {name: 'Автомат', key: 'name', link: true},
  {
    name: 'Инкассация', key: 'encashmentTimestamp',
    critery({encashmentTimestamp}) {
      return getTimestamp(encashmentTimestamp);
    }
  },
  {name: 'Кол-во продаж', key: 'salesCount'},
  {name: 'Сумма', key: 'overallAmount'},
  {name: 'Безнал', key: 'cashlessAmount'},
  {name: 'Наличные', key: 'cashAmount'},
  {name: 'Адрес установки', key: 'place'}
];

export const getTableFields = data => data.map(({id, name, lastEncashment, salesByEncashment, place}) => ({
  id,
  name,
  place,
  encashmentTimestamp: lastEncashment ? new Date(lastEncashment.timestamp) : null,
  ...salesByEncashment,
  route: `/machine/${id}/encashments`
})).filter(e => e.salesCount);
