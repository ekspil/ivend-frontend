import {  getTimestamp } from '@/utils';

export const getTableHeaders = () => [
  {name: 'Автомат', key: 'name', link: true},
  {name: 'Контроллер', key: 'controller'},
  {
    name: 'Последняя инкассация', key: 'encashmentTimestamp',
    critery({encashmentTimestamp}) {
      return getTimestamp(encashmentTimestamp);
    }
  },
  {name: 'Сумма', key: 'overallAmount'},
  {name: 'Кол-во инкассаций', key: 'encashmentsCount'},
  {name: 'Сумма инкассаций', key: 'encashmentsAmount'},
  {name: 'Кол-во продаж', key: 'salesCount'},

  {name: 'Наличные', key: 'cashAmount'},
  {name: 'Безнал', key: 'cashlessAmount'},
  {name: 'Адрес установки', key: 'place'}
];

export const getTableFields = data => data.map(({id, name, lastEncashment, salesByEncashment, place, controller, encashmentsSummaries}) => ({
  id,
  name,
  encashmentsCount: encashmentsSummaries.length,
  encashmentsAmount: encashmentsSummaries.reduce((acc, item) => {
    return Number(item.salesSummary?.cashAmount) + acc
  }, 0),
  controller: controller?.uid,
  place,
  encashmentTimestamp: lastEncashment ? new Date(lastEncashment.timestamp) : null,
  ...salesByEncashment,
  route: `/machine/${id}/encashments`
}));
